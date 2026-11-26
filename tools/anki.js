#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/anki.js — export glosára a otázok na zopakovanie do Anki

   Spustenie (z koreňa projektu):   node tools/anki.js
   Výstup:  anki/glosar.txt   — heslo → krátka definícia + vysvetlenie (bez obrázkov)
            anki/glosar.apkg  — ten istý glosár ako balík Anki S OBRÁZKAMI vysvetliviek
                                (zmenšené na ≤ 800 px, pod každým autor · licencia · odkaz – TASL)
            anki/otazky.txt   — otázky z blokov ```quiz``` v chapters/*.md

   glosar.apkg je v .gitignore (desiatky MB pri každej zmene glosára by nafukovali históriu
   súkromného repozitára); do verejnej verzie ho pridá tools/zverejni.ps1. Zmenšené obrázky
   sa držia v anki/.obrazky/ (cache), balík sa prepisuje len pri zmene glosára alebo obrázkov.
   Potrebuje Node ≥ 22.5 (node:sqlite) a na zmenšenie py + Pillow (bez nich ide originál).

   Import v Anki: Súbor → Importovať → vyber .txt. Hlavička súboru nastaví
   oddeľovač, HTML, balík aj stĺpec so štítkami, netreba nič vypĺňať.
   Opätovný import rovnakého súboru karty aktualizuje (prvé pole = kľúč).

   Súbor je ZDIEĽANÝ medzi všetkými knihami (KNIHY-CORE, bez zmeny) —
   názov knihy sa berie z <title> v index.html.
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GLOS = path.join(ROOT, "assets", "glossary");
const CH = path.join(ROOT, "chapters");
const OUT = path.join(ROOT, "anki");

const read = (p) => fs.readFileSync(p, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
const tryRead = (p) => { try { return read(p); } catch (e) { return ""; } };
const title = (tryRead(path.join(ROOT, "index.html")).match(/<title>([^<]*)<\/title>/) || [])[1] ||
  (() => { try { const b = JSON.parse(tryRead(path.join(ROOT, "book.json"))); return b.title || b.name || b.slug; } catch (e) { return ""; } })() || "Kniha";
const BOOK = title.split(/\s+[—–-]\s+/)[0].trim();

// pole Anki nesmie obsahovať tabulátor ani nový riadok
const field = (s) => s.replace(/\t/g, " ").replace(/\s*\n\s*/g, " ").trim();
const tag = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

function header(deck) {
  return ["#separator:tab", "#html:true", `#deck:${BOOK}::${deck}`, "#tags column:3", ""].join("\n");
}

/* ── glosár ─────────────────────────────────────────────────────────────── */
const entries = []; // pre balík .apkg
function glossary() {
  if (!fs.existsSync(GLOS)) return 0;
  const rows = [];
  // jedno spoločné pole ako v prehliadači: neskoršie súbory (96-obrazky.js, 98-kde.js) dopĺňajú
  // heslá zo skorších (obrázky z kapitol, „V knihe“) – preto sa nesmie čítať každý súbor zvlášť
  global.window = { PF_GLOSSARY: [] };
  const fileTag = new Map();
  fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f)).sort().forEach((f) => {
    const n = window.PF_GLOSSARY.length;
    // dáta sú vlastné súbory projektu (nie cudzí vstup) — rovnako ich číta tools/glossary-audit.js
    eval(read(path.join(GLOS, f)));
    const t = tag(f.replace(/^\d+-|\.js$/g, ""));
    window.PF_GLOSSARY.slice(n).forEach((g) => { if (g && !fileTag.has(g)) fileTag.set(g, t); });
  });
  const kde = window.PF_GLOSSARY_KDE || {};
  window.PF_GLOSSARY.forEach((g) => {
    if (!g || !g.title) return;
    const t = fileTag.get(g) || "glosar";
    const body = (g.body || "").replace(/<img\b[^>]*>/g, "");
    const back = `${g.et ? `<i>${g.et.replace(/<[^>]+>/g, "")}</i><br>` : ""}<b>${g.short || ""}</b>${body ? "<hr>" + body : ""}`;
    rows.push([field(g.title), field(back), `glosar ${t}`].join("\t"));
    entries.push({ g, body, t, kde: (g.id && kde[g.id] && kde[g.id][1]) || "" });
  });
  delete global.window;
  fs.writeFileSync(path.join(OUT, "glosar.txt"), header("Glosár") + rows.join("\n") + "\n", "utf8");
  return rows.length;
}

/* ── otázky z kapitol ───────────────────────────────────────────────────── */
// markdown → HTML len v rozsahu, aký sa v otázkach používa; odkazy sa zmenia na text
function md(s) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "<i>$1</i>")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])/g, "$1<i>$2</i>")
    .replace(/&lt;(sup|sub)&gt;(.*?)&lt;\/\1&gt;/g, "<$1>$2</$1>");
}

function quizzes() {
  if (!fs.existsSync(CH)) return 0;
  const rows = [];
  fs.readdirSync(CH).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort().forEach((f) => {
    const src = read(path.join(CH, f));
    const num = (src.match(/^num:\s*(.+)$/m) || [])[1] || "";
    const name = (src.match(/^title:\s*(.+)$/m) || [])[1] || f;
    const t = `kap_${tag(num)} ${tag(name)}`;
    const re = /```quiz[^\n]*\n([\s\S]*?)```/g;
    let m;
    while ((m = re.exec(src))) {
      const qs = [];
      m[1].split("\n").forEach((ln) => {
        const x = ln.trim();
        if (/^\?\s/.test(x)) qs.push({ q: x.slice(2), a: [] });
        else if (qs.length && /^=\s/.test(x)) qs[qs.length - 1].a.push(x.slice(2));
        else if (qs.length && x && qs[qs.length - 1].a.length) qs[qs.length - 1].a.push(x);
      });
      qs.filter((x) => x.a.length).forEach((x) => {
        const back = md(x.a.join(" ")) + `<br><br><small>Kap. ${num} · ${md(name)}</small>`;
        rows.push([field(md(x.q)), field(back), `otazky ${t}`].join("\t"));
      });
    }
  });
  fs.writeFileSync(path.join(OUT, "otazky.txt"), header("Otázky") + rows.join("\n") + "\n", "utf8");
  return rows.length;
}

/* ── kartičky (book.json → karty): do Anki ide len jadro, stručne ─────────────────────────────
   Zdroj je ten istý model ako pre karty.html (tools/karty.js). Kľúč (guid) hesla sa nemení, takže
   opätovný import zachová históriu opakovania. Doplnkové karty v balíku zámerne nie sú: Anki pri
   predvolenom importe stav „vypnutá“ zahodí a zapol by všetky. Sú v karty.html pod „Všetky“. */
function karty() {
  let cfg = {};
  try { cfg = JSON.parse(tryRead(path.join(ROOT, "book.json"))); } catch (e) {}
  if (!cfg.karty) return false;
  const m = require("./karty.js").model(ROOT, cfg);
  const pad = (n) => (/^\d$/.test(n) ? "0" + n : n);
  const plain = (s) => String(s).replace(/<[^>]+>/g, "");
  const back = (c) => (c.x ? `<p class="x">${c.x.t} <small>${c.x.s}</small></p>` : "") + (c.r.length ? `<ul>${c.r.map((x) => `<li${x.k ? ` class="${x.k}"` : ""}>${x.t}</li>`).join("")}</ul>` : "") +
    (c.m ? `<details><summary>Viac</summary>${c.m}</details>` : "");
  entries.length = 0;
  const gl = [], ot = [];
  m.cards.filter((c) => c.j && c.k !== "i").forEach((c) => {   // interaktívne karty (zoraď, priraď…) žijú len vo Flows
    const ch = c.ch >= 0 ? m.chs[c.ch] : null;
    const deck = `${BOOK}::Jadro::${ch ? `${pad(ch.num)} ${plain(ch.title).replace(/::/g, " ")}` : "Ostatné"}`;
    const tags = [c.k === "q" ? "otazky" : "glosar", "jadro", c.k === "e" ? "eponym" : "", c.k === "l" ? "cudzi_nazov" : "", ch ? `kap_${tag(ch.num)}` : ""].filter(Boolean).join(" ");
    const title = c.k === "q" ? `<span class="q">${c.f}</span>` : c.f;
    const et = [c.syn, c.g && c.g.et ? plain(c.g.et) : ""].filter(Boolean).join(" · ");
    entries.push({ g: { id: c.id, title, et, short: c.a, img: c.g ? c.g.img : null }, body: back(c), t: "glosar", kde: c.sec || (ch ? ch.title : ""), deck, tags });
    const txt = `<b>${c.a}</b>${c.syn ? `<br><i>${c.syn}</i>` : ""}${back(c)}${ch ? `<br><small>Kap. ${ch.num} · ${plain(ch.title)}</small>` : ""}`;
    if (c.k === "q") ot.push([field(c.f), field(txt), `otazky jadro kap_${tag(ch.num)}`].join("\t"));
    else gl.push([field(c.g ? c.g.title : c.f), field(txt), tags].join("\t"));
  });
  fs.writeFileSync(path.join(OUT, "glosar.txt"), header("Glosár") + gl.join("\n") + "\n", "utf8");
  fs.writeFileSync(path.join(OUT, "otazky.txt"), header("Otázky") + ot.join("\n") + "\n", "utf8");
  return { gl: gl.length, ot: ot.length, all: m.cards.length };
}

fs.mkdirSync(OUT, { recursive: true });
let g = glossary();
let q = quizzes();
const kk = karty();
if (kk) { g = kk.gl; q = kk.ot; }
console.log(`${BOOK}: ${g} hesiel glosára → anki/glosar.txt · ${q} otázok → anki/otazky.txt`);
try { console.log(require("./anki-apkg.js")({ ROOT, OUT, BOOK, entries })); }
catch (e) { console.log(`anki/glosar.apkg sa nevyrobil: ${e.message}`); process.exitCode = 1; }

#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/anki.js — export glosára a otázok na zopakovanie do Anki

   Spustenie (z koreňa projektu):   node tools/anki.js
   Výstup:  anki/glosar.txt   — heslo → krátka definícia + vysvetlenie
            anki/otazky.txt   — otázky z blokov ```quiz``` v chapters/*.md

   Import v Anki: Súbor → Importovať → vyber .txt. Hlavička súboru nastaví
   oddeľovač, HTML, balík aj stĺpec so štítkami, netreba nič vypĺňať.
   Opätovný import rovnakého súboru karty aktualizuje (prvé pole = kľúč).

   Súbor je ZDIEĽANÝ medzi PATOLOU a Patofyziológiou (bez zmeny) —
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
const title = (read(path.join(ROOT, "index.html")).match(/<title>([^<]*)<\/title>/) || [])[1] || "Kniha";
const BOOK = title.split(/\s+[—–-]\s+/)[0].trim();

// pole Anki nesmie obsahovať tabulátor ani nový riadok
const field = (s) => s.replace(/\t/g, " ").replace(/\s*\n\s*/g, " ").trim();
const tag = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

function header(deck) {
  return ["#separator:tab", "#html:true", `#deck:${BOOK}::${deck}`, "#tags column:3", ""].join("\n");
}

/* ── glosár ─────────────────────────────────────────────────────────────── */
function glossary() {
  if (!fs.existsSync(GLOS)) return 0;
  const rows = [];
  fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f)).sort().forEach((f) => {
    global.window = { PF_GLOSSARY: [] };
    // dáta sú vlastné súbory projektu (nie cudzí vstup) — rovnako ich číta tools/glossary-audit.js
    eval(read(path.join(GLOS, f)));
    const t = tag(f.replace(/^\d+-|\.js$/g, ""));
    window.PF_GLOSSARY.forEach((g) => {
      if (!g.title) return;
      const body = (g.body || "").replace(/<img\b[^>]*>/g, "");
      const back = `<b>${g.short || ""}</b>${body ? "<hr>" + body : ""}`;
      rows.push([field(g.title), field(back), `glosar ${t}`].join("\t"));
    });
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

fs.mkdirSync(OUT, { recursive: true });
const g = glossary();
const q = quizzes();
console.log(`${BOOK}: ${g} hesiel glosára → anki/glosar.txt · ${q} otázok → anki/otazky.txt`);

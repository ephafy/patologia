#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/build.js — generuje chapters/*.html z chapters/*.md

   Spustenie (z koreňa projektu):   node tools/build.js
   Jeden súbor:                      node tools/build.js 07a_voda_osmolarita

   Prečo to existuje: CLAUDE.md §0.1 hovorí, že .md a .html verzia tej istej
   kapitoly sa nesmú rozísť. Kapitoly 1, 7a, 7b… sa preto píšu len raz — v .md —
   a HTML sa z nich vždy vygeneruje. Ručne písané kapitoly 3–6 sa nedotýkajú.

   Formát .md a pravidlá (odkazy, callouty, obrázky) sú v tools/README.md.
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CH = path.join(ROOT, "chapters");
const FIG = path.join(CH, "fig");
const GLOS = path.join(ROOT, "assets", "glossary");
const IMG = path.join(ROOT, "assets", "images");

/* ── konfigurácia knihy ──────────────────────────────────────────────────────
   Tento súbor je ZDIEĽANÝ všetkými knihami (KNIHY-CORE) a v knihe sa nemení. Všetko, čím sa kniha
   líši, je dáta: book.json (názov, farba témy, sada farebných boxov, adresy, pravidlá kontroly),
   hub.json (karty a texty hlavnej stránky), assets/styles/palette.css (farby) a chapters/*.md.
   · Glosár je voliteľný — vloží sa, len ak assets/glossary/*.js existuje.
   · Farebné boxy (> [!MECH] …) majú vlastné triedy .box.k-*, NIE .note/.flag/.plain, lebo tie site.js
     vyplavuje do okraja ako poznámky.
   · Obrázky s atribúciou:  ![Obr. 1.2 — Titulok. Popis.](img/x.jpg "Autor · licencia | https://…")
   · palette.css sa načíta POSLEDNÝ (prepíše tokeny z <style> kapitoly).
   · Okraj stránky: KLINIKA, POZOR, ZAPAMATAJ, JADRO a POCUT vždy, krátke boxy z book.json → asideShort tiež;
     skratky z chapters/_skratky.md sa pri prvom výskyte v kapitole vysvetlia na okraji samy. ── */
const BOOK = (() => {
  const p = path.join(ROOT, "book.json");
  if (!fs.existsSync(p)) { console.error("Chýba book.json v koreni knihy (pozri KNIHY-CORE/README.md)."); process.exit(1); }
  return JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
})();
const BRAND = BOOK.brand;
/* Kam čitateľ hlási chybu: issues VEREJNÉHO repozitára — do súkromného pracovného sa čitateľ nedostane.
   V kapitole sa objaví odkaz „Nahlásiť chybu“. Prázdne = bez odkazu. */
const ISSUES_URL = BOOK.issuesUrl || "";
/* Pravidlá kontroly kapitoly: čo sa líši podľa knihy (text hlásenia o circulus vitiosus / regulačnej slučke,
   povinná vlastná schéma v každej kapitole, povinné Jadro v každej sekcii, minimum odkazov). */
const POLICY = Object.assign({
  circulus: "chýba circulus vitiosus (⟳) s bodom zvratu (§2.2)",
  requireFigs: false,
  requireJadro: true,
  minXref: 8,
  requireIntro: true,        // úvodná veta pod každým nadpisom (§2.0 bod 3); banka otázok (CHIRA) ju vypína v book.json
}, BOOK.policy || {});
const HAS_GLOSS = fs.existsSync(GLOS) && fs.readdirSync(GLOS).some((f) => /^\d+-.*\.js$/.test(f));
/* vzorce a schémy dráh (tools/schema.js) – rozvíjajú sa len v SVG, ktoré obsahuje ich značky */
/* hľadanie pojmov glosára – ten istý kód ako v prehliadači (assets/js/glossary.js) */
const PF_MATCH = (() => { try { return require(path.join(ROOT, "assets", "js", "pf-match.js")); } catch (e) { return null; } })();
const schema = fs.existsSync(path.join(__dirname, "schema.js")) ? require("./schema.js") : null;
const SCHEMA_TAGS = /<(mol|rx|uzol|vplyv|legenda|vyrez|plus)\b|\brk="/;
/* zobrazenie mobil/počítač (assets/js/view-toggle.js) – skoré nastavenie pred vykreslením (hub má ten istý skript) */
const VIEW_EARLY = '<script src="../assets/js/view-early.js"></script>';

const read = (p) => fs.readFileSync(p, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
const write = (p, s) => fs.writeFileSync(p, s, "utf8");

/* ── pomocné ─────────────────────────────────────────────────────────────── */
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const idOf = (token) => token.replace(/\./g, "-");
const stripMarks = (s) => s.replace(/\s*`\[(P|S|\+|R)\]`/g, "").replace(/\s+$/g, "");

/* ── front matter ────────────────────────────────────────────────────────── */
function parseFront(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const meta = {};
  m[1].split("\n").forEach((ln) => {
    const k = ln.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (k) meta[k[1]] = k[2].trim();
  });
  return { meta, body: src.slice(m[0].length) };
}

/* ── registry kotiev existujúcich stránok ────────────────────────────────── */
const registry = {}; // stem -> Set(id)
function scanExistingHtml() {
  fs.readdirSync(CH).forEach((f) => {
    if (!f.endsWith(".html")) return;
    const ids = new Set();
    const html = read(path.join(CH, f));
    html.replace(/\bid="([^"]+)"/g, (_, id) => (ids.add(id), ""));
    registry[f.replace(/\.html$/, "")] = ids;
  });
}

/* ── inline markdown ─────────────────────────────────────────────────────── */
let CUR = null; // kontext práve stavanej kapitoly
/* „→ 10.4.3“ a „→ kap. 11“ napísané v texte bez odkazu (pripomienka autora 31. 10. 2026: „nefungujú odkazy… zaruč,
   aby sa to už nestalo“): build z nich urobí odkaz, ak cieľová sekcia existuje. Kotvy sa berú z nadpisov
   všetkých kapitol (## N.M → sec-N-M, ### N.M.K → sub-N-M-K). Číslo hneď za iným číslom („7,4 → 7.2“) sa
   nemení. Čo sa prepojiť nedá, ostane textom a build to ohlási (CUR.warn). */
let ANCH = null;
function anchorsByNum() {
  if (ANCH) return ANCH;
  ANCH = {};
  fs.readdirSync(CH).filter((f) => /^\d.*\.md$/.test(f)).forEach((f) => {
    const src = read(path.join(CH, f));
    const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
    const num = fm && (fm[1].match(/^num:\s*(\S+)/m) || [])[1];
    if (!num) return;
    const ids = new Set();
    src.replace(/^(##|###)\s+(\d+[a-z]?(?:\.\d+)+)\s/gm, (_, h, n) => { ids.add((h === "##" ? "sec-" : "sub-") + idOf(n)); return ""; });
    ANCH[num] = { stem: f.replace(/\.md$/, ""), ids };
  });
  return ANCH;
}
function autoRefs(s) {
  const A = anchorsByNum();
  return s.split(/(\u0001[^\u0003]*\u0003|<a\b[^>]*>[\s\S]*?<\/a>)/).map((part, i) => {
    if (i % 2) return part;
    return part.replace(/(^|[^\d\s,.]\s*|\(\s*)→(\s|&nbsp;)?(kap\.\s?)?(\d+[a-z]?)((?:\.\d+){0,2})(?![\d.,]*\d)/g, (m, pre, sp, kap, ch, rest) => {
      const T = A[ch];
      const label = `→${sp || ""}${kap || ""}${ch}${rest}`;
      if (kap && !rest) {
        if (!T) return m;
        CUR.xrefs++;
        return `${pre}\u0001${T.stem}\u0002${label}\u0003`;
      }
      if (kap || !rest) return m;
      const parts = (ch + rest).split(".");
      const id = (parts.length === 2 ? "sec-" : "sub-") + idOf(ch + rest);
      if (!T) return `${pre}<span class="xref-soon" title="Kapitola sa pripravuje">${label}</span>`;
      if (!T.ids.has(id)) { CUR.warn.push(`text „${label}“ nie je odkaz a sekcia ${ch + rest} sa nenašla – napíš [${label}](súbor#kotva)`); return m; }
      if (String(ch) === String(CUR.num)) { CUR.localRefs.push(id); return `${pre}<a class="xref" href="#${id}">${label}</a>`; }
      CUR.xrefs++;
      return `${pre}\u0001${T.stem}#${id}\u0002${label}\u0003`;
    });
  }).join("");
}

function inl(raw) {
  let s = esc(stripMarks(raw));
  // odkazy [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) => {
    url = url.replace(/&amp;/g, "&");
    if (/^https?:/.test(url)) {
      return `<a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    if (url.startsWith("#")) {
      CUR.localRefs.push(url.slice(1));
      const fig = /^(Schéma|Graf|Obr|Tab)/.test(text);
      return `<a class="${fig ? "figref" : "xref"}" href="${url}">${text}</a>`;
    }
    CUR.xrefs++;
    return `\u0001${url}\u0002${text}\u0003`; // vyrieši sa po registrácii všetkých kapitol
  });
  s = autoRefs(s);
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  s = s.replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])/g, "$1<i>$2</i>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // {{i:id}} = ikonka ⓘ za slovom: otvorí vysvetlivku mechanizmu (heslo glosára s týmto id, spravidla info:true)
  s = s.replace(/\{\{i:([a-z0-9-]+)\}\}/g, (_, id) =>
    `<span class="pf-term pf-info" data-term="${id}" role="button" tabindex="0" aria-label="Mechanizmus – vysvetlenie" title="Prečo? – mechanizmus">i</span>`);
  // horný/dolný index a zalomenie riadku (chemické vzorce, jednotky)
  s = s.replace(/&lt;(sup|sub|i|b)&gt;(.*?)&lt;\/\1&gt;/g, "<$1>$2</$1>").replace(/&lt;br&gt;/g, "<br>")
    .replace(/&lt;span class="text-muted"&gt;(.*?)&lt;\/span&gt;/g, '<span class="text-muted">$1</span>');
  return s;
}

/* ── blokový parser ──────────────────────────────────────────────────────── */
const ALERTS = { NOTE: "note", WARNING: "flag", TIP: "plain", IMPORTANT: "rev" };

/* Farebné boxy = vrstvy výkladu (CLAUDE.md §1.1) + doplnky. Všetky možné sú tu a v tools/chapter-extra.css;
   každá kniha používa svoju podmnožinu (book.json → boxes) a smie prepísať štítok (boxLabels).
   kľúč v .md → [trieda, predvolený štítok] */
const BOX_DEFS = {
  MECH:       ["k-mech",  "Mechanizmus"],
  MORF:       ["k-morf",  "Čo uvidíš"],
  DETEK:      ["k-detek", "Detekcia"],
  REG:        ["k-reg",   "Regulácia"],
  LAB:        ["k-lab",   "Laboratórium"],
  KVANT:      ["k-kvant", "Kvantifikácia"],
  KLINIKA:    ["k-klin",  "Klinika"],
  POZOR:      ["k-pozor", "Pozor"],
  ZAPAMATAJ:  ["k-zap",   "Zapamätaj"],
  FYZ:        ["k-fyz",   "Normálne"],
  CHEM:       ["k-chem",  "Chémia"],
  POCUT:      ["k-pocut", "Môžeš počuť"],   // nie je vrstva – pojem alebo údaj z osnovy, ktorý sa nepodarilo doložiť (CLAUDE.md §4.0, §5.3)
  JADRO:      ["k-jadro", "Jadro"],         // nie je vrstva – hlavná myšlienka sekcie heslovite, len na okraj (§2.0, §5.3)
};
const BOXES = {};
(BOOK.boxes || Object.keys(BOX_DEFS)).forEach((k) => {
  if (!BOX_DEFS[k]) { console.error(`book.json: neznámy box „${k}“ (možné: ${Object.keys(BOX_DEFS).join(", ")})`); process.exit(1); }
  BOXES[k] = [BOX_DEFS[k][0], (BOOK.boxLabels || {})[k] || BOX_DEFS[k][1]];
});

/* Okraj stránky (CLAUDE.md §5.3). Do okraja ide to, čo os výkladu sprevádza, ale neprerušuje:
   KLINIKA, POZOR, ZAPAMATAJ, JADRO a POCUT vždy, krátke boxy z book.json → asideShort len do 50 slov.
   Ostatné vrstvy sú os výkladu – bez nich reťaz nedáva zmysel, preto ostávajú v texte.
   Okraj má ≈ 200 px: tabuľka ani obrázok sa doň nezmestia. */
const ASIDE_ALWAYS = new Set(["KLINIKA", "POZOR", "ZAPAMATAJ", "JADRO", "POCUT"]);
const ASIDE_SHORT = new Set(BOOK.asideShort || []);
const ASIDE_MAX_WORDS = 50;
const JADRO_MAX_WORDS = 40;

/* Skratky na okraji (CLAUDE.md §5.3): chapters/_skratky.md je tabuľka
   skratka | význam | vzor (regex, voliteľný) | len kapitoly (voliteľné).
   Pri prvom výskyte skratky v kapitole build vloží za daný blok drobnú okrajovú poznámku. */
function loadAbbr() {
  const p = path.join(CH, "_skratky.md");
  if (!fs.existsSync(p)) return [];
  const unq = (s) => (s || "").replace(/`/g, "").trim();
  return read(p).split("\n").filter((l) => /^\|/.test(l)).map(splitRow)
    .filter((r) => r[0] && r[1] && r[0] !== "Skratka" && !/^:?-+:?$/.test(r[0]))
    .map((r) => {
      const label = unq(r[0]);
      const pat = unq(r[2]) || label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return {
        label,
        text: r[1],
        re: new RegExp(`(?<![\\p{L}\\p{N}])(?:${pat})(?![\\p{L}\\p{N}])`, "u"),
        only: unq(r[3]).split(/[,\s]+/).filter(Boolean),
      };
    });
}
let ABBR = [];

function abbrNote(html) {
  if (!ABBR.length) return "";
  const text = html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<a class="src-link"[\s\S]*?<\/a>/g, " ")   // autor a licencia obrázka (CC BY-SA…)
    .replace(/\u0001[^\u0002]*\u0002/g, " ")              // adresa ešte nevyriešeného odkazu
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const hits = [];
  ABBR.forEach((a) => {
    if ((a.only.length && !a.only.includes(String(CUR.num))) || CUR.abbr.has(a.label)) return;
    const m = a.re.exec(text);
    if (m) { CUR.abbr.add(a.label); hits.push({ a, at: m.index }); }
  });
  if (!hits.length) return "";
  hits.sort((x, y) => x.at - y.at);
  CUR.abbrNotes++;
  return `<div class="box k-skr aside keep">\n    <div class="body">${hits.map((h) => `<span class="sk"><b>${esc(h.a.label)}</b> ${inl(h.a.text)}</span>`).join(" ")}</div>\n  </div>`;
}

/* rozmery obrázka z hlavičky súboru (PNG / JPEG / GIF) — kvôli width/height */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b.length > 24 && b.toString("ascii", 1, 4) === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 3) === "GIF") return { w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

const LINK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7"></path><path d="M21 3l-9 9"></path><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"></path></svg>';

function renderImage(alt, rel, title, inRow) {
  const remote = /^https?:/.test(rel);
  const name = remote ? rel : rel.replace(/^img\//, "");
  const file = path.join(IMG, name);
  const idm = alt.match(/^(?:Obr\.|Schéma|Graf)\s+(\d+)\.(\d+)/);
  const id = idm ? `fig-${idm[1]}-${idm[2]}` : "";
  if (id) CUR.ids.add(id);
  if (remote) CUR.warn.push(`obrázok ${id || alt.slice(0, 30)} sa ťahá zo vzdialeného servera (${new URL(rel).host}) — nie je offline (CLAUDE.md §4.3)`);
  else if (!fs.existsSync(file)) { CUR.warn.push(`chýba obrázok assets/images/${name}`); return `<!-- chýba ${rel} -->`; }
  const sz = remote ? null : imageSize(file);
  let credit = "", href = "";
  let opts = "";
  if (title) { // "autor · licencia | https://zdroj | ar=1.12 fw=420"
    const parts = title.split("|").map((x) => x.trim());
    credit = parts[0] || ""; href = parts[1] || ""; opts = parts.slice(2).join("|").trim();
  }
  const optAr = (opts.match(/ar=([\d.]+)/) || [])[1];
  const optFw = (opts.match(/fw=(\d+)/) || [])[1];
  const altOpt = (opts.match(/\balt=(.*)$/) || [])[1];            // popis obrázka pre čítačky (inak sa berie z titulku)
  const optsFlags = opts.replace(/\balt=.*$/, "");
  const side = /\bside\b/.test(optsFlags), right = /\bright\b/.test(optsFlags);   // obrázok obtekaný textom (vľavo / vpravo)
  if (!credit) CUR.warn.push(`obrázok ${name} nemá atribúciu (CLAUDE.md §4.4)`);
  const dims = sz ? ` width="${sz.w}" height="${sz.h}"` : "";
  const ar = sz ? (sz.w / sz.h).toFixed(2) : optAr || "1";
  const fwPx = optFw ? +optFw : sz ? Math.min(sz.w, 720) : 520;
  const fw = ` style="${inRow ? `--ar:${ar};` : ""}--fw:${fwPx}px"`;
  const src = credit
    ? ` <a class="src-link"${href ? ` href="${escAttr(href)}" target="_blank" rel="noopener noreferrer"` : ""}>${LINK_ICON}${esc(credit)}</a>`
    : "";
  const cap = captionHtml(alt).replace(/<\/figcaption>$/, `${src}</figcaption>`);
  return `<figure class="fig${side ? " side" + (right ? " right" : "") : ""} keep"${id ? ` id="${id}"` : ""}${fw}>\n    <img src="${remote ? escAttr(rel) : "../assets/images/" + name}"${dims} alt="${escAttr(altOpt || alt.replace(/^.*? — /, ""))}" loading="lazy">\n    ${cap}\n  </figure>`;
}

function splitRow(line) {
  let t = line.trim();
  if (t.startsWith("|")) t = t.slice(1);
  if (t.endsWith("|") && !t.endsWith("\\|")) t = t.slice(0, -1);
  return t.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
}

function renderTable(rows, opts) {
  const head = splitRow(rows[0]);
  const body = rows.slice(2).map(splitRow);
  const id = opts.noId ? "" : ` id="tab-${CUR.num}-${++CUR.tabs}"`;
  // farebný stĺpec: hlavička končí značkou {zel} | {fial} | {ruz} | {tyrk} → trieda c-… na th aj na bunkách stĺpca
  // značky na konci hlavičky stĺpca: {zel} {fial} {ruz} {tyrk} = farebný stĺpec, {w17} = šírka stĺpca 17 %
  const MARK = /\s*\{(zel|fial|ruz|tyrk|w\d+)\}\s*$/;
  const hd = head.map((h) => {
    let t = h, tint = "", w = "";
    for (let m = t.match(MARK); m; m = t.match(MARK)) { if (/^w\d+$/.test(m[1])) w = m[1].slice(1); else tint = m[1]; t = t.slice(0, m.index); }
    return { t, tint, w };
  });
  const tint = hd.map((h) => h.tint);
  const cls = (i) => (tint[i] ? ` class="c-${tint[i]}"` : "");
  const th = hd.map((h, i) => `<th${cls(i)}${h.w ? ` style="width:${h.w}%"` : ""}>${inl(h.t)}</th>`).join("");
  const trs = body
    .map((r) => "<tr>" + r.map((c, i) => `<td${cls(i)}>${i === 0 && opts.boldFirst ? "<b>" + inl(c) + "</b>" : inl(c)}</td>`).join("") + "</tr>")
    .join("\n      ");
  return `<table class="table keep"${id} style="margin:6px 0">\n    <thead><tr>${th}</tr></thead>\n    <tbody>\n      ${trs}\n    </tbody>\n  </table>`;
}

function parseBlocks(lines, ctx) {
  ctx = ctx || {};
  const out = [];
  let i = 0;
  const isBlank = (l) => /^\s*$/.test(l);
  const special = (l) =>
    /^(#{2,3}\s|```|>|\|)/.test(l) || /^\s*([-*]|\d+\.)\s/.test(l) || /^!\[/.test(l) || /^<!--/.test(l) || /^---\s*$/.test(l);

  while (i < lines.length) {
    const l = lines[i];
    if (isBlank(l)) { i++; continue; }

    // komentár
    if (/^<!--/.test(l)) { while (i < lines.length && !/-->/.test(lines[i])) i++; i++; continue; }
    if (/^---\s*$/.test(l)) { i++; continue; }

    // nadpisy sa riešia mimo tejto funkcie (sekcie)
    // blok kódu
    const fence = l.match(/^```(\w*)\s*(.*)$/);
    if (fence) {
      const kind = fence[1] || "pre";
      const info = fence[2].trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(renderFence(kind, info, buf));
      continue;
    }

    // obrázok = SVG z chapters/fig
    const img = l.match(/^!\[((?:[^\[\]]|\[[^\]]*\]\([^)\s]*\))*)\]\((fig\/([\w.-]+)\.svg)\)\s*$/);
    if (img) { out.push(renderSvgFigure(img[1], img[3])); i++; continue; }

    // obrázok = súbor z assets/images (s atribúciou v titulku)
    const PIC = /^!\[((?:[^\[\]]|\[[^\]]*\]\([^)\s]*\))*)\]\(((?:img\/|https?:\/\/)[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;
    if (PIC.test(l)) {
      const group = [];
      while (i < lines.length && PIC.test(lines[i])) { group.push(lines[i].match(PIC)); i++; } // riadky bez medzery = dvojica vedľa seba
      if (group.length === 1) out.push(renderImage(group[0][1], group[0][2], group[0][3]));
      else out.push(`<div class="fig-row">\n  ${group.map((g) => renderImage(g[1], g[2], g[3], true)).join("\n  ")}\n  </div>`);
      continue;
    }

    // blockquote / alert
    if (/^>/.test(l)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(renderAlert(buf, ctx));
      continue;
    }

    // tabuľka
    if (/^\|/.test(l)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      out.push(renderTable(rows, { boldFirst: true, noId: ctx.noTableId }));
      continue;
    }

    // zoznam
    if (/^\s*([-*]|\d+\.)\s/.test(l)) {
      const ordered = /^\s*\d+\./.test(l);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s/.test(lines[i])) {
        const lvl = /^\s{2,}/.test(lines[i]) ? 1 : 0; // jedna úroveň vnorenia (odsadenie ≥ 2 medzery)
        let t = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s/.test(lines[i])) t += " " + lines[i++].trim();
        items.push({ t, lvl });
      }
      const tag = ordered ? "ol" : "ul";
      if (ordered && ctx.keypoints) {
        out.push(renderKeypoints(items.map((x) => x.t)));
      } else {
        if (items.length) items[0].lvl = 0;
        let html = `<${tag}>`;
        items.forEach((x, k) => {
          const next = items[k + 1];
          if (x.lvl === 0) {
            html += `\n    <li>${inl(x.t)}`;
            html += next && next.lvl === 1 ? "\n    <ul>" : "</li>";
          } else {
            html += `\n      <li>${inl(x.t)}</li>`;
            if (!next || next.lvl === 0) html += "\n    </ul></li>";
          }
        });
        html += `\n  </${tag}>`;
        out.push(html);
      }
      continue;
    }

    // odsek
    const buf = [];
    while (i < lines.length && !isBlank(lines[i]) && !(buf.length && special(lines[i]))) buf.push(lines[i++]);
    const text = buf.join(" ").trim();
    if (ctx.src && /^\*\*[^*]+\*\*$/.test(text)) {
      out.push(`<div class="micro" style="margin-top:8px">${inl(text.replace(/\*\*/g, ""))}</div>`);
    } else {
      // {lede} na začiatku odseku = úvodná veta sekcie (menšie, tlmené písmo)
      out.push(/^\{lede\}\s+/.test(text) ? `<p class="lede">${inl(text.replace(/^\{lede\}\s+/, ""))}</p>` : `<p>${inl(text)}</p>`);
    }
  }
  return ctx.raw ? out : out.join("\n\n  ");
}

function renderFence(kind, info, buf) {
  if (kind === "chain") {
    return `<p class="chain">${buf.map((b) => inl(b)).join("<br>\n    ")}</p>`;
  }
  if (kind === "fork") {
    const cols = buf
      .filter((b) => b.trim())
      .map((b) => {
        const k = b.indexOf("|");
        const t = k < 0 ? "" : b.slice(0, k).trim();
        const x = k < 0 ? b : b.slice(k + 1).trim();
        return `<div><b>${inl(t)}</b>${inl(x)}</div>`;
      });
    return `<div class="fork">\n    ${cols.join("\n    ")}\n  </div>`;
  }
  if (kind === "flow") {
    // číslovaný zoznam v dvoch stĺpcoch (kroky, kruhy, paralelné dráhy); riadok = položka
    const items = buf.filter((b) => b.trim()).map((b) => `<li>${inl(b.replace(/^\s*(?:\d+\.|[-*])\s+/, ""))}</li>`);
    return `<ol class="flow-2">\n    ${items.join("\n    ")}\n  </ol>`;
  }
  if (kind === "html") return buf.join("\n");   // núdzové východisko: surový HTML blok (len keď md konštrukcia neexistuje)
  if (kind === "cols") {
    // stĺpce vedľa seba; stĺpce oddeľuje riadok „---“, vnútri bežný markdown (odsek, odrážky)
    const cols = [[]];
    buf.forEach((b) => { if (/^---\s*$/.test(b)) cols.push([]); else cols[cols.length - 1].push(b); });
    const html = cols.filter((c) => c.some((b) => b.trim())).map((c) => `<div>${parseBlocks(c, { src: true })}</div>`);
    return `<div class="cols n${html.length}">\n    ${html.join("\n    ")}\n  </div>`;
  }
  if (kind === "diagram") {
    const m = info.match(/^(fig-[\w-]+)(?:\s*\|\s*(.*))?$/);
    const id = m ? m[1] : "";
    if (id) CUR.ids.add(id);
    const cap = m && m[2] ? m[2] : "";
    const pre = `<div class="diagram"${cap ? "" : id ? ` id="${id}"` : ""}>${esc(buf.join("\n"))}</div>`;
    if (!cap) return pre;
    return `<figure class="keep" id="${id}">\n  ${pre}\n  ${captionHtml(cap)}\n  </figure>`;
  }
  if (kind === "quiz") return renderQuiz(buf);
  return `<pre>${esc(buf.join("\n"))}</pre>`;
}

/* Otázky na zopakovanie (CLAUDE.md §2.2): ```quiz  ? otázka  = odpoveď (môže mať viac riadkov)```
   → rozbaľovacie <details>; odpoveď sa ukáže až na klik (aktívne vybavovanie, nie čítanie). */
function renderQuiz(buf) {
  const qs = [];
  buf.forEach((ln) => {
    const t = ln.trim();
    if (!t) return;
    if (/^\?\s/.test(t)) qs.push({ q: t.slice(2).trim(), a: [] });
    else if (qs.length && /^=\s/.test(t)) qs[qs.length - 1].a.push(t.slice(2).trim());
    else if (qs.length && qs[qs.length - 1].a.length) qs[qs.length - 1].a.push(t);
    else CUR.warn.push(`quiz: riadok mimo otázky/odpovede: „${t.slice(0, 40)}“`);
  });
  qs.forEach((x) => { if (!x.a.length) CUR.warn.push(`quiz: otázka bez odpovede: „${x.q.slice(0, 40)}“`); });
  CUR.quiz = (CUR.quiz || 0) + qs.length;
  return `<ol class="quiz">\n    ${qs.map((x) => `<li><details><summary>${inl(x.q)}</summary><div class="ans">${inl(x.a.join(" "))}</div></details></li>`).join("\n    ")}\n  </ol>`;
}

function captionHtml(alt) {
  // tučný titulok = text po prvú bodku nasledujúcu za pomlčkou
  let t = alt, rest = "";
  const m = alt.match(/^(.*? — .*?\.)\s+(.*)$/);
  if (m) { t = m[1]; rest = m[2]; }
  return `<figcaption><b>${inl(t)}</b>${rest ? " " + inl(rest) : ""}</figcaption>`;
}

function stripSvgStyle(svg) {
  return svg.replace(/<style data-standalone(?:="1")?>[\s\S]*?<\/style>\s*/, "");
}

function renderSvgFigure(alt, name) {
  const p = path.join(FIG, name + ".svg");
  if (!fs.existsSync(p)) { CUR.warn.push(`chýba obrázok chapters/fig/${name}.svg`); return `<!-- chýba ${name}.svg -->`; }
  CUR.ids.add(name);
  CUR.figs = (CUR.figs || 0) + 1;
  const raw = stripSvgStyle(read(p)).trim();
  // značky schémy (<mol>, <rx>, <vplyv>…) → čisté SVG; obyčajné SVG prejde bez zmeny; čo nesedí, ide do upozornení
  if (!schema || !SCHEMA_TAGS.test(raw)) {
    return `<figure class="chart keep" id="${name}">\n    ${raw}\n    ${captionHtml(alt)}\n  </figure>`;
  }
  const ex = schema.expand(raw, name);
  ex.warn.forEach((w) => CUR.warn.push(`${name}.svg: ${w}`));
  // rozkliknutie (§5.2, bod 7) – lišta pod schémou, ak má výrezy alebo odkazy na podrobnú schému
  let bar = "";
  if (ex.panels || ex.links) {
    CUR.rk = (CUR.rk || 0) + ex.panels;
    CUR.rkFigs = (CUR.rkFigs || 0) + 1;
    bar = `\n    <div class="rk-bar">` +
      (ex.panels ? `<button type="button" class="rk-all" aria-pressed="false">+ Rozbaliť všetky podrobnosti (${ex.panels})</button><span><i>+</i> v schéme rozbalí jednu časť</span>` : "") +
      (ex.links ? `<span><i class="l">→</i> skočí na podrobnú schému</span>` : "") + `</div>`;
  }
  return `<figure class="chart keep" id="${name}">\n    ${ex.svg}${bar}\n    ${captionHtml(alt)}\n  </figure>`;
}

function renderKeypoints(items) {
  return (
    `<div class="keep" style="padding:10px 12px;background:var(--color-accent-100);border-top:2px solid var(--color-accent);margin:16px 0 14px">\n` +
    `  <div style="font-size:calc(10px*var(--z,1));letter-spacing:0.12em;text-transform:uppercase;color:var(--color-accent-800);margin-bottom:5px">${CUR.secNum} · Kľúčové body</div>\n` +
    `  <ol style="column-count:2;column-gap:22px;font-size:calc(12px*var(--z,1));line-height:1.38;color:var(--color-accent-900);padding-left:16px">\n` +
    items.map((t) => `    <li>${inl(t)}</li>`).join("\n") +
    `\n  </ol>\n</div>`
  );
}

function renderAlert(buf, ctx) {
  let kind = "plain", label = "";
  const m = (buf[0] || "").match(/^\[!(\w+)\]\s*$/);
  const box = m && BOXES[m[1]];
  if (m && !box && !ALERTS[m[1]]) CUR.warn.push(`box „${m[1]}“ v sekcii ${CUR.secNum} nepatrí do sady tejto knihy (book.json → boxes) – vykreslí sa ako obyčajná poznámka`);
  if (m) { kind = ALERTS[m[1]] || "note"; buf = buf.slice(1); }
  // prvý riadok len tučný = štítok
  if (buf.length && /^\*\*[^*]+\*\*\s*$/.test(buf[0])) {
    label = buf[0].replace(/\*\*/g, "").trim();
    buf = buf.slice(1);
  }
  const inner = parseBlocks(buf, { noTableId: true });
  // prázdny box = rozbitý zápis (napr. riadok „>>>“ zo zvyšku dávkovej úpravy); na okraji by ho site.js odsunul mimo stránky
  if (!/<(img|svg|figure)\b/.test(inner) && !inner.replace(/<[^>]+>/g, "").trim())
    CUR.err.push(`prázdny box${m ? " „" + m[1] + "“" : " (citácia „>“)"} v sekcii ${CUR.secNum || "?"} – rozbitý zápis v .md (vnorené „>“, zvyšok úpravy?)`);
  if (box) {
    if (m[1] === "KLINIKA") CUR.bridges++;
    if (m[1] === "POCUT") CUR.pocut = (CUR.pocut || 0) + 1;
    // doplnkové boxy plávajú na širokej obrazovke do pravého okraja (site.js: .box.aside) – pravidlo pri ASIDE_ALWAYS
    const words = (inner.replace(/<[^>]+>/g, " ").match(/\S+/g) || []).length;
    const wide = /<table|<figure/.test(inner);
    const always = ASIDE_ALWAYS.has(m[1]);
    const aside = !wide && (always || (ASIDE_SHORT.has(m[1]) && words <= ASIDE_MAX_WORDS));
    if (wide && always) CUR.warn.push(`${m[1]} v sekcii ${CUR.secNum} obsahuje tabuľku alebo obrázok – do okraja sa nezmestí, daj ich do textu (§5.3)`);
    if (m[1] === "JADRO") {
      CUR.jadra.add(CUR.secNum);
      if (words > JADRO_MAX_WORDS) CUR.warn.push(`Jadro sekcie ${CUR.secNum} má ${words} slov – má byť heslovité, najviac ${JADRO_MAX_WORDS} (§2.0, bod 5)`);
    }
    if (aside) CUR.asides = (CUR.asides || 0) + 1;
    return `<div class="box ${box[0]}${aside ? " aside" : ""} keep">\n    <div class="label">${inl(label || box[1])}</div>\n    <div class="body">\n      ${inner.replace(/\n\n  /g, "\n      ")}\n    </div>\n  </div>`;
  }
  if (kind === "rev") {
    label = label.replace(/^\[R\]\s*/, "");
    if (!/^Revízia/.test(label)) label = "Revízia — " + label;
    CUR.revs++;
    return `<div class="rev keep">\n    <div class="label"><span class="r">R</span>${inl(label)}</div>\n    <div class="body">\n      ${inner.replace(/\n\n  /g, "\n      ")}\n    </div>\n  </div>`;
  }
  if (kind === "flag") CUR.bridges++;
  const lab = label ? `<div class="label">${inl(label)}</div>\n    ` : "";
  return `<div class="${kind} keep">\n    ${lab}<div class="body">\n      ${inner.replace(/\n\n  /g, "\n      ")}\n    </div>\n  </div>`;
}

/* ── zvyšky úprav v .md ───────────────────────────────────────────────────────
   Riadky, ktoré v kapitole nikdy nemajú byť: značky dávkových úprav (<<< === >>>), konfliktné značky gitu
   (<<<<<<< ======= >>>>>>>) a vnorená citácia („> >“, „>>“) – formát kníh ju nepoužíva. Do HTML by prešli
   ako prázdne vnorené boxy, ktoré na okraji vytlačia stránku do strany a pridajú bielu plochu dole
   (chyba kap. 9 BIOCHEM, 30. 10. 2026). Je to chyba, nie upozornenie: build skončí kódom 1 a publish.ps1 nič neuloží. */
function strayMarkers(lines, off = 0) {
  const out = [];
  let fence = false;
  lines.forEach((l, i) => {
    if (/^```/.test(l)) { fence = !fence; return; }
    if (fence) return;
    if (/^\s*(<{3,}|={3,}|>{3,})\s*$/.test(l) || /^(<{7}|={7}|>{7})(\s|$)/.test(l))
      out.push(`riadok ${i + 1 + off} .md: „${l.trim()}“ – zvyšok dávkovej úpravy alebo konfliktu, oprav ručne`);
    else if (/^\s*>\s*>/.test(l))
      out.push(`riadok ${i + 1 + off} .md: vnorená citácia „${l.trim().slice(0, 40)}“ – formát ju nepozná (vznikne prázdny box)`);
  });
  return out;
}

/* ── kapitola ────────────────────────────────────────────────────────────── */
function stem(file) { return path.basename(file).replace(/\.md$/, ""); }

function renderChapter(file) {
  const src = read(file);
  const fm = parseFront(src);
  if (!fm) return null;
  const meta = fm.meta;
  const num = meta.num;
  CUR = { num, ids: new Set(), localRefs: [], xrefs: 0, tabs: 0, revs: 0, bridges: 0, warn: [], err: [], secNum: "", jadra: new Set(), abbr: new Set(), abbrNotes: 0 };

  const lines = fm.body.split("\n");
  CUR.err.push(...strayMarkers(lines, src.replace(/\r/g, "").split("\n").length - lines.length));
  // všetko pred prvým „## “ je len pracovná hlavička .md
  let start = lines.findIndex((l) => /^## /.test(l));
  if (start < 0) start = lines.length;
  const secs = [];
  let cur = null;
  for (let i = start; i < lines.length; i++) {
    const h = lines[i].match(/^(#{2,3})\s+(\S+)\s+(.*)$/);
    if (h && h[1] === "##") {
      cur = { num: h[2], title: stripMarks(h[3]), lines: [] };
      secs.push(cur);
    } else if (cur) cur.lines.push(lines[i]);
  }

  const contents = [];
  const sectionsHtml = secs.map((sec) => {
    const sid = "sec-" + idOf(sec.num);
    CUR.ids.add(sid);
    CUR.secNum = sec.num;
    const isSrc = /^Zdroje/i.test(sec.title);
    const isQuiz = /^Otázky/i.test(sec.title);
    const isKaz = /kazuistik/i.test(sec.title);
    const isKey = /kľúčové body/i.test(sec.title);
    const short = sec.title.split(" — ")[0];
    contents.push(`  <a class="row" href="#${sid}"><span>${sec.num}</span><span>${inl(short)}</span></a>`);

    // rozdeľ na úvod a podsekcie (###)
    const chunks = [];
    let c = { head: null, lines: [] };
    sec.lines.forEach((ln) => {
      const h3 = ln.match(/^###\s+(\S+)\s+(.*)$/);
      if (h3) { chunks.push(c); c = { head: { num: h3[1], title: stripMarks(h3[2]) }, lines: [] }; }
      else c.lines.push(ln);
    });
    chunks.push(c);

    let words = 0, visuals = 0;
    const parts = chunks.map((ch) => {
      let h = "";
      if (ch.head) {
        const last = ch.head.num.split(".").pop();
        const id = isKaz ? `kaz-${num}-${last}` : "sub-" + idOf(ch.head.num);
        CUR.ids.add(id);
        h = `<h3 class="sub-h" id="${id}"><span class="n">${ch.head.num}</span>${inl(ch.head.title)}</h3>\n  `;
      }
      const blocks = parseBlocks(ch.lines, { src: isSrc, keypoints: isKey, raw: true });
      const html = blocks.join("\n\n  ");
      // popisky vo vnútri SVG schém nie sú súvislý text — do rozsahu kapitoly (CLAUDE.md §1.2) sa nerátajú
      const plain = html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ");
      if (!isSrc && !isQuiz) words += (plain.match(/\S+/g) || []).length;
      visuals += (html.match(/class="(diagram|chain|fork|cols[^"]*)"|<figure|<table/g) || []).length;
      if (isSrc || isQuiz) return h + html;
      // skratky: vysvetlenie na okraji hneď za blokom, v ktorom sa skratka v kapitole objaví prvý raz (do rozsahu sa neráta)
      // (Jadro sa nepočíta – vysvetlenie má stáť pri mieste, kde skratku zavedie samotný výklad)
      return h + blocks.map((b) => { const n = /^<div class="box k-jadro/.test(b) ? "" : abbrNote(b); return n ? b + "\n\n  " + n : b; }).join("\n\n  ");
    });
    sec.words = words;
    sec.visuals = visuals;
    sec.isSrc = isSrc;
    sec.isQuiz = isQuiz;
    sec.isSum = /^Súhrn/i.test(sec.title);
    if (isSrc) sec.raw = sec.lines.join("\n");
    return (
      `<!-- ══ ${sec.num} ${"═".repeat(60)} -->\n` +
      `<h2 class="sec-h" id="${sid}"><span class="n">${sec.num}</span><span>${inl(sec.title)}</span></h2>\n` +
      `<div class="sec-body${isSrc ? " src" : ""}">\n  ${parts.join("\n\n  ")}\n</div>`
    );
  });

  return { file, stem: stem(file), meta, secs, contents, sectionsHtml, cur: CUR, body: fm.body };
}

/* ── odkazy medzi kapitolami ─────────────────────────────────────────────── */
function resolveXrefs(html, selfStem, warn) {
  return html.replace(/\u0001([^\u0002]+)\u0002([^\u0003]*)\u0003/g, (_, url, text) => {
    const [st, anchor] = url.split("#");
    const ids = registry[st];
    if (ids && (!anchor || ids.has(anchor))) {
      return `<a class="xref" href="${st}.html${anchor ? "#" + anchor : ""}">${text}</a>`;
    }
    if (ids && anchor && !ids.has(anchor)) warn.push(`odkaz na neexistujúcu kotvu: ${url}`);
    return `<span class="xref-soon" title="Kapitola sa pripravuje">${text}</span>`;
  });
}

/* Odkazy na obrázky v texte (od 13. 10. 2026): každé „Obr. N.k“ v bežnom texte kapitoly sa stane odkazom
   `a.figref`, ktorý sa podľa čísla v titulku nájde v tej istej kapitole. Kliknutie ho v glossary.js rozbalí
   priamo pod odsekom (a v rozbalenom obrázku sa dá otvoriť lupa); bez skriptu odkaz skočí na obrázok.
   Netýka sa titulkov, nadpisov, odkazov, kódu ani samotných schém. */
function linkFigRefs(html) {
  const byNum = {};
  html.replace(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/g, (_, attrs, inner) => {
    const id = (attrs.match(/\bid="([^"]+)"/) || [])[1];
    const num = (inner.match(/<figcaption><b>(?:Obr\.|Schéma|Graf)\s+(\d+\.\d+)/) || [])[1];
    if (id && num && !byNum[num]) byNum[num] = id;
    return "";
  });
  if (!Object.keys(byNum).length) return html;
  const SKIP = new Set(["a", "figcaption", "h1", "h2", "h3", "h4", "h5", "h6", "code", "script", "style", "svg", "button", "title", "head", "summary"]);
  const VOID = /^(br|img|hr|meta|link|input|path|rect|circle|line)$/;
  const stack = [];
  let inBody = false;
  const out = html.split(/(<[^>]+>)/).map((tok) => {
    if (tok[0] === "<") {
      const m = tok.match(/^<(\/?)([a-zA-Z0-9]+)/);
      if (!m) return tok;
      const name = m[2].toLowerCase();
      if (name === "body" && !m[1]) inBody = true;
      if (/\/>$/.test(tok) || VOID.test(name)) return tok;
      if (m[1]) { const i = stack.lastIndexOf(name); if (i >= 0) stack.length = i; }
      else if (SKIP.has(name)) stack.push(name);
      return tok;
    }
    if (!inBody || stack.length || !tok.includes("Obr. ")) return tok;
    return tok.replace(/Obr\. (\d+\.\d+)((?:\s+a\s+\d+\.\d+)*)/g, (all, first, more) => {
      const link = (num, label) => byNum[num]
        ? `<a class="figref" href="#${byNum[num]}" data-fig="${byNum[num]}">${label}</a>` : label;
      const rest = more.replace(/(\s+a\s+)(\d+\.\d+)/g, (_, sep, num) => sep + link(num, num));
      return link(first, "Obr. " + first) + rest;
    });
  });
  return out.join("");
}

function glossaryScripts() {
  if (!HAS_GLOSS) return "";
  return fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f)).sort()
    .map((f) => `<script src="../assets/glossary/${f}" defer></script>`).join("\n");
}

/* Pole `reviewed:` vo front matter = kto kapitolu vecne skontroloval a kedy (CLAUDE.md §1.3).
   Prázdne → čitateľ vidí, že kontrola ešte neprebehla. */
function reviewedHtml(m) {
  const who = (m.reviewed || "").trim();
  const report = ISSUES_URL
    ? ` · <a href="${escAttr(ISSUES_URL)}?title=${encodeURIComponent("Kap. " + m.num + ": ")}" target="_blank" rel="noopener noreferrer">Nahlásiť chybu</a>`
    : "";
  return `<p class="reviewed"><b>Odborná kontrola:</b> ${who && who !== "—" ? inl(who) : "zatiaľ neprebehla — fakty sú overené len podľa zdrojov uvedených na konci kapitoly"}${report}</p>`;
}

/* Odhad času na kapitolu (8. 10. 2026, na pokyn autora). Dve čísla pre študenta, ktorý látku ešte nepozná:
   „prejsť“ = prvé prečítanie s porozumením (text + prezretie schém), „naučiť sa“ = naučiť sa to na skúšku od nuly
   (druhé čítanie s poznámkami, kreslenie dráh z pamäti, otázky na zopakovanie). Je to ORIENTAČNÝ ODHAD z rozsahu
   kapitoly, nie meranie – konštanty nižšie sú predpoklad autora a menia sa na jednom mieste. Skutočný čas, ak ho
   niekto zmeria, sa dá zapísať do front matter (`cas_citanie: 90`, `cas_ucenie: 260`, v minútach) a prebije výpočet. */
const CAS = {
  slovaZaMin: 100,    // slov za minútu pri prvom čítaní hustého odborného textu, ktorému čitateľ ešte nerozumie
  schemaMin: 1.5,     // minút na prezretie jednej schémy
  vyrezMin: 0.5,      // minút na jeden rozklikávací výrez
  nasobokUcenia: 2.5, // naučiť sa = násobok prvého čítania (druhé čítanie, poznámky, kreslenie z pamäti)
  otazkaMin: 5,       // minút na jednu otázku na zopakovanie (skúsiť si odpoveď, porovnať, vrátiť sa do textu)
};
function fmtMin(min) {
  const m = Math.max(5, Math.round(min / 5) * 5);
  const h = Math.floor(m / 60), r = m % 60;
  return h ? (r ? `${h} h ${r} min` : `${h} h`) : `${r} min`;
}
function timeEstimate(ch) {
  const words = ch.secs.filter((s) => !s.isSrc && !s.isQuiz).reduce((a, s) => a + s.words, 0);
  const c = ch.cur;
  const num = (v) => (/^\d+$/.test(v || "") ? parseInt(v, 10) : null);
  const first = words / CAS.slovaZaMin + (c.figs || 0) * CAS.schemaMin + (c.rk || 0) * CAS.vyrezMin;
  const read = num(ch.meta.cas_citanie) ?? first;
  const learn = num(ch.meta.cas_ucenie) ?? first * CAS.nasobokUcenia + (c.quiz || 0) * CAS.otazkaMin;
  return { read, learn, readTxt: fmtMin(read), learnTxt: fmtMin(learn), words, measured: num(ch.meta.cas_citanie) !== null || num(ch.meta.cas_ucenie) !== null };
}
function timeHtml(ch) {
  const t = timeEstimate(ch);
  const clock = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const how = t.measured
    ? "Čas zapísal autor podľa skutočného prechodu kapitolou."
    : `Orientačný odhad z rozsahu kapitoly (${t.words.toLocaleString("sk-SK").replace(/ /g, " ")} slov, ${ch.cur.figs || 0} schém, ${ch.cur.quiz || 0} otázok), nie meranie. ` +
      `<b>Prejsť</b> = prvé prečítanie s porozumením (≈ ${CAS.slovaZaMin} slov za minútu, schéma ≈ ${CAS.schemaMin.toString().replace(".", ",")} min). ` +
      `<b>Naučiť sa</b> = prvé čítanie ×${CAS.nasobokUcenia.toString().replace(".", ",")} (druhé čítanie s poznámkami, kreslenie dráh z pamäti) plus ${CAS.otazkaMin} min na každú otázku na zopakovanie. ` +
      "Platí pre študenta, ktorý látku ešte nepozná; rozlož to na viac dní, Anki karty sú navyše.";
  return `<details class="cas"><summary>${clock}<span><b>Prejsť</b> ≈ ${t.readTxt}</span><i aria-hidden="true">·</i><span><b>Naučiť sa</b> ≈ ${t.learnTxt}</span><em>${t.measured ? "zmerané" : "odhad"}</em></summary><p>${how}</p></details>`;
}

function assemble(ch, css) {
  const m = ch.meta;
  const links = (s) => (s || "").split(/\s+·\s+/).filter(Boolean).map((x) => inl(x)).join(" ·\n  ");
  const numHtml = ["paper", "plate plate-c", "plate plate-m", "plate plate-y"]
    .map((c, i) => `<span class="${c}"${i ? ' aria-hidden="true"' : ""}>${esc(m.num)}</span>`).join("\n    ");
  const firstSec = "sec-" + idOf(ch.secs[0].num);
  const lastSec = ch.secs[ch.secs.length - 1].num;
  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.num)} · ${esc(m.title)}</title>
<script>/* stránka v náhľade (assets/js/peek.js) — skryť hlavičku skôr, než sa vykreslí */if(/[?&]embed=/.test(location.search))document.documentElement.classList.add("pk-embed")</script>
<script>/* pri F5/Späť ukázať stránku až na obnovenej pozícii (peek.js odkryje; poistka 2 s) */(function(){try{var h=document.documentElement,n=performance.getEntriesByType("navigation")[0],t=n&&n.type,s=location.search;if(/[?&]y=[1-9]/.test(s)||(!/[?&]embed=/.test(s)&&(t==="reload"||t==="back_forward")&&parseInt(sessionStorage.getItem("pk-y:"+location.pathname),10)>0)){h.classList.add("pk-restoring");setTimeout(function(){h.classList.remove("pk-restoring")},2000)}}catch(e){}})()</script>
<script>/* úvodné načítanie (assets/js/peek.js): pf-intro vždy (okrem náhľadu, maximalizácie z náhľadu ?ni=1 a zníženého pohybu); pf-mid, keď sa kapitola otvára uprostred (F5/Späť na uloženej pozícii, ?y=, odkaz na sekciu) */(function(){try{var h=document.documentElement,s=location.search,n=performance.getEntriesByType("navigation")[0],t=n&&n.type;if(/[?&](embed|ni)=/.test(s)||(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;h.classList.add("pf-intro");if(/[?&]y=[1-9]/.test(s)||location.hash.length>1||((t==="reload"||t==="back_forward")&&parseInt(sessionStorage.getItem("pk-y:"+location.pathname),10)>0))h.classList.add("pf-mid");setTimeout(function(){h.classList.remove("pf-intro","pf-hero","pf-go","pf-mid")},8000)}catch(e){}})()</script>
<script>/* skrytý bočný obsah (assets/js/toc-collapse.js) — zapnúť pred vykreslením, nech stránka neblikne */try{if(localStorage.getItem("pf-toc-collapsed")==="1")document.documentElement.classList.add("toc-collapsed")}catch(e){}</script>
${VIEW_EARLY}
<link rel="stylesheet" href="../assets/fonts/fonts.css">
<link rel="stylesheet" href="../assets/styles/site.css">
${HAS_GLOSS ? '<link rel="stylesheet" href="../assets/styles/glossary.css">\n' : ""}<link rel="stylesheet" href="../assets/styles/view-toggle.css">
<style>
${css}
</style>
<link rel="stylesheet" href="../assets/styles/palette.css">
<link rel="manifest" href="../manifest.json">
<meta name="theme-color" content="${BOOK.themeColor}">
<meta name="pf-book" content="${BOOK.slug}">
<meta name="pf-subject" content="${escAttr(BOOK.subject)}">
<meta name="pf-admin-port" content="${BOOK.adminPort}">
<link rel="icon" href="../assets/img/icon-32.png">
<link rel="apple-touch-icon" href="../assets/img/icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${escAttr(BRAND)}">
<script src="../assets/js/pwa.js" defer></script>
</head>
<body>
<!-- Súbor je GENEROVANÝ z ${path.basename(ch.file)} nástrojom tools/build.js — uprav .md, nie tento súbor. -->
<a class="skip-link" href="#${firstSec}">Preskočiť na obsah</a>
<header class="site-header">
  <a class="brand" href="../index.html"><span class="mark" aria-hidden="true"></span>${BRAND}</a>
  <span class="crumb">${esc(m.part)} — <b>${esc(m.crumb)}</b></span>
  <span class="spacer"></span>
  <button class="site-toc-toggle" type="button" aria-label="Obsah kapitoly" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
  </button>
</header>

<div class="reading-progress" role="progressbar" aria-label="Priebeh čítania kapitoly" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bar"></div></div>
<div class="reading-pct" aria-hidden="true">0 %</div>

<button class="toc-expand" type="button" aria-label="Zobraziť obsah kapitoly" title="Zobraziť obsah">→</button>
<div class="site-shell">
  <aside class="site-sidebar">
    <div class="toc-title"><span>Obsah kapitoly</span><button class="toc-collapse" type="button" aria-label="Skryť obsah kapitoly" title="Skryť obsah">←</button></div>
    <nav></nav>
  </aside>

  <div class="site-main">
<main class="page">

<div class="chapter-hero">
<div class="running-head">
  <span>${esc(m.num)} · ${esc(m.title)}</span>
  <span style="color:var(--color-accent-700)">${esc(m.part)}</span>
</div>

<div class="opener">
  <div class="cmyk-num num">
    ${numHtml}
  </div>
  <div style="padding-top:2px">
    <div class="eyebrow">${esc(m.eyebrow)}</div>
    <h1>${esc(m.title)}</h1>
    <p class="standfirst">${inl(m.standfirst)}</p>
    ${timeHtml(ch)}
  </div>
</div>
</div>

<p class="deps"><b>Predpoklady:</b>
  ${links(m.deps)}
</p>
${reviewedHtml(m)}

<div class="contents keep">
  <div class="label">V tejto kapitole</div>
${ch.contents.join("\n")}
</div>

${ch.sectionsHtml.join("\n\n")}

<p class="next"><b>Pokračuje v:</b>
  ${links(m.next)}
</p>

<div class="running-foot">
  <span>${BRAND} — ${BOOK.footer} · Kapitola ${esc(m.num)}</span>
  <span class="tnum">§ ${ch.secs[0].num}–${lastSec}</span>
</div>

</main>
  </div>
  <div class="site-spacer" aria-hidden="true"></div>
</div>

<script src="../assets/js/site.js" defer></script>
<script src="../assets/js/peek.js" defer></script>
<script src="../assets/js/toc-collapse.js" defer></script>
${ch.cur.rkFigs ? '<script src="../assets/js/schema.js" defer></script>\n' : ""}<script>
/* tlač kapitoly otvorenej v ráme hlavnej stránky (index.html).
   Rodič pošle "pf:print"; Ctrl/Cmd+P vo vnútri rámu tlačí rám, nie obsah knihy. */
(function(){
  var imgs = function(){ return Array.prototype.slice.call(document.querySelectorAll('img[loading="lazy"]')); };
  // lenivé obrázky sa po načítaní stránky dotiahnu na pozadí, aby v tlači neboli prázdne
  window.addEventListener("load", function(){ setTimeout(function(){ imgs().forEach(function(i){ i.loading = "eager"; }); }, 800); });
  // v tlači sú odpovede na otázky vidieť (zatvorený <details> by sa vytlačil bez nich)
  var shut = [];
  // predvolený názov súboru pri tlači = kapitola („Kapitola 3 – Zápal …“); title sa po tlači vráti
  // (po maximalizovanom náhľade je v document.title už iná kapitola, preto sa číta až teraz)
  var keep = null;
  function printTitle(){ return document.title.replace(/^(\\d+) · /, "Kapitola $1 – "); }
  function titleOn(){ if (keep === null) { keep = document.title; document.title = printTitle(); } }
  function titleOff(){ if (keep !== null) { document.title = keep; keep = null; } }
  window.addEventListener("beforeprint", function(){ titleOn(); shut = Array.prototype.filter.call(document.querySelectorAll("ol.quiz details"), function(d){ return !d.open; }); shut.forEach(function(d){ d.open = true; }); });
  window.addEventListener("afterprint", function(){ titleOff(); shut.forEach(function(d){ d.open = false; }); shut = []; });
  if (window.top === window.self) return;
  // v ráme berie prehliadač názov súboru z hlavnej stránky → pošli jej názov kapitoly
  window.addEventListener("afterprint", function(){ try { window.parent.postMessage({ pf: "title", title: null }, "*"); } catch (e) {} });
  function printMe(){
    var all = Array.prototype.slice.call(document.images);
    all.forEach(function(i){ i.loading = "eager"; });
    try { window.parent.postMessage({ pf: "title", title: printTitle() }, "*"); } catch (e) {}
    var t0 = Date.now();
    (function wait(){
      if (Date.now() - t0 > 150 && (all.every(function(i){ return i.complete; }) || Date.now() - t0 > 4000)) { try { window.focus(); window.print(); } catch (e) {} }
      else setTimeout(wait, 100);
    })();
  }
  window.addEventListener("message", function(e){ if (e.data === "pf:print") printMe(); });
  document.addEventListener("keydown", function(e){
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "p" || e.key === "P")) { e.preventDefault(); printMe(); }
  });
})();
</script>
${HAS_GLOSS ? glossaryScripts() + '\n<script src="../assets/js/pf-match.js" defer></script>\n<script src="../assets/js/glossary.js" defer></script>\n' : ""}<script src="../assets/js/view-toggle.js" defer></script>
</body>
</html>
`;
}

/* ── samostatné SVG ─────────────────────────────────────────────────────────
   Schéma kapitoly (chapters/fig/*.svg) sa v kapitole vkladá do HTML a farby i písmo jej dávajú triedy `.chart …`
   zo štýlu kapitoly. Ako <img> (vysvetlivka glosára, lupa z vysvetlivky, náhľad .md) tie štýly nevidí a kreslí sa
   ČIERNA (pripomienka autora 1. 11. 2026, PATOLA kap. 10). Build preto do každého súboru vloží <style data-standalone>
   so všetkými pravidlami `.chart …` a farbami knihy (chapter.css + chapter-extra.css + palette.css). Pri vkladaní do
   kapitoly sa tento štýl odstraňuje (stripSvgStyle), takže v texte platí štýl kapitoly ako doteraz. */
function standaloneCss() {
  const srcs = [path.join(__dirname, "chapter.css"), path.join(__dirname, "chapter-extra.css"), path.join(ROOT, "assets", "styles", "palette.css")];
  const vars = [], rules = [];
  for (const f of srcs) {
    if (!fs.existsSync(f)) continue;
    let css = read(f).replace(/\/\*[\s\S]*?\*\//g, "");
    // vyhoď @-bloky (média, tlač, písma) – v samostatnom obrázku neplatia
    let out = "", i = 0;
    while (i < css.length) {
      const at = css.indexOf("@", i);
      if (at < 0) { out += css.slice(i); break; }
      out += css.slice(i, at);
      const br = css.indexOf("{", at), semi = css.indexOf(";", at);
      if (semi >= 0 && (br < 0 || semi < br)) { i = semi + 1; continue; }
      let d = 0, j = br;
      for (; j < css.length; j++) { if (css[j] === "{") d++; else if (css[j] === "}" && --d === 0) break; }
      i = j + 1;
    }
    for (const m of out.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const sel = m[1].trim(), body = m[2].trim();
      if (sel === ":root") { body.split(";").map((x) => x.trim()).filter((x) => x.startsWith("--")).forEach((x) => vars.push(x)); continue; }
      const parts = sel.split(",").map((x) => x.trim());
      if (!parts.every((x) => /^\.chart(\s|$)/.test(x))) continue;
      if (parts.some((x) => /figcaption|button|rk-bar/.test(x))) continue;
      const ns = parts.map((x) => x === ".chart" || x === ".chart svg" ? "svg" : x.replace(/^\.chart\s+(svg\s+)?/, "")).join(",");
      rules.push(`${ns}{${body}}`);
    }
  }
  return `svg{${vars.join(";")};font-family:"Source Serif 4",Georgia,serif}` + "\n" + rules.join("\n");
}
function syncStandaloneStyle() {
  if (!fs.existsSync(FIG)) return;
  const css = standaloneCss();
  fs.readdirSync(FIG).filter((f) => f.endsWith(".svg")).forEach((f) => {
    const p = path.join(FIG, f);
    const old = read(p);
    let s = stripSvgStyle(old);
    s = s.replace(/(<svg\b[^>]*>)/, `$1\n<style data-standalone="1">\n${css}\n</style>`);
    if (!/xmlns=/.test(s)) s = s.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
    if (s !== old) write(p, s);
  });
}

/* ── hlavný beh ──────────────────────────────────────────────────────────── */
/* ── text kapitol po sekciách: index na vyhľadávanie (assets/search-index.js) a
      „V knihe: → sekcia“ vo vysvetlivkách (assets/glossary/98-kde.js) ─────────────── */
function plainMd(s) {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\{\{i:[^}]+\}\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^>\s*\[![A-Z]+\]\s*$/gm, " ")
    .replace(/^>\s?/gm, "")
    .replace(/`\[(P|S|\+|R)\]`/g, "")
    .replace(/\*\*|__|\*|`|^#+\s*|^\s*[-*]\s+|\|/gm, " ")
    .replace(/^```.*$/gm, " ")
    .replace(/^[\s|:-]+$/gm, " ")
    .replace(/[ \t]+/g, " ");
}
function chapterSections() {
  const out = [];
  fs.readdirSync(CH).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort().forEach((f) => {
    const src = read(path.join(CH, f));
    const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
    const meta = {};
    if (fm) fm[1].split("\n").forEach((l) => { const m = l.match(/^(\w+):\s*(.*)$/); if (m) meta[m[1]] = m[2]; });
    const body = fm ? src.slice(fm[0].length) : src;
    let cur = null;
    body.split("\n").forEach((line) => {
      const h = line.match(/^(##|###)\s+(\d+[a-z]?(?:\.\d+)+)\s+(.+)$/);
      if (h) {
        const num = h[2];
        const id = (h[1] === "##" ? "sec-" : "sub-") + idOf(num);
        cur = { f: f.replace(/\.md$/, ""), c: (meta.num || "") + " · " + (meta.title || ""), s: id, t: num + " " + h[3].trim(), raw: [] };
        out.push(cur);
        return;
      }
      if (cur) cur.raw.push(line);
    });
  });
  out.forEach((s) => { s.md = s.raw.join("\n"); delete s.raw; });
  return out.filter((s) => !/Zdroje|Otázky na zopakovanie/.test(s.t));
}
/* Heslá glosára (vysvetlivky) tak, ako ich načíta prehliadač; 97–99 sú generované súbory a skupiny. */
function loadGlossary() {
  if (!HAS_GLOSS) return [];
  const files = fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f) && !/^9[789]-/.test(f)).sort();
  const win = {};
  try { new Function("window", files.map((f) => read(path.join(GLOS, f))).join("\n;\n"))(win); }
  catch (e) { console.log("  ⚠ glosár sa nedal načítať: " + e.message); return []; }
  return win.PF_GLOSSARY || [];
}
/* Chyby glosára, ktoré prehliadač neohlási – heslo len potichu nefunguje alebo ho prekryje iné:
   - to isté `id` v dvoch heslách (engine si pamätá posledné, vzory prvého ukazujú na iné okno),
   - vzor s jednou spätnou lomkou ("bacil\w*" je v JS reťazci "bacilw*", "\b" je znak backspace),
   - vzor, ktorý nie je platný regulárny výraz (zhodí celý glosár na stránke). */
function glossaryProblems() {
  if (!HAS_GLOSS) return [];
  const out = [], seen = {};
  const files = fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f) && !/^9[789]-/.test(f)).sort();
  files.forEach((f) => {
    const src = read(path.join(GLOS, f));
    src.split("\n").forEach((l, i) => {
      if (/\b(?:cs)?[mM]atch\s*:/.test(l) && /\\[wbsdWBSD.()[\]+*?]/.test(l.replace(/\\\\/g, "")))
        out.push(`glosár ${f}:${i + 1} – vzor s jednou spätnou lomkou (v reťazci treba \\\\w, \\\\b, \\\\.)`);
    });
    const win = {};
    try { new Function("window", src)(win); } catch (e) { out.push(`glosár ${f} sa nedá načítať: ${e.message}`); return; }
    (win.PF_GLOSSARY || []).forEach((t) => {
      if (!t.id) return;
      if (seen[t.id]) out.push(`glosár: heslo „${t.id}“ je dvakrát (${seen[t.id]} a ${f}) – zlúč ich do jedného`);
      else seen[t.id] = f;
      [...(t.match || []), ...(t.csMatch || [])].forEach((p) => {
        try { new RegExp(p.replace(/\\w/g, "[\\p{L}\\p{N}]"), "u"); }
        catch (e) { out.push(`glosár ${f}: heslo „${t.id}“ má neplatný vzor ${JSON.stringify(p)}`); }
        // „telomer\w*(?!áz)“: \w* zje celé slovo, vylúčenie za ním už nič nevylúči (poistka 5. 11. 2026) → „telomer(?!áz)\w*“
        if (/\\w[*+]\(\?[!=][\p{L}]/u.test(p))
          out.push(`glosár ${f}: heslo „${t.id}“ – vo vzore ${JSON.stringify(p)} stojí (?!…) za \\w*, takže nič nevylúči; daj ho pred \\w*`);
      });
      // obrázok vo vysvetlivke: musí existovať; SVG s triedami bez vlastného <style> sa ako <img> nakreslí čierne
      // (pripomienka autora 1. 11. 2026) – schémy kapitol ho dostávajú od buildu (syncStandaloneStyle)
      [].concat(t.img || []).forEach((im) => {
        const src = im && (im.src || im);
        if (typeof src !== "string") return;
        const p = path.join(ROOT, src);
        if (!fs.existsSync(p)) { out.push(`glosár ${f}: heslo „${t.id}“ – obrázok ${src} neexistuje`); return; }
        if (/\.svg$/i.test(src) && !src.startsWith("chapters/fig/")) {
          const s = read(p);
          if (/\sclass="/.test(s) && !/<style\b/.test(s)) out.push(`glosár ${f}: heslo „${t.id}“ – ${src} má triedy bez vlastného <style>, ako obrázok bude čierny`);
        }
      });
    });
  });
  return out;
}
/* Index na vyhľadávanie: sekcie kapitol (PF_SEARCH) a vysvetlivky (PF_SEARCH_G – názov, krátky text a text hesla
   bez schém; k = sekcia „V knihe“, kam vedie výsledok na stránke, ktorá glosár nemá). */
function buildSearchIndex(secs, kde) {
  const idx = secs.map((s) => ({ f: s.f, c: s.c, s: s.s, t: s.t, x: plainMd(s.md).replace(/\s+/g, " ").trim() }));
  const txt = (h) => String(h || "")
    .replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const gl = loadGlossary().filter((t) => !t.group && t.id && t.title).map((t) => {
    const x = (txt(t.short) + " " + txt(t.body)).trim();
    const o = { g: t.id, t: txt(t.title), x: x.length > 700 ? x.slice(0, 700) + "…" : x };
    if (kde && kde[t.id]) o.k = kde[t.id][0];
    return o;
  });
  write(path.join(ROOT, "assets", "search-index.js"),
    "/* GENEROVANÉ nástrojom tools/build.js – text kapitol po sekciách a vysvetlivky na vyhľadávanie (site.js). Neupravuj ručne. */\n" +
    "window.PF_SEARCH=" + JSON.stringify(idx) + ";\n" +
    "window.PF_SEARCH_G=" + JSON.stringify(gl) + ";\n");
}
/* Kde sa o pojme v knihe píše: sekcia, v ktorej je pojem TUČNE a spomína sa v nej najčastejšie.
   Heslo s poľom `kde: "subor#kotva"` má prednosť. Skupiny sa vynechávajú. */
function buildGlossaryKde(secs) {
  const D = loadGlossary();
  if (!D.length) return null;
  // rovnaké značkovanie ako v prehliadači (assets/js/pf-match.js; do 5. 11. 2026 tu bol jeden obrovský regex – build 70 s)
  const M = PF_MATCH ? PF_MATCH.build(D) : null;
  if (!M) return null;
  const hits = (text) => M.all(text).filter((h) => !h.rejected)
    .map((h) => ({ id: h.item.term.id, i: h.index, len: h[0].length }));
  const best = {};
  secs.forEach((s, order) => {
    const counts = {};
    hits(plainMd(s.md)).forEach((h) => { counts[h.id] = (counts[h.id] || 0) + 1; });
    const bolds = new Set();
    (s.md.match(/\*\*([^*]+)\*\*/g) || []).forEach((b) => {
      const txt = plainMd(b).trim();
      hits(txt).forEach((h) => { if (h.i === 0) bolds.add(h.id); });
    });
    bolds.forEach((id) => {
      const sc = counts[id] || 1;
      if (!best[id] || sc > best[id].sc) best[id] = { sc, order, href: s.f + ".html#" + s.s, label: s.t };
    });
  });
  const map = {};
  D.forEach((t) => {
    if (t.group) return;
    if (t.kde) {
      const [f, a] = t.kde.split("#");
      const s = secs.find((x) => x.f === f && x.s === a);
      if (s) map[t.id] = [f + ".html#" + a, s.t];
      return;
    }
    if (best[t.id]) map[t.id] = [best[t.id].href, best[t.id].label];
  });
  write(path.join(GLOS, "98-kde.js"),
    "/* GENEROVANÉ nástrojom tools/build.js – kde sa o pojme v knihe píše (glossary.js: riadok „V knihe“). Neupravuj ručne. */\n" +
    "window.PF_GLOSSARY_KDE=" + JSON.stringify(map) + ";\n");
  return map;
}

/* ── vzorce vo vysvetlivkách (assets/glossary/97-vzorce.js) ──────────────────
   Heslo s poľom `vzorec: "id"` (alebo ["id1","id2"]) ukáže v okne vzorec z knižnice
   chapters/fig/mol/<id>.txt – tá istá kresba ako v schémach (tools/vzorce.js). Kniha bez
   knižnice vzorcov súbor nemá. Do súboru idú len vzorce, na ktoré heslo odkazuje. */
function buildVzorce() {
  const out = path.join(GLOS, "97-vzorce.js");
  let V = null;
  try { V = require("./vzorce.js"); } catch (e) { V = null; }
  if (!HAS_GLOSS || !V || !fs.existsSync(V.MOL)) { if (fs.existsSync(out)) fs.unlinkSync(out); return; }
  const files = fs.readdirSync(GLOS).filter((f) => /^\d+-.*\.js$/.test(f) && !/^9[789]-/.test(f)).sort();
  const win = {};
  try { new Function("window", files.map((f) => read(path.join(GLOS, f))).join("\n;\n"))(win); }
  catch (e) { console.log("  ⚠ glosár sa nedal načítať pre vzorce: " + e.message); return; }
  const lib = V.library();
  const sub = (s) => V.esc(s).replace(/(\d+)/g, "<sub>$1</sub>").replace(/([+-])$/, (m) => "<sup>" + (m === "-" ? "−" : "+") + "</sup>")
    .replace(/<sub>(\d+)<\/sub><sup>/, "<sub>$1</sub><sup>");
  const map = {}, miss = new Set();
  (win.PF_GLOSSARY || []).forEach((t) => {
    if (!t.vzorec) return;
    [].concat(t.vzorec).forEach((id) => {
      if (map[id]) return;
      const def = lib[id];
      if (!def || def.err.length) { miss.add(`${t.id} → ${id}`); return; }
      const r = V.render(def, {});
      const P = 4, w = r.w + 2 * P, h = r.h + 2 * P;   // mierka 1,3; vysoký vzorec najviac ≈ 125 px
      const svg = `<svg class="chart pf-vz" xmlns="http://www.w3.org/2000/svg" viewBox="${V.r1(-w / 2)} ${V.r1(-h / 2)} ${V.r1(w)} ${V.r1(h)}" width="${V.r1(w * Math.min(1.3, 125 / h))}" role="img" aria-label="vzorec: ${V.esc(def.meta.nazov || id)}"><g class="mol">${r.svg}</g></svg>`;
      map[id] = { svg, n: def.meta.nazov || id, s: def.meta.sumarny ? sub(def.meta.sumarny) : "", p: def.meta.projekcia || "" };
    });
  });
  miss.forEach((m) => console.log("  ⚠ glosár: vzorec " + m + " nie je v chapters/fig/mol/ (alebo má chybu)"));
  write(out, "/* GENEROVANÉ nástrojom tools/build.js – vzorce k heslám glosára (pole `vzorec`). Neupravuj ručne. */\n" +
    "window.PF_VZORCE=" + JSON.stringify(map) + ";\n");
}

function main() {
  syncStandaloneStyle();
  const only = process.argv[2];
  {
    const secs = chapterSections();
    buildSearchIndex(secs, buildGlossaryKde(secs));
    buildVzorce();
  }
  scanExistingHtml();
  ABBR = loadAbbr();
  const css = read(path.join(__dirname, "chapter.css")).trimEnd() + "\n" + read(path.join(__dirname, "chapter-extra.css")).trim();

  const files = fs.readdirSync(CH).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => path.join(CH, f));
  const built = files.map(renderChapter).filter(Boolean);
  // 1. priechod: zaregistruj kotvy všetkých generovaných kapitol
  built.forEach((b) => (registry[b.stem] = b.cur.ids));

  let bad = 0, fatal = 0;
  const warnings = {};
  built.forEach((b) => {
    if (only && b.stem !== only) return;
    const warn = b.cur.warn.slice();
    b.cur.localRefs.forEach((r) => { if (!b.cur.ids.has(r)) warn.push(`lokálny odkaz #${r} nemá cieľ`); });
    let html = assemble(b, css);
    html = resolveXrefs(html, b.stem, warn);
    html = linkFigRefs(html);
    // po resolve: mŕtve odkazy
    const soon = (html.match(/class="xref-soon"/g) || []).length;
    // odkazy v odpovediach na otázky sa do minima nerátajú — len opakujú odkazy z textu
    const xr = (html.replace(/<ol class="quiz">[\s\S]*?<\/ol>/g, "").match(/class="xref"/g) || []).length;
    const body = b.secs.filter((s) => !s.isSrc && !s.isQuiz);
    const words = body.reduce((a, s) => a + s.words, 0);
    write(path.join(CH, b.stem + ".html"), html);

    console.log(`\n▸ ${b.stem}.html   ${words} slov (bez zdrojov) · ${xr} živých xref · ${soon} xref-soon · ${b.cur.revs}× [R] · ${b.cur.bridges}× klinický most · ${b.cur.asides || 0}× boxov v okraji (z toho ${b.cur.jadra.size}× jadro${b.cur.pocut ? ", " + b.cur.pocut + "× môžeš počuť" : ""}) · ${b.cur.abbrNotes}× skratky · ${b.cur.tabs} tabuliek · ${b.cur.quiz || 0} otázok${b.cur.figs ? " · " + b.cur.figs + " schém (" + (b.cur.rk || 0) + " výrezov na rozkliknutie)" : ""}`);
    body.filter((s) => s.words > 600 && s.visuals === 0).forEach((s) => warn.push(`sekcia ${s.num} má ${s.words} slov bez vizuálu (CLAUDE.md §5.2)`));
    body.forEach((s) => console.log(`    ${s.num.padEnd(6)} ${String(s.words).padStart(5)}  ${s.title.slice(0, 60)}`));
    if (xr < POLICY.minXref) warn.push(`iba ${xr} živých xref (minimum ${POLICY.minXref}, CLAUDE.md §3)`);
    policyChecks(b).forEach((w) => warn.push(w));
    warnings[b.stem] = warn;
  });
  // žiadny ostrov (CLAUDE.md §3): odkazy z ≥ 2 iných kapitol — počíta sa z hotových .html na disku
  const incoming = incomingLinks();
  built.forEach((b) => {
    if (only && b.stem !== only) return;
    const warn = warnings[b.stem];
    const n = (incoming[b.stem] || new Set()).size;
    if (n < 2) warn.push(`vedú sem odkazy len z ${n} iných kapitol (minimum 2, CLAUDE.md §3 — žiadny ostrov)`);
    const err = b.cur.err || [];
    if (warn.length || err.length) console.log(`\n  ${b.stem}:`);
    err.forEach((w) => { fatal++; console.log("    ✖ CHYBA: " + w); });
    warn.forEach((w) => { bad++; console.log("    ⚠ " + w); });
  });
  glossaryProblems().forEach((w) => { bad++; console.log("\n  ⚠ " + w); });
  // bez glosára sa do kapitol nevloží glossary.js – a s ním nefungujú pojmy ani lupa obrázkov a schém
  if (built.length && !HAS_GLOSS) {
    bad++;
    console.log("\n  ⚠ glosár je prázdny (assets/glossary/NN-nazov.js) – kapitoly nemajú vysvetlivky pojmov ani lupu obrázkov (assets/glossary/README.md)");
  }
  if (bad) console.log(`\n${bad} upozornení.`);
  buildHub(built);
  buildManifest();
  buildServiceWorker();
  if (fatal) {
    console.log(`\n✖ ${fatal} chýb – rozbitý zápis kapitoly; build končí kódom 1 (publish.ps1 nič neuloží, zverejni.ps1 sa zastaví).`);
    process.exitCode = 1;
  }
}


/* ── manifest.json z book.json ────────────────────────────────────────────── */
function buildManifest() {
  const man = {
    name: BOOK.title,
    short_name: BRAND,
    description: BOOK.description,
    lang: "sk",
    start_url: "index.html",
    scope: "./",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: BOOK.backgroundColor || "#f3f2f2",
    theme_color: BOOK.themeColor,
    icons: [
      { src: "assets/img/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "assets/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "assets/img/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  // ikony po jednej na riadok (čitateľnejší diff)
  const out = JSON.stringify(man, null, 2)
    .replace(/\{\n\s+"src": ("[^"]+"),\n\s+"sizes": ("[^"]+"),\n\s+"type": ("[^"]+"),\n\s+"purpose": ("[^"]+")\n\s+\}/g, '{ "src": $1, "sizes": $2, "type": $3, "purpose": $4 }') + "\n";
  const p = path.join(ROOT, "manifest.json");
  if (!fs.existsSync(p) || read(p) !== out) write(p, out);
}

/* ── hlavná stránka (index.html) z hub.json a tools/hub.template.html ─────────
   Karty hotových kapitol dostanú odhad času (z rozsahu kapitoly); plánované kapitoly sú vypnuté karty.
   Študijné bloky: kapitoly, ktoré sa učia spolu, majú rovnakú triedu blok-a … blok-d (jemné podfarbenie);
   susedné bloky majú rôznu farbu. Kapitola, za ktorou nasleduje ďalšia z toho istého bloku, má aj blok-spolu. */
function buildHub(built) {
  const hubPath = path.join(ROOT, "hub.json");
  const tplPath = path.join(__dirname, "hub.template.html");
  if (!fs.existsSync(hubPath) || !fs.existsSync(tplPath)) return;
  const hub = JSON.parse(read(hubPath));
  const byStem = {};
  built.forEach((b) => (byStem[b.stem] = b));
  let rd = 0, ln = 0, n = 0;
  const li = (c) => {
    const cls = [c.slug ? "" : "disabled", c.blok ? "blok-" + c.blok : "", c.spolu ? "blok-spolu" : ""].filter(Boolean).join(" ");
    const title = c.slug && byStem[c.slug] && !c.title ? byStem[c.slug].meta.title : c.title;
    if (!c.slug) {
      return `      <li${cls ? ` class="${cls}"` : ""}><a><span class="num">${esc(c.n)}</span><span class="meta"><span class="t">${inlHub(title)}</span> <span class="s">${inlHub(c.topics || "Kapitola sa pripravuje")}</span></span><span class="status todo">Pripravuje sa</span></a></li>`;
    }
    let cas = "";
    if (byStem[c.slug]) {
      const t = timeEstimate(byStem[c.slug]);
      rd += t.read; ln += t.learn; n++;
      cas = `\n            <span class="cas-l"><b>Prejsť</b> ≈ ${t.readTxt} · <b>Naučiť sa</b> ≈ ${t.learnTxt}</span>`;
    }
    return `      <li${cls ? ` class="${cls}"` : ""}>\n        <a href="chapters/${c.slug}.html">\n          <span class="num">${esc(c.n)}</span>\n          <span class="meta">\n            <span class="t">${inlHub(title)}</span>\n            <span class="s">${inlHub(c.topics || "")}</span>${cas}\n          </span>\n          <span class="status done">Hotová</span>\n        </a>\n      </li>`;
  };
  const cards = hub.chapters.map(li).join("\n");
  const sum = n
    ? `    <p class="toc-note cas-sum">Hotových kapitol: ${n}. Odhad času na všetky spolu: <b>prejsť</b> ≈ ${fmtMin(rd)}, <b>naučiť sa</b> ≈ ${fmtMin(ln)} – orientačne, pre študenta, ktorý látku ešte nepozná (predpoklady výpočtu sú pod „Prejsť / Naučiť sa“ na začiatku každej kapitoly).</p>`
    : "";
  const note = hub.note ? `    <p class="toc-note">${hub.note}</p>\n${sum}` : sum;
  const about = (hub.about || []).map((p) => `    <p class="about">${p}</p>`).join("\n");
  const map = {
    TITLE: esc(BOOK.title), BRAND: esc(BRAND), THEME: BOOK.themeColor, SLUG: BOOK.slug, SUBJECT: escAttr(BOOK.subject),
    ADMIN_PORT: BOOK.adminPort, EYEBROW: hub.eyebrow, HEADING: hub.heading || BOOK.title, LEDE: hub.lede,
    NOTE: note, CARDS: cards, ABOUT: about,
  };
  const html = read(tplPath).replace(/\{\{([A-Z_]+)\}\}/g, (_, k) => {
    if (!(k in map)) { console.log(`  ⚠ hub.template.html: neznáma značka {{${k}}}`); return ""; }
    return map[k];
  });
  const out = path.join(ROOT, "index.html");
  if (!fs.existsSync(out) || read(out) !== html) write(out, html);
  console.log(`\n▸ index.html   ${hub.chapters.length} kariet (${n} hotových) z hub.json`);
}
/* text v hub.json: obyčajný text s povolenými <b>, <i>, <sup>, <sub> – ostatné sa ošetrí */
function inlHub(t) {
  return esc(t || "").replace(/&lt;(\/?)(b|i|sup|sub)&gt;/g, "<$1$2>");
}

/* Appka na offline čítanie (PWA). service-worker.js sa generuje z aktuálneho
   obsahu chapters/ a assets/ pri KAŽDOM builde — zoznam na uloženie sa tak nemôže
   rozísť so skutočnými súbormi. Registruje ho assets/js/pwa.js. */
function buildServiceWorker() {
  const exts = new Set([".html", ".css", ".js", ".woff2", ".svg", ".jpg", ".jpeg", ".png"]);
  const skipDirs = new Set(["node_modules", ".git"]);
  const files = [];
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
      if (e.name.startsWith(".")) return;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (!skipDirs.has(e.name)) walk(p); }
      else if (exts.has(path.extname(e.name).toLowerCase())) files.push(p);
    });
  }
  ["chapters", "assets"].forEach((d) => { if (fs.existsSync(path.join(ROOT, d))) walk(path.join(ROOT, d)); });
  [path.join(ROOT, "index.html"), path.join(ROOT, "manifest.json")].forEach((p) => { if (fs.existsSync(p)) files.push(p); });

  const urls = Array.from(new Set(files.map((p) => path.relative(ROOT, p).split(path.sep).join("/")))).sort();
  const version = String(Date.now());
  const sw = `/* ${BRAND} — GENEROVANÉ nástrojom tools/build.js (funkcia buildServiceWorker).
   Neupravuj ručne. Zoznam súborov nižšie sa pri každom builde prepočíta
   z aktuálneho obsahu chapters/ a assets/, takže sa nemôže rozísť s knihou.
   Registruje ho assets/js/pwa.js. */
"use strict";
const CACHE_VERSION = "${version}";
const CACHE_NAME = "${BOOK.slug}-" + CACHE_VERSION;
const PRECACHE_URLS = ${JSON.stringify(urls, null, 2)};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(PRECACHE_URLS.map((u) =>
        fetch(u, { cache: "reload" }).then((resp) => { if (resp.ok) return cache.put(u, resp); }).catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // cudziu doménu (napr. odkaz na ChatGPT) nikdy necachuj
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((resp) => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return resp;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

/* Vynútená aktualizácia (tlačidlo „Aktualizovať appku“ na hlavnej stránke, assets/js/pwa.js):
   keď na serveri nie je nová verzia, stiahnu sa všetky súbory nanovo do tej istej cache.
   Stránka dostáva priebeh cez port zo správy a po skončení sa načíta znova. Súbor, ktorý
   sa stiahnuť nepodarí, ostáva v cache v pôvodnej podobe. */
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "pf-refresh") return;
  const port = event.ports && event.ports[0];
  const say = (m) => { if (port) port.postMessage(m); };
  const total = PRECACHE_URLS.length;
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const queue = PRECACHE_URLS.slice();
      let done = 0, failed = 0;
      const next = () => {
        const u = queue.shift();
        if (!u) return Promise.resolve();
        return fetch(u, { cache: "reload" })
          .then((resp) => { if (!resp.ok) throw new Error(String(resp.status)); return cache.put(u, resp); })
          .catch(() => { failed++; })
          .then(() => { done++; say({ done, total }); return next(); });
      };
      return Promise.all([0, 1, 2, 3, 4, 5].map(next)).then(() => say({ finished: true, failed, total }));
    })
  );
});
`;
  write(path.join(ROOT, "service-worker.js"), sw);
  console.log(`\n▸ service-worker.js   ${urls.length} súborov na offline uloženie (verzia ${version})`);
}

/* Povinné prvky kapitoly, ktoré sa dajú overiť strojovo (CLAUDE.md §2.2, §1.3, §6).
   Čo sa strojovo overiť nedá (rozlišovacia tabuľka, hranica reverzibility), ostáva na kontrolnom zozname. */
function policyChecks(b) {
  const w = [];
  const c = b.cur, m = b.meta;
  if (!m.next || /^[—–-]?$/.test(m.next.trim())) w.push("prázdne `next:` — kapitola musí dole odkazovať, kde sa pokračuje (§3)");
  if (!m.deps) w.push("chýba `deps:` (§3; pri prvej kapitole napíš `deps: —`)");
  if (!/⟳|circulus/i.test(b.body)) w.push(POLICY.circulus);
  if (c.bridges < 3) w.push(`iba ${c.bridges}× KLINIKA (minimum 3, §2.2)`);
  if (POLICY.requireJadro) b.secs.filter((s) => !s.isSrc && !s.isQuiz && !s.isSum && !c.jadra.has(s.num))
    .forEach((s) => w.push(`sekcia ${s.num} nemá Jadro – hlavnú myšlienku heslovite na okraji (> [!JADRO], §2.0 bod 5)`));
  if (POLICY.requireFigs && !c.figs) w.push("kapitola nemá žiadnu vlastnú schému (fig/*.svg) – dráha, regulácia aj prepnutie stavu sa kreslia zo vzorcov (§5.2)");
  if (!c.revs) w.push("žiadne [R] — preverené, či sa od staršieho výkladu nič nezmenilo? (§1.3)");
  if (!c.quiz) w.push("chýbajú Otázky na zopakovanie (```quiz```, §2.2)");
  else if (c.quiz < 5) w.push(`iba ${c.quiz} otázok na zopakovanie (minimum 5, §2.2)`);
  if (POLICY.requireIntro) headingsWithoutIntro(b.body).forEach((h) => w.push(`pod nadpisom „${h}“ chýba úvodná veta – najprv bežný text (čo sekcia rieši, podľa čoho sa delí), až potom box, tabuľka, obrázok či odrážky (§2.0 bod 3)`));
  quizNumberMismatches(b.body, b.stem).forEach((x) => w.push(x));
  // book.json → policy.forbiddenSources: zdroje, ktoré sa ako doklad nesmú citovať (napr. kópia bez legálneho pôvodu; od 6. 11. 2026)
  (POLICY.forbiddenSources || []).forEach((name) => {
    if (new RegExp(name, "i").test(b.body)) w.push(`kapitola cituje zakázaný zdroj „${name}“ (book.json → policy.forbiddenSources) – fakt dolož iným, legálne dostupným prameňom`);
  });
  const src = b.secs.find((s) => s.isSrc);
  if (!src) w.push("chýba sekcia Zdroje (§1.3)");
  else {
    const now = new Date().getFullYear();
    const years = (src.raw.match(/\b(19|20)\d{2}\b/g) || []).map(Number).filter((y) => y <= now);
    if (!years.some((y) => y >= now - 5)) w.push(`v Zdrojoch nie je nič z posledných 5 rokov (${now - 5}+, §1.3)`);
  }
  return w;
}

/* Nadpis (##–####), pod ktorým hneď začína box, tabuľka, obrázok, odrážky, kód alebo ďalší nadpis (CLAUDE.md §2.0 bod 3).
   Zavedené 5. 11. 2026 – dovtedy to bol len bod kontrolného zoznamu a kap. 1 PATOLY mala 23 z 28 nadpisov bez úvodu.
   Výnimka: Súhrn, Otázky na zopakovanie, Zdroje (technické sekcie). */
function headingsWithoutIntro(body) {
  const L = body.replace(/\r/g, "").split("\n"), out = [];
  let code = false;
  for (let i = 0; i < L.length; i++) {
    if (/^```/.test(L[i])) code = !code;
    if (code) continue;
    const h = /^#{2,4}\s+(.*)$/.exec(L[i]);
    if (!h || /Zdroje|Otázky na zopakovanie|Súhrn|Kľúčové body/.test(h[1])) continue;
    let j = i + 1;
    while (j < L.length && !L[j].trim()) j++;
    if (j < L.length && /^(>|\||!\[|[-*+] |\d+\. |#|```|<)/.test(L[j])) out.push(h[1].replace(/\s*\{[^}]*\}\s*$/, "").slice(0, 60));
  }
  return out;
}

/* Číslo s jednotkou v odpovedi otázky (```quiz) musí byť aj v sekcii, na ktorú odpoveď odkazuje (5. 11. 2026):
   oprava faktu v texte sa inak nedostane do otázky – a s ňou ani do Anki (kap. 1 PATOLY: posmrtná stuhlosť
   „24–48 h“ v otázke, „1–4 dni“ v opravenom texte). Odpovede s výpočtom (=, ×) sa nekontrolujú. */
function quizNumberMismatches(body, stem) {
  const out = [];
  const q = /```quiz\n([\s\S]*?)```/.exec(body.replace(/\r/g, ""));
  if (!q) return out;
  const norm = (s) => s.replace(/[   ]/g, " ").replace(/[–—−]/g, "-").replace(/,/g, ".").replace(/\s+/g, " ");
  // text sekcií podľa kotvy (aj podsekcie sa rátajú do nadradenej)
  const texts = {};
  const sectionsOf = (st, md) => {
    let cur = null;
    md.replace(/\r/g, "").split("\n").forEach((l) => {
      const h = /^#{2,4}\s+(\d+(?:\.\d+)+)\s/.exec(l);
      if (h) { const n = h[1].split("."); cur = st + "#" + (n.length === 2 ? "sec-" : "sub-") + n.join("-"); texts[cur] = ""; return; }
      if (cur) texts[cur] += l + "\n";
    });
  };
  const loaded = new Set();
  const load = (st) => {
    if (loaded.has(st)) return; loaded.add(st);
    const f = path.join(CH, st + ".md");
    if (fs.existsSync(f)) sectionsOf(st, read(f));
  };
  load(stem);
  const full = (k) => Object.keys(texts).filter((x) => x === k || x.startsWith(k.replace("#sec-", "#sub-") + "-")).map((x) => texts[x]).join("\n");
  const NUM = /(?:≈\s*)?\d+(?:[.,]\d+)?(?:\s*[-–]\s*\d+(?:[.,]\d+)?)?\s*(?:%|h\b|min\b|dní|dni\b|dňa|týž\w*|mesiac\w*|rok\w*|mm\b|cm\b|µm|nm\b|kDa|g\b|mg\b|ml\b|mmHg|°C|mmol\/l|µmol\/l)/g;
  q[1].split("\n").filter((l) => l.startsWith("=")).forEach((l) => {
    if (/\d\s*[=×]|[=×]\s*\d/.test(l)) return;
    const links = [...l.matchAll(/\]\(([\w-]*)#((?:sec|sub)-[\d-]+)\)/g)].map((m) => ((m[1] || stem) + "#" + m[2]));
    if (!links.length) return;
    links.forEach((k) => load(k.split("#")[0]));
    const text = norm(links.map(full).join("\n"));
    for (const m of l.replace(/\[[^\]]*\]\([^)]*\)/g, " ").matchAll(NUM)) {
      const core = norm(m[0]).replace(/^≈\s*/, "").trim();
      const nums = core.match(/\d+(?:\.\d+)?/g) || [];
      const ok = text.includes(core) || text.includes(core.replace(/ /g, "")) ||
        (nums.length === 1 ? new RegExp("(^|[^\\d.])" + nums[0].replace(".", "\\.") + "([^\\d]|$)").test(text) : nums.every((n) => text.includes(n)));
      if (!ok) out.push(`otázka: „${m[0].trim()}“ z odpovede nie je v ${links.join(", ")} – oprav číslo alebo odkaz na sekciu, kde fakt stojí („${l.slice(2, 60)}…“)`);
    }
  });
  return out;
}

function incomingLinks() {
  const inc = {};
  fs.readdirSync(CH).filter((f) => f.endsWith(".html")).forEach((f) => {
    const from = f.replace(/\.html$/, "");
    read(path.join(CH, f)).replace(/class="xref" href="([\w-]+)\.html/g, (_, to) => {
      if (to !== from) (inc[to] = inc[to] || new Set()).add(from);
      return "";
    });
  });
  return inc;
}
main();

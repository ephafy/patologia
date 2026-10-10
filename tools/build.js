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

/* ── PATOLA: rozdiely oproti tools/build.js z Patofyziológie ─────────────────
   1. BRAND a päta stránky; značka pôvodu [P] namiesto [S].
   2. Glosár je voliteľný — vloží sa, len ak assets/glossary/*.js existuje.
   3. Sedem farebných boxov (> [!MECH] …) — vlastné triedy .box.k-*, NIE
      .note/.flag/.plain, lebo tie site.js vyplavuje do okraja ako poznámky.
   4. Obrázky s atribúciou:  ![Obr. 1.2 — Titulok. Popis.](img/x.jpg "Autor · licencia | https://…")
   5. palette.css sa načíta POSLEDNÝ (prepíše tokeny z <style> kapitoly).
   6. Okraj stránky (CLAUDE.md §5.3): KLINIKA, POZOR, ZAPAMATAJ a JADRO vždy na okraji, krátka DETEK tiež;
      skratky z chapters/_skratky.md sa pri prvom výskyte v kapitole vysvetlia na okraji samy.
   Zdieľané zostáva: site.css, site.js, chapter.css (bajt po bajte). ─────── */
const BRAND = "PATOLA";
/* Kam čitateľ hlási chybu (CLAUDE.md §9): issues VEREJNÉHO repozitára — do súkromného pracovného
   sa čitateľ nedostane. V kapitole sa objaví odkaz „Nahlásiť chybu“. Prázdne = bez odkazu. */
const ISSUES_URL = "https://github.com/ephafy/patologia/issues/new";
const HAS_GLOSS = fs.existsSync(GLOS) && fs.readdirSync(GLOS).some((f) => /^\d+-.*\.js$/.test(f));

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
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  s = s.replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])/g, "$1<i>$2</i>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // PATOLA: horný/dolný index a zalomenie riadku (chemické vzorce, jednotky)
  s = s.replace(/&lt;(sup|sub)&gt;(.*?)&lt;\/\1&gt;/g, "<$1>$2</$1>").replace(/&lt;br&gt;/g, "<br>");
  return s;
}

/* ── blokový parser ──────────────────────────────────────────────────────── */
const ALERTS = { NOTE: "note", WARNING: "flag", TIP: "plain", IMPORTANT: "rev" };

/* Farebné boxy PATOLY = vrstvy z CLAUDE.md §1.1 + dva doplnky.
   kľúč v .md → [trieda, predvolený štítok] */
const BOXES = {
  MECH:       ["k-mech",  "Mechanizmus"],
  MORF:       ["k-morf",  "Čo uvidíš"],
  DETEK:      ["k-detek", "Detekcia"],
  KLINIKA:    ["k-klin",  "Klinika"],
  POZOR:      ["k-pozor", "Pozor"],
  ZAPAMATAJ:  ["k-zap",   "Zapamätaj"],
  FYZ:        ["k-fyz",   "Normálne"],
  POCUT:      ["k-pocut", "Môžeš počuť"],   // nie je vrstva – pojem alebo údaj z osnovy, ktorý sa nepodarilo doložiť (CLAUDE.md §4.0, §5.3)
  JADRO:      ["k-jadro", "Jadro"],   // nie je vrstva – hlavná myšlienka sekcie heslovite, len na okraj (§2.0, §5.3)
};

/* Okraj stránky (CLAUDE.md §5.3). Do okraja ide to, čo os výkladu sprevádza, ale neprerušuje:
   KLINIKA, POZOR, ZAPAMATAJ a JADRO vždy, DETEK len krátka. MECH, MORF a FYZ sú os výkladu –
   bez nich reťaz nedáva zmysel, preto ostávajú v texte. Okraj má ≈ 200 px: tabuľka ani obrázok sa doň nezmestia. */
const ASIDE_ALWAYS = new Set(["KLINIKA", "POZOR", "ZAPAMATAJ", "JADRO", "POCUT"]);
const ASIDE_SHORT = new Set(["DETEK"]);
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
    credit = parts[0] || ""; href = parts[1] || ""; opts = parts[2] || "";
  }
  const optAr = (opts.match(/ar=([\d.]+)/) || [])[1];
  const optFw = (opts.match(/fw=(\d+)/) || [])[1];
  if (!credit) CUR.warn.push(`obrázok ${name} nemá atribúciu (CLAUDE.md §4.4)`);
  const dims = sz ? ` width="${sz.w}" height="${sz.h}"` : "";
  const ar = sz ? (sz.w / sz.h).toFixed(2) : optAr || "1";
  const fwPx = sz ? Math.min(sz.w, 720) : optFw || 520;
  const fw = ` style="${inRow ? `--ar:${ar};` : ""}--fw:${fwPx}px"`;
  const src = credit
    ? ` <a class="src-link"${href ? ` href="${escAttr(href)}" target="_blank" rel="noopener noreferrer"` : ""}>${LINK_ICON}${esc(credit)}</a>`
    : "";
  const cap = captionHtml(alt).replace(/<\/figcaption>$/, `${src}</figcaption>`);
  return `<figure class="fig keep"${id ? ` id="${id}"` : ""}${fw}>\n    <img src="${remote ? escAttr(rel) : "../assets/images/" + name}"${dims} alt="${escAttr(alt.replace(/^.*? — /, ""))}" loading="lazy">\n    ${cap}\n  </figure>`;
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
  const TINT = /\s*\{(zel|fial|ruz|tyrk)\}\s*$/;
  const tint = head.map((h) => (h.match(TINT) || [])[1] || "");
  const cls = (i) => (tint[i] ? ` class="c-${tint[i]}"` : "");
  const th = head.map((h, i) => `<th${cls(i)}>${inl(h.replace(TINT, ""))}</th>`).join("");
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
    const img = l.match(/^!\[([^\]]*)\]\((fig\/([\w.-]+)\.svg)\)\s*$/);
    if (img) { out.push(renderSvgFigure(img[1], img[3])); i++; continue; }

    // obrázok = súbor z assets/images (s atribúciou v titulku)
    const PIC = /^!\[([^\]]*)\]\(((?:img\/|https?:\/\/)[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;
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
        const lvl = /^\s{2,}/.test(lines[i]) ? 1 : 0; // PATOLA: jedna úroveň vnorenia (odsadenie ≥ 2 medzery)
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
      out.push(`<p>${inl(text)}</p>`);
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
  if (kind === "cols") {
    // stĺpce vedľa seba; stĺpce oddeľuje riadok „---“, vnútri bežný markdown (odsek, odrážky)
    const cols = [[]];
    buf.forEach((b) => { if (/^---\s*$/.test(b)) cols.push([]); else cols[cols.length - 1].push(b); });
    const html = cols.filter((c) => c.some((b) => b.trim())).map((c) => `<div>${parseBlocks(c)}</div>`);
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
  const svg = stripSvgStyle(read(p)).trim();
  return `<figure class="chart keep" id="${name}">\n    ${svg}\n    ${captionHtml(alt)}\n  </figure>`;
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
  if (m) { kind = ALERTS[m[1]] || "note"; buf = buf.slice(1); }
  // prvý riadok len tučný = štítok
  if (buf.length && /^\*\*[^*]+\*\*\s*$/.test(buf[0])) {
    label = buf[0].replace(/\*\*/g, "").trim();
    buf = buf.slice(1);
  }
  const inner = parseBlocks(buf, { noTableId: true });
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

/* ── kapitola ────────────────────────────────────────────────────────────── */
function stem(file) { return path.basename(file).replace(/\.md$/, ""); }

function renderChapter(file) {
  const src = read(file);
  const fm = parseFront(src);
  if (!fm) return null;
  const meta = fm.meta;
  const num = meta.num;
  CUR = { num, ids: new Set(), localRefs: [], xrefs: 0, tabs: 0, revs: 0, bridges: 0, warn: [], secNum: "", jadra: new Set(), abbr: new Set(), abbrNotes: 0 };

  const lines = fm.body.split("\n");
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
<script>/* PATOLA: stránka v náhľade (assets/js/peek.js) — skryť hlavičku skôr, než sa vykreslí */if(/[?&]embed=/.test(location.search))document.documentElement.classList.add("pk-embed")</script>
<script>/* PATOLA: pri F5/Späť ukázať stránku až na obnovenej pozícii (peek.js odkryje; poistka 2 s) */(function(){try{var h=document.documentElement,n=performance.getEntriesByType("navigation")[0],t=n&&n.type,s=location.search;if(/[?&]y=[1-9]/.test(s)||(!/[?&]embed=/.test(s)&&(t==="reload"||t==="back_forward")&&parseInt(sessionStorage.getItem("pk-y:"+location.pathname),10)>0)){h.classList.add("pk-restoring");setTimeout(function(){h.classList.remove("pk-restoring")},2000)}}catch(e){}})()</script>
<link rel="stylesheet" href="../assets/fonts/fonts.css">
<link rel="stylesheet" href="../assets/styles/site.css">
${HAS_GLOSS ? '<link rel="stylesheet" href="../assets/styles/glossary.css">\n' : ""}<style>
${css}
</style>
<link rel="stylesheet" href="../assets/styles/palette.css">
<link rel="manifest" href="../manifest.json">
<meta name="theme-color" content="#5f42a8">
<link rel="icon" href="../assets/img/icon-32.png">
<link rel="apple-touch-icon" href="../assets/img/icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="PATOLA">
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

<div class="site-shell">
  <aside class="site-sidebar">
    <div class="toc-title">Obsah kapitoly</div>
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
  <span>${BRAND} — poznámky z patológie · Kapitola ${esc(m.num)}</span>
  <span class="tnum">§ ${ch.secs[0].num}–${lastSec}</span>
</div>

</main>
  </div>
  <div class="site-spacer" aria-hidden="true"></div>
</div>

<script src="../assets/js/site.js" defer></script>
<script src="../assets/js/peek.js" defer></script>
<script>
/* PATOLA: tlač kapitoly otvorenej v ráme hlavnej stránky (index.html).
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
${HAS_GLOSS ? glossaryScripts() + '\n<script src="../assets/js/glossary.js" defer></script>\n' : ""}</body>
</html>
`;
}

/* ── samostatné SVG (aby sa obrázok zobrazil aj v .md prehliadači) ───────── */
function syncStandaloneStyle() {
  const stylePath = path.join(__dirname, "svg-standalone.css");
  if (!fs.existsSync(stylePath) || !fs.existsSync(FIG)) return;
  const css = read(stylePath).trim();
  fs.readdirSync(FIG).filter((f) => f.endsWith(".svg")).forEach((f) => {
    const p = path.join(FIG, f);
    let s = read(p);
    s = stripSvgStyle(s);
    // vlož hneď za otvárací <svg …>
    s = s.replace(/(<svg\b[^>]*>)/, `$1\n<style data-standalone="1">\n${css}\n</style>`);
    if (!/xmlns=/.test(s)) s = s.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
    write(p, s);
  });
}

/* ── hlavný beh ──────────────────────────────────────────────────────────── */
function main() {
  const only = process.argv[2];
  scanExistingHtml();
  syncStandaloneStyle();
  ABBR = loadAbbr();
  const css = read(path.join(__dirname, "chapter.css")).trimEnd() + "\n" + read(path.join(__dirname, "chapter-extra.css")).trim();

  const files = fs.readdirSync(CH).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => path.join(CH, f));
  const built = files.map(renderChapter).filter(Boolean);
  // 1. priechod: zaregistruj kotvy všetkých generovaných kapitol
  built.forEach((b) => (registry[b.stem] = b.cur.ids));

  let bad = 0;
  const warnings = {};
  built.forEach((b) => {
    if (only && b.stem !== only) return;
    const warn = b.cur.warn.slice();
    b.cur.localRefs.forEach((r) => { if (!b.cur.ids.has(r)) warn.push(`lokálny odkaz #${r} nemá cieľ`); });
    let html = assemble(b, css);
    html = resolveXrefs(html, b.stem, warn);
    // po resolve: mŕtve odkazy
    const soon = (html.match(/class="xref-soon"/g) || []).length;
    // odkazy v odpovediach na otázky sa do minima nerátajú — len opakujú odkazy z textu
    const xr = (html.replace(/<ol class="quiz">[\s\S]*?<\/ol>/g, "").match(/class="xref"/g) || []).length;
    const body = b.secs.filter((s) => !s.isSrc && !s.isQuiz);
    const words = body.reduce((a, s) => a + s.words, 0);
    write(path.join(CH, b.stem + ".html"), html);

    console.log(`\n▸ ${b.stem}.html   ${words} slov (bez zdrojov) · ${xr} živých xref · ${soon} xref-soon · ${b.cur.revs}× [R] · ${b.cur.bridges}× klinický most · ${b.cur.asides || 0}× boxov v okraji (z toho ${b.cur.jadra.size}× jadro${b.cur.pocut ? ", " + b.cur.pocut + "× môžeš počuť" : ""}) · ${b.cur.abbrNotes}× skratky · ${b.cur.tabs} tabuliek · ${b.cur.quiz || 0} otázok`);
    body.filter((s) => s.words > 600 && s.visuals === 0).forEach((s) => warn.push(`sekcia ${s.num} má ${s.words} slov bez vizuálu (CLAUDE.md §5.2)`));
    body.forEach((s) => console.log(`    ${s.num.padEnd(6)} ${String(s.words).padStart(5)}  ${s.title.slice(0, 60)}`));
    if (xr < 8) warn.push(`iba ${xr} živých xref (minimum 8, CLAUDE.md §3)`);
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
    if (warn.length) console.log(`\n  ${b.stem}:`);
    warn.forEach((w) => { bad++; console.log("    ⚠ " + w); });
  });
  if (bad) console.log(`\n${bad} upozornení.`);
  buildServiceWorker();
}

/* PATOLA: appka na offline čítanie (PWA). service-worker.js sa generuje z aktuálneho
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
  const sw = `/* PATOLA — GENEROVANÉ nástrojom tools/build.js (funkcia buildServiceWorker).
   Neupravuj ručne. Zoznam súborov nižšie sa pri každom builde prepočíta
   z aktuálneho obsahu chapters/ a assets/, takže sa nemôže rozísť s knihou.
   Registruje ho assets/js/pwa.js. */
"use strict";
const CACHE_VERSION = "${version}";
const CACHE_NAME = "patola-" + CACHE_VERSION;
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
  if (!/⟳|circulus/i.test(b.body)) w.push("chýba circulus vitiosus (⟳) s bodom zvratu (§2.2)");
  if (c.bridges < 3) w.push(`iba ${c.bridges}× KLINIKA (minimum 3, §2.2)`);
  b.secs.filter((s) => !s.isSrc && !s.isQuiz && !s.isSum && !c.jadra.has(s.num))
    .forEach((s) => w.push(`sekcia ${s.num} nemá Jadro – hlavnú myšlienku heslovite na okraji (> [!JADRO], §2.0 bod 5)`));
  if (!c.revs) w.push("žiadne [R] — preverené, či sa od staršieho výkladu nič nezmenilo? (§1.3)");
  if (!c.quiz) w.push("chýbajú Otázky na zopakovanie (```quiz```, §2.2)");
  else if (c.quiz < 5) w.push(`iba ${c.quiz} otázok na zopakovanie (minimum 5, §2.2)`);
  const src = b.secs.find((s) => s.isSrc);
  if (!src) w.push("chýba sekcia Zdroje (§1.3)");
  else {
    const now = new Date().getFullYear();
    const years = (src.raw.match(/\b(19|20)\d{2}\b/g) || []).map(Number).filter((y) => y <= now);
    if (!years.some((y) => y >= now - 5)) w.push(`v Zdrojoch nie je nič z posledných 5 rokov (${now - 5}+, §1.3)`);
  }
  return w;
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

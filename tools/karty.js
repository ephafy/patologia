#!/usr/bin/env node
/* SPDX-License-Identifier: MIT (assets/js/karty-LICENSE.txt)
   ══════════════════════════════════════════════════════════════════════════
   tools/karty.js — kartičky z glosára a otázok: stručné, štruktúrované, preriedené

   Zapína sa v book.json:  "karty": {}
   Kniha bez tohto kľúča sa nemení.

     node tools/karty.js            vyrobí assets/karty/karty-data.js a overí eponymá
     node tools/karty.js --vypis    navyše vypíše výber po kapitolách a eponymá

   ZÁSADY
   - Karta NEPRINÁŠA nový text ani fakt: berie celé vety a odrážky z vlastného glosára a otázok
     knihy. Nič sa neskracuje uprostred vety (zmenil by sa význam) – čo sa nezmestí, je pod „viac“.
   - Jadro = všetko, čo text kapitol používa, okrem ľahkých pojmov (ručný zoznam v chapters/_karty.txt);
     eponymá a otázky (logické aj kazuistiky) ostávajú vždy.
   - POISTKA: každý eponym z textu kapitol musí mať kartu v jadre; inak skončí s chybou (kód 1).
   - Ručné úpravy výberu: chapters/_karty.txt
       + id             vždy v jadre
       - id             ľahký pojem: nie je v jadre (ostáva pod „Všetky“)
       ! Slovo          toto slovo nie je eponym (napr. „Slovenskej“)
       @ Názov | id     eponym z textu patrí k heslu id
       ~ tvar | Názov   eponym bez hesla: tvar z textu → názov v 1. páde na prednej strane
       / Názov          eponym z textu nemá pod „viac“ ukazovať heslo, ktoré ho len spomína
       = id  # dôvod    karta nepotrebuje mechanizmus (napr. názov kategórie, čisté pomenovanie)
   - POISTKA: karta bez vety „prečo / čím“ je chyba; staršie sú v pracovne/karty-bez-mechanizmu.txt (rohatka:
     zoznam sa smie len zmenšovať, nová karta bez mechanizmu zastaví build).
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");

const read = (p) => fs.readFileSync(p, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
const words = (s) => (String(s).replace(/<[^>]+>/g, " ").trim().match(/\S+/g) || []).length;
const strip = (s) => String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const DEF_WORDS = 34, ROW_WORDS = 22, ROWS = 3, ROWS_WORDS = 48, ANSWER_WORDS = 42;
/* Reťaz „A → B → C“ je patomechanizmus (prečo sa to deje) – na karte nesmie vypadnúť len pre dĺžku (23. 11. 2026:
   „Dystrofická kalcifikácia“ ukázala len definíciu). Má vlastný vyšší limit a vlastný rozpočet. */
const CHAIN_WORDS = 60, WHY_WORDS = 36;
/* veta, ktorá hovorí PREČO alebo ČÍM – bez nej je karta len definícia */
const WHY = /→|^Za\s.*zodpoved|(?<!\p{L})(?:lebo|pretože|keďže|preto|vďaka|čím|keď|spôsob\p{L}*|ved(?:ie|ú) k|vyvol\p{L}*|zap(?:ína|ne|nú)|vyp(?:ína|ne|nú)|spust\p{L}*|štiep\p{L}*|brzd\p{L}*|viaž\p{L}*|viaže|naviaž\p{L}*|aktivuj\p{L}*|inhibuj\p{L}*|zablok\p{L}*|blokuj\p{L}*)(?!\p{L})/iu;  // \b v JS nepozná diakritiku
const EPONYM_END = /(?:ov|ova|ovo|ove|ovej|ovu|ovou|ovho|ovmu|ovom|ovým|ových|ovými|ovcov|[aeiouyé]ho)$/;
const DISEASE = /syndróm|chorob|ochoren|nádor|karcin|sarkóm|lymfóm|leukém|\p{L}{3}itíd|\p{L}{3}óza\b|\p{L}{3}ómy?\b|nekróz|infarkt|anémi|trombóz|embóli|cirhóz|tuberkul|lepra|syfilis|sepsa|šok\b/iu;
const LOW_FILE = /zakladne-pojmy|bunka-tkanivo|metody-a-vysetrenia|mechanizmy-a-skratky/;
const CASE = /pacient|\bmuž|\bžen[auy]\b|chlapec|dievč|dieťa|dojč|novoroden|fajčiar|\d+\s?-?\s?ročn|\d+\s?rok/i;
const ABBR = new Set("napr tzv resp kap obr tab atď pod pozn príp cca vs t j č s roč min max str".split(" "));

/* ── načítanie ─────────────────────────────────────────────────────────── */
function glossary(ROOT) {
  const dir = path.join(ROOT, "assets", "glossary");
  global.window = { PF_GLOSSARY: [] };
  const from = new Map();
  fs.readdirSync(dir).filter((f) => /^\d+-.*\.js$/.test(f)).sort().forEach((f) => {
    const n = window.PF_GLOSSARY.length;
    (0, eval)(read(path.join(dir, f)));  // vlastné dáta projektu, rovnako ich číta anki.js a glossary-audit.js
    window.PF_GLOSSARY.slice(n).forEach((g) => { if (g && !from.has(g)) from.set(g, f); });
  });
  const D = window.PF_GLOSSARY.filter((g) => g && g.title);
  const kde = window.PF_GLOSSARY_KDE || {};
  const groups = window.PF_GROUPS || [];
  delete global.window;
  return { D, kde, from, groups };
}

function chapters(ROOT) {
  const CH = path.join(ROOT, "chapters");
  return fs.readdirSync(CH).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort().map((f) => {
    const src = read(path.join(CH, f));
    const stem = f.replace(/\.md$/, "");
    const num = ((src.match(/^num:\s*(.+)$/m) || [])[1] || "").trim();
    const title = ((src.match(/^title:\s*(.+)$/m) || [])[1] || stem).trim();
    const body = src.replace(/^---[\s\S]*?\n---\n/, "");
    const cut = body.search(/^##\s+(?:[\d.]+\s+)?(?:Otázky|Zdroje)/m);
    const text = cut >= 0 ? body.slice(0, cut) : body;
    const quiz = [];
    for (const m of src.matchAll(/```quiz[^\n]*\n([\s\S]*?)```/g)) {
      let q = null;
      m[1].split("\n").forEach((ln) => {
        const x = ln.trim();
        if (/^\?\s/.test(x)) { q = { q: x.slice(2), a: [] }; quiz.push(q); }
        else if (q && /^=\s/.test(x)) q.a.push(x.slice(2));
        else if (q && x && q.a.length) q.a.push(x);
      });
    }
    return { stem, num, title, text, quiz: quiz.filter((q) => q.a.length) };
  });
}

const plain = (md) => md
  .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/<[^>]+>/g, " ")
  .replace(/[*_`>#|]/g, " ");

/* ── text karty ────────────────────────────────────────────────────────── */
function sentences(t) {
  const out = [];
  let start = 0;
  const re = /[.!?…]["“”)*_]*\s+(?=[„("*_]*[\p{Lu}\d])/gu;
  let m;
  while ((m = re.exec(t))) {
    const before = t.slice(start, m.index).match(/([\p{L}]+)$/u);
    if (before && (ABBR.has(before[1].toLowerCase()) || before[1].length === 1)) continue;
    out.push(t.slice(start, m.index + m[0].trimEnd().length).trim());
    start = m.index + m[0].length;
  }
  const rest = t.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

/* celé vety, kým sa zmestia; krátke „Nie.“ / „Áno.“ sa nikdy neoddelí od vety, ktorá ho vysvetľuje */
function firstSentences(t, limit) {
  const ss = sentences(t);
  let out = "", n = 0;
  for (const s of ss) {
    const w = words(s);
    if (out && n >= 5 && n + w > limit) break;
    out += (out ? " " : "") + s;
    n += w;
  }
  return out;
}

function removeBlock(html, open) {
  let out = html, i;
  while ((i = out.indexOf(open)) >= 0) {
    const tag = (open.match(/^<(\w+)/) || [])[1];
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "g");
    re.lastIndex = i;
    let depth = 0, m, end = -1;
    while ((m = re.exec(out))) {
      depth += m[1] ? -1 : 1;
      if (!depth) { end = m.index + m[0].length; break; }
    }
    if (end < 0) break;
    out = out.slice(0, i) + out.slice(end);
  }
  return out;
}

function cleanBody(b) {
  let h = String(b || "").replace(/<img\b[^>]*>/g, "");
  ['<div class="sib', '<div class="pf-schema', '<p class="pf-schema-hint'].forEach((o) => { h = removeBlock(h, o); });
  return h.replace(/\s+/g, " ").trim();
}

/* prvá celá veta z hesla, ktorá vysvetľuje príčinu alebo účinok (nič nové – len sa vytiahne spod „viac“) */
function whySentence(body, def) {
  for (const m of body.matchAll(/<(p|li)\b[^>]*>((?:(?!<\/?(?:p|li|ul)\b)[\s\S])*?)<\/\1>/g)) {
    const block = strip(m[2]).replace(/^Prečo to je dôležité\.\s*/, "");
    for (const x of sentences(block)) {
      const w = words(x);
      if (w >= 5 && w <= WHY_WORDS && WHY.test(x) && !def.includes(x)) return x;
    }
  }
  return "";
}

function rows(body, def = "") {
  const out = [];
  let budget = ROWS_WORDS;
  const add = (t, kind) => {
    const w = words(t);
    if (out.length >= ROWS || w > ROW_WORDS || w > budget || w < 2 || out.some((x) => strip(x.t) === strip(t))) return;
    out.push(kind ? { k: kind, t } : { t });
    budget -= w;
  };
  const chain = body.match(/<p class="chain">([\s\S]*?)<\/p>/);
  if (chain) {
    let left = CHAIN_WORDS;
    chain[1].replace(/<span class="x">|<\/span>/g, "").split(/<br\s*\/?>/).map((x) => x.trim()).forEach((t) => {
      const w = words(t);
      if (w < 2 || w > left || out.length >= ROWS) return;
      out.push({ k: "chain", t });
      left -= w;
      budget -= Math.min(w, ROW_WORDS);
    });
  }
  if (!out.length && !WHY.test(strip(def))) {
    const t = whySentence(body, strip(def));
    if (t) { out.push({ k: "chain", t }); budget -= Math.min(words(t), ROW_WORDS); }
  }
  for (const m of body.matchAll(/<li>((?:(?!<\/?(?:li|ul)\b)[\s\S])*?)<\/li>/g)) add(m[1].trim());
  return out;
}

/* „AGE — pokročilé produkty (angl. …)“ → predná strana „AGE“, synonymum zvlášť, aby neprezradilo odpoveď */
function front(title) {
  let t = String(title).trim(), syn = "";
  const dash = t.match(/^(\S{1,14}(?:\s\S{1,8})?)\s[—–]\s(.+)$/);
  if (dash) { t = dash[1]; syn = dash[2]; }
  const par = t.match(/^(.+?)\s*\((.+)\)\s*$/);
  if (par) { t = par[1].trim(); syn = syn ? `${syn}; ${par[2]}` : par[2]; }
  const sp = syn.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (sp) syn = `${sp[1]}; ${sp[2]}`;
  const kept = syn.split(/;\s*/).filter((x) => x && !/^angl\.?\s/i.test(x)).join("; ").replace(/,?\s*angl\.\s.*$/i, "").trim();
  return { f: t, syn: kept };
}

/* ── eponymá ───────────────────────────────────────────────────────────── */
function eponymsFromText(chs, stop) {
  const lower = new Set();
  chs.forEach((c) => (plain(c.text).match(/\p{L}+/gu) || []).forEach((w) => { if (w === w.toLowerCase()) lower.add(w); }));
  const isEp = (tok) => {
    const parts = tok.split(/[-–]/);
    return !stop.has(tok) && parts.every((p) => /^\p{Lu}\p{Ll}{2,}/u.test(p) && !lower.has(p.toLowerCase())) &&
      EPONYM_END.test(parts[parts.length - 1]);
  };
  const found = new Map();
  chs.forEach((c, ci) => {
    const t = plain(c.text).replace(/\s+/g, " ");
    for (const m of t.matchAll(/(?<![\p{L}\p{N}-])(\p{Lu}\p{Ll}{2,}(?:[-–]\p{Lu}\p{Ll}+)*)(?:\s+a\s+\p{Lu}\p{Ll}+)?\s+(\p{Ll}{3,})/gu)) {
      if (!isEp(m[1])) continue;
      const base = m[1].toLowerCase().split(/[-–]/).map((p) => p.replace(EPONYM_END, "")).join("-");
      const key = `${base} ${m[2].slice(0, 3)}`;
      if (!found.has(key)) found.set(key, { key, base, noun: m[2].slice(0, 3).toLowerCase(), phrase: `${m[1]} ${m[2]}`, ch: ci, n: 0 });
      found.get(key).n++;
    }
  });
  return { list: [...found.values()], isEp };
}

/* odpoveď na eponym bez vlastného hesla: riadok tabuľky (hlavička → bunka), odrážka alebo veta z knihy */
/* po odstránení odkazu „[→ …]“ ostávajú zvyšky zátvoriek: „( )“, „(; masa…“, „(…, )“ – 26. 11. 2026 ich bolo 24 v kartách */
const tidy = (s) => String(s).replace(/\(\s*[;,·]\s*/g, "(").replace(/\s*[;,·]\s*\)/g, ")").replace(/\s*\(\s*\)/g, "").replace(/\s+([,.;:])(?=\s|$)/g, "$1").replace(/\s{2,}/g, " ");
const inline = (x) => tidy(mdInline(x.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[→[^\]]*\]\([^)]*\)/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
function contextFor(c, phrase) {
  const lines = c.text.split("\n");
  const has = (l) => plain(l).replace(/\s+/g, " ").includes(phrase);
  const hits = lines.map((l, i) => [l, i]).filter(([l]) => has(l) && !/^#{1,4}\s|^!\[|^```/.test(l.trim()));
  let table = null;
  for (const [raw, i] of hits) {
    const l = raw.replace(/^(?:>\s*)+/, "").trim();
    if (l.startsWith("|")) {
      if (table) continue;
      let h = i; while (h > 0 && /^(?:>\s*)*\|/.test(lines[h - 1])) h--;
      const cells = (x) => x.replace(/^(?:>\s*)+/, "").trim().replace(/^\||\|$/g, "").split("|").map((y) => inline(y.replace(/\{\w+\}/g, "")));
      const head = cells(lines[h]), row = cells(l);
      const k = Math.max(0, row.findIndex((y) => strip(y).includes(phrase)));
      const others = row.map((v, j) => ({ h: head[j], v, j })).filter((x) => x.j !== k && x.v && x.v !== "—");
      if (others.length) table = { a: k === 0 ? `${others[0].h}: ${others[0].v}` : `${row[0]} – ${head[k]}: ${row[k]}`,
        r: (k === 0 ? others.slice(1) : others.filter((x) => x.j !== 0)).filter((x) => words(x.v) <= ROW_WORDS).slice(0, 3).map((x) => ({ t: `<b>${x.h}</b> — ${x.v}` })) };
      continue;
    }
    const txt = inline(l.replace(/^[-*]\s+|^\d+\.\s+|^\[![A-Z]+\]\s*/, ""));
    const sent = sentences(txt).find((x) => strip(x).includes(phrase));
    if (sent && words(sent) >= 6) return { a: sent, r: [] };
  }
  return table;
}

/* ── kostra kapitoly (od 24. 11. 2026) ─────────────────────────────────────
   Karty „kostra“ idú v poradí výkladu: mapa kapitoly → každá sekcia ## s Jadrom a zoznamom podsekcií →
   každá podsekcia s úvodnou vetou (tá podľa politiky hovorí, čo sekcia rieši a podľa čoho sa delí), reťazou
   a prvým stĺpcom tabuľky → riadky Súhrnu. Text je celý z kapitoly (celé vety), nič nové. Nie sú v jadre
   opakovaní – ukazuje ich režim „Kostra“ v appke (spolu s otázkami kapitoly). */
const KOSTRA_INTRO = 45, KOSTRA_LIST = 40;
/* text z .md bez odkazov „[→ …]“ (ostali by prázdne zátvorky) */
const kInline = inline;
/* Flows stoja na základe kapitoly (§2.7): rozšírenia (:::rozsirenie … :::) a nedoložené poznámky „Môžeš počuť“ ([!POCUT])
   do kariet nejdú. :::stlpec a :::bunka sú len oddeľovače vo vnútri :::stlpce / :::mriezka. */
function baseLines(lines) {
  const out = [];
  let depth = 0, skipAt = -1, fence = false, pocut = false;
  for (const l of lines) {
    const x = l.trim();
    if (/^```/.test(x)) fence = !fence;
    if (!fence && /^:::/.test(x)) {
      const w = (x.match(/^:::\s*(\S+)/) || [])[1];
      if (w && !/^(?:stlpec|bunka)$/.test(w)) { depth++; if (skipAt < 0 && /^rozsirenie\b/.test(w)) skipAt = depth; }
      else if (!w) { const was = depth; depth = Math.max(0, depth - 1); if (skipAt >= 0 && was === skipAt) { skipAt = -1; continue; } }
      if (skipAt >= 0) continue;
    }
    if (skipAt >= 0) continue;
    if (!fence && /^>\s*\[!POCUT\]/.test(x)) { pocut = true; continue; }
    if (pocut) { if (/^>/.test(x)) continue; pocut = false; }
    out.push(l);
  }
  return out;
}
function parseSecs(text) {
  const secs = [];
  let cur = null, fence = false;
  text.split("\n").forEach((l) => {
    if (/^```/.test(l.trim())) fence = !fence;
    const m = !fence && l.match(/^(#{2,4})\s+(?:(\d+(?:\.\d+)*)\s+)?(.+?)\s*$/);
    if (m) { cur = { lvl: m[1].length, num: m[2] || "", t: m[3], body: [] }; secs.push(cur); }
    else if (cur) cur.body.push(l);
  });
  secs.forEach((s) => { s.body = baseLines(s.body); });
  return secs;
}
/* súvislý text sekcie po odsekoch (md): bez tabuliek, obrázkov, schém, Jadra a štítkov boxov */
function prose(lines) {
  const paras = [];
  let cur = [], fence = false, jadro = false;
  const flush = () => { if (cur.length) paras.push(cur.join(" ")); cur = []; };
  for (const raw of lines) {
    const x = raw.trim();
    if (/^```/.test(x)) { fence = !fence; flush(); continue; }
    if (fence || !x || /^(?:\||!\[|<|:::|#)/.test(x)) { flush(); jadro = false; continue; }
    const quoted = /^>/.test(x);
    let t = x.replace(/^(?:>\s*)+/, "");
    if (!quoted) jadro = false;
    if (/^\[![A-Z]+\]/.test(t)) { flush(); jadro = /^\[!JADRO\]/.test(t); continue; }
    if (jadro) continue;
    if (!t || /^\*\*[^*]+\*\*$/.test(t) || /^\|/.test(t)) { flush(); continue; }   // štítok boxu
    if (/^[-*]\s+|^\d+\.\s+/.test(t)) { flush(); cur.push(t.replace(/^[-*]\s+|^\d+\.\s+/, "")); flush(); continue; }
    cur.push(t);
  }
  flush();
  return paras;
}
const unHtml = (s) => strip(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const escH = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* vety sekcie ako čistý text (vrátane viet z boxov Mechanizmus, Klinika… – sú to vety kapitoly) */
const plainSentences = (lines) => prose(lines).flatMap((p) => sentences(unHtml(kInline(p))));
/* vety s informáciou, čo je v nich tučne (md): pojem, ktorý veta zdôrazní, ju vysvetľuje */
const mdSentences = (lines) => prose(lines).flatMap((p) => sentences(p.replace(/\[→[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")))
  .map((md) => ({ md, p: unHtml(kInline(md)), b: (md.match(/\*\*[^*]+\*\*/g) || []).map((x) => x.slice(2, -2)).join(" . ") }));
function kostra(c, ci) {
  const out = [];
  const secs = parseSecs(c.text);
  c.secs = secs;
  const blocks = (body) => {
    const bs = []; let b = [], fen = false;
    body.forEach((l) => {
      if (/^```/.test(l.trim())) { fen = !fen; b.push(l); return; }
      if (!fen && !l.trim()) { if (b.length) bs.push(b); b = []; return; }
      b.push(l);
    });
    if (b.length) bs.push(b);
    return bs;
  };
  const isPara = (b) => !/^(?:>|\||!\[|<|[-*]\s|\d+\.\s|:::|```)/.test(b[0].trim());
  const short = (t) => t.replace(/\s*[:–—].*$/, "").trim();
  const anchor = (s) => (s.lvl === 2 ? "sec-" : "sub-") + s.num.replace(/\./g, "-");
  const cellsOf = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((y) => y.trim());
  const image = (body) => {
    for (const l of body) {
      const m = l.trim().match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/);
      if (!m || /^https?:/.test(m[2])) continue;
      const file = m[2];
      const src = file.startsWith("fig/") ? "chapters/" + file : "assets/images/" + file.replace(/^img\//, "");
      const [cr, h] = String(m[3] || "").split("|").map((x) => x.trim());
      return { s: src, a: strip(kInline(m[1].replace(/^Obr\.\s*[\d.]+\s*[—–-]\s*/, ""))).slice(0, 200), c: kInline(m[1]), cr: cr || "", h: h || "" };
    }
    return null;
  };
  const card = (id, f, a, r, m, h, sec, im) => out.push({ id: `s-${c.stem.slice(0, 2)}-${id}`, k: "s", f, syn: "", a, r, m, et: "", im,
    ch: ci, sec, h, sc: 0, g: null, ord: out.length });
  const kids = (i) => { const r = []; for (let j = i + 1; j < secs.length && secs[j].lvl > secs[i].lvl; j++) if (secs[j].lvl === secs[i].lvl + 1) r.push(secs[j]); return r; };
  const listRow = (label, xs) => {
    let left = KOSTRA_LIST; const kept = [];
    for (const x of xs) { const w = words(x); if (kept.length && w > left) break; kept.push(x); left -= w; }
    return kept.length ? [{ t: `<b>${label}</b> ` + kept.join(" · ") + (kept.length < xs.length ? " · …" : "") }] : [];
  };
  const tops = secs.filter((s) => s.lvl === 2 && !/^(?:Súhrn|Otázky|Zdroje)/.test(s.t));
  secs.forEach((s, i) => {
    if (/^(?:Súhrn|Otázky|Zdroje)/.test(s.t)) {
      if (!/^Súhrn/.test(s.t)) return;
      const rows = s.body.filter((l) => /^\|/.test(l.trim()));
      rows.slice(2).forEach((l, k) => {
        const x = cellsOf(l);
        if (x.length < 2 || !strip(x[0]) || !strip(x[1])) return;
        const link = (x[2] || "").match(/\]\(([\w-]*)#((?:sec|sub)-[\d-]+)\)/);
        const lab = (x[2] || "").match(/\[→\s*([\d.]+)/);
        const q = kInline(x[0]);
        card(`suhrn-${k + 1}`, /\?\s*$/.test(strip(q)) ? q : `Súhrn: ${q}`, kInline(x[1]), [], "", `chapters/${(link && link[1]) || c.stem}.html${link ? "#" + link[2] : ""}`,
          lab ? lab[1] : s.num, null);
      });
      return;
    }
    const bs = blocks(s.body);
    const paras = bs.filter(isPara).map((b) => kInline(b.join(" "))).filter((t) => words(t) >= 4);
    const jadro = bs.find((b) => /^>\s*\[!JADRO\]/.test(b[0].trim()));
    const table = bs.find((b) => /^\|/.test(b[0].trim()));
    const chain = bs.find((b) => /^```chain/.test(b[0].trim()));
    const ch = kids(i);
    const f = (s.num ? s.num + " " : "") + kInline(s.t);
    let a = "", r = [];
    if (s.lvl === 2 && jadro) a = kInline(jadro.slice(1).map((l) => l.replace(/^>\s?/, "")).join(" "));
    if (!a && paras[0]) a = firstSentences(paras[0], KOSTRA_INTRO);
    if (!a) return;
    if (ch.length) r = listRow(s.lvl === 2 ? "Podsekcie:" : "Delí sa na:", ch.map((x) => `${x.num} ${kInline(short(x.t))}`));
    else if (s === tops[0] && tops.length > 1) r = listRow("Kapitola:", tops.slice(1).map((x) => `${x.num} ${kInline(short(x.t))}`));
    if (chain) chain.slice(1, -1).map((l) => kInline(l)).filter((t) => words(t) >= 2).slice(0, 3).forEach((t) => r.push({ k: "chain", t }));
    if (table && r.length < 3) {
      const rows = table.filter((l) => /^\|/.test(l.trim()));
      const head = cellsOf(rows[0]);
      const col = rows.slice(2).map((l) => strip(kInline(cellsOf(l)[0] || ""))).filter(Boolean);
      if (col.length && head[0]) r.push(...listRow(`${strip(kInline(head[0]))}:`, col));
    }
    const more = paras.slice(0, 2).join("</p><p>");
    card(anchor(s), f, a, r, more && more !== a ? `<p>${more}</p>` : "", `chapters/${c.stem}.html` + (s.num ? "#" + anchor(s) : ""), s.num, image(s.body));
    const k = out[out.length - 1];
    k.txt = s.body.join("\n");   // vlastný text sekcie (bez podsekcií) – z neho pojmy, ktoré tu zaznejú prvýkrát
    k.lv = s.lvl; k.tt = kInline(s.t); k.sobj = s;
  });
  return out;
}

/* ── Učenie: pojmy na svojom mieste, veta z kapitoly a interaktívne karty (26. 11. 2026) ─────────────────
   Autor: „pojmy pokrýva akoby len glosár… často to nie je s tou témou“; „učenie je prepis kapitol, nadpis o ničom nehovorí…
   interaktívne… a čo s tým, keď používateľ označí obťažnosť“. Preto:
   - Pojem ide za časť kostry, kde je DOMA (98-kde.js), nie za prvú zmienku (kap. 13: enchondróm, SS18::SSX… stáli v 13.2.2 ako príklad).
   - Karta pojmu dostane vetu z kapitoly (pole x), v ktorej pojem zaznie – najprv v časti, kde je doma. Definícia z glosára ide pod ňu.
   - Pojem z inej kapitoly a pojem bez domova, ktorý kapitola nezdôrazní tučne (maternica, T, N, M…), nie je karta v Učení, len čip (tc).
   - Interaktívne karty (druh „i“, pole it) – všetko z textu kapitoly, z hesiel a z obrázkov v registri; nový text ani fakt nevzniká:
       zor  zoraď kroky reťaze (```chain v kapitole, reťaz v hesle)
       pri  priraď (tabuľka: prvý stĺpec ↔ krátky stĺpec)
       roz  rozlíš A × B (porovnávacia tabuľka: znak | A | B …)
       dop  doplň Jadro (tučné slová skryté, odkrývajú sa ťuknutím)
       num  odhadni číslo (veta kapitoly s jedným číslom a jednotkou)
       obr  čo je na obrázku (fotografia z hesla choroby; 4 možnosti z tej istej skupiny alebo kapitoly)
   Do Učenia ide za každú časť najviac LEARN_IX interakcií, do jadra opakovania tie isté + všetky „obr“; ostatné sú pod „Všetky“. */
const LEARN_IX = 4, MAX_T = 8, SKIP = new Set(["q", "s", "i"]);
const CRIT = /^(?:znak|vlastnos[tť]\p{L}*|krit[ée]ri\p{L}*|rozdiel|parameter|porovnanie)?$/iu;
const NOT_ENT = /^(?:prečo|čo za ňou stojí|príklad|príklady|poznámka|kde|mechanizmus|domov)/i;
const UNIT = "%|cm|mm|µm|μm|nm|kg|g|mg|ml|mmHg|°C|h|hod(?:ín|iny|inách)?|min(?:út)?|dní|dňa|dni|týždň(?:ov|a)|týždne|mesiac(?:ov|e|a|och)?|rok(?:ov|y|a|u|och|mi)?";
const NUM = new RegExp(`(?<![\\p{L}\\d.,])((?:[<>≤≥]|viac ako|menej ako|nad|pod|do|asi|približne|≈)\\s*)?(\\d+(?:,\\d+)?)(?:\\s*[–-]\\s*(\\d+(?:,\\d+)?))?\\s*(${UNIT})(?![\\p{L}\\d])`, "gu");
/* celá veta: začína veľkým písmenom alebo číslom a končí interpunkciou (nie úlomok odrážky „žiarenie – …,“) */
const whole = (s) => /^[„"(]?[\p{Lu}\d]/u.test(s) && /[.!?…]["“”)]*$/.test(s);
const hashS = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const fold = (s) => unHtml(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const cellsMd = (l) => l.trim().replace(/^(?:>\s*)+/, "").replace(/^\||\|$/g, "").split("|").map((y) => y.trim());

function tablesOf(lines) {
  const out = []; let cur = null, fence = false;
  lines.forEach((l) => {
    const x = l.trim();
    if (/^```/.test(x)) fence = !fence;
    if (!fence && /^(?:>\s*)*\|/.test(x)) { (cur || (cur = [], out.push(cur), cur)).push(x); }
    else cur = null;
  });
  return out.filter((t) => t.length >= 4 && /^[|:\-\s]+$/.test(t[1].replace(/^(?:>\s*)+/, "")));
}

function learnLinks(cards, chs, kde, groups, hitIds, M) {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const made = [];
  const grp = new Map();
  groups.forEach((g, gi) => (g.members || []).forEach((m) => { if (!grp.has(m[0])) grp.set(m[0], new Set()); grp.get(m[0]).add(gi); }));
  const homeNum = (t, ci) => {
    const k = kde[t.id];
    if (!k || !String(k[0]).startsWith(chs[ci].stem + ".html")) return "";
    return (String(k[1]).match(/^\d+(?:\.\d+)*/) || [""])[0];
  };
  const own = (t, ci) => t.ch === ci && t.j && !SKIP.has(t.k);
  /* fotografie: obrázok, ktorý patrí viacerým kartám, by nemal jednu odpoveď */
  const srcUse = new Map();
  cards.forEach((c) => { if (c.j && c.im && !SKIP.has(c.k)) srcUse.set(c.im.s, (srcUse.get(c.im.s) || 0) + 1); });
  const photo = (c) => c.im && /\.(?:jpe?g|png|webp)$/i.test(c.im.s) && srcUse.get(c.im.s) === 1;
  const visual = cards.filter((c) => c.j && (c.k === "d" || (c.k === "e" && DISEASE.test(c.f))) && photo(c));

  chs.forEach((c, ci) => {
    const stem2 = c.stem.slice(0, 2);
    const ks = cards.filter((k) => k.k === "s" && k.ch === ci && k.sobj).sort((a, b) => a.ord - b.ord);
    const byNum = new Map(ks.map((k) => [k.sec, k]));
    const boldCh = new Set(hitIds((c.text.match(/\*\*[^*\n]+\*\*/g) || []).map(plain).join(" . ")));
    const mention = new Map();
    ks.forEach((k) => {
      k._hits = M.all(plain(k.txt).replace(/\s+/g, " ")).filter((h) => !h.rejected);
      k._hits.forEach((h) => { const id = h.item.term.id; if (!mention.has(id)) mention.set(id, k); });
      k._bold = hitIds((k.txt.match(/\*\*[^*\n]+\*\*/g) || []).map(plain).join(" . "));
      k.tc = [];
    });
    const assign = new Map(), chipSeen = new Set();
    const chip = (k, id) => { if (chipSeen.has(id)) return; chipSeen.add(id); k.tc.push(id); };
    cards.filter((t) => own(t, ci)).forEach((t) => {
      const hn = homeNum(t, ci);
      let k = hn ? byNum.get(hn) : null;
      for (let n = hn; hn && !k && n.includes("."); ) { n = n.replace(/\.\d+$/, ""); k = byNum.get(n); }   // domov v #### bez vlastnej karty → rodič
      if (!hn && !boldCh.has(t.id) && t.k !== "e" && t.k !== "d") { const m = mention.get(t.id); if (m) chip(m, t.id); return; }
      k = k || mention.get(t.id);
      if (k) assign.set(t.id, k);
    });
    ks.forEach((k) => {
      const order = [], seen = new Set();
      k._hits.forEach((h) => { const id = h.item.term.id; if (assign.get(id) === k && !seen.has(id)) { seen.add(id); order.push(id); } });
      assign.forEach((kk, id) => { if (kk === k && !seen.has(id)) { seen.add(id); order.push(id); } });
      /* dlhý rad pojmov (13.3.3: 18 markerov) unaví a nič neprepojí: choroby (a eponymá) ostávajú vždy, ostatné pojmy (markery,
         gény, bielkoviny) len do MAX_T kariet spolu; zvyšok sú čipy na karte časti (a v opakovaní) – ich vzťahy nesie interakcia
         Priraď / Rozlíš z tabuľky tej istej časti */
      const dz = (id) => { const t = byId.get(id); return t.k === "d" || t.k === "e"; };
      if (order.length > MAX_T) {
        const bold = new Set(k._bold), room = Math.max(4, MAX_T - order.filter(dz).length);
        const w = (id) => { const t = byId.get(id); return (bold.has(id) ? 10 : 0) + (t.im ? 1 : 0) + t.sc; };
        const keep = new Set([...order.filter(dz), ...order.filter((id) => !dz(id)).sort((a, b) => w(b) - w(a)).slice(0, room)]);
        order.filter((id) => !keep.has(id)).forEach((id) => { chipSeen.add(id); k.tc.push(id); byId.get(id).ks = k.id; });
        order.splice(0, order.length, ...order.filter((id) => keep.has(id)));
      }
      k.t = order;
      order.forEach((id) => { byId.get(id).ks = k.id; });
      k._bold.forEach((id) => { const t = byId.get(id); if (t && t.ch !== ci && t.j && !SKIP.has(t.k)) chip(k, id); });
      if (order.length) {
        const names = order.map((id) => strip(byId.get(id).f));
        let left = KOSTRA_LIST; const kept = [];
        for (const x of names) { const w = words(x); if (kept.length && w > left) break; kept.push(x); left -= w; }
        k.r.push({ k: "pojmy", t: "<b>Pojmy tu:</b> " + kept.join(" · ") + (kept.length < names.length ? ` · +${names.length - kept.length}` : "") });
      }
    });

    /* veta z kapitoly pri pojme: najprv časť, kde je doma, potom ostatné v poradí výkladu */
    const ctx = new Map();
    ks.forEach((k) => {
      const mp = new Map();
      mdSentences(k.txt.split("\n")).forEach((x) => {
        const s = x.p, w = words(s);
        if (w < 6 || w > 44) return;
        const bold = new Set(x.b ? hitIds(plain(x.b)) : []);
        const full = whole(s) ? 2 : -2, len = w <= 32 ? 1 : 0;
        M.all(s).forEach((h) => {
          if (h.rejected) return;
          const id = h.item.term.id, l = mp.get(id) || [];
          /* veta, ktorá pojem zdôrazní tučne alebo ním začína, ho vysvetľuje; veta, kde je len spomenutý na konci, nie;
             celá veta má prednosť pred úlomkom odrážky a kratšia pred dlhou */
          const sc = full + len + (bold.has(id) ? 4 : 0) + (h.index < 3 ? 3 : h.index < 40 ? 1 : 0) - (/(?<!\p{L})(?:nie|nemení|ani)(?!\p{L})/u.test(s.slice(Math.max(0, h.index - 25), h.index)) ? 3 : 0) - (/^(?:Patr[ií]|Sem patr|Ďalej|Ďalšie|Napríklad)/.test(s) ? 2 : 0);
          l.push({ p: s, sc, n: l.length, h: escH(s.slice(0, h.index)) + "<mark>" + escH(h[0]) + "</mark>" + escH(s.slice(h.index + h[0].length)) });
          mp.set(id, l);
        });
      });
      mp.forEach((l) => l.sort((a, b) => b.sc - a.sc || a.n - b.n));
      ctx.set(k, mp);
    });
    cards.filter((t) => t.ch === ci && !SKIP.has(t.k)).forEach((t) => {
      const first = assign.get(t.id) || (t.ks && byId.get(t.ks)) || null;
      const order = first && ctx.has(first) ? [first, ...ks.filter((k) => k !== first)] : ks;
      const def = fold(t.a);
      for (const k of order) {
        const hit = (ctx.get(k).get(t.id) || []).find((x) => !def.includes(fold(x.p).slice(0, 60)));
        if (hit) { t.x = { t: hit.h, s: k.sec }; break; }
      }
    });

    /* ── interakcie ── */
    const ix = new Map(ks.map((k) => [k, []]));
    const mk = (k, it, key, f, d, extra) => {
      const card = Object.assign({ id: `i-${stem2}-${it}-${key}`, k: "i", it, f, syn: "", a: "", r: [], m: "", et: "", im: null,
        ch: ci, sec: k ? k.sec : "", h: k ? k.h : `chapters/${c.stem}.html`, sc: 0, g: null, d, ks: k ? k.id : "" }, extra || {});
      made.push(card);
      if (k) ix.get(k).push(card);
      return card;
    };
    const steps = (html) => {
      const st = html.replace(/\s*⟳\s*$/, "").split(/\s*→\s*/).map((x) => x.trim()).filter(Boolean);
      if (/[⊣←]/.test(unHtml(html)) || st.length < 4 || st.length > 8 || st.some((x) => words(x) > 18 || words(x) < 1)) return null;
      return new Set(st.map(fold)).size === st.length ? st : null;
    };
    ks.forEach((k) => {
      const s = k.sobj;
      /* doplň Jadro */
      const jl = []; let inJ = false;
      s.body.forEach((l) => { const x = l.trim(); if (/^>\s*\[!JADRO\]/.test(x)) { inJ = true; return; } if (inJ && /^>/.test(x)) jl.push(x.replace(/^>\s?/, "")); else inJ = false; });
      if (jl.length) {
        const md = jl.join(" ");
        const segs = [...md.matchAll(/\*\*([^*]+)\*\*/g)].map((m, n) => ({ n, raw: m[0], t: m[1], w: words(m[1]) }));
        const cand = segs.filter((x) => x.w >= 1 && x.w <= 5).map((x) => ({ ...x, sc: (/\d/.test(x.t) ? 3 : 0) + (hitIds(plain(x.t)).length ? 2 : 0) + 1 }));
        if (cand.length >= 2) {
          const pick = new Set(cand.slice().sort((a, b) => b.sc - a.sc || a.n - b.n).slice(0, Math.min(3, Math.max(2, Math.ceil(cand.length / 2)))).map((x) => x.n));
          let n = 0, b = 0;
          const html = tidy(mdInline(md.replace(/\[→[^\]]*\]\([^)]*\)/g, "").replace(/\*\*([^*]+)\*\*/g, (m0, t) => (pick.has(n++) ? `\u0001${t}\u0002` : `**${t}**`))))
            .replace(/\u0001([^\u0002]*)\u0002/g, (m0, t) => `<b class="bl" data-b="${b++}">${t}</b>`);
          mk(k, "dop", k.sec.replace(/\./g, "-"), k.tt, { t: html, n: b });
        }
      }
      /* zoraď: reťaz v kapitole */
      let ci2 = 0, fence = false;
      s.body.forEach((l) => {
        const x = l.trim();
        if (/^```/.test(x)) { fence = /^```chain/.test(x) ? !fence : false; return; }
        if (!fence || !x) return;
        const st = steps(kInline(x));
        if (st) mk(k, "zor", `${k.sec.replace(/\./g, "-")}-${++ci2}`, k.tt, { st }, { m: `<p class="chain">${st.join(" → ")}</p>` });
      });
      /* tabuľky: rozlíš alebo priraď */
      tablesOf(s.body).forEach((tb, ti) => {
        const head = cellsMd(tb[0]).map((x) => unHtml(kInline(x)));
        const rows = tb.slice(2).map(cellsMd).filter((r) => r.length >= head.length - 1);
        if (rows.length < 3 || head.length < 2) return;
        const key = `${k.sec.replace(/\./g, "-")}-${ti + 1}`;
        const ent = head.map((h, j) => ({ h, j })).filter((x) => x.j > 0 && x.h && words(x.h) <= 5 && !NOT_ENT.test(x.h));
        if (CRIT.test(head[0]) && ent.length >= 2 && ent.length <= 4) {
          if (ent.some((e) => /^\d/.test(e.h))) return;   // bodová stupnica (FNCLCC: 1 bod | 2 body…): bunka môže mať vlastné body – otázka by klamala
          const q = [];
          rows.forEach((r) => {
            const lab = kInline(r[0] || ""), vals = ent.map((e) => kInline(r[e.j] || ""));
            const pl = vals.map(fold);
            vals.forEach((v, ei) => {
              const p = unHtml(v);
              if (!p || /^[—–-]$/.test(p) || words(p) > 26 || pl.filter((x) => x === pl[ei]).length > 1) return;
              q.push([lab, v, ei]);
            });
          });
          const per = ent.map((_, ei) => q.filter((x) => x[2] === ei).length);
          if (q.length >= 4 && per.every((n) => n >= 1)) mk(k, "roz", key, k.tt, { e: ent.map((e) => e.h), q });
          return;
        }
        if (!head[0] || CRIT.test(head[0])) return;
        const keys = rows.map((r) => kInline(r[0] || ""));
        const kp = keys.map(fold);
        if (kp.some((x) => !x || words(x) > 8) || new Set(kp).size !== kp.length) return;
        let best = null;
        for (let j = 1; j < head.length; j++) {
          if (!head[j] || NOT_ENT.test(head[j])) continue;
          const v = rows.map((r) => kInline(r[j] || "")), vp = v.map(fold), w = vp.map(words);
          /* krátke bunky: dvojica stĺpcov sa musí zmestiť aj na telefón 360 × 640 (kľúč ≤ 8 slov, hodnota ≤ 9, priemer ≤ 6) */
          if (vp.some((x) => !x || /^[—–-]$/.test(x)) || new Set(vp).size !== vp.length || Math.max(...w) > 9) continue;
          const avg = w.reduce((a, b) => a + b, 0) / w.length;
          if (avg <= 6 && (!best || avg < best.avg)) best = { j, v, avg };
        }
        if (best) mk(k, "pri", key, k.tt, { a: head[0], b: head[best.j], p: keys.map((x, n) => [x, best.v[n]]) });
      });
      /* odhadni číslo: prvá veta časti s jediným číslom a jednotkou */
      for (const sent of plainSentences(s.body)) {
        const w = words(sent);
        if (w < 6 || w > 40 || !whole(sent) || /Obr\.|Tab\./.test(sent)) continue;
        const all = [...sent.matchAll(NUM)];
        if (all.length !== 1 || (sent.match(/\d+(?:,\d+)?/g) || []).length > (all[0][3] ? 2 : 1)) continue;
        const m = all[0], lo = parseFloat(m[2].replace(",", ".")), hi = m[3] ? parseFloat(m[3].replace(",", ".")) : lo;
        if (!(hi >= lo) || (lo === 0 && hi === 0)) continue;
        const at = m.index + (m[1] || "").length;
        mk(k, "num", k.sec.replace(/\./g, "-"), k.tt, { pre: escH(sent.slice(0, at)), post: escH(sent.slice(m.index + m[0].length)), u: m[4], lo, hi,
          v: escH(m[0].slice((m[1] || "").length)) });
        break;
      }
      /* pojmy časti: zoraď mechanizmus z hesla, obrázok */
      (k.t || []).forEach((id) => {
        const t = byId.get(id);
        const ch = (t.r || []).find((x) => x.k === "chain" && /→/.test(x.t));
        const st = ch && steps(ch.t);
        if (st) mk(k, "zor", "g-" + t.id, strip(t.f), { st, g: t.id }, { id: `i-zor-${t.id}`, m: `<p class="chain">${st.join(" → ")}</p>`, sec: t.sec || k.sec, h: t.h || k.h });
      });
    });
    /* obrázok: každá choroba kapitoly s vlastnou fotografiou */
    visual.filter((t) => t.ch === ci).forEach((t) => {
      const gs = grp.get(t.id) || new Set(), tok = fold(t.f).split(/[\s-]+/).filter((x) => x.length >= 5), last = tok[tok.length - 1] || "";
      const nm = fold(t.f), syn = fold(t.syn || "");
      const opts = visual.filter((o) => o !== t && o.im.s !== t.im.s).map((o) => {
        const on = fold(o.f);
        if (on === nm || nm.includes(on) || on.includes(nm) || (syn && syn.includes(on))) return null;
        const ot = on.split(/[\s-]+/).filter((x) => x.length >= 5);
        let sc = 0;
        if ([...(grp.get(o.id) || [])].some((g) => gs.has(g))) sc += 6;
        if (o.ch === t.ch) sc += 3; else if (Math.abs(o.ch - t.ch) === 1) sc += 1;
        if (last && ot.length && ot[ot.length - 1].slice(-5) === last.slice(-5)) sc += 2;
        if (ot.some((x) => tok.includes(x))) sc += 1;
        return { o, sc: sc + (hashS(t.id + o.id) % 1000) / 1000 };
      }).filter(Boolean).sort((a, b) => b.sc - a.sc);
      const pick = [];
      for (const x of opts) { if (pick.length >= 3) break; if (!pick.some((p) => fold(p.f) === fold(x.o.f))) pick.push(x.o); }
      if (pick.length < 3) return;
      const o = [t, ...pick].sort((a, b) => hashS(t.id + a.id) - hashS(t.id + b.id)).map((x) => x.id);
      const k = byId.get(t.ks) || null;
      mk(k && k.ch === ci ? k : null, "obr", t.id, "Čo je na obrázku?", { a: t.id, o }, { id: `i-obr-${t.id}`, im: t.im, sec: t.sec, h: t.h, ks: k && k.ch === ci ? k.id : "" });
    });

    /* do Učenia: najviac LEARN_IX za časť, rôzne druhy; v jadre opakovania tie isté a všetky obrázky */
    const ORDER = ["dop", "roz", "pri", "zor", "obr", "num"];
    ks.forEach((k) => {
      const l = ix.get(k), sel = [];
      ORDER.forEach((it) => { const x = l.find((y) => y.it === it && !sel.includes(y)); if (x && sel.length < LEARN_IX) sel.push(x); });
      l.forEach((y) => { if (sel.length < LEARN_IX && !sel.includes(y) && y.it !== "zor") sel.push(y); });
      k.ix = sel.map((y) => y.id);
      sel.forEach((y) => { y.j = 1; });
    });
    made.forEach((y) => { if (y.ch === ci && y.it === "obr") y.j = 1; });
    /* otázky kapitoly za časťou, na ktorú odpoveď odkazuje */
    cards.filter((q) => q.k === "q" && q.ch === ci).forEach((q) => {
      let n = q.sec, k = null;
      while (n && !(k = byNum.get(n)) && n.includes(".")) n = n.replace(/\.\d+$/, "");
      if (k) (k.qz || (k.qz = [])).push(q.id);
    });
    ks.forEach((k) => { delete k._hits; delete k._bold; });
  });
  return made;
}

/* ── model ─────────────────────────────────────────────────────────────── */
function model(ROOT, BOOK) {
  const { D, kde, from, groups } = glossary(ROOT);
  const chs = chapters(ROOT);
  const chIdx = new Map(chs.map((c, i) => [c.stem, i]));
  const PF = require(path.join(ROOT, "assets", "js", "pf-match.js"));

  const over = { nowhy: new Set(), add: new Set(), del: new Set(), stop: new Set(), link: new Map(), name: new Map(), norel: new Set() };
  const of = path.join(ROOT, "chapters", "_karty.txt");
  if (fs.existsSync(of)) read(of).split("\n").forEach((l) => {
    const x = l.trim();
    if (x.startsWith("= ")) over.nowhy.add(x.slice(2).split("#")[0].trim());
    else if (x.startsWith("+ ")) over.add.add(x.slice(2).trim());
    else if (x.startsWith("- ")) over.del.add(x.slice(2).trim());
    else if (x.startsWith("! ")) over.stop.add(x.slice(2).trim());
    else if (x.startsWith("/ ")) over.norel.add(x.slice(2).trim());
    else if (x.startsWith("~ ")) { const [a, b] = x.slice(2).split("|").map((t) => t.trim()); if (a && b) over.name.set(a, b); }
    else if (x.startsWith("@ ")) { const [a, b] = x.slice(2).split("|").map((s) => s.trim()); if (a && b) over.link.set(a, b); }
  });

  const items = D.filter((g) => !g.group);
  const byId = new Map(items.map((g) => [g.id, g]));
  const M = PF.build(items);
  const hitIds = (t) => M.all(t).filter((h) => !h.rejected).map((h) => h.item.term.id);
  const sig = new Map(items.map((g) => [g.id, { head: 0, jadro: 0, bold: 0, quiz: 0, n: 0, per: {} }]));
  const bump = (ids, f) => new Set(ids).forEach((id) => { const s = sig.get(id); if (s) f(s); });

  chs.forEach((c, ci) => {
    hitIds(plain(c.text).replace(/\s+/g, " ")).forEach((id) => { const s = sig.get(id); if (s) { s.n++; s.per[ci] = (s.per[ci] || 0) + 1; } });
    bump(hitIds((c.text.match(/^#{2,4}\s.+$/gm) || []).map(plain).join(" . ")), (s) => s.head++);
    bump(hitIds((c.text.match(/> \[!JADRO\]\n(?:>.*\n?)+/g) || []).map(plain).join(" . ")), (s) => s.jadro++);
    bump(hitIds((c.text.match(/\*\*[^*\n]+\*\*/g) || []).map(plain).join(" . ")), (s) => s.bold++);
    bump(hitIds(c.quiz.map((q) => plain(q.q + " " + q.a.join(" "))).join(" . ")), (s) => s.quiz++);
  });

  const home = (g) => {
    const k = kde[g.id];
    if (k) { const st = k[0].split(".html")[0]; if (chIdx.has(st)) return chIdx.get(st); }
    const per = sig.get(g.id).per;
    let best = -1, bn = 0;
    Object.keys(per).forEach((c) => { if (per[c] > bn) { bn = per[c]; best = +c; } });
    return best;
  };

  /* eponymá: z názvov hesiel aj z textu kapitol */
  const ep = eponymsFromText(chs, over.stop);
  const eponymIds = new Set();
  items.forEach((g) => {
    const head = front(g.title).f;
    if ((head.match(/[\p{L}]+(?:[-–][\p{L}]+)*/gu) || []).some((w) => ep.isEp(w))) eponymIds.add(g.id);
  });
  const fromText = [];
  const unresolved = [];
  const norm = (x) => String(x).toLowerCase().replace(/[–-]/g, "-");
  const titled = items.map((g) => ({ g, t: norm(g.title) }));
  ep.list.forEach((e) => {
    const forced = over.link.get(e.phrase);
    if (forced && byId.has(forced)) { eponymIds.add(forced); e.id = forced; return; }
    const parts = e.base.split("-");
    const inTitle = titled.filter((x) => parts.every((p) => x.t.includes(p)));
    const exact = inTitle.filter((x) => (x.t.match(/\p{L}+/gu) || []).some((w) => w.startsWith(e.noun)));
    const h = M.all(e.phrase).find((x) => !x.rejected && x.index === 0);
    const viaMatch = h && inTitle.find((x) => x.g === h.item.term);
    const pick = viaMatch ? viaMatch.g : exact.length ? exact[0].g : inTitle.length === 1 ? inTitle[0].g : null;
    if (pick) { eponymIds.add(pick.id); e.id = pick.id; return; }
    /* heslo vedie pod iným (moderným) názvom alebo eponym nemá heslo: samostatná karta z textu knihy */
    const name = over.name.get(e.phrase) || e.phrase;
    const ctx = contextFor(chs[e.ch], e.phrase);
    if (ctx) fromText.push({ ...e, name, ctx, rel: h && !over.norel.has(e.phrase) ? h.item.term : null });
    else unresolved.push(e);
  });

  /* cudzie (latinské) názvy: názov bez slovenskej diakritiky, ktorý text píše kurzívou */
  const italics = new Set();
  chs.forEach((c) => { for (const m of c.text.matchAll(/(?<![*\w])\*([^*\n]{3,40})\*(?![*\w])/g)) italics.add(m[1].trim().toLowerCase()); });
  const isForeign = (f) => {
    const x = f.toLowerCase();
    return /^[a-z][a-z .-]+$/.test(x) && (x.includes(" ") || /(?:us|um|is|ae|or|ex)$/.test(x)) && italics.has(x);
  };

  const score = (g) => {
    const s = sig.get(g.id);
    let v = 6 * Math.min(s.head, 2) + 4 * Math.min(s.jadro, 2) + 3 * Math.min(s.quiz, 2) + 3 * Math.min(s.bold, 1) + 1.5 * Math.log2(1 + s.n);
    if (DISEASE.test(front(g.title).f)) v += 2;
    if (kde[g.id]) v += 1; else v -= 3;
    if (LOW_FILE.test(from.get(g) || "")) v -= 3;
    if (/^[\p{Lu}\d-]{2,8}$/u.test(front(g.title).f)) v -= 2;
    return v;
  };

  const cards = [];
  items.forEach((g) => {
    const { f, syn } = front(g.title);
    const short = strip(g.short);
    if (!short) return;
    const a = words(short) > DEF_WORDS ? firstSentences(short, DEF_WORDS) : short;
    const body = cleanBody(g.body);
    const im = [].concat(g.img || []).filter((x) => x && x.src && !/^https?:/.test(x.src))[0];
    const ci = home(g);
    const k = kde[g.id];
    const kind = eponymIds.has(g.id) ? "e" : isForeign(f) ? "l" : g.info ? "w" : DISEASE.test(f) ? "d" : "p";
    cards.push({
      id: g.id, k: kind, f, syn, a, r: rows(body, a),
      m: (a !== short ? `<p>${short}</p>` : "") + body, et: g.et || "",
      im: im ? { s: im.src, a: strip(im.alt || im.caption || f), c: im.caption || "", cr: strip(im.credit || ""), h: im.href || "" } : null,
      ch: ci, sec: k ? k[1] : "", h: k ? "chapters/" + k[0] : (ci >= 0 ? `chapters/${chs[ci].stem}.html` : ""),
      sc: score(g), g,
    });
  });

  fromText.forEach((e) => {
    const id = "eponym-" + e.key.replace(/[^\p{L}\p{N}]+/gu, "-");
    const rel = e.rel;
    const k2 = rel && kde[rel.id];
    cards.push({ id, k: "e", f: e.name, syn: rel ? front(rel.title).f : "", a: e.ctx.a.replace(e.phrase, `<mark>${e.phrase}</mark>`), r: e.ctx.r, m: rel ? `<p><b>${front(rel.title).f}</b>: ${strip(rel.short)}</p>` + cleanBody(rel.body) : "", et: "", im: null,
      ch: e.ch, sec: k2 ? k2[1] : "", h: k2 ? "chapters/" + k2[0] : `chapters/${chs[e.ch].stem}.html`, sc: 99, g: null, zText: true });
    e.id = id;
  });

  chs.forEach((c, ci) => c.quiz.forEach((q, qi) => {
    const ans = q.a.join(" ");
    const link = ans.match(/\]\(([\w-]*)#((?:sec|sub)-[\d-]+)\)/);
    const label = ans.match(/\[→\s*([\d.]+)/);
    const text = tidy(ans.replace(/\s*\[→[^\]]*\]\([^)]*\)\s*[·,]?/g, " ").replace(/\s+/g, " ").trim());
    const html = mdInline(text);
    const a = firstSentences(html, ANSWER_WORDS);
    cards.push({
      id: `q-${c.stem.slice(0, 2)}-${qi + 1}`, k: "q", z: CASE.test(q.q) ? 1 : 0, f: mdInline(q.q), syn: "", a, r: [],
      m: a !== html ? `<p>${html}</p>` : "", et: "", im: null, ch: ci, sec: label ? label[1] : "",
      h: `chapters/${(link && link[1]) || c.stem}.html${link ? "#" + link[2] : ""}`, sc: 100, g: null,
    });
  }));

  chs.forEach((c, ci) => cards.push(...kostra(c, ci)));

  /* výber: všetko, čo text kapitol používa, okrem ľahkých pojmov (zoznam „- id“ v chapters/_karty.txt).
     Eponymá a otázky (logické aj kazuistiky) ostávajú vždy. */
  const jadro = new Set();
  cards.forEach((c) => {
    if (c.k === "s") return;   // kostra: len v režime „Kostra“
    if (c.k === "e" || c.k === "q" || over.add.has(c.id)) jadro.add(c.id);
    else if (c.ch >= 0 && !over.del.has(c.id)) jadro.add(c.id);
  });
  cards.forEach((c) => { c.j = jadro.has(c.id) ? 1 : 0; });

  /* kostra ↔ pojmy, veta z kapitoly, interakcie, otázky za svojou časťou (learnLinks vyššie) */
  const made = learnLinks(cards, chs, kde, groups, hitIds, M);
  made.forEach((c) => { c.j = c.j ? 1 : 0; cards.push(c); });
  cards.forEach((c) => { if (c.k === "s") { delete c.txt; delete c.sobj; } });

  /* POISTKA: eponym z textu bez karty v jadre */
  const missing = unresolved.map((e) => e.phrase);
  ep.list.forEach((e) => { if (e.id && !jadro.has(e.id)) missing.push(e.phrase); });
  /* poradie v kapitole: premiešané stabilne, aby sa striedali druhy kariet; náročnejšie skôr */
  const rank = (c) => {
    if (c.k === "s") return -10 + c.ord / 1000;   // kostra v poradí výkladu, pred ostatnými kartami kapitoly
    const u = hashS(c.id) / 4294967296;
    if (c.k === "i") return 0.1 + 0.9 * u;   // interakcia nikdy ako prvá karta kapitoly (pred ňou je vždy pojem alebo otázka)
    return u - (c.k === "q" ? 0.35 : c.k === "e" ? 0.2 : 0);
  };
  cards.forEach((c) => { c.rk = rank(c); });
  cards.sort((a, b) => (a.ch < 0 ? 1e3 : a.ch) - (b.ch < 0 ? 1e3 : b.ch) || a.rk - b.rk);
  const noWhy = cards.filter((c) => c.j && c.k !== "q" && c.k !== "i" && !over.nowhy.has(c.id) && ![c.a, ...c.r.map((x) => x.t)].some((x) => WHY.test(strip(x)))).map((c) => c.id);
  return { cards, chs, eponyms: ep.list, fromText, missing, noWhy, source: items.length };
}

function mdInline(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])/g, "$1<i>$2</i>")
    .replace(/&lt;(sup|sub)&gt;(.*?)&lt;\/\1&gt;/g, "<$1>$2</$1>");
}

/* ── zápis ─────────────────────────────────────────────────────────────── */
function write(ROOT, BOOK, mdl) {
  const m = mdl || model(ROOT, BOOK);
  const data = {
    book: { slug: BOOK.slug, brand: BOOK.brand, theme: BOOK.themeColor },
    ch: m.chs.map((c) => ({ n: c.num, t: c.title, s: c.stem })),
    c: m.cards.map((c) => {
      const o = { i: c.id, k: c.k, f: c.f, a: c.a, c: c.ch };
      if (c.j) o.j = 1;
      if (c.z) o.z = 1;
      if (c.syn) o.y = c.syn;
      if (c.r.length) o.r = c.r;
      if (c.m) o.m = c.m;
      if (c.et) o.e = c.et;
      if (c.im) o.p = c.im;
      if (c.sec) o.s = c.sec;
      if (c.t && c.t.length) o.t = c.t;
      if (c.x) o.x = c.x;
      if (c.tc && c.tc.length) o.tc = c.tc;
      if (c.ix && c.ix.length) o.ix = c.ix;
      if (c.qz && c.qz.length) o.qz = c.qz;
      if (c.lv) o.lv = c.lv;
      if (c.tt) o.tt = c.tt;
      if (c.it) { o.it = c.it; o.d = c.d; }
      if (c.ks) o.ks = c.ks;
      if (c.h) o.h = c.h;
      return o;
    }),
  };
  const dir = path.join(ROOT, "assets", "karty");
  fs.mkdirSync(dir, { recursive: true });
  const out = "/* GENEROVANÉ nástrojom tools/karty.js z glosára a otázok knihy. Neupravuj ručne. */\nwindow.PF_KARTY=" + JSON.stringify(data) + ";\n";
  const file = path.join(dir, "karty-data.js");
  if (!fs.existsSync(file) || read(file) !== out) fs.writeFileSync(file, out, "utf8");
  return m;
}

/* stránka karty.html zo šablóny */
function page(ROOT, BOOK) {
  const tpl = read(path.join(__dirname, "karty.template.html"));
  const html = tpl.replace(/\{\{BRAND\}\}/g, BOOK.brand).replace(/\{\{THEME\}\}/g, BOOK.themeColor).replace(/\{\{SLUG\}\}/g, BOOK.slug);
  const file = path.join(ROOT, "karty.html");
  if (!fs.existsSync(file) || read(file) !== html) fs.writeFileSync(file, html, "utf8");
}

function run(ROOT, BOOK, verbose) {
  const m = write(ROOT, BOOK);
  page(ROOT, BOOK);
  const j = m.cards.filter((c) => c.j);
  const n = (k) => j.filter((c) => c.k === k).length;
  const nk = m.cards.filter((c) => c.k === "s").length;
  console.log(`\n▸ karty   jadro ${j.length} z ${m.cards.length} (eponymá ${n("e")} · cudzie názvy ${n("l")} · otázky ${n("q")}, z toho kazuistiky ${j.filter((c) => c.z).length} · choroby ${n("d")} · pojmy ${n("p") + n("w")}) · kostra ${nk}`);
  if (verbose) {
    m.chs.forEach((c, i) => {
      const x = j.filter((k) => k.ch === i);
      console.log(`\n${c.num} ${c.title}: ${x.length}\n  ` + x.filter((k) => k.k !== "q").map((k) => (k.k === "e" ? "★" : "") + k.f).join(" · "));
    });
    console.log("\neponymá z textu bez hesla (karta z vety knihy):\n  " + m.fromText.map((e) => `${e.name}${e.rel ? ' [' + front(e.rel.title).f + ']' : ''} → ${strip(e.ctx.a).slice(0, 110)}`).join("\n  "));
  }
  /* POISTKA: id karty je kľúč postupu v prehliadači – dve karty s rovnakým id by sa prepisovali (kostra: dve sekcie s rovnakým číslom) */
  const seen = new Set(), dup = m.cards.map((c) => c.id).filter((id) => seen.has(id) || !seen.add(id));
  if (dup.length) { console.log(`  ✖ karty s rovnakým id (${dup.length}): ${dup.slice(0, 10).join(", ")}`); return false; }
  /* POISTKA (26. 11. 2026): zvyšky zátvoriek po odstránenom odkaze „[→ …]“ – „( )“, „(; …“, „(…, )“ (bolo ich 24) */
  const paren = /\(\s*[;,·]?\s*\)|\(\s*[;,·]|[;,·]\s*\)/;
  const txt = (c) => [c.f, c.a, c.m, c.x && c.x.t, ...(c.r || []).map((x) => x.t), c.d && JSON.stringify(c.d)].filter(Boolean).map(strip);
  const zat = m.cards.filter((c) => txt(c).some((t) => paren.test(t))).map((c) => c.id);
  if (zat.length) { console.log(`  ✖ prázdne alebo rozbité zátvorky v kartách (${zat.length}): ${zat.slice(0, 10).join(", ")} – oprav tidy() v tools/karty.js`); return false; }
  /* POISTKA: interaktívna karta musí byť riešiteľná (každý druh má svoje minimum) a obrázok nesmie prezradiť odpoveď */
  const ids = new Set(m.cards.map((c) => c.id));
  const badIx = m.cards.filter((c) => c.k === "i").filter((c) => {
    const d = c.d || {};
    if (c.it === "zor") return !(d.st && d.st.length >= 4 && new Set(d.st.map(strip)).size === d.st.length);
    if (c.it === "pri") return !(d.p && d.p.length >= 3 && new Set(d.p.map((x) => strip(x[1]))).size === d.p.length);
    if (c.it === "roz") return !(d.e && d.e.length >= 2 && d.q && d.q.length >= 4 && d.e.every((_, ei) => d.q.some((q) => q[2] === ei)));
    if (c.it === "dop") return !(d.n >= 2 && (d.t.match(/class="bl"/g) || []).length === d.n);
    if (c.it === "num") return !(d.hi >= d.lo && d.lo >= 0 && d.u);
    if (c.it === "obr") return !(c.im && d.o && d.o.length === 4 && new Set(d.o).size === 4 && d.o.includes(d.a) && d.o.every((x) => ids.has(x)) && !/\.svg$/i.test(c.im.s));
    return true;
  }).map((c) => c.id);
  if (badIx.length) { console.log(`  ✖ interaktívne karty, ktoré sa nedajú vyriešiť (${badIx.length}): ${badIx.slice(0, 10).join(", ")}`); return false; }
  const nIx = {}; m.cards.filter((c) => c.k === "i").forEach((c) => { nIx[c.it] = (nIx[c.it] || 0) + 1; });
  if (Object.keys(nIx).length) console.log("  interakcie: " + Object.keys(nIx).map((k) => `${k} ${nIx[k]}`).join(" · ") + ` · pojmy s vetou z kapitoly ${m.cards.filter((c) => c.x && c.j).length}`);
  if (m.missing.length) {
    console.log(`  ✖ eponymá bez karty v jadre (${m.missing.length}): ${m.missing.join(", ")}`);
    return false;
  }
  const known = path.join(ROOT, "pracovne", "karty-bez-mechanizmu.txt");
  const old = fs.existsSync(known) ? new Set(read(known).split("\n").map((x) => x.split("#")[0].trim()).filter(Boolean)) : new Set();
  const fresh = m.noWhy.filter((id) => !old.has(id));
  if (process.argv.includes("--bez-mechanizmu")) console.log(m.noWhy.join("\n"));
  if (m.noWhy.length) console.log(`  karty bez mechanizmu: ${m.noWhy.length} (známe ${m.noWhy.length - fresh.length})`);
  if (fresh.length) {
    console.log(`  ✖ nové karty bez vety „prečo / čím“ (${fresh.length}): ${fresh.slice(0, 20).join(", ")} – doplň reťaz do hesla alebo „= id  # dôvod“ v chapters/_karty.txt`);
    return false;
  }
  return true;
}

module.exports = { model, write, page, run, front, sentences, firstSentences };

if (require.main === module) {
  const ROOT = path.resolve(__dirname, "..");
  const BOOK = JSON.parse(read(path.join(ROOT, "book.json")));
  if (!BOOK.karty) { console.log("karty: v book.json nie sú zapnuté"); process.exit(0); }
  process.exit(run(ROOT, BOOK, process.argv.includes("--vypis")) ? 0 : 1);
}

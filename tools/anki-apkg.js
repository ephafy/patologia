/* ══════════════════════════════════════════════════════════════════════════
   tools/anki-apkg.js — glosár do Anki ako balík .apkg S OBRÁZKAMI (volá tools/anki.js)

   Prečo .apkg: textový import Anki obrázky nepreniesie (súbor musí ležať v priečinku
   collection.media). Balík .apkg ich nesie so sebou – v Anki stačí Súbor → Importovať.

   - typ poznámky „<Kniha> – glosár“: Pojem · Pôvod · Definícia · Vysvetlenie · Obrázok · Kapitola
   - obrázky z hesiel (pole img, aj z 96-obrazky.js), zmenšené na ≤ 800 px (py + Pillow, cache
     anki/.obrazky/); pod každým popis a TASL: autor · licencia · odkaz na stránku súboru
   - stabilné guid podľa id hesla → opätovný import karty aktualizuje a zachová opakovanie;
     čas zmeny (mod) sa posunie len heslu, ktoré sa zmenilo (anki/.obrazky/stav.json)
   - rovnaký vstup = bajt po bajte rovnaký balík (zverejni.ps1 tak nevidí falošnú zmenu)
   Súbor je ZDIEĽANÝ (KNIHY-CORE). Formát: Anki „legacy“ collection.anki2 (schéma 11) – importuje
   ho Anki 2.1 aj 23+/24+, AnkiDroid a AnkiMobile.
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const zlib = require("zlib");
const { execFileSync } = require("child_process");

const MAX_PX = 800, QUALITY = 78;
const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");
const idFrom = (s) => parseInt(sha1(s).slice(0, 11), 16) + 1e12; // stabilné celé číslo < 2^53
const ascii = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

module.exports = function apkg({ ROOT, OUT, BOOK, entries }) {
  if (!entries.length) {
    try { fs.unlinkSync(path.join(OUT, "glosar.apkg")); } catch (e) {}
    return "anki/glosar.apkg: glosár je prázdny – balík sa nerobí";
  }
  let sqlite;
  const ew = process.emitWarning;
  process.emitWarning = () => {}; // node:sqlite v Node 22 hlási „experimental“
  try { sqlite = require("node:sqlite"); } catch (e) { throw new Error("treba Node ≥ 22.5 (node:sqlite)"); }
  finally { process.emitWarning = ew; }

  const CACHE = path.join(OUT, ".obrazky");
  const FILE = path.join(OUT, "glosar.apkg");
  fs.mkdirSync(CACHE, { recursive: true });
  const slug = ascii(BOOK) || "kniha";

  /* ── obrázky: zdroj → meno v Anki (unikátne aj medzi knihami) ── */
  const media = new Map(); // src → { name, abs, out }
  const used = new Set();
  let chyba = 0;
  const notes = entries.map((e) => {
    const { g, body, t, kde } = e;
    const figs = [];
    [].concat(g.img || []).forEach((im) => {
      if (!im || !im.src || /^https?:/.test(im.src)) return;
      const abs = path.join(ROOT, im.src);
      if (!fs.existsSync(abs)) { chyba++; return; }
      if (!media.has(im.src)) {
        let name = `${slug}-${ascii(path.basename(im.src))}`;
        if (used.has(name)) name = `${slug}-${ascii(im.src.replace(/\.[^.]+$/, ""))}${path.extname(im.src).toLowerCase()}`;
        used.add(name);
        media.set(im.src, { name, abs, out: path.join(CACHE, name) });
      }
      const m = media.get(im.src);
      const cap = im.caption || im.alt || "";
      const tasl = [im.credit ? esc(im.credit.replace(/<[^>]+>/g, "")) : "", im.href ? `<a href="${esc(im.href)}">zdroj</a>` : ""].filter(Boolean).join(" · ");
      figs.push(`<figure><img src="${esc(m.name)}" alt="${esc((im.alt || cap).replace(/<[^>]+>/g, ""))}">` +
        `<figcaption>${cap}${tasl ? `<span class="tasl">${tasl}</span>` : ""}</figcaption></figure>`);
    });
    const flds = [g.title, (g.et || "").replace(/<[^>]+>/g, ""), g.short || "", body || "", figs.join(""), kde ? `V knihe: ${esc(kde)}` : ""]
      .map((s) => String(s).replace(/\x1f/g, " ").replace(/\s*\n\s*/g, " ").trim());
    return { key: g.id || g.title, flds, tags: e.tags || `glosar ${t}`, deck: e.deck || null };
  });

  /* ── zmenšenie obrázkov (cache podľa veľkosti a času zdroja) ── */
  const idxFile = path.join(CACHE, "index.json");
  let idx = {};
  try { idx = JSON.parse(fs.readFileSync(idxFile, "utf8")); } catch (e) {}
  const jobs = [];
  for (const [src, m] of media) {
    const st = fs.statSync(m.abs);
    const sig = `${st.size}:${Math.floor(st.mtimeMs)}`;
    if (idx[m.name] === sig && fs.existsSync(m.out)) continue;
    idx[m.name] = sig;
    if (/\.svg$/i.test(src)) fs.copyFileSync(m.abs, m.out);
    else jobs.push([m.abs, m.out]);
  }
  if (jobs.length) {
    const py = `
import sys, json
from PIL import Image
for src, out in json.load(sys.stdin):
    im = Image.open(src)
    im.thumbnail((${MAX_PX}, ${MAX_PX}), Image.LANCZOS)
    if out.lower().endswith(".png"):
        im.save(out, optimize=True)
    else:
        if im.mode not in ("RGB", "L"): im = im.convert("RGB")
        im.save(out, quality=${QUALITY}, optimize=True, progressive=True)
`;
    try {
      execFileSync("py", ["-I", "-c", py], { input: JSON.stringify(jobs), stdio: ["pipe", "ignore", "pipe"] });
    } catch (e) { // bez Pillow: originály (väčší balík, ale funkčný)
      jobs.forEach(([a, o]) => { if (!fs.existsSync(o)) fs.copyFileSync(a, o); });
    }
  }
  fs.writeFileSync(idxFile, JSON.stringify(idx, null, 0));

  /* ── čas zmeny po heslách: posunie sa len tomu, čo sa zmenilo ── */
  const stavFile = path.join(CACHE, "stav.json");
  let stav = {};
  try { stav = JSON.parse(fs.readFileSync(stavFile, "utf8")); } catch (e) {}
  const now = Math.floor(Date.now() / 1000);
  const mediaSig = (n) => n.flds[4].match(/src="([^"]+)"/g) || [];
  notes.forEach((n) => {
    const h = sha1(JSON.stringify([n.flds, n.tags, mediaSig(n).map((s) => idx[s.slice(5, -1)])]));
    if (!stav[n.key] || stav[n.key][0] !== h) stav[n.key] = [h, now];
    n.mod = stav[n.key][1];
  });
  fs.writeFileSync(stavFile, JSON.stringify(stav, null, 0));
  const mod = notes.reduce((a, n) => Math.max(a, n.mod), 0) || now;

  /* ── nič sa nezmenilo → balík ostáva ── */
  const tpl = fs.readFileSync(__filename, "utf8");
  const sig = sha1(JSON.stringify([notes.map((n) => (n.deck ? [n.key, n.flds, n.tags, n.mod, n.deck] : [n.key, n.flds, n.tags, n.mod])), [...media.values()].map((m) => [m.name, idx[m.name]]), tpl]));
  const sigFile = path.join(CACHE, "balik.sig");
  if (fs.existsSync(FILE) && fs.existsSync(sigFile) && fs.readFileSync(sigFile, "utf8") === sig)
    return `anki/glosar.apkg: bez zmeny (${notes.length} hesiel, ${media.size} obrázkov)`;

  /* ── collection.anki2 ── */
  const deckId = idFrom(`${slug}:deck:glosar`), modelId = idFrom(`${slug}:model:glosar`);
  const css = `.card{font-family:"Source Serif 4",Georgia,serif;font-size:19px;line-height:1.5;color:#1d1b22;background:#fff;text-align:left;max-width:760px;margin:0 auto;padding:4px 10px}
.pojem{font-size:26px;font-weight:600;text-align:center;margin:12px 0}
.et{text-align:center;font-style:italic;color:#6b6578;font-size:15px}
.def{font-weight:600;margin:8px 0}.body ul{padding-left:1.2em}.body li{margin:2px 0}
figure{margin:14px 0;text-align:center}figure img{max-width:100%;max-height:60vh;height:auto}
figcaption{font-size:14px;color:#4a4552;text-align:left}.tasl{display:block;font-size:12px;color:#7a7484;margin-top:2px}
.kde{font-size:13px;color:#7a7484;margin-top:12px}hr#answer{margin:10px 0}
.nightMode .card,.night_mode .card,.card.nightMode{color:#ece8f2;background:#1e1c22}
.nightMode .et,.nightMode figcaption,.nightMode .tasl,.nightMode .kde{color:#b4adbf}
.nightMode figure img{background:#fff}${entries.some((x) => x.deck) ? `
.pojem .q{display:block;font-size:21px;font-weight:500;line-height:1.3;text-align:left}
.body ul{margin:8px 0}details{margin-top:10px;font-size:16px;color:#3f3a47}summary{cursor:pointer;color:#5f42a8;font-weight:600}
mark{background:#ffe9b0;color:inherit}.chain{color:#7a5400}
.nightMode details{color:#d7d1e0}.nightMode summary{color:#c4b2ee}.nightMode mark{background:#6a5520}.nightMode .chain{color:#ffe6ad}` : ""}`;
  const fields = ["Pojem", "Pôvod", "Definícia", "Vysvetlenie", "Obrázok", "Kapitola"].map((name, ord) =>
    ({ name, ord, font: "Arial", media: [], rtl: false, size: 20, sticky: false }));
  const model = {
    css, did: deckId, flds: fields, id: String(modelId), latexPost: "\\end{document}",
    latexPre: "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
    latexsvg: false, mod, name: `${BOOK} – glosár`, req: [[0, "any", [0]]], sortf: 0, tags: [], type: 0, usn: -1, vers: [],
    tmpls: [{
      name: "Pojem → význam", ord: 0, bafmt: "", bqfmt: "", bfont: "", bsize: 0, did: null,
      qfmt: `<div class="pojem">{{Pojem}}</div>`,
      afmt: `<div class="pojem">{{Pojem}}</div><hr id="answer">{{#Pôvod}}<div class="et">{{Pôvod}}</div>{{/Pôvod}}` +
        `<div class="def">{{Definícia}}</div>{{#Vysvetlenie}}<div class="body">{{Vysvetlenie}}</div>{{/Vysvetlenie}}` +
        `{{Obrázok}}{{#Kapitola}}<div class="kde">{{Kapitola}}</div>{{/Kapitola}}`,
    }],
  };
  const deck = (id, name) => ({ collapsed: false, browserCollapsed: false, conf: 1, desc: "", dyn: 0, extendNew: 0, extendRev: 50, id, lrnToday: [0, 0], mod, name, newToday: [0, 0], revToday: [0, 0], timeToday: [0, 0], usn: -1 });
  const dconf = { 1: { autoplay: true, id: 1, lapse: { delays: [10], leechAction: 0, leechFails: 8, minInt: 1, mult: 0 }, maxTaken: 60, mod: 0, name: "Default",
    new: { bury: true, delays: [1, 10], initialFactor: 2500, ints: [1, 4, 7], order: 1, perDay: 20, separate: true }, replayq: true,
    rev: { bury: true, ease4: 1.3, fuzz: 0.05, ivlFct: 1, maxIvl: 36500, minSpace: 1, perDay: 100 }, timer: 0, usn: 0 } };
  const conf = { activeDecks: [1], curDeck: 1, newSpread: 0, collapseTime: 1200, timeLim: 0, estTimes: true, dueCounts: true, curModel: null, nextPos: notes.length + 1, sortType: "noteFld", sortBackwards: false, addToCur: true };

  /* kartičky (book.json → karty): jadro v balíkoch po kapitolách */
  const allDecks = { 1: deck(1, "Default"), [deckId]: deck(deckId, `${BOOK}::Glosár`) };
  const deckOf = (name) => {
    if (!name) return deckId;
    name.split("::").forEach((_, i, a) => { const n = a.slice(0, i + 1).join("::"), d = idFrom(`${slug}:deck:${n}`); if (!allDecks[d]) allDecks[d] = deck(d, n); });
    return idFrom(`${slug}:deck:${name}`);
  };
  if (notes.some((n) => n.deck)) delete allDecks[deckId];
  notes.forEach((n) => { n.did = deckOf(n.deck); });

  const dbFile = path.join(CACHE, "collection.anki2");
  try { fs.unlinkSync(dbFile); } catch (e) {}
  const db = new sqlite.DatabaseSync(dbFile);
  db.exec(`PRAGMA journal_mode=DELETE;
CREATE TABLE col (id integer primary key, crt integer not null, mod integer not null, scm integer not null, ver integer not null, dty integer not null, usn integer not null, ls integer not null, conf text not null, models text not null, decks text not null, dconf text not null, tags text not null);
CREATE TABLE notes (id integer primary key, guid text not null, mid integer not null, mod integer not null, usn integer not null, tags text not null, flds text not null, sfld integer not null, csum integer not null, flags integer not null, data text not null);
CREATE TABLE cards (id integer primary key, nid integer not null, did integer not null, ord integer not null, mod integer not null, usn integer not null, type integer not null, queue integer not null, due integer not null, ivl integer not null, factor integer not null, reps integer not null, lapses integer not null, left integer not null, odue integer not null, odid integer not null, flags integer not null, data text not null);
CREATE TABLE revlog (id integer primary key, cid integer not null, usn integer not null, ease integer not null, ivl integer not null, lastIvl integer not null, factor integer not null, time integer not null, type integer not null);
CREATE TABLE graves (usn integer not null, oid integer not null, type integer not null);
CREATE INDEX ix_notes_usn on notes (usn); CREATE INDEX ix_cards_usn on cards (usn); CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid); CREATE INDEX ix_cards_sched on cards (did, queue, due); CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);`);
  db.prepare("INSERT INTO col VALUES (1,?,?,?,11,0,0,0,?,?,?,?,'{}')").run(
    1500000000, mod * 1000, mod * 1000, JSON.stringify(conf), JSON.stringify({ [modelId]: model }),
    JSON.stringify(allDecks), JSON.stringify(dconf));
  const insN = db.prepare("INSERT INTO notes VALUES (?,?,?,?,-1,?,?,?,?,0,'')");
  const insC = db.prepare("INSERT INTO cards VALUES (?,?,?,0,?,-1,0,0,?,0,0,0,0,0,0,0,0,'')");
  const seen = new Set();
  db.exec("BEGIN");
  notes.forEach((n, i) => {
    let nid = idFrom(`${slug}:note:${n.key}`);
    while (seen.has(nid)) nid++;
    seen.add(nid);
    const sfld = n.flds[0].replace(/<[^>]+>/g, "").trim();
    insN.run(nid, "pf" + sha1(`${slug}:glosar:${n.key}`).slice(0, 16), modelId, n.mod, ` ${n.tags} `,
      n.flds.join("\x1f"), sfld, parseInt(sha1(sfld).slice(0, 8), 16));
    insC.run(nid + 7, nid, n.did, n.mod, i + 1);
  });
  db.exec("COMMIT");
  db.close();
  const colBytes = fs.readFileSync(dbFile);
  fs.unlinkSync(dbFile);

  /* ── ZIP (pevný čas, obrázky bez kompresie – už sú stlačené) ── */
  const files = [["collection.anki2", colBytes, true]];
  const mediaMap = {};
  [...media.values()].forEach((m, i) => { mediaMap[i] = m.name; });
  files.push(["media", Buffer.from(JSON.stringify(mediaMap)), true]);
  [...media.values()].forEach((m, i) => files.push([String(i), fs.readFileSync(m.out), /\.svg$/i.test(m.name)]));
  const parts = [], central = [];
  let off = 0;
  const T = 0, D = (2020 - 1980) << 9 | 1 << 5 | 1; // 1. 1. 2020 00:00
  for (const [name, data, deflate] of files) {
    const comp = deflate ? zlib.deflateRawSync(data, { level: 9 }) : data;
    const crc = zlib.crc32(data) >>> 0, nm = Buffer.from(name, "utf8");
    const h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(deflate ? 8 : 0, 8);
    h.writeUInt16LE(T, 10); h.writeUInt16LE(D, 12); h.writeUInt32LE(crc, 14); h.writeUInt32LE(comp.length, 18);
    h.writeUInt32LE(data.length, 22); h.writeUInt16LE(nm.length, 26); h.writeUInt16LE(0, 28);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(deflate ? 8 : 0, 10);
    c.writeUInt16LE(T, 12); c.writeUInt16LE(D, 14); c.writeUInt32LE(crc, 16); c.writeUInt32LE(comp.length, 20); c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(nm.length, 28); c.writeUInt32LE(off, 42);
    parts.push(h, nm, comp); central.push(c, nm);
    off += 30 + nm.length + comp.length;
  }
  const cd = Buffer.concat(central), e = Buffer.alloc(22);
  e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(files.length, 8); e.writeUInt16LE(files.length, 10);
  e.writeUInt32LE(cd.length, 12); e.writeUInt32LE(off, 16);
  fs.writeFileSync(FILE, Buffer.concat([...parts, cd, e]));
  fs.writeFileSync(sigFile, sig);
  const mb = (fs.statSync(FILE).size / 1e6).toFixed(1);
  return `anki/glosar.apkg: ${notes.length} ${notes.some((n) => n.deck) ? "kariet jadra" : "hesiel"}, ${media.size} obrázkov, ${mb} MB${chyba ? ` · ${chyba} obrázkov chýba na disku` : ""}`;
};

// Audit glosára: rovnaký regex ako assets/js/glossary.js, text z vygenerovaných kapitol.
const fs = require("fs"), path = require("path");
// Použitie: node tools/glossary-audit.js [surf|miss]  (surf = tvary v texte → heslo, miss = nepokryté skratky a slová)
const ROOT = path.join(__dirname, "..");
global.window = {};
for (const f of fs.readdirSync(path.join(ROOT, "assets/glossary")).filter((f) => f.endsWith(".js")).sort())
  eval(fs.readFileSync(path.join(ROOT, "assets/glossary", f), "utf8"));
const DATA = window.PF_GLOSSARY;
const expand = (s) => s.replace(/\\w/g, "[\\p{L}\\p{N}]");
const flat = [];
DATA.forEach((t) => t.match.forEach((p) => flat.push({ src: p, term: t })));
flat.sort((a, b) => b.src.length - a.src.length);
const groups = {};
const RE = new RegExp("(?:" + flat.map((it, i) => ((groups["g" + i] = it.term), `(?<g${i}>${expand(it.src)})`)).join("|") + ")(?![\\p{L}\\p{N}\\-])", "giu");
const B = /[\p{L}\p{N}\-]/u;

function textOf(html) {
  html = html.replace(/<(script|style|svg|h[1-6]|a|code|pre)\b[\s\S]*?<\/\1>/gi, " ");
  html = html.replace(/<div class="(contents|running-head|running-foot|eyebrow)[\s\S]*?<\/div>/gi, " ");
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ");
}
const surf = {}; // termId -> {surface: count}
let all = "";
const mode = process.argv[2] || "surf";
for (const f of fs.readdirSync(path.join(ROOT, "chapters")).filter((f) => /^\d.*\.html$/.test(f))) {
  const t = textOf(fs.readFileSync(path.join(ROOT, "chapters", f), "utf8"));
  all += " " + t;
}
// maskovanie pokrytých úsekov
let covered = all.split("");
let m;
RE.lastIndex = 0;
while ((m = RE.exec(all))) {
  if (m.index > 0 && B.test(all[m.index - 1])) continue;
  let term = null;
  for (const k in m.groups) if (m.groups[k] !== undefined) { term = groups[k]; break; }
  (surf[term.id] = surf[term.id] || {})[m[0].toLowerCase()] = ((surf[term.id] || {})[m[0].toLowerCase()] || 0) + 1;
  for (let i = m.index; i < m.index + m[0].length; i++) covered[i] = " ";
}
if (mode === "surf") {
  for (const t of DATA) {
    const s = surf[t.id];
    console.log(`${t.id} | ${t.title} | ${s ? Object.entries(s).map(([k, v]) => k + "×" + v).join(", ") : "— (v texte sa nevyskytuje)"}`);
  }
} else {
  // nepokryté slová: skratky a dlhšie slová, zoradené podľa frekvencie
  const rest = covered.join("");
  const cnt = {};
  for (const w of rest.match(/[\p{L}][\p{L}\p{N}\-]*/gu) || []) {
    const abbr = /^[\p{Lu}][\p{Lu}\p{N}\-]+$/u.test(w) && w.length >= 2;
    const k = abbr ? w : w.toLowerCase();
    if (abbr || k.length >= 7) cnt[k] = (cnt[k] || 0) + 1;
  }
  const out = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
  console.log(out.filter(([k]) => /^[\p{Lu}]/u.test(k)).map(([k, v]) => k + "×" + v).join("  "));
  console.log("\n---\n");
  console.log(out.filter(([k, v]) => !/^[\p{Lu}]/u.test(k) && v >= 2).map(([k, v]) => k + "×" + v).join("  "));
}

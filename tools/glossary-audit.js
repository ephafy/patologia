// Audit glosára: rovnaký regex ako assets/js/glossary.js, text z vygenerovaných kapitol.
const fs = require("fs"), path = require("path");
// Použitie: node tools/glossary-audit.js [surf|miss]  (surf = tvary v texte → heslo, miss = nepokryté skratky a slová)
//           node tools/glossary-audit.js kap <súbor kapitoly bez .html>
//             kontrola vysvetliviek jednej kapitoly (od 2. 11. 2026, pripomienky autora ku kap. 10 PATOLY):
//             1) CHOROBY BEZ HESLA – choroba, syndróm, nádor či typ cysty, ktorý v texte nemá vlastnú vysvetlivku
//                (pokrýva ho len všeobecné heslo „cysta“, „syndróm“… alebo nič)
//             2) NEÚPLNÁ ZNAČKA – značka pokryje časť pojmu: „Willisovej | definície“, „H. | pylori“
//             3) CUDZÍ VÝZNAM – vzor so \w* chytil zložené slovo s iným významom („bronch\w*“ → „bronchitída“):
//                prípona, ktorá mení pojem (-itída, -ektázia, -skleróza, -áza, -genes, -émia…), a nie je v názve
//                hesla = CHYBA (od 5. 11. 2026); ostatné dlhé tvary („neprav\w*“ → „nepravidelné“) na posúdenie
//             Kód 1, ak je niečo v 1), 2) alebo v chybách 3).
//           node tools/glossary-audit.js glosar
//             tá istá kontrola cudzieho významu v textoch samotných vysvetliviek (aj v nich sa pojmy označujú)
const ROOT = path.join(__dirname, "..");
global.window = {};
for (const f of fs.readdirSync(path.join(ROOT, "assets/glossary")).filter((f) => /^\d.*\.js$/.test(f) && !/^9[78]-/.test(f)).sort())
  eval(fs.readFileSync(path.join(ROOT, "assets/glossary", f), "utf8"));
const DATA = window.PF_GLOSSARY.filter((t) => t && t.id);
// hľadanie pojmov: ten istý kód ako v prehliadači (od 5. 11. 2026; predtým tu bola vlastná kópia veľkého regexu)
const MATCH = require(path.join(ROOT, "assets/js/pf-match.js")).build(DATA);

function textOf(html, keepLinks) {
  html = html.replace(new RegExp("<(script|style|svg|h[1-6]|" + (keepLinks ? "" : "a|") + "code|pre)\\b[\\s\\S]*?<\\/\\1>", "gi"), " ");
  html = html.replace(/<div class="(contents|running-head|running-foot|eyebrow)[\s\S]*?<\/div>/gi, " ");
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ");
}

/* Cudzí význam (poistka 5. 11. 2026; pripomienka autora „často nachádzam nedobre pokryté veci“): vzor „kmeň\w*“
   chytí aj zložené slovo, ktoré znamená niečo iné – „bronch\w*“ (priedušky) → bronchitída, bronchiektázie;
   „monocyt\w*“ → Listeria monocytogenes; „arteriol\w*“ → arterioloskleróza; „superoxid\w*“ → superoxiddismutáza.
   CHYBA = časť slova za pevným kmeňom vzoru obsahuje príponu, ktorá mení pojem (zápal, choroba, enzým, nádor…),
   a tá prípona nie je v názve hesla. Oprava: zúžiť vzor na koncovky („bronch(?:us|u|y|ov|och|iálny…)“), dať
   zloženému slovu vlastné heslo, alebo – ak je to v poriadku – zapísať „tvar → id“ do pracovne/glosar-tvary-ok.txt.
   Ostatné tvary dlhšie o ≥ 5 písmen ostávajú len na posúdenie. */
const MORFEMY = /itíd|itis|ektáz|skler|dismut|syntáz|syntet|genes|genéz|génn|ogénn|lýz|fág|pati(?:a|e|i|ou|í)|algi|plázi|trofi|blast|cytóz|pénia|pénie|émi|tómi|skopi|grafi|logi|terapi|mykóz|kináz|senzit|rezist|toxí|óm(?:y|u|ov|om|e|och|ami)?$|áz(?:a|y|u|e|ou|ami|ách|ach)?$/;
const TVARY_OK = (() => {
  const f = path.join(ROOT, "pracovne", "glosar-tvary-ok.txt");
  const s = new Set();
  if (fs.existsSync(f)) fs.readFileSync(f, "utf8").split(/\r?\n/).forEach((l) => { l = l.replace(/#.*/, "").trim(); if (l) s.add(l.replace(/\s*(?:→|->)\s*/, " → ").toLowerCase()); });
  return s;
})();
function cudziVyznam(marks) {
  const chyby = new Map(), sus = new Map();
  for (const mk of marks) {
    const lit = (mk.src.match(/^[\p{L}\p{N}-]+/u) || [""])[0];
    if (!lit || !/^[\p{L}\p{N}-]+\\w\*/u.test(mk.src)) continue;
    const w = (mk.s.match(/^[\p{L}\p{N}-]+/u) || [""])[0];
    if (w.length <= lit.length) continue;
    const key = w.toLowerCase() + " → " + mk.t.id;
    if (TVARY_OK.has(key)) continue;
    const pripona = w.slice(lit.length).toLowerCase();
    const nazov = (String(mk.t.title || "") + " " + String(mk.t.id || "")).toLowerCase();
    // eponym (vzor s veľkým začiatočným písmenom, „Elek\w*“) chytil slovo s malým („elektróny“) – po slovensky
    // sa prídavné meno z mena píše veľkým, takže malé písmeno = iné slovo (prípad 6. 11. 2026, MIKRA: Elekov test × elektrolyty)
    const eponym = /^\p{Lu}\p{Ll}/u.test(lit) && new RegExp("(^|[^\\p{L}])" + lit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(ov|ova|ovo|ovej|ovu|ovom|ových|ho|ovho)(?![\\p{L}])", "u").test(String(mk.t.title || ""));
    if (eponym && /^\p{Ll}/u.test(w)) { chyby.set(key + (mk.v ? "  [vo vysvetlivke " + mk.v + "]" : ""), "eponym s malým písmenom"); continue; }
    const m = pripona.match(MORFEMY);
    if (m && !nazov.includes(m[0].replace(/[aeiouyáéíóúý]+$/, "") || m[0])) chyby.set(key + (mk.v ? "  [vo vysvetlivke " + mk.v + "]" : ""), m[0]);
    else if (w.length - lit.length >= 5) sus.set(key, 1);
  }
  return { chyby, sus };
}

const mode = process.argv[2] || "surf";

if (mode === "kap") {
  const slug = (process.argv[3] || "").replace(/\.html$/, "");
  const file = path.join(ROOT, "chapters", slug + ".html");
  if (!fs.existsSync(file)) { console.error("chýba " + file + " (spusti build)"); process.exit(2); }
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, " ").replace(/<section[^>]*class="[^"]*refs[\s\S]*$/i, " ");
  // vysvetlenia skratiek na okraji („ACTH adrenokortikotropný hormón“) nie sú výklad
  html = html.replace(/<div class="box k-skr[\s\S]*?<\/div>\s*<\/div>/gi, " ");
  // zdroje a otázky nie sú výklad
  html = html.replace(/<h2[^>]*>(?:(?!<\/h2>)[\s\S])*?Zdroje[\s\S]*$/i, " ");
  const text = textOf(html, true);
  // rovnaké poradie ako glossary.js: dlhší vzor vyhráva, bez prekryvu, hranica slova
  // presne ako assets/js/glossary.js: ten istý kód (assets/js/pf-match.js), text sa číta zľava doprava
  const owner = new Array(text.length).fill(null), marks = [];
  for (const h of MATCH.all(text)) {
    const it = h.item;
    if (h.rejected) continue;
    const mk = { i: h.index, e: h.index + h[0].length, s: h[0], t: it.term, src: it.src };
    for (let k = mk.i; k < mk.e; k++) owner[k] = mk;
    marks.push(mk);
  }
  const words = (s) => s.toLowerCase().replace(/\([^)]*\)/g, " ").match(/[\p{L}]{3,}/gu) || [];
  const stem = (w) => w.slice(0, Math.max(4, w.length - 2));
  // všeobecné heslo = jedno slovo v názve (cysta, syndróm, nádor…): pokryje druh, nie konkrétnu chorobu
  const generic = (t) => words(t.title.replace(/\(.*$/, "")).length <= 1 && /^(cyst|syndróm|nádor|chorob|tumor|polyp|névus|anémi|sarkóm|lymfóm)/i.test(t.title);
  let zle = 0;

  // 1) choroby, syndrómy, nádory a typy cýst bez vlastného hesla
  const L = "\\p{L}", Lu = "\\p{Lu}";
  const DIS = [
    // eponym („Cowdenov syndróm“, „Hodgkinov lymfóm“) alebo skratka („MALT lymfóm“)
    new RegExp(`(?:${Lu}${L}+(?:ov|ova|ovej|ovho|ovom|ovu|ovým|ových|ovi|ove)|${Lu}{2,})(?:\\s*[–-]\\s*${Lu}${L}+)*\\s+(?:syndróm|chorob|anémi|sarkóm|lymfóm|cyst|névus|polyp|fenomén|tumor)${L}*`, "gu"),
    // prídavné meno + syndróm/cysta („epidermoidná cysta“, „karcinoidový syndróm“); všeobecné slová sa vynechajú
    new RegExp(`(?<![\\p{L}])(?!(?:dedičn|väčšin|tent|ktor|niektor|in[ýéá]|rôzn|ďalš|vlastn|samotn|podobn|každ|jedn|mnoh|tak)${L})${L}{3,}(?:sk|n|ck|v|ov|ál)(?:ý|á|é|ej|ého|ú|ou|ých|ým|ými|ému|ém)\\s+(?:syndróm|cyst|polypóz)${L}*`, "giu"),
  ];
  const missing = new Map();
  for (const re of DIS) {
    let m;
    while ((m = re.exec(text))) {
      let s = m[0], i = m.index;
      // veta začína veľkým písmenom – prvé slovo frázy nemusí byť meno
      const e = i + s.length;
      const own = new Set();
      for (let k = i; k < e; k++) if (owner[k] && !generic(owner[k].t)) own.add(owner[k]);
      let cov = 0;
      own.forEach((mk) => { cov += Math.min(e, mk.e) - Math.max(i, mk.i); });
      // pokryté vlastným heslom: značka obsahuje posledné slovo aj meno pred ním
      const lastW = s.match(/[\p{L}]+$/u)[0];
      const lw = e - lastW.length;
      if (own.size && [...own].some((mk) => mk.i <= lw && mk.e >= e - 1) && cov >= 0.6 * s.replace(/\s+/g, "").length) continue;
      const k = s.toLowerCase();
      if (!missing.has(k)) missing.set(k, s);
    }
  }
  console.log("== CHOROBY, SYNDRÓMY, NÁDORY A CYSTY BEZ VLASTNÉHO HESLA");
  if (missing.size) { zle += missing.size; [...missing.values()].forEach((s) => console.log("   ✗ " + s)); }
  else console.log("   ok");

  // 2) neúplná značka: nasledujúce slovo patrí k názvu hesla; skratka rodu pred druhovým menom
  console.log("== NEÚPLNÁ ZNAČKA (pojem pokrytý len sčasti)");
  const part = new Set();
  for (const mk of marks) {
    // názov bez zátvorky a bez vysvetlenia za pomlčkou („ΔG — zmena voľnej energie“) – ako assets/js/pf-match.js
    const tw = words(mk.t.title.replace(/\s[—–-]\s.*$/, "").replace(/\(.*$/, ""));
    const g = text.slice(Math.max(0, mk.i - 4), mk.i).match(/(?:^|[^\p{L}])(\p{Lu})\.\s?$/u);
    if (g && tw[0] && tw[0][0] === g[1].toLowerCase() && tw.length >= 2) part.add(`„${g[1]}. | ${mk.s}“ → ${mk.t.id} – doplň vzor „${g[1]}\\\\.\\\\s?${mk.s}“`);
    if (tw.length < 2) continue;
    const after = text.slice(mk.e).match(/^\s+([\p{L}]{3,})/u);
    const ms = words(mk.s).map(stem);
    const rest = tw.filter((w) => !ms.some((s) => w.startsWith(s) || s.startsWith(w.slice(0, 4))));
    if (after && !owner[mk.e + after[0].indexOf(after[1])] && rest.some((w) => after[1].toLowerCase().startsWith(stem(w))))
      part.add(`„${mk.s} | ${after[1]}“ → ${mk.t.id} („${mk.t.title}“)`);
  }
  if (part.size) { zle += part.size; part.forEach((s) => console.log("   ✗ " + s)); } else console.log("   ok");

  // 3) cudzí význam: vzor so \w* chytil zložené slovo, ktorého prípona mení význam → CHYBA; ostatné dlhé tvary na posúdenie
  const cudzie = cudziVyznam(marks);
  console.log("== CUDZÍ VÝZNAM (zložené slovo otvára iné heslo: bronch\\w* → bronchitída, monocyt\\w* → monocytogenes)");
  if (cudzie.chyby.size) { zle += cudzie.chyby.size; cudzie.chyby.forEach((v, k) => console.log("   ✗ " + k + "  (prípona „" + v + "“ – zúž vzor alebo pridaj vlastné heslo)")); }
  else console.log("   ok");
  console.log("== NA POSÚDENIE: \\w* chytilo dlhšie slovo (iný význam?)");
  console.log(cudzie.sus.size ? "   " + [...cudzie.sus.keys()].join("\n   ") : "   —");
  console.log(zle ? `\nvysvetlivky ${slug}: ${zle} chýb` : `\nvysvetlivky ${slug}: ok`);
  process.exit(zle ? 1 : 0);
}

/* Texty samotných vysvetliviek: aj v nich sa pojmy označujú (a otvárajú ďalšie okno), preto platí tá istá kontrola
   cudzieho významu. Pojem sa vo vlastnom hesle neoznačuje (ako v prehliadači – excludeId). */
if (mode === "glosar") {
  const marks = [];
  for (const t of DATA) {
    if (t.group) continue;
    const text = textOf(String(t.short || "") + " · " + String(t.body || ""), true);
    for (const h of MATCH.all(text)) {
      const it = h.item;
      if (it.term.id === t.id || h.rejected) continue;
      marks.push({ i: h.index, e: h.index + h[0].length, s: h[0], t: it.term, src: it.src, v: t.id });
    }
  }
  const cudzie = cudziVyznam(marks);
  console.log("== CUDZÍ VÝZNAM vo vysvetlivkách");
  if (cudzie.chyby.size) cudzie.chyby.forEach((v, k) => console.log("   ✗ " + k + "  (prípona „" + v + "“)"));
  else console.log("   ok");
  console.log(cudzie.chyby.size ? `\nvysvetlivky (texty hesiel): ${cudzie.chyby.size} chýb` : "\nvysvetlivky (texty hesiel): ok");
  process.exit(cudzie.chyby.size ? 1 : 0);
}

const surf = {}; // termId -> {surface: count}
let all = "";
for (const f of fs.readdirSync(path.join(ROOT, "chapters")).filter((f) => /^\d.*\.html$/.test(f))) {
  const t = textOf(fs.readFileSync(path.join(ROOT, "chapters", f), "utf8"));
  all += " " + t;
}
// maskovanie pokrytých úsekov
let covered = all.split("");
for (const m of MATCH.all(all)) {
  if (m.rejected) continue;
  const term = m.item.term;
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

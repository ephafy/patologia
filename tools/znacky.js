#!/usr/bin/env node
/* tools/znacky.js — rýchla kontrola: HTML značka, ktorú čitateľ uvidí ako text („<p class="chain">…</p>“).
   Vznik: PATOLA 11.8.4 (10. 11. 2026) – surové HTML v .md build escapoval, prešlo buildom aj tools/rozlozenie.js.
   Tú istú kontrolu robí build pri každej kapitole (chyba = kód 1); tento nástroj ju spustí naraz nad hotovými súbormi
   bez buildu (≈ 1 s), napr. po hromadnej úprave textu alebo glosára.

     node tools/znacky.js            kapitoly (chapters/*.html), hlavná stránka a texty vysvetliviek (assets/glossary/*.js)
     node tools/znacky.js 11 13      len kapitoly s týmito číslami

   Hľadá: (1) v HTML kapitol a hubu escapovanú značku (&lt;p …&gt;) mimo <pre>/<code>;
          (2) v .md kapitol riadok, ktorý začína HTML značkou, ktorú formát nepozná (<p>, <div>, <span>…) –
              to je pôvod chyby (1), ešte pred buildom;
          (3) vo vysvetlivkách escapovanú značku v texte hesla.
   Výsledok: „ok“ (kód 0) alebo zoznam miest (kód 1). */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CH = path.join(ROOT, "chapters");
const GL = path.join(ROOT, "assets", "glossary");
const TAGS = "p|div|span|b|i|em|strong|u|s|sup|sub|small|mark|br|hr|ul|ol|li|table|thead|tbody|tr|td|th|a|img|figure|figcaption|h[1-6]|section|details|summary|abbr|code|pre";
const ESC = new RegExp(`&lt;\\/?(?:${TAGS})\\b[^<>]{0,200}?(?:&gt;|>)`, "gi");
// riadok .md, ktorý začína značkou mimo formátu (komentár <!-- a vložené <svg> formát pozná)
const RAW_MD = new RegExp(`^\\s*<\\/?(?:${TAGS.replace("|img", "")})(?=[\\s>/])`, "i");

const only = process.argv.slice(2).filter((a) => /^\d+$/.test(a)).map((a) => a.padStart(2, "0"));
const pick = (f) => !only.length || only.some((n) => f.startsWith(n + "_"));
const out = [];
const strip = (t) => t.replace(/<pre[\s\S]*?<\/pre>/g, " ").replace(/<code[\s\S]*?<\/code>/g, " ");
const show = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').slice(0, 60);

function scanHtml(file, label) {
  const t = strip(fs.readFileSync(file, "utf8"));
  let m;
  ESC.lastIndex = 0;
  while ((m = ESC.exec(t))) {
    const before = t.slice(0, m.index);
    const sec = [...before.matchAll(/id="((?:sec|sub)-[\d-]+)"/g)].pop();
    out.push(`${label}${sec ? " #" + sec[1] : ""}: „${show(m[0])}“ sa zobrazí ako text`);
  }
}

for (const f of fs.readdirSync(CH).filter((f) => /^\d+_.*\.md$/.test(f) && pick(f)).sort()) {
  let fence = false;
  fs.readFileSync(path.join(CH, f), "utf8").split(/\r?\n/).forEach((l, i) => {
    if (/^```/.test(l)) { fence = !fence; return; }
    if (!fence && RAW_MD.test(l)) out.push(`${f}:${i + 1}: riadok začína HTML značkou „${l.trim().slice(0, 40)}“ – formát ju nepozná (zobrazí sa ako text); použi \`\`\`chain, **tučne** a pod.`);
  });
  const html = path.join(CH, f.replace(/\.md$/, ".html"));
  if (fs.existsSync(html)) scanHtml(html, f.replace(/\.md$/, ".html"));
}
if (!only.length) {
  const hub = path.join(ROOT, "index.html");
  if (fs.existsSync(hub)) scanHtml(hub, "index.html");
  if (fs.existsSync(GL))
    for (const f of fs.readdirSync(GL).filter((f) => f.endsWith(".js")).sort()) {
      fs.readFileSync(path.join(GL, f), "utf8").split(/\r?\n/).forEach((l, i) => {
        let m;
        ESC.lastIndex = 0;
        while ((m = ESC.exec(l))) out.push(`assets/glossary/${f}:${i + 1}: „${show(m[0])}“ sa vo vysvetlivke zobrazí ako text`);
      });
    }
}

if (out.length) {
  console.log(`HTML značky viditeľné ako text: ${out.length}`);
  out.forEach((s) => console.log("   ✗ " + s));
  process.exitCode = 1;
} else console.log(`značky: ok${only.length ? " (kap. " + only.join(", ") + ")" : " (kapitoly, hub, vysvetlivky)"}`);

#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/rozlozenie.js — kontrola rozloženia kapitol v skutočnom prehliadači (headless Chrome, bez knižníc)

   Zdieľaný súbor všetkých kníh (KNIHY-CORE) – v knihe ho nemeň.

   Prečo: 30. 10. 2026 mala kap. 9 BIOCHEM bočný posuv a ≈ 9 000 px bielej plochy pod stránkou. Príčinou boli
   prázdne okrajové boxy zo zvyšku dávkovej úpravy (<<< === >>>), ktoré site.js odsunul mimo stránky.
   Build, legálna kontrola, pokrytie aj doklady boli „ok“ – žiadna z nich nevidí výsledné rozloženie.
   Tento nástroj ho vidí: chytí bočný posuv a bielu plochu z AKEJKOĽVEK príčiny (široká tabuľka, schéma,
   dlhé slovo, poznámka na okraji, chyba v site.js…), nielen tej jednej.

   Kontroluje každú kapitolu (chapters/*.html) a hlavnú stránku (index.html) na troch šírkach:
     1400 px (počítač, okraj s poznámkami) · 1000 px (najužší okraj) · 400 px (telefón, dotyk)
   Chyba:
     • bočný posuv – stránka je širšia než okno (scrollWidth > clientWidth)
     • biela plocha dole – dokument siaha o viac než 200 px pod koniec stránky (.site-shell / main)
     • diera v texte – site.js roztiahol text pred kotvou poznámky na okraji o viac než MAX_DIERA px (10. 11. 2026:
       PATOLA 11.6.3 – „Môžeš počuť“ odtlačila „Kliniku“ a text pod odsekom sa roztiahol o ≈ 130 px prázdna;
       site.js teraz text rozťahuje najviac o PUSH_MAX, inak čiaru zalomí)
   Pri chybe vypíše prvky, ktoré to spôsobili (značka, trieda, sekcia, text).

     node tools/rozlozenie.js                 všetky kapitoly + hub
     node tools/rozlozenie.js 09 07_biol…     len vybrané (číslo alebo začiatok mena súboru)
     node tools/rozlozenie.js --zmenene       len kapitoly, ktorých .md alebo .html git hlási ako zmenené
                                              (+ hub, keď sa zmenil hub.json alebo index.html)
   Kód 0 = ok · 1 = chyba rozloženia · 2 = kontrola sa nedala spustiť (chýba Chrome) – publish.ps1 ho vtedy preskočí.
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const CH = path.join(ROOT, "chapters");
const argv = process.argv.slice(2);
const SIRKY = [
  { w: 1400, h: 900, mobile: false, nazov: "počítač 1400" },
  { w: 1000, h: 800, mobile: false, nazov: "okraj 1000" },
  { w: 400, h: 800, mobile: true, nazov: "mobil 400" },
];
const MAX_DIERA = 64;    // px, o ktoré smie site.js roztiahnuť text pred kotvou poznámky (PUSH_MAX 40 + doladenie čiary 24)
const MAX_BIELA = 200;   // px pod koncom stránky, ktoré ešte nie sú chyba (zaokrúhlenie, tieň, rezerva)

/* Lupa obrázkov a koliesko (8. 11. 2026): koliesko myši prestalo približovať, keď prehliadač hlásil
   krok ako zlomok (priblíženie prehliadača, škálovanie Windows 125/150 % → 83,33 či 66,67 bodu) –
   glossary.js ho bral ako touchpad a nepriblížený obrázok ignoroval. Build ani rozloženie to nevideli.
   Preto sa v Chrome otvorí lupa a koliesko sa skúsi s krokmi myši pri rôznom škálovaní aj s malými
   krokmi touchpadu; obrázok sa musí priblížiť. Beží pri plnej kontrole a pri --zmenene vtedy, keď sa
   zmenila kapitola alebo glossary.js / glossary.css. */
const LUPA_KROKY = [
  { nazov: "myš 100 %", d: [-100] },
  { nazov: "myš 120 % (83,33)", d: [-83.33] },
  { nazov: "myš 150 % (66,67)", d: [-66.67] },
  { nazov: "touchpad (malé kroky)", d: [-8, -8, -8, -8] },
];
let lupaTreba = !argv.includes("--zmenene");
/* AI okno (12. 11. 2026, opravy.docx): okno sa pri otvorení rolovalo animovane a nie na koniec, počas písania odpovede
   odrolovalo za jej začiatok, <datalist> modelov ukazoval len jednu položku a „zbaliť“ a „zavrieť“ boli dve tlačidlá
   s tým istým účinkom. Skúška s podstrčenou odpoveďou (fetch) – beží pri plnej kontrole a pri zmene ai-chat.js/.css. */
let aiTreba = !argv.includes("--zmenene");
/* Editor kapitoly (12. 11. 2026, autor: „keď mám obrázok v stĺpci, neviem sa k nemu dostať… ako idem cez medzeru, skočí to
   na blok stĺpcov“): lišta bloku stojí 6 px nad ním a cesta myši k nej vedie cez medzeru nad blokom stĺpcov – editor lištu
   hneď prepol na „Stĺpce“. Skúška: obrázok sa dá ⇆ vedľa, myš ide z obrázka rovno hore na jeho lištu (lišta musí ostať
   „Obrázok“) a potom na voľné miesto v druhom stĺpci (lišta sa musí prepnúť na „Stĺpce“). admin/ nie je v gite, preto
   pri --zmenene beží, keď sa editor.js líši od naposledy úspešne skúšanej verzie (.git/rozlozenie-editor.ok);
   --editor = len táto skúška. Spúšťa ju aj KNIHY-CORE/sync.js, keď sa editor zmení. */
const EDITOR_JS = path.join(ROOT, "admin", "editor.js");
const EDITOR_OK = path.join(ROOT, ".git", "rozlozenie-editor.ok");
const editorHash = () => { try { return require("crypto").createHash("sha1").update(fs.readFileSync(EDITOR_JS)).digest("hex"); } catch (e) { return ""; } };
const LEN_EDITOR = argv.includes("--editor");
let editorTreba = fs.existsSync(EDITOR_JS) && (LEN_EDITOR || !argv.includes("--zmenene") ||
  (() => { try { return fs.readFileSync(EDITOR_OK, "utf8").trim() !== editorHash(); } catch (e) { return true; } })());
if (LEN_EDITOR) { lupaTreba = false; aiTreba = false; }
/* spodný pás (.pf-dock, 12. 11. 2026) – pri plnej kontrole a pri zmene site.js/.css, ai-chat.js alebo hlavnej stránky */
let dockTreba = !argv.includes("--zmenene");
/* Súbežný beh (24. 11. 2026, autor: „ten súbor na zverejnenie beží strašne dlho“): celá kontrola trvala ≈ 285 s – 45 načítaní
   strán (15 strán × 3 šírky) za sebou ≈ 130 s, skúšky lupy, AI, pásu, obnovenia ≈ 55 s a skúška editora ≈ 100 s, všetko
   v jednom okne Chrome. Teraz sa práca rozdelí na časti, ktoré bežia naraz, každá vo vlastnom Chrome (vlastný profil,
   vlastný port): každá šírka zvlášť, ostatné skúšky zvlášť a editor zvlášť. Kontroly sú tie isté, mení sa len to, že
   nečakajú jedna na druhú. Časť sa spúšťa ako ten istý skript s --cast=… a zoznamom strán v RZ_PLAN; jej výstup sa
   vypíše v pevnom poradí (šírky, skúšky, editor). RZ_SPOLU=1 = všetko v jednom Chrome za sebou ako predtým. */
const CAST = (argv.find((a) => a.startsWith("--cast=")) || "").slice(7);
// skúška editora (≈ 100 s) sa delí na dve polovice: 1 = lišta, stĺpce, krok späť, presun, orezanie, rozšírenie, rad obrázkov;
// 2 = písanie, mriežka, obnovenie stránky, Ctrl+E. Každá podskúška si načíta vlastnú kapitolu a nič nepreberá z predošlej
// (pe-view má v čistom profile predvolene „zapnuté“, ako ho nastavuje prvá podskúška). 0 = celá skúška v jednom behu.
const EP = CAST === "editor:1" ? 1 : CAST === "editor:2" ? 2 : 0;

async function rozdel(stranky) {
  const plan = { stranky, lupa: lupaTreba, ai: aiTreba, dock: dockTreba, editor: editorTreba };
  const casti = [];
  if (stranky.length) SIRKY.forEach((s, i) => casti.push("stranky:" + i));
  if (lupaTreba || aiTreba || dockTreba) casti.push("skusky");
  if (editorTreba) casti.push("editor:1", "editor:2");
  if (casti.length < 2) return false;
  const t0 = Date.now();
  const vysl = await Promise.all(casti.map((c) => new Promise((res) => {
    const kus = [];
    const p = cp.spawn(process.execPath, [__filename, "--cast=" + c], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"],
      env: Object.assign({}, process.env, { RZ_PLAN: JSON.stringify(plan) }) });
    p.stdout.on("data", (d) => kus.push(d)); p.stderr.on("data", (d) => kus.push(d));
    p.on("error", (e) => kus.push(Buffer.from("rozloženie: časť " + c + " sa nedala spustiť – " + e.message + "\n")));
    p.on("close", (code) => res({ c, code, out: Buffer.concat(kus).toString("utf8"), s: (Date.now() - t0) / 1000 }));
  })));
  if (process.env.RZ_CASY) console.log("časy častí: " + vysl.map((v) => v.c + " " + v.s.toFixed(0) + " s").join(" · "));
  let chyb = 0, editorOk = 0; const nejde = [];
  for (const v of vysl) {
    const riadky = v.out.replace(/\r/g, "").split("\n");
    const m = riadky.map((l) => /^__RZ__ (\d+)$/.exec(l)).find(Boolean);
    if (m) { chyb += +m[1]; if (/^editor:/.test(v.c) && +m[1] === 0 && /^editor \(\d\/2\): .* – ok$/m.test(v.out.replace(/\r/g, ""))) editorOk++; }
    else nejde.push(v.c + (v.code != null ? " (kód " + v.code + ")" : ""));
    const text = riadky.filter((l) => !/^__RZ__ /.test(l)).join("\n").replace(/\s+$/, "");
    if (text) console.log(text);
  }
  // skúšaná verzia editora sa zapíše, len keď prešli obe polovice (pri --zmenene sa potom skúška preskočí)
  if (editorTreba && editorOk === 2) { try { fs.writeFileSync(EDITOR_OK, editorHash()); } catch (e) {} }
  if (chyb) { console.log(`\nrozloženie: ${chyb} chýb (${stranky.length} strán × ${SIRKY.length} šírky)`); process.exitCode = 1; }
  else if (nejde.length) { console.log("rozloženie: kontrola sa nedá spustiť – neprebehla časť " + nejde.join(", ")); process.exitCode = 2; }
  else console.log(`rozloženie: ok (${stranky.length} strán × ${SIRKY.length} šírky)`);
  return true;
}

function zoznam() {
  const vsetky = fs.existsSync(CH) ? fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort() : [];
  const ciele = argv.filter((a) => !a.startsWith("--"));
  let kap = vsetky, hub = fs.existsSync(path.join(ROOT, "index.html"));
  if (argv.includes("--zmenene")) {
    let st = "";
    try { st = cp.execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" }); } catch (e) {}
    const zm = st.split("\n").map((l) => l.slice(3).trim().replace(/^"|"$/g, "")).filter(Boolean);
    lupaTreba = zm.some((f) => /^assets\/(js\/(glossary|peek)\.js|styles\/glossary\.css)$/.test(f) || /^chapters\/[^/_][^/]*\.(md|html)$/.test(f));
    aiTreba = zm.some((f) => /^assets\/(js\/ai-chat\.js|styles\/ai-chat\.css)$/.test(f));
    dockTreba = zm.some((f) => /^assets\/(js\/(site|ai-chat)\.js|styles\/site\.css)$/.test(f) || f === "index.html" || f === "hub.json");
    const stems = new Set(zm.filter((f) => /^chapters\/[^/_][^/]*\.(md|html)$/.test(f)).map((f) => path.basename(f).replace(/\.(md|html)$/, "")));
    kap = vsetky.filter((f) => stems.has(f.replace(/\.html$/, "")));
    hub = hub && zm.some((f) => f === "hub.json" || f === "index.html");
  } else if (ciele.length) {
    kap = vsetky.filter((f) => ciele.some((c) => f.startsWith(c)));
    hub = hub && ciele.includes("index");
  }
  const out = kap.map((f) => path.join(CH, f));
  if (hub) out.push(path.join(ROOT, "index.html"));
  return out;
}

// beží na stránke: vráti mieru presahu a prvky, ktoré ho spôsobili
const MERANIE = `(() => {
  const de = document.documentElement, vw = de.clientWidth, sy = window.scrollY;
  const kon = document.querySelector(".site-shell") || document.querySelector("main") || document.body;
  const koniec = Math.round(kon.getBoundingClientRect().bottom + sy);
  const popis = (e) => {
    const c = (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || "";
    const sek = e.closest && e.closest("section[id], [id^=sec-]");
    const t = (e.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 60);
    return e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (c ? "." + String(c).trim().split(/\\s+/).join(".") : "") +
      (sek && sek.id ? " (v #" + sek.id + ")" : "") + (t ? " „" + t + "“" : " (prázdny)");
  };
  // prvok, ktorý presah nespôsobuje, lebo ho predok orezáva (tabuľka s vodorovným posunom na mobile)
  const orezany = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p); if (o.overflowX !== "visible" || o.overflow !== "visible") return true; } return false; };
  const vonkajsi = (zoz) => zoz.filter((e) => !zoz.includes(e.parentElement));
  const vsetky = Array.from(document.querySelectorAll("body *")).filter((e) => { const s = getComputedStyle(e); return s.display !== "none" && s.position !== "fixed"; });
  const res = { sirka: de.scrollWidth, okno: vw, vyska: de.scrollHeight, koniec, doprava: [], dole: [] };
  if (de.scrollWidth > vw + 1) {
    const z = vsetky.filter((e) => e.getBoundingClientRect().right > vw + 1 && !orezany(e));
    res.doprava = vonkajsi(z).slice(0, 6).map((e) => popis(e) + " → pravý okraj " + Math.round(e.getBoundingClientRect().right) + " px");
  }
  if (de.scrollHeight - koniec > ${MAX_BIELA}) {
    const z = vsetky.filter((e) => e.getBoundingClientRect().bottom + sy > koniec + 20);
    res.dole = vonkajsi(z).slice(0, 6).map((e) => popis(e) + " → spodok " + Math.round(e.getBoundingClientRect().bottom + sy) + " px");
  }
  // diera v texte: kotva poznámky na okraji s veľkým horným okrajom (site.js – posun textu, aby čiara išla rovno)
  res.diery = Array.from(document.querySelectorAll(".side-anchor")).filter((a) => (parseFloat(a.style.marginTop) || 0) > ${MAX_DIERA})
    .slice(0, 6).map((a) => Math.round(parseFloat(a.style.marginTop)) + " px nad " + popis(a.nextElementSibling || a));
  // štítok skratky na okraji nesmie niesť vysvetlivku (10. 11. 2026 – „NET“ v kap. 11 otváral neutrofilovú sieť)
  res.skrStitok = Array.from(document.querySelectorAll(".k-skr .sk > b .pf-term, .k-skr .sk > b.pf-term")).slice(0, 6)
    .map((e) => "„" + e.textContent + "“ → " + e.getAttribute("data-term"));
  // jeden pojem rozdelený na dve vysvetlivky: „bazocelulárny karcinóm | (bazalióm)“, „index… | , MAI“ (9. 11. 2026)
  res.rozdelene = Array.from(document.querySelectorAll(".pf-term")).filter((e) => {
    const t = e.nextSibling, n = t && t.nextSibling;
    return t && t.nodeType === 3 && /^\\s*[(,]?\\s*$/.test(t.nodeValue) && n && n.nodeType === 1 &&
      n.classList.contains("pf-term") && !n.classList.contains("pf-info") && !e.classList.contains("pf-info") &&
      n.getAttribute("data-term") === e.getAttribute("data-term");   // ⓘ za pojmom je zámerne samostatné tlačidlo
  }).slice(0, 6).map((e) => "„" + e.textContent + e.nextSibling.nodeValue + e.nextSibling.nextSibling.textContent + "“ → " + e.getAttribute("data-term"));
  return res;
})()`;

/* Napojenie poznámok na okraji (16. 11. 2026, opravy.docx: „keď mením rozlíšenie, zoom… pri niektorých to je odpojené“,
   „po skrytí navigácie sa to pomieša“): každá poznámka s pásikom musí byť spojená so svojou čiarou – rovná čiara končí
   na ľavom okraji poznámky a leží v jej výške, zalomená vojde do ľavého horného rohu, čiara od nadpisu k Jadru začína
   pri nadpise a končí pri Jadre. Meria sa na začiatku stránky AJ po prepočte pri odrolovanej stránke: site.js ukladal
   poznámky voči polohe stránky zmeranej raz a prehliadač ju počas prepočtu posunul (scroll anchoring) – na začiatku
   kapitoly sa to nestane nikdy, preto to predošlé kontroly nevideli. */
const STLPCE = `(() => {
  const out = [];
  document.querySelectorAll(".page .stlpce[data-vyrovnat]").forEach((r) => {
    const cols = [].filter.call(r.children, (c) => c.classList.contains("stlpec"));
    if (cols.length < 2 || getComputedStyle(r).display !== "grid" || cols.some((c, i) => i && c.offsetLeft <= cols[i - 1].offsetLeft)) return;
    const nm = "„" + r.textContent.replace(/\\s+/g, " ").trim().slice(0, 40) + "“", mode = r.getAttribute("data-vyrovnat");
    const ws = cols.map((c) => c.getBoundingClientRect().width), W = ws.reduce((a, x) => a + x, 0);
    if (mode === "nie") {
      const t = (r.getAttribute("style").match(/[\\d.]+(?=fr)/g) || []).map(parseFloat), T = t.reduce((a, x) => a + x, 0);
      if (r._tpl0 !== undefined && r.style.gridTemplateColumns !== r._tpl0) out.push("pevné šírky (pevne) boli posunuté: " + nm);
      else if (t.length === cols.length && t.some((x, i) => Math.abs(x / T - ws[i] / W) > 0.02)) out.push("pevné šírky (pevne) nesedia so zápisom (" + ws.map((x) => Math.round(x / W * 100)).join(" · ") + "): " + nm);
    } else if (mode === "obrazky") {
      const hs = [];
      cols.forEach((c) => {
        const im = [].find.call(c.querySelectorAll("figure img, figure svg"), (i) => { let p = i.parentNode; while (p && p !== c && !(p.classList && p.classList.contains("stlpce"))) p = p.parentNode; return p === c; });
        const h = im ? im.getBoundingClientRect().height : 0;
        if (h > 2) hs.push(h);
      });
      if (hs.length > 1 && Math.max.apply(null, hs) - Math.min.apply(null, hs) > 3 && W >= 60 * cols.length + 40)
        out.push("obrázky v stĺpcoch nie sú rovnako vysoké (obrazky; " + hs.map((x) => Math.round(x)).join(" · ") + " px): " + nm);
    }
  });
  return out.slice(0, 6);
})()`;

const NAPOJENIE = `(() => {
  const page = document.querySelector(".page"), out = [];
  if (!page) return { n: 0, zle: [], spolu: 0 };
  let n = 0;
  page.querySelectorAll(".side-note").forEach((el) => {
    const a = el._anchor, nm = "„" + el.textContent.replace(/\\s+/g, " ").trim().slice(0, 40) + "“";
    if (!a || !a.isConnected) { out.push("poznámka bez kotvy v texte: " + nm); return; }
    if (a.nextElementSibling !== el) out.push("kotva nestojí pred svojou poznámkou: " + nm);
    const r = el.getBoundingClientRect(), ar = a.getBoundingClientRect(), bw = parseFloat(a.style.height) || 0;
    if (el.classList.contains("k-jadro")) {
      const head = el.parentNode.previousElementSibling, L = el._lead;
      if (!head || !head.classList.contains("sec-h") || !L || L.style.display === "none") return;
      n++;
      const lr = L.getBoundingClientRect(), t = (head.lastElementChild || head).getClientRects(), last = t[t.length - 1];
      const d = L.firstChild.getAttribute("d") || "", y1 = lr.top + parseFloat(d.split(" ")[1]), m = /V([0-9.-]+)/.exec(d);
      const y2 = lr.top + (m ? parseFloat(m[1]) : parseFloat(d.split(" ")[1]));
      if (last && (y1 < last.top - 5 || y1 > last.bottom + 5)) out.push("čiara k Jadru nezačína pri nadpise (o " + Math.round(y1 - (last.top + last.bottom) / 2) + " px vedľa): " + nm);
      if (Math.abs(lr.right - r.left) > 2.5) out.push("čiara k Jadru nekončí pri ňom (" + (lr.right - r.left).toFixed(1) + " px): " + nm);
      if (Math.abs(y2 - (r.top + 1)) > 3) out.push("čiara k Jadru nekončí pri jeho hornej linke (o " + (y2 - r.top).toFixed(1) + " px): " + nm);
      return;
    }
    if (bw <= 0 || el.classList.contains("k-skr")) return;
    n++;
    if (!a._v || a._v.style.display === "none") {
      if (Math.abs(ar.right - r.left) > 1.5) out.push("čiara nekončí na okraji poznámky (" + (ar.right - r.left).toFixed(1) + " px): " + nm);
      if (ar.bottom > r.bottom + 1.2 || ar.top < r.top - 1.2) out.push("poznámka nesedí na svojej čiare (čiara " + (ar.bottom > r.bottom ? (ar.bottom - r.bottom).toFixed(1) + " px pod ňou" : (r.top - ar.top).toFixed(1) + " px nad ňou") + "): " + nm);
    } else {
      const hr = a._h.getBoundingClientRect(), vr = a._v.getBoundingClientRect();
      if (hr.right < r.left - 1 || hr.right > r.left + 2 * bw + 2) out.push("zalomená čiara nekončí pri poznámke (" + (hr.right - r.left).toFixed(1) + " px): " + nm);
      if (Math.abs(hr.top - r.top) > 1.5) out.push("zalomená čiara nevchádza do horného rohu poznámky (o " + (hr.top - r.top).toFixed(1) + " px): " + nm);
      if (Math.abs(vr.top - ar.top) > 1.5 || Math.abs(vr.bottom - hr.bottom) > 1.5) out.push("zalomená čiara je roztrhnutá: " + nm);
    }
  });
  return { n, zle: out.slice(0, 8), spolu: out.length };
})()`;

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let stranky, sirky = SIRKY;
  if (CAST) {   // časť súbežného behu (pozri rozdel): zoznam strán a čo skúšať prišlo od hlavného behu
    const plan = JSON.parse(process.env.RZ_PLAN || "{}");
    stranky = plan.stranky || [];
    sirky = CAST.startsWith("stranky:") ? [SIRKY[+CAST.slice(8)]] : [];
    lupaTreba = CAST === "skusky" && !!plan.lupa; aiTreba = CAST === "skusky" && !!plan.ai; dockTreba = CAST === "skusky" && !!plan.dock;
    editorTreba = EP > 0 && !!plan.editor;
  } else {
    stranky = LEN_EDITOR ? [] : zoznam();
    if (!stranky.length && !lupaTreba && !aiTreba && !editorTreba) { console.log("rozloženie: nie je čo kontrolovať"); return; }
  }
  if (!CHROME || typeof WebSocket === "undefined") {
    console.log("rozloženie: kontrola sa nedá spustiť (" + (!CHROME ? "chýba Chrome" : "Node bez WebSocket – treba Node 22+") + ")");
    process.exitCode = 2; return;
  }
  if (!CAST && !process.env.RZ_SPOLU && await rozdel(stranky)) return;
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "kn-rozl-"));
  // port pridelí Chrome sám (0) a zapíše ho do profilu – súbežné časti sa tak nikdy nezrazia na tom istom porte
  const chrome = cp.spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profil}`, "--no-first-run",
    "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--disable-extensions", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
  let ws, chyb = 0;
  try {
    let port, tg;
    for (let i = 0; i < 150 && !port; i++) { try { port = +fs.readFileSync(path.join(profil, "DevToolsActivePort"), "utf8").split("\n")[0]; } catch (e) {} if (!port) await sleep(100); }
    if (!port) throw new Error("Chrome neodpovedá (chýba DevToolsActivePort)");
    for (let i = 0; i < 60 && !tg; i++) { try { tg = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch (e) { await sleep(200); } }
    if (!tg) throw new Error("Chrome neodpovedá");
    ws = new WebSocket(tg.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let id = 0; const cak = new Map(); let nacitane = null;
    ws.onmessage = (m) => {
      const d = JSON.parse(m.data);
      if (d.id && cak.has(d.id)) { cak.get(d.id)(d); cak.delete(d.id); }
      else if (d.method === "Page.loadEventFired" && nacitane) { nacitane(); nacitane = null; }
    };
    const send = (method, params = {}) => new Promise((res) => { const i = ++id; cak.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
    await send("Page.enable"); await send("Network.enable");
    // admin nástroj autora (Ctrl+R, presmerovanie na localhost) by meranie skreslil
    await send("Network.setBlockedURLs", { urls: ["*/admin/admintools.js", "*/admin/html2canvas.min.js"] });

    for (const s of sirky) {
      await send("Emulation.setDeviceMetricsOverride", { width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.mobile });
      await send("Emulation.setTouchEmulationEnabled", { enabled: s.mobile });
      for (const f of stranky) {
        const url = "file:///" + f.replace(/\\/g, "/");
        const hotovo = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url });
        await Promise.race([hotovo, sleep(15000)]);
        await sleep(1200);   // site.js rozkladá okraj po načítaní písma
        // kapitola s rozšíreniami (:::rozsirenie, 10. 11. 2026) sa meria dvakrát: základná aj rozšírená verzia;
        // v základnej nesmie byť rozšírenie vidieť, v rozšírenej musí byť vidieť každé
        const ev0 = async (x) => { const q = await send("Runtime.evaluate", { expression: x, returnByValue: true }); return q.result && q.result.result && q.result.result.value; };
        const maRoz = await ev0("!!(document.querySelector('.rozsir') && window.PF_ROZSIR)");
        for (const roz of maRoz ? [false, true] : [false]) {
        if (roz) { await ev0("window.PF_ROZSIR(true, true)"); await sleep(900); }
        const r = await send("Runtime.evaluate", { expression: MERANIE, returnByValue: true });
        const v = r.result && r.result.result && r.result.result.value;
        const meno = path.relative(ROOT, f).replace(/\\/g, "/") + (roz ? " (rozšírená verzia)" : "");
        if (!v) { console.log(`  ? ${meno} · ${s.nazov}: meranie zlyhalo`); continue; }
        const zle = [];
        if (maRoz) {
          const vid = await ev0("[...document.querySelectorAll('.rozsir')].map(e => e.getClientRects().length > 0)");
          if (!roz && vid.some(Boolean)) zle.push(`rozšírenie je vidieť v základnej verzii (${vid.filter(Boolean).length}× – štýl .rozsir v chapter-extra.css)`);
          if (roz && !vid.every(Boolean)) zle.push(`rozšírená verzia neukázala ${vid.filter((x) => !x).length} rozšírení`);
          if (roz) await ev0("document.documentElement.classList.remove('pf-rozsir')");
        }
        if (v.sirka > v.okno + 1) zle.push(`bočný posuv: stránka ${v.sirka} px > okno ${v.okno} px` + v.doprava.map((x) => "\n        " + x).join(""));
        if (v.vyska - v.koniec > MAX_BIELA) zle.push(`biela plocha dole: ${v.vyska - v.koniec} px pod koncom stránky` + v.dole.map((x) => "\n        " + x).join(""));
        if (v.diery && v.diery.length) zle.push(`diera v texte (poznámka na okraji roztiahla text o viac než ${MAX_DIERA} px – skráť poznámky alebo ich rozlož ďalej od seba):` + v.diery.map((x) => "\n        " + x).join(""));
        if (v.skrStitok && v.skrStitok.length) zle.push("vysvetlivka na štítku skratky na okraji (glossary.js SKIP):" + v.skrStitok.map((x) => "\n        " + x).join(""));
        if (v.rozdelene && v.rozdelene.length) zle.push("jeden pojem na dve vysvetlivky (spoj značky v glossary.js):" + v.rozdelene.map((x) => "\n        " + x).join(""));
        /* Režimy stĺpcov (16. 11. 2026, autor: „nech je to toggle, aj možnosť, aby obrázky boli rovnako vysoké v riadku“):
           :::stlpce … obrazky → prvé obrázky stĺpcov musia vyjsť rovnako vysoké; :::stlpce … pevne → šírky presne podľa zápisu
           (site.js ich nesmie posunúť). */
        if (!roz && !/index\.html$/.test(f)) {
          const st = await ev0(STLPCE);
          if (st && st.length) zle.push("stĺpce (site.js – balanceStlpce):" + st.map((x) => "\n        " + x).join(""));
        }
        // napojenie poznámok na okraji: na začiatku stránky a po prepočte pri odrolovanej stránke (pozri NAPOJENIE)
        if (!roz && !s.mobile && s.w >= 981 && !/index\.html$/.test(f)) {
          const nap = async (kde) => {
            // obrázky sa ešte dočítavajú a text sa hýbe – počká sa na ustálenie (chyba je len trvalé odpojenie)
            for (let i = 0; i < 6; i++) { const q0 = await ev0(NAPOJENIE); if (!q0 || !q0.zle.length) break; await sleep(400); }
            const q = await ev0(NAPOJENIE);
            if (q && q.zle.length) zle.push(`poznámky na okraji nie sú napojené na svoju čiaru (${kde}; ${q.spolu} chýb pri ${q.n} poznámkach – site.js):` + q.zle.map((x) => "\n        " + x).join(""));
            return q && q.n;
          };
          if (await nap("začiatok stránky")) {
            for (const podiel of [0.5, 1]) {
              await ev0(`window.scrollTo({ top: document.documentElement.scrollHeight * ${podiel}, behavior: "instant" }); 1`);
              await sleep(150);
              const y0 = await ev0("(() => { const e = document.elementFromPoint(innerWidth * 0.45, innerHeight / 2); window.__nb = e; return e ? e.getBoundingClientRect().top : null; })()");
              await ev0('window.dispatchEvent(new Event("resize")); 1');
              await sleep(350);
              await nap("po prepočte pri odrolovanej stránke, " + Math.round(podiel * 100) + " %");
              const y1 = await ev0("window.__nb && window.__nb.isConnected ? window.__nb.getBoundingClientRect().top : null");
              if (y0 != null && y1 != null && Math.abs(y1 - y0) > 60) zle.push(`prepočet okraja posunul čítaný text o ${Math.round(y1 - y0)} px (odrolované na ${Math.round(podiel * 100)} %)`);
            }
            await ev0('window.scrollTo({ top: 0, behavior: "instant" }); 1');
          }
        }
        if (zle.length) { chyb++; console.log(`  ✖ ${meno} · ${s.nazov}\n      ` + zle.join("\n      ")); }
        }
      }
    }

    // vnorené pojmy v definícii karty (10. 11. 2026): otvorí karty hesiel, ktorých definícia obsahuje názov iného hesla,
    // a overí, že sa v definícii (.kicker) podčiarkol aspoň jeden pojem – inak glossary.js definíciu neznačkuje
    if (lupaTreba) {
      const kap0 = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))[0];
      if (kap0) {
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        const hotovo0 = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + kap0.replace(/\\/g, "/") });
        await Promise.race([hotovo0, sleep(15000)]);
        await sleep(1500);
        const VNOR = `(async () => {
          const G = window.PF_GLOSSARY || [], open = window.PF_GLOSSARY_OPEN;
          if (!open || !G.length) return { skusane: 0 };
          const ciele = G.filter((t) => t.short && !t.body && G.some((u) => u !== t && u.title && u.title.length > 3 &&
            t.short.indexOf(u.title.split(/[ (–—]/)[0]) >= 0)).slice(0, 25);
          let s = 0;
          for (const t of ciele) {
            document.querySelectorAll(".pf-tip .close").forEach((b) => b.click());
            await new Promise((r) => setTimeout(r, 60));
            open(t.id, document.body);
            await new Promise((r) => setTimeout(r, 120));
            if (document.querySelector(".pf-tip .kicker .pf-term")) s++;
          }
          document.querySelectorAll(".pf-tip .close").forEach((b) => b.click());
          return { skusane: ciele.length, so: s };
        })()`;
        const rv = await send("Runtime.evaluate", { expression: VNOR, returnByValue: true, awaitPromise: true });
        const v = rv.result && rv.result.result && rv.result.result.value;
        if (v && v.skusane >= 5 && v.so === 0) { chyb++; console.log(`  ✖ vysvetlivky: v definícii karty sa nepodčiarkol žiadny vnorený pojem (${v.skusane} kariet) – glossary.js neznačkuje .kicker`); }
        else if (v && v.skusane) console.log(`vysvetlivky: vnorené pojmy v definícii karty ok (${v.so}/${v.skusane} kariet)`);

        /* plynulé otvorenie okna (24. 11. 2026, autor: „animácie na ukázanie vysvetlenia sekajú“): animácia sa spustila
           v tej istej snímke ako rozloženie nového okna a čitateľ videl len jej koniec. Okno sa teraz v prvej snímke len
           pripraví (.pf-prep) a animuje sa až v ďalšej. Kapitola v pokoji nesmie mať bežiacu nekonečnú animáciu
           (skryté koliesko a prúžok sa predtým točili stále a nútili prehliadač kresliť každú snímku). */
        const PLYN = `(async () => {
          const out = [], raf = () => new Promise((r) => requestAnimationFrame(() => r()));
          document.querySelectorAll(".pf-tip .close").forEach((b) => b.click());
          await new Promise((r) => setTimeout(r, 400));
          const term = [...document.querySelectorAll(".page p .pf-term")].find((t) => t.getClientRects().length);
          if (!term) return { out: [], skip: 1 };   /* kniha bez vysvetliviek v texte (CHIRA) */
          term.click();
          const tip = document.querySelector(".pf-tip");
          if (!tip) return { out: ["klik na pojem neotvoril okno"] };
          if (!tip.classList.contains("pf-prep")) out.push("okno sa nepripravilo (.pf-prep) – animácia začne v snímke rozloženia");
          let anim = false;
          for (let i = 0; i < 6 && !anim; i++) { await raf(); anim = !tip.classList.contains("pf-prep") && tip.getAnimations().some((a) => a.animationName === "pf-tip-in" || a.animationName === "pf-tip-fade"); }
          if (!anim) out.push("vstupná animácia okna sa po príprave nespustila");
          document.querySelectorAll(".pf-tip .close").forEach((b) => b.click());
          await new Promise((r) => setTimeout(r, 500));
          const inf = document.getAnimations().filter((a) => a.playState === "running" && a.effect && a.effect.getComputedTiming().iterations === Infinity)
            .map((a) => { const t = a.effect.target; return (t && t.tagName || "?") + "." + (t && typeof t.className === "string" ? t.className : "") + " " + (a.animationName || ""); });
          if (inf.length) out.push("v pokoji bežia nekonečné animácie: " + inf.slice(0, 4).join(", "));
          return { out };
        })()`;
        const rp = await send("Runtime.evaluate", { expression: PLYN, returnByValue: true, awaitPromise: true });
        const pv = rp.result && rp.result.result && rp.result.result.value;
        if (pv && pv.skip) console.log("vysvetlivky – plynulosť: v kapitole nie je pojem – preskočené");
        else if (!pv || pv.out.length) { chyb++; console.log(`  ✖ vysvetlivky – plynulosť: ${pv ? pv.out.join("; ") : "skúška sa nedala spustiť"}`); }
        else console.log("vysvetlivky: okno sa najprv pripraví, potom animuje; v pokoji nič nebeží – ok");

        /* dotykové zariadenie (bez kurzora): reflektor nemá zmysel, polohy pojmov sa nesmú premeriavať – premeranie
           stoviek pojmov pri každom načítanom obrázku (aj vo vysvetlivke) rozbíjalo animácie (≈ 100 ms pri 4× spomalení) */
        await send("Emulation.setDeviceMetricsOverride", { width: 400, height: 860, deviceScaleFactor: 2, mobile: true });
        await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
        const hotovoT = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + kap0.replace(/\\/g, "/") });
        await Promise.race([hotovoT, sleep(15000)]);
        await sleep(1500);
        const DOT = `(async () => {
          if (matchMedia("(any-hover: hover)").matches || !window.PF_GLOSSARY_OPEN || !document.querySelector(".page .pf-term")) return { skip: 1 };
          const t = (window.PF_GLOSSARY || []).find((x) => x.img);
          if (t && window.PF_GLOSSARY_OPEN) window.PF_GLOSSARY_OPEN(t.id, document.querySelector(".page p") || document.body);
          window.dispatchEvent(new Event("resize"));
          await new Promise((r) => setTimeout(r, 1200));
          document.querySelectorAll(".pf-tip .close").forEach((b) => b.click());
          return { idx: window.PF_GLOSSARY_STAT ? window.PF_GLOSSARY_STAT.idx : -1 };
        })()`;
        const rd2 = await send("Runtime.evaluate", { expression: DOT, returnByValue: true, awaitPromise: true });
        const dv = rd2.result && rd2.result.result && rd2.result.result.value;
        await send("Emulation.setTouchEmulationEnabled", { enabled: false });
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        if (dv && dv.skip) console.log("vysvetlivky: dotykové zariadenie – preskočené (bez napodobnenia any-hover alebo bez pojmov v texte)");
        else if (!dv || dv.idx !== 0) { chyb++; console.log(`  ✖ vysvetlivky: na dotykovom zariadení sa premeriavajú polohy pojmov (${dv ? dv.idx : "?"}×) – reflektor bez kurzora len brzdí`); }
        else console.log("vysvetlivky: na dotykovom zariadení sa polohy pojmov nemerajú – ok");
      }
    }

    /* reflektor pojmov v náhľade inej kapitoly (13. 11. 2026, autor: „zvýrazňujú sa pojmy nie okolo myšky, ale pod ňou“):
       glossary.js meria polohy pojmov raz (index) a náhľad (peek.js, ?embed=1) práve vtedy spúšťa animáciu príchodu –
       .page zo zmenšenia .93 a posunu o 36 px. Index zmeraný počas nej ostal skreslený (v kap. 8 ≈ 30 px vedľa kurzora)
       a po jej konci ho nič neprepočítalo. Skúška: kapitola v náhľade, .page dostane transform, počas neho príde podnet
       na premeranie (resize), transform zmizne bez udalosti (ako koniec animácie) – pojem pod myšou musí svietiť. */
    if (lupaTreba) {
      const kapR = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort()
        .map((f) => path.join(CH, f)).find((f) => (fs.readFileSync(f, "utf8").match(/id="sec-\d+-\d+"/g) || []).length >= 4);
      if (kapR && fs.existsSync(path.join(ROOT, "assets/js/peek.js"))) {
        const sek = fs.readFileSync(kapR, "utf8").match(/id="(sec-\d+-\d+)"/g).map((x) => x.slice(4, -1));
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        await send("Emulation.setTouchEmulationEnabled", { enabled: false });
        const evR = async (x) => { const q = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); return q.result && q.result.result && q.result.result.value; };
        const hotovoR = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + kapR.replace(/\\/g, "/") + "?embed=1#" + sek[Math.floor(sek.length / 2)] });
        await Promise.race([hotovoR, sleep(15000)]);
        let pred = "", rovnako = 0;   // ustálenie: načítané, bez transformu, posun a výška sa nemenia
        for (let i = 0; i < 40 && rovnako < 3; i++) {
          await sleep(300);
          const s = await evR(`document.readyState+"|"+Math.round(scrollY)+"|"+document.documentElement.scrollHeight+"|"+getComputedStyle(document.querySelector(".page")).transform`);
          if (s === pred && /^complete.*none$/.test(s)) rovnako++; else rovnako = 0;
          pred = s;
        }
        await evR(`(async () => { const p = document.querySelector(".page"), w = (ms) => new Promise((r) => setTimeout(r, ms));
          p.style.transform = "translateY(36px) scale(.93)"; window.dispatchEvent(new Event("resize")); await w(700);
          p.style.transform = ""; await w(500); return 1; })()`);
        const n = await evR(`[...document.querySelectorAll(".page .pf-term")].filter((e) => !e.closest(".pf-tip,.aside")).filter((e) => {
          const r = e.getBoundingClientRect(); return r.top > 60 && r.bottom < 860 && r.left > 0 && r.right < 1350; })
          .map((e, i) => { e.setAttribute("data-rfl", i); return i; }).length`);
        let sviet = 0; const nesviet = [];
        for (let i = 0; i < Math.min(n, 10); i++) {
          const p = await evR(`(function(){var e=document.querySelector('[data-rfl="${i}"]');var r=e.getClientRects()[0];return{x:r.left+r.width/2,y:r.top+r.height/2,t:e.textContent}})()`);
          await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
          await sleep(100);
          if (await evR(`document.querySelector('[data-rfl="${i}"]').classList.contains("is-lit")`)) sviet++; else nesviet.push(p.t);
        }
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1 });
        if (n < 3) console.log(`reflektor v náhľade: málo pojmov na skúšku (${path.basename(kapR)})`);
        else if (sviet < Math.min(n, 10)) { chyb++; console.log(`  ✖ reflektor v náhľade (${path.basename(kapR)}): pod myšou svieti ${sviet}/${Math.min(n, 10)} pojmov (nesvieti: ${nesviet.slice(0, 4).join(", ")}) – index pojmov zmeraný počas transformu .page (glossary.js reindex/moving, peek.js arrive → pf-relayout)`); }
        else console.log(`reflektor v náhľade: ok – pod myšou svieti ${sviet}/${sviet} pojmov aj po meraní počas animácie`);
      }
    }

    // spodný pás (12. 11. 2026, pokyn autora: „všetky spodné position fixed tlačidlá daj do jednej vrstvy a aby sa
    // neprekrývali“): v čítačke hlavnej stránky musí byť ← Obsah / Tlačiť / Otvoriť, % čítania aj AI v jednom páse
    // (.pf-dock), žiadne dve sa nesmú prekrývať ani vytŕčať z pásu či okna, pás je priehľadný a rám siaha po spodok okna (17. 11.), vlastné %
    // kapitoly je skryté (ukazuje ho pás). Skúša sa na počítači aj na mobile. Predtým stáli každé zvlášť cez text.
    /* Po obnovení stránky sa už nič nehýbe (16. 11. 2026, autor: „pri znovunačítaní sa veci dejú potom, ako to načítam,
       skáče hlavný text aj bočná lišta sa prepája… po načítaní nech už to neskáče“): kapitola sa odroluje, obnoví (F5)
       a od začiatku načítania sa snímka po snímke zapisuje, čo je vidno. Od chvíle, keď je stránka odkrytá, sa nesmie
       zmeniť poloha stránky, textu, poznámok na okraji ani ich čiar a nesmie bežať vstupná animácia (peek.js – otvorenie
       uprostred je bez animácie; kto mení obsah po načítaní, drží stránku zakrytú triedou pf-wait-…). */
    if (lupaTreba) {
      const kapF = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
        .find((f) => (fs.readFileSync(f, "utf8").match(/class="box k-(klinika|pozor|zapamataj)/g) || []).length >= 4);
      if (kapF) {
        const REC = `(function(){
          var R = window.__rec = { stavy: [], go: false, vidno: null }, t0 = performance.now(), prev = "", els = null;
          function tick(){
            var t = performance.now() - t0, H = document.documentElement;
            if (H && document.body) {
              var c = H.className, skryte = getComputedStyle(document.body).visibility === "hidden" || /pf-intro|pk-restoring/.test(c);
              if (!skryte) {
                if (R.vidno == null) R.vidno = Math.round(t);
                if (!els) {
                  var ps = [].filter.call(document.querySelectorAll(".page .sec-body > p"), function (e) { var r = e.getBoundingClientRect(); return r.top > 60 && r.top < innerHeight - 60; }).slice(0, 2);
                  var ns = [].filter.call(document.querySelectorAll(".page .side-note"), function (e) { var r = e.getBoundingClientRect(); return r.bottom > 60 && r.top < innerHeight; }).slice(0, 4);
                  els = { p: ps, n: ns };
                }
                var s = "y=" + Math.round(scrollY) + " text=" + els.p.map(function (e) { return Math.round(e.getBoundingClientRect().top); }).join(",") +
                  " poznámky=" + els.n.map(function (e) { var r = e.getBoundingClientRect(); return Math.round(r.top) + "/" + Math.round(r.left); }).join(",") +
                  " čiary=" + els.n.map(function (e) { var a = e._anchor; if (!a) return "-"; var r = a.getBoundingClientRect(); return Math.round(r.top) + ">" + Math.round(r.right) + (a._v && a._v.style.display === "block" ? "L" : ""); }).join(",");
                if (s !== prev) { R.stavy.push(Math.round(t) + " ms: " + s); prev = s; }
              } else if (/pf-go/.test(c)) R.go = true;
            }
            if (t < 6000) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        })();`;
        const hotF = new Promise((r) => { nacitane = r; });
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        await send("Page.navigate", { url: "file:///" + kapF.replace(/\\/g, "/") });
        await Promise.race([hotF, sleep(15000)]);
        await sleep(2500);
        const evF = async (x) => { const q = await send("Runtime.evaluate", { expression: x, returnByValue: true }); return q.result && q.result.result && q.result.result.value; };
        await evF(`window.scrollTo({ top: document.documentElement.scrollHeight * 0.4, behavior: "instant" }); 1`);
        await sleep(900);
        const sk = await send("Page.addScriptToEvaluateOnNewDocument", { source: REC });
        await send("Page.reload", {});
        await sleep(6500);
        const r = await evF("window.__rec ? JSON.parse(JSON.stringify(window.__rec)) : null");
        if (sk && sk.result && sk.result.identifier) await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: sk.result.identifier });
        const zleF = [];
        if (!r || r.vidno == null) zleF.push("stránka sa po obnovení neodkryla (alebo sa záznam nespustil)");
        else {
          if (r.go) zleF.push("po obnovení uprostred kapitoly beží vstupná animácia (má sa ukázať naraz)");
          if (r.stavy.length > 1) zleF.push("po odkrytí stránky sa ešte hýbe poloha, text alebo okraj (" + r.stavy.length + " stavov):" + r.stavy.slice(0, 5).map((x) => "\n        " + x).join(""));
        }
        if (zleF.length) { chyb++; console.log(`  ✖ obnovenie stránky (${path.basename(kapF)})\n      ` + zleF.join("\n      ")); }
        else console.log("obnovenie stránky: ok – odkrytá po " + r.vidno + " ms, potom sa už nič nepohlo (bez animácie)");
        /* Rýchlosť načítania (16. 11. 2026, autor: „skús skrátiť čas načítania“). Namerané brzdy a ich poistky – bez merania
           času, aby skúška nezávisela od stroja: (1) vzory glosára nesmú obsahovať triedu \p{L}\p{N} – prehliadač ju pri každom
           z ≈ 3 000 vzorov zostavoval nanovo (≈ 1 s na kapitolu; pf-match.js ju nahrádza vypočítanými rozsahmi);
           (2) písmo sa načítava vopred (preload) – hlavička kapitoly naň čaká; (3) po vyrovnaní stĺpcov neostala výplň. */
        const rych = await evF(`(function(){
          var z = [];
          if (window.PF_MATCH) {
            var it = window.PF_MATCH.build([{ id: "x", title: "x", match: ["n\\u00e1dor\\\\w*"] }]).items[0];
            if (!it || !it.sticky) z.push("pf-match.js: vzor nemá rýchly tvar");
            else if (/\\\\p\\{/.test(it.sticky.source)) z.push("pf-match.js: vzory obsahujú triedu \\\\p{L}\\\\p{N} (pomalé zostavenie – ≈ 1 s na kapitolu)");
            else if (!it.sticky.test("n\\u00e1dorov\\u00fdch") ) z.push("pf-match.js: rýchly vzor nenašiel skloňované slovo");
          }
          if (!document.querySelector('link[rel="preload"][as="font"]')) z.push("písmo sa nenačítava vopred (chýba <link rel=preload as=font> v hlavičke – build.js)");
          if (document.querySelector(".pf-bal-ph")) z.push("po vyrovnaní stĺpcov ostala na stránke výplň .pf-bal-ph");
          return z.join("; ");
        })()`);
        if (rych) { chyb++; console.log(`  ✖ rýchlosť načítania (${path.basename(kapF)})\n      ` + rych); }
        else console.log("rýchlosť načítania: ok – rýchle vzory glosára, písmo vopred, stĺpce bez výplne");
      }
    }
    if (dockTreba && fs.existsSync(path.join(ROOT, "index.html"))) {
      const kap1 = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort()[0];
      if (kap1) {
        const DOCK = `(() => {
          const d = document.querySelector(".pf-dock"), fr = document.querySelector(".reader iframe");
          if (!d || !fr) return { chyby: ["chýba spodný pás (.pf-dock) alebo rám čítačky"] };
          const ch = [], D = d.getBoundingClientRect(), vw = document.documentElement.clientWidth;
          const el = [...d.querySelectorAll(".pf-dock-l .reader-ctl > *, .pf-dock-l > :not(.reader-ctl), .pf-dock-c #pe-dock > *, .pf-dock-c > :not(#pe-dock), .pf-dock-r > *")]
            .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden"; });
          const meno = (e) => (e.id || e.className || e.tagName) + " „" + e.textContent.trim().slice(0, 14) + "“";
          for (const e of el) {
            const r = e.getBoundingClientRect();
            if (r.top < D.top - 0.5 || r.bottom > D.bottom + 0.5 || r.left < -0.5 || r.right > vw + 0.5) ch.push(meno(e) + " vytŕča z pásu alebo z okna");
          }
          for (let i = 0; i < el.length; i++) for (let j = i + 1; j < el.length; j++) {
            const a = el[i].getBoundingClientRect(), b = el[j].getBoundingClientRect();
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5)
              ch.push(meno(el[i]) + " × " + meno(el[j]) + " sa prekrývajú");
          }
          for (const sel of ["#readerBack", ".pfai-pill"]) if (!el.some((e) => e.matches(sel))) ch.push(sel + " nie je v páse");
          /* 17. 11. 2026 (autor: „spodná lišta nech nie je súčasť layeru… pozadie nemá“): pás je priehľadný a rám siaha po spodok okna */
          const ds = getComputedStyle(d), fb = fr.getBoundingClientRect().bottom;
          if (ds.backgroundColor !== "rgba(0, 0, 0, 0)" || ds.backgroundImage !== "none" || parseFloat(ds.borderTopWidth) > 0 || (ds.backdropFilter && ds.backdropFilter !== "none"))
            ch.push("pás má pozadie, čiaru alebo rozostrenie (má byť priehľadný)");
          if (ds.pointerEvents !== "none") ch.push("pás zachytáva klik aj v medzerách medzi tlačidlami");
          if (fb < innerHeight - 0.5) ch.push("rám kapitoly končí " + Math.round(innerHeight - fb) + " px nad spodkom okna (pás nemá zaberať miesto)");
          const bp = doc => doc && parseFloat(getComputedStyle(doc.body).paddingBottom);
          if (fr.contentDocument && !(bp(fr.contentDocument) >= D.height - 0.5)) ch.push("kapitola v ráme nemá rezervu na dorolovanie nad tlačidlá");
          const doc = fr.contentDocument, own = doc && doc.querySelector(".reading-pct"), m = d.querySelector(".reading-pct[data-mirror]");
          if (own && getComputedStyle(own).display !== "none") ch.push("% kapitoly ostalo v ráme (nie v páse)");
          if (!m || !/^\\d+ %$/.test(m.textContent.trim())) ch.push("% čítania v páse chýba");
          if (window.__peSkus) {   // editor vložený do rámu: jeho dok musí byť v strede pásu hlavného okna
            const pe = d.querySelector(".pf-dock-c #pe-dock");
            if (!pe) ch.push("dok editora z rámu nie je v strede pásu hlavného okna (.pf-dock-c)");
            else if (pe.style.display !== "none") { const r = pe.getBoundingClientRect(); if (Math.abs((r.left + r.right) / 2 - (D.left + D.right) / 2) > 2) ch.push("dok editora nie je vodorovne v strede pásu"); }
            if (doc && doc.getElementById("pe-dock")) ch.push("dok editora ostal aj v ráme");
            // text stavu má pozadie ako ostatné tlačidlá; zoznam úprav (☰) sa otvorí tesne nad tlačidlom (17. 11. 2026)
            const st = pe && pe.querySelector(".st");
            if (st && st.getClientRects().length && getComputedStyle(st).backgroundColor === "rgba(0, 0, 0, 0)") ch.push("text stavu editora v páse nemá pozadie");
            const lb = pe && [...pe.querySelectorAll("button")].find((b) => /^☰/.test(b.textContent.trim()));
            if (lb) {
              lb.click();
              const L = doc && doc.getElementById("pe-list");
              if (!L) ch.push("zoznam úprav (☰) sa neotvoril");
              else {
                const F = fr.getBoundingClientRect(), lr = L.getBoundingClientRect(), br = lb.getBoundingClientRect();
                const medz = br.top - (lr.bottom + F.top), cx = lr.left + F.left + lr.width / 2;
                if (medz < 0 || medz > 12) ch.push("zoznam úprav nezačína tesne nad tlačidlom ☰ (medzera " + Math.round(medz) + " px)");
                if (lr.left + F.left > br.right || lr.right + F.left < br.left) ch.push("zoznam úprav nie je nad tlačidlom ☰");
                lb.click();
              }
            }
          }
          return { chyby: ch, n: el.length };
        })()`;
        for (const [w, h, mob] of [[1400, 900, false], [400, 800, true]]) {
          await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: mob });
          await send("Page.navigate", { url: "about:blank" }); await sleep(200);   // nanovo – editor z predošlej šírky preč
          await send("Page.navigate", { url: "file:///" + path.join(ROOT, "index.html").replace(/\\/g, "/") + "#" + kap1.replace(/\.html$/, "") });
          await sleep(4500);
          if (fs.existsSync(EDITOR_JS) && w >= 1400) {   // dok editora z rámu → stred pásu hlavného okna (17. 11. 2026)
            await send("Runtime.evaluate", { awaitPromise: true, expression: `(async () => { const f = document.querySelector(".reader iframe"), fw = f && f.contentWindow; if (!fw) return;
              try { Object.keys(fw.localStorage).filter((k) => /^pe-upravy:/.test(k)).forEach((k) => fw.localStorage.removeItem(k)); } catch (e) {}
              fw.fetch = () => Promise.reject(new Error("skúška – bez servera"));
              await new Promise((res) => { const s = fw.document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; fw.document.head.appendChild(s); });
              await new Promise((r) => setTimeout(r, 400));
              fw.dispatchEvent(new fw.KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
              await new Promise((r) => setTimeout(r, 400)); window.__peSkus = 1; })()` });
          }
          const rz = await send("Runtime.evaluate", { expression: DOCK, returnByValue: true });
          const z = (rz.result && rz.result.result && rz.result.result.value) || { chyby: ["čítačka sa nedala skúsiť"] };
          if (z.chyby.length) { chyb += z.chyby.length; for (const c of z.chyby) console.log(`  ✖ spodný pás (${w} px): ${c} (site.css/site.js → .pf-dock)`); }
          else console.log(`spodný pás (${w} px): ok – ${z.n} tlačidiel v jednom rade, bez prekryvu, pás priehľadný, rám po spodok okna`);
        }
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
      }
    }

    /* Tlač na iPade a iPhone (26. 11. 2026, autor: „na iPade aj iPhone nejde sťahovať PDF, nič nespraví, alebo to zle rozhodí“):
       Safari na iOS kapitolu v ráme hlavnej stránky nevytlačí – print() v ráme vytlačí hlavnú stránku (pokyn „Takto sa kapitola
       nevytlačí“) alebo sa bez priameho ťuknutia nespustí. Skúška s identitou iPadu: Tlačiť / PDF v čítačke musí otvoriť kapitolu
       samostatne s lištou tlače, ťuknutie na „Tlačiť / uložiť PDF“ musí zavolať print() priamo (odpovede na otázky otvorené, názov
       „Kapitola N – …“), lišta sa netlačí a ← Späť vráti čítačku. Na počítači ostáva tlač z rámu (hlavná stránka sa nemení). */
    if ((dockTreba || lupaTreba) && fs.existsSync(path.join(ROOT, "index.html"))) {
      const kapT = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort()
        .find((f) => /<ol class="quiz"/.test(fs.readFileSync(path.join(CH, f), "utf8")));
      if (kapT) {
        const slugT = kapT.replace(/\.html$/, ""), hubU = "file:///" + path.join(ROOT, "index.html").replace(/\\/g, "/") + "#" + slugT;
        const evT = async (x) => { const q = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); return q.result && q.result.result && q.result.result.value; };
        const STUB = `window.__tlac = []; window.print = function(){ window.__tlac.push({ quiz: [].every.call(document.querySelectorAll("ol.quiz details"), function(d){ return d.open; }), title: document.title }); };`;
        const sk = await send("Page.addScriptToEvaluateOnNewDocument", { source: STUB });
        const uaPov = ((await send("Browser.getVersion")).result || {}).userAgent || "";
        const zleT = [];
        try {
          await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1", platform: "iPad" });
          await send("Emulation.setDeviceMetricsOverride", { width: 820, height: 1180, deviceScaleFactor: 1, mobile: true });
          await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
          await send("Page.navigate", { url: "about:blank" }); await sleep(200);
          await send("Page.navigate", { url: hubU }); await sleep(4000);
          await evT(`document.getElementById("readerPrint").click(); 1`);
          await sleep(3500);
          const s1 = await evT(`(function(){ var b = document.querySelector(".pf-tlac"), f = document.querySelector(".reader iframe");
            return { top: location.pathname.split("/").pop(), q: location.search, panel: !!(b && b.getClientRects().length),
              ram: f && f.contentWindow && f.contentWindow.__tlac ? f.contentWindow.__tlac.length : 0 }; })()`);
          if (!s1 || s1.top !== kapT) zleT.push("Tlačiť / PDF neotvorilo kapitolu samostatne (hlavná stránka: " + (s1 && s1.top) + (s1 && s1.ram ? ", print() v ráme" : "") + ") – Safari na iOS rám nevytlačí (hub.template.html → printChapter)");
          else {
            if (!s1.panel) zleT.push("samostatná kapitola s ?tlac=1 neukázala lištu tlače (.pf-tlac, tools/build.js)");
            if (/tlac=/.test(s1.q)) zleT.push("?tlac=1 ostalo v adrese (F5 by lištu ukázal znova)");
            let pr = null;
            for (let i = 0; i < 50 && !pr; i++) { pr = await evT(`(function(){ var g = document.querySelector(".pf-tlac-go"); if (!g || g.disabled) return null; var r = g.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`); if (!pr) await sleep(200); }
            if (!pr) zleT.push("tlačidlo „Tlačiť / uložiť PDF“ sa nesprístupnilo (obrázky sa nenačítali do 10 s?)");
            else {
              await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: pr.x, y: pr.y }] });
              await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
              await sleep(400);
              const t = await evT(`window.__tlac`);
              if (!t || t.length !== 1) zleT.push("ťuknutie na „Tlačiť / uložiť PDF“ nezavolalo print() (" + (t ? t.length : "–") + "×)");
              else {
                if (!t[0].quiz) zleT.push("pri tlači nie sú otvorené odpovede na otázky");
                if (!/^Kapitola /.test(t[0].title)) zleT.push("názov pri tlači (PDF) nie je „Kapitola N – …“: " + t[0].title);
              }
            }
            await send("Emulation.setEmulatedMedia", { media: "print" }); await sleep(150);
            const pm = await evT(`(function(){ var b = document.querySelector(".pf-tlac"), p = document.querySelector(".page"); return { lista: !!(b && b.getClientRects().length), text: !!(p && p.getClientRects().length) }; })()`);
            await send("Emulation.setEmulatedMedia", { media: "" });
            if (pm && pm.lista) zleT.push("lišta tlače sa tlačí (chapter-extra.css → @media print .pf-tlac)");
            if (pm && !pm.text) zleT.push("v tlači chýba text kapitoly");
            await evT(`document.querySelector(".pf-tlac-x").click(); 1`);
            await sleep(3000);
            const s2 = await evT(`location.pathname.split("/").pop() + location.hash`);
            if (s2 !== "index.html#" + slugT) zleT.push("← Späť nevrátilo čítačku (" + s2 + ")");
          }
          // počítač: tlač z rámu ako doteraz, hlavná stránka sa nemení
          await send("Emulation.setUserAgentOverride", { userAgent: uaPov });
          await send("Emulation.setTouchEmulationEnabled", { enabled: false });
          await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
          await send("Page.navigate", { url: "about:blank" }); await sleep(200);
          await send("Page.navigate", { url: hubU }); await sleep(4000);
          await evT(`document.getElementById("readerPrint").click(); 1`);
          await sleep(5000);
          const s3 = await evT(`(function(){ var f = document.querySelector(".reader iframe"); return { top: location.pathname.split("/").pop(), ram: f && f.contentWindow && f.contentWindow.__tlac ? f.contentWindow.__tlac.length : 0 }; })()`);
          if (!s3 || s3.top !== "index.html" || s3.ram !== 1) zleT.push("na počítači Tlačiť / PDF netlačí kapitolu z rámu (hlavná stránka: " + (s3 && s3.top) + ", print() v ráme " + (s3 && s3.ram) + "×)");
        } finally {
          if (sk && sk.result && sk.result.identifier) await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: sk.result.identifier });
          await send("Emulation.setUserAgentOverride", { userAgent: uaPov });
          await send("Emulation.setTouchEmulationEnabled", { enabled: false });
          await send("Emulation.setEmulatedMedia", { media: "" });
          await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        }
        if (zleT.length) { chyb += zleT.length; for (const c of zleT) console.log("  ✖ tlač na iPade: " + c); }
        else console.log("tlač na iPade: ok – kapitola sa otvorí samostatne, ťuknutie spustí tlač, lišta sa netlačí; na počítači tlač z rámu");
      }
    }

    // lupa obrázkov: koliesko musí približovať (pozri LUPA_KROKY)
    let lupaVysl = "";
    if (lupaTreba) {
      const kap = (stranky.find((f) => /chapters/.test(f) && /<figure[^>]*>\s*<img/.test(fs.readFileSync(f, "utf8")))) ||
        fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
          .find((f) => /<figure[^>]*>\s*<img/.test(fs.readFileSync(f, "utf8")));
      if (!kap) lupaVysl = "lupa: žiadna kapitola s obrázkom";
      else {
        await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
        await send("Emulation.setTouchEmulationEnabled", { enabled: false });
        const hotovo = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + kap.replace(/\\/g, "/") });
        await Promise.race([hotovo, sleep(15000)]);
        await sleep(1500);
        const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true }); return r.result && r.result.result && r.result.result.value; };
        const stred = (sel) => ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;e.scrollIntoView({block:"center",behavior:"instant"});var r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
        const mierka = () => ev(`(function(){var f=document.querySelector(".pf-lb-figure");var e=f&&f.firstElementChild;if(!e)return null;var m=/scale\\(([\\d.]+)\\)/.exec(e.style.transform);return m?+m[1]:1})()`);
        // obrázok hlboko v kapitole: po posune sa ešte načítavajú obrázky nad ním a site.js prepočíta okraj –
        // súradnice sa merajú až po ustálení, inak klik trafí miesto, z ktorého obrázok medzitým odišiel (9. 11. 2026, kap. 13)
        let p = await stred("figure > img");
        for (let i = 0; p && i < 6; i++) {
          await sleep(400);
          const q = await stred("figure > img");
          if (q && Math.abs(q.x - p.x) < 1 && Math.abs(q.y - p.y) < 1) break;
          p = q;
        }
        if (!p) lupaVysl = "lupa: obrázok sa nenašiel";
        else {
          await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
          await send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 });
          await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 });
          await sleep(1000);
          if ((await mierka()) === null) { chyb++; console.log(`  ✖ lupa: klik na obrázok neotvoril lupu (${path.basename(kap)})`); }
          else {
            const q = await stred(".pf-lb-figure > *");
            const zle = [];
            for (const k of LUPA_KROKY) {
              for (const d of k.d) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: q.x, y: q.y, deltaX: 0, deltaY: d }); await sleep(30); }
              await sleep(700);
              const s = await mierka();
              if (!(s > 1.05)) zle.push(`${k.nazov}: koliesko nepriblížilo obrázok (mierka ${s})`);
              // späť na mierku 1: krok myši von, nová dávka po pauze
              await sleep(300);
              for (let i = 0; i < 4; i++) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: q.x, y: q.y, deltaX: 0, deltaY: 150 }); await sleep(260); }
              await sleep(700);
            }
            /* 9. 11. 2026: priblížený obrázok sa kolieskom NEposúva – jemný krok (touchpad,
               koliesko s vysokým rozlíšením) ho ďalej približuje; posúvajú ho šípky a ťahanie. */
            const posun = () => ev(`(function(){var f=document.querySelector(".pf-lb-figure");var e=f&&f.firstElementChild;if(!e)return null;var m=/translate\\(([-\\d.]+)px/.exec(e.style.transform);return m?+m[1]:0})()`);
            for (let i = 0; i < 3; i++) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: q.x, y: q.y, deltaX: 0, deltaY: -100 }); await sleep(260); }
            await sleep(600);
            const s1 = await mierka();
            for (let i = 0; i < 4; i++) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: q.x, y: q.y, deltaX: 0, deltaY: -8 }); await sleep(30); }
            await sleep(300);
            const s2 = await mierka();
            if (!(s2 > s1 + 0.01)) zle.push(`priblížený obrázok: jemný krok kolieska nepribližuje (mierka ${s1} → ${s2}) – posúva namiesto priblíženia`);
            /* 10. 11. 2026 (autor: „scroll zoom je sekavý“): jeden krok kolieska – zub myši aj jemný
               krok touchpadu – nesmie mierku zmeniť naraz; obrázok k nej má dobiehať cez niekoľko snímok.
               Zaznamená mierku v každej snímke (requestAnimationFrame) a spočíta medzihodnoty. */
            const zaznam = `(function(){var f=document.querySelector(".pf-lb-figure");window.__lbZ=[];var t0=performance.now();
              (function k(){var e=f&&f.firstElementChild;var m=e&&/scale\\(([\\d.]+)\\)/.exec(e.style.transform);window.__lbZ.push(m?+m[1]:1);
              if(performance.now()-t0<450)requestAnimationFrame(k)})();return true})()`;
            /* 12. 11. 2026: jemný krok dobieha 45 ms ≈ 3 snímky; headless Chrome občas vynechá snímku (2 medzihodnoty
               namiesto 3 pri tej istej verzii – kap. 12 PATOLY zlyhala 3× zo 4 behov). Meranie sa preto pred hlásením chyby
               zopakuje (najviac 3 pokusy); skutočný skok (stará verzia: 0–1 medzihodnota) zlyhá vo všetkých. */
            for (const [nazov, d] of [["zub kolieska myši", 100], ["jemný krok touchpadu", 12]]) {
              let chyba = null;
              for (let pokus = 0; pokus < 3; pokus++) {
                const z0 = await mierka();
                await ev(zaznam);
                await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: q.x, y: q.y, deltaX: 0, deltaY: d });
                await sleep(600);
                const rad = (await ev("window.__lbZ")) || [];
                const z1 = await mierka();
                const medzi = new Set(rad.filter((v) => v < z0 - 1e-4 && v > z1 + 1e-4).map((v) => v.toFixed(4))).size;
                if (!(z1 < z0 - 0.01)) chyba = `plynulosť: ${nazov} von nezmenil mierku (${z0} → ${z1})`;
                else if (medzi < 3) chyba = `plynulosť: ${nazov} zmenil mierku skokom (${z0} → ${z1}, medzihodnôt ${medzi}, treba ≥ 3; ${pokus + 1}. pokus) – priblíženie má dobiehať plynulo`;
                else { chyba = null; break; }
                if (!(z1 > 1.3)) break;   // mierka sa minula – ďalší krok von by už nebolo kam merať
              }
              if (chyba) zle.push(chyba);
            }
            const x1 = await posun();
            await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
            await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
            await sleep(400);
            const x2 = await posun();
            if (x1 === x2) zle.push(`šípka neposunula priblížený obrázok (x ${x1} → ${x2})`);
            const skryty = await ev(`document.documentElement.classList.contains("pf-lb-open")`);
            if (!skryty) zle.push("pri otvorenej lupe nie je skrytý posuvník stránky (html.pf-lb-open)");
            await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
            await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
            await sleep(600);
            /* Schéma (SVG súbor ako <img> – tak ju ukazuje vysvetlivka) v lupe vyplní plochu,
               nie je malá ako fotka s limitom 1,5×. Do stránky sa vloží skúšobný obrázok – hneď za prvý obrázok kapitoly,
               nie na koniec: na spodku dlhej stránky ho nejde posunúť do stredu okna a klik zlyhával (9. 11. 2026, kap. 13). */
            const figDir = path.join(CH, "fig");
            const svgSub = fs.existsSync(figDir) ? fs.readdirSync(figDir).filter((f) => /\.svg$/.test(f)).sort()[0] : null;
            const svgKap = svgSub ? "fig/" + svgSub : null;
            if (svgKap) {
              await ev(`(function(){var f=document.createElement("figure");f.id="lupa-test-svg";f.style.cssText="width:200px";var i=document.createElement("img");i.src=${JSON.stringify(svgKap)};i.style.width="200px";f.appendChild(i);var z=document.querySelector("main figure");if(z)z.after(f);else(document.querySelector(".page")||document.body).appendChild(f);return 1})()`);
              await sleep(800);
              let ps = await stred('#lupa-test-svg > img');
              for (let i = 0; ps && i < 6; i++) {   // ustálenie rozloženia ako pri obrázku vyššie
                await sleep(400);
                const q = await stred('#lupa-test-svg > img');
                if (q && Math.abs(q.x - ps.x) < 1 && Math.abs(q.y - ps.y) < 1) break;
                ps = q;
              }
              if (ps) {
                // klik priamo na prvok: skúšobný obrázok môže na niektorej stránke prekryť poznámka na okraji
                await ev(`(function(){var i=document.querySelector("#lupa-test-svg > img");i.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,clientX:${ps.x},clientY:${ps.y}}));return 1})()`);
                await sleep(1000);
                const pomer = await ev(`(function(){var f=document.querySelector(".pf-lb-figure");var e=f&&f.firstElementChild;if(!e)return null;var r=f.getBoundingClientRect();return Math.max(e.offsetWidth/r.width,e.offsetHeight/r.height)})()`);
                if (pomer === null) zle.push(`schéma: klik neotvoril lupu (${path.basename(svgKap)})`);
                else if (pomer < 0.9) zle.push(`schéma v lupe je malá – zaberá ${Math.round(pomer * 100)} % plochy (${path.basename(svgKap)})`);
              }
            }
            if (zle.length) { chyb++; console.log(`  ✖ lupa (${path.basename(kap)})\n      ` + zle.join("\n      ")); }
            else lupaVysl = `lupa: koliesko približuje (${LUPA_KROKY.length} druhy krokov aj priblížený obrázok) a plynulo, šípky posúvajú, schéma vyplní plochu`;
          }
        }
      }
    }
    if (lupaVysl) console.log(lupaVysl);

    // AI okno (pozri aiTreba)
    const kapAI = fs.existsSync(CH) && fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort()[0];
    if (aiTreba && kapAI && fs.existsSync(path.join(ROOT, "assets/js/ai-chat.js"))) {
      await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
      await send("Emulation.setTouchEmulationEnabled", { enabled: false });
      const hotovo = new Promise((r) => { nacitane = r; });
      await send("Page.navigate", { url: "file:///" + path.join(CH, kapAI).replace(/\\/g, "/") });
      await Promise.race([hotovo, sleep(15000)]);
      await sleep(800);
      const AI = `(async () => {
        const w = (ms) => new Promise((r) => setTimeout(r, ms));
        if (typeof window.PF_loadAI !== "function") return { skip: "PF_loadAI chýba" };
        let ss = {}; try { ss = JSON.parse(localStorage.getItem("pf-ai-settings") || "{}"); } catch (e) {}
        localStorage.setItem("pf-ai-settings", JSON.stringify({ provider: "custom", keys: { custom: "x" }, models: { custom: "model-b" }, customUrl: "http://skuska.invalid/v1" }));
        const f0 = window.fetch;
        window.fetch = function (u) {
          if (/\\/models/.test(u)) return Promise.resolve(new Response(JSON.stringify({ data: [{ id: "model-a" }, { id: "model-b" }, { id: "model-c" }] }), { status: 200, headers: { "content-type": "application/json" } }));
          const enc = new TextEncoder(); let i = 0;
          const rs = new ReadableStream({ pull: (c) => new Promise((r) => setTimeout(() => {
            if (i++ > 80) { c.enqueue(enc.encode("data: [DONE]\\n\\n")); c.close(); }
            else c.enqueue(enc.encode("data: " + JSON.stringify({ choices: [{ delta: { content: "Veta " + i + " skúšobnej odpovede, dosť dlhá na rolovanie okna.\\n\\n" } }] }) + "\\n\\n"));
            r(); }, 10)) });
          return Promise.resolve(new Response(rs, { status: 200, headers: { "content-type": "text/event-stream" } }));
        };
        const zle = [];
        try {
          const ai = await window.PF_loadAI();
          ai.close && ai.close();
          ai.ask({ text: "Skúšobný úryvok. ".repeat(20), where: "skúška" });
          await w(150);
          const b = document.querySelector(".pfai-body");
          if (!b) return { skip: "okno sa neotvorilo" };
          if (getComputedStyle(b).scrollBehavior === "smooth") zle.push("okno roluje animovane (scroll-behavior: smooth)");
          const zac = () => { const a = b.lastElementChild; return Math.round(a.getBoundingClientRect().top - b.getBoundingClientRect().top); };
          await w(500);
          const z1 = zac();
          await w(1300);
          const z2 = zac();
          if (z1 < -2 || z2 < -2) zle.push("počas písania odpovede okno odrolovalo za jej začiatok (začiatok " + Math.min(z1, z2) + " px nad oknom)");
          if (b.scrollHeight <= b.clientHeight + 50) zle.push("skúšobná odpoveď je príliš krátka na skúšku rolovania");
          ai.close(); ai.open(); await w(80);
          const zost = b.scrollHeight - b.clientHeight - b.scrollTop;
          if (zost > 4) zle.push("po otvorení okna nie je koniec konverzácie na obrazovke (chýba " + Math.round(zost) + " px)");
          const hb = [].map.call(document.querySelectorAll(".pfai-head button"), (x) => x.title);
          if (hb.filter((t) => /zbali|zavrie/i.test(t)).length > 1) zle.push("v hlavičke sú dve tlačidlá na zbalenie/zavretie: " + hb.join(" | "));
          ai.settings(); await w(80);
          if (document.querySelector("#pfai-model[list], datalist#pfai-models")) zle.push("model sa vyberá cez <datalist> (ukáže len položky zhodné s vyplneným modelom)");
          const dr = document.querySelector(".pfai-mdrop");
          if (!dr) zle.push("chýba tlačidlo zoznamu modelov (.pfai-mdrop)");
          else {
            dr.click(); await w(300);
            const n = document.querySelectorAll(".pfai-mopt").length;
            if (n !== 3) zle.push("zoznam modelov ukazuje " + n + " z 3 položiek");
          }
          ai.close();
        } finally {
          window.fetch = f0;
          localStorage.setItem("pf-ai-settings", JSON.stringify(ss));
          try { const mb = document.querySelector('meta[name="pf-book"]'); localStorage.removeItem("pf-ai-chat:" + ((mb && mb.content) || "kniha")); } catch (e) {}
        }
        return { zle };
      })()`;
      const ra = await send("Runtime.evaluate", { expression: AI, returnByValue: true, awaitPromise: true });
      const va = ra.result && ra.result.result && ra.result.result.value;
      if (!va) { chyb++; console.log("  ✖ AI okno: skúška zlyhala " + JSON.stringify((ra.result && ra.result.exceptionDetails && ra.result.exceptionDetails.exception && ra.result.exceptionDetails.exception.description) || "").slice(0, 300)); }
      else if (va.skip) console.log("AI okno: skúška sa nedala spustiť (" + va.skip + ")");
      else if (va.zle.length) { chyb++; console.log("  ✖ AI okno (ai-chat.js)\n      " + va.zle.join("\n      ")); }
      else console.log("AI okno: otvorí sa na konci konverzácie bez animácie, odpoveď neodroluje za svoj začiatok, zoznam modelov úplný, jedno tlačidlo na zavretie");
    }
    // editor kapitoly (pozri editorTreba)
    const kapE = editorTreba && fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
      .find((f) => /<figure class="fig[^"]*"[^>]*>\s*<img/.test(fs.readFileSync(f, "utf8")));
    if (editorTreba && !kapE && EP !== 2) console.log("editor: žiadna kapitola s obrázkom – skúška sa nedala spustiť");
    if (kapE) {
      await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
      await send("Emulation.setTouchEmulationEnabled", { enabled: false });
      const hotovo = new Promise((r) => { nacitane = r; });
      await send("Page.navigate", { url: "file:///" + kapE.replace(/\\/g, "/") });
      await Promise.race([hotovo, sleep(15000)]);
      await sleep(1500);
      const ev = async (x, aw) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: !!aw }); return r.result && r.result.result && r.result.result.value; };
      const mys = (x, y) => send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
      const klik = async (x, y) => { await mys(x, y); await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 }); };
      const lista = () => ev(`(function(){var t=document.getElementById("pe-tb");if(!t||t.style.display==="none")return null;var k=t.querySelector(".k"),r=t.getBoundingClientRect();return{k:k&&k.textContent,l:r.left,t:r.top,b:r.bottom,r:r.right}})()`);
      const zle = [];
      if (EP !== 2) {   // prvá polovica skúšky editora (pozri EP)
      const ok = await ev(`(async () => {
        try { Object.keys(localStorage).filter((k) => /^pe-upravy:/.test(k)).forEach((k) => localStorage.removeItem(k)); localStorage.setItem("pe-view", "1"); } catch (e) {}
        window.fetch = () => Promise.reject(new Error("skúška – bez servera"));   // nič sa nesmie zapísať do admin/upravy.json
        await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
        await new Promise((r) => setTimeout(r, 400));
        if (!window.__pfEditor) return "editor sa nenačítal";
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
        await new Promise((r) => setTimeout(r, 300));
        return document.body.classList.contains("pe-edit") ? "" : "Ctrl+E nezapol editor";
      })()`, true);
      // pôvodný obrázok (nie dvojica, nie schéma) v strede okna
      const fig = () => ev(`(function(){var f=[].find.call(document.querySelectorAll(".page figure.fig"),function(e){return e._peKey&&e.querySelector("img")&&!e.closest(".fig-row")&&e.getBoundingClientRect().height>60});
        if(!f)return null;f.scrollIntoView({block:"center",behavior:"instant"});var r=f.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,inCols:!!f.closest(".pe-cols")}})()`);
      const ustal = async () => { let p = await fig(); for (let i = 0; p && i < 8; i++) { await sleep(300); const q = await fig(); if (q && Math.abs(q.t - p.t) < 1 && Math.abs(q.l - p.l) < 1) return q; p = q; } return p; };
      /* 17. 11. 2026 (autor: lišta editora „Upravovať · Úpravy: skryté · ☰ · ?“ nech nejde do tlače): v tlačovom režime
         nesmie byť viditeľné nič z ovládania editora – dok, lišta bloku, ponuka, okná, tlačidlá stĺpcov, poznámky pre Clauda. */
      if (!ok) {
        const UI = "#pe-dock,#pe-tb,#pe-fb,#pe-menu,#pe-dlg,#pe-list,.pe-ui,.pe-note,.pe-tip,.pe-flash";
        const vid = `(function(){return [].filter.call(document.querySelectorAll(${JSON.stringify(UI)}),function(e){var s=getComputedStyle(e);return e.getClientRects().length&&s.visibility!=="hidden"&&s.display!=="none"}).map(function(e){return e.id?"#"+e.id:"."+[].join.call(e.classList,".")})})()`;
        const naObr = await ev(vid);
        if (!naObr || naObr.indexOf("#pe-dock") < 0) zle.push("tlač: dok editora sa na obrazovke nenašiel – skúška tlače sa nedala urobiť");
        /* 17. 11. 2026 (autor: dok editora „na úrovni ostatných blokov… štruktúrovo aj vizuálne zapasuj do tej lišty, horizontálne
           vycentruj“): dok je v strednom slote pásu (.pf-dock-c), vodorovne v strede, tlačidlá rovnako vysoké ako AI (pilulka) a nič
           v páse sa neprekrýva. Kapitolu v ráme čítačky skúša časť „spodný pás“ (editor sa tam vloží do rámu). */
        const pol = await ev(`(function(){var d=document.getElementById("pe-dock");if(!d)return "dok editora chýba";var z=[];
          if(!d.closest(".pf-dock-c"))return "nie je v strede spodného pásu (.pf-dock-c), ale "+(d.parentNode&&(d.parentNode.className||d.parentNode.tagName));
          var r=d.getBoundingClientRect(),P=d.closest(".pf-dock").getBoundingClientRect(),c=(r.top+r.bottom)/2;
          if(Math.abs((r.left+r.right)/2-(P.left+P.right)/2)>2)z.push("nie je vodorovne v strede ("+Math.round(r.left)+"–"+Math.round(r.right)+" px)");
          if(Math.abs(c-(P.top+P.bottom)/2)>2)z.push("nie je zvisle v strede pásu");
          var ai=document.querySelector(".pf-dock .pfai-pill"),b=d.querySelector("button");
          if(ai&&b&&Math.abs(ai.getBoundingClientRect().height-b.getBoundingClientRect().height)>1)z.push("tlačidlá nemajú výšku ako AI ("+Math.round(b.getBoundingClientRect().height)+" × "+Math.round(ai.getBoundingClientRect().height)+" px)");
          if(b&&parseFloat(getComputedStyle(b).borderTopLeftRadius)<10)z.push("tlačidlá nie sú pilulky ako ostatné v páse");
          return z.join("; ")})()`);
        if (pol) zle.push("dok editora: " + pol);
        else {
          await send("Emulation.setEmulatedMedia", { media: "print" }); await sleep(150);
          const vTlaci = await ev(vid);
          await send("Emulation.setEmulatedMedia", { media: "" }); await sleep(150);
          if (vTlaci && vTlaci.length) zle.push("tlač: ovládanie editora ide do tlače (" + [...new Set(vTlaci)].slice(0, 6).join(", ") + ")");
        }
      }
      if (ok) zle.push(ok);
      else {
        let f = await ustal();
        if (!f) zle.push("na stránke sa nenašiel samostatný obrázok");
        else {
          await mys((f.l + f.r) / 2, (f.t + f.b) / 2); await sleep(150);
          const v = await ev(`(function(){var b=[].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /vedľa/i.test(x.title)});if(!b)return null;var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
          if (!v) zle.push("lišta obrázka nemá tlačidlo ⇆ Vedľa");
          else {
            await klik(v.x, v.y); await sleep(300);
            await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))`); await sleep(200);
            f = await ustal();
            if (!f || !f.inCols) zle.push("⇆ Vedľa nedal obrázok do stĺpca");
            else {
              // z obrázka rovno hore na jeho lištu – po 2 px, ako pomalý pohyb myšou; lišta musí ostať „Obrázok“
              const most = async (f, kde) => {
                const x0 = Math.min(f.l + 30, (f.l + f.r) / 2);
                await mys(x0, f.t + 40); await sleep(150);
                let L = await lista();
                if (!L || L.k !== "Obrázok") { zle.push("nad obrázkom " + kde + " nie je lišta „Obrázok“ (" + (L && L.k) + ")"); return false; }
                const x = Math.max(x0, L.l + 12), cielY = (L.t + L.b) / 2, cesta = [];
                for (let y = f.t + 20; y >= cielY; y -= 2) { await mys(x, y); await sleep(12); const q = await lista(); cesta.push(q ? q.k : "–"); if (!q || q.k !== "Obrázok") break; }
                await sleep(400);
                L = await lista();
                if (cesta.some((k) => k !== "Obrázok") || !L || L.k !== "Obrázok")
                  zle.push("cestou z obrázka " + kde + " na jeho lištu sa lišta prepla na „" + (cesta.find((k) => k !== "Obrázok") || (L && L.k)) + "“ – k lište obrázka sa nedá dostať");
                return true;
              };
              if (await most(f, "v stĺpci")) {
                // voľné miesto v druhom stĺpci → lišta celých stĺpcov
                const c2 = await ev(`(function(){var c=document.querySelectorAll(".pe-cols .pe-col");var e=c[1];if(!e)return null;var r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+Math.min(r.height/2,30)}})()`);
                if (c2) {
                  await mys(c2.x, c2.y); await sleep(60); await mys(c2.x + 3, c2.y + 2); await sleep(600);
                  const L = await lista();
                  if (!L || L.k !== "Stĺpce") zle.push("na voľnom mieste v druhom stĺpci sa neukázala lišta „Stĺpce“ (" + (L && L.k) + ")");
                }
                // stĺpce v stĺpci (12. 11. 2026, autor: „jeden stĺpec v polovici rozdeliť na ďalšie 2“):
                // ⇆ Rozdeliť v druhom stĺpci a ⇆ Vedľa na obrázku v prvom → oba stĺpce majú vnorené stĺpce vedľa seba
                const sp = await ev(`(function(){var c=document.querySelectorAll(".pe-cols:not(.pe-cols-in)>.pe-col")[1];var b=c&&[].find.call(c.querySelectorAll(":scope>.pe-colact>button"),function(x){return /Rozdeliť/.test(x.title)});if(!b)return null;b.scrollIntoView({block:"center",behavior:"instant"});var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
                if (!sp) zle.push("stĺpec nemá tlačidlo ⇆ Rozdeliť");
                else {
                  await klik(sp.x, sp.y); await sleep(300);
                  await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))`); await sleep(200);
                }
                f = await ustal();
                await mys((f.l + f.r) / 2, (f.t + f.b) / 2); await sleep(150);
                const v2 = await ev(`(function(){var b=[].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /vedľa/i.test(x.title)});if(!b)return null;var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
                if (!v2) zle.push("obrázok v stĺpci nemá ⇆ Vedľa (stĺpec sa nedá rozdeliť)");
                else { await klik(v2.x, v2.y); await sleep(300); await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))`); await sleep(300); }
                const vn = await ev(`(function(){
                  var out=[], vn=document.querySelectorAll(".pe-cols-in");
                  if(vn.length<2) out.push("vnorené stĺpce nevznikli ("+vn.length+" z 2)");
                  [].forEach.call(vn,function(w){var g=w,c=w.querySelectorAll(":scope>.pe-col"),bar=w.querySelector(":scope>.pe-colbar");
                    if(getComputedStyle(g).display!=="grid"||c.length<2||c[1].getBoundingClientRect().left<c[0].getBoundingClientRect().right-1) out.push("vnorené stĺpce nie sú vedľa seba (šírka "+Math.round(w.getBoundingClientRect().width)+" px)");
                    if(bar&&bar.scrollWidth>bar.clientWidth+1) out.push("lišta vnorených stĺpcov je orezaná ("+bar.scrollWidth+" > "+bar.clientWidth+" px)");});
                  [].forEach.call(document.querySelectorAll(".pe-col"),function(c){var r=c.getBoundingClientRect();
                    [].forEach.call(c.querySelectorAll(":scope>.pe-colact>button"),function(b){var q=b.getBoundingClientRect();
                      if(q.left<r.left-1||q.right>r.right+1) out.push("tlačidlo „"+b.textContent+"“ presahuje svoj stĺpec ("+Math.round(q.width)+" px v stĺpci "+Math.round(r.width)+" px)");});});
                  var f=document.querySelector(".pe-cols-in figure.fig");
                  if(!f) out.push("obrázok po ⇆ Vedľa nie je vo vnorených stĺpcoch");
                  return out})()`);
                (vn || ["meranie vnorených stĺpcov zlyhalo"]).forEach((x) => zle.push(x));
                f = await ustal();
                if (f) await most(f, "vo vnorených stĺpcoch");

                // krok späť / znova (12. 11. 2026, autor: „krok späť → pamäť, čo najdlhšiu“): všetky kroky späť a znova
                const H = () => ev(`(function(){var E=window.__pfEditor;return{ops:JSON.stringify(E.data().ops),h:E.hist?E.hist():null}})()`);
                const kl = (k) => ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:${JSON.stringify(k)},ctrlKey:true,bubbles:true}))`);
                const h0 = await H();
                if (!h0 || !h0.h) zle.push("editor nemá krok späť (Ctrl+Z)");
                else {
                  const nk = h0.h.undo;
                  if (nk < 3) zle.push("krok späť si pamätá len " + nk + " krokov (čakané ≥ 3: ⇆ Vedľa, ⇆ Rozdeliť, ⇆ Vedľa)");
                  for (let i = 0; i < nk; i++) { await kl("z"); await sleep(120); }
                  const h1 = await H();
                  if (h1.ops !== "[]") zle.push("po " + nk + "× Ctrl+Z ostali úpravy (" + h1.ops.length + " znakov)");
                  for (let i = 0; i < nk; i++) { await kl("y"); await sleep(120); }
                  const h2 = await H();
                  if (h2.ops !== h0.ops) zle.push("Ctrl+Y nevrátil všetky vrátené kroky");
                  for (let i = 0; i < nk; i++) { await kl("z"); await sleep(100); }
                  await sleep(300);
                }

                // presun ťahaním (12. 11. 2026, „drag and drop na bloky… obrázky aj riadne“): obrázok priamo za nasledujúci blok
                const tah = async (x0, y0, x1, y1) => {
                  await mys(x0, y0);
                  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: x0, y: y0, button: "left", buttons: 1, clickCount: 1 });
                  for (let i = 1; i <= 12; i++) { await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: x0 + (x1 - x0) * i / 12, y: y0 + (y1 - y0) * i / 12, button: "left", buttons: 1 }); await sleep(30); }
                  await sleep(120);
                  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x1, y: y1, button: "left", buttons: 0, clickCount: 1 });
                  await sleep(500);
                };
                const mvA = await ev(`(function(){
                  var f=[].find.call(document.querySelectorAll(".page figure.fig"),function(e){return e._peKey&&e.querySelector("img")&&!e.closest(".fig-row")&&!e.closest(".pe-cols")&&e.getBoundingClientRect().height>60});
                  if(!f)return null;
                  var t=f.nextElementSibling;while(t&&!(t._peKey&&!t.classList.contains("aside")&&t.getClientRects().length))t=t.nextElementSibling;
                  if(!t)return null;
                  window.__mvF=f;window.__mvT=t;
                  f.scrollIntoView({block:"start",behavior:"instant"});window.scrollBy({top:-70,behavior:"instant"});
                  var a=f.querySelector("img").getBoundingClientRect(),b=t.getBoundingClientRect();
                  return{fx:a.left+a.width/2,fy:Math.min(a.top+a.height/2,innerHeight/2),tx:b.left+Math.min(b.width/2,200),ty:Math.min(b.bottom-4,innerHeight-90,(document.getElementById("pe-dock")?document.getElementById("pe-dock").getBoundingClientRect().top:innerHeight)-14),grip:true}})()`);
                if (!mvA) zle.push("presun: nenašiel sa obrázok s blokom za ním");
                else {
                  await mys(mvA.fx, mvA.fy); await sleep(150);
                  if (!(await ev(`!![].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /presunúť/i.test(x.title)})`))) zle.push("lišta obrázka nemá ⠿ (presun ťahaním)");
                  await tah(mvA.fx, mvA.fy, mvA.tx, mvA.ty);
                  const mr = await ev(`(function(){var f=window.__mvF,t=window.__mvT,ops=window.__pfEditor.data().ops;return{ref:ops.some(function(o){return o.block&&o.block.t==="ref"}),za:!!(t.compareDocumentPosition(f)&4),edit:!!document.querySelector(".pe-editing"),zost:!!document.querySelector(".pe-moving,#pe-mvline")}})()`);
                  if (!mr.ref || !mr.za) zle.push("obrázok ťahaný za nasledujúci blok sa nepresunul (" + JSON.stringify(mr) + ")");
                  if (mr.edit) zle.push("po presune ťahaním sa otvorila úprava textu (klik po ťahaní sa nemá rátať)");
                  if (mr.zost) zle.push("po presune ostala značka ťahania na stránke");
                }

                // orezanie (12. 11. 2026, „možnosť orezať obrázok… aby nemal biele miesto“): ✂ → horný úchyt nadol o 30 % → Uložiť
                const ff = await ev(`(function(){var f=window.__mvF;if(!f)return null;f.scrollIntoView({block:"center",behavior:"instant"});var r=f.getBoundingClientRect(),i=f.querySelector("img").getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+Math.min(r.height/2,i.height/2),h:i.height}})()`);
                if (ff) {
                  await sleep(300);
                  await mys(ff.x, ff.y); await sleep(60); await mys(ff.x + 2, ff.y + 1); await sleep(200);
                  const cb = await ev(`(function(){var b=[].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /Orezať/.test(x.title)});if(!b)return null;var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
                  if (!cb) zle.push("lišta obrázka nemá ✂ (orezanie)");
                  else {
                    await klik(cb.x, cb.y); await sleep(500);
                    const hn = await ev(`(function(){var s=document.querySelector("#pe-dlg .pe-crop");if(!s)return null;var h=[].find.call(s.querySelectorAll(".h"),function(x){return x._k==="n"});var r=h.getBoundingClientRect(),q=s.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,h:q.height}})()`);
                    if (!hn) zle.push("✂ neotvorilo okno orezania");
                    else {
                      const lt = await ev(`(document.querySelector("#pe-dlg .lic")||{}).textContent||""`);
                      if (!/Licencia: CC/.test(lt)) zle.push("okno orezania neukazuje licenciu obrázka („" + lt + "“)");
                      await tah(hn.x, hn.y, hn.x, hn.y + hn.h * 0.3);
                      await ev(`document.querySelector("#pe-dlg .act .ok").click()`); await sleep(600);
                      const cr = await ev(`(function(){var i=window.__mvF.querySelector("img"),ops=window.__pfEditor.data().ops;return{ovb:getComputedStyle(i).objectViewBox,h:i.getBoundingClientRect().height,op:ops.some(function(o){return o.crop&&o.crop.t>20})}})()`);
                      if (!cr.op) zle.push("orezanie sa neuložilo do úprav (crop)");
                      if (!cr.ovb || cr.ovb === "none" || cr.h > ff.h * 0.85) zle.push("orezaný obrázok sa v texte nezmenšil (výška " + Math.round(cr.h) + " z " + Math.round(ff.h) + " px, object-view-box " + cr.ovb + ")");
                      await kl("z"); await sleep(400);
                      const cz = await ev(`getComputedStyle(window.__mvF.querySelector("img")).objectViewBox`);
                      if (cz && cz !== "none") zle.push("Ctrl+Z nevrátil orezanie");
                    }
                    // licencia (12. 11. 2026, „daj pozor, aby som náhodou neorezal, čo nemožno“): okno ukáže licenciu; pri ND
                    // a pri novom obrázku bez zdroja sa okno neotvorí vôbec
                    const nd = await ev(`(function(){var a=window.__mvF.querySelector(".src-link");if(!a)return null;var t=a.lastChild;window.__lic0=t.nodeValue;t.nodeValue=t.nodeValue.replace(/[^·]*$/," CC BY-NC-ND 4.0");
                      window.__mvF.scrollIntoView({block:"center",behavior:"instant"});var r=window.__mvF.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+40}})()`);
                    if (nd) {
                      await sleep(200);
                      await mys(nd.x, nd.y); await sleep(60); await mys(nd.x + 2, nd.y + 1); await sleep(200);
                      const cb2 = await ev(`(function(){var b=[].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /Orezať/.test(x.title)});if(!b)return null;var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
                      if (cb2) { await klik(cb2.x, cb2.y); await sleep(500); }
                      const r2 = await ev(`(function(){var d=!!document.querySelector("#pe-dlg .pe-crop");[].forEach.call(document.querySelectorAll("#pe-dlg"),function(x){x.remove()});
                        var fl=[].map.call(document.querySelectorAll(".pe-flash"),function(x){return x.textContent}).join(" | ");
                        var a=window.__mvF.querySelector(".src-link");a.lastChild.nodeValue=window.__lic0;return{dlg:d,flash:fl}})()`);
                      if (!cb2) zle.push("licencia ND: lišta nemá ✂");
                      else if (r2.dlg || !/nesmie/.test(r2.flash)) zle.push("obrázok s licenciou ND sa dal otvoriť na orezanie (" + JSON.stringify(r2) + ")");
                    }
                  }
                }

                // presun do stĺpca: odsek ⇆ Vedľa → obrázok ťahaním do prázdneho druhého stĺpca
                const tp = await ev(`(function(){var t=(window.__mvF.closest(".fig-row")||window.__mvF).previousElementSibling;while(t&&!(t.tagName==="P"&&t._peKey&&t.getClientRects().length))t=t.previousElementSibling;window.__mvP=t;if(!t)return null;t.scrollIntoView({block:"center",behavior:"instant"});var r=t.getBoundingClientRect();return{x:r.left+Math.min(60,r.width/2),y:r.top+Math.min(10,r.height/2)}})()`);
                if (tp) {
                  await sleep(300);
                  await mys(tp.x, tp.y); await sleep(60); await mys(tp.x + 2, tp.y + 1); await sleep(200);
                  const vb = await ev(`(function(){var b=[].find.call(document.querySelectorAll("#pe-tb button"),function(x){return /vedľa/i.test(x.title)});if(!b)return null;var r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
                  if (vb) {
                    await klik(vb.x, vb.y); await sleep(300);
                    await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))`); await sleep(400);
                    const dd = await ev(`(function(){var c=window.__mvP.closest(".pe-cols");if(!c)return null;var col=c.querySelectorAll(":scope>.pe-col")[1];var f=window.__mvF;window.scrollBy({top:col.getBoundingClientRect().top-110,behavior:"instant"});
                      var a=f.querySelector("img").getBoundingClientRect(),r=col.getBoundingClientRect();return{fx:a.left+a.width/2,fy:Math.max(a.top+20,Math.min(a.top+a.height/2,innerHeight-60)),tx:r.left+r.width/2,ty:r.top+Math.min(r.height/2,24)}})()`);
                    if (!dd) zle.push("presun do stĺpca: ⇆ Vedľa na odseku nevytvorilo stĺpce");
                    else {
                      await tah(dd.fx, dd.fy, dd.tx, dd.ty);
                      const ok2 = await ev(`(function(){var col=window.__mvF.closest(".pe-col");return !!col&&[].indexOf.call(col.parentNode.children,col)===1&&!!window.__mvP.closest(".pe-col")})()`);
                      if (!ok2) zle.push("obrázok ťahaný do prázdneho stĺpca sa doň nedostal");
                    }
                  }
                }
              }
            }
          }
        }
      }
      }   // koniec prvej podskúšky editora (EP !== 2)
      /* Stĺpce z buildu (div.stlpce) sú v editore ten istý blok stĺpcov ako nové (13. 11. 2026, autor: „aby editor plnohodnotne
         predstavoval štruktúru diela… nie dve zobrazenia“): rovnaké HTML (.stlpce > .stlpec), lišta šírok a hranica na ťahanie,
         rovnaká vnorená štruktúra a rovnaké bloky ako na stránke; ťah hranice uloží úpravu {kind:"cols"}, Ctrl+Z ju zruší,
         text v stĺpci sa dá písať a vypnutie editora vráti pôvodnú stránku. (12. 11.: obsah stĺpcov musí byť blokom editora.) */
      const kapS = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
        .find((f) => /<div class="stlpce"/.test(fs.readFileSync(f, "utf8")));
      if (kapS && EP !== 2) {
        const hotovo2 = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + kapS.replace(/\\/g, "/") });
        await Promise.race([hotovo2, sleep(15000)]);
        await sleep(1500);
        const tvar = `function tvar(c){var o=[];(function w(x,d){[].forEach.call(x.children,function(k){if(k.classList.contains("stlpec")){o.push(d+"|");[].forEach.call(k.children,function(b){if(b.classList.contains("stlpce"))w(b,d+1);else if(!b.classList.contains("pe-ui")&&!b.classList.contains("k-skr"))o.push(d+b.tagName)})}})})(c,0);return o.join(",")}`;
        const ok2 = await ev(`(async () => {
          ${tvar}
          window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
          var c0 = document.querySelector(".page .stlpce"); window.__stl0 = c0; window.__tvar0 = tvar(c0);
          await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
          await new Promise((r) => setTimeout(r, 400));
          if (!window.__pfEditor) return "editor sa nenačítal";
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
          await new Promise((r) => setTimeout(r, 500));
          var c = document.querySelector(".page .stlpce"), z = [];
          if (!c.classList.contains("pe-cols")) z.push("stĺpce z kapitoly nie sú v editore blokom stĺpcov (chýba lišta šírok, hranica, ＋ stĺpec)");
          else {
            if (!c.querySelector(":scope>.pe-colbar")) z.push("stĺpce z kapitoly nemajú lištu šírok");
            if (c.querySelectorAll(":scope>.pe-div").length !== c.querySelectorAll(":scope>.stlpec").length - 1) z.push("stĺpce z kapitoly nemajú hranicu na ťahanie");
            if (tvar(c) !== window.__tvar0) z.push("editor ukazuje inú štruktúru stĺpcov než stránka (" + tvar(c) + " × " + window.__tvar0 + ")");
          }
          var bl = c.querySelectorAll(".stlpec > *:not(.stlpce):not(.pe-ui)"), bez = [].filter.call(bl, function (e) { return !e._peKey && !e._pe; });
          if (!bl.length) z.push("stĺpce sú prázdne");
          else if (bez.length) z.push(bez.length + " z " + bl.length + " blokov v stĺpcoch nie je blokom editora (" + bez[0].tagName.toLowerCase() + ")");
          var u = c.querySelector(".stlpec > ul, .stlpec > p");
          c.scrollIntoView({ block: "start", behavior: "instant" }); window.scrollBy({ top: -120, behavior: "instant" });
          var d = c.querySelector(":scope>.pe-div"), r0 = d && d.getBoundingClientRect();
          if (r0) window.__stlDiv = { x: r0.left + r0.width / 2, y: Math.min(r0.top + 60, innerHeight - 80) };
          if (u) { var r = u.getBoundingClientRect(); window.__stlTxt = { x: r.left + 30, y: r.top + 8 }; }
          return z.join("; ");
        })()`, true);
        if (ok2) zle.push("stĺpce (" + path.basename(kapS) + "): " + ok2);
        else {
          const dv = await ev("window.__stlDiv");
          if (dv) {
            await mys(dv.x, dv.y);
            await send("Input.dispatchMouseEvent", { type: "mousePressed", x: dv.x, y: dv.y, button: "left", buttons: 1, clickCount: 1 });
            for (let i = 1; i <= 8; i++) { await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: dv.x + i * 8, y: dv.y, button: "left", buttons: 1 }); await sleep(25); }
            await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: dv.x + 64, y: dv.y, button: "left", buttons: 0, clickCount: 1 });
            await sleep(500);
            const w = await ev(`(function(){var o=window.__pfEditor.data().ops.filter(function(x){return x.kind==="cols"});return{n:o.length,w:o[0]&&o[0].block.widths}})()`);
            if (!w || w.n !== 1) zle.push("stĺpce (" + path.basename(kapS) + "): ťah hranice neuložil úpravu stĺpcov ({kind:\"cols\"}) – " + JSON.stringify(w));
            await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"z",ctrlKey:true,bubbles:true}))`); await sleep(400);
            const u = await ev(`(function(){return{ops:window.__pfEditor.data().ops.length,cols:!!document.querySelector(".page .stlpce.pe-cols")}})()`);
            if (u.ops !== 0 || !u.cols) zle.push("stĺpce (" + path.basename(kapS) + "): Ctrl+Z nevrátil šírky stĺpcov (" + JSON.stringify(u) + ")");
          } else zle.push("stĺpce (" + path.basename(kapS) + "): hranica stĺpcov sa nenašla");
          /* Prepínače vyrovnania (16. 11. 2026): ⇅ Spodky vyp. = šírky presne podľa zápisu, ▭ Obrázky = prvé obrázky stĺpcov
             rovnako vysoké, zvislé zarovnanie; každý krok sa uloží do úprav a Ctrl+Z ho vráti. */
          {
            const kS = path.basename(kapS);
            const stav = () => ev(`(function(){var c=document.querySelector(".page .stlpce"),o=window.__pfEditor.data().ops.filter(function(x){return x.kind==="cols"})[0];
              var cols=[].filter.call(c.children,function(x){return x.classList.contains("stlpec")}),W=cols.reduce(function(a,x){return a+x.getBoundingClientRect().width},0);
              return{bal:o?o.block.bal||"":"-",va:o?o.block.va||"":"-",dv:c.getAttribute("data-vyrovnat")||"",dz:c.getAttribute("data-zvislo")||"",ops:window.__pfEditor.data().ops.length,
                w:cols.map(function(x){return x.getBoundingClientRect().width/W*100}),w0:c._w,on:[].map.call(c.querySelectorAll(":scope>.pe-colbar>.pe-tg.on"),function(b){return b.className.replace(/pe-tg-?| on/g,"").trim()}).join(",")}})()`);
            const tg = async (sel) => { const je = await ev(`(function(){var b=document.querySelector(".page .stlpce").querySelector(":scope > .pe-colbar > ${sel}");if(!b)return false;b.click();return true})()`); await sleep(450); return je; };
            let q = await stav();
            if (q.on !== "bal") zle.push("stĺpce (" + kS + "): lišta stĺpcov nemá zapnutý prepínač ⇅ Spodky (" + q.on + ")");
            if (!(await tg(".pe-tg-bal"))) zle.push("stĺpce (" + kS + "): lišta stĺpcov nemá prepínač ⇅ Spodky");
            else {
              q = await stav();
              if (q.bal !== "nie" || q.dv !== "nie") zle.push("stĺpce (" + kS + "): vypnutie ⇅ Spodky neuložilo pevné šírky (" + JSON.stringify(q) + ")");
              else if (q.w.some((x, i) => Math.abs(x - q.w0[i]) > 1.5)) zle.push("stĺpce (" + kS + "): pri vypnutom vyrovnaní šírky nesedia so zápisom (" + q.w.map((x) => Math.round(x)).join(" · ") + " × " + q.w0.join(" · ") + ")");
              await tg(".pe-tg-obr"); q = await stav();
              if (q.bal !== "obr" || q.dv !== "obrazky" || q.on !== "obr") zle.push("stĺpce (" + kS + "): ▭ Obrázky sa neuložilo (" + JSON.stringify(q) + ")");
              await tg(".pe-tg-va"); q = await stav();
              if (q.va !== "stred" || q.dz !== "stred") zle.push("stĺpce (" + kS + "): zvislé zarovnanie na stred sa neuložilo (" + JSON.stringify(q) + ")");
              for (let i = 0; i < 3; i++) { await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"z",ctrlKey:true,bubbles:true}))`); await sleep(350); }
              q = await stav();
              if (q.ops !== 0 || q.dv || q.dz) zle.push("stĺpce (" + kS + "): Ctrl+Z nevrátil prepínače stĺpcov (" + JSON.stringify(q) + ")");
            }
            // obrázky rovnako vysoké: prvý blok stĺpcov, v ktorom majú aspoň dva stĺpce vlastný obrázok
            const ob = await ev(`(async function(){
              function prvy(c){return [].find.call(c.querySelectorAll("figure img"),function(i){var p=i.parentNode;while(p&&p!==c&&!(p.classList&&p.classList.contains("stlpce")))p=p.parentNode;return p===c})}
              var bl=[].find.call(document.querySelectorAll(".page .stlpce.pe-cols:not(.mriezka)"),function(r){return [].filter.call(r.children,function(c){return c.classList.contains("stlpec")&&prvy(c)}).length>1});
              if(!bl)return null;
              var b=bl.querySelector(":scope>.pe-colbar>.pe-tg-obr"); if(!b)return{chyba:"blok stĺpcov s obrázkami nemá prepínač ▭ Obrázky"};
              var kluc=bl._pe; b.click(); await new Promise(function(r){setTimeout(r,700)});
              var n=[].find.call(document.querySelectorAll('.page .stlpce[data-vyrovnat="obrazky"]'),function(){return true});
              if(!n)return{chyba:"po ▭ Obrázky blok nemá data-vyrovnat=obrazky"};
              var hs=[].filter.call(n.children,function(c){return c.classList.contains("stlpec")}).map(prvy).filter(Boolean).map(function(i){return Math.round(i.getBoundingClientRect().height)});
              return{hs:hs};
            })()`, true);
            if (ob && ob.chyba) zle.push("stĺpce (" + kS + "): " + ob.chyba);
            else if (ob && ob.hs.length > 1 && Math.max(...ob.hs) - Math.min(...ob.hs) > 3) zle.push("stĺpce (" + kS + "): po ▭ Obrázky nie sú obrázky v stĺpcoch rovnako vysoké (" + ob.hs.join(" · ") + " px)");
            if (ob) { await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"z",ctrlKey:true,bubbles:true}))`); await sleep(400); }
            const po = await ev("window.__pfEditor.data().ops.length");
            if (po !== 0) zle.push("stĺpce (" + kS + "): po skúške prepínačov ostali úpravy (" + po + ")");
          }
          const p = await ev("window.__stlTxt");
          if (p) {
            await ev(`(function(){var u=document.querySelector(".page .stlpce .stlpec > ul, .page .stlpce .stlpec > p");u.scrollIntoView({block:"center",behavior:"instant"});var r=u.getBoundingClientRect();window.__stlTxt={x:r.left+30,y:r.top+8}})()`);
            const q = await ev("window.__stlTxt");
            await klik(q.x, q.y); await sleep(250);
            const ed = await ev(`(function(){var e=document.elementFromPoint(${q.x},${q.y});return !!(e&&e.closest('[contenteditable="true"]'))})()`);
            if (!ed) zle.push("stĺpce (" + path.basename(kapS) + "): text v stĺpci sa po kliknutí nedá písať");
            await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))`); await sleep(200);
          }
          await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"e",code:"KeyE",ctrlKey:true,bubbles:true}))`); await sleep(400);
          const back = await ev(`(function(){${tvar};var c=document.querySelector(".page .stlpce");return{same:c===window.__stl0,t:tvar(c)===window.__tvar0,pe:!!document.querySelector(".page .pe-cols")}})()`);
          if (!back.same || !back.t || back.pe) zle.push("stĺpce (" + path.basename(kapS) + "): po vypnutí editora sa nevrátila pôvodná stránka (" + JSON.stringify(back) + ")");
        }
      }
      /* Blok Rozšírenie (14. 11. 2026, autor: „v editore pridaj možnosť pridať blok rozšírenie“): ponuka ＋ ho musí ponúknuť,
         v editore je vždy viditeľný (v knihe je rozšírenie skryté), dá sa doň písať a uloží sa ako {t:"roz"}; Ctrl+Z ho zruší. */
      {
        const kapR = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
          .find((f) => (fs.readFileSync(f, "utf8").match(/<p>[^<]{250,}/g) || []).length >= 4);
        if (kapR && EP !== 2) {
          const hotR = new Promise((r) => { nacitane = r; });
          await send("Page.navigate", { url: "file:///" + kapR.replace(/\\/g, "/") });
          await Promise.race([hotR, sleep(15000)]);
          await sleep(1500);
          const chyba = await ev(`(async () => {
            window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
            await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
            await new Promise((r) => setTimeout(r, 400));
            if (!window.__pfEditor) return "editor sa nenačítal";
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
            await new Promise((r) => setTimeout(r, 500));
            window.__rozOps0 = window.__pfEditor.data().ops.length;
            var p = document.querySelector(".page .sec-body > p");
            if (!p) return "kapitola nemá odsek";
            p.scrollIntoView({ block: "center", behavior: "instant" });
            var r = p.getBoundingClientRect();
            p.dispatchEvent(new MouseEvent("mousemove", { clientX: r.left + 20, clientY: r.top + 6, bubbles: true }));
            await new Promise((r) => setTimeout(r, 400));
            var plus = [].filter.call(document.querySelectorAll("#pe-tb button"), function (b) { return b.textContent.trim() === "＋"; })[0];
            if (!plus) return "nad blokom nie je tlačidlo ＋";
            plus.click();
            await new Promise((r) => setTimeout(r, 200));
            var rb = [].filter.call(document.querySelectorAll("#pe-menu button"), function (b) { return /Rozšírenie/.test(b.textContent); })[0];
            if (!rb) return "ponuka ＋ neobsahuje Rozšírenie";
            rb.click();
            await new Promise((r) => setTimeout(r, 400));
            var z = [], e = document.querySelector(".page .pe-roz");
            if (!e) return "po výbere sa blok rozšírenia nevložil";
            if (!e.classList.contains("rozsir") || !e.querySelector(".rozsir-tag") || !e.querySelector(".rozsir-body")) z.push("blok nemá štruktúru :::rozsirenie z buildu");
            if (e.getBoundingClientRect().height < 20 || getComputedStyle(e).display === "none") z.push("rozšírenie v editore nie je viditeľné");
            var bd = e.querySelector(".rozsir-body");
            if (bd.getAttribute("contenteditable") !== "true") z.push("do rozšírenia sa po vložení nedá písať");
            return z.join("; ");
          })()`, true);
          if (chyba) zle.push("rozšírenie v editore (" + path.basename(kapR) + "): " + chyba);
          else {
            await send("Input.insertText", { text: "skúšobný text rozšírenia" }); await sleep(150);
            await mys(20, 450); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 20, y: 450, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 20, y: 450, button: "left", clickCount: 1 }); await sleep(400);
            const o = await ev(`(function(){var op=window.__pfEditor.data().ops.filter(function(x){return x.block&&x.block.t==="roz"})[0];return{op:!!op,txt:!!(op&&/skúšobný text rozšírenia/.test(op.block.html||""))}})()`);
            if (!o.op || !o.txt) zle.push("rozšírenie v editore (" + path.basename(kapR) + "): písaný text sa neuložil ako {t:\"roz\"} (" + JSON.stringify(o) + ")");
            for (let k = 0; k < 4 && await ev(`!!document.querySelector(".page .pe-roz")`); k++) { await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"z",ctrlKey:true,bubbles:true}))`); await sleep(350); }   // vloženie a písanie sú dva kroky
            const u = await ev(`(function(){return{ops:window.__pfEditor.data().ops.length,ops0:window.__rozOps0,roz:!!document.querySelector(".page .pe-roz")}})()`);
            if (u.ops !== u.ops0 || u.roz) zle.push("rozšírenie v editore (" + path.basename(kapR) + "): Ctrl+Z ho nezrušil (" + JSON.stringify(u) + ")");
            await ev(`window.dispatchEvent(new KeyboardEvent("keydown",{key:"e",code:"KeyE",ctrlKey:true,bubbles:true}))`); await sleep(300);
          }
        }
      }
      /* Rad obrázkov → stĺpce (16. 11. 2026, autor: „keď editujem tebou vybranú štruktúru obrázkov vedľa seba, nie je to ako stĺpce…
         daj možnosť to klikom konvertovať na stĺpce“): lišta obrázka v rade (.fig-row) musí ponúknuť „Na stĺpce“; po kliku sú obrázky
         v bloku stĺpcov editora (lišta šírok), úprava je {kind:"cols"} s kľúčom radu, obrázky ostali rovnako široké (± 12 px)
         a Ctrl+Z vráti rad. */
      {
        const kapF = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
          .find((f) => /class="fig-row"/.test(fs.readFileSync(f, "utf8")));
        if (EP === 2) { /* druhá polovica – skúška patrí prvej */ }
        else if (!kapF) console.log("editor – rad obrázkov na stĺpce: kniha nemá obrázky vedľa seba – skúška preskočená");
        else {
          const hotF = new Promise((r) => { nacitane = r; });
          await send("Page.navigate", { url: "file:///" + kapF.replace(/\\/g, "/") });
          await Promise.race([hotF, sleep(15000)]);
          await sleep(1500);
          const vys = await ev(`(async () => {
            window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
            await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
            await new Promise((r) => setTimeout(r, 400));
            if (!window.__pfEditor) return "editor sa nenačítal";
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
            await new Promise((r) => setTimeout(r, 500));
            var ops0 = window.__pfEditor.data().ops.length;
            var row = document.querySelector(".page .fig-row"), f = row && row.querySelector(".fig");
            if (!f) return "rad obrázkov sa v editore nenašiel";
            var figs = [].slice.call(row.querySelectorAll(":scope > .fig"));
            f.scrollIntoView({ block: "center", behavior: "instant" });
            await new Promise((r) => setTimeout(r, 300));
            var w0 = figs.map(function (x) { return x.getBoundingClientRect().width; });
            var r = f.getBoundingClientRect();
            f.dispatchEvent(new MouseEvent("mousemove", { clientX: r.left + r.width / 2, clientY: r.top + Math.min(40, r.height / 2), bubbles: true }));
            await new Promise((r) => setTimeout(r, 400));
            var b = [].filter.call(document.querySelectorAll("#pe-tb button"), function (x) { return /Na stĺpce/.test(x.textContent); })[0];
            if (!b) return "lišta obrázka v rade neponúka „Na stĺpce“";
            b.click();
            await new Promise((r) => setTimeout(r, 900));
            var z = [], op = window.__pfEditor.data().ops.filter(function (x) { return x.kind === "cols" && /fig-row/.test((x.key || {}).tag || ""); })[0];
            if (!op) z.push("klik neuložil úpravu {kind:\\"cols\\"} s kľúčom radu");
            else if (op.block.cols.length !== figs.length || op.block.cols.some(function (c) { return c.length !== 1 || c[0].t !== "ref"; })) z.push("stĺpce nemajú po jednom obrázku z radu");
            var c = figs[0].closest(".stlpce.pe-cols");
            if (!c) z.push("obrázky po kliku nie sú v bloku stĺpcov editora");
            else {
              if (figs.some(function (x) { return x.closest(".stlpce") !== c || !x.parentNode.classList.contains("stlpec"); })) z.push("niektorý obrázok radu nie je v stĺpci");
              if (!c.querySelector(":scope > .pe-colbar")) z.push("blok stĺpcov z radu nemá lištu šírok");
              var w1 = figs.map(function (x) { return x.getBoundingClientRect().width; });
              if (w1.some(function (w, i) { return Math.abs(w - w0[i]) > 12; })) z.push("obrázky po zmene na stĺpce zmenili šírku (" + w0.map(Math.round).join("/") + " → " + w1.map(Math.round).join("/") + ")");
            }
            if (document.querySelector(".page .pe-slot")) z.push("po zmene ostalo prázdne miesto „pôvodný blok sa nenašiel“");
            for (var k = 0; k < 3 && window.__pfEditor.data().ops.length > ops0; k++) { window.dispatchEvent(new KeyboardEvent("keydown", { key: "z", ctrlKey: true, bubbles: true })); await new Promise((r) => setTimeout(r, 400)); }
            if (window.__pfEditor.data().ops.length !== ops0 || !document.contains(row) || figs.some(function (x) { return x.parentNode !== row; })) z.push("Ctrl+Z nevrátil rad obrázkov");
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
            await new Promise((r) => setTimeout(r, 300));
            return z.join("; ");
          })()`, true);
          if (vys) zle.push("rad obrázkov na stĺpce (" + path.basename(kapF) + "): " + vys);
        }
      }
      /* Písanie textu (13. 11. 2026, autor: „editor si nepamätá správne… keď dám Enter, preskočí“): po Enter s textom za
         kurzorom sa nový odsek otvoril s kurzorom na konci – ďalšie písanie sa prilepilo za presunutý zvyšok; Backspace
         v prázdnom novom odseku ho zmazal a písanie skončilo (klávesy išli nikam); miesto kliku sa určovalo až po prepise
         bloku na čistý text. Skúška píše ako autor (skutočné klávesy) a overí, kde text skončil a čo sa uložilo. */
      {
        const PUA = String.fromCharCode(0xE000), CR = String.fromCharCode(13);
        const kapT = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
          .find((f) => (fs.readFileSync(f, "utf8").match(/<p>[^<]{250,}/g) || []).length >= 4);
        if (kapT && EP !== 1) {
          const hotT = new Promise((r) => { nacitane = r; });
          await send("Page.navigate", { url: "file:///" + kapT.replace(/\\/g, "/") });
          await Promise.race([hotT, sleep(15000)]);
          await sleep(1500);
          const evT = async (x) => { const q = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); return q.result && q.result.result && q.result.result.value; };
          const kl = async (x, y) => { await mys(x, y); await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 }); await sleep(300); };
          const kluc = async (k) => { const c = { Enter: 13, Backspace: 8 }[k]; await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: k, code: k, windowsVirtualKeyCode: c }); if (k === "Enter") await send("Input.dispatchKeyEvent", { type: "char", text: CR, key: k }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code: k, windowsVirtualKeyCode: c }); await sleep(250); };
          const pis = async (t) => { await send("Input.insertText", { text: t }); await sleep(120); };
          const von = () => kl(20, 450);   // klik mimo stránky = hotovo
          const nP = await evT(`(async () => {
            try { Object.keys(localStorage).filter((k) => /^pe-upravy:/.test(k)).forEach((k) => localStorage.removeItem(k)); } catch (e) {}
            window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
            await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
            await new Promise((r) => setTimeout(r, 400));
            if (!window.__pfEditor) return -1;
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true }));
            await new Promise((r) => setTimeout(r, 400));
            window.__P = [].filter.call(document.querySelectorAll(".page .sec-body > p"), (p) => p._peKey && p.textContent.length > 250 && !p.closest(".pe-cols,.stlpce")).slice(1, 3);
            window.__za = (i, n) => { const o = []; for (let e = __P[i].nextElementSibling; e && o.length < n; e = e.nextElementSibling) { if (/side-anchor|k-skr|jadro-lead|pe-ui/.test(e.className)) continue; o.push(e); } return o; };
            window.__bod = (e, kde) => { e.scrollIntoView({ block: "center", behavior: "instant" });
              const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null), all = []; let t; while ((t = w.nextNode())) if (t.nodeValue.trim()) all.push(t);
              const r = document.createRange();
              if (kde === "end" || kde === "zac") { const l = kde === "end" ? all[all.length - 1] : all[0]; r.setStart(l, kde === "end" ? l.nodeValue.length : Math.min(3, l.nodeValue.length)); r.collapse(true);
                const q = r.getClientRects()[0] || l.parentElement.getBoundingClientRect(); return { x: kde === "end" ? q.right + 2 : q.left, y: q.top + q.height / 2 }; }
              const mid = all.slice().sort((a, b) => b.nodeValue.length - a.nodeValue.length)[0];
              let m = mid.nodeValue.indexOf(" ", Math.floor(mid.nodeValue.length / 2)); if (m < 0 || m + 2 > mid.nodeValue.length) m = 0;
              r.setStart(mid, m + 1); r.setEnd(mid, m + 2); const q = r.getBoundingClientRect();
              const b = document.createRange(); b.setStart(e, 0); b.setEnd(mid, m + 1); const off = b.toString().length;
              return { x: q.left + 1, y: q.top + q.height / 2, ctx: e.textContent.slice(Math.max(0, off - 12), off) }; };
            return __P.length; })()`);
          const zp = [];
          if (nP < 2) console.log("editor – písanie: v " + path.basename(kapT) + " nie sú dva dlhé odseky – skúška preskočená");
          else {
            // 1: koniec odseku – text, Enter, text, Enter, text
            let b = await evT(`__bod(__P[0], "end")`); await kl(b.x, b.y);
            await pis(" AAA"); await kluc("Enter"); await pis("BBB"); await kluc("Enter"); await pis("CCC"); await von();
            let za = await evT(`__za(0, 2).map((e) => e.textContent.trim())`);
            if ((await evT(`__P[0].textContent.trim().slice(-3)`)) !== "AAA") zp.push("text na konci odseku sa nezapísal na koniec");
            if (za[0] !== "BBB" || za[1] !== "CCC") zp.push("Enter, text, Enter, text: za odsekom má byť „BBB“, „CCC“, je " + JSON.stringify(za.map((s) => s.slice(0, 30))));
            // 2: klik doprostred – text na mieste kliku
            b = await evT(`__bod(__P[1], "mid")`); await kl(b.x, b.y); await pis("XXX"); await von();
            const t1 = await evT(`__P[1].textContent`), i1 = t1.indexOf("XXX"), pred = i1 < 0 ? "" : t1.slice(Math.max(0, i1 - 12), i1);
            if (i1 < 0) zp.push("text po kliku doprostred odseku sa nezapísal");
            else if (!(pred === b.ctx || pred.slice(1) === b.ctx.slice(0, -1) || pred.slice(0, -1) === b.ctx.slice(1))) zp.push("text nie je na mieste kliku – pred ním „" + pred + "“, kliknuté za „" + b.ctx + "“");
            // 3: Enter uprostred – písanie pokračuje na začiatku nového odseku
            b = await evT(`__bod(__P[1], "mid")`); await kl(b.x, b.y); await kluc("Enter"); await pis("YYY"); await von();
            za = await evT(`__za(1, 1).map((e) => e.textContent.trim())`);
            if (!(za[0] || "").startsWith("YYY")) zp.push("po Enter uprostred odseku sa písanie neocitlo na začiatku nového odseku („" + (za[0] || "").slice(0, 40) + "“)");
            // 4: Backspace – YYY preč, odsek sa spojí s predošlým a písanie pokračuje na mieste spojenia
            const dlz = await evT(`__P[1].textContent.length`);
            b = await evT(`__bod(__za(1, 1)[0], "zac")`); await kl(b.x, b.y);
            for (let i = 0; i < 4; i++) await kluc("Backspace");
            await pis("QQQ"); await von();
            const t2 = await evT(`__P[1].textContent`); za = await evT(`__za(1, 1).map((e) => e.textContent.trim())`);
            if (t2.indexOf("QQQ") < 0) zp.push("Backspace na začiatku nového odseku ho nespojil s predošlým – písanie skončilo inde („" + (za[0] || "").slice(0, 30) + "“)");
            else if (Math.abs(t2.indexOf("QQQ") - dlz) > 2) zp.push("po spojení odsekov kurzor nie je na mieste spojenia");
            // 5: počas písania klik do iného (nového) bloku – rozpísaný text ostane, nový ide na miesto kliku
            b = await evT(`__bod(__P[1], "mid")`); await kl(b.x, b.y); await pis("777");
            b = await evT(`__bod(__za(0, 1)[0], "end")`); await kl(b.x, b.y); await pis("222"); await von();
            za = await evT(`__za(0, 1).map((e) => e.textContent.trim())`);
            if (za[0] !== "BBB222") zp.push("klik do iného bloku počas písania – čakané „BBB222“, je „" + (za[0] || "").slice(0, 30) + "“");
            if ((await evT(`__P[1].textContent`)).indexOf("777") < 0) zp.push("rozpísaný text sa pri prechode do iného bloku stratil");
            const ops = (await evT(`JSON.stringify(window.__pfEditor.data().ops)`)) || "";
            if (ops.indexOf(PUA) >= 0) zp.push("značka kurzora ostala v uložených úpravách");
            if (!/AAA/.test(ops) || !/BBB222/.test(ops) || !/CCC/.test(ops) || !/QQQ/.test(ops) || !/777/.test(ops)) zp.push("napísaný text nie je celý v uložených úpravách (ops)");
            /* Pohodlie pri písaní a mriežka (16. 11. 2026, autor: „vylepši editor… plne funkčný a čo najviac convenient“, „pridaj aj
               možnosť gridu a aby sa dali zlúčiť niektoré bunky“): prázdny nový odsek sa po skončení písania upracie, „- “ spraví
               odrážky, šípka na kraji bloku prejde do susedného, vložený text s prázdnym riadkom = viac odsekov, „/“ otvorí ponuku
               a tá vie mriežku; bunky mriežky sa dajú zlúčiť a rozdeliť; nový box na okraji je napojený na svoju čiaru. */
            {
              const kl2 = async (k, text) => {
                const vk = { ArrowDown: 40, ArrowUp: 38, Tab: 9, " ": 32, "/": 191 }[k], code = k === " " ? "Space" : k === "/" ? "Slash" : k;
                await send("Input.dispatchKeyEvent", Object.assign({ type: text ? "keyDown" : "rawKeyDown", key: k, code, windowsVirtualKeyCode: vk }, text ? { text } : {}));
                await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); await sleep(350);
              };
              const nove = () => evT(`JSON.stringify(window.__pfEditor.data().ops.filter((o) => o.kind === "ins").map((o) => o.block))`).then((x) => JSON.parse(x || "[]"));
              const ccc = () => evT(`__bod(__za(0, 2)[1], "end")`);
              // a) Enter na konci a klik vedľa – prázdny odsek nesmie ostať v úpravách
              const n0 = (await nove()).length;
              b = await ccc(); await kl(b.x, b.y); await kluc("Enter"); await von();
              let nv = await nove();
              if (nv.length !== n0 || nv.some((x) => x.t === "p" && !String(x.html || "").replace(/<[^>]+>/g, "").trim())) zp.push("prázdny nový odsek po skončení písania ostal v úpravách (" + nv.length + " × " + n0 + ")");
              // b) „- “ v novom prázdnom odseku = odrážky
              b = await ccc(); await kl(b.x, b.y); await kluc("Enter"); await pis("-"); await kl2(" ", " "); await pis("odr1"); await von();
              nv = await nove();
              if (!nv.some((x) => x.t === "ul" && /<li>odr1<\/li>/.test(x.html || ""))) zp.push("„- “ v novom odseku neurobilo odrážky (" + JSON.stringify(nv.slice(-1)).slice(0, 120) + ")");
              // c) šípka dole na konci odseku = začiatok ďalšieho bloku
              b = await evT(`__bod(__P[0], "end")`); await kl(b.x, b.y); await kl2("ArrowDown"); await pis("DDD"); await von();
              za = await evT(`__za(0, 1).map((e) => e.textContent.trim())`);
              if (!(za[0] || "").startsWith("DDD")) zp.push("šípka dole na konci odseku neprešla na začiatok ďalšieho bloku („" + (za[0] || "").slice(0, 30) + "“)");
              // d) vložený text: zlom riadka = medzera, prázdny riadok = nový odsek
              b = await ccc(); await kl(b.x, b.y);
              await evT(`(() => { const dt = new DataTransfer(); dt.setData("text/plain", " X1" + String.fromCharCode(10) + "X2" + String.fromCharCode(10, 10) + "Y1" + String.fromCharCode(10, 10) + "Z1");
                document.activeElement.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true })); })()`);
              await sleep(500); await von();
              za = await evT(`__za(0, 4).map((e) => e.textContent.trim())`);
              if (!/X1 X2$/.test(za[1] || "") || za[2] !== "Y1" || za[3] !== "Z1") zp.push("vloženie viacerých odsekov: čakané „…X1 X2“, „Y1“, „Z1“, je " + JSON.stringify(za.slice(1).map((s) => s.slice(-20))));
              // e) „/“ v novom prázdnom odseku = ponuka; mriežka 2 × 2, zlúčenie, rozdelenie, riadok navyše
              b = await evT(`__bod(__za(0, 4)[3], "end")`); await kl(b.x, b.y); await kluc("Enter"); await kl2("/", "/");
              const mb = await evT(`(() => { const x = [].find.call(document.querySelectorAll("#pe-menu button"), (q) => /Mriežka 2/.test(q.textContent)); if (!x) return null; x.scrollIntoView({ block: "center", behavior: "instant" }); const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
              if (!mb) zp.push("„/“ v novom prázdnom odseku neotvorilo ponuku s mriežkou");
              else {
                await kl(mb.x, mb.y); await sleep(300);
                const gst = () => evT(`(() => { const g = window.__pfEditor.data().ops.filter((o) => o.kind === "ins" && o.block.grid).map((o) => o.block)[0], e = document.querySelector(".pe-grid");
                  return g ? { n: g.cols.length, sp: JSON.stringify(g.spans), dom: e ? e.querySelectorAll(":scope > .pe-col").length : -1, span: e ? e.querySelector(":scope > .pe-col").style.gridColumn : "" } : null; })()`);
                const gk = async (znak) => { const p = await evT(`(() => { const e = document.querySelector(".pe-grid"); if (!e) return null; e.scrollIntoView({ block: "center", behavior: "instant" });
                  const x = [].find.call(e.querySelectorAll(":scope > .pe-col > .pe-colact .pe-gbtn, :scope > .pe-colbar button"), (q) => q.textContent.indexOf(${JSON.stringify("ZNAK")}.replace("ZNAK", ${JSON.stringify(znak)})) >= 0);
                  if (!x) return null; const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`); if (!p) return false; await kl(p.x, p.y); await sleep(250); return true; };
                let g = await gst();
                if (!g || g.n !== 4 || g.dom !== 4) zp.push("ponuka nevložila mriežku 2 × 2 (" + JSON.stringify(g) + ")");
                else if ((await nove()).some((x) => x.t === "p" && !String(x.html || "").trim())) zp.push("mriežka z ponuky „/“ nenahradila prázdny odsek");
                else {
                  if (!(await gk("⇥"))) zp.push("bunka mriežky nemá tlačidlo ⇥ (zlúčiť vpravo)");
                  g = await gst();
                  if (!g || g.n !== 3 || g.sp.indexOf("[2,1]") !== 1 || !/span 2/.test(g.span)) zp.push("zlúčenie buniek vpravo: čakané 3 bunky a prvá cez 2 stĺpce, je " + JSON.stringify(g));
                  if (!(await gk("⊞"))) zp.push("zlúčená bunka nemá tlačidlo ⊞ (rozdeliť)");
                  g = await gst();
                  if (!g || g.n !== 4 || /[2-9]/.test(g.sp)) zp.push("rozdelenie zlúčenej bunky nevrátilo 4 bunky (" + JSON.stringify(g) + ")");
                  await gk("＋ riadok"); g = await gst();
                  if (!g || g.n !== 6) zp.push("＋ riadok nepridal dve bunky (" + JSON.stringify(g) + ")");
                  await gk("⤓"); g = await gst();
                  if (!g || g.n !== 5 || g.sp.indexOf("[1,2]") < 0) zp.push("zlúčenie buniek nadol: čakaných 5 buniek a jedna cez 2 riadky, je " + JSON.stringify(g));
                }
              }
              // f) nový box na okraji (Pozor) je napojený na svoju čiaru
              await evT(`__P[1].scrollIntoView({ block: "center", behavior: "instant" })`); await sleep(200);
              const pr = await evT(`(() => { const r = __P[1].getBoundingClientRect(); return { x: r.left + 40, y: r.top + r.height / 2 }; })()`);
              await mys(pr.x, pr.y); await sleep(250);
              const plus = await evT(`(() => { const x = [].find.call(document.querySelectorAll("#pe-tb button"), (q) => q.textContent === "＋"); if (!x) return null; const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
              if (!plus) zp.push("lišta odseku nemá tlačidlo ＋");
              else {
                await kl(plus.x, plus.y);
                const chip = await evT(`(() => { const x = document.querySelector("#pe-menu .chips .k-pozor"); if (!x) return null; const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
                if (!chip) zp.push("ponuka ＋ nemá box Pozor");
                else {
                  await kl(chip.x, chip.y); await pis("okrajový text skúšky"); await von(); await sleep(600);
                  const q = await evT(NAPOJENIE);
                  const je = await evT(`!!document.querySelector(".page .box.k-pozor.pe-new.side-note")`);
                  if (!je) zp.push("nový box Pozor sa neuložil na okraj");
                  if (q && q.zle.length) zp.push("po pridaní boxu na okraj nie sú poznámky napojené na čiaru: " + q.zle.slice(0, 3).join("; "));
                }
              }
            }
            /* g) Obnovenie stránky so zobrazenými úpravami (16. 11. 2026, autor: „keď refreshnem a mám zobrazené úpravy, hodí ma to
               nižšie“): blok, ktorý bol hore na obrazovke, musí byť po obnovení (a po vložení úprav) na tom istom mieste. */
            {
              await evT(`window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, bubbles: true })); 1`); await sleep(400);
              // miesto POD vloženými blokmi: tam sa poradie blokov líši od pôvodnej stránky (peek.js si pamätá poradové číslo bloku)
              await evT(`(() => { const n = [].slice.call(document.querySelectorAll(".page .pe-new")).filter((e) => !e.classList.contains("side-note") && e.getClientRects().length).pop();
                window.scrollTo({ top: n ? n.getBoundingClientRect().bottom + scrollY + 900 : document.documentElement.scrollHeight * 0.55, behavior: "instant" }); return 1; })()`);
              await sleep(2300);   // držanie miesta po prekreslení dobehne a poloha sa zapíše
              await evT(`window.scrollBy({ top: 37, behavior: "instant" }); 1`); await sleep(600);
              const p0 = await evT(`window.__pfEditor.pos()`);
              await send("Page.reload", {});
              await sleep(2200);
              await evT(`(async () => { window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
                await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); }); return 1; })()`);
              await sleep(2600);
              const p1 = await evT(`window.__pfEditor ? Object.assign(window.__pfEditor.pos() || {}, { ops: window.__pfEditor.data().ops.length }) : null`);
              if (!p0 || !p0.id) zp.push("poloha pred obnovením stránky sa nedala zistiť (" + JSON.stringify(p0) + ")");
              else if (!p1 || !p1.ops) zp.push("po obnovení stránky sa úpravy nenačítali (" + JSON.stringify(p1) + ")");
              else if (p1.id !== p0.id || Math.abs(p1.top - p0.top) > 4) zp.push("po obnovení stránky so zobrazenými úpravami sa čítané miesto posunulo (pred " + JSON.stringify(p0) + ", po " + JSON.stringify(p1) + ")");
            }
            zp.forEach((x) => zle.push("písanie (" + path.basename(kapT) + "): " + x));
          }
        }
      }
      /* Prepnutie editora drží čítané miesto (16.–17. 11. 2026, autor: „keď cez Ctrl+E zapínam edit, často mi skočí úplne inde…
         aby sa nikdy nestalo, že úplne iný viewpoint mám“). Editor meral polohu až po prepnutí vzhľadu (prečiarknuté bloky,
         💬 poznámky a stĺpce kreslené z modelu nad čítaným miestom ju už posunuli) a kotvou bol jediný blok. Skúška: kapitola
         so stĺpcami, umelé úpravy po celej kapitole (poznámka za každým 5. odsekom, každý 7. zmazaný), na ôsmich miestach
         Ctrl+E zap/vyp – v KAŽDEJ vykreslenej snímke musí aspoň jeden blok z hornej polovice obrazovky stáť na mieste (± 3 px);
         jedno prepnutie prichádza skôr, než predošlé držanie dobehne; podržaný Ctrl+E (opakovanie klávesu) editor neprepína.
         Starý editor: 16 z 54 miest kap. 12 PATOLY, až 5 394 px (na skutočných úpravách autora 17 z 55, až 505 px). */
      {
        const kapM = fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort().map((f) => path.join(CH, f))
          .find((f) => { const t = fs.readFileSync(f, "utf8"); return /<div class="stlpce"/.test(t) && (t.match(/<p>/g) || []).length >= 40; });
        if (EP === 1) { /* prvá polovica – skúška patrí druhej */ }
        else if (!kapM) console.log("editor – prepnutie Ctrl+E: kniha nemá kapitolu so stĺpcami a 40 odsekmi – skúška preskočená");
        else {
          const hotM = new Promise((r) => { nacitane = r; });
          await send("Page.navigate", { url: "file:///" + kapM.replace(/\\/g, "/") });
          await Promise.race([hotM, sleep(15000)]);
          await sleep(1500);
          const M = await ev(`(async () => {
            const wait = (ms) => new Promise((r) => setTimeout(r, ms));
            try { Object.keys(localStorage).filter((k) => /^pe-/.test(k)).forEach((k) => localStorage.removeItem(k)); localStorage.setItem("pe-view", "1"); } catch (e) {}
            window.fetch = () => Promise.reject(new Error("skúška – bez servera"));
            await new Promise((res) => { const s = document.createElement("script"); s.src = ${JSON.stringify("file:///" + EDITOR_JS.replace(/\\/g, "/"))}; s.onload = res; s.onerror = res; document.head.appendChild(s); });
            await wait(500);
            const E = window.__pfEditor; if (!E) return { err: "editor sa nenačítal" };
            const ops = E.data().ops;
            E.blocks.map((b) => b.el).filter((e) => e.matches(".sec-body > p") && !e.closest(".aside,.stlpce,.fig-row,.rozsir")).forEach((e, i) => {
              if (i % 5 === 2) ops.push({ id: "skuska-n" + i, kind: "ins", after: e._peKey, sec: "", seq: 1, block: { t: "note", html: "poznámka skúšky ".repeat(40) } });
              if (i % 7 === 4) ops.push({ id: "skuska-d" + i, kind: "del", key: e._peKey, sec: "", orig: [""] });
            });
            E.render(); await wait(1200);
            const ctrlE = (rep) => window.dispatchEvent(new KeyboardEvent("keydown", { key: "e", code: "KeyE", ctrlKey: true, repeat: !!rep, bubbles: true }));
            const H = document.documentElement.scrollHeight, zle = [];
            let i = 0;
            for (let f = 0.08; f < 0.9; f += 0.1, i++) {
              if (document.body.classList.contains("pe-edit")) { ctrlE(); await wait(1500); }
              window.scrollTo({ top: Math.round(H * f), behavior: "instant" }); await wait(500);
              const vis = E.blocks.map((b) => b.el).filter((e) => { if (!document.contains(e) || e.closest(".aside,.side-note")) return false; const r = e.getBoundingClientRect(); return r.height > 0 && r.top > -200 && r.top < innerHeight / 2; })
                .map((e) => [e, e.getBoundingClientRect().top]);
              if (!vis.length) continue;
              const stoji = () => Math.min.apply(null, vis.map(([e, t]) => e.getClientRects().length ? Math.abs(e.getBoundingClientRect().top - t) : 1e9));
              const kroky = i === 3 ? [["zapnutie", 450], ["vypnutie", 1500]] : [["zapnutie", 1500], ["vypnutie", 1500]];   // na 4. mieste rýchlo za sebou
              for (const [krok, pauza] of kroky) {
                let go = true, max = 0;
                const tik = () => setTimeout(() => { if (!go) return; max = Math.max(max, stoji()); requestAnimationFrame(tik); }, 0);   // po vykreslení snímky
                ctrlE(); requestAnimationFrame(tik); await wait(pauza); go = false;
                const kon = stoji();
                if (max > 3 || kon > 3) zle.push(Math.round(f * 100) + " % kapitoly, " + krok + ": z hornej polovice obrazovky nestojí na mieste nič (najmenší posun " + Math.round(Math.min(max, 1e6)) + " px, na konci " + Math.round(Math.min(kon, 1e6)) + " px)");
                vis.forEach((v) => { if (v[0].getClientRects().length) v[1] = v[0].getBoundingClientRect().top; });
              }
            }
            if (document.body.classList.contains("pe-edit")) { ctrlE(); await wait(800); }
            ctrlE(); ctrlE(true); await wait(200);
            if (!document.body.classList.contains("pe-edit")) zle.push("podržaný Ctrl+E (opakovanie klávesu) editor znova vypol");
            ctrlE(); await wait(600);
            return { zle };
          })()`, true);
          if (!M || M.err) zle.push("prepnutie Ctrl+E (" + path.basename(kapM) + "): skúška sa nedala spustiť (" + (M && M.err) + ")");
          else M.zle.forEach((x) => zle.push("prepnutie Ctrl+E (" + path.basename(kapM) + "): " + x));
        }
      }
      await ev(`(function(){try{Object.keys(localStorage).filter(function(k){return /^pe-upravy:/.test(k)}).forEach(function(k){localStorage.removeItem(k)})}catch(e){}})()`);
      if (zle.length) { chyb++; console.log(`  ✖ editor kapitoly (admin/editor.js, ${path.basename(kapE)})\n      ` + zle.join("\n      ")); }
      else {
        const prva = "lišta obrázka v stĺpci dosiahnuteľná, stĺpce v stĺpci, stĺpce z kapitoly = ten istý blok (lišta, hranica, krok späť, písanie, návrat), prepínače stĺpcov (spodky, obrázky rovnako vysoké, zvislo), krok späť/znova, presun ťahaním (aj do stĺpca), orezanie, blok rozšírenie, rad obrázkov na stĺpce";
        const druha = "písanie (Enter, Backspace, klik počas písania, šípky, „- “, „/“, vloženie odsekov, upratanie prázdneho odseku), mriežka (zlúčenie, rozdelenie), box na okraji napojený, miesto po obnovení stránky drží, Ctrl+E drží čítané miesto";
        console.log((EP ? "editor (" + EP + "/2): " : "editor: ") + (EP === 1 ? prva : EP === 2 ? druha : prva + ", " + druha) + " – ok");
        if (!EP) { try { fs.writeFileSync(EDITOR_OK, editorHash()); } catch (e) {} }   // pri delenej skúške ho zapíše rozdel()
      }
    }

    if (CAST) console.log("__RZ__ " + chyb);   // počet chýb časti pre hlavný beh (rozdel)
    else console.log(chyb ? `\nrozloženie: ${chyb} chýb (${stranky.length} strán × ${SIRKY.length} šírky)` : `rozloženie: ok (${stranky.length} strán × ${SIRKY.length} šírky)`);
    if (chyb) process.exitCode = 1;
  } catch (e) {
    console.log("rozloženie: kontrola sa nedá spustiť – " + e.message + (process.env.RZ_STACK ? "\n" + e.stack : ""));
    process.exitCode = 2;
  } finally {
    try { ws && ws.close(); } catch (e) {}
    try { chrome.kill(); } catch (e) {}
    setTimeout(() => { try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} process.exit(process.exitCode || 0); }, 500);
  }
})();

#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/schemy.js — kontrola vlastných schém (SVG) v skutočnom prehliadači (headless Chrome, bez knižníc)

   Zdieľaný súbor všetkých kníh (KNIHY-CORE) – v knihe ho nemeň.

   Prečo (pripomienky autora 31. 10. – 1. 11. 2026, PATOLA kap. 10): text presahoval za okraj schémy („poškodenie DNA“
   orezané vpravo), okraje boli nerovnaké (vľavo 15, vpravo 0), prerušovaná čiara išla cez popis, šípka cez rámček,
   slovo „napodobní“ ležalo cez dva bloky, hrot šípky sedel hneď za ohybom. Build ani rozlozenie.js to nevidia –
   schéma sa „zmestí“, len je zle nakreslená. Tento nástroj každú schému premeria tak, ako ju prehliadač naozaj
   vykreslí (so štýlom kapitoly a skutočnou šírkou písma).

   Kontroly (každá = CHYBA, kód 1):
     • presah     – text alebo tvar siaha za viewBox (orezané písmeno)
     • okraje     – obsah nie je od okraja rovnako ďaleko (rozdiel > 14 jednotiek) alebo sa okraja dotýka (< 4)
     • text×text  – dva popisy sa prekrývajú
     • text×rámček – popis leží cez hranu rámčeka (časť dnu, časť von)
     • čiara×text – čiara alebo šípka prechádza cez popis
     • čiara×rámček – čiara prechádza cez rámček, z ktorého nevychádza a do ktorého nevedie
     • hrot       – šípka sa láme menej než 14 jednotiek pred hrotom (hrot „visí“ za ohybom) alebo je kratšia než 10
     • tesno      – popis sa rámčeka nedotýka, ale je k nemu bližšie než 4 (nad, pod, vedľa), alebo sa dotýka čiary
                    (pripomienka autora 7. 11. 2026, PATOLA kap. 11: „len pri zhubnom“ nalepené pod rámčekom – „nech to
                    algoritmus pri takých prípadoch kúsok natiahne, aby tam bolo miesto“). --fix schému v tom mieste
                    ROZTIAHNE: všetko za rezom (nižšie / vpravo) posunie, rámček a čiaru cez rez predĺži, viewBox zväčší;
                    potom sám spustí build a premeria znova (najviac 5 kôl). Graf (os, krivky) a schéma s výrezmi
                    (schema.js) sa neroztiahne – oprav ručne. Pri novej schéme preto: kresli, spusti --fix, pozri snímku.
   Výnimka pre jeden prvok: atribút data-kontrola="nie" (napr. zámerne prekrytý popis na podklade).

     node tools/schemy.js                všetky kapitoly (chapters/*.html – spusti po builde)
     node tools/schemy.js 10 11          len vybrané kapitoly
     node tools/schemy.js --zmenene      len kapitoly, ktorých .md/.html git hlási ako zmenené
     node tools/schemy.js --fix …        navyše opraví, čo sa dá strojovo, priamo v chapters/fig/*.svg: „tesno“ roztiahnutím
                                         schémy, okraje orezaním viewBoxu na obsah + rovnaký okraj (PAD); build spustí sám.
                                         Ostatné chyby (prekryv, čiara cez text, hrot) treba opraviť ručne
     node tools/schemy.js --zapis-zname  súčasné chyby zapíše ako známe (pracovne/schemy-zname.txt) – staršie knihy;
                                         bežný beh ich len vypíše, zastaví na novej chybe; --prisne zastaví na všetkých
                                         (zverejni.ps1). Známe chyby sa opravujú postupne, pred zverejnením musia zmiznúť.
   Kód 0 = ok · 1 = chyba · 2 = kontrola sa nedala spustiť (chýba Chrome) – publish.ps1 ho vtedy preskočí.
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const ROOT = process.env.KNIHA_ROOT ? path.resolve(process.env.KNIHA_ROOT) : path.resolve(__dirname, "..");
const CH = path.join(ROOT, "chapters");
const FIG = path.join(CH, "fig");
const argv = process.argv.slice(2);
const FIX = argv.includes("--fix");
// --detail: pri každej chybe aj súradnice (viewBox) – pomôcka na ručnú opravu schémy
const DETAIL = argv.includes("--detail");
// Rohatka pre staršie knihy: --zapis-zname zapíše súčasné chyby do pracovne/schemy-zname.txt; bežná kontrola
// (publish.ps1) ich potom len vypíše a zastaví sa až na NOVEJ chybe; --prisne (zverejni.ps1) zastaví na všetkých.
const PRISNE = argv.includes("--prisne"), ZAPIS = argv.includes("--zapis-zname");
const ZNAME_F = path.join(ROOT, "pracovne", "schemy-zname.txt");
// kľúč známej chyby bez nameranej hodnoty („medzera 0.3“) – drobná zmena čísla nesmie zo starej chyby urobiť novú
const ZKLUC = (l) => l.replace(/ ?\(medzera [^)]*\)/, "");
const ZNAME = new Set(!ZAPIS && fs.existsSync(ZNAME_F) ? fs.readFileSync(ZNAME_F, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")).map(ZKLUC) : []);
const zapis = [];
let znamych = 0;
const PAD = 12;          // okraj okolo obsahu po orezaní (jednotky viewBoxu)
const OKRAJ_ROZDIEL = 14;
const OKRAJ_MIN = 4;
const HROT = 10;
const TESNO = 4;        // popis × rámček: najmenšia medzera (jednotky viewBoxu, písmo bez horného a dolného vzduchu)
const TESNO_L = 0.8;    // popis × čiara: len „nedotýka sa“ (popis nad čiarou stromu je zámerne blízko)

function zoznam() {
  const vsetky = fs.existsSync(CH) ? fs.readdirSync(CH).filter((f) => /^\d.*\.html$/.test(f)).sort() : [];
  const ciele = argv.filter((a) => !a.startsWith("--"));
  if (argv.includes("--zmenene")) {
    let st = "";
    try { st = cp.execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" }); } catch (e) {}
    const zm = st.split("\n").map((l) => l.slice(3).trim().replace(/^"|"$/g, "")).filter(Boolean);
    const stems = new Set(zm.filter((f) => /^chapters\/[^/_][^/]*\.(md|html)$/.test(f)).map((f) => path.basename(f).replace(/\.(md|html)$/, "")));
    return vsetky.filter((f) => stems.has(f.replace(/\.html$/, ""))).map((f) => path.join(CH, f));
  }
  return (ciele.length ? vsetky.filter((f) => ciele.some((c) => f.startsWith(c))) : vsetky).map((f) => path.join(CH, f));
}

// beží na stránke: pre každú schému vráti zoznam chýb a obdĺžnik obsahu
const MERANIE = `(() => {
  const TESNO = ${TESNO}, TESNO_L = ${TESNO_L}, OKRAJ_ROZDIEL = ${OKRAJ_ROZDIEL}, OKRAJ_MIN = ${OKRAJ_MIN}, HROT = ${HROT}, DETAIL = ${DETAIL};
  const R = (b) => DETAIL ? " [" + [b.x1, b.y1, b.x2, b.y2].map((n) => n.toFixed(0)).join(",") + "]" : "";
  const D = (e) => DETAIL ? " {" + (e.getAttribute("d") || ["x1","y1","x2","y2","points"].map((a) => e.getAttribute(a)).filter((v) => v != null).join(" ")).slice(0, 90) + "}" : "";
  const svgs = Array.from(document.querySelectorAll("figure.chart > svg"));
  const out = [];
  const visible = (e) => { for (let p = e; p && p.tagName && p.tagName.toLowerCase() !== "svg"; p = p.parentNode) {
      const s = getComputedStyle(p); if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") return false;
      if (p.getAttribute && p.getAttribute("data-kontrola") === "nie") return false; } return true; };
  const inDefs = (e) => !!e.closest("defs,marker,symbol,clipPath,mask,pattern");
  // vzorec molekuly (vzorce.js): väzby sa dotýkajú značiek atómov zámerne – kreslí ho jeden nástroj, kontroluje sa tam
  const inMol = (e) => !!e.closest("g.mol");
  for (const svg of svgs) {
    const fig = svg.closest("figure");
    const name = fig.id || "?";
    // schéma s rozkladacími výrezmi (schema.js) má viewBox predĺžený o skryté výrezy – pôvodný je v data-vb
    const dvb = (svg.getAttribute("data-vb") || "").trim().split(/[\\s,]+/).map(Number);
    const vb = dvb.length === 4 && dvb.every((n) => !isNaN(n)) ? { x: dvb[0], y: dvb[1], width: dvb[2], height: dvb[3] } : svg.viewBox.baseVal;
    const err = [];
    const box = (e) => { const b = e.getBBox(); const m = e.getCTM(), r = svg.getCTM();
      // do súradníc viewBoxu: CTM prvku relatívne k CTM svg
      const k = r.inverse().multiply(m);
      const pts = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(k));
      const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
      return { x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) }; };
    const ptIn = (e) => { const r = svg.getCTM(); const k = r.inverse().multiply(e.getCTM()); return (x, y) => new DOMPoint(x, y).matrixTransform(k); };
    const txt = (e) => (e.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 40);
    // rámček písma (getBBox) je vyšší než písmená – riadky jedného popisu by sa „prekrývali“; pracuje sa s výškou písmen
    // (o zlomok veľkosti písma, nie výšky – zalomený text má viac riadkov)
    const tight = (b, e) => { const f = parseFloat(getComputedStyle(e).fontSize) || 10; return { x1: b.x1, y1: b.y1 + 0.22 * f, x2: b.x2, y2: b.y2 - 0.18 * f }; };
    const texts = Array.from(svg.querySelectorAll("text")).filter((e) => !inDefs(e) && !inMol(e) && visible(e) && txt(e)).map((e) => ({ e, b: tight(box(e), e), t: txt(e) }));
    const shapes = Array.from(svg.querySelectorAll("rect,circle,ellipse,polygon")).filter((e) => !inDefs(e) && visible(e)).map((e) => ({ e, b: box(e) }));
    const lines = Array.from(svg.querySelectorAll("path,line,polyline")).filter((e) => !inDefs(e) && !inMol(e) && visible(e) && !/^(none|transparent|rgba\\(0, 0, 0, 0\\))$/.test(getComputedStyle(e).stroke)).map((e) => ({ e, b: box(e) }));
    const molParts = Array.from(svg.querySelectorAll("g.mol text, g.mol path, g.mol line")).filter((e) => !inDefs(e) && visible(e)).map((e) => ({ e, b: box(e) }));
    const all = texts.concat(shapes, lines, molParts).filter((o) => o.b.x2 - o.b.x1 > 0 || o.b.y2 - o.b.y1 > 0);
    if (!all.length) continue;
    const c = { x1: Math.min(...all.map((o) => o.b.x1)), y1: Math.min(...all.map((o) => o.b.y1)), x2: Math.max(...all.map((o) => o.b.x2)), y2: Math.max(...all.map((o) => o.b.y2)) };
    // presah za viewBox
    for (const o of texts) if (o.b.x1 < vb.x - 0.5 || o.b.y1 < vb.y - 0.5 || o.b.x2 > vb.x + vb.width + 0.5 || o.b.y2 > vb.y + vb.height + 0.5)
      err.push("presah: text „" + o.t + "“ siaha za okraj schémy");
    const ok = { l: c.x1 - vb.x, t: c.y1 - vb.y, r: vb.x + vb.width - c.x2, b: vb.y + vb.height - c.y2 };
    const vals = [ok.l, ok.t, ok.r, ok.b];
    if (Math.min(...vals) < OKRAJ_MIN || Math.max(...vals) - Math.min(...vals) > OKRAJ_ROZDIEL)
      err.push("okraje: vľavo " + ok.l.toFixed(0) + ", hore " + ok.t.toFixed(0) + ", vpravo " + ok.r.toFixed(0) + ", dole " + ok.b.toFixed(0) + " (oprava: --fix)");
    const inter = (a, b, s) => Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1) > s && Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1) > s;
    const contains = (o, i, t) => i.x1 >= o.x1 - t && i.y1 >= o.y1 - t && i.x2 <= o.x2 + t && i.y2 <= o.y2 + t;
    // text × text
    for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++)
      if (inter(texts[i].b, texts[j].b, 1)) err.push("text×text: „" + texts[i].t + "“ × „" + texts[j].t + "“" + R(texts[i].b) + R(texts[j].b));
    // rámčeky: obdĺžniky, ktoré v sebe nemajú iný obdĺžnik (pozadie oblasti nie je rámček)
    const W = vb.width * vb.height;
    // pásmo (podfarbená oblasť cez väčšinu výšky alebo šírky) nie je rámček
    const VH = vb.height, VW = vb.width;
    const rects = shapes.filter((s) => { const w = s.b.x2 - s.b.x1, h = s.b.y2 - s.b.y1;
      // úzky zvislý pás (membrána mitochondrie, bunky) nie je rámček: šípky a popisy transportu cez ňu idú zámerne (6. 11. 2026)
      if (w <= 24 && h > 6 * w) return false;
      return s.e.tagName.toLowerCase() === "rect" && w * h < 0.15 * W && w > 16 && h > 12 && h < 0.6 * VH && w < 0.75 * VW; });
    // rámček nesie len text; obdĺžnik s kresbou vnútri (bunky, iné obdĺžniky) je pozadie oblasti
    const others = shapes.filter((o) => o.e.tagName.toLowerCase() !== "rect");
    const frames = rects.filter((s) => !rects.some((o) => o !== s && contains(s.b, o.b, 0)) && !others.some((o) => contains(s.b, o.b, 0)));
    // text × hrana rámčeka
    for (const t of texts) for (const f of frames) {
      if (!inter(t.b, f.b, 1.5)) continue;
      if (contains(f.b, t.b, 1)) continue;
      if (contains(t.b, f.b, 0)) continue;   // podklad pod textom (halo)
      err.push("text×rámček: „" + t.t + "“ leží cez hranu rámčeka" + R(t.b) + R(f.b));
    }
    // čiary
    for (const l of lines) {
      const e = l.e; let len = 0;
      try { len = e.getTotalLength(); } catch (x) { continue; }
      if (!len) continue;
      const tr = ptIn(e);
      const P = []; const step = 2;
      for (let s = 0; s <= len; s += step) { const p = e.getPointAtLength(s); P.push(tr(p.x, p.y)); }
      const last = e.getPointAtLength(len); P.push(tr(last.x, last.y));
      const A = P[0], Z = P[P.length - 1];
      const tenka = (parseFloat(getComputedStyle(e).strokeWidth) || 1) <= 1.6;
      for (const t of texts) {
        // popis s bielym lemom (.lem), nakreslený ZA tenkou čiarou, ju zakryje – to je v poriadku
        const ts = getComputedStyle(t.e);
        if (tenka && ts.paintOrder.startsWith("stroke") && (parseFloat(ts.strokeWidth) || 0) >= 3 &&
            (e.compareDocumentPosition(t.e) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
        const b = { x1: t.b.x1 + 1, y1: t.b.y1, x2: t.b.x2 - 1, y2: t.b.y2 };
        if (P.some((p) => p.x > b.x1 && p.x < b.x2 && p.y > b.y1 && p.y < b.y2)) err.push("čiara×text: čiara prechádza cez „" + t.t + "“" + R(t.b) + D(e));
      }
      const near = (p, b, tol) => p.x >= b.x1 - tol && p.x <= b.x2 + tol && p.y >= b.y1 - tol && p.y <= b.y2 + tol;
      for (const f of frames) {
        if (near(A, f.b, 6) || near(Z, f.b, 6)) continue;
        const b = { x1: f.b.x1 + 3, y1: f.b.y1 + 3, x2: f.b.x2 - 3, y2: f.b.y2 - 3 };
        if (P.some((p) => p.x > b.x1 && p.x < b.x2 && p.y > b.y1 && p.y < b.y2)) {
          const ft = texts.find((t) => contains(f.b, t.b, 1));
          err.push("čiara×rámček: čiara ide cez rámček" + (ft ? " „" + ft.t + "“" : "") + R(f.b) + D(e));
        }
      }
      const me = e.getAttribute("marker-end") || getComputedStyle(e).markerEnd;
      if (me && me !== "none") {
        if (len < HROT) err.push("hrot: šípka je kratšia než " + HROT + " (" + len.toFixed(0) + ")" + D(e));
        else if (!/[CcQqSsTtAa]/.test(e.getAttribute("d") || "")) {   // oblúk je zámerný; láme sa len lomená čiara
          const p0 = e.getPointAtLength(len - HROT), p1 = e.getPointAtLength(len - HROT / 2), p2 = e.getPointAtLength(len);
          const a1 = Math.atan2(p1.y - p0.y, p1.x - p0.x), a2 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
          let d = Math.abs(a1 - a2); if (d > Math.PI) d = 2 * Math.PI - d;
          if (d > 0.35) err.push("hrot: šípka sa láme tesne pred hrotom (posledný rovný úsek < " + HROT + ")" + D(e));
        }
      }
    }
    // ── tesno (pripomienka autora 7. 11. 2026, PATOLA kap. 11: „len pri zhubnom“ nalepené tesne pod rámčekom).
    // Popis sa rámčeka nedotýka, ale je k nemu bližšie než TESNO; alebo sa dotýka čiary (bližšie než TESNO_L).
    // Každý nález nesie návrh, kde schému roztiahnuť (os, rez v súradniciach viewBoxu, o koľko) – použije ho --fix.
    // Popis nad čiarou stromu (MIKRA) sedí zámerne blízko – preto je prah pri čiarách len „dotýka sa“.
    const ovl = (a1, a2, b1, b2) => Math.min(a2, b2) - Math.max(a1, b1);
    const tes = [];
    const tesno = (t, g, min, os, rez, popis, rovna) => {
      if (g >= min - 0.05) return;
      tes.push({ os, rez, d: Math.ceil(min - g + 0.5), rovna });
      err.push("tesno: „" + t.t + "“ " + popis + " (medzera " + g.toFixed(1) + ", treba aspoň " + min + "; oprava: --fix)" + R(t.b));
    };
    for (const t of texts) for (const f of frames) {
      if (contains(f.b, t.b, 1) || inter(t.b, f.b, 1.5)) continue;   // popis v rámčeku / cez hranu (to hlási text×rámček)
      if (ovl(t.b.x1, t.b.x2, f.b.x1, f.b.x2) > 2) {
        if (t.b.y1 >= f.b.y2 - 1.5) tesno(t, t.b.y1 - f.b.y2, TESNO, "y", Math.max(f.b.y2 + 0.05, (f.b.y2 + t.b.y1) / 2), "tesne pod rámčekom", true);
        else if (t.b.y2 <= f.b.y1 + 1.5) tesno(t, f.b.y1 - t.b.y2, TESNO, "y", Math.min(f.b.y1 - 0.05, (t.b.y2 + f.b.y1) / 2), "tesne nad rámčekom", true);
      } else if (ovl(t.b.y1, t.b.y2, f.b.y1, f.b.y2) > 2) {
        if (t.b.x1 >= f.b.x2 - 1.5) tesno(t, t.b.x1 - f.b.x2, TESNO, "x", Math.max(f.b.x2 + 0.05, (f.b.x2 + t.b.x1) / 2), "tesne vpravo od rámčeka", true);
        else if (t.b.x2 <= f.b.x1 + 1.5) tesno(t, f.b.x1 - t.b.x2, TESNO, "x", Math.min(f.b.x1 - 0.05, (t.b.x2 + f.b.x1) / 2), "tesne vľavo od rámčeka", true);
      }
    }
    for (const l of lines) {
      const e = l.e; let len = 0;
      try { len = e.getTotalLength(); } catch (x) { continue; }
      if (!len) continue;
      const tr = ptIn(e); const P = [];
      for (let s = 0; s <= len; s += 1) { const p = e.getPointAtLength(s); P.push(tr(p.x, p.y)); }
      const sw = (parseFloat(getComputedStyle(e).strokeWidth) || 1) / 2;
      const tenka = sw <= 0.8;
      const rovna = e.tagName.toLowerCase() !== "path" || !/[CcQqSsTtAa]/.test(e.getAttribute("d") || "");
      for (const t of texts) {
        const ts = getComputedStyle(t.e);
        if (tenka && ts.paintOrder.startsWith("stroke") && (parseFloat(ts.strokeWidth) || 0) >= 3 &&
            (e.compareDocumentPosition(t.e) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
        let best = null;
        const cand = (g, os, rez, kde) => { if (!best || g < best.g) best = { g, os, rez, kde }; };
        for (const p of P) {
          if (p.x > t.b.x1 && p.x < t.b.x2) {
            if (p.y >= t.b.y2) cand(p.y - sw - t.b.y2, "y", (t.b.y2 + p.y - sw) / 2, "pod");
            else if (p.y <= t.b.y1) cand(t.b.y1 - p.y - sw, "y", (p.y + sw + t.b.y1) / 2, "nad");
          } else if (p.y > t.b.y1 && p.y < t.b.y2) {
            if (p.x >= t.b.x2) cand(p.x - sw - t.b.x2, "x", (t.b.x2 + p.x - sw) / 2, "vpravo od");
            else if (p.x <= t.b.x1) cand(t.b.x1 - p.x - sw, "x", (p.x + sw + t.b.x1) / 2, "vľavo od");
          }
        }
        if (best && best.g >= 0) tesno(t, best.g, TESNO_L, best.os, best.rez, "– čiara " + best.kde + " popisu sa ho dotýka" + D(e), rovna);
      }
    }
    out.push({ name, err: Array.from(new Set(err)), c, vb: [vb.x, vb.y, vb.width, vb.height], tes });
  }
  return out;
})()`;

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SCHEMA_TAGS = /<(mol|uzol|rx|vplyv|legenda|plus|vyrez)\b/;
const r1 = (n) => Math.round(n * 10) / 10;

/* ── roztiahnutie schémy (--fix pri „tesno“, 7. 11. 2026) ──────────────────────────────────────────────────────
   Všetko, čo leží za rezom (os y: nižšie, os x: vpravo), sa posunie o d; rámček, cez ktorý rez prechádza, sa o d predĺži;
   čiara, ktorá rezom prechádza, sa natiahne (jej body pred rezom ostanú, za ním sa posunú). viewBox sa predĺži.
   Pracuje priamo s textom chapters/fig/*.svg (formát súboru ostane; menia sa len čísla, ktoré sa naozaj posunú).
   Nevie: transformácie okrem translate na <g> a rotate(uhol x y) – vtedy vyhodí chybu a schému treba upraviť ručne. */
const fmt = (n) => String(Math.round(n * 100) / 100);
const NUM = /-?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g;
function cestaAbs(d) {
  // d → [{c, p:[absolútne čísla]}]; relatívne príkazy prevedie na absolútne
  // príznaky oblúka (A rx ry rot príznak príznak x y) smú byť zlepené („0 01 10“) – čítajú sa po jednej číslici
  const tok = []; let j = 0, cmdA = null, ixA = 0;
  const NR = /^[\s,]*(-?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?)/;
  while (j < d.length) {
    const z = d.slice(j); const c = z.match(/^[\s,]*([MmLlHhVvCcSsQqTtAaZz])/);
    if (c) { tok.push(c[1]); j += c[0].length; cmdA = /[Aa]/.test(c[1]); ixA = 0; continue; }
    if (cmdA && (ixA % 7 === 3 || ixA % 7 === 4)) { const fl = z.match(/^[\s,]*([01])/); if (!fl) throw new Error("cesta sa nedá prečítať"); tok.push(fl[1]); j += fl[0].length; ixA++; continue; }
    const n = z.match(NR); if (!n) { if (/^[\s,]*$/.test(z)) break; throw new Error("cesta sa nedá prečítať"); }
    tok.push(n[1]); j += n[0].length; ixA++;
  }
  const N = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
  const out = []; let i = 0, cmd = null, cx = 0, cy = 0, sx = 0, sy = 0;
  while (i < tok.length) {
    if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
    else if (!cmd) throw new Error("cesta bez príkazu");
    const C = cmd.toUpperCase(), rel = cmd !== C, n = N[C];
    if (C === "Z") { out.push({ c: "Z", p: [] }); cx = sx; cy = sy; cmd = null; continue; }
    const a = tok.slice(i, i + n).map(Number); i += n;
    if (a.length < n || a.some(isNaN)) throw new Error("cesta sa nedá prečítať");
    let p;
    if (C === "H") { p = [rel ? cx + a[0] : a[0]]; cx = p[0]; }
    else if (C === "V") { p = [rel ? cy + a[0] : a[0]]; cy = p[0]; }
    else if (C === "A") { p = a.slice(0, 5).concat([rel ? cx + a[5] : a[5], rel ? cy + a[6] : a[6]]); cx = p[5]; cy = p[6]; }
    else { p = a.map((v, k) => (rel ? v + (k % 2 ? cy : cx) : v)); cx = p[n - 2]; cy = p[n - 1]; }
    out.push({ c: C, p });
    if (C === "M") { sx = cx; sy = cy; cmd = rel ? "l" : "L"; }
  }
  return out;
}
function cestaText(P) {
  return P.map((s) => {
    if (!s.p.length) return s.c;
    if (s.c === "H" || s.c === "V") return s.c + fmt(s.p[0]);
    if (s.c === "A") return "A" + s.p.slice(0, 5).map(fmt).join(" ") + " " + fmt(s.p[5]) + "," + fmt(s.p[6]);
    const dvojice = []; for (let k = 0; k < s.p.length; k += 2) dvojice.push(fmt(s.p[k]) + "," + fmt(s.p[k + 1]));
    return s.c + dvojice.join(" ");
  }).join(" ");
}
function roztiahni(raw, os, rez, d) {
  const XS = os === "x" ? ["x", "x1", "x2", "cx", "fx"] : ["y", "y1", "y2", "cy", "fy"];
  const DLZ = os === "x" ? "width" : "height", POZ = os === "x" ? "x" : "y";
  const SKIP = /^(defs|marker|clipPath|mask|pattern|symbol|style|title|desc|linearGradient|radialGradient|filter|script)$/;
  const BOX = /^(rect|image|foreignObject|use)$/;
  const stack = [0]; let skip = 0, root = true;
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  return raw.replace(re, (m, zav, tag, attrs, sam) => {
    if (m.startsWith("<!--") || !tag) return m;
    if (zav) { if (SKIP.test(tag)) { if (skip) skip--; } else if (tag === "g" && !skip) stack.pop(); return m; }
    if (skip) { if (SKIP.test(tag) && !sam) skip++; return m; }
    if (SKIP.test(tag)) { if (!sam) skip++; return m; }
    const o = stack[stack.length - 1];
    const f = (v) => (v + o > rez ? v + d : v);
    const A = {};
    // hodnota so vzorcom schema.js („{pal.C3.x}“) sa počíta z kotvy, ktorá sa posunie sama – nemení sa
    attrs.replace(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, (_, k, v1, v2) => { const v = v1 != null ? v1 : v2; if (!/[{}]/.test(v)) A[k] = v; return _; });
    const nove = {};
    if (tag === "svg") {
      if (root) {
        root = false;
        for (const k of ["viewBox", "data-vb"]) if (A[k]) {
          const v = A[k].trim().split(/[\s,]+/).map(Number);
          const i = os === "x" ? 0 : 1, z = v[i] + v[i + 2];
          if (z > rez) { v[i + 2] = z + d - v[i]; nove[k] = v.map(fmt).join(" "); }
        }
      } else throw new Error("vnorené <svg>");
    } else {
      let tx = 0;
      if (A.transform) {
        const t = A.transform.trim();
        const tm = t.match(/^translate\(\s*(-?[\d.]+)(?:[\s,]+(-?[\d.]+))?\s*\)$/);
        const rm = t.match(/^rotate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+(-?[\d.]+)\s*\)$/);
        if (tm && tag === "g") tx = +(os === "x" ? tm[1] : tm[2] || 0);
        else if (rm) {
          const c = [+rm[2], +rm[3]], i = os === "x" ? 0 : 1, n = f(c[i]);
          if (n !== c[i]) { c[i] = n; nove.transform = `rotate(${rm[1]} ${fmt(c[0])} ${fmt(c[1])})`; }
        } else throw new Error(`<${tag} transform="${t}"> – roztiahnuť sa dá len translate na <g> a rotate(uhol x y)`);
      }
      const box = BOX.test(tag) && A[POZ] != null && A[DLZ] != null && !/%/.test(A[POZ] + A[DLZ]);
      if (box) {
        const a = +A[POZ], b = a + +A[DLZ], na = f(a), nb = f(b);
        if (na !== a) nove[POZ] = fmt(na);
        if (nb - na !== b - a) nove[DLZ] = fmt(nb - na);
      }
      for (const k of XS) {
        if (A[k] == null || (box && k === POZ) || /%/.test(A[k])) continue;
        const nv = A[k].replace(NUM, (n) => fmt(f(+n)));
        if (A[k].replace(NUM, (n) => fmt(+n)) !== nv) nove[k] = nv;
      }
      if (A.points != null) {
        let k = 0;
        const nv = A.points.replace(NUM, (n) => { const moj = k++ % 2 === (os === "x" ? 0 : 1); return fmt(moj ? f(+n) : +n); });
        if (A.points.replace(NUM, (n) => fmt(+n)) !== nv) nove.points = nv;
      }
      if (tag === "path" && A.d) {
        const P = cestaAbs(A.d); let zmena = false;
        for (const s of P) {
          const ix = s.c === "H" ? (os === "x" ? [0] : []) : s.c === "V" ? (os === "y" ? [0] : []) : s.c === "A" ? [os === "x" ? 5 : 6]
            : s.p.map((_, k) => k).filter((k) => k % 2 === (os === "x" ? 0 : 1));
          for (const k of ix) { const n = f(s.p[k]); if (n !== s.p[k]) { s.p[k] = n; zmena = true; } }
        }
        if (zmena) nove.d = cestaText(P);
      }
      if (tag === "g" && !sam) stack.push(o + tx);
    }
    if (!Object.keys(nove).length) return m;
    let na = attrs;
    for (const [k, v] of Object.entries(nove)) {
      const r = new RegExp("(\\s" + k.replace(/-/g, "\\-") + "\\s*=\\s*)(\"[^\"]*\"|'[^']*')");
      na = na.replace(r, (_, a1) => a1 + '"' + v + '"');
    }
    return "<" + tag + na + (sam ? "/" : "") + ">";
  });
}
if (process.env.SCHEMY_TEST_ROZTIAHNI) { module.exports = { roztiahni, cestaAbs, cestaText }; return; }

(async () => {
  const stranky = zoznam();
  if (!stranky.length) { console.log("schémy: nie je čo kontrolovať"); return; }
  if (!CHROME || typeof WebSocket === "undefined") {
    console.log("schémy: kontrola sa nedá spustiť (" + (!CHROME ? "chýba Chrome" : "Node bez WebSocket – treba Node 22+") + ")");
    process.exitCode = 2; return;
  }
  const port = 9800 + Math.floor(Math.random() * 150);
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "kn-schemy-"));
  const chrome = cp.spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "--no-first-run",
    "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--disable-extensions", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
  let ws, chyb = 0, schem = 0, opravene = 0, roztiahnute = 0;
  try {
    let tg;
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
    await send("Network.setBlockedURLs", { urls: ["*/admin/admintools.js", "*/admin/html2canvas.min.js"] });
    await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
    // premeria stránky; vráti Map meno schémy → { meno stránky, súbor stránky, výsledok }
    const meraj = async (zoz) => {
      const vys = new Map();
      for (const f of zoz) {
        const hotovo = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url: "file:///" + f.replace(/\\/g, "/") });
        await Promise.race([hotovo, sleep(15000)]);
        await sleep(900);   // písmo
        const r = await send("Runtime.evaluate", { expression: MERANIE, returnByValue: true });
        const v = r.result && r.result.result && r.result.result.value;
        if (!v) { console.log(`  ? ${path.basename(f)}: meranie zlyhalo`); continue; }
        for (const s of v) if (!vys.has(s.name)) vys.set(s.name, { meno: path.basename(f), f, s });
      }
      return vys;
    };
    const vys = await meraj(stranky);
    // --fix: okraje (orezanie viewBoxu) a tesno (roztiahnutie); po zmene build a nové meranie, najviac 5 kôl
    const tesnoKluc = (s) => s.err.filter((e) => /^tesno: /.test(e)).map((e) => e.replace(/\(medzera [^)]*\)/, "")).sort().join(" | ");
    const nepomohlo = new Set();
    for (let kolo = 1; FIX && kolo <= 5; kolo++) {
      const zmenene = new Set(), pred = new Map();
      for (const [name, x] of vys) {
        const s = x.s, src = path.join(FIG, name + ".svg");
        if (!fs.existsSync(src)) continue;
        const raw = fs.readFileSync(src, "utf8");
        // schéma z tools/kresli.js sa pri builde prepíše – opravuje sa jej popis (.kresba.json) alebo generátor, nie SVG
        if (raw.includes("vygenerované nástrojom tools/kresli.js")) {
          if (kolo === 1 && s.err.length) console.log(`  · ${name}: vygenerovaná (tools/kresli.js) – oprav ${name}.kresba.json alebo generátor, nie SVG`);
          continue;
        }
        if (s.err.some((e) => /^tesno: /.test(e)) && !nepomohlo.has(name)) {
          // značky schema.js (<uzol x y>, <mol x y>) nesú stred – posunú sa rovnako; výrezy (<vyrez>) majú vlastný viewBox
          if (/<vyrez/.test(raw)) { if (kolo === 1) console.log(`  · ${name}: schéma s výrezmi (schema.js) – „tesno“ oprav ručne`); }
          else if (/class="(?:[^"]*\s)?(?:ser|ax|grid|tick)[\s"]/.test(raw)) { if (kolo === 1) console.log(`  · ${name}: graf (os, krivka) – roztiahnutím by sa pokazila mierka; „tesno“ oprav ručne`); }
          else {
            // rezy od posledného k prvému (vzdialenejší rez neposúva bližší); blízke rezy na tej istej osi sa zlúčia
            const rezy = [];
            for (const t of s.tes.filter((t) => t.rovna)) {
              const r = rezy.find((q) => q.os === t.os && Math.abs(q.rez - t.rez) < 1);
              if (r) r.d = Math.max(r.d, t.d); else rezy.push({ ...t });
            }
            rezy.sort((a, b) => b.rez - a.rez);
            if (!rezy.length && kolo === 1) console.log(`  · ${name}: popis sa dotýka oblúka (krivky) – oprav ručne`);
            try {
              let nraw = raw;
              for (const r of rezy) nraw = roztiahni(nraw, r.os, r.rez, r.d);
              if (nraw !== raw) {
                pred.set(name, { raw, kluc: tesnoKluc(s), f: x.f });
                fs.writeFileSync(src, nraw); zmenene.add(x.f); roztiahnute++;
                console.log(`  ↕ ${name}: roztiahnuté ` + rezy.map((r) => `${r.os} > ${r1(r.rez)} o ${r.d}`).join(", "));
                continue;   // okraje sa premerajú v ďalšom kole
              }
            } catch (e) { if (kolo === 1) console.log(`  · ${name}: roztiahnuť sa nedá (${e.message}) – oprav ručne`); }
          }
        }
        if (s.err.some((e) => /^(okraje|presah: )/.test(e))) {
          if (/<vyrez/.test(raw)) { if (kolo === 1) console.log(`  · ${name}: schéma s výrezmi (schema.js) – viewBox uprav ručne`); continue; }
          const nv = [r1(s.c.x1 - PAD), r1(s.c.y1 - PAD), r1(s.c.x2 - s.c.x1 + 2 * PAD), r1(s.c.y2 - s.c.y1 + 2 * PAD)].join(" ");
          const nraw = raw.replace(/(<svg\b[^>]*?\bviewBox=")[^"]*(")/, `$1${nv}$2`);
          if (nraw !== raw) { fs.writeFileSync(src, nraw); opravene++; zmenene.add(x.f); console.log(`  ↻ ${name}: viewBox ${s.vb.map(r1).join(" ")} → ${nv}`); }
        }
      }
      if (!zmenene.size) break;
      // schéma je v HTML vložená buildom – build, potom nové meranie zmenených stránok
      const b = cp.spawnSync(process.execPath, [path.join(ROOT, "tools", "build.js")], { cwd: ROOT, encoding: "utf8" });
      if (b.status) { console.log("  ✖ build po oprave schém zlyhal – spusti node tools/build.js"); process.exitCode = 1; break; }
      const nove = await meraj([...zmenene]);
      for (const [k, v] of nove) vys.set(k, v);
      // roztiahnutie, po ktorom ostali tie isté nálezy „tesno“ (popis sa posunul spolu s čiarou – napr. popis šípky
      // v schema.js), sa vráti späť a schéma sa nahlási na ručnú opravu
      const vratit = [...pred].filter(([k, p]) => vys.has(k) && tesnoKluc(vys.get(k).s) === p.kluc);
      if (vratit.length) {
        for (const [k, p] of vratit) { fs.writeFileSync(path.join(FIG, k + ".svg"), p.raw); nepomohlo.add(k); roztiahnute--; console.log(`  ↺ ${k}: roztiahnutie nepomohlo (popis sa posúva spolu s čiarou) – vrátené, oprav ručne`); }
        const b2 = cp.spawnSync(process.execPath, [path.join(ROOT, "tools", "build.js")], { cwd: ROOT, encoding: "utf8" });
        if (b2.status) { console.log("  ✖ build po vrátení zlyhal – spusti node tools/build.js"); process.exitCode = 1; break; }
        const nove2 = await meraj([...new Set(vratit.map(([, p]) => p.f))]);
        for (const [k, v] of nove2) vys.set(k, v);
      }
    }
    for (const [name, x] of vys) {
      const s = x.s, meno = x.meno; schem++;
      const err = s.err;
      // známe chyby (pracovne/schemy-zname.txt): vypíšu sa, ale bez --prisne nezastavia – nová chyba áno
      const nove = err.filter((e) => !ZNAME.has(ZKLUC(name + " | " + e)));
      const stare = err.filter((e) => ZNAME.has(ZKLUC(name + " | " + e)));
      if (ZAPIS) err.forEach((e) => zapis.push(name + " | " + e));
      if (stare.length) { znamych += stare.length; console.log(`  · ${meno} · ${name} (známe, na opravu)\n      ` + stare.join("\n      ")); }
      const tvrde = PRISNE ? err : nove;
      if (tvrde.length) { chyb += tvrde.length; console.log(`  ✖ ${meno} · ${name}\n      ` + tvrde.join("\n      ")); }
    }
    if (ZAPIS) { fs.mkdirSync(path.dirname(ZNAME_F), { recursive: true }); fs.writeFileSync(ZNAME_F, "# známe chyby schém – tools/schemy.js --zapis-zname; pred zverejnením sa musia opraviť (zverejni.ps1 = --prisne)\n" + zapis.join("\n") + "\n"); console.log(`\nzapísaných ${zapis.length} známych chýb do ${path.relative(ROOT, ZNAME_F)}`); }
    if (opravene || roztiahnute) console.log(`\nschémy: ${opravene}× orezaný viewBox, ${roztiahnute}× roztiahnutá schéma (build už prebehol)`);
    if (znamych && !PRISNE) console.log(`\nschémy: ${znamych} známych chýb ostáva na opravu (pracovne/schemy-zname.txt) – pred zverejnením musia zmiznúť`);
    console.log(chyb ? `\nschémy: ${chyb} chýb (${schem} schém)` : `schémy: ok (${schem} schém)`);
    if (chyb && !ZAPIS) process.exitCode = 1;
  } catch (e) {
    console.log("schémy: kontrola sa nedá spustiť – " + e.message);
    process.exitCode = 2;
  } finally {
    try { ws && ws.close(); } catch (e) {}
    try { chrome.kill(); } catch (e) {}
    setTimeout(() => { try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} process.exit(process.exitCode || 0); }, 500);
  }
})();

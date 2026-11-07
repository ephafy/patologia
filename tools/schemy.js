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
   Výnimka pre jeden prvok: atribút data-kontrola="nie" (napr. zámerne prekrytý popis na podklade).

     node tools/schemy.js                všetky kapitoly (chapters/*.html – spusti po builde)
     node tools/schemy.js 10 11          len vybrané kapitoly
     node tools/schemy.js --zmenene      len kapitoly, ktorých .md/.html git hlási ako zmenené
     node tools/schemy.js --fix …        navyše oreže viewBox každej obyčajnej schémy na obsah + rovnaký okraj (PAD)
                                         a zapíše ho do chapters/fig/*.svg (potom znova build); ostatné chyby treba opraviť ručne
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

const ROOT = path.resolve(__dirname, "..");
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
const ZNAME = new Set(!ZAPIS && fs.existsSync(ZNAME_F) ? fs.readFileSync(ZNAME_F, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")) : []);
const zapis = [];
let znamych = 0;
const PAD = 12;          // okraj okolo obsahu po orezaní (jednotky viewBoxu)
const OKRAJ_ROZDIEL = 14;
const OKRAJ_MIN = 4;
const HROT = 10;

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
  const OKRAJ_ROZDIEL = ${OKRAJ_ROZDIEL}, OKRAJ_MIN = ${OKRAJ_MIN}, HROT = ${HROT}, DETAIL = ${DETAIL};
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
    const lines = Array.from(svg.querySelectorAll("path,line,polyline")).filter((e) => !inDefs(e) && !inMol(e) && visible(e) && getComputedStyle(e).stroke !== "none").map((e) => ({ e, b: box(e) }));
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
    out.push({ name, err: Array.from(new Set(err)), c, vb: [vb.x, vb.y, vb.width, vb.height] });
  }
  return out;
})()`;

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SCHEMA_TAGS = /<(mol|uzol|rx|vplyv|legenda|plus|vyrez)\b/;
const r1 = (n) => Math.round(n * 10) / 10;

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
  let ws, chyb = 0, schem = 0, opravene = 0;
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
    const videne = new Set();
    for (const f of stranky) {
      const hotovo = new Promise((r) => { nacitane = r; });
      await send("Page.navigate", { url: "file:///" + f.replace(/\\/g, "/") });
      await Promise.race([hotovo, sleep(15000)]);
      await sleep(900);   // písmo
      const r = await send("Runtime.evaluate", { expression: MERANIE, returnByValue: true });
      const v = r.result && r.result.result && r.result.result.value;
      const meno = path.basename(f);
      if (!v) { console.log(`  ? ${meno}: meranie zlyhalo`); continue; }
      for (const s of v) {
        if (videne.has(s.name)) continue;
        videne.add(s.name); schem++;
        let err = s.err;
        const src = path.join(FIG, s.name + ".svg");
        if (FIX && fs.existsSync(src) && err.some((e) => /^(okraje|presah: )/.test(e))) {
          const raw = fs.readFileSync(src, "utf8");
          if (/<vyrez/.test(raw)) { console.log(`  · ${s.name}: schéma s výrezmi (schema.js) – viewBox uprav ručne`); }
          else {
            const nv = [r1(s.c.x1 - PAD), r1(s.c.y1 - PAD), r1(s.c.x2 - s.c.x1 + 2 * PAD), r1(s.c.y2 - s.c.y1 + 2 * PAD)].join(" ");
            const nraw = raw.replace(/(<svg\b[^>]*?\bviewBox=")[^"]*(")/, `$1${nv}$2`);
            if (nraw !== raw) { fs.writeFileSync(src, nraw); opravene++; err = err.filter((e) => !/^(okraje|presah: )/.test(e)); console.log(`  ↻ ${s.name}: viewBox ${s.vb.map(r1).join(" ")} → ${nv}`); }
          }
        }
        // známe chyby (pracovne/schemy-zname.txt): vypíšu sa, ale bez --prisne nezastavia – nová chyba áno
        const nove = err.filter((e) => !ZNAME.has(s.name + " | " + e));
        const stare = err.filter((e) => ZNAME.has(s.name + " | " + e));
        if (ZAPIS) err.forEach((e) => zapis.push(s.name + " | " + e));
        if (stare.length) { znamych += stare.length; console.log(`  · ${meno} · ${s.name} (známe, na opravu)\n      ` + stare.join("\n      ")); }
        const tvrde = PRISNE ? err : nove;
        if (tvrde.length) { chyb += tvrde.length; console.log(`  ✖ ${meno} · ${s.name}\n      ` + tvrde.join("\n      ")); }
      }
    }
    if (ZAPIS) { fs.mkdirSync(path.dirname(ZNAME_F), { recursive: true }); fs.writeFileSync(ZNAME_F, "# známe chyby schém – tools/schemy.js --zapis-zname; pred zverejnením sa musia opraviť (zverejni.ps1 = --prisne)\n" + zapis.join("\n") + "\n"); console.log(`\nzapísaných ${zapis.length} známych chýb do ${path.relative(ROOT, ZNAME_F)}`); }
    if (opravene) console.log(`\nschémy: ${opravene} viewBoxov orezaných – spusti znova node tools/build.js a túto kontrolu`);
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

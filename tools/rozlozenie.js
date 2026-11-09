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

function zoznam() {
  const vsetky = fs.existsSync(CH) ? fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort() : [];
  const ciele = argv.filter((a) => !a.startsWith("--"));
  let kap = vsetky, hub = fs.existsSync(path.join(ROOT, "index.html"));
  if (argv.includes("--zmenene")) {
    let st = "";
    try { st = cp.execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" }); } catch (e) {}
    const zm = st.split("\n").map((l) => l.slice(3).trim().replace(/^"|"$/g, "")).filter(Boolean);
    lupaTreba = zm.some((f) => /^assets\/(js\/glossary\.js|styles\/glossary\.css)$/.test(f) || /^chapters\/[^/_][^/]*\.(md|html)$/.test(f));
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
  // jeden pojem rozdelený na dve vysvetlivky: „bazocelulárny karcinóm | (bazalióm)“, „index… | , MAI“ (9. 11. 2026)
  res.rozdelene = Array.from(document.querySelectorAll(".pf-term")).filter((e) => {
    const t = e.nextSibling, n = t && t.nextSibling;
    return t && t.nodeType === 3 && /^\\s*[(,]?\\s*$/.test(t.nodeValue) && n && n.nodeType === 1 &&
      n.classList.contains("pf-term") && !n.classList.contains("pf-info") && !e.classList.contains("pf-info") &&
      n.getAttribute("data-term") === e.getAttribute("data-term");   // ⓘ za pojmom je zámerne samostatné tlačidlo
  }).slice(0, 6).map((e) => "„" + e.textContent + e.nextSibling.nodeValue + e.nextSibling.nextSibling.textContent + "“ → " + e.getAttribute("data-term"));
  return res;
})()`;

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const stranky = zoznam();
  if (!stranky.length && !lupaTreba) { console.log("rozloženie: nie je čo kontrolovať"); return; }
  if (!CHROME || typeof WebSocket === "undefined") {
    console.log("rozloženie: kontrola sa nedá spustiť (" + (!CHROME ? "chýba Chrome" : "Node bez WebSocket – treba Node 22+") + ")");
    process.exitCode = 2; return;
  }
  const port = 9300 + Math.floor(Math.random() * 500);
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "kn-rozl-"));
  const chrome = cp.spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "--no-first-run",
    "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--disable-extensions", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
  let ws, chyb = 0;
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
    // admin nástroj autora (Ctrl+R, presmerovanie na localhost) by meranie skreslil
    await send("Network.setBlockedURLs", { urls: ["*/admin/admintools.js", "*/admin/html2canvas.min.js"] });

    for (const s of SIRKY) {
      await send("Emulation.setDeviceMetricsOverride", { width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.mobile });
      await send("Emulation.setTouchEmulationEnabled", { enabled: s.mobile });
      for (const f of stranky) {
        const url = "file:///" + f.replace(/\\/g, "/");
        const hotovo = new Promise((r) => { nacitane = r; });
        await send("Page.navigate", { url });
        await Promise.race([hotovo, sleep(15000)]);
        await sleep(1200);   // site.js rozkladá okraj po načítaní písma
        const r = await send("Runtime.evaluate", { expression: MERANIE, returnByValue: true });
        const v = r.result && r.result.result && r.result.result.value;
        const meno = path.relative(ROOT, f).replace(/\\/g, "/");
        if (!v) { console.log(`  ? ${meno} · ${s.nazov}: meranie zlyhalo`); continue; }
        const zle = [];
        if (v.sirka > v.okno + 1) zle.push(`bočný posuv: stránka ${v.sirka} px > okno ${v.okno} px` + v.doprava.map((x) => "\n        " + x).join(""));
        if (v.vyska - v.koniec > MAX_BIELA) zle.push(`biela plocha dole: ${v.vyska - v.koniec} px pod koncom stránky` + v.dole.map((x) => "\n        " + x).join(""));
        if (v.rozdelene && v.rozdelene.length) zle.push("jeden pojem na dve vysvetlivky (spoj značky v glossary.js):" + v.rozdelene.map((x) => "\n        " + x).join(""));
        if (zle.length) { chyb++; console.log(`  ✖ ${meno} · ${s.nazov}\n      ` + zle.join("\n      ")); }
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
            else lupaVysl = `lupa: koliesko približuje (${LUPA_KROKY.length} druhy krokov aj priblížený obrázok), šípky posúvajú, schéma vyplní plochu`;
          }
        }
      }
    }
    if (lupaVysl) console.log(lupaVysl);
    console.log(chyb ? `\nrozloženie: ${chyb} chýb (${stranky.length} strán × ${SIRKY.length} šírky)` : `rozloženie: ok (${stranky.length} strán × ${SIRKY.length} šírky)`);
    if (chyb) process.exitCode = 1;
  } catch (e) {
    console.log("rozloženie: kontrola sa nedá spustiť – " + e.message);
    process.exitCode = 2;
  } finally {
    try { ws && ws.close(); } catch (e) {}
    try { chrome.kill(); } catch (e) {}
    setTimeout(() => { try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} process.exit(process.exitCode || 0); }, 500);
  }
})();

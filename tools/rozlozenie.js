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

function zoznam() {
  const vsetky = fs.existsSync(CH) ? fs.readdirSync(CH).filter((f) => /\.html$/.test(f) && !f.startsWith("_")).sort() : [];
  const ciele = argv.filter((a) => !a.startsWith("--"));
  let kap = vsetky, hub = fs.existsSync(path.join(ROOT, "index.html"));
  if (argv.includes("--zmenene")) {
    let st = "";
    try { st = cp.execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" }); } catch (e) {}
    const zm = st.split("\n").map((l) => l.slice(3).trim().replace(/^"|"$/g, "")).filter(Boolean);
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
  return res;
})()`;

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const stranky = zoznam();
  if (!stranky.length) { console.log("rozloženie: nie je čo kontrolovať"); return; }
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
        if (zle.length) { chyb++; console.log(`  ✖ ${meno} · ${s.nazov}\n      ` + zle.join("\n      ")); }
      }
    }
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

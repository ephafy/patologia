#!/usr/bin/env node
/* tools/offline.js — skúška offline appky v skutočnom Chrome (spoločný systém kníh, 23. 11. 2026)

     node tools/offline.js            plná skúška (kód 0 = ok, 1 = chyba, 2 = nedala sa spustiť)

   Kniha sa podá z lokálneho servera tak ako z GitHub Pages (podcesta, konce riadkov LF, 6 % prvých
   požiadaviek zlyhá). Skúška počká na hlásenie „celá kniha je offline“, otvorí na tej istej doméne
   druhú knihu, VYPNE server, zavrie a znova spustí Chrome a bez siete otvorí:
   hlavnú stránku (aj koreňovú adresu), každú kapitolu aj s ?embed=1 a ?y=, karty a každý súbor zo zoznamu.
   Prečo: 23. 11. 2026 aktivácia jednej knihy mazala offline dáta všetkých ostatných na tej istej doméne. */
"use strict";
const fs = require("fs"), os = require("os"), path = require("path"), cp = require("child_process"), http = require("http");
const ROOT = path.resolve(__dirname, "..");
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(fs.existsSync);
if (!CHROME) { console.log("✖ offline: Chrome sa nenašiel"); process.exit(2); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8" };
const TEXT = /\.(html|css|js|svg|json|txt|md)$/i;
const errors = [];
const bad = (m) => { errors.push(m); console.log("  ✖ " + m); };

if (!fs.existsSync(path.join(ROOT, "index.html"))) { console.log("✖ offline: kniha zatiaľ nemá hlavnú stránku (index.html), skúška sa nedá spustiť"); process.exit(2); }
const swArg = process.argv.indexOf("--sw");    // skúška poistky na pokazenej verzii: --sw <súbor>
const swText = fs.readFileSync(swArg > 0 ? process.argv[swArg + 1] : path.join(ROOT, "service-worker.js"), "utf8");
const slug = (swText.match(/const BOOK = "([^"]+)"/) || [])[1];
const filesM = swText.match(/const FILES = (\{[\s\S]*?\});\n/);
if (!slug || !filesM) { console.log("✖ offline: service-worker.js nemá očakávaný tvar – spusti node tools/build.js"); process.exit(1); }
const FILES = JSON.parse(filesM[1]);
const small = {}; ["index.html", "assets/js/pwa.js"].forEach((u) => { small[u] = FILES[u]; });
const swOther = swText.replace(`const BOOK = "${slug}"`, 'const BOOK = "druhakniha"').replace(filesM[0], "const FILES = " + JSON.stringify(small) + ";\n");

// statická kontrola: všetko, na čo sa stránky odvolávajú, je v zozname
const pages = ["index.html", ...(FILES["karty.html"] ? ["karty.html"] : []), ...Object.keys(FILES).filter((u) => /^chapters\/[^/]+\.html$/.test(u))];
for (const p of pages) {
  const t = fs.readFileSync(path.join(ROOT, p), "utf8");
  for (const m of t.matchAll(/(?:href|src|poster)=["']([^"'#]+)/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|data:|javascript:|tel:|blob:|about:)/i.test(u) || u.includes("${")) continue;
    u = u.split("?")[0];
    if (!u) continue;
    let r; try { r = path.posix.normalize(path.posix.join(path.posix.dirname(p), decodeURI(u))); } catch (e) { continue; }
    if (r.endsWith("/")) r += "index.html";
    if (!FILES[r] && !/\.apkg$/.test(r) && fs.existsSync(path.join(ROOT, r))) bad(`${p} odkazuje na ${r}, ktorý nie je v offline zozname`);
  }
}

// obrázky, ktoré sa načítajú až za behu (vysvetlivky, karty)
const dataFiles = Object.keys(FILES).filter((u) => /^assets\/(glossary|karty)\/.*\.js$/.test(u) || u === "assets/search-index.js");
for (const d of dataFiles) {
  const t = fs.readFileSync(path.join(ROOT, d), "utf8");
  for (const m of t.matchAll(/(?:assets\/images|chapters\/fig)\/[^"'`\\)\s<>|]+\.(?:jpe?g|png|svg|webp|gif)/gi)) {
    if (!FILES[m[0]]) bad(`${d} odkazuje na ${m[0]}, ktorý nie je v offline zozname`);
  }
}

let failNext = new Set(), seen = new Set();
const sockets = new Set();
const srv = http.createServer((q, s) => {
  const m = decodeURIComponent(q.url.split("?")[0]).match(/^\/(kniha|druha)\/(.*)$/);
  if (!m) { s.writeHead(404); return s.end(); }
  const rel = m[2] === "" ? "index.html" : m[2];
  if (rel === "service-worker.js") { s.writeHead(200, { "content-type": "text/javascript", "cache-control": "no-cache" }); return s.end(m[1] === "druha" ? swOther : swText); }
  const f = path.join(ROOT, rel);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404); return s.end(); }
  if (m[1] === "kniha" && rel.startsWith("assets/images/") && !seen.has(rel)) {   // nespoľahlivá sieť: 6 % súborov prvýkrát zlyhá
    seen.add(rel);
    if (seen.size % 17 === 0) { failNext.add(rel); q.socket.destroy(); return; }
  }
  let b = fs.readFileSync(f);
  if (TEXT.test(rel)) b = Buffer.from(b.filter((x) => x !== 13));      // na serveri sú konce riadkov LF (git)
  s.writeHead(200, { "content-type": MIME[path.extname(f).toLowerCase()] || "application/octet-stream", "cache-control": "max-age=600", vary: "Accept-Encoding" });
  s.end(b);
});
srv.on("connection", (c) => { sockets.add(c); c.on("close", () => sockets.delete(c)); });

async function openChrome(profile) {
  const port = 9400 + Math.floor(Math.random() * 400);
  const proc = cp.spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "--disable-gpu", "--disable-extensions", "about:blank"], { stdio: "ignore" });
  let tgt;
  for (let i = 0; i < 80 && !tgt; i++) { try { tgt = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch (e) {} if (!tgt) await sleep(200); }
  if (!tgt) throw new Error("Chrome neodpovedá");
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pend = new Map(), failed = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
    else if (d.method === "Network.loadingFailed" && !d.params.canceled && d.params.type !== "Ping") failed.push(d.params.errorText + " " + (urls.get(d.params.requestId) || ""));
    else if (d.method === "Network.requestWillBeSent") urls.set(d.params.requestId, d.params.request.url);
    else if (d.method === "Network.responseReceived" && d.params.response.status >= 400) failed.push(d.params.response.status + " " + d.params.response.url);
  };
  const urls = new Map();
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : undefined; };
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
  await send("Network.setBlockedURLs", { urls: ["*/admin/*"] });
  const go = async (url, ms = 700) => { failed.length = 0; await send("Page.navigate", { url }); for (let i = 0; i < 60; i++) { await sleep(100); if ((await ev("document.readyState")) === "complete") break; } await sleep(ms); return failed.slice(); };
  return { proc, ev, go, send, close: async () => { try { ws.close(); } catch (e) {} proc.kill(); await sleep(500); } };
}

(async () => {
  await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${srv.address().port}`;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "kn-offline-"));
  let c = await openChrome(profile);
  try {
    await c.go(base + "/kniha/");
    await c.ev("caches.open('cudzia-kniha-1').then(c=>c.put('/cudzia/x',new Response('x'))).then(()=>1)");
    const state = `new Promise(function(ok){navigator.serviceWorker.ready.then(function(g){var m=new MessageChannel();var t=setTimeout(function(){ok(null)},4000);m.port1.onmessage=function(e){clearTimeout(t);ok(e.data)};g.active.postMessage({type:'pf-status'},[m.port2])})})`;
    let s = null;
    const t0 = Date.now();
    for (; Date.now() - t0 < 420000;) { s = await c.ev(state); if (s && s.complete) break; await sleep(800); }
    if (!s || !s.complete) { bad(`kniha sa nestiahla celá: ${s ? s.done + " / " + s.total : "service worker neodpovedá"}`); throw new Error("stop"); }
    console.log(`  stiahnuté ${s.total} súborov, ${(s.totalBytes / 1048576).toFixed(0)} MB za ${((Date.now() - t0) / 1000).toFixed(0)} s (s výpadkami siete: ${failNext.size})`);
    await sleep(800);
    const label = await c.ev("(document.getElementById('appUpdateInfo')||{}).textContent||''");
    if (!/Celá kniha je offline/.test(label)) bad(`hlavná stránka neukazuje dokončenie: „${label}“`);

    await c.go(base + "/druha/"); await c.ev("navigator.serviceWorker.ready.then(()=>1)"); await sleep(1500);
    const names = await c.ev("caches.keys()");
    if (!names.includes(`${slug}-offline-v2`)) bad("druhá kniha na tej istej doméne zmazala offline dáta tejto knihy");
    if (!names.includes("cudzia-kniha-1")) bad("service worker zmazal cudzie úložisko");

    // skutočne bez siete: server vypnutý, Chrome znova spustený (ako po zavretí appky)
    await c.close();
    await new Promise((r) => { srv.close(r); sockets.forEach((x) => x.destroy()); });
    c = await openChrome(profile);
    await c.send("Network.clearBrowserCache");   // bežná HTTP cache vyprší; offline musí stáť len na úložisku appky
    const tests =[base + "/kniha/", base + "/kniha/index.html", ...(FILES["karty.html"] ? [base + "/kniha/karty.html"] : [])];
    Object.keys(FILES).filter((u) => /^chapters\/[^/]+\.html$/.test(u)).forEach((u) => {
      tests.push(`${base}/kniha/${u}`, `${base}/kniha/${u}?embed=1`, `${base}/kniha/${u}?y=300`);
    });
    for (const u of tests) {
      const failed = (await c.go(u, 350)).filter((x) => !/\/admin\//.test(x));
      const info = await c.ev("({t:document.body?document.body.innerText.length:0,off:/nie je v offline verzii|nedostupn/i.test(document.body?document.body.innerText:''),img:Array.from(document.images).filter(function(i){return i.getAttribute('src')&&i.complete&&i.naturalWidth===0&&!/admin/.test(i.src)}).length})");
      const short = u.replace(base + "/kniha/", "") || "(koreň)";
      if (!info || info.off || info.t < 100) bad(`${short}: stránka sa bez siete neotvorila`);
      if (failed.length) bad(`${short}: ${failed.length} zlyhaných požiadaviek, napr. ${failed[0]}`);
      if (info && info.img) bad(`${short}: ${info.img} nenačítaných obrázkov`);
    }
    await c.go(base + "/kniha/index.html", 500);
    const all = await c.ev(`(async function(){var L=${JSON.stringify(Object.keys(FILES))},b=[];for(var i=0;i<L.length;i+=20){var r=await Promise.all(L.slice(i,i+20).map(function(u){return fetch(u).then(function(x){return x.ok?x.blob().then(function(y){return y.size?null:u}):u}).catch(function(){return u})}));r.forEach(function(x){if(x)b.push(x)})}return b})()`);
    if (!all || all.length) bad(`bez siete nejde ${all ? all.length : "?"} súborov, napr. ${all && all[0]}`);
    console.log(`  bez siete otvorených ${tests.length} stránok a ${Object.keys(FILES).length} súborov`);
  } catch (e) { if (e.message !== "stop") bad("skúška zlyhala: " + e.message); }
  await c.close();
  try { srv.close(); } catch (e) {}
  sockets.forEach((x) => x.destroy());
  for (let i = 0; i < 5; i++) { try { fs.rmSync(profile, { recursive: true, force: true }); break; } catch (e) { await sleep(400); } }
  console.log(errors.length ? `✖ offline appka: ${errors.length} chýb` : "✓ offline appka: celá kniha funguje bez internetu");
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.log("✖ offline: skúška sa nedala spustiť – " + e.message); process.exit(2); });

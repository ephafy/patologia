/* {{BRAND}} — GENEROVANÉ nástrojom tools/build.js zo šablóny tools/service-worker.template.js.
   Neupravuj ručne. Zoznam súborov a ich odtlačky sa pri každom builde prepočítajú.
   Registruje ho a sťahovanie riadi assets/js/pwa.js.

   Ako to funguje (23. 11. 2026):
   - Každá kniha má VLASTNÉ úložisko. Knihy bežia na jednej doméne, takže úložiská vidia navzájom:
     nikdy sa nesmie zmazať úložisko, ktoré nepatrí tejto knihe.
   - Súbor je uložený pod svojím odtlačkom. Pri novej verzii sa sťahuje len to, čo sa naozaj zmenilo.
   - Inštalácia stiahne text a kód; obrázky dotiahne stránka po dávkach, s obnovením po výpadku.
   - Staré verzie sa zmažú až vtedy, keď je nová verzia v zariadení celá. */
"use strict";
const BOOK = {{SLUG}};
const VERSION = "{{VERSION}}";
const FILES = {{FILES}};

const CACHE = BOOK + "-offline-v2";
const LEGACY = new RegExp("^" + BOOK + "-\\d+$");   // úložiská staršej verzie tejto knihy
const SCOPE = new URL("./", self.location.href).href;
const SCOPE_PATH = new URL(SCOPE).pathname;
const URLS = Object.keys(FILES);
const TEXT = /\.(html|css|js|svg|json|txt|md)$/i;
const TYPES = { html: "text/html; charset=utf-8", css: "text/css; charset=utf-8", js: "text/javascript; charset=utf-8",
  svg: "image/svg+xml", json: "application/json", txt: "text/plain; charset=utf-8", md: "text/plain; charset=utf-8",
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", woff2: "font/woff2" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const hashOf = (u) => FILES[u][0];
const keyOf = (u) => new URL(u, SCOPE).href + "?v=" + (hashOf(u) || "x" + VERSION);
const typeOf = (u) => TYPES[u.slice(u.lastIndexOf(".") + 1).toLowerCase()] || "application/octet-stream";

/* Odtlačok: v textových súboroch bez znaku CR, lebo git na Windows mení konce riadkov
   a na server ide iná podoba než na disku (rovnaký výpočet je v tools/build.js). */
async function digest(u, buf) {
  let bytes = new Uint8Array(buf);
  if (TEXT.test(u)) {
    const out = new Uint8Array(bytes.length);
    let n = 0;
    for (let i = 0; i < bytes.length; i++) if (bytes[i] !== 13) out[n++] = bytes[i];
    bytes = out.subarray(0, n);
  }
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  let s = "";
  for (let i = 0; i < 8; i++) s += h[i].toString(16).padStart(2, "0");
  return s;
}
const valid = async (u, buf) => {
  const want = hashOf(u);
  if (!want || !(self.crypto && crypto.subtle)) return true;
  return (await digest(u, buf)) === want;
};
const store = (cache, u, buf) => cache.put(keyOf(u), new Response(buf, { status: 200, headers: { "content-type": typeOf(u) } }));

let quotaFull = false;
const running = new Map();   // ten istý súbor sa nesťahuje dvakrát naraz (viac otvorených okien)

async function fromLegacy(cache, u) {
  if (!hashOf(u)) return false;
  for (const name of await caches.keys()) {
    if (!LEGACY.test(name)) continue;
    const old = await (await caches.open(name)).match(new URL(u, SCOPE).href, { ignoreSearch: true, ignoreVary: true });
    if (!old) continue;
    const buf = await old.arrayBuffer();
    if (await valid(u, buf)) { await store(cache, u, buf); return true; }
  }
  return false;
}

async function fetchFile(cache, u) {
  if (await fromLegacy(cache, u).catch(() => false)) return true;
  for (let i = 0; i < 3; i++) {
    try {
      const resp = await fetch(new URL(u, SCOPE).href, { cache: i ? "reload" : "no-cache", credentials: "same-origin" });
      if (!resp.ok) throw new Error(String(resp.status));
      const buf = await resp.arrayBuffer();
      if (!(await valid(u, buf))) throw new Error("iný obsah, než čaká táto verzia");
      await store(cache, u, buf);
      return true;
    } catch (e) {
      if (e && e.name === "QuotaExceededError") { quotaFull = true; return false; }
      if (i < 2) await sleep(400 * Math.pow(3, i));
    }
  }
  return false;
}
function ensure(cache, u) {
  if (running.has(u)) return running.get(u);
  const p = fetchFile(cache, u).finally(() => running.delete(u));
  running.set(u, p);
  return p;
}
async function downloadAll(list, workers) {
  const cache = await caches.open(CACHE);
  const queue = list.slice();
  const failed = [];
  const work = async () => {
    for (let u = queue.shift(); u && !quotaFull; u = queue.shift()) if (!(await ensure(cache, u))) failed.push(u);
  };
  await Promise.all(Array.from({ length: workers }, work));
  return failed;
}
async function missingFiles() {
  const cache = await caches.open(CACHE);
  const have = new Set((await cache.keys()).map((r) => r.url));
  return URLS.filter((u) => !have.has(keyOf(u)));
}
/* len úložisko tejto knihy; cudzie knihy na tej istej doméne sa nikdy nedotýkajú */
async function cleanup() {
  const cache = await caches.open(CACHE);
  const keep = new Set(URLS.map(keyOf));
  await Promise.all((await cache.keys()).filter((r) => !keep.has(r.url)).map((r) => cache.delete(r)));
  const names = await caches.keys();
  await Promise.all(names.filter((n) => LEGACY.test(n)).map((n) => caches.delete(n)));
}
async function status(extra) {
  const missing = await missingFiles();
  const gone = new Set(missing);
  let bytes = 0, totalBytes = 0;
  URLS.forEach((u) => { totalBytes += FILES[u][1]; if (!gone.has(u)) bytes += FILES[u][1]; });
  return Object.assign({ version: +VERSION, total: URLS.length, done: URLS.length - missing.length, bytes, totalBytes,
    complete: !missing.length, quota: quotaFull }, extra || {});
}
async function syncStep(max) {
  quotaFull = false;
  const missing = await missingFiles();
  const failed = missing.length ? await downloadAll(missing.slice(0, max), 5) : [];
  const s = await status({ failed: failed.length });
  if (s.complete) await cleanup();
  return s;
}
/* oprava poškodenej kópie: prečíta uložené súbory a zlý zmaže (stiahne ho ďalší krok) */
async function checkStep(from, n) {
  const cache = await caches.open(CACHE);
  let bad = 0;
  for (const u of URLS.slice(from, from + n)) {
    const hit = await cache.match(keyOf(u));
    if (hit && !(await valid(u, await hit.arrayBuffer()))) { await cache.delete(keyOf(u)); bad++; }
  }
  return { next: from + n, total: URLS.length, bad };
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const failed = await downloadAll(URLS.filter((u) => !u.startsWith("assets/images/")), 6);
    if (failed.length) throw new Error("nestiahnuté súbory: " + failed.length);   // ostáva doterajšia verzia
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", (event) => { event.waitUntil(self.clients.claim()); });

function offlinePage() {
  return new Response('<!doctype html><html lang="sk"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Bez pripojenia</title><body style="font:17px/1.5 Georgia,serif;max-width:32em;margin:15vh auto;padding:0 20px">' +
    "<h1 style=\"font-size:24px\">Tento súbor nie je v offline verzii</h1><p>Otvorí sa po pripojení na internet.</p>" +
    '<p><a href="' + SCOPE + 'index.html">Späť na obsah knihy</a></p>',
    { status: 503, headers: { "content-type": "text/html; charset=utf-8" } });
}
async function serve(u, req, event) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(keyOf(u), { ignoreVary: true });
  if (hit) return hit;
  try {
    const resp = await fetch(new URL(u, SCOPE).href, { credentials: "same-origin" });
    if (!resp.ok) throw new Error(String(resp.status));
    const buf = await resp.arrayBuffer();
    if (await valid(u, buf)) event.waitUntil(store(cache, u, buf.slice(0)).catch(() => {}));
    return new Response(buf, { status: 200, headers: { "content-type": typeOf(u) } });
  } catch (e) {
    const older = await cache.match(new URL(u, SCOPE).href, { ignoreSearch: true, ignoreVary: true });
    if (older) return older;
    for (const name of await caches.keys()) {
      if (!LEGACY.test(name)) continue;
      const legacy = await (await caches.open(name)).match(new URL(u, SCOPE).href, { ignoreSearch: true, ignoreVary: true });
      if (legacy) return legacy;
    }
    return req.mode === "navigate" ? offlinePage() : Response.error();
  }
}
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;   // cudziu doménu ani inú knihu nerieši
  let rel;
  try { rel = decodeURIComponent(url.pathname.slice(SCOPE_PATH.length)); } catch (e) { return; }
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  if (FILES[rel]) { event.respondWith(serve(rel, req, event)); return; }   // parametre (?embed=1, ?y=…) nerozhodujú
  if (req.mode === "navigate") event.respondWith(fetch(req).catch(() => offlinePage()));
});

self.addEventListener("message", (event) => {
  const m = event.data || {};
  const port = event.ports && event.ports[0];
  if (!port) return;
  const job = m.type === "pf-status" ? status()
    : m.type === "pf-sync" ? syncStep(Math.max(1, m.max || 24))
    : m.type === "pf-check" ? checkStep(m.from || 0, m.n || 40)
    : null;
  if (!job) return;
  event.waitUntil(job.then((r) => port.postMessage(r), (e) => port.postMessage({ error: String(e) })));
});

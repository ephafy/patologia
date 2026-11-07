/* ══════════════════════════════════════════════════════════════════════
   Náhľad inej kapitoly, zachovanie pozície a návrat späť.
   Zdieľaný súbor všetkých kníh (KNIHY-CORE); štýly: tools/chapter-extra.css.

   Tri režimy tej istej stránky kapitoly:
   • samostatne      — otvorená priamo (file://…/chapters/NN.html)
   • HOSTED          — v ráme hlavnej stránky (index.html); navigáciu medzi
                       kapitolami robí hlavná stránka, aby fungovalo jej Späť
   • EMBED (?embed)  — vnútri náhľadu; bez hlavičky a bočného obsahu

   Komunikácia cez postMessage (funguje aj medzi file:// dokumentmi, kde
   prehliadač nedovolí siahnuť do cudzieho rámu):
     rám → rodič  {pf:"ready", y, toc} · {pf:"scroll", y} · {pf:"peek-close"}
                  {pf:"open", slug, hash, y}   (HOSTED: „otvor túto kapitolu“)
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var html = document.documentElement;
  var params = new URLSearchParams(location.search);
  var EMBED = params.has("embed");
  var HOSTED = !EMBED && window.top !== window.self;
  var PATH = location.pathname;
  var KEY_Y = "pk-y:" + PATH;
  var KEY_A = "pk-a:" + PATH;
  var KEY_BACK = "pk-back:" + PATH;
  var REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DUR = REDUCE ? 0 : 500;
  var restoreHook = null;   // dorovná pozíciu po úvodnej animácii (viď „1. pozícia“ a „úvodné načítanie“)

  function store(k, v) {
    try {
      if (v === undefined) return sessionStorage.getItem(k);
      if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v);
    } catch (e) { /* súkromné okno, zablokované úložisko */ }
    return null;
  }
  function post(msg) { try { window.parent.postMessage(msg, "*"); } catch (e) {} }
  function navType() {
    try { var n = performance.getEntriesByType("navigation")[0]; return n ? n.type : ""; } catch (e) { return ""; }
  }
  function curY() { return Math.round(window.scrollY || html.scrollTop || 0); }
  function jumpTo(y) {
    // site.css má scroll-behavior:smooth — obnova pozície musí byť okamžitá
    var b = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    html.style.scrollBehavior = b;
  }
  function whenLoaded(fn) {
    if (document.readyState === "complete") setTimeout(fn, 60);
    else window.addEventListener("load", function () { setTimeout(fn, 60); });
  }
  function slugOf(pathname) { return pathname.split("/").pop().replace(/\.html$/, ""); }

  /* ── kotva čítania: odsek, ktorý je práve hore, a jeho poloha na obrazovke ──
     Samotné y nestačí: kým sa dotiahne písmo a okrajové poznámky sa presunú
     do okraja, text nad miestom čítania mení výšku a to isté y ukazuje inam.
     Obnova podľa odseku je nemenná — opakovaná oprava už nič neposunie. */
  var BLOCKS = ".page .sec-h, .page .sub-h, .page .sec-body > *, .page > *";
  function blockList() {
    return Array.prototype.filter.call(document.querySelectorAll(BLOCKS), function (el) {
      return !el.classList.contains("side-anchor");
    });
  }
  function anchorNow() {
    var list = blockList();
    for (var i = 0; i < list.length; i++) {
      if (list[i].classList.contains("side-note")) continue;
      var r = list[i].getBoundingClientRect();
      if (r.bottom > 0 && r.height > 0) return i + ":" + Math.round(r.top);
    }
    return "";
  }
  function yForAnchor(a) {
    var m = /^(\d+):(-?\d+)$/.exec(a || "");
    if (!m) return null;
    var el = blockList()[+m[1]];
    return el ? curY() + el.getBoundingClientRect().top - +m[2] : null;
  }

  /* ── 1. pozícia pri F5, pri Späť a pri otvorení s ?y= ──────────────────
     site.js priebežne prepisuje adresu na #sekciu, ktorú práve čítaš, a po
     načítaní na ňu skočí — teda na ZAČIATOK sekcie. Presnú pozíciu si preto
     pamätáme sami a po skoku site.js ju vrátime. */
  var wantY = null, wantA = null;
  if (params.has("y")) { wantY = parseInt(params.get("y"), 10); wantA = params.get("a"); }
  else if (!EMBED) {
    var t = navType();
    if (t === "reload" || t === "back_forward") {
      var savedY = store(KEY_Y);
      if (savedY !== null) { wantY = parseInt(savedY, 10); wantA = store(KEY_A); }
    }
  }
  if (params.has("y") || params.has("a") || params.has("ni")) {   // ?y=&a= nepatrí do adresy, ktorú si čitateľ uloží
    params.delete("y");
    params.delete("a");
    params.delete("ni");
    var q = params.toString();
    try { history.replaceState(history.state, "", PATH + (q ? "?" + q : "") + location.hash); } catch (e) {}
  }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  if (wantY !== null && !isNaN(wantY)) {
    var userMoved = false;
    var stop = function () { userMoved = true; };
    ["wheel", "touchstart", "mousedown", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, stop, { once: true, passive: true });
    });
    var restore = function () {
      if (userMoved || html.classList.contains("pf-go")) return;   // počas úvodnej animácie je stránka zväčšená — merať by nešlo
      var y = yForAnchor(wantA);
      jumpTo(y === null ? wantY : y);
    };
    /* Hlavička skryla stránku (pk-restoring), aby nebolo vidno skok zhora a na
       #sekciu (site.js). Odkryje sa, až keď je písmo načítané a okrajové poznámky
       rozložené — vtedy už text stojí a nič neposkočí. */
    restoreHook = restore;
    var revealed = false;
    var reveal = function () {
      if (revealed) return;
      revealed = true;
      requestAnimationFrame(function () {
        restore();
        requestAnimationFrame(function () { restore(); html.classList.remove("pk-restoring"); });
      });
    };
    var start = function () {
      setTimeout(restore, 0);   // až po skoku site.js na #sekciu (ten je naplánovaný skôr)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(reveal, reveal);
      setTimeout(reveal, 700);  // poistka, keby písmo meškalo
      // obrázky a SVG ešte chvíľu dolaďujú výšku; oprava podľa kotvy je neviditeľná
      [150, 400, 900, 1600].forEach(function (ms) { setTimeout(restore, ms); });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
    window.addEventListener("load", restore);
  }

  /* ── úvodné načítanie: hlavička → odmaskovanie zvyšku ─────────────────────
     Beží len ak skorý skript v <head> (tools/build.js) dal html.pf-intro, t. j. kapitola sa
     otvára od začiatku (nie F5/Späť na uloženej pozícii, nie ?y=, nie odkaz na sekciu).
       1. po načítaní písma sa hlavička kapitoly zjaví (opacity .2 s), koliesko zmizne;
       2. po načítaní všetkého ostatného sa zvyšok odmaskuje zhora nadol:
          prvá obrazovka za 0,5 s, zvyšok stránky za ďalších 0,5 s.
     Pomalé načítanie (dlhšie než SLOW od začiatku načítania stránky, napr. slabé pripojenie
     alebo pomalé zariadenie): bez animácie — keď je všetko načítané, stránka sa ukáže naraz.
     Štýly: tools/chapter-extra.css (pf-intro, pf-hero, pf-go). */
  (function intro() {
    if (!html.classList.contains("pf-intro")) return;
    var shell = document.querySelector(".site-shell");
    var hero = document.querySelector(".chapter-hero");
    var page = document.querySelector(".page");
    var anim = null, zoom = null, veil = null, done = false;
    function end() {
      if (done) return;
      done = true;
      if (anim) { try { anim.cancel(); } catch (e) {} }
      if (zoom) { try { zoom.cancel(); } catch (e) {} }
      if (page) page.style.removeProperty("transform-origin");
      if (hero) hero.style.removeProperty("transform-origin");
      if (veil) veil.remove();
      html.classList.remove("pf-intro", "pf-hero", "pf-go", "pf-mid");
      if (shell) shell.style.removeProperty("--pf-hb");
      window.dispatchEvent(new Event("pf-relayout"));   // okrajové poznámky sa prepočítajú už bez zmenšenia stránky
      if (restoreHook) restoreHook();   // po animácii dorovnať pozíciu čítania (merania počas nej boli skreslené)
    }
    if (!shell || !hero || !page) { end(); return; }
    var canAnim = !!(shell.animate && window.CSS && CSS.registerProperty);
    var gone = setTimeout(end, 8000);   // poistka: nech nič nezostane skryté
    var mid = html.classList.contains("pf-mid");   // otvorené uprostred: bez samostatnej hlavičky, maska od hornej hrany obrazovky
    var heroOn = false, loaded = document.readyState === "complete";
    var SLOW = 2000;   // ms od začiatku načítania kapitoly; neskôr už animácia nebeží
    function slow() { try { return performance.now() > SLOW; } catch (e) { return false; } }

    function heroShow() {
      if (heroOn || done) return;
      heroOn = true;
      if (mid || slow()) { go(); return; }
      var hb = hero.getBoundingClientRect().bottom - shell.getBoundingClientRect().top;
      shell.style.setProperty("--pf-hb", Math.ceil(hb) + "px");
      html.classList.add("pf-hero");
      setTimeout(go, 200);   // hlavička dobehne, potom (ak je všetko načítané) odmaskovanie
    }
    var fontsOk = false, started = false;
    function fontsReady() {
      var fam = '"Source Serif 4"';
      var set = [document.fonts.load("600 1em " + fam, hero.textContent), document.fonts.load("400 1em " + fam, "a"), document.fonts.ready];
      return Promise.all(set);
    }
    function go() {
      if (started || done || !heroOn || !loaded) return;
      if (slow()) { started = true; clearTimeout(gone); end(); return; }   // pomalé načítanie: ukázať hneď, bez animácie
      // obnova pozície (F5/Späť) ešte neodkryla stránku — počkať
      if (mid && html.classList.contains("pk-restoring")) { setTimeout(go, 60); return; }
      started = true;
      // okrajové poznámky a obrázky sa po načítaní rozložia — výšku zmeriame až teraz
      requestAnimationFrame(function () { setTimeout(function () {
        if (done) return;
        var edge = 240, vh = window.innerHeight;
        if (mid && wantY === null) {   // odkaz na sekciu: po načítaní sa rozloženie ešte hýbe, skoč znova
          var tg = null;
          try { tg = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
          if (tg) tg.scrollIntoView({ block: "start", behavior: "instant" });
        }
        var H = shell.scrollHeight + edge;
        var sTop = shell.getBoundingClientRect().top;          // poloha okna v súradniciach stránky: -sTop
        var p0 = mid ? Math.max(0, -sTop) : 0;                  // odkiaľ sa odmaskuje (hore od hornej hrany obrazovky)
        var hr = hero.getBoundingClientRect(), hb = hr.bottom;
        // zväčšenie vychádza zo spodnej hrany hlavičky (hore) alebo zo stredu obrazovky (uprostred)
        page.style.transformOrigin = "50% " + Math.round((mid ? vh / 2 : hb) - page.getBoundingClientRect().top) + "px";
        if (!mid) hero.style.transformOrigin = "50% " + Math.round(hr.height) + "px";
        html.classList.add("pf-go", "pf-hero");
        if (!canAnim) {
          shell.style.transition = "opacity .5s ease";
          html.classList.remove("pf-intro", "pf-hero", "pf-mid");
          shell.style.opacity = "0"; void shell.offsetHeight; shell.style.opacity = "1";
          setTimeout(function () { shell.style.transition = ""; shell.style.opacity = ""; end(); }, 600);
          return;
        }
        var first = Math.min(vh - sTop + edge, H);
        // odmaskovanie: prvá obrazovka 1 s, zvyšok ďalších .5 s; popri ňom sa obsah zo zmenšenia a rozmazania zaostrí
        var T = 1500, ez = "cubic-bezier(.2,.7,.2,1)";
        anim = shell.animate([
          { "--pf-p": p0 + "px", easing: "cubic-bezier(.25,.6,.35,1)" },
          { "--pf-p": first + "px", offset: 1000 / T, easing: "linear" },
          { "--pf-p": H + "px" }
        ], { duration: T, fill: "forwards" });
        // celá stránka (text, okrajové poznámky aj ich čiary) sa zväčšuje naraz: --pf-t 0 → 1 (chapter-extra.css);
        // hore dostane hlavička opačný pohyb, takže ostáva ostrá a na mieste
        zoom = html.animate([{ "--pf-t": 0 }, { "--pf-t": 1 }], { duration: 1100, easing: ez, fill: "forwards" });
        veil = document.createElement("div");
        veil.className = "pf-veil";
        var hdr = document.querySelector(".site-header");
        veil.style.top = Math.max(0, Math.round(mid ? (hdr ? hdr.getBoundingClientRect().bottom : 0) : hb)) + "px";
        document.body.appendChild(veil);
        veil.animate([
          { backdropFilter: "blur(20px)", webkitBackdropFilter: "blur(20px)" },
          { backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" }
        ], { duration: 1100, easing: ez, fill: "forwards" });
        anim.onfinish = function () { clearTimeout(gone); end(); };
      }, 120); });
    }
    if (!loaded) window.addEventListener("load", function () { loaded = true; go(); });
    var fontsDone = false;
    var onFonts = function () { if (fontsDone) return; fontsDone = true; heroShow(); };
    if (document.fonts && document.fonts.load) {
      fontsReady().then(onFonts, onFonts);
      setTimeout(onFonts, 2500);   // poistka, keby písmo meškalo
    } else onFonts();
  })();

  /* ── obsah kapitoly pre prenos do bočného panela rodiča ─────────────── */
  function tocData() {
    var items = Array.prototype.map.call(document.querySelectorAll(".site-sidebar nav a"), function (a) {
      var n = a.querySelector(".num");
      var num = n ? n.textContent : "";
      return {
        num: num,
        text: a.textContent.slice(num.length),
        sub: a.classList.contains("sub"),
        id: (a.getAttribute("href") || "").replace(/^#/, "")
      };
    });
    var crumb = document.querySelector(".site-header .crumb");
    return { items: items, crumb: crumb ? crumb.innerHTML : "", title: document.title };
  }

  /* ── odkaz na inú kapitolu? ─────────────────────────────────────────── */
  function crossLink(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !a.closest(".page")) return null;
    var u;
    try { u = new URL(a.getAttribute("href"), location.href); } catch (x) { return null; }
    if (u.protocol !== location.protocol || u.host !== location.host) return null;
    if (!/\.html$/.test(u.pathname) || u.pathname === location.pathname) return null;
    if (u.pathname.replace(/[^/]*$/, "") !== PATH.replace(/[^/]*$/, "")) return null; // len kapitoly vedľa seba
    return { a: a, url: u };
  }

  /* ══ režim EMBED: stránka vnútri náhľadu ═══════════════════════════════ */
  if (EMBED) {
    html.classList.add("pk-embed");
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") post({ pf: "peek-close" }); });
    // ďalší odkaz na kapitolu ostane v náhľade
    document.addEventListener("click", function (e) {
      var hit = crossLink(e);
      if (!hit) return;
      e.preventDefault();
      hit.url.searchParams.set("embed", "1");
      location.replace(hit.url.href);   // bez záznamu v histórii — Späť patrí hlavnej stránke
    });
    /* Pri maximalizácii sa náhľad rozširuje, text sa preformátuje a to, čo
       čitateľ práve číta, by ušlo. Pamätáme si preto prvý viditeľný blok a
       jeho polohu na obrazovke a pri každej zmene šírky ho vrátime na miesto. */
    var anchor = null, blocks = null, fixing = false;
    function capture() {
      if (!blocks) blocks = document.querySelectorAll(".page .sec-h, .page .sub-h, .page .sec-body > *, .page > *");
      for (var i = 0; i < blocks.length; i++) {
        var r = blocks[i].getBoundingClientRect();
        if (r.bottom > 0 && r.height > 0) { anchor = { el: blocks[i], top: r.top }; return; }
      }
    }
    var st = 0;
    window.addEventListener("scroll", function () {
      if (!fixing) capture();
      clearTimeout(st);
      st = setTimeout(function () { post({ pf: "scroll", y: curY(), a: anchorNow() }); }, 80);
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (!anchor) return;
      fixing = true;
      jumpTo(curY() + anchor.el.getBoundingClientRect().top - anchor.top);
      fixing = false;
      post({ pf: "scroll", y: curY(), a: anchorNow() });
    });
    /* Príchod do náhľadu: obsah sa zjaví tak ako pri bežnom otvorení kapitoly (zo zmenšenia
       .93 a posunu o 36 px, 1,1 s; bez rozmazania) a popri tom sa plynulo posunie od začiatku
       kapitoly na odsek, na ktorý odkaz mieril. Rodič rám dovtedy drží skrytý (kurzor „čakám“). */
    function arrive(done) {
      var page = document.querySelector(".page");
      var tg = null;
      try { tg = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null; } catch (e) {}
      jumpTo(0);
      var to = tg ? Math.max(0, Math.round(tg.getBoundingClientRect().top + curY() - 14)) : 0;
      if (REDUCE || !page || !page.animate) { jumpTo(to); done(); return; }
      var T = 1100, ez = function (t) {   // cubic-bezier(.2,.7,.2,1) – rovnaký priebeh ako úvod kapitoly
        var a = 0, b = 1, x;
        for (var i = 0; i < 20; i++) { x = (a + b) / 2; var bx = 3 * x * (1 - x) * (1 - x) * .2 + 3 * x * x * (1 - x) * .2 + x * x * x; if (bx < t) a = x; else b = x; }
        return 3 * x * (1 - x) * (1 - x) * .7 + 3 * x * x * (1 - x) * 1 + x * x * x;
      };
      page.animate([{ transform: "translateY(36px) scale(.93)", opacity: 0 }, { transform: "none", opacity: 1 }],
        { duration: T, easing: "cubic-bezier(.2,.7,.2,1)" });
      var t0 = null;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / T);
        jumpTo(Math.round(to * ez(k)));
        if (k < 1) requestAnimationFrame(step); else { jumpTo(to); done(); }
      }
      requestAnimationFrame(step);
      return true;
    }
    whenLoaded(function () {
      var sent = false;
      function ready() { if (sent) return; sent = true; capture(); post({ pf: "ready", y: curY(), a: anchorNow(), toc: tocData() }); }
      // rodič rám odkryje hneď na začiatku animácie; polohu čítania mu pošle scroll po jej konci
      if (arrive(function () { capture(); post({ pf: "scroll", y: curY(), a: anchorNow() }); ready(); })) ready();
    });
    return;
  }

  /* ── ukladanie pozície (samostatne aj HOSTED) ────────────────────────── */
  var saveT = 0;
  function saveY() {
    var a = anchorNow();
    store(KEY_Y, String(curY()));
    store(KEY_A, a);
    if (HOSTED) post({ pf: "scroll", y: curY(), a: a });
  }
  window.addEventListener("scroll", function () { clearTimeout(saveT); saveT = setTimeout(saveY, 150); }, { passive: true });
  window.addEventListener("pagehide", saveY);
  if (HOSTED) whenLoaded(function () { post({ pf: "ready", y: curY() }); });

  /* ── HOSTED: návrat do obsahu knihy ──────────────────────────────────
     Kláves stlačený v ráme hlavná stránka nevidí a klik na značku by otvoril
     index V RÁME (s vlastným záznamom v histórii — preto „Obsah“ zaberal až
     na druhý raz). Obe veci preto oznámime rodičovi. */
  if (HOSTED) {
    var brand = document.querySelector(".site-header .brand");
    if (brand) brand.addEventListener("click", function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      post({ pf: "home" });
    });
    // registrované skôr než glosár a panel výberu — tie majú pri Esc prednosť
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || e.defaultPrevented || peek) return;
      if (document.querySelector(".pf-tip, .pf-lightbox:not([hidden]), .ask-tools:not([hidden])")) return;
      post({ pf: "home" });
    });
  }

  /* ══ náhľad ════════════════════════════════════════════════════════════ */
  var ICON_MAX = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var peek = null;

  function region() {
    var sb = document.querySelector(".site-sidebar");
    var hd = document.querySelector(".site-header");
    var left = sb && window.innerWidth > 980 ? Math.max(0, sb.getBoundingClientRect().right) : 0;
    var top = hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0;
    html.style.setProperty("--pk-left", left + "px");
    html.style.setProperty("--pk-top", top + "px");
  }

  /* Kým je náhľad otvorený, stránka pod ním sa neposúva a jej posuvník zmizne
     (nahradí ho rovnako široké odsadenie, nech nič neposkočí). Posuvník náhľadu
     je tak pri maximalizácii presne tam, kde bude posuvník novej kapitoly, a
     text má rovnakú šírku — kapitola sa po otvorení nepohne ani o pixel. */
  function lock(on) {
    if (on) {
      var sbw = window.innerWidth - html.clientWidth;
      html.style.setProperty("--pk-sbw", Math.max(0, sbw) + "px");
      html.classList.add("pk-lock");
    } else {
      html.classList.remove("pk-lock");
    }
  }

  function openPeek(url, label) {
    if (peek) removePeek(peek, true);
    region();
    lock(true);
    var src = new URL(url.href);
    src.searchParams.set("embed", "1");

    var bd = document.createElement("div");
    bd.className = "pk-backdrop";
    var el = document.createElement("section");
    el.className = "pk";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Náhľad kapitoly");
    el.innerHTML =
      '<div class="pk-bar">' +
        '<span class="pk-kind">Náhľad</span>' +
        '<span class="pk-title"></span>' +
        '<button type="button" class="pk-btn pk-btn-max" title="Otvoriť celú kapitolu" aria-label="Maximalizovať">' + ICON_MAX + "</button>" +
        '<button type="button" class="pk-btn pk-btn-close" title="Zavrieť (Esc)" aria-label="Zavrieť">' + ICON_CLOSE + "</button>" +
      "</div>" +
      '<div class="pk-load on"><i></i></div>' +
      '<iframe class="pk-frame" title="Náhľad kapitoly"></iframe>';
    el.querySelector(".pk-title").textContent = label;
    var frame = el.querySelector(".pk-frame");

    peek = { el: el, bd: bd, frame: frame, url: url, y: 0, toc: null, ready: false, busy: false, wantMax: false };
    var p = peek;

    el.querySelector(".pk-btn-close").addEventListener("click", function () { closePeek(); });
    el.querySelector(".pk-btn-max").addEventListener("click", function () { maximize(); });
    bd.addEventListener("click", function () { closePeek(); });
    // koliesko nad tmavou plochou nemá posúvať kapitolu pod ňou
    bd.addEventListener("wheel", function (e) { e.preventDefault(); }, { passive: false });
    el.querySelector(".pk-bar").addEventListener("wheel", function (e) { e.preventDefault(); }, { passive: false });

    document.body.appendChild(bd);
    document.body.appendChild(el);
    frame.src = src.href;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bd.classList.add("pk-in"); el.classList.add("pk-in"); });
    });
    p.fallback = setTimeout(function () { markReady(p, null); }, 4000);
  }

  function markReady(p, data) {
    if (p !== peek) return;
    if (data) {
      p.y = data.y || 0;
      p.a = data.a || "";
      if (data.toc) {
        p.toc = data.toc;
        p.el.querySelector(".pk-title").textContent = data.toc.title;
      }
    }
    if (p.ready) return;
    p.ready = true;
    clearTimeout(p.fallback);
    p.el.querySelector(".pk-load").classList.remove("on");
    p.el.classList.add("pk-ready");
    try { p.frame.focus(); } catch (e) {}
    if (p.wantMax) maximize();
  }

  function removePeek(p, now) {
    p.el.classList.remove("pk-in");
    p.bd.classList.remove("pk-in");
    setTimeout(function () { p.el.remove(); p.bd.remove(); }, now || REDUCE ? 0 : 240);
  }

  function closePeek() {
    if (!peek || peek.busy) return;
    var p = peek;
    peek = null;
    removePeek(p);
    setTimeout(function () { if (!peek) lock(false); }, REDUCE ? 0 : 240);
  }

  /* ── maximalizácia: panel → celá plocha obsahu, bočný obsah → nová kapitola,
        potom skutočné otvorenie kapitoly na rovnakom mieste ──────────────── */
  var saved = null; // pôvodný stav bočného panela a hlavičky (pre návrat cez bfcache)

  function maximize() {
    var p = peek;
    if (!p || p.busy) return;
    if (!p.ready) { p.wantMax = true; return; }
    p.busy = true;
    region();
    p.el.classList.add("pk-max-on");
    p.bd.classList.add("pk-max-on");
    swapChrome(p);
    // po dobehnutí animácie ešte chvíľu na poslednú polohu z náhľadu (hlási ju pri každej zmene šírky)
    setTimeout(function () { go(p); }, DUR + 80);
  }

  function swapChrome(p) {
    var sb = document.querySelector(".site-sidebar");
    var nav = sb && sb.querySelector("nav");
    var crumb = document.querySelector(".site-header .crumb");
    saved = {
      nodes: nav ? Array.prototype.slice.call(nav.childNodes) : [],
      crumb: crumb ? crumb.innerHTML : "",
      title: document.title
    };
    if (!p.toc) return;

    if (crumb) {
      crumb.classList.add("pk-fade");
      setTimeout(function () { crumb.innerHTML = p.toc.crumb; crumb.classList.remove("pk-fade"); }, DUR / 2);
    }
    document.title = p.toc.title;
    if (!nav) return;

    // staré body → hore von, nové body pripojené na koniec → vyrolujú na ich miesto
    var target = p.url.pathname.split("/").pop();
    var hash = p.url.hash.replace(/^#/, "");
    var oldW = document.createElement("div");
    oldW.className = "pk-nav-old";
    saved.nodes.forEach(function (n) { oldW.appendChild(n); });
    var gap = document.createElement("div");
    gap.className = "pk-nav-gap";
    oldW.appendChild(gap);
    var newW = document.createElement("div");
    newW.className = "pk-nav-new";
    p.toc.items.forEach(function (it) {
      var a = document.createElement("a");
      a.href = target + "#" + it.id;
      a.className = it.sub ? "sub" : "top";
      if (it.id === hash) a.classList.add("active");
      var s = document.createElement("span");
      s.className = "num";
      s.textContent = it.num;
      a.appendChild(s);
      a.appendChild(document.createTextNode(it.text));
      newW.appendChild(a);
    });
    nav.appendChild(oldW);
    nav.appendChild(newW);

    var from = sb.scrollTop;
    var dist = newW.offsetTop - oldW.offsetTop;
    sb.style.overflow = "hidden";
    sb.scrollTop = 0;
    nav.style.transform = "translateY(" + -from + "px)";
    void nav.offsetHeight; // zapíše východiskový stav pred prechodom
    nav.style.transition = "transform " + DUR + "ms cubic-bezier(.4,0,.2,1)";
    nav.style.transform = "translateY(" + -dist + "px)";
    oldW.style.transition = "opacity " + DUR * 0.8 + "ms ease";
    oldW.style.opacity = "0";
    setTimeout(function () {
      nav.style.transition = "none";
      oldW.remove();
      nav.style.transform = "";
      sb.style.overflow = "";
    }, DUR + 20);
  }

  function go(p) {
    var y = p.y || 0;
    if (HOSTED) {
      post({ pf: "open", slug: slugOf(p.url.pathname), hash: p.url.hash, y: y, a: p.a || "" });
      return;
    }
    saveY();
    store(KEY_BACK, "1");
    var u = new URL(p.url.href);
    u.searchParams.delete("embed");
    u.searchParams.set("ni", "1");   // po maximalizácii z náhľadu bez úvodnej animácie
    if (y) u.searchParams.set("y", String(y));
    if (y && p.a) u.searchParams.set("a", p.a);
    location.href = u.href;
  }

  /* ── návrat tlačidlom Späť ─────────────────────────────────────────────
     Z bfcache sa stránka vráti presne v stave, v akom sme odišli (náhľad
     maximalizovaný, v bočnom paneli iná kapitola) — ten treba vrátiť. */
  function restoreChrome() {
    if (peek) { var p = peek; peek = null; p.el.remove(); p.bd.remove(); }
    lock(false);
    if (!saved) return;
    var nav = document.querySelector(".site-sidebar nav");
    if (nav) {
      nav.innerHTML = "";
      nav.style.transform = "";
      saved.nodes.forEach(function (n) { nav.appendChild(n); });
    }
    var crumb = document.querySelector(".site-header .crumb");
    if (crumb) crumb.innerHTML = saved.crumb;
    document.title = saved.title;
    saved = null;
  }

  window.addEventListener("pageshow", function (e) {
    var back = store(KEY_BACK) !== null;
    store(KEY_BACK, null);
    if (e.persisted) restoreChrome();
    if (back && (e.persisted || navType() === "back_forward") && !REDUCE) {
      html.classList.add("pk-back-in");
      setTimeout(function () { html.classList.remove("pk-back-in"); }, 420);
    }
  });

  /* ── udalosti ───────────────────────────────────────────────────────── */
  document.addEventListener("click", function (e) {
    var hit = crossLink(e);
    if (!hit) return;
    e.preventDefault();
    openPeek(hit.url, hit.a.textContent.replace(/^\s*→\s*/, "").trim());
  });

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!peek || !d || typeof d !== "object" || e.source !== peek.frame.contentWindow) return;
    if (d.pf === "ready") markReady(peek, d);
    else if (d.pf === "scroll") { peek.y = d.y || 0; peek.a = d.a || ""; }
    else if (d.pf === "peek-close") closePeek();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && peek) closePeek();
  });
  window.addEventListener("resize", function () { if (peek) region(); });
})();

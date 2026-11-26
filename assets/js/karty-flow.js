/* SPDX-License-Identifier: MIT (assets/js/karty-LICENSE.txt)
   ══════════════════════════════════════════════════════════════════════════
   karty-flow.js — Flows v knihe: vrstva nad hlavnou stránkou aj kapitolou

   Priestorový model: Flows leží VPRAVO od kapitoly (pokyn autora 24. 11. 2026).
     mobil           kapitola ← Flows → Témy → Prehľad → Nastavenia: ťah prstom doľava v kapitole otvorí Flows
                     s filtrom tej kapitoly, ďalší ťah doľava ide na záložky appky; ťah doprava na záložke Flow
                     vráti kapitolu (appka hlási flow-drag, Flows ide za prstom). Odkaz vo Flows → obrazovka ide
                     doprava a ukáže kapitolu na správnom odseku; náhľad inej kapitoly prichádza tiež zľava
                     (ťah doľava ho vráti do Flows)
                     V čítačke hlavnej stránky (index.html) je to od 24. 11. 2026 NATÍVNE ROLOVANIE: rám čítačky (#reader) je
                     posuvník so scroll-snap a Flows jeho druhá strana – presne ako záložky vo Flows (autor: „prechod tak plynulý
                     ako medzi stranami Flows“). Ťah z kapitoly aj zo záložky Flow sa podá tomuto posuvníku, JavaScript nič
                     neťahá. Samostatná kapitola (mimo čítačky) a náhľad ťahajú cez JavaScript ako predtým.
     tablet          ťah doľava v kapitole otvorí Flows (v strede, priletí sprava)
     počítač        Flows v strede nad rozmazanou a stmavenou stránkou; odkaz → Flows sa posunie
                     doľava a vpravo sa ukáže náhľad kapitoly so zvýrazneným odsekom

   Role tohto skriptu:
     hostiteľ   stránka v najvyššom okne (index.html alebo samostatná kapitola): drží vrstvu
     klient     kapitola v ráme čítačky alebo v náhľade (?embed=1&flow=1): hlási gestá a odkazy

   Komunikácia cez postMessage (funguje aj medzi file:// dokumentmi):
     klient → hostiteľ  flow-open · flow-here · flow-drag · flow-pv-ready
     hostiteľ → klient  flow-goto
     appka → hostiteľ   flow-ready · flow-close · flow-link · flow-drag (ťah doprava na záložke Flow)
     hostiteľ → appka   flow-filter · flow-shown
   Pohyb je len transform a opacity; počas ťahu ide presne za prstom.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var html = document.documentElement;
  var me = document.currentScript;
  var BASE = me ? me.src.replace(/assets\/js\/karty-flow\.js.*$/, "") : "../";
  var Q = new URLSearchParams(location.search);
  var EMBED = Q.has("embed"), PREVIEW = EMBED && Q.has("flow");
  if (EMBED && !PREVIEW) return;   // obyčajný náhľad kapitoly (peek.js) Flows nemá
  var FRAMED = window.top !== window.self;
  var CHAPTER = !!document.querySelector(".page .sec-h");
  var SLUG = CHAPTER ? location.pathname.split("/").pop().replace(/\.html$/, "") : null;
  var REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var T = REDUCED ? 0 : 360;

  /* Ťah prstom ide priamo (synchrónne) do hostiteľa, keď je rám z toho istého pôvodu: postMessage je samostatná úloha
     a často dorazí až PO vykreslení snímky – Flows potom v každej tretej snímke stálo, hoci prst išiel ďalej (sekanie
     pri pomalom ťahu, 24. 11. 2026). Dotyk je zarovnaný na snímku, takže priamy zápis transformu stihne tú istú snímku.
     Cudzí pôvod (file://) → postMessage ako doteraz. */
  function send(m) {
    if (!FRAMED) { hostMessage(m, window); return; }
    if (m.pf === "flow-drag") { try { var h = window.parent.PF_FLOW_HOST; if (typeof h === "function") { h(m, window); return; } } catch (e) {} }
    try { window.parent.postMessage(m, "*"); } catch (e) {}
  }

  /* ══ miesto v kapitole, na ktoré karta ukázala ═════════════════════════ */
  function fold(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function stemRe(w) {
    var st = w.length > 5 ? w.slice(0, Math.ceil(w.length * .72)) : w;
    return new RegExp("(^|[^a-z0-9])" + st.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  }
  function jump(y) {
    var b = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.max(0, y));
    html.style.scrollBehavior = b;
  }
  function blocksFor(start) {
    var all = [].slice.call(document.querySelectorAll(".page p, .page li, .page td, .page dd, .page figcaption"));
    all = all.filter(function (b) { return !b.closest(".k-skr, .pf-tip, .side-anchor, .pf-flow-skip") && !b.querySelector("p, li"); });
    if (!start) return all;
    var heads = [].slice.call(document.querySelectorAll(start.classList.contains("sub-h") ? ".sec-h, .sub-h" : ".sec-h"));
    var at = heads.indexOf(start), stop = at >= 0 ? heads[at + 1] : null;
    return all.filter(function (b) {
      var after = start.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING;
      var before = !stop || (stop.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING);
      return after && before;
    });
  }
  function bestBlock(list, term, ans) {
    var tw = (fold(term).match(/[a-z0-9]{3,}/g) || []).slice(0, 4).map(stemRe);
    var aw = [], seen = {};
    (fold(ans).match(/[a-z0-9]{5,}/g) || []).forEach(function (w) { if (!seen[w] && aw.length < 14) { seen[w] = 1; aw.push(stemRe(w)); } });
    var best = null, top = 0;
    list.forEach(function (b, i) {
      var t = fold(b.textContent), v = 0;
      if (tw.length && tw.every(function (r) { return r.test(t); })) {
        v = 100;
        var strong = b.querySelector("b, strong");
        if (strong && tw.every(function (r) { return r.test(fold(strong.textContent)); })) v += 30;
      }
      var hit = 0;
      aw.forEach(function (r) { if (r.test(t)) hit++; });
      if (hit >= 2) v += hit;
      if (!v) return;
      if (b.closest(".rozsir")) v -= 60;
      if (b.closest(".box.aside")) v -= 5;
      v -= i * .002;
      if (v > top) { top = v; best = b; }
    });
    return best;
  }
  var spotT = 0, spotEl = null;
  function flash(el) {
    if (spotEl) spotEl.classList.remove("pf-flow-spot");
    void el.offsetWidth;
    el.classList.add("pf-flow-spot");
    spotEl = el;
    clearTimeout(spotT);
    spotT = setTimeout(function () { el.classList.remove("pf-flow-spot"); if (spotEl === el) spotEl = null; }, 6100);
  }
  function findSpot(hash, term, ans) {
    var start = null;
    try { start = hash ? document.getElementById(decodeURIComponent(String(hash).replace(/^#/, ""))) : null; } catch (e) {}
    var el = bestBlock(blocksFor(start), term, ans);
    if (!el && start && term) el = bestBlock(blocksFor(null), term, "");
    return { el: el, start: start };
  }
  function place(el) {
    var r = el.getBoundingClientRect();
    jump((window.scrollY || html.scrollTop) + r.top - Math.max(64, window.innerHeight * .26));
  }
  /* ukáže miesto; obrázky a okraj ešte chvíľu dolaďujú výšku, kým sa čitateľ sám nepohne */
  function focusSpot(hash, term, ans) {
    var f = findSpot(hash, term, ans), target = f.el || f.start;
    if (!target) return;
    if (f.el && f.el.closest(".rozsir") && window.PF_ROZSIR) window.PF_ROZSIR(true, true);
    var mark = f.el ? (f.el.closest("tr") || f.el) : null;
    place(target);
    if (mark) flash(mark);
    var moved = false, stop = function () { moved = true; };
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) { window.addEventListener(ev, stop, { once: true, passive: true }); });
    [160, 420, 900, 1500].forEach(function (ms) { setTimeout(function () { if (!moved) place(target); }, ms); });
  }

  /* ══ gesto v kapitole: ťah doľava ══════════════════════════════════════ */
  var EDGE = 22;   // pásy pri okrajoch patria systémovému gestu Späť (Android ho má na oboch stranách)
  function blocked(t) {
    if (!t || !t.closest) return true;
    if (t.closest("input,textarea,select,[contenteditable],.pf-tip,.pf-lightbox,.pk,.site-sidebar,.pf-dock,.pe-ui,.pfai,.pf-search")) return true;
    if (html.classList.contains("pk-lock") || document.body.classList.contains("pe-edit")) return true;
    if (document.querySelector(".pf-tip, .pf-lightbox:not([hidden])")) return true;
    var sel = window.getSelection && window.getSelection();
    if (sel && !sel.isCollapsed) return true;
    for (var el = t; el && el !== document.body; el = el.parentElement) {
      if (el.scrollWidth > el.clientWidth + 1) {
        var ox = getComputedStyle(el).overflowX;
        if ((ox === "auto" || ox === "scroll") && el.scrollLeft < el.scrollWidth - el.clientWidth - 1) return true;   // tabuľka má kam ísť: ťah patrí jej
      }
    }
    return false;
  }
  /* Široká tabuľka: prehliadač smie posúvať len tým smerom, kde ešte niečo je (pan-right = obsah ide doprava, prst doľava).
     Na pravom konci tak ťah doľava nepríde k prehliadaču, ale ku gestu Flows. */
  var RAILED = false;   // kapitola leží v posuvníku čítačky (hostiteľ poslal flow-rail): ťah robí prehliadač, nie tento skript
  function syncScroller(el) {
    var max = el.scrollWidth - el.clientWidth;
    if (RAILED || max <= 1) { el.style.removeProperty("touch-action"); el.style.removeProperty("overscroll-behavior-x"); return; }
    el.style.overscrollBehaviorX = "contain";
    el.style.touchAction = (el.scrollLeft <= 1 ? "pan-right" : el.scrollLeft >= max - 1 ? "pan-left" : "pan-x") + " pan-y pinch-zoom";
  }
  function scanScrollers() {
    document.querySelectorAll(".page table, .page pre, .page figure, .page .chart, .page .tbl, .page .table-wrap").forEach(function (el) {
      var ox = getComputedStyle(el).overflowX;
      if (ox === "auto" || ox === "scroll") syncScroller(el);
    });
  }
  function setupGesture() {
    var G = null, from = PREVIEW ? "pv" : "page", scanT = 0;
    html.classList.add("pf-flow-touch");
    var rescan = function () { clearTimeout(scanT); scanT = setTimeout(scanScrollers, 200); };
    if (document.readyState === "complete") rescan(); else window.addEventListener("load", rescan);
    window.addEventListener("resize", rescan);
    window.addEventListener("pf-relayout", rescan);
    document.addEventListener("scroll", function (e) {
      if (e.target && e.target.nodeType === 1 && e.target.style.touchAction) syncScroller(e.target);
    }, { capture: true, passive: true });
    document.addEventListener("touchstart", function (e) {
      G = null;
      if (RAILED || e.touches.length !== 1) return;
      var t = e.touches[0];
      if (t.clientX < EDGE || t.clientX > window.innerWidth - EDGE || blocked(e.target)) return;
      G = { x: t.clientX, y: t.clientY, on: false, lx: t.clientX, lt: e.timeStamp, v: 0 };
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      if (!G) return;
      if (e.touches.length !== 1) { if (G.on) send({ pf: "flow-drag", ph: "cancel", from: from }); G = null; return; }
      var t = e.touches[0], dx = t.clientX - G.x, dy = t.clientY - G.y;
      if (!G.on) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) { G = null; return; }
        if (dx > 12) { G = null; return; }
        if (dx > -12 || -dx < Math.abs(dy) * 1.5) return;
        G.on = true;
        G.x = t.clientX;
        send({ pf: "flow-drag", ph: "start", from: from, kap: SLUG });
        return;
      }
      if (e.timeStamp > G.lt) G.v = .7 * ((t.clientX - G.lx) / (e.timeStamp - G.lt)) + .3 * G.v;
      G.lx = t.clientX; G.lt = e.timeStamp;
      send({ pf: "flow-drag", ph: "move", from: from, dx: t.clientX - G.x });
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (!G) return;
      var g = G;
      G = null;
      if (!g.on) return;
      var pt = e.changedTouches[0];
      send({ pf: "flow-drag", ph: "end", from: from, dx: pt.clientX - g.x, v: e.timeStamp - g.lt > 90 ? 0 : g.v, kap: SLUG });
    }, { passive: true });
    document.addEventListener("touchcancel", function () {
      if (G && G.on) send({ pf: "flow-drag", ph: "cancel", from: from });
      G = null;
    }, { passive: true });
  }
  var touchy = ("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0;
  if (CHAPTER && touchy) setupGesture();

  /* ══ tlačidlá a odkazy na Flows ════════════════════════════════════════ */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a.pf-flow-btn, a[href$="karty.html"]');
    if (!a) return;
    e.preventDefault();
    send({ pf: "flow-open", kap: SLUG });
  });

  /* ══ klient: kapitola v ráme čítačky alebo v náhľade ═══════════════════ */
  if (FRAMED) {
    window.addEventListener("message", function (e) {
      var d = e.data;
      if (e.source !== window.parent || !d) return;
      if (d.pf === "flow-rail") {
        RAILED = !!d.on && !PREVIEW;
        html.classList.toggle("pf-flow-rail", RAILED);
        scanScrollers();
        return;
      }
      if (d.pf !== "flow-goto") return;
      if (d.y) jump(d.y);
      else focusSpot(d.hash, d.term, d.ans);
    });
    if (PREVIEW) {
      var whenLoaded = function (fn) {
        if (document.readyState === "complete") setTimeout(fn, 90);
        else window.addEventListener("load", function () { setTimeout(fn, 90); });
      };
      whenLoaded(function () {
        focusSpot(location.hash, Q.get("ft") || "", Q.get("fa") || "");
        requestAnimationFrame(function () { send({ pf: "flow-pv-ready" }); });
      });
    } else if (CHAPTER) send({ pf: "flow-here", kap: SLUG });
    return;
  }

  /* ══ hostiteľ: vrstva Flows ════════════════════════════════════════════ */
  var R = null, state = "closed", kap = null, appReady = false, sentKap, hereKap = SLUG, hereWin = null;
  var dragging = null, skipPop = 0, afterPop = null, hideT = 0, pv = null, pendingMax = null, pushed = [], pushT = 0, shownT = 0;
  var EASE = "cubic-bezier(.22,.82,.2,1)", DUR = T;   /* DUR = trvanie práve bežiaceho dojazdu (po ťahu podľa rýchlosti prsta) */
  function perf(ms) { if (window.PF_PERF) window.PF_PERF.watch(ms); }
  var ICON_BACK = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_MAX = '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function ensure() {
    if (R) return;
    var el = document.createElement("div");
    el.className = "pfl";
    el.innerHTML = '<div class="pfl-scrim"></div>' +
      '<section class="pfl-flow" aria-label="Flows"><i class="pfl-wait"></i></section>' +
      '<section class="pfl-pv" aria-label="Náhľad kapitoly"><div class="pfl-pvbar">' +
      '<button type="button" class="pfl-b pfl-pvback" data-a="pvback" aria-label="Späť na Flows">' + ICON_BACK + "</button>" +
      '<span class="pfl-pvt"></span>' +
      '<button type="button" class="pfl-b" data-a="max" aria-label="Otvoriť celú kapitolu" title="Otvoriť celú kapitolu">' + ICON_MAX + "</button>" +
      '<button type="button" class="pfl-b pfl-x" data-a="pvback" aria-label="Zavrieť náhľad" title="Zavrieť náhľad (Esc)">' + ICON_X + "</button>" +
      '</div><div class="pfl-pvbody"></div></section>';
    var f = document.createElement("iframe");
    f.title = "Flows";
    f.src = BASE + "karty.html?embed=1";
    el.querySelector(".pfl-flow").appendChild(f);
    R = { el: el, scrim: el.querySelector(".pfl-scrim"), flow: el.querySelector(".pfl-flow"), frame: f,
      pv: el.querySelector(".pfl-pv"), pvBody: el.querySelector(".pfl-pvbody"), pvT: el.querySelector(".pfl-pvt") };
    layout();
    placeFlow();   // ešte pred vložením do stránky: rám appky sa tak načíta len raz, rovno na svojom mieste
    document.body.appendChild(el);
    R.scrim.addEventListener("click", function () { if (state === "preview") closePreview(); else closeFlow(); });
    R.el.addEventListener("wheel", function (e) { if (e.target === R.scrim) e.preventDefault(); }, { passive: false });
    R.pv.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      if (b.dataset.a === "max") maximize(); else closePreview();
    });
    layout();
    apply(0, 0);
  }

  /* rozmery: úzke okno = dve obrazovky vedľa seba; široké = Flows v strede a náhľad vedľa */
  var G = {};
  function layout() {
    var vw = window.innerWidth, vh = window.innerHeight, N = vw < 980;
    var W = N ? vw : Math.round(Math.max(400, Math.min(480, vh * .62)));
    var gap = N ? 0 : 18, P = N ? vw : Math.min(880, vw - W - gap * 3);
    G = { vw: vw, N: N, W: W, P: P, gap: gap, x0: N ? 0 : Math.round((vw - W) / 2) };
    if (!R) return;
    R.el.classList.toggle("pfl-n", N);   /* úzke okno: stránka sa odsúva, rozmazané pozadie (drahé) netreba */
    R.flow.style.width = W + "px";
    R.pv.style.width = P + "px";
  }
  /* ── posuvník čítačky (mobil v hlavnej stránke): kapitola a Flows ako dve strany jedného rolovania ──
     Plynulé ako záložky vo Flows, lebo je to to isté: overflow-x + scroll-snap, posúva prehliadač na kompozítore (aj keď je
     hlavné vlákno zaneprázdnené), dojazd po pustení je systémový podľa rýchlosti prsta. Ťah z rámu kapitoly aj z rámu appky
     (záložka Flow na ľavom okraji) sa sám podá tomuto posuvníku (kapitola a appka majú v tomto režime overscroll-behavior-x:auto
     a vlastný ťah vypnutý – správa flow-rail). Stav (open/closed) sa určí, keď rolovanie zastane. */
  var RAIL = null, railRaf = 0, railT = 0, railBusy = false, dockEl = null;
  var TL = !!(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"));
  function railHost() { return !SLUG && G.N ? document.getElementById("reader") : null; }
  function placeFlow() {
    var rd = railHost(), want = rd || R.el;
    if (R.flow.parentNode === want) return;
    var live = R.flow.isConnected;
    if (live && state !== "closed") return;   // presun načíta appku znova – počká, kým sú Flows zatvorené
    if (live) { appReady = false; R.flow.classList.remove("pfl-ready"); }
    if (RAIL) {
      RAIL.classList.remove("pfl-rail", "pfl-solo");
      RAIL.removeEventListener("scroll", onRail);
      RAIL.removeEventListener("scrollend", railEnd);
      if (dockEl) dockEl.style.removeProperty("transform");
    }
    if (rd) rd.appendChild(R.flow); else R.el.insertBefore(R.flow, R.pv);
    RAIL = rd;
    html.classList.toggle("pfl-railon", !!rd);
    R.flow.style.removeProperty("transform");
    R.flow.style.removeProperty("opacity");
    if (rd) {
      rd.classList.add("pfl-rail");
      rd.addEventListener("scroll", onRail, { passive: true });
      rd.addEventListener("scrollend", railEnd);
      rd.scrollLeft = 0;
      if (!TL) dockEl = document.querySelector(".pf-dock");
    }
    tellRail();
  }
  function tellRail() {
    tell({ pf: "flow-rail", on: !!RAIL });
    if (hereWin) { try { hereWin.postMessage({ pf: "flow-rail", on: !!RAIL }, "*"); } catch (e) {} }
  }
  function railTo(x, instant) {
    RAIL.scrollTo({ left: x, behavior: instant || REDUCED ? "instant" : "smooth" });
    clearTimeout(railT);
    railT = setTimeout(railEnd, 250);   // už stojí na mieste → žiadna udalosť rolovania nepríde
  }
  function onRail() {
    if (railRaf) return;
    railRaf = requestAnimationFrame(function () {
      railRaf = 0;
      if (!RAIL) return;
      var x = RAIL.scrollLeft;
      if (RAIL.classList.contains("pfl-solo") && document.body.classList.contains("reading")) RAIL.classList.remove("pfl-solo");   // kapitola sa medzitým otvorila (F5)
      if (dockEl) dockEl.style.transform = x ? "translate3d(" + (-x) + "px,0,0)" : "";   // prehliadač bez časovej osi rolovania
      /* čitateľ ťahá z kapitoly: Flows dostanú filter tej kapitoly už počas ťahu (appka prekreslí, pohyb ide na kompozítore) */
      if (x > 1 && state === "closed" && !railBusy) { railBusy = true; setKap(currentChapter(), true); }
    });
    clearTimeout(railT);
    railT = setTimeout(railEnd, 180);   // náhrada za scrollend (staršie prehliadače); počas dojazdu chodí rolovanie v každej snímke
  }
  function railEnd() {
    clearTimeout(railT);
    if (!RAIL) return;
    var p = RAIL.scrollLeft / (RAIL.clientWidth || 1);
    if (p > .98) {
      railBusy = false;
      if (state === "closed") {
        state = "open";
        try { history.pushState({ pfFlow: 1, kap: kap }, ""); } catch (e) {}
        focusApp();
      }
    } else if (p < .02) {
      railBusy = false;
      if (state === "open") {
        state = "closed";
        clearTimeout(shownT);
        tell({ pf: "flow-shown", on: false });
        historyBack(1);
      }
      if (state === "closed") RAIL.classList.remove("pfl-solo");
    }
  }

  /* p = 0…1 Flows ukázané, q = 0…1 náhľad ukázaný */
  function apply(p, q) {
    var fx, px, fo = 1, po;
    if (RAIL) {   // Flows posúva rolovanie čítačky; tu len náhľad inej kapitoly (prichádza zľava cez Flows)
      R.pv.style.transform = "translate3d(" + (-G.W * (1 - q)).toFixed(1) + "px,0,0)";
      R.pv.style.opacity = q > 0 ? 1 : 0;
      R.pv.style.pointerEvents = q > 0 ? "auto" : "none";
      R.scrim.style.opacity = 0;
      return;
    }
    if (G.N) {   // kapitola vľavo, Flows vpravo; náhľad inej kapitoly prichádza na miesto kapitoly (zľava)
      fx = G.W * (1 - p) + G.W * q;
      px = -G.W * (1 - q);
      po = q > 0 ? 1 : 0;
      pushPage(-G.W * p);
    } else {
      fx = G.x0 + (1 - p) * 96 - q * (G.P + G.gap) / 2;
      fo = p;
      px = G.x0 + G.W + G.gap - (G.P + G.gap) / 2 + (1 - q) * 72;
      po = q;
      pushPage(0);
    }
    R.flow.style.transform = "translate3d(" + fx.toFixed(1) + "px,0,0)";
    R.flow.style.opacity = fo;
    R.pv.style.transform = "translate3d(" + px.toFixed(1) + "px,0,0)";
    R.pv.style.opacity = po;
    R.pv.style.pointerEvents = q > 0 ? "auto" : "none";   // skrytý náhľad nesmie zachytávať klik nad Flows
    R.scrim.style.opacity = G.N ? 0 : p;
  }
  /* na úzkom okne ide stránka pod Flows spolu s ním ako druhá obrazovka.
     Posúvané prvky dostanú will-change:transform už na začiatku ťahu: bez vlastnej vrstvy prehliadač pri každej snímke
     preskladal celú kapitolu v ráme (≈ 11 000 prvkov, 10–20 ms pri 4× spomalení) – s ňou mení len posun vrstvy. */
  function prepPush() {
    clearTimeout(pushT);
    if (!pushed.length && G.N && document.querySelector(".reader.open")) {
      pushed = [].slice.call(document.querySelectorAll(".reader, .pf-dock"));
    }
    pushed.forEach(function (c) { c.style.willChange = "transform"; });
  }
  function pushPage(x) {
    /* len prvky s position:fixed (čítačka a spodný pás): posun prvku v toku by rozšíril stránku a mobilný prehliadač by ju oddialil */
    var drag = R.el.classList.contains("drag");
    if (x && !pushed.length) prepPush();
    var tr = drag || REDUCED ? "none" : "transform " + DUR + "ms " + EASE;
    pushed.forEach(function (c) {
      if (c.style.transition !== tr) c.style.transition = tr;
      c.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
    });
    if (!x && pushed.length && !drag) {
      var list = pushed;
      clearTimeout(pushT);
      pushT = setTimeout(function () {
        if (pushed !== list) return;
        pushed = [];
        list.forEach(function (c) { c.style.removeProperty("transform"); c.style.removeProperty("transition"); c.style.removeProperty("will-change"); });
      }, DUR + 40);
    }
  }
  /* dojazd po pustení: trvanie podľa zvyšnej dráhy a rýchlosti prsta (rýchly švih dobehne rýchlo, pomalé pustenie
     pokojne); rest = 0…1 zvyšok dráhy, v = px/ms */
  /* Krivka nadväzuje na rýchlosť prsta: počiatočný sklon = rýchlosť pri pustení (pevná krivka s prudkým začiatkom
     predtým pri pomalom pustení „kopla“ – po pustení zrazu 2–3× rýchlejšie, než išiel prst). Pustenie v pokoji = rozbeh
     z nuly, švih = pokračuje jeho rýchlosťou a dobrzdí. */
  var EASE0 = EASE;
  function setDur(rest, v) {
    var d = T, e = EASE0;
    if (!REDUCED && rest !== undefined) {
      var dist = Math.max(1, clamp(rest) * G.W), sp = Math.max(0, v || 0);
      d = 170 + 190 * clamp(rest);
      if (sp > .2) d = Math.min(d, Math.max(140, 2.4 * dist / sp));
      d = Math.round(d);
      var x1 = .3, y1 = Math.min(1.6, x1 * sp * d / dist);
      e = "cubic-bezier(" + x1 + "," + y1.toFixed(3) + ",.25,1)";
    }
    DUR = d;
    EASE = e;
    if (R) { R.el.style.setProperty("--pfl-t", (d / 1000).toFixed(3) + "s"); R.el.style.setProperty("--pfl-e", e); }
  }
  function show() {
    clearTimeout(hideT);
    R.el.classList.add("on");
  }
  function hideLater() {
    clearTimeout(hideT);
    hideT = setTimeout(function () {
      if (state === "closed") { R.el.classList.remove("on"); dropPreview(); }
      else if (RAIL && state === "open") R.el.classList.remove("on");   // v posuvníku čítačky je vrstva len pre náhľad
    }, DUR + 40);
  }
  function tell(m) { if (appReady) { try { R.frame.contentWindow.postMessage(m, "*"); } catch (e) {} } }
  /* force: otvorenie z kapitoly filter vždy obnoví (čitateľ ho mohol vo Flows medzitým zrušiť) */
  function setKap(k, force) {
    kap = k || null;
    if (force) sentKap = undefined;
    if (appReady && sentKap !== kap) { sentKap = kap; tell({ pf: "flow-filter", kap: kap }); }
  }
  /* delay: appka sa „zobudí“ (pohyb pozadia kariet, počty) až po dojazde – počas neho má hlavné vlákno pokoj */
  function focusApp(delay) {
    try { R.frame.focus({ preventScroll: true }); } catch (e) {}   // fokus nesmie posunúť posuvník čítačky
    clearTimeout(shownT);
    if (delay) shownT = setTimeout(function () { if (state !== "closed") tell({ pf: "flow-shown", on: true }); }, delay);
    else tell({ pf: "flow-shown", on: true });
  }

  /* ── otvorenie a zatvorenie ─────────────────────────────────────────── */
  function openFlow(k, opts) {
    opts = opts || {};
    ensure();
    layout();
    placeFlow();
    if (!opts.keepDur) setDur();
    setKap(k, state === "closed" && !opts.noHist);
    var was = state;
    state = "open";
    if (RAIL) {
      if (!document.body.classList.contains("reading")) RAIL.classList.add("pfl-solo");   // z obsahu: Flows prídu cez obsah
      railBusy = true;
      railTo(RAIL.clientWidth, opts.instant);
      if (!opts.noHist && was === "closed") { try { history.pushState({ pfFlow: 1, kap: kap }, ""); } catch (e) {} }
      focusApp(opts.instant || was !== "closed" ? 0 : 480);
      return;
    }
    show();
    if (opts.instant) {
      R.el.classList.add("drag");
      apply(1, 0);
      void R.el.offsetWidth;
      R.el.classList.remove("drag");
    } else {
      if (was === "closed" && !dragging) { R.el.classList.add("drag"); apply(0, 0); void R.el.offsetWidth; R.el.classList.remove("drag"); }
      apply(1, 0);
    }
    if (!opts.noHist && was === "closed") { try { history.pushState({ pfFlow: 1, kap: kap }, ""); } catch (e) {} }
    focusApp(opts.instant || was !== "closed" ? 0 : DUR + 20);
    if (!opts.instant) perf(DUR + 80);
  }
  function closeFlow(opts) {
    opts = opts || {};
    if (!R || state === "closed") return;
    if (!opts.keepDur) setDur();
    var steps = state === "preview" ? 2 : 1;
    state = "closed";
    clearTimeout(shownT);
    apply(0, 0);
    if (RAIL) { railBusy = true; railTo(0, opts.instant); }
    perf(DUR + 80);
    tell({ pf: "flow-shown", on: false });
    hideLater();
    if (!opts.noHist) historyBack(steps);
  }
  function historyBack(n, then) {
    if (!(history.state && history.state.pfFlow)) { if (then) then(); return; }
    skipPop++;
    if (then) {
      afterPop = then;
      setTimeout(function () { if (afterPop === then) { afterPop = null; then(); } }, 320);
    }
    history.go(-n);
  }
  window.addEventListener("popstate", function (e) {
    if (skipPop > 0) {
      skipPop--;
      if (!skipPop && afterPop) { var f = afterPop; afterPop = null; f(); }
      return;
    }
    var s = e.state || {};
    if (s.pfFlow) {
      if (state === "preview" && !s.pv) closePreview({ noHist: true });
      else if (state === "closed") openFlow(s.kap, { noHist: true });
    } else if (state !== "closed") closeFlow({ noHist: true });
  });

  /* ── odkaz z karty ──────────────────────────────────────────────────── */
  function openLink(d) {
    var u;
    try { u = new URL(d.h, BASE); } catch (e) { return; }
    var slug = u.pathname.split("/").pop().replace(/\.html$/, "");
    layout();
    var here = currentChapter();
    if (G.N && slug === here) {   // tá istá kapitola je hneď vedľa: stačí sa na ňu posunúť
      if (hereWin) { try { hereWin.postMessage({ pf: "flow-goto", hash: u.hash, term: d.term, ans: d.ans }, "*"); } catch (e) {} }
      else focusSpot(u.hash, d.term, d.ans);
      closeFlow();
      return;
    }
    openPreview(u, slug, d);
  }
  function currentChapter() {
    if (SLUG) return SLUG;
    return document.body.classList.contains("reading") ? hereKap : null;
  }
  function dropPreview() {
    if (!pv) return;
    pv.frame.remove();
    pv.skel.remove();
    pv = null;
    R.pvBody.classList.remove("ready");
  }
  function openPreview(u, slug, d) {
    dropPreview();
    var src = new URL(u.href);
    src.searchParams.set("embed", "1");
    src.searchParams.set("flow", "1");
    if (d.term) src.searchParams.set("ft", d.term);
    if (d.ans) src.searchParams.set("fa", d.ans);
    var sk = document.createElement("div");
    sk.className = "pfl-skel";
    sk.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>";
    var f = document.createElement("iframe");
    f.title = "Náhľad kapitoly";
    R.pvBody.appendChild(sk);
    R.pvBody.appendChild(f);
    f.src = src.href;
    R.pvT.textContent = d.title || "";
    pv = { frame: f, skel: sk, url: u, slug: slug, y: 0, a: "", ready: false };
    var me = pv;
    me.timer = setTimeout(function () { previewReady(me); }, 3200);
    var was = state;
    state = "preview";
    if (was !== "preview") { try { history.pushState({ pfFlow: 1, pv: 1, kap: kap }, ""); } catch (e) {} }
    show();
    apply(1, 1);
  }
  function previewReady(p) {
    if (p !== pv || p.ready) return;
    p.ready = true;
    clearTimeout(p.timer);
    R.pvBody.classList.add("ready");
  }
  function closePreview(opts) {
    opts = opts || {};
    if (state !== "preview") return;
    if (!opts.keepDur) setDur();
    state = "open";
    apply(1, 0);
    perf(DUR + 80);
    focusApp();
    var dying = pv;
    setTimeout(function () { if (pv === dying && state !== "preview") dropPreview(); }, DUR + 40);
    if (RAIL) hideLater();
    if (!opts.noHist) historyBack(1);
  }
  /* celá kapitola: Flows sa zavrie, kapitola sa otvorí na tom istom mieste ako v náhľade */
  function maximize() {
    if (!pv) return;
    var p = pv, hash = p.url.hash, y = p.y, a = p.a, slug = p.slug;
    state = "closed";
    tell({ pf: "flow-shown", on: false });
    R.pv.classList.add("full");
    if (RAIL) { RAIL.classList.remove("pfl-solo"); railBusy = true; railTo(0, true); }   // pod náhľadom: čítačka späť na kapitolu
    else R.flow.style.opacity = 0;   // pozadie ostáva stmavené, kým sa kapitola pod náhľadom nepripraví
    var finish = function () {
      pendingMax = null;
      R.pv.classList.remove("full");
      apply(0, 0);
      hideLater();
    };
    historyBack(2, function () {
      if (window.PF_HUB_OPEN) {
        pendingMax = { slug: slug, done: finish };
        if (!window.PF_HUB_OPEN(slug, hash, y, a)) finish();
        else if (document.body.classList.contains("reading") && hereKap === slug) setTimeout(finish, 120);
        setTimeout(function () { if (pendingMax) finish(); }, 1800);
      } else {
        var u = new URL(p.url.href);
        u.searchParams.set("ni", "1");
        if (y) u.searchParams.set("y", String(y));
        if (y && a) u.searchParams.set("a", a);
        location.href = u.href;
      }
    });
  }

  /* ── ťah prstom ─────────────────────────────────────────────────────── */
  /* kapitola a náhľad hlásia ťah doľava (dx < 0), appka ťah doprava na záložke Flow (dx > 0) */
  /* pustenie: rozhodne smer švihu (aj späť), pri pomalom pustení prejdená dráha; p = 0…1 dráha k cieľu ťahu,
     vt = rýchlosť smerom k cieľu (px/ms). Vráti true = dokončiť; trvanie dojazdu nastaví podľa zvyšku dráhy a rýchlosti. */
  function settle(d, p, vt) {
    var go = d.ph === "end" && (vt > .35 || (vt > -.35 && p > .3));
    setDur(go ? 1 - p : p, go ? vt : -vt);
    return go;
  }
  function onDrag(d) {
    if (d.from === "pv") {
      if (state !== "preview" || !G.N) return;
      if (d.ph === "start") { dragging = "pv"; R.el.classList.add("drag"); perf(700); }
      else if (d.ph === "move" && dragging === "pv") apply(1, 1 - clamp(-d.dx / G.W));
      else if (dragging === "pv") {
        dragging = null;
        R.el.classList.remove("drag");
        if (settle(d, clamp(-d.dx / G.W), -(d.v || 0))) closePreview({ keepDur: 1 });
        else { apply(1, 1); perf(DUR + 80); }
      }
      return;
    }
    if (d.from === "app") {
      if (d.ph === "start") {
        if (state !== "open") return;
        dragging = "app";
        R.el.classList.add("drag");
        perf(700);
      } else if (dragging !== "app") return;
      else if (d.ph === "move") apply(1 - clamp(d.dx / G.W), 0);
      else {
        dragging = null;
        R.el.classList.remove("drag");
        if (settle(d, clamp(d.dx / G.W), d.v || 0)) closeFlow({ keepDur: 1 });
        else { apply(1, 0); perf(DUR + 80); }
      }
      return;
    }
    if (d.ph === "start") {
      if (state !== "closed") return;
      ensure();
      layout();
      if (RAIL) { tellRail(); return; }   // kapitola ešte nevedela o posuvníku: ďalší ťah už robí prehliadač
      setKap(d.kap, true);
      dragging = "page";
      show();
      R.el.classList.add("drag");
      prepPush();
      apply(0, 0);
      perf(700);
    } else if (dragging !== "page") return;
    else if (d.ph === "move") apply(clamp(-d.dx / G.W), 0);
    else {
      dragging = null;
      var open = settle(d, clamp(-d.dx / G.W), -(d.v || 0));
      R.el.classList.remove("drag");
      if (open) { state = "closed"; dragging = "settle"; openFlow(d.kap, { keepDur: 1 }); dragging = null; }
      else { apply(0, 0); hideLater(); perf(DUR + 80); }
    }
  }
  function clamp(x) { return Math.max(0, Math.min(1, x)); }

  /* ── správy ─────────────────────────────────────────────────────────── */
  function hostMessage(d, src) {
    if (!d || typeof d !== "object" || typeof d.pf !== "string") return;
    if (R && src === R.frame.contentWindow) {
      if (d.pf === "flow-ready") {
        appReady = true;
        R.flow.classList.add("pfl-ready");
        sentKap = undefined;
        setKap(kap);
        tell({ pf: "flow-rail", on: !!RAIL });
        if (state !== "closed") focusApp();
      } else if (d.pf === "flow-close") { if (state === "preview") closePreview(); else closeFlow(); }
      else if (d.pf === "flow-link") openLink(d);
      else if (d.pf === "flow-drag") onDrag({ from: "app", ph: d.ph, dx: d.dx, v: d.v });
      return;
    }
    if (pv && src === pv.frame.contentWindow) {
      if (d.pf === "flow-pv-ready") previewReady(pv);
      else if (d.pf === "scroll" || d.pf === "ready") { pv.y = d.y || 0; pv.a = d.a || ""; }
      else if (d.pf === "peek-close") closePreview();
      else if (d.pf === "flow-drag") onDrag(d);
      return;
    }
    if (d.pf === "flow-open") openFlow(d.kap);
    else if (d.pf === "flow-drag") onDrag(d);
    else if (d.pf === "flow-here") {
      hereKap = d.kap;
      hereWin = src === window ? null : src;
      if (state === "closed") setKap(d.kap);
      if (RAIL && hereWin) { try { hereWin.postMessage({ pf: "flow-rail", on: true }, "*"); } catch (e) {} }
    } else if (d.pf === "ready" && pendingMax && pendingMax.slug === hereKap) setTimeout(pendingMax.done, 120);
  }
  window.addEventListener("message", function (e) {
    if (e.source && e.source !== window) hostMessage(e.data, e.source);
  });
  /* priamy vstup pre ťah z rámu toho istého pôvodu (send v klientovi, toHost v appke) */
  window.PF_FLOW_HOST = function (m, src) { hostMessage(m, src); };
  window.addEventListener("keydown", function (e) {
    if (state === "closed") return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (state === "preview") closePreview(); else closeFlow();
      return;
    }
    /* fokus ostal mimo rámu appky: kláves patrí Flows, nie stránke pod ním */
    if (state === "open" && !e.ctrlKey && !e.metaKey && !e.altKey && /^(?: |Enter|Arrow(?:Up|Down|Left|Right)|Page(?:Up|Down)|[1-4jkvV])$/.test(e.key)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      focusApp();
      tell({ pf: "flow-key", key: e.key });
    }
  }, true);
  window.addEventListener("resize", function () {
    if (!R) return;
    layout();
    placeFlow();
    if (RAIL) RAIL.scrollLeft = state === "closed" ? 0 : RAIL.clientWidth;
    R.el.classList.add("drag");
    if (state === "preview") apply(1, 1);
    else if (state === "open") apply(1, 0);
    else apply(0, 0);
    void R.el.offsetWidth;
    R.el.classList.remove("drag");
  });

  /* appka sa pripraví vopred, aby ťah prstom hneď niečo ukázal */
  function warm() {
    if (navigator.connection && navigator.connection.saveData) return;
    if (window.requestIdleCallback) requestIdleCallback(ensure, { timeout: 2500 }); else ensure();
  }
  if (document.readyState === "complete") setTimeout(warm, 900);
  else window.addEventListener("load", function () { setTimeout(warm, 900); });

  /* F5 pri otvorených Flows */
  if (history.state && history.state.pfFlow) {
    var st = history.state;
    if (st.pv) { try { history.replaceState({ pfFlow: 1, kap: st.kap }, ""); } catch (e) {} }
    openFlow(st.kap, { instant: true, noHist: true });
  }
  window.PF_FLOW = { open: openFlow, close: closeFlow, state: function () { return state; }, kap: function () { return kap; } };
})();

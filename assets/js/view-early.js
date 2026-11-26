/* zobrazenie mobil/počítač – skorá časť (načíta sa synchrónne v <head>, pred vykreslením; riadi ju assets/js/view-toggle.js).
   Rovnako na počítači, tablete aj telefóne: viewport sa NEMENÍ (veľkosť písma a vecí ostáva), mení sa len rozloženie.
   Režim v localStorage `pf-view`: "mobile" na širokom okne alebo "desktop" na úzkom (≤ 820 px) → trieda html.pf-mobile
   resp. html.pf-desktop, matchMedia() odpovedá, akoby okno malo 400 (mobil) alebo 1100 px (počítač), a pravidlá @media
   so šírkou v štýloch sa prepíšu rovnako. Z pravidiel, ktoré sa tým novo zapnú, sa vyhodí font-size; z tých, ktoré sa vypnú, sa font-size zachová. Návrat = reload. */
(function () {
  "use strict";
  /* karty.html (Flows) načítava tento súbor len kvôli PF_PERF (atribút data-perf-only) – mierka písma a zobrazenie sa ho netýkajú */
  var PERF_ONLY = !!(document.currentScript && document.currentScript.hasAttribute("data-perf-only"));
  /* veľkosť písma a vecí (ikona nastavení v hlavičke): násobí mierku --z zo site.css (základ 1,2 ako 120 %) */
  try {
    var zp = parseInt(localStorage.getItem("pf-zoom"), 10);
    if (!PERF_ONLY && zp >= 50 && zp <= 200 && zp !== 100) document.documentElement.style.setProperty("--z", String(Math.round(1.2 * zp) / 100));
  } catch (e) { /* file:// */ }

  var root = document.documentElement;

  /* ══ PF_PERF – úroveň efektov podľa toho, čo zariadenie zvládne (24. 11. 2026, autor: „na mobile sú Flows laggy…
     animácie vysvetlenia sekajú… samo adaptujúce, rôzne úrovne zaťaženia“).
     Plná úroveň = všetky efekty. Úsporná (html.pf-lite) = bez rozmazania pozadia, bez pohybu pozadia kariet,
     kratšie a jednoduchšie animácie – pohyb za prstom a otvorenie okna ostávajú, len sú lacnejšie.
     Prepína sa sama: PF_PERF.watch(ms) počas animácie alebo ťahu zmeria snímky; keď ich veľa mešká (kĺzavý priemer),
     zapne úspornú úroveň, keď je dlho všetko plynulé, vráti plnú (hysterézia – neprepína sa sem a tam).
     Stav je v localStorage `pf-perf` (spoločný pre hlavnú stránku, kapitoly v ráme aj Flows; zmena sa prenesie
     udalosťou storage). Ručne: ?perf=lite | ?perf=full (pevne) | ?perf=auto. Slabé zariadenie (≤ 2 GB, šetrenie dát)
     začína v úspornej. Rozhodnutie aj meranie: PF_PERF.state(). */
  (function () {
    var KEY = "pf-perf", st = null;
    function load() { try { st = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { st = null; } }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* file:// */ } }
    function paint() { root.classList.toggle("pf-lite", !!(st && st.lite)); }
    load();
    var m = /[?&]perf=(lite|full|auto)\b/.exec(location.search);
    if (m) { st = m[1] === "auto" ? null : { lite: m[1] === "lite", pin: 1, s: 0, n: 0 }; save(); }
    if (!st) {
      var weak = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.connection && navigator.connection.saveData);
      st = { lite: !!weak, s: weak ? 0.3 : 0, n: 0 };
    }
    paint();
    window.addEventListener("storage", function (e) { if (e.key === KEY) { load(); if (!st) st = { lite: false, s: 0, n: 0 }; paint(); } });
    var busy = 0;
    window.PF_PERF = {
      lite: function () { return !!st.lite; },
      state: function () { return JSON.parse(JSON.stringify(st)); },
      /* meria rAF snímky počas ms; vráti Promise s podielom oneskorených snímok (alebo null, keď sa nedalo merať) */
      watch: function (ms) {
        if (busy || document.hidden || !window.requestAnimationFrame) return null;
        busy = 1;
        var t = [], end = 0;
        return new Promise(function (res) {
          function f(ts) {
            t.push(ts);
            if (!end) end = ts + (ms || 400);
            if (ts < end && !document.hidden) requestAnimationFrame(f);
            else { busy = 0; res(judge(t)); }
          }
          requestAnimationFrame(f);
        });
      }
    };
    function judge(t) {
      /* počas načítania stránky (prvé 4 s) seká každé zariadenie – také meranie o ňom nič nehovorí */
      if (t.length < 6 || document.hidden || t[0] < 4000) return null;
      var iv = [];
      for (var i = 1; i < t.length; i++) iv.push(t[i] - t[i - 1]);
      var s = iv.slice().sort(function (a, b) { return a - b; });
      var base = Math.max(6, Math.min(17.5, s[s.length >> 2]));   /* obnovovacia frekvencia displeja (60/90/120 Hz) */
      var bad = 0;
      iv.forEach(function (x) { if (x > base * 1.8) bad += Math.min(4, Math.round(x / base) - 1); });
      var r = Math.min(1, bad / iv.length);
      load();
      if (!st) st = { lite: false, s: 0, n: 0 };
      st.s = +(0.75 * (st.s || 0) + 0.25 * r).toFixed(3);
      st.n = (st.n || 0) + 1;
      st.r = +r.toFixed(3);
      if (!st.pin) {
        if (!st.lite && st.s > 0.25 && st.n >= 4) { st.lite = true; st.n = 0; }
        else if (st.lite && st.s < 0.03 && st.n >= 24) { st.lite = false; st.n = 0; }
      }
      save();
      paint();
      return r;
    }
  })();

  var v = null;
  try { v = localStorage.getItem("pf-view"); } catch (e) { /* file:// */ }
  if (/[?&]embed=/.test(location.search) || PERF_ONLY) return;
  var real = window.innerWidth;
  var EW = v === "mobile" && real > 820 ? 400 : v === "desktop" && real <= 820 ? 1100 : 0;   /* šírka, ktorú stránka „predstiera“ */
  if (!EW) return;
  root.classList.add(EW === 400 ? "pf-mobile" : "pf-desktop");

  /* prepíše šírkové podmienky: splnené → vždy platí, nesplnené → nikdy */
  function emu(q) {
    return String(q).replace(/\(\s*(max|min)-width\s*:\s*([\d.]+)px\s*\)/g, function (_, k, n) {
      var ok = k === "max" ? EW <= +n : EW >= +n;
      return ok ? "(min-width:0px)" : "(min-width:99999px)";
    });
  }

  var orig = window.matchMedia;
  window.matchMedia = function (q) { return orig.call(window, emu(q)); };

  function walk(rules) {
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.type === 4) {                                  /* CSSMediaRule */
        if (!r.__pf) {
          r.__pf = 1;
          var t = r.media.mediaText, e = emu(t);
          if (e !== t) {
            var was = orig.call(window, t).matches;
            r.media.mediaText = e;
            /* pravidlá, ktoré sa zapli len vďaka predstieranej šírke: mobil mení rozloženie, nie veľkosť písma –
               tá ostáva ako na počítači (mení sa v nastaveniach) */
            var now = orig.call(window, e).matches;
            if (!was && now) {
              for (var j = 0; j < r.cssRules.length; j++) {
                if (r.cssRules[j].style) r.cssRules[j].style.removeProperty("font-size");
              }
            } else if (was && !now) {
              /* pravidlá, ktoré sa vypli (mobilné zväčšenie písma): veľkosť písma sa zachová – pridá sa na koniec štýlu */
              var sh = r.parentStyleSheet;
              for (var k = 0; k < r.cssRules.length; k++) {
                var cr = r.cssRules[k], fz = cr.style && cr.style.getPropertyValue("font-size");
                if (fz && cr.selectorText) { try { sh.insertRule(cr.selectorText + "{font-size:" + fz + "}", sh.cssRules.length); } catch (x) { /* nič */ } }
              }
            }
          }
        }
        walk(r.cssRules);
      }
    }
  }
  function run() {
    for (var i = 0; i < document.styleSheets.length; i++) {
      try { walk(document.styleSheets[i].cssRules); } catch (e) { /* štýl z iného pôvodu (file://) */ }
    }
  }
  document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  document.addEventListener("load", function (e) { if (e.target && e.target.tagName === "LINK") run(); }, true);
  run();
})();

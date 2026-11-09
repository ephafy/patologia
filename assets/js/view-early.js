/* zobrazenie mobil/počítač – skorá časť (načíta sa synchrónne v <head>, pred vykreslením; riadi ju assets/js/view-toggle.js).
   Rovnako na počítači, tablete aj telefóne: viewport sa NEMENÍ (veľkosť písma a vecí ostáva), mení sa len rozloženie.
   Režim v localStorage `pf-view`: "mobile" na širokom okne alebo "desktop" na úzkom (≤ 820 px) → trieda html.pf-mobile
   resp. html.pf-desktop, matchMedia() odpovedá, akoby okno malo 400 (mobil) alebo 1100 px (počítač), a pravidlá @media
   so šírkou v štýloch sa prepíšu rovnako. Z pravidiel, ktoré sa tým novo zapnú, sa vyhodí font-size; z tých, ktoré sa vypnú, sa font-size zachová. Návrat = reload. */
(function () {
  "use strict";
  /* veľkosť písma a vecí (ikona nastavení v hlavičke): násobí mierku --z zo site.css (základ 1,2 ako 120 %) */
  try {
    var zp = parseInt(localStorage.getItem("pf-zoom"), 10);
    if (zp >= 50 && zp <= 200 && zp !== 100) document.documentElement.style.setProperty("--z", String(Math.round(1.2 * zp) / 100));
  } catch (e) { /* file:// */ }

  var root = document.documentElement;
  var v = null;
  try { v = localStorage.getItem("pf-view"); } catch (e) { /* file:// */ }
  if (/[?&]embed=/.test(location.search)) return;
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

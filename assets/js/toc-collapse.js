/* skrytie a zobrazenie bočného obsahu kapitoly na počítači (≥ 981 px).
   Tlačidlo ← v paneli ho skryje, tlačidlo → pod hornou lištou ho vráti. Stav sa pamätá v localStorage
   (trieda html.toc-collapsed sa pred vykreslením nastavuje v <head> stránky). Na tablete a mobile
   obsah ovláda tlačidlo v hlavičke (site.js), toto sa tam nezobrazuje. */
(function () {
  var root = document.documentElement;
  var KEY = "pf-toc-collapsed";
  var hide = document.querySelector(".toc-collapse");
  var show = document.querySelector(".toc-expand");
  if (!hide || !show) return;

  function set(collapsed) {
    root.classList.toggle("toc-collapsed", collapsed);
    try { localStorage.setItem(KEY, collapsed ? "1" : "0"); } catch (e) {}
    (collapsed ? show : hide).focus({ preventScroll: true });
  }

  hide.addEventListener("click", function () { set(true); });
  show.addEventListener("click", function () { set(false); });
})();

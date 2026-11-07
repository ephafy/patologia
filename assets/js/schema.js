/* ══════════════════════════════════════════════════════════════════════
   rozkliknutie schém (CLAUDE.md §5.2, bod 7).
   Zdieľaný súbor všetkých kníh (KNIHY-CORE); značky (rk=, href=, <vyrez>) rozvíja tools/schema.js,
   vzhľad je v tools/chapter-extra.css (blok „vzorce a schémy“).

   • krúžok ⊕ (prvok s data-rk)  → rozbalí alebo zbalí výrez pod schémou;
     schéma sa predĺži zmenou viewBoxu, nič sa neprekrýva
   • krúžok → (odkaz <a> v schéme) → skok na podrobnú schému; klik sa odovzdá
     obyčajnému odkazu mimo obrázka, takže plynulý posun (site.js) aj náhľad
     inej kapitoly (peek.js) fungujú ako pri odkaze v texte
   • tlačidlo pod schémou          → rozbalí alebo zbalí všetky výrezy naraz

   Klik na schému inak otvára lupu (glossary.js, počúva na dokumente). Preto sa
   tu počúva vo fáze zachytávania a klik na krúžok sa ďalej nepustí.
   Bez JavaScriptu ostane schéma zbalená – tak, ako ju vidí tlač.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  function panelsOf(svg) { return Array.prototype.slice.call(svg.querySelectorAll(".rk-panel")); }
  function baseBox(svg) {
    var vb = (svg.getAttribute("data-vb") || "").trim().split(/\s+/).map(Number);
    return vb.length === 4 && vb[3] > 0 ? vb : null;
  }

  /* poukladá otvorené výrezy pod seba a podľa nich nastaví výšku schémy */
  function layout(svg) {
    var vb = baseBox(svg);
    if (!vb) return;
    var y = vb[1] + vb[3], open = {}, n = 0;
    panelsOf(svg).forEach(function (p) {
      if (!p.classList.contains("is-open")) return;
      p.setAttribute("transform", "translate(0," + y + ")");
      y += Number(p.getAttribute("data-h")) || 0;
      open[p.getAttribute("data-rk-panel")] = 1;
      n++;
    });
    svg.setAttribute("viewBox", vb[0] + " " + vb[1] + " " + vb[2] + " " + (y - vb[1]));
    Array.prototype.forEach.call(svg.querySelectorAll("[data-rk]"), function (t) {
      var on = !!open[t.getAttribute("data-rk")];
      if (!t.classList.contains("rk-x")) { t.classList.toggle("is-open", on); t.setAttribute("aria-expanded", on ? "true" : "false"); }
    });
    var fig = svg.closest("figure");
    if (fig) {
      fig.classList.toggle("has-rk-open", n > 0);
      var all = fig.querySelector(".rk-all");
      if (all) {
        var total = panelsOf(svg).length, full = n === total;
        all.setAttribute("aria-pressed", full ? "true" : "false");
        all.textContent = full ? "− Zbaliť podrobnosti" : "+ Rozbaliť všetky podrobnosti (" + total + ")";
      }
    }
    /* v lupe sa veľkosť počíta z viewBoxu pri otvorení → prepočítať */
    if (svg.closest(".pf-lightbox")) { try { window.dispatchEvent(new Event("resize")); } catch (e) {} }
  }

  function reveal(el) {
    if (!el || !el.getBoundingClientRect) return;
    var r = el.getBoundingClientRect(), H = window.innerHeight || document.documentElement.clientHeight;
    if (r.bottom <= H - 8 && r.top >= 56) return;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dy = r.height > H - 80 ? r.top - 64 : r.bottom - H + 16;
    try { window.scrollBy({ top: dy, behavior: reduce ? "auto" : "smooth" }); } catch (e) { window.scrollBy(0, dy); }
  }

  function toggle(svg, id, force) {
    var p = null;
    panelsOf(svg).forEach(function (q) { if (q.getAttribute("data-rk-panel") === id) p = q; });
    if (!p) return;
    var on = force === undefined ? !p.classList.contains("is-open") : force;
    p.classList.toggle("is-open", on);
    layout(svg);
    if (on && !svg.closest(".pf-lightbox")) setTimeout(function () { reveal(p); }, 30);
  }

  function setAll(svg, on) {
    panelsOf(svg).forEach(function (p) { p.classList.toggle("is-open", on); });
    layout(svg);
  }

  /* odkaz v schéme → klik na obyčajný odkaz mimo obrázka (site.js, peek.js ho spracujú ako každý iný) */
  var proxy = null;
  function follow(href) {
    if (!proxy) {
      proxy = document.createElement("a");
      proxy.className = "xref";
      proxy.setAttribute("aria-hidden", "true");
      proxy.tabIndex = -1;
      proxy.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
      document.body.appendChild(proxy);
    }
    proxy.setAttribute("href", href);
    proxy.click();
  }

  function hit(e) {
    var t = e.target;
    if (!t || !t.closest) return null;
    var svg = t.closest(".chart svg");
    if (!svg) return null;
    var rk = t.closest("[data-rk]");
    if (rk && svg.contains(rk)) return { svg: svg, rk: rk };
    var a = t.closest("a.rk-a");
    if (a && svg.contains(a)) return { svg: svg, a: a };
    return null;
  }
  function act(h) {
    if (h.rk) toggle(h.svg, h.rk.getAttribute("data-rk"));
    else follow(h.a.getAttribute("href"));
  }

  document.addEventListener("click", function (e) {
    var all = e.target && e.target.closest && e.target.closest(".rk-all");
    if (all) {
      var fig = all.closest("figure"), svg = fig && fig.querySelector("svg");
      if (svg) setAll(svg, all.getAttribute("aria-pressed") !== "true");
      return;
    }
    var h = hit(e);
    if (!h) return;
    e.preventDefault();
    e.stopPropagation();
    act(h);
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var h = hit(e);
    if (!h) return;
    e.preventDefault();
    e.stopPropagation();
    act(h);
  }, true);

  /* po načítaní: stav krúžkov a tlačidla zodpovedá tomu, čo je (ne)otvorené */
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".chart svg[data-vb]"), layout);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

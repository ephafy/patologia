/* prepínač zobrazenia mobil ↔ počítač (tlačidlo v hlavičke vedľa „Pojmy“; na hube vedľa inštalácie).
   Zdieľaný súbor všetkých kníh (KNIHY-CORE); zdieľanú vrstvu (glossary.js, site.js) nemení. Samotné prepnutie robí skorý skript
   assets/js/view-early.js (v <head>); tu je len tlačidlo, uloženie režimu a nastavenia.
   · prepnutie = uloženie režimu (localStorage pf-view) a obnovenie stránky; mení sa len rozloženie, nie veľkosť písma;
   · ozubené koleso: nastavenia – veľkosť písma a vecí (pf-zoom, 70–160 %; 100 % = základ stránky; mení sa mierka
     --z zo site.css, takže to funguje ako zoom v prehliadači);
   · tlačidlo v ráme (kapitola v čítači hubu) pošle správu rodičovi; zmenu robí najvyšší dokument. */
(function () {
  "use strict";
  var KEY = "pf-view", NARROW = 820;
  var root = document.documentElement;
  var isTop = window.parent === window;
  if (/[?&]embed=/.test(location.search)) return;       /* náhľad kapitoly (peek.js) nemá hlavičku */

  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* file:// – bez pamätania */ } }
  function emulated() { return root.classList.contains("pf-mobile") || root.classList.contains("pf-desktop"); }
  function layout() {
    if (root.classList.contains("pf-mobile")) return "mobile";
    if (root.classList.contains("pf-desktop")) return "desktop";
    return root.clientWidth <= NARROW ? "mobile" : "desktop";
  }

  var PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>';
  var MONITOR = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/></svg>';

  /* zmenu robí len najvyšší dokument; ostatné mu ju pošlú */
  function apply(mode) {
    save(mode);
    location.reload();
  }
  function route(mode) {
    if (!isTop) { try { window.parent.postMessage({ pf: "view", mode: mode }, "*"); } catch (e) { /* nič */ } return; }
    apply(mode);
  }
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.pf !== "view" || e.source === window) return;
    if (d.mode === "mobile" || d.mode === "desktop") route(d.mode);
  });

  var btn = null;
  function refresh() {
    if (!btn) return;
    var cur = layout();
    var next = cur === "mobile" ? "počítačové" : "mobilné";
    var now = cur === "mobile" ? "mobilné" : "počítačové";
    btn.innerHTML = (cur === "mobile" ? PHONE : MONITOR) + '<span class="lbl">' + (cur === "mobile" ? "Mobil" : "PC") + "</span>";
    btn.setAttribute("aria-label", "Zobrazenie: " + now + ". Prepnúť na " + next + " zobrazenie");
    btn.title = "Zobrazenie: " + now + " – prepnúť na " + next;
  }

  function setup() {
    var header = document.querySelector(".site-header");
    if (!header || document.querySelector(".pf-view-toggle")) return;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pf-view-toggle";
    var pojmy = header.querySelector(".pf-terms-toggle");
    var toc = header.querySelector(".site-toc-toggle");
    var inst = header.querySelector(".app-install");
    if (pojmy) pojmy.insertAdjacentElement("afterend", btn);
    else if (toc) header.insertBefore(btn, toc);
    else if (inst) header.insertBefore(btn, inst);
    else header.appendChild(btn);
    btn.addEventListener("click", function () { route(layout() === "mobile" ? "desktop" : "mobile"); });
    refresh();
    setupSettings();
  }

  /* ── nastavenia: veľkosť písma (ako zoom v prehliadači) ───────────── */
  var ZKEY = "pf-zoom", ZMIN = 70, ZMAX = 160, ZSTEP = 5;
  var GEAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';

  function zoomGet() {
    var v = NaN;
    try { v = parseInt(localStorage.getItem(ZKEY), 10); } catch (e) { /* nič */ }
    return v >= ZMIN && v <= ZMAX ? v : 100;
  }
  function zoomSet(p) {
    if (p === 100) root.style.removeProperty("--z"); else root.style.setProperty("--z", String(Math.round(1.2 * p) / 100));
    /* site.js a glossary.js si poznámky na okraji a vysvetlivky prepočítajú pri zmene okna */
    window.dispatchEvent(new Event("resize"));
  }
  function zoomApply(p) {
    p = Math.max(ZMIN, Math.min(ZMAX, p));
    try { if (p === 100) localStorage.removeItem(ZKEY); else localStorage.setItem(ZKEY, String(p)); } catch (e) { /* nič */ }
    zoomSet(p);
    return p;
  }
  /* zmena v inom okne alebo ráme (kapitola v čítači hubu) */
  window.addEventListener("storage", function (e) {
    if (e.key !== ZKEY) return;
    zoomSet(zoomGet());
    if (pop) syncPop();
  });

  var gear = null, pop = null, range = null, out = null;
  function syncPop() { var p = zoomGet(); range.value = p; out.textContent = p + " %"; }
  function closePop() { if (pop) { pop.hidden = true; gear.setAttribute("aria-expanded", "false"); } }

  function setupSettings() {
    gear = document.createElement("button");
    gear.type = "button";
    gear.className = "pf-view-toggle pf-gear";
    gear.innerHTML = GEAR;
    gear.setAttribute("aria-label", "Nastavenia");
    gear.title = "Nastavenia – veľkosť písma";
    gear.setAttribute("aria-haspopup", "dialog");
    gear.setAttribute("aria-expanded", "false");
    btn.insertAdjacentElement("afterend", gear);

    pop = document.createElement("div");
    pop.className = "pf-set";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Nastavenia");
    pop.hidden = true;
    pop.innerHTML =
      '<div class="r"><span>Veľkosť písma</span><output></output></div>' +
      '<div class="c"><button type="button" data-d="-1" aria-label="Zmenšiť písmo">A−</button>' +
      '<input type="range" min="' + ZMIN + '" max="' + ZMAX + '" step="' + ZSTEP + '" aria-label="Veľkosť písma">' +
      '<button type="button" data-d="1" aria-label="Zväčšiť písmo">A+</button></div>' +
      '<button type="button" class="z">Pôvodná veľkosť</button>';
    document.body.appendChild(pop);
    range = pop.querySelector("input");
    out = pop.querySelector("output");
    syncPop();

    gear.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!pop.hidden) { closePop(); return; }
      syncPop();
      pop.hidden = false;
      gear.setAttribute("aria-expanded", "true");
    });
    range.addEventListener("input", function () { out.textContent = zoomApply(+range.value) + " %"; });
    pop.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      zoomApply(b.className === "z" ? 100 : zoomGet() + (+b.getAttribute("data-d")) * ZSTEP);
      syncPop();
    });
    document.addEventListener("click", function (e) { if (!pop.hidden && !pop.contains(e.target)) closePop(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePop(); });
  }

  window.addEventListener("resize", refresh);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
})();

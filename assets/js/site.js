/* ══════════════════════════════════════════════════════════════════════
   SITE SHELL — behaviour shared by every chapter page.
   Classic script (no ES modules / fetch) on purpose: the book is read via
   file://, where module imports and fetch() are blocked cross-origin.
   Builds the chapter sidebar straight from the page's own <h2 class="sec-h">
   / <h3 class="sub-h"> headings, so a new chapter needs no manifest upkeep.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* Any chart's inline <text data-wrap="N"> is auto-wrapped to fit N SVG
     user-units, using the text's own real rendered width (getComputedTextLength)
     rather than a guessed character count. This is what stops long annotation
     captions from overrunning their column and colliding with neighbouring
     text — the fix applies to every current and future chart with no
     per-chart layout work beyond setting data-wrap to the available width.

     Runs more than once: on DOMContentLoaded the page is still set in the
     fallback serif, which is narrower than Source Serif 4, so lines measured
     then overflow once the web font arrives. Re-running on load and on
     document.fonts.ready re-measures with the real font. To stay idempotent
     the function stashes the untouched text and viewBox on first pass and
     restores them before每 re-wrap — without that, a second pass would read
     back the already-split tspans (whose textContent concatenates with no
     spaces, welding words together) and would expand the viewBox twice. */
  function wrapSvgTexts() {
    var bySvg = new Map();
    document.querySelectorAll(".chart svg text[data-wrap]").forEach(function (el) {
      var svg = el.ownerSVGElement;
      if (!svg) return;
      if (!bySvg.has(svg)) bySvg.set(svg, []);
      bySvg.get(svg).push(el);
    });

    bySvg.forEach(function (texts, svg) {
      var layouts = [];

      /* restore the pristine viewBox so the height grows from the original,
         not from whatever the previous pass already stretched it to */
      if (svg.dataset.pfViewbox === undefined) {
        svg.dataset.pfViewbox = svg.getAttribute("viewBox") || "";
      } else if (svg.dataset.pfViewbox) {
        svg.setAttribute("viewBox", svg.dataset.pfViewbox);
      }

      texts.forEach(function (textEl) {
        var maxWidth = parseFloat(textEl.getAttribute("data-wrap"));
        if (textEl.dataset.pfText === undefined) {
          textEl.dataset.pfText = textEl.textContent;
        }
        var original = textEl.dataset.pfText;
        textEl.textContent = original;
        var words = original.trim().split(/\s+/);
        var fontSize = parseFloat(getComputedStyle(textEl).fontSize) || 9.5;
        var lineHeight = fontSize * 1.3;

        var lines = [];
        var current = "";
        words.forEach(function (word) {
          var attempt = current ? current + " " + word : word;
          textEl.textContent = attempt;
          var fits = textEl.getComputedTextLength() <= maxWidth;
          if (!fits && current) {
            lines.push(current);
            current = word;
          } else {
            current = attempt;
          }
        });
        if (current) lines.push(current);
        textEl.textContent = original;

        layouts.push({ el: textEl, lines: lines, lineHeight: lineHeight });
      });

      /* Výška schémy po zalomení sa dopočíta zo skutočného obsahu (+ okraj PAD) – nie
         pripočítaním riadkov naslepo: zalomený text v strede schémy by inak
         nechal dole prázdny pás (tools/schemy.js to hlási ako nerovnaké okraje; 2. 11. 2026). */
      var vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
      var vbOk = vb.length === 4 && vb.every(function (n) { return !isNaN(n); });
      var PAD = 12;   /* rovnaký okraj ako tools/schemy.js --fix */

      layouts.forEach(function (l) {
        if (l.lines.length <= 1) return;
        var x = l.el.getAttribute("x") || "0";
        l.el.textContent = "";
        l.lines.forEach(function (line, i) {
          var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspan.setAttribute("x", x);
          tspan.setAttribute("dy", i === 0 ? "0" : l.lineHeight);
          tspan.textContent = line;
          l.el.appendChild(tspan);
        });
      });

      if (vbOk) {
        var extra = 0;
        layouts.forEach(function (l) { extra = Math.max(extra, (l.lines.length - 1) * l.lineHeight); });
        var h = vb[3] + (extra > 0 ? extra + 4 : 0);
        try {
          var b1 = svg.getBBox();
          if (b1.height > 0) h = Math.max(vb[3], b1.y + b1.height + PAD - vb[1]);
        } catch (e) {}
        if (Math.abs(h - vb[3]) > 0.5) { vb[3] = Math.round(h * 10) / 10; svg.setAttribute("viewBox", vb.join(" ")); }
      }
    });
  }

  function slugify(num, fallback) {
    var base = (num || fallback || "").trim();
    return "sec-" + base.replace(/[^\w.-]+/g, "").replace(/\./g, "-");
  }

  function headingTitle(h) {
    var parts = [];
    h.childNodes.forEach(function (node) {
      if (node.nodeType === 1 && node.classList.contains("n")) return;
      parts.push(node.textContent);
    });
    return parts.join("").trim();
  }

  function buildTOC() {
    var scope = document.querySelector(".page") || document.body;
    var heads = scope.querySelectorAll("h2.sec-h, h3.sub-h");
    var nav = document.querySelector(".site-sidebar nav");
    if (!nav || !heads.length) return [];

    var entries = [];
    heads.forEach(function (h) {
      var numEl = h.querySelector(".n");
      var num = numEl ? numEl.textContent.trim() : "";
      var title = headingTitle(h);
      if (!h.id) h.id = slugify(num, title);

      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.className = h.tagName === "H3" ? "sub" : "top";
      var numSpan = document.createElement("span");
      numSpan.className = "num";
      numSpan.textContent = num;
      a.appendChild(numSpan);
      a.appendChild(document.createTextNode(title));
      nav.appendChild(a);

      entries.push({ heading: h, link: a });
    });
    return entries;
  }

  function setupProgress() {
    var bar = document.querySelector(".reading-progress .bar");
    var track = document.querySelector(".reading-progress");
    var pct = document.querySelector(".reading-pct");
    if (!bar) return;

    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      var ratio = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      var percent = Math.round(ratio * 100);
      bar.style.width = (ratio * 100).toFixed(1) + "%";
      if (track) track.setAttribute("aria-valuenow", String(percent));
      if (pct) pct.textContent = percent + " %";
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    /* spodný pás (.pf-dock, site.css): samostatná kapitola presunie svoje % do pásu vedľa AI; kapitola v ráme čítačky
       ukazuje % v páse hlavného okna (kópia s data-mirror) a vlastné skryje – v ráme by stálo nad textom a mimo radu
       (pokyn autora 12. 11. 2026). Bez prístupu k hlavnému oknu (file:// bez povolenia) ostane vlastné vpravo dole. */
    if (pct && window.top === window) {
      var r = dockSide("r");
      if (r) { r.insertBefore(pct, r.firstChild); document.documentElement.classList.add("pf-dock-on"); }
    }
    function pushPct() {
      if (!pct || window.top === window) return;
      try {
        var fe = window.frameElement;
        if (!fe || fe.classList.contains("rd-next")) return;   /* rám, ktorý sa ešte len načítava pod starým */
        var td = window.top.document, r = td.querySelector(".pf-dock-r");
        if (!r) return;
        var m = r.querySelector(".reading-pct[data-mirror]");
        if (!m) {
          m = td.createElement("div");
          m.className = "reading-pct";
          m.setAttribute("data-mirror", "");
          m.setAttribute("aria-hidden", "true");
          r.insertBefore(m, r.firstChild);
        }
        m.textContent = pct.textContent;
        /* farebný pruh čítania tiež v hlavnom okne – úplne dole pod pásom (rám kapitoly končí nad pásom) */
        var pb = td.querySelector(".reading-progress[data-mirror]");
        if (!pb) {
          pb = td.createElement("div");
          pb.className = "reading-progress";
          pb.setAttribute("data-mirror", "");
          pb.setAttribute("aria-hidden", "true");
          pb.appendChild(td.createElement("div")).className = "bar";
          td.body.appendChild(pb);
        }
        pb.firstChild.style.width = bar.style.width;
        document.documentElement.classList.add("pct-in-dock");
      } catch (e) { /* iný pôvod – ostane vlastné % */ }
    }
    window.PF_pushPct = pushPct;
    window.addEventListener("scroll", function () { requestAnimationFrame(pushPct); }, { passive: true });
    window.addEventListener("load", pushPct);
    pushPct();
    setTimeout(pushPct, 400);
  }

  function setupActiveHighlight(entries) {
    if (!entries.length || !("IntersectionObserver" in window)) return;
    var current = null;

    /* skok po odkaze v tej istej stránke (obsah vľavo aj odkaz v texte).
       Pôvodne ho robil prehliadač sám a počas plynulého posunu sa pri KAŽDEJ
       preletenej sekcii volalo replaceState(#sekcia) a posun bočného panela —
       niektoré prehliadače tým bežiaci posun zrušia a ten sa zasekol pri
       najbližšej sekcii. Počas letu (flying) sa preto len prepína zvýraznenie;
       adresa sa nastaví raz na začiatku a panel sa dorovná až po dojazde. */
    var flying = false, flyTimer = null;
    function land() {
      clearTimeout(flyTimer);
      if (!flying) return;
      flying = false;
      if (current) syncSidebar(current);
    }
    function flyingScroll() { clearTimeout(flyTimer); flyTimer = setTimeout(land, 180); }
    window.addEventListener("scroll", function () { if (flying) flyingScroll(); }, { passive: true });
    if ("onscrollend" in window) window.addEventListener("scrollend", land);

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = "";
      try { id = decodeURIComponent(a.getAttribute("href").slice(1)); } catch (x) {}
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      /* v ráme hlavnej stránky (index.html) by pushState pridal záznam
         do histórie celej karty a „← Obsah“ / Späť by vrátili len tento skok */
      var framed = window.top !== window.self;
      if (window.history && history.pushState) history[framed ? "replaceState" : "pushState"](null, "", "#" + id);
      flying = true;
      flyTimer = setTimeout(land, 1500); /* poistka, keby posun vôbec nenastal */
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });

    /* pôvodne entry.link.scrollIntoView({block:"nearest"}) — to posúva aj
       stránku a ruší jej plynulý posun. Posúvame len samotný bočný panel. */
    function syncSidebar(entry) {
      var sb = entry.link.closest(".site-sidebar");
      if (!sb) return;
      var lr = entry.link.getBoundingClientRect(), sr = sb.getBoundingClientRect();
      if (lr.top < sr.top + 8) sb.scrollTop += lr.top - sr.top - 8;
      else if (lr.bottom > sr.bottom - 8) sb.scrollTop += lr.bottom - sr.bottom + 8;
    }

    function activate(entry) {
      if (current === entry) return;
      entries.forEach(function (e) {
        e.link.classList.remove("active");
      });
      entry.link.classList.add("active");
      current = entry;
      if (flying) return;
      if (window.history && history.replaceState) {
        history.replaceState(null, "", "#" + entry.heading.id);
      }
      syncSidebar(entry);
    }

    var observer = new IntersectionObserver(
      function (observed) {
        var visible = observed.filter(function (e) {
          return e.isIntersecting;
        });
        if (!visible.length) return;
        visible.sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        var top = visible[0].target;
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].heading === top) {
            activate(entries[i]);
            break;
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    entries.forEach(function (e) {
      observer.observe(e.heading);
    });
  }

  function setupSidebarToggle() {
    var toggle = document.querySelector(".site-toc-toggle");
    var shell = document.querySelector(".site-shell");
    if (!toggle || !shell) return;

    toggle.addEventListener("click", function () {
      var open = shell.classList.toggle("toc-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    shell.addEventListener("click", function (e) {
      if (window.innerWidth > 980) return;
      var link = e.target.closest && e.target.closest(".site-sidebar a");
      if (link || e.target === shell) {
        shell.classList.remove("toc-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── dvojica obrázkov vedľa seba (.fig-row) ─────────────────────────
     CSS dá obom obrázkom rovnakú výšku (flex podľa pomeru strán). Keď má jeden
     oveľa dlhší popis, pod kratším ostane prázdne miesto – šírky sa preto
     posunú (najviac o 35 %), aby obe figúry aj s popisom končili rovnako nízko.
     Len pre dvojicu v jednom riadku (nie mobil, nie tlač). */
  /* Skúšanie šírok bez prepočtu celej stránky (16. 11. 2026, autor: „skús skrátiť čas načítania“). Každá skúšaná šírka
     menila výšku bloku, a teda polohu všetkého pod ním – prehliadač prepočítal celú kapitolu (≈ 5 ms × desiatky pokusov
     × každý blok; v kap. 12 PATOLY spolu ≈ 0,8 s). Počas skúšania sa preto blok vyberie z toku (position:absolute, tá istá
     šírka) a jeho miesto drží rovnako vysoká výplň: výšky stĺpcov vychádzajú rovnako, no zvyšok stránky sa nehýbe.
     Všetko prebehne v jednom kroku skriptu – na obrazovke sa nič z toho neukáže. */
  function isolated(row, fn, back) {
    var st = row.style, cs = getComputedStyle(row), ph = document.createElement("div");
    var old = [st.position, st.width, st.margin, st.boxSizing, st.top, st.left];
    var r = row.getBoundingClientRect(), op = row.offsetParent, top, left;
    /* blok ostane presne tam, kde bol (top/left voči tomu istému predkovi, voči ktorému sa umiestňuje position:absolute) –
       prehliadač, ktorý drží čítané miesto podľa prvku na obrazovke (scroll anchoring), tak nevidí žiadny pohyb, ani keď
       je tým prvkom práve tento blok (prvá verzia ho nechala skĺznuť pod výplň → stránka po obnovení poskočila o 3 px;
       zachytila kontrola „obnovenie stránky“ v rozlozenie.js) */
    if (op && !(op === document.body && getComputedStyle(op).position === "static")) {
      var o = op.getBoundingClientRect();
      top = r.top - o.top - op.clientTop + op.scrollTop; left = r.left - o.left - op.clientLeft + op.scrollLeft;
    } else { top = r.top + window.pageYOffset; left = r.left + window.pageXOffset; }
    ph.className = "pf-bal-ph";
    ph.setAttribute("aria-hidden", "true");
    ph.style.cssText = "height:" + r.height + "px;margin:" + cs.marginTop + " 0 " + cs.marginBottom + ";visibility:hidden;pointer-events:none;clear:" + cs.clear;
    row.parentNode.insertBefore(ph, row);
    st.boxSizing = "border-box"; st.width = r.width + "px"; st.margin = "0"; st.top = top + "px"; st.left = left + "px"; st.position = "absolute";
    try { return fn(); }
    finally {
      back();   // šírky späť do stavu pred skúšaním – nové nastaví volajúci až po návrate bloku do toku
      st.position = old[0]; st.width = old[1]; st.margin = old[2]; st.boxSizing = old[3]; st.top = old[4]; st.left = old[5];
      if (ph.parentNode) ph.parentNode.removeChild(ph);
      /* Blok sa vracia do toku presne v stave, v akom z neho odišiel (back), a tento návrat sa prepočíta hneď a zvlášť.
         Zmena „position“ na predkovi čítaného miesta totiž kotvenie posunu v danom prepočte vypína: keby sa v ňom zišla
         so zmenou šírok (skúšaných alebo výsledných), stránka by ostala posunutá – 3 px po obnovení stránky v kap. 1 PATOLY,
         100–300 px pri prepočte okraja, keď sa to sčítalo za všetky bloky nad čítaným miestom (zachytili kontroly
         „obnovenie stránky“ a „prepočet okraja posunul čítaný text“ v rozlozenie.js). */
      void row.offsetHeight;
    }
  }
  function balanceFigRows() {
    Array.prototype.forEach.call(document.querySelectorAll(".fig-row"), function (row) {
      var figs = Array.prototype.filter.call(row.children, function (c) { return c.classList.contains("fig"); });
      if (figs.length !== 2) return;
      var a = figs[0], b = figs[1];
      /* Rad, ktorému sa nezmenila šírka, text, písmo ani rozloženie (mobil × počítač), si šírky drží (16. 11. 2026). Dovtedy sa
         každý rad vyrovnával nanovo pri každom „pf-relayout“, načítaní písma a každom načítanom obrázku v stĺpcoch – aj počas
         čítania, keď sa pri rolovaní dočítavali obrázky. */
      var im = row.querySelectorAll("img"), nIm = 0, cs0 = getComputedStyle(row);
      for (var q = 0; q < im.length; q++) if (!(im[q].getAttribute("width") && im[q].getAttribute("height")) && im[q].complete && im[q].naturalWidth) nIm++;
      var k = [row.offsetWidth, row.textContent.length, figs.length, nIm, cs0.display, cs0.fontSize, document.fonts ? document.fonts.status : ""].join("|");
      if (row._bk === k) return;
      row._bk = k;
      a.style.flex = b.style.flex = "";
      if (getComputedStyle(row).display !== "flex" || a.offsetTop !== b.offsetTop) return;
      function diff() { return a.offsetHeight - b.offsetHeight; }
      var d0 = diff();
      if (Math.abs(d0) < 24) return;
      var w0 = a.getBoundingClientRect().width, W = w0 + b.getBoundingClientRect().width;
      /* žiadna figúra užšia než 170 px (popis by sa rozpadol do stĺpca slov) a posun najviac o 35 % */
      var lo = Math.max(W * 0.2, 170, w0 * 0.65, W - Math.max(170, (W - w0) * 1.35));
      var hi = Math.min(W * 0.8, W - 170, w0 * 1.35, W - (W - w0) * 0.65);
      if (!(hi > lo)) return;
      function set(w) { a.style.flex = "0 0 " + w + "px"; b.style.flex = "0 0 " + (W - w) + "px"; }
      /* výška figúry nemusí rásť so šírkou plynulo (popis sa zalamuje), preto sa
         šírky prejdú po krokoch a vyberie sa tá s najmenším rozdielom výšok */
      var best = Math.abs(d0), bestW = null, N = 16;
      isolated(row, function () {
        for (var i = 0; i <= N; i++) {
          var w = lo + (hi - lo) * i / N;
          set(w);
          var d = Math.abs(diff());
          if (d < best - 1) { best = d; bestW = w; }
        }
      }, function () { a.style.flex = b.style.flex = ""; });
      if (bestW !== null && best <= Math.abs(d0) * 0.7) set(bestW);
      else a.style.flex = b.style.flex = "";
    });
  }
  /* Stĺpce z editora (:::stlpce 60 40 → div.stlpce, 12. 11. 2026, autor: „moje rozloženie ber orientačne… nech čo najviac
     zarovná dolné okraje, ale nech to neposúva šírky stĺpcov o veľa“; 16. 11. 2026: „zdokonaľ ten systém… aby bola rovnaká
     dĺžka, nech je to toggle, aj možnosť, aby obrázky boli rovnako vysoké v riadku“). Tri režimy bloku (data-vyrovnat):
       bez údaja   – SPODKY: pomer šírok z .md je východisko; šírky sa posunú najviac o 15 percentuálnych bodov (a žiadny stĺpec
                     sa nezúži o viac ako 30 %), aby stĺpce končili čo najbližšie pri sebe. Dva stĺpce: hrubý prechod rozsahu
                     a dve jemné kolá okolo najlepšej šírky (výška nerastie so šírkou plynulo – text sa zalamuje). Tri a štyri
                     stĺpce: šírka sa presúva medzi dvojicami stĺpcov, kým rozdiel najvyšší − najnižší klesá.
       „obrazky“   – OBRÁZKY ROVNAKO VYSOKÉ: šírky stĺpcov sa určia z pomerov strán prvých obrázkov v stĺpcoch tak, aby
                     obrázky vyšli rovnako vysoké (stĺpec bez obrázka si šírku drží).
       „nie“       – PEVNÉ: šírky presne podľa zápisu.
     Najprv najhlbšie (vnorené) stĺpce, potom vonkajšie a ešte raz vnorené, lebo zmena vonkajšej šírky mení ich výšku.
     Kde je rozloženie pod sebou (mobil), sa nič nemení. Mriežka (.mriezka) má riadky rovnako vysoké sama. */
  function balanceStlpce() {
    var rows = Array.prototype.slice.call(document.querySelectorAll(".stlpce"));
    if (!rows.length) return;
    function depth(el) { var d = 0; for (var n = el.parentNode; n; n = n.parentNode) if (n.classList && n.classList.contains("stlpce")) d++; return d; }
    /* Stabilita (16. 11. 2026, autor: „pri prepínaní vecí nech je to čo najviac stabilné“): blok, ktorému sa nezmenila šírka,
       obsah, režim ani načítané obrázky a písmo, si šírky drží – nevracia sa na okamih do pôvodného pomeru (stránka by sa
       pri každom „resize“ natiahla a vrátila, a s ňou poloha čítaného textu). */
    /* značky vysvetliviek (.pf-term – len podfarbenie, glossary.js ich vkladá až po prvom vyrovnaní) sa do kľúča nerátajú:
       rozloženie nemenia a celé vyrovnanie by sa pre ne opakovalo */
    function key(r) {
      var im = r.querySelectorAll("img"), n = 0, i;
      /* obrázok s width a height v HTML (build ich píše) má miesto vyhradené už pred načítaním – jeho načítanie rozloženie
         nemení a blok sa preň nevyrovnáva znova (16. 11. 2026: stĺpce s obrázkami sa vyrovnávali po každom načítanom obrázku) */
      for (i = 0; i < im.length; i++) if (!(im[i].getAttribute("width") && im[i].getAttribute("height")) && im[i].complete && im[i].naturalWidth) n++;
      var cs = getComputedStyle(r);
      return [r.offsetWidth, r.getAttribute("data-vyrovnat") || "", r._tpl0, n, r.textContent.length, r.querySelectorAll("*").length - r.querySelectorAll(".pf-term").length,
        cs.display, cs.fontSize, document.fonts ? document.fonts.status : ""].join("|");
    }
    rows.forEach(function (r) {
      if (r._tpl0 === undefined) r._tpl0 = r.style.gridTemplateColumns || "";
      r._d = depth(r);
      r._dirty = r._key !== key(r);
    });
    rows.forEach(function (r) {   // zmena vonkajšieho bloku mení šírku vnorených
      for (var n = r.parentNode; n && !r._dirty; n = n.parentNode) if (n._dirty && n.classList && n.classList.contains("stlpce")) r._dirty = true;
    });
    var dirty = rows.filter(function (r) { return r._dirty; });
    if (!dirty.length) return;
    dirty.forEach(function (r) { r.style.gridTemplateColumns = r._tpl0; });
    dirty.sort(function (a, b) { return b._d - a._d; });
    function setW(row, ws) { row.style.gridTemplateColumns = ws.map(function (w) { return "minmax(0," + w.toFixed(1) + "fr)"; }).join(" "); }
    /* prvý obrázok stĺpca (nie z vnorených stĺpcov) */
    function firstImg(col) {
      var all = col.querySelectorAll("figure img, figure svg");
      for (var i = 0; i < all.length; i++) {
        var p = all[i].parentNode;
        while (p && p !== col && !(p.classList && p.classList.contains("stlpce"))) p = p.parentNode;
        if (p === col) return all[i];
      }
      return null;
    }
    function images(row, cols) {
      var W = 0, ws = cols.map(function (c) { var w = c.getBoundingClientRect().width; W += w; return w; });
      for (var pass = 0; pass < 3; pass++) {
        var k = [], free = W, sum = 0, n = 0;
        cols.forEach(function (c, i) {
          var im = firstImg(c), r = im ? im.getBoundingClientRect() : null;
          if (!r || r.width < 2 || r.height < 2) { k.push(0); free -= ws[i]; return; }
          /* výška obrázka = šírka stĺpca × (šírka obrázka / šírka stĺpca) / pomer strán → rovnaká výška: šírka ∝ k */
          k.push((r.width / r.height) / (r.width / ws[i]));
          sum += k[i]; n++;
        });
        if (n < 2 || !(sum > 0) || free < 60 * n) return;
        ws = ws.map(function (w, i) { return k[i] ? Math.max(40, free * k[i] / sum) : w; });
        setW(row, ws);
        ws = cols.map(function (c) { return c.getBoundingClientRect().width; });
      }
    }
    function one(row) {
      var cols = Array.prototype.filter.call(row.children, function (c) { return c.classList.contains("stlpec"); });
      var mode = row.getAttribute("data-vyrovnat") || "";
      if (cols.length < 2 || cols.length > 4 || mode === "nie" || row.classList.contains("mriezka") || getComputedStyle(row).display !== "grid") return;
      var n = cols.length, i;
      for (i = 1; i < n; i++) if (cols[i].offsetLeft <= cols[i - 1].offsetLeft) return;   // pod sebou (mobil); zvislé zarovnanie mení offsetTop, preto ľavý okraj
      if (mode === "obrazky") { images(row, cols); return; }
      var wts = (row._tpl0.match(/[\d.]+(?=fr)/g) || []).map(parseFloat);
      if (wts.length !== n) wts = cols.map(function () { return 1; });
      var W = 0, tot = 0;
      cols.forEach(function (c) { W += c.getBoundingClientRect().width; });
      wts.forEach(function (x) { tot += x; });
      var w0 = wts.map(function (x) { return W * x / tot; });
      var lo = w0.map(function (w) { return Math.max(w - W * 0.15, w * 0.7); });
      var hi = w0.map(function (w) { return Math.min(w + W * 0.15, w * 1.3); });
      function diff() { var mx = -1, mn = 1e9; cols.forEach(function (c) { var h = c.offsetHeight; if (h > mx) mx = h; if (h < mn) mn = h; }); return mx - mn; }
      var prev = row.style.gridTemplateColumns, d0 = diff();
      if (d0 < 8) return;
      var best = d0, bestW = null;
      isolated(row, search, function () { row.style.gridTemplateColumns = prev; });
      if (bestW && d0 - best >= 5) setW(row, bestW);
      else row.style.gridTemplateColumns = prev;
      function tryW(ws) { setW(row, ws); var d = diff(); if (d < best - 0.5) { best = d; bestW = ws.slice(); return true; } return false; }
      function search() {
      if (n === 2) {
        var a = Math.max(lo[0], W - hi[1]), b = Math.min(hi[0], W - lo[1]);
        if (!(b > a)) return;
        var c0 = w0[0], step = (b - a) / 24;
        for (i = 0; i <= 24; i++) if (tryW([a + step * i, W - a - step * i])) c0 = a + step * i;
        for (var kolo = 0; kolo < 2; kolo++) {
          var st = step / 8, c1 = c0;
          for (i = -8; i <= 8; i++) { var w = c0 + st * i; if (w >= a && w <= b && tryW([w, W - w])) c1 = w; }
          c0 = c1; step = st;
        }
      } else {
        /* šírku dostáva najvyšší stĺpec a dáva ju najnižší (ten má kam rásť); až keď to nejde alebo nepomôže, ďalšie dvojice */
        var cur = w0.slice(), s = W * 0.04, guard = 0;
        while (s >= 1.5 && guard++ < 60) {
          setW(row, cur);
          var hs = cols.map(function (c) { return c.offsetHeight; }), ord = cols.map(function (c, j) { return j; });
          var vys = ord.slice().sort(function (p, q) { return hs[q] - hs[p]; }), niz = ord.slice().sort(function (p, q) { return hs[p] - hs[q]; });
          var moved = false;
          for (var xi = 0; xi < n && !moved; xi++) for (var yi = 0; yi < n && !moved; yi++) {
            var x = vys[xi], y = niz[yi];
            if (x === y || cur[x] + s > hi[x] + 0.5 || cur[y] - s < lo[y] - 0.5) continue;
            var t = cur.slice(); t[x] += s; t[y] -= s;
            if (tryW(t)) { cur = t; moved = true; }
          }
          if (!moved) s /= 2;
        }
      }
      }
    }
    dirty.forEach(one);
    dirty.forEach(function (r) { if (r._d > 0) one(r); });
    rows.forEach(function (r) { r._key = key(r); });
  }
  window.PF_balanceStlpce = balanceStlpce;
  function setupFigRows() {
    if (!document.querySelector(".fig-row, .stlpce")) return;
    var raf = null;
    /* Počas úvodnej animácie (html.pf-go – stránka je zmenšená, peek.js) sa nevyrovnáva: merané šírky sú skreslené a každá
       snímka animácie by bloky označila za zmenené (16. 11. 2026: vyrovnanie tak pri načítaní bežalo ≈ 12×, ≈ 0,5 s).
       Po animácii pošle peek.js „pf-relayout“ a vyrovnanie prebehne nad stránkou v skutočnej veľkosti. */
    var ran = false, fontsLate = false;
    function both() {
      if (document.documentElement.classList.contains("pf-go")) return;
      /* prvé vyrovnanie až s načítaným písmom: s náhradným vychádzajú výšky inak a celé hľadanie šírok by sa po načítaní
         písma opakovalo (stránka je dovtedy zakrytá – peek.js); poistka 1,5 s, keby písmo meškalo */
      if (!ran && !fontsLate && document.fonts && document.fonts.status === "loading") return;
      ran = true;
      balanceStlpce(); balanceFigRows();
    }
    function again() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(both); }
    both();
    setTimeout(function () { if (!ran) { fontsLate = true; again(); } }, 1500);
    window.addEventListener("resize", again);
    window.addEventListener("load", again);
    window.addEventListener("pf-relayout", again);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
    Array.prototype.forEach.call(document.querySelectorAll(".stlpce img"), function (im) { if (!im.complete) im.addEventListener("load", again, { once: true }); });
  }

  /* The blue/red/grey callouts (.note/.flag/.plain) read as margin
     asides, not core text — on wide screens they float into the
     .site-spacer margin, vertically centered on wherever they sit in
     the flow. Below 981px there's no spacer to float into, so they
     just stay put in the text (see the matching CSS breakpoint). */
  function setupSideNotes() {
    var page = document.querySelector(".page");
    if (!page) return;
    var mq = window.matchMedia("(min-width: 981px)");

    function notesInOrder() {
      return Array.prototype.slice.call(page.querySelectorAll(".note, .flag, .plain, .box.aside") /* + .box.aside */);
    }

    /* Poznámka na okraji sedí spodkom na svojej čiare podľa výšky zmeranej pri rozložení. Keď sa jej výška zmení
       neskôr (13. 11. 2026, opravy.docx: pri zoome Ctrl + koliesko ostal box „Pozor“ odpojený nad čiarou – text v boxe
       sa prelial až po rozložení), stránka sa nemusí zmeniť a ResizeObserver na .page nič nehlási. Sleduje sa preto
       aj každá poznámka; prepočíta sa len pri skutočnej zmene výšky na okraji (inak by sa rozloženie volalo dookola). */
    var noteRO = window.ResizeObserver ? new ResizeObserver(function (ents) {
      var again = false;
      ents.forEach(function (e) {
        var el = e.target, h = Math.round(e.contentRect.height);
        if (el._roH != null && Math.abs(el._roH - h) > 1 && el.classList.contains("side-note")) again = true;
        el._roH = h;
      });
      if (again) scheduleLayout();
    }) : null;

    function layout() {
      var notes = notesInOrder();
      if (!notes.length) return;
      if (noteRO) notes.forEach(function (el) { if (!el._roOn) { el._roOn = true; noteRO.observe(el); } });

      /* Na širokej obrazovke poznámky ostávajú na okraji aj počas prepočtu (16. 11. 2026): predtým sa všetky na okamih
         vrátili do textu a zasa vybrali – stránka sa pri tom natiahla o desiatky tisíc px a prehliadač podľa toho
         posúval odrolovanú stránku (scroll anchoring). */
      var wide = mq.matches;
      notes.forEach(function (el) {
        if (!wide) { el.classList.remove("side-note"); el.style.top = ""; }
        if (el._lead) el._lead.style.display = "none";
        if (el._anchor) el._anchor.style.marginTop = "";
      });
      if (!wide) return;

      /* poznámka pri vybratí z toku textu zanechá nulovo vysokú
         kotvu, takže jej pôvodné miesto sa dá odmerať AŽ PO tom, čo sa
         všetky poznámky vyňali (pôvodne sa merali ešte v texte, potom sa
         text skrátil a poznámky ostali vyššie/nižšie než ich odsek).
         Kotva je čiara vo farbe a hrúbke ľavého okraja poznámky: vedie z
         miesta v texte doprava až k poznámke, ktorá na nej sedí SPODKOM.
         Pri kolízii sa poznámka posúva len nadol (čiara ju potom trafí z boku). */
      notes.forEach(function (el) {
        if (!el._anchor) {
          var m = document.createElement("span");
          m.className = "side-anchor";
          m.setAttribute("aria-hidden", "true");
          el.parentNode.insertBefore(m, el);
          el._anchor = m;
        } else if (el._anchor.nextElementSibling !== el) {
          /* kotva patrí tesne pred poznámku: blok presunutý inam (editor kapitoly) si ju berie so sebou –
             inak by čiara viedla z miesta, kde poznámka stála predtým */
          el.parentNode.insertBefore(el._anchor, el);
        }
        el.classList.add("side-note");
      });
      notes.forEach(function (el) {
        var cs = getComputedStyle(el);
        /* čiara má farbu, hrúbku aj ŠTÝL ľavého pásika poznámky – k prerušovanému
           pásiku („Môžeš počuť“) vedie aj prerušovaná čiara */
        var c = cs.borderLeftColor, dash = cs.borderLeftStyle === "dashed";
        el._anchor._dash = dash ? c : "";
        el._anchor.style.background = dash
          ? "repeating-linear-gradient(90deg," + c + " 0 5px,transparent 5px 9px)" : c;
        el._anchor.style.height = cs.borderLeftWidth;
      });

      /* počas úvodnej animácie kapitoly (peek.js: pf-go) je .page zmenšená
         (transform: scale) — getBoundingClientRect vtedy vracia zmenšené
         vzdialenosti a výšky, kým `top` poznámky je v nezmenšených px. Merania sa
         preto vydelia mierkou; inak by poznámka po animácii poskočila. */
      var pr = page.getBoundingClientRect();
      var sc = page.offsetWidth ? pr.width / page.offsetWidth : 1;
      /* mimo úvodnej animácie je mierka 1 – podiel šírok sa líši len zaokrúhlením offsetWidth
         a ten rozdiel by sa smerom dole kapitoly násobil (na konci až o 7 px) */
      if (!isFinite(sc) || sc <= 0.2 || Math.abs(sc - 1) < 0.01) sc = 1;
      /* Poloha stránky v okne sa číta pri KAŽDOM meraní znova (16. 11. 2026, opravy.docx: „keď mením rozlíšenie, zoom…
         pri niektorých to je odpojené“, „po skrytí navigácie sa to pomieša“). Medzera vložená do textu pred kotvou
         (nižšie) mení výšku textu nad odrolovaným oknom a prehliadač vtedy sám posunie stránku, aby čitateľovi text
         neuskočil (scroll anchoring) – uprostred tohto prepočtu. Poloha stránky zmeraná raz na začiatku potom neplatila
         a všetky ďalšie poznámky sa uložili o ten posun vedľa svojej čiary (až o 40 px; na začiatku kapitoly nikdy,
         preto to kontroly rozloženia nevideli). Stráži tools/rozlozenie.js – napojenie poznámok pri odrolovanej stránke. */
      var pageTop = pr.top;
      /* meria sa znova pri každej poznámke: medzera vložená do textu (nižšie) posunie všetko pod ňou */
      function measure(it) {
        pr = page.getBoundingClientRect();
        pageTop = pr.top;
        var el = it.el, a = el._anchor.getBoundingClientRect();
        it.line = (a.bottom - pageTop) / sc;
        it.left = a.left;
        it.h = el.getBoundingClientRect().height / sc;
        it.head = null;
        /* Jadro (hlavná myšlienka sekcie) patrí k nadpisu sekcie, nie k odseku, za ktorým
           stojí v texte: jeho horná čiara sedí vo výške stredu písmen nadpisu a od konca
           nadpisu k nemu vedie prerušovaná čiara. */
        var head = el.classList.contains("k-jadro") && el.parentNode &&
          el.parentNode.classList.contains("sec-body") ? el.parentNode.previousElementSibling : null;
        if (head && head.classList.contains("sec-h")) {
          var txt = head.lastElementChild || head, rr = txt.getClientRects();
          var last = rr.length ? rr[rr.length - 1] : txt.getBoundingClientRect();
          it.head = { y: ((last.top + last.bottom) / 2 - pageTop) / sc, x: (last.right - pr.left) / sc };
        }
        return it;
      }
      var items = notes.map(function (el) { return measure({ el: el }); });

      /* skratky (.k-skr) majú na okraji najnižšiu prednosť — riadny box
         nikdy neposunú. Najprv sa uložia riadne boxy (sedia spodkom na svojej
         čiare, pri kolízii sa posúvajú nadol), potom sa skratky vložia do voľných
         medzier čo najbližšie k svojmu miestu — nahor alebo nadol. */
      var gap = 12, floor = -1e9, taken = [];
      function isAbbr(it) { return it.el.classList.contains("k-skr"); }
      function isFree(top, h) {
        for (var i = 0; i < taken.length; i++) {
          if (top < taken[i].b + gap && top + h > taken[i].t - gap) return false;
        }
        return true;
      }
      /* Dve poznámky tesne za sebou v texte: druhú by prvá odtlačila pod jej čiaru a čiara by sa musela
         zalomiť. Keď je posun malý (do PUSH_MAX), radšej sa o neho roztiahne text pred kotvou – čiara
         potom ide rovno (pripomienka autora 31. 10. 2026). Väčší posun by nechal v texte veľkú dieru.
         10. 11. 2026 (PATOLA 11.6.3, „zbytočne biele miesto“): pôvodných 160 px bolo vidno ako prázdne miesto
         pod odsekom – text sa rozťahuje najviac o 40 px (≈ 1,5 riadku), väčší posun = zalomená čiara.
         Stráži to tools/rozlozenie.js (diera v texte > 64 px = chyba). */
      var PUSH_MAX = 40;
      items.forEach(function (it) {
        if (isAbbr(it)) return;
        measure(it);
        var top = it.head ? it.head.y - 1 : it.line - it.h;   /* Jadro: čiara 2 px na strede písmen */
        if (top < floor + gap) {
          var push = floor + gap - top;
          var a0 = it.el._anchor, mt = parseFloat(getComputedStyle(a0).marginTop) || 0;
          if (!it.head && push <= PUSH_MAX) {
            a0.style.marginTop = (mt + push) + "px";
            measure(it);
            top = it.line - it.h;
          }
          if (top < floor + gap) {
            top = floor + gap;
            /* poznámka sa spodkom na čiaru nezmestí – sedí hneď pod predošlou. Ak je čiara len kúsok
               nad jej horným okrajom, text sa posunie o tých pár px a čiara vojde rovno do horného rohu
               poznámky (inak by mala 2–10 px „schodík“) */
            var bw0 = parseFloat(a0.style.height) || 0, need = top + bw0 - it.line;
            if (!it.head && bw0 > 0 && need > 0 && need <= 24) {
              a0.style.marginTop = (mt + need + 0.5) + "px";
              measure(it);
            }
          }
        }
        floor = top + it.h;
        it.top = top;
        taken.push({ t: top, b: top + it.h });
      });
      items.forEach(function (it) {
        if (!isAbbr(it)) return;
        measure(it);
        var want = it.line - it.h, best = null;
        var cands = [want];
        for (var i = 0; i < taken.length; i++) {
          cands.push(taken[i].t - gap - it.h, taken[i].b + gap);
        }
        cands.forEach(function (c) {
          if (c < 0 || !isFree(c, it.h)) return;
          if (best === null || Math.abs(c - want) < Math.abs(best - want)) best = c;
        });
        it.top = best === null ? want : best;
        taken.push({ t: it.top, b: it.top + it.h });
      });
      /* poznámka odtlačená nadol pod svoju čiaru (pred ňou stojí iná
         poznámka) by ostala nepripojená alebo by čiara trafila cudzí box. Čiara
         sa preto pred stĺpcom poznámok zalomí: zvislý úsek zíde k hornému okraju
         poznámky a krátky vodorovný sa napojí na jej ľavý horný roh. Zalomené
         čiary, ktoré bežia vedľa seba, dostanú vlastnú dráhu (neskoršia ďalej
         od poznámok), aby sa neprekrývali ani nekrížili. */
      var laneBase = 10, laneStep = 6, lanes = [];
      items.forEach(function (it) {
        var a = it.el._anchor, bw = parseFloat(a.style.height) || 0;
        var w = Math.max(0, (it.el.getBoundingClientRect().left - it.left) / sc);
        var bent = bw > 0 && it.line < it.top + bw;
        it.el.style.top = it.top + "px";
        if (it.head) drawLead(it);
        if (!a._v) {
          a._v = a.appendChild(document.createElement("i"));
          a._h = a.appendChild(document.createElement("i"));
        }
        a._v.style.display = a._h.style.display = bent ? "block" : "none";
        if (!bent) {
          a.style.width = w + "px";
          /* spodná hrana poznámky presne na spodnej hrane čiary (odmerané, nie odhadnuté) */
          var dz = (it.el.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom) / sc;
          /* doladenie nesmie zmenšiť medzeru k susednej poznámke pod gap – inak sú medzery nerovnaké
             (pripomienka autora 1. 11. 2026) */
          var nt = it.top - dz, okGap = items.every(function (o) {
            return o === it || o.top === undefined || nt >= o.top + o.h + gap - 0.5 || nt + it.h <= o.top - gap + 0.5;
          });
          if (!it.head && okGap && isFinite(dz) && Math.abs(dz) > 0.25 && Math.abs(dz) < 20) { it.el.style.top = nt + "px"; it.top = nt; }
          return;
        }

        var lane = 0;
        lanes.forEach(function (l) {
          if (l.b > it.line - bw && l.lane >= lane) lane = l.lane + 1;
        });
        lanes.push({ b: it.top + bw, lane: lane });
        var off = Math.min(laneBase + lane * laneStep, Math.max(0, w - bw));
        /* od horného okraja čiary po horný okraj poznámky — odmerané až po umiestnení
           poznámky: odhad z it.top sa od skutočnej polohy líšil o zlomky px a „kĺb“
           potom trčal nad horným koncom ľavého pásika poznámky */
        var drop = (it.el.getBoundingClientRect().top - a.getBoundingClientRect().top) / sc;
        if (!isFinite(drop)) drop = it.top - it.line + bw;
        drop = Math.round(drop);   /* zvislý aj vodorovný úsek z rovnakého celého px – dolný roh bez schodíka */
        a.style.width = (w - off) + "px";
        a._v.style.left = a._h.style.left = (w - off - bw) + "px";
        a._v.style.top = "0";
        a._v.style.width = a._h.style.height = bw + "px";
        a._v.style.height = (drop + bw) + "px";
        a._h.style.top = drop + "px";
        a._h.style.width = (off + 2 * bw) + "px";   /* prekryje začiatok pásika — bez škáry */
        var dc = a._dash;
        a._v.style.background = dc ? "repeating-linear-gradient(180deg," + dc + " 0 5px,transparent 5px 9px)" : "";
        a._h.style.background = dc ? "repeating-linear-gradient(90deg," + dc + " 0 5px,transparent 5px 9px)" : "";
      });
      /* Samokontrola: po uložení musí každá čiara ležať vo výške svojej poznámky (rovná) alebo vojsť do jej horného rohu
         (zalomená). Keď sa text medzitým pohol (dočítal sa obrázok, písmo), prepočet sa hneď zopakuje – najviac 3× za sebou. */
      var off = items.some(function (it) {
        var a = it.el._anchor, bw = parseFloat(a.style.height) || 0;
        if (bw <= 0 || it.head || isAbbr(it)) return false;
        var r = it.el.getBoundingClientRect(), ar = a.getBoundingClientRect();
        if (a._v && a._v.style.display === "block") return Math.abs(a._h.getBoundingClientRect().top - r.top) > 1.5 * sc;
        return ar.bottom > r.bottom + 1.2 * sc || ar.top < r.top - 1.2 * sc;
      });
      if (off && fixTries < 3) { fixTries++; scheduleLayout(); } else if (!off) fixTries = 0;
    }
    var fixTries = 0;

    /* prerušovaná čiara od konca nadpisu sekcie k Jadru: rovno, keď Jadro sedí vo výške
       nadpisu; keď ho iná poznámka odtlačila nižšie, pred stĺpcom poznámok sa zalomí nadol */
    function drawLead(it) {
      var el = it.el, pr = page.getBoundingClientRect();
      var sc = page.offsetWidth ? pr.width / page.offsetWidth : 1;
      /* mimo úvodnej animácie je mierka 1 – podiel šírok sa líši len zaokrúhlením offsetWidth
         a ten rozdiel by sa smerom dole kapitoly násobil (na konci až o 7 px) */
      if (!isFinite(sc) || sc <= 0.2 || Math.abs(sc - 1) < 0.01) sc = 1;
      var nr = el.getBoundingClientRect();
      var x1 = it.head.x + 12, y1 = it.head.y;
      var x2 = (nr.left - pr.left) / sc, y2 = (nr.top - pr.top) / sc + 1;
      /* Jadro pri nadpise: čiara ide presne vo výške jeho hornej linky (odmeranej),
         nie v odhadnutej výške písmen – inak by o 1–2 px „nesplývala“ */
      if (Math.abs(y2 - y1) <= 4) y1 = y2;
      if (x2 - x1 < 24) { if (el._lead) el._lead.style.display = "none"; return; }
      if (!el._lead) {
        el._lead = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        el._lead.setAttribute("class", "jadro-lead");
        el._lead.setAttribute("aria-hidden", "true");
        el._lead.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
        page.appendChild(el._lead);
      }
      var top = Math.min(y1, y2) - 2, h = Math.abs(y2 - y1) + 4, w = x2 - x1;
      var bend = Math.abs(y2 - y1) > 1.5;
      var xb = w - 14;
      var d = bend
        ? "M0 " + (y1 - top) + "H" + xb + "V" + (y2 - top) + "H" + w
        : "M0 " + (y1 - top) + "H" + w;
      var s = el._lead;
      s.style.display = "";
      s.style.left = x1 + "px";
      s.style.top = top + "px";
      s.setAttribute("width", w);
      s.setAttribute("height", h);
      s.setAttribute("viewBox", "0 0 " + w + " " + h);
      s.firstChild.setAttribute("d", d);
    }

    var raf = null;
    function scheduleLayout() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    }

    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("load", scheduleLayout);
    /* peek.js po konci úvodnej animácie (transform nespustí ResizeObserver) */
    window.addEventListener("pf-relayout", scheduleLayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleLayout);
    }
    /* obrázky sa dolievajú lazy a menia výšku stránky — poznámky sa
       prepočítajú vždy, keď sa zmení rozmer textu */
    document.addEventListener("load", function (e) {
      if (e.target && e.target.tagName === "IMG") scheduleLayout();
    }, true);
    if (window.ResizeObserver) new ResizeObserver(scheduleLayout).observe(page);
    scheduleLayout();
  }

  /* ── selection toolbar ──────────────────────────────────────────────
     Označ text v .page → nad ním sa ukáže tlačidlo „Opýtať sa AI“. Otvorí
     plávajúce okno AI asistenta (assets/js/ai-chat.js – načíta sa až teraz)
     a otázka k úryvku sa hneď pošle. Kľúč API si čitateľ zadá v okne; kým
     ho nemá, okno ponúkne aj pôvodnú cestu do ChatGPT / Gemini v novej karte.

     Kapitola v ráme hlavnej stránky (čítačka appky, náhľad) používa okno
     hlavnej stránky – chat tak ostáva otvorený aj pri prechode na inú kapitolu.
     Pri file:// prehliadač prístup do iného dokumentu nedovolí → okno v ráme. */
  var AI_SRC = SROOT_AI() + "assets/js/ai-chat.js";
  function SROOT_AI() {
    var s = document.currentScript;
    var src = (s && s.src) || "";
    var i = src.lastIndexOf("/assets/js/");
    return i < 0 ? "" : src.slice(0, i + 1);
  }
  var aiLoading = null;
  window.PF_loadAI = function () {
    if (window.PF_AI) return Promise.resolve(window.PF_AI);
    if (aiLoading) return aiLoading;
    aiLoading = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = AI_SRC;
      s.onload = function () { window.PF_AI ? resolve(window.PF_AI) : reject(new Error("ai-chat.js")); };
      s.onerror = function () { aiLoading = null; reject(new Error("ai-chat.js")); };
      document.head.appendChild(s);
    });
    return aiLoading;
  };
  function aiHost() {
    try {
      var t = window.top;
      if (t && t !== window && typeof t.PF_loadAI === "function" && t.document.body) return t;
    } catch (e) { /* iný pôvod (file://) */ }
    return window;
  }
  /* aj pre nastavenia v ozubenom kolese (view-toggle.js) */
  window.PF_withAI = function (fn) { withAI(fn); };
  function withAI(fn) {
    aiHost().PF_loadAI().then(fn, function () {
      toast("Okno AI sa nepodarilo načítať — skús obnoviť stránku.");
    });
  }

  var AI_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<defs><linearGradient id="askSpark" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="#8fb0ff"/>' +
    '<stop offset="55%" stop-color="#b79ae6"/>' +
    '<stop offset="100%" stop-color="#f29bb0"/>' +
    "</linearGradient></defs>" +
    '<path fill="url(#askSpark)" d="M12 2c0 5.523 4.477 10 10 10' +
    "-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z\"/></svg>";

  var toastEl = null;
  var toastTimer = null;
  function toast(html) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "ask-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = html;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.hidden = true;
    }, 6000);
  }

  /* stále tlačidlo „AI“ vpravo dole – len v najvyššom okne (hlavná stránka, samostatná kapitola);
     kapitola v ráme čítačky ho nemá, jej okno AI patrí hlavnej stránke. Okno sa načíta až po kliknutí. */
  /* spodný pás – jedna vrstva pre všetky plávajúce tlačidlá dole (site.css → .pf-dock); len v najvyššom okne */
  function dockSide(side) {
    if (window.top !== window || !document.body) return null;
    var d = document.querySelector(".pf-dock");
    if (!d) {
      d = document.createElement("div");
      d.className = "pf-dock";
      d.innerHTML = '<div class="pf-dock-l"></div><div class="pf-dock-c"></div><div class="pf-dock-r"></div>';
      document.body.appendChild(d);
    }
    return d.querySelector(".pf-dock-" + side);
  }
  window.PF_dock = dockSide;

  function setupAiPill() {
    if (window.top !== window || document.querySelector(".pfai-pill")) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pfai-pill";
    b.title = "AI asistent – opýtaj sa na látku (aj s výrezom obrazovky)";
    b.setAttribute("aria-label", "AI asistent");
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c0 5.523 4.477 10 10 10' +
      '-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"/></svg><span>AI</span><i class="dot"></i>';
    b.addEventListener("click", function () { withAI(function (ai) { ai.open(); }); });
    (dockSide("r") || document.body).appendChild(b);
  }

  function setupSelectionTools() {
    var scope = document.querySelector(".page");
    if (!scope || !window.getSelection) return;

    var bar = document.createElement("div");
    bar.className = "ask-tools";
    bar.hidden = true;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.title = "Opýtať sa AI na označený text (otvorí okno asistenta)";
    btn.innerHTML = AI_ICON + "<span>Opýtať sa AI</span>";
    btn.addEventListener("click", function () {
      var text = selectedText();
      if (!text) return;
      var q = { text: text, where: whereOf() };
      hide();
      /* na dotyku by natívna ponuka výberu prekrývala okno */
      try { window.getSelection().removeAllRanges(); } catch (e) {}
      withAI(function (ai) { ai.ask(q); });
    });
    bar.appendChild(btn);

    /* keep the selection alive when the bar is clicked */
    bar.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    document.body.appendChild(bar);

    function selectedText() {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return "";
      var node = sel.anchorNode;
      if (!node || !scope.contains(node.nodeType === 1 ? node : node.parentNode)) return "";
      var text = sel.toString().replace(/\s+/g, " ").trim();
      return text.length >= 3 ? text : "";
    }

    function sectionLabel(node) {
      var heads = scope.querySelectorAll("h2.sec-h, h3.sub-h");
      var best = null;
      for (var i = 0; i < heads.length; i++) {
        var pos = heads[i].compareDocumentPosition(node);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) best = heads[i];
        else break;
      }
      if (!best) return "";
      var numEl = best.querySelector(".n");
      var num = numEl ? numEl.textContent.trim() : "";
      return (num ? num + " · " : "") + headingTitle(best);
    }

    /* kde v knihe úryvok je: kapitola — sekcia (AI to dostane ako kontext) */
    function whereOf() {
      var sel = window.getSelection();
      var where = document.title.replace(/\s+/g, " ").trim();
      var section = sel && sel.anchorNode ? sectionLabel(sel.anchorNode) : "";
      return section ? where + " — " + section : where;
    }

    function hide() {
      bar.hidden = true;
    }

    function place() {
      var sel = window.getSelection();
      if (!selectedText()) return hide();

      var rect = sel.getRangeAt(0).getBoundingClientRect();
      if (!rect || (!rect.width && !rect.height)) return hide();

      var vw = document.documentElement.clientWidth;
      var vh = document.documentElement.clientHeight;
      /* selection scrolled out of view — nothing to point at */
      if (rect.bottom < 0 || rect.top > vh) return hide();

      bar.hidden = false; /* must be laid out before it can be measured */
      var bw = bar.offsetWidth;
      var bh = bar.offsetHeight;
      var gap = 9;

      var anchorX = rect.left + rect.width / 2;
      var left = Math.min(Math.max(8, anchorX - bw / 2), vw - bw - 8);

      /* the sticky header owns the top strip; if the bar would tuck under
         it, drop it below the selection instead of drawing over it */
      var header = document.querySelector(".site-header");
      var minTop = header ? header.getBoundingClientRect().bottom + 4 : 4;

      var above = rect.top - bh - gap;
      var placement = above >= minTop ? "above" : "below";
      var top = placement === "above" ? above : Math.min(rect.bottom + gap, vh - bh - 4);

      bar.style.left = left + "px";
      bar.style.top = top + "px";
      bar.dataset.place = placement;
      bar.style.setProperty(
        "--beak-x",
        Math.min(Math.max(10, anchorX - left), bw - 10) + "px"
      );
    }

    var dragging = false;
    var raf = null;
    function schedule() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    }

    document.addEventListener("selectionchange", function () {
      if (dragging) hide();
      else schedule();
    });
    document.addEventListener("pointerdown", function (e) {
      if (bar.contains(e.target)) return;
      dragging = true;
      hide();
    });
    document.addEventListener("pointerup", function (e) {
      if (bar.contains(e.target)) return;
      dragging = false;
      setTimeout(place, 0); /* let the browser finish settling the selection */
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ── vyhľadávanie v hornej lište ─────────────────────────────────────
     Index textu po sekciách generuje build (assets/search-index.js) a načíta sa
     až pri prvom otvorení. Na hlavnej stránke hľadá vo všetkých kapitolách;
     v kapitole najprv v nej a pod oddeľovačom v ostatných. Bez ohľadu na
     diakritiku a veľkosť písmen; viac slov = všetky musia byť v sekcii.
     Po prechode na výsledok sa nájdené miesto v texte na chvíľu zvýrazní.
     Hľadá aj vo vysvetlivkách (PF_SEARCH_G – názov a text hesla): výsledok otvorí
     vysvetlivku na mieste; na stránke bez glosára prejde do sekcie „V knihe“ a otvorí ju tam.
     Otvára sa aj klávesom „/“ alebo Ctrl+K. */
  var SROOT = (function () {
    var s = document.currentScript;
    var src = (s && s.src) || "";
    var i = src.lastIndexOf("/assets/js/");
    return i < 0 ? "" : src.slice(0, i + 1);
  })();
  function fold(t) { return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function escH(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var SKEY = "pf-search-hit";
  var GKEY = "pf-search-term";

  function setupSearch() {
    var header = document.querySelector(".site-header");
    if (!header || document.documentElement.classList.contains("pk-embed")) return;
    var here = location.pathname.split("/").pop().replace(/\.html$/, "");
    var inChapter = !!document.querySelector(".page .sec-h");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pf-search-btn";
    btn.setAttribute("aria-label", "Hľadať v knihe");
    btn.setAttribute("aria-expanded", "false");
    btn.title = "Hľadať (/ alebo Ctrl+K)";
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg><span class="lbl">Hľadať</span>';
    var spacer = header.querySelector(".spacer");
    if (spacer && spacer.nextSibling) header.insertBefore(btn, spacer.nextSibling);
    else header.appendChild(btn);

    var box = null, input, list, data = null, gdata = [], loading = false, sel = -1, rows = [];

    function prep() {
      if (data) return;
      data = (window.PF_SEARCH || []).map(function (s, i) {
        return { s: s, i: i, ft: fold(s.t), fx: fold(s.x) };
      });
      gdata = (window.PF_SEARCH_G || []).map(function (s, i) {
        return { s: s, i: i, ft: fold(s.t), fx: fold(s.x) };
      });
    }
    function load(cb) {
      if (window.PF_SEARCH) { prep(); cb(); return; }
      if (loading) return;
      loading = true;
      var sc = document.createElement("script");
      sc.src = SROOT + "assets/search-index.js";
      sc.onload = function () { prep(); cb(); };
      sc.onerror = function () { list.innerHTML = '<li class="msg">Index na vyhľadávanie sa nenačítal.</li>'; };
      document.head.appendChild(sc);
    }
    function build() {
      box = document.createElement("div");
      box.className = "pf-search";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-label", "Hľadať v knihe");
      box.innerHTML =
        '<div class="pf-search-in"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>' +
        '<input type="search" placeholder="' + (inChapter ? "Hľadať v kapitole a v knihe…" : "Hľadať vo všetkých kapitolách…") +
        '" aria-label="Hľadaný výraz" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div>' +
        '<ul class="pf-search-res" role="listbox"></ul>';
      document.body.appendChild(box);
      input = box.querySelector("input");
      list = box.querySelector("ul");
      var t = 0;
      input.addEventListener("input", function () { clearTimeout(t); t = setTimeout(run, 90); });
      input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          if (!rows.length) return;
          sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length;
          mark();
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (rows.length) go(rows[Math.max(0, sel)]);
        } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      });
      list.addEventListener("click", function (e) {
        var li = e.target.closest("li[data-k]");
        if (li) go(rows[+li.getAttribute("data-k")]);
      });
      document.addEventListener("pointerdown", function (e) {
        if (box.classList.contains("on") && !box.contains(e.target) && !btn.contains(e.target)) close();
      });
    }
    function open() {
      if (!box) build();
      box.classList.add("on");
      btn.setAttribute("aria-expanded", "true");
      input.focus();
      input.select();
      if (!data) { list.innerHTML = '<li class="msg">Načítavam…</li>'; load(run); }
    }
    function close() {
      if (!box) return;
      box.classList.remove("on");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function () { if (box && box.classList.contains("on")) close(); else open(); });
    document.addEventListener("keydown", function (e) {
      var tag = (e.target && e.target.tagName) || "";
      var typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable);
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        open();
      }
    });

    function snippet(x, fx, terms) {
      var at = Math.max(0, fx.indexOf(terms[0]));
      var a = Math.max(0, at - 70), b = Math.min(x.length, at + 130);
      var part = x.slice(a, b), fp = fx.slice(a, b), out = "", pos = 0, m;
      var re = new RegExp(terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|"), "g");
      while ((m = re.exec(fp))) {
        out += escH(part.slice(pos, m.index)) + "<mark>" + escH(part.slice(m.index, m.index + m[0].length)) + "</mark>";
        pos = m.index + m[0].length;
      }
      out += escH(part.slice(pos));
      return (a > 0 ? "…" : "") + out + (b < x.length ? "…" : "");
    }
    function run() {
      if (!data) return;
      var q = fold(input.value.trim());
      var terms = q.split(/\s+/).filter(function (t) { return t.length >= 2; });
      rows = []; sel = -1;
      if (!terms.length) { list.innerHTML = '<li class="msg">Napíš aspoň dve písmená.</li>'; return; }
      var hits = [];
      data.forEach(function (d) {
        var sc = 0;
        for (var i = 0; i < terms.length; i++) {
          var t = terms[i], inT = d.ft.indexOf(t) >= 0, n = 0, k = -1;
          while ((k = d.fx.indexOf(t, k + 1)) >= 0 && n < 20) n++;
          if (!inT && !n) return;
          sc += (inT ? 12 : 0) + n;
        }
        hits.push({ d: d, sc: sc, own: inChapter && d.s.f === here });
      });
      hits.sort(function (a, b) { return (b.own - a.own) || (b.sc - a.sc) || (a.d.i - b.d.i); });
      var own = hits.filter(function (h) { return h.own; }).slice(0, 10);
      var other = hits.filter(function (h) { return !h.own; }).slice(0, inChapter ? 10 : 25);
      /* vysvetlivky: zhoda v názve hesla má veľkú prednosť, názov od začiatku ešte väčšiu */
      var ghits = [];
      gdata.forEach(function (d) {
        var sc = 0;
        for (var i = 0; i < terms.length; i++) {
          var t = terms[i], at = d.ft.indexOf(t), n = 0, k = -1;
          while ((k = d.fx.indexOf(t, k + 1)) >= 0 && n < 10) n++;
          if (at < 0 && !n) return;
          sc += (at === 0 ? 40 : at > 0 ? 25 : 0) + n;
        }
        ghits.push({ d: d, sc: sc, g: true });
      });
      ghits.sort(function (a, b) { return (b.sc - a.sc) || (a.d.s.t.length - b.d.s.t.length); });
      var gl = ghits.slice(0, 6);
      if (!own.length && !other.length && !gl.length) { list.innerHTML = '<li class="msg">Nič sa nenašlo.</li>'; return; }
      var html = "";
      function item(h) {
        rows.push({ h: h, terms: terms });
        return '<li role="option" data-k="' + (rows.length - 1) + '"' + (h.g ? ' class="gl"' : "") + '>' +
          (h.g ? '<span class="ch">Vysvetlivka</span>' : h.own ? "" : '<span class="ch">' + escH(h.d.s.c) + "</span>") +
          '<span class="t">' + escH(h.d.s.t) + "</span>" +
          '<span class="x">' + snippet(h.d.s.x, h.d.fx, terms) + "</span></li>";
      }
      /* heslo, ktorého názov sedí, ide pred text kapitol; ostatné vysvetlivky až na koniec */
      var glTop = gl.filter(function (h) { return h.sc >= 25 * terms.length; });
      var glRest = gl.filter(function (h) { return h.sc < 25 * terms.length; });
      if (glTop.length) {
        html += '<li class="grp">Vysvetlivky pojmov</li>';
        glTop.forEach(function (h) { html += item(h); });
      }
      if (inChapter) html += '<li class="grp' + (glTop.length ? " sep" : "") + '">V tejto kapitole' + (own.length ? "" : " – nič") + "</li>";
      own.forEach(function (h) { html += item(h); });
      if (other.length) {
        if (inChapter || glTop.length) html += '<li class="grp sep">' + (inChapter ? "Ostatné kapitoly" : "Kapitoly") + "</li>";
        other.forEach(function (h) { html += item(h); });
      }
      if (glRest.length) {
        html += '<li class="grp sep">' + (glTop.length ? "Ďalšie vysvetlivky" : "Vysvetlivky pojmov") + "</li>";
        glRest.forEach(function (h) { html += item(h); });
      }
      list.innerHTML = html;
      sel = 0;
      mark();
    }
    function mark() {
      Array.prototype.forEach.call(list.querySelectorAll("li[data-k]"), function (li) {
        var on = +li.getAttribute("data-k") === sel;
        li.classList.toggle("sel", on);
        if (on) li.scrollIntoView({ block: "nearest" });
      });
    }
    function go(r) {
      if (r.h.g) { goTerm(r.h.d.s); return; }
      var s = r.h.d.s;
      try { sessionStorage.setItem(SKEY, JSON.stringify({ f: s.f, s: s.s, q: r.terms })); } catch (e) {}
      close();
      if (inChapter && s.f === here) {
        var el = document.getElementById(s.s);
        if (el) { el.scrollIntoView({ block: "start", behavior: "smooth" }); try { history.replaceState(history.state, "", "#" + s.s); } catch (e) {} }
        setTimeout(showHit, 500);
        return;
      }
      if (window.top !== window.self && inChapter) {   // kapitola v ráme hlavnej stránky: otvorí ju hlavná stránka
        try { window.parent.postMessage({ pf: "open", slug: s.f, hash: "#" + s.s, y: 0, a: "" }, "*"); return; } catch (e) {}
      }
      location.href = SROOT + "chapters/" + s.f + ".html#" + s.s;
    }
    /* vysvetlivka: v kapitole (glosár je načítaný) sa otvorí hneď na mieste, kde stojí vyhľadávanie;
       na hlavnej stránke sa otvorí kapitola so sekciou „V knihe“ a vysvetlivka v nej */
    function goTerm(g) {
      close();
      if (typeof window.PF_GLOSSARY_OPEN === "function" && window.PF_GLOSSARY_OPEN(g.g, btn)) return;
      if (!g.k) return;
      var f = g.k.split(".html#")[0], a = g.k.split("#")[1] || "";
      try { sessionStorage.setItem(GKEY, g.g); } catch (e) {}
      if (window.top !== window.self && inChapter) {
        try { window.parent.postMessage({ pf: "open", slug: f, hash: "#" + a, y: 0, a: "" }, "*"); return; } catch (e) {}
      }
      location.href = SROOT + "chapters/" + g.k;
    }
  }

  /* vysvetlivka vybraná vo vyhľadávaní na inej stránke: otvorí sa pri prvom výskyte pojmu v cieľovej sekcii */
  function showTerm() {
    var id = null;
    try { id = sessionStorage.getItem(GKEY); sessionStorage.removeItem(GKEY); } catch (e) {}
    if (!id) return;
    var tries = 0;
    (function wait() {
      if (typeof window.PF_GLOSSARY_OPEN !== "function") { if (++tries < 40) setTimeout(wait, 100); return; }
      var sec = location.hash && document.getElementById(location.hash.slice(1));
      var el = null, all = document.querySelectorAll('.page .pf-term[data-term="' + id + '"]');
      var vis = [];   /* pojem v skrytom rozšírení sa nedá ukázať – berie sa len viditeľný výskyt */
      for (var v = 0; v < all.length; v++) if (all[v].getClientRects().length) vis.push(all[v]);
      for (var i = 0; i < vis.length && sec; i++) {
        if (sec.compareDocumentPosition(vis[i]) & Node.DOCUMENT_POSITION_FOLLOWING) { el = vis[i]; break; }
      }
      el = el || vis[0] || null;
      if (el) {
        var rc = el.getBoundingClientRect();
        if (rc.top < 80 || rc.bottom > window.innerHeight - 40) el.scrollIntoView({ block: "center" });
      }
      setTimeout(function () { window.PF_GLOSSARY_OPEN(id, el || document.querySelector(".pf-search-btn")); }, el ? 450 : 0);
    })();
  }

  /* nájdené miesto po prechode z vyhľadávania: prvý výskyt v cieľovej sekcii sa na 3 s zvýrazní */
  function showHit() {
    var raw = null, hit;
    try { raw = sessionStorage.getItem(SKEY); } catch (e) {}
    if (!raw) return;
    try { hit = JSON.parse(raw); } catch (e) { return; }
    if (location.pathname.split("/").pop().replace(/\.html$/, "") !== hit.f) return;
    try { sessionStorage.removeItem(SKEY); } catch (e) {}
    var start = document.getElementById(hit.s);
    if (!start || !hit.q || !hit.q.length) return;
    var stopSel = start.classList.contains("sec-h") ? ".sec-h" : ".sec-h, .sub-h";
    var root = document.querySelector(".page") || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, on = false, nodes = [];
    while ((n = walker.nextNode())) {
      var p = n.parentElement;
      if (!p) continue;
      var head = p.closest(".sec-h, .sub-h");
      if (head === start) { on = true; continue; }
      if (on && head && head.matches(stopSel)) break;
      if (on && !p.closest(".side-anchor, script, style")) nodes.push(n);
    }
    var t0 = hit.q[0];
    for (var i = 0; i < nodes.length; i++) {
      var k = fold(nodes[i].nodeValue).indexOf(t0);
      if (k < 0) continue;
      /* nájdené slovo je v skrytom rozšírení: ukázať rozšírenia (len teraz – nastavenie čitateľa sa nemení) */
      if (nodes[i].parentElement.closest(".rozsir") && window.PF_ROZSIR) window.PF_ROZSIR(true, true);
      var r = document.createRange();
      r.setStart(nodes[i], k);
      r.setEnd(nodes[i], k + t0.length);
      var m = document.createElement("mark");
      m.className = "pf-found";
      try { r.surroundContents(m); } catch (e) { return; }
      var rc = m.getBoundingClientRect();
      if (rc.top < 80 || rc.bottom > window.innerHeight - 40) m.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(function () { m.classList.add("off"); }, 2600);
      setTimeout(function () {
        var par = m.parentNode;
        if (!par) return;
        while (m.firstChild) par.insertBefore(m.firstChild, m);
        par.removeChild(m);
        par.normalize();
      }, 3600);
      return;
    }
  }

  function scrollToHashOnLoad() {
    if (location.hash.length > 1) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(function () { target.scrollIntoView({ block: "start", behavior: "instant" }); }, 0);
    }
  }

  /* Tabuľka, ktorej najmenšia šírka je väčšia než textový stĺpec (široká tabuľka pri okne ≈ 1000 px, kde je stĺpec
     najužší), by vytŕčala cez okraj až mimo okna – bočný posuv celej stránky. Takú tabuľku označí triedou
     t-siroka (CSS: vodorovný posuv vo vnútri tabuľky, ako na mobile); ostatné tabuľky sa nemenia. Znova po načítaní
     písma a pri zmene veľkosti okna. Stráži tools/rozlozenie.js (PATOLA kap. 2, 30. 10. 2026). */
  function markWideTables() {
    document.querySelectorAll(".page table.table").forEach(function (t) {
      t.classList.remove("t-siroka");
      var box = t.parentElement;
      if (box && t.offsetWidth > box.clientWidth + 1) t.classList.add("t-siroka");
    });
  }
  /* Rozšírená verzia kapitoly (10. 11. 2026). Build vloží tlačidlo .rozsir-toggle hore do kapitoly, ak má
     rozšírenia (:::rozsirenie v .md → div.rozsir, bežne skryté). Prepnutie = trieda html.pf-rozsir, zapamätá sa
     pre túto kapitolu (localStorage pf-rozsir:<cesta>; skorý skript v <head> ju zapne pred vykreslením). Miesto,
     ktoré čitateľ práve číta, ostane na obrazovke na tom istom mieste; okraj s poznámkami sa prepočíta.
     window.PF_ROZSIR(zapnúť, nepamätať) – používa vyhľadávanie (nájdené slovo v rozšírení) a tools/rozlozenie.js. */
  function setupRozsir() {
    var root = document.documentElement, btn = document.querySelector(".rozsir-toggle");
    if (!btn) return;
    var KEY = "pf-rozsir:" + location.pathname;
    function sync() {
      var on = root.classList.contains("pf-rozsir");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.title = on ? "Skryť rozšírenia – späť na základnú verziu kapitoly"
                     : "Ukáže časti navyše – pre toho, kto základ už vie. Sú označené štítkom Rozšírenie.";
    }
    function anchor() {
      var b = btn.getBoundingClientRect();
      if (b.bottom > 0 && b.top < window.innerHeight) return btn;
      var els = document.querySelectorAll(".sec-body > *:not(.rozsir), .sec-h, .sub-h");
      for (var i = 0; i < els.length; i++) {
        var r = els[i].getBoundingClientRect();
        if (r.height && r.bottom > 70) return els[i];
      }
      return null;
    }
    window.PF_ROZSIR = function (on, noSave) {
      on = !!on;
      if (on === root.classList.contains("pf-rozsir")) return;
      var a = anchor(), top = a ? a.getBoundingClientRect().top : 0;
      root.classList.toggle("pf-rozsir", on);
      if (!noSave) { try { if (on) localStorage.setItem(KEY, "1"); else localStorage.removeItem(KEY); } catch (e) { /* file:// */ } }
      sync();
      if (a) window.scrollBy(0, a.getBoundingClientRect().top - top);
      markWideTables();
      window.dispatchEvent(new Event("pf-relayout"));
      window.dispatchEvent(new Event("resize"));
    };
    btn.addEventListener("click", function () { window.PF_ROZSIR(!root.classList.contains("pf-rozsir")); });
    sync();
  }

  window.addEventListener("load", markWideTables);
  window.addEventListener("resize", function () { clearTimeout(markWideTables.t); markWideTables.t = setTimeout(markWideTables, 150); });

  document.addEventListener("DOMContentLoaded", function () {
    markWideTables();
    wrapSvgTexts();
    var entries = buildTOC();
    setupProgress();
    setupActiveHighlight(entries);
    setupSidebarToggle();
    setupRozsir();
    setupFigRows();
    setupSideNotes();
    setupSelectionTools();
    setupAiPill();
    setupSearch();
    scrollToHashOnLoad();
  });
  window.addEventListener("load", function () { setTimeout(showHit, 700); setTimeout(showTerm, 900); });
})();

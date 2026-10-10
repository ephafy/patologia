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

      var extra = 0;
      layouts.forEach(function (l) {
        extra = Math.max(extra, (l.lines.length - 1) * l.lineHeight);
      });
      if (extra > 0) {
        var vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
        if (vb.length === 4 && vb.every(function (n) { return !isNaN(n); })) {
          vb[3] += extra + 4;
          svg.setAttribute("viewBox", vb.join(" "));
        }
      }

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
  }

  function setupActiveHighlight(entries) {
    if (!entries.length || !("IntersectionObserver" in window)) return;
    var current = null;

    /* PATOLA: skok po odkaze v tej istej stránke (obsah vľavo aj odkaz v texte).
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
      /* PATOLA: v ráme hlavnej stránky (index.html) by pushState pridal záznam
         do histórie celej karty a „← Obsah“ / Späť by vrátili len tento skok */
      var framed = window.top !== window.self;
      if (window.history && history.pushState) history[framed ? "replaceState" : "pushState"](null, "", "#" + id);
      flying = true;
      flyTimer = setTimeout(land, 1500); /* poistka, keby posun vôbec nenastal */
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });

    /* PATOLA: pôvodne entry.link.scrollIntoView({block:"nearest"}) — to posúva aj
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
      return Array.prototype.slice.call(page.querySelectorAll(".note, .flag, .plain, .box.aside") /* PATOLA: + .box.aside */);
    }

    function layout() {
      var notes = notesInOrder();
      if (!notes.length) return;

      notes.forEach(function (el) {
        el.classList.remove("side-note");
        el.style.top = "";
      });
      if (!mq.matches) return;

      /* PATOLA: poznámka pri vybratí z toku textu zanechá nulovo vysokú
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
        }
        el.classList.add("side-note");
      });
      notes.forEach(function (el) {
        var cs = getComputedStyle(el);
        el._anchor.style.background = cs.borderLeftColor;
        el._anchor.style.height = cs.borderLeftWidth;
      });

      var pageTop = page.getBoundingClientRect().top;
      var items = notes.map(function (el) {
        var a = el._anchor.getBoundingClientRect();
        return {
          el: el,
          line: a.bottom - pageTop,
          left: a.left,
          h: el.getBoundingClientRect().height
        };
      });

      /* PATOLA: skratky (.k-skr) majú na okraji najnižšiu prednosť — riadny box
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
      items.forEach(function (it) {
        if (isAbbr(it)) return;
        var top = it.line - it.h;
        if (top < floor + gap) top = floor + gap;
        floor = top + it.h;
        it.top = top;
        taken.push({ t: top, b: top + it.h });
      });
      items.forEach(function (it) {
        if (!isAbbr(it)) return;
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
      /* PATOLA: poznámka odtlačená nadol pod svoju čiaru (pred ňou stojí iná
         poznámka) by ostala nepripojená alebo by čiara trafila cudzí box. Čiara
         sa preto pred stĺpcom poznámok zalomí: zvislý úsek zíde k hornému okraju
         poznámky a krátky vodorovný sa napojí na jej ľavý horný roh. Zalomené
         čiary, ktoré bežia vedľa seba, dostanú vlastnú dráhu (neskoršia ďalej
         od poznámok), aby sa neprekrývali ani nekrížili. */
      var laneBase = 10, laneStep = 6, lanes = [];
      items.forEach(function (it) {
        var a = it.el._anchor, bw = parseFloat(a.style.height) || 0;
        var w = Math.max(0, it.el.getBoundingClientRect().left - it.left);
        var bent = bw > 0 && it.line < it.top + bw;
        it.el.style.top = it.top + "px";
        if (!a._v) {
          a._v = a.appendChild(document.createElement("i"));
          a._h = a.appendChild(document.createElement("i"));
        }
        a._v.style.display = a._h.style.display = bent ? "block" : "none";
        if (!bent) { a.style.width = w + "px"; return; }

        var lane = 0;
        lanes.forEach(function (l) {
          if (l.b > it.line - bw && l.lane >= lane) lane = l.lane + 1;
        });
        lanes.push({ b: it.top + bw, lane: lane });
        var off = Math.min(laneBase + lane * laneStep, Math.max(0, w - bw));
        var drop = it.top - it.line + bw; /* od horného okraja čiary po horný okraj poznámky */
        a.style.width = (w - off) + "px";
        a._v.style.left = a._h.style.left = (w - off - bw) + "px";
        a._v.style.top = "0";
        a._v.style.width = a._h.style.height = bw + "px";
        a._v.style.height = (drop + bw) + "px";
        a._h.style.top = drop + "px";
        a._h.style.width = (off + bw) + "px";
      });
    }

    var raf = null;
    function scheduleLayout() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    }

    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("load", scheduleLayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleLayout);
    }
    /* PATOLA: obrázky sa dolievajú lazy a menia výšku stránky — poznámky sa
       prepočítajú vždy, keď sa zmení rozmer textu */
    document.addEventListener("load", function (e) {
      if (e.target && e.target.tagName === "IMG") scheduleLayout();
    }, true);
    if (window.ResizeObserver) new ResizeObserver(scheduleLayout).observe(page);
    scheduleLayout();
  }

  /* ── selection toolbar ──────────────────────────────────────────────
     Select text inside .page → a small bar appears above it. ACTIONS is a
     list, so another chatbot is a one-entry change with no other edits.

     Two kinds of targets, and the difference is not ours to fix:

     · ChatGPT reads ?q= on load, drops it into the prompt box and SENDS it.
       One click, answer already running — nothing to paste. (Same shape
       works for Perplexity and Grok, see the commented entries below.)
     · Gemini has no official URL prefill. ?prompt= only fires for readers
       who installed one of the community extensions, so the prompt goes to
       the CLIPBOARD (that always works) and the parameter rides along as a
       bonus; the toast tells the reader to paste.

     askVia() covers both: `sends:true` means the link carries the prompt on
     its own, and the clipboard is only used when the URL would be too long
     for it (very long selections) — otherwise the reader's clipboard is
     left alone. */

  var URL_LIMIT = 7500; /* keep the link inside what browsers/CDNs accept */

  function askVia(cfg, prompt) {
    /* Everything here must start inside the click gesture: the clipboard
       write needs the user activation and so does window.open, or the popup
       gets blocked. So neither may wait on the other. */
    var withPrompt = cfg.url + "?" + cfg.param + "=" + encodeURIComponent(prompt);
    var carried = withPrompt.length <= URL_LIMIT;
    var handsOff = cfg.sends && carried; /* nothing for the reader to do */

    var copied = handsOff ? null : copyText(prompt);
    window.open(carried ? withPrompt : cfg.url, "_blank", "noopener");

    if (handsOff) {
      toast("Otázka je odoslaná do <b>" + cfg.label + "</b> v novej karte.");
      return;
    }
    copied.then(
      function () {
        toast(
          (cfg.sends ? "Úryvok je pridlhý na odkaz — otázka" : "Otázka") +
            " je v schránke — v <b>" + cfg.label + "</b> ju vlož cez <b>Ctrl+V</b> a odošli."
        );
      },
      function () {
        toast(cfg.label + " je otvorené, ale text sa nepodarilo skopírovať — označ ho a skopíruj ručne.");
      }
    );
  }

  var ACTIONS = [
    {
      id: "chatgpt",
      label: "ChatGPT",
      title: "Nechať ChatGPT vysvetliť označený text (otázka sa odošle sama)",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path fill="#fff" d="M5.6 3.6H18.4A3.4 3.4 0 0 1 21.8 7v6.6a3.4 3.4 0 0 1-3.4 3.4H12' +
        'l-4.6 3.4V17H5.6a3.4 3.4 0 0 1-3.4-3.4V7a3.4 3.4 0 0 1 3.4-3.4z"/>' +
        '<g fill="#232020"><circle cx="8" cy="10.3" r="1.35"/>' +
        '<circle cx="12" cy="10.3" r="1.35"/><circle cx="16" cy="10.3" r="1.35"/></g></svg>',
      run: function (prompt) {
        askVia({ url: "https://chatgpt.com/", param: "q", label: "ChatGPT", sends: true }, prompt);
      }
    },
    {
      id: "gemini",
      label: "Gemini",
      title: "Nechať Gemini vysvetliť označený text (otázku treba vložiť cez Ctrl+V)",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<defs><linearGradient id="askSpark" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#5b9dff"/>' +
        '<stop offset="55%" stop-color="#9b72cb"/>' +
        '<stop offset="100%" stop-color="#e87a94"/>' +
        "</linearGradient></defs>" +
        '<path fill="url(#askSpark)" d="M12 2c0 5.523 4.477 10 10 10' +
        "-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z\"/></svg>",
      run: function (prompt) {
        askVia(
          { url: "https://gemini.google.com/app", param: "prompt", label: "Gemini", sends: false },
          prompt
        );
      }
    }
    /* Ďalšie, ak by sa zišli — obe vedia prompt z URL rovnako ako ChatGPT:
       askVia({url:"https://www.perplexity.ai/search", param:"q", label:"Perplexity", sends:true}, prompt)
       askVia({url:"https://grok.com/",               param:"q", label:"Grok",       sends:true}, prompt) */
  ];

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    /* file:// in older browsers: fall back to the legacy path */
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(ta);
      if (ok) resolve();
      else reject(new Error("copy unavailable"));
    });
  }

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

  function setupSelectionTools() {
    var scope = document.querySelector(".page");
    if (!scope || !window.getSelection || !ACTIONS.length) return;

    var bar = document.createElement("div");
    bar.className = "ask-tools";
    bar.hidden = true;

    ACTIONS.forEach(function (action) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.title = action.title;
      btn.innerHTML = action.icon + "<span>" + action.label + "</span>";
      btn.addEventListener("click", function () {
        var text = selectedText();
        if (!text) return;
        action.run(buildPrompt(text));
        hide();
      });
      bar.appendChild(btn);
    });

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

    function buildPrompt(text) {
      if (text.length > 4000) text = text.slice(0, 4000) + " […]";
      var sel = window.getSelection();
      var where = document.title.replace(/\s+/g, " ").trim();
      var section = sel && sel.anchorNode ? sectionLabel(sel.anchorNode) : "";
      if (section) where += " — " + section;

      return (
        "Vysvetli mi nasledujúci úryvok z poznámok z patologickej anatómie. " +
        "Odpovedz po slovensky, zameraj sa na mechanizmus (prečo to tak je), " +
        "nie len na opis, a doplň klinický význam.\n\n" +
        "Zdroj: " + where + "\n\n" +
        "Úryvok:\n\"\"\"\n" + text + "\n\"\"\""
      );
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

  function scrollToHashOnLoad() {
    if (location.hash.length > 1) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(function () { target.scrollIntoView({ block: "start", behavior: "instant" }); }, 0);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    wrapSvgTexts();
    var entries = buildTOC();
    setupProgress();
    setupActiveHighlight(entries);
    setupSidebarToggle();
    setupSideNotes();
    setupSelectionTools();
    scrollToHashOnLoad();
  });
})();

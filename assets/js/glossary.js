/* ══════════════════════════════════════════════════════════════════════
   GLOSÁR — engine.

   Čo robí:
   1. Prejde text kapitoly a označí každý výskyt pojmu z ../glossary/*.js
      — vrátane skloňovaných tvarov (každý pojem má vlastný vzor).
      Označuje sa AŽ ZA BEHU, takže .html kapitoly ostávajú čisté a nový
      pojem = jeden záznam v dátach, nie sto ručných úprav v texte.
   2. Pozadie pojmu je viditeľné len v kruhu s polomerom RADIUS okolo
      kurzora. Aby to bolo lacné aj pri tisícke pojmov na stránke, rátajú
      sa obdĺžniky pojmov raz (v súradniciach dokumentu, takže scroll ich
      neruší) a ukladajú do vodorovných pásiem — pri pohybe myši sa testujú
      len pojmy z pásiem, ktoré kruh vôbec môže pretínať.
   3. Klik na pojem otvorí plávajúcu vysvetlivku. Jej text prejde tým istým
      označovaním, takže vysvetlivka vie odkazovať na ďalšie pojmy sama od
      seba — bez ručného linkovania.

   Klasický skript (žiadne moduly, žiadny fetch): kniha sa číta cez
   file://, kde by import aj fetch spadli na cross-origin.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var DATA = window.PF_GLOSSARY;
  if (!DATA || !DATA.length) return;

  var RADIUS = 50;   /* px — polomer „reflektora“ okolo kurzora */
  var BAND = 128;    /* px — výška pásma priestorového indexu */

  /* pojmy sa neoznačujú v navigácii, nadpisoch, odkazoch ani v kóde:
     v hlavičke/obsahu by rušili, v nadpisoch by súperili s bočným
     obsahom a v <a> by sa bil klik na odkaz s klikom na vysvetlivku */
  var SKIP =
    "a,button,script,style,code,kbd,samp,svg,h1,h2,h3,h4,h5,h6," +
    ".pf-term,.pf-tip,.site-header,.site-sidebar,.contents,.running-head," +
    ".running-foot,.reading-pct,.reading-progress,.ask-tools,.ask-toast,.eyebrow";
  var SKIP_TIP = "a,button,code,svg,.pf-term";

  /* ── kde ležia obrázky ────────────────────────────────────────────
     Odvodené z URL tohto skriptu, takže tie isté dáta fungujú z
     chapters/ aj z koreňa (index.html) bez relatívnych ciest v dátach. */
  var ROOT = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName("script");
      s = all[all.length - 1];
    }
    var src = (s && s.src) || "";
    var i = src.lastIndexOf("/assets/js/");
    return i < 0 ? "" : src.slice(0, i + 1);
  })();

  var byId = Object.create(null);
  DATA.forEach(function (t) { byId[t.id] = t; });

  /* ── vzory ────────────────────────────────────────────────────────
     V dátach sa píše \w; tu sa rozšíri na unicode triedu, aby vzor
     chytil aj á/č/ž/κ/γ.

     Do alternácie idú JEDNOTLIVÉ vzory (nie celé heslá) zoradené od
     najdlhšieho — regex berie prvú vetvu, ktorá sedí, takže takto vyhrá
     „zárodočné centrum“ nad „centrom“ a „epitope spreading“ nad
     „epitop“. Keby sa triedili celé heslá podľa najdlhšieho vzoru,
     stačilo by jedno dlhé heslo, aby jeho krátky vzor predbehol cudzí
     dlhý — presne ten prípad, ktorý toto rozdelenie odstraňuje. */
  function expand(src) {
    return src.replace(/\\w/g, "[\\p{L}\\p{N}]");
  }

  var RE = null;
  var groups = Object.create(null);

  (function buildRegex() {
    var flat = [];
    DATA.forEach(function (t) {
      t.match.forEach(function (p) { flat.push({ src: p, term: t }); });
    });
    flat.sort(function (a, b) { return b.src.length - a.src.length; });

    var parts = [];
    flat.forEach(function (item, i) {
      var name = "g" + i;
      groups[name] = item.term;
      parts.push("(?<" + name + ">" + expand(item.src) + ")");
    });
    /* pravá hranica je v samotnom vzore, aby regex vedel backtrackovať;
       ľavá sa kontroluje v JS (lookbehind nie je všade dostupný) */
    try {
      RE = new RegExp("(?:" + parts.join("|") + ")(?![\\p{L}\\p{N}\\-])", "giu");
    } catch (e) {
      RE = null; /* veľmi starý prehliadač — glosár sa proste nezapne */
    }
  })();
  if (!RE) return;

  var BOUNDARY = /[\p{L}\p{N}\-]/u;
  function leftOK(text, idx) {
    return idx === 0 || !BOUNDARY.test(text.charAt(idx - 1));
  }

  var surfaceCache = Object.create(null);
  function termOf(m) {
    var key = m[0].toLowerCase();
    var hit = surfaceCache[key];
    if (hit !== undefined) return hit;
    var found = null, g = m.groups, k;
    for (k in g) {
      if (g[k] !== undefined) { found = groups[k]; break; }
    }
    surfaceCache[key] = found;
    return found;
  }

  /* ── označovanie ─────────────────────────────────────────────────── */
  function markNode(node, excludeId) {
    var text = node.nodeValue;
    var frag = null, last = 0, m;
    RE.lastIndex = 0;
    while ((m = RE.exec(text))) {
      if (!m[0].length) { RE.lastIndex++; continue; }
      if (!leftOK(text, m.index)) continue;
      var term = termOf(m);
      if (!term || term.id === excludeId) continue;

      if (!frag) frag = document.createDocumentFragment();
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));

      var span = document.createElement("span");
      span.className = "pf-term";
      span.setAttribute("data-term", term.id);
      span.setAttribute("role", "button");
      span.setAttribute("tabindex", "0");
      span.setAttribute("aria-label", term.title + " — vysvetlivka");
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (!frag) return false;
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
    return true;
  }

  function markRoot(root, skipSel, excludeId) {
    if (!root) return;
    var nodes = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue || n.nodeValue.length < 2) continue;
      var p = n.parentElement;
      if (!p || p.closest(skipSel)) continue;
      nodes.push(n);
    }
    /* zbierka najprv, nahrádzanie až potom — TreeWalker by sa inak
       potkol o uzly, ktoré práve vymieňame za fragment */
    for (var i = 0; i < nodes.length; i++) markNode(nodes[i], excludeId);
  }

  /* ── priestorový index + reflektor ───────────────────────────────── */
  var bands = Object.create(null);
  var litNow = [];
  var stamp = 0;

  function indexMarks() {
    bands = Object.create(null);
    var sx = window.scrollX || window.pageXOffset || 0;
    var sy = window.scrollY || window.pageYOffset || 0;
    var all = document.querySelectorAll(".pf-term");

    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest(".pf-tip")) continue;      /* vo vysvetlivke svieti vždy */
      var list = el.getClientRects();
      if (!list.length) continue;

      var rects = [], top = Infinity, bot = -Infinity;
      for (var j = 0; j < list.length; j++) {
        var r = list[j];
        if (!r.width && !r.height) continue;
        var t = r.top + sy, b = r.bottom + sy;
        rects.push({ l: r.left + sx, t: t, r: r.right + sx, b: b });
        if (t < top) top = t;
        if (b > bot) bot = b;
      }
      if (!rects.length) continue;

      var rec = { el: el, rects: rects, lit: false, seen: -1 };
      var b0 = Math.floor(top / BAND), b1 = Math.floor(bot / BAND);
      for (var b = b0; b <= b1; b++) (bands[b] || (bands[b] = [])).push(rec);
    }
  }

  function near(rec, x, y) {
    for (var i = 0; i < rec.rects.length; i++) {
      var r = rec.rects[i];
      var dx = x < r.l ? r.l - x : (x > r.r ? x - r.r : 0);
      var dy = y < r.t ? r.t - y : (y > r.b ? y - r.b : 0);
      if (dx * dx + dy * dy <= RADIUS * RADIUS) return true;
    }
    return false;
  }

  function spotlight(x, y) {
    stamp++;
    var next = [];
    var b0 = Math.floor((y - RADIUS) / BAND), b1 = Math.floor((y + RADIUS) / BAND);
    for (var b = b0; b <= b1; b++) {
      var list = bands[b];
      if (!list) continue;
      for (var i = 0; i < list.length; i++) {
        var rec = list[i];
        if (rec.seen === stamp) continue;
        rec.seen = stamp;
        if (near(rec, x, y)) next.push(rec);
      }
    }
    for (var k = 0; k < litNow.length; k++) {
      if (litNow[k].seen !== stamp || !near(litNow[k], x, y)) {
        litNow[k].lit = false;
        litNow[k].el.classList.remove("is-lit");
      }
    }
    for (var q = 0; q < next.length; q++) {
      if (!next[q].lit) { next[q].lit = true; next[q].el.classList.add("is-lit"); }
    }
    litNow = next;
  }

  function clearLit() {
    for (var i = 0; i < litNow.length; i++) {
      litNow[i].lit = false;
      litNow[i].el.classList.remove("is-lit");
    }
    litNow = [];
  }

  /* ── vysvetlivka ─────────────────────────────────────────────────── */
  /* Otvorené okná tvoria reťaz: chain[0] visí na pojme v texte kapitoly,
     chain[n] na pojme vo vnútri chain[n-1]. Rodič sa pri otvorení dieťaťa
     nezatvára — čitateľ tak vidí celú cestu, ktorou sa preklikal. */
  var chain = [];
  var chainScrollY = 0;   /* poloha stránky, keď reťaz vznikla */

  var ICON_CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_IMG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/>' +
    '<circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5-4.5 4.5L9 13l-6 6"/></svg>';

  function figureHTML(img) {
    if (!img) return "";
    var credit = img.credit || "Wikimedia Commons";
    if (img.src) {
      var cap =
        (img.caption ? "<b>" + img.caption + "</b> " : "") +
        (img.href
          ? '<a href="' + img.href + '" target="_blank" rel="noopener noreferrer">Zdroj: ' + credit + ".</a>"
          : "Zdroj: " + credit + ".");
      return (
        "<figure><img src=\"" + ROOT + img.src + "\" alt=\"" + (img.alt || "") + "\" loading=\"lazy\">" +
        "<figcaption>" + cap + "</figcaption></figure>"
      );
    }
    /* Záložná vetva pre kvalitný obrázok, ktorý sa preberať NESMIE: nevloží
       sa, len sa naň odkáže. Heslo, ku ktorému nič dobré neexistuje, ostáva
       radšej bez obrázka — generický odkaz do vyhľadávania nikomu nepomôže. */
    if (img.href) {
      return (
        '<a class="pf-imglink" href="' + img.href + '" target="_blank" rel="noopener noreferrer">' +
        ICON_IMG +
        '<span><span class="t">' + (img.label || "Obrázok k pojmu") + "</span>" +
        '<span class="c">' + credit + " · otvorí sa v novej karte</span></span></a>"
      );
    }
    return "";
  }

  /* Jedno okno = jedna karta v reťazi. Karta 0 visí na pojme v texte
     kapitoly, každá ďalšia na pojme vo svojom rodičovi — a rodič ostáva
     otvorený, aby bolo vidieť, odkiaľ sa čitateľ prekliknuť. */
  function createCard(term, depth, parentTerm) {
    var el = document.createElement("div");
    el.className = "pf-tip";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Vysvetlivka: " + term.title);
    el.style.zIndex = String(70 + depth);
    el.dataset.depth = String(depth);

    el.innerHTML =
      '<div class="pf-tip-bar" title="Potiahnutím presunieš okno">' +
        '<span class="grip" aria-hidden="true"></span>' +
        '<span class="crumb"></span>' +
        '<button type="button" class="close" title="Zavrieť toto okno" aria-label="Zavrieť">' + ICON_CLOSE + "</button>" +
      "</div>" +
      '<div class="pf-tip-scroll">' +
        "<h4>" + term.title + "</h4>" +
        (term.short ? '<p class="kicker">' + term.short + "</p>" : "") +
        '<div class="pf-tip-body">' + term.body + "</div>" +
        figureHTML(term.img) +
      "</div>" +
      '<div class="pf-tip-hint">' +
        (depth === 0
          ? "Žlté slová sa dajú otvoriť ďalej · lištu chyť a presuň · Esc zavrie"
          : "Presunuté okno ostane otvorené aj po odrolovaní") +
      "</div>";

    el.querySelector(".crumb").textContent = parentTerm ? parentTerm.title + " →" : "Vysvetlivka";
    document.body.appendChild(el);

    /* vnorené pojmy — ten istý priechod, len bez odkazu na seba samého */
    markRoot(el.querySelector(".pf-tip-body"), SKIP_TIP, term.id);

    return el;
  }

  function cardIndexOf(node) {
    for (var i = 0; i < chain.length; i++) if (chain[i].el.contains(node)) return i;
    return -1;
  }

  /* ── presúvanie okna za hornú lištu ───────────────────────────────
     Pozícia sa drží v left/top (nie v transforme), aby zostala v tých
     istých jednotkách, v akých s ňou počíta placeAll a hits(). */
  function makeDraggable(handle, panel, onDrop) {
    handle.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      if (e.target.closest("button")) return;      /* × nie je úchyt */
      e.preventDefault();

      var startX = e.clientX, startY = e.clientY;
      var box = panel.getBoundingClientRect();
      var originLeft = box.left, originTop = box.top;
      var moved = false;

      panel.classList.add("is-dragging");
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}

      function move(ev) {
        var dx = ev.clientX - startX, dy = ev.clientY - startY;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 3) return;  /* drobný posun = klik */
        moved = true;
        var vw = document.documentElement.clientWidth;
        var vh = document.documentElement.clientHeight;
        /* okno sa nesmie vysunúť tak, aby sa nedalo chytiť späť */
        var l = Math.min(Math.max(8 - panel.offsetWidth + 60, originLeft + dx), vw - 60);
        var t = Math.min(Math.max(2, originTop + dy), vh - 34);
        panel.style.left = Math.round(l) + "px";
        panel.style.top = Math.round(t) + "px";
      }
      function up(ev) {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        handle.removeEventListener("pointercancel", up);
        try { handle.releasePointerCapture(ev.pointerId); } catch (err) {}
        panel.classList.remove("is-dragging");
        if (moved && onDrop) onDrop();
      }
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
      handle.addEventListener("pointercancel", up);
    });
  }

  function anyDragged() {
    for (var i = 0; i < chain.length; i++) if (chain[i].dragged) return true;
    return false;
  }

  var CASCADE = 28;   /* px — o koľko sa karta odsadí, keď sa už nemá kam uhnúť */

  function placeAll() {
    if (!chain.length) return;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var header = document.querySelector(".site-header");
    var minTop = header ? header.getBoundingClientRect().bottom + 4 : 4;
    var gap = 10;

    /* prekrytie sa testuje proti VŠETKÝM už umiestneným kartám, nie len
       proti rodičovi: vnuk odložený „naľavo od rodiča“ inak pristál presne
       na dedovi a celý reťaz sa zredukoval na dve viditeľné okná */
    function hits(l, t, w, h, upto) {
      for (var k = 0; k < upto; k++) {
        var b = chain[k].box;
        if (b && l < b.r && b.l < l + w && t < b.b && b.t < t + h) return true;
      }
      return false;
    }

    for (var i = 0; i < chain.length; i++) {
      var card = chain[i];
      var el = card.el;

      /* kartu, ktorú čitateľ presunul, už nikdy neprepočítavame — len si
         zapíšeme, kde je, aby sa jej ostatné vedeli vyhnúť */
      if (card.dragged) {
        card.box = {
          l: parseFloat(el.style.left) || 0, t: parseFloat(el.style.top) || 0,
          r: (parseFloat(el.style.left) || 0) + el.offsetWidth,
          b: (parseFloat(el.style.top) || 0) + el.offsetHeight
        };
        continue;
      }

      var rects = card.anchor.getClientRects();
      var r = rects.length ? rects[0] : card.anchor.getBoundingClientRect();
      var w = el.offsetWidth, h = el.offsetHeight;
      var maxTop = Math.max(minTop, vh - h - 6);
      var left, top, placement;

      if (i === 0) {
        /* karta nad textom kapitoly: pod pojem, a ak sa nezmestí, nad neho */
        var below = r.bottom + gap;
        var above = r.top - h - gap;
        placement = (below + h <= vh - 6 || above < minTop) ? "below" : "above";
        top = placement === "below" ? Math.min(below, maxTop) : above;
        var anchorX = r.left + r.width / 2;
        left = Math.min(Math.max(8, anchorX - w / 2), Math.max(8, vw - w - 8));
        el.style.setProperty("--pf-beak-x",
          Math.min(Math.max(14, anchorX - left), Math.max(14, w - 14)) + "px");
      } else {
        var p = chain[i - 1].box;
        /* zvisle sa karta zarovná na riadok, na ktorý sa kliklo */
        top = Math.min(Math.max(minTop, r.top - 10), maxTop);

        /* najprv vpravo od rodiča, potom vľavo — a len ak tam nesedí
           žiadna staršia karta */
        var tries = [p.r + gap, p.l - gap - w];
        left = null;
        for (var c = 0; c < tries.length; c++) {
          var cand = tries[c];
          if (cand >= 8 && cand + w <= vw - 8 && !hits(cand, top, w, h, i)) { left = cand; break; }
        }

        if (left !== null) {
          placement = "side";
        } else {
          /* nikam sa nezmestí: preloží sa cez rodiča s odsadením, aby mu
             ostal viditeľný ľavý okraj aj lišta s názvom */
          placement = "stack";
          left = Math.min(Math.max(8, p.l + CASCADE), Math.max(8, vw - w - 8));
          top = Math.min(Math.max(minTop, p.t + CASCADE), maxTop);
          /* keď je rodič už úplne dole, kaskáduje sa nahor */
          if (Math.abs(top - p.t) < 2 && Math.abs(left - p.l) < 2) {
            top = Math.max(minTop, Math.min(p.t - CASCADE, maxTop));
          }
        }
      }

      left = Math.round(left);
      top = Math.round(Math.max(minTop, top));
      el.style.left = left + "px";
      el.style.top = top + "px";
      el.dataset.place = placement;
      card.box = { l: left, t: top, r: left + w, b: top + h };
    }
  }

  function openTerm(id, el, fromKeyboard) {
    var term = byId[id];
    if (!term) return;

    var parentIndex = cardIndexOf(el);   /* -1 = pojem v texte kapitoly */

    /* pojem, ktorý je v reťazi už otvorený, ju len zbalí späť k sebe —
       inak by sa dali donekonečna otvárať tie isté dve heslá dokola */
    for (var i = parentIndex + 1; i < chain.length; i++) {
      if (chain[i].term.id === term.id) {
        closeFrom(i + 1);
        placeAll();
        return;
      }
    }

    closeFrom(parentIndex + 1);          /* zahodí hlbšiu vetvu, rodičia ostávajú */

    if (!chain.length) chainScrollY = window.scrollY || window.pageYOffset || 0;

    var depth = parentIndex + 1;
    var parentTerm = depth > 0 ? chain[depth - 1].term : null;
    var card = {
      el: createCard(term, depth, parentTerm),
      term: term,
      anchor: el,
      returnFocus: !!fromKeyboard
    };
    chain.push(card);

    el.classList.add("is-open");
    el.setAttribute("aria-expanded", "true");

    card.el.querySelector(".close").addEventListener("click", function () {
      closeFrom(chain.indexOf(card));
    });

    /* presunuté okno prestane visieť na pojme: nepresúva ho už placeAll
       ani ho nezavrie rolovanie — čitateľ si ho odložil zámerne */
    makeDraggable(card.el.querySelector(".pf-tip-bar"), card.el, function () {
      card.dragged = true;
      card.el.dataset.dragged = "1";
      card.el.dataset.place = "free";
      placeAll();
    });

    placeAll();

    /* pri ovládaní klávesnicou musí fokus prejsť do okna, inak sa doň
       čitateľ nedostane; pri myši sa fokus nekradne */
    if (fromKeyboard) card.el.querySelector(".close").focus();
  }

  /* Zavrie kartu na indexe `from` a všetky nad ňou — zavretie rodiča
     nesmie nechať visieť deti, ktoré sú naň naviazané. */
  function closeFrom(from) {
    if (from < 0) from = 0;
    var focusBack = null;
    for (var i = chain.length - 1; i >= from; i--) {
      var card = chain[i];
      card.anchor.classList.remove("is-open");
      card.anchor.removeAttribute("aria-expanded");
      if (card.returnFocus) focusBack = card.anchor;
      if (card.el.parentNode) card.el.parentNode.removeChild(card.el);
    }
    chain.length = from;
    if (focusBack && document.body.contains(focusBack)) focusBack.focus();
  }

  function closeTip() { closeFrom(0); }

  /* ══ lupa obrázkov ═══════════════════════════════════════════════════
     Klik na obrázok v kapitole aj vo vysvetlivke. Popisok si sadne vedľa
     obrázka (vľavo), pod neho, alebo — keď nie je miesto ani na jedno —
     naň ako presúvateľný panel. Vysvetlivka, z ktorej obrázok pochádza,
     ostáva otvorená; lupa je samostatná vrstva nad ňou.

     Obrázok do lupy PRILETÍ zo svojho miesta v texte a pri zatvorení sa
     tam vráti. Na dotykovej obrazovke sa dá v lupe priblížiť dvoma prstami
     (alebo dvojitým ťuknutím) — mení sa len obrázok, nie celá stránka. */
  var lb = null, lbStage = null, lbFigure = null, lbCap = null, lbCapBody = null, lbOpener = null;
  var CHART_PAD = 10;   /* px — biely rám okolo skopírovaného grafu */
  var LB_ANIM = 200;    /* ms — prílet, návrat aj rozostrenie pozadia (rovnako v glossary.css) */
  var lbSource = null;  /* obrázok v texte, z ktorého lupa vyletela */
  var lbFly = null;     /* jeho obdĺžnik, kým prílet čaká na vysadenie obsahu */
  var lbClosing = null; /* časovač dobiehajúceho zatvárania */

  /* počas dobiehajúceho zatvárania je lupa pre zvyšok kódu už zavretá */
  function lbIsOpen() { return !!lb && !lb.hidden && !lbClosing; }

  function lbMotion() {
    return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "pf-lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Zväčšený obrázok");
    lb.hidden = true;
    /* Popis je súrodencom scény, nie jej dieťaťom. Scéna je totiž
       `position:absolute; inset:34px`, takže by sa jej absolútne
       umiestnený popis počítal od jej rohu — a keďže súradnice mu
       dávame z getBoundingClientRect (od okna), sedel by o tých 34 px
       vedľa. To isté platilo pri ťahaní myšou. */
    lb.innerHTML =
      '<button type="button" class="pf-lb-close" title="Zavrieť (Esc)" aria-label="Zavrieť">' + ICON_CLOSE + "</button>" +
      '<div class="pf-lb-stage"><div class="pf-lb-figure"></div></div>' +
      '<div class="pf-lb-cap">' +
        '<div class="pf-lb-bar" title="Potiahnutím presunieš popis">' +
          '<span class="grip" aria-hidden="true"></span><span class="t">Popis</span>' +
        "</div>" +
        '<div class="body"></div>' +
      "</div>";
    document.body.appendChild(lb);

    lbStage = lb.querySelector(".pf-lb-stage");
    lbFigure = lb.querySelector(".pf-lb-figure");
    lbCap = lb.querySelector(".pf-lb-cap");
    lbCapBody = lb.querySelector(".pf-lb-cap .body");

    lb.querySelector(".pf-lb-close").addEventListener("click", closeLightbox);
    /* zavrie klik na prázdnu rozostrenú plochu, nie na obsah či popis */
    lb.addEventListener("click", function (e) {
      /* pustenie prsta po ťahaní či priblížení nie je klik na pozadie */
      if (Date.now() - lbNoClick < 400) return;
      if (e.target === lb || e.target === lbStage || e.target === lbFigure) closeLightbox();
    });
    /* Koliesko nad lupou približuje a vzďaľuje obrázok (lbWheel), stránka
       pod ňou stojí — preto poslucháč nie je pasívny. */
    lb.addEventListener("wheel", lbWheel, { passive: false });
    lb.addEventListener("dblclick", function (e) {
      var el = lbContent();
      if (lbLastPointer !== "mouse" || !el || !el.contains(e.target)) return;
      lbToggleZoom(e.clientX, e.clientY);
    });
    /* Safari hlási roztiahnutie prstov vlastnými udalosťami */
    lb.addEventListener("gesturestart", lbGesture);
    lb.addEventListener("gesturechange", lbGesture);
    lb.addEventListener("gestureend", lbGesture);
    /* Dotyk v lupe patrí obrázku: prsty ho približujú a posúvajú, stránka
       pod ním stojí. `touch-action:none` v glossary.css to prehliadaču
       povie vopred; preventDefault je poistka pre tie, čo ho neposlúchnu
       (inak by priblížili celý web). Popis sa roluje normálne. */
    lb.addEventListener("touchmove", function (e) {
      if (e.target.closest && e.target.closest(".pf-lb-cap .body")) return;
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    lb.addEventListener("pointerdown", lbPointerDown);
    lb.addEventListener("pointermove", lbPointerMove);
    lb.addEventListener("pointerup", lbPointerUp);
    lb.addEventListener("pointercancel", lbPointerUp);
    /* fokus nesmie utiecť pod lupu na prvky, ktoré čitateľ nevidí */
    lb.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = lb.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    makeDraggable(lb.querySelector(".pf-lb-bar"), lbCap, function () {
      lbCap.dataset.moved = "1";
    });
  }

  /* Obsahom lupy je buď <img>, alebo KÓPIA inline <svg> grafu. Graf sa
     needá previesť na obrázok: všetko farbenie a písmo mu dávajú triedy
     `.chart …` zo štýlu kapitoly, takže serializovaný by vyšiel čierny.
     Kópia aj s obalom `.chart` si štýly ponechá. */
  function lbContent() { return lbFigure.firstElementChild; }

  function fillFigure(media) {
    lbFigure.innerHTML = "";
    if (media.tagName === "IMG") {
      var img = document.createElement("img");
      img.className = "pf-lb-img";
      img.alt = media.getAttribute("alt") || "";
      img.draggable = false;   /* ťahanie myšou posúva priblížený obrázok */
      img.addEventListener("load", layoutLightbox);
      img.src = media.currentSrc || media.src;
      lbFigure.appendChild(img);
      return;
    }
    var wrap = document.createElement("div");
    wrap.className = "chart";
    var clone = media.cloneNode(true);
    clone.removeAttribute("style");
    wrap.appendChild(clone);
    lbFigure.appendChild(wrap);
  }

  var LB_MAX_UPSCALE = 1.5;   /* natiahnuť sa smie najviac na 1,5× svojej veľkosti */

  /* Prirodzená veľkosť obsahu. Pri <img> ju vie prehliadač (naturalWidth
     zvládne aj SVG v mm), pri kópii grafu ju treba vziať z viewBoxu —
     inline SVG bez width/height inú vlastnú veľkosť nemá. */
  function naturalSize(el) {
    if (el.tagName === "IMG") {
      return (el.naturalWidth && el.naturalHeight)
        ? { w: el.naturalWidth, h: el.naturalHeight } : null;
    }
    var svg = el.querySelector("svg");
    var vb = ((svg && svg.getAttribute("viewBox")) || "").trim().split(/[\s,]+/).map(Number);
    return (vb.length === 4 && vb[2] > 0 && vb[3] > 0) ? { w: vb[2], h: vb[3] } : null;
  }

  /* Obsah sa roztiahne na plochu, ktorá mu ostala — ale nie donekonečna:
     nad 1,5× by sa rastrový obrázok rozmazal a malá schéma by pôsobila
     hrubo. Vracia skutočný obdĺžnik; null = ešte nie je načítaný. */
  function fitContent() {
    var el = lbContent();
    if (!el) return null;
    var nat = naturalSize(el);
    var box = lbFigure.getBoundingClientRect();
    if (!nat || !box.width || !box.height) return null;

    var pad = el.classList.contains("chart") ? 2 * CHART_PAD : 0;
    var scale = Math.min(
      (box.width - pad) / nat.w,
      (box.height - pad) / nat.h,
      LB_MAX_UPSCALE
    );
    el.style.width = Math.max(40, Math.round(nat.w * scale) + pad) + "px";

    /* Poloha sa číta z offset*, nie z getBoundingClientRect: ten by do
       obdĺžnika započítal aj transformáciu (prílet, priblíženie prstami).
       Rámec je `position:absolute`, takže offset* sa počíta od neho. */
    var w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return null;
    return { left: box.left + el.offsetLeft, top: box.top + el.offsetTop, width: w, height: h };
  }

  function measureCap(w) {
    lbCap.style.width = Math.round(w) + "px";
    return lbCap.offsetHeight;
  }

  /* Obrázok si veľkosť aj polohu rieši CSS a vycentruje sa do celej
     plochy — od popisu NEZÁVISÍ. Popis sa až potom priloží tam, kde
     okolo neho reálne ostalo miesto: vľavo, pod ním, a keď nikde, tak naň.

     Rozmery sa NEPOČÍTAJU z naturalWidth/Height, ale odčítajú z reálneho
     obdĺžnika obrázka. Vlastný prepočet „contain“ sa totiž vie s CSS
     rozísť (napr. pri SVG bez vlastných rozmerov) a popis potom pristane
     inde, než obrázok naozaj je. */
  var lbTries = 0;

  var LB_EDGE = 10, LB_GAP = 16, LB_CAP_MAX = 620, LB_CAP_MIN = 340, LB_SIDE_MIN = 240;

  function layoutLightbox() {
    if (!lbIsOpen()) return;
    var content = placeLightbox();
    /* prílet štartuje až z konečného miesta — prvý raz, keď je obsah vysadený */
    if (content && lbFly) {
      lbFlyIn(lbFly, content);
      lbFly = null;
    }
  }

  /* Vráti výsledný obdĺžnik obsahu; null = ešte nie je vysadený. */
  function placeLightbox() {
    /* vždy sa začína od plnej plochy; miesto pre popis si prípadne
       vypýtame až nižšie */
    lbFigure.style.bottom = "";

    var content = fitContent();
    if (!content) {
      /* obsah ešte nie je vysadzaný — skúsime v ďalšom snímku */
      if (lbTries++ < 30) requestAnimationFrame(layoutLightbox);
      return null;
    }
    lbTries = 0;

    if (lbCap.hidden) { lb.dataset.layout = "none"; return content; }
    if (lbCap.dataset.moved === "1") return content;   /* čitateľ si popis presunul */

    var vh = document.documentElement.clientHeight;
    var stage = lbStage.getBoundingClientRect();

    /* 1 · Vedľa obrázka, ak tam je miesto. Obrázok si vtedy nechá plnú
       veľkosť — popis ho nestojí nič. */
    var sideW = Math.min(330, content.left - LB_EDGE - LB_GAP);
    if (sideW >= LB_SIDE_MIN) {
      var sideH = measureCap(sideW);
      var mid = content.top + content.height / 2 - sideH / 2;
      lbCap.style.left = Math.round(content.left - LB_GAP - sideW) + "px";
      lbCap.style.top = Math.round(Math.min(Math.max(LB_EDGE, mid), Math.max(LB_EDGE, vh - sideH - LB_EDGE))) + "px";
      lb.dataset.layout = "side";
      return content;
    }

    /* 2 · Inak sa OBRÁZOK ZMENŠÍ, aby sa popis vošiel pod neho. Nikdy ho
       neprekrývame — zakrytý graf je horší než menší graf. Zmenšenie robí
       CSS samo: stačí rámcu ubrať výšku zdola, pomer strán ostáva.

       Šírka popisu závisí od šírky obrázka a výška popisu od jeho šírky,
       takže sa to dvakrát prepočíta a až potom ustáli. */
    var capW = Math.min(LB_CAP_MAX, stage.width);
    var capH = measureCap(capW);

    function reserve() {
      /* popis si nesmie vziať toľko, aby z obrázka nič neostalo */
      var r = Math.min(capH + LB_GAP, Math.round(stage.height * 0.6));
      lbFigure.style.bottom = Math.round(r) + "px";
      var c = fitContent();
      if (c) content = c;
    }

    for (var pass = 0; pass < 2; pass++) {
      reserve();
      capW = Math.min(LB_CAP_MAX, Math.max(LB_CAP_MIN, content.width), stage.width);
      capH = measureCap(capW);
    }
    reserve();   /* posledná rezervácia už sedí s konečnou výškou popisu */

    lbCap.style.left = Math.round(content.left + content.width / 2 - capW / 2) + "px";
    lbCap.style.top = Math.round(content.top + content.height + LB_GAP) + "px";
    lb.dataset.layout = "below";
    return content;
  }

  /* Popis sa pri priblížení a posúvaní neskrýva — drží sa obrázka: vedľa
     neho alebo pod ním, kým tam je miesto. Keď obrázok miesto zaberie,
     popis si sadne naň k spodnému okraju okna (dá sa odtiahnuť za lištu).
     `b` je miesto obrázka bez transformácie (lbBase). */
  var lbGlideTimer = null;

  /* Pri animovanej zmene (dvojklik, návrat po odtiahnutí) sa popis na nové
     miesto presunie plynulo, spolu s obrázkom. Prechod sa hneď potom zruší,
     aby popis pri ťahaní za lištu nezaostával za kurzorom. */
  function lbCapGlide(animate) {
    clearTimeout(lbGlideTimer);
    if (animate && lbMotion()) {
      lbCap.style.transition = "left " + LB_ANIM + "ms ease-out, top " + LB_ANIM + "ms ease-out";
      lbGlideTimer = setTimeout(function () { lbCap.style.transition = ""; }, LB_ANIM + 40);
    } else {
      lbCap.style.transition = "";
    }
  }

  function lbFollowCap(b, animate) {
    if (lbCap.hidden || lbCap.dataset.moved === "1") return;
    lbCapGlide(animate);

    var vw = lb.clientWidth, vh = lb.clientHeight;
    var w = b.w * lbZ.s, h = b.h * lbZ.s;
    var left = b.cx + lbZ.x - w / 2, top = b.cy + lbZ.y - h / 2;

    var sideW = Math.min(330, left - LB_EDGE - LB_GAP);
    if (sideW >= LB_SIDE_MIN) {
      lb.dataset.layout = "side";
      var sideH = measureCap(sideW);
      var mid = top + h / 2 - sideH / 2;
      lbCap.style.left = Math.round(left - LB_GAP - sideW) + "px";
      lbCap.style.top = Math.round(Math.min(Math.max(LB_EDGE, mid), Math.max(LB_EDGE, vh - sideH - LB_EDGE))) + "px";
      return;
    }

    var capW = Math.min(LB_CAP_MAX, Math.max(LB_CAP_MIN, w), lbStage.clientWidth);
    lb.dataset.layout = "below";
    var capH = measureCap(capW);
    var capTop = top + h + LB_GAP;
    if (capTop + capH > vh - LB_EDGE) {
      lb.dataset.layout = "over";   /* na obrázku je popis nižší (glossary.css) */
      capH = measureCap(capW);
      capTop = vh - capH - LB_EDGE;
    }
    var capLeft = Math.min(Math.max(left + w / 2 - capW / 2, LB_EDGE), Math.max(LB_EDGE, vw - capW - LB_EDGE));
    lbCap.style.left = Math.round(capLeft) + "px";
    lbCap.style.top = Math.round(capTop) + "px";
  }

  /* ── prílet a návrat ────────────────────────────────────────────────
     Transformácia, ktorá obsah z jeho miesta v lupe (`at`) položí na
     obdĺžnik `on` — teda na obrázok v texte. Mierka ide podľa šírky;
     pomer strán je rovnaký (pri grafe sa líši len o biely rám). */
  function lbFlyTransform(at, on) {
    var dx = on.left + on.width / 2 - (at.left + at.width / 2);
    var dy = on.top + on.height / 2 - (at.top + at.height / 2);
    return "translate(" + dx + "px," + dy + "px) scale(" + (on.width / at.width) + ")";
  }

  function lbFlyIn(from, at) {
    var el = lbContent();
    if (!el || !el.animate || !from.width || !at.width) return;
    el.animate(
      [{ transform: lbFlyTransform(at, from) }, { transform: "none" }],
      { duration: LB_ANIM, easing: "cubic-bezier(.2,.7,.2,1)" }
    );
  }

  /* ── priblíženie prstami ────────────────────────────────────────────
     Stav je mierka a posun obsahu voči jeho miestu v lupe. Dva prsty
     približujú okolo svojho stredu, jeden posúva priblížený obrázok;
     nepriblížený obrázok sa jedným prstom dá odtiahnuť = zavrieť. */
  var LB_TAP_SLOP = 8;      /* px — do tohto pohybu je dotyk ťuknutie */
  var LB_SWIPE = 70;        /* px — od tohto odtiahnutia sa lupa zavrie */
  var LB_DOUBLE_TAP = 2.5;  /* mierka po dvojitom ťuknutí */
  var lbZ = { s: 1, x: 0, y: 0 };
  var lbPts = {};           /* prsty na obrazovke: id → {x, y} */
  var lbGest = null;        /* východisko gesta; mení sa s počtom prstov */
  var lbSeq = null;         /* jeden dotyk od prvého prsta po posledný */
  var lbLastTap = null;
  var lbNoClick = 0;

  /* miesto obsahu v lupe bez transformácie (stred a veľkosť) */
  function lbBase() {
    var el = lbContent(), box = lbFigure.getBoundingClientRect();
    var w = el.offsetWidth, h = el.offsetHeight;
    return { el: el, w: w, h: h, cx: box.left + el.offsetLeft + w / 2, cy: box.top + el.offsetTop + h / 2 };
  }

  /* Fotka sa smie priblížiť po dvojnásobok svojich bodov (ďalej je už len
     rozmazaná), najmenej však 3× — a nikdy viac než 8×. */
  function lbMaxScale(b) {
    var nat = naturalSize(b.el);
    var s = (nat && b.w) ? (nat.w / b.w) * 2 : 3;
    return Math.max(3, Math.min(8, s));
  }

  /* Priblížený obrázok sa nedá odtiahnuť za okraj: kým je menší než okno,
     ostáva v ňom celý; keď je väčší, okno ním ostáva vyplnené. */
  function lbClampZoom(b) {
    if (lbZ.s <= 1) { lbZ.s = 1; lbZ.x = 0; lbZ.y = 0; return; }
    var hw = b.w * lbZ.s / 2, hh = b.h * lbZ.s / 2;
    var ax = hw - b.cx, bx = lb.clientWidth - hw - b.cx;
    var ay = hh - b.cy, by = lb.clientHeight - hh - b.cy;
    lbZ.x = Math.min(Math.max(lbZ.x, Math.min(ax, bx)), Math.max(ax, bx));
    lbZ.y = Math.min(Math.max(lbZ.y, Math.min(ay, by)), Math.max(ay, by));
  }

  function lbApplyZoom(animate) {
    var el = lbContent();
    if (!el) return;
    var rest = lbZ.s === 1 && !lbZ.x && !lbZ.y;
    el.style.transition = (animate && lbMotion()) ? "transform " + LB_ANIM + "ms ease-out" : "";
    el.style.transform = rest ? "" : "translate(" + lbZ.x + "px," + lbZ.y + "px) scale(" + lbZ.s + ")";
    lb.classList.toggle("is-zoomed", lbZ.s > 1.01);
    /* popis ide s obrázkom; v pokoji sa vráti do rozloženia z placeLightbox */
    if (rest) {
      lbCapGlide(animate);
      placeLightbox();
    } else {
      lbFollowCap(lbBase(), animate);
    }
  }

  function lbResetZoom() {
    lbZ = { s: 1, x: 0, y: 0 };
    lbPts = {};
    lbGest = lbSeq = lbLastTap = null;
    if (lb) lb.classList.remove("is-zoomed");
    if (lbCap) lbCapGlide(false);
    var el = lb && lbContent();
    if (el) { el.style.transition = ""; el.style.transform = ""; }
  }

  /* Východisko sa berie nanovo vždy, keď pribudne alebo ubudne prst —
     obrázok tak pri zmene počtu prstov neposkočí. */
  function lbGestStart() {
    var ids = Object.keys(lbPts);
    if (!ids.length) { lbGest = null; return; }
    var b = lbBase();
    var p = lbPts[ids[0]], q = ids.length > 1 ? lbPts[ids[1]] : null;
    var fx = q ? (p.x + q.x) / 2 : p.x, fy = q ? (p.y + q.y) / 2 : p.y;
    lbGest = {
      b: b, two: !!q, max: lbMaxScale(b),
      dist: q ? (Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y)) || 1) : 0,
      s: lbZ.s, fx: fx, fy: fy,
      /* bod obrázka pod stredom gesta, v súradniciach nepriblíženého obrázka */
      qx: (fx - b.cx - lbZ.x) / lbZ.s,
      qy: (fy - b.cy - lbZ.y) / lbZ.s
    };
  }

  /* zmení mierku tak, aby bod obrázka pod (fx, fy) ostal na mieste */
  function lbZoomAt(fx, fy, s) {
    var b = lbBase();
    if (!b.w) return;
    s = Math.min(Math.max(s, 1), lbMaxScale(b));
    var qx = (fx - b.cx - lbZ.x) / lbZ.s, qy = (fy - b.cy - lbZ.y) / lbZ.s;
    lbZ.s = s;
    lbZ.x = fx - b.cx - s * qx;
    lbZ.y = fy - b.cy - s * qy;
    lbClampZoom(b);
    lbApplyZoom(false);
  }

  /* Koliesko a touchpad. Koliesko v lupe približuje a vzďaľuje obrázok okolo
     kurzora; posúva sa ťahaním. Roztiahnutie prstov na touchpade prichádza
     ako koliesko s Ctrl — prehliadač by ním priblížil celý web, tu tiež len
     obrázok. Gesto hlási drobné kroky, zub kolieska myši má 100: preto má
     každé vlastnú citlivosť a strop jedného kroku. */
  var lbLastPointer = "";
  var lbSafariScale = null;

  function lbWheel(e) {
    if (!lbIsOpen() || !lbContent()) return;
    /* v popise, ktorý sa sám roluje, necháme rolovať popis */
    var body = e.target.closest && e.target.closest(".pf-lb-cap .body");
    if (!e.ctrlKey && body && body.scrollHeight > body.clientHeight + 1) return;
    e.preventDefault();
    var d = e.deltaY * (e.deltaMode === 1 ? 33 : 1);   /* riadky → body */
    var cap = e.ctrlKey ? 30 : 150;
    d = Math.max(-cap, Math.min(cap, d));
    if (d) lbZoomAt(e.clientX, e.clientY, lbZ.s * Math.exp(-d * (e.ctrlKey ? 0.01 : 0.002)));
  }

  function lbGesture(e) {
    e.preventDefault();
    if (Object.keys(lbPts).length) return;   /* prsty na obrazovke rieši lbPointer* */
    if (e.type === "gesturestart") lbSafariScale = lbZ.s;
    else if (e.type === "gestureend") lbSafariScale = null;
    else if (lbSafariScale !== null && lbIsOpen() && lbContent()) {
      lbZoomAt(e.clientX, e.clientY, lbSafariScale * e.scale);
    }
  }

  function lbPointerDown(e) {
    lbLastPointer = e.pointerType;
    if (!lbIsOpen() || !lbContent()) return;
    if (e.target.closest(".pf-lb-cap, .pf-lb-close")) return;
    if (e.pointerType === "mouse") {
      /* myšou sa ťahá len priblížený obrázok; nepriblížený ostáva na mieste */
      if (e.button !== 0 || lbZ.s <= 1.01) return;
      e.preventDefault();   /* inak by sa začal výber textu */
      lbPts = {};           /* myš je jedna — zvyšok po pustení mimo okna zahodiť */
      lbSeq = null;
    }
    if (!lbSeq) lbSeq = { moved: false, pinched: false };
    lbPts[e.pointerId] = { x: e.clientX, y: e.clientY };
    lbGestStart();
    if (lbGest.two) { lbSeq.moved = true; lbSeq.pinched = true; }
  }

  function lbPointerMove(e) {
    var pt = lbPts[e.pointerId];
    if (!pt || !lbGest || !lbSeq) return;
    /* tlačidlo pustené mimo okna: pointerup neprišiel, ťahanie sa končí tu */
    if (e.pointerType === "mouse" && !(e.buttons & 1)) { lbPointerUp(e); return; }
    pt.x = e.clientX; pt.y = e.clientY;

    var ids = Object.keys(lbPts);
    var p = lbPts[ids[0]], q = lbGest.two ? lbPts[ids[1]] : null;
    var fx = q ? (p.x + q.x) / 2 : p.x, fy = q ? (p.y + q.y) / 2 : p.y;
    if (!lbSeq.moved) {
      if (Math.abs(fx - lbGest.fx) < LB_TAP_SLOP && Math.abs(fy - lbGest.fy) < LB_TAP_SLOP) return;
      lbSeq.moved = true;
    }

    if (q) {
      var d = Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
      lbZ.s = Math.min(Math.max(lbGest.s * d / lbGest.dist, 1), lbGest.max);
    }
    /* bod, ktorý bol pod prstami na začiatku, pod nimi aj ostáva */
    lbZ.x = fx - lbGest.b.cx - lbZ.s * lbGest.qx;
    lbZ.y = fy - lbGest.b.cy - lbZ.s * lbGest.qy;
    /* voľne (na odtiahnutie) sa hýbe len nepriblížený obrázok pod jedným prstom */
    if (lbZ.s > 1 || lbSeq.pinched) lbClampZoom(lbGest.b);
    lbApplyZoom(false);
  }

  function lbPointerUp(e) {
    if (!lbPts[e.pointerId]) return;
    delete lbPts[e.pointerId];
    if (Object.keys(lbPts).length) { lbGestStart(); return; }   /* ostal prst: gesto pokračuje */

    var seq = lbSeq, cancelled = e.type === "pointercancel";
    lbGest = lbSeq = null;
    if (!seq) return;

    if (seq.moved) {
      lbNoClick = Date.now();
      lbLastTap = null;
      if (lbZ.s > 1) return;
      var far = Math.sqrt(lbZ.x * lbZ.x + lbZ.y * lbZ.y) > LB_SWIPE;
      if (far && !seq.pinched && !cancelled) { closeLightbox(); return; }
      lbZ.x = lbZ.y = 0;
      lbApplyZoom(true);
      return;
    }
    if (cancelled || e.pointerType === "mouse") return;   /* myš má dblclick */

    /* ťuknutie: dve rýchlo po sebe na obrázok = priblížiť / vrátiť */
    var el = lbContent();
    if (!el || !el.contains(e.target)) { lbLastTap = null; return; }
    var now = Date.now(), last = lbLastTap;
    if (last && now - last.t < 320 &&
        Math.abs(e.clientX - last.x) < 30 && Math.abs(e.clientY - last.y) < 30) {
      lbLastTap = null;
      lbToggleZoom(e.clientX, e.clientY);
    } else {
      lbLastTap = { t: now, x: e.clientX, y: e.clientY };
    }
  }

  function lbToggleZoom(fx, fy) {
    var b = lbBase();
    if (lbZ.s > 1.01) {
      lbZ = { s: 1, x: 0, y: 0 };
    } else {
      var s = Math.min(LB_DOUBLE_TAP, lbMaxScale(b));
      /* miesto, na ktoré čitateľ ťukol, ostane pod prstom */
      lbZ = { s: s, x: (fx - b.cx) * (1 - s), y: (fy - b.cy) * (1 - s) };
      lbClampZoom(b);
    }
    lbApplyZoom(true);
  }

  function openLightbox(media) {
    if (!lb) buildLightbox();
    if (lbClosing) lbHide();   /* predošlé zatváranie ešte dobieha */
    lbResetZoom();

    /* popis berieme z <figcaption>; ak žiadny nie je, aspoň alt/aria-label */
    var fig = media.closest("figure");
    var cap = fig ? fig.querySelector("figcaption") : null;
    var html = cap ? cap.innerHTML
      : (media.getAttribute("alt") || media.getAttribute("aria-label") || "");
    lbCapBody.innerHTML = html;
    lbCap.hidden = !html;
    delete lbCap.dataset.moved;
    lbCap.style.left = "";
    lbCap.style.top = "";
    lbCap.style.width = "";

    lbOpener = document.activeElement;
    lbSource = media;
    lbFly = lbMotion() ? media.getBoundingClientRect() : null;
    lbTries = 0;
    fillFigure(media);
    lb.hidden = false;

    layoutLightbox();
    lb.querySelector(".pf-lb-close").focus({ preventScroll: true });
  }

  /* Rolovanie sa zámerne NEZAMYKÁ. Zámok (`overflow:hidden`) totiž
     odstráni zvislý posuvník, viewport sa rozšíri o jeho hrúbku a text
     pod rozostrením sa preleje do iných riadkov — a dorovnávať to
     paddingom je len liečenie príznaku. Keď sa stránka predsa pohne
     (klávesnica, posuvník), lupa sa zavrie; koliesko nad lupou stránku
     neposúva, približuje obrázok.

     Obrázok sa vracia na svoje miesto v texte. Pri `how === "fade"`
     (zatvorenie rolovaním) len zhasne: stránka sa pod ním práve hýbe,
     takže by doletel vedľa. */
  function closeLightbox(how) {
    if (!lbIsOpen()) return;
    if (lbOpener && document.body.contains(lbOpener)) lbOpener.focus({ preventScroll: true });
    lbOpener = null;

    var el = lbContent();
    if (!lbMotion() || !el || !el.animate || !el.offsetWidth) { lbHide(); return; }

    var now = getComputedStyle(el).transform, end = null;
    if (how !== "fade" && lbSource && document.body.contains(lbSource)) {
      var r = lbSource.getBoundingClientRect();
      var vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
      if (r.width && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw) {
        var b = lbBase();
        end = lbFlyTransform({ left: b.cx - b.w / 2, top: b.cy - b.h / 2, width: b.w, height: b.h }, r);
      }
    }
    el.style.transition = "";
    el.animate(
      end ? [{ transform: now }, { transform: end }]
          : [{ transform: now, opacity: 1 }, { transform: now, opacity: 0 }],
      { duration: LB_ANIM, easing: "cubic-bezier(.4,0,.6,1)", fill: "forwards" }
    );
    lb.classList.add("is-closing");
    lbClosing = setTimeout(lbHide, LB_ANIM);
  }

  function lbHide() {
    clearTimeout(lbClosing);
    lbClosing = null;
    lb.hidden = true;
    lb.classList.remove("is-closing");
    lbFigure.innerHTML = "";     /* uvoľní obrázok aj kópiu grafu */
    lbSource = lbFly = null;
    lbResetZoom();
  }

  /* ── prepínač trvalého zvýraznenia ───────────────────────────────── */
  function store(key, val) {
    try { if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, val); }
    catch (e) { /* file:// v Chrome localStorage blokuje — nevadí */ }
  }
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function setupToggle() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pf-terms-toggle";
    btn.innerHTML = '<span class="dot" aria-hidden="true"></span><span class="lbl">Pojmy</span>';
    btn.title = "Trvalo zvýrazniť všetky pojmy s vysvetlivkou";

    var anchor = header.querySelector(".site-toc-toggle");
    if (anchor) header.insertBefore(btn, anchor);
    else header.appendChild(btn);

    /* na dotykových zariadeniach nie je kurzor, ktorý by reflektor viedol,
       takže tam sú pojmy predvolene viditeľné */
    var saved = load("pf-terms-always");
    var coarse = window.matchMedia && window.matchMedia("(hover: none)").matches;
    var on = saved === null ? !!coarse : saved === "1";

    function apply() {
      document.documentElement.classList.toggle("pf-terms-always", on);
      btn.setAttribute("aria-pressed", String(on));
    }
    apply();

    btn.addEventListener("click", function () {
      on = !on;
      store("pf-terms-always", on ? "1" : "0");
      apply();
    });
  }

  /* ── štart ───────────────────────────────────────────────────────── */
  function init() {
    var scope = document.querySelector(".page") || document.querySelector(".site-main");
    if (!scope) return;

    markRoot(scope, SKIP, null);
    setupToggle();

    /* index sa stavia až keď je rozloženie hotové: site.js ešte
       presúva bočné poznámky a obrázky sa dolievajú lazy */
    var idxTimer = null;
    function reindex(delay) {
      clearTimeout(idxTimer);
      idxTimer = setTimeout(function () {
        indexMarks();
        document.documentElement.classList.add("pf-ready");
      }, delay || 0);
    }
    requestAnimationFrame(function () { reindex(0); });
    window.addEventListener("load", function () { reindex(60); });
    window.addEventListener("resize", function () { clearLit(); reindex(140); });
    document.addEventListener("load", function (e) {
      if (e.target && e.target.tagName === "IMG") reindex(140);
    }, true);
    /* ASCII schémy sa scrollujú vodorovne vo vlastnom bloku — dokument
       sa pritom nehýbe, takže uložené súradnice treba prepočítať.
       A keď sa roluje vnútri okna, musia sa posunúť karty, ktoré na
       tamojšom pojme visia. */
    document.addEventListener("scroll", function (e) {
      var t = e.target;
      if (!t || t.nodeType !== 1) return;
      if (scope.contains(t)) reindex(120);
      else if (cardIndexOf(t) >= 0) placeAll();
    }, true);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { reindex(60); });
    }

    /* reflektor */
    var cx = -1e6, cy = -1e6, raf = null;
    function run() {
      raf = null;
      spotlight(cx + (window.scrollX || window.pageXOffset || 0),
                cy + (window.scrollY || window.pageYOffset || 0));
      placeAll();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(run); }

    document.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      cx = e.clientX; cy = e.clientY;
      schedule();
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      if (!e.relatedTarget) clearLit();          /* kurzor opustil okno */
    });
    window.addEventListener("blur", clearLit);
    /* Rolovanie = „čítam ďalej“, takže lupa aj vysvetlivky idú preč.
       Vysvetlivky sa nezavrú, len ak si ich čitateľ presunul — tie sú
       zapichnuté. Lupa sa zavrie vždy, keď sa stránka pohne (klávesnica,
       posuvník); koliesko nad lupou stránku neposúva — približuje obrázok. */
    var SCROLL_CLOSE = 60;
    window.addEventListener("scroll", function () {
      schedule();
      if (lbIsOpen()) closeLightbox("fade");
      if (!chain.length || anyDragged()) return;
      if (Math.abs((window.scrollY || window.pageYOffset || 0) - chainScrollY) > SCROLL_CLOSE) {
        closeTip();
      }
    }, { passive: true });
    window.addEventListener("resize", function () {
      placeAll();
      /* priblíženie sa vzťahuje na staré rozmery okna — začína sa odznova */
      if (lbIsOpen()) lbResetZoom();
      layoutLightbox();
    });

    /* otváranie vysvetliviek a lupy */
    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;

      /* Obrázok aj graf — v kapitole aj vo vysvetlivke — otvára lupu.
         Priamy potomok <figure> zámerne: v <figcaption> sedí odkaz na
         zdroj s vlastnou <svg> ikonkou a ten musí ostať odkazom. */
      var media = e.target.closest("figure > img, figure > svg");
      if (media && (scope.contains(media) || cardIndexOf(media) >= 0)) {
        e.preventDefault();
        openLightbox(media);
        return;
      }

      var t = e.target.closest(".pf-term");
      if (!t) return;
      e.preventDefault();
      openTerm(t.getAttribute("data-term"), t, false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        /* najprv lupa, až potom vysvetlivky — a tie po jednej od vrchu,
           aby sa čitateľ vedel vrátiť o krok späť */
        if (lbIsOpen()) closeLightbox();
        else closeFrom(chain.length - 1);
        return;
      }
      if (e.key !== "Enter" && e.key !== " ") return;
      var t = e.target.closest && e.target.closest(".pf-term");
      if (!t) return;
      e.preventDefault();   /* medzerník by inak odscrolloval stránku */
      openTerm(t.getAttribute("data-term"), t, true);
    });
    document.addEventListener("pointerdown", function (e) {
      if (!chain.length || lbIsOpen()) return;   /* lupa má vlastné zatváranie */
      if (cardIndexOf(e.target) >= 0) return;                      /* klik v okne */
      if (e.target.closest && e.target.closest(".pf-term")) return; /* klik prepne pojem */
      closeTip();                                                   /* klik mimo zavrie všetko */
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

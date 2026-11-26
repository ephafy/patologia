/* SPDX-License-Identifier: MIT (assets/js/karty-LICENSE.txt)
   ══════════════════════════════════════════════════════════════════════════
   karty-app.js — Flows: kartičky v zvislom kanáli

   Rolovanie je natívne (scroll-snap): prst, koliesko, šípky aj ťah myšou.
   Záložky Flow, Témy, Prehľad a Nastavenia sa prepínajú vodorovným posunom, spodná lišta stojí.
   Vnútri knihy beží v ráme vrstvy Flows (assets/js/karty-flow.js, ?embed=1) a komunikuje s ňou cez postMessage.
   Hodnotenie kartu NEPOSUNIE: tlačidlo sa len zvýrazní, ďalej ide čitateľ sám rolovaním.
   Druhé ťuknutie na to isté tlačidlo hodnotenie zruší, iné ho zmení.

     ťuknutie            ukáže odpoveď, ďalšie ťuknutie ju znova skryje (hodnotenie ostáva)
     dvojité ťuknutie    hodnotenie podľa polovice karty (predvolene vľavo Neviem, vpravo Viem; Nastavenia)
     podržanie           rýchla ponuka hodnotenia: potiahni na ikonu a pusť, alebo pusť a ťukni
     klávesy             ↑ ↓, ← → (záložky), medzera (odpoveď), 1–4 (hodnotenie), V (viac), Esc

   Postup je len v tomto prehliadači (localStorage), kniha nemá server;
   v Nastaveniach sa dá vyexportovať a preniesť do iného zariadenia.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var D = window.PF_KARTY, FS = window.PF_FSRS, SM = window.PF_SM2, ART = window.PF_KARTY_ART;
  if (!D || !FS || !SM || !ART) return;
  var $ = function (id) { return document.getElementById(id); };
  var EMBED = /[?&]embed=/.test(location.search);
  /* ťah prstom ide do hostiteľa priamo (rovnaký pôvod), aby posun stihol tú istú snímku – karty-flow.js, send() */
  function toHost(m) {
    if (m.pf === "flow-drag" && window.parent !== window) { try { var h = window.parent.PF_FLOW_HOST; if (typeof h === "function") { h(m, window); return; } } catch (e) {} }
    try { window.parent.postMessage(m, "*"); } catch (e) {}
  }
  var KEY = "pf-karty:" + D.book.slug + ":v1", HOUR = 3600000, DAY = 86400000;
  var LEARN_AHEAD = 20 * 60000, MAX_LOG = 4000, WINDOW = 3, AHEAD = 4, RECENT = 4;
  var KIND = { e: "eponym", l: "cudzí názov", q: "otázka", d: "choroba", w: "prečo", p: "pojem", s: "kostra" };
  var ICON = {
    1: '<path d="M6 6l12 12M18 6L6 18"/>',
    2: '<path d="M4 9c3-3 5-3 8 0s5 3 8 0M4 16c3-3 5-3 8 0s5 3 8 0"/>',
    3: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    4: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>'
  };
  var NAME = { 1: "Neviem", 2: "Ťažké", 3: "Viem", 4: "Ľahké" };
  /* hodnotenie ČASTI kapitoly v Učení (karta kostry na čítanie): mení, čo príde za ňou (26. 11. 2026) */
  var SNAME = { 1: "Nové", 2: "Ťažké", 3: "Jasné", 4: "Už viem" };
  /* interaktívne karty (tools/karty.js → learnLinks) */
  var IT = { zor: "zoraď", pri: "priraď", roz: "rozlíš", dop: "doplň", num: "odhadni", obr: "obrázok" };
  var SKIPK = { q: 1, s: 1, i: 1, x: 1 }, TC_MAX = 6;

  var byId = {};
  D.c.forEach(function (c) { byId[c.i] = c; });
  function isRead(c) { return !!c && c.k === "s" && !/-suhrn-/.test(c.i); }   // časť kostry: číta sa, neodkrýva

  /* ── uložený stav ──────────────────────────────────────────────────── */
  var S = load();
  function blank() {
    return { v: 1, cards: {}, days: {}, log: [], set: { scope: "jadro", ts: "jadro", uc: "plus", lp: {}, off: [], algo: "anki", order: "seq", retention: 0.9, intro: 0, dbl: { l: 1, r: 3 }, sr: {}, cf: {} } };
  }
  function load() {
    var b = blank();
    try {
      var x = JSON.parse(localStorage.getItem(KEY));
      if (x && x.cards) { b.cards = x.cards; b.days = x.days || {}; b.log = x.log || []; for (var k in x.set) b.set[k] = x.set[k]; }
    } catch (e) {}
    if (b.set.off.length >= D.ch.length) b.set.off = [];
    return b;
  }
  var saveFailed = false;
  function save() {
    if (S.log.length > MAX_LOG) S.log = S.log.slice(-MAX_LOG);
    try { localStorage.setItem(KEY, JSON.stringify(S)); saveFailed = false; }
    catch (e) { if (!saveFailed) toast("Postup sa nedá uložiť v tomto prehliadači."); saveFailed = true; }
  }
  /* plánovač: predvolene ako Anki (SM-2); FSRS je voľba v Nastaveniach, rovnako ako v Anki */
  var fuzzU = 0.5, sched = makeSched();
  function makeSched() {
    return S.set.algo === "fsrs" ? FS.create({ retention: S.set.retention, random: function () { return fuzzU; } }) : SM.create();
  }
  function hashId(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function forAlgo(r) {
    if (!r) return {};
    if (S.set.algo !== "fsrs" || r.s != null || r.st !== FS.REVIEW) return r;
    return Object.assign({}, r, { s: Math.max(r.ivl || 1, 1), d: 5 });
  }
  function seed(id, r) { fuzzU = (hashId(id + ":" + ((r && r.reps) || 0)) % 10000) / 10000; }
  function reviewCard(r, g, now, id) { seed(id, r); return sched.review(forAlgo(r), g, now, id); }
  function previewCard(r, now, id) { seed(id, r); return sched.preview(forAlgo(r), now, id); }

  /* deň sa láme o 4:00, aby učenie po polnoci patrilo k predošlému dňu */
  function dayKey(t) {
    var d = new Date((t || Date.now()) - 4 * HOUR);
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function dayRec(k) { return S.days[k] || (S.days[k] = { n: 0, r: 0, ok: 0 }); }
  function today() { return dayRec(dayKey()); }

  /* ── výber a poradie kariet ────────────────────────────────────────── */
  var onlyCh = -1;
  /* ── režim Učenie (scope "kostra"): kostra kapitoly v poradí výkladu, za každou jej časťou pojmy, ktoré tam
     zaznejú prvýkrát (pole t z tools/karty.js), potom zvyšné pojmy kapitoly, Súhrn a otázky. „Len kostra“ = bez pojmov.
     Poradie je pevné; kde čitateľ skončil, si pamätá S.set.lp[kľúč výberu]. Režim Skúšanie = opakovanie ako v Anki. */
  function learning() { return S.set.scope === "kostra"; }
  function chIncluded(ci) { return onlyCh >= 0 ? ci === onlyCh : S.set.off.indexOf(ci) < 0; }
  function seqFor() {
    var list = [], seen = {}, inc = [], plus = S.set.uc !== "len";
    var push = function (c, from) { if (!c || seen[c.i]) return; seen[c.i] = 1; list.push({ c: c, from: from || "" }); };
    D.ch.forEach(function (ch, ci) {
      if (!chIncluded(ci)) return;
      inc.push(ci);
      var ks = D.c.filter(function (c) { return c.c === ci && c.k === "s"; }), linked = {}, done = false;
      /* čip (tc) = pojem z inej kapitoly alebo nad strop časti: ťukne sa naň na karte časti, do radu nejde */
      ks.forEach(function (k) { (k.t || []).concat(k.tc || []).forEach(function (id) { linked[id] = 1; }); });
      var rest = plus ? D.c.filter(function (c) { return c.c === ci && c.j && !SKIPK[c.k] && !linked[c.i]; }) : [];
      var flush = function () { if (!done) { done = true; rest.forEach(function (c) { push(c); }); } };
      /* časť → jej pojmy → krátka skúška (interakcie) → otázky, ktoré na časť odkazujú */
      ks.forEach(function (k) {
        if (/-suhrn-/.test(k.i)) flush();
        push(k);
        if (plus) (k.t || []).forEach(function (id) { push(byId[id], k.i); });
        (k.ix || []).forEach(function (id) { push(byId[id], k.i); });
        (k.qz || []).forEach(function (id) { push(byId[id], k.i); });
      });
      flush();
      D.c.forEach(function (c) { if (c.c === ci && c.k === "q") push(c); });
    });
    return { list: list, key: inc.join(",") + ":" + (plus ? "p" : "l") };
  }
  var SEQ = [], SEQ_IN = {}, seqKey = "", seqNext = 0, lastSq = -1, lastFrom = "";
  function buildSeq() {
    var q = seqFor();
    SEQ = q.list; seqKey = q.key; SEQ_IN = {};
    SEQ.forEach(function (x) { SEQ_IN[x.c.i] = 1; });
    seqNext = Math.min((S.set.lp || {})[seqKey] || 0, SEQ.length);
  }
  function seqPos() {
    var it = F[idx] || {};
    if (it.end) return SEQ.length;
    return it.sq >= 0 ? it.sq + 1 : Math.min(SEQ.length, ((S.set.lp || {})[seqKey] || 0) + 1);
  }
  function inScope(c) {
    if (learning()) return !!SEQ_IN[c.i];
    if (onlyCh >= 0) { if (c.c !== onlyCh) return false; }
    else if (S.set.off.indexOf(c.c) >= 0) return false;
    return kindIn(c);
  }
  /* rozsah podľa druhu karty; „kostra“ = kostra kapitoly v poradí výkladu a potom jej otázky (karty s.k === "s" sú len tu) */
  function kindIn(c) {
    if (S.set.scope === "kostra") return c.k === "s" || c.k === "q" || c.k === "i" || (S.set.uc !== "len" && !!c.j);
    if (c.k === "s") return false;
    if (S.set.scope === "eponymy") return c.k === "e";
    if (S.set.scope === "obrazky") return c.it === "obr";
    if (S.set.scope === "vsetky") return true;
    return !!c.j;
  }
  function pools(now) {
    var learn = [], ahead = [], rev = [], fresh = [];
    D.c.forEach(function (c) {
      if (!inScope(c)) return;
      var r = S.cards[c.i];
      if (!r) { fresh.push(c); return; }
      if (r.x) return;
      if (r.st === FS.LEARNING || r.st === FS.RELEARNING) {
        if (r.due <= now) learn.push(c); else if (r.due <= now + LEARN_AHEAD) ahead.push(c);
      } else if (r.due <= now) rev.push(c);
    });
    var due = function (a, b) { return S.cards[a.i].due - S.cards[b.i].due; };
    learn.sort(due); ahead.sort(due);
    /* opakovania ako v Anki: najstaršie po termíne, v rámci dňa náhodne; nové postupne alebo náhodne */
    var dk = dayKey(now);
    rev.sort(function (a, b) {
      return SM.dayIndex(S.cards[a.i].due) - SM.dayIndex(S.cards[b.i].due) || hashId(a.i + dk) - hashId(b.i + dk);
    });
    if (S.set.order === "rand" && S.set.scope !== "kostra") {   // kostra ide vždy v poradí výkladu
      var sd = S.set.seed || (S.set.seed = String(now));
      fresh.sort(function (a, b) { return hashId(a.i + sd) - hashId(b.i + sd); });
    }
    return { learn: learn, ahead: ahead, rev: rev, fresh: fresh };
  }

  /* ── kanál: F = položky v poradí; v DOM je obsah len okolo aktuálnej ───── */
  var feed = $("ktFeed"), app = $("kt");
  var F = [], idx = 0, sinceNew = 0;

  /* ── Učenie: hodnotenie časti, opakovanie na konci časti, pomýlené páry (26. 11. 2026) ──────────────
     Autor: „čo s tým, keď používateľ označí obťažnosťou a potom sa to poprehadzuje“. Časť kostry sa číta a hodnotí sa celá:
       Nové / Ťažké → jej pojmy prídu otvorené (čítaš, nehádaš) a čo potom označíš Neviem/Ťažké, sa na konci časti zopakuje
       Jasné         → pojmy prídu zatvorené (vybav si), na konci časti sa zopakuje, čo nevieš
       Už viem       → pojmy časti sa preskočia (ostávajú v Skúšaní), krátka skúška časti ostáva ako dôkaz
     Opakovanie je na konci časti (nie o minútu ako v Anki): výklad sa netrhá a vracia sa to, čo práve nesedí.
     Pomýlený pár (zlá odpoveď pri obrázku) príde ako karta „rozlíš A × B“ – v Učení na konci časti, v Skúšaní každú ~7. kartu. */
  var lastRep = false, lastPair = "", sincePair = 0, pairSq = -1;
  function secRate(id) { return (S.set.sr || {})[id] || 0; }
  function blockStart() {
    for (var k = F.length - 1; k >= 0; k--) if (F[k].id && !F[k].rep && isRead(byId[F[k].id])) return k;
    return 0;
  }
  function repeatNext() {
    var start = blockStart(), done = {}, k, it, c;
    for (k = start; k < F.length; k++) if (F[k].rep) done[F[k].id] = 1;
    var prev = F.length ? F[F.length - 1].id : "";
    for (k = start; k < F.length; k++) {
      it = F[k]; c = it.id && byId[it.id];
      if (!c || it.rep || isRead(c) || c.k === "x" || !(it.g === 1 || it.g === 2)) continue;
      if (c.k === "i" && c.d && (c.d.a || c.d.g)) c = byId[c.d.a || c.d.g] || c;   // obrázok a mechanizmus z hesla → zopakuje sa pojem
      if (!c || done[c.i] || c.i === prev) continue;
      done[c.i] = 1;
      return c;
    }
    return null;
  }
  function pairNext() {
    var cf = S.set.cf || {}, keys = Object.keys(cf).filter(function (k) { return k !== lastPair; });
    for (var n = 0; n < keys.length; n++) {
      var ab = keys[n].split("|"), a = byId[ab[0]], b = byId[ab[1]];
      if (!a || !b) { delete cf[keys[n]]; continue; }
      var pid = "x:" + keys[n], shown = false;
      for (var k = Math.max(0, F.length - 40); k < F.length; k++) if (F[k].id === pid) shown = true;
      if (shown) continue;
      byId[pid] = byId[pid] || { i: pid, k: "x", f: "Rozlíš: " + plainText(a.f) + " × " + plainText(b.f), a: "", c: a.c, pa: a.i, pb: b.i, h: a.h };
      return byId[pid];
    }
    return null;
  }
  function pick() {
    var block = {}, skipped = {}, i, c;
    lastSq = -1; lastFrom = ""; lastRep = false;
    for (i = idx + 1; i < F.length; i++) if (F[i].id) block[F[i].id] = 1;
    for (i = Math.max(0, idx - RECENT + 1); i <= idx && i < F.length; i++) if (F[i].id) block[F[i].id] = 1;
    if (learning()) {
      while (seqNext <= SEQ.length) {
        var x = SEQ[seqNext];
        /* hranica časti (alebo koniec): najprv opakovanie toho, čo v nej nesedelo, potom pomýlený pár */
        if (!x || isRead(x.c)) {
          c = repeatNext();
          if (c) { lastRep = true; lastFrom = F[blockStart()] ? F[blockStart()].id : ""; return c; }
          c = pairSq !== seqNext ? pairNext() : null;
          if (c) { lastPair = c.i.slice(2); pairSq = seqNext; return c; }
          if (!x) return null;
        }
        seqNext++;
        if (block[x.c.i]) continue;
        if (x.from && secRate(x.from) === 4 && !SKIPK[x.c.k]) continue;   // „Už viem“ na časti: jej pojmy sa preskočia
        lastSq = seqNext - 1; lastFrom = x.from;
        return x.c;
      }
      return null;
    }
    var now = Date.now(), p = pools(now);
    for (i = 0; i < F.length; i++) if (F[i].id && !F[i].g) skipped[F[i].id] = 1;
    var free = function (c) { return !block[c.i] && !skipped[c.i]; };
    var first = function (l) { return l.filter(free)[0]; };
    c = first(p.learn);
    if (c) return c;
    if (sincePair >= 6) { c = pairNext(); if (c) { sincePair = 0; lastPair = c.i.slice(2); return c; } }
    var r = first(p.rev), n = first(p.fresh);
    /* nové rovnomerne medzi opakovaniami, ako „Mix with reviews“ v Anki */
    if (r && n) return sinceNew >= Math.max(1, Math.round(p.rev.length / Math.max(1, p.fresh.length))) ? n : r;
    if (r || n) return r || n;
    c = first(p.ahead);
    if (c) return c;
    /* nakoniec to, čo čitateľ prerolloval bez hodnotenia */
    var again = p.learn.concat(p.rev, p.ahead, p.fresh).filter(function (x) { return !block[x.i]; });
    return again[0] || null;
  }
  function addPage() {
    var pg = document.createElement("section");
    pg.className = "kt-page";
    pg.dataset.i = feed.children.length;
    feed.appendChild(pg);
  }
  function extend() {
    if (F.length && F[F.length - 1].end) return;
    while (F.length < idx + AHEAD + 1) {
      var c = pick();
      if (!c) { F.push({ end: true }); addPage(); break; }
      if (S.cards[c.i]) sinceNew++; else sinceNew = 0;
      sincePair++;
      /* časť označená Nové/Ťažké: jej pojmy prídu otvorené – najprv sa číta, vybavuje sa až pri opakovaní na konci časti */
      var open = !lastRep && !!lastFrom && !SKIPK[c.k] && (secRate(lastFrom) === 1 || secRate(lastFrom) === 2);
      F.push({ id: c.i, g: 0, open: open, sq: lastSq, from: lastFrom, rep: lastRep });
      addPage();
    }
  }
  /* nové vyskladanie kanála od pozície from; v Učení sa poradie výkladu vráti na prvú vyhodenú kartu */
  function rebuild(from) {
    var back = -1;
    for (var k = from; k < F.length; k++) if (F[k].sq >= 0 && (back < 0 || F[k].sq < back)) back = F[k].sq;
    if (learning() && back >= 0) { seqNext = Math.min(seqNext, back); if (pairSq >= back) pairSq = -1; }
    while (F.length > from) { F.pop(); feed.lastChild.remove(); }
    extend();
    paint();
    counts();
  }
  function paint() {
    for (var i = 0; i < F.length; i++) {
      var pg = feed.children[i], near = Math.abs(i - idx) <= WINDOW;
      if (near && !pg.firstChild) render(i);
      else if (!near && pg.firstChild) pg.textContent = "";
      pg.classList.toggle("live", i === idx);   // pozadie sa hýbe len na viditeľnej karte
    }
  }
  function H() { return feed.clientHeight || 1; }
  function goTo(i, instant) {
    i = Math.max(0, Math.min(F.length - 1, i));
    feed.scrollTo({ top: i * H(), behavior: instant ? "auto" : "smooth" });
  }
  var raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var i = Math.max(0, Math.min(F.length - 1, Math.round(feed.scrollTop / H())));
      if (i === idx) return;
      if (PEND && PEND.i !== i) pendDrop();
      idx = i;
      var pc = F[idx] && F[idx].id && byId[F[idx].id];
      if (pc && pc.k === "x" && S.set.cf) { delete S.set.cf[pc.i.slice(2)]; save(); }   // pár sa ukázal – zo zoznamu pomýlených zmizne
      extend();
      paint();
      if (learning() && F[idx] && (F[idx].end || F[idx].sq >= 0)) { S.set.lp = S.set.lp || {}; S.set.lp[seqKey] = F[idx].end ? SEQ.length : F[idx].sq; save(); }
      counts();
    });
  }
  feed.addEventListener("scroll", onScroll, { passive: true });

  /* ── vykreslenie karty ─────────────────────────────────────────────── */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function chOf(c) { return c.c >= 0 ? D.ch[c.c] : null; }
  function recFor(it) { return it.g ? (it.prev || {}) : (S.cards[it.id] || {}); }

  function render(i) {
    var it = F[i], pg = feed.children[i];
    if (it.end) { pg.innerHTML = endHtml(); hookEnd(pg); return; }
    var c = byId[it.id], a = ART.art(c), ch = chOf(c), rd = isRead(c), ix = c.k === "i", px = c.k === "x";
    if (rd || ix || px) it.open = true;   // časť sa číta, interakcia a pár sa neodkrývajú
    var sec = c.s ? (/^\d+(\.\d+)*$/.test(c.s) ? "Sekcia " + c.s : c.s) : (ch ? ch.t : "");
    var home = c.k !== "s" && byId[it.from || c.ks];   // pojem ukáže časť kostry, ku ktorej patrí
    if (home && home.k === "s") sec = "↳ " + plainText(home.f);
    var chip = c.z ? "kazuistika" : ix ? IT[c.it] : px ? "rozlíš" : rd ? "časť kapitoly" : KIND[c.k];
    var h = '<article class="kt-slide ' + c.k + (rd ? " rd" : "") + (ix ? " ix ix-" + c.it : "") + (it.open ? " open" : "") + '" style="--ac:' + a.accent + '">' +
      '<div class="kt-bg" style="background:' + a.base + '"><div class="kt-bgz" style="' + a.openStyle + '">' + a.grad + a.html + "</div></div>" +
      '<div class="kt-body">' +
      (a.hero && !rd && !ix && !px ? '<span class="kt-hero" style="' + a.heroStyle + '" aria-hidden="true">' + a.hero + "</span>" : "") +
      (rd ? mapHtml(c) : "") +
      '<span class="kt-chip ' + (c.z ? "z" : ix ? "i" : c.k) + '">' + chip + "</span>";
    if (rd) h += '<h1 class="kt-f">' + (c.tt || c.f) + "</h1>" + readHtml(c);
    else if (ix) h += (IXQ[c.it] ? '<p class="kt-ixq">' + IXQ[c.it](c) + "</p>" : "") + '<h1 class="kt-f">' + c.f + '</h1><div class="kt-ix" data-it="' + c.it + '">' + ixInner(c, it) + "</div>";
    else if (px) h += '<h1 class="kt-f">' + esc(c.f.replace(/^Rozlíš:\s*/, "")) + "</h1>" + pairHtml(c);
    else {
      h += '<h1 class="kt-f">' + c.f + "</h1>" +
        '<p class="kt-hint">Spomeň si a ťukni</p><div class="kt-a"><i class="kt-line" aria-hidden="true"></i>';
      if (c.y) h += '<p class="kt-y">' + esc(c.y) + "</p>";
      /* veta z kapitoly: pojem tak, ako ho používa téma (nie len definícia z glosára) */
      if (c.x) h += '<p class="kt-x">' + c.x.t + ' <span class="kt-xs">' + esc(c.x.s) + "</span></p>";
      h += '<p class="kt-d">' + c.a + "</p>";
      if (c.r && c.r.length) h += '<ul class="kt-r">' + c.r.map(function (x) { return "<li" + (x.k ? ' class="' + x.k + '"' : "") + ">" + x.t + "</li>"; }).join("") + "</ul>";
      if (c.p) h += figHtml(c.p, it.open);
      if (c.m || c.p || c.e) h += '<button type="button" class="kt-viac" data-viac>viac</button>';
      h += "</div>";
    }
    h += "</div>" + (px ? "" : '<aside class="kt-rail" aria-label="' + (rd ? "Ako ti ide táto časť" : "Hodnotenie karty") + '">' + [1, 2, 3, 4].map(function (g) {
      return '<button type="button" class="kt-rate r' + g + '" data-g="' + g + '" aria-pressed="false"><span class="i"><svg viewBox="0 0 24 24">' + ICON[g] + "</svg></span><b>" + (rd ? SNAME : NAME)[g] + "</b><small></small></button>";
    }).join("") + '<button type="button" class="kt-more" data-menu aria-label="Ďalšie možnosti"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></button></aside>') +
      '<div class="kt-meta"><div class="kt-who"><span class="kt-av">' + esc(ch ? ch.n : "•") + "</span><b>" + esc(ch ? ch.t : D.book.brand) + "</b>" +
      (c.h ? '<a class="kt-open" href="' + esc(c.h) + '">Otvoriť</a>' : "") + '</div><div class="kt-sec">' + esc(it.rep ? "↻ opakovanie na konci časti" : sec) + "</div></div></article>";
    pg.innerHTML = h;
    sizeTitle(pg);
    syncRail(i);
    if (it.open) { var im = pg.querySelector(".kt-fig img,.kt-px img"); if (im) im.onload = function () { fit(pg); }; fit(pg); }
  }
  function figHtml(p, open) {
    return '<figure class="kt-fig"><img draggable="false"' + (/\.svg$/i.test(p.s) ? ' class="sv"' : "") + (open ? ' src="' : ' data-src="') + esc(p.s) + '" alt="' + esc(p.a) + '">' +
      "<figcaption>" + (p.h ? '<a href="' + esc(p.h) + '" target="_blank" rel="noopener">' + esc(p.cr || "zdroj") + "</a>" : esc(p.cr)) + "</figcaption></figure>";
  }
  /* mapa kapitoly nad kartou časti: hlavné časti (##) ako dieliky, aktuálna zvýraznená, prejdené plné */
  var MAPS = {};
  function mapHtml(c) {
    var tops = MAPS[c.c] || (MAPS[c.c] = D.c.filter(function (x) { return x.c === c.c && isRead(x) && x.lv === 2; }));
    var top = c.lv === 2 ? c.s : String(c.s || "").split(".").slice(0, 2).join(".");
    var seen = true;
    return '<div class="kt-map" aria-label="Mapa kapitoly">' + tops.map(function (x) {
      var on = x.s === top;
      if (on) seen = false;
      return '<i class="' + (on ? "on" : seen ? "past" : "") + '" title="' + esc(plainText(x.tt || x.f)) + '">' + esc(x.s) + "</i>";
    }).join("") + "</div>" + (c.lv > 2 ? '<p class="kt-crumb">' + esc(top + " " + plainText((byId["s-" + c.i.slice(2, 4) + "-sec-" + top.replace(/\./g, "-")] || {}).tt || "")) + " › " + esc(c.s) + "</p>" : "");
  }
  function readHtml(c) {
    var h = '<div class="kt-a kt-rd"><p class="kt-d">' + c.a + "</p>";
    if (c.r && c.r.length) h += '<ul class="kt-r">' + c.r.filter(function (x) { return x.k !== "pojmy"; }).map(function (x) { return "<li" + (x.k ? ' class="' + x.k + '"' : "") + ">" + x.t + "</li>"; }).join("") + "</ul>";
    /* čipy pojmov: najviac TC_MAX, zvyšok v zozname (13.5.1 má 18 pojmov – na malom telefóne by pretiekli pod lištu) */
    var tc = (c.t || []).concat(c.tc || []).filter(function (id) { return byId[id]; });
    var chipB = function (id) { return '<button type="button" data-tc="' + esc(id) + '"' + ((c.t || []).indexOf(id) < 0 ? ' class="o"' : "") + ">" + esc(plainText(byId[id].f)) + "</button>"; };
    if (tc.length) h += '<div class="kt-tc"><span>Pojmy tu</span>' + tc.slice(0, tc.length > TC_MAX ? TC_MAX - 1 : TC_MAX).map(chipB).join("") +
      (tc.length > TC_MAX ? '<button type="button" class="all" data-tcall="' + esc(c.i) + '">všetky (' + tc.length + ")</button>" : "") + "</div>";
    if (c.p) h += figHtml(c.p, true);
    return h + '<p class="kt-sh">Ako ti ide táto časť? Vpravo: <b>Nové/Ťažké</b> – pojmy prídu otvorené a zopakujú sa, <b>Už viem</b> – preskočia sa.</p></div>';
  }
  /* pomýlený pár: dve karty vedľa seba, každá s definíciou a obrázkom */
  function pairHtml(c) {
    return '<div class="kt-px">' + [c.pa, c.pb].map(function (id) {
      var x = byId[id];
      return "<div><b>" + esc(plainText(x.f)) + "</b>" + (x.p && !/\.svg$/i.test(x.p.s) ? '<img src="' + esc(x.p.s) + '" alt="' + esc(x.p.a) + '">' : "") + "<p>" + x.a + '</p><button type="button" class="kt-lnk" data-card="' + esc(id) + '">celá karta</button></div>';
    }).join("") + '</div><p class="kt-sh">Pri obrázku si si ich zamenil. Čím sa líšia?</p>';
  }

  /* ── interaktívne karty: zoraď, priraď, rozlíš, doplň, odhadni, obrázok ─────────────────────────
     Text je celý z kapitoly a glosára (tools/karty.js). Výsledok sa ohodnotí sám (bez chyby Viem, s chybou Ťažké, zle Neviem);
     čitateľ ho môže zmeniť vpravo. Stav interakcie je v položke kanála (it.st), aby prežil prekreslenie okolo aktuálnej karty. */
  var IXQ = {
    zor: function () { return "Zoraď kroky – ťukaj od prvého"; },
    pri: function (c) { return "Priraď: " + esc(c.d.a) + " → " + esc(c.d.b); },
    roz: function (c) { return "Rozlíš: " + c.d.e.map(esc).join(" × "); },
    dop: function () { return "Doplň hlavnú myšlienku – ťukni na prázdne miesto"; },
    num: function () { return "Odhadni číslo"; },
    obr: function () { return ""; }
  };
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function ixInner(c, it) {
    var d = c.d, st = it.st, h = "";
    if (c.it === "zor") {
      st = it.st || (it.st = { o: shuffle(range(d.st.length)), n: 0, err: 0 });
      if (st.o.every(function (k, j) { return k === j; }) && d.st.length > 1) st.o.push(st.o.shift());   // nikdy nie v správnom poradí hneď
      h = '<ol class="kt-zo">' + d.st.slice(0, st.n).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>";
      if (st.n < d.st.length) h += '<div class="kt-ops">' + st.o.filter(function (k) { return k >= st.n; }).map(function (k) { return '<button type="button" class="kt-op" data-zo="' + k + '">' + d.st[k] + "</button>"; }).join("") + "</div>";
      else h += fb(st.err ? "Poradie sedí – " + st.err + "× si sa pomýlil" : "Správne poradie", !st.err);
    } else if (c.it === "pri") {
      if (!st) {
        /* toľko párov, koľko sa zmestí: odhad výšky z počtu riadkov bunky v úzkom stĺpci (≈ 7 px na znak) a voľná výška kanála;
           najmenej 3, najviac 5 (360 × 640: dlhé bunky 13.5.1 → 3 páry) */
        var bw = Math.max(200, feed.clientWidth - 110), lc = bw / 2.25 / 7.2, rcl = bw * 1.25 / 2.25 / 7.2;
        var budget = Math.max(150, feed.clientHeight - 330), used = 0;
        var wc = function (n) { return Math.max(Math.ceil(plainText(d.p[n][0]).length / lc), Math.ceil(plainText(d.p[n][1]).length / rcl)) * 18 + 22; };
        var pick = shuffle(range(d.p.length)).filter(function (n) { if (used + wc(n) <= budget) { used += wc(n); return true; } return false; }).slice(0, 5);
        range(d.p.length).sort(function (a, b) { return wc(a) - wc(b); }).forEach(function (n) { if (pick.length < 3 && pick.indexOf(n) < 0) pick.push(n); });
        pick = shuffle(pick);
        st = it.st = { L: pick, R: shuffle(pick), sel: "", ok: {}, err: 0, bad: "" };
      }
      var cell = function (side, n) {
        var cls = "kt-op" + (st.ok[n] ? " ok" : "") + (st.sel === side + n ? " sel" : "") + (st.bad === side + n ? " bad" : "");
        return '<button type="button" class="' + cls + '" data-p' + side + '="' + n + '"' + (st.ok[n] ? " disabled" : "") + ">" + d.p[n][side === "l" ? 0 : 1] + "</button>";
      };
      h = '<div class="kt-pri"><div>' + st.L.map(function (n) { return cell("l", n); }).join("") + "</div><div>" + st.R.map(function (n) { return cell("r", n); }).join("") + "</div></div>";
      if (Object.keys(st.ok).length === st.L.length) h += fb(st.err ? "Všetko priradené – " + st.err + "× vedľa" : "Všetko správne", !st.err);
    } else if (c.it === "roz") {
      if (!st) {
        var byE = d.e.map(function (_, ei) { return shuffle(d.q.map(function (q, n) { return q[2] === ei ? n : -1; }).filter(function (n) { return n >= 0; })); });
        var Q = [];
        for (var r = 0; Q.length < 6 && byE.some(function (l) { return l.length > r; }); r++) byE.forEach(function (l) { if (l[r] != null && Q.length < 6) Q.push(l[r]); });
        st = it.st = { Q: shuffle(Q), n: 0, got: 0, last: null };
      }
      if (st.n < st.Q.length) {
        var q = d.q[st.Q[st.n]];
        h = '<p class="kt-rp">' + (st.n + 1) + " / " + st.Q.length + '</p><div class="kt-rq"><small>' + q[0] + "</small><p>" + q[1] + '</p></div><div class="kt-ops kt-re">' +
          d.e.map(function (e, ei) {
            var cls = "kt-op" + (st.last && st.last.e === ei ? (st.last.ok ? " ok" : " bad") : "") + (st.last && !st.last.ok && q[2] === ei ? " ok" : "");
            return '<button type="button" class="' + cls + '" data-re="' + ei + '"' + (st.last ? " disabled" : "") + ">" + esc(e) + "</button>";
          }).join("") + "</div>";
      } else h = fb("Správne " + st.got + " z " + st.Q.length, st.got === st.Q.length);
    } else if (c.it === "dop") {
      st = it.st || (it.st = { r: 0 });
      h = '<p class="kt-dop">' + d.t.replace(/<b class="bl" data-b="(\d+)">/g, function (m, n) { return '<b class="bl' + (+n < st.r ? " on" : "") + '" data-b="' + n + '">'; }) + "</p>";
      h += st.r < d.n ? '<p class="kt-sh">Ťukni – odkryje sa ďalšie (' + (d.n - st.r) + ")</p>" : fb("Odkryté. Vedel si to? Ohodnoť sa vpravo.", true, true);
    } else if (c.it === "num") {
      var R = numRange(d);
      st = it.st || (it.st = { v: R.start, res: null });
      h = '<p class="kt-num">' + d.pre + (st.res ? '<mark>' + d.v + "</mark>" : '<b class="kt-nb">' + fmt(st.v, R) + " " + esc(d.u) + "</b>") + d.post + "</p>";
      if (!st.res) h += '<div class="kt-sl"><input type="range" min="' + R.min + '" max="' + R.max + '" step="' + R.step + '" value="' + st.v + '" aria-label="Odhad"><button type="button" class="kt-btn pri" data-num>Over</button></div>';
      else h += fb(st.res === "ok" ? "Správne – " + d.v : st.res === "near" ? "Blízko – správne je " + d.v + " (tvoj odhad " + fmt(st.v, R) + " " + esc(d.u) + ")" : "Vedľa – správne je " + d.v + " (tvoj odhad " + fmt(st.v, R) + " " + esc(d.u) + ")", st.res === "ok");
    } else if (c.it === "obr") {
      st = it.st || (it.st = { p: "" });
      h = '<figure class="kt-fig kt-ofig"><img draggable="false" src="' + esc(c.p.s) + '" alt="Obrázok na určenie"><figcaption>' + esc(c.p.cr || "") + "</figcaption></figure>" +
        '<div class="kt-ops kt-ob">' + d.o.map(function (id) {
          var x = byId[id], cls = "kt-op" + (st.p ? (id === d.a ? " ok" : id === st.p ? " bad" : " dim") : "");
          return '<button type="button" class="' + cls + '" data-ob="' + esc(id) + '"' + (st.p ? " disabled" : "") + ">" + esc(plainText(x ? x.f : id)) + "</button>";
        }).join("") + "</div>";
      if (st.p) h += fb((st.p === d.a ? "Správne. " : "Vedľa. ") + '<button type="button" class="kt-lnk" data-card="' + esc(d.a) + '">karta</button>' +
        (c.p.h ? ' · <a href="' + esc(c.p.h) + '" target="_blank" rel="noopener">zdroj obrázka</a>' : ""), st.p === d.a, true);
    }
    return h;
  }
  function fb(t, ok, raw) { return '<p class="kt-fb' + (ok ? " ok" : "") + '">' + (raw ? t : t) + "</p>"; }
  function decs(x) { var s = String(x); return s.indexOf(".") >= 0 ? s.length - s.indexOf(".") - 1 : 0; }
  function niceUp(x) { var p = Math.pow(10, Math.floor(Math.log10(Math.max(x, 1e-9)))), m = x / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
  function numRange(d) {
    var max = d.u === "%" ? 100 : niceUp(Math.max(d.hi * 2.5, d.hi + (d.hi < 10 ? 5 : 10)));
    var dc = Math.max(decs(d.lo), decs(d.hi)), step = dc ? Math.pow(10, -dc) : max <= 200 ? 1 : max <= 1000 ? 5 : 10;
    var start = Math.round((max / 2) / step) * step;
    if (start >= d.lo && start <= d.hi) start = Math.min(max, start + Math.max(step, max / 5));   // štart nikdy na správnej odpovedi
    return { min: 0, max: max, step: step, start: +start.toFixed(dc) };
  }
  function fmt(v, R) { return String(+(+v).toFixed(decs(R.step))).replace(".", ","); }
  function numCheck(d, v) {
    var R = numRange(d), tol = Math.max(R.step, d.u === "%" ? 3 : 0.12 * d.hi);
    if (v >= d.lo - tol && v <= d.hi + tol) return "ok";
    return v >= d.lo - 3 * tol && v <= d.hi + 3 * tol ? "near" : "no";
  }
  function ixUpdate(i) {
    var pg = feed.children[i], box = pg && pg.querySelector(".kt-ix");
    if (box) box.innerHTML = ixInner(byId[F[i].id], F[i]);
    fit(pg);
  }
  function ixDone(i, g) {
    var it = F[i];
    if (!it.g) mark(i, g, true, true);
    else syncRail(i);
  }
  /* ťuknutie do interakcie; vráti true, keď ho spracovala */
  function ixClick(i, e) {
    var it = F[i], c = byId[it.id], d = c.d, st = it.st, b = e.target.closest("button");
    if (c.it === "dop") {
      if (st.r < d.n) { st.r++; ixUpdate(i); }
      return true;
    }
    if (!b) return true;
    if (c.it === "zor" && b.dataset.zo != null) {
      if (+b.dataset.zo === st.n) { st.n++; ixUpdate(i); if (st.n === d.st.length) ixDone(i, st.err ? (st.err <= 2 ? 2 : 1) : 3); }
      else { st.err++; nudge(b); }
    } else if (c.it === "pri" && (b.dataset.pl != null || b.dataset.pr != null)) {
      var side = b.dataset.pl != null ? "l" : "r", n = +(side === "l" ? b.dataset.pl : b.dataset.pr);
      if (!st.sel || st.sel[0] === side) { st.sel = side + n; st.bad = ""; ixUpdate(i); return true; }
      var other = +st.sel.slice(1);
      if (other === n) { st.ok[n] = 1; st.sel = ""; st.bad = ""; }
      else { st.err++; st.bad = side + n; st.sel = ""; setTimeout(function () { if (st.bad === side + n) { st.bad = ""; ixUpdate(i); } }, 520); }
      ixUpdate(i);
      if (Object.keys(st.ok).length === st.L.length) ixDone(i, st.err ? (st.err <= 2 ? 2 : 1) : 3);
    } else if (c.it === "roz" && b.dataset.re != null && !st.last) {
      var q = d.q[st.Q[st.n]], ok = +b.dataset.re === q[2];
      if (ok) st.got++;
      st.last = { e: +b.dataset.re, ok: ok };
      ixUpdate(i);
      setTimeout(function () {
        st.last = null; st.n++;
        ixUpdate(i);
        if (st.n === st.Q.length) ixDone(i, st.got === st.Q.length ? 3 : st.got >= st.Q.length * 2 / 3 ? 2 : 1);
      }, ok ? 520 : 1300);
    } else if (c.it === "num" && b.hasAttribute("data-num")) {
      st.res = numCheck(d, +st.v);
      ixUpdate(i);
      ixDone(i, st.res === "ok" ? 3 : st.res === "near" ? 2 : 1);
    } else if (c.it === "obr" && b.dataset.ob && !st.p) {
      st.p = b.dataset.ob;
      if (st.p !== d.a) { S.set.cf = S.set.cf || {}; S.set.cf[[d.a, st.p].sort().join("|")] = 1; save(); }   // pomýlený pár sa vráti ako „rozlíš A × B“
      ixUpdate(i);
      ixDone(i, st.p === d.a ? 3 : 1);
    }
    return true;
  }
  function nudge(b) { b.classList.remove("bad"); void b.offsetWidth; b.classList.add("bad"); }
  feed.addEventListener("input", function (e) {
    var r = e.target.closest(".kt-sl input");
    if (!r) return;
    var pg = r.closest(".kt-page"), i = +pg.dataset.i, it = F[i], c = byId[it.id];
    it.st.v = +r.value;
    var nb = pg.querySelector(".kt-nb");
    if (nb) nb.textContent = fmt(r.value, numRange(c.d)) + " " + c.d.u;
  });
  function syncRail(i) {
    var it = F[i], pg = feed.children[i];
    if (!it || it.end || !pg.firstChild) return;
    var c = byId[it.id], slide = pg.firstChild;
    if (isRead(c)) {   // časť: hodnotenie časti, nie plánovač
      var sg = secRate(c.i);
      slide.dataset.g = sg || "";
      pg.querySelectorAll(".kt-rate").forEach(function (b) {
        var on = sg === +b.dataset.g;
        b.classList.toggle("sel", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.querySelector("small").textContent = "";
      });
      return;
    }
    var now = it.at || Date.now(), pv = previewCard(recFor(it), now, it.id);
    slide.dataset.g = it.g || "";
    pg.querySelectorAll(".kt-rate").forEach(function (b) {
      var g = +b.dataset.g, on = it.g === g;
      b.classList.toggle("sel", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.querySelector("small").textContent = FS.label(pv[g].due - now);
      if (g === 4) b.querySelector("b").textContent = it.open ? "Ľahké" : "Už viem";
    });
  }
  /* nadpis má rovnakú veľkosť pri otázke aj odpovedi: určí sa vopred tak, aby sa zmestila aj odpoveď */
  function sizeTitle(pg) {
    var sl = pg.firstChild, el = sl.querySelector(".kt-body"), f = sl.querySelector(".kt-f"), was = sl.classList.contains("open");
    var base = parseFloat(getComputedStyle(f).fontSize), sizes = [1, .92, .84, .76, .68];
    sl.classList.add("open");
    el.style.setProperty("--as", "15.5px"); el.style.setProperty("--rs", "13.5px"); el.style.setProperty("--imh", "14dvh");
    for (var k = 0; k < sizes.length; k++) {
      if (k) f.style.setProperty("--fs", Math.round(base * sizes[k]) + "px");
      if (el.scrollHeight <= el.clientHeight + 1) break;
    }
    ["--as", "--rs", "--imh"].forEach(function (v) { el.style.removeProperty(v); });
    if (!was) sl.classList.remove("open");
  }
  /* odpoveď sa musí zmestiť bez rolovania: menší obrázok, menšie písmo, až potom skryje odrážky (ostávajú pod „viac“) */
  function fit(pg) {
    var el = pg.querySelector(".kt-body");
    if (!el) return;
    var wait = (pg._until || 0) - Date.now();
    if (wait > 0) { clearTimeout(pg._fitT); pg._fitT = setTimeout(function () { fit(pg); }, wait + 10); return; }   // počas prechodu by posuny skreslili meranie
    var over = function () { return el.scrollHeight > el.clientHeight + 1; };
    var f = el.querySelector(".kt-fig"), li = el.querySelectorAll(".kt-r li"), m;
    ["--as", "--rs", "--imh"].forEach(function (v) { el.style.removeProperty(v); });
    if (f) f.style.display = "";
    for (m = 0; m < li.length; m++) li[m].style.display = "";
    var heights = ["20dvh", "14dvh"];
    for (m = 0; f && m < heights.length && over(); m++) el.style.setProperty("--imh", heights[m]);
    var steps = [["17px", "14.5px"], ["15.5px", "13.5px"]];
    for (var i = 0; i < steps.length && over(); i++) { el.style.setProperty("--as", steps[i][0]); el.style.setProperty("--rs", steps[i][1]); }
    if (over() && f && !f.classList.contains("kt-ofig")) f.style.display = "none";   // obrázok na určenie sa nikdy neskryje
    for (var k = li.length - 1; k >= 0 && over(); k--) if (!li[k].classList.contains("chain")) li[k].style.display = "none";   // mechanizmus sa na karte nikdy neskryje
    var x = el.querySelector(".kt-x");
    if (x) x.style.display = "";
    if (over() && x) x.style.display = "none";   // veta z kapitoly ustúpi definícii (je pod „viac“)
    if (over()) el.style.setProperty("--as", "13.5px");   // dlhá veta na malom displeji: celá, len menšia
  }
  function reveal(i) {
    var it = F[i], pg = feed.children[i];
    if (!it || it.end || it.open) return;
    var slide = pg.firstChild, title = slide.querySelector(".kt-f"), chip = slide.querySelector(".kt-chip");
    var box = slide.getBoundingClientRect(), t0 = title.getBoundingClientRect(), c0 = chip.getBoundingClientRect();
    var fs0 = parseFloat(getComputedStyle(title).fontSize);
    var pre = slide.classList.contains("pre");   // nádych z prvého ťuknutia: nápoveda už zmizla, pozadie je stmavené
    if (!REDUCED && !pre) { ghost(slide.querySelector(".kt-hero"), slide, box); ghost(slide.querySelector(".kt-hint"), slide, box); }
    it.open = true;
    slide.classList.add("open");
    slide.classList.remove("pre");
    var im = pg.querySelector("img[data-src]");
    if (im) { im.onload = function () { fit(pg); }; im.src = im.getAttribute("data-src"); im.removeAttribute("data-src"); }
    fit(pg);
    syncRail(i);
    if (!REDUCED) flyIn(pg, slide, title, chip, t0, c0, fs0, ART.art(byId[it.id]).enter);
  }
  /* skrytie odpovede: hodnotenie ostáva, nadpis sa plynulo vráti na miesto otázky */
  var hideT = 0;
  function cancelHide() { clearTimeout(hideT); hideT = 0; }
  function conceal(i) {
    var it = F[i], pg = feed.children[i];
    if (!it || it.end || !it.open) return;
    it.open = false;
    var slide = pg.firstChild;
    if (!slide) return;
    var title = slide.querySelector(".kt-f"), chip = slide.querySelector(".kt-chip");
    var t0 = title.getBoundingClientRect(), c0 = chip.getBoundingClientRect();
    slide.classList.remove("open");
    syncRail(i);
    if (REDUCED) return;
    var t1 = title.getBoundingClientRect(), c1 = chip.getBoundingClientRect();
    title.animate([{ transform: "translate(" + (t0.left - t1.left) + "px," + (t0.top - t1.top) + "px)" }, { transform: "none" }], { duration: 220, easing: EASE });
    chip.animate([{ transform: "translate(" + (c0.left - c1.left) + "px," + (c0.top - c1.top) + "px)" }, { transform: "none" }], { duration: 220, easing: EASE });
    var hint = slide.querySelector(".kt-hint");
    if (hint) hint.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 60, easing: "ease-out", fill: "backwards" });
  }

  /* prechod otázka → odpoveď, spolu najviac 0,3 s: otázka vyletí hore, odpoveď priletí alebo sa napíše */
  var REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var EASE = "cubic-bezier(.2,.85,.25,1)", SPAN = 300;
  function ghost(el, slide, box) {
    if (!el) return;
    var r = el.getBoundingClientRect(), c = el.cloneNode(true);
    c.style.cssText += ";display:block;position:absolute;margin:0;animation:none;pointer-events:none;z-index:2;left:" + (r.left - box.left) + "px;top:" + (r.top - box.top) + "px;width:" + r.width + "px";
    slide.appendChild(c);
    c.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-26px) scale(.92)" }], { duration: 170, easing: "ease-out", fill: "forwards" }).onfinish = function () { c.remove(); };
  }
  function wrapWords(el) {
    var out = [], nodes = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), t;
    while ((t = tw.nextNode())) nodes.push(t);
    nodes.forEach(function (x) {
      var f = document.createDocumentFragment();
      x.nodeValue.split(/(\s+)/).forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(p)); return; }
        var s = document.createElement("span");
        s.textContent = p;
        f.appendChild(s);
        out.push(s);
      });
      x.parentNode.replaceChild(f, x);
    });
    return out;
  }
  function flyIn(pg, slide, title, chip, t0, c0, fs0, mode) {
    var body = slide.querySelector(".kt-body"), t1 = title.getBoundingClientRect(), c1 = chip.getBoundingClientRect();
    var sc = fs0 / parseFloat(getComputedStyle(title).fontSize);
    pg._until = Date.now() + SPAN + 20;
    body.style.overflow = "visible";
    title.style.transformOrigin = "0 0";
    title.animate([{ transform: "translate(" + (t0.left - t1.left) + "px," + (t0.top - t1.top) + "px) scale(" + sc + ")" }, { transform: "none" }], { duration: 280, easing: EASE });
    chip.animate([{ transform: "translate(" + (c0.left - c1.left) + "px," + (c0.top - c1.top) + "px)" }, { transform: "none" }], { duration: 260, easing: EASE });
    var words = null, host = null, line = slide.querySelector(".kt-line");
    if (line) line.animate([{ opacity: 0, transform: "scaleX(0)" }, { opacity: 1, transform: "scaleX(1)" }], { duration: 230, delay: 30, easing: EASE, fill: "backwards" });
    [].slice.call(slide.querySelectorAll(".kt-y,.kt-x,.kt-d,.kt-r li,.kt-fig,.kt-viac")).filter(function (x) { return x.offsetParent !== null; }).forEach(function (el, k) {
      var delay = Math.min(50 + k * 26, 120), dur = SPAN - delay - 10;
      if (mode === "pis" && el.classList.contains("kt-d")) {
        host = el; words = wrapWords(el);
        words.forEach(function (s, j) {
          s.animate([{ opacity: 0, filter: "blur(3px)" }, { opacity: 1, filter: "blur(0)" }], { duration: 90, delay: 40 + Math.round(165 * j / Math.max(1, words.length)), easing: "ease-out", fill: "backwards" });
        });
        return;
      }
      var from = mode === "bok" ? "translateX(34px)" : mode === "vlna" ? "translateX(" + (k % 2 ? -28 : 28) + "px)" : mode === "zoom" ? "scale(.9)" : mode === "hore" ? "translateY(20px)" : "translateY(8px)";
      el.animate([{ opacity: 0, transform: from, filter: "blur(5px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: dur, delay: delay, easing: EASE, fill: "backwards" });
    });
    setTimeout(function () {
      body.style.overflow = "";
      if (words) {
        words.forEach(function (s) { if (s.parentNode) s.parentNode.replaceChild(document.createTextNode(s.textContent), s); });
        host.normalize();
      }
    }, SPAN + 20);
  }
  function counts() {
    if (learning()) {
      var pos = seqPos(), len = SEQ.length;
      $("ktCount").textContent = len ? pos + " / " + len : "prázdne";
      $("ktProg").style.width = (len ? Math.round(100 * pos / len) : 100) + "%";
      syncMode();
      return;
    }
    syncMode();
    var p = pools(Date.now()), t = today(), done = t.n + t.r, nw = p.fresh.length, ln = p.learn.length + p.ahead.length;
    var n = nw + ln + p.rev.length;
    $("ktCount").innerHTML = n ? '<span class="c-n" title="nové">' + nw + '</span> · <span class="c-l" title="učia sa">' + ln + '</span> · <span class="c-r" title="opakovania">' + p.rev.length + "</span>" : "hotovo";
    $("ktProg").style.width = (done + n ? Math.round(100 * done / (done + n)) : 100) + "%";
  }
  function endHtml() {
    if (learning()) return '<article class="kt-slide kt-end"><div class="kt-bg" style="background:radial-gradient(90% 60% at 50% 30%,#14533c,transparent 70%),#0d1712"></div><div class="kt-body">' +
      '<svg class="big" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>' +
      "<h2>Prejdené</h2><p>" + SEQ.length + " kariet v poradí výkladu</p>" +
      '<div class="kt-actions" style="justify-content:center"><button type="button" class="kt-btn" data-learn="znova">Od začiatku</button><button type="button" class="kt-btn" data-learn="skusat">Skúšať sa</button></div></div></article>';
    var t = today(), next = null;
    Object.keys(S.cards).forEach(function (id) {
      var r = S.cards[id], c = byId[id];
      if (c && !r.x && inScope(c) && r.due > Date.now() && (next === null || r.due < next)) next = r.due;
    });
    return '<article class="kt-slide kt-end"><div class="kt-bg" style="background:radial-gradient(90% 60% at 50% 30%,#14533c,transparent 70%),#0d1712"></div><div class="kt-body">' +
      '<svg class="big" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>' +
      "<h2>Na teraz hotovo</h2><p>" + (t.n + t.r) + " kariet dnes</p>" +
      (next ? "<p>Ďalšie opakovanie o " + FS.label(Math.max(60000, next - Date.now())) + "</p>" : "") + "</div></article>";
  }

  /* ── hodnotenie: len zvýrazní, kartu neposúva ──────────────────────── */
  function laterRated(i) {
    for (var k = i + 1; k < F.length; k++) if (F[k].id === F[i].id && F[k].g) return true;
    return false;
  }
  function unapply(it) {
    var d = dayRec(it.day);
    if (it.cn) d.n--;
    if (it.cr) d.r--;
    if (it.g > 1) d.ok--;
    var at = S.log.lastIndexOf(it.logE);
    if (at >= 0) S.log.splice(at, 1);
  }
  /* hodnotenie časti (Učenie): nejde do plánovača, mení to, čo príde za ňou */
  function markSec(i, g) {
    var it = F[i], c = byId[it.id];
    S.set.sr = S.set.sr || {};
    if (S.set.sr[c.i] === g) delete S.set.sr[c.i]; else S.set.sr[c.i] = g;
    save();
    syncRail(i);
    var b = feed.children[i].querySelector('.kt-rate[data-g="' + g + '"]');
    if (b) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    var sg = secRate(c.i), n = (c.t || []).length;
    if (sg && n) toast(sg === 4 ? "Pojmy tejto časti preskočím – ostávajú v Skúšaní" : sg <= 2 ? "Pojmy prídu otvorené, čo nesedí, zopakujem na konci časti" : "Pojmy prídu zatvorené – vybav si ich");
    rebuild(Math.max(idx, i) + 1);
  }
  /* Učenie: po hodnotení pojmu alebo interakcie sa prestavia karty od najbližšej hranice časti, aby na jej konci prišlo opakovanie */
  function relearn(i) {
    if (!learning()) return;
    for (var k = Math.max(idx, i) + 1; k < F.length; k++) {
      var c = F[k].id && byId[F[k].id];
      if (F[k].end || (c && isRead(c) && !F[k].rep) || F[k].rep || (c && c.k === "x")) { rebuild(k); return; }
    }
  }
  function mark(i, g, keep, quiet) {
    var it = F[i];
    if (!it || it.end) return;
    var mc = byId[it.id];
    if (!mc || mc.k === "x") return;
    cancelHide();
    if (isRead(mc)) { markSec(i, g); return; }
    if (!quiet) pendFlush(i);
    if (it.g && laterRated(i)) { toast("Táto karta sa už opakovala znova"); return; }
    if (it.g === g) {
      if (keep) return;
      unapply(it);
      if (it.prev) S.cards[it.id] = it.prev; else delete S.cards[it.id];
      it.g = 0; it.at = 0; it.prev = undefined;
      save(); syncRail(i); counts(); markStale(); relearn(i);
      return;
    }
    if (it.g) unapply(it);
    else { it.prev = S.cards[it.id] || null; it.at = Date.now(); it.day = dayKey(); }
    if (!it.open && !quiet) reveal(i);   // dvojklik hodnotí bez odkrytia významu a obrázka
    var d = dayRec(it.day), prev = it.prev;
    S.cards[it.id] = reviewCard(prev, g, it.at, it.id);
    it.cn = !prev;
    it.cr = !!prev;
    if (it.cn) d.n++;
    if (it.cr) d.r++;
    if (g > 1) d.ok++;
    it.logE = [it.at, g, prev ? prev.st : 0];
    S.log.push(it.logE);
    it.g = g;
    save();
    syncRail(i);
    counts();
    markStale();
    if (navigator.vibrate) { try { navigator.vibrate(g === 1 ? 18 : 8); } catch (e) {} }
    var b = feed.children[i].querySelector('.kt-rate[data-g="' + g + '"]');
    if (b) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    /* posledná pripravená karta mohla byť „koniec“, hoci hodnotenie pridalo opakovanie */
    if (learning()) relearn(i);
    else if (F[F.length - 1].end && F.length - 1 > idx) rebuild(F.length - 1);
  }
  function burst(x, y, g) {
    var b = document.createElement("div"), box = app.getBoundingClientRect();
    b.className = "kt-burst";
    b.style.left = (x - box.left) + "px"; b.style.top = (y - box.top) + "px";
    b.style.color = ["", "var(--kt-no)", "var(--kt-hard)", "var(--kt-ok)", "var(--kt-easy)"][g];
    b.innerHTML = '<svg viewBox="0 0 24 24">' + ICON[g] + "</svg>";
    app.appendChild(b);
    setTimeout(function () { b.remove(); }, 640);
  }
  function retire(i) {
    var it = F[i];
    if (!it || it.end) return;
    var r = S.cards[it.id];
    if (r && r.x) { if (r.s == null) delete S.cards[it.id]; else delete r.x; toast("Karta je späť"); }
    else { S.cards[it.id] = Object.assign({}, r || { st: 0, due: 0 }, { x: 1 }); toast("Vyradená. Vrátiš ju v tomto menu."); }
    save(); closeSheet(); counts(); markStale();
    feed.children[i].firstChild.classList.toggle("out", !!(S.cards[it.id] && S.cards[it.id].x));
    rebuild(Math.max(idx + 1, 0));
  }

  /* ── ovládanie ─────────────────────────────────────────────────────── */
  /* ťuknutie × dvojklik (24. 11. 2026, autor: „dvojklik nech neukáže význam a obrázok… ale nech to nespomaľuje“).
     Prvé ťuknutie hneď spustí len NÁDYCH – pozadie stmavne a priblíži sa, nápoveda zmizne (pri otvorenej karte odpoveď zbledne);
     význam a obrázok priletia až po okne dvojkliku, takže čakanie nevidno. Druhé ťuknutie v okne → nádych sa vráti a karta sa len
     ohodnotí. Okno sa učí, ako rýchlo čitateľ dvojklikáva (170–300 ms, predvolene 230); pomalší dvojklik ho sám predĺži. */
  var lastTap = 0, lastPage = -1, dragged = false, PEND = null, DBL_MAX = 330;
  function dblWin() {
    var g = S.set.dg;
    if (!g || !g.length) return 230;
    var s = g.slice().sort(function (a, b) { return a - b; }), m = s[Math.min(s.length - 1, Math.floor(s.length * 0.8))];
    return Math.max(170, Math.min(300, Math.round(m * 1.25 + 40)));
  }
  function learnGap(ms) {
    var g = (S.set.dg = (S.set.dg || []).slice(-7));
    g.push(Math.round(ms));
  }
  function pendStart(i, open) {
    pendFlush();
    var slide = feed.children[i] && feed.children[i].firstChild;
    if (!slide) return;
    slide.classList.add(open ? "pre" : "pre-x");
    PEND = { i: i, open: open, slide: slide, t: setTimeout(function () { pendFlush(); }, dblWin()) };
  }
  /* druhé ťuknutie: nič sa neodkryje ani neskryje, nádych sa vráti */
  function pendDrop() {
    if (!PEND) return;
    var p = PEND; PEND = null; clearTimeout(p.t);
    p.slide.classList.remove("pre", "pre-x");
  }
  /* okno uplynulo (alebo čitateľ urobil niečo iné): dokonči odkrytie či skrytie hneď */
  function pendFlush(only) {
    if (!PEND || (only != null && PEND.i !== only)) return;
    var p = PEND; PEND = null; clearTimeout(p.t);
    if (p.open) { reveal(p.i); p.slide.classList.remove("pre"); }
    else { p.slide.classList.remove("pre-x"); conceal(p.i); }
  }
  feed.addEventListener("click", function (e) {
    if (dragged) { dragged = false; e.preventDefault(); e.stopPropagation(); return; }
    var pg = e.target.closest(".kt-page");
    if (!pg) return;
    cancelHide();
    var i = +pg.dataset.i;
    if (PEND && (PEND.i !== i || e.target.closest(".kt-fig img,.kt-rate,[data-menu],[data-viac],.kt-open,a,button"))) pendFlush();
    var zi = e.target.closest(".kt-fig img,.kt-px img");
    if (zi && onPicture(zi, e)) { openZoom(zi); return; }
    var rb = e.target.closest(".kt-rate");
    if (rb) { mark(i, +rb.dataset.g); return; }
    var tcb = e.target.closest("[data-tc],[data-card]");   // čip pojmu na karte časti, „karta“ pri obrázku a páre
    if (tcb) { viac(byId[tcb.dataset.tc || tcb.dataset.card]); return; }
    var tca = e.target.closest("[data-tcall]");
    if (tca) {
      var sc = byId[tca.dataset.tcall], all = (sc.t || []).concat(sc.tc || []).filter(function (id) { return byId[id]; });
      sheet("Pojmy: " + plainText(sc.tt || sc.f).slice(0, 40), '<div class="kt-tc">' + all.map(function (id) {
        return '<button type="button" data-tc="' + esc(id) + '"' + ((sc.t || []).indexOf(id) < 0 ? ' class="o"' : "") + ">" + esc(plainText(byId[id].f)) + "</button>";
      }).join("") + '</div><p class="kt-cap">Plné – pojmy tejto časti (prídu za ňou), prerušované – z inej kapitoly alebo v Skúšaní.</p>');
      return;
    }
    var cc = F[i] && byId[F[i].id];
    if (cc && cc.k === "i" && !e.target.closest("[data-menu],[data-viac],.kt-open,a")) { ixClick(i, e); return; }
    if (cc && (cc.k === "x" || isRead(cc)) && !e.target.closest("[data-menu],[data-viac],.kt-open,a")) return;   // číta sa, nič sa neodkrýva
    if (e.target.closest("[data-menu]")) { menu(i); return; }
    if (e.target.closest("[data-viac]")) { viac(byId[F[i].id]); return; }
    if (e.target.closest(".kt-open") && F[i] && linkOut(byId[F[i].id])) { e.preventDefault(); return; }
    if (e.target.closest("a,button") || !F[i] || F[i].end) return;
    var now = Date.now();
    if (now - lastTap < DBL_MAX && lastPage === i) {
      var fast = !!PEND && PEND.i === i;
      learnGap(now - lastTap);
      lastTap = 0;
      pendDrop();
      var bx = pg.getBoundingClientRect(), g = S.set.dbl[e.clientX - bx.left < bx.width / 2 ? "l" : "r"];
      burst(e.clientX, e.clientY, g);
      mark(i, g, true, true);
      /* pomalý dvojklik (prvé ťuknutie už kartu skrylo): otvorená karta sa vráti otvorená */
      if (!fast && reopen === i && !F[i].open) reveal(i);
      reopen = -1;
      return;
    }
    lastTap = now; lastPage = i;
    reopen = F[i].open ? i : -1;
    pendStart(i, !F[i].open);
  });
  var reopen = -1;
  /* obrázok je v rámčeku široký 100 %, ale vykreslený je len jeho zmenšený obsah: ťuk na prázdne miesto vedľa neho neotvára lupu */
  function onPicture(img, e) {
    var r = img.getBoundingClientRect(), nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !nh) return true;
    var k = Math.min(r.width / nw, r.height / nh), w = nw * k, h = nh * k;
    var x = e.clientX - r.left, y = e.clientY - r.top, top = (r.height - h) / 2;
    return x >= 0 && x <= w && y >= top && y <= top + h;
  }

  /* podržanie: kruhová ponuka hodnotenia od najhoršieho po najlepšie */
  var HOLD = 380, LP = null, RAD = null;
  function cancelHold() { if (LP) { clearTimeout(LP.t); LP = null; } }
  function openRadial(i, x, y, pid) {
    var it = F[i];
    if (!it || it.end) return;
    var box = app.getBoundingClientRect(), w = box.width, h = feed.clientHeight, R = 98, M = 36, TOP = 62;
    var cx = x - box.left, cy = y - box.top, pts = null, dir = -1;
    var arc = function (c) {
      var s = Math.sin(c * Math.PI / 180) > 0 ? -1 : 1;
      return [0, 1, 2, 3].map(function (k) {
        var a = (c + s * (k - 1.5) * 46) * Math.PI / 180;
        return { x: Math.round(R * Math.cos(a)), y: Math.round(R * Math.sin(a)) };
      });
    };
    var fits = function (p) { return p.every(function (q) { return cx + q.x >= M && cx + q.x <= w - M && cy + q.y >= TOP && cy + q.y <= h - M; }); };
    [-90, -55, -125, 90, 55, 125].some(function (c) {
      var p = arc(c);
      if (!fits(p)) return false;
      pts = p; dir = Math.sin(c * Math.PI / 180) > 0 ? 1 : -1;
      return true;
    });
    if (!pts) {   // úzky alebo nízky displej: stred sa posunie, aby boli všetky ikony na obrazovke
      cx = Math.max(M + R, Math.min(w - M - R, cx));
      cy = Math.max(TOP + R, Math.min(h - M, cy));
      pts = arc(-90);
    }
    var now = it.at || Date.now(), pv = previewCard(recFor(it), now, it.id);
    var el = document.createElement("div");
    el.className = "kt-radial";
    el.style.setProperty("--cx", cx + "px");
    el.style.setProperty("--cy", cy + "px");
    el.innerHTML = '<span class="kt-rr"></span>' + pts.map(function (q, k) {
      var g = k + 1;
      return '<button type="button" class="kt-ro r' + g + (it.g === g ? " sel" : "") + '" data-g="' + g + '" aria-label="' + NAME[g] + '" style="--x:' + q.x + "px;--y:" + q.y + "px;--k:" + k + '"><svg viewBox="0 0 24 24">' + ICON[g] + "</svg></button>";
    }).join("") + '<span class="kt-rlab"></span>';
    var lab = el.querySelector(".kt-rlab");
    lab.style.left = Math.max(70, Math.min(w - 70, cx)) + "px";
    lab.style.top = Math.max(TOP - 6, Math.min(h - 40, cy + dir * (R + 52) - 12)) + "px";
    app.appendChild(el);
    RAD = { el: el, i: i, cx: cx, cy: cy, ox: x, oy: y, box: box, pid: pid, hot: 0, sticky: false, moved: false, lab: lab, pts: pts,
      btn: [].slice.call(el.querySelectorAll(".kt-ro")), text: function (g) { return NAME[g] + " · " + FS.label(pv[g].due - now); } };
    requestAnimationFrame(function () { el.classList.add("on"); });
    el.addEventListener("pointerdown", function (e) { if (RAD && RAD.sticky && !e.target.closest(".kt-ro")) closeRadial(); });
    el.addEventListener("click", function (e) {
      var b = e.target.closest(".kt-ro");
      if (b && RAD && RAD.sticky) chooseRadial(+b.dataset.g);
    });
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (x) {} }
  }
  function hotRadial(g) {
    if (!RAD || RAD.hot === g) return;
    RAD.hot = g;
    RAD.btn.forEach(function (b) { b.classList.toggle("hot", +b.dataset.g === g); });
    RAD.lab.textContent = g ? RAD.text(g) : "";
    RAD.lab.classList.toggle("on", !!g);
    if (g && navigator.vibrate) { try { navigator.vibrate(6); } catch (x) {} }
  }
  function moveRadial(x, y) {
    var px = x - RAD.box.left - RAD.cx, py = y - RAD.box.top - RAD.cy, best = 0, bd = 66;
    if (Math.hypot(x - RAD.ox, y - RAD.oy) > 14) RAD.moved = true;
    if (Math.hypot(px, py) >= 32) RAD.pts.forEach(function (q, k) {
      var d = Math.hypot(px - q.x, py - q.y);
      if (d < bd) { bd = d; best = k + 1; }
    });
    hotRadial(best);
  }
  function closeRadial() { if (RAD) { RAD.el.remove(); RAD = null; } }
  function chooseRadial(g) {
    var i = RAD.i, q = RAD.pts[g - 1], x = RAD.box.left + RAD.cx + q.x, y = RAD.box.top + RAD.cy + q.y;
    closeRadial();
    mark(i, g, true);
    burst(x, y, g);
  }
  feed.addEventListener("pointerdown", function (e) {
    cancelHold();
    cancelHide();
    if (RAD || e.button || e.target.closest("a,button,input,.kt-ix")) return;
    var pg = e.target.closest(".kt-page");
    if (!pg || !F[+pg.dataset.i] || F[+pg.dataset.i].end) return;
    var hc = byId[F[+pg.dataset.i].id];
    if (!hc || hc.k === "x" || isRead(hc)) return;   // časť a pár: hodnotí sa tlačidlami, nie kruhovou ponukou
    var hold = { id: e.pointerId, x: e.clientX, y: e.clientY, i: +pg.dataset.i, top: feed.scrollTop };
    hold.t = setTimeout(function () {
      LP = null;
      if (Math.abs(feed.scrollTop - hold.top) > 2) return;
      M = null;
      feed.classList.remove("drag");
      feed.style.scrollSnapType = "";
      openRadial(hold.i, hold.x, hold.y, hold.id);
    }, HOLD);
    LP = hold;
  });
  document.addEventListener("pointermove", function (e) {
    if (LP && e.pointerId === LP.id && Math.hypot(e.clientX - LP.x, e.clientY - LP.y) > 8) cancelHold();
    if (RAD && !RAD.sticky && e.pointerId === RAD.pid) moveRadial(e.clientX, e.clientY);
  });
  document.addEventListener("pointerup", function (e) {
    if (LP && e.pointerId === LP.id) cancelHold();
    if (!RAD || RAD.sticky || e.pointerId !== RAD.pid) return;
    moveRadial(e.clientX, e.clientY);
    dragged = true;
    setTimeout(function () { dragged = false; }, 90);
    if (RAD.hot) chooseRadial(RAD.hot);
    else if (RAD.moved) closeRadial();
    else RAD.sticky = true;   // pustil bez pohybu: ponuka ostane, ikonu vyberie ťuknutím
  });
  document.addEventListener("pointercancel", function (e) {
    if (LP && e.pointerId === LP.id) cancelHold();
    if (RAD && !RAD.sticky && e.pointerId === RAD.pid) closeRadial();
  });
  feed.addEventListener("scroll", function () { if (LP && Math.abs(feed.scrollTop - LP.top) > 2) cancelHold(); }, { passive: true });
  feed.addEventListener("touchmove", function (e) { if (RAD && e.cancelable) e.preventDefault(); }, { passive: false });
  feed.addEventListener("contextmenu", function (e) { if (!e.target.closest("a")) e.preventDefault(); });

  /* koliesko a touchpad: jedno gesto = jedna karta (bez toho by sa malý krok vrátil na tú istú) */
  var wheelAt = 0, actAt = 0, lastAbs = 0, wheelSum = 0, wheelDone = false;
  feed.addEventListener("wheel", function (e) {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;   // vodorovné gesto prepína záložky
    e.preventDefault();
    var now = Date.now(), abs = Math.abs(e.deltaY);
    if (now - wheelAt > 140 || (wheelDone && now - actAt > 380 && abs >= 80 && abs >= lastAbs)) { wheelSum = 0; wheelDone = false; }
    wheelAt = now; lastAbs = abs;
    if (wheelDone) return;
    wheelSum += e.deltaY;
    if (Math.abs(wheelSum) < 30) return;
    wheelDone = true; actAt = now;
    goTo(idx + (wheelSum > 0 ? 1 : -1));
  }, { passive: false });

  /* ťah myšou ako prstom */
  var M = null;
  feed.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse" || e.button || e.target.closest("a,button,input")) return;
    M = { x: e.clientX, y: e.clientY, top: feed.scrollTop, t: Date.now(), on: false, last: e.clientY, lastT: Date.now(), v: 0, id: e.pointerId, from: idx };
  });
  feed.addEventListener("pointermove", function (e) {
    if (!M) return;
    var dy = e.clientY - M.y;
    if (!M.on) {
      if (Math.abs(dy) < 6 || Math.abs(dy) < Math.abs(e.clientX - M.x)) return;
      M.on = true;
      feed.style.scrollSnapType = "none";
      feed.classList.add("drag");
      try { feed.setPointerCapture(M.id); } catch (x) {}
    }
    var t = Date.now();
    if (t > M.lastT) M.v = (e.clientY - M.last) / (t - M.lastT);
    M.last = e.clientY; M.lastT = t;
    feed.scrollTop = M.top - dy;
  });
  function mouseEnd(e) {
    if (!M) return;
    var m = M; M = null;
    if (!m.on) return;
    dragged = true;
    setTimeout(function () { dragged = false; }, 60);
    feed.classList.remove("drag");
    var dy = e.clientY - m.y, target = m.from;
    if (dy < -H() * .16 || m.v < -.5) target = m.from + 1;
    else if (dy > H() * .16 || m.v > .5) target = m.from - 1;
    goTo(target);
    setTimeout(function () { feed.style.scrollSnapType = ""; }, 420);
  }
  feed.addEventListener("pointerup", mouseEnd);
  feed.addEventListener("pointercancel", mouseEnd);

  /* klik myšou neberie fokus: inak by medzerník a Enter stlačili naposledy kliknuté tlačidlo (a zrušili hodnotenie);
     tlačidlá ostávajú dostupné klávesom Tab */
  app.addEventListener("mousedown", function (e) {
    if (e.target.closest("button,a")) e.preventDefault();
  });
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (RAD) { if (e.key === "Escape") closeRadial(); return; }
    if (zoomEl) { if (e.key === "Escape") closeZoom(); return; }
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "Escape") {
      if (!$("ktSheet").hidden) closeSheet();
      else if (EMBED) toHost({ pf: "flow-close" });
      return;
    }
    if (!$("ktSheet").hidden) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); goTab(tab - 1); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); goTab(tab + 1); return; }
    if (tab !== 0) return;
    pendFlush();
    var it = F[idx];
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "j") { e.preventDefault(); goTo(idx + 1); }
    else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "k") { e.preventDefault(); goTo(idx - 1); }
    else if (e.key === " " || e.key === "Enter") {
      if (e.target.closest && e.target.closest("a,button,input")) return;
      e.preventDefault();
      var kc = it && it.id && byId[it.id];
      if (kc && kc.it === "dop" && it.st && it.st.r < kc.d.n) { it.st.r++; ixUpdate(idx); }
      else if (it && it.open) goTo(idx + 1); else reveal(idx);
    }
    else if (/^[1-4]$/.test(e.key)) mark(idx, +e.key);
    else if ((e.key === "v" || e.key === "V") && it && it.id) viac(byId[it.id]);
  });

  /* zväčšený obrázok: klik kdekoľvek alebo Esc zavrie, autor a licencia ostávajú pri obrázku */
  var zoomEl = null;
  function openZoom(img) {
    var fig = img.closest("figure"), cap = fig && fig.querySelector("figcaption");
    zoomEl = document.createElement("div");
    zoomEl.className = "kt-zoom";
    zoomEl.setAttribute("role", "dialog");
    zoomEl.setAttribute("aria-modal", "true");
    zoomEl.setAttribute("aria-label", "Zväčšený obrázok");
    zoomEl.innerHTML = '<button type="button" class="kt-ico" aria-label="Zavrieť"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img src="' + esc(img.getAttribute("src")) + '" alt="' + esc(img.alt) + '">' +
      (cap ? '<div class="kt-zoom-c">' + cap.innerHTML + "</div>" : "");
    zoomEl.addEventListener("click", function (e) { if (!e.target.closest("a")) closeZoom(); });
    document.body.appendChild(zoomEl);
    zoomEl.querySelector("button").focus();
  }
  function closeZoom() { if (zoomEl) { zoomEl.remove(); zoomEl = null; } }
  $("ktSheetB").addEventListener("click", function (e) {
    var tb = e.target.closest("[data-tc]");
    if (tb) { viac(byId[tb.dataset.tc]); return; }
    var im = e.target.closest("figure img");
    if (im) { openZoom(im); return; }
    if (e.target.closest(".kt-book") && linkOut(sheetCard)) { e.preventDefault(); closeSheet(); }
  });

  /* ── záložky: vodorovný posun natívnym rolovaním, spodná lišta stojí ──── */
  var pager = $("ktPager"), ind = $("ktInd"), TABS = ["feed", "temy", "stat", "nast"], tab = 0;
  var tabBtns = [].slice.call(document.querySelectorAll(".kt-nav button")), dirty = false, stale = true, staleT = 0, pRaf = 0;
  var PANE = { temy: $("ktPaneTemy"), stat: $("ktPaneStat"), nast: $("ktPaneNast") };
  function PW() { return pager.clientWidth || 1; }
  function goTab(i, instant) {
    i = Math.max(0, Math.min(TABS.length - 1, i));
    pager.scrollTo({ left: i * PW(), behavior: instant || REDUCED ? "auto" : "smooth" });
  }
  function setTab(i) {
    if (i === tab) return;
    var was = tab;
    tab = i;
    tabBtns.forEach(function (b, k) { b.classList.toggle("on", k === i); b.setAttribute("aria-current", k === i ? "page" : "false"); });
    if (stale) renderPanes();
    if (was === 1) {
      if (S.set.off.length >= D.ch.length) { toast("Vyber aspoň jednu tému"); goTab(1); return; }
      refresh();
    }
    if (i === 0) { counts(); try { feed.focus({ preventScroll: true }); } catch (e) {} }
  }
  pager.addEventListener("scroll", function () {
    if (pRaf) return;
    pRaf = requestAnimationFrame(function () {
      pRaf = 0;
      var x = pager.scrollLeft / PW();
      ind.style.transform = "translate3d(" + (x * 100) + "%,0,0)";
      setTab(Math.max(0, Math.min(TABS.length - 1, Math.round(x))));
    });
  }, { passive: true });
  tabBtns.forEach(function (b, k) { b.addEventListener("click", function () { closeSheet(); goTab(k); }); });
  $("ktFilter").addEventListener("click", function () { goTab(1); });

  /* záložky sa pripravia vopred, aby boli hotové už počas posunu prstom */
  function markStale() {
    stale = true;
    clearTimeout(staleT);
    staleT = setTimeout(function () {
      if (window.requestIdleCallback) requestIdleCallback(renderPanes, { timeout: 700 }); else renderPanes();
    }, 220);
  }
  function renderPanes() {
    if (!stale) return;
    stale = false;
    if (tab !== 1) temy();
    if (tab !== 2) stat();
    if (tab !== 3) nast();
  }

  /* ťah myšou do strán (dotyk rieši prehliadač sám) */
  var PD = null, pagerDragged = false;
  pager.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse" || e.button || e.target.closest('a,input[type="range"]')) return;
    PD = { x: e.clientX, y: e.clientY, left: pager.scrollLeft, on: false, v: 0, lx: e.clientX, lt: Date.now(), id: e.pointerId, from: tab };
  });
  pager.addEventListener("pointermove", function (e) {
    if (!PD) return;
    var dx = e.clientX - PD.x, dy = e.clientY - PD.y;
    if (!PD.on) {
      if (M && M.on) { PD = null; return; }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.3) { if (Math.abs(dy) > 12) PD = null; return; }
      PD.on = true;
      cancelHold();
      M = null;
      pager.style.scrollSnapType = "none";
      pager.classList.add("drag");
      try { pager.setPointerCapture(PD.id); } catch (x) {}
    }
    var t = Date.now();
    if (t > PD.lt) PD.v = (e.clientX - PD.lx) / (t - PD.lt);
    PD.lx = e.clientX; PD.lt = t;
    pager.scrollLeft = PD.left - dx;
  });
  function pagerEnd(e) {
    if (!PD) return;
    var d = PD;
    PD = null;
    if (!d.on) return;
    pagerDragged = true;
    setTimeout(function () { pagerDragged = false; }, 80);
    pager.classList.remove("drag");
    var dx = e.clientX - d.x, to = d.from;
    if (dx < -PW() * .18 || d.v < -.5) to = d.from + 1;
    else if (dx > PW() * .18 || d.v > .5) to = d.from - 1;
    goTab(to);
    setTimeout(function () { pager.style.scrollSnapType = ""; }, 420);
  }
  pager.addEventListener("pointerup", pagerEnd);
  pager.addEventListener("pointercancel", pagerEnd);
  pager.addEventListener("click", function (e) {
    if (pagerDragged) { pagerDragged = false; e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* ── panel s podrobnosťami karty ───────────────────────────────────── */
  var sheetCard = null;
  function sheet(title, html) {
    $("ktSheetT").textContent = title;
    $("ktSheetB").innerHTML = html;
    $("ktSheetB").scrollTop = 0;
    $("ktSheet").hidden = false;
  }
  function closeSheet() { $("ktSheet").hidden = true; }
  function refresh() {
    if (!dirty) { counts(); return; }
    dirty = false;
    if (learning()) { restart(); return; }
    var it = F[idx];
    var keep = it && it.id && inScope(byId[it.id]);
    rebuild(keep ? idx + 1 : idx);
    if (!keep) { paint(); goTo(idx, true); }
  }
  $("ktSheetX").addEventListener("click", closeSheet);

  /* odkaz do knihy: vo vrstve Flows ho otvorí náhľad vedľa, samostatná stránka ide bežným odkazom */
  function plainText(h) { return String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
  function linkOut(c) {
    if (!EMBED || !c || !c.h) return false;
    var ch = chOf(c);
    toHost({ pf: "flow-link", h: c.h, term: c.k === "q" ? "" : plainText(c.f), ans: plainText(c.a).slice(0, 320), title: ch ? ch.n + " · " + ch.t : "" });
    return true;
  }

  /* filter na jednu kapitolu (otvorenie z kapitoly); čip hore ho zruší */
  function chipOnly() {
    var b = $("ktOnly");
    b.hidden = onlyCh < 0;
    if (onlyCh >= 0) $("ktOnlyT").textContent = "Kap. " + D.ch[onlyCh].n;
  }
  function setOnly(stem) {
    var i = stem ? D.ch.findIndex(function (c) { return c.s === stem; }) : -1;
    if (i === onlyCh) return;
    onlyCh = i;
    chipOnly();
    restart();
  }
  $("ktOnly").addEventListener("click", function () { setOnly(null); });

  function viac(c) {
    if (!c) return;
    if (c.k === "x") { viac(byId[c.pa]); return; }
    var h = c.a ? "<p><b>" + c.a + "</b></p>" : "";
    if (c.y) h += '<p class="kt-cap">' + esc(c.y) + "</p>";
    if (c.x) h += '<p class="kt-x">' + c.x.t + ' <span class="kt-xs">' + esc(c.x.s) + "</span></p>";
    if (c.e) h += '<p class="kt-cap">' + c.e + "</p>";
    if (c.m) h += c.m;
    if (c.p) h += '<figure style="margin:14px 0 0"><img src="' + esc(c.p.s) + '" alt="' + esc(c.p.a) + '"><figcaption class="kt-cap">' + c.p.c +
      (c.p.cr ? "<br>" + esc(c.p.cr) : "") + (c.p.h ? ' · <a href="' + esc(c.p.h) + '" target="_blank" rel="noopener">zdroj</a>' : "") + "</figcaption></figure>";
    if (c.h) h += '<p><a class="kt-btn kt-book" href="' + esc(c.h) + '">Otvoriť v knihe</a></p>';
    sheetCard = c;
    sheet(c.f.replace(/<[^>]+>/g, "").slice(0, 60), h);
  }
  function menu(i) {
    var c = byId[F[i].id], r = S.cards[c.i], out = r && r.x;
    var h = '<div class="kt-actions" style="flex-direction:column">' +
      '<button type="button" class="kt-btn" data-a="viac">Celé vysvetlenie</button>' +
      (c.h ? '<a class="kt-btn kt-book" href="' + esc(c.h) + '">Otvoriť v knihe</a>' : "") +
      '<button type="button" class="kt-btn" data-a="retire">' + (out ? "Vrátiť kartu do opakovania" : "Toto už viem, neukazovať") + "</button></div>";
    sheetCard = c;
    sheet("Karta", h);
    $("ktSheetB").querySelector('[data-a="viac"]').onclick = function () { viac(c); };
    $("ktSheetB").querySelector('[data-a="retire"]').onclick = function () { retire(i); };
  }
  /* otvorené z kapitoly: v Témach je zaškrtnutá len tá kapitola (uložený výber sa nemení, kým čitateľ nič nezmení) */
  function chOn(i) { return onlyCh >= 0 ? i === onlyCh : S.set.off.indexOf(i) < 0; }
  function temy() {
    var cnt = { jadro: 0, vsetky: 0, eponymy: 0, kostra: 0, obrazky: 0 };
    D.c.forEach(function (c) { if (c.j) cnt.jadro++; if (c.k === "e") cnt.eponymy++; if (c.k !== "s") cnt.vsetky++; if (c.k === "s" || c.k === "q") cnt.kostra++; if (c.it === "obr") cnt.obrazky++; });
    var seg = [["jadro", "Bez ľahkých"], ["eponymy", "Eponymá"], ["obrazky", "Obrázky"], ["vsetky", "Všetky"]].map(function (x) {
      return '<button type="button" data-scope="' + x[0] + '"' + ((learning() ? S.set.ts : S.set.scope) === x[0] ? ' class="on"' : "") + ">" + x[1] + "<small>" + cnt[x[0]] + "</small></button>";
    }).join("");
    var rows = D.ch.map(function (ch, i) {
      var all = 0, seen = 0;
      D.c.forEach(function (c) {
        if (c.c !== i) return;
        if (!kindIn(c)) return;
        all++;
        var r = S.cards[c.i];
        if (r && (r.x || r.st === FS.REVIEW)) seen++;
      });
      return '<label class="kt-row"><input type="checkbox" data-ch="' + i + '"' + (chOn(i) ? " checked" : "") + '><span class="t">' + esc(ch.n) + ". " + esc(ch.t) +
        '<span class="kt-bar"><i style="width:' + (all ? Math.round(100 * seen / all) : 0) + '%"></i></span></span><span class="n">' + seen + "/" + all + "</span></label>";
    }).join("");
    var B = PANE.temy, L = learning(), sq = L ? seqFor() : null;
    var mode = '<div class="kt-seg kt-mode2"><button type="button" data-tmode="uc"' + (L ? ' class="on"' : "") + '>Učiť sa<small>kostra → pojmy</small></button>' +
      '<button type="button" data-tmode="sk"' + (L ? "" : ' class="on"') + '>Skúšať sa<small>opakovanie</small></button></div>';
    if (L) {
      var at = Math.min((S.set.lp || {})[sq.key] || 0, sq.list.length);
      seg = '<div class="kt-seg">' + [["plus", "Kostra + pojmy"], ["len", "Len kostra"]].map(function (x) {
        return '<button type="button" data-uc="' + x[0] + '"' + ((S.set.uc || "plus") === x[0] ? ' class="on"' : "") + ">" + x[1] + "</button>";
      }).join("") + "</div>" +
        '<p class="kt-cap">' + (S.set.uc === "len" ? "Časti kapitoly s hlavnou myšlienkou, krátka skúška ku každej, súhrn a otázky – bez kariet pojmov." :
          "Časť kapitoly si prečítaš a ohodnotíš, za ňou idú jej pojmy (s vetou z kapitoly), krátka skúška – zoraď, priraď, rozlíš, doplň, odhadni, obrázok – a otázky k nej. Čo nesedí, sa zopakuje na konci časti.") +
        " " + sq.list.length + " kariet" + (at > 0 && at < sq.list.length ? ", pokračuješ od " + (at + 1) + "." : at >= sq.list.length && sq.list.length ? ", prejdené." : ".") + "</p>" +
        (at > 0 ? '<div class="kt-actions"><button type="button" class="kt-btn" id="ktFromStart">Od začiatku</button></div>' : "");
    } else seg = '<div class="kt-seg">' + seg + "</div>";
    B.innerHTML = '<h3 style="margin-top:0">REŽIM</h3>' + mode + seg + '<h3>KAPITOLY</h3>' +
      (onlyCh >= 0 ? '<p class="kt-cap" id="ktOnlyCap">Otvorené z kapitoly ' + esc(D.ch[onlyCh].n) + ": vybraná je len ona. Ďalšie pridáš zaškrtnutím.</p>" : "") +
      '<label class="kt-row kt-all"><input type="checkbox" id="ktAll"' + (onlyCh < 0 && !S.set.off.length ? " checked" : "") + '><span class="t">Všetky kapitoly</span></label>' + rows;
    B.querySelectorAll("[data-scope]").forEach(function (b) { b.onclick = function () { S.set.scope = S.set.ts = b.dataset.scope; dirty = true; save(); temy(); }; });
    B.querySelectorAll("[data-tmode]").forEach(function (b) { b.onclick = function () { setMode(b.dataset.tmode); }; });
    B.querySelectorAll("[data-uc]").forEach(function (b) { b.onclick = function () { S.set.uc = b.dataset.uc; dirty = true; save(); temy(); }; });
    if ($("ktFromStart")) $("ktFromStart").onclick = function () { fromStart(); goTab(0); };
    var all = $("ktAll"), boxes = B.querySelectorAll("[data-ch]");
    all.onchange = function () {
      S.set.off = all.checked ? [] : D.ch.map(function (_, i) { return i; });
      boxes.forEach(function (x) { x.checked = all.checked; });
      onlyCh = -1; chipOnly(); dirty = true;
      if (all.checked) save();   // prázdny výber sa neukladá, čitateľ práve vyberá
    };
    boxes.forEach(function (x) {
      x.onchange = function () {
        var i = +x.dataset.ch;
        var off = D.ch.map(function (_, k) { return k; }).filter(function (k) { return !chOn(k); });   // to, čo čitateľ práve vidí
        if (!x.checked && off.indexOf(i) < 0 && off.length === D.ch.length - 1) { x.checked = true; toast("Aspoň jedna téma musí ostať"); return; }
        off = off.filter(function (v) { return v !== i; });
        if (!x.checked) off.push(i);
        S.set.off = off;
        all.checked = off.length === 0;
        if ($("ktOnlyCap")) $("ktOnlyCap").remove();
        onlyCh = -1; chipOnly(); dirty = true;
        save();
      };
    });
  }
  function streak() {
    var n = 0, t = Date.now();
    for (var i = 0; i < 3650; i++) {
      var d = S.days[dayKey(t - i * DAY)];
      if (d && d.n + d.r > 0) n++;
      else if (i > 0) break;
    }
    return n;
  }
  function stat() {
    var learned = 0, mature = 0, out = 0, now = Date.now(), fc = [0, 0, 0, 0, 0, 0, 0];
    var start = new Date(now - 4 * HOUR); start.setHours(4, 0, 0, 0);
    Object.keys(S.cards).forEach(function (id) {
      var r = S.cards[id];
      if (r.x) { out++; return; }
      if (r.st === FS.REVIEW) { learned++; if ((r.ivl || 0) >= 21) mature++; }
      if (!byId[id]) return;
      var k = Math.max(0, Math.floor((r.due - start.getTime()) / DAY));
      if (k < 7) fc[k]++;
    });
    var cut = now - 30 * DAY, rev = 0, good = 0;
    S.log.forEach(function (l) { if (l[0] >= cut && l[2] === FS.REVIEW) { rev++; if (l[1] > 1) good++; } });
    var mx = Math.max.apply(null, fc.concat([1]));
    var dn = ["dnes", "zajtra", "+2", "+3", "+4", "+5", "+6"];
    var bars = fc.map(function (v, i) { return "<div>" + v + '<i style="height:' + Math.round(84 * v / mx) + 'px"></i>' + dn[i] + "</div>"; }).join("");
    var t = today();
    PANE.stat.innerHTML = '<div class="kt-tiles">' +
      '<div class="kt-tile"><b>' + (t.n + t.r) + "</b><span>kariet dnes</span></div>" +
      '<div class="kt-tile"><b>' + streak() + "</b><span>dní v rade</span></div>" +
      '<div class="kt-tile"><b>' + learned + "</b><span>naučených</span></div>" +
      '<div class="kt-tile"><b>' + mature + "</b><span>dlhodobo (21+ dní)</span></div>" +
      '<div class="kt-tile"><b>' + (rev ? Math.round(100 * good / rev) + " %" : "–") + "</b><span>úspešnosť za 30 dní</span></div>" +
      '<div class="kt-tile"><b>' + out + "</b><span>vyradených</span></div></div>" +
      '<h3>OPAKOVANIA NA 7 DNÍ</h3><div class="kt-chart">' + bars + "</div>";
  }
  function hookEnd(pg) {
    pg.querySelectorAll("[data-learn]").forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); if (b.dataset.learn === "znova") fromStart(); else setMode("sk"); };
    });
  }
  function fromStart() { S.set.lp = S.set.lp || {}; S.set.lp[seqFor().key] = 0; save(); restart(); renderPanes(); }
  /* prepínač Učiť | Skúšať (hlavička aj Témy); Skúšanie si pamätá posledný rozsah (Bez ľahkých / Eponymá / Všetky) */
  function setMode(m) {
    if ((m === "uc") === learning()) return;
    if (m === "uc") { S.set.ts = S.set.scope; S.set.scope = "kostra"; }
    else S.set.scope = S.set.ts && S.set.ts !== "kostra" ? S.set.ts : "jadro";
    save(); restart(); renderPanes();
    toast(m === "uc" ? (S.set.uc === "len" ? "Učenie: kostra kapitoly v poradí výkladu" : "Učenie: časť → jej pojmy → krátka skúška") : "Skúšanie: opakovanie ako v Anki");
  }
  function syncMode() {
    var b = document.querySelectorAll("#ktMode [data-mode]");
    for (var i = 0; i < b.length; i++) { var on = (b[i].dataset.mode === "uc") === learning(); b[i].classList.toggle("on", on); b[i].setAttribute("aria-pressed", on ? "true" : "false"); }
  }
  if ($("ktMode")) $("ktMode").addEventListener("click", function (e) { var b = e.target.closest("[data-mode]"); if (b) setMode(b.dataset.mode); });
  function restart() { buildSeq(); F = []; idx = 0; sinceNew = 0; feed.textContent = ""; feed.scrollTop = 0; extend(); paint(); counts(); markStale(); }
  function nast() {
    var seg = function (attr, vals, cur) { return vals.map(function (v) { return '<button type="button" data-' + attr + '="' + v[0] + '"' + (String(cur) === String(v[0]) ? ' class="on"' : "") + ">" + v[1] + "</button>"; }).join(""); };
    var rate = [[1, "Neviem"], [2, "Ťažké"], [3, "Viem"], [4, "Ľahké"]];
    var out = Object.keys(S.cards).filter(function (id) { return S.cards[id].x; }).length;
    var B = PANE.nast;
    B.innerHTML = '<h3 style="margin-top:0">PLÁNOVANIE</h3><div class="kt-seg">' + seg("algo", [["anki", "Ako Anki"], ["fsrs", "FSRS"]], S.set.algo) + "</div>" +
      '<p class="kt-cap">' + (S.set.algo === "fsrs" ? "FSRS odhaduje pamäť každej karty; v Anki je to voliteľný plánovač." : "Klasické Anki: 1 min, 10 min, 1 deň, potom odstupy podľa ľahkosti karty.") + "</p>" +
      '<h3>NOVÉ KARTY</h3><div class="kt-seg">' + seg("order", [["seq", "Postupne"], ["rand", "Náhodne"]], S.set.order) + "</div>" +
      '<h3>DVOJITÉ ŤUKNUTIE</h3><p class="kt-cap kt-half">Ľavá polovica karty</p><div class="kt-seg kt-dbl">' + seg("dl", rate, S.set.dbl.l) + "</div>" +
      '<p class="kt-cap kt-half">Pravá polovica karty</p><div class="kt-seg kt-dbl">' + seg("dr", rate, S.set.dbl.r) + "</div>" +
      (S.set.algo === "fsrs" ? '<h3>CIEĽOVÁ ZAPAMÄTATEĽNOSŤ: <span id="ktRet">' + Math.round(S.set.retention * 100) + ' %</span></h3><input class="kt-range" id="ktRetR" type="range" min="80" max="95" step="1" value="' + Math.round(S.set.retention * 100) + '">' +
      '<p class="kt-cap">Vyššia znamená častejšie opakovanie. Pred skúškou 92 až 95 %, inak 90 %.</p>' : "") +
      '<h3>POSTUP</h3><div class="kt-actions"><button type="button" class="kt-btn" id="ktExp">Stiahnuť zálohu</button><button type="button" class="kt-btn" id="ktImp">Nahrať zálohu</button>' +
      (out ? '<button type="button" class="kt-btn" id="ktRestore">Vrátiť vyradené (' + out + ")</button>" : "") +
      '<button type="button" class="kt-btn kt-danger" id="ktReset">Vymazať postup</button></div><input type="file" id="ktFile" accept="application/json,.json" hidden>' +
      '<p class="kt-cap">Postup je uložený len v tomto prehliadači. Do iného zariadenia ho prenesieš zálohou.</p>' +
      '<h3>O SYSTÉME</h3><p class="kt-cap">Plánovanie: vlastná implementácia v štýle Anki (Algorithm SM-2, © SuperMemo World, 1991) a otvoreného algoritmu FSRS (MIT, © 2022 Open Spaced Repetition). Kód kariet je open source pod licenciou MIT, obsah kníh má vlastnú licenciu. Projekt nie je spojený s Anki ani s Instagramom. <a href="assets/js/karty-LICENSE.txt">Licencia</a></p>';
    B.querySelectorAll("[data-dl]").forEach(function (b) { b.onclick = function () { S.set.dbl.l = +b.dataset.dl; save(); nast(); }; });
    B.querySelectorAll("[data-dr]").forEach(function (b) { b.onclick = function () { S.set.dbl.r = +b.dataset.dr; save(); nast(); }; });
    B.querySelectorAll("[data-algo]").forEach(function (b) { b.onclick = function () { S.set.algo = b.dataset.algo; sched = makeSched(); dirty = true; save(); nast(); }; });
    B.querySelectorAll("[data-order]").forEach(function (b) { b.onclick = function () { S.set.order = b.dataset.order; dirty = true; save(); nast(); }; });
    if ($("ktRetR")) {
      $("ktRetR").oninput = function () { $("ktRet").textContent = this.value + " %"; };
      $("ktRetR").onchange = function () { S.set.retention = this.value / 100; sched = makeSched(); save(); };
    }
    $("ktExp").onclick = function () {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" }));
      a.download = "flows-" + D.book.slug + "-" + dayKey() + ".json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    };
    $("ktImp").onclick = function () { $("ktFile").click(); };
    $("ktFile").onchange = function () {
      var f = this.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var x = JSON.parse(r.result);
          if (!x || typeof x.cards !== "object" || Array.isArray(x.cards)) throw 0;
          if (!confirm("Nahradiť súčasný postup zálohou?")) return;
          var b = blank();
          b.cards = x.cards; b.days = x.days || {}; b.log = Array.isArray(x.log) ? x.log : [];
          for (var k in x.set) b.set[k] = x.set[k];
          S = b; sched = makeSched();
          save(); restart(); toast("Záloha nahraná");
        } catch (e) { toast("Toto nie je záloha kariet"); }
      };
      r.readAsText(f);
    };
    if ($("ktRestore")) $("ktRestore").onclick = function () {   // id ktBack má šípka Späť v hlavičke
      Object.keys(S.cards).forEach(function (id) {
        var r = S.cards[id];
        if (!r.x) return;
        if (r.s == null) delete S.cards[id]; else delete r.x;
      });
      dirty = true; save(); nast(); toast("Karty sú späť");
    };
    $("ktReset").onclick = function () {
      if (!confirm("Naozaj vymazať celý postup v tejto knihe? Nedá sa to vrátiť.")) return;
      var keep = S.set;
      S = blank(); S.set = keep;
      save(); restart();
    };
  }

  var toastT;
  function toast(m) {
    var t = $("ktToast");
    t.textContent = m;
    t.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("on"); }, 1700);
  }
  function intro() {
    if (S.set.intro) return;
    var d = document.createElement("div");
    d.className = "kt-intro";
    d.innerHTML = "<h2>Ako to funguje</h2><dl><dt>Roluj</dt><dd>ďalšia alebo predošlá karta</dd><dt>Do strán</dt><dd>Flow, Témy, Prehľad, Nastavenia" + (EMBED ? "; z Flow doprava späť do knihy" : "") + "</dd><dt>Ťuk</dt><dd>ukáže odpoveď, ďalší ťuk ju skryje</dd>" +
      "<dt>Vpravo</dt><dd>označ Neviem, Ťažké, Viem alebo Ľahké. Karta ostane, roluješ sám.</dd><dt>Znova</dt><dd>ťuk na to isté tlačidlo hodnotenie zruší</dd><dt>Dvojťuk</dt><dd>vľavo Neviem, vpravo Viem (zmeníš v Nastaveniach)</dd><dt>Podrž</dt><dd>rýchla ponuka, potiahni na ikonu</dd><dt>Učiť sa</dt><dd>časť kapitoly ohodnoť: Nové alebo Ťažké – pojmy prídu otvorené a zopakujú sa; Už viem – preskočia sa</dd></dl>" +
      '<button type="button" class="kt-btn pri">Začať</button>';
    d.querySelector("button").onclick = function () { S.set.intro = 1; save(); d.remove(); };
    app.appendChild(d);
  }
  var rzT;
  window.addEventListener("resize", function () {
    feed.style.scrollSnapType = "none";
    pager.style.scrollSnapType = "none";
    feed.scrollTop = idx * H();
    pager.scrollLeft = tab * PW();
    clearTimeout(rzT);
    rzT = setTimeout(function () {
      feed.scrollTop = idx * H();
      pager.scrollLeft = tab * PW();
      feed.style.scrollSnapType = "";
      pager.style.scrollSnapType = "";
      for (var i = Math.max(0, idx - WINDOW); i <= Math.min(F.length - 1, idx + WINDOW); i++) if (F[i].open && feed.children[i].firstChild) fit(feed.children[i]);
    }, 120);
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) counts(); });

  var q = new URLSearchParams(location.search).get("kap");
  if (q !== null) onlyCh = D.ch.findIndex(function (c) { return c.n === q || c.s === q; });
  buildSeq();
  extend();
  paint();
  counts();
  chipOnly();
  renderPanes();
  intro();
  window.PF_KARTY_APP = {
    state: function () { return S; }, items: function () { return F; }, index: function () { return idx; },
    goTo: goTo, mark: mark, reveal: reveal, fit: fit, sizeTitle: sizeTitle, goTab: goTab, tab: function () { return tab; }, setOnly: setOnly, only: function () { return onlyCh; }
  };

  /* vrstva Flows v knihe (assets/js/karty-flow.js) */
  if (EMBED) {
    app.classList.add("kt-off");   // skrytá vrstva nehýbe pozadím kariet
    $("ktBack").addEventListener("click", function (e) { e.preventDefault(); toHost({ pf: "flow-close" }); });
    window.addEventListener("message", function (e) {
      var d = e.data;
      if (e.source !== window.parent || !d || typeof d !== "object") return;
      if (d.pf === "flow-filter") setOnly(d.kap || null);
      else if (d.pf === "flow-rail") document.documentElement.classList.toggle("kt-inrail", !!d.on);   // Flows ležia v posuvníku čítačky (karty-flow.js)
      else if (d.pf === "flow-key") {   // kláves stlačený mimo rámu appky
        try { feed.focus({ preventScroll: true }); } catch (x) {}
        document.dispatchEvent(new KeyboardEvent("keydown", { key: d.key, bubbles: true, cancelable: true }));
      }
      else if (d.pf === "flow-shown") {
        app.classList.toggle("kt-off", !d.on);
        if (d.on) { counts(); try { feed.focus({ preventScroll: true }); } catch (x) {} }
      }
    });
    /* mobil: kniha leží vľavo od Flows – ťah doprava na záložke Flow ju vráti (Flows ide za prstom, ťahá hostiteľ).
       Trieda kt-edge zakáže prehliadaču posun prstom doprava (pan-right = obsah doprava, prst doľava), aby ťah prišiel sem. */
    var syncEdge = function () { app.classList.toggle("kt-edge", tab === 0 && pager.scrollLeft <= 1); };
    pager.addEventListener("scroll", syncEdge, { passive: true });
    syncEdge();
    var EG = null;
    var edgeBlocked = function (t) {
      return document.documentElement.classList.contains("kt-inrail") ||   // ťah doprava sa podá posuvníku čítačky – robí ho prehliadač
        !t || !t.closest || !!t.closest('input,textarea,select,.kt-sheet,.kt-radial,.kt-zoom,.kt-intro') || RAD || zoomEl ||
        !$("ktSheet").hidden || tab !== 0 || pager.scrollLeft > 1;
    };
    app.addEventListener("touchstart", function (e) {
      EG = null;
      if (e.touches.length !== 1) return;
      var t = e.touches[0];
      if (t.clientX > window.innerWidth - 22 || edgeBlocked(e.target)) return;   // pravý okraj patrí systémovému Späť
      EG = { x: t.clientX, y: t.clientY, on: false, lx: t.clientX, lt: e.timeStamp, v: 0 };
    }, { passive: true });
    app.addEventListener("touchmove", function (e) {
      if (!EG) return;
      if (e.touches.length !== 1 || RAD) { if (EG.on) toHost({ pf: "flow-drag", ph: "cancel" }); EG = null; return; }
      var t = e.touches[0], dx = t.clientX - EG.x, dy = t.clientY - EG.y;
      if (!EG.on) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) { EG = null; return; }
        if (dx < -12) { EG = null; return; }
        if (dx < 12 || dx < Math.abs(dy) * 1.5) return;
        EG.on = true;
        EG.x = t.clientX;
        cancelHold();
        toHost({ pf: "flow-drag", ph: "start" });
        return;
      }
      if (e.timeStamp > EG.lt) EG.v = .7 * ((t.clientX - EG.lx) / (e.timeStamp - EG.lt)) + .3 * EG.v;
      EG.lx = t.clientX; EG.lt = e.timeStamp;
      toHost({ pf: "flow-drag", ph: "move", dx: t.clientX - EG.x });
    }, { passive: true });
    app.addEventListener("touchend", function (e) {
      if (!EG) return;
      var g = EG;
      EG = null;
      if (!g.on) return;
      dragged = true;
      setTimeout(function () { dragged = false; }, 90);
      toHost({ pf: "flow-drag", ph: "end", dx: e.changedTouches[0].clientX - g.x, v: e.timeStamp - g.lt > 90 ? 0 : g.v });
    }, { passive: true });
    app.addEventListener("touchcancel", function () {
      if (EG && EG.on) toHost({ pf: "flow-drag", ph: "cancel" });
      EG = null;
    }, { passive: true });
    toHost({ pf: "flow-ready" });
  }
})();

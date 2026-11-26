/* SPDX-License-Identifier: MIT
   ══════════════════════════════════════════════════════════════════════════
   karty-fsrs.js — plánovač opakovania v odstupoch (bez závislostí; prehliadač aj Node)

   Vlastná implementácia v JavaScripte podľa otvoreného algoritmu FSRS (Free Spaced Repetition
   Scheduler). Vzorce a predvolené parametre sú z referenčnej knižnice py-fsrs
   (github.com/open-spaced-repetition/py-fsrs), ktorá je pod licenciou MIT:

     Copyright (c) 2022 Open Spaced Repetition

   Tento súbor je pod licenciou MIT (úplné znenie: assets/js/karty-LICENSE.txt). Nie je odvodený
   z kódu aplikácie Anki a projekt nie je spojený s Anki ani s Open Spaced Repetition.

   Model pamäti: každá karta má
     s  stabilitu   – za koľko dní klesne pravdepodobnosť vybavenia na 90 %,
     d  obťažnosť   – 1 až 10, určuje, ako rýchlo stabilita rastie.
   Hodnotenie: 1 = Neviem, 2 = Ťažké, 3 = Viem, 4 = Ľahké.
   Stavy karty: 0 nová, 1 učí sa, 2 opakuje sa, 3 znova sa učí.
   ══════════════════════════════════════════════════════════════════════════ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PF_FSRS = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var W = [0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666, 0.796,
    1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542];
  var MIN = 60000, DAY = 86400000, S_MIN = 0.001;
  var NEW = 0, LEARNING = 1, REVIEW = 2, RELEARNING = 3;
  var AGAIN = 1, HARD = 2, GOOD = 3, EASY = 4;
  var FUZZ = [[2.5, 7, 0.15], [7, 20, 0.1], [20, Infinity, 0.05]];

  function clamp(x, a, b) { return Math.min(b, Math.max(a, x)); }

  function create(options) {
    var o = options || {};
    var w = o.w || W;
    var retention = o.retention || 0.9;
    var maxIvl = o.maxInterval || 36500;
    var learning = o.learning || [1, 10];       // minúty
    var relearning = o.relearning || [10];      // minúty
    var fuzz = o.fuzz !== false;
    var random = o.random || Math.random;
    var DECAY = -w[20];
    var FACTOR = Math.pow(0.9, 1 / DECAY) - 1;

    function retrievability(card, now) {
      if (!card.last || card.s == null) return 0;
      var days = Math.max(0, Math.floor((now - card.last) / DAY));
      return Math.pow(1 + FACTOR * days / card.s, DECAY);
    }
    function interval(s) {
      var i = Math.round((s / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1));
      return clamp(i, 1, maxIvl);
    }
    function d0(g) { return w[4] - Math.exp(w[5] * (g - 1)) + 1; }
    function nextD(d, g) {
      var delta = -w[6] * (g - 3);
      var damped = d + (10 - d) * delta / 9;
      return clamp(w[7] * d0(EASY) + (1 - w[7]) * damped, 1, 10);
    }
    function shortS(s, g) {
      var inc = Math.exp(w[17] * (g - 3 + w[18])) * Math.pow(s, -w[19]);
      if (g >= HARD) inc = Math.max(inc, 1);
      return Math.max(S_MIN, s * inc);
    }
    function recallS(s, d, r, g) {
      var hard = g === HARD ? w[15] : 1, easy = g === EASY ? w[16] : 1;
      return Math.max(S_MIN, s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) *
        (Math.exp((1 - r) * w[10]) - 1) * hard * easy));
    }
    function forgetS(s, d, r) {
      var long = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]);
      return Math.max(S_MIN, Math.min(long, s / Math.exp(w[17] * w[18])));
    }
    function memory(c, g, now) {
      if (c.s == null || c.d == null) { c.s = Math.max(S_MIN, w[g - 1]); c.d = clamp(d0(g), 1, 10); return; }
      var sameDay = c.last != null && Math.floor((now - c.last) / DAY) < 1;
      var r = retrievability(c, now);
      c.s = sameDay ? shortS(c.s, g) : (g === AGAIN ? forgetS(c.s, c.d, r) : recallS(c.s, c.d, r, g));
      c.d = nextD(c.d, g);
    }
    function fuzzed(days) {
      if (!fuzz || days < 2.5) return days;
      var delta = 1;
      FUZZ.forEach(function (f) { delta += f[2] * Math.max(Math.min(days, f[1]) - f[0], 0); });
      var lo = Math.max(2, Math.round(days - delta)), hi = Math.min(Math.round(days + delta), maxIvl);
      lo = Math.min(lo, hi);
      return Math.min(Math.floor(random() * (hi - lo + 1) + lo), maxIvl);
    }

    /* vráti NOVÝ záznam karty; vstup nemení (návrat o krok späť je tak triviálny) */
    function review(card, g, now) {
      var c = { st: card.st || NEW, step: card.st ? (card.step || 0) : 0, s: card.s, d: card.d, last: card.last,
        reps: (card.reps || 0) + 1, lapses: card.lapses || 0 };
      if (c.st === NEW) c.st = LEARNING;
      var was = c.st;
      memory(c, g, now);
      var waitMin = null, days = null;
      if (was === REVIEW) {
        if (g === AGAIN) {
          c.lapses++;
          if (relearning.length) { c.st = RELEARNING; c.step = 0; waitMin = relearning[0]; }
          else days = interval(c.s);
        } else days = interval(c.s);
      } else {
        var steps = was === LEARNING ? learning : relearning;
        if (!steps.length || (c.step >= steps.length && g >= HARD)) { c.st = REVIEW; days = interval(c.s); }
        else if (g === AGAIN) { c.step = 0; waitMin = steps[0]; }
        else if (g === HARD) {
          waitMin = c.step === 0 ? (steps.length === 1 ? steps[0] * 1.5 : (steps[0] + steps[1]) / 2) : steps[c.step];
        } else if (g === GOOD) {
          if (c.step + 1 === steps.length) { c.st = REVIEW; days = interval(c.s); }
          else { c.step++; waitMin = steps[c.step]; }
        } else { c.st = REVIEW; days = interval(c.s); }
      }
      if (c.st === REVIEW) { c.step = 0; days = fuzzed(days); c.due = now + days * DAY; c.ivl = days; }
      else { c.due = now + waitMin * MIN; c.ivl = 0; }
      c.last = now;
      return c;
    }

    function preview(card, now) {
      var out = {};
      [AGAIN, HARD, GOOD, EASY].forEach(function (g) { out[g] = review(card, g, now); });
      return out;
    }

    return { review: review, preview: preview, retrievability: retrievability, interval: interval };
  }

  /* „10 min“, „3 d“, „2 mes.“, „1,5 r.“ – text pod tlačidlom hodnotenia */
  function label(ms) {
    var min = Math.round(ms / MIN);
    if (min < 60) return Math.max(1, min) + " min";
    if (min < 1440) return Math.round(min / 60) + " h";
    var d = Math.round(ms / DAY);
    if (d < 31) return d + " d";
    if (d < 365) return Math.round(d / 30.4) + " mes.";
    return (Math.round(d / 36.5) / 10).toString().replace(".", ",") + " r.";
  }

  return { create: create, label: label, W: W, NEW: NEW, LEARNING: LEARNING, REVIEW: REVIEW, RELEARNING: RELEARNING,
    AGAIN: AGAIN, HARD: HARD, GOOD: GOOD, EASY: EASY };
});

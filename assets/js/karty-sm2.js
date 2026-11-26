/* SPDX-License-Identifier: MIT (assets/js/karty-LICENSE.txt)
   ══════════════════════════════════════════════════════════════════════════
   karty-sm2.js — plánovač v štýle predvolených nastavení Anki (variant algoritmu SM-2)

   Vlastná implementácia podľa verejne opísaného správania. Kód aplikácie Anki sa nepreberá;
   výsledky sú porovnané so skutočným Anki ako s čiernou skrinkou (dev/karty-anki-test).
   Algorithm SM-2, (C) Copyright SuperMemo World, 1991. www.supermemo.com

   Predvolené hodnoty:
     učenie 1 min → 10 min → 1 deň · „Ľahké“ pri učení 4 dni · znova učenie 10 min
     začiatočná ľahkosť 2,5 (najmenej 1,3) · Ťažké ×1,2 a −0,15 · Neviem −0,20 · Ľahké ×1,3 a +0,15
   Deň sa láme o 4:00. Hodnotenie: 1 Neviem, 2 Ťažké, 3 Viem, 4 Ľahké.
   Stavy: 0 nová, 1 učí sa, 2 opakuje sa, 3 znova sa učí.
   ══════════════════════════════════════════════════════════════════════════ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PF_SM2 = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  var MIN = 60000, DAY = 86400000, ROLL = 4 * 3600000;
  var NEW = 0, LEARNING = 1, REVIEW = 2, RELEARNING = 3;
  var FUZZ = [[2.5, 7, 0.15], [7, 20, 0.1], [20, Infinity, 0.05]];

  function dayIndex(t) {
    var d = new Date(t - ROLL);
    return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY);
  }
  function dayStart(i) {
    var d = new Date(i * DAY);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 4).getTime();
  }
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function fuzzRange(days, minimum, maxIvl) {
    if (days < 2.5) { var x = Math.max(Math.round(days), minimum); return [x, x]; }
    var delta = 1;
    FUZZ.forEach(function (f) { delta += f[2] * Math.max(Math.min(days, f[1]) - f[0], 0); });
    var lo = Math.max(2, Math.round(days - delta)), hi = Math.round(days + delta);
    lo = Math.min(Math.max(lo, minimum), maxIvl);
    hi = Math.min(Math.max(hi, lo), maxIvl);
    if (hi === lo && hi > 2 && hi < maxIvl) hi = lo + 1;   // aj pri tesnej spodnej hranici ostanú dve možnosti
    return [lo, hi];
  }

  function create(options) {
    var o = options || {};
    var learning = o.learning || [1, 10], relearning = o.relearning || [10];
    var gradGood = o.graduatingGood || 1, gradEasy = o.graduatingEasy || 4;
    var startEase = o.startEase || 2.5, minEase = 1.3, easyBonus = o.easyBonus || 1.3, hardMult = o.hardMultiplier || 1.2;
    var lapseMult = o.lapseMultiplier || 0, minIvl = o.minInterval || 1, maxIvl = o.maxInterval || 36500;
    var useFuzz = o.fuzz !== false;

    function passing(x, minimum, u) {
      var r = fuzzRange(x, minimum, maxIvl);
      return useFuzz ? r[0] + Math.floor(u * (r[1] - r[0] + 1)) : r[0] === r[1] ? r[0] : Math.min(r[1], Math.max(r[0], Math.round(x)));
    }
    function hardWait(steps, i) {
      if (i > 0) return steps[i];
      if (steps.length > 1) return (steps[0] + steps[1]) / 2;
      return Math.min(steps[0] * 1.5, steps[0] + 1440);
    }

    function review(card, g, now, key) {
      var st = card.st || NEW;
      var c = { st: st === NEW ? LEARNING : st, step: st ? (card.step || 0) : 0, e: card.e || startEase, ivl: card.ivl || 0,
        reps: (card.reps || 0) + 1, lapses: card.lapses || 0, last: now };
      var today = dayIndex(now), u = (hash(String(key || "") + ":" + c.reps) % 100000) / 100000;
      var wait = null, days = null;

      if (c.st === REVIEW) {
        var late = Math.max(0, today - dayIndex(card.due || now)), cur = c.ivl || 1;
        if (g === 1) {
          c.e = Math.max(minEase, c.e - 0.2);
          c.lapses++;
          c.ivl = Math.min(maxIvl, Math.max(minIvl, Math.round(cur * lapseMult)));
          if (relearning.length) { c.st = RELEARNING; c.step = 0; wait = relearning[0]; }
          else days = c.ivl;
        } else {
          var hard = passing(cur * hardMult, cur + 1, u);
          var good = passing((cur + late / 2) * c.e, hard + 1, u);
          var easy = passing((cur + late) * c.e * easyBonus, good + 1, u);
          days = g === 2 ? hard : g === 3 ? good : easy;
          c.e = g === 2 ? Math.max(minEase, c.e - 0.15) : g === 4 ? c.e + 0.15 : c.e;
        }
      } else {
        var steps = c.st === LEARNING ? learning : relearning, grad = null;
        if (g === 1) { c.step = 0; wait = steps[0]; }
        else if (g === 2) wait = hardWait(steps, c.step);
        else if (g === 3) {
          if (c.step + 1 < steps.length) { c.step++; wait = steps[c.step]; }
          else grad = c.st === LEARNING ? passing(gradGood, minIvl, u) : Math.max(c.ivl, minIvl);
        } else grad = c.st === LEARNING ? passing(gradEasy, gradGood + 1, u) : Math.max(c.ivl, minIvl) + 1;
        if (grad !== null) days = grad;
      }

      if (days !== null) {
        c.st = REVIEW; c.step = 0; c.ivl = days;
        c.due = dayStart(today + days);
      } else c.due = now + wait * MIN;
      c.e = Math.round(c.e * 1000) / 1000;
      return c;
    }
    function preview(card, now, key) {
      var out = {};
      [1, 2, 3, 4].forEach(function (g) { out[g] = review(card, g, now, key); });
      return out;
    }
    return { review: review, preview: preview };
  }

  return { create: create, dayIndex: dayIndex, dayStart: dayStart, fuzzRange: fuzzRange,
    NEW: NEW, LEARNING: LEARNING, REVIEW: REVIEW, RELEARNING: RELEARNING };
});

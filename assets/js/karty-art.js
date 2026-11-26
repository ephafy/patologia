/* SPDX-License-Identifier: MIT (assets/js/karty-LICENSE.txt)
   karty-art.js — každá karta má vlastné pozadie, vypočítané z jej id (rovnaká karta = rovnaký obraz).
   Bez obrázkov a knižníc: prechody, vlastné SVG vzory, tvary a emoji písma zariadenia. */
(function (root) {
  "use strict";

  /* tmavé palety: biely text na nich má vždy kontrast aspoň 4,5 : 1 (stráži dev/karty-test.json) */
  var PAL = [
    ["#2b1055", "#7a1f6d", "#0d0a2c"], ["#06343f", "#0d6e6e", "#07202b"], ["#3d0c2e", "#8c1d40", "#1a0716"], ["#102a56", "#1d5fa8", "#081631"],
    ["#3a1c05", "#8f4a0b", "#1a0d03"], ["#0b3a26", "#14724a", "#06201a"], ["#2d0a4e", "#5b2bbd", "#120626"], ["#47101a", "#a3282f", "#1d060b"],
    ["#0a2f4f", "#0f7396", "#061a2d"], ["#33240a", "#7d6010", "#191204"], ["#1b1f4b", "#3f46b8", "#0c0e29"], ["#3f0f45", "#a12c84", "#1b0820"],
    ["#07382f", "#0e8070", "#04201c"], ["#431407", "#a43e12", "#200a04"], ["#1e293b", "#475a7d", "#0d1421"], ["#3b0764", "#8b2fc9", "#1a0430"],
    ["#0c3b2e", "#4c7a12", "#071f18"], ["#4a0e2b", "#b0265e", "#220615"], ["#082f49", "#0369a1", "#04192a"], ["#422006", "#a15c07", "#1f0f03"],
    ["#14213d", "#7a3e9d", "#0a1122"], ["#16302b", "#2f7d6b", "#0a1a17"], ["#3c1642", "#086375", "#190a1c"], ["#2a0a18", "#7b2d8b", "#14050c"],
    ["#0f2027", "#2c5364", "#091418"], ["#23074d", "#b0184f", "#100326"], ["#093028", "#237a57", "#051b16"], ["#41295a", "#2f0743", "#1b1026"],
    ["#1f1c2c", "#5b5393", "#0e0c16"], ["#3e1f00", "#96341a", "#1c0e00"], ["#00303f", "#5d3a9b", "#00181f"], ["#2c0735", "#c0264f", "#150319"]
  ];
  var ACC = ["#ffd166", "#7ae7c7", "#ff9ecf", "#8ecbff", "#c9b6ff", "#ffb077", "#b6f09c", "#f7f06d", "#7fe0ff", "#ffa8a8"];

  /* témy podľa textu karty: len na výber emoji, nikdy nenesú informáciu */
  var THEMES = [
    [/kazuist|pacient|ročn/i, ["🩺", "🧑‍⚕️", "📋"]],
    [/srd[cž]|myokard|infarkt|koronár|endokard|perikard|kardi/i, ["🫀", "💓", "❤️‍🩹"]],
    [/pľúc|bronch|pneum|alveol|dych|pleur|tuberkul/i, ["🫁", "🌬️"]],
    [/mozg|neur|nerv|demenc|alzheimer|parkinson|meningo|glia/i, ["🧠", "⚡"]],
    [/krv|trombo|erytro|anémi|hemo|fibrín|koagul|doštič|embol/i, ["🩸", "💉"]],
    [/baktér|bacil|kok[yo]|mykobakt|lepra|syfil|trepon|sepsa|klostrid|infekc/i, ["🦠", "🧫"]],
    [/vírus|virus|hpv|hbv|hcv|ebv/i, ["🦠", "🧬"]],
    [/huba|mykóz|kvasink|aspergil|kandid/i, ["🍄", "🧫"]],
    [/parazit|echinok|schistos|motolic|helmint/i, ["🪱", "🔎"]],
    [/gén|mutác|chromozóm|dna\b|onkogén|supresor|dedičn|translok/i, ["🧬", "🔗"]],
    [/nádor|karcin|sarkóm|lymfóm|melanóm|-óm\b|malígn|metast/i, ["🎯", "🦀", "🔬"]],
    [/kosť|kostn|osteo|chrupk|chondro|kĺb/i, ["🦴"]],
    [/oblič|nefr|glomerul|moč/i, ["🫘", "💧"]],
    [/pečeň|hepat|cirhóz|žlč|bilirub/i, ["🍂", "🟤"]],
    [/črev|žalúd|pažerák|gastr|kolit|crohn/i, ["🌀", "🍽️"]],
    [/kož|derm|epiderm|keratin/i, ["🧴", "🖐️"]],
    [/oko|očn|sietnic|zrenič/i, ["👁️"]],
    [/zub|ústn|jazyk/i, ["🦷"]],
    [/zápal|flegmón|absces|hnis|exsud|horúčk/i, ["🔥", "🌡️"]],
    [/hojen|jazv|regener|reparác|granulačn/i, ["🩹", "🌱"]],
    [/nekróz|gangrén|smrť|apoptóz|posmrt|mortis/i, ["💀", "🥀"]],
    [/tuk|lipid|steatóz|xantóm|cholesterol/i, ["🧈", "🫧"]],
    [/cukor|glukóz|glykogén|diabet/i, ["🍬", "🍯"]],
    [/železo|hemosider|siderot/i, ["🧲", "🟫"]],
    [/vápn|kalcifik/i, ["🪨"]],
    [/amyloid|hyalín|dystrof/i, ["🧊", "🕸️"]],
    [/žiaren|uv\b|radiác|radon/i, ["☢️", "☀️"]],
    [/alkohol|etanol/i, ["🍷"]],
    [/fajč|dym|azbest/i, ["🚬", "🌫️"]],
    [/hormón|štítn|nadoblič|hypofýz|estrogén/i, ["⚗️", "🧪"]],
    [/farben|reakci|činidl|mikroskop|imunohist/i, ["🔬", "🧪", "🎨"]],
    [/imun|protilát|lymfocyt|autoimun|makrofág/i, ["🛡️", "⚔️"]],
    [/tehot|plod|novoroden|dojč|dieť/i, ["🤰", "👶"]],
    [/liek|inhibítor|terap|liečb/i, ["💊"]],
    [/cievy|ciev|aneuryz|ateroskl|vaskul|tepn/i, ["🩸", "〰️"]]
  ];
  var GENERIC = ["💡", "🧩", "🔍", "✨", "🧠", "📌", "🧭", "🗝️", "🎲", "🪄"];
  var KIND_EMOJI = { q: ["🤔", "❓", "🧩", "💭"], e: ["🎩", "🏛️", "🖋️", "📜", "👤"], l: ["🏺", "📜", "🏛️"] };

  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function n(x) { return Math.round(x * 10) / 10; }

  /* ── vzory v plátne 400 × 800 ── */
  var P = {
    rings: function (r, c) {
      var x = r() * 400, y = r() * 800, o = "";
      for (var i = 1; i < 11; i++) o += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + i * (34 + r() * 8) + '" fill="none" stroke="' + c + '" stroke-width="' + n(.7 + r() * 1.8) + '" opacity="' + n(.34 - i * .022) + '"/>';
      return o;
    },
    dots: function (r, c) {
      var s = 22 + r() * 22, o = "", k = r() * 6;
      for (var y = 0; y < 820; y += s) for (var x = 0; x < 420; x += s) {
        var w = Math.sin(x / 70 + k) * Math.cos(y / 90 + k);
        o += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(1.2 + 3.2 * Math.abs(w)) + '" fill="' + c + '" opacity="' + n(.08 + .24 * Math.abs(w)) + '"/>';
      }
      return o;
    },
    waves: function (r, c) {
      var o = "", a = 16 + r() * 34, f = 60 + r() * 90, ph = r() * 7;
      for (var j = 0; j < 15; j++) {
        var d = "M-10 " + n(j * 58), y0 = j * 58;
        for (var x = 0; x <= 420; x += 20) d += "L" + x + " " + n(y0 + a * Math.sin(x / f + ph + j * .42));
        o += '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="1.5" opacity="' + n(.08 + j * .014) + '"/>';
      }
      return o;
    },
    poly: function (r, c) {
      var o = "", s = 96;
      for (var y = -s; y < 820; y += s) for (var x = -s; x < 420; x += s) {
        var a = [x + r() * 22, y + r() * 22], b = [x + s + r() * 22, y + r() * 22], d = [x + r() * 22, y + s + r() * 22];
        o += '<path d="M' + n(a[0]) + " " + n(a[1]) + "L" + n(b[0]) + " " + n(b[1]) + "L" + n(d[0]) + " " + n(d[1]) + 'Z" fill="' + c + '" opacity="' + n(r() * .13) + '"/>';
      }
      return o;
    },
    hex: function (r, c) {
      var o = "", s = 30 + r() * 16, h = s * Math.sqrt(3), row = 0;
      for (var y = -h; y < 840; y += h / 2, row++) for (var x = row % 2 ? s * 1.5 : 0; x < 440; x += s * 3) {
        var p = "";
        for (var i = 0; i < 6; i++) p += (i ? "L" : "M") + n(x + s * Math.cos(i * Math.PI / 3)) + " " + n(y + s * Math.sin(i * Math.PI / 3));
        var f = r();
        o += '<path d="' + p + 'Z" fill="' + (f > .86 ? c : "none") + '" fill-opacity=".16" stroke="' + c + '" stroke-opacity=".2"/>';
      }
      return o;
    },
    cells: function (r, c) {
      var o = "";
      for (var i = 0; i < 24; i++) {
        var x = r() * 400, y = r() * 800, q = 18 + r() * 66;
        o += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(q) + '" fill="' + c + '" fill-opacity="' + n(.03 + r() * .07) + '" stroke="' + c + '" stroke-opacity=".28"/>' +
          '<circle cx="' + n(x + q * (r() - .5) * .7) + '" cy="' + n(y + q * (r() - .5) * .7) + '" r="' + n(q * (.18 + r() * .16)) + '" fill="' + c + '" opacity=".26"/>';
      }
      return o;
    },
    stripes: function (r, c) {
      var o = "", g = 26 + r() * 42, t = r() > .5 ? 1 : -1;
      for (var i = -900; i < 1300; i += g) o += '<path d="M' + i + " 0L" + n(i + t * 800) + ' 800" stroke="' + c + '" stroke-width="' + n(2 + r() * 13) + '" opacity="' + n(.04 + r() * .1) + '"/>';
      return o;
    },
    rays: function (r, c) {
      var o = "", x = r() * 400, y = r() > .5 ? -20 : 820, m = 15 + Math.floor(r() * 14);
      for (var i = 0; i < m; i++) {
        var a = i / m * Math.PI * 2, b = a + Math.PI / m * .55;
        o += '<path d="M' + n(x) + " " + n(y) + "L" + n(x + 1200 * Math.cos(a)) + " " + n(y + 1200 * Math.sin(a)) + "L" + n(x + 1200 * Math.cos(b)) + " " + n(y + 1200 * Math.sin(b)) + 'Z" fill="' + c + '" opacity=".09"/>';
      }
      return o;
    },
    helix: function (r, c) {
      var o = "", x0 = 70 + r() * 260, a = 52 + r() * 40, f = 34 + r() * 16, ph = r() * 6, d1 = "", d2 = "";
      for (var y = -20; y <= 820; y += 8) {
        var s = Math.sin(y / f + ph);
        d1 += (d1 ? "L" : "M") + n(x0 + a * s) + " " + y;
        d2 += (d2 ? "L" : "M") + n(x0 - a * s) + " " + y;
        if (y % 24 === 4) o += '<path d="M' + n(x0 + a * s) + " " + y + "L" + n(x0 - a * s) + " " + y + '" stroke="' + c + '" stroke-width="2.4" opacity=".26"/>';
      }
      return o + '<path d="' + d1 + '" fill="none" stroke="' + c + '" stroke-width="3" opacity=".5"/><path d="' + d2 + '" fill="none" stroke="' + c + '" stroke-width="3" opacity=".3"/>';
    },
    ecg: function (r, c) {
      var o = "";
      for (var j = 0; j < 5; j++) {
        var y = 90 + j * 165 + r() * 30, x = -20, d = "M-20 " + n(y);
        while (x < 430) {
          var g = 34 + r() * 42;
          d += "L" + n(x += g) + " " + n(y) + "l7 -13l7 13l6 0l5 18l9 -" + (64 + Math.floor(r() * 26)) + "l9 " + (74 + Math.floor(r() * 18)) + "l6 -" + 18 + "l14 -9l9 9";
          x += 72;
        }
        o += '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="1.8" stroke-linejoin="round" opacity="' + n(.12 + j * .045) + '"/>';
      }
      return o;
    },
    orbit: function (r, c) {
      var x = 60 + r() * 280, y = 120 + r() * 520, o = '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="15" fill="' + c + '" opacity=".6"/>', m = 3 + Math.floor(r() * 3);
      for (var i = 0; i < m; i++) {
        var a = i * 180 / m + r() * 22, rx = 130 + r() * 110;
        o += '<g transform="rotate(' + n(a) + " " + n(x) + " " + n(y) + ')"><ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + n(rx) + '" ry="' + n(rx * .34) + '" fill="none" stroke="' + c + '" stroke-width="1.6" opacity=".38"/><circle cx="' + n(x + rx) + '" cy="' + n(y) + '" r="6" fill="' + c + '" opacity=".8"/></g>';
      }
      return o;
    },
    blobs: function (r, c) {
      var o = "";
      for (var k = 0; k < 4; k++) {
        var x = r() * 400, y = r() * 800, q = 90 + r() * 120, m = 9, pts = [], d = "";
        for (var i = 0; i < m; i++) { var a = i / m * Math.PI * 2, w = q * (.72 + r() * .5); pts.push([x + w * Math.cos(a), y + w * Math.sin(a)]); }
        for (var j = 0; j < m; j++) {
          var p = pts[j], u = pts[(j + 1) % m], mid = [(p[0] + u[0]) / 2, (p[1] + u[1]) / 2];
          d += (j ? "" : "M" + n((pts[m - 1][0] + p[0]) / 2) + " " + n((pts[m - 1][1] + p[1]) / 2)) + "Q" + n(p[0]) + " " + n(p[1]) + " " + n(mid[0]) + " " + n(mid[1]);
        }
        o += '<path d="' + d + 'Z" fill="' + c + '" opacity="' + n(.07 + r() * .11) + '"/>';
      }
      return o;
    },
    plus: function (r, c) {
      var o = "", s = 44 + r() * 22;
      for (var y = 12; y < 820; y += s) for (var x = 12; x < 420; x += s) {
        if (r() < .3) continue;
        var q = 3 + r() * 6;
        o += '<path d="M' + n(x - q) + " " + n(y) + "H" + n(x + q) + "M" + n(x) + " " + n(y - q) + "V" + n(y + q) + '" stroke="' + c + '" stroke-width="2" opacity="' + n(.1 + r() * .24) + '"/>';
      }
      return o;
    },
    arcs: function (r, c) {
      var o = "", s = 62 + r() * 34;
      for (var y = -s; y < 840; y += s) for (var x = -s; x < 440; x += s) {
        var t = Math.floor(r() * 4) * 90;
        o += '<g transform="rotate(' + t + " " + n(x + s / 2) + " " + n(y + s / 2) + ')" fill="none" stroke="' + c + '" stroke-width="2" opacity=".2"><path d="M' + n(x) + " " + n(y + s / 2) + "A" + n(s / 2) + " " + n(s / 2) + " 0 0 0 " + n(x + s / 2) + " " + n(y) + '"/><path d="M' + n(x + s) + " " + n(y + s / 2) + "A" + n(s / 2) + " " + n(s / 2) + " 0 0 0 " + n(x + s / 2) + " " + n(y + s) + '"/></g>';
      }
      return o;
    },
    drops: function (r, c) {
      var o = "";
      for (var i = 0; i < 26; i++) {
        var x = r() * 400, y = r() * 800, q = 8 + r() * 24;
        o += '<path d="M' + n(x) + " " + n(y - q * 1.5) + "C" + n(x + q) + " " + n(y - q * .3) + " " + n(x + q) + " " + n(y + q) + " " + n(x) + " " + n(y + q) + "C" + n(x - q) + " " + n(y + q) + " " + n(x - q) + " " + n(y - q * .3) + " " + n(x) + " " + n(y - q * 1.5) + 'Z" fill="' + c + '" opacity="' + n(.07 + r() * .2) + '"/>';
      }
      return o;
    },
    grid: function (r, c) {
      var o = "", s = 40 + r() * 32;
      for (var x = 0; x < 420; x += s) o += '<path d="M' + n(x) + ' 0V800" stroke="' + c + '" opacity=".12"/>';
      for (var y = 0; y < 820; y += s) o += '<path d="M0 ' + n(y) + 'H400" stroke="' + c + '" opacity=".12"/>';
      for (var i = 0; i < 12; i++) o += '<rect x="' + n(Math.floor(r() * 8) * s) + '" y="' + n(Math.floor(r() * 16) * s) + '" width="' + n(s) + '" height="' + n(s) + '" fill="' + c + '" opacity="' + n(.06 + r() * .16) + '"/>';
      return o;
    },
    stars: function (r, c) {
      var o = "", pts = [];
      for (var i = 0; i < 34; i++) { pts.push([r() * 400, r() * 800]); o += '<circle cx="' + n(pts[i][0]) + '" cy="' + n(pts[i][1]) + '" r="' + n(1 + r() * 2.6) + '" fill="' + c + '" opacity="' + n(.4 + r() * .5) + '"/>'; }
      for (var j = 0; j < pts.length; j++) for (var k = j + 1; k < pts.length; k++) {
        var dx = pts[j][0] - pts[k][0], dy = pts[j][1] - pts[k][1];
        if (dx * dx + dy * dy < 7600) o += '<path d="M' + n(pts[j][0]) + " " + n(pts[j][1]) + "L" + n(pts[k][0]) + " " + n(pts[k][1]) + '" stroke="' + c + '" opacity=".2"/>';
      }
      return o;
    },
    petals: function (r, c) {
      var x = r() * 400, y = r() * 800, m = 10 + Math.floor(r() * 12), q = 190 + r() * 150, o = "";
      for (var i = 0; i < m; i++) o += '<ellipse cx="' + n(x) + '" cy="' + n(y - q / 2) + '" rx="' + n(q * .17) + '" ry="' + n(q / 2) + '" transform="rotate(' + n(i * 360 / m) + " " + n(x) + " " + n(y) + ')" fill="' + c + '" fill-opacity=".05" stroke="' + c + '" stroke-opacity=".26"/>';
      return o;
    }
  };
  var NAMES = Object.keys(P);
  var PREF = [[/🧬|🔗/, "helix"], [/🫀|💓/, "ecg"], [/🩸|💧/, "drops"], [/🦠|🧫/, "cells"], [/⚡|🧠/, "stars"], [/🔥/, "rays"], [/🛡️/, "hex"], [/🔬|🧪/, "orbit"]];

  /* pohyb pozadia: každý vzor má vlastný druh, karta z neho dostane vlastné tempo, smer a rozsah */
  var MOVES = {
    rings: { sc: 1.12 }, dots: { dx: 4, dy: 5 }, waves: { dx: 5, rt: 1 }, poly: { rt: 3, sc: 1.05 }, hex: { sc: 1.07, dy: 2 },
    cells: { dy: 5, dx: 2 }, stripes: { dx: 5, dy: 3 }, rays: { rt: 5, sc: 1.04 }, helix: { dy: 6 }, blobs: { rt: 4, sc: 1.1 },
    plus: { tw: 1, dx: 2 }, arcs: { rt: 3, sc: 1.04 }, grid: { dx: 4, dy: 4 }, stars: { tw: 1, dy: 2 },
    drops: { rain: 1 }, ecg: { trace: 1 }, orbit: { rot: 1 }, petals: { rot: 1 }
  };
  function vars(m, r, unit) {
    var s = function () { return r() > .5 ? 1 : -1; }, k = .6 + r() * .4, u = unit || "%";
    return "--d:" + n(7 + r() * 11) + "s;--dl:-" + n(r() * 9) + "s;--dx:" + n((m.dx || 0) * k * s()) + u + ";--dy:" + n((m.dy || 0) * k * s()) + u +
      ";--rt:" + n((m.rt || 0) * k * s()) + "deg;--sc:" + n(1 + ((m.sc || 1) - 1) * k) + ";";
  }
  function svgFor(name, body, r) {
    var m = MOVES[name], cls = m.tw ? "tw" : m.rain ? "rain" : m.trace || m.rot ? "" : "mv", style = vars(m, r), c = /cx="([\d.-]+)" cy="([\d.-]+)"/.exec(body);
    if (name === "rings" && c) style += "transform-origin:" + n(12 + c[1] / 4 * .76) + "% " + n(12 + c[2] / 8 * .76) + "%;";
    if (m.trace) body = body.replace(/<path d=/g, function () { return '<path class="kt-tr" pathLength="1" style="--dl:-' + n(r() * 4) + "s;--d:" + n(3 + r() * 3) + 's" d='; });
    if (m.rot) {
      var o = /rotate\([\d.-]+ ([\d.-]+) ([\d.-]+)\)/.exec(body);
      body = '<g class="kt-rot" style="transform-origin:' + (o ? o[1] + "px " + o[2] : "200px 400") + "px;--d:" + n(26 + r() * 34) + "s;--turn:" + (r() > .5 ? 360 : -360) + 'deg">' + body + "</g>";
    }
    return '<svg class="kt-art ' + cls + '" style="' + style + '" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + body + "</svg>";
  }

  function themeOf(c, plain) {
    var t = (c.z ? "kazuistika " : "") + plain(c.f) + " " + plain(c.a);
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i][0].test(t)) return THEMES[i][1];
    return KIND_EMOJI[c.k] || GENERIC;
  }

  /* režimy: nie všetko všade – niekde len farba, inde vzor, veľké emoji, rozsypané emoji alebo obrovské písmeno */
  function art(c) {
    var plain = function (s) { return String(s || "").replace(/<[^>]+>/g, ""); };
    var h = hash(c.i), r = rng(h);
    var pal = PAL[h % PAL.length], acc = ACC[(h >>> 7) % ACC.length];
    var pool = themeOf(c, plain);
    var emo = pool[Math.floor(r() * pool.length)];
    var mode = ["mesh", "vzor", "vzor", "velke", "velke", "vzor+hero", "dazd", "pismeno", "vzor+velke", "vzor+velke", "kuzel", "hero"][Math.floor(r() * 12)];
    var ang = Math.floor(r() * 360);
    var g = [
      "radial-gradient(" + (70 + Math.floor(r() * 70)) + "% " + (45 + Math.floor(r() * 40)) + "% at " + Math.floor(r() * 100) + "% " + Math.floor(r() * 60) + "%," + pal[1] + ",transparent 70%)",
      "radial-gradient(" + (60 + Math.floor(r() * 60)) + "% " + (40 + Math.floor(r() * 40)) + "% at " + Math.floor(r() * 100) + "% " + (45 + Math.floor(r() * 55)) + "%," + pal[0] + ",transparent 72%)",
      "linear-gradient(" + ang + "deg," + pal[2] + "," + pal[0] + ")"
    ];
    if (mode === "kuzel") g = ["conic-gradient(from " + ang + "deg at " + Math.floor(20 + r() * 60) + "% " + Math.floor(15 + r() * 60) + "%," + pal[0] + "," + pal[1] + "," + pal[2] + "," + pal[1] + "," + pal[0] + ")"];
    var html = "", hero = "", motion = mode;
    if (/vzor/.test(mode)) {
      var name = NAMES[Math.floor(r() * NAMES.length)];
      for (var i = 0; i < PREF.length; i++) if (PREF[i][0].test(emo) && r() < .6) name = PREF[i][1];
      motion = name;
      html += svgFor(name, P[name](r, acc), r);
    }
    if (/velke/.test(mode)) {
      html += '<span class="kt-big" style="' + (r() > .5 ? "right" : "left") + ":" + Math.floor(-16 - r() * 16) + "%;" + (r() > .5 ? "top:" + Math.floor(6 + r() * 4) : "bottom:" + Math.floor(9 + r() * 5)) + "%;rotate:" + Math.floor(-24 + r() * 48) + "deg;" + vars({ dx: 12, dy: 16, rt: 7, sc: 1.07 }, r, "px") + '" aria-hidden="true">' + emo + "</span>";
    }
    if (mode === "dazd") {
      for (var k = 0; k < 15; k++) html += '<span class="kt-sc" style="left:' + Math.floor(r() * 96) + "%;top:" + Math.floor(r() * 96) + "%;font-size:" + Math.floor(15 + r() * 34) + "px;rotate:" + Math.floor(r() * 360) + "deg;" + vars({ dx: 9, dy: 14, rt: 16 }, r, "px") + '" aria-hidden="true">' + (r() > .3 ? emo : pool[Math.floor(r() * pool.length)]) + "</span>";
    }
    if (mode === "pismeno") {
      var ch = (plain(c.f).match(/\p{L}/u) || ["?"])[0].toUpperCase();
      html += '<span class="kt-glyph" style="color:' + acc + ";" + (r() > .5 ? "right" : "left") + ":-7%;" + (r() > .5 ? "top:3%" : "bottom:10%") + ";" + vars({ dx: 10, dy: 8, rt: 3, sc: 1.04 }, r, "px") + '" aria-hidden="true">' + ch + "</span>";
    }
    if (/hero/.test(mode)) hero = emo;
    var spin = mode === "kuzel";
    var grad = '<div class="kt-grad' + (spin ? " spin" : "") + '" style="background:' + g.join(",") + ";" + vars({ dx: 5, dy: 6, sc: 1.08 }, r) +
      (spin ? "--d:" + n(34 + r() * 40) + "s;--turn:" + (r() > .5 ? 360 : -360) + "deg;" : "") + '"></div>';
    /* pohyb pozadia pri odkrytí odpovede: priblíženie a k nemu vlastné pootočenie alebo posun */
    var kind = (h >>> 5) % 5, sg = function () { return r() > .5 ? 1 : -1; };
    var openStyle = "--oz:" + n(1.16 + r() * .1) + ";--or:" + (kind === 1 || kind === 4 ? n((2 + r() * 3) * sg()) : 0) + "deg;--ox:" +
      (kind === 2 || kind === 4 ? n((2 + r() * 3) * sg()) : 0) + "%;--oy:" + (kind === 3 ? n((2 + r() * 3) * sg()) : 0) + "%";
    return { bg: g.join(","), openStyle: openStyle, grad: grad, base: pal[2], html: html, hero: hero, heroStyle: vars({ dy: 4, rt: 6, sc: 1.05 }, r, "px"), accent: acc, mode: mode, pal: pal,
      motion: motion, enter: ["pis", "hore", "bok", "vlna", "zoom"][(h >>> 13) % 5] };
  }

  root.PF_KARTY_ART = { art: art, PAL: PAL };
})(window);

/* ══════════════════════════════════════════════════════════════════════
   PF_MATCH — vyhľadávanie pojmov glosára v texte (jeden kód pre prehliadač aj nástroje).

   Používa ho assets/js/glossary.js (značky v kapitole a vo vysvetlivke), tools/build.js
   (riadok „V knihe“) a tools/glossary-audit.js – všetky tri tak značkujú PRESNE rovnako.

   Pravidlá (rovnaké ako pôvodný jeden veľký regulárny výraz, 2. 11. 2026):
   - vzory hesiel (`match`, `csMatch`) sa zoradia od najdlhšieho; na danom mieste vyhrá
     prvý vzor, ktorý sedí → „zárodočné centrum“ vyhrá nad „centrom“,
   - zhoda začína na hranici slova (pred ňou nie je písmeno, číslica ani spojovník)
     a nesmie pokračovať písmenom, číslicou ani spojovníkom,
   - bez rozlíšenia veľkosti písmen; `cs: true` / `csMatch` sa po nájdení overia presne.

   Prečo nie jeden veľký regulárny výraz (zmena 5. 11. 2026): ≈ 2 700 vetiev skúšal
   prehliadač na každom znaku textu. Chrome to zvládol za 0,2 s na kapitolu, Node (build)
   za 11 s – build trval 70 s, hook publish.ps1 prekročil limit a ticho nič neuložil;
   iné prehliadače (Safari) môžu byť rovnako pomalé. Tu sa vzory raz roztriedia podľa
   znaku, ktorým môžu začínať, a na začiatku slova sa skúšajú len tie, ktoré tam môžu
   sedieť (≈ 50–200× rýchlejšie, výsledok rovnaký).
   ══════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var W = "[\\p{L}\\p{N}]";
  function expand(src) { return String(src).replace(/\\w/g, W); }
  var BOUND = /[\p{L}\p{N}\-]/u;
  var TAIL = "(?![\\p{L}\\p{N}\\-])";

  /* znak bez ohľadu na veľkosť (σ/ς/Σ → σ) */
  function fold(c) { return c.toUpperCase().toLowerCase(); }

  /* ── ktorými znakmi môže vzor začínať ─────────────────────────────
     Malý rozbor regulárneho výrazu: vráti {any, set, nul}
       any = môže začínať čímkoľvek (\w, ., [^…], \p{…}) → skúša sa všade,
       set = množina prvých znakov, nul = vzor môže byť aj prázdny. */
  function firstChars(src) {
    var i = 0, n = src.length;
    function add(r, c) { r.set[fold(c)] = 1; }
    function alt() {
      var r = { any: false, set: {}, nul: false }, s;
      for (;;) {
        s = seq();
        if (s.any) r.any = true;
        for (var k in s.set) r.set[k] = 1;
        if (s.nul) r.nul = true;
        if (i < n && src[i] === "|") { i++; continue; }
        return r;
      }
    }
    function seq() {
      var r = { any: false, set: {}, nul: true };
      while (i < n && src[i] !== "|" && src[i] !== ")") {
        var a = atom();
        var q = quant();
        if (q) a.nul = true;
        if (r.nul) {
          if (a.any) r.any = true;
          for (var k in a.set) r.set[k] = 1;
          if (!a.nul) r.nul = false;
        }
      }
      return r;
    }
    /* kvantifikátor za atómom; true = atóm môže chýbať (?, *, {0…}) */
    function quant() {
      var c = src[i], opt = false;
      if (c === "?" || c === "*") { opt = true; i++; }
      else if (c === "+") i++;
      else if (c === "{" && /^\{\d+(,\d*)?\}/.test(src.slice(i))) {
        var m = /^\{(\d+)(,\d*)?\}/.exec(src.slice(i));
        opt = m[1] === "0"; i += m[0].length;
      } else return false;
      if (src[i] === "?") i++;   // lenivý kvantifikátor
      return opt;
    }
    function escAtom() {
      // i stojí za „\“
      var c = src[i++], r = { any: false, set: {}, nul: false };
      if (c === "b" || c === "B") { r.nul = true; return r; }
      if ("wWsSD".indexOf(c) >= 0) { r.any = true; return r; }
      if (c === "d") { for (var d = 0; d < 10; d++) add(r, String(d)); return r; }
      if (c === "p" || c === "P") { if (src[i] === "{") i = src.indexOf("}", i) + 1; r.any = true; return r; }
      if (c === "u") {
        var mu = /^\{([0-9a-fA-F]+)\}|^([0-9a-fA-F]{4})/.exec(src.slice(i));
        if (mu) { i += mu[0].length; add(r, String.fromCodePoint(parseInt(mu[1] || mu[2], 16))); return r; }
      }
      if (c === "x" && /^[0-9a-fA-F]{2}/.test(src.slice(i))) { add(r, String.fromCharCode(parseInt(src.substr(i, 2), 16))); i += 2; return r; }
      if (/[1-9]/.test(c)) { r.any = true; return r; }   // spätný odkaz
      if (c === "n") { add(r, "\n"); return r; }
      if (c === "t") { add(r, "\t"); return r; }
      add(r, c);   // \( \. \- \/ …
      return r;
    }
    function classAtom() {
      // i stojí za „[“
      var r = { any: false, set: {}, nul: false };
      if (src[i] === "^") { r.any = true; }
      var prev = null;
      while (i < n && src[i] !== "]") {
        var c = src[i++];
        if (c === "\\") {
          var e = src[i++];
          if ("wWsSdDpP".indexOf(e) >= 0) { if ((e === "p" || e === "P") && src[i] === "{") i = src.indexOf("}", i) + 1; r.any = true; prev = null; continue; }
          if (e === "u") {
            var mu = /^\{([0-9a-fA-F]+)\}|^([0-9a-fA-F]{4})/.exec(src.slice(i));
            if (mu) { i += mu[0].length; c = String.fromCodePoint(parseInt(mu[1] || mu[2], 16)); }
            else c = e;
          } else c = e === "n" ? "\n" : e === "t" ? "\t" : e;
        } else if (c === "-" && prev !== null && i < n && src[i] !== "]") {
          var hi = src[i++];
          if (hi === "\\") hi = src[i++];
          var a = prev.codePointAt(0), b = hi.codePointAt(0);
          if (b - a > 400 || b < a) r.any = true;
          else for (var k = a; k <= b; k++) add(r, String.fromCodePoint(k));
          prev = null; continue;
        }
        add(r, c); prev = c;
      }
      i++;   // „]“
      return r;
    }
    function atom() {
      var c = src[i];
      if (c === "(") {
        i++;
        var look = false;
        if (src[i] === "?") {
          if (src[i + 1] === ":") i += 2;
          else if (src[i + 1] === "=" || src[i + 1] === "!") { i += 2; look = true; }
          else if (src[i + 1] === "<" && (src[i + 2] === "=" || src[i + 2] === "!")) { i += 3; look = true; }
          else if (src[i + 1] === "<") { i = src.indexOf(">", i) + 1; }
        }
        var g = alt();
        i++;   // „)“
        if (look) return { any: false, set: {}, nul: true };   // nič nespotrebuje
        return g;
      }
      if (c === "[") { i++; return classAtom(); }
      if (c === "\\") { i++; return escAtom(); }
      i++;
      if (c === ".") return { any: true, set: {}, nul: false };
      if (c === "^" || c === "$") return { any: false, set: {}, nul: true };
      var r = { any: false, set: {}, nul: false };
      add(r, c);
      return r;
    }
    try {
      var res = alt();
      if (i < n) return { any: true, set: {} };   // nerozumel som – radšej všade
      if (res.nul) res.any = true;                 // prázdny vzor: nech o ňom rozhodne regulárny výraz
      return res;
    } catch (e) { return { any: true, set: {} }; }
  }

  /* doslovná predpona vzoru („nádor\w*“ → „nádo“, „ateróm(?:u)?“ → „ateró“), najviac 10 znakov;
     slúži len ako rýchly filter pred regulárnym výrazom (znak pred ?, *, { sa nepočíta) */
  function literalPrefix(src) {
    if (/\|/.test(src.replace(/\[[^\]]*\]|\\./g, ""))) {
      // vetvenie na najvyššej úrovni → bez predpony (vo vnútri zátvoriek nevadí, tam sa predpona skončí)
      var depth = 0;
      for (var k = 0; k < src.length; k++) {
        var ch = src[k];
        if (ch === "\\") { k++; continue; }
        if (ch === "[") { k = src.indexOf("]", k); if (k < 0) return ""; continue; }
        if (ch === "(") depth++; else if (ch === ")") depth--;
        else if (ch === "|" && depth === 0) return "";
      }
    }
    var out = "";
    for (var i = 0; i < src.length && out.length < 10; i++) {
      var c = src[i];
      if ("\\[]().*+?{}|^$".indexOf(c) >= 0) {
        if ("?*{".indexOf(c) >= 0) out = out.slice(0, -1);
        break;
      }
      var nx = src[i + 1];
      if (nx === "?" || nx === "*" || nx === "{") break;
      out += c;
    }
    var f = fold(out);
    return f.length === out.length ? f : "";
  }

  /* ── zostavenie ───────────────────────────────────────────────────
     data = window.PF_GLOSSARY (pole hesiel). Vráti {items, next(text, from)}.
     items[k] = {src, term, cs, re (presné overenie pri cs)}; next() vráti ďalšiu zhodu
     {index, 0: text zhody, item} alebo null. Neplatný vzor sa preskočí (opts.onBad). */
  function build(data, opts) {
    opts = opts || {};
    var flat = [];
    (data || []).forEach(function (t) {
      if (!t) return;
      (t.match || []).forEach(function (p) { flat.push({ src: p, term: t, cs: !!t.cs }); });
      (t.csMatch || []).forEach(function (p) { flat.push({ src: p, term: t, cs: true }); });
    });
    // od najdlhšieho; pri rovnakej dĺžke ostáva poradie z dát (stabilné triedenie)
    flat = flat.map(function (x, k) { x.k = k; return x; })
      .sort(function (a, b) { return b.src.length - a.src.length || a.k - b.k; });

    var items = [], buckets = Object.create(null), generic = [];
    flat.forEach(function (x) {
      var ex = expand(x.src);
      try { x.sticky = new RegExp("(?:" + ex + ")" + TAIL, "iuy"); }
      catch (e) { if (opts.onBad) opts.onBad(x, e); return; }
      if (x.cs) { try { x.re = new RegExp("^(?:" + ex + ")$", "u"); } catch (e) { x.re = null; } }
      x.idx = items.length;
      x.pre = literalPrefix(x.src);
      items.push(x);
      var f = firstChars(x.src);
      if (f.any) generic.push(x);
      else for (var c in f.set) (buckets[c] || (buckets[c] = [])).push(x);
    });

    var merged = Object.create(null);
    function cands(ch) {
      var key = fold(ch);
      var m = merged[key];
      if (m) return m;
      var b = buckets[key];
      if (!b) m = generic;
      else if (!generic.length) m = b;
      else {   // spojenie dvoch zoradených zoznamov podľa poradia vzorov
        m = []; var p = 0, q = 0;
        while (p < b.length || q < generic.length) {
          if (q >= generic.length || (p < b.length && b[p].idx < generic[q].idx)) m.push(b[p++]);
          else m.push(generic[q++]);
        }
      }
      merged[key] = m;
      return m;
    }

    /* ── doplnenie značky na celý pojem (5. 11. 2026; „Willisovej | definície“, „Gramovo | farbenie“, „H. | pylori“)
       Vzor hesla často chytí len prvé slovo viacslovného pojmu. Ak za zhodou nasleduje slovo, ktoré patrí do názvu
       toho istého hesla a nezačína tam iný pojem, značka ho zahrnie (najviac 2 slová). Skratka rodu pred zhodou
       („H. pylori“, „S. aureus“) sa pridá, ak sedí s prvým slovom názvu. Výsledok: jedna značka = celý pojem. */
    var WORDS = /[\p{L}]{3,}/gu;
    function words(s) { return String(s || "").toLowerCase().replace(/<[^>]+>/g, " ").replace(/\([^)]*\)/g, " ").match(WORDS) || []; }
    function stem(w) { return w.slice(0, Math.max(4, w.length - 2)); }
    var titleCache = Object.create(null);
    function titleWords(term) {
      var k = term.id;
      if (!titleCache[k]) titleCache[k] = words(String(term.title || "").replace(/\s[—–-]\s.*$/, ""));
      return titleCache[k];
    }
    function grow(text, h, from) {
      var tw = titleWords(h.item.term);
      if (tw.length < 2) return h;
      var start = h.index, end = h.index + h[0].length;
      var mw = words(h[0]).map(stem);
      var rest = tw.filter(function (w) { return !mw.some(function (s) { return w.lastIndexOf(s, 0) === 0 || s.lastIndexOf(w.slice(0, 4), 0) === 0; }); });
      for (var step = 0; step < 2 && rest.length; step++) {
        var am = /^\s+([\p{L}]{3,})/u.exec(text.slice(end, end + 60));
        if (!am) break;
        var aw = am[1].toLowerCase();
        var ix = -1;
        for (var r = 0; r < rest.length; r++) if (aw.lastIndexOf(stem(rest[r]), 0) === 0) { ix = r; break; }
        if (ix < 0) break;
        var ws = end + am[0].length - am[1].length;
        var other = rawNext(text, ws);
        // tam začína iný viacslovný pojem – neprekrývať; jednoslovné heslo („myokard“) ustúpi celému pojmu („infarkt myokardu“)
        if (other && other.index === ws && other[0].length > am[1].length) break;
        if (BOUND.test(text.charAt(ws + am[1].length))) break;
        end = ws + am[1].length;
        rest.splice(ix, 1);
      }
      var bm = /(?:^|[^\p{L}])(\p{Lu})\.\s?$/u.exec(text.slice(Math.max(0, start - 4), start));
      if (bm && tw[0] && tw[0].charAt(0) === bm[1].toLowerCase()) {
        var s2 = start - bm[0].length + (bm[0].charAt(0) === bm[1] ? 0 : 1);
        if (s2 >= (from || 0)) start = s2;                // neprekryť predošlú značku
      }
      if (start === h.index && end === h.index + h[0].length) return h;
      return { index: start, 0: text.slice(start, end), base: h[0], item: h.item };
    }

    function next(text, from) {
      var h = rawNext(text, from);
      if (!h) return null;
      // presná veľkosť písmen (cs) sa overuje na pôvodnej zhode; zamietnutá zhoda sa nerozširuje
      if (h.item.re && !h.item.re.test(h[0])) { h.rejected = true; return h; }
      return grow(text, h, from);
    }

    function rawNext(text, from) {
      var n = text.length;
      for (var i = from || 0; i < n; i++) {
        if (i > 0 && BOUND.test(text.charAt(i - 1))) continue;
        var cs = cands(text.charAt(i));
        if (!cs.length) continue;
        var low = fold(text.substr(i, 10));
        if (low.length !== Math.min(10, n - i)) low = null;   // zmena dĺžky pri skladaní – bez filtra
        for (var j = 0; j < cs.length; j++) {
          var pre = cs[j].pre;
          if (pre && low !== null && low.lastIndexOf(pre, 0) !== 0) continue;
          var re = cs[j].sticky;
          re.lastIndex = i;
          var m = re.exec(text);
          if (m && m[0].length) return { index: i, 0: m[0], item: cs[j] };
        }
      }
      return null;
    }

    /* všetky zhody zľava doprava bez prekryvu (zhoda, ktorú volajúci odmietne, sa tiež preskočí celá) */
    function all(text) {
      var out = [], from = 0, h;
      while ((h = next(text, from))) { out.push(h); from = h.index + h[0].length; }
      return out;
    }

    return { items: items, next: next, all: all, expand: expand };
  }

  var api = { build: build, expand: expand, firstChars: firstChars, BOUND: BOUND };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PF_MATCH = api;
})(typeof window !== "undefined" ? window : this);

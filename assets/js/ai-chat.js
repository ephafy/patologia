/* ══════════════════════════════════════════════════════════════════════════
   AI asistent — plávajúce okno chatu priamo v knihe (zdieľaný súbor KNIHY-CORE).

   · Čitateľ si v nastaveniach okna zadá vlastný API kľúč (Gemini, OpenAI,
     Claude alebo ľubovoľné API kompatibilné s OpenAI – OpenRouter, Groq…).
     Kľúč ostáva len v tomto prehliadači (localStorage) a posiela sa iba priamo
     zvolenému poskytovateľovi. Kniha nemá žiadny server.
   · Označený text → tlačidlo „Opýtať sa AI“ (site.js) → PF_AI.ask(): okno sa
     otvorí a otázka sa hneď pošle; odpoveď sa vypisuje priebežne.
   · Okno sa nezatvára klikom vedľa (na rozdiel od vysvetlivky): ťahá sa za
     hlavičku, mení sa mu veľkosť; × ho zbalí do tlačidla AI (konverzácia ostane –
     zbaliť a zavrieť bolo kedysi dvoje tlačidiel s tým istým účinkom).
   · Pri otvorení je okno hneď na konci konverzácie (bez animácie); počas písania
     odpovede ide za ňou len dovtedy, kým jej začiatok nevystúpi k hornému okraju.
     Na mobile je to spodný panel cez celú šírku.
   · „+“ pri písaní: výrez obrazovky (ako Ctrl+R v nástroji autora – okno sa
     skryje, ťahom sa vyberie oblasť, potom sa okno vráti s obrázkom v správe)
     alebo obrázok zo zariadenia; obrázok sa dá aj vložiť cez Ctrl+V.
   · Kapitola otvorená v ráme hlavnej stránky (appka) volá okno hlavnej stránky
     (site.js → top.PF_loadAI), takže chat ostáva pri prechode medzi kapitolami.
     Konverzácia sa ukladá pre každú knihu zvlášť, nastavenia sú spoločné.

   Načíta ho site.js až pri prvom použití (PF_loadAI). Štýly: assets/styles/ai-chat.css.
   Výrez obrazovky: assets/js/html2canvas.min.js (html2canvas-pro, MIT), tiež až na požiadanie.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (window.PF_AI) return;

  var BASE = (function () {
    var s = document.currentScript;
    var src = (s && s.src) || "";
    return src ? src.slice(0, src.lastIndexOf("/") + 1) : "assets/js/";
  })();
  function meta(n, d) { var m = document.querySelector('meta[name="' + n + '"]'); return (m && m.content) || d; }
  var BOOK = meta("pf-book", "kniha");
  var SUBJECT = meta("pf-subject", "medicíny");
  var BRAND = meta("apple-mobile-web-app-title", document.title);

  (function css() {
    if (document.querySelector('link[data-pfai]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = BASE + "../styles/ai-chat.css";
    l.setAttribute("data-pfai", "");
    document.head.appendChild(l);
  })();

  /* ── úložisko (môže byť zablokované – všetko v try/catch) ───────────── */
  var K_SET = "pf-ai-settings";          /* spoločné pre všetky knihy na tejto doméne */
  var K_CHAT = "pf-ai-chat:" + BOOK;
  var K_UI = "pf-ai-ui";
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ── poskytovatelia ─────────────────────────────────────────────────── */
  var PROV = {
    gemini: {
      name: "Google Gemini", short: "Gemini", sub: "kľúč zadarmo",
      model: "gemini-flash-latest",
      keyUrl: "https://aistudio.google.com/apikey",
      keyPh: "AIza…",
      note: "Kľúč si vytvoríš zadarmo v Google AI Studio (stačí účet Google). Bezplatná úroveň má limit otázok za minútu a za deň."
    },
    openai: {
      name: "OpenAI", short: "OpenAI", sub: "ChatGPT · platené",
      model: "gpt-5-mini",
      keyUrl: "https://platform.openai.com/api-keys",
      keyPh: "sk-…",
      note: "Platí sa podľa spotreby (predplatné ChatGPT Plus prístup k API nezahŕňa)."
    },
    anthropic: {
      name: "Anthropic", short: "Claude", sub: "Claude · platené",
      model: "claude-sonnet-5-5",
      keyUrl: "https://console.anthropic.com/settings/keys",
      keyPh: "sk-ant-…",
      note: "Platí sa podľa spotreby (predplatné Claude Pro prístup k API nezahŕňa)."
    },
    custom: {
      name: "Iné API", short: "API", sub: "kompatibilné s OpenAI",
      model: "",
      keyUrl: "",
      keyPh: "kľúč (ak ho služba vyžaduje)",
      note: "Napr. OpenRouter (https://openrouter.ai/api/v1 – má aj bezplatné modely), Groq (https://api.groq.com/openai/v1) alebo LM Studio v počítači (http://localhost:1234/v1)."
    }
  };
  var ORDER = ["gemini", "openai", "anthropic", "custom"];
  /* keď je zvolený model preťažený (5xx) alebo vyčerpal limit (429), skúsi sa ďalší z poradia */
  var FALLBACK = { gemini: ["gemini-flash-latest", "gemini-2.5-flash", "gemini-flash-lite-latest", "gemini-2.5-flash-lite"] };

  function settings() {
    var s = lsGet(K_SET, null) || {};
    s.provider = PROV[s.provider] ? s.provider : "gemini";
    s.keys = s.keys || {};
    s.models = s.models || {};
    s.customUrl = s.customUrl || "";
    return s;
  }
  function ready(s) {
    s = s || settings();
    if (s.provider === "custom") return !!(s.customUrl && modelOf(s));
    return !!s.keys[s.provider];
  }
  function modelOf(s) { return (s.models[s.provider] || PROV[s.provider].model || "").trim(); }

  var SYSTEM =
    "Si trpezlivý tútor pre študenta medicíny. Študent sa učí z knihy poznámok z " + SUBJECT +
    " („" + BRAND + "“) a pýta sa na úryvky textu, snímky obrazovky alebo vlastné otázky. " +
    "Odpovedaj po slovensky, jasne a stručne (spravidla do 250 slov, ak študent nežiada viac). " +
    "Vysvetľuj mechanizmus – prečo to tak je, reťazou príčina → následok –, nie len opis; kde to pomáha, " +
    "doplň klinický význam alebo príklad. Odborný termín pri prvom použití vysvetli. " +
    "Ak si niečím nie si istý alebo sa zdroje rozchádzajú, povedz to otvorene; čísla nevymýšľaj. " +
    "Formátuj v Markdowne: krátke odseky, odrážky, **tučné** kľúčové pojmy; nadpisy len pri dlhšej odpovedi.";

  var ASK_DEFAULT = "Vysvetli mi tento úryvok.";
  var FOLLOWUPS = [
    ["Zjednoduš to", "Vysvetli to jednoduchšie, akoby som o téme počul(a) prvýkrát."],
    ["Príklad z praxe", "Daj mi konkrétny klinický príklad alebo prípad, na ktorom to uvidím."],
    ["Vyskúšaj ma", "Polož mi jednu kontrolnú otázku k tomu, o čom sme hovorili. Odpoveď nepíš, počkaj na mňa."],
    ["S čím sa to pletie?", "S čím sa to najčastejšie pletie a ako to rozlíšim?"]
  ];

  /* ── ikony ──────────────────────────────────────────────────────────── */
  var I = {
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="pfaiG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b8cff"/><stop offset=".55" stop-color="#9b72cb"/><stop offset="1" stop-color="#e87a94"/></linearGradient></defs><path fill="url(#pfaiG)" d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"/></svg>',
    sparkW: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    fresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    min: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/></svg>',
    crop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M9 12h6M12 9v6"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/></svg>',
    retry: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
  };

  /* ── pomôcky ────────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function h(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function ib(icon, title, cls) {
    var b = h("button", "pfai-ib" + (cls ? " " + cls : ""), icon);
    b.type = "button";
    b.title = title;
    b.setAttribute("aria-label", title);
    return b;
  }
  var MOBILE = window.matchMedia ? window.matchMedia("(max-width:820px)") : { matches: false };
  var COARSE = window.matchMedia ? window.matchMedia("(pointer:coarse)").matches : false;
  function isMobile() { return MOBILE.matches; }

  var toastT = null, toastEl = null;
  function toast(msg, ms) {
    if (!toastEl) { toastEl = h("div", "pfai-toast"); toastEl.setAttribute("role", "status"); }
    toastEl.textContent = msg;
    document.body.appendChild(toastEl);
    clearTimeout(toastT);
    toastT = setTimeout(function () { if (toastEl) toastEl.remove(); }, ms || 3500);
  }

  /* ── Markdown → bezpečné HTML (najprv sa všetko escapuje) ───────────── */
  function inline(s) {
    var codes = [];
    s = s.replace(/`([^`\n]+)`/g, function (_, c) { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
    s = esc(s);
    s = s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_, t, u) {
      return '<a href="' + u.replace(/"/g, "%22") + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
    });
    s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__(?=\S)([\s\S]*?\S)__/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?!\*)/g, "$1<em>$2</em>");
    s = s.replace(/(^|[^_\w])_(?=\S)([^_\n]*?\S)_(?!\w)/g, "$1<em>$2</em>");
    s = s.replace(/~~(?=\S)([^~\n]*?\S)~~/g, "<del>$1</del>");
    s = s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return "<code>" + esc(codes[+i]) + "</code>"; });
    return s;
  }
  function md(src) {
    var lines = String(src || "").replace(/\r/g, "").split("\n");
    var out = [], i = 0;
    function isList(l) { return /^\s*([-*+•]|\d+[.)])\s+/.test(l); }
    function isTableSep(l) { return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l); }
    function cells(l) { return l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (c) { return inline(c.trim()); }); }
    while (i < lines.length) {
      var l = lines[i];
      if (/^\s*```/.test(l)) {
        var code = [];
        i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i++]);
        i++;
        out.push("<pre><code>" + esc(code.join("\n")) + "</code></pre>");
        continue;
      }
      if (!l.trim()) { i++; continue; }
      var hm = /^\s*(#{1,6})\s+(.*)$/.exec(l);
      if (hm) { out.push("<h4>" + inline(hm[2].replace(/\s*#+\s*$/, "")) + "</h4>"); i++; continue; }
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { out.push("<hr>"); i++; continue; }
      if (/\|/.test(l) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        var head = cells(l), rows = [];
        i += 2;
        while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) rows.push(cells(lines[i++]));
        out.push('<div class="pfai-tw"><table><thead><tr>' + head.map(function (c) { return "<th>" + c + "</th>"; }).join("") +
          "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") +
          "</tbody></table></div>");
        continue;
      }
      if (/^\s*>/.test(l)) {
        var q = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) q.push(lines[i++].replace(/^\s*>\s?/, ""));
        out.push("<blockquote>" + md(q.join("\n")) + "</blockquote>");
        continue;
      }
      if (isList(l)) {
        /* zoznam s jednou úrovňou vnorenia (odsadenie ≥ 2 medzery) */
        var html = "", stack = [];
        while (i < lines.length && (isList(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && stack.length))) {
          var li = lines[i];
          if (!isList(li)) { html += " " + inline(li.trim()); i++; continue; }
          var ind = /^\s*/.exec(li)[0].length >= 2 ? 1 : 0;
          var ord = /^\s*\d+[.)]\s/.test(li);
          var text = li.replace(/^\s*([-*+•]|\d+[.)])\s+/, "");
          while (stack.length > ind + 1) html += "</li></" + stack.pop() + ">";
          if (stack.length === ind + 1) html += "</li>";
          else { var t = ord ? "ol" : "ul"; html += "<" + t + ">"; stack.push(t); }
          html += "<li>" + inline(text);
          i++;
        }
        while (stack.length) html += "</li></" + stack.pop() + ">";
        out.push(html);
        continue;
      }
      var p = [l.trim()];
      i++;
      while (i < lines.length && lines[i].trim() && !isList(lines[i]) && !/^\s*(#{1,6}\s|```|>)/.test(lines[i]) &&
             !(/\|/.test(lines[i]) && i + 1 < lines.length && isTableSep(lines[i + 1]))) p.push(lines[i++].trim());
      out.push("<p>" + p.map(inline).join("<br>") + "</p>");
    }
    return out.join("");
  }

  /* ── volanie API (priebežný výpis cez SSE) ──────────────────────────── */
  function apiError(status, body, prov) {
    var msg = "";
    try { var j = JSON.parse(body); msg = (j.error && (j.error.message || j.error.type)) || j.message || ""; } catch (e) { msg = (body || "").slice(0, 200); }
    var low = (msg || "").toLowerCase();
    var human;
    if (status === 401 || status === 403 || /api key|api_key|invalid.*key|authentication|permission/.test(low)) human = "Kľúč nie je platný alebo nemá prístup. Skontroluj ho v nastaveniach.";
    else if (status === 404 || /not found|does not exist|model_not_found|unknown model/.test(low)) human = "Zvolený model služba nepozná. V nastaveniach vyber iný (tlačidlo Načítať modely).";
    else if (status === 429 || /quota|rate limit|resource_exhausted/.test(low)) human = "Prekročený limit otázok" + (prov === "gemini" ? " (bezplatná úroveň Gemini má limit za minútu aj za deň)" : "") + ". Skús to o chvíľu.";
    else if (status === 529 || status >= 500) human = "Služba je práve preťažená. Skús to o chvíľu.";
    else if (status === 400 && /image|inline_data|vision/.test(low)) human = "Tento model nevie čítať obrázky. Vyber v nastaveniach iný model.";
    else human = "Služba vrátila chybu " + status + ".";
    var e = new Error(human);
    e.status = status;
    e.detail = msg;
    return e;
  }

  function readSSE(resp, onData) {
    var reader = resp.body.getReader(), dec = new TextDecoder(), buf = "";
    function pump() {
      return reader.read().then(function (r) {
        if (r.done) { if (buf.trim()) line(buf); return; }
        buf += dec.decode(r.value, { stream: true });
        var parts = buf.split(/\r?\n/);
        buf = parts.pop();
        parts.forEach(line);
        return pump();
      });
    }
    function line(l) {
      if (l.indexOf("data:") !== 0) return;
      var d = l.slice(5).trim();
      if (!d || d === "[DONE]") return;
      var j;
      try { j = JSON.parse(d); } catch (e) { return; }
      onData(j);
    }
    return pump();
  }

  function b64(dataUrl) { var m = /^data:([^;]+);base64,(.*)$/.exec(dataUrl); return m ? { mime: m[1], data: m[2] } : null; }

  /* text správy pre API: úryvok s miestom v knihe + otázka */
  function apiText(m) {
    var t = "";
    if (m.quote) t += "Úryvok z knihy" + (m.quote.where ? " (" + m.quote.where + ")" : "") + ":\n\"\"\"\n" + m.quote.text + "\n\"\"\"\n\n";
    if (m.images && m.images.length) t += (m.images.length > 1 ? "Prikladám snímky z knihy.\n\n" : "Prikladám snímku z knihy.\n\n");
    return t + (m.text || (m.quote ? ASK_DEFAULT : "Vysvetli mi, čo je na snímke."));
  }

  function chatRequest(s, msgs, onText, signal) {
    var prov = s.provider, key = (s.keys[prov] || "").trim(), model = modelOf(s);
    var hist = msgs.filter(function (m) { return !m.error && (m.role === "user" || (m.text && m.text.trim())); }).slice(-24);
    while (hist.length && hist[0].role !== "user") hist.shift();
    var url, headers = { "Content-Type": "application/json" }, body, pick;

    if (prov === "gemini") {
      url = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model.replace(/^models\//, "")) + ":streamGenerateContent?alt=sse";
      headers["x-goog-api-key"] = key;
      body = {
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: hist.map(function (m) {
          var parts = [];
          if (m.role === "user") (m.images || []).forEach(function (u) { var x = b64(u); if (x) parts.push({ inline_data: { mime_type: x.mime, data: x.data } }); });
          parts.push({ text: m.role === "user" ? apiText(m) : m.text });
          return { role: m.role === "user" ? "user" : "model", parts: parts };
        })
      };
      pick = function (j) {
        if (j.error) throw new Error(j.error.message || "chyba");
        var c = j.candidates && j.candidates[0], out = "";
        if (c && c.content && c.content.parts) c.content.parts.forEach(function (p) { if (p.text && !p.thought) out += p.text; });
        if (c && c.finishReason === "SAFETY" && !out) out = "\n\n*(Odpoveď zastavil bezpečnostný filter služby.)*";
        return out;
      };
    } else if (prov === "anthropic") {
      url = "https://api.anthropic.com/v1/messages";
      headers["x-api-key"] = key;
      headers["anthropic-version"] = "2023-06-01";
      headers["anthropic-dangerous-direct-browser-access"] = "true";
      body = {
        model: model, max_tokens: 4096, system: SYSTEM, stream: true,
        messages: hist.map(function (m) {
          if (m.role !== "user") return { role: "assistant", content: m.text };
          var c = [];
          (m.images || []).forEach(function (u) { var x = b64(u); if (x) c.push({ type: "image", source: { type: "base64", media_type: x.mime, data: x.data } }); });
          c.push({ type: "text", text: apiText(m) });
          return { role: "user", content: c };
        })
      };
      pick = function (j) {
        if (j.type === "error") throw new Error((j.error && j.error.message) || "chyba");
        return j.type === "content_block_delta" && j.delta && j.delta.type === "text_delta" ? j.delta.text : "";
      };
    } else {
      var base = prov === "openai" ? "https://api.openai.com/v1" : s.customUrl.trim().replace(/\/+$/, "").replace(/\/chat\/completions$/, "");
      url = base + "/chat/completions";
      if (key) headers.Authorization = "Bearer " + key;
      body = {
        model: model, stream: true,
        messages: [{ role: "system", content: SYSTEM }].concat(hist.map(function (m) {
          if (m.role !== "user") return { role: "assistant", content: m.text };
          if (!(m.images && m.images.length)) return { role: "user", content: apiText(m) };
          var c = [{ type: "text", text: apiText(m) }];
          m.images.forEach(function (u) { c.push({ type: "image_url", image_url: { url: u } }); });
          return { role: "user", content: c };
        }))
      };
      pick = function (j) {
        if (j.error) throw new Error(j.error.message || "chyba");
        var d = j.choices && j.choices[0] && j.choices[0].delta;
        return (d && typeof d.content === "string") ? d.content : "";
      };
    }

    var full = "";
    return fetch(url, { method: "POST", headers: headers, body: JSON.stringify(body), signal: signal })
      .then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw apiError(r.status, t, prov); });
        if (!r.body || !r.body.getReader) return r.text().then(function (t) { full = t; onText(full); return full; });
        return readSSE(r, function (j) {
          var d = pick(j);
          if (d) { full += d; onText(full); }
        }).then(function () { return full; });
      });
  }

  function listModels(s) {
    var prov = s.provider, key = (s.keys[prov] || "").trim(), url, headers = {};
    if (prov === "gemini") { url = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200"; headers["x-goog-api-key"] = key; }
    else if (prov === "anthropic") {
      url = "https://api.anthropic.com/v1/models?limit=100";
      headers["x-api-key"] = key; headers["anthropic-version"] = "2023-06-01"; headers["anthropic-dangerous-direct-browser-access"] = "true";
    } else {
      url = (prov === "openai" ? "https://api.openai.com/v1" : s.customUrl.trim().replace(/\/+$/, "").replace(/\/chat\/completions$/, "")) + "/models";
      if (key) headers.Authorization = "Bearer " + key;
    }
    return fetch(url, { headers: headers }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw apiError(r.status, t, prov); });
      return r.json();
    }).then(function (j) {
      var ids = [];
      if (prov === "gemini") {
        (j.models || []).forEach(function (m) {
          if ((m.supportedGenerationMethods || []).indexOf("generateContent") >= 0 && !/embedding|aqa|imagen|tts|image-generation|native-audio/.test(m.name)) ids.push(m.name.replace(/^models\//, ""));
        });
      } else {
        (j.data || j.models || []).forEach(function (m) { ids.push(m.id || m.name); });
        if (prov === "openai") ids = ids.filter(function (id) { return /^(gpt|o\d|chatgpt)/.test(id) && !/audio|realtime|transcribe|tts|image|search|embedding/.test(id); });
      }
      return ids.filter(Boolean).sort();
    });
  }

  /* ── obrázky: zmenšenie pred odoslaním ──────────────────────────────── */
  var IMG_MAX = 1568;
  function canvasToData(c) {
    var k = Math.min(1, IMG_MAX / Math.max(c.width, c.height));
    var o = c;
    if (k < 1) {
      o = document.createElement("canvas");
      o.width = Math.round(c.width * k); o.height = Math.round(c.height * k);
      var x = o.getContext("2d");
      x.imageSmoothingQuality = "high";
      x.drawImage(c, 0, 0, o.width, o.height);
    }
    var w = document.createElement("canvas");
    w.width = o.width; w.height = o.height;
    var g = w.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, w.width, w.height);
    g.drawImage(o, 0, 0);
    return w.toDataURL("image/jpeg", 0.88);
  }
  function fileToData(file) {
    return new Promise(function (res, rej) {
      if (!file || !/^image\//.test(file.type)) return rej(new Error("To nie je obrázok."));
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        res(canvasToData(c));
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("Obrázok sa nedá načítať.")); };
      img.src = url;
    });
  }

  /* ── výrez obrazovky ────────────────────────────────────────────────── */
  function loadH2C() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = BASE + "html2canvas.min.js";
      s.onload = function () { window.html2canvas ? res(window.html2canvas) : rej(new Error("knižnica sa nenačítala")); };
      s.onerror = function () { rej(new Error("knižnica sa nenačítala")); };
      document.head.appendChild(s);
    });
  }
  /* oblasť patrí dokumentu najhlbšieho rámu (kapitola v čítačke, náhľad), nad ktorým leží – snímka sa robí v ňom */
  function targetOf(win, r) {
    try {
      var cx = r.x + r.w / 2, cy = r.y + r.h / 2;
      var el = win.document.elementFromPoint(cx, cy);
      if (el && el.tagName === "IFRAME" && el.contentWindow && el.contentWindow.document && el.contentWindow.document.body) {
        var b = el.getBoundingClientRect();
        return targetOf(el.contentWindow, { x: r.x - b.left, y: r.y - b.top, w: r.w, h: r.h });
      }
    } catch (e) { /* cudzí pôvod – snímka v tomto okne */ }
    return { win: win, r: r };
  }
  function capture(rect) {
    return loadH2C().then(function (h2c) {
      var t = targetOf(window, rect), w = t.win, r = t.r, d = w.document;
      var html = d.documentElement, prevSB = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      var bg = w.getComputedStyle(d.body).backgroundColor;
      if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") bg = "#fff";
      return h2c(d.body, {
        x: w.scrollX + r.x, y: w.scrollY + r.y, width: r.w, height: r.h,
        windowWidth: html.clientWidth, windowHeight: w.innerHeight,
        scale: Math.min(2, window.devicePixelRatio || 1), useCORS: true, logging: false, backgroundColor: bg,
        ignoreElements: function (n) { return n.classList && (n.classList.contains("pfai") || n.classList.contains("pfai-pill") || n.classList.contains("pfai-snap") || n.classList.contains("ask-tools") || n.classList.contains("pfai-toast")); },
        onclone: function (doc) {
          /* rovnaké úpravy kópie ako v nástroji Ctrl+R (admin/admintools.js):
             rozmazané tiene kreslí html2canvas ako sivú plochu; zatvorené <details> by ukázal otvorené */
          var st = doc.createElement("style");
          st.textContent = ".pf-tip,.pf-tip.is-flash,.pf-tip[data-place],.pf-tip[data-dragged],.pf-pop,.pf-lb-close,.pf-lb-cap{" +
            "box-shadow:0 0 0 1px rgba(0,0,0,.22)!important;animation:none!important}.pf-tip::after{filter:none!important}";
          doc.head.appendChild(st);
          var ds = doc.querySelectorAll("details:not([open])");
          for (var i = 0; i < ds.length; i++) {
            var kids = Array.prototype.slice.call(ds[i].childNodes);
            for (var j = 0; j < kids.length; j++) if (!(kids[j].nodeType === 1 && kids[j].tagName === "SUMMARY")) ds[i].removeChild(kids[j]);
          }
        }
      }).then(function (c) { html.style.scrollBehavior = prevSB; return canvasToData(c); },
              function (e) { html.style.scrollBehavior = prevSB; throw e; });
    });
  }

  /* overlay: ťahom sa vyberie oblasť; klik/ťuknutie = celá obrazovka; koliesko posúva stránku pod ním */
  function snip() {
    return new Promise(function (resolve) {
      var ov = h("div", "pfai-snap");
      var dim = h("div", "pfai-snap-dim"), sel = h("div", "pfai-snap-sel");
      var bar = h("div", "pfai-snap-bar", "<span>" + (COARSE ? "Potiahni prstom oblasť · ťuknutie = celá obrazovka" : "Ťahaj myšou oblasť · klik = celá obrazovka · koliesko posúva stránku · Esc = zrušiť") + "</span>");
      var cancel = h("button", null, "Zrušiť");
      cancel.type = "button";
      bar.appendChild(cancel);
      ov.appendChild(dim); ov.appendChild(sel); ov.appendChild(bar);
      document.body.appendChild(ov);
      var x0, y0, drag = false, done = false;
      function finish(r) {
        if (done) return;
        done = true;
        document.removeEventListener("keydown", key, true);
        ov.remove();
        /* „klik“ po zdvihnutí prsta by prepadol na pojem či odkaz, ktorý bol pod výrezom */
        function eat(e) { e.stopPropagation(); e.preventDefault(); }
        document.addEventListener("click", eat, true);
        setTimeout(function () { document.removeEventListener("click", eat, true); }, 450);
        resolve(r);
      }
      function key(e) { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); finish(null); } }
      document.addEventListener("keydown", key, true);
      cancel.addEventListener("click", function (e) { e.stopPropagation(); finish(null); });
      bar.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
      function rect(e) {
        var vw = document.documentElement.clientWidth, vh = window.innerHeight;
        var x = Math.max(0, Math.min(x0, e.clientX)), y = Math.max(0, Math.min(y0, e.clientY));
        return { x: x, y: y, w: Math.min(vw, Math.max(x0, e.clientX)) - x, h: Math.min(vh, Math.max(y0, e.clientY)) - y };
      }
      ov.addEventListener("pointerdown", function (e) {
        if (e.button > 0) return;
        drag = true; x0 = e.clientX; y0 = e.clientY;
        try { ov.setPointerCapture(e.pointerId); } catch (er) {}
        dim.style.display = "none"; sel.style.display = "block";
        place(e);
      });
      ov.addEventListener("pointermove", function (e) { if (drag) place(e); });
      ov.addEventListener("pointerup", function (e) {
        if (!drag) return;
        drag = false;
        var r = rect(e);
        if (r.w < 12 || r.h < 12) r = { x: 0, y: 0, w: document.documentElement.clientWidth, h: window.innerHeight };
        finish(r);
      });
      ov.addEventListener("pointercancel", function () { drag = false; dim.style.display = ""; sel.style.display = "none"; });
      ov.addEventListener("wheel", function (e) {
        e.preventDefault();
        ov.style.pointerEvents = "none";
        var under = document.elementFromPoint(e.clientX, e.clientY);
        ov.style.pointerEvents = "";
        var w = window;
        try { if (under && under.tagName === "IFRAME" && under.contentWindow.document) w = under.contentWindow; } catch (er) {}
        w.scrollBy(0, e.deltaY * (e.deltaMode === 1 ? 32 : 1));
      }, { passive: false });
      function place(e) {
        var r = rect(e);
        sel.style.left = r.x + "px"; sel.style.top = r.y + "px";
        sel.style.width = r.w + "px"; sel.style.height = r.h + "px";
      }
    });
  }

  /* ── stav ───────────────────────────────────────────────────────────── */
  var chat = lsGet(K_CHAT, null) || { msgs: [] };
  if (!Array.isArray(chat.msgs)) chat.msgs = [];
  chat.msgs.forEach(function (m) { if (m.pending) { m.pending = false; m.stopped = true; } });
  var ui = lsGet(K_UI, null) || {};
  var busy = null;               /* AbortController bežiacej odpovede */
  var draft = { quote: null, images: [] };
  var afterSetup = null;         /* otázka, ktorá čaká na zadanie kľúča */
  var view = "chat";             /* chat | settings */

  function saveChat() {
    var data = { msgs: chat.msgs.slice(-60) };
    if (lsSet(K_CHAT, data)) return;
    /* plné úložisko: najprv zahodiť obrázky zo starších správ, potom staršie správy */
    for (var i = 0; i < data.msgs.length - 2; i++) {
      if (data.msgs[i].images && data.msgs[i].images.length) { data.msgs[i].images = []; data.msgs[i].imgLost = true; }
    }
    if (lsSet(K_CHAT, data)) return;
    data.msgs = data.msgs.slice(-10).map(function (m) { var c = {}; for (var k in m) c[k] = m[k]; if (c.images && c.images.length) { c.images = []; c.imgLost = true; } return c; });
    lsSet(K_CHAT, data);
  }

  /* ── okno ───────────────────────────────────────────────────────────── */
  var root, head, modelBtn, body, chips, compose, atts, ta, plus, send, menu, pill, fileIn, setBtn;

  function build() {
    if (root) return;
    root = h("div", "pfai");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "AI asistent");
    root.hidden = true;

    head = h("div", "pfai-head");
    head.appendChild(h("span", "pfai-grab"));
    var title = h("div", "pfai-title", "<b>AI asistent</b>");
    modelBtn = h("button", "pfai-model");
    modelBtn.type = "button";
    modelBtn.title = "Zmeniť poskytovateľa alebo model";
    title.appendChild(modelBtn);
    head.appendChild(title);
    var bNew = ib(I.fresh, "Nová konverzácia");
    setBtn = ib(I.gear, "Nastavenia (API kľúč, model)");
    /* zbaliť a zavrieť robili to isté (okno sa schová do tlačidla AI, konverzácia ostane) → jedno tlačidlo */
    var bClose = ib(I.close, "Zavrieť (konverzácia ostane – otvorí ju tlačidlo AI)");
    [bNew, setBtn, bClose].forEach(function (b) { head.appendChild(b); });
    root.appendChild(head);

    body = h("div", "pfai-body");
    body.setAttribute("aria-live", "polite");
    root.appendChild(body);
    chips = h("div", "pfai-chips");
    root.appendChild(chips);

    compose = h("form", "pfai-compose");
    atts = h("div", "pfai-atts");
    var row = h("div", "pfai-row");
    plus = h("button", "pfai-plus", I.plus);
    plus.type = "button";
    plus.title = "Pridať snímku obrazovky alebo obrázok";
    plus.setAttribute("aria-label", plus.title);
    plus.setAttribute("aria-expanded", "false");
    ta = h("textarea");
    ta.rows = 1;
    ta.placeholder = "Opýtaj sa…";
    ta.setAttribute("aria-label", "Otázka pre AI");
    if (!COARSE) ta.title = "Enter = odoslať · Shift+Enter = nový riadok";
    send = h("button", "pfai-send", I.send);
    send.type = "submit";
    send.title = "Odoslať (Enter)";
    send.setAttribute("aria-label", "Odoslať");
    row.appendChild(plus); row.appendChild(ta); row.appendChild(send);
    menu = h("div", "pfai-menu");
    menu.hidden = true;
    menu.setAttribute("role", "menu");
    var mSnap = h("button", null, I.crop + "<span>Výrez obrazovky<small>označ oblasť v knihe</small></span>");
    var mFile = h("button", null, I.image + "<span>Obrázok zo zariadenia<small>" + (COARSE ? "galéria alebo fotoaparát" : "súbor; obrázok vložíš aj cez Ctrl+V") + "</small></span>");
    mSnap.type = mFile.type = "button";
    mSnap.setAttribute("role", "menuitem"); mFile.setAttribute("role", "menuitem");
    menu.appendChild(mSnap); menu.appendChild(mFile);
    fileIn = h("input");
    fileIn.type = "file"; fileIn.accept = "image/*"; fileIn.multiple = true; fileIn.hidden = true;
    compose.appendChild(menu); compose.appendChild(atts); compose.appendChild(row);
    compose.appendChild(fileIn);
    root.appendChild(compose);

    /* tlačidlo vpravo dole vytvára site.js hneď pri načítaní; v ráme pri file:// ho nemá → vlastné */
    pill = document.querySelector(".pfai-pill");
    if (!pill) {
      pill = h("button", "pfai-pill", I.sparkW + "<span>AI</span><i class=\"dot\"></i>");
      pill.type = "button";
      pill.title = "Otvoriť AI asistenta";
      pill.hidden = true;
      pill.onclick = function () { open(); };   /* tlačidlo zo site.js má klik vlastný (načíta okno, open) */
      ((window.PF_dock && window.PF_dock("r")) || document.body).appendChild(pill);   /* spodný pás, site.css → .pf-dock */
    }

    document.body.appendChild(root);

    /* klávesy v okne nesmú spúšťať skratky knihy (Esc zatvorí čítačku, „/“ vyhľadávanie…) */
    root.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key !== "Escape") return;
      e.preventDefault();
      if (!menu.hidden) { menu.hidden = true; plus.setAttribute("aria-expanded", "false"); ta.focus(); }
      else close();   /* Esc v okne ho zbalí; ďalšie Esc už patrí stránke (návrat do obsahu) */
    });
    root.addEventListener("pointerdown", function (e) { e.stopPropagation(); if (!menu.contains(e.target) && e.target !== plus && !plus.contains(e.target)) { menu.hidden = true; plus.setAttribute("aria-expanded", "false"); } });

    bNew.onclick = function () {
      if (busy) busy.abort();
      chat.msgs = []; saveChat();
      draft = { quote: null, images: [] };
      view = "chat"; render(); ta.focus();
    };
    setBtn.onclick = function () { view = view === "settings" ? "chat" : "settings"; render(); };
    modelBtn.onclick = function () { view = "settings"; render(); };
    bClose.onclick = close;


    plus.onclick = function () {
      menu.hidden = !menu.hidden;
      plus.setAttribute("aria-expanded", String(!menu.hidden));
      if (!menu.hidden) mSnap.focus();
    };
    mSnap.onclick = function () { menu.hidden = true; plus.setAttribute("aria-expanded", "false"); doSnip(); };
    mFile.onclick = function () { menu.hidden = true; plus.setAttribute("aria-expanded", "false"); fileIn.click(); };
    fileIn.onchange = function () {
      var fs = Array.prototype.slice.call(fileIn.files || []);
      fileIn.value = "";
      addFiles(fs);
    };
    ta.addEventListener("paste", function (e) {
      var items = (e.clipboardData && e.clipboardData.items) || [], fs = [];
      for (var i = 0; i < items.length; i++) if (items[i].kind === "file" && /^image\//.test(items[i].type)) fs.push(items[i].getAsFile());
      if (fs.length) { e.preventDefault(); addFiles(fs); }
    });
    root.addEventListener("dragover", function (e) { if (e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types || [], "Files") >= 0) e.preventDefault(); });
    root.addEventListener("drop", function (e) {
      var fs = e.dataTransfer && e.dataTransfer.files;
      if (fs && fs.length) { e.preventDefault(); addFiles(Array.prototype.slice.call(fs)); }
    });
    ta.addEventListener("input", grow);
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing && !COARSE) { e.preventDefault(); submit(); }
    });
    compose.addEventListener("submit", function (e) { e.preventDefault(); if (busy) busy.abort(); else submit(); });

    setupDrag();
    setupViewport();
    MOBILE.addEventListener && MOBILE.addEventListener("change", function () { if (!root.hidden) placeWin(); });
    window.addEventListener("resize", function () { if (!root.hidden && !isMobile()) placeWin(); });
    if (window.ResizeObserver) {
      var rt = null;
      new ResizeObserver(function () {
        if (root.hidden || isMobile() || !root._placed) return;
        clearTimeout(rt);
        rt = setTimeout(function () { ui.w = root.offsetWidth; ui.h = root.offsetHeight; lsSet(K_UI, ui); }, 300);
      }).observe(root);
    }
  }

  function grow() {
    ta.style.height = "auto";
    ta.style.height = Math.min(160, ta.scrollHeight + 2) + "px";
  }

  function placeWin() {
    if (isMobile()) { root.style.left = root.style.top = ""; return; }
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var w = Math.min(ui.w || Math.round(400 * zoom()), vw - 16), hh = Math.min(ui.h || Math.min(620, vh - 96), vh - 16);
    root.style.width = w + "px";
    root.style.height = hh + "px";
    var x = ui.x != null ? ui.x : vw - w - 20, y = ui.y != null ? ui.y : Math.max(64, vh - hh - 20);
    x = Math.max(8, Math.min(x, vw - w - 8));
    y = Math.max(8, Math.min(y, vh - hh - 8));
    root.style.left = x + "px";
    root.style.top = y + "px";
    root._placed = true;
  }
  function zoom() {
    var z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--z"));
    return z > 0 ? z : 1;
  }

  /* ťahanie za hlavičku; na mobile ťah nadol zbalí panel */
  function setupDrag() {
    var sx, sy, ox, oy, on = false, moved = false;
    head.addEventListener("pointerdown", function (e) {
      if (e.button > 0 || e.target.closest("button")) return;
      on = true; moved = false; sx = e.clientX; sy = e.clientY;
      ox = root.offsetLeft; oy = root.offsetTop;
      try { head.setPointerCapture(e.pointerId); } catch (er) {}
    });
    head.addEventListener("pointermove", function (e) {
      if (!on) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      moved = true;
      if (isMobile()) { root.style.transform = dy > 0 ? "translateY(" + dy + "px)" : ""; return; }
      root.classList.add("is-drag");
      var vw = document.documentElement.clientWidth, vh = window.innerHeight;
      root.style.left = Math.max(8 - root.offsetWidth + 80, Math.min(ox + dx, vw - 80)) + "px";
      root.style.top = Math.max(0, Math.min(oy + dy, vh - 42)) + "px";
    });
    function end(e) {
      if (!on) return;
      on = false;
      root.classList.remove("is-drag");
      if (isMobile()) {
        var dy = e.clientY - sy;
        root.style.transform = "";
        if (moved && dy > 90) minimize();
        return;
      }
      if (moved) { ui.x = root.offsetLeft; ui.y = root.offsetTop; lsSet(K_UI, ui); }
    }
    head.addEventListener("pointerup", end);
    head.addEventListener("pointercancel", end);
  }

  /* mobil: klávesnica zmenší viditeľnú plochu – panel sa posunie nad ňu */
  function setupViewport() {
    var vv = window.visualViewport;
    if (!vv) return;
    function fit() {
      if (!isMobile() || root.hidden) { root.style.removeProperty("--pfai-kb"); root.style.removeProperty("--pfai-h"); return; }
      var kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--pfai-kb", kb + "px");
      root.style.setProperty("--pfai-h", kb > 80 ? (vv.height - 8) + "px" : Math.round(window.innerHeight * 0.72) + "px");
    }
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    root._fit = fit;
  }

  function open() {
    build();
    root.hidden = false;
    pill.hidden = true;
    pill.classList.remove("new");
    placeWin();
    if (root._fit) root._fit();
    render();
    if (view === "chat" && !COARSE) setTimeout(function () { ta.focus(); }, 30);
  }
  function minimize() {
    if (!root) return;
    root.hidden = true;
    pill.hidden = false;
    pill.classList.toggle("busy", !!busy);
  }
  /* zavrieť = to isté ako zbaliť (tlačidlo vpravo dole ostáva vždy); konverzácia sa nemaže */
  function close() { minimize(); }

  /* ── vykreslenie ────────────────────────────────────────────────────── */
  /* opts.keep = nechať posun okna, kde je (koniec odpovede nesmie okno odsunúť za jej začiatok) */
  function render(opts) {
    if (!root) return;
    var s = settings();
    modelBtn.textContent = ready(s) ? PROV[s.provider].short + " · " + (modelOf(s) || "?") : "nenastavené";
    setBtn.classList.toggle("on", view === "settings");
    if (view === "settings" || !ready(s)) { view = "settings"; renderSettings(); return; }
    compose.hidden = false;
    renderMsgs(opts && opts.keep);
    renderDraft();
  }

  /* posun na koniec okamžite (bez animácie) – aj po načítaní obrázkov, ak čitateľ medzitým nerolloval */
  function toEnd() {
    body.scrollTop = body.scrollHeight;
    var want = body.scrollTop;
    Array.prototype.forEach.call(body.querySelectorAll("img"), function (img) {
      if (img.complete) return;
      img.addEventListener("load", function () {
        if (Math.abs(body.scrollTop - want) < 4) { body.scrollTop = body.scrollHeight; want = body.scrollTop; }
      }, { once: true });
    });
  }

  function renderMsgs(keep) {
    var prevTop = body.scrollTop;
    body.innerHTML = "";
    chips.innerHTML = "";
    if (!chat.msgs.length) {
      body.appendChild(h("div", "pfai-empty", "<p class=\"lead\">Na čo sa chceš opýtať?</p><p>Označ text v kapitole → <em>Opýtať sa AI</em>,<br>alebo napíš otázku. Cez + pridáš výrez obrazovky.</p>"));
      return;
    }
    chat.msgs.forEach(function (m, i) { body.appendChild(msgEl(m, i)); });
    var last = chat.msgs[chat.msgs.length - 1];
    if (!busy && last && last.role === "assistant" && !last.error && last.text) {
      FOLLOWUPS.forEach(function (f) {
        var c = h("button", "pfai-chip");
        c.type = "button";
        c.textContent = f[0];
        c.onclick = function () { sendMsg({ role: "user", text: f[1], label: f[0] }); };
        chips.appendChild(c);
      });
    }
    if (keep) body.scrollTop = prevTop; else toEnd();
  }

  function msgEl(m, i) {
    if (m.role === "user") {
      var u = h("div", "pfai-msg u");
      if (m.quote) {
        var q = h("div", "pfai-quote", (m.quote.where ? "<small>" + esc(m.quote.where) + "</small>" : "") + esc(m.quote.text));
        q.title = "Zobraziť celý úryvok";
        q.onclick = function () { q.classList.toggle("open"); };
        u.appendChild(q);
      }
      if ((m.images && m.images.length) || m.imgLost) {
        var im = h("div", "pfai-imgs");
        (m.images || []).forEach(function (src) {
          var img = h("img");
          img.src = src; img.alt = "Priložená snímka";
          img.onclick = function () { viewImg(src); };
          im.appendChild(img);
        });
        if (m.imgLost) im.appendChild(h("span", "lost", "(snímka sa pre veľkosť neuložila)"));
        u.appendChild(im);
      }
      var txt = m.label || m.text || (m.quote ? ASK_DEFAULT : "");
      if (txt) u.appendChild(h("div", "pfai-bub")).textContent = txt;
      return u;
    }
    var a = h("div", "pfai-msg a" + (m.error ? " err" : ""));
    var bub = h("div", "pfai-bub");
    a.appendChild(bub);
    if (m.error) {
      bub.innerHTML = "<p>" + esc(m.error) + "</p>" +
        (m.errDetail ? '<p class="pfai-detail">' + esc(m.errDetail) + "</p>" : "");
      var acts = h("div", "pfai-btns");
      var rb = h("button", "pfai-btn", "Skúsiť znova");
      rb.type = "button";
      rb.onclick = function () { retryFrom(i); };
      acts.appendChild(rb);
      if (/kľúč|model|obrázky/i.test(m.error)) {
        var sb = h("button", "pfai-btn", "Nastavenia");
        sb.type = "button";
        sb.onclick = function () { view = "settings"; render(); };
        acts.appendChild(sb);
      }
      bub.appendChild(acts);
      return a;
    }
    if (m.pending && !m.text) bub.innerHTML = '<span class="pfai-dots" aria-label="Píše sa odpoveď"><i></i><i></i><i></i></span>' +
      (m.note ? '<div class="pfai-stopped">' + esc(m.note) + "</div>" : "");
    else bub.innerHTML = md(m.text);
    if (m.stopped) bub.appendChild(h("div", "pfai-stopped", "(odpoveď zastavená)"));
    if (m.fallback && !m.pending) bub.appendChild(h("div", "pfai-stopped", "Odpovedal záložný model " + m.fallback + " – zvolený model bol preťažený alebo vyčerpal limit."));
    if (!m.pending && m.text) {
      var meta = h("div", "pfai-meta");
      var cb = ib(I.copy, "Kopírovať odpoveď");
      cb.onclick = function () {
        (navigator.clipboard ? navigator.clipboard.writeText(m.text) : Promise.reject()).then(function () { toast("Odpoveď je skopírovaná."); }, function () { toast("Kopírovanie sa nepodarilo."); });
      };
      meta.appendChild(cb);
      if (i === chat.msgs.length - 1) {
        var rb2 = ib(I.retry, "Odpovedať znova");
        rb2.onclick = function () { retryFrom(i); };
        meta.appendChild(rb2);
      }
      a.appendChild(meta);
    }
    return a;
  }

  function renderDraft() {
    atts.innerHTML = "";
    if (draft.quote) {
      var q = h("div", "pfai-att q", "<span>„" + esc(draft.quote.text) + "“</span>");
      var x = h("button", "x", "×");
      x.type = "button"; x.title = "Odobrať úryvok"; x.setAttribute("aria-label", x.title);
      x.onclick = function () { draft.quote = null; renderDraft(); };
      q.appendChild(x);
      atts.appendChild(q);
    }
    draft.images.forEach(function (src, k) {
      var a = h("div", "pfai-att");
      var img = h("img");
      img.src = src; img.alt = "Snímka na odoslanie";
      img.onclick = function () { viewImg(src); };
      var x = h("button", "x", "×");
      x.type = "button"; x.title = "Odobrať obrázok"; x.setAttribute("aria-label", x.title);
      x.onclick = function () { draft.images.splice(k, 1); renderDraft(); };
      a.appendChild(img); a.appendChild(x);
      atts.appendChild(a);
    });
    atts.hidden = !draft.quote && !draft.images.length;
    var enter = COARSE ? "" : " (Enter = vysvetliť)";
    ta.placeholder = draft.images.length ? "Čo ťa na snímke zaujíma?" + enter : draft.quote ? "Otázka k úryvku…" + enter : "Opýtaj sa…";
    /* rozpísaná správa so snímkou alebo úryvkom má prednosť pred rýchlymi návrhmi */
    chips.hidden = !!(draft.quote || draft.images.length);
    send.innerHTML = busy ? I.stop : I.send;
    send.classList.toggle("stop", !!busy);
    send.title = busy ? "Zastaviť odpoveď" : "Odoslať";
    send.setAttribute("aria-label", send.title);
  }

  function viewImg(src) {
    var v = h("div", "pfai-view");
    var img = h("img");
    img.src = src; img.alt = "";
    v.appendChild(img);
    v.onclick = function () { v.remove(); };
    v.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape") v.remove(); });
    v.tabIndex = -1;
    document.body.appendChild(v);
    v.focus();
  }

  function addFiles(fs) {
    fs = fs.filter(Boolean).slice(0, 4 - draft.images.length);
    if (!fs.length) { if (draft.images.length >= 4) toast("Najviac 4 obrázky v jednej správe."); return; }
    Promise.all(fs.map(function (f) { return fileToData(f).catch(function () { return null; }); })).then(function (list) {
      list.forEach(function (d) { if (d) draft.images.push(d); });
      if (list.some(function (d) { return !d; })) toast("Niektorý súbor sa nedal načítať ako obrázok.");
      renderDraft();
      ta.focus();
    });
  }

  function doSnip() {
    if (draft.images.length >= 4) { toast("Najviac 4 obrázky v jednej správe."); return; }
    var wasOpen = !root.hidden;
    root.hidden = true;                 /* okno sa pri výbere skryje (na mobile aj na počítači) */
    pill.hidden = true;
    var activeSel = window.getSelection && window.getSelection();
    if (activeSel && activeSel.removeAllRanges) activeSel.removeAllRanges();
    snip().then(function (r) {
      if (!r) { if (wasOpen) open(); return; }
      var wait = toast.bind(null, "Robím snímku…", 15000);
      wait();
      /* dva snímky obrazovky prehliadača, kým zmizne prekrytie */
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        capture(r).then(function (d) {
          if (toastEl) toastEl.remove();
          draft.images.push(d);
          open();
          renderDraft();
          if (!COARSE) ta.focus();
        }, function (e) {
          if (toastEl) toastEl.remove();
          open();
          toast("Výrez sa nepodaril (" + ((e && e.message) || "chyba") + "). Skús „Obrázok zo zariadenia“.", 6000);
        });
      }); });
    });
  }

  /* ── odoslanie ──────────────────────────────────────────────────────── */
  function submit() {
    var t = ta.value.trim();
    if (!t && !draft.quote && !draft.images.length) return;
    var m = { role: "user", text: t };
    if (draft.quote) m.quote = draft.quote;
    if (draft.images.length) m.images = draft.images.slice();
    draft = { quote: null, images: [] };
    ta.value = "";
    grow();
    sendMsg(m);
  }

  function sendMsg(m) {
    if (busy) return;
    var s = settings();
    if (!ready(s)) { afterSetup = m; view = "settings"; render(); return; }
    if (navigator.onLine === false) { toast("Si offline – AI potrebuje pripojenie na internet."); if (m.text && !ta.value) ta.value = m.text; return; }
    m.at = Date.now();
    chat.msgs.push(m);
    run();
  }

  function retryFrom(i) {
    if (busy) return;
    chat.msgs = chat.msgs.slice(0, i);   /* odpoveď (alebo chyba) preč, otázka ostane */
    while (chat.msgs.length && chat.msgs[chat.msgs.length - 1].role !== "user") chat.msgs.pop();
    if (!chat.msgs.length) { render(); return; }
    run();
  }

  function run() {
    var s = settings();
    var a = { role: "assistant", text: "", pending: true, model: PROV[s.provider].short + " · " + modelOf(s) };
    var hist = chat.msgs.slice();
    chat.msgs.push(a);
    busy = window.AbortController ? new AbortController() : { abort: function () {}, signal: undefined };
    var ctl = busy;
    saveChat();
    render();
    var last = chat.msgs.length - 1, raf = null;
    function paint() {
      raf = null;
      if (!a.pending || !root || root.hidden || view !== "chat") return;
      var el = body.lastElementChild;
      if (!el) return;
      var stick = body.scrollHeight - body.scrollTop - body.clientHeight < 60;
      var bub = el.querySelector(".pfai-bub");
      bub.innerHTML = a.text ? md(a.text) : '<span class="pfai-dots" aria-label="Píše sa odpoveď"><i></i><i></i><i></i></span>' +
        (a.note ? '<div class="pfai-stopped">' + esc(a.note) + "</div>" : "");
      /* okno ide za odpoveďou, kým jej začiatok nevystúpi k hornému okraju – potom stojí a odpoveď sa číta od začiatku */
      if (stick) {
        var startTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 8;
        var target = Math.min(body.scrollHeight - body.clientHeight, Math.max(0, startTop));
        if (target > body.scrollTop) body.scrollTop = target;
      }
    }
    function onText(t) {
      a.text = t;
      a.note = "";
      if (!raf) raf = requestAnimationFrame(paint);
    }
    function wait(ms) {
      return new Promise(function (res, rej) {
        var t = setTimeout(res, ms);
        if (ctl.signal) ctl.signal.addEventListener("abort", function () { clearTimeout(t); var e = new Error("stop"); e.name = "AbortError"; rej(e); });
      });
    }
    /* 5xx = preťaženie: zvolený model 2× znova s odstupom; potom (aj pri 429) ďalšie modely z FALLBACK po jednom pokuse. Len kým nič neprišlo. */
    var chosen = modelOf(s), tried = [chosen];
    function attempt(model, n) {
      var s2 = Object.assign({}, s, { models: Object.assign({}, s.models) });
      s2.models[s.provider] = model;
      return chatRequest(s2, hist, onText, ctl.signal).catch(function (e) {
        if (!e || e.name === "AbortError" || a.text || !e.status) throw e;
        var busyErr = e.status >= 500, limit = e.status === 429;
        if (busyErr && n < (model === chosen ? 2 : 0)) {   /* záložný model len raz – celý výpadok ≈ 6 s, nie 20 */
          a.note = "Služba je preťažená – skúšam znova (" + (n + 2) + ". pokus)…";
          paint();
          return wait(n ? 4000 : 1500).then(function () { return attempt(model, n + 1); });
        }
        var list = FALLBACK[s.provider] || [];
        var next = (busyErr || limit || (tried.length > 1 && e.status === 404)) ? list.filter(function (m) { return tried.indexOf(m) < 0; })[0] : null;
        if (!next) throw e;
        tried.push(next);
        a.note = "Model " + model + " " + (limit ? "vyčerpal limit" : "neodpovedá") + " – skúšam " + next + "…";
        a.fallback = next;
        a.model = PROV[s.provider].short + " · " + next;
        paint();
        return attempt(next, 0);
      });
    }
    attempt(chosen, 0).then(function (t) {
      a.text = t || a.text;
      if (!a.text.trim()) a.error = "Služba neposlala žiadnu odpoveď. Skús to znova alebo iný model.";
    }, function (e) {
      if (e && e.name === "AbortError") { a.stopped = true; if (!a.text) a.text = ""; return; }
      var msg = e && e.message;
      if (e instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(msg || "")) {
        msg = navigator.onLine === false ? "Si offline – AI potrebuje pripojenie na internet." :
          "Spojenie so službou sa nepodarilo (internet, adresa API alebo služba nepovoľuje volanie z prehliadača).";
      }
      a.error = msg || "Neznáma chyba.";
      a.fallback = null;
      if (e && (e.status || e.detail)) a.errDetail = "Odpoveď služby" + (e.status ? " (HTTP " + e.status + ")" : "") + (e.detail ? ": " + String(e.detail).slice(0, 300) : "") +
        (tried.length > 1 ? " · skúšané modely: " + tried.join(", ") : "");
    }).then(function () {
      /* čakajúce priebežné prekreslenie by prepísalo finálne (poznámku o záložnom modeli) */
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      a.pending = false;
      a.note = "";
      if (busy === ctl) busy = null;
      if (a.stopped && !a.text) chat.msgs.splice(last, 1);
      saveChat();
      if (root.hidden) { pill.hidden = false; pill.classList.add("new"); }
      pill.classList.remove("busy");
      render({ keep: true });
    });
  }

  /* ── nastavenia ─────────────────────────────────────────────────────── */
  function renderSettings() {
    var s = settings();
    body.innerHTML = "";
    chips.innerHTML = "";
    compose.hidden = true;
    var w = h("div", "pfai-set");
    var had = ready(s);
    w.innerHTML = "<h3>" + (had ? "Nastavenia AI" : "Pripoj si AI") + "</h3>" +
      "<p>" + (had ? "Poskytovateľa, kľúč aj model môžeš kedykoľvek zmeniť." :
        "AI odpovedá priamo v knihe. Potrebuje tvoj vlastný API kľúč – najjednoduchšie je <b>Gemini</b>: kľúč je zadarmo a vytvoríš ho za minútu.") + "</p>";

    var f1 = h("div", "pfai-field");
    f1.appendChild(h("span", "lbl", "Poskytovateľ"));
    var grid = h("div", "pfai-prov");
    grid.setAttribute("role", "radiogroup");
    var cur = s.provider;
    ORDER.forEach(function (p) {
      var lab = h("label", null, "<input type=\"radio\" name=\"pfai-prov\" value=\"" + p + "\"" + (p === cur ? " checked" : "") + "><span>" + esc(PROV[p].name) + "</span><small>" + esc(PROV[p].sub) + "</small>");
      grid.appendChild(lab);
    });
    f1.appendChild(grid);
    w.appendChild(f1);

    var fUrl = h("div", "pfai-field");
    fUrl.innerHTML = '<label for="pfai-url">Adresa API</label><div class="pfai-in"><input id="pfai-url" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://openrouter.ai/api/v1"></div>';
    w.appendChild(fUrl);

    var fKey = h("div", "pfai-field");
    fKey.innerHTML = '<label for="pfai-key">API kľúč</label><div class="pfai-in"><input id="pfai-key" type="password" autocomplete="off" spellcheck="false" autocapitalize="off"></div><p class="pfai-note"></p>';
    var eye = ib(I.eye, "Ukázať kľúč");
    fKey.querySelector(".pfai-in").appendChild(eye);
    w.appendChild(fKey);

    var fModel = h("div", "pfai-field");
    /* vlastný zoznam namiesto <datalist>: datalist ukazoval len položky zhodné s vyplneným modelom (teda jednu) */
    fModel.innerHTML = '<label for="pfai-model">Model</label><div class="pfai-in pfai-combo"><input id="pfai-model" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="pfai-mlist" autocomplete="off" spellcheck="false" autocapitalize="off"><div class="pfai-mlist" id="pfai-mlist" role="listbox" hidden></div></div>';
    var drop = ib(I.chev, "Vybrať model zo zoznamu", "pfai-mdrop");
    fModel.querySelector(".pfai-combo").insertBefore(drop, fModel.querySelector(".pfai-mlist"));
    var load = h("button", "pfai-btn", "Načítať modely");
    load.type = "button";
    load.title = "Overí kľúč a načíta modely, ktoré máš k dispozícii";
    fModel.querySelector(".pfai-combo").insertBefore(load, fModel.querySelector(".pfai-mlist"));
    var status = h("p", "pfai-status");
    status.setAttribute("role", "status");
    fModel.appendChild(status);
    w.appendChild(fModel);

    var btns = h("div", "pfai-btns");
    var save = h("button", "pfai-btn pri", afterSetup ? "Uložiť a opýtať sa" : "Uložiť");
    save.type = "button";
    btns.appendChild(save);
    var back = null, del = null;
    if (had) { back = h("button", "pfai-btn", "Späť na chat"); back.type = "button"; btns.appendChild(back); }
    del = h("button", "pfai-btn danger", "Odstrániť kľúč");
    del.type = "button";
    btns.appendChild(del);
    w.appendChild(btns);

    w.appendChild(h("div", "pfai-priv", "<b>Súkromie.</b> Kľúč sa uloží len v tomto prehliadači na tomto zariadení a posiela sa iba priamo zvolenému poskytovateľovi. " +
      "Otázky, úryvky a snímky idú tiež len k nemu – autor knihy ich nevidí. Na zdieľanom počítači kľúč po použití odstráň. " +
      "Odpovede AI môžu obsahovať chyby – pri učení ich porovnaj s textom knihy."));

    var pending = afterSetup || (draft.quote ? { quote: draft.quote } : null);
    if (pending && pending.quote) {
      var alt = h("div", "pfai-alt", "Nechceš si teraz zakladať kľúč? Pošli otázku do bežného chatu v novej karte:");
      var ab = h("div", "pfai-btns");
      var g1 = h("button", "pfai-btn", "ChatGPT ↗");
      var g2 = h("button", "pfai-btn", "Gemini ↗");
      g1.type = g2.type = "button";
      g1.onclick = function () { external("chatgpt", pending); };
      g2.onclick = function () { external("gemini", pending); };
      ab.appendChild(g1); ab.appendChild(g2);
      alt.appendChild(ab);
      w.appendChild(alt);
    }
    body.appendChild(w);
    body.scrollTop = 0;

    var inUrl = w.querySelector("#pfai-url"), inKey = w.querySelector("#pfai-key"), inModel = w.querySelector("#pfai-model");
    var mlist = w.querySelector("#pfai-mlist"), note = fKey.querySelector(".pfai-note");
    var ids = null, typed = false, act = -1;
    var local = { provider: s.provider, keys: Object.assign({}, s.keys), models: Object.assign({}, s.models), customUrl: s.customUrl };

    function fill() {
      var p = local.provider, P = PROV[p];
      fUrl.hidden = p !== "custom";
      inUrl.value = local.customUrl || "";
      inKey.value = local.keys[p] || "";
      inKey.placeholder = P.keyPh;
      inModel.value = local.models[p] || P.model;
      inModel.placeholder = P.model || "napr. meta-llama/llama-3.3-70b-instruct:free";
      note.innerHTML = esc(P.note) + (P.keyUrl ? ' <a href="' + P.keyUrl + '" target="_blank" rel="noopener noreferrer">Získať kľúč ↗</a>' : "");
      ids = null; hideList();
      status.textContent = ""; status.className = "pfai-status";
    }
    function collect() {
      var p = local.provider;
      local.keys[p] = inKey.value.trim();
      local.models[p] = inModel.value.trim();
      if (p === "custom") local.customUrl = inUrl.value.trim();
    }
    fill();
    grid.addEventListener("change", function (e) {
      if (e.target.name !== "pfai-prov") return;
      collect();
      local.provider = e.target.value;
      fill();
      inKey.focus();
    });
    eye.onclick = function () { inKey.type = inKey.type === "password" ? "text" : "password"; eye.classList.toggle("on", inKey.type === "text"); };
    function hideList() { mlist.hidden = true; inModel.setAttribute("aria-expanded", "false"); act = -1; }
    function showList() {
      if (!ids) return;
      var q = typed ? inModel.value.trim().toLowerCase() : "", cur = inModel.value.trim();
      var list = ids.filter(function (id) { return !q || id.toLowerCase().indexOf(q) >= 0; });
      mlist.innerHTML = "";
      if (!list.length) mlist.appendChild(h("div", "pfai-mnone", "Žiadny model nezodpovedá „" + esc(inModel.value.trim()) + "“."));
      list.forEach(function (id) {
        var o = h("div", "pfai-mopt" + (id === cur ? " cur" : ""));
        o.setAttribute("role", "option");
        o.setAttribute("aria-selected", String(id === cur));
        o.textContent = id;
        o.addEventListener("pointerdown", function (e) { e.preventDefault(); pick(id); });
        mlist.appendChild(o);
      });
      mlist.hidden = false;
      inModel.setAttribute("aria-expanded", "true");
      act = -1;
      var c = mlist.querySelector(".cur");
      if (c) mlist.scrollTop = Math.max(0, c.offsetTop - 40);
    }
    function pick(id) {
      inModel.value = id; typed = false; hideList(); collect();
      status.textContent = "Zvolený model: " + id + " – potvrď tlačidlom Uložiť."; status.className = "pfai-status ok";
    }
    /* načíta zoznam modelov (zároveň overí kľúč); thenOpen = potom ho rozbaliť */
    function loadIds(thenOpen) {
      collect();
      if (local.provider !== "custom" && !local.keys[local.provider]) { status.textContent = "Najprv vlož kľúč – zoznam modelov sa načíta s ním."; status.className = "pfai-status bad"; inKey.focus(); return; }
      if (local.provider === "custom" && !local.customUrl) { status.textContent = "Najprv vyplň adresu API."; status.className = "pfai-status bad"; inUrl.focus(); return; }
      status.textContent = "Overujem kľúč a načítavam modely…"; status.className = "pfai-status";
      load.disabled = drop.disabled = true;
      var prov = local.provider;
      listModels(local).then(function (got) {
        if (local.provider !== prov) return;
        ids = got.slice().sort();
        var m = inModel.value.trim();
        var okModel = !m || ids.indexOf(m) >= 0 || /-latest$/.test(m);
        status.textContent = "Kľúč funguje ✓ – " + ids.length + (ids.length === 1 ? " model." : ids.length >= 2 && ids.length <= 4 ? " modely." : " modelov.") + (okModel ? " Model vyberieš zo zoznamu (šípka pri poli)." : " Model „" + m + "“ v zozname nie je – vyber iný.");
        status.className = "pfai-status " + (okModel ? "ok" : "bad");
        if (thenOpen) { typed = false; showList(); inModel.focus(); }
      }, function (e) {
        status.textContent = (e instanceof TypeError) ? "Spojenie sa nepodarilo (internet alebo adresa API)." : (e.message || "Chyba.");
        status.className = "pfai-status bad";
      }).then(function () { load.disabled = drop.disabled = false; });
    }
    load.onclick = function () { loadIds(true); };
    drop.onclick = function () {
      if (!mlist.hidden) { hideList(); return; }
      if (ids) { typed = false; showList(); inModel.focus(); } else loadIds(true);
    };
    inModel.addEventListener("click", function () { if (ids && mlist.hidden) { typed = false; showList(); } });
    inModel.addEventListener("input", function () { typed = true; if (ids) showList(); });
    inModel.addEventListener("blur", function () { setTimeout(hideList, 150); });
    inModel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" && mlist.hidden) { e.preventDefault(); if (ids) { typed = false; showList(); } else loadIds(true); return; }
      if (mlist.hidden) return;
      var opts = mlist.querySelectorAll(".pfai-mopt");
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); hideList(); return; }
      if (e.key === "Enter" && act >= 0 && opts[act]) { e.preventDefault(); pick(opts[act].textContent); return; }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      if (!opts.length) return;
      if (act >= 0 && opts[act]) opts[act].classList.remove("act");
      act = e.key === "ArrowDown" ? Math.min(opts.length - 1, act + 1) : Math.max(0, act - 1);
      opts[act].classList.add("act");
      opts[act].scrollIntoView({ block: "nearest" });
    });
    save.onclick = function () {
      collect();
      var p = local.provider;
      if (p !== "custom" && !local.keys[p]) { status.textContent = "Vlož API kľúč (odkaz „Získať kľúč“ je vyššie)."; status.className = "pfai-status bad"; inKey.focus(); return; }
      if (p === "custom" && (!local.customUrl || !local.models[p])) { status.textContent = "Vyplň adresu API aj model."; status.className = "pfai-status bad"; return; }
      if (!lsSet(K_SET, local)) { status.textContent = "Prehliadač nedovolil nastavenia uložiť (súkromné okno?)."; status.className = "pfai-status bad"; return; }
      view = "chat";
      var m = afterSetup;
      afterSetup = null;
      if (m) { draft.quote = null; sendMsg(m); } else render();
    };
    if (back) back.onclick = function () { view = "chat"; render(); };
    del.onclick = function () {
      var p = local.provider;
      delete local.keys[p];
      var st = settings();
      delete st.keys[p];
      lsSet(K_SET, st);
      inKey.value = "";
      status.textContent = "Kľúč pre " + PROV[p].name + " je odstránený z tohto zariadenia."; status.className = "pfai-status ok";
      if (!ready(settings())) { modelBtn.textContent = "nenastavené"; if (back) back.remove(); }
    };
    if (!had && !COARSE) setTimeout(function () { inKey.focus(); }, 40);
  }

  /* bez kľúča: otázka do ChatGPT (odošle sa sama) alebo Gemini (cez schránku) – pôvodné správanie */
  function external(which, m) {
    var prompt = SYSTEM.replace(/ Formátuj v Markdowne.*$/, "") + "\n\n" + apiText(m);
    if (prompt.length > 6000) prompt = prompt.slice(0, 6000) + " […]";
    if (which === "chatgpt") {
      window.open("https://chatgpt.com/?q=" + encodeURIComponent(prompt), "_blank", "noopener");
      toast("Otázka je odoslaná do ChatGPT v novej karte.");
    } else {
      var c = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(prompt) : Promise.reject();
      window.open("https://gemini.google.com/app", "_blank", "noopener");
      c.then(function () { toast("Otázka je v schránke – v Gemini ju vlož cez Ctrl+V a odošli.", 6000); },
             function () { toast("Gemini je otvorené, ale text sa nepodarilo skopírovať."); });
    }
  }

  /* ── verejné rozhranie ──────────────────────────────────────────────── */
  window.PF_AI = {
    /* {text, where} z označeného textu: okno sa otvorí a otázka sa hneď pošle */
    ask: function (q) {
      build();
      var quote = { text: String(q.text || "").slice(0, 6000), where: q.where || "" };
      var m = { role: "user", text: "", quote: quote };
      open();
      if (!ready()) { afterSetup = m; view = "settings"; render(); return; }
      if (busy) { draft.quote = quote; view = "chat"; render(); toast("Úryvok je pripravený v správe – odošli ho, keď dobehne odpoveď."); return; }
      view = "chat";
      sendMsg(m);
    },
    open: function () { open(); },
    /* Esc v kapitole aj na hlavnej stránke: najprv vysvetlivky a lupa, potom okno AI, až potom obsah knihy */
    isOpen: function () { return !!root && !root.hidden; },
    close: function () { close(); },
    settings: function () { view = "settings"; open(); },
    ready: function () { return ready(); }
  };
})();

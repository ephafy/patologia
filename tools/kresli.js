#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/kresli.js — schéma z rámčekov a šípok, ktorej rozloženie počíta nástroj, nie ruka

   Zdieľaný súbor všetkých kníh (KNIHY-CORE) – v knihe ho nemeň.

   Prečo (7. 11. 2026, rozhovor s autorom: „nie je lepšie lepšie nastaviť to vyrábanie? potom to bude aj viac jednotné“):
   schémy sa kreslili ručne súradnicami a tools/schemy.js potom hľadal chyby (text za okrajom, nerovnaké okraje, popis
   nalepený na rámček, čiara cez popis, hrot hneď za ohybom). Väčšina pripomienok k schémam bola práve tohto druhu.
   Tento nástroj tieto chyby nerobí z princípu: veľkosť rámčeka plynie z textu, medzery a okraje z pravidiel nižšie,
   šípky sa vedú v medzerách medzi radmi a popis šípky dostane vlastné miesto. Kontrola schemy.js ostáva ako sieť.

   Zápis: chapters/fig/<meno>.kresba.json  →  build zapíše chapters/fig/<meno>.svg (obyčajné SVG; v .md sa naň
   odkazuje ako doteraz: ![Obr. …](fig/<meno>.svg)). SVG NEUPRAVUJ – pri ďalšom builde sa prepíše; upravuj .json.

   {
     "titul": "Prístupný opis celej schémy (čítačka obrazovky, <title>) – povinný",
     "sirka": 720,                                   // šírka plátna (predvolené 720)
     "nadpis": "TRI ROVINY: OD BUNKY K TELU",        // voliteľný nadpis nad schémou (trieda cap)
     "rady": [                                      // rady zhora nadol; v rade zľava doprava
       [ { "id": "bunka", "nazov": "BUNKA · 11.2", "text": ["diferenciácia → anaplázia", "atypia, mitózy"],
           "trieda": "bx-c", "odkaz": "#sec-11-2" }, … ],
       { "uzly": [ … ], "plne": false }             // rad ako objekt: "plne": false = rámčeky podľa textu, na stred
     ],                                             //   (predvolené: rad s 2+ rámčekmi vyplní šírku, 1 rámček podľa textu)
     "sipky": [
       { "od": "bunka", "do": "tkanivo" },           // susedné rámčeky v tom istom rade → vodorovná šípka
       { "od": "dignita", "do": "grade", "popis": "len pri zhubnom", "styl": "arwd" }   // do ďalšieho radu → nadol
     ],
     "pata": "voliteľná veta pod schémou (trieda sub)"
   }
   Rámček: "nazov" (tučne, lblb) · "text" reťazec alebo zoznam riadkov (sub; dlhý riadok sa sám zalomí) ·
   "trieda" bx-c | bx-m | bx-k | bx (predvolené bx-k) · "obrys" farba obrysu (napr. "var(--color-accent-600)") ·
   "odkaz" (#sec-… alebo kapitola#sec-…) · "sirka" pevná šírka (len v rade s "plne": false) · "zarovnanie": "vlavo".
   Šípka: "popis" · "styl": "arw" (plná, predvolené) | "arwd" (prerušovaná).
   Čo nástroj (zatiaľ) nevie a ohlási ako chybu: šípku nahor, cez rad, medzi nesusednými rámčekmi v rade, kruh (⟳).
   Také schémy sa kreslia ručne ako doteraz (vzor: fig-kruh-*.svg) a stráži ich schemy.js.

   Ručne:  node tools/kresli.js             vygeneruje všetky .kresba.json v knihe
           node tools/kresli.js fig-xyz     len jednu
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");
const V = require("./vzorce.js");

const ROOT = process.env.KNIHA_ROOT ? path.resolve(process.env.KNIHA_ROOT) : path.resolve(__dirname, "..");
const FIG = path.join(ROOT, "chapters", "fig");
const ZNACKA = "vygenerované nástrojom tools/kresli.js";

/* ── pravidlá rozloženia (jednotky viewBoxu) ─────────────────────────────── */
const PAD = 12;          // okraj okolo obsahu – ten istý, aký vyžaduje schemy.js
const GAP_H = 22;        // vodorovná medzera medzi rámčekmi v rade
const BOX_PX = 14;       // vnútorný okraj rámčeka vľavo a vpravo
const BOX_PV = 10;       // vnútorný okraj rámčeka hore a dole (od písmen)
const LINE_GAP = 5;      // medzera medzi riadkami textu (od spodku písmen po vrch ďalších)
const TITLE_GAP = 2;     // navyše pod názvom rámčeka
const MIN_W = 110;       // najmenšia šírka rámčeka
const GAP_V_MIN = 30;    // najmenšia zvislá medzera medzi radmi
const FIRST = 12;        // prvý zvislý úsek šípky (od rámčeka po ohyb)
const LEVEL = 10;        // vzdialenosť dvoch vodorovných úrovní šípok v jednej medzere
const FINAL = 22;        // posledný úsek pred hrotom (schemy.js žiada ≥ 14)
const END_GAP = 2;       // hrot končí kúsok pred rámčekom
const L_CLEAR = 7;       // popis šípky: voľno od čiary a rámčeka (schemy.js „tesno“ žiada ≥ 4)
const PORT_EDGE = 16;    // prípojka šípky najbližšie k rohu rámčeka
const PORT_STEP = 90;    // najväčší rozostup prípojok na jednej strane rámčeka
const SAFE = 1.05;       // rezerva šírky textu (tabuľka šírok písmen je odhad)

const FONT = { lblb: { size: 11, bold: true }, sub: { size: 9.5 }, cap: { size: 9.5, caps: true, ls: 0.08 } };
const ASC = 0.72, DESC = 0.2;   // výška písmen nad a pod účiarím (ako ich meria schemy.js – bez vzduchu písma)

const r1 = (n) => Math.round(n * 10) / 10;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function tw(str, cls) {
  const f = FONT[cls];
  const s = f.caps ? String(str).toUpperCase() : String(str);
  return (V.textWidth(s, f.size, f.bold) + (f.ls ? [...s].length * f.ls * f.size : 0)) * SAFE;
}
const asc = (cls) => ASC * FONT[cls].size, desc = (cls) => DESC * FONT[cls].size;

function zalom(line, cls, max) {
  if (tw(line, cls) <= max) return [line];
  const words = line.split(" "), out = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (!cur || tw(t, cls) <= max) cur = t; else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out;
}

/* riadky rámčeka [{t, cls}] pri danej vnútornej šírke */
function riadky(u, inner) {
  const L = [];
  if (u.nazov) zalom(u.nazov, "lblb", inner).forEach((t) => L.push({ t, cls: "lblb" }));
  const tx = u.text === undefined ? [] : Array.isArray(u.text) ? u.text : [u.text];
  tx.forEach((s) => zalom(s, "sub", inner).forEach((t) => L.push({ t, cls: "sub" })));
  return L;
}
const sirkaTextu = (u) => {
  const tx = u.text === undefined ? [] : Array.isArray(u.text) ? u.text : [u.text];
  return Math.max(u.nazov ? tw(u.nazov, "lblb") : 0, ...tx.map((s) => tw(s, "sub")), 0);
};
function vyskaRiadkov(L) {
  let h = 0;
  L.forEach((l, i) => {
    if (i === 0) { h += asc(l.cls); return; }
    const p = L[i - 1];
    h += desc(p.cls) + LINE_GAP + (p.cls === "lblb" && l.cls !== "lblb" ? TITLE_GAP : 0) + asc(l.cls);
  });
  return L.length ? h + desc(L[L.length - 1].cls) : 0;
}

function kresli(spec, name) {
  const E = (m) => { throw new Error(`${name}.kresba.json: ${m}`); };
  if (!spec.titul) E("chýba „titul“ (prístupný opis schémy)");
  if (!Array.isArray(spec.rady) || !spec.rady.length) E("chýbajú „rady“");
  const W = spec.sirka || 720, usable = W - 2 * PAD;
  const nodes = new Map();
  const rows = spec.rady.map((r, ri) => {
    const uzly = Array.isArray(r) ? r : r.uzly;
    if (!Array.isArray(uzly) || !uzly.length) E(`rad ${ri + 1} je prázdny`);
    const plne = Array.isArray(r) ? uzly.length > 1 : r.plne !== undefined ? !!r.plne : uzly.length > 1;
    const row = { ri, plne, nodes: [] };
    uzly.forEach((u, ci) => {
      if (!u.id) E(`rad ${ri + 1}, rámček ${ci + 1}: chýba „id“`);
      if (nodes.has(u.id)) E(`id „${u.id}“ je dvakrát`);
      const n = { ...u, ri, ci, out: [], inn: [] };
      nodes.set(u.id, n); row.nodes.push(n);
    });
    return row;
  });

  /* šípky: rozdelenie na vodorovné (v rade) a zvislé (do ďalšieho radu) */
  const edges = (spec.sipky || []).map((s, i) => {
    const a = nodes.get(s.od), b = nodes.get(s.do);
    if (!a || !b) E(`šípka ${i + 1}: neznámy rámček „${!a ? s.od : s.do}“`);
    const e = { ...s, a, b, styl: s.styl || "arw" };
    if (!/^arwd?$/.test(e.styl)) E(`šípka ${s.od} → ${s.do}: neznámy štýl „${e.styl}“ (arw, arwd)`);
    if (a.ri === b.ri) {
      if (Math.abs(a.ci - b.ci) !== 1) E(`šípka ${s.od} → ${s.do}: v rade smie viesť len k susednému rámčeku`);
      e.typ = "rad";
    } else if (b.ri === a.ri + 1) { e.typ = "dole"; a.out.push(e); b.inn.push(e); }
    else E(`šípka ${s.od} → ${s.do}: vedie ${b.ri < a.ri ? "nahor" : "cez rad"} – to nástroj nevie, nakresli schému ručne`);
    return e;
  });

  /* rozmery rámčekov a poloha v rade */
  let y = PAD;
  const parts = [];
  if (spec.nadpis) {
    parts.push({ k: "cap", t: spec.nadpis, x: W / 2, y: y + asc("cap") });
    y += asc("cap") + desc("cap") + 10;
  }
  rows.forEach((row) => {
    const n = row.nodes.length;
    const labelW = Math.max(0, ...edges.filter((e) => e.typ === "rad" && e.a.ri === row.ri && e.popis).map((e) => tw(e.popis, "sub") + 2 * L_CLEAR));
    const gap = Math.max(GAP_H, labelW);
    row.gap = gap;
    if (row.plne) {
      const w = (usable - (n - 1) * gap) / n;
      if (w < MIN_W) E(`rad ${row.ri + 1}: ${n} rámčekov sa do šírky ${W} nezmestí – rozdeľ rad`);
      row.nodes.forEach((u, i) => { u.w = w; u.x = PAD + i * (w + gap); });
    } else {
      const maxW = (usable - (n - 1) * gap) / n;
      row.nodes.forEach((u) => {
        u.w = u.sirka ? u.sirka : Math.min(maxW, Math.max(MIN_W, sirkaTextu(u) + 2 * BOX_PX));
      });
      const tot = row.nodes.reduce((s, u) => s + u.w, 0) + (n - 1) * gap;
      if (tot > usable + 0.5) E(`rad ${row.ri + 1}: rámčeky sú spolu širšie ako plátno (${r1(tot)} > ${usable})`);
      let x = PAD + (usable - tot) / 2;
      row.nodes.forEach((u) => { u.x = x; x += u.w + gap; });
    }
    row.nodes.forEach((u) => {
      u.L = riadky(u, u.w - 2 * BOX_PX);
      if (!u.L.length) E(`rámček „${u.id}“ nemá text`);
      u.h0 = vyskaRiadkov(u.L) + 2 * BOX_PV;
    });
    row.h = Math.max(...row.nodes.map((u) => u.h0));
    row.y = y;
    row.nodes.forEach((u) => { u.y = y; u.h = row.h; u.cx = u.x + u.w / 2; });
    row.bottom = y + row.h;
    y = row.bottom;   // medzera sa doplní po vedení šípok
    row.gapBelow = null;
  });

  /* prípojky zvislých šípok: na každej strane rámčeka rovnomerne, zoradené podľa druhého konca (bez kríženia) */
  const ports = (u, list, end) => {
    const other = (e) => (end === "a" ? e.b : e.a).cx;
    list.sort((p, q) => other(p) - other(q));
    const k = list.length;
    const step = k > 1 ? Math.min((u.w - 2 * PORT_EDGE) / (k - 1), PORT_STEP) : 0;
    list.forEach((e, i) => { e[end === "a" ? "sx" : "tx"] = u.cx + (i - (k - 1) / 2) * step; });
  };
  nodes.forEach((u) => { ports(u, u.out, "a"); ports(u, u.inn, "b"); });
  // vyrovnanie: jediná šípka na jednej strane sa prispôsobí druhému koncu, ak tým zmizne ohyb
  edges.filter((e) => e.typ === "dole").forEach((e) => {
    const inT = (x, u) => x >= u.x + PORT_EDGE && x <= u.x + u.w - PORT_EDGE;
    if (Math.abs(e.sx - e.tx) < 0.5) return;
    if (e.b.inn.length === 1 && inT(e.sx, e.b)) e.tx = e.sx;
    else if (e.a.out.length === 1 && inT(e.tx, e.a)) e.sx = e.tx;
  });

  /* vedenie v každej medzere: vodorovné úrovne tak, aby sa šípky čo najmenej krížili */
  rows.slice(0, -1).forEach((row) => {
    const E2 = edges.filter((e) => e.typ === "dole" && e.a.ri === row.ri);
    const bent = E2.filter((e) => Math.abs(e.sx - e.tx) >= 0.5);
    const span = (e) => [Math.min(e.sx, e.tx), Math.max(e.sx, e.tx)];
    let best = null;
    const perm = (arr) => arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perm(arr.slice(0, i).concat(arr.slice(i + 1))).map((p) => [x].concat(p)));
    const orders = bent.length <= 6 ? perm(bent) : [bent];
    for (const ord of orders) {
      const lv = new Map(), levels = [];
      ord.forEach((e) => {
        const [x1, x2] = span(e);
        let L = levels.findIndex((occ) => occ.every(([a, b]) => x2 + 8 < a || x1 - 8 > b));
        if (L < 0) { levels.push([]); L = levels.length - 1; }
        levels[L].push([x1, x2]); lv.set(e, L);
      });
      // kríženia: zvislý úsek inej šípky cez vodorovný úsek
      let cross = 0;
      for (const e of bent) {
        const [x1, x2] = span(e), L = lv.get(e);
        for (const f of E2) {
          if (f === e) continue;
          const Lf = lv.has(f) ? lv.get(f) : Infinity;   // rovná šípka ide celou medzerou
          if (f.sx > x1 && f.sx < x2 && (Lf === Infinity || Lf > L)) cross++;    // prvý úsek f klesá pod úroveň e
          if (f.tx > x1 && f.tx < x2 && (Lf === Infinity || Lf < L)) cross++;    // posledný úsek f začína nad úrovňou e
        }
      }
      const score = cross * 100 + levels.length;
      if (!best || score < best.score) best = { score, lv, n: levels.length, cross };
    }
    const nLev = best ? best.n : 0;
    if (best && best.cross) console.log(`  ⚠ ${name}: v medzere pod radom ${row.ri + 1} sa šípky krížia (${best.cross}×) – zváž iné poradie rámčekov`);
    const labelH = E2.some((e) => e.popis) ? asc("sub") + desc("sub") + 2 * L_CLEAR : 0;
    const fin = Math.max(FINAL, labelH);
    const gap = Math.max(GAP_V_MIN, nLev ? FIRST + (nLev - 1) * LEVEL + fin : labelH ? FIRST + labelH : 0);
    row.gapBelow = gap;
    E2.forEach((e) => { e.level = best && best.lv.has(e) ? best.lv.get(e) : null; e.gap = row; });
  });
  // posun radov o vypočítané medzery
  let shift = 0;
  rows.forEach((row, i) => {
    if (i > 0) shift += rows[i - 1].gapBelow;
    row.y += shift; row.bottom += shift;
    row.nodes.forEach((u) => { u.y += shift; });
  });

  /* kreslenie */
  const out = [], boxes = [], segs = [], labels = [];
  const mid = "m" + name.replace(/[^a-z0-9]/gi, "");
  rows.forEach((row) => row.nodes.forEach((u) => {
    const cls = u.trieda || "bx-k";
    if (!/^bx(-[ckm])?$/.test(cls)) E(`rámček „${u.id}“: neznáma trieda „${cls}“`);
    boxes.push({ x1: u.x, y1: u.y, x2: u.x + u.w, y2: u.y + u.h, u });
    const g = [];
    g.push(`<rect class="${cls}" x="${r1(u.x)}" y="${r1(u.y)}" width="${r1(u.w)}" height="${r1(u.h)}" rx="3"${u.obrys ? ` stroke="${esc(u.obrys)}"` : ""}/>`);
    // text zvislo na stred rámčeka
    let ty = u.y + (u.h - vyskaRiadkov(u.L)) / 2;
    const left = u.zarovnanie === "vlavo";
    const tx = left ? u.x + BOX_PX : u.cx;
    u.L.forEach((l, i) => {
      if (i === 0) ty += asc(l.cls);
      else { const p = u.L[i - 1]; ty += desc(p.cls) + LINE_GAP + (p.cls === "lblb" && l.cls !== "lblb" ? TITLE_GAP : 0) + asc(l.cls); }
      g.push(`<text class="${l.cls}" x="${r1(tx)}" y="${r1(ty)}"${left ? "" : ' text-anchor="middle"'}>${esc(l.t)}</text>`);
    });
    out.push(u.odkaz ? `<a href="${esc(u.odkaz)}" class="map-link">\n${g.join("\n")}\n</a>` : g.join("\n"));
  }));
  const arrow = (pts, styl) => {
    for (let i = 1; i < pts.length; i++) segs.push([pts[i - 1], pts[i]]);
    out.push(`<path class="${styl}" d="M${pts.map((p) => r1(p[0]) + "," + r1(p[1])).join(" L")}" marker-end="url(#${mid})"/>`);
  };
  const lblQueue = [];
  edges.forEach((e) => {
    if (e.typ === "rad") {
      const yy = Math.min(e.a.y + e.a.h / 2, e.b.y + e.b.h / 2);
      const right = e.b.ci > e.a.ci;
      const x1 = right ? e.a.x + e.a.w : e.a.x, x2 = right ? e.b.x - END_GAP : e.b.x + e.b.w + END_GAP;
      arrow([[x1, yy], [x2, yy]], e.styl);
      if (e.popis) lblQueue.push({ e, kand: [{ x: (x1 + x2) / 2, y: yy - L_CLEAR - desc("sub"), anchor: "middle" }] });
      return;
    }
    const top = e.a.y + e.a.h, bot = e.b.y - END_GAP;
    let pts;
    if (e.level === null) pts = [[e.sx, top], [e.tx, bot]];
    else { const ly = top + FIRST + e.level * LEVEL; pts = [[e.sx, top], [e.sx, ly], [e.tx, ly], [e.tx, bot]]; e.ly = ly; }
    arrow(pts, e.styl);
    if (e.popis) {
      // poradie miest: pod vodorovným úsekom (číta sa spolu s ohybom) → nad ním → vedľa posledného zvislého úseku
      // (najprv na strane, z ktorej neprichádza vodorovná čiara); berie sa prvé, ktoré nič nezakryje (hit nižšie)
      const kand = [];
      if (e.ly !== undefined) {
        const cx = (e.sx + e.tx) / 2;
        kand.push({ x: cx, y: e.ly + L_CLEAR + asc("sub"), anchor: "middle" });
        kand.push({ x: cx, y: e.ly - L_CLEAR - desc("sub"), anchor: "middle" });
      }
      const y1 = e.ly !== undefined ? e.ly : top, y2 = e.b.y;
      const by = (y1 + y2) / 2 + (asc("sub") - desc("sub")) / 2;
      const odL = e.ly !== undefined && e.sx > e.tx;   // čiara prichádza sprava → popis vľavo
      const L = { x: e.tx - L_CLEAR, y: by, anchor: "end" }, R = { x: e.tx + L_CLEAR, y: by, anchor: "start" };
      kand.push(...(odL ? [L, R] : [R, L]));
      lblQueue.push({ e, kand });
    }
  });
  // popisy: prvé miesto, ktoré nekoliduje s rámčekom ani čiarou
  const bb = (c, t) => {
    const w = tw(t, "sub");
    const x1 = c.anchor === "middle" ? c.x - w / 2 : c.anchor === "end" ? c.x - w : c.x;
    return { x1, x2: x1 + w, y1: c.y - asc("sub"), y2: c.y + desc("sub") };
  };
  const hit = (b, m) => {
    for (const r of boxes) if (b.x1 < r.x2 + m && b.x2 > r.x1 - m && b.y1 < r.y2 + m && b.y2 > r.y1 - m) return true;
    for (const [p, q] of segs) {
      const sx1 = Math.min(p[0], q[0]), sx2 = Math.max(p[0], q[0]), sy1 = Math.min(p[1], q[1]), sy2 = Math.max(p[1], q[1]);
      if (b.x1 < sx2 + m && b.x2 > sx1 - m && b.y1 < sy2 + m && b.y2 > sy1 - m) return true;
    }
    for (const l of labels) if (b.x1 < l.x2 + m && b.x2 > l.x1 - m && b.y1 < l.y2 + m && b.y2 > l.y1 - m) return true;
    return b.x1 < PAD - 0.5 || b.x2 > W - PAD + 0.5;
  };
  lblQueue.forEach(({ e, kand }) => {
    const c = kand.find((k) => !hit(bb(k, e.popis), L_CLEAR - 1.5));
    if (!c) E(`popis šípky ${e.a.id} → ${e.b.id} („${e.popis}“) sa nemá kam zmestiť – skráť ho alebo zmeň poradie rámčekov`);
    labels.push(bb(c, e.popis));
    out.push(`<text class="sub" x="${r1(c.x)}" y="${r1(c.y)}"${c.anchor === "start" ? "" : ` text-anchor="${c.anchor}"`}>${esc(e.popis)}</text>`);
  });

  /* nadpis a päta */
  const last = rows[rows.length - 1];
  let H = last.bottom;
  const xs = [];   // vodorovné rozpätia všetkého, čo je nakreslené
  boxes.forEach((b) => xs.push([b.x1, b.x2])); labels.forEach((l) => xs.push([l.x1, l.x2]));
  const head = parts.map((p) => { const w = tw(p.t, "cap"); xs.push([p.x - w / 2, p.x + w / 2]); return `<text class="cap" x="${r1(p.x)}" y="${r1(p.y)}" text-anchor="middle">${esc(p.t)}</text>`; });
  if (spec.pata) {
    let py = H + 12;
    zalom(spec.pata, "sub", usable).forEach((t, i) => {
      py += (i ? desc("sub") + LINE_GAP : 0) + asc("sub");
      const w = tw(t, "sub"); xs.push([W / 2 - w / 2, W / 2 + w / 2]);
      out.push(`<text class="sub" x="${r1(W / 2)}" y="${r1(py)}" text-anchor="middle">${esc(t)}</text>`);
    });
    H = py + desc("sub");
  }
  // viewBox = obsah + PAD zo všetkých strán (rad užší ako plátno schému zúži)
  const minX = Math.min(...xs.map((s) => s[0])), maxX = Math.max(...xs.map((s) => s[1]));
  const vb = [r1(minX - PAD), 0, r1(maxX - minX + 2 * PAD), r1(H + PAD)];
  const tid = "t" + name.replace(/[^a-z0-9]/gi, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" role="img" aria-labelledby="${tid}">\n` +
    `<!-- ${ZNACKA} z ${name}.kresba.json – NEUPRAVUJ, uprav .json (prepíše sa pri ďalšom builde) -->\n` +
    `<title id="${tid}">${esc(spec.titul)}</title>\n` +
    `<defs><marker id="${mid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mk"/></marker></defs>\n` +
    (head.length ? head.join("\n") + "\n" : "") + out.join("\n") + "\n</svg>\n";
}

/* všetky .kresba.json v chapters/fig → .svg; vráti { hotove, chyby } (build pri chybe končí kódom 1) */
function vsetky(len) {
  const res = { hotove: [], chyby: [] };
  if (!fs.existsSync(FIG)) return res;
  fs.readdirSync(FIG).filter((f) => f.endsWith(".kresba.json")).sort().forEach((f) => {
    const name = f.replace(/\.kresba\.json$/, "");
    if (len && name !== len) return;
    try {
      let spec;
      try { spec = JSON.parse(fs.readFileSync(path.join(FIG, f), "utf8")); }
      catch (e) { throw new Error(`${f}: nie je platný JSON (${e.message})`); }
      const svg = kresli(spec, name);
      const p = path.join(FIG, name + ".svg");
      // build do súboru doplní <style data-standalone>; porovnáva sa bez neho, aby sa súbor neprepisoval zbytočne
      const old = fs.existsSync(p) ? fs.readFileSync(p, "utf8").replace(/<style data-standalone(?:="1")?>[\s\S]*?<\/style>\s*/, "") : "";
      if (old.replace(/\r/g, "") !== svg) fs.writeFileSync(p, svg);
      res.hotove.push(name);
    } catch (e) { res.chyby.push(e.message); }
  });
  return res;
}

module.exports = { kresli, vsetky, ZNACKA };

if (require.main === module) {
  const r = vsetky(process.argv[2]);
  r.hotove.forEach((n) => console.log("  ✓ " + n + ".svg"));
  r.chyby.forEach((e) => console.log("  ✖ " + e));
  if (!r.hotove.length && !r.chyby.length) console.log("kresli: v chapters/fig nie je žiadny .kresba.json");
  if (r.chyby.length) process.exitCode = 1;
}

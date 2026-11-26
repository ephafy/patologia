#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/vzorce.js — štruktúrne vzorce kníh (CLAUDE.md §5.2)

   Každá molekula má JEDEN opis v chapters/fig/mol/<id>.txt: hlavička hovorí, čo je to
   za molekulu a odkiaľ je fakt o jej štruktúre; telo je vlastný zápis atómov a väzieb.
   Tento nástroj z opisu nakreslí vzorec — vždy rovnakou dĺžkou väzby, hrúbkou čiar
   a písmom, takže všetky vzorce v knihe vyzerajú ako jedna rada. Nič sa neprekresľuje
   z cudzieho obrázka: štruktúra je fakt, kresba vzniká tu.

   Spustenie (z koreňa projektu):
     node tools/vzorce.js              kontrola celej knižnice + tabuľka (id, názov, rozmer)
     node tools/vzorce.js pyruvat      vypíše SVG jedného vzorca

   Vzorce do schém vkladá tools/schema.js (značka <mol v="id" …/>); náhľad všetkých
   vzorcov a schém: node tools/schema.js → pracovne/nahlad_schem.html.

   ── Formát opisu ───────────────────────────────────────────────────────────
     nazov: pyruvát                    slovenský názov (zobrazí sa pod vzorcom)
     skratka: Pyr                      ustálená skratka (nepovinné)
     sumarny: C3H3O3-                  sumárny vzorec nakreslenej formy
     smiles: CC(=O)C(=O)[O-]           zápis štruktúry (fakt)
     zdroj: PubChem CID 107735 · overené 2026-10-06
     projekcia: skeletálny vzorec, anión pri pH 7
     kontrola: nie                     (nepovinné) vypne porovnanie so sumárnym vzorcom
     ---
     a  <id> <značka> <x> <y> [<]                 atóm na súradniciach (jednotka = dĺžka väzby, y dole)
     +  <id> <rodič> <smer> <značka> [väzba] [<]  atóm o jednu väzbu od rodiča
     b  <id1> <id2> [väzba]                       väzba (aj uzavretie kruhu; prepíše existujúcu)
     kruh pyranoza C1 C2 C3 C4 C5 O5              Haworthov šesťuholník (od anomérneho C v smere hodín)
     kruh furanoza C1 C2 C3 C4 O4                 Haworthov päťuholník
     kruh n6 a b c d e f [@ x y] [rot 30]         pravidelný šesť-/päťuholník (n5); meno „N1:N“ = heteroatóm.
                                                  Ak prvé dve mená už existujú, kruh sa prilepí na ich väzbu
                                                  (kondenzované kruhy: purín, steroid) a ide v smere hodín
     c  <atóm> <text> <smer>                      drobné číslo pri atóme (číslovanie uhlíkov)

     značka:  .  = uhlík bez značky (vrchol skeletálneho vzorca)
              OH, O^-, CH_2OH, H_3C, PO_3^2-  (_ dolný index, ^ horný index, {…} pre dlhší)
              (P) = fosfátová skupina ako P v krúžku
              „<“ na konci riadku: text rastie doľava a na väzbe sedí POSLEDNÝ prvok (HO, H_3C)
              „|“ v značke: na väzbe sedí prvok za čiarou (O|CH_2 → OCH₂ s väzbou na C)
     smer:    uhol v stupňoch (0 vpravo, 90 hore) alebo u, d, l, r; „*k“ násobí dĺžku (30*1.5);
              u a d sú krátke (0,68) – zvislé substituenty Haworthovho vzorca
     väzba:   1 (predvolená) · 2 dvojitá súmerná · 2l / 2r druhá čiara vľavo / vpravo od smeru ·
              3 trojitá · w plný klin · h šrafovaný klin · b hrubá (predná hrana kruhu)
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MOL = path.join(ROOT, "chapters", "fig", "mol");

/* ── jednotný štýl (jediné miesto; vzhľad čiar a písma je v tools/chapter-extra.css) ── */
const U = 22;      // dĺžka väzby v px
const FS = 10.5;   // písmo atómov (px) — zhodné s .chart .at
const IX = 7.4;    // písmo indexov — zhodné s .chart .at .ix
const NUM = 7;     // písmo čísel uhlíkov — zhodné s .chart .nm
const CAP = 4.1;   // polovica výšky veľkého písmena
const PAD = 1.7;   // medzera medzi koncom väzby a značkou
const DBL = 1.55;  // polovičný rozostup súmernej dvojitej väzby
const DOFF = 3.1;  // odsadenie druhej čiary (2l, 2r)
const PR = 6.2;    // polomer krúžku fosfátu
const UD = 0.68;   // dĺžka zvislého substituenta (u, d)

const r1 = (n) => String(Math.round(n * 10) / 10);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ── šírka textu: namerané šírky znakov písma knihy (Source Serif 4) pri 10 px, v em.
   Písmo má optickú veľkosť – pri malom stupni je širšie než pri nadpisovom, preto merané
   práve tu. Slúži na umiestnenie značiek a rámcov, nie na sadzbu. ── */
const GW = {"0":.55,"1":.55,"2":.55,"3":.55,"4":.55,"5":.55,"6":.55,"7":.55,"8":.55,"9":.55,"A":.73,"B":.64,"C":.66,"D":.73,"E":.66,"F":.62,"G":.72,"H":.83,"I":.38,"J":.39,"K":.74,"L":.62,"M":.96,"N":.78,"O":.71,"P":.64,"Q":.71,"R":.72,"S":.56,"T":.65,"U":.77,"V":.73,"W":1.03,"X":.69,"Y":.69,"Z":.61,"a":.54,"b":.63,"c":.52,"d":.62,"e":.52,"f":.46,"g":.56,"h":.67,"i":.35,"j":.32,"k":.62,"l":.35,"m":.99,"n":.67,"o":.57,"p":.61,"q":.59,"r":.46,"s":.45,"t":.36,"u":.64,"v":.57,"w":.82,"x":.6,"y":.58,"z":.51," ":.24,".":.3,",":.3,";":.3,":":.3,"·":.3,"'":.18,"|":.29,"(":.38,")":.38,"[":.35,"]":.35,"/":.35,"-":.33,"+":.54,"−":.54,"–":.52,"=":.54,"×":.54,"≈":.54,"→":.69,"←":.69,"↑":.69,"↓":.69,"⇌":.84,"⊕":1,"⊣":.66,"⟳":.95,"₀":.39,"₁":.39,"₂":.39,"₃":.39,"₄":.39,"₅":.39,"₆":.39,"₇":.39,"₈":.39,"₉":.39,"⁺":.34,"⁻":.34,"²":.39,"³":.39,"α":.64,"β":.63,"γ":.57,"δ":.58,"Δ":.64,"µ":.65,"⋮":.31};
function textWidth(str, size, bold) {
  let w = 0;
  for (const ch0 of String(str)) {
    const ch = GW[ch0] !== undefined ? ch0 : ch0.normalize("NFD")[0];   // á → a, č → c
    w += GW[ch] !== undefined ? GW[ch] : ch === " " ? .24 : .62;
  }
  return w * size * (bold ? 1.02 : 1);
}

/* ── značka atómu → úseky (text, 0 / −1 dolný / +1 horný index) ── */
function segments(label) {
  const out = [];
  let buf = "", i = 0;
  const push = (t, m) => { if (t) out.push({ t, m }); };
  while (i < label.length) {
    const ch = label[i];
    if (ch === "_" || ch === "^") {
      push(buf, 0); buf = "";
      let j = i + 1, t = "";
      if (label[j] === "{") { const k = label.indexOf("}", j); t = label.slice(j + 1, k); j = k + 1; }
      else { t = (label.slice(j).match(ch === "_" ? /^[0-9n]+/ : /^[0-9]*[+\-−]?/) || [""])[0]; j += t.length; }
      push(ch === "^" ? t.replace(/-/g, "−") : t, ch === "_" ? -1 : 1);
      i = j;
    } else { if (ch !== "|") buf += ch; i++; }
  }
  push(buf, 0);
  return out;
}

/* rozmery značky: celková šírka, vzdialenosť stredu „nosného“ prvku od ľavého okraja */
function measure(label, left) {
  const bar = label.indexOf("|");
  if (bar >= 0) {                                    // „O|CH_2“ = na väzbe sedí prvok za zvislou čiarou
    const m = measure(label.replace("|", ""), false);
    const pre = segments(label.slice(0, bar)).reduce((a, s) => a + textWidth(s.t, s.m ? IX : FS), 0);
    m.hit = pre + textWidth((label.slice(bar + 1).match(/[A-Z][a-z]?/) || ["C"])[0], FS) / 2;
    return m;
  }
  const sg = segments(label);
  let w = 0, hit = null, sub = false;
  sg.forEach((s) => {
    if (s.m === 0) {
      const re = /[A-Z][a-z]?/g;
      let m;
      while ((m = re.exec(s.t))) {
        const c = w + textWidth(s.t.slice(0, m.index), FS) + textWidth(m[0], FS) / 2;
        if (hit === null || left) hit = c;           // „<“ = posledný prvok, inak prvý
      }
    }
    if (s.m < 0) sub = true;
    w += textWidth(s.t, s.m ? IX : FS);
  });
  if (hit === null) hit = left ? w - FS * .33 : FS * .33;
  return { sg, w, hit, sub };
}

/* ťažké atómy v značke (kontrola so sumárnym vzorcom) */
function countLabel(label, acc) {
  const sg = segments(label);
  sg.forEach((s, k) => {
    if (s.m !== 0) return;
    const toks = s.t.match(/[A-Z][a-z]?\d*/g) || [];
    toks.forEach((tk, n) => {
      const el = tk.replace(/\d+/, "");
      let c = Number((tk.match(/\d+/) || [1])[0]);
      if (n === toks.length - 1 && sg[k + 1] && sg[k + 1].m < 0 && /^\d+$/.test(sg[k + 1].t)) c *= Number(sg[k + 1].t);
      acc[el] = (acc[el] || 0) + c;
    });
  });
}

/* ── šablóny kruhov ── */
const HAWORTH = {
  pyranoza: { pts: [[1.6, .02], [.84, .74], [-.84, .74], [-1.6, .02], [-.84, -.7], [.84, -.7]],
    bonds: [[0, 1, "w"], [1, 2, "b"], [3, 2, "w"], [3, 4, "1"], [4, 5, "1"], [5, 0, "1"]] },
  furanoza: { pts: [[1.6, -.1], [.88, .76], [-.88, .76], [-1.6, -.1], [0, -.92]],
    bonds: [[0, 1, "w"], [1, 2, "b"], [3, 2, "w"], [3, 4, "1"], [4, 0, "1"]] },
};
const BOND_TYPES = new Set(["1", "2", "2l", "2r", "3", "w", "h", "b"]);

function parseDir(tok) {
  const m = String(tok).match(/^([udlr]|-?\d+(?:\.\d+)?)(?:\*(\d+(?:\.\d+)?))?$/);
  if (!m) return null;
  const named = { u: [90, UD], d: [270, UD], l: [180, 1], r: [0, 1] }[m[1]];
  const ang = named ? named[0] : Number(m[1]);
  const len = (named ? named[1] : 1) * (m[2] ? Number(m[2]) : 1);
  const a = (ang * Math.PI) / 180;
  return { dx: Math.cos(a) * len, dy: -Math.sin(a) * len };
}

/* ── opis → model ── */
function parse(src, id) {
  const def = { id, meta: {}, atoms: {}, order: [], bonds: [], nums: [], err: [], warn: [] };
  const cut = src.search(/^---\s*$/m);
  if (cut < 0) { def.err.push("chýba oddeľovač --- medzi hlavičkou a telom"); return def; }
  src.slice(0, cut).split("\n").forEach((ln) => {
    const m = ln.match(/^([a-z]+):\s*(.*)$/);
    if (m) def.meta[m[1]] = m[2].trim();
  });
  ["nazov", "sumarny", "zdroj", "projekcia"].forEach((k) => { if (!def.meta[k]) def.err.push(`v hlavičke chýba „${k}:“`); });
  if (!def.meta.smiles) def.warn.push("v hlavičke chýba „smiles:“ (zápis štruktúry, z ktorého sa kreslilo)");

  const addAtom = (name, label, x, y, left) => {
    if (def.atoms[name]) { def.err.push(`atóm ${name} je zapísaný dvakrát`); return; }
    def.atoms[name] = { id: name, label, x, y, left: !!left };
    def.order.push(name);
  };
  const addBond = (a, b, type) => {
    if (!def.atoms[a] || !def.atoms[b]) { def.err.push(`väzba ${a}–${b}: neznámy atóm`); return; }
    const old = def.bonds.find((q) => (q.a === a && q.b === b) || (q.a === b && q.b === a));
    if (old) { old.a = a; old.b = b; old.type = type; } else def.bonds.push({ a, b, type });
  };

  src.slice(cut).split("\n").slice(1).forEach((raw, n) => {
    const ln = raw.replace(/\s+#.*$/, "").replace(/^#.*$/, "").trim();
    if (!ln) return;
    const t = ln.split(/\s+/);
    const where = `riadok ${n + 1} tela („${ln}“)`;
    if (t[0] === "a") {
      if (t.length < 5 || isNaN(+t[3]) || isNaN(+t[4])) return def.err.push(`${where}: a <id> <značka> <x> <y>`);
      addAtom(t[1], t[2], +t[3], +t[4], t[5] === "<");
    } else if (t[0] === "+") {
      const d = parseDir(t[3]);
      const p = def.atoms[t[2]];
      if (t.length < 5 || !d) return def.err.push(`${where}: + <id> <rodič> <smer> <značka> [väzba] [<]`);
      if (!p) return def.err.push(`${where}: rodič ${t[2]} neexistuje`);
      const rest = t.slice(5);
      const bad = rest.filter((x) => !BOND_TYPES.has(x) && x !== "<");
      if (bad.length) return def.err.push(`${where}: nerozumiem „${bad.join(" ")}“`);
      addAtom(t[1], t[4], p.x + d.dx, p.y + d.dy, rest.includes("<"));
      addBond(t[2], t[1], rest.find((x) => BOND_TYPES.has(x)) || "1");
    } else if (t[0] === "b") {
      if (t.length < 3 || (t[3] && !BOND_TYPES.has(t[3]))) return def.err.push(`${where}: b <id1> <id2> [väzba]`);
      addBond(t[1], t[2], t[3] || "1");
    } else if (t[0] === "c") {
      const d = parseDir(t[3] || "");
      if (!def.atoms[t[1]] || !d) return def.err.push(`${where}: c <atóm> <text> <smer>`);
      def.nums.push({ at: t[1], text: t[2], d });
    } else if (t[0] === "kruh") {
      const kind = t[1];
      let names = t.slice(2), ox = 0, oy = 0, rot = 0;
      const at = names.indexOf("@");
      const ri = names.indexOf("rot");
      const end = Math.min(at < 0 ? names.length : at, ri < 0 ? names.length : ri);
      if (at >= 0) { ox = +names[at + 1]; oy = +names[at + 2]; }
      if (ri >= 0) rot = +names[ri + 1];
      names = names.slice(0, end);
      let pts, bonds, lastO = false;
      if (HAWORTH[kind]) { pts = HAWORTH[kind].pts; bonds = HAWORTH[kind].bonds; lastO = true; }
      else if (kind === "n5" || kind === "n6") {
        const k = kind === "n5" ? 5 : 6;
        const R = 1 / (2 * Math.sin(Math.PI / k));
        pts = []; bonds = [];
        const A0 = def.atoms[(names[0] || "").split(":")[0]], A1 = def.atoms[(names[1] || "").split(":")[0]];
        if (A0 && A1 && at < 0) {
          /* kondenzovaný kruh: prvé dva atómy už existujú → kruh sa prilepí na ich väzbu a pokračuje
             v smere hodinových ručičiek (stranu určuje poradie tých dvoch mien) */
          let px = A0.x, py = A0.y, dx = A1.x - A0.x, dy = A1.y - A0.y;
          const th = (2 * Math.PI) / k, c = Math.cos(th), sn = Math.sin(th);
          for (let i = 0; i < k; i++) {
            pts.push([px, py]);
            px += dx; py += dy;
            [dx, dy] = [dx * c - dy * sn, dx * sn + dy * c];
          }
        } else for (let i = 0; i < k; i++) {
          const a = ((90 - rot - (360 / k) * i) * Math.PI) / 180;   // prvý vrchol hore, ďalej v smere hodín
          pts.push([R * Math.cos(a), -R * Math.sin(a)]);
        }
        for (let i = 0; i < k; i++) bonds.push([i, (i + 1) % k, "1"]);
      } else return def.err.push(`${where}: neznámy kruh „${kind}“ (pyranoza, furanoza, n5, n6)`);
      if (names.length !== pts.length || isNaN(ox) || isNaN(oy) || isNaN(rot))
        return def.err.push(`${where}: kruh ${kind} potrebuje ${pts.length} mien atómov`);
      const ids = names.map((nm, i) => {
        const [name, lab] = nm.split(":");
        const x = pts[i][0] + ox, y = pts[i][1] + oy;
        const old = def.atoms[name];
        if (old) {
          if (Math.hypot(old.x - x, old.y - y) > .06) def.warn.push(`kruh: atóm ${name} už existuje inde (o ${Math.hypot(old.x - x, old.y - y).toFixed(2)} väzby) – kondenzovaný kruh nesedí`);
        } else addAtom(name, lab || (lastO && i === pts.length - 1 ? "O" : "."), x, y, false);
        return name;
      });
      bonds.forEach(([i, j, ty]) => addBond(ids[i], ids[j], ty));
    } else def.err.push(`${where}: neznámy príkaz „${t[0]}“`);
  });
  if (!def.order.length) def.err.push("vzorec nemá žiadny atóm");

  /* kontrola: ťažké atómy kresby = sumárny vzorec (vodíky sa nerátajú – závisia od ionizácie a skeletálneho zápisu) */
  if (def.meta.sumarny && !/^nie/i.test(def.meta.kontrola || "") && !def.err.length) {
    const drawn = {}, want = {};
    def.order.forEach((n) => {
      const L = def.atoms[n].label;
      if (L === ".") drawn.C = (drawn.C || 0) + 1;
      else if (L === "(P)") { drawn.P = (drawn.P || 0) + 1; drawn.O = (drawn.O || 0) + 3; }
      else countLabel(L, drawn);
    });
    (def.meta.sumarny.match(/[A-Z][a-z]?\d*/g) || []).forEach((tk) => {
      const el = tk.replace(/\d+/, "");
      want[el] = (want[el] || 0) + Number((tk.match(/\d+/) || [1])[0]);
    });
    const els = new Set(Object.keys(drawn).concat(Object.keys(want)));
    els.delete("H");
    const diff = [...els].filter((e) => (drawn[e] || 0) !== (want[e] || 0))
      .map((e) => `${e}: nakreslené ${drawn[e] || 0}, sumárny vzorec ${want[e] || 0}`);
    if (diff.length) def.err.push(`kresba nesedí so sumárnym vzorcom ${def.meta.sumarny} (${diff.join("; ")})`);
  }
  return def;
}

/* ── model → SVG (obsah bez obalu, stred vzorca v bode 0,0) ── */
function render(def, opt) {
  opt = opt || {};
  const hlAtoms = new Set(), hlBonds = new Set(), hl2Atoms = new Set(), hl2Bonds = new Set();   // zv = modrá, zv2 = druhá farba (karmínová)
  const mark = (zv, at, bd) => (zv || []).forEach((z) => { if (z.includes("-")) bd.add(z), bd.add(z.split("-").reverse().join("-")); else at.add(z); });
  mark(opt.zv, hlAtoms, hlBonds); mark(opt.zv2, hl2Atoms, hl2Bonds);
  [...hlAtoms, ...hl2Atoms].forEach((z) => { if (!def.atoms[z]) def.warn.push(`zvýraznenie: atóm ${z} vo vzorci ${def.id} nie je`); });

  /* geometria značiek */
  const G = {};
  def.order.forEach((n) => {
    const a = def.atoms[n];
    const g = { x: a.x * U, y: a.y * U, kind: a.label === "." ? "c" : a.label === "(P)" ? "p" : "t" };
    if (g.kind === "t") {
      const m = measure(a.label, a.left);
      g.m = m;
      g.x0 = g.x - m.hit; g.x1 = g.x0 + m.w;
      g.y0 = g.y - CAP; g.y1 = g.y + CAP + (m.sub ? 2.2 : 0);
    } else if (g.kind === "p") { g.x0 = g.x - PR; g.x1 = g.x + PR; g.y0 = g.y - PR; g.y1 = g.y + PR; }
    else { g.x0 = g.x1 = g.x; g.y0 = g.y1 = g.y; }
    G[n] = g;
  });
  /* značky, ktoré by sa prekryli, nástroj ohlási – kresbu aj tak treba vidieť (CLAUDE.md §5.2, bod 2) */
  const lab = def.order.filter((n) => G[n].kind !== "c");
  lab.forEach((n, i) => lab.slice(i + 1).forEach((k) => {
    const a = G[n], b = G[k];
    if (a.x0 < b.x1 + 3 && b.x0 < a.x1 + 3 && a.y0 < b.y1 + 3 && b.y0 < a.y1 + 3)   // bližšie než 3 px
      def.warn.push(`značky atómov ${n} a ${k} sa prekrývajú alebo skoro dotýkajú – posuň atóm (smer*k) alebo otoč značku („<“)`);
  }));
  const trim = (g, dx, dy) => {
    if (g.kind === "c") return 0;
    if (g.kind === "p") return PR + .6;
    const tx = dx > 1e-6 ? (g.x1 + PAD - g.x) / dx : dx < -1e-6 ? (g.x0 - PAD - g.x) / dx : Infinity;
    const ty = dy > 1e-6 ? (g.y + CAP + PAD - g.y) / dy : dy < -1e-6 ? (g.y - CAP - PAD - g.y) / dy : Infinity;
    return Math.min(tx, ty);
  };

  const L = { n: [], hl: [], hl2: [], bn: [], bhl: [], bhl2: [] };   // čiary: obyčajné, zvýraznené (dve farby), hrubé, hrubé zvýraznené
  const polys = [];
  def.bonds.forEach((b) => {
    const A = G[b.a], B = G[b.b];
    const len = Math.hypot(B.x - A.x, B.y - A.y);
    if (len < 1e-6) return;
    const dx = (B.x - A.x) / len, dy = (B.y - A.y) / len;
    const ta = trim(A, dx, dy), tb = trim(B, -dx, -dy);
    if (len - ta - tb < 4.5) def.warn.push(`väzba ${b.a}–${b.b} je po odrátaní značiek kratšia než 4,5 px – predĺž ju (smer*k) alebo otoč značku („<“)`);
    const p = [A.x + dx * ta, A.y + dy * ta], q = [B.x - dx * tb, B.y - dy * tb];
    const nx = dy, ny = -dx;                           // normála = vľavo od smeru a→b
    const key = b.a + "-" + b.b;                       // vypísaná väzba má prednosť pred väzbou medzi dvoma zvýraznenými atómami
    const hl = hlBonds.has(key) ? "hl" : hl2Bonds.has(key) ? "hl2" : hlAtoms.has(b.a) && hlAtoms.has(b.b) ? "hl" : hl2Atoms.has(b.a) && hl2Atoms.has(b.b) ? "hl2" : "";
    const seg = (x1, y1, x2, y2, bold) => L[(bold ? "b" : "") + (hl || "n")].push(`M${r1(x1)},${r1(y1)}L${r1(x2)},${r1(y2)}`);
    const off = (o, sa, sb) => seg(p[0] + nx * o + dx * sa, p[1] + ny * o + dy * sa, q[0] + nx * o - dx * sb, q[1] + ny * o - dy * sb);
    switch (b.type) {
      case "2": off(DBL, 0, 0); off(-DBL, 0, 0); break;
      case "2l": case "2r": {
        const s = b.type === "2l" ? 1 : -1;
        off(0, 0, 0);
        off(s * DOFF, A.kind === "c" ? 2.6 : 0, B.kind === "c" ? 2.6 : 0);
        break;
      }
      case "3": off(0, 0, 0); off(2.6, 0, 0); off(-2.6, 0, 0); break;
      case "b": seg(p[0], p[1], q[0], q[1], true); break;
      case "w":
        polys.push({ hl, d: `M${r1(p[0])},${r1(p[1])}L${r1(q[0] + nx * 1.9)},${r1(q[1] + ny * 1.9)}L${r1(q[0] - nx * 1.9)},${r1(q[1] - ny * 1.9)}z` });
        break;
      case "h": {
        const k = Math.max(4, Math.round((len - ta - tb) / 2.6));
        for (let i = 1; i <= k; i++) {
          const f = i / k, w = .4 + 2 * f;
          const cx = p[0] + (q[0] - p[0]) * f, cy = p[1] + (q[1] - p[1]) * f;
          seg(cx + nx * w, cy + ny * w, cx - nx * w, cy - ny * w);
        }
        break;
      }
      default: off(0, 0, 0);
    }
  });

  /* značky */
  const texts = [];
  def.order.forEach((n) => {
    const a = def.atoms[n], g = G[n];
    const hl = hlAtoms.has(n) ? " hl" : hl2Atoms.has(n) ? " hl2" : "";
    if (g.kind === "p") {
      texts.push(`<circle class="pc${hl}" cx="${r1(g.x)}" cy="${r1(g.y)}" r="${PR}"/><text class="at pt${hl}" x="${r1(g.x)}" y="${r1(g.y + 3.3)}" text-anchor="middle">P</text>`);
    } else if (g.kind === "t") {
      let cur = 0;
      const body = g.m.sg.map((s) => {
        const want = s.m < 0 ? 2.6 : s.m > 0 ? -3.9 : 0;
        const dy = want - cur; cur = want;
        const at = (s.m ? ' class="ix"' : "") + (dy ? ` dy="${r1(dy)}"` : "");
        return at ? `<tspan${at}>${esc(s.t)}</tspan>` : esc(s.t);
      }).join("");
      const x = a.left ? g.x1 : g.x0;
      texts.push(`<text class="at${hl}" x="${r1(x)}" y="${r1(g.y + 3.6)}"${a.left ? ' text-anchor="end"' : ""}>${body}</text>`);
    }
  });
  const numG = def.nums.map((c) => {
    const g = G[c.at];
    const x = g.x + c.d.dx * U * .5, y = g.y + c.d.dy * U * .5;
    return { x, y, svg: `<text class="nm" x="${r1(x)}" y="${r1(y + 2.4)}" text-anchor="middle">${esc(c.text)}</text>`, w: textWidth(c.text, NUM) };
  });

  /* rámec */
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  Object.values(G).forEach((g) => { x0 = Math.min(x0, g.x0); x1 = Math.max(x1, g.x1); y0 = Math.min(y0, g.y0); y1 = Math.max(y1, g.y1); });
  numG.forEach((c) => { x0 = Math.min(x0, c.x - c.w / 2); x1 = Math.max(x1, c.x + c.w / 2); y0 = Math.min(y0, c.y - 3.5); y1 = Math.max(y1, c.y + 3.5); });
  x0 -= 2; y0 -= 2; x1 += 2; y1 += 2;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;

  const parts = [];
  if (L.n.length) parts.push(`<path class="bd" d="${L.n.join("")}"/>`);
  if (L.hl.length) parts.push(`<path class="bd hl" d="${L.hl.join("")}"/>`);
  if (L.hl2.length) parts.push(`<path class="bd hl2" d="${L.hl2.join("")}"/>`);
  if (L.bn.length) parts.push(`<path class="bd bb" d="${L.bn.join("")}"/>`);
  if (L.bhl.length) parts.push(`<path class="bd bb hl" d="${L.bhl.join("")}"/>`);
  if (L.bhl2.length) parts.push(`<path class="bd bb hl2" d="${L.bhl2.join("")}"/>`);
  polys.forEach((p) => parts.push(`<path class="wg${p.hl ? " " + p.hl : ""}" d="${p.d}"/>`));
  parts.push(...texts, ...numG.map((c) => c.svg));

  const atoms = {};
  Object.keys(G).forEach((n) => (atoms[n] = { x: G[n].x - cx, y: G[n].y - cy }));
  return {
    svg: `<g transform="translate(${r1(-cx)},${r1(-cy)})">${parts.join("")}</g>`,
    w: x1 - x0, h: y1 - y0, atoms,
  };
}

/* ── knižnica ── */
let CACHE = null;
function library() {
  if (CACHE) return CACHE;
  CACHE = {};
  if (!fs.existsSync(MOL)) return CACHE;
  fs.readdirSync(MOL).filter((f) => f.endsWith(".txt") && !f.startsWith("_")).sort().forEach((f) => {
    const id = f.replace(/\.txt$/, "");
    CACHE[id] = parse(fs.readFileSync(path.join(MOL, f), "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n"), id);
  });
  return CACHE;
}

module.exports = { library, parse, render, textWidth, esc, r1, U, MOL };

if (require.main === module) {
  const lib = library();
  const one = process.argv[2];
  if (one) {
    const def = lib[one];
    if (!def) { console.error(`vzorec „${one}“ v chapters/fig/mol/ nie je`); process.exit(1); }
    def.err.forEach((e) => console.error("CHYBA: " + e));
    if (def.err.length) process.exit(1);
    const r = render(def);
    console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r1(-r.w / 2)} ${r1(-r.h / 2)} ${r1(r.w)} ${r1(r.h)}">${r.svg}</svg>`);
    process.exit(0);
  }
  let bad = 0;
  const ids = Object.keys(lib);
  console.log(`\n▸ chapters/fig/mol/   ${ids.length} vzorcov\n`);
  ids.forEach((id) => {
    const def = lib[id];
    let size = "—";
    if (!def.err.length) { const r = render(def); size = `${Math.round(r.w)}×${Math.round(r.h)}`; }
    console.log(`    ${id.padEnd(26)} ${size.padStart(8)}  ${(def.meta.nazov || "?")}${def.meta.skratka ? " (" + def.meta.skratka + ")" : ""}`);
    def.err.forEach((e) => { bad++; console.log("        ✗ " + e); });
    def.warn.forEach((w) => console.log("        ⚠ " + w));
  });
  if (bad) { console.log(`\n${bad} chýb vo vzorcoch.`); process.exit(1); }
}

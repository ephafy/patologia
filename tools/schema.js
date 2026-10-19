#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   tools/schema.js — schémy dráh poskladané zo vzorcov (CLAUDE.md §5.2)

   Schéma je obyčajné SVG v chapters/fig/fig-*.svg. Navyše smie obsahovať päť značiek,
   ktoré tento nástroj pri builde rozvinie na čisté SVG — vždy v rovnakom štýle:

     <mol v="pyruvat" id="pyr" x="300" y="120"/>
         vzorec z knižnice chapters/fig/mol/ (kreslí tools/vzorce.js) so stredom v bode x,y;
         pod vzorec sa doplní názov a ustálená skratka.
         m="0.9" mierka · popis="pod|nad|vpravo|vlavo|nie" · nazov="iný|text" · skratka="nie" ·
         zv="P2,O2" zvýraznené atómy (o ktoré v reakcii ide); "C1-O1" = jedna väzba ·
         zv2="C3,O3" druhá skupina inou farbou (karmínová) – len keď schéma sleduje dve skupiny naraz

     <uzol id="tca" x="80" y="40" text="citrátový|cyklus"/>
         uzol len s názvom (iná dráha, zásobáreň, hormón) · trieda="bx-k|bx-c|bx-m|bx|nic" · w, h

     <rx od="{pep.b}" do="{pyr.t}" typ="nevratna" enzym="pyruvátkináza" ko="ADP>ATP"
         akt="Fru-1,6-P₂" inh="ATP;alanín" id="pk"/>
         reakcia: šípka od → do, enzým na jednej strane, koenzýmy (žlté) na druhej.
         typ="nevratna" hrubá šípka · typ="vratna" hroty na oboch koncoch · cez="x,y" oblúk ·
         e="vlavo|vpravo|hore|dole" strana enzýmu · ko="dnu>von;dnu>von" · krok="3" ·
         akt / inh = regulátory pri enzýme (zelené ↑, červené ↓; viac oddeľ bodkočiarkou)

     <vplyv typ="akt" od="{f16.r}" do="{pk.e}" cez="560,200"/>
         vzťah, ktorý nie je premenou látky: typ="akt" zelená so šípkou · typ="inh" červená
         s priečkou · bez typu sivá. Prerušovaná; ciara="plna" = plná. cez="x,y" alebo
         cez="x1,y1 x2,y2" = ohyb; d="M…" = vlastná dráha. text="…" pri="x,y" = popis.

     <legenda x="20" y="300"/>
         vysvetlivky farieb a čiar · polozky="rx,nv,vr,enz,ko,akt,inh,vz,zv,zv2,rk,odk" · w="660"

   Rozkliknutie – zjednodušené miesto schémy sa dá rozbaliť (assets/js/schema.js):
     <uzol … rk="triozy"/>  <mol … rk="…"/>  <rx … rk="…"/>
         značka dostane krúžok ⊕ a klik rozbalí výrez s tým istým id pod schémou.
         znak="x,y" = vlastná poloha krúžku. Samostatný krúžok: <plus rk="id" x="…" y="…"/>
     <vyrez id="triozy" h="150" nadpis="Triózafosfáty: dve formy, jeden enzým"> … </vyrez>
         výrez s podrobnosťami: obyčajné SVG aj značky, vo VLASTNÝCH súradniciach
         (0…šírka schémy, 0…h; obsah od y ≈ 30, hore je nadpis). Je skrytý, kým ho čitateľ
         neotvorí; schéma sa vtedy predĺži (mení sa viewBox). Kotvy {id.…} zo schémy vo
         výreze neplatia (iný počiatok) – výrez používa len vlastné.
     <uzol … href="#fig-ppp-oxidacna"/>  <mol … href="04_metabolizmus_glukozy#fig-glykolyza-vynos"/>
         uzol je odkaz na podrobnú schému (krúžok →); iná kapitola = meno súboru bez .html

   Kotvy: v každom atribúte aj v obyčajnom SVG sa {id.kotva} nahradí súradnicami „x,y“.
     mol, uzol:  l r t b c · tl tr bl br · meno atómu ({pyr.C1})
     rx:         m (stred šípky) · e (vonkajší okraj popisu enzýmu) · et eb el er · k (koenzýmy)
     {id.kotva.x} / {id.kotva.y} = jedno číslo · {id.r+8,-4} = posun o 8 vpravo a 4 hore
   Hroty šípok vo vlastných čiarach: marker-end="url(#sip)" — sip, sip-nv, sip-akt, sip-koe,
   sip-n, stop, sip-zv a sip-zv2 (prenos zvýraznenej skupiny: tenké čiary .zv-s, .zv2-s; idú pod šípkami reakcie, tie majú podklad .halo); build doplní <defs> a mená spraví jedinečné pre obrázok.

   Náhľad bez kapitoly:  node tools/schema.js   →  pracovne/nahlad_schem.html
   ══════════════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");
const V = require("./vzorce.js");
const { textWidth, esc, r1 } = V;

const ROOT = path.resolve(__dirname, "..");
const FIG = path.join(ROOT, "chapters", "fig");
const GAP = 4;      // medzera medzi rámcom uzla a kotvou
const LH = 11.5;    // riadkovanie popisov

const num = (v, what) => { const n = Number(v); if (v === undefined || v === "" || isNaN(n)) throw new Error(`${what}: čakám číslo, je tu „${v}“`); return n; };
const pt = (s, what) => {
  const m = String(s === undefined ? "" : s).trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (!m) throw new Error(`${what}: čakám bod „x,y“, je tu „${s}“`);
  return [Number(m[1]), Number(m[2])];
};
const P = (p) => `${r1(p[0])},${r1(p[1])}`;
const add = (p, v, k) => [p[0] + v[0] * k, p[1] + v[1] * k];
const unit = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const SIDES = { vlavo: [-1, 0], vpravo: [1, 0], hore: [0, -1], dole: [0, 1] };

function attrs(str) {
  const a = {};
  str.replace(/([\w-]+)\s*=\s*"([^"]*)"/g, (_, k, v) => { a[k] = v.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"); return ""; });
  return a;
}
const list = (s) => (s || "").split(";").map((x) => x.trim()).filter(Boolean);

function boxAnchors(b, fy) {
  const cx = (b.x0 + b.x1) / 2;
  const f = b.f || b;                                   // f = rámec samotného vzorca (bez názvu)
  const fx = (f.x0 + f.x1) / 2;                         // t a b mieria na stred vzorca, aj keď je názov bokom
  return {
    c: [fx, fy], l: [b.x0 - GAP, fy], r: [b.x1 + GAP, fy], t: [fx, b.y0 - GAP], b: [fx, b.y1 + GAP],
    tl: [f.x0 - GAP, f.y0 - GAP], tr: [f.x1 + GAP, f.y0 - GAP], bl: [f.x0 - GAP, f.y1 + GAP], br: [f.x1 + GAP, f.y1 + GAP],
  };
}

function chip(text, c) {
  const w = textWidth(text, 9.5, true) + 8;
  return `<rect class="koe" x="${r1(c[0] - w / 2)}" y="${r1(c[1] - 6.5)}" width="${r1(w)}" height="13" rx="2"/>` +
    `<text class="koet" x="${r1(c[0])}" y="${r1(c[1] + 3.3)}" text-anchor="middle">${esc(text)}</text>`;
}
const chipW = (text) => textWidth(text, 9.5, true) + 8;

/* ── rozkliknutie: krúžok ⊕ / → a obal, ktorý zo značky spraví tlačidlo alebo odkaz ── */
function badge(c, link) {
  const x = r1(c[0]), y = r1(c[1]);
  const sign = link
    ? `<path d="M${r1(c[0] - 3.2)},${y}H${r1(c[0] + 3)}M${r1(c[0] + .6)},${r1(c[1] - 2.6)}L${r1(c[0] + 3.2)},${y}L${r1(c[0] + .6)},${r1(c[1] + 2.6)}"/>`
    : `<path d="M${r1(c[0] - 3.1)},${y}H${r1(c[0] + 3.1)}"/><path class="rk-v" d="M${x},${r1(c[1] - 3.1)}V${r1(c[1] + 3.1)}"/>`;
  return `<g class="rk-b${link ? " rk-l" : ""}"><circle cx="${x}" cy="${y}" r="6.3"/>${sign}</g>`;
}
function hrefOf(h, ctx) {
  const m = String(h).match(/^([\w-]*)#([\w-]+)$/);
  if (!m) { ctx.warn.add(`href="${h}" – čakám „#kotva“ alebo „NN_subor#kotva“`); return h; }
  if (m[1] && !fs.existsSync(path.join(ROOT, "chapters", m[1] + ".md"))) ctx.warn.add(`href="${h}" – kapitola chapters/${m[1]}.md neexistuje`);
  if (/^fig-[a-z]/.test(m[2]) && !fs.existsSync(path.join(FIG, m[2] + ".svg"))) ctx.warn.add(`href="${h}" – schéma chapters/fig/${m[2]}.svg neexistuje`);
  return (m[1] ? m[1] + ".html" : "") + "#" + m[2];
}
/* inner = hotové SVG značky; at = predvolená poloha krúžku */
function interactive(a, inner, at, ctx, what) {
  if (a.rk && a.href) throw new Error("rk a href sa na jednej značke vylučujú");
  const c = a.znak ? pt(a.znak, "znak") : at;
  if (a.rk) {
    ctx.rkUsed.add(a.rk);
    return `<g class="rk" data-rk="${esc(a.rk)}" role="button" tabindex="0" aria-expanded="false"><title>Rozbaliť podrobnosti${what ? ": " + esc(what) : ""}</title>${inner}${badge(c)}</g>`;
  }
  if (a.href) return `<a class="rk-a" href="${esc(hrefOf(a.href, ctx))}"><title>${esc(a.tip || "Prejsť na podrobnú schému")}</title>${inner}${badge(c, true)}</a>`;
  return inner;
}

/* ── značky ── */
const TAGS = {
  plus(a, ctx) {
    if (!a.rk) throw new Error("plus potrebuje rk (id výrezu)");
    return interactive(a, "", [num(a.x, "plus x"), num(a.y, "plus y")], ctx, a.tip || "");
  },

  mol(a, ctx) {
    const lib = V.library();
    const def = lib[a.v];
    if (!def) throw new Error(`vzorec „${a.v}“ nie je v chapters/fig/mol/ – najprv ho opíš a nakresli (CLAUDE.md §5.2)`);
    if (def.err.length) throw new Error(`vzorec ${a.v}: ${def.err[0]}`);
    const x = num(a.x, "mol x"), y = num(a.y, "mol y"), m = a.m ? num(a.m, "mol m") : 1;
    const before = def.warn.length;
    const r = V.render(def, { zv: (a.zv || "").split(/[\s,]+/).filter(Boolean), zv2: (a.zv2 || "").split(/[\s,]+/).filter(Boolean) });
    def.warn.splice(before).forEach((w) => ctx.warn.add(`vzorec ${a.v}: ${w}`));
    def.warn.forEach((w) => ctx.warn.add(`vzorec ${a.v}: ${w}`));
    const f = { x0: x - (r.w * m) / 2, x1: x + (r.w * m) / 2, y0: y - (r.h * m) / 2, y1: y + (r.h * m) / 2 };
    const box = { x0: f.x0, x1: f.x1, y0: f.y0, y1: f.y1, f };
    let label = "";
    const popis = a.popis || "pod";
    if (popis !== "nie") {
      const lines = (a.nazov || def.meta.nazov || a.v).split("|").map((t) => ({ t, cls: "mn", fs: 10.5, b: true }));
      const sk = a.skratka === "nie" ? "" : a.skratka || def.meta.skratka || "";
      if (sk) lines.push({ t: `(${sk})`, cls: "ms", fs: 9, b: false });
      if (!["pod", "nad", "vpravo", "vlavo"].includes(popis)) throw new Error(`mol popis="${popis}" – poznám pod, nad, vpravo, vlavo, nie`);
      const H = lines.length * 10.8;
      const W = Math.max(...lines.map((ln) => textWidth(ln.t, ln.fs, ln.b)));
      const side = popis === "vpravo" || popis === "vlavo";
      const tx = popis === "vpravo" ? f.x1 + 7 : popis === "vlavo" ? f.x0 - 7 : x;
      let ty = side ? y - H / 2 + 8.5 : popis === "nad" ? f.y0 - 3 - H + 8.5 : f.y1 + 10;
      lines.forEach((ln) => {
        label += `<text class="${ln.cls}" x="${r1(tx)}" y="${r1(ty)}" text-anchor="${side ? (popis === "vpravo" ? "start" : "end") : "middle"}">${esc(ln.t)}</text>`;
        ty += 10.8;
      });
      if (popis === "vpravo") box.x1 = f.x1 + 7 + W;
      else if (popis === "vlavo") box.x0 = f.x0 - 7 - W;
      else {
        box.x0 = Math.min(box.x0, x - W / 2); box.x1 = Math.max(box.x1, x + W / 2);
        if (popis === "nad") box.y0 = f.y0 - 3 - H; else box.y1 = f.y1 + 2 + H;
      }
    }
    const an = boxAnchors(box, y);
    Object.keys(r.atoms).forEach((k) => { if (!an[k]) an[k] = [x + r.atoms[k].x * m, y + r.atoms[k].y * m]; });
    ctx.setAnchors(a.id || a.v, an);
    const inner = `<g class="mol" transform="translate(${r1(x)},${r1(y)})${m !== 1 ? ` scale(${m})` : ""}">${r.svg}</g>${label}`;
    if (!a.rk && !a.href) return inner;
    const hit = `<rect class="rk-hit" x="${r1(box.x0 - 3)}" y="${r1(box.y0 - 3)}" width="${r1(box.x1 - box.x0 + 6)}" height="${r1(box.y1 - box.y0 + 6)}" rx="3"/>`;
    return interactive(a, hit + inner, [box.x1 + 1, box.y0 + 2], ctx, (a.nazov || def.meta.nazov || "").replace(/\|/g, " "));
  },

  uzol(a, ctx) {
    if (!a.id) throw new Error("uzol potrebuje id");
    const x = num(a.x, "uzol x"), y = num(a.y, "uzol y");
    const lines = (a.text || a.id).split("|");
    const w = a.w ? num(a.w, "uzol w") : Math.max(...lines.map((t) => textWidth(t, 11, true))) + 16;
    const h = a.h ? num(a.h, "uzol h") : lines.length * 12.5 + 10;
    const cls = a.trieda || "bx-k";
    const box = { x0: x - w / 2, x1: x + w / 2, y0: y - h / 2, y1: y + h / 2 };
    ctx.setAnchors(a.id, boxAnchors(box, y));
    const rect = cls === "nic" ? "" : `<rect class="${esc(cls)}" x="${r1(box.x0)}" y="${r1(box.y0)}" width="${r1(w)}" height="${r1(h)}" rx="3"/>`;
    const y0 = y - ((lines.length - 1) * 12.5) / 2 + 3.8;
    const inner = rect + lines.map((t, i) => `<text class="lblb" x="${r1(x)}" y="${r1(y0 + i * 12.5)}" text-anchor="middle">${esc(t)}</text>`).join("");
    return interactive(a, inner, [box.x1 - 1, box.y0 + 1], ctx, lines.join(" "));
  },

  rx(a, ctx) {
    const P0 = pt(a.od, "rx od"), P1 = pt(a.do, "rx do");
    const C = a.cez ? pt(a.cez, "rx cez") : [(P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2];
    const B = (t) => [(1 - t) * (1 - t) * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P1[0], (1 - t) * (1 - t) * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P1[1]];
    const D = (t) => {
      const v = [2 * (1 - t) * (C[0] - P0[0]) + 2 * t * (P1[0] - C[0]), 2 * (1 - t) * (C[1] - P0[1]) + 2 * t * (P1[1] - C[1])];
      return unit(Math.hypot(v[0], v[1]) < 1e-6 ? [P1[0] - P0[0], P1[1] - P0[1]] : v);
    };
    const len = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]);
    const nv = a.typ === "nevratna", vr = a.typ === "vratna";
    if (a.typ && !nv && !vr) throw new Error(`rx typ="${a.typ}" – poznám len „nevratna“ a „vratna“`);
    const end = nv ? add(P1, D(1), -6.5) : P1;            // hrubá čiara končí v hrote, nie pred ním
    let out = `<path class="rx${nv ? " nv" : ""}" d="M${P(P0)}${a.cez ? `Q${P(C)} ` : "L"}${P(end)}" marker-end="url(#${nv ? "sip-nv" : "sip"})"${vr ? ' marker-start="url(#sip)"' : ""}/>`;

    const M = B(.5), T = D(.5), N = [T[1], -T[0]];
    if (a.e && !SIDES[a.e]) throw new Error(`rx e="${a.e}" – poznám vlavo, vpravo, hore, dole`);
    const want = SIDES[a.e] || (Math.abs(T[1]) > Math.abs(T[0]) ? [1, 0] : [0, -1]);
    const sg = N[0] * want[0] + N[1] * want[1] >= 0 ? 1 : -1;
    const Ne = [N[0] * sg, N[1] * sg], Nk = [-Ne[0], -Ne[1]];
    const an = { m: M };

    /* popis: enzým + regulátory */
    const lines = [];
    (a.enzym || "").split("|").filter(Boolean).forEach((t, i) => lines.push({ t, cls: "enz", pre: i === 0 && a.krok ? a.krok : "" }));
    list(a.akt).forEach((t) => lines.push({ t: "↑ " + t, cls: "t-akt" }));
    list(a.inh).forEach((t) => lines.push({ t: "↓ " + t, cls: "t-inh" }));
    if (lines.length) {
      const W = Math.max(...lines.map((l) => textWidth((l.pre ? l.pre + "  " : "") + l.t, 10, l.cls !== "enz")));
      const H = lines.length * LH;
      const R = add(M, Ne, nv ? 8.5 : 7);
      const cb = [R[0] + (Ne[0] * W) / 2, R[1] + (Ne[1] * H) / 2];
      const side = Math.abs(Ne[0]) > .5;
      const tx = side ? cb[0] - (Ne[0] > 0 ? W / 2 : -W / 2) : cb[0];
      const anchor = side ? (Ne[0] > 0 ? "start" : "end") : "middle";
      lines.forEach((l, i) => {
        const pre = l.pre ? `<tspan class="kr">${esc(l.pre)}</tspan> ` : "";
        out += `<text class="${l.cls}" x="${r1(tx)}" y="${r1(cb[1] - H / 2 + 8.4 + i * LH)}" text-anchor="${anchor}">${pre}${esc(l.t)}</text>`;
      });
      an.e = [cb[0] + Ne[0] * (W / 2 + 4), cb[1] + Ne[1] * (H / 2 + 4)];
      an.et = [cb[0], cb[1] - H / 2 - 3]; an.eb = [cb[0], cb[1] + H / 2 + 3];
      an.el = [cb[0] - W / 2 - 4, cb[1]]; an.er = [cb[0] + W / 2 + 4, cb[1]];
    }

    /* koenzýmy: oblúk, ktorý sa šípky dotkne a zasa odíde */
    const pairs = list(a.ko).map((p) => { const i = p.indexOf(">"); return i < 0 ? [p, ""] : [p.slice(0, i).trim(), p.slice(i + 1).trim()]; });
    let need = 0;
    pairs.forEach(([cin, cout], i) => {
      const t = (i + 1) / (pairs.length + 1);
      const Mi = B(t), Ti = D(t), n0 = [Ti[1], -Ti[0]];
      const s0 = n0[0] * Nk[0] + n0[1] * Nk[1] >= 0 ? 1 : -1;
      const Ni = [n0[0] * s0, n0[1] * s0];
      const along = (txt) => (txt ? Math.abs(Ti[0]) * chipW(txt) + Math.abs(Ti[1]) * 13 : 0);
      const across = (txt) => Math.abs(Ni[0]) * chipW(txt) + Math.abs(Ni[1]) * 13;
      const s = Math.max(10, (along(cin) + along(cout)) / 4 + 2.5);
      need += 2 * s + 4;
      const d = 15;
      const Pin = add(add(Mi, Ni, d), Ti, -s), Pout = add(add(Mi, Ni, d), Ti, s);
      if (cin) {
        out += `<path class="koa" d="M${P(Pin)}Q${P(add(Mi, Ti, -s))} ${P(Mi)}"${vr ? ' marker-start="url(#sip-koe)"' : ""}/>` + chip(cin, add(Pin, Ni, 3 + across(cin) / 2));
      }
      if (cout) {
        out += `<path class="koa" d="M${P(Mi)}Q${P(add(Mi, Ti, s))} ${P(Pout)}" marker-end="url(#sip-koe)"/>` + chip(cout, add(Pout, Ni, 3 + across(cout) / 2));
      }
      if (i === 0) an.k = add(Mi, Ni, d + 3 + Math.max(across(cin || ""), across(cout || "")) + 4);
    });
    if (need && len < need + 8) ctx.warn.add(`rx ${a.enzym || a.id || ""}: šípka (${Math.round(len)} px) je na koenzýmy krátka – treba aspoň ${Math.round(need + 8)} px`);
    if (a.id) ctx.setAnchors(a.id, an);
    if (a.rk || a.href) {
      const hit = `<path class="rk-hit" d="M${P(P0)}${a.cez ? `Q${P(C)} ` : "L"}${P(P1)}"/>`;
      return interactive(a, hit + out, an.er ? [an.er[0] + 5, an.et[1] + 9] : add(M, Ne, 12), ctx, (a.enzym || "").replace(/\|/g, ""));
    }
    return out;
  },

  vplyv(a, ctx) {
    const typ = a.typ || "";
    if (typ && typ !== "akt" && typ !== "inh") throw new Error(`vplyv typ="${typ}" – poznám akt, inh alebo nič`);
    let d = a.d, mid = null;
    if (!d) {
      const P0 = pt(a.od, "vplyv od"), P1 = pt(a.do, "vplyv do");
      const cz = a.cez ? a.cez.trim().split(/\s+/).map((s) => pt(s, "vplyv cez")) : [];
      if (cz.length > 2) throw new Error("vplyv cez: najviac dva body ohybu (zložitejšiu dráhu zapíš ako d=\"M…\")");
      d = `M${P(P0)}` + (cz.length === 2 ? `C${P(cz[0])} ${P(cz[1])} ` : cz.length === 1 ? `Q${P(cz[0])} ` : "L") + P(P1);
      mid = cz.length === 1 ? [(P0[0] + 2 * cz[0][0] + P1[0]) / 4, (P0[1] + 2 * cz[0][1] + P1[1]) / 4]
        : cz.length === 2 ? [(P0[0] + 3 * cz[0][0] + 3 * cz[1][0] + P1[0]) / 8, (P0[1] + 3 * cz[0][1] + 3 * cz[1][1] + P1[1]) / 8]
        : [(P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2];
    }
    const cls = (typ || "vz") + (a.ciara === "plna" ? " plna" : "");
    const mk = typ === "akt" ? "sip-akt" : typ === "inh" ? "stop" : "sip-n";
    let out = `<path class="${cls}" d="${d}" marker-end="url(#${mk})"/>`;
    if (a.text) {
      const at = a.pri ? pt(a.pri, "vplyv pri") : mid ? [mid[0], mid[1] - 5] : null;
      if (!at) throw new Error("vplyv s vlastnou dráhou d=… potrebuje pri=\"x,y\" pre popis");
      const tcls = typ === "akt" ? "t-akt" : typ === "inh" ? "t-inh" : "sub";
      const pre = typ === "akt" ? "↑ " : typ === "inh" ? "↓ " : "";
      out += `<text class="${tcls}" x="${r1(at[0])}" y="${r1(at[1])}" text-anchor="${esc(a.zarovnaj || "middle")}">${esc(pre + a.text)}</text>`;
    }
    return out;
  },

  legenda(a) {
    const x0 = num(a.x, "legenda x"), y0 = num(a.y, "legenda y"), W = a.w ? num(a.w, "legenda w") : 660;
    const line = (cls, mk, extra) => (x, y) => `<path class="${cls}" d="M${r1(x)},${r1(y)}L${r1(x + 22 - (extra || 0))},${r1(y)}" marker-end="url(#${mk})"/>`;
    const ITEMS = {
      rx: { w: 24, draw: line("rx", "sip"), t: "premena" },
      nv: { w: 24, draw: line("rx nv", "sip-nv", 6.5), t: "nevratný (riadiaci) krok" },
      vr: { w: 24, draw: (x, y) => `<path class="rx" d="M${r1(x)},${r1(y)}L${r1(x + 22)},${r1(y)}" marker-end="url(#sip)" marker-start="url(#sip)"/>`, t: "vratná reakcia" },
      enz: { w: 30, draw: (x, y) => `<text class="enz" x="${r1(x)}" y="${r1(y + 3.3)}">enzým</text>`, t: "" },
      ko: { w: 30, draw: (x, y) => chip("ATP", [x + 14, y]), t: "koenzým, kosubstrát" },
      akt: { w: 24, draw: line("akt", "sip-akt"), t: "↑ aktivuje", tc: "t-akt" },
      inh: { w: 24, draw: line("inh", "stop"), t: "↓ inhibuje", tc: "t-inh" },
      vz: { w: 24, draw: line("vz", "sip-n"), t: "iný vplyv, signál" },
      zv: { w: 14, draw: (x, y) => `<text class="at hl" x="${r1(x)}" y="${r1(y + 3.6)}">O</text>`, t: "skupina, o ktorú v reakcii ide" },
      zv2: { w: 14, draw: (x, y) => `<text class="at hl2" x="${r1(x)}" y="${r1(y + 3.6)}">O</text>`, t: "druhá sledovaná skupina" },
      rk: { w: 14, draw: (x, y) => badge([x + 6.5, y]), t: "klik rozbalí podrobnosti" },
      odk: { w: 14, draw: (x, y) => badge([x + 6.5, y], true), t: "klik: podrobná schéma" },
    };
    const keys = (a.polozky || "rx,nv,vr,enz,ko,akt,inh").split(/[\s,]+/).filter(Boolean);
    let x = x0, y = y0, out = "";
    keys.forEach((k) => {
      const it = ITEMS[k];
      if (!it) throw new Error(`legenda: neznáma položka „${k}“`);
      const w = it.w + (it.t ? 5 + textWidth(it.t, 9.5, !!it.tc) : 0) + 16;
      if (x > x0 && x + w - 16 > x0 + W) { x = x0; y += 17; }
      out += it.draw(x, y);
      if (it.t) out += `<text class="${it.tc || "sub"}" x="${r1(x + it.w + 5)}" y="${r1(y + 3.3)}">${esc(it.t)}</text>`;
      x += w;
    });
    return out;
  },
};

const MARKERS = {
  "sip": '<marker id="@" viewBox="0 0 8 7" refX="7.4" refY="3.5" markerWidth="8" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk" d="M0,0L8,3.5L0,7z"/></marker>',
  "sip-nv": '<marker id="@" viewBox="0 0 11 10" refX="4" refY="5" markerWidth="11" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-nv" d="M0,0L11,5L0,10z"/></marker>',
  "sip-akt": '<marker id="@" viewBox="0 0 8 7" refX="7.4" refY="3.5" markerWidth="8" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-akt" d="M0,0L8,3.5L0,7z"/></marker>',
  "sip-koe": '<marker id="@" viewBox="0 0 7 6" refX="6.4" refY="3" markerWidth="7" markerHeight="6" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-koe" d="M0,0L7,3L0,6z"/></marker>',
  "sip-zv": '<marker id="@" viewBox="0 0 9 8" refX="3" refY="4" markerWidth="7.6" markerHeight="6.8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-zv" d="M0,0L9,4L0,8z"/></marker>',
  "sip-zv2": '<marker id="@" viewBox="0 0 9 8" refX="3" refY="4" markerWidth="7.6" markerHeight="6.8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-zv2" d="M0,0L9,4L0,8z"/></marker>',
  "sip-n": '<marker id="@" viewBox="0 0 8 7" refX="7.4" refY="3.5" markerWidth="8" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="mk-n" d="M0,0L8,3.5L0,7z"/></marker>',
  "stop": '<marker id="@" viewBox="0 0 3 11" refX="1.5" refY="5.5" markerWidth="3" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path class="mk-inh" d="M1.5,0L1.5,11"/></marker>',
};

const ANCHOR = /\{([\w-]+)\.([\w']+?)(?:\.([xy]))?(?:([+-]\d+(?:\.\d+)?)(?:,([+-]?\d+(?:\.\d+)?))?)?\}/g;

/* ── rozvinutie jednej schémy ── */
function expand(src, name, opts) {
  const warn = new Set();
  const A = {};
  const open = !!(opts && opts.open);       // náhľad: všetky výrezy rozbalené
  const vbm = src.match(/<svg\b[^>]*\bviewBox="\s*(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/);
  const VB = vbm ? vbm.slice(1, 5).map(Number) : [0, 0, 700, 400];
  const panels = [];
  const ctx = {
    warn, rkUsed: new Set(),
    setAnchors(id, an) { if (A[id]) warn.add(`id „${id}“ je v schéme dvakrát – druhému vzorcu daj vlastné id`); A[id] = an; },
  };
  const subst = (s) => s.replace(ANCHOR, (all, id, key, axis, d1, d2) => {
    const p = A[id] && A[id][key];
    if (!p) { warn.add(`kotva ${all} nemá cieľ (značka s týmto id musí byť v súbore skôr)`); return all; }
    if (axis) return r1(p[axis === "x" ? 0 : 1] + (d1 ? Number(d1) : 0));
    return `${r1(p[0] + (d1 ? Number(d1) : 0))},${r1(p[1] + (d2 ? Number(d2) : 0))}`;
  });

  /* poznámky autora sa do stránky nenesú; hodnota atribútu smie obsahovať „>“ (ko="ADP>ATP") */
  let out = src.replace(/<!--[\s\S]*?-->\s*/g, "");
  /* výrezy: <vyrez id h nadpis> … </vyrez> → skupina pod schémou; otvára ju assets/js/schema.js */
  out = out.replace(/<vyrez\b((?:[^>"]|"[^"]*")*)>/g, (all, at) => {
    const a = attrs(at);
    if (!a.id || !a.h) { warn.add("<vyrez> potrebuje id a h"); return "<g>"; }
    const h = Number(a.h), W = VB[2], x0 = VB[0];
    if (panels.some((q) => q.id === a.id)) warn.add(`výrez „${a.id}“ je v schéme dvakrát`);
    const y = VB[1] + VB[3] + (open ? panels.reduce((sum, q) => sum + q.h, 0) : 0);
    panels.push({ id: a.id, h });
    return `<g class="rk-panel${open ? " is-open" : ""}" data-rk-panel="${esc(a.id)}" data-h="${r1(h)}" transform="translate(0,${r1(y)})">` +
      `<rect class="rk-bg" x="${r1(x0)}" y="0" width="${r1(W)}" height="${r1(h)}"/><path class="rk-line" d="M${r1(x0)},.75H${r1(x0 + W)}"/>` +
      `<text class="rk-t" x="${r1(x0 + 12)}" y="17">${esc(a.nadpis || a.id)}</text>` +
      `<g class="rk rk-x is-open" data-rk="${esc(a.id)}" role="button" tabindex="0" aria-label="Zavrieť výrez"><title>Zavrieť</title><circle cx="${r1(x0 + W - 14)}" cy="13" r="7.5"/><path d="M${r1(x0 + W - 17)},10l6,6m0,-6l-6,6"/></g>`;
  }).replace(/<\/vyrez>/g, "</g>");
  out = out.replace(/<(mol|uzol|rx|vplyv|legenda|plus)\b((?:[^>"]|"[^"]*")*?)\/>/g, (all, tag, at) => {
    try { return TAGS[tag](attrs(subst(at)), ctx); }
    catch (e) { warn.add(`<${tag}>: ${e.message}`); return `<!-- ${tag}: ${esc(e.message)} -->`; }
  });
  out = subst(out);
  ctx.rkUsed.forEach((id) => { if (!panels.some((q) => q.id === id)) warn.add(`rk="${id}" nemá výrez <vyrez id="${id}">`); });
  panels.forEach((q) => { if (!ctx.rkUsed.has(q.id)) warn.add(`výrez „${q.id}“ nič neotvára (chýba rk="${q.id}")`); });
  if (panels.length) {
    const total = VB[3] + (open ? panels.reduce((sum, q) => sum + q.h, 0) : 0);
    out = out.replace(/<svg\b[^>]*>/, (tag) => tag.replace(/\bviewBox="[^"]*"/, `viewBox="${VB[0]} ${VB[1]} ${VB[2]} ${r1(total)}" data-vb="${VB.join(" ")}"`));
    if (open) out = out.replace(/class="rk" data-rk/g, 'class="rk is-open" data-rk');
  }

  const used = new Set();
  out = out.replace(/url\(#(sip-nv|sip-akt|sip-koe|sip-zv2|sip-zv|sip-n|sip|stop)\)/g, (_, k) => { used.add(k); return `url(#${name}-${k})`; });
  if (used.size) {
    const defs = "<defs>" + [...used].sort().map((k) => MARKERS[k].replace("@", `${name}-${k}`)).join("") + "</defs>";
    out = out.replace(/(<svg\b[^>]*>(?:\s*<title[^>]*>[\s\S]*?<\/title>)?)/, `$1\n${defs}`);
  }
  if (!/<title[\s>]/.test(out)) warn.add("schéma nemá <title> (opis pre čítačku obrazovky)");
  return { svg: out, warn: [...warn], panels: panels.length, links: (out.match(/class="rk-a"/g) || []).length };
}

module.exports = { expand };

/* ── náhľad: všetky vzorce a schémy na jednej stránke (pracovne/ sa nezverejňuje) ── */
if (require.main === module) {
  const read = (p) => fs.readFileSync(p, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const only = process.argv.slice(2);
  const css = read(path.join(__dirname, "chapter.css")) + "\n" + read(path.join(__dirname, "chapter-extra.css"));
  const lib = V.library();
  let bad = 0;
  const say = (w) => { bad++; console.log("    ⚠ " + w); };

  let mols = "";
  Object.keys(lib).forEach((id) => {
    const def = lib[id];
    if (def.err.length) { console.log(`  ${id}:`); def.err.forEach(say); return; }
    const r0 = V.render(def);
    const w = Math.max(r0.w, textWidth(def.meta.nazov, 10.5, true)) + 24, h = r0.h + 44;
    const r = expand(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r1(w)} ${r1(h)}" style="width:${r1(w * 1.6)}px"><title>${esc(def.meta.nazov)}</title><mol v="${id}" x="${r1(w / 2)}" y="${r1(r0.h / 2 + 8)}"/></svg>`, "mol-" + id);
    mols += `<figure class="chart" style="display:inline-block;margin:6px 14px 10px 0;vertical-align:top;max-width:none">${r.svg}<figcaption><code>${id}</code> · ${Math.round(r0.w)}×${Math.round(r0.h)} · ${esc(def.meta.projekcia || "")}</figcaption></figure>\n`;
  });

  let figs = "";
  if (fs.existsSync(FIG)) fs.readdirSync(FIG).filter((f) => f.endsWith(".svg")).sort().forEach((f) => {
    const name = f.replace(/\.svg$/, "");
    if (only.length && !only.includes(name)) return;
    const r = expand(read(path.join(FIG, f)), name, { open: !process.env.SCHEMA_ZBALENE });
    if (r.warn.length) { console.log(`  ${f}:`); r.warn.forEach(say); }
    figs += `<h3 class="sub-h">${esc(f)}</h3>\n<figure class="chart keep" id="${name}">${r.svg}</figure>\n`;
  });

  const html = `<!doctype html>
<html lang="sk"><head><meta charset="utf-8"><title>Náhľad vzorcov a schém</title>
<link rel="stylesheet" href="../assets/fonts/fonts.css">
<style>
${css}
</style>
<link rel="stylesheet" href="../assets/styles/palette.css">
</head><body><div class="page" style="max-width:820px">
<h2 class="sec-h">Schémy (chapters/fig/)</h2>
${figs || "<p>Žiadna schéma.</p>"}
<h2 class="sec-h">Knižnica vzorcov (chapters/fig/mol/)</h2>
${mols || "<p>Žiadny vzorec.</p>"}
</div></body></html>
`;
  const outDir = path.join(ROOT, "pracovne");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, "nahlad_schem.html"), html, "utf8");
  console.log(`\n▸ pracovne/nahlad_schem.html   ${Object.keys(lib).length} vzorcov · ${(figs.match(/<figure/g) || []).length} schém${bad ? ` · ${bad} upozornení` : ""}`);
}

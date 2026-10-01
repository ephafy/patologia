# PATOLA — poznámky z patológie

Bezplatná študijná učebnica patologickej anatómie. Postavené **na tom istom systéme ako
kniha Patofyziológia** (`../patofyziologia-ucebnica`) — rovnaký shell, bočný obsah, progress bar,
generátor kapitol z `.md`. Líši sa paleta (hematoxylín + eozín) a sedem farebných boxov.

> Pravidlá písania: [`CLAUDE.md`](CLAUDE.md). Licencie obrázkov: [`ZDROJE-OBRAZKOV.md`](ZDROJE-OBRAZKOV.md).
> Tento README hovorí len **ako je to postavené a ako sa píše `.md`**.

## Štruktúra

```
PATOLA/
├─ index.html              hub — zoznam kapitol, kapitola sa otvorí bez preskočenia stránky
├─ CLAUDE.md               politika (hĺbka, logika, prepojenia, legálnosť, dizajn)
├─ ZDROJE-OBRAZKOV.md      register obrázkov
├─ chapters/               NN_nazov.md  →  NN_nazov.html (generované, needituj)
├─ assets/
│  ├─ styles/site.css      kópia z patofyzie — neupravovať tu
│  ├─ js/site.js           kópia z patofyzie so štyrmi úpravami (CLAUDE.md §7)
│  ├─ js/peek.js           vlastné: náhľad inej kapitoly, pozícia pri F5, návrat Späť
│  ├─ glossary/            glosár patológie: 146 hesiel v 5 súboroch (formát: ../patofyziologia-ucebnica/assets/glossary/README.md)
│  ├─ styles/palette.css   JEDINÝ rozdiel v paletě (hematoxylín + eozín)
│  ├─ fonts/               Source Serif 4 (OFL) lokálne — fonts.css + 2 woff2, zdieľané s patofyziou
│  ├─ js/glossary.js       ┐ kópie z patofyzie: pojmy pod kurzorom, tooltipy, lupa obrázkov
│  ├─ styles/glossary.css  ┘
│  └─ images/              obrázky, jeden súbor na obrázok
├─ tools/
│  ├─ build.js             generátor (kópia z patofyzie + boxy a obrázky)
│  ├─ chapter.css          kópia z patofyzie — neupravovať tu
│  └─ chapter-extra.css    boxy, obrázky, lupa (vlastné)
├─ anki/                   kartičky do Anki (generované: node tools/anki.js)
├─ LICENSE.md              CC BY-SA 4.0 pre text a vlastné schémy
├─ zdroje/                 podkladové materiály — NIKDY sa nezverejňujú (.gitignore)
└─ archiv/                 pôvodné výstupy pred prechodom na tento systém
```

## Zostavenie

```
node tools/build.js                       # všetky kapitoly
node tools/build.js 03_zapal_vseobecne # jedna
```

Výstup hlási počet slov, živých `xref`, klinických mostov, otázok a upozornenia: chýbajúci obrázok,
obrázok bez atribúcie alebo zo vzdialeného servera, odkaz na neexistujúcu kotvu, sekcia nad 600 slov
bez vizuálu, menej než 8 `xref` (odkazy v odpovediach na otázky sa nerátajú), a povinné prvky z
CLAUDE.md §2.2: prázdne `next:`, chýbajúci circulus vitiosus (`⟳`), menej než 3× KLINIKA, žiadne `[R]`,
menej než 5 otázok, v Zdrojoch nič z posledných 5 rokov, na kapitolu vedú odkazy z menej než 2 iných
kapitol. Stačí Node (žiadne `npm install`).

Kartičky do Anki (po zmene glosára alebo otázok): `node tools/anki.js` → `anki/glosar.txt`,
`anki/otazky.txt`. Import v Anki: Súbor → Importovať; opätovný import karty aktualizuje.

Nová kapitola: skopíruj `chapters/_TEMPLATE.md` (build ho preskakuje, lebo začína `_`).

Kontrola glosára (po `build.js`): `node tools/glossary-audit.js surf` vypíše, aké tvary v texte sa
naviazali na ktoré heslo (odhalí chybné priradenie, napr. „eozinofilná“ → Eozinofil);
`node tools/glossary-audit.js miss` vypíše skratky a slová bez hesla.

## Formát `.md`

Rovnaký ako v patofyzii (front matter, `## N.M Sekcia`, `### N.M.K Podsekcia`, `chain`/`fork`/`diagram`
bloky, tabuľky, `xref`) — pozri `../patofyziologia-ucebnica/tools/README.md`. Navyše:

| Čo | Zápis |
|---|---|
| **Stĺpce vedľa seba** (rovnocenné vetvy delenia) | blok ` ```cols `; stĺpce oddeľuje riadok `---`, vnútri bežný markdown (odsek, odrážky). Na mobile sa stĺpce zložia pod seba. |
| **Farebný box** | `> [!MECH]`, `[!MORF]`, `[!DETEK]`, `[!KLINIKA]`, `[!POZOR]`, `[!ZAPAMATAJ]`, `[!FYZ]`; prvý riadok `> **Vlastný štítok**` je voliteľný |
| **Obrázok z Commons** | `![Obr. 2.5 — Titulok. Popis.](img/subor.jpg "Autor · Wikimedia Commons · CC BY-SA 4.0 \| https://commons.wikimedia.org/wiki/File:…")` |
| **Vlastná schéma** | `![Obr. 2.6 — Titulok. Popis.](fig/fig-nazov.svg)` (súbor v `chapters/fig/`, farby cez triedy z `tools/chapter-extra.css`) |
| **Dvojica obrázkov** | dva obrázky na susedných riadkoch bez medzery |
| **Vnorená odrážka** | odsadenie o 2 medzery (jedna úroveň) |
| **Index / zvislé zalomenie** | `<sup>…</sup>`, `<sub>…</sub>`, `<br>` priamo v texte |
| **Značka pôvodu** | `` `[+]` `` pridané, `` `[R]` `` revízia (do HTML sa nenesú) |
| **Otázky na zopakovanie** | sekcia `## N.M Otázky na zopakovanie` s blokom ` ```quiz ` : riadok `? otázka`, pod ním `= odpoveď` (môže pokračovať ďalšími riadkami); v HTML rozbaľovacie, v tlači sa odpovede vypíšu |
| **Odborná kontrola** | vo front matter `reviewed: MUDr. X Y · 2026-10-20` (kto kapitolu vecne skontroloval); prázdne alebo `—` = „zatiaľ neprebehla“ |
| **Nahlásiť chybu** | konštanta `ISSUES_URL` na začiatku `tools/build.js` (adresa `…/issues/new` repozitára) — v kapitole pribudne odkaz |

Obrázok sa ukladá do `assets/images/` pod popisným názvom. Každý má v registri `ZDROJE-OBRAZKOV.md` autora, licenciu a stránku súboru; pri hľadaní nových sa licencia overuje na stránke súboru (API Commons), nie z popisky.

## Zmena palety

`assets/styles/palette.css`: dve stupnice po deväť hodnôt (`--color-accent-100…900`,
`--color-accent-2-100…900`) a dva tokeny shellu (`--site-accent`, `--site-accent-2`). Nič iné sa nemení.

## Synchronizácia s patofyziou

Ak sa v patofyzii opraví `site.css`, `site.js` alebo `chapter.css`, skopíruj ich sem (`site.js` má tu
jedinú úpravu: predmet v AI prompte, riadok „Vysvetli mi nasledujúci úryvok z poznámok z patologickej
anatómie“). `tools/build.js` je tu rozšírený — pri zmene v patofyzii treba zmeny zlúčiť ručne
(rozdiely sú označené na začiatku súboru).

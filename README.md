# PATOLA — poznámky z patológie

Bezplatná študijná učebnica patologickej anatómie. Postavené **na tom istom systéme ako
kniha Patofyziológia** (`../patofyziologia-ucebnica`) — rovnaký shell, bočný obsah, progress bar,
generátor kapitol z `.md`. Líši sa paleta (hematoxylín + eozín) a sedem farebných boxov.

> Licencie obrázkov: [`ZDROJE-OBRAZKOV.md`](ZDROJE-OBRAZKOV.md). Pravidlá písania sú v pracovnom súbore
> autora `CLAUDE.md` (nie je súčasťou zverejneného repozitára; odkazy „CLAUDE.md §…“ v komentároch mieria naň).
> Tento README hovorí len **ako je to postavené a ako sa píše `.md`**.

## Štruktúra

```
PATOLA/
├─ index.html              hub — zoznam kapitol, kapitola sa otvorí bez preskočenia stránky
├─ ZDROJE-OBRAZKOV.md      register obrázkov
├─ chapters/               NN_nazov.md  →  NN_nazov.html (generované, needituj)
├─ assets/
│  ├─ styles/site.css      kópia z patofyzie — neupravovať tu
│  ├─ js/site.js           kópia z patofyzie so štyrmi úpravami (CLAUDE.md §7)
│  ├─ js/peek.js           vlastné: náhľad inej kapitoly, pozícia pri F5, návrat Späť
│  ├─ glossary/            glosár patológie: 204 hesiel v 5 súboroch (formát: ../patofyziologia-ucebnica/assets/glossary/README.md)
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
└─ LICENSE.md              CC BY-SA 4.0 pre text a vlastné schémy, MIT pre kód
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
kapitol, sekcia bez `Jadra`, okrajový box s tabuľkou alebo obrázkom. Vypíše aj počet boxov v okraji
a poznámok so skratkami. Stačí Node (žiadne `npm install`).

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
| **Farebný stĺpec tabuľky** | hlavička stĺpca končí `{zel}`, `{fial}`, `{ruz}` alebo `{tyrk}` – zvýrazní hlavičku aj bunky stĺpca (rovnocenné kategórie, napr. labilné / stabilné / permanentné) |
| **Farebný box** | `> [!MECH]`, `[!MORF]`, `[!DETEK]`, `[!KLINIKA]`, `[!POZOR]`, `[!ZAPAMATAJ]`, `[!FYZ]`; prvý riadok `> **Vlastný štítok**` je voliteľný |
| **Okraj stránky** (CLAUDE.md §5.3) | na širokej obrazovke idú do pravého okraja `KLINIKA`, `POZOR`, `ZAPAMATAJ` a `JADRO` vždy, `DETEK` do 50 slov; box na okraji nesmie mať tabuľku ani obrázok. Na mobile a v tlači ostávajú v texte. |
| **Môžeš počuť** | `> [!POCUT]` – pojem alebo údaj z osnovy, ktorý sa nepodarilo doložiť: tučne pojem, čo sa uvádza, čo je a čo nie je doložené. Vždy na okraji, bez farby, s prerušovaným pásikom; build ich počet vypíše. |
| **Jadro sekcie** | `> [!JADRO]` + jeden riadok: hlavná myšlienka sekcie heslovite (≤ 40 slov), hneď za úvodným textom každej sekcie `##` okrem Súhrnu, Otázok a Zdrojov; build chýbajúce ohlási |
| **Skratky na okraji** | netreba nič písať do kapitoly – stačí riadok v `chapters/_skratky.md` (skratka, význam, voliteľný vzor a čísla kapitol); build vysvetlenie vloží pri prvom výskyte v kapitole |
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

**Mierka písma (od 8. 10. 2026).** Na obrazovke je všetko písmo o 20 % väčšie – ako priblíženie prehliadača na 120 %. Každá veľkosť písma v px je zapísaná ako `calc(Npx*var(--z,1))` (`tools/chapter.css`, `tools/chapter-extra.css`, `assets/styles/site.css`, `assets/styles/glossary.css`, `<style>` v `index.html`, inline štýly v `tools/build.js`) a mierku nastavuje jeden riadok v `site.css`: `@media screen{:root{--z:1.2}}`. Novú veľkosť písma píš vždy s `*var(--z,1)`. Tlač a písmo vnútri SVG schém sa nemenia. S mierkou rastie aj bočný obsah a okraj na poznámky (`--side-w` v `site.css`). Rovnaké vo všetkých troch knihách.

Ak sa v patofyzii opraví `site.css`, `site.js` alebo `chapter.css`, skopíruj ich sem (`site.js` má tu
štyri úpravy označené `PATOLA` — predmet v AI prompte, okrajové poznámky a ich rozloženie, skok po odkaze
v tej istej stránke; pri kopírovaní ich treba zachovať). `tools/build.js` je tu rozšírený — pri zmene v patofyzii treba zmeny zlúčiť ručne
(rozdiely sú označené na začiatku súboru).

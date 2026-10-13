# tools/ — generátor kníh z Markdownu (zdieľaný systém KNIHY-CORE)

Tento priečinok a všetko, čo je zdieľané (`assets/js`, `assets/styles`, `assets/fonts`, `tools/*`, `admin/*`,
`.gitignore`, `LICENSE.md`, `ZVEREJNIT.cmd`), je **rovnaké vo všetkých knihách** (PATOLA, BIOCHEM, PATFYZ).
Upravuje sa výhradne v `Desktop\KNIHY-CORE\core\` a do kníh sa kopíruje `node KNIHY-CORE\sync.js`
(pozri `KNIHY-CORE\README.md`). Kniha sa líši len **dátami**:

| Čo | Kde |
|---|---|
| názov, farba témy, sada boxov, adresy, pravidlá kontroly | `book.json` |
| karty a texty hlavnej stránky | `hub.json` |
| farby knihy | `assets/styles/palette.css` |
| kapitoly, schémy | `chapters/*.md`, `chapters/fig/*.svg` |
| glosár, skratky | `assets/glossary/*.js`, `chapters/_skratky.md` |
| fotografie a ich register | `assets/images/`, `ZDROJE-OBRAZKOV.md` |
| ikony appky | `assets/img/` (`py tools/make_icons.py`) |

## Spustenie

```
node tools/build.js                     # všetky kapitoly + hlavná stránka + manifest + service worker
node tools/build.js 07a_voda_osmolarita # jedna kapitola (hub a service worker sa vždy prepočítajú)
node tools/anki.js                      # kartičky do Anki: anki/glosar.txt, anki/otazky.txt
py tools/make_icons.py                  # ikony appky z book.json (monogram) a palette.css (farby)
```

Žiadne `npm install` — len Node. **Upravuj `.md` a `hub.json`, nie `.html`** — `chapters/*.html`, `index.html`,
`manifest.json` a `service-worker.js` sa pri každom builde prepíšu.

Build vypíše pri každej kapitole rozsah, počet živých odkazov, `[R]`, klinických mostov, boxov v okraji, skratiek,
tabuliek, otázok, schém a odhad času („Prejsť / Naučiť sa“), a varuje pri: chýbajúcom obrázku, odkaze na neexistujúcu
kotvu, sekcii nad 600 slov bez vizuálu, menej než `minXref` odkazoch, prázdnom `next:`, chýbajúcom circulus vitiosus,
menej než 3 klinických mostoch, chýbajúcom Jadre sekcie (ak `requireJadro`), žiadnom `[R]`, menej než 5 otázkach,
Zdrojoch bez titulu z posledných 5 rokov, kapitole bez odkazov z dvoch iných kapitol.

## Ako sa píše `.md`

| Čo | Zápis v `.md` | Výsledok v HTML |
|---|---|---|
| Hlavička | front matter: `num`, `title`, `part`, `crumb`, `eyebrow`, `standfirst`, `deps`, `next`, `reviewed` (± `cas_citanie`, `cas_ucenie` v minútach) | hlavička, predpoklady, pokračuje v; `reviewed` = kto kapitolu vecne skontroloval (prázdne/`—` → „zatiaľ neprebehla“) |
| Sekcia | `## 7a.4 Názov` | `h2.sec-h#sec-7a-4` (značky `[P]` `[S]` `[+]` `[R]` v backtickoch sa do HTML nenesú) |
| Podsekcia | `### 7a.4.1 Názov` | `h3.sub-h#sub-7a-4-1` (pod sekciou „Kazuistiky“: `#kaz-7a-1`) |
| Odsek, zoznam, tabuľka | bežný Markdown; **tučný**, *kurzíva*, `kód`, `<sup>`, `<sub>`, `<br>` | `p`, `ul/ol` (jedna úroveň vnorenia), `table.table#tab-7a-N` |
| Úvodná veta sekcie | odsek začínajúci `{lede} ` | menší tlmený `p.lede` |
| Šírka stĺpca tabuľky, farebný stĺpec | na konci hlavičky stĺpca `{w25}` (25 %), `{zel}` `{fial}` `{ruz}` `{tyrk}` | `th style="width:25%"`, trieda `c-…` |
| Odkaz na inú kapitolu | `[→ 7a.4 Názov](07a_voda_osmolarita#sec-7a-4)` — meno súboru **bez** `.html`; odkaz vedie na **sekciu** | `a.xref`, ak cieľ existuje; inak `span.xref-soon` |
| Odkaz v tej istej kapitole | `[→ 7a.5](#sec-7a-5)`; na obrázok/tabuľku `[Graf 7a.1](#fig-7a-2)` | `a.xref` / `a.figref` |
| Vonkajší odkaz | `[doi:…](https://…)` | `target="_blank" rel="noopener noreferrer"` |
| Reťazec | ` ```chain ` … ` ``` ` (riadok = riadok) | `p.chain` |
| Rozvetvenie | ` ```fork ` s riadkami `Nadpis \| text` | `div.fork` |
| Stĺpce vedľa seba | ` ```cols ` stĺpce oddelené riadkom `---`; samostatný tučný odsek = drobný nadpis stĺpca | `div.cols nN` |
| Číslovaný zoznam v 2 stĺpcoch | ` ```flow ` (riadok = položka) | `ol.flow-2` |
| Textová schéma | ` ```diagram fig-7a-4 \| Schéma 7a.2 — Titulok. Popis. ` | `figure` + `div.diagram` + `figcaption` |
| Vlastná schéma / graf (SVG) | `![Graf 7a.1 — Titulok. Popis.](fig/fig-7a-2.svg)` | `figure.chart` s inline `<svg>` |
| Fotografia s atribúciou | `![Obr. 1.2 — Titulok. Popis.](img/x.jpg "Autor · licencia \| https://stránka-súboru \| fw=420 side right alt=popis pre čítačky")` | `figure.fig` s TASL; dva obrázky na susedných riadkoch = dvojica vedľa seba; `side` = obrázok obtekaný textom, `fw` = najväčšia šírka v px |
| Farebný box | `> [!MECH]` + voliteľný štítok `> **Vlastný štítok**` + obsah (boxy podľa `book.json → boxes`; kľúče: MECH, MORF, DETEK, REG, LAB, KVANT, KLINIKA, POZOR, ZAPAMATAJ, FYZ, CHEM, POCUT, JADRO) | `div.box.k-…`; KLINIKA, POZOR, ZAPAMATAJ, JADRO, POCUT a krátke boxy z `asideShort` idú na širokej obrazovke do okraja |
| Revízia (dnešné poznanie sa líši od staršieho) | `> [!IMPORTANT]` + `> **[R] Revízia — názov**` | `div.rev` |
| Staré callouty | `> [!NOTE]`, `[!WARNING]`, `[!TIP]` | `div.note`, `div.flag`, `div.plain` (v nových kapitolách sa nepoužívajú) |
| Kľúčové body | číslovaný zoznam v sekcii, ktorej názov obsahuje „kľúčové body“ | modrý rámček v 2 stĺpcoch |
| Otázky na zopakovanie | sekcia „Otázky…“ s blokom ` ```quiz `: `? otázka` a pod ňou `= odpoveď` | `ol.quiz` s rozbaľovacími `details`; export do Anki |
| Zdroje | sekcia, ktorej názov začína „Zdroje“; riadok len z tučného textu = podnadpis | menšie písmo |
| Surový HTML (núdzové východisko) | ` ```html ` … ` ``` ` | vloží sa bez zmeny — len keď md konštrukcia neexistuje (napr. tabuľka s `colspan`) |

Všetko pred prvým `## ` je len pracovná hlavička `.md` a do HTML sa nedostane.

Skratky: každá skratka v texte má riadok v `chapters/_skratky.md`; build ju pri prvom výskyte v kapitole vysvetlí na okraji.

## Hlavná stránka (`hub.json`)

`index.html` sa generuje z `hub.json` a `tools/hub.template.html`. Karta = jeden objekt v poli `chapters`:

```json
{"n": "7a", "slug": "07a_voda_osmolarita", "blok": "a", "spolu": true, "title": "…", "topics": "téma · téma"}
```

`slug` chýba = plánovaná (vypnutá) karta. `blok` (`a`–`d`) = jemné podfarbenie študijného bloku (rovnaké pre kapitoly, ktoré sa
učia spolu), `spolu` = ďalšia karta je z toho istého bloku. Odhad času na karte sa dopočíta z rozsahu kapitoly.

## Schémy dráh a vzorce

SVG v `chapters/fig/` smie obsahovať značky `<mol>`, `<rx>`, `<uzol>`, `<vplyv>`, `<legenda>`, `<vyrez>` (rozvíja ich
`tools/schema.js`, vzorce kreslí `tools/vzorce.js`; opis značiek je na začiatku `tools/schema.js`). Obyčajné SVG prejde bez zmeny.
Rozkliknutie schém (⊕ výrezy) obsluhuje `assets/js/schema.js`; načíta sa len v kapitole, kde je potrebné.

## Obrázky

Vlastné schémy sú samostatné `.svg` súbory; **text v nich zalamuj ručne cez `<tspan>`** alebo `data-wrap="N"` (zalomí `site.js`).
Fotografie idú do `assets/images/` a každá má riadok v `ZDROJE-OBRAZKOV.md`.

# Glosár — dáta a šablóna hesla

Vysvetlivky pojmov, ktoré sa v kapitolách zvýraznia pod kurzorom a po kliknutí otvoria v okne; tie isté
heslá idú do Anki (`node tools/anki.js` → `anki/glosar.txt`). Engine je v `../js/glossary.js` (zdieľaný
so všetkými knihami z KNIHY-CORE – v knihe sa nemení). Formát hesla je opísaný nižšie.

**Glosár patrí ku každej kapitole** – rovnako ako skratky, schémy a karta v hube. Kým tu nie je žiadny
súbor `NN-nazov.js`, build `glossary.js` do kapitol nevkladá: čitateľ nemá vysvetlivky ani kartičky pojmov
a **nefunguje ani lupa** (zväčšenie schémy alebo obrázka po kliknutí), ktorá je v tom istom skripte.

## Súbory

Heslá sú v `NN-nazov.js` (jeden súbor = jeden tematický celok; poradie podľa čísla). Build ich do kapitol vkladá automaticky,
zoznam sa nikde neregistruje. Čo je v ktorom súbore, vidno z jeho prvého komentára.

## Postup pri novej kapitole

1. **Vyber pojmy.** Odborné termíny, ktoré kapitola zavádza alebo na ktorých stojí (enzým, metabolit, dej,
   regulačný princíp, laboratórny parameter, porucha) – nie každé podstatné meno. Orientačne 20–40 hesiel
   na kapitolu. Pojem, ktorý už heslo má z inej kapitoly, sa nepíše znova; ak treba, doplní sa mu `match`.
2. **Napíš heslá z vlastných hesiel s faktami kapitoly** (krok 2 postupu), vlastnými slovami, bez otvorených
   zdrojov – platí to isté ako pre text kapitoly (CLAUDE.md §4.0, §4.1). Heslo nesmie tvrdiť nič, čo nie je
   doložené vo faktoch kapitoly. Strojová kontrola zhody so zdrojmi glosár **nepokrýva** → prejsť ručne.
3. **Ulož** do `assets/glossary/NN-nazov.js` (číslo = poradie súboru, nie nutne číslo kapitoly; jeden súbor
   = jeden tematický celok, napr. `01-zaklady-a-enzymy.js`, `02-sacharidy.js`). Meno musí začínať číslicami
   a pomlčkou – inak ho build ani Anki nenačítajú.
4. **Skontroluj:** `node tools/build.js` → `node tools/glossary-audit.js surf` (aké tvary v texte sa
   naviazali na ktoré heslo – odhalí chybné priradenie) → `node tools/glossary-audit.js miss` (skratky a slová
   bez hesla) → `node tools/anki.js`. Potom otvor kapitolu a pozri konzolu: chyba v syntaxi zhodí celý súbor
   hesiel a v knihe potom potichu chýbajú.

## Šablóna súboru

```js
/* Glosár — názov tematického celku.
   Formát záznamu: assets/glossary/README.md. Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "riadiaci-krok",                       // stabilný kľúč bez diakritiky; nemení sa
  title: "Riadiaci krok dráhy",              // nadpis okna a predná strana kartičky
  match: ["riadiac\\w* krok\\w*"],           // tvary v texte; \\w* = ľubovoľná koncovka
  short: "Jedna veta, ktorá musí stačiť, ak čitateľ ďalej nečíta.",
  body:
    '<p class="chain">signál → enzým riadiaceho kroku → <b>tok celou dráhou</b></p>' +
    "<ul>" +
      "<li><b>Pojem</b> — vysvetlenie.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Čo z toho plynie pre reguláciu, laboratórium alebo kliniku.</p>'
},
{
  id: "pfk-1", title: "PFK-1 — fosfofruktokináza-1", match: ["PFK-1", "fosfofruktokináz\\w*-1"],
  short: "Krátke heslo: stačí veta v short a prázdne body.",
  body: ""
}
);
```

## Pravidlá

| Pole | Pravidlo |
|---|---|
| `match` | Regulárne výrazy ako reťazce. `\\w*` chytí aj dlhšie zložené slovo (`pyruvát\\w*` by chytilo *pyruvátkinázu*, keby nemala vlastné heslo; `katal\\w*` chytí *katalyzuje*) – kde to hrozí, vymenuj koncovky: `etanol(?:u|e|om)?`. Vždy skontroluj výpis `glossary-audit.js surf`. Hľadá sa bez ohľadu na veľkosť písmen a na hranici slova; spojovník sa ráta ako súčasť slova (`PFK` sa v `PFK-1` nechytí). Dlhší vzor vyhráva nad kratším. **Skratku, ktorá je zároveň slovenským slovom alebo značkou prvku, nepridávaj.** Číslované názvy (fruktóza-1,6-bisfosfát × fruktóza-2,6-bisfosfát) píš celé, nech sa nezamenia. |
| `short` | Jedna veta – definícia a to, načo pojem je. |
| `body` | V bodoch a reťazcoch, nie v odsekoch: `<ul><li>`, `<p class="chain">` (A → B → C, riadky cez `<br>`), `<div class="fork">` (2–3 dôsledky vedľa seba; musí to byť `<div>`), na konci `<p class="why">`. Indexy cez `<sub>`/`<sup>`. Pojmy v `body` sa prelinkujú samy. Smie ostať prázdne (`""`). |
| `img` | Nepovinné; len vlastná schéma alebo obrázok s voľnou licenciou a riadkom v `ZDROJE-OBRAZKOV.md` (CLAUDE.md §4.3–4.5). Cesta od koreňa projektu. |

Skratka má zvyčajne **aj** riadok v `chapters/_skratky.md` (krátke vysvetlenie na okraji pri prvom výskyte)
**aj** heslo tu (plné vysvetlenie na klik) – jedno druhé nenahrádza.

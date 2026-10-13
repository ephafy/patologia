---
num: N
title: Názov kapitoly
part: Patologická anatómia
crumb: Krátky názov do hlavičky
eyebrow: Téma (napr. Regresívne zmeny I)
standfirst: Jedna–dve vety: kde kapitola stojí na mape siedmich reakcií tkaniva, o čom je a ako je rozdelená (hlavné delenie a jeho kritérium) – mapa kapitoly.
deps: [→ M.K Názov sekcie](MM_subor#sec-M-K) · [→ …](…)
next: [→ N+1 Názov ďalšej kapitoly](NN_subor)
reviewed: —
---

<!--
Šablóna kapitoly PATOLY. Súbor začínajúci „_“ build preskakuje.
ZÁVÄZNÝ POSTUP (CLAUDE.md §4.0) – kroky sa nemiešajú:
  1. osnova – LEN heslá tém a pojmov, ktoré kapitola pokryje (žiadne vety, čísla, poradie, príklady),
  2. fakty  – z učebníc, klasifikácií, článkov a webu vlastnými heslami + zdroj; každý overený ďalším zdrojom,
  3. najprv strom nadpisov s kritériom každého delenia (CLAUDE.md §2.0), až potom odseky;
     text sa píše LEN z vlastných hesiel z kroku 2, žiadny zdroj nie je pri písaní otvorený;
     kostra podľa mechanizmu, nie podľa poradia ktoréhokoľvek zdroja,
  4. kontrola zhody hotového textu so zdrojmi (strojovo aj ručne, strana po strane) = bez nálezu.
Potom: skopíruj ako chapters/NN_nazov.md, nahraď N číslom kapitoly, prepíš text.
Pravidlá: CLAUDE.md (§1 hĺbka, §2 logika, §3 prepojenia, §4 legálnosť). Formát: README.md.

- reviewed: meno a dátum toho, kto kapitolu vecne skontroloval („MUDr. X Y · 2026-10-20“); „—“ = zatiaľ nikto.
- ŠTRUKTÚRA (§2.0): pod KAŽDÝM nadpisom najprv aspoň jedna veta úvodu (čo sekcia rieši, podľa čoho sa delí),
  až potom box/tabuľka/obrázok/odrážky/podnadpis; jedno kritérium na úroveň, vetvy sa neprekrývajú a pokrývajú celok.
- PRIORITY (§2.0, bod 5): hlavná myšlienka sekcie je povedaná prvá, nosné fakty v poradí, v akom z nej vyplývajú,
  doplnky až za nimi. Každá sekcia ## má za úvodným textom > [!JADRO] – hlavnú myšlienku heslovite (≤ 40 slov).
- OKRAJ (§5.3): KLINIKA, POZOR, ZAPAMATAJ a JADRO idú vždy na okraj (bez tabuliek a obrázkov), DETEK do 50 slov;
  MECH, MORF a FYZ ostávajú v texte. Nová skratka = riadok v chapters/_skratky.md (build ju vysvetlí na okraji).
- Každý mechanizmus má štyri vrstvy: [!MECH] · [!MORF] · [!DETEK] · [!KLINIKA].
- Povinné: 1 kaskáda, 1 circulus vitiosus (⟳ + bod zvratu), 1 rozlišovacia tabuľka, ≥ 3× KLINIKA,
  hranica reverzibility, súhrn, ≥ 5 otázok, zdroje (≥ 3 na sekciu, aspoň jeden z posledných 5 rokov).
- POHĽAD (§2.5): šesť otázok na každý dej (spúšťač, mechanizmus, obraz a prečo, ČAS, potvrdenie/odlíšenie,
  dôsledok; terén, keď sa výsledok líši podľa orgánu). Kmeňový mechanizmus z inej kapitoly: krátke
  pripomenutie jadra (1–3 vety alebo chain) + xref domov, nie druhý plný výklad. Skupiny cez prototyp
  a odchýlky. Sprievodné choroby (IM, ateroskleróza, pneumónia, TBC, pečeň, kolorektálny ca) ako príklad,
  kde sedia. Schémy len vlastné SVG (§5.2). Orgánová kapitola = _TEMPLATE_organ.md.
- Build (node tools/build.js) povinné prvky spočíta a chýbajúce ohlási.
Tento komentár pri písaní zmaž.
-->

## N.1 Východisko a definícia

Čo je normálne (len toľko fyziológie, bez koľko porucha nedáva zmysel) a presná definícia pojmu.
Kde kapitola stojí na mape siedmich reakcií (odkaz na mapu v kap. 0) a čo z predošlých kapitol
potrebuje (krátke pripomenutie + xref).
Mapa kapitoly: podľa čoho sa téma delí a na aké hlavné vetvy (pri > 3 vetvách aj vlastná SVG schéma mapy).

> [!JADRO]
> Hlavná myšlienka sekcie heslovite: **pojem** = …; príčina → činiteľ → následok. Najviac 40 slov, nič nové.

> [!FYZ]
> Normálny stav, od ktorého sa porucha meria.

## N.2 Mechanizmus

Úvodná veta: čo sekcia vysvetľuje a podľa čoho sa ďalej delí.

> [!JADRO]
> Jadro každej ďalšej sekcie – rovnako za jej úvodným textom (N.3 až N.7).

```chain
príčina → činiteľ (mediátor, enzým, tlak) → bunkový dej → **morfologický nález**
```

> [!MECH]
> Kaskáda krok za krokom; každá šípka má činiteľa (CLAUDE.md §2.1).

## N.3 Morfológia

Úvodná veta: čo sa na reze rozlišuje a prečo práve tak.

> [!MORF]
> - **MA** (orgán a miesto → veľkosť, hmotnosť s normou → tvar a povrch → konzistencia → farba → rez →
>   ohraničenie): ako to vyzerá voľným okom — a **prečo** (bledé, lebo…).
> - **MI** (malé zväčšenie: architektúra → stredné: aké bunky, infiltrát → veľké: cytoplazma, jadro →
>   medzibunková hmota, farbenia): čo je v mikroskope — a prečo.
> Položka, ktorá nič nehovorí, sa vynechá; poradie sa nemení (CLAUDE.md §2.5, bod 6).

Ako sa nález mení v čase (povinné, ak sa dej v čase vyvíja; CLAUDE.md §2.2):

| Čas od začiatku | Makroskopicky | Mikroskopicky | Čo za tým je |
| --- | --- | --- | --- |
| hodiny | … | … | … |
| dni | … | … | … |
| týždne | … | … | … |

![Obr. N.1 — Titulok. Popis nálezu.](img/subor.jpg "Autor · Wikimedia Commons · CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:…")

## N.4 Detekcia

Úvodná veta: čo treba potvrdiť a ktorou metódou.

> [!DETEK]
> Farbenie, imunohistochémia, laboratórium — s jednotkou, normou a prahom.

## N.5 Kompenzácia a hranica reverzibility

Kedy je zmena ešte vratná a čo ju robí nevratnou.

Kruh sa navzájom poháňa (circulus vitiosus ⟳, Obr. N.x):

![Obr. N.x — Bludný kruh … .](fig/fig-kruh-….svg)

<!-- Schémy vždy ako vlastné SVG v chapters/fig/ (rovnaký vzhľad ako fig-kruh-sepsa.svg: uzly v slučke,
     ⟳ v strede, bod zvratu v eozínovej farbe), nikdy ako textový blok ```diagram. -->

**Bod zvratu =** pomenovaný okamih, od ktorého sa kruh točí sám; **kde prerušiť:** …

## N.6 Následky a osud

Úvodná veta: aké sú možné osudy a čo rozhoduje, ktorým smerom sa zmena vydá.

## N.7 Klinika

Úvodná veta: kde sa s tým lekár stretne a čo z mechanizmu vysvetľuje príznaky.

> [!KLINIKA]
> Od nálezu k pacientovi (príznak, laboratórium s normou, zobrazenie) · od pacienta k nálezu (čo je na
> reze za príznakom) · čo patológ napíše do správy a aké rozhodnutie z toho plynie (CLAUDE.md §2.5, bod 9).

| | Stav A | Stav B |
| --- | --- | --- |
| Mechanizmus | … | … |
| Morfológia | … | … |

## N.8 Súhrn a rýchle rozlíšenie

Úvodná veta: súhrn sleduje tú istú mapu ako N.1.

| Jednotka | Mechanizmus | Morfológia | Príklad |
| --- | --- | --- | --- |
| … | … | … | … |

## N.9 Otázky na zopakovanie

```quiz
? Otázka typu „prečo“, nie „vymenuj“?
= Odpoveď s mechanizmom a odkazom späť do textu. [→ N.2 Mechanizmus](#sec-N-2)
? Otázka, ktorá spája túto kapitolu s predošlou látkou?
= Odpoveď s odkazom do oboch kapitol.
? Prípad: pacient s …, na reze … – prečo?
= Mechanizmus od nálezu späť k príčine.
```

## N.10 Zdroje

**Učebnice (kontrola faktov)** — len prečítané (CLAUDE.md §1.3)

- Zámečník J. a kol.: *Patologie*, 2. vyd., Praha: LD Prager Publishing, 2024. ISBN 978-80-11-04919-5.

**Klasifikácie, konsenzy a prehľady**

- Autor A. et al.: Názov. *Časopis* rok;ročník:strany. [doi:…](https://doi.org/…)
- StatPearls (NCBI Bookshelf): [Názov](https://www.ncbi.nlm.nih.gov/books/NBK…/)

**Obrázky**

Autor, licencia a odkaz na zdroj sú pri každom obrázku; súhrn je v registri `ZDROJE-OBRAZKOV.md`.

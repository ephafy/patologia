/* Glosár PATOLY — poruchy obehu a hemostáza (kap. 8): hemostáza a jej testy, trombóza, embólie,
   infarkt, venostáza, názvy krvácaní, krvácavé stavy a DIC. Texty sú vlastné (CLAUDE.md §4.1).
   Skratky, ktoré sú aj bežným slovom (HIT, PT), sa zámerne nechytajú. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── hemostáza ───────────────────────────────────────────────────────── */
{
  id: "hemostaza", et: "gr. <i>haima</i> „krv“ + <i>stasis</i> „zastavenie“",
  title: "Hemostáza",
  match: ["hemostáz\\w*"],
  short: "Súbor dejov, ktoré držia krv v neporušenej cieve tekutú a v poranenej ju na mieste zrazia.",
  body:
    '<p class="chain">poranenie → cieva sa stiahne → doštičky prilepia na kolagén a zhluknú sa (<b>primárna hemostáza</b>) → trombín vytvorí fibrín (<b>sekundárna hemostáza</b>) → brzdy a fibrinolýza zátku ohraničia</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vychýlenie jedným smerom je <b>trombóza</b>, druhým <b>krvácavý stav</b>; pri DIC oboje naraz.</p>'
},
{
  id: "vwf",
  img: {
    src: "assets/images/gl-dosticky-receptory.svg",
    alt: "Schéma: doštička sa cez vWF a GP Ib prichytí na kolagén, cez GP VI priamo; fibrinogén spojí GP IIb/IIIa dvoch doštičiek.",
    caption: "Adhézia, aktivácia a agregácia doštičiek – ktorý receptor čo drží.",
    credit: "vlastná schéma · CC BY-NC-SA 4.0"
  },
  title: "Von Willebrandov faktor (vWF)",
  match: ["vWF", "von\\s+Willebrandov\\w*\\s+faktor\\w*"],
  short: "Veľká bielkovina z endotelu, ktorou sa doštičky chytajú o odkrytý kolagén; v krvi zároveň chráni faktor VIII.",
  body:
    '<p class="chain">odkrytý kolagén → naviaže vWF → doštička sa naň prichytí receptorom GP Ib → adhézia</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Keď chýba (von Willebrandova choroba), viazne adhézia doštičiek <b>aj</b> koagulácia, lebo nechránený faktor VIII sa rýchlo rozkladá.</p>'
},
{
  id: "tkanivovy-faktor",
  title: "Tkanivový faktor",
  match: ["tkanivov\\w*\\s+faktor\\w*", "tromboplast\\w*"],
  short: "Spúšťač koagulácie na bunkách pod endotelom (starší názov: tkanivový tromboplastín) — s faktorom VIIa aktivuje faktor X.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zdravý endotel ho nenesie. Keď sa dostane do krvi vo veľkom (placenta, rozdrvené tkanivo, nádor, monocyty pri sepse), spustí zrážanie v celom obehu — <b>DIC</b>.</p>'
},
{
  id: "trombin", et: "gr. <i>thrombos</i> „zrazenina“",
  title: "Trombín",
  match: ["trombín\\w*"],
  short: "Kľúčový enzým koagulácie: mení fibrinogén na fibrín a zároveň aktivuje doštičky a faktory V a VIII.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zosilňuje sám seba — preto koagulácia potrebuje brzdy (antitrombín, proteín C). Na zdravom endoteli sa trombín naopak mení na aktivátor proteínu C.</p>'
},
{
  id: "antitrombin", et: "gr. <i>anti</i> „proti“ + trombín",
  title: "Antitrombín",
  match: ["antitrombín\\w*"],
  short: "Brzda koagulácie: viaže a vypína trombín a faktor Xa. Heparín jeho účinok mnohonásobne zrýchľuje.",
  body: "<ul><li>Dedičný nedostatok dáva trombofíliu.</li><li>Heparín jeho účinok mnohonásobne zrýchľuje.</li></ul>"
},
{
  id: "protein-c",
  title: "Proteín C",
  match: ["proteín\\w*\\s+C\\b", "aktivovan\\w*\\s+proteín\\w*\\s+C"],
  short: "Brzda koagulácie: aktivovaný proteín C s proteínom S rozkladá faktory Va a VIIIa.",
  body: "<ul><li>Aktivuje ho trombín viazaný na trombomodulín na endoteli.</li><li>Nedostatok dáva trombofíliu.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Pri Leidenskej mutácii je faktor V voči proteínu C odolný — najčastejšia vrodená trombofília.</p>"
},
{
  id: "protein-s",
  title: "Proteín S",
  match: ["proteín\\w*\\s+S\\b"],
  short: "Pomocný kofaktor proteínu C pri rozklade faktorov Va a VIIIa.",
  body: "<ul><li>Je závislý od vitamínu K, rovnako ako proteín C.</li></ul><ul><li>Nedostatok proteínu S dáva sklon k trombóze.</li></ul>"
},
{
  id: "fibrinolyza", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>lysis</i> „rozpúšťanie“",
  title: "Fibrinolýza",
  match: ["fibrinolýz\\w*", "fibrinolytick\\w*"],
  short: "Rozpúšťanie zrazeniny: plazmín štiepi fibrín na rozpustné úlomky.",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Rozpustí sa len čerstvý trombus z fibrínu; keď doň vrastie granulačné tkanivo, už nie.</p>"
},
{
  id: "plazmin", et: "gr. <i>plasma</i> „tekutá časť krvi“",
  title: "Plazmín",
  match: ["plazmín\\w*"],
  short: "Enzým, ktorý štiepi fibrín; vzniká z plazminogénu.",
  body: "<ul><li>Vzniká z plazminogénu účinkom tPA a urokinázy.</li><li>Rozkladá aj fibrinogén a faktory koagulácie — pri nadmernej aktivácii hrozí krvácanie.</li></ul><ul><li>Úlomky fibrínu sa dajú dokázať ako D-diméry.</li></ul>"
},
{
  id: "trombolyza", et: "gr. <i>thrombos</i> „zrazenina“ + <i>lysis</i> „rozpúšťanie“",
  title: "Trombolýza",
  match: ["trombolýz\\w*"],
  short: "Liečebné rozpustenie čerstvého trombu podaním liekov aktivujúcich plazmín.",
  body: "<ul><li>Použitie napr. pri infarkte myokardu a mozgovom infarkte; účinná len v čase, kým je trombus čerstvý.</li></ul>"
},
{
  id: "d-dimery", et: "gr. <i>di-</i> „dva“ + <i>meros</i> „časť“ (dva spojené fragmenty D-domén fibrínu)",
  img: {
    src: "assets/images/dvt-leg.jpg",
    alt: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    caption: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Deep_vein_thrombosis_of_the_right_leg.jpg"
  },
  title: "D-diméry",
  match: ["D-dimér\\w*"],
  short: "Úlomky fibrínu, ktorý bol spevnený sieťovaním a potom rozštiepený plazmínom — znak, že niekde vznikla a rozpúšťa sa zrazenina.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Veľmi citlivé, málo špecifické: normálna hodnota hovorí proti trombóze, zvýšená ju nedokazuje (stúpajú aj po operácii, pri zápale, nádore, v tehotenstve). Pri DIC sú výrazne zvýšené.</p>'
},
{
  id: "protrombinovy-cas", et: "gr. <i>pro</i> „pred“ + trombín",
  title: "Protrombínový čas (PT, INR; angl. prothrombin time, international normalized ratio)",
  match: ["protrombínov\\w*\\s+čas\\w*", "INR"], csMatch: ["PT"],
  short: "Test cesty tkanivového faktora: faktor VII a spoločná časť (X, V, protrombín, fibrinogén). INR je jeho štandardizovaný pomer.",
  body: "<ul><li>Sleduje sa pri liečbe warfarínom (cieľové INR ≈ 2–3).</li><li>Cesta závisí od vitamínu K.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Predlžuje ho nedostatok vitamínu K, warfarín a choroba pečene; pri hemofílii je normálny.</p>"
},
{
  id: "aptt", et: "tromboplastín: gr. <i>thrombos</i> „zrazenina“ + <i>plastos</i> „utvorený“",
  title: "aPTT — aktivovaný parciálny tromboplastínový čas",
  match: ["aPTT", "parciáln\\w*\\s+tromboplastínov\\w*\\s+čas\\w*"],
  short: "Test „vnútornej“ cesty koagulácie: faktory VIII, IX, XI, XII a spoločná časť.",
  body: "<ul><li>Sleduje sa pri liečbe nefrakcionovaným heparínom.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Predĺžený pri hemofílii A a B a pri liečbe heparínom; počet doštičiek a PT sú pri hemofílii v norme.</p>"
},

/* ── trombóza ────────────────────────────────────────────────────────── */
{
  id: "virchowova-trias", et: "gr. <i>trias</i> „trojica“ (<i>treis</i> „tri“)",
  img: {
    src: "assets/images/dvt-leg.jpg",
    alt: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    caption: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Deep_vein_thrombosis_of_the_right_leg.jpg"
  },
  title: "Virchowova trias",
  match: ["Virchowov\\w*\\s+tri\\w+"],
  short: "Tri podmienky trombózy: poškodený endotel, porucha prúdenia (stáza alebo turbulencia) a zvýšená zrážanlivosť krvi.",
  body:
    "<ul>" +
      "<li><b>Tepny a srdce</b> — rozhoduje endotel a turbulencia (prasknutý plát, aneuryzma, chlopňa).</li>" +
      "<li><b>Žily</b> — rozhoduje stáza a trombofília (nehybnosť, operácia, nádor).</li>" +
    "</ul>"
},
{
  id: "trombofilia", et: "gr. <i>thrombos</i> „zrazenina“ + <i>philia</i> „záľuba, sklon“",
  img: {
    src: "assets/images/dvt-leg.jpg",
    alt: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    caption: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Deep_vein_thrombosis_of_the_right_leg.jpg"
  },
  title: "Trombofília",
  match: ["trombofíli\\w*", "trombofiln\\w*", "hyperkoagul\\w*"],
  short: "Vrodený alebo získaný sklon k trombóze — v krvi je viac prozrážanlivých činiteľov alebo menej bŕzd.",
  body:
    "<ul>" +
      "<li><b>Vrodená</b> — Leidenská mutácia faktora V, mutácia génu pre protrombín, nedostatok antitrombínu, proteínu C alebo S.</li>" +
      "<li><b>Získaná</b> — nehybnosť, operácia, nádor, tehotenstvo a estrogény, antifosfolipidový syndróm, heparínom indukovaná trombocytopénia.</li>" +
    "</ul>"
},
{
  id: "leidenska-mutacia",
  img: {
    src: "assets/images/dvt-leg.jpg",
    alt: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    caption: "Hlboká žilová trombóza dolnej končatiny: opuch a začervenanie.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Deep_vein_thrombosis_of_the_right_leg.jpg"
  },
  title: "Leidenská mutácia faktora V",
  match: ["Leidensk\\w*\\s+mutáci\\w*", "faktor\\w*\\s+V\\s+Leiden"],
  short: "Zmena faktora V, pre ktorú ho aktivovaný proteín C nevie rozložiť — najčastejšia vrodená trombofília (asi 1–5 % Európanov).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Jedna zmenená alela zvyšuje riziko žilovej trombózy asi 7-násobne, dve asi 20-násobne; trombóza často príde až s druhým činiteľom (antikoncepcia, operácia, dlhý let).</p>'
},
{
  id: "zahnove-linie",
  title: "Zahnove línie",
  match: ["Zahnov\\w*\\s+líni\\w*"],
  img: {
    "src": "assets/images/thrombus-lines-of-zahn.jpg",
    "alt": "Trombus s vrstvami: bledé pruhy doštičiek a fibrínu sa striedajú s červenými pruhmi erytrocytov.",
    "caption": "Vrstvenie trombu (H&E).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pulmonary_thromboembolus,_recent_(3626658803).jpg"
  },
  short: "Striedanie bledých vrstiev (doštičky a fibrín) a červených vrstiev (erytrocyty) v trombe, ktorý rástol v prúdiacej krvi.",
  body: "<ul><li>Biele vrstvy tvoria doštičky a fibrín, červené erytrocyty.</li><li>Vznikajú v prúdiacej krvi (tepny, srdce, žily).</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Dokazujú, že zrazenina vznikla <b>za života</b> — posmrtná zrazenina vrstvy nemá.</p>"
},
{
  id: "rekanalizacia", et: "lat. <i>re-</i> „znova“ + <i>canalis</i> „kanál, rúra“",
  title: "Rekanalizácia trombu",
  match: ["rekanalizáci\\w*", "rekanalizov\\w*"],
  img: {
    "src": "assets/images/recanalized-thrombus.jpg",
    "alt": "Rekanalizovaný trombus: väzivová prepážka a nové kanály v priesvite.",
    "caption": "Rekanalizovaný trombus: väzivová prepážka a nové kanály v priesvite.",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Recanalized_pulmonary_artery_(7307510486).jpg"
  },
  short: "Čiastočné obnovenie prietoku cez organizovaný trombus: nové kapiláry v ňom sa spoja a rozšíria na kanály.",
  body: "<ul><li>Trombus organizuje granulačné tkanivo.</li><li>Kanály čiastočne obnovia prietok — trombus môže pripomínať sito.</li></ul>"
},

/* ── embólia ─────────────────────────────────────────────────────────── */
{
  id: "embolia", et: "gr. <i>embolos</i> „zátka, klin“ (<i>emballein</i> „vhodiť“)",
  title: "Embólia",
  match: ["embóli\\w*", "emboliz\\w*"],
  img: {
    "src": "assets/images/pulmonary-embolus-gross.jpg",
    "alt": "Embolus v pľúcnej tepne (jazdec).",
    "caption": "Embolus v pľúcnej tepne (jazdec).",
    "credit": "Dr. Rocke Robertson · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:AC08-7_Pulmonary_embolus.JPG"
  },
  short: "Zavlečenie materiálu nerozpustného v krvi prúdom do miesta, kde je cieva užšia ako on.",
  body: "<ul><li><b>Zo žíl veľkého obehu:</b> pravé srdce → pľúcnica (pľúcna embólia).</li><li><b>Z ľavého srdca a aorty:</b> tepny orgánov (mozog, črevo, oblička, slezina, končatiny).</li><li><b>Čo sa zavlečie:</b> najčastejšie odtrhnutý trombus (trombembólia); inak tuk, vzduch, dusík, plodová voda, cholesterolové kryštály, nádor, infikovaný trombus.</li></ul>"
},
{
  id: "embolus", et: "gr. <i>embolos</i> „zátka“",
  title: "Embolus",
  match: ["embolus\\w*", "embolu", "emboly", "embolov", "embolom"],
  short: "Zavlečený materiál, ktorý upchá cievu v mieste, kde je cieva užšia než on.",
  body: "<ul><li>Druh podľa materiálu: trombus, tuk, vzduch, plodová voda, kryštály, nádor.</li><li>Bakteriálny embolus roznáša infekciu (septická embólia).</li></ul><ul><li>Dôsledok závisí od toho, kam sa zaklinil: uzáver cievy → ischémia, infarkt.</li></ul>"
},
{
  id: "trombembolia", et: "gr. <i>thrombos</i> „zrazenina“ + <i>embolos</i> „klin, zátka“",
  title: "Trombembólia",
  match: ["trombembóli\\w*"],
  short: "Embólia odtrhnutým trombom — najčastejší druh embólie.",
  body: "<ul><li>Zdroj sú najčastejšie hlboké žily dolných končatín.</li><li>Dôsledok: pľúcna embólia; z ľavého srdca mozgové a periférne embólie.</li></ul><p class=\"chain\">hlboká žilová trombóza → odtrhnutie → pravé srdce → pľúcnica → pľúcna embólia</p>"
},
{
  id: "plucna-embolia",
  title: "Pľúcna embólia",
  match: ["pľúcn\\w*\\s+(?:tromb)?embóli\\w*"],
  img: {
    "src": "assets/images/pulmonary-embolus-gross.jpg",
    "alt": "Otvorená vetva pľúcnice s tmavočervenou zrazeninou.",
    "caption": "Embolus vo vetve pľúcnice pri pitve.",
    "credit": "Dr. Rocke Robertson · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:AC08-7_Pulmonary_embolus.JPG"
  },
  short: "Uzáver pľúcnice alebo jej vetiev embolom — takmer vždy trombom z hlbokých žíl dolných končatín.",
  body: "<ul><li>Najčastejšie z hlbokých žíl dolných končatín a panvy.</li><li>Sedlový embolus uviazne na rozdvojení pľúcnice.</li><li>Pľúcny infarkt vzniká zriedka — pľúca majú dvojité zásobenie.</li></ul><p class=\"chain\">veľký embolus → náhly odpor → <b>zlyhanie pravej komory</b> → šok, smrť<br>malý embolus → nič, alebo <b>červený infarkt</b> pľúc, ak je slabý aj bronchiálny obeh</p>"
},
{
  id: "paradoxna-embolia", et: "gr. <i>para</i> „proti“ + <i>doxa</i> „mienka“ (cesta proti očakávaniu)",
  title: "Paradoxná embólia",
  match: ["paradoxn\\w*\\s+embóli\\w*", "paradoxn\\w*\\s+emboliz\\w*", "foramen\\s+ovale"],
  short: "Žilový embolus obíde pľúca otvorom v srdcovej priehradke (najčastejšie priechodné foramen ovale) a skončí v tepnách veľkého obehu.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Priechodné foramen ovale má asi štvrtina ľudí; embolus ním prejde, keď tlak vpravo prevýši tlak vľavo (kašeľ, tlačenie, pľúcna hypertenzia). Vysvetľuje mozgový infarkt u človeka so žilovou trombózou.</p>'
},
{
  id: "tukova-embolia",
  title: "Tuková embólia",
  match: ["tukov\\w*\\s+embóli\\w*", "syndróm\\w*\\s+tukovej\\s+embólie"],
  short: "Kvapôčky tuku a kostnej drene v pľúcnych cievach po zlomenine dlhých kostí alebo pomliaždení tuku.",
  body:
    '<p class="chain">tuk v pľúcnych kapilárach → lipázy uvoľnia mastné kyseliny → poškodenie endotelu → po 1–3 dňoch <b>dýchavica, porucha vedomia, petechie</b> (syndróm tukovej embólie)</p>',
  img: {
    src: "assets/images/fat-embolism-lung.jpg",
    alt: "Pľúcna tepna s okrúhlymi prázdnymi priestormi po tuku a úlomkom kostnej drene.",
    caption: "Tuková embólia v pľúcnej tepne (H&E).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_a_pulmonary_artery_with_fat_embolism_and_a_bone_marrow_fragment.jpg"
  }
},
{
  id: "vzduchova-embolia",
  title: "Vzduchová embólia",
  match: ["vzduchov\\w*\\s+embóli\\w*"],
  short: "Vzduch nasatý do otvorenej veľkej žily spení krv v pravej komore — tá stlačiteľnú penu neprečerpá.",
  body: "<ul><li>Vzniká pri operáciách hlavy a krku a pri katétroch.</li><li>Malé množstvo je neškodné; rozhoduje objem.</li></ul>"
},
{
  id: "dekompresna-choroba", et: "lat. <i>de-</i> „odstránenie“ + <i>comprimere</i> „stlačiť“; kesónová: franc. <i>caisson</i> „veľká debna“ (<i>caisse</i> „debna“)",
  title: "Dekompresná (kesónová) choroba",
  match: ["dekompresn\\w*\\s+chorob\\w*", "kesónov\\w*\\s+chorob\\w*"],
  short: "Pri rýchlom výstupe z hĺbky sa dusík rozpustený v krvi a tkanivách uvoľní ako bubliny, ktoré upchajú drobné cievy.",
  body: "<ul><li>Dusík sa pri prudkom poklese tlaku uvoľní ako bubliny v krvi a tkanivách.</li><li>Typická u potápačov a pri práci v kesónoch.</li><li>Liečba: rekompresia v tlakovej komore.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Bolesti kĺbov, kožná vyrážka, poškodenie miechy; liečbou je pretlaková komora, ktorá bubliny znova rozpustí.</p>"
},
{
  id: "embolia-plodovou-vodou",
  title: "Embólia plodovou vodou",
  match: ["embóli\\w*\\s+plodovou\\s+vodou"],
  short: "Vniknutie plodovej vody do obehu matky pri pôrode — prudké zlyhanie dýchania a obehu s DIC.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zriedkavá (2–8 na 100 000 pôrodov), ale jedna z hlavných príčin úmrtia matiek. V pľúcnych cievach sú dlaždicové bunky kože plodu.</p>',
  img: {
    src: "assets/images/amniotic-fluid-embolism.jpg",
    alt: "Pľúcna arteriola vyplnená dlaždicovými šupinami.",
    caption: "Šupiny z kože plodu v pľúcnej arteriole matky (H&E).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Amniotic_fluid_embolism_(7471758766).jpg"
  }
},
{
  id: "ateroembolia", et: "gr. <i>athere</i> „kaša“ + <i>embolos</i> „zátka“",
  title: "Cholesterolová embólia (ateroembólia)",
  match: ["ateroembóli\\w*", "cholesterolov\\w*\\s+embol\\w*", "cholesterolov\\w*\\s+kryštál\\w*"],
  short: "Kryštály cholesterolu z prasknutého aterómu aorty upchajú arterioly obličiek, kože nôh a čreva — často po katetrizácii.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> V reze ostanú po kryštáloch len ihlicovité <b>štrbiny</b>, lebo cholesterol sa pri spracovaní rozpustí.</p>',
  img: {
    src: "assets/images/cholesterol-embolus.jpg",
    alt: "Tepna obličky s ihlicovitými štrbinami po kryštáloch cholesterolu.",
    caption: "Cholesterolový embolus v tepne obličky (H&E).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Cholesterol_embolus_-_intermed_mag.jpg"
  }
},
{
  id: "metastaza", et: "gr. <i>meta</i> „preč, zmena“ + <i>stasis</i> „postavenie“ (presun na iné miesto)",
  img: {
    src: "assets/images/tumor-embolus.jpg",
    alt: "Nádorový embolus – metastatický adenokarcinóm prostaty v pľúcnej arterioli (H&E).",
    caption: "Nádorový embolus – metastatický adenokarcinóm prostaty v pľúcnej arterioli (H&E).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Tumor_embolus.jpg"
  },
  title: "Metastáza",
  match: ["metastáz\\w*", "metastatick\\w*", "metastázov\\w*"],
  short: "Zavlečenie chorobného deja (nádoru, infekcie) na vzdialené miesto, kde pokračuje ďalej.",
  body: "<ul><li>Cesty: hematogénna, lymfogénna, pozdĺž telesných dutín.</li><li>Kroky: invázia, vstup do cievy, prežitie v obehu, zastavenie, rast v novom orgáne.</li></ul><ul><li><b>Hematogénna</b> — krvou, podľa pravidiel embólie.</li><li><b>Lymfogénna</b> — lymfou do spádových uzlín.</li><li><b>Porogénna</b> — po povrchu a priesvitom dutín a dutých orgánov.</li></ul>"
},

/* ── prekážky, ischémia, venostáza ───────────────────────────────────── */
{
  id: "kolateraly", et: "lat. <i>con-</i> „spolu“ + <i>latus, lateris</i> „bok“ (postranná cesta)",
  title: "Kolaterály",
  match: ["kolaterál\\w*"],
  short: "Spojky medzi cievami, ktorými krv obíde uzáver. Pri pomalom zužovaní tepny sa stihnú rozšíriť a tkanivo zachránia.",
  body: "<ul><li>Spojky sa vyvíjajú pri pomalom zužovaní tepny.</li><li>Pri náhlom uzávere ich nestihne dôjsť — vznikne infarkt.</li><li>Koncové tepny (mozog, oblička) majú málo kolaterál.</li></ul>"
},
{
  id: "steal", et: "angl. <i>steal</i> „kradnúť“ (krv sa „ukradne“ susednej oblasti)",
  title: "Steal syndróm",
  match: ["steal\\s+syndróm\\w*", "steal\\w*"],
  short: "„Kradnutie“ krvi: krv odtečie riečiskom s nižším odporom a susedné povodie ostane ischemické.",
  body:
    '<p class="why"><b>Príklad.</b> Zúženie podkľúčnej tepny pred odstupom stavcovej tepny: krv tečie stavcovou tepnou spätne do ruky a chýba mozgu.</p>'
},
{
  id: "raynaud",
  img: {
    src: "assets/images/raynaud-nhlbi.jpg",
    alt: "Raynaudov fenomén: stiahnuté prstové tepny, bledé končeky prstov.",
    caption: "Raynaudov fenomén: stiahnuté prstové tepny, bledé končeky prstov.",
    credit: "National Heart, Lung and Blood Institute · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Raynaud's_Disease.jpg"
  },
  title: "Raynaudov fenomén",
  match: ["Raynaudov\\w*\\s+fenomén\\w*", "Raynaud\\w*"],
  short: "Záchvatový spazmus tepničiek prstov po chlade alebo strese: prsty zblednú alebo zmodrejú a po uvoľnení sčervenejú.",
  body: "<ul><li>Typické poradie farieb: biela → modrá → červená.</li><li>Primárny (benígny) a sekundárny (napr. pri sklerodermii, SLE).</li></ul>"
},
{
  id: "hyperviskozita", et: "gr. <i>hyper</i> „nad, nadmerne“ + lat. <i>viscosus</i> „lepkavý“ (<i>viscum</i> „imelo, lepkavá hmota“)",
  title: "Hyperviskozita",
  match: ["hyperviskozit\\w*", "hyperviskózn\\w*"],
  short: "Príliš hustá krv — nadbytok bielkovín (makroglobulinémia, myelóm) alebo krviniek (polycytémia, leukémia) — tečie ťažko kapilárami.",
  body: "<ul><li>Príznaky: bolesť hlavy, poruchy zraku, krvácanie zo sliznice.</li><li>Pri polycytémii je príčinou vysoký hematokrit.</li></ul>"
},
{
  id: "rozvodia",
  title: "Rozvodia (watershed)",
  match: ["rozvodi\\w*", "watershed"],
  short: "Hraničné pásma medzi povodiami dvoch tepien — pri poklese tlaku dostanú krv ako posledné, preto v nich vznikajú infarkty pri šoku.",
  body: "<ul><li>Napr. medzi povodím prednej a strednej mozgovej tepny; v hrubom čreve slezinový ohyb (flexura coli sinistra) medzi povodiami a. mesenterica superior a inferior.</li><li>Infarkty tam vznikajú pri hypotenzii a šoku.</li></ul>"
},
{
  id: "venostaza", et: "lat. <i>vena</i> „žila“ + gr. <i>stasis</i> „zastavenie“; kongescia: lat. <i>congerere</i> „nahromadiť“",
  img: {
    src: "assets/images/nutmeg-liver-gross.jpg",
    alt: "Muškátová pečeň: tmavé stredy lalôčikov pri venóznom prekrvení.",
    caption: "Muškátová pečeň: tmavé stredy lalôčikov pri venóznom prekrvení.",
    credit: "Narraburra · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Liver._chronic_passive_congestion.jpg"
  },
  title: "Venostáza (kongescia, pasívna hyperémia)",
  match: ["venostáz\\w*", "kongesci\\w*", "pasívn\\w*\\s+hyperémi\\w*", "venózn\\w*\\s+hyperémi\\w*"],
  short: "Nahromadenie odkysličenej krvi v tkanive, z ktorého zle odteká — modročervené, opuchnuté, chladnejšie.",
  body:
    '<p class="chain">viazne odtok → ↑ hydrostatický tlak v kapilárach → <b>transsudát (opuch)</b> → hypoxia → pri dlhom trvaní atrofia, siderofágy, fibróza</p>'
},
{
  id: "hemoragicka-infarzacia", et: "gr. <i>haima</i> „krv“ + <i>rhegnynai</i> „pretrhnúť“; infarzácia: lat. <i>infarcire</i> „napchať“",
  title: "Hemoragická infarzácia",
  match: ["hemoragick\\w*\\s+infarzáci\\w*", "infarzáci\\w*"],
  short: "Nekróza tkaniva presiaknutého krvou pri náhlom úplnom uzávere žíl — tepna krv privádza, ale nemá kam odtiecť.",
  body:
    '<p class="chain">zaškrtenie alebo pretočenie stlačí tepnu aj žilu rovnakým tlakom → žila má tenkú, poddajnú stenu a nízky tlak krvi, preto sa uzavrie prvá, kým hrubostenná tepna s vysokým tlakom krv ešte privádza → krv sa hromadí, opuch a krvácanie do tkaniva → ↑ tlak v interstíciu stlačí aj arterioly ⟳ → ischémia → nekróza</p>' +
    '<p class="why"><b>Kde.</b> Črevo zaškrtené v prietrži alebo pretočené, semenník, vaječník.</p>',
  img: {
    src: "assets/images/bowel-hemorrhagic-infarct.jpg",
    alt: "Tmavočervená až čierna kľučka tenkého čreva.",
    caption: "Kľučka tenkého čreva zaškrtená v slabinovej prietrži.",
    credit: "Narraburra · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Haem_infarction,_small_bowel.jpg"
  }
},

/* ── krvácanie ───────────────────────────────────────────────────────── */
{
  id: "petechie", et: "tal. <i>petecchia</i> „drobná škvrna na koži“",
  title: "Petechie",
  match: ["petechi\\w*", "petechiáln\\w*"],
  img: {
    "src": "assets/images/petechiae-leg.jpg",
    "alt": "Predkolenie posiate drobnými červenými bodkami.",
    "caption": "Petechie pri imunitnej trombocytopénii.",
    "credit": "James Heilman, MD · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Petechia_lower_leg.jpg"
  },
  short: "Bodkovité výrony z kapilár menšie než 2 mm, ktoré po zatlačení neblednú.",
  body: "<ul><li>Vznikajú pri nedostatku alebo nefunkčnosti doštičiek a pri poškodení steny kapilár (vaskulitída, skorbut, infekcie).</li><li>Po zatlačení neblednú — odlišujú sa od zápalového erytému.</li></ul><p class=\"chain\">drobné trhlinky v kapilárach vznikajú stále → normálne ich hneď uzavrie <b>doštičková zátka</b> (primárna hemostáza) → keď doštičky chýbajú, krv z každej trhlinky unikne do kože → petechie</p><p class=\"why\"><b>Prečo to je dôležité.</b> Typický obraz poruchy doštičiek alebo steny drobných ciev. Pri samotnej poruche koagulačných faktorov (hemofília) sa takmer nevyskytujú: na takú malú trhlinku stačí doštičková zátka aj bez fibrínu – hemofilik preto krváca hlboko do kĺbov a svalov, nie bodkovito do kože.</p>"
},
{
  id: "purpura", et: "lat. <i>purpura</i> „purpur, tmavočervená farba“ (z gr. <i>porphyra</i> „purpur“, morský mäkkýš, z ktorého sa farbivo získavalo)",
  title: "Purpura",
  match: ["purpura", "purpury", "purpuru", "purpure", "purpurou", "purpúr"],
  img: {
    "src": "assets/images/iga-vasculitis-purpura.jpg",
    "alt": "Hmatná purpura na dolných končatinách pri IgA vaskulitíde.",
    "caption": "Hmatná purpura na dolných končatinách pri IgA vaskulitíde.",
    "credit": "Profrofrof · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:HSP_Vasculitis.jpg"
  },
  short: "Početné petechie alebo výrony väčšie než 2 mm v koži a slizniciach; aj súčasť názvov chorôb, ktoré sa nimi prejavujú.",
  body: "<ul><li>Hmatná (vyvýšená) purpura ukazuje na vaskulitídu.</li><li>Nehmatná (plochá) ukazuje na poruchu doštičiek alebo zrážania.</li></ul>"
},
{
  id: "ekchymoza", et: "gr. <i>ek</i> „von“ + <i>chymos</i> „šťava“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/ankle-ecchymosis.jpg",
    alt: "Ekchymóza (sugilácia) členka po vyvrtnutí.",
    caption: "Ekchymóza (sugilácia) členka po vyvrtnutí.",
    credit: "Bobjgalindo · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Ankle_bruising_from_runner_sprain.jpg"
  },
  title: "Ekchymóza",
  match: ["ekchymóz\\w*"],
  short: "Väčší plošný výron krvi v koži alebo sliznici („modrina“).",
  body: "<ul><li><b>Príčiny:</b> najčastejšie úder alebo vyvrtnutie; bez primeraného úrazu pri liečbe antikoagulanciami, pri poruchách koagulácie (hemofília, choroba pečene), pri krehkých cievach a väzive (starecká purpura, glukokortikoidy, skorbut).</li><li>Farba sa mení, ako sa hem rozkladá: hem → biliverdín (zelená) → bilirubín (žltá), železo → hemosiderín (hnedá).</li></ul>"
},
{
  id: "sufuzia", et: "lat. <i>suffusio</i> „podliatie“",
  title: "Sufúzia",
  match: ["sufúzi\\w*"],
  short: "Rozsiahly splývajúci výron krvi v koži alebo sliznici.",
  body: "<ul><li>Vzniká pri väčšom úraze alebo poruche zrážania.</li><li>Farba sa mení zo sivomodrej cez zelenú po žltú, ako sa rozkladá hem.</li></ul>"
},
{
  id: "hematom", et: "gr. <i>haima</i> „krv“ + <i>-oma</i> „opuch, hmota“",
  img: {
    src: "assets/images/cerebral-hemorrhage.jpg",
    alt: "Masívne vnútrolebkové krvácanie.",
    caption: "Masívne vnútrolebkové krvácanie.",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Hemorr%C3%A0gia_cerebral.1444.jpg"
  },
  title: "Hematóm",
  match: ["hematóm\\w*"],
  short: "Ohraničené nahromadenie vyliatej krvi v tkanive, ktoré tlačí na okolie.",
  body:
    '<p class="chain">hemoglobín → makrofágy → <b>biliverdín</b> (zelená) → <b>bilirubín</b> (žltá) + železo ako <b>hemosiderín</b> (hrdzavá)</p>'
},
{
  id: "hemosiderin", et: "gr. <i>haima</i> „krv“ + <i>sideros</i> „železo“",
  title: "Hemosiderín",
  match: ["hemosiderín\\w*"],
  short: "Hrdzavohnedý pigment so železom z rozpadnutých erytrocytov.",
  body: "<ul><li>Perlsova reakcia ho farbí namodro.</li><li>Dôkaz staršieho krvácania alebo dlhej venostázy.</li></ul>"
},
{
  id: "siderofag", et: "gr. <i>sideros</i> „železo“ + <i>phagein</i> „jesť“",
  title: "Siderofág",
  match: ["siderofág\\w*"],
  img: {
    "src": "assets/images/lung-congestion-siderophages.jpg",
    "alt": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "caption": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_pulmonary_congestion_and_siderophages.jpg"
  },
  short: "Makrofág naplnený hemosiderínom.",
  body: "<ul><li>V pľúcach pri dlhej venostáze: „bunky srdcovej chyby“.</li></ul>"
},
{
  id: "hemartros", et: "gr. <i>haima</i> „krv“ + <i>arthron</i> „kĺb“",
  title: "Hemartros",
  match: ["hemartros\\w*"],
  short: "Krv v kĺbovej dutine — pri úraze alebo samovoľne pri hemofílii.",
  body:
    '<p class="chain">krv v kĺbe → hemosiderín v synovii → synovia zhrubne a prekrví sa → ďalšie krvácanie ⟳ → zničená chrupka</p>'
},
{
  id: "tamponada", et: "franc. <i>tamponner</i> „zapchať zátkou“ (<i>tampon</i> „zátka, vatový čap“)",
  title: "Tamponáda srdca",
  match: ["tamponád\\w*\\s+srdc\\w*", "tamponád\\w*"],
  img: {
    "src": "assets/images/hemopericardium-gross.jpg",
    "alt": "Hemoperikard: krv v osrdcovníkovom vaku.",
    "caption": "Hemoperikard: krv v osrdcovníkovom vaku.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_hemopericardium.jpg"
  },
  short: "Stlačenie srdca tekutinou alebo krvou v osrdcovníku — srdce sa nemôže plniť.",
  body: "<ul><li>Rozhoduje rýchlosť: pri náhlom hromadení stačí aj malé množstvo tekutiny.</li><li>Beckova trias: hypotenzia, zväčšené krčné žily, tlmené ozvy srdca.</li></ul>"
},
{
  id: "melena", et: "gr. <i>melas</i> „čierny“",
  title: "Meléna",
  match: ["melén\\w*"],
  short: "Čierna dechtovitá stolica z natrávenej krvi — zdroj je v hornej časti tráviacej rúry.",
  body: "<ul><li>Čierna farba vzniká pôsobením tráviacich enzýmov a kyseliny na hemoglobín.</li></ul>"
},
{
  id: "hematemeza", et: "gr. <i>haima</i> „krv“ + <i>emesis</i> „zvracanie“",
  title: "Hemateméza",
  match: ["hemateméz\\w*"],
  short: "Vracanie krvi — zdroj je v hornej časti tráviacej rúry (pažerák, žalúdok, dvanástnik).",
  body: "<ul><li>Rozlišuje sa „kávová usadenina“ (natrávená krv) od čerstvej krvi.</li><li>Príčiny: vred, varixy pažeráka, erózie.</li></ul>"
},
{
  id: "hemoptyza", et: "gr. <i>haima</i> „krv“ + <i>ptysis</i> „pľutie“",
  title: "Hemoptýza",
  match: ["hemoptýz\\w*"],
  short: "Spútum s prímesou krvi — zdroj je v dýchacích cestách.",
  body: "<ul><li>Príčiny: bronchitída, bronchiektázie, tuberkulóza, nádor, pľúcna embólia.</li><li>Od hematemézy sa odlíši jasnočervenou penivou krvou.</li></ul>"
},
{
  id: "hemoptoe",
  title: "Hemoptoe",
  match: ["hemoptoe"],
  short: "Vykašľanie väčšieho množstva čistej krvi.",
  body: "<ul><li>Zdroje: kaverna s arozívnym krvácaním pri tuberkulóze, nádor, bronchiektázie.</li><li>Môže pacienta zadusiť a vyžaduje urgentné riešenie.</li></ul>"
},
{
  id: "epistaxa", et: "gr. <i>epistazein</i> „kvapkať“ (<i>epi</i> „na“ + <i>stazein</i> „kvapkať“)",
  title: "Epistaxa",
  match: ["epistax\\w*"],
  short: "Krvácanie z nosa.",
  body: "<ul><li>Najčastejšie z Kiesselbachovho plexu v prednej časti nosovej priehradky.</li><li>Rizikové: hypertenzia, poruchy zrážania, hereditárna hemoragická teleangiektázia.</li></ul>"
},
{
  id: "hematuria", et: "gr. <i>haima</i> „krv“ + <i>ouron</i> „moč“",
  title: "Hematúria",
  match: ["hematúri\\w*"],
  short: "Krv v moči — viditeľná okom alebo len v mikroskope.",
  body: "<ul><li>Príčiny: kamene, zápal, nádor, glomerulonefritída.</li><li>Glomerulárna hematúria má deformované erytrocyty a valce.</li></ul>"
},

/* ── krvácavé stavy ──────────────────────────────────────────────────── */
{
  id: "trombocytopenia", et: "gr. <i>thrombos</i> „zrazenina“ + <i>kytos</i> „bunka“ + <i>penia</i> „nedostatok“",
  img: {
    src: "assets/images/petechiae-leg.jpg",
    alt: "Petechie na predkolení pri nedostatku doštičiek.",
    caption: "Petechie na predkolení pri nedostatku doštičiek.",
    credit: "James Heilman, MD · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Petechia_lower_leg.jpg"
  },
  title: "Trombocytopénia",
  match: ["trombocytopéni\\w*", "trombocytopenick\\w*"],
  short: "Počet doštičiek pod 150 × 10⁹/l (norma 150–400); samovoľné krvácanie hrozí pod 30 × 10⁹/l.",
  body:
    "<ul>" +
      "<li><b>Tvorba</b> — choroba kostnej drene, chemoterapia.</li>" +
      "<li><b>Zadržanie</b> — zväčšená slezina.</li>" +
      "<li><b>Rozpad</b> — protilátky (imunitná trombocytopénia, lieky).</li>" +
      "<li><b>Spotreba</b> — DIC, trombotické mikroangiopatie.</li>" +
    "</ul>"
},
{
  id: "itp",
  title: "ITP — imunitná trombocytopénia (angl. immune thrombocytopenia)",
  match: ["ITP", "imunitn\\w*\\s+trombocytopéni\\w*"],
  img: {
    "src": "assets/images/petechiae-leg.jpg",
    "alt": "Petechie na predkolení pri nedostatku doštičiek.",
    "caption": "Petechie na predkolení pri nedostatku doštičiek.",
    "credit": "James Heilman, MD · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Petechia_lower_leg.jpg"
  },
  short: "Autoprotilátky označia doštičky a makrofágy sleziny ich zničia. Starší názov: idiopatická trombocytopenická purpura.",
  body: "<ul><li><b>Je to samostatná autoimunitná choroba?</b> Áno – <b>primárna ITP</b> nemá inú príčinu. U detí prichádza náhle, často týždne po vírusovej infekcii, a do niekoľkých mesiacov sama odznie; u dospelých býva chronická.</li><li><b>Sekundárna ITP</b> sprevádza inú chorobu: systémový lupus, chronickú lymfocytovú leukémiu, HIV, hepatitídu C, infekciu Helicobacter pylori; podobne pôsobia niektoré lieky.</li><li>Doštičky klesnú pod 100 × 10⁹/l, ostatné krvinky sú normálne; prejaví sa petechiami a slizničným krvácaním. Slezina je normálna – zväčšená by svedčila skôr pre inú príčinu.</li></ul>"
},
{
  id: "ttp",
  title: "TTP — trombotická trombocytopenická purpura (angl. thrombotic thrombocytopenic purpura)",
  match: ["TTP", "trombotick\\w*\\s+trombocytopenick\\w*\\s+purpur\\w*", "ADAMTS13"],
  img: {
    "src": "assets/images/dic-schistocytes.jpg",
    "alt": "Schistocyty (fragmentované erytrocyty) v nátere krvi.",
    "caption": "Schistocyty (fragmentované erytrocyty) v nátere krvi.",
    "credit": "Ed Uthman · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:DIC_With_Microangiopathic_Hemolytic_Anemia.jpg"
  },
  short: "Trombotická mikroangiopatia z nedostatku enzýmu ADAMTS13 (aktivita pod 10 %): neprestrihnuté veľké multiméry vWF lepia doštičky v drobných cievach.",
  body: "<p class=\"chain\">endotel uvoľňuje veľmi veľké multiméry vWF → ADAMTS13 ich normálne hneď nastrihá → keď chýba (autoprotilátky alebo vrodená mutácia), ostanú „lepkavé“ a v rýchlom prúde mikrociev na ne sadajú doštičky → mikrotromby → ischémia mozgu a obličiek, trieštenie erytrocytov</p><ul><li>Pentáda: trombocytopénia, hemolytická anémia, neurologické príznaky, horúčka, postihnutie obličiek.</li><li>Liečba: výmena plazmy – odstráni protilátky aj veľké multiméry a dodá ADAMTS13.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Málo doštičiek + hemolytická anémia so schistocytmi + neurologické príznaky; na rozdiel od DIC sú PT a aPTT v norme.</p>"
},
{
  id: "schistocyty", et: "gr. <i>schistos</i> „rozštiepený“ + <i>kytos</i> „bunka“",
  title: "Schistocyty",
  match: ["schistocyt\\w*"],
  img: {
    "src": "assets/images/dic-schistocytes.jpg",
    "alt": "Krvný náter s úlomkami erytrocytov.",
    "caption": "Schistocyty v krvnom nátere pri DIC.",
    "credit": "Ed Uthman · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:DIC_With_Microangiopathic_Hemolytic_Anemia.jpg"
  },
  short: "Úlomky erytrocytov v krvnom nátere — vznikajú, keď sa krvinky trieštia o fibrínové vlákna a mikrotromby v drobných cievach.",
  body: "<ul><li>Typické tvary: trojuholník, prilba, fragment.</li><li>Dôkaz mikroangiopatickej hemolytickej anémie (DIC, TTP, HUS).</li></ul>"
},
{
  id: "trombocytopatia", et: "trombocyt + gr. <i>pathos</i> „utrpenie, choroba“",
  title: "Trombocytopatia",
  match: ["trombocytopati\\w*"],
  short: "Porucha funkcie doštičiek pri ich normálnom počte — najčastejšie po kyseline acetylsalicylovej alebo pri urémii.",
  body: "<ul><li>Kyselina acetylsalicylová nevratne blokuje COX-1 v doštičkách.</li><li>Urémia narúša adhéziu doštičiek.</li></ul>"
},
{
  id: "koagulopatia", et: "lat. <i>coagulare</i> „zrážať“ + gr. <i>pathos</i> „choroba“",
  title: "Koagulopatia",
  match: ["koagulopati\\w*"],
  short: "Krvácavý stav z nedostatku alebo nefunkčnosti koagulačných faktorov — krváca sa hlboko (kĺby, svaly), bez petechií.",
  body: "<ul><li>Hemofília A (faktor VIII) a B (faktor IX).</li><li>Získaná: nedostatok vitamínu K, choroba pečene, DIC.</li><li>Krváca sa do kĺbov a svalov.</li></ul>"
},
{
  id: "hemofilia", et: "gr. <i>haima</i> „krv“ + <i>philia</i> „záľuba, sklon“",
  title: "Hemofília",
  match: ["hemofíli\\w*", "hemofilick\\w*"],
  short: "Vrodený nedostatok faktora VIII (hemofília A) alebo IX (hemofília B), viazaný na chromozóm X — chorí sú muži.",
  body:
    '<p class="chain">chýba VIII alebo IX → na doštičke vznikne málo trombínu → zátka bez fibrínu sa rozpadne → krvácanie do kĺbov a svalov s odstupom</p>' +
    '<p class="why"><b>Testy.</b> Predĺžený aPTT; PT a počet doštičiek v norme.</p>'
},
{
  id: "von-willebrandova-choroba",
  title: "Von Willebrandova choroba",
  match: ["von\\s+Willebrandov\\w*\\s+chorob\\w*"],
  short: "Najčastejšia vrodená krvácavá choroba: chýba alebo nefunguje von Willebrandov faktor — viazne adhézia doštičiek a klesá faktor VIII.",
  body: "<ul><li>Typ 1 je častý a mierny (málo vWF).</li><li>vWF viaže doštičky na kolagén a nesie faktor VIII.</li></ul>"
},
{
  id: "vitamin-k", et: "vitamín: lat. <i>vita</i> „život“ + amín; K z nem. <i>Koagulation</i> „zrážanie“ (vitamín potrebný na zrážanie krvi)",
  title: "Vitamín K",
  match: ["vitamín\\w*\\s+K\\b"],
  short: "Potrebný na tvorbu funkčných faktorov II, VII, IX a X (a proteínov C a S) v pečeni.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Chýba pri poruche vstrebávania tukov a po dlhej liečbe antibiotikami; warfarín jeho účinok blokuje zámerne. Predĺži sa najprv PT.</p>'
},
{
  id: "skorbut",
  img: {
    src: "assets/images/scorbutic-gums.jpg",
    alt: "Skorbutické ďasná pri nedostatku vitamínu C.",
    caption: "Skorbutické ďasná pri nedostatku vitamínu C.",
    credit: "CDC · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Scorbutic_gums.jpg"
  },
  title: "Skorbut",
  match: ["skorbut\\w*"],
  short: "Nedostatok vitamínu C: kolagén je nepevný, drobné cievy praskajú — krvácanie z ďasien, okolo vlasových folikulov a pod okosticu, zlé hojenie.",
  body: "<ul><li>Perifolikulárne krvácanie s krútenými vlasmi.</li><li>Podkladom je porucha hydroxylácie kolagénu.</li><li>Detská forma je Möllerova–Barlowova choroba.</li></ul>"
},
{
  id: "iga-vaskulitida",
  title: "IgA vaskulitída (Henochova-Schönleinova purpura)",
  match: ["IgA\\s+vaskulitíd\\w*", "Henochov\\w*[-\\s]Schönleinov\\w*\\s+purpur\\w*"],
  img: {
    "src": "assets/images/iga-vasculitis-purpura.jpg",
    "alt": "Nohy s početnými tmavočervenými škvrnami.",
    "caption": "Purpura na nohách pri IgA vaskulitíde.",
    "credit": "Profrofrof · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:HSP_Vasculitis.jpg"
  },
  short: "Vaskulitída malých ciev s depozitmi IgA: hmatná purpura na nohách a zadku, bolesti brucha a kĺbov, zápal obličiek — najmä u detí.",
  body: "<p class=\"chain\">infekcia (často horných dýchacích ciest) alebo liek → tvorí sa IgA1 s nedostatkom galaktózy → proti nemu protilátky → <b>imunokomplexy s IgA</b> → ukladajú sa v stene drobných ciev kože, čreva a v obličkových klbkách → komplement priláka neutrofily → tie rozrušia stenu (leukocytoklastická vaskulitída) → erytrocyty unikajú → <b>hmatná purpura</b></p><ul><li>Hmatná je preto, že v koži nie je len krv, ale aj zápalový infiltrát steny.</li><li>Bolesť brucha (krvácanie do steny čreva), kĺbov a hematúria (zápal klbiek).</li><li>Najmä deti; o prognóze rozhodujú obličky.</li></ul>"
},
{
  id: "hht", et: "hereditárna: lat. <i>hereditas</i> „dedičstvo“; teleangiektázia: gr. <i>telos</i> „koniec, ďaleko“ + <i>angeion</i> „cieva“ + <i>ektasis</i> „roztiahnutie“",
  title: "Hereditárna hemoragická teleangiektázia",
  match: ["hereditárn\\w*\\s+hemoragick\\w*\\s+teleangiektázi\\w*", "Renduov\\w*[-\\s]Oslerov\\w*[-\\s]Weberov\\w*\\s+chorob\\w*"],
  img: {
    "src": "assets/images/hht-lips.jpg",
    "alt": "Pery s drobnými červenými škvrnkami.",
    "caption": "Teleangiektázie na perách.",
    "credit": "Narraburra · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Hereditary_hemorrhagic_telangiectasia.jpg"
  },
  short: "Autozómovo dominantná chyba stavby drobných ciev: rozšírené tenkostenné cievky na perách, jazyku a v nose a artériovenózne spojky v orgánoch.",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Opakované krvácanie z nosa a tráviacej rúry vedie k anémii z nedostatku železa.</p>"
},
{
  id: "dic", et: "diseminovaná: lat. <i>disseminare</i> „rozsievať“ (<i>semen</i> „semeno“); intravaskulárna: <i>intra</i> „vnútri“ + <i>vasculum</i> „cievka“",
  img: {
    src: "assets/images/fibrin-thrombi-glomerulus.jpg",
    alt: "Fibrínové mikrotromby v glomerule pri DIC.",
    caption: "Fibrínové mikrotromby v glomerule pri DIC.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Acute_thrombotic_microangiopathy_-_high_mag.jpg"
  },
  title: "DIC — diseminovaná intravaskulárna koagulácia (angl. disseminated intravascular coagulation)",
  match: ["DIC", "diseminovan\\w*\\s+intravaskulárn\\w*\\s+koagul\\w*", "konzumpčn\\w*\\s+koagulopati\\w*"],
  short: "Zrážanie krvi v celom obehu naraz: mikrotromby upchávajú kapiláry a spotrebujú doštičky aj faktory, takže pacient zároveň krváca.",
  body:
    '<p class="chain">sepsa, pôrodnícke komplikácie, úraz, nádor → tkanivový faktor v krvi → <b>mikrotromby</b> → ischémia orgánov ⟳ + <b>spotreba</b> doštičiek a faktorov → krvácanie</p>' +
    '<p class="why"><b>Laboratórium.</b> ↓ doštičky, predĺžený PT, ↓ fibrinogén, ↑↑ D-diméry, schistocyty. Vždy druhotná — lieči sa príčina.</p>'
},
{
  id: "mikrotromby", et: "gr. <i>mikros</i> „malý“ + <i>thrombos</i> „zrazenina“",
  title: "Hyalínne (fibrínové) mikrotromby",
  match: ["mikrotromb\\w*", "hyalínn\\w*\\s+(?:\\(fibrínov\\w*\\)\\s+)?mikrotromb\\w*", "hyalínn\\w*\\s+tromb\\w*"],
  img: {
    "src": "assets/images/fibrin-thrombi-glomerulus.jpg",
    "alt": "Klbko obličky s homogénnymi ružovými zátkami v kapilárach.",
    "caption": "Fibrínové mikrotromby v klbku obličky (H&E).",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Acute_thrombotic_microangiopathy_-_high_mag.jpg"
  },
  short: "Zátky z fibrínu a doštičiek v kapilárach a arteriolách, viditeľné len v mikroskope — znak DIC a trombotických mikroangiopatií.",
  body: "<ul><li>V ich blízkosti sa erytrocyty trieštia (schistocyty).</li><li>Dôsledok: ischémia a mikroinfarkty orgánov.</li></ul>"
}
);

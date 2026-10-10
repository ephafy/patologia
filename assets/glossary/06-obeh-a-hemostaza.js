/* Glosár PATOLY — poruchy obehu a hemostáza (kap. 8): hemostáza a jej testy, trombóza, embólie,
   infarkt, venostáza, názvy krvácaní, krvácavé stavy a DIC. Texty sú vlastné (CLAUDE.md §4.1).
   Skratky, ktoré sú aj bežným slovom (HIT, PT), sa zámerne nechytajú. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── hemostáza ───────────────────────────────────────────────────────── */
{
  id: "hemostaza",
  title: "Hemostáza",
  match: ["hemostáz\\w*"],
  short: "Súbor dejov, ktoré držia krv v neporušenej cieve tekutú a v poranenej ju na mieste zrazia.",
  body:
    '<p class="chain">poranenie → cieva sa stiahne → doštičky prilepia na kolagén a zhluknú sa (<b>primárna hemostáza</b>) → trombín vytvorí fibrín (<b>sekundárna hemostáza</b>) → brzdy a fibrinolýza zátku ohraničia</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vychýlenie jedným smerom je <b>trombóza</b>, druhým <b>krvácavý stav</b>; pri DIC oboje naraz.</p>'
},
{
  id: "vwf",
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
  id: "trombin",
  title: "Trombín",
  match: ["trombín\\w*"],
  short: "Kľúčový enzým koagulácie: mení fibrinogén na fibrín a zároveň aktivuje doštičky a faktory V a VIII.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zosilňuje sám seba — preto koagulácia potrebuje brzdy (antitrombín, proteín C). Na zdravom endoteli sa trombín naopak mení na aktivátor proteínu C.</p>'
},
{
  id: "antitrombin",
  title: "Antitrombín",
  match: ["antitrombín\\w*"],
  short: "Brzda koagulácie: viaže a vypína trombín a faktor Xa. Heparín jeho účinok mnohonásobne zrýchľuje.",
  body: ""
},
{
  id: "protein-c",
  title: "Proteín C a proteín S",
  match: ["proteín\\w*\\s+C\\b", "proteín\\w*\\s+S\\b", "aktivovan\\w*\\s+proteín\\w*\\s+C"],
  short: "Brzda koagulácie: aktivovaný proteín C s proteínom S rozkladá faktory Va a VIIIa.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri Leidenskej mutácii je faktor V voči proteínu C odolný — najčastejšia vrodená trombofília.</p>'
},
{
  id: "fibrinolyza",
  title: "Fibrinolýza a plazmín",
  match: ["fibrinolýz\\w*", "fibrinolytick\\w*", "plazmín\\w*", "trombolýz\\w*"],
  short: "Rozpúšťanie zrazeniny: plazmín štiepi fibrín na rozpustné úlomky.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Rozpustí sa len čerstvý trombus z fibrínu; keď doň vrastie granulačné tkanivo, už nie.</p>'
},
{
  id: "d-dimery",
  title: "D-diméry",
  match: ["D-dimér\\w*"],
  short: "Úlomky fibrínu, ktorý bol spevnený sieťovaním a potom rozštiepený plazmínom — znak, že niekde vznikla a rozpúšťa sa zrazenina.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Veľmi citlivé, málo špecifické: normálna hodnota hovorí proti trombóze, zvýšená ju nedokazuje (stúpajú aj po operácii, pri zápale, nádore, v tehotenstve). Pri DIC sú výrazne zvýšené.</p>'
},
{
  id: "protrombinovy-cas",
  title: "Protrombínový čas (PT, INR)",
  match: ["protrombínov\\w*\\s+čas\\w*", "INR"],
  short: "Test cesty tkanivového faktora: faktor VII a spoločná časť (X, V, protrombín, fibrinogén). INR je jeho štandardizovaný pomer.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Predlžuje ho nedostatok vitamínu K, warfarín a choroba pečene; pri hemofílii je normálny.</p>'
},
{
  id: "aptt",
  title: "aPTT — aktivovaný parciálny tromboplastínový čas",
  match: ["aPTT", "parciáln\\w*\\s+tromboplastínov\\w*\\s+čas\\w*"],
  short: "Test „vnútornej“ cesty koagulácie: faktory VIII, IX, XI, XII a spoločná časť.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Predĺžený pri hemofílii A a B a pri liečbe heparínom; počet doštičiek a PT sú pri hemofílii v norme.</p>'
},

/* ── trombóza ────────────────────────────────────────────────────────── */
{
  id: "virchowova-trias",
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
  id: "trombofilia",
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
  short: "Striedanie bledých vrstiev (doštičky a fibrín) a červených vrstiev (erytrocyty) v trombe, ktorý rástol v prúdiacej krvi.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Dokazujú, že zrazenina vznikla <b>za života</b> — posmrtná zrazenina vrstvy nemá.</p>',
  img: {
    src: "assets/images/thrombus-lines-of-zahn.jpg",
    alt: "Trombus s vrstvami: bledé pruhy doštičiek a fibrínu sa striedajú s červenými pruhmi erytrocytov.",
    caption: "Vrstvenie trombu (H&E).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Pulmonary_thromboembolus,_recent_(3626658803).jpg"
  }
},
{
  id: "rekanalizacia",
  title: "Rekanalizácia trombu",
  match: ["rekanalizáci\\w*", "rekanalizov\\w*"],
  short: "Čiastočné obnovenie prietoku cez organizovaný trombus: nové kapiláry v ňom sa spoja a rozšíria na kanály.",
  body: ""
},

/* ── embólia ─────────────────────────────────────────────────────────── */
{
  id: "embolia",
  title: "Embólia a embolus",
  match: ["embóli\\w*", "embolus\\w*", "embolu", "emboly", "embolov", "embolom", "emboliz\\w*"],
  short: "Zavlečenie materiálu nerozpustného v krvi (embolu) prúdom do miesta, kde je cieva užšia ako on.",
  body:
    '<p class="chain">zo žíl veľkého obehu → pravé srdce → <b>pľúcnica</b><br>z ľavého srdca a aorty → <b>tepny orgánov</b> (mozog, črevo, oblička, slezina, končatiny)</p>' +
    "<ul>" +
      "<li><b>Najčastejšie</b> odtrhnutý trombus (trombembólia).</li>" +
      "<li><b>Inak</b> tuk, vzduch, dusík, plodová voda, cholesterolové kryštály, nádor, infikovaný trombus.</li>" +
    "</ul>"
},
{
  id: "plucna-embolia",
  title: "Pľúcna embólia",
  match: ["pľúcn\\w*\\s+(?:tromb)?embóli\\w*"],
  short: "Uzáver pľúcnice alebo jej vetiev embolom — takmer vždy trombom z hlbokých žíl dolných končatín.",
  body:
    '<p class="chain">veľký embolus → náhly odpor → <b>zlyhanie pravej komory</b> → šok, smrť<br>malý embolus → nič, alebo <b>červený infarkt</b> pľúc, ak je slabý aj bronchiálny obeh</p>',
  img: {
    src: "assets/images/pulmonary-embolus-gross.jpg",
    alt: "Otvorená vetva pľúcnice s tmavočervenou zrazeninou.",
    caption: "Embolus vo vetve pľúcnice pri pitve.",
    credit: "Dr. Rocke Robertson · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:AC08-7_Pulmonary_embolus.JPG"
  }
},
{
  id: "paradoxna-embolia",
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
  body: ""
},
{
  id: "dekompresna-choroba",
  title: "Dekompresná (kesónová) choroba",
  match: ["dekompresn\\w*\\s+chorob\\w*", "kesónov\\w*\\s+chorob\\w*"],
  short: "Pri rýchlom výstupe z hĺbky sa dusík rozpustený v krvi a tkanivách uvoľní ako bubliny, ktoré upchajú drobné cievy.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Bolesti kĺbov, kožná vyrážka, poškodenie miechy; liečbou je pretlaková komora, ktorá bubliny znova rozpustí.</p>'
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
  id: "ateroembolia",
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
  id: "metastaza",
  title: "Metastáza",
  match: ["metastáz\\w*", "metastatick\\w*", "metastázov\\w*"],
  short: "Zavlečenie chorobného deja (nádoru, infekcie) na vzdialené miesto, kde pokračuje ďalej.",
  body:
    "<ul>" +
      "<li><b>Hematogénna</b> — krvou, podľa pravidiel embólie.</li>" +
      "<li><b>Lymfogénna</b> — lymfou do spádových uzlín.</li>" +
      "<li><b>Porogénna</b> — po povrchu a priesvitom dutín a dutých orgánov.</li>" +
    "</ul>"
},

/* ── prekážky, ischémia, venostáza ───────────────────────────────────── */
{
  id: "kolateraly",
  title: "Kolaterály",
  match: ["kolaterál\\w*"],
  short: "Spojky medzi cievami, ktorými krv obíde uzáver. Pri pomalom zužovaní tepny sa stihnú rozšíriť a tkanivo zachránia.",
  body: ""
},
{
  id: "steal",
  title: "Steal syndróm",
  match: ["steal\\w*"],
  short: "„Kradnutie“ krvi: krv odtečie riečiskom s nižším odporom a susedné povodie ostane ischemické.",
  body:
    '<p class="why"><b>Príklad.</b> Zúženie podkľúčnej tepny pred odstupom stavcovej tepny: krv tečie stavcovou tepnou spätne do ruky a chýba mozgu.</p>'
},
{
  id: "raynaud",
  title: "Raynaudov fenomén",
  match: ["Raynaud\\w*"],
  short: "Záchvatový spazmus tepničiek prstov po chlade alebo strese: prsty zblednú alebo zmodrejú a po uvoľnení sčervenejú.",
  body: ""
},
{
  id: "hyperviskozita",
  title: "Hyperviskozita",
  match: ["hyperviskozit\\w*", "hyperviskózn\\w*"],
  short: "Príliš hustá krv — nadbytok bielkovín (makroglobulinémia, myelóm) alebo krviniek (polycytémia, leukémia) — tečie ťažko kapilárami.",
  body: ""
},
{
  id: "rozvodia",
  title: "Rozvodia (watershed)",
  match: ["rozvodi\\w*", "watershed"],
  short: "Hraničné pásma medzi povodiami dvoch tepien — pri poklese tlaku dostanú krv ako posledné, preto v nich vznikajú infarkty pri šoku.",
  body: ""
},
{
  id: "venostaza",
  title: "Venostáza (kongescia, pasívna hyperémia)",
  match: ["venostáz\\w*", "kongesci\\w*", "pasívn\\w*\\s+hyperémi\\w*", "venózn\\w*\\s+hyperémi\\w*"],
  short: "Nahromadenie odkysličenej krvi v tkanive, z ktorého zle odteká — modročervené, opuchnuté, chladnejšie.",
  body:
    '<p class="chain">viazne odtok → ↑ hydrostatický tlak v kapilárach → <b>transsudát (opuch)</b> → hypoxia → pri dlhom trvaní atrofia, siderofágy, fibróza</p>'
},
{
  id: "hemoragicka-infarzacia",
  title: "Hemoragická infarzácia",
  match: ["hemoragick\\w*\\s+infarzáci\\w*", "infarzáci\\w*"],
  short: "Nekróza tkaniva presiaknutého krvou pri náhlom úplnom uzávere žíl — tepna krv privádza, ale nemá kam odtiecť.",
  body:
    '<p class="chain">zaškrtenie alebo pretočenie → žily sa stlačia skôr než tepna → opuch a krvácanie → napätie stlačí aj tepnu ⟳ → nekróza</p>' +
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
  id: "petechie",
  title: "Petechie",
  match: ["petechi\\w*", "petechiáln\\w*"],
  short: "Bodkovité výrony z kapilár menšie než 2 mm, ktoré po zatlačení neblednú.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Typický obraz nedostatku doštičiek alebo chyby steny drobných ciev; pri poruche koagulačných faktorov chýbajú.</p>',
  img: {
    src: "assets/images/petechiae-leg.jpg",
    alt: "Predkolenie posiate drobnými červenými bodkami.",
    caption: "Petechie pri imunitnej trombocytopénii.",
    credit: "James Heilman, MD · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Petechia_lower_leg.jpg"
  }
},
{
  id: "purpura",
  title: "Purpura",
  match: ["purpura", "purpury", "purpuru", "purpure", "purpurou", "purpúr"],
  short: "Početné petechie alebo výrony väčšie než 2 mm v koži a slizniciach; aj súčasť názvov chorôb, ktoré sa nimi prejavujú.",
  body: ""
},
{
  id: "ekchymoza",
  title: "Ekchymóza a sufúzia",
  match: ["ekchymóz\\w*", "sufúzi\\w*"],
  short: "Väčší plošný výron krvi v koži alebo sliznici („modrina“); rozsiahly splývajúci výron je sufúzia.",
  body: ""
},
{
  id: "hematom",
  title: "Hematóm",
  match: ["hematóm\\w*"],
  short: "Ohraničené nahromadenie vyliatej krvi v tkanive, ktoré tlačí na okolie.",
  body:
    '<p class="chain">hemoglobín → makrofágy → <b>biliverdín</b> (zelená) → <b>bilirubín</b> (žltá) + železo ako <b>hemosiderín</b> (hrdzavá)</p>'
},
{
  id: "hemosiderin",
  title: "Hemosiderín a siderofágy",
  match: ["hemosiderín\\w*", "siderofág\\w*"],
  short: "Hrdzavohnedý pigment so železom z rozpadnutých erytrocytov, uložený v makrofágoch (siderofágoch).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Dokazuje staršie krvácanie alebo dlhú venostázu; Perlsova reakcia ho farbí namodro.</p>'
},
{
  id: "hemartros",
  title: "Hemartros",
  match: ["hemartros\\w*"],
  short: "Krv v kĺbovej dutine — pri úraze alebo samovoľne pri hemofílii.",
  body:
    '<p class="chain">krv v kĺbe → hemosiderín v synovii → synovia zhrubne a prekrví sa → ďalšie krvácanie ⟳ → zničená chrupka</p>'
},
{
  id: "tamponada",
  title: "Tamponáda srdca",
  match: ["tamponád\\w*"],
  short: "Stlačenie srdca tekutinou alebo krvou v osrdcovníku — srdce sa nemôže plniť.",
  body: ""
},
{
  id: "melena",
  title: "Meléna a hemateméza",
  match: ["melén\\w*", "hemateméz\\w*"],
  short: "Hemateméza je vracanie krvi; meléna čierna dechtovitá stolica z natrávenej krvi — zdroj je v hornej časti tráviacej rúry.",
  body: ""
},
{
  id: "hemoptyza",
  title: "Hemoptýza a hemoptoe",
  match: ["hemoptýz\\w*", "hemoptoe"],
  short: "Hemoptýza je spútum s prímesou krvi; hemoptoe vykašľanie väčšieho množstva čistej krvi.",
  body: ""
},
{
  id: "epistaxa",
  title: "Epistaxa",
  match: ["epistax\\w*"],
  short: "Krvácanie z nosa.",
  body: ""
},
{
  id: "hematuria",
  title: "Hematúria",
  match: ["hematúri\\w*"],
  short: "Krv v moči — viditeľná okom alebo len v mikroskope.",
  body: ""
},

/* ── krvácavé stavy ──────────────────────────────────────────────────── */
{
  id: "trombocytopenia",
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
  title: "ITP — imunitná trombocytopénia",
  match: ["ITP", "imunitn\\w*\\s+trombocytopéni\\w*"],
  short: "Autoprotilátky označia doštičky a makrofágy sleziny ich zničia. Starší názov: idiopatická trombocytopenická purpura.",
  body: ""
},
{
  id: "ttp",
  title: "TTP — trombotická trombocytopenická purpura",
  match: ["TTP", "trombotick\\w*\\s+trombocytopenick\\w*\\s+purpur\\w*", "ADAMTS13", "trombotick\\w*\\s+mikroangiopati\\w*"],
  short: "Trombotická mikroangiopatia z nedostatku enzýmu ADAMTS13: neprestrihnuté veľké multiméry vWF lepia doštičky v drobných cievach.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Málo doštičiek + hemolytická anémia so schistocytmi + neurologické príznaky; na rozdiel od DIC sú PT a aPTT v norme.</p>'
},
{
  id: "schistocyty",
  title: "Schistocyty",
  match: ["schistocyt\\w*"],
  short: "Úlomky erytrocytov v krvnom nátere — vznikajú, keď sa krvinky trieštia o fibrínové vlákna a mikrotromby v drobných cievach.",
  body: "",
  img: {
    src: "assets/images/dic-schistocytes.jpg",
    alt: "Krvný náter s úlomkami erytrocytov.",
    caption: "Schistocyty v krvnom nátere pri DIC.",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:DIC_With_Microangiopathic_Hemolytic_Anemia.jpg"
  }
},
{
  id: "trombocytopatia",
  title: "Trombocytopatia",
  match: ["trombocytopati\\w*"],
  short: "Porucha funkcie doštičiek pri ich normálnom počte — najčastejšie po kyseline acetylsalicylovej alebo pri urémii.",
  body: ""
},
{
  id: "koagulopatia",
  title: "Koagulopatia",
  match: ["koagulopati\\w*"],
  short: "Krvácavý stav z nedostatku alebo nefunkčnosti koagulačných faktorov — krváca sa hlboko (kĺby, svaly), bez petechií.",
  body: ""
},
{
  id: "hemofilia",
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
  body: ""
},
{
  id: "vitamin-k",
  title: "Vitamín K",
  match: ["vitamín\\w*\\s+K\\b"],
  short: "Potrebný na tvorbu funkčných faktorov II, VII, IX a X (a proteínov C a S) v pečeni.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Chýba pri poruche vstrebávania tukov a po dlhej liečbe antibiotikami; warfarín jeho účinok blokuje zámerne. Predĺži sa najprv PT.</p>'
},
{
  id: "skorbut",
  title: "Skorbut",
  match: ["skorbut\\w*"],
  short: "Nedostatok vitamínu C: kolagén je nepevný, drobné cievy praskajú — krvácanie z ďasien, okolo vlasových folikulov a pod okosticu, zlé hojenie.",
  body: ""
},
{
  id: "iga-vaskulitida",
  title: "IgA vaskulitída (Henochova-Schönleinova purpura)",
  match: ["IgA\\s+vaskulitíd\\w*", "Henochov\\w*[-\\s]Schönleinov\\w*\\s+purpur\\w*"],
  short: "Vaskulitída malých ciev s depozitmi IgA: hmatná purpura na nohách a zadku, bolesti brucha a kĺbov, zápal obličiek — najmä u detí.",
  body: "",
  img: {
    src: "assets/images/iga-vasculitis-purpura.jpg",
    alt: "Nohy s početnými tmavočervenými škvrnami.",
    caption: "Purpura na nohách pri IgA vaskulitíde.",
    credit: "Profrofrof · CC0",
    href: "https://commons.wikimedia.org/wiki/File:HSP_Vasculitis.jpg"
  }
},
{
  id: "hht",
  title: "Hereditárna hemoragická teleangiektázia",
  match: ["hereditárn\\w*\\s+hemoragick\\w*\\s+teleangiektázi\\w*", "teleangiektázi\\w*", "Renduov\\w*[-\\s]Oslerov\\w*[-\\s]Weberov\\w*\\s+chorob\\w*"],
  short: "Autozómovo dominantná chyba stavby drobných ciev: rozšírené tenkostenné cievky na perách, jazyku a v nose a artériovenózne spojky v orgánoch.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Opakované krvácanie z nosa a tráviacej rúry vedie k anémii z nedostatku železa.</p>',
  img: {
    src: "assets/images/hht-lips.jpg",
    alt: "Pery s drobnými červenými škvrnkami.",
    caption: "Teleangiektázie na perách.",
    credit: "Narraburra · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Hereditary_hemorrhagic_telangiectasia.jpg"
  }
},
{
  id: "dic",
  title: "DIC — diseminovaná intravaskulárna koagulácia",
  match: ["DIC", "diseminovan\\w*\\s+intravaskulárn\\w*\\s+koagul\\w*", "konzumpčn\\w*\\s+koagulopati\\w*"],
  short: "Zrážanie krvi v celom obehu naraz: mikrotromby upchávajú kapiláry a spotrebujú doštičky aj faktory, takže pacient zároveň krváca.",
  body:
    '<p class="chain">sepsa, pôrodnícke komplikácie, úraz, nádor → tkanivový faktor v krvi → <b>mikrotromby</b> → ischémia orgánov ⟳ + <b>spotreba</b> doštičiek a faktorov → krvácanie</p>' +
    '<p class="why"><b>Laboratórium.</b> ↓ doštičky, predĺžený PT, ↓ fibrinogén, ↑↑ D-diméry, schistocyty. Vždy druhotná — lieči sa príčina.</p>'
},
{
  id: "mikrotromby",
  title: "Hyalínne (fibrínové) mikrotromby",
  match: ["mikrotromb\\w*", "hyalínn\\w*\\s+(?:\\(fibrínov\\w*\\)\\s+)?mikrotromb\\w*", "hyalínn\\w*\\s+tromb\\w*"],
  short: "Zátky z fibrínu a doštičiek v kapilárach a arteriolách, viditeľné len v mikroskope — znak DIC a trombotických mikroangiopatií.",
  body: "",
  img: {
    src: "assets/images/fibrin-thrombi-glomerulus.jpg",
    alt: "Klbko obličky s homogénnymi ružovými zátkami v kapilárach.",
    caption: "Fibrínové mikrotromby v klbku obličky (H&E).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Acute_thrombotic_microangiopathy_-_high_mag.jpg"
  }
}
);

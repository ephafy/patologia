/* Glosár PATOLY — základné pojmy, ktoré texty používajú bez výkladu (bunka, molekuly, vyšetrovanie, anatómia).
   Pridané pri prechode kap. 7; spoločné pre všetky kapitoly. Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── bunka a molekuly ────────────────────────────────────────────────── */
{
  id: "enzym", et: "gr. <i>en</i> „v“ + <i>zyme</i> „kvások“",
  title: "Enzým",
  match: ["enzým\\w*"],
  short: "Bielkovina, ktorá urýchľuje chemickú reakciu v bunke alebo mimo nej a sama sa pritom nespotrebuje. Názvy enzýmov končia najčastejšie na „-áza“ (proteináza, lipáza, hydroláza).",
  body: "<ul><li>Je špecifický pre jeden substrát alebo skupinu.</li><li>Aktivitu ovplyvňuje teplota, pH a inhibítory.</li><li>V krvi sa meria ako marker poškodenia orgánu.</li></ul>"
},
{
  id: "receptor", et: "lat. <i>recipere</i> „prijímať“",
  title: "Receptor",
  match: ["receptor\\w*"],
  short: "Bielkovina na povrchu alebo vo vnútri bunky, na ktorú sa naviaže signálna molekula (hormón, cytokín, antigén) a spustí v bunke odpoveď.",
  body: "<ul><li>Typy: membránové, jadrové, ionotropné.</li><li>Príklady: receptor pre inzulín, receptor T-lymfocytu.</li></ul>"
},
{
  id: "kolagen", et: "gr. <i>kolla</i> „lepidlo“ + <i>-genes</i> „tvoriaci“",
  title: "Kolagén",
  match: ["kolagén\\w*", "kolagénov\\w*"],
  img: {
    "src": "assets/images/mi-healing-3-collagen.jpg",
    "alt": "Fibroblasty a mladý kolagén v hojacom sa infarkte.",
    "caption": "Fibroblasty a mladý kolagén v hojacom sa infarkte.",
    "credit": "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_fibroblast_proliferation_and_early_collagen_deposition_in_myocardial_infarction.jpg"
  },
  short: "Najhojnejšia bielkovina väziva — pevné vlákna, ktoré dávajú tkanivu pevnosť v ťahu. Fibroblasty ho tvoria pri hojení a v jazve; jeho nadbytok je fibróza.",
  body: "<ul><li>Typ I: kosť, koža, jazva; typ III: retikulín, cievy; typ IV: bazálna membrána.</li><li>Syntéza vyžaduje vitamín C (hydroxylácia prolínu).</li></ul>"
},
{
  id: "lipidy", et: "gr. <i>lipos</i> „tuk“",
  title: "Lipidy (tuky)",
  match: ["lipid\\w*"],
  short: "Skupina látok nerozpustných vo vode: triacylglyceroly, fosfolipidy, cholesterol.",
  body: "<ul><li>Tvoria bunkové membrány a zásobu energie.</li></ul>"
},
{
  id: "glykolipidy", et: "gr. <i>glykys</i> „sladký“ + lipid",
  title: "Glykolipidy",
  match: ["glykolipid\\w*"],
  short: "Lipidy s naviazaným cukrom; sú súčasťou membrán."
},
{
  id: "cholesterol", et: "gr. <i>chole</i> „žlč“ + <i>stereos</i> „pevný“ + <i>-ol</i> (alkohol)",
  title: "Cholesterol",
  match: ["cholesterol\\w*"],
  img: {
    "src": "assets/images/cholesterol-embolus.jpg",
    "alt": "Cholesterolové štrbiny v cholesterolovom embole.",
    "caption": "Cholesterolové štrbiny v cholesterolovom embole.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Cholesterol_embolus_-_intermed_mag.jpg"
  },
  short: "Lipid, ktorý je súčasťou bunkových membrán a východiskom steroidných hormónov a žlčových kyselín. V nadbytku sa ukladá do cievnej steny (ateroskleróza) a do kože (xantómy).",
  body: "<ul><li>Zdroje: potrava a syntéza v pečeni (HMG-CoA reduktáza).</li><li>Statíny blokujú HMG-CoA reduktázu.</li><li>V ateróme tvorí cholesterolové kryštály (štrbiny v reze).</li></ul>"
},
{
  id: "cytoplazma", et: "gr. <i>kytos</i> „bunka“ + <i>plasma</i> „útvar, tekutina“",
  title: "Cytoplazma",
  match: ["cytoplazm\\w*"],
  short: "Vnútro bunky mimo jadra: obsahuje organely, cytoskelet a bielkoviny.",
  body: "<ul><li>V H&E sa farbí ružovo (eozín); veľa RNA ju sfarbí modrofialovo (bazofilná).</li></ul>"
},
{
  id: "jadro",
  title: "Jadro bunky",
  match: ["jadrov\\w*", "jadier", "jadro", "jadra", "jadrá"],
  short: "Nesie DNA; v H&E sa farbí modrofialovo (hematoxylín).",
  body: "<ul><li>Zmeny jadra (pyknóza, karyorexa, karyolýza) ukazujú smrť bunky; nádorová atypia sa prejaví zväčšením a nepravidelnosťou jadier.</li></ul>"
},
{
  id: "chromatin", et: "gr. <i>chroma</i> „farba“ (dobre sa farbí)",
  title: "Chromatín",
  match: ["chromatín\\w*"],
  short: "DNA zbalená s bielkovinami v jadre. Hustý (hrudkovitý) chromatín je neaktívny a tmavý, rozptýlený (jemný) aktívny a svetlý."
},
{
  id: "inkluzia", et: "lat. <i>inclusio</i> „uzavretie“ (<i>includere</i> „uzavrieť“, <i>in</i> + <i>claudere</i> „zatvoriť“)",
  img: {
    src: "assets/images/cmv-owl-eye.jpg",
    alt: "Inklúzia „sovie oko“ pri cytomegalovírusovej infekcii.",
    caption: "Inklúzia „sovie oko“ pri cytomegalovírusovej infekcii.",
    credit: "CDC/Dr. Edwin P. Ewing, Jr. (PHIL #958) · public domain",
    href: "https://commons.wikimedia.org/wiki/File:Cytomegalovirus_01.jpg"
  },
  title: "Inklúzia (vtrúsenina)",
  match: ["inklúzi\\w*"],
  short: "Útvar v cytoplazme alebo jadre, ktorý nie je organela: nahromadená látka (lipid, glykogén, pigment), bielkovina alebo vírus."
},
{
  id: "monocyty", et: "gr. <i>monos</i> „jediný“ + <i>kytos</i> „bunka“ (jedno jadro)",
  title: "Monocyty",
  match: ["monocyt\\w*"],
  short: "Biele krvinky s ohnutým jadrom, ktoré cirkulujú v krvi a v tkanive sa premenia na makrofágy alebo dendritické bunky. Privolávajú ich chemokíny (napr. v granulóme TNF)."
},
{
  id: "kapilara", et: "lat. <i>capillaris</i> „vlasový“ (<i>capillus</i> „vlas“)",
  title: "Kapilára",
  match: ["kapilár\\w*", "kapilar\\w*"],
  short: "Najtenšia cieva s jednovrstvovou stenou z endotelu. V nej prebieha výmena plynov, živín a tekutiny medzi krvou a tkanivom.",
  body: "<ul><li>Typy: spojitá, fenestrovaná, sínusoidná.</li><li>Priepustnosť zvyšuje histamín.</li></ul>"
},
{
  id: "periferny-nerv", et: "gr. <i>periphereia</i> „obvod“ (<i>peri</i> „okolo“ + <i>pherein</i> „niesť“); lat. <i>nervus</i> „šľacha, nerv“",
  img: {
    src: "assets/images/traumatic-neuroma.jpg",
    alt: "Normálny nerv (a) a traumatický neuróm (b), farbenie elastika–van Gieson.",
    caption: "Normálny nerv (a) a traumatický neuróm (b), farbenie elastika–van Gieson.",
    credit: "Jensflorian · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:EvG_nerve_and_neuroma.jpg"
  },
  title: "Periférny nerv",
  match: ["periférn\\w*\\s+nerv\\w*"],
  short: "Nerv mimo mozgu a miechy. Obsahuje nervové vlákna, obalené Schwannovými bunkami a väzivom; vedie signály z tela a do tela."
},
{
  id: "vitamin-d",
  title: "Vitamín D",
  match: ["vitamín\\w*\\s+D\\b"],
  short: "Tukorozpustný vitamín tvorený v koži vplyvom slnka. V obličke a v makrofágoch sa mení na aktívny kalcitriol, ktorý zvyšuje vstrebávanie vápnika v čreve."
},
{
  id: "sept", et: "lat. <i>septum</i> „ohrada, priehradka“ (<i>saepire</i> „ohradiť“)",
  title: "Septá (priehradky)",
  match: ["sept(?:a|á|ách|ami|y|um)"],
  short: "Tenké väzivové priehradky, ktoré oddeľujú menšie oddiely orgánu (napr. alveoly alebo lalôčiky). Pri nich vedú drobné cievy a lymfatické cievy."
},

/* ── vyšetrovanie a pojmy v texte ────────────────────────────────────── */
{
  id: "citlivost",
  title: "Citlivosť testu",
  match: ["citlivos\\w*\\s+(?:testu|testov|metód\\w*|vyšetren\\w*)", "senzitivit\\w*"],
  short: "Podiel chorých, ktorých test zachytí (málo falošne negatívnych).",
  body: "<ul><li>Citlivý test zachytí všetkých chorých: negatívny výsledok chorobu vylučuje.</li></ul>"
},
{
  id: "specificita", et: "lat. <i>specificus</i> „druhovo zvláštny“",
  title: "Špecificita testu",
  match: ["špecificit\\w*"],
  short: "Podiel zdravých, ktorých test správne označí za zdravých (málo falošne pozitívnych).",
  body: "<ul><li>Špecifický test zdravých nepotvrdzuje: pozitívny výsledok chorobu potvrdzuje.</li></ul>"
},
{
  id: "histologia", et: "gr. <i>histos</i> „tkanivo“ + <i>logos</i> „náuka“",
  title: "Histológia",
  match: ["histológi\\w*", "histologick\\w*"],
  short: "Nauka o stavbe tkanív pod mikroskopom."
},
{
  id: "morfologia", et: "gr. <i>morphe</i> „tvar“ + <i>logos</i> „náuka“",
  title: "Morfológia",
  match: ["morfológi\\w*", "morfologick\\w*"],
  short: "Nauka o tvare a vzhľade štruktúr (voľným okom aj mikroskopom); patológ opisuje morfológiu zmien."
},
{
  id: "makroskopicky", et: "gr. <i>makros</i> „veľký“ + <i>skopein</i> „pozerať“",
  title: "Makroskopický obraz",
  match: ["makroskopick\\w*(?:\\s+obraz\\w*)?"],
  short: "To, čo vidno voľným okom pri pitve alebo na rezanej vzorke."
},
{
  id: "mikroskopicky", et: "gr. <i>mikros</i> „malý“ + <i>skopein</i> „pozorovať“",
  title: "Mikroskopický obraz",
  match: ["mikroskopick\\w*(?:\\s+obraz\\w*)?"],
  short: "To, čo vidno v mikroskope na farbenom reze."
},
{
  id: "etiologia", et: "gr. <i>aitia</i> „príčina“ + <i>logos</i> „náuka“",
  title: "Etiológia",
  match: ["etiológi\\w*"],
  short: "Príčina choroby — čo ju spúšťa."
},
{
  id: "patogeneza", et: "gr. <i>pathos</i> „utrpenie, choroba“ + <i>genesis</i> „vznik“",
  title: "Patogenéza",
  match: ["patogenéz\\w*", "patogenetick\\w*"],
  short: "Mechanizmus, ktorým z príčiny vznikne choroba (A → B → C → nález)."
},
{
  id: "diagnoza", et: "gr. <i>diagnosis</i> „rozoznanie“ (<i>dia</i> „skrz“ + <i>gignoskein</i> „poznávať“)",
  title: "Diagnóza",
  match: ["diagnóz\\w*", "diagnostick\\w*"],
  short: "Pomenovanie choroby na základe príznakov, vyšetrení a nálezu. Histologická diagnóza vychádza z vyšetrenia tkaniva pod mikroskopom."
},
{
  id: "prognoza", et: "gr. <i>pro</i> „pred“ + <i>gnosis</i> „poznanie“ (predpoznanie)",
  title: "Prognóza",
  match: ["prognóz\\w*"],
  short: "Predpoveď, ako choroba pravdepodobne prebehne a aký bude jej výsledok (vyliečenie, trvalé následky, smrť)."
},
{
  id: "komplikacia", et: "lat. <i>complicare</i> „zložiť, zamotať“ (<i>com-</i> „spolu“ + <i>plicare</i> „skladať“)",
  title: "Komplikácia",
  match: ["komplikáci\\w*"],
  short: "Nová porucha, ktorá sa pripojí k základnej chorobe a zhorší ju. Napr. krvácanie z kaverny pri tuberkulóze."
},
{
  id: "expozicia", et: "lat. <i>exponere</i> „vystaviť“",
  title: "Expozícia",
  match: ["expozíci\\w*"],
  short: "Vystavenie škodlivine (prach, mikróby, žiarenie)."
},
{
  id: "dispozicia", et: "lat. <i>disponere</i> „rozmiestniť“",
  title: "Dispozícia",
  match: ["dispozíci\\w*", "predispozíci\\w*"],
  short: "Vrodená alebo získaná náchylnosť človeka ochorieť; spolu s expozíciou určí, či a ako závažne ochorie."
},
{
  id: "kolonizacia", et: "lat. <i>colonia</i> „osada“ (<i>colere</i> „obrábať“)",
  title: "Kolonizácia",
  match: ["kolonizáci\\w*", "kolonizovan\\w*"],
  short: "Usídlenie mikróbov na povrchu alebo v dutine tela bez vyvolania zápalu. Pri poškodení tkaniva alebo oslabenej imunite môže prejsť v infekciu."
},
{
  id: "intracelularne", et: "lat. <i>intra</i> „vnútri“ + <i>cellula</i> „komôrka“",
  title: "Intracelulárne",
  match: ["intracelulárn\\w*"],
  short: "Vo vnútri bunky (mykobaktérie v makrofágu); mikróby v bunke sú schované pred protilátkami."
},
{
  id: "extracelularne", et: "lat. <i>extra</i> „mimo“",
  title: "Extracelulárne",
  match: ["extracelulárn\\w*"],
  short: "Mimo buniek (baktérie v kaverne)."
},
{
  id: "blokada-srdca",
  title: "Srdcová blokáda",
  match: ["blokád\\w*", "AV\\s+blok\\w*"],
  short: "Porucha vedenia elektrického impulzu v srdci. Pri úplnej blokáde sa predsiene a komory sťahujú nezávisle, komory zvyčajne pomaly.",
  body: "<ul><li>I., II. a III. (úplný) stupeň.</li><li>Pri úplnej blokáde chýba spojenie predsiene a komory.</li></ul>"
},
{
  id: "serotyp", et: "lat. <i>serum</i> „srvátka, sérum“ + gr. <i>typos</i> „odtlačok, vzor“",
  title: "Sérotyp",
  match: ["sérotyp\\w*"],
  short: "Variant mikróba, ktorý sa líši povrchovými antigénmi a dá sa rozlíšiť protilátkami. Rozdielne sérotypy môžu vyvolať rozdielne choroby (napr. L1–L3 pri chlamýdiách)."
},
{
  id: "nespecificky-zapal",
  title: "Nešpecifický zápal",
  match: ["nešpecifick\\w*(?:\\s+zápal\\w*)?"],
  short: "Vyzerá rovnako bez ohľadu na príčinu (exsudácia, neutrofily)."
},
{
  id: "specificky-zapal",
  title: "Špecifický zápal",
  match: ["špecifick\\w*\\s+zápal\\w*"],
  short: "Tradične zápal s typickým obrazom pre jednu príčinu (tuberkulóza, syfilis); dnes sa nahrádza pojmom granulomatózny zápal."
},
{
  id: "mapovita-nekroza",
  title: "Mapovitá nekróza",
  match: ["mapovit\\w*"],
  short: "Nekróza s nepravidelnými, zubatými okrajmi ako na mape. Typická pre granulomatózu s polyangiitídou; nekrotické ložiská majú bazofilný detritus.",
  body: "<ul><li>Typická pre GPA, vyskytuje sa aj pri niektorých infekciách.</li><li>V reze: bazofilný detritus a okolo palisáda histiocytov.</li></ul>"
},

/* ── anatómia ────────────────────────────────────────────────────────── */
{
  id: "apendix", et: "lat. <i>appendix</i> „prívesok“ (<i>appendere</i> „zavesiť“)",
  title: "Slepé črevo (apendix)",
  match: ["apendix\\w*", "slep\\w*\\s+črev\\w*", "apendicitíd\\w*"],
  short: "Slepý výbežok na začiatku hrubého čreva v pravom dolnom bruchu; stena je bohatá na lymfatické tkanivo. Jeho zápal (apendicitída) napodobňuje aj mezenteriálna lymfadenitída.",
  body: "<ul><li>Apendicitída je najčastejšia príčina akútneho brucha.</li><li>Zápal začína obštrukciou lúmenu (fekalit, hyperplázia lymfatického tkaniva).</li></ul>"
},
{
  id: "slezina",
  title: "Slezina",
  match: ["slezin\\w*"],
  img: {
    "src": "assets/images/splenic-infarcts-healed.jpg",
    "alt": "Zhojené infarkty sleziny: vtiahnuté jazvy na povrchu.",
    "caption": "Zhojené infarkty sleziny: vtiahnuté jazvy na povrchu.",
    "credit": "Narraburra · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Healed_splenic_infarcts.jpg"
  },
  short: "Orgán v ľavom hornom bruchu, ktorý filtruje krv: odstraňuje staré erytrocyty a baktérie a obsahuje lymfatické tkanivo (biela pulpa) a krvné dutinky (červená pulpa).",
  body: "<ul><li>Biela pulpa = lymfocyty, červená pulpa = sínusoidy a makrofágy.</li><li>Splenomegália vzniká pri portálnej hypertenzii, infekciách a leukémii.</li><li>Po odstránení sleziny hrozia infekcie opuzdrenými baktériami.</li></ul>"
},
{
  id: "nadobličky",
  title: "Nadobličky",
  match: ["nadoblič\\w*"],
  img: {
    "src": "assets/images/adrenal-hemorrhage-wfs.jpg",
    "alt": "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    "caption": "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    "credit": "Amadalvarez · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Waterhouse-Friderichsen._IMG_2912.jpg"
  },
  short: "Dva žľazové orgány nad hornými pólmi obličiek. Kôra tvorí kortizol, aldosterón a pohlavné hormóny, dreň adrenalín a noradrenalín.",
  body: "<ul><li>Kôra: zona glomerulosa (aldosterón), fasciculata (kortizol), reticularis (androgény).</li><li>Dreň: katecholamíny (feochromocytóm).</li></ul>"
},
{
  id: "semennik",
  title: "Semenníky",
  match: ["semenník\\w*"],
  short: "Párová mužská pohlavná žľaza, ktorá tvorí spermie a testosterón. Leží v miešku, kde je teplota nižšia než v bruchu.",
  body: "<ul><li>Nádory vznikajú najčastejšie zo zárodočných buniek (seminóm).</li><li>Nižšia teplota mieška je dôležitá pre tvorbu spermií.</li></ul>"
},
{
  id: "stavec",
  title: "Stavce",
  match: ["stavc\\w*", "stavec"],
  short: "Kosti chrbtice. Na rozdiel od dlhých kostí majú veľa hubovitej kosti a dobré krvné zásobenie, preto sa v nich usádzajú ložiská z krvi (tuberkulóza, metastázy).",
  body: "<ul><li>Do stavcov metastázujú nádory prsníka, prostaty a pľúc.</li><li>Tuberkulóza stavcov je Pottova choroba.</li></ul>"
},
{
  id: "leva-obliciaj", et: "lat. <i>facies</i> „tvár“ + <i>leoninus</i> „levový“",
  title: "Leví obličaj (facies leonina)",
  match: ["leví\\s+obličaj\\w*", "facies\\s+leonina"],
  short: "Zhrubnutie kože tváre s uzlami a hlbokými záhybmi, ktoré pripomína leviu hlavu. Typický znak pokročilej lepromatóznej lepry."
},
{
  id: "sedlovity-nos",
  img: {
    src: "assets/images/gpa-saddle-nose.jpg",
    alt: "Sedlovitý nos pri granulomatóze s polyangiitídou.",
    caption: "Sedlovitý nos pri granulomatóze s polyangiitídou.",
    credit: "S. C. Kawabata, P. T. Hirono Hotta, R. Brito e Dias et al. · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Jmc2028e-g001.jpg"
  },
  title: "Sedlovitý nos",
  match: ["sedlovit\\w*\\s+nos\\w*"],
  short: "Zapadnutý koreň nosa po zániku chrupavkovej nosovej prepážky — napr. pri granulomatóze s polyangiitídou alebo vrodenom syfilise."
},
{
  id: "silikon", et: "lat. <i>silex, silicis</i> „kremeň“",
  title: "Silikón",
  match: ["silikón\\w*"],
  short: "Syntetický polymér používaný v implantátoch (prsné implantáty, katétre). V tkanive je pre makrofágy nestráviteľný, preto obalí granulóm z cudzích telies."
}

);

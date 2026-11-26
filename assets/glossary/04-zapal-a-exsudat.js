/* Glosár PATOLY — zápal, exsudácia, leukocytová kaskáda a druhy exsudátu. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "celsove-znaky",
  title: "Celsove znaky zápalu",
  match: ["Celsov\\w*\\s+znak\\w*", "Celsov\\w*", "functio\\s+laesa"],
  short: "Päť vonkajších znakov zápalu — každý je priamym dôsledkom cievnej reakcie alebo poškodenia.",
  body:
    "<ul>" +
      "<li><b>Rubor</b> (začervenanie) — ↑ prietok tepnovou krvou.</li>" +
      "<li><b>Calor</b> (teplo) — viac teplej krvi na mieste.</li>" +
      "<li><b>Tumor</b> (opuch) — exsudát v tkanive.</li>" +
      "<li><b>Dolor</b> (bolesť) — mediátory (bradykinín) a tlak opuchu na receptory bolesti.</li>" +
      "<li><b>Functio laesa</b> (porucha funkcie) — poškodenie a opuch orgánu.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> „Tumor“ tu neznamená nádor, ale opuch.</p>'
},
{
  id: "exsudat", et: "lat. <i>exsudare</i> „vypotiť sa“ (<i>ex</i> „von“ + <i>sudare</i> „potiť sa“)",
  img: {
    src: "assets/images/purulent-pericarditis.jpg",
    alt: "Hnisavý exsudát na epikarde.",
    caption: "Hnisavý exsudát na epikarde.",
    credit: "علاء · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Purulent_pericarditis.jpg"
  },
  title: "Exsudát",
  match: ["exsudát\\w*", "exsudáci\\w*"],
  short: "Zápalový výpotok bohatý na bielkoviny — vzniká, keď je poškodená priepustnosť cievnej steny.",
  body:
    '<p class="chain">mediátory zápalu → kontrakcia endotelu a transcytóza → <b>↑ priepustnosť ciev</b> → z cievy uniká voda, elektrolyty a bielkoviny (fibrinogén, imunoglobulíny) → exsudát</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bielkoviny v exsudáte <b>naťahujú do tkaniva ďalšiu vodu</b> a opuch rastie. Podľa toho, čo v exsudáte prevláda, sa zápaly delia (serózny, fibrinózny, hnisavý…).</p>'
},
{
  id: "transsudat", et: "lat. <i>trans</i> „cez“ + <i>sudare</i> „potiť sa“",
  img: {
    src: "assets/images/pitting-edema.jpg",
    alt: "Edém predkolenia s jamkou po zatlačení.",
    caption: "Edém predkolenia s jamkou po zatlačení.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Pitting_Edema2008.jpg"
  },
  title: "Transsudát",
  match: ["transsudát\\w*", "transsudáci\\w*"],
  short: "Nezápalový výpotok chudobný na bielkoviny — vzniká zmenou tlakov, nie poškodením cievy.",
  body:
    '<div class="fork">' +
      "<div><b>Exsudát</b><br>↑ bielkoviny (&gt; 30 g/l), ↑ relatívna hustota (&gt; 1,020)<br>poškodená cievna stena</div>" +
      "<div><b>Transsudát</b><br>↓ bielkoviny, číry<br>↑ hydrostatický alebo ↓ onkotický tlak (napr. srdcové zlyhanie)</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Rozdiel určuje, či hľadáme <b>zápal</b> (exsudát), alebo poruchu hemodynamiky či bielkovín (transsudát).</p>'
},
{
  id: "hyperemia", et: "gr. <i>hyper</i> „nad, nadmerne“ + <i>haima</i> „krv“",
  title: "Hyperémia",
  match: ["hyperémi\\w*"],
  img: {
    "src": "assets/images/lung-congestion-siderophages.jpg",
    "alt": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "caption": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_pulmonary_congestion_and_siderophages.jpg"
  },
  short: "Zvýšený obsah krvi v tkanive — aktívna (viac prítoku) alebo pasívna (horší odtok).",
  body: "<ul><li>Zvýšený obsah krvi v kapilárach a venulách tkaniva.</li><li>Aktívna je fyziologická (svaly pri námahe, trávenie) alebo patologická (zápal).</li><li>Pasívna hyperémia je dôsledok zhoršeného žilového odtoku.</li></ul><div class=\"fork\"><div><b>Aktívna</b><br>vazodilatácia arteriol<br>červené, teplé — zápal</div><div><b>Pasívna (kongescia)</b><br>ťažký odtok žilovej krvi<br>modrasté, chladné — srdcové zlyhanie</div></div>"
},
{
  id: "staza", et: "gr. <i>stasis</i> „státie, zastavenie“",
  title: "Krvná stáza",
  match: ["stáz\\w*"],
  short: "Spomalenie až zastavenie toku krvi v zápalovom riečisku.",
  body:
    '<p class="chain">↑ priepustnosť ciev → strata tekutiny → ↑ viskozita krvi + rozšírené riečisko → <b>tok sa spomalí</b> → leukocyty sa dostanú k stene cievy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez spomalenia by leukocyty prúdili stredom cievy a k endotelu by sa nedostali. Pri ťažkom zápale môže stáza viesť k <b>trombóze a nekróze</b>.</p>'
},
{
  id: "histamin", et: "gr. <i>histos</i> „tkanivo“ + amín",
  title: "Histamín",
  match: ["histamín\\w*"],
  short: "Mediátor z mastocytov a bazofilov: okamžite rozšíri cievy a zvýši ich priepustnosť.",
  body: "<ul><li><b>Receptory H1:</b> kontrakcia endotelových buniek → medzery medzi nimi → únik plazmy.</li><li>Odpoveď je rýchla a prechodná (desiatky minút).</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Dlhšiu priepustnosť vyvolávajú cytokíny (TNF-α, IL-1).</p>"
},
{
  id: "mastocyt", et: "nem. <i>Mast</i> „vykŕmenie“ + gr. <i>kytos</i> „bunka“",
  title: "Mastocyt (žírna bunka)",
  match: ["mastocyt\\w*", "žírn\\w*\\s+bunk\\w*"],
  short: "Bunka väziva pri cievach a sliznici, plná granúl s histamínom, ktorá zápalovú odpoveď spúšťa v priebehu sekúnd.",
  body: "<ul><li>Aktivuje sa naviazaním antigénu na IgE alebo úlomkami komplementu (C3a, C5a).</li><li>Uvoľní histamín a tvorí lipidové mediátory (leukotriény, prostaglandíny).</li></ul>"
},
{
  id: "bradykinin", et: "gr. <i>bradys</i> „pomalý“ + <i>kinein</i> „hýbať“ (pomaly vyvolá sťah hladkého svalu)",
  title: "Bradykinín",
  match: ["bradykinín\\w*"],
  short: "Peptid z kininového systému, ktorý zvyšuje priepustnosť ciev a dráždi receptory bolesti.",
  body:
    '<p class="chain">poškodenie → aktivácia kininového systému → <b>bradykinín</b> → vazodilatácia + ↑ priepustnosť + podráždenie nervových zakončení</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo zápal <b>bolí</b> a prečo opuchne aj bez zásahu mastocytov.</p>'
},
{
  id: "cytokiny-zapal", et: "gr. <i>kytos</i> „bunka“ + <i>kinein</i> „hýbať“",
  title: "Cytokíny",
  match: ["cytokín\\w*"],
  short: "Malé signalizačné bielkoviny, ktorými si bunky (najmä imunity) posielajú príkazy.",
  body: "<ul><li>Pôsobia lokálne alebo cez krv na celé telo.</li><li>Hlavné rodiny: TNF, interleukíny, interferóny, chemokíny a rastové faktory.</li><li>V zápale zmenia endotel (adhézia, priepustnosť), vyvolajú horúčku a zapnú pečeň (bielkoviny akútnej fázy).</li></ul>"
},
{
  id: "tnf-alfa", et: "angl. <i>tumor necrosis factor alpha</i>",
  title: "TNF-α",
  match: ["TNF-?α", "TNF"],
  short: "Cytokín makrofágov, ktorý zapne endotel a prepája miestny zápal s celkovou odpoveďou.",
  body: "<ul><li>Endotel exprimuje E-selektín a ICAM-1/VCAM-1 → leukocyty sa naviažu.</li><li>Vyvoláva horúčku a pri dlhom pôsobení kachexiu.</li><li>Blokáda TNF (anti-TNF) tlmí zápal, ale môže reaktivovať tuberkulózu.</li></ul>"
},
{
  id: "chemokiny", et: "gr. <i>chemeia</i> „chémia“ + <i>kinein</i> „hýbať“",
  title: "Chemokíny",
  match: ["chemokín\\w*"],
  short: "Cytokíny, ktoré vytvárajú chemický gradient a navádzajú leukocyty na miesto zápalu.",
  body: "<ul><li>Chemokíny CXC (IL-8) priťahujú neutrofily, CC (MCP-1) monocyty a lymfocyty.</li><li>Tvoria ich endotel, makrofágy a poškodené bunky.</li><li>Gradient chemokínu určuje smer, ktorým leukocyt po diapedéze putuje tkanivom.</li></ul><ul><li>Viažu sa na endotel a aktivujú integríny leukocytu.</li><li>Príklad: IL-8 (CXCL8) priláka neutrofily.</li></ul>"
},
{
  id: "interleukiny", et: "lat. <i>inter-</i> „medzi“ + gr. <i>leukos</i> „biely“",
  title: "Interleukíny",
  match: ["interleukín\\w*", "IL-\\d+\\w*"],
  short: "Cytokíny, ktorými sa dorozumievajú leukocyty; číslo (IL-1, IL-6…) je poradie objavenia.",
  body: "<ul><li>Pôsobia na leukocyty aj na iné bunky.</li><li>Niektoré sú prozápalové (IL-1, IL-6), iné protizápalové (IL-10).</li></ul><ul><li>Každý má vlastné úlohy: IL-1 a IL-6 podnecujú horúčku a akútnu fázu, IL-4 a IL-13 alergiu, IL-10 tlmí zápal.</li></ul>"
},
{
  id: "transcytoza", et: "lat. <i>trans</i> „cez“ + gr. <i>kytos</i> „bunka“ + <i>-osis</i> „stav, proces“",
  title: "Transcytóza",
  match: ["transcytóz\\w*"],
  short: "Prenos bielkovín cez endotelovú bunku v pľuzgierikoch (vezikulách) — nie medzerou, ale bunkou.",
  body:
    '<p class="chain">bielkovina na luminálnej strane → <b>vezikula</b> → bunkou na abluminálnu stranu → vyprázdnenie do tkaniva</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to druhá cesta úniku bielkovín pri zápale (popri medzerách medzi bunkami). Stupňuje ju napr. VEGF.</p>'
},
{
  id: "selektiny", et: "selektívny + lektín (lat. <i>legere</i> „vyberať“)",
  title: "Selektíny",
  match: ["selektín\\w*", "[PE]-selektín\\w*", "sialyl-Lewis\\s+X"],
  short: "Adhezívne molekuly, ktoré leukocyt spomalia na stene cievy (rolling).",
  body: "<ul><li>P-selektín je uložený v endoteli a po podnete sa objaví na povrchu okamžite.</li><li>E-selektín vzniká až po hodinách vplyvom TNF-α a IL-1.</li><li>L-selektín je na leukocytoch.</li></ul><ul><li>Slabá, rozpojiteľná väzba na cukry (sialyl-Lewis X) — leukocyt sa „prevaľuje“.</li><li>P- a E-selektín sa objavia na endoteli po podnete histamínom a TNF-α.</li></ul>"
},
{
  id: "integriny", et: "lat. <i>integer</i> „celý“",
  title: "Integríny",
  match: ["integrín\\w*", "β2-integrín\\w*", "LFA-1", "Mac-1"],
  short: "Adhezívne molekuly leukocytov, ktoré po aktivácii chemokínmi pevne prichytia leukocyt na endotel.",
  body: "<ul><li>Pozostávajú z podjednotiek α a β.</li><li>Na pokojnom leukocyte sú neaktívne; chemokín ich aktivuje.</li><li>Zabezpečujú aj prichytenie buniek k medzibunkovej hmote.</li></ul><ul><li>Naviažu sa na ICAM-1 a VCAM-1 endotelu.</li><li>Chýbanie β2-integrínu (CD18) dáva LAD 1: bez hnisu, no s opakovanými infekciami.</li></ul>"
},
{
  id: "icam-1", et: "angl. <i>intercellular adhesion molecule 1</i>",
  title: "ICAM-1",
  match: ["ICAM-1"],
  short: "Adhezívna molekula endotelu, na ktorú sa viažu integríny leukocytov.",
  body: "<ul><li>Viaže β2-integríny leukocytov (LFA-1, Mac-1) — pevná adhézia.</li><li>Na endoteli ju vyvolá TNF-α, IL-1 a LPS (nie je tam trvalo).</li></ul><ul><li>Jej tvorbu zapína TNF-α a IL-1.</li></ul>"
},
{
  id: "vcam-1", et: "angl. <i>vascular cell adhesion molecule 1</i>",
  title: "VCAM-1",
  match: ["VCAM-1"],
  short: "Adhezívna molekula endotelu, na ktorú sa viažu integríny leukocytov; zapína ju TNF-α a IL-1.",
  body: "<ul><li>Viaže integrín VLA-4 na monocytoch, lymfocytoch a eozinofiloch.</li><li>Dôležitá pri chronickom zápale a v ranej aterosklerotickej lézii.</li></ul>"
},
{
  id: "pecam-1", et: "angl. <i>platelet endothelial cell adhesion molecule 1</i>",
  title: "PECAM-1",
  match: ["PECAM-1"],
  short: "Molekula na spojoch endotelových buniek, ktorá pomáha leukocytu prejsť cez stenu cievy (diapedéza).",
  body: "<ul><li>Leží na spojoch medzi endotelovými bunkami, aj na doštičkách a leukocytoch.</li><li>Leukocyt cez ne prejde medzi bunkami (paracelulárna diapedéza).</li></ul>"
},
{
  id: "marginacia", et: "lat. <i>margo</i> „okraj“",
  img: {
    src: "assets/images/neutrophil-margination-extravasation.jpg",
    alt: "Marginácia a extravazácia neutrofilov pri akútnom zápale (H&E).",
    caption: "Marginácia a extravazácia neutrofilov pri akútnom zápale (H&E).",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Margination_of_neutrophils.jpg"
  },
  title: "Marginácia a rolling",
  match: ["marginác\\w*", "rolling", "pavimentáci\\w*"],
  short: "Leukocyty sa po spomalení toku presunú k stene cievy a začnú sa po nej prevaľovať.",
  body: "<p class=\"chain\">stáza → marginácia → rolling (selektíny) → pevná adhézia (integríny) → diapedéza</p><p class=\"why\"><b>Prečo to je dôležité.</b> Každý krok má vlastný ovládač — preto sa dá zápal zacieliť.</p>"
},
{
  id: "diapedeza", et: "gr. <i>dia</i> „cez“ + <i>pedan</i> „skákať, vyskočiť“; transmigrácia: lat. <i>trans</i> „cez“ + <i>migrare</i> „sťahovať sa“",
  title: "Diapedéza (transmigrácia)",
  match: ["diapedéz\\w*", "transmigrác\\w*"],
  short: "Prechod leukocytu cez cievnu stenu von z cievy — najčastejšie medzi bunkami postkapilárnej venuly.",
  body:
    '<p class="chain">pevne naviazaný leukocyt → <b>preplazí sa medzi endotelovými bunkami</b> (molekuly ako PECAM-1) → prekoná bazálnu membránu natrávením kolagenázou → je v tkanive</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez tohto kroku by zápalové bunky zostali v cieve a nedosiahli ložisko.</p>'
},
{
  id: "chemotaxia", et: "gr. <i>chemeia</i> „chémia“ + <i>taxis</i> „usporiadanie, smerovanie“",
  title: "Chemotaxia",
  match: ["chemotaxi\\w*", "chemoatraktant\\w*"],
  short: "Riadený pohyb leukocytu podľa stúpajúcej koncentrácie chemických signálov až k ložisku.",
  body:
    "<ul>" +
      "<li><b>Signály</b> — bakteriálne produkty, zložka komplementu C5a, leukotrién B₄, chemokíny (napr. IL-8).</li>" +
      "<li><b>Mechanizmus</b> — receptory na leukocyte → prestavba cytoskeletu → pohyb v smere gradientu.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vďaka gradientu dorazia bunky presne na miesto poškodenia, nie do celého tkaniva.</p>'
},
{
  id: "neutrofil", et: "lat. <i>neuter</i> „ani jeden“ + gr. <i>philos</i> „milujúci“ (farbí sa neutrálnymi farbivami)",
  img: {
    src: "assets/images/neutrophil-blood-smear.jpg",
    alt: "Neutrofil v nátere periférnej krvi: segmentované jadro, bledá cytoplazma.",
    caption: "Neutrofil v nátere periférnej krvi: segmentované jadro, bledá cytoplazma.",
    credit: "hematologist, upravil patient-doc · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Neutrophil_in_a_blood_smear.jpg"
  },
  title: "Neutrofil",
  match: ["neutrofil\\w*", "myeloperoxidáz\\w*"],
  short: "Prvý a najpočetnejší leukocyt akútneho zápalu — fagocytuje baktérie a sám hynie.",
  body:
    "<ul>" +
      "<li><b>Príchod</b> — v prvých hodinách; potom ich nahrádzajú makrofágy.</li>" +
      "<li><b>Zbrane</b> — fagocytóza, ROS, proteázy, NET.</li>" +
      "<li><b>Osud</b> — po splnení úlohy hynie; jeho zvyšky tvoria väčšinu hnisu.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vlastné enzýmy neutrofilov poškodzujú aj okolité tkanivo, preto je hnisavý zápal často <b>deštruktívny</b>.</p>'
},
{
  id: "makrofag-patola", et: "gr. <i>makros</i> „veľký“ + <i>phagein</i> „jesť“",
  img: {
    src: "assets/images/mi-healing-1-macrophages.jpg",
    alt: "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    caption: "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    credit: "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_macrophages_and_lymphocyte_infiltration_with_early_removal_of_necrotic_debris_in_myocardial_infarction.jpg"
  },
  title: "Makrofág",
  match: ["makrofág\\w*", "histiocyt\\w*"],
  short: "Fagocyt tkaniva — pohltí, prezentuje antigén a riadi hojenie.",
  body:
    '<p class="chain">monocyt z krvi → v tkanive <b>makrofág</b> → fagocytuje → uvoľní cytokíny → <b>rozbehne hojenie</b> (granulačné tkanivo)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na rozdiel od neutrofilov <b>prežije</b> a pri chronickom zápale sa stáva hlavnou bunkou — tvorí granulóm.</p>'
},
{
  id: "plazmocyt", et: "gr. <i>plasma</i> „utvorené“ + <i>kytos</i> „bunka“",
  title: "Plazmocyt",
  match: ["plazmocyt(?!óm)\\w*"],
  img: {
    src: "assets/images/plasma-cells-endometrium.jpg",
    alt: "Plazmocyty v zápalovom infiltráte (H&E).",
    caption: "Plazmocyty v zápalovom infiltráte (H&E).",
    credit: "Tissuepathology · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Endometrium_PlasmaCells_20x2.JPG"
  },
  short: "Bunka, ktorá vznikne z B-lymfocytu a vyrába protilátky.",
  body: "<ul><li>Chromatín jadra pripomína ciferník hodín.</li><li>V kostnej dreni žije dlho a vyrába protilátky.</li><li>Nádorom z plazmocytov je myelóm.</li></ul><ul><li>Pod mikroskopom má excentrické jadro a výraznú cytoplazmu.</li><li>Pri veľkom zhluku protilátok vznikajú Russellove telieska.</li></ul>"
},
{
  id: "lymfocyt", et: "lat. <i>lympha</i> „čistá voda“ + gr. <i>kytos</i> „bunka“",
  title: "Lymfocyt",
  match: ["lymfocyt\\w*", "nehnisav\\w*"],
  short: "Bunka špecifickej imunity: rozpoznáva antigény a riadi alebo vykonáva imunitnú odpoveď.",
  body: "<ul><li>Delia sa na B- a T-lymfocyty.</li><li>Lymfocytový infiltrát ukazuje skôr na vírusovú infekciu alebo imunitnú reakciu (autoimunita, rejekcia) než na bežnú bakteriálnu.</li></ul>"
},
{
  id: "b-lymfocyt", et: "B z lat. <i>bursa Fabricii</i> (vtáčí orgán dozrievania)",
  title: "B-lymfocyt",
  match: ["B-lymfocyt\\w*", "B\\s+lymfocyt\\w*"],
  short: "Lymfocyt, ktorý po stretnutí s antigénom dozrie na plazmocyt a vyrába protilátky.",
  body: "<ul><li>Dozrieva v kostnej dreni; nesie na povrchu receptor tvorený protilátkou.</li><li>V zárodočných centrách lymfatických folikulov zdokonaľuje protilátku a mení jej triedu.</li><li>Prezentuje antigén T-lymfocytom.</li></ul><p class=\"chain\">antigén → B-lymfocyt → plazmocyt → protilátky (imunoglobulíny)</p>"
},
{
  id: "t-lymfocyt", et: "T = týmus (v ňom lymfocyty dozrievajú)",
  title: "T-lymfocyt",
  match: ["T-lymfocyt\\w*", "T\\s+lymfocyt\\w*"],
  short: "Lymfocyt zrelý v týmuse: pomocné T-lymfocyty riadia odpoveď cytokínmi, cytotoxické ničia infikované bunky.",
  body: "<ul><li>Rozpoznáva peptid prezentovaný na molekule HLA.</li><li>Pamäťové T-lymfocyty zabezpečia rýchlejšiu odpoveď pri ďalšom stretnutí.</li><li>Regulačné T-lymfocyty imunitu tlmia.</li></ul><ul><li>CD4⁺ — pomocné; CD8⁺ — cytotoxické.</li><li>Zápal s T-lymfocytmi je typický pre bunkovú imunitu a granulómy.</li></ul>"
},
{
  id: "eozinofil", et: "gr. <i>eos</i> „zora“ (ružovočervená farba eozínu) + <i>philos</i> „milujúci“",
  img: {
    src: "assets/images/eosinophils-blood-smear.jpg",
    alt: "Eozinofily v nátere periférnej krvi: červenooranžové granuly.",
    caption: "Eozinofily v nátere periférnej krvi: červenooranžové granuly.",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Eosinophils_in_Peripheral_Blood_Smear_(4746281402).jpg"
  },
  title: "Eozinofil",
  /* len podstatné meno (bunka); prídavné meno „eozinofilná“ = farbí sa eozínom → heslo he-farbenie */
  match: ["eozinofil", "eozinofily", "eozinofilov", "eozinofilmi", "eozinofilom", "eozinofiloch", "eozinofilné\\s+granulocyt\\w*"],
  short: "Granulocyt s ružovými granulami — typický pri alergii a parazitárnych infekciách.",
  body:
    '<p class="chain">IL-5 → <b>eozinofily</b> → granuly s toxickými bielkovinami → zabíjajú parazity; pri alergii poškodzujú aj tkanivo</p>' +
    '<p class="why"><b>Pozor na slovo.</b> „Eozinofilná cytoplazma“ neznamená eozinofily — znamená, že sa tkanivo farbí eozínom do ružova.</p>'
},
{
  id: "fibrin", et: "lat. <i>fibra</i> „vlákno“",
  title: "Fibrín",
  match: ["fibrín(?!ogén)\\w*"],
  img: {
    "src": "assets/images/fibrinous-pericarditis.jpg",
    "alt": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "caption": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "credit": "K. Bielnik a kol. · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pericarditis_fibrinosa.jpg"
  },
  short: "Nerozpustné vlákna, ktoré vzniknú z fibrinogénu účinkom trombínu a zachytávajú a spevňujú exsudát alebo trombus.",
  body: "<p class=\"chain\">↑ priepustnosť → únik fibrinogénu → trombín → fibrín → siete vlákien</p><ul><li>Odstránenie: fibrinolýza (plazmín) a makrofágy.</li><li>Ak sa neodstráni, organizuje sa granulačným tkanivom → zrasty (adhézie).</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Fibrín obmedzuje šírenie infekcie, ale spôsobuje zrasty (napr. na perikarde alebo pobrušnici).</p>"
},
{
  id: "fibrinogen", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>-genes</i> „tvoriaci“",
  title: "Fibrinogén",
  match: ["fibrinogén\\w*"],
  short: "Rozpustná bielkovina plazmy tvorená v pečeni; trombín ju premení na fibrín.",
  body: "<ul><li>Veľká rozpustná bielkovina (≈ 340 kDa).</li><li>Trombín z neho odštiepi fibrinopeptidy a vznikne monomér fibrínu.</li><li>Jeho hladina rastie pri zápale, tehotenstve a nádore.</li></ul><ul><li>Je reaktant akútnej fázy — v zápale jeho hladina rastie (podnet: IL-6).</li><li>Cez zvýšený fibrinogén sa urýchľuje sedimentácia erytrocytov.</li></ul>"
},
{
  id: "fibrinozny-zapal",
  title: "Fibrinózny zápal",
  match: ["fibrinózn\\w*(?:\\s+zápal\\w*)?", "serofibrinózn\\w*"],
  img: {
    "src": "assets/images/fibrinous-pericarditis.jpg",
    "alt": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "caption": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "credit": "K. Bielnik a kol. · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pericarditis_fibrinosa.jpg"
  },
  short: "Zápal, pri ktorom v exsudáte prevláda fibrín — na seróznych blanách vytvára sivobiely povlak.",
  body: "<ul><li>Vzniká pri veľmi vysokej priepustnosti ciev, keď cez stenu prejde aj fibrinogén.</li><li>Fibrín tvorí sivobiely povlak; pri perikarditíde pripomína „chlieb s maslom“.</li><li>Povlak sa vyčistí fibrinolýzou, alebo ho organizuje granulačné tkanivo (zrasty).</li></ul><ul><li>Typicky perikard, pleura, pobrušnica.</li><li>Po vyhojení môžu ostať zrasty.</li></ul>"
},
{
  id: "bakterialne-enzymy",
  title: "Enzýmy šírenia baktérií",
  match: ["enzým\\w*\\s+šírenia"],
  short: "Baktérie majú enzýmy, ktoré rozhodujú, či sa infekcia ohraničí (absces), alebo rozšíri (flegmóna).",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Ten istý zápal skončí ohraničený, alebo difúzny podľa toho, aký enzým má pôvodca.</p>"
},
{
  id: "koagulaza", et: "lat. <i>coagulare</i> „zrážať“",
  title: "Koagulázy",
  match: ["koaguláz\\w*"],
  short: "Enzým stafylokoka, ktorý zrážaním fibrínu vytvára bariéru okolo ložiska.",
  body: "<ul><li>Je diagnostický znak Staphylococcus aureus (koagulázový test).</li><li>Fibrínová bariéra drží hnisavé ložisko pokope.</li></ul><p class=\"chain\">stafylokok → koagulázy → fibrín okolo ložiska → ohraničený absces</p>"
},
{
  id: "fibrinolyzin", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>lysis</i> „rozpúšťanie“",
  title: "Fibrinolyzín",
  match: ["fibrinolyzín\\w*"],
  short: "Enzým streptokoka, ktorý rozpúšťa fibrín, takže infekcia nie je ohraničená.",
  body: "<ul><li>Streptokok ním rozpúšťa fibrínovú bariéru, ktorú telo okolo ložiska vytvorí.</li><li>Podobne pôsobí streptokináza, ktorá sa dlho používala na rozpúšťanie trombov.</li></ul><ul><li>Rozpúšťa bariéru z fibrínu → šírenie tkanivom.</li></ul>"
},
{
  id: "hyaluronidaza", et: "gr. <i>hyalos</i> „sklo“ + uronová kyselina + <i>-áza</i>",
  title: "Hyaluronidáza",
  match: ["hyaluronidáz\\w*"],
  short: "Enzým, ktorý štiepi kyselinu hyalurónovú v medzibunkovej hmote a uľahčuje šírenie baktérií.",
  body: "<ul><li>Kyselina hyalurónová je „lepidlo“ medzibunkovej hmoty väziva.</li><li>Enzým sa nazýva aj šíriaci faktor — uľahčuje prienik baktérií tkanivom.</li></ul><ul><li>Spolu s fibrinolyzínom dáva difúzny hnisavý zápal (flegmónu).</li></ul>"
},
{
  id: "pyogenne-bakterie", et: "gr. <i>pyon</i> „hnis“ + <i>-genes</i> „tvoriaci“; baktéria: gr. <i>bakterion</i> „paličká“",
  title: "Pyogénne baktérie",
  match: ["pyogénn\\w*\\s+baktéri\\w*", "stafylokok\\w*", "streptokok\\w*"],
  short: "Baktérie, ktoré vyvolávajú hnisavý zápal — najmä stafylokoky a streptokoky.",
  body:
    '<p class="chain">baktérie → produkty a enzýmy → <b>silná chemotaxia neutrofilov</b> → rozpad neutrofilov + kolikvačná nekróza → <b>hnis</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pôvodca a jeho enzýmy rozhodujú o tvare hnisavého zápalu.</p>'
},
{
  id: "hnis",
  title: "Hnis",
  match: ["hnis", "hnisu", "hnisom", "hnisy", "hnisov\\w*", "hnisav\\w*", "purulentn\\w*", "supuratívn\\w*"],
  short: "Žltobiela kašovitá hmota — neutrofily (živé aj mŕtve), tkanivový detritus, bielkoviny a baktérie.",
  body:
    '<p class="chain">baktérie → neutrofily → <b>rozpad neutrofilov</b> (uvoľnené hydrolázy skvapalnia tkanivo) → tekutý hnis</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Žltá farba pochádza z lipidov rozpadnutých membrán zaniknutých neutrofilov.</p>',
  img: {
    src: "assets/images/fibrinopurulent-peritonitis.jpg",
    alt: "Fibrinózno-hnisavá peritonitída.",
    caption: "Neutrofily a fibrín na pobrušnici.",
    credit: "CoRus13 · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Acute_fibrinopurulent_peritonitis,_high_mag.jpg"
  }
},
{
  id: "absces", et: "lat. <i>abscessus</i> „odchod, odlúčenie“ (<i>abs-</i> „od“ + <i>cedere</i> „ísť“)",
  title: "Absces",
  match: ["absces\\w*"],
  short: "Ohraničené ložisko hnisu s centrálnou kolikvačnou nekrózou.",
  body:
    '<p class="chain">stafylokok + <b>koagulázy</b> → fibrínová bariéra okolo ložiska → hnis sa <b>ohraničí</b> → neskôr <b>pyogénna membrána</b> (granulačné tkanivo)</p>' +
    "<ul>" +
      "<li><b>Akútny</b> — bez vlastnej steny, nepravidelný tvar.</li>" +
      "<li><b>Chronický</b> — s pyogénnou membránou, guľovitý, ostro ohraničený.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Antibiotiká do centra nepreniknú, preto je kľúčom <b>chirurgická drenáž</b> („ubi pus, ibi evacua“).</p>',
  img: {
    src: "assets/images/abscess-histology.jpg",
    alt: "Absces — hustý infiltrát neutrofilov.",
    caption: "Hnis pod mikroskopom: masa neutrofilov.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_abscess.jpg"
  }
},
{
  id: "flegmona", et: "gr. <i>phlegmone</i> „zápal, horenie“ (<i>phlegein</i> „horieť“)",
  title: "Flegmóna",
  match: ["flegmón\\w*"],
  short: "Neohraničený, difúzne sa šíriaci hnisavý zápal v intersticiu.",
  body:
    '<p class="chain">baktérie s <b>fibrinolyzínom a hyaluronidázou</b> → rozpúšťajú fibrín a medzibunkovú hmotu → hnis sa šíri po vrstvách väziva bez hraníc</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez bariéry sa infekcia šíri rýchlo a môže viesť k <b>sepse</b>.</p>'
},
{
  id: "empyem", et: "gr. <i>en</i> „v“ + <i>pyon</i> „hnis“",
  title: "Empyém",
  match: ["empyém\\w*"],
  img: {
    src: "assets/images/pleural-empyema-gross.jpg",
    alt: "Empyém pleury: hnis uzavretý medzi listami pohrudnice.",
    caption: "Empyém pleury: hnis uzavretý medzi listami pohrudnice.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Empyema_(3786798734).jpg"
  },
  short: "Nahromadenie hnisu v už existujúcej dutine (pohrudnica, žlčník, perikard).",
  body: "<ul><li>Typické miesta: pohrudnicová dutina, žlčník, osrdcovník, kĺb.</li><li>Vzniká šírením hnisavého zápalu z okolia (napr. zo zápalu pľúc).</li><li>Pri empyéme dutina nemá vlastný odtok, preto ho treba vytvoriť drenážou.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Hnis v dutine sa nevstrebe, preto treba <b>odvodnenie</b>.</p>"
},
{
  id: "pyogenna-membrana", et: "gr. <i>pyon</i> „hnis“ + <i>-genes</i> „tvoriaci“; lat. <i>membrana</i> „blana“",
  img: {
    src: "assets/images/abscess-histology.jpg",
    alt: "Absces: hustý infiltrát neutrofilov a nekrotický detritus.",
    caption: "Absces: hustý infiltrát neutrofilov a nekrotický detritus.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_abscess.jpg"
  },
  title: "Pyogénna membrána",
  match: ["pyogénn\\w*\\s+membrán\\w*"],
  short: "Stena chronického abscesu — granulačné tkanivo s makrofágmi, ktoré ho ohraničuje.",
  body:
    '<p class="chain">absces pretrváva → okolo vzniká <b>granulačné tkanivo</b> → vytvára stenu → produkuje hnis a zároveň ohraničuje</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Po drenáži sa dutina musí zahojiť zvnútra; inak sa absces vráti.</p>'
},
{
  id: "furunkul", et: "lat. <i>furunculus</i> „vred“ (doslova „zlodejíček“)",
  img: {
    src: "assets/images/furuncle.jpg",
    alt: "Furunkul: hnisavý zápal ústia vlasového folikulu.",
    caption: "Furunkul: hnisavý zápal ústia vlasového folikulu.",
    credit: "El Pantera · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Furuncle-MIN-IMG_2577.jpg"
  },
  title: "Furunkul",
  match: ["furunkul\\w*"],
  short: "Hnisavý zápal vlasového folikulu a okolia — jeden absces v koži.",
  body: "<ul><li>Vzniká vo vlasovom folikule: hnisavé jadro (zátka) sa postupne odlúči.</li><li>Rizikové je nosičstvo stafylokoka a cukrovka.</li></ul><ul><li>Pôvodca je najčastejšie stafylokok.</li><li>Hnisavé jadro sa spontánne odlúči, často sa prediera von.</li></ul>"
},
{
  id: "karbunkul", et: "lat. <i>carbunculus</i> „uhlíček“ (<i>carbo</i> „uhlie“)",
  img: {
    src: "assets/images/carbuncle.jpg",
    alt: "Karbunkul: zhluk furunkulov s viacerými hnisavými hlavičkami.",
    caption: "Karbunkul: zhluk furunkulov s viacerými hnisavými hlavičkami.",
    credit: "Medicalpal · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Carbuncle.jpg"
  },
  title: "Karbunkul",
  match: ["karbunkul\\w*"],
  short: "Splynutie viacerých furunklov s viacerými ústiami; šíri sa hlbšie.",
  body: "<ul><li>Viac furunklov sa spojí do spoločného hnisavého ložiska s viacerými ústiami.</li><li>Býva sprevádzaný horúčkou a celkovými príznakmi.</li></ul><ul><li>Častejší na šiji a chrbte, závažnejší než furunkul.</li></ul>"
},
{
  id: "pyosalpinx", et: "gr. <i>pyon</i> „hnis“ + <i>salpinx</i> „trúbka“ (vajíčkovod)",
  title: "Pyosalpinx",
  match: ["pyosalpinx"],
  short: "Hnis vo vajíčkovode — empyém vajíčkovodu.",
  body: "<ul><li>Baktérie (napr. chlamýdie, gonokok) zalepia ústie vajíčkovodu a hnis sa zhromaždí v jeho dutine.</li><li>Zrasty po zápale môžu viesť k neplodnosti a mimomaternicovej gravidite.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Klasický príklad hnisavého zápalu <b>v dutom orgáne</b> so zabráneným odtokom.</p>"
},
{
  id: "pseudoabsces", et: "gr. <i>pseudes</i> „nepravý, falošný“ + lat. <i>abscessus</i> „odlúčenie“",
  title: "Pseudoabsces",
  match: ["pseudoabsces\\w*"],
  short: "Nahromadenie hnisu v už predtým existujúcej dutine, nie v novovytvorenej nekróze.",
  body: "<ul><li>Typicky v prieduškách a vo vajíčkovode (existujúci dutý orgán).</li><li>Rozdiel od abscesu: stena nie je novovytvorená.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Nemá vlastnú stenu; využíva vrodenú dutinu orgánu, preto ho treba odlíšiť od pravého abscesu.</p>"
},
{
  id: "lymfangitida", et: "lat. <i>lympha</i> „čistá voda“ + gr. <i>angeion</i> „cieva“ + <i>-itis</i> „zápal“",
  title: "Lymfangitída",
  match: ["lymfangitíd\\w*"],
  short: "Zápal lymfatickej cievy — na koži červený pruh smerom k uzline.",
  body: "<ul><li>Šíri sa z infikovanej rany (stafylokok, streptokok) lymfatickou cievou.</li><li>Regionálna uzlina sa zväčší a zapáli (lymfadenitída).</li></ul><ul><li>Infekcia sa šíri lymfou k regionálnej uzline.</li></ul>"
},
{
  id: "flebitida", et: "gr. <i>phleps, phlebos</i> „žila“ + <i>-itis</i> „zápal“",
  title: "Flebitída",
  match: ["flebitíd\\w*", "tromboflebitíd\\w*"],
  short: "Zápal žily; môže viesť k trombóze.",
  body: "<ul><li>Žila je červená, tuhá a bolestivá.</li><li>Zápal povrchovej žily s trombom sa označuje ako tromboflebitída.</li></ul><ul><li>Pri infekcii sa môže šíriť krvou.</li></ul>"
},
{
  id: "pyemia", et: "gr. <i>pyon</i> „hnis“ + <i>haima</i> „krv“",
  title: "Pyémia",
  match: ["pyémi\\w*"],
  short: "Infikované tromby sa odlomia a rozsejú hnis do orgánov — septické infarkty a abscesy.",
  body: "<ul><li>Zdrojom je septický trombus (infikovaná chlopňa, žila).</li><li>Postihnuté bývajú pľúca, obličky, mozog a pečeň.</li><li>Vznikajú mnohopočetné drobné abscesy a septické infarkty.</li></ul><ul><li>Je to šírenie hnisavého zápalu krvou cez infikovaný trombus.</li></ul>"
},
{
  id: "zaskrt", et: "diftéria: gr. <i>diphthera</i> „koža, vyčinená blana“ (podľa blán v hrdle)",
  img: {
    src: "assets/images/diphtheria-pseudomembrane.jpg",
    alt: "Záškrt: špinavobiela pseudomembrána na mandli.",
    caption: "Záškrt: špinavobiela pseudomembrána na mandli.",
    credit: "Dileepunnikri · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Dirty_white_pseudomembrane_classically_seen_in_diphtheria_2013-07-06_11-07.jpg"
  },
  title: "Záškrt (diftéria)",
  match: ["záškrt\\w*", "diftéri\\w*", "diphtheriae"],
  short: "Infekcia Corynebacterium diphtheriae: baktéria ostáva v hltane, no jej toxín krvou poškodí srdce a nervy.",
  body: "<ul><li><b>Hltan:</b> nekróza sliznice + fibrín → sivá, pevne prisadnutá pablana (difterický typ zápalu); pri strhnutí krváca.</li><li><b>Dýchacie cesty:</b> opuch krku a pablana môžu upchať dýchacie cesty.</li><li><b>Vzdialené orgány:</b> toxín postihne srdce a nervy.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Choroba je dielom toxínu, nie baktérie v orgáne — preto baktéria v srdci chýba, no srdce je poškodené.</p>"
},
{
  id: "difteria-toxin",
  title: "Difterický toxín",
  match: ["difterick\\w*\\s+toxín\\w*"],
  short: "Enzým, ktorý zastaví tvorbu bielkovín v bunke a tá odumrie.",
  body: "<p class=\"chain\">baktéria s génom tox (z bakteriofága) → toxín do krvi → podjednotka B sa naviaže na receptor → podjednotka A vstúpi do cytoplazmy → ADP-ribozylácia EF-2 → zastaví sa proteosyntéza → bunka degeneruje a odumrie</p><p class=\"why\"><b>Prečo to je dôležité.</b> Toxín je enzým, nespotrebuje sa, preto zasiahne aj málo molekúl vo veľa bunkách.</p>"
},
{
  id: "difteria-myokarditida",
  title: "Difterická myokarditída",
  match: ["difterick\\w*\\s+myokardit\\w*"],
  short: "Poškodenie srdcového svalu toxínom, typicky v 2. týždni choroby.",
  body: "<ul><li>Kardiomyocyty s tukovou degeneráciou a ložiskovými nekrózami, riedky zápalový infiltrát (baktéria v srdci nie je).</li><li>Neskôr fibróza.</li><li>Klinicky: blokády vedenia, arytmie, zlyhanie srdca, náhla smrť; ↑ troponín, zmeny EKG.</li></ul>"
},
{
  id: "difteria-neuropatia",
  title: "Difterická neuropatia",
  match: ["difterick\\w*\\s+neuropati\\w*"],
  short: "Poškodenie periférnych nervov toxínom: rozpad myelínu vedie k obrnám (napr. mäkkého podnebia).",
  body: "<ul><li>Toxín poškodzuje Schwannove bunky (demyelinizácia).</li><li>Prvá býva obrna mäkkého podnebia, neskôr poruchy očných svalov a polyneuropatia.</li></ul><ul><li>Prejaví sa s oneskorením týždňov po infekcii.</li></ul>"
},
{
  id: "pablana", et: "pseudomembrána: gr. <i>pseudes</i> „nepravý“ + lat. <i>membrana</i> „blana“",
  title: "Pablana (pseudomembrána)",
  match: ["pablan\\w*", "pseudomembrán\\w*", "pseudomembranózn\\w*"],
  short: "Povlak na sliznici z fibrínu, odumretých epitelových buniek a neutrofilov.",
  body:
    '<div class="fork">' +
      "<div><b>Krupózny</b><br>povrchový, ľahko sa odlupuje<br>dýchacie cesty</div>" +
      "<div><b>Difterický</b><br>hlbšia nekróza, pevne prisadnutý<br>hltan, črevo</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Nekróza sliznice + fibrín tvoria membránu, ktorá môže <b>upchať dýchacie cesty</b> (záškrt).</p>',
  img: {
    src: "assets/images/pseudomembranous-colitis.jpg",
    alt: "Pseudomembranózna kolitída.",
    caption: "Žltozelené pablany pokrývajúce sliznicu čreva.",
    credit: "Narraburra · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Clostridioides_(pseudomembranous)_colitis.jpg"
  }
},
{
  id: "katar", et: "gr. <i>katarrhein</i> „stekať dolu“ (<i>kata</i> „dolu“ + <i>rhein</i> „tiecť“)",
  title: "Katarálny zápal (katar)",
  match: ["katar\\w*"],
  short: "Zápal sliznice so zvýšenou tvorbou hlienu.",
  body: "<ul><li>Podoby: serózny, hlienový a hnisavý.</li><li>Chronický katar vedie k atrofii alebo hyperplázii sliznice.</li></ul><p class=\"chain\">zápal sliznice → ↑ sekrécia hlienu (serózny → hlienový) → <b>hlienový povlak</b> na povrchu</p><p class=\"why\"><b>Prečo to je dôležité.</b> Ide o povrchový zápal bez hlbšej nekrózy, ktorý sa zvyčajne úplne zahojí.</p>"
},
{
  id: "ulceracia", et: "lat. <i>ulcus, ulceris</i> „vred“",
  title: "Ulcerácia (vred)",
  match: ["ulcerác\\w*", "exulcerác\\w*", "vred\\w*"],
  short: "Defekt sliznice alebo kože po odlúčení nekrotického tkaniva.",
  body: "<ul><li>Erózia zasahuje len epitel, vred hlbšie (až do svaloviny a ďalej).</li><li>Typické miesta: žalúdok, dvanástnik, koža predkolenia.</li></ul><p class=\"chain\">nekróza povrchu → odlúčenie mŕtveho tkaniva → <b>defekt</b> so spodinou z granulačného tkaniva → hojenie alebo chronicita</p>"
},
{
  id: "zrasty", et: "adhézia: lat. <i>adhaerere</i> „lipnúť“; synechia: gr. <i>synecheia</i> „súvislosť“ (<i>syn</i> „spolu“ + <i>echein</i> „držať“)",
  img: {
    src: "assets/images/peritoneal-adhesions.jpg",
    alt: "Zrasty po apendektómii: väzivové pruhy v dutine brušnej.",
    caption: "Zrasty po apendektómii: väzivové pruhy v dutine brušnej.",
    credit: "Hic et nunc · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Adhesions.jpg"
  },
  title: "Zrasty (adhézie, synechie)",
  match: ["zrast\\w*", "synechi\\w*"],
  short: "Väzivové spojenia medzi povrchmi, ktoré vznikli organizáciou fibrínu.",
  body:
    '<p class="chain">fibrínový exsudát sa neodstráni → <b>organizuje sa</b> granulačným tkanivom → jazva spojí dva povrchy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na perikarde môžu obmedziť srdce (konstriktívna perikarditída), v brušnej dutine spôsobiť obštrukciu čreva.</p>'
},
{
  id: "ef2",
  title: "Elongačný faktor 2 (EF-2; angl. elongation factor 2)",
  match: ["elongačn\\w*\\s+faktor\\w*\\s+2", "EF-2", "eEF2"],
  short: "Bielkovina, ktorá pri tvorbe bielkovín posúva ribozóm po mRNA o jeden kodón; bez nej sa proteosyntéza zastaví.",
  body:
    '<p class="chain">ribozóm pripojí aminokyselinu k reťazcu → <b>EF-2</b> (poháňa ho GTP) posunie ribozóm o jeden kodón → voľné miesto pre ďalšiu aminokyselinu → reťazec rastie</p>' +
    '<p class="chain">difterický toxín (podjednotka A) prenesie na EF-2 ADP-ribózu z NAD⁺ → EF-2 nefunguje → ribozómy stoja → bunka netvorí bielkoviny → odumrie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Toxín je enzým – nespotrebuje sa, takže aj malé množstvo vyradí EF-2 v celej bunke. Rovnakým spôsobom pôsobí exotoxín A <i>Pseudomonas aeruginosa</i>.</p>'
},
{
  id: "il-1",
  title: "IL-1 (interleukín 1; angl. interleukin 1)",
  match: ["IL-1[αβ]?(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-1 je poplašný signál makrofágov: zapne endotel a vyvolá horúčku.",
  body:
    '<p class="chain">makrofág rozpozná mikrób alebo zvyšky mŕtvych buniek → <b>IL-1</b> → endotel vystaví adhezívne molekuly (leukocyty sa prichytia) · hypotalamus zvýši nastavenú teplotu (horúčka) · pečeň spolu s IL-6 tvorí bielkoviny akútnej fázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Spolu s TNF-α prepája miestny zápal s celkovou odpoveďou. Blokáda receptora pre IL-1 tlmí horúčkové autoinflamačné choroby – dôkaz, že za horúčku zodpovedá práve on.</p>'
},
{
  id: "il-2",
  title: "IL-2 (interleukín 2; angl. interleukin 2)",
  match: ["IL-2(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-2 je rastový faktor T-lymfocytov.",
  body:
    '<p class="chain">T-lymfocyt rozpozná antigén → tvorí <b>IL-2</b> aj receptor preň → sám seba a susedné T-lymfocyty núti deliť sa → klon buniek proti jednému antigénu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez IL-2 sa odpoveď T-lymfocytov nerozbehne. Lieky po transplantácii (cyklosporín, takrolimus) blokujú jeho tvorbu, a tak bránia odvrhnutiu štepu. IL-2 zároveň udržiava regulačné T-lymfocyty, ktoré imunitu brzdia.</p>'
},
{
  id: "il-4",
  title: "IL-4 (interleukín 4; angl. interleukin 4)",
  match: ["IL-4(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-4 je hlavný signál odpovede typu 2 (alergia, parazity) a prepína makrofágy na hojenie.",
  body:
    '<p class="chain">Th2 lymfocyty, žírne bunky a bazofily → <b>IL-4</b> → B-lymfocyty prepnú na tvorbu IgE · makrofágy sa aktivujú „alternatívne“ (M2) · fibroblasty tvoria viac kolagénu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo alergický zápal sprevádza IgE a eozinofily a prečo dlhotrvajúca odpoveď typu 2 končí fibrózou.</p>'
},
{
  id: "il-6",
  title: "IL-6 (interleukín 6; angl. interleukin 6)",
  match: ["IL-6(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-6 nesie správu o zápale do pečene.",
  body:
    '<p class="chain">makrofágy, endotel a fibroblasty v ložisku → <b>IL-6</b> krvou do pečene → hepatocyty tvoria bielkoviny akútnej fázy: CRP, fibrinogén, sérový amyloid A, hepcidín</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> CRP v krvi je vlastne meranie účinku IL-6. Dlhodobo zvýšený IL-6 vedie cez hepcidín k anémii chronických chorôb a cez sérový amyloid A k AA amyloidóze.</p>'
},
{
  id: "il-8",
  title: "IL-8 (interleukín 8, CXCL8; angl. interleukin 8, C-X-C motif chemokine ligand 8)",
  match: ["IL-8(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-8 je chemokín, ktorý privoláva neutrofily.",
  body:
    '<p class="chain">makrofágy, endotel a epitel v ložisku → <b>IL-8</b> → na povrchu endotelu aktivuje integríny neutrofilu (pevná adhézia) → v tkanive vytvorí spád koncentrácie, po ktorom neutrofil putuje k ložisku</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kde je veľa IL-8, tam je hnis: je to hlavný dôvod, prečo bakteriálny zápal infiltrujú práve neutrofily.</p>'
},
{
  id: "il-10",
  title: "IL-10 (interleukín 10; angl. interleukin 10)",
  match: ["IL-10(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-10 je brzda zápalu.",
  body:
    '<p class="chain">reparačné makrofágy (M2) a regulačné T-lymfocyty → <b>IL-10</b> → makrofágy tvoria menej TNF-α, IL-1 a IL-12 a horšie predvádzajú antigén → zápal utícha</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Patrí k signálom, ktoré zápal aktívne ukončujú. Keď chýba, zápal trvá aj po odstránení príčiny a poškodzuje vlastné tkanivo.</p>'
},
{
  id: "il-12",
  title: "IL-12 (interleukín 12; angl. interleukin 12)",
  match: ["IL-12(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-12 nasmeruje obranu proti mikróbom, ktoré žijú vnútri buniek.",
  body:
    '<p class="chain">makrofág alebo dendritická bunka pohltí mikrób → <b>IL-12</b> → T-lymfocyty dozrejú na Th1 a spolu s NK bunkami tvoria interferón γ → interferón γ zosilní zabíjanie v makrofágoch</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na osi IL-12 → interferón γ stojí granulóm. Ľudia s jej vrodenou poruchou ťažko ochorejú aj na málo virulentné mykobaktérie.</p>'
},
{
  id: "il-13",
  title: "IL-13 (interleukín 13; angl. interleukin 13)",
  match: ["IL-13(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-13 je príbuzný IL-4: odpoveď typu 2, hlien a fibróza.",
  body:
    '<p class="chain">Th2 lymfocyty → <b>IL-13</b> → makrofágy sa aktivujú „alternatívne“ (M2) · epitel dýchacích ciest tvorí viac hlienu · fibroblasty tvoria kolagén</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Spolu s IL-4 vysvetľuje obraz astmy – hlien v prieduškách a postupná prestavba ich steny.</p>'
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "posun-dolava",
  img: {
    src: "assets/images/band-neutrophil-smear.jpg",
    alt: "Tyčovitý neutrofil v nátere periférnej krvi (Wright).",
    caption: "Tyčovitý neutrofil v nátere periférnej krvi (Wright).",
    credit: "Ajay Kumar Chaurasiya · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Band_form_neutrophil_in_Wright_stained_PBS_microscopy.jpg"
  },
  title: "Posun doľava (tyčové neutrofily)",
  match: ["posun\\w*\\s+doľava"],
  short: "Pri prudkej aktivácii kostnej drene sa do krvi dostanú nezrelé neutrofily s tyčovitým jadrom. Ich zvýšený podiel v diferenciálnom krvnom obraze je znakom bakteriálnej infekcie alebo iného silného zápalu."
},
{
  id: "hereditarny-angioedem",
  img: {
    src: "assets/images/hae-swollen-hand.jpg",
    alt: "Opuch ruky počas záchvatu hereditárneho angioedému.",
    caption: "Opuch ruky počas záchvatu hereditárneho angioedému.",
    credit: "LucyHAE · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Swollen_hand_during_a_hereditary_angioedema_attack..jpg"
  },
  title: "Hereditárny angioedém (HAE)",
  match: ["hereditárn\\w*\\s+angioedém\\w*", "HAE"],
  short: "Vrodený nedostatok alebo porucha inhibítora C1: kalikreín nie je brzdený, vzniká nadbytok bradykinínu a ten otvára cievy. Prejaví sa záchvatmi opuchu, ktoré nereagujú na antihistaminiká."
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "apendicitida", et: "lat. <i>appendix</i> „prívesok“ + gr. <i>-itis</i> „zápal“",
  img: {
    src: "assets/images/appendicitis-gross.jpg",
    alt: "Akútna apendicitída: zväčšený, klobásovitý apendix s červenou sliznicou (MA).",
    caption: "Akútna apendicitída: zväčšený, klobásovitý apendix s červenou sliznicou (MA).",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Acute_Appendicitis.jpg"
  },
  title: "Apendicitída",
  match: ["apendicit\\w*"],
  short: "Zápal slepého výbežku. Histologickým kritériom akútnej apendicitídy sú neutrofily vo svalovine steny; podľa postupu sa rozlišuje včasná (katarálna), flegmonózna, gangrenózna a perforovaná forma."
},
{
  id: "bronchopneumonia",
  img: {
    src: "assets/images/bronchopneumonia-gross.jpg",
    alt: "Bronchopneumónia: drobné ostro ohraničené ložiská zhutnenia (MA).",
    caption: "Bronchopneumónia: drobné ostro ohraničené ložiská zhutnenia (MA).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Bronchopneumonia_(5569078316).jpg"
  },
  title: "Bronchopneumónia",
  match: ["bronchopneumón\\w*"],
  short: "Hnisavý zápal pľúc, ktorý začína v prieduškách a šíri sa do okolia po ložiskách. Na reze sú drobné ostro ohraničené ložiská zhutnenia, ktoré môžu splývať alebo abscedovať."
},
{
  id: "pustula", et: "lat. <i>pustula</i> „pľuzgierik, vyrážka“",
  img: {
    src: "assets/images/pustule.jpg",
    alt: "Pustula: drobný hnisavý pľuzgierik v koži.",
    caption: "Pustula: drobný hnisavý pľuzgierik v koži.",
    credit: "Saurabh R. Patil · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:A_pustule.jpg"
  },
  title: "Pustula",
  match: ["pustul\\w*"],
  short: "Drobný hnisavý pľuzgierik v koži: hnis sa nahromadí v epidermis alebo v ústí vlasového folikulu."
}

);

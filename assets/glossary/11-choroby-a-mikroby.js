/* Glosár PATOLY — choroby, syndrómy a mikróby, ktoré texty kap. 0–9 spomínajú bez výkladu.
   Ide o stručné vysvetlivky (čo to je a prečo sa to v kapitole objavuje); jednotlivé choroby majú domov v špeciálnej patológii.
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── tráviaca sústava ────────────────────────────────────────────────── */
{
  id: "achalazia", et: "gr. <i>a-</i> „bez“ + <i>chalasis</i> „uvoľnenie“",
  title: "Achalázia pažeráka",
  match: ["achaláz\\w*"],
  short: "Porucha pažeráka, pri ktorej sa nerozvoľní dolný zvierač a vymizne peristaltika, lebo zaniknú nervové bunky v stene. Pažerák nad zúžením sa rozšíri a jeho svalovina zhrubne."
},
{
  id: "barrett",
  img: {
    src: "assets/images/barrett-alcian-blue.jpg",
    alt: "Barrettov pažerák: pohárikové bunky s hlienom sfarbeným alciánovou modrou.",
    caption: "Barrettov pažerák: pohárikové bunky s hlienom sfarbeným alciánovou modrou.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Barretts_alcian_blue.jpg"
  },
  title: "Barrettov pažerák",
  match: ["Barrettov\\w*(?:\\s+pažerák\\w*)?"],
  short: "Metaplázia dlaždicového epitelu dolného pažeráka na žľazový (intestinálny) pri dlhodobom refluxe žalúdočnej kyseliny. Je prekancerózou adenokarcinómu pažeráka."
},
{
  id: "helicobacter", et: "gr. <i>helix, helikos</i> „závit“ + <i>bakterion</i> „paličká“; <i>pylori</i>: gr. <i>pylouros</i> „vrátnik“",
  title: "Helicobacter pylori",
  match: ["Helicobacter\\w*", "pylori"],
  short: "Špirálovitá baktéria žijúca pod hlienom žalúdka. Vyvoláva chronickú gastritídu, peptický vred a zvyšuje riziko karcinómu a lymfómu žalúdka.",
  body: "<ul><li>Ureáza premení močovinu na amoniak, a tak baktéria prežije v kyseline.</li><li>Dôkaz: ureázový dychový test, histológia, antigén v stolici.</li></ul>"
},
{
  id: "gastritida", et: "gr. <i>gaster, gastros</i> „žalúdok“ + <i>-itis</i> „zápal“",
  title: "Gastritída",
  match: ["gastritíd\\w*"],
  short: "Zápal sliznice žalúdka. Najčastejšie chronický (H. pylori, autoimunitný) alebo akútny pri alkohole, NSAID a strese.",
  body: "<ul><li>Typ A je autoimunitný (telo žalúdka), typ B súvisí s H. pylori (antrum).</li><li>Chronická gastritída → atrofia → metaplázia → dysplázia → karcinóm.</li></ul>"
},
{
  id: "pepticky-vred", et: "gr. <i>peptein</i> „variť, tráviť“",
  title: "Peptický vred",
  match: ["peptick\\w*(?:\\s+vred\\w*)?"],
  short: "Defekt sliznice žalúdka alebo dvanástnika siahajúci až do svaloviny, vyvolaný pôsobením kyseliny a pepsínu pri porušenej obrane sliznice (H. pylori, NSAID).",
  body: "<ul><li>Chronický vred má štyri vrstvy: exsudát, nekróza, granulačné tkanivo, jazva.</li><li>Komplikácie: krvácanie, perforácia, penetrácia, stenóza.</li></ul>"
},
{
  id: "hirschsprung", et: "podľa Haralda Hirschsprunga",
  title: "Hirschsprungova choroba",
  match: ["Hirschsprungov\\w*(?:\\s+choro\\w*)?"],
  short: "Vrodený chýbajúci nervový plexus (aganglióza) v koncovom úseku hrubého čreva, ktorý sa nevie uvoľniť."
},
{
  id: "megakolon", et: "gr. <i>megas</i> „veľký“ + <i>kolon</i>",
  title: "Megakolon",
  match: ["megakolon\\w*"],
  short: "Rozšírenie čreva nad aganglionárnym úsekom, vedie k zápche."
},
{
  id: "polyp", et: "gr. <i>polypous</i> „mnohonožec“ (<i>polys</i> „mnoho“ + <i>pous</i> „noha“)",
  title: "Polyp",
  match: ["polyp\\w*"],
  short: "Výrastok sliznice, ktorý vyčnieva do dutiny orgánu (črevo, žalúdok, maternica, nos). Môže byť zápalový, hyperplastický alebo nádorový (adenóm)."
},
{
  id: "celiakia", et: "gr. <i>koilia</i> „brucho, dutina“",
  title: "Celiakia",
  match: ["celiaki\\w*"],
  short: "Autoimunitná reakcia na lepok (gluten) pri dispozícii HLA-DQ2/DQ8. Poškodzuje klky tenkého čreva (atrofia klkov), čo vedie k malabsorpcii.",
  body: "<ul><li>Dôkaz: protilátky (anti-tTG) a biopsia.</li><li>Histológia: atrofia klkov, hyperplázia krýpt, lymfocyty v epiteli.</li></ul>"
},
{
  id: "ulceroznakolitida", et: "lat. <i>ulcus</i> „vred“ + gr. <i>kolon</i> „hrubé črevo“ + <i>-itis</i>",
  title: "Ulcerózna kolitída",
  match: ["ulceróz\\w*\\s+kolitíd\\w*", "kolitíd\\w*"],
  short: "Chronický zápal sliznice hrubého čreva od konečníka smerom nahor s krvavou hnačkou. Spolu s Crohnovou chorobou patrí medzi nešpecifické črevné zápaly (IBD).",
  body: "<ul><li>Zápal je len v sliznici a podsliznici.</li><li>Vredy a pseudopolypy.</li><li>Zvýšené riziko karcinómu hrubého čreva.</li></ul>"
},
{
  id: "hepatitida", et: "gr. <i>hepar, hepatos</i> „pečeň“ + <i>-itis</i> „zápal“",
  title: "Hepatitída",
  match: ["hepatitíd\\w*"],
  img: {
    "src": "assets/images/acute-hepatitis-histology.jpg",
    "alt": "Akútna hepatitída: rozvrátená stavba lalôčika a zápalový infiltrát.",
    "caption": "Akútna hepatitída: rozvrátená stavba lalôčika a zápalový infiltrát.",
    "credit": "Alexander Boyd, Owen Cain, Abhishek Chauhan, Gwilym James Webb (Frontline Gastroenterology 2020) · CC BY 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_acute_hepatitis.jpg"
  },
  short: "Zápal pečene. Akútny je najčastejšie vírusový (A, B, C), toxický alebo autoimunitný; chronický trvá viac než 6 mesiacov a vedie k fibróze a cirhóze.",
  body: "<ul><li>Vírusy A (fekálno-orálne), B a C (krv).</li><li>Chronická B a C vedú k cirhóze a hepatocelulárnemu karcinómu.</li></ul>"
},
{
  id: "pankreatitida",
  title: "Pankreatitída",
  match: ["pankreatitíd\\w*"],
  short: "Zápal pankreasu: tráviace enzýmy sa aktivujú už v žľaze a rozložia ju (autolýza). Najčastejšie pre žlčové kamene alebo alkohol; môže vyvolať tukovú nekrózu."
},
{
  id: "dysenteria", et: "gr. <i>dys-</i> „zle“ + <i>enteron</i> „črevo“",
  title: "Dyzentéria",
  match: ["dyzentéri\\w*"],
  short: "Zápal hrubého čreva s krvavou a hlienovitou stolicou a kŕčmi (Shigella, Entamoeba). Poškodenie sliznice je povrchové s pablanou."
},
{
  id: "malabsorpcia", et: "lat. <i>malus</i> + <i>absorbere</i>",
  title: "Malabsorpcia",
  match: ["malabsorpci\\w*"],
  short: "Porucha vstrebávania živín.",
  body: "<ul><li>Prejaví sa hnačkou s tukom, chudnutím a nedostatkom vitamínov.</li></ul>"
},
{
  id: "maldigescia", et: "lat. <i>malus</i> + <i>digerere</i>",
  title: "Maldigescia",
  match: ["maldigesci\\w*"],
  short: "Porucha trávenia živín."
},
{
  id: "malnutricia", et: "lat. <i>malus</i> + <i>nutrire</i>",
  title: "Malnutrícia",
  match: ["malnutríci\\w*", "podvýživ\\w*"],
  short: "Nedostatok živín."
},
{
  id: "kwashiorkor", et: "ga (Ghana) „choroba odstaveného dieťaťa“",
  title: "Kwashiorkor",
  match: ["kwashiorkor\\w*"],
  short: "Ťažká forma malnutrície s nedostatkom bielkovín: hypoalbuminémia vyvolá edémy a v pečeni sa hromadí tuk."
},
{
  id: "anorexia", et: "gr. <i>an-</i> + <i>orexis</i> „chuť“",
  title: "Anorexia",
  match: ["anorexi\\w*"],
  short: "Strata chuti do jedla."
},

/* ── obličky, dýchacie a močové cesty ────────────────────────────────── */
{
  id: "hydronefroza", et: "gr. <i>hydor</i> „voda“ + <i>nephros</i> „oblička“ + <i>-osis</i>",
  title: "Hydronefróza",
  match: ["hydronefróz\\w*"],
  short: "Rozšírenie obličkovej panvičky a kalichov zadržaným močom pri prekážke odtoku (kameň, zväčšená prostata). Obličkový parenchým postupne atrofuje."
},
{
  id: "nefroticky-syndrom", et: "gr. <i>nephros</i> „oblička“ + <i>-osis</i>",
  title: "Nefrotický syndróm",
  match: ["nefrotick\\w*(?:\\s+syndróm\\w*)?"],
  short: "Strata veľkého množstva bielkoviny močom (nad 3,5 g/deň) s hypoalbuminémiou a edémami, vyvolaná poškodením filtračnej bariéry glomerulov.",
  body: "<ul><li>Príčiny: minimálne zmeny, fokálna skleróza, membranózna glomerulonefritída, diabetes.</li><li>Komplikácie: hyperlipidémia, trombóza.</li></ul>"
},
{
  id: "nefroskleroza", et: "gr. <i>nephros</i> + <i>sklerosis</i>",
  title: "Nefroskleróza",
  match: ["nefroskleróz\\w*"],
  img: {
    src: "assets/images/arcuate-nephrosclerosis.jpg",
    alt: "Nefroskleróza oblúkovitej tepny: zhrubnutá intima ako cibuľová šupka (H&E).",
    caption: "Nefroskleróza oblúkovitej tepny: zhrubnutá intima ako cibuľová šupka (H&E).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_arcuate_artery_nephrosclerosis,_annotated.jpg"
  },
  short: "Zjazvenie obličkových ciev a glomerulov pri hypertenzii."
},
{
  id: "nefropatia", et: "gr. <i>nephros</i> + <i>pathos</i>",
  title: "Nefropatia",
  match: ["nefropati\\w*"],
  short: "Všeobecný názov pre chorobu obličiek (napr. diabetická nefropatia)."
},
{
  id: "silikoza", et: "lat. <i>silex</i> „kremeň“",
  title: "Silikóza",
  match: ["silikóz\\w*"],
  short: "Pľúcna choroba z vdychovania kremičitého prachu.",
  body: "<ul><li>Makrofágy kremičitý prach pohltia, hynú a vyvolávajú fibrózu so zrnitými uzlíkmi.</li></ul>"
},
{
  id: "pneumokonioza", et: "gr. <i>pneumon</i> + <i>konis</i> „prach“",
  title: "Pneumokonióza",
  match: ["pneumokonióz\\w*"],
  short: "Skupina pľúcnych chorôb z vdychovania minerálneho prachu."
},
{
  id: "schistosomoza", et: "gr. <i>schistos</i> „rozštiepený“ + <i>soma</i> „telo“ (samec má na tele ryhu)",
  title: "Schistosomóza",
  match: ["schistosomóz\\w*", "bilharzióz\\w*"],
  short: "Parazitárna choroba tropických krajín (motolica <i>Schistosoma</i>). Vajíčka vyvolávajú granulómy a fibrózu v močovom mechúre alebo pečeni; močová forma zvyšuje riziko karcinómu."
},
{
  id: "echinokok", et: "gr. <i>echinos</i> „ježko“ + <i>kokkos</i> „zrno“",
  title: "Echinokokóza",
  match: ["echinokok\\w*"],
  short: "Parazitárna cysta pečene alebo pľúc z pásomnice <i>Echinococcus</i>. Cysta má vrstvenú stenu a obsahuje tekutinu so skolexami; prasknutie môže vyvolať anafylaxiu."
},
{
  id: "filarioza", et: "lat. <i>filum</i> „niť“ (<i>filaria</i>)",
  title: "Filarióza",
  match: ["filarióz\\w*"],
  short: "Infekcia vláknitými červami v lymfatických cievach, ktorá blokuje lymfatickú drenáž a vyvolá lymfedém až elefantiázu."
},
{
  id: "helminty", et: "gr. <i>helmins</i> „červ“",
  title: "Helminty (parazitické červy)",
  match: ["helmint\\w*", "parazit\\w*"],
  short: "Parazitické červy (škrkavky, pásomnice, motolice). Vyvolávajú Th2 odpoveď s eozinofilmi a IgE."
},

/* ── srdce a cievy ───────────────────────────────────────────────────── */
{
  id: "angina-pectoris", et: "lat. <i>angina</i> „zovretie hrdla“ (<i>angere</i> „zvierať“) + <i>pectus, pectoris</i> „hruď“",
  title: "Angina pectoris",
  match: ["angin\\w*\\s+pectoris", "Prinzmetalov\\w*"],
  short: "Bolesť na hrudi z prechodnej ischémie myokardu. Stabilná sa objaví pri záťaži, nestabilná je predzvesť infarktu, Prinzmetalova vzniká pri spazme koronárnej tepny."
},
{
  id: "stenoza", et: "gr. <i>stenos</i> „úzky“ + <i>-osis</i>",
  title: "Stenóza",
  match: ["stenóz\\w*", "stenotick\\w*"],
  short: "Zúženie cievy, chlopne alebo dutého orgánu. Prekáža toku krvi alebo obsahu a zaťažuje orgán pred zúžením."
},
{
  id: "dilatacia", et: "lat. <i>dilatare</i> „rozšíriť“",
  title: "Dilatácia",
  match: ["dilatáci\\w*", "dilatačn\\w*"],
  short: "Rozšírenie dutiny (srdca, ciev)."
},
{
  id: "dekompenzacia",
  title: "Dekompenzácia",
  match: ["dekompenzáci\\w*"],
  short: "Zlyhanie kompenzačných mechanizmov, ktoré orgán dovtedy držali v rovnováhe."
},
{
  id: "laplace",
  title: "Laplaceov zákon",
  match: ["Laplaceov\\w*"],
  short: "Napätie steny sa zvyšuje s tlakom a polomerom dutiny a znižuje s hrúbkou steny. Preto srdce zaťažené tlakom zhrubne, aby napätie vyrovnalo."
},
{
  id: "vikarujuca", et: "lat. <i>vicarius</i> „zástupca“ (<i>vicis</i> „striedanie“)",
  title: "Vikarujúca (zástupná) hypertrofia",
  match: ["vikarujúc\\w*\\s+hypertrofi\\w*", "vikarujúc\\w*"],
  short: "Zväčšenie zostávajúceho orgánu po strate druhého (napr. druhej obličky po nefrektómii), ktoré preberá jeho prácu."
},
{
  id: "fallot", et: "gr. <i>tetra</i> „štyri“ + <i>logos</i>",
  title: "Fallotova tetralógia",
  match: ["Fallotov\\w*(?:\\s+tetralógi\\w*)?"],
  short: "Kombinácia štyroch chýb: defekt komorovej priehradky, zúženie výtoku z pravej komory, jazdiaca aorta, hypertrofia pravej komory.",
  body: "<ul><li>Pravo-ľavý skrat dáva cyanózu.</li></ul>"
},
{
  id: "koarktacia", et: "lat. <i>coarctare</i> „stiahnuť“",
  title: "Koarktácia aorty",
  match: ["koarktáci\\w*(?:\\s+aorty)?"],
  short: "Zúženie aorty.",
  body: "<ul><li>Tlak je vysoký na hornej polovici tela a nízky na dolnej.</li></ul>"
},
{
  id: "vrodene-chyby-srdca",
  title: "Vrodené chyby srdca",
  match: ["vrodené\\s+chyby\\s+srdca"],
  short: "Vývojové chyby srdca a veľkých ciev, často so skratom medzi obehmi."
},
{
  id: "skrat", et: "šunt: angl. <i>shunt</i> „odbočka“",
  title: "Skrat (šunt)",
  match: ["skrat(?:u|om|y|ov|e)?", "pravo-ľavý", "ľavo-pravý", "pravo-ľavého", "ľavo-pravého"],
  short: "Abnormálne spojenie medzi dvoma časťami obehu. Ľavo-pravý skrat (krv ide z ľavého do pravého srdca) preťažuje pľúca, pravo-ľavý privádza nekysličenú krv do veľkého obehu (cyanóza)."
},
{
  id: "klaudikacia", et: "lat. <i>claudicatio</i> „krívanie“ (<i>claudus</i> „krivý“); intermitentné: <i>intermittere</i> „prerušiť“",
  title: "Klaudikácie (intermitentné)",
  match: ["klaudikáci\\w*"],
  short: "Bolesť v lýtkach pri chôdzi, ktorá ustúpi v pokoji — príznak zúženia tepien dolných končatín."
},
{
  id: "hypotenzia", et: "gr. <i>hypo</i> + lat. <i>tensio</i>",
  title: "Hypotenzia",
  match: ["hypotenzi\\w*"],
  short: "Znížený tlak krvi."
},
{
  id: "ortostaticka-hypotenzia", et: "gr. <i>orthos</i> „rovný“ + <i>statos</i> „stojaci“",
  title: "Ortostatická hypotenzia",
  match: ["ortostatick\\w*(?:\\s+hypotenzi\\w*)?"],
  short: "Pokles tlaku pri postavení: krv sa nahromadí v nohách a hrozí zomdletie."
},
{
  id: "vazovagalna-synkopa", et: "lat. <i>vas</i> „cieva“ + <i>vagus</i> „blúdiaci“ (blúdivý nerv); gr. <i>synkope</i> „zrútenie“",
  title: "Vazovagálna synkopa",
  match: ["vazovagáln\\w*(?:\\s+synkop\\w*)?", "vasovagal\\w*"],
  short: "Prechodná strata vedomia z reflexného poklesu tlaku a spomalenia srdca po emočnom alebo bolestivom podnete. Mozog dostane na chvíľu málo krvi."
},
{
  id: "alergia", et: "gr. <i>allos</i> + <i>ergon</i>",
  title: "Alergia",
  match: ["alergi\\w*", "alergick\\w*"],
  short: "Neprimeraná odpoveď imunity na neškodnú látku.",
  body: "<ul><li>Typy podľa Gella a Coombsa: I (IgE), II, III, IV.</li><li>Reakcia I. typu: histamín → žihľavka, astma, anafylaxia.</li></ul>"
},
{
  id: "anafylaxia", et: "gr. <i>ana</i> + <i>phylaxis</i>",
  title: "Anafylaxia",
  match: ["anafylax\\w*", "anafylaktick\\w*"],
  short: "Najťažšia forma alergie: IgE aktivuje mastocyty, uvoľní sa histamín, cievy sa rozšíria a tlak klesne.",
  body: "<ul><li>Liečba prvej voľby je adrenalín.</li></ul>"
},
{
  id: "preeklampsia", et: "gr. <i>eklampsis</i>",
  title: "Preeklampsia",
  match: ["preeklamps\\w*"],
  short: "Hypertenzia s proteinúriou v tehotenstve po 20. týždni.",
  body: "<ul><li>Podkladom je porucha placenty a poškodenie endotelu.</li></ul>"
},
{
  id: "eklampsia",
  title: "Eklampsia",
  match: ["eklamps\\w*"],
  short: "Preeklampsia, ku ktorej pribudnú kŕče.",
  body: "<ul><li>Ohrozuje matku (mozgové krvácanie) aj plod.</li><li>Liečba: horčík a ukončenie tehotenstva.</li></ul>"
},
{
  id: "polycytemia", et: "gr. <i>polys</i> + <i>kytos</i> + <i>haima</i>",
  title: "Polycytémia",
  match: ["polycytémi\\w*"],
  short: "Zvýšený počet erytrocytov a hematokritu.",
  body: "<ul><li>Primárna (polycythaemia vera) je nádor kostnej drene, sekundárna je reaktívna pri hypoxii.</li><li>Zvýši viskozitu krvi a riziko trombózy.</li></ul>"
},
{
  id: "polyglobulia",
  title: "Polyglobúlia",
  match: ["polyglobúli\\w*"],
  short: "Zvýšený počet erytrocytov, najmä ako reakcia na hypoxiu.",
  body: "<ul><li>Reaktívna: pri pobyte vo výške, CHOCHP, fajčení.</li><li>Zvyšuje viskozitu krvi.</li></ul>"
},
{
  id: "kosacikovita-anemia", et: "anémia: gr. <i>an-</i> „bez“ + <i>haima</i> „krv“",
  title: "Kosáčikovitá anémia",
  match: ["kosáčikovit\\w*"],
  short: "Dedičná porucha hemoglobínu (HbS): červené krvinky sa pri nízkom kyslíku deformujú do kosáčikov, upchávajú drobné cievy a rýchlo sa rozpadajú (hemolýza).",
  body: "<ul><li>Mutácia v β-globíne (kyselina glutámová → valín).</li><li>Prejavuje sa krízami bolesti, infarktmi sleziny a autosplenektómiou.</li></ul>"
},
{
  id: "leukemia", et: "gr. <i>leukos</i> + <i>haima</i>",
  title: "Leukémia",
  match: ["leukémi\\w*"],
  short: "Zhubný nádor krvotvorných buniek, ktorý sa rozvíja v kostnej dreni a krvi.",
  body: "<ul><li>Akútna a chronická; myeloidná a lymfoidná.</li><li>V dreni blasty vytláčajú normálnu krvotvorbu; v krvi býva leukocytóza.</li></ul>"
},
{
  id: "lymfom", et: "lat. <i>lympha</i> + <i>-oma</i>",
  title: "Lymfóm",
  match: ["lymfóm\\w*", "lymphoma"],
  short: "Zhubný nádor lymfatického tkaniva — v uzlinách a lymfatických orgánoch.",
  body: "<ul><li>Hodgkinov (Reedove–Sternbergove bunky) a nehodgkinovské.</li><li>Typicky bezbolestne zväčšené uzliny.</li></ul>"
},
{
  id: "mds", et: "gr. <i>myelos</i> „dreň“ + <i>dys-</i> „zle“ + <i>plasis</i> „utváranie“",
  title: "Myelodysplastický syndróm",
  match: ["myelodysplastick\\w*(?:\\s+syndróm\\w*)?"],
  short: "Skupina klonových chorôb kostnej drene s neúčinnou krvotvorbou a cytopéniami; časť sa mení na akútnu leukémiu.",
  body: "<ul><li>Poruchy dozrievania v kostnej dreni (dysplázia).</li><li>Zvýšené riziko akútnej myeloidnej leukémie.</li></ul>"
},
{
  id: "splenomegalia", et: "gr. <i>splen</i> + <i>megas</i>",
  title: "Splenomegália",
  match: ["splenomegáli\\w*"],
  short: "Zväčšenie sleziny.",
  body: "<ul><li>Príčiny: portálna hypertenzia, infekcie, hemolýza, leukémie.</li><li>Môže viesť k hypersplenizmu.</li></ul>"
},
{
  id: "hepatomegalia", et: "gr. <i>hepar</i> + <i>megas</i>",
  title: "Hepatomegália",
  match: ["hepatomegáli\\w*", "hepatosplenomegáli\\w*"],
  short: "Zväčšenie pečene.",
  body: "<ul><li>Príčiny: steatóza, kongescia (zlyhanie srdca), hepatitída, nádory.</li><li>Pri cirhóze býva pečeň naopak zmenšená.</li></ul>"
},
{
  id: "hypersplenizmus",
  title: "Hypersplenizmus",
  match: ["hypersplenizm\\w*"],
  short: "Nadmerné zachytávanie krviniek v zväčšenej slezine, ktoré vyvolá cytopénie.",
  body: "<ul><li>Klesne počet erytrocytov, leukocytov aj doštičiek (cytopénie).</li><li>Kostná dreň je kompenzačne bohatá.</li></ul>"
},
{
  id: "antifosfolipidovy-syndrom", et: "fosfolipid: fosfát + gr. <i>lipos</i> „tuk“",
  title: "Antifosfolipidový syndróm",
  match: ["antifosfolipidov\\w*(?:\\s+syndróm\\w*)?"],
  short: "Autoimunitná porucha: protilátky proti fosfolipidovým bielkovinám zvyšujú zrážanie krvi. Prejaví sa opakovanými trombózami a potratmi.",
  body: "<ul><li>Dôkaz: lupusový antikoagulans, antikardiolipínové protilátky, anti-β2-glykoproteín.</li><li>Vyskytuje sa pri SLE alebo samostatne.</li></ul>"
},
{
  id: "glanzmann", et: "trombasténia: gr. <i>thrombos</i> „zrazenina“ + <i>astheneia</i> „slabosť“",
  title: "Glanzmannova trombasténia",
  match: ["Glanzmannov\\w*", "trombasténi\\w*"],
  short: "Vzácna dedičná porucha doštičkového receptora GP IIb/IIIa: doštičky sa nevedia navzájom spájať, čo vedie ku krvácaniu."
},
{
  id: "skorbut-moller",
  title: "Möllerova–Barlowova choroba (detský skorbut)",
  match: ["Möllerov\\w*[–-]Barlowov\\w*"],
  short: "Skorbut u dojčiat: nedostatok vitamínu C poškodí syntézu kolagénu, krehnú cievy a kosti, krvácajú podokosticové a ďasná."
},
{
  id: "vitamin-c", et: "lat. <i>vita</i> + amín; kyselina askorbová",
  title: "Vitamín C",
  match: ["vitamín\\w*\\s+C"],
  short: "Kofaktor enzýmov, ktoré hydroxylujú prolín a lyzín v prokolagéne.",
  body: "<ul><li>Bez neho vzniká skorbut.</li></ul>"
},
{
  id: "hydroxylacia-kolagenu",
  title: "Hydroxylácia kolagénu",
  match: ["hydroxyláci\\w*(?:\\s+kolagén\\w*)?", "prokolagén\\w*"],
  short: "Bez hydroxylácie sa nevytvorí stabilná trojitá špirála kolagénu.",
  body: "<ul><li>Hydroxyprolín stabilizuje špirálu kolagénu.</li><li>Enzýmy potrebujú železo a vitamín C.</li></ul>"
},
{
  id: "hemangiom", et: "gr. <i>haima</i> + <i>angeion</i> + <i>-oma</i>",
  title: "Hemangióm",
  match: ["hemangióm\\w*"],
  short: "Benígny nádor z krvných ciev.",
  body: "<ul><li>Najčastejší nádor detí je kapilárny hemangióm.</li><li>Môže spontánne ustúpiť.</li></ul>"
},
{
  id: "malformacia-ciev", et: "lat. <i>malus</i> + <i>formatio</i>",
  title: "Malformácia ciev",
  match: ["malformáci\\w*(?:\\s+ciev)?"],
  short: "Vývojová chyba cievneho riečiska.",
  body: "<ul><li>Na rozdiel od nádoru nerastie klonálne, rastie spolu s dieťaťom.</li></ul>"
},
{
  id: "teleangiektazia", et: "gr. <i>telos</i> + <i>angeion</i> + <i>ektasis</i>",
  title: "Teleangiektázia",
  match: ["teleangiektázi\\w*"],
  short: "Trvalo rozšírené drobné cievy.",
  body: "<ul><li>Po tlaku vyblednú (na rozdiel od petechií).</li><li>Časté pri cirhóze (pavúčikové névy).</li></ul>"
},

/* ── metabolické, endokrinné a nádorové ──────────────────────────────── */
{
  id: "obezita", et: "lat. <i>obesitas</i> „tučnota“ (<i>obedere</i> „zjesť, ohlodať“)",
  title: "Obezita",
  match: ["obezit\\w*", "obézn\\w*"],
  short: "Nadmerné nahromadenie tuku (BMI nad 30 kg/m²). Zvyšuje riziko diabetu 2. typu, hypertenzie, steatózy pečene, aterosklerózy a nádorov.",
  body: "<ul><li>Viscerálny tuk je rizikovejší než podkožný.</li><li>Súvisí s inzulínovou rezistenciou a steatózou.</li></ul>"
},
{
  id: "hypercholesterolemia",
  title: "Hypercholesterolémia",
  match: ["hypercholesterolémi\\w*"],
  short: "Zvýšený cholesterol v krvi — rizikový faktor aterosklerózy.",
  body: "<ul><li>Extrémne formy sú dedičné (familiárna hypercholesterolémia).</li></ul>"
},
{
  id: "hyperlipoproteinemia",
  title: "Hyperlipoproteinémia",
  match: ["hyperlipoproteinémi\\w*"],
  short: "Zvýšená koncentrácia lipoproteínov v krvi."
},
{
  id: "dyslipidemia",
  title: "Dyslipidémia",
  match: ["dyslipidémi\\w*"],
  short: "Porucha zloženia krvných lipidov (vysoký LDL, nízky HDL, vysoké triacylglyceroly)."
},
{
  id: "lipoproteiny",
  title: "Lipoproteíny",
  match: ["lipoproteín\\w*"],
  short: "Častice, ktoré prenášajú lipidy krvou.",
  body: "<ul><li>Jadro tvoria TAG a estery cholesterolu, obal fosfolipidy a apolipoproteíny.</li><li>Hustota stúpa od chylomikrónov cez VLDL, LDL po HDL.</li></ul>"
},
{
  id: "chylomikron", et: "gr. <i>chylos</i> + <i>mikros</i>",
  title: "Chylomikróny",
  match: ["chylomikrón\\w*"],
  short: "Častice, ktoré nesú tuky z potravy z čreva.",
  body: "<ul><li>Vznikajú v enterocytoch.</li><li>Do krvi sa dostanú cez lymfu (hrudný vývod).</li></ul>"
},
{
  id: "ldl", et: "angl. <i>low-density lipoprotein</i>",
  title: "LDL",
  match: ["LDL"],
  short: "Častica, ktorá nesie cholesterol do tkanív; jeho nadbytok urýchľuje aterosklerózu.",
  body: "<ul><li>Oxidovaný LDL pohltia makrofágy a vznikajú penové bunky.</li><li>Pri defekte pečeňového receptora pre LDL vzniká familiárna hypercholesterolémia.</li></ul>"
},
{
  id: "prediabetes",
  title: "Prediabetes",
  match: ["prediabet\\w*"],
  short: "Zvýšená glykémia, ktorá ešte nedosahuje hranicu diabetu. Je to štádium, v ktorom sa dá zmenou životného štýlu rozvoju diabetu predísť.",
  body: "<ul><li>Glykémia nalačno ≈ 5,6–6,9 mmol/l.</li><li>Inzulínová rezistencia je už prítomná.</li></ul>"
},
{
  id: "retinopatia", et: "lat. <i>rete</i> + gr. <i>pathos</i>",
  title: "Retinopatia",
  match: ["retinopati\\w*"],
  short: "Poškodenie sietnice — typická mikrovaskulárna komplikácia diabetu.",
  body: "<ul><li>Mikroaneuryzmy, krvácania, exsudáty.</li><li>Neovaskularizácia vedie k strate zraku.</li></ul>"
},
{
  id: "neuropatia", et: "gr. <i>neuron</i> + <i>pathos</i>",
  title: "Neuropatia",
  match: ["polyneuropati\\w*", "neuropati\\w*"],
  short: "Poškodenie periférnych nervov — typická mikrovaskulárna komplikácia diabetu.",
  body: "<ul><li>Symetrická, najprv na nohách.</li><li>Strata citlivosti vedie k diabetickej nohe.</li></ul>"
},
{
  id: "hyperurikemia",
  title: "Hyperurikémia",
  match: ["hyperurikémi\\w*"],
  short: "Zvýšená hladina kyseliny močovej v krvi.",
  body: "<ul><li>Z nadbytku sa tvoria kryštály urátu sodného.</li></ul>"
},
{
  id: "dna",
  title: "Dna",
  match: ["dnav\\w*(?:\\s+zápal\\w*)?", "dnavá\\s+artritíd\\w*"],
  short: "Dnavý zápal kĺbov z kryštálov urátu sodného.",
  body: "<ul><li>Kryštály v polarizovanom svetle svietia; z chronických ložísk vznikajú tofy.</li></ul>"
},
{
  id: "mukopolysacharidoza", et: "lat. <i>mucus</i> „hlien“ + gr. <i>polys</i> „mnoho“ + <i>sakcharon</i> „cukor“ + <i>-osis</i>",
  title: "Mukopolysacharidózy (Hurlerova choroba)",
  match: ["Hurlerov\\w*(?:\\s+choro\\w*)?"],
  short: "Lyzozómové choroby z nedostatku enzýmu, ktorý odbúrava glykozaminoglykány. Nahromadený substrát poškodzuje kosti, srdce, rohovku a mozog."
},
{
  id: "gaucher",
  title: "Gaucherova choroba",
  match: ["Gaucherov\\w*(?:\\s+choro\\w*)?", "glukocerebrozidáz\\w*"],
  short: "Lyzozómová choroba z nedostatku glukocerebrozidázy. Makrofágy sa plnia glukocerebrozidom (Gaucherove bunky s vrásčitou cytoplazmou) a zväčšujú pečeň, slezinu a kostnú dreň."
},
{
  id: "prion", et: "angl. <i>proteinaceous infectious particle</i> „bielkovinová infekčná častica“",
  title: "Priónové choroby",
  match: ["prión\\w*(?:\\s+choro\\w*)?", "prionóz\\w*"],
  short: "Smrteľné neurodegeneratívne choroby (Creutzfeldt–Jakob, BSE) z infekčnej, nesprávne poskladanej bielkoviny PrP, ktorá nasilu mení normálne molekuly na svoju formu.",
  body: "<ul><li>Zle poskladaná forma PrP je odolná voči proteázam.</li><li>V mozgu vzniká špongiformná zmena (vakuoly).</li></ul>"
},
{
  id: "alzheimer", et: "podľa Aloisa Alzheimera",
  img: {
    src: "assets/images/alzheimer-plaques.jpg",
    alt: "Amyloidové plaky v mozgovej kôre pri Alzheimerovej chorobe (H&E).",
    caption: "Amyloidové plaky v mozgovej kôre pri Alzheimerovej chorobe (H&E).",
    credit: "Jensflorian · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Amyloid_plaques_alzheimer_disease_HE_stain.jpg"
  },
  title: "Alzheimerova choroba",
  match: ["Alzheimerov\\w*(?:\\s+choro\\w*)?"],
  short: "Neurodegeneratívna choroba: v mozgu sa hromadí amyloid-β (plaky) a tau (neurofibrilárne klbká) a neuróny zanikajú.",
  body: "<ul><li>Je najčastejšia príčina demencie.</li><li>Začína v hipokampe a entorinálnej kôre.</li></ul>"
},
{
  id: "parkinson", et: "podľa Jamesa Parkinsona",
  title: "Parkinsonova choroba",
  match: ["Parkinsonov\\w*(?:\\s+choro\\w*)?"],
  short: "Neurodegeneratívna choroba: hromadí sa α-synukleín (Lewyho telieska) a zanikajú dopamínové neuróny čiernej substancie.",
  body: "<ul><li>Čierna substancia stráca farbu (depigmentácia).</li><li>Príznaky: tremor, rigidita, bradykinéza.</li></ul>"
},
{
  id: "neurodegenerativne-choroby",
  title: "Neurodegeneratívne choroby",
  match: ["neurodegeneratívn\\w*(?:\\s+choro\\w*)?"],
  short: "Choroby, pri ktorých v mozgu postupne zanikajú neuróny a hromadia sa nesprávne poskladané bielkoviny."
},
{
  id: "feochromocytom", et: "gr. <i>phaios</i> „tmavý“ + <i>chroma</i> „farba“ + <i>kytos</i> „bunka“ + <i>-oma</i>",
  title: "Feochromocytóm",
  match: ["feochromocytóm\\w*"],
  short: "Nádor drene nadobličiek, ktorý tvorí adrenalín a noradrenalín. Vyvolá záchvaty hypertenzie, búšenie srdca, potenie a bolesť hlavy."
},
{
  id: "leiomyom", et: "gr. <i>leios</i> „hladký“ + <i>mys</i> + <i>-oma</i>",
  title: "Leiomyóm",
  match: ["leiomyóm\\w*"],
  short: "Benígny nádor z hladkého svalu (maternica).",
  body: "<ul><li>Závislý od estrogénu; rastie v reprodukčnom veku.</li><li>Na reze biely, vírivý.</li><li>Zhubný variant je leiomyosarkóm.</li></ul>"
},
{
  id: "fibroadenom",
  title: "Fibroadenóm",
  match: ["fibroadenóm\\w*"],
  short: "Benígny nádor prsníka z väziva a žľazového epitelu.",
  body: "<ul><li>Najčastejšie u mladých žien.</li><li>Dvojfázový: epitel a stróma.</li><li>Pohyblivý, ohraničený uzol.</li></ul>"
},
{
  id: "adenom", et: "gr. <i>aden</i> + <i>-oma</i>",
  title: "Adenóm",
  match: ["adenóm\\w*"],
  short: "Benígny nádor zo žľazového epitelu; v hrubom čreve môže prejsť na karcinóm.",
  body: "<ul><li>Polyp s dysplastickým epitelom.</li><li>Rozlišujú sa tubulárne, vilózne a tubulovilózne.</li><li>Väčšie a viac vilózne = vyššie riziko karcinómu.</li></ul>"
},
{
  id: "seminom", et: "lat. <i>semen</i> „semeno“ + <i>-oma</i>",
  title: "Seminóm",
  match: ["seminóm\\w*"],
  short: "Zhubný nádor semenníka zo zárodočných buniek.",
  body: "<ul><li>Rovnomerné svetlé bunky, v strome lymfocyty.</li><li>Šíri sa lymfatickými uzlinami.</li><li>Je citlivý na žiarenie.</li></ul>"
},
{
  id: "adenokarcinom", et: "gr. <i>aden</i> + <i>karkinos</i>",
  title: "Adenokarcinóm",
  match: ["adenokarcinóm\\w*"],
  short: "Zhubný nádor zo žľazového epitelu (žalúdok, hrubé črevo, prsník, pľúca).",
  body: "<ul><li>Tvorí žľazovité štruktúry.</li><li>Grading sa určuje podľa tvorby žliaz (diferenciácia).</li></ul>"
},
{
  id: "karcinom", et: "gr. <i>karkinos</i> „rak“ + <i>-oma</i>",
  title: "Karcinóm",
  match: ["karcinóm\\w*", "carcinoma"],
  short: "Zhubný nádor z epitelu; rozlišuje sa in situ (neprerastá bazálnu membránu) a invazívny.",
  body: "<ul><li>Šíri sa lymfou, krvou a priamym prerastaním.</li><li>Rozsah sa určuje stagingom (TNM).</li></ul>"
},
{
  id: "leukoplakia", et: "gr. <i>leukos</i> „biely“ + <i>plax</i> „doska, plocha“",
  title: "Leukoplakia",
  match: ["leukoplaki\\w*"],
  short: "Biela, neodstrániteľná škvrna na sliznici (najčastejšie v ústach), ktorú nemožno inak pomenovať. Je prekancerózou: časť sa vyvinie do dlaždicového karcinómu."
},
{
  id: "hpv", et: "lat. <i>papilla</i> „bradavka“ + <i>virus</i>; angl. <i>human papillomavirus</i>",
  title: "Ľudský papilomavírus (HPV)",
  match: ["papilomavír\\w*", "HPV"],
  short: "Vírus, ktorý infikuje bazálne bunky dlaždicového epitelu.",
  body: "<ul><li>Vysokorizikové typy (HPV 16, 18) vyvolajú karcinóm krčka maternice a ďalšie nádory.</li></ul>"
},
{
  id: "bradavice", et: "lat. <i>verruca</i>",
  title: "Bradavice",
  match: ["bradavic\\w*"],
  short: "Benígne ložiská z nakazených keratinocytov; ich spúšťačom sú nízkorizikové typy HPV."
},
{
  id: "in-situ", et: "lat. <i>in situ</i> „na mieste“",
  title: "Karcinóm in situ",
  match: ["karcinóm\\w*\\s+in\\s+situ", "in\\s+situ"],
  short: "Zhubné bunky, ktoré zostali v epiteli a neprerazili bazálnu membránu. Nemajú prístup do ciev ani lymfy, preto sa nemôžu šíriť; po odstránení je zvyčajne vyliečenie."
},

/* ── mikróby ─────────────────────────────────────────────────────────── */
{
  id: "klostridie", et: "gr. <i>kloster</i> „vreteno“",
  img: {
    src: "assets/images/k1-20.jpg",
    alt: "Plynová gangréna stehna: opuch, pľuzgiere a crepitus.",
    caption: "Plynová gangréna stehna: opuch, pľuzgiere a crepitus.",
    credit: "Schröpfer E., Rauthe S., Meyer T. (Cases J 2008, 1:252) · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Gas_gangrene.jpg"
  },
  title: "Klostrídie (Clostridium)",
  match: ["klostrídi\\w*", "Clostridi\\w*", "perfringens"],
  short: "Anaeróbne baktérie tvoriace spóry. <i>C. perfringens</i> vyvoláva plynovú gangrénu, <i>C. difficile</i> pseudomembranóznu kolitídu po antibiotikách."
},
{
  id: "staphylococcus", et: "gr. <i>staphyle</i> „strapec hrozna“ + <i>kokkos</i> „zrno“",
  title: "Stafylokok (Staphylococcus aureus)",
  match: ["Staphylococc\\w*"],
  short: "Grampozitívne zhluky baktérií na koži a v nose. <i>S. aureus</i> vyvoláva hnisavé infekcie (furunkul, absces, impetigo), pneumóniu a sepsu; produkuje koagulázu."
},
{
  id: "corynebacterium", et: "gr. <i>koryne</i> „kyj, palica“ + <i>bakterion</i> „paličká“",
  title: "Corynebacterium diphtheriae",
  match: ["Corynebacteri\\w*"],
  short: "Baktéria, ktorá vyvoláva záškrt. Jej exotoxín zastavuje syntézu bielkovín vo svalových a nervových bunkách (EF-2) a spôsobuje pablany v hrdle."
},
{
  id: "meningokok", et: "gr. <i>meninx</i> + <i>kokkos</i>",
  title: "Meningokok",
  match: ["meningokok\\w*"],
  short: "Neisseria meningitidis — gramnegatívny diplokok, ktorý vyvoláva meningitídu a sepsu.",
  body: "<ul><li>Pri sepse vzniká petechiálna až purpurová vyrážka.</li><li>Endotoxín môže vyvolať DIC a šok.</li></ul>"
},
{
  id: "waterhouse-friderichsen", et: "podľa Rupperta Waterhousea a Carla Friderichsena",
  title: "Waterhouseov–Friderichsenov syndróm",
  match: ["Waterhouseov\\w*[–-]Friderichsenov\\w*(?:\\s+syndróm\\w*)?"],
  img: {
    "src": "assets/images/adrenal-hemorrhage-wfs.jpg",
    "alt": "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    "caption": "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    "credit": "Amadalvarez · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Waterhouse-Friderichsen._IMG_2912.jpg"
  },
  short: "Krvácanie do oboch nadobličiek pri ťažkej meningokokovej sepse, ktoré vedie k akútnej nedostatočnosti nadobličiek a šoku.",
  body: "<p class=\"chain\">meningokoková sepsa → DIC → krvácanie do nadobličiek → ↓ kortizol → šok</p>"
},
{
  id: "neisseria", et: "gonorea: gr. <i>gone</i> „semeno“ + <i>rhoia</i> „tok“",
  title: "Kvapavka (gonorea)",
  match: ["kvapavk\\w*", "gonore\\w*", "Neisseri\\w*"],
  short: "Pohlavne prenosná infekcia baktériou <i>Neisseria gonorrhoeae</i>. Vyvoláva hnisavý zápal močovej rúry a krčka maternice.",
  body: "<ul><li>Gramnegatívny diplokok vo vnútri neutrofilov.</li><li>Komplikácie: zápal nadsemenníka, vajíčkovodu (neplodnosť).</li></ul>"
},
{
  id: "impetigo", et: "lat. <i>impetigo</i> „vyrážka“ (<i>impetere</i> „napadnúť“)",
  img: {
    src: "assets/images/impetigo-elbow.jpg",
    alt: "Impetigo na lakti: žlté chrasty po zaschnutom hnise.",
    caption: "Impetigo na lakti: žlté chrasty po zaschnutom hnise.",
    credit: "Evanherk, Dutch Wikipedia · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Impetigo_elbow.jpg"
  },
  title: "Impetigo",
  match: ["impetig\\w*"],
  short: "Povrchová hnisavá infekcia kože (stafylokok, streptokok), ktorá tvorí žlté chrasty. Je veľmi nákazlivá, hlavne u detí."
},
{
  id: "parotitida", et: "gr. <i>para</i> + <i>ous, otos</i> „ucho“ + <i>-itis</i>",
  img: {
    src: "assets/images/mumps-child.jpg",
    alt: "Epidemická parotitída: opuch príušnej žľazy u dieťaťa.",
    caption: "Epidemická parotitída: opuch príušnej žľazy u dieťaťa.",
    credit: "CDC / NIP / Barbara Rice · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mumps_PHIL_130_lores.jpg"
  },
  title: "Parotitída",
  match: ["parotitíd\\w*"],
  short: "Zápal príušnej žľazy.",
  body: "<ul><li>Epidemická parotitída (mumps) je vírusová a môže zasiahnuť aj semenníky, pankreas a mozgové obaly.</li></ul>"
},
{
  id: "sialoadenitida", et: "gr. <i>sialon</i> „slina“ + <i>aden</i> + <i>-itis</i>",
  title: "Sialoadenitída",
  match: ["sialoadenitíd\\w*"],
  short: "Zápal slinnej žľazy."
},
{
  id: "sjogren", et: "podľa Henrika Sjögrena",
  title: "Sjögrenov syndróm",
  match: ["Sjögrenov\\w*(?:\\s+syndróm\\w*)?"],
  short: "Autoimunitný zápal slinných a slzných žliaz s lymfocytovým infiltrátom.",
  body: "<ul><li>Prejaví sa suchom v ústach a v očiach.</li></ul>"
},
{
  id: "rejekcia", et: "lat. <i>reicere</i> „odhodiť, odmietnuť“ (<i>re-</i> + <i>iacere</i> „hádzať“)",
  title: "Rejekcia štepu",
  match: ["rejekci\\w*", "odvrhnuti\\w*"],
  short: "Imunitná reakcia príjemcu proti transplantovanému orgánu. Hyperakútna prebehne za hodiny cez protilátky, akútna za dni až týždne cez T-lymfocyty, chronická postupne zjazví orgán."
},
{
  id: "sterilny-zapal", et: "lat. <i>sterilis</i> „neúrodný, bez zárodkov“; aseptický: gr. <i>a-</i> „bez“ + <i>septikos</i> „hnilobný“",
  title: "Sterilný (aseptický) zápal",
  match: ["aseptick\\w*", "steriln\\w*"],
  short: "Zápal bez mikróbov, spustený poškodením tkaniva (nekróza, kryštály, popálenie) cez DAMP."
}

);

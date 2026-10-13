/* Glosár PATOLY — mediátory zápalu, imunita, krv, hemostáza a hojenie: pojmy z kap. 1–5 a 8–9, ktoré texty používajú bez výkladu.
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── mediátory a bunky zápalu ────────────────────────────────────────── */
{
  id: "anafylatoxiny", et: "anafylaxia (gr. <i>ana</i> + <i>phylaxis</i> „ochrana“) + gr. <i>toxikon</i> „jed“",
  title: "Anafylatoxíny (C3a, C5a)",
  match: ["anafylatoxín\\w*", "C3a"],
  short: "Malé úlomky komplementu, ktoré uvoľnia histamín z mastocytov (↑ priepustnosť cievy) a C5a navyše priťahuje neutrofily."
},
{
  id: "opsoniny", et: "gr. <i>opsonein</i> „pripravovať pokrm“",
  title: "Opsoníny",
  match: ["opsonín\\w*"],
  short: "Molekuly (protilátky IgG, C3b), ktoré sa naviažu na mikróba a „označia“ ho pre fagocyt."
},
{
  id: "opsonizacia",
  title: "Opsonizácia",
  match: ["opsoniz\\w*"],
  short: "Dej, ktorým opsoníny označia mikróba, aby ho fagocyt ľahšie rozpoznal a pohltil."
},
{
  id: "toll-like", et: "nem. <i>toll</i> „úžasný, skvelý“ (gén <i>Toll</i> u ovocnej mušky); angl. <i>-like</i> „podobný“",
  title: "Toll-like receptory (TLR; angl. Toll-like receptors)",
  match: ["Toll-?like\\w*", "TLR\\w*"],
  short: "Receptory vrodenej imunity na povrchu a vo vnútri buniek, ktoré rozpoznávajú štruktúry mikróbov (PAMP) a spúšťajú zápalovú odpoveď cez NF-κB."
},
{
  id: "lektinova-draha", et: "lektín: lat. <i>legere</i> „vyberať“ (selektívne viaže cukry)",
  title: "Lektínová dráha komplementu",
  match: ["lektínov\\w*", "manózov\\w*"],
  short: "Dráha komplementu, ktorú spúšťa manózu viažuci lektín po naviazaní na cukry mikróbov. Nevyžaduje protilátky."
},
{
  id: "kalikrein", et: "gr. <i>kallikreas</i> „podžalúdková žľaza“ (<i>kalli-</i> „pekný“ + <i>kreas</i> „mäso“), v ktorej bol nájdený; kinín: <i>kinein</i> „hýbať“",
  title: "Kalikreín–kinínový systém",
  match: ["kalikreín\\w*", "prekalikreín\\w*", "kininogén\\w*", "kinínov\\w*"],
  short: "Kaskáda, ktorá z kininogénu uvoľní bradykinín. Aktivuje ju faktor XII; bradykinín rozširuje cievy, zvyšuje ich priepustnosť a vyvoláva bolesť."
},
{
  id: "superoxid", et: "lat. <i>super</i> + oxid",
  title: "Superoxid",
  match: ["superoxid\\w*"],
  short: "Prvý kyslíkový radikál, ktorý NADPH-oxidáza fagocytu vyrobí.",
  body: "<ul><li>Z kyslíka vzniká cez NADPH-oxidázu, potom sa mení na peroxid vodíka a kyselinu chlórnu.</li><li>Poškodzuje mikróby aj okolité tkanivo.</li></ul>"
},
{
  id: "elastaza", et: "gr. <i>elastos</i> „poddajný“",
  title: "Elastáza",
  match: ["elastáz\\w*"],
  short: "Enzým neutrofilov, ktorý štiepi elastín a ďalšie bielkoviny.",
  body: "<ul><li>Poškodzuje steny alveol (emfyzém pri deficite α1-antitrypsínu).</li><li>Neutrofily ju vylučujú pri zápale.</li></ul>"
},
{
  id: "kataláza",
  title: "Kataláza",
  match: ["kataláz\\w*"],
  short: "Enzým, ktorý rozkladá peroxid vodíka; mikróby s katalázou prežijú v neutrofiloch pacientov s chronickou granulomatóznou chorobou."
},
{
  id: "nbt-test",
  title: "Nitrotetrazóliová modrá (NBT test)",
  match: ["nitrotetrazóliov\\w*(?:\\s+modr\\w*)?"],
  short: "Meria tvorbu superoxidu vo fagocytoch.",
  body: "<ul><li>Normálne neutrofily redukujú žltú NBT na tmavomodrú zrazeninu.</li><li>Pri chronickej granulomatóznej chorobe sa farba nezmení.</li></ul>"
},
{
  id: "net", et: "angl. <i>neutrophil extracellular trap</i>",
  img: {
    src: "assets/images/net-sem.jpg",
    alt: "NET: neutrofil (žltý) vypustil sieť (zelená), v ktorej uviazli baktérie.",
    caption: "NET: neutrofil (žltý) vypustil sieť (zelená), v ktorej uviazli baktérie.",
    credit: "CHDENK · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Neutrophil_Extracellular_Trap.jpg"
  },
  title: "NET (neutrofilová sieť)",
  match: ["NET(?:y|ov)?"],
  short: "Sieť z DNA a enzýmov, ktorú neutrofil vypustí a ktorá zachytí mikróby.",
  body: "<ul><li>Tvorba NET je zvláštny typ smrti neutrofilu (NETóza).</li><li>Pri nadmernej tvorbe môžu poškodzovať tkanivo a vyvolať trombózu.</li></ul>"
},
{
  id: "pad4", et: "angl. <i>peptidylarginine deiminase 4</i>",
  title: "PAD4",
  match: ["peptidylarginíndeimináz\\w*", "PAD4"],
  short: "Enzým, ktorý rozvoľní chromatín v neutrofile a umožní vytvorenie NET."
},
{
  id: "nociceptor", et: "lat. <i>nocere</i> + <i>recipere</i>",
  title: "Nociceptor",
  match: ["nociceptor\\w*"],
  short: "Nervové zakončenie, ktoré vníma bolesť."
},
{
  id: "substancia-p",
  title: "Substancia P",
  match: ["substanci\\w*\\s+P"],
  short: "Neuropeptid uvoľnený nociceptormi; rozširuje cievy a zvyšuje ich priepustnosť (neurogénny zápal)."
},
{
  id: "neuropeptid",
  title: "Neuropeptidy",
  match: ["neuropeptid\\w*"],
  short: "Peptidy uvoľňované nervovými zakončeniami; pôsobia na cievy a bunky imunity."
},
{
  id: "bazofil", et: "báza (gr. <i>basis</i> „základ“) + gr. <i>philos</i> „milujúci“",
  title: "Bazofily",
  match: ["bazofil(?:y|ov|om|mi|och)?"],
  short: "Vzácne granulocyty (< 1 % leukocytov) s granulami plnými histamínu. Podobajú sa mastocytom a podieľajú sa na alergii a obrane proti parazitom."
},
{
  id: "zihlavka",
  title: "Žihľavka",
  match: ["žihľavk\\w*"],
  short: "Prechodné vyvýšené zarudnuté ložisko na koži z uvoľneného histamínu (↑ priepustnosť cievy → edém).",
  body: "<ul><li>Vyvýšená plocha zmizne do niekoľkých hodín.</li><li>Dlhšie trvajúci opuch hlbších vrstiev je angioedém.</li></ul>"
},
{
  id: "svrbenie",
  title: "Svrbenie",
  match: ["svrbeni\\w*"],
  short: "Vzniká podráždením nervových zakončení histamínom."
},
{
  id: "tachykardia", et: "gr. <i>tachys</i> + <i>kardia</i>",
  title: "Tachykardia",
  match: ["tachykardi\\w*"],
  short: "Rýchla činnosť srdca (nad 100/min v pokoji).",
  body: "<ul><li>Fyziologická pri námahe, patologická pri horúčke, šoku a anémii.</li><li>Skracuje diastolu a plnenie koronárok.</li></ul>"
},
{
  id: "bradykardia", et: "gr. <i>bradys</i> + <i>kardia</i>",
  title: "Bradykardia",
  match: ["bradykardi\\w*"],
  short: "Pomalá činnosť srdca (pod 60/min v pokoji).",
  body: "<ul><li>Fyziologická u športovcov a v spánku.</li><li>Patologická pri blokádach a zvýšenom intrakraniálnom tlaku.</li></ul>"
},
{
  id: "mikrocirkulacia", et: "gr. <i>mikros</i> + lat. <i>circulare</i>",
  title: "Mikrocirkulácia",
  match: ["mikrocirkulác\\w*"],
  short: "Prúdenie krvi arteriolami, kapilárami a venulami, kde sa vymieňajú látky.",
  body: "<ul><li>Pri sepse a šoku je narušená aj pri normálnom tlaku.</li><li>Sleduje sa laktát a kapilárne plnenie.</li></ul>"
},
{
  id: "hypoperfuzia", et: "gr. <i>hypo</i> + lat. <i>perfusio</i>",
  title: "Hypoperfúzia",
  match: ["hypoperfúzi\\w*", "perfúzi\\w*"],
  short: "Nedostatočný prietok krvi tkanivom.",
  body: "<ul><li>Vedie k ischémii a hypoxii.</li><li>Pri dlhšom trvaní k nekróze orgánov.</li></ul>"
},
{
  id: "hepcidin", et: "gr. <i>hepar</i> + lat. <i>-cidus</i>",
  title: "Hepcidín",
  match: ["hepcidín\\w*"],
  short: "Pečeňový hormón, ktorý pri zápale (po IL-6) zablokuje ferroportín.",
  body: "<ul><li>Železo sa zadrží a vzniká anémia chronického zápalu.</li></ul>"
},
{
  id: "ferroportin", et: "lat. <i>ferrum</i> + angl. <i>port</i>",
  title: "Ferroportín",
  match: ["ferroportín\\w*"],
  short: "Bielkovina, ktorá vypúšťa železo z buniek do krvi."
},
{
  id: "pyrogeny", et: "gr. <i>pyr</i> + <i>-genes</i>",
  title: "Pyrogény",
  match: ["pyrogén\\w*"],
  short: "Pyrogény (IL-1, IL-6, TNF, bakteriálny lipopolysacharid) cez prostaglandín E₂ posunú nastavenie hypotalamu na vyššiu teplotu."
},
{
  id: "horucka",
  title: "Horúčka",
  match: ["horúčk\\w*"],
  short: "Zvýšená telesná teplota (nad 38 °C) vyvolaná posunom nastavenia hypotalamu."
},
{
  id: "lps", et: "lipopolysacharid: gr. <i>lipos</i> „tuk“ + <i>polys</i> „mnoho“ + <i>sakcharon</i> „cukor“; endotoxín: <i>endon</i> „vnútri“ + <i>toxikon</i> „jed“",
  title: "Lipopolysacharid (LPS, endotoxín; angl. lipopolysaccharide)",
  match: ["lipopolysacharid\\w*", "LPS", "endotoxín\\w*", "exotoxín\\w*"],
  short: "LPS je zložka vonkajšej membrány gramnegatívnych baktérií; po uvoľnení (endotoxín) aktivuje TLR4 a vyvolá silný zápal až septický šok. Exotoxíny sú bielkoviny, ktoré mikróby vylučujú."
},
{
  id: "autoimunita", et: "gr. <i>autos</i> „sám“ + lat. <i>inflammatio</i> „zapálenie“",
  title: "Autoinflamatórne choroby",
  match: ["autoinflamatórn\\w*", "autoimunit\\w*", "autoimunitn\\w*"],
  short: "Autoimunitné choroby poškodzujú vlastné tkanivo cez T-lymfocyty a protilátky. Autoinflamatórne vznikajú poruchou vrodenej imunity (inflamazóm) — sú to záchvaty zápalu bez autoprotilátok."
},
{
  id: "polytrauma", et: "gr. <i>polys</i> „mnoho“ + <i>trauma</i> „rana“",
  title: "Polytrauma",
  match: ["polytraum\\w*"],
  short: "Súčasné ťažké poranenie viacerých telesných oblastí alebo orgánov. Uvoľnené DAMP vyvolajú SIRS a hrozí šok a multiorgánové zlyhanie."
},

/* ── krv, hemostáza a krvácanie (rozšírenie) ─────────────────────────── */
{
  id: "agregacia", et: "lat. <i>aggregare</i> „pripojiť do stáda“",
  title: "Agregácia doštičiek",
  match: ["agregáci\\w*"],
  short: "Zhlukovanie doštičiek navzájom cez fibrinogén a receptor GP IIb/IIIa — základ doštičkovej zátky."
},
{
  id: "hemoroidy", et: "gr. <i>haimorrhois</i> (<i>haima</i> „krv“ + <i>rhein</i> „tiecť“)",
  title: "Hemoroidy",
  match: ["hemoroid\\w*"],
  short: "Rozšírené cievne vankúšiky v konečníku, ktoré krvácajú jasnočervenou krvou. Sú častou príčinou rektálneho krvácania."
},
{
  id: "apoplexia", et: "gr. <i>apoplexia</i> „zrazenie úderom“ (<i>apoplessein</i> „zraziť“)",
  img: {
    src: "assets/images/cerebral-hemorrhage.jpg",
    alt: "Masívne vnútrolebkové krvácanie.",
    caption: "Masívne vnútrolebkové krvácanie.",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Hemorr%C3%A0gia_cerebral.1444.jpg"
  },
  title: "Apoplexia (mozgová príhoda)",
  match: ["apoplexi\\w*", "mozgov\\w*\\s+príhod\\w*"],
  short: "Náhla porucha prietoku krvi mozgom — buď ischemická (uzáver cievy), alebo hemoragická (krvácanie). Vedie k náhlemu výpadku funkcie."
},
{
  id: "turbulencia", et: "lat. <i>turbulentus</i> „búrlivý“",
  title: "Turbulencia",
  match: ["turbulenci\\w*"],
  short: "Víriace prúdenie krvi, ktoré poškodzuje endotel.",
  body: "<ul><li>Patrí k Virchowovej triase.</li></ul>"
},
{
  id: "stagnacia", et: "lat. <i>stagnare</i> „stáť (o vode)“",
  title: "Stagnácia krvi",
  match: ["stagnáci\\w*(?:\\s+krvi)?", "stagnačn\\w*"],
  short: "Stojatá krv, v ktorej sa hromadia faktory zrážania.",
  body: "<ul><li>Typické v žilách pri nehybnosti a v rozšírených dutinách srdca.</li></ul>"
},
{
  id: "vegetacia", et: "lat. <i>vegetare</i> „oživovať, rásť“",
  title: "Vegetácia na chlopni",
  match: ["vegetáci\\w*"],
  short: "Drobný útvar z trombu, fibrínu a doštičiek (často s baktériami) priliehajúci k srdcovej chlopni, napr. pri infekčnej endokarditíde."
},
{
  id: "hemodynamika", et: "gr. <i>haima</i> „krv“ + <i>dynamis</i> „sila“",
  title: "Hemodynamika",
  match: ["hemodynamick\\w*", "hemodynamik\\w*"],
  short: "Zákonitosti prúdenia krvi: ako ho určujú tlak, odpor cievy a objem krvi. Zmeny hemodynamiky vedú k trombóze, edému a šoku."
},
{
  id: "hypovolemia", et: "gr. <i>hypo</i> + lat. <i>volumen</i> + gr. <i>haima</i>",
  title: "Hypovolémia",
  match: ["hypovolémi\\w*"],
  short: "Znížený objem krvi (krvácanie, dehydratácia).",
  body: "<ul><li>Vedie k hypovolemickému šoku.</li></ul>"
},
{
  id: "hypervolemia",
  title: "Hypervolémia",
  match: ["hypervolémi\\w*"],
  short: "Zvýšený objem krvi.",
  body: "<ul><li>Zaťažuje srdce a zvyšuje hydrostatický tlak v kapilárach.</li></ul>"
},
{
  id: "hydremia", et: "gr. <i>hydor</i> + <i>haima</i>",
  title: "Hydrémia",
  match: ["hydrémi\\w*"],
  short: "Zriedenie krvi vodou."
},
{
  id: "sinusoidy", et: "lat. <i>sinus</i> „záhyb, zátoka“ + gr. <i>-eides</i> „podobný“",
  title: "Sínusoidy",
  match: ["sínusoid\\w*"],
  short: "Široké kapiláry s medzerami v stene v pečeni, slezine a kostnej dreni. Umožňujú voľnú výmenu látok aj prechod buniek."
},
{
  id: "glykokalyx", et: "gr. <i>glykys</i> „sladký“ + <i>kalyx</i> „kalich, obal“",
  title: "Glykokalyx",
  match: ["glykokalyx\\w*"],
  short: "Tenká vrstva cukrov a bielkovín na povrchu endotelu. Určuje priepustnosť kapilár pre bielkoviny — podľa revidovaného Starlingovho princípu je dôležitá pre výmenu tekutiny."
},
{
  id: "filtracia", et: "lat. <i>filtrum</i> „plstené cedidlo“",
  title: "Filtrácia",
  match: ["filtráci\\w*"],
  short: "Pri kapiláre tekutina vystupuje do tkaniva na arteriálnom konci tlakom krvi.",
  body: "<ul><li>V glomerule obličky filtrácia tvorí primárny moč.</li></ul>"
},
{
  id: "reabsorpcia", et: "lat. <i>re-</i> + <i>absorbere</i>",
  title: "Reabsorpcia",
  match: ["reabsorpci\\w*", "resorpci\\w*"],
  short: "Tekutina sa vracia z tkaniva do cievy na venóznom konci onkotickým tlakom bielkovín.",
  body: "<ul><li>Rozdiel medzi filtráciou a reabsorpciou odvedie lymfa.</li></ul>"
},
{
  id: "dyspnoe", et: "gr. <i>dys</i> + <i>pnoe</i>",
  title: "Dyspnoe",
  match: ["dyspnoe", "dýchavic\\w*"],
  short: "Pocit nedostatku vzduchu (dýchavica)."
},
{
  id: "paroxyzmalna-dyspnoe", et: "gr. <i>paroxysmos</i> „záchvat“",
  title: "Paroxyzmálna nočná dyspnoe",
  match: ["paroxyzmáln\\w*(?:\\s+nočn\\w*\\s+dyspnoe)?"],
  short: "Pacient sa v noci prebudí so záchvatom dýchavice pre prerozdelenie tekutiny do pľúc po ľahu (zlyhanie ľavého srdca)."
},
{
  id: "systolicke-zlyhanie", et: "gr. <i>systole</i> „stiahnutie“",
  title: "Systolické zlyhanie",
  match: ["systolick\\w*\\s+zlyhan\\w*", "systolick\\w*\\s+dysfunkci\\w*"],
  short: "Komora sa nevie stiahnuť — nízka ejekčná frakcia."
},
{
  id: "diastolicke-zlyhanie", et: "gr. <i>diastole</i> „roztiahnutie“",
  title: "Diastolické zlyhanie",
  match: ["diastolick\\w*\\s+zlyhan\\w*", "diastolick\\w*\\s+dysfunkci\\w*"],
  short: "Komora sa nevie uvoľniť a naplniť (tuhá stena); frakcia býva zachovaná."
},
{
  id: "erytrocyty", et: "gr. <i>erythros</i> „červený“ + <i>kytos</i> „bunka“",
  title: "Erytrocyty",
  match: ["erytrocyt\\w*"],
  short: "Červené krvinky bez jadra naplnené hemoglobínom; prenášajú kyslík z pľúc do tkanív. Žijú ≈ 120 dní a odstraňuje ich slezina."
},
{
  id: "hemoglobin", et: "gr. <i>haima</i> + lat. <i>globus</i>",
  title: "Hemoglobín",
  match: ["hemoglobín\\w*", "deoxyhemoglobín\\w*", "oxyhemoglobín\\w*"],
  short: "Bielkovina erytrocytov, ktorá viaže kyslík cez železo v hemovej skupine.",
  body: "<ul><li>Oxyhemoglobín je jasnočervený, deoxyhemoglobín tmavočervený až modrastý (cyanóza).</li></ul>"
},
{
  id: "hem", et: "gr. <i>haima</i> „krv“",
  title: "Hem",
  match: ["hem"],
  short: "Skupina s železom v hemoglobíne a myoglobíne, ktorá viaže kyslík.",
  body: "<ul><li>Pri rozpade sa mení na biliverdín a bilirubín.</li></ul>"
},
{
  id: "fibrilacia", et: "lat. <i>fibrilla</i> „vláknko“ (<i>fibra</i> „vlákno“)",
  title: "Fibrilácia predsiení",
  match: ["fibrilác\\w*"],
  short: "Chaotická elektrická aktivita predsiení s nepravidelným rytmom komôr. V predsieni sa stagnujúca krv zrazí a trombus sa môže uvoľniť do mozgu (embolická mozgová príhoda)."
},
{
  id: "ateroskleroza", et: "gr. <i>athere</i> „kaša“ + <i>skleros</i> „tvrdý“ + <i>-osis</i>",
  title: "Ateroskleróza",
  match: ["ateroskleróz\\w*", "aterosklerotick\\w*", "aterom\\w*"],
  short: "Ukladanie lipidov, buniek a väziva do intimy veľkých tepien (aterómový plát). Zužuje cievu a po prasknutí plátu vyvolá trombózu — príčina infarktu a mozgovej príhody."
},
{
  id: "hypertenzia-kriza", et: "gr. <i>krisis</i> „rozhodnutie, zlom“",
  title: "Hypertenzia",
  match: ["hypertenzi\\w*"],
  short: "Opakovane zvýšený tlak krvi (≥ 140/90 mmHg). Zaťažuje srdce, cievy, obličky a mozog; extrémne hodnoty s poškodením orgánov sú hypertenzná kríza."
},

/* ── hojenie a rana ──────────────────────────────────────────────────── */
{
  id: "pericyty", et: "gr. <i>peri</i> „okolo“ + <i>kytos</i> „bunka“",
  title: "Pericyty",
  match: ["pericyt\\w*"],
  short: "Bunky obklopujúce kapiláry, ktoré stabilizujú ich stenu a riadia prietok. Pri hojení sa môžu premieňať na fibroblasty a myofibroblasty."
},
{
  id: "dupuytren", et: "podľa Guillauma Dupuytrena",
  title: "Dupuytrenova choroba",
  match: ["Dupuytrenov\\w*(?:\\s+(?:choro\\w*|kontraktúr\\w*))?"],
  img: {
    "src": "assets/images/dupuytren-hand.jpg",
    "alt": "Dupuytrenova kontraktúra: tuhé pruhy v dlani ťahajú prsty do ohnutia.",
    "caption": "Dupuytrenova kontraktúra: tuhé pruhy v dlani ťahajú prsty do ohnutia.",
    "credit": "Markbenecke · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Hand_of_Morbus_Dupuytren_Patient.jpg"
  },
  short: "Fibromatóza dlaňovej aponeurózy, ktorá sťahuje prsty."
},
{
  id: "ledderhose",
  title: "Ledderhoseho choroba",
  match: ["Ledderhoseh\\w*(?:\\s+choro\\w*)?"],
  short: "Fibromatóza chodidlovej aponeurózy."
},
{
  id: "fibromatozy",
  title: "Fibromatózy",
  match: ["fibromatóz\\w*"],
  short: "Benígne prerastanie fibroblastov a kolagénu."
},
{
  id: "aponeuroza", et: "gr. <i>apo</i> + <i>neuron</i> „šľacha“",
  title: "Aponeuróza",
  match: ["aponeuróz\\w*"],
  short: "Plochá šľacha."
},
{
  id: "endomyzium", et: "gr. <i>endon</i> + <i>mys</i>",
  title: "Endomýzium",
  match: ["endomýzi\\w*"],
  short: "Jemné väzivo medzi jednotlivými svalovými vláknami."
},
{
  id: "perimyzium",
  title: "Perimýzium a epimýzium",
  match: ["perimýzi\\w*", "epimýzi\\w*"],
  short: "Perimýzium obaľuje zväzky svalových vlákien, epimýzium celý sval."
},
{
  id: "marjolin",
  title: "Marjolinov vred",
  match: ["Marjolinov\\w*(?:\\s+vred\\w*)?"],
  short: "Dlaždicový karcinóm, ktorý vzniká v chronickej nehojacej sa rane alebo starej jazve (popálenina, osteomyelitída) po desaťročiach dráždenia."
},
{
  id: "wallerova",
  title: "Wallerova degenerácia",
  match: ["Wallerov\\w*(?:\\s+degeneráci\\w*)?"],
  short: "Rozpad nervového vlákna distálne od miesta pretrhnutia nervu. Schwannove bunky odstránia zvyšky a vytvoria vodiaci kanálik, po ktorom môže vlákno znovu vyrásť."
},
{
  id: "luxurians", et: "lat. <i>luxurians</i> „bujný“ (<i>luxuriare</i> „bujnieť“)",
  img: {
    src: "assets/images/granulation-finger.jpg",
    alt: "Hypergranulácia: červený zrnitý povrch vyčnieva nad okraj rany.",
    caption: "Hypergranulácia: červený zrnitý povrch vyčnieva nad okraj rany.",
    credit: "Linuxfox00 · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Finger_with_granulation_tissue.jpg"
  },
  title: "Hypergranulácia (granulatio luxurians)",
  match: ["luxurians", "hypergranuláci\\w*", "prebujnen\\w*"],
  short: "Prebujnené granulačné tkanivo vyčnievajúce nad okraj rany. Bráni epitelizácii a odstraňuje sa chemicky alebo chirurgicky."
},
{
  id: "polyserozitida", et: "gr. <i>polys</i> „mnoho“ + lat. <i>serosus</i> (<i>serum</i> „srvátka“) + gr. <i>-itis</i>",
  img: {
    src: "assets/images/fibrinous-pericarditis.jpg",
    alt: "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    caption: "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    credit: "K. Bielnik a kol. · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Pericarditis_fibrinosa.jpg"
  },
  title: "Polyserozitída",
  match: ["polyserozit\\w*", "serozit\\w*"],
  short: "Zápal viacerých seróznych blán naraz (pohrudnica, osrdcovník, pobrušnica). Vyskytuje sa pri lupus erythematosus, tuberkulóze a urémii."
},
{
  id: "osteomyelitida", et: "gr. <i>osteon</i> + <i>myelos</i> + <i>-itis</i>",
  title: "Osteomyelitída",
  match: ["osteomyelitíd\\w*"],
  short: "Infekcia kosti a kostnej drene."
},
{
  id: "osteoporoza", et: "gr. <i>osteon</i> + <i>poros</i> „pór“ + <i>-osis</i>",
  title: "Osteoporóza",
  match: ["osteoporóz\\w*"],
  short: "Zníženie kostnej hmoty s vyšším rizikom zlomenín."
},
{
  id: "artritida", et: "gr. <i>arthron</i> „kĺb“ + <i>-itis</i>",
  title: "Artritída",
  match: ["artritíd\\w*"],
  short: "Zápal kĺbu."
},
{
  id: "kompresia", et: "lat. <i>comprimere</i> „stlačiť“ (<i>com-</i> + <i>premere</i> „tlačiť“)",
  title: "Kompresia",
  match: ["kompresi\\w*", "kompresívn\\w*"],
  short: "Stlačenie tkaniva zvonku (tlak nádoru, zväčšeného orgánu, obväzu). Zníži prietok krvi a odumierajú závislé bunky."
},
{
  id: "preleziny", et: "dekubit: lat. <i>decumbere</i> „ľahnúť si“",
  title: "Preležanina (dekubit)",
  match: ["preležanin\\w*", "dekubit\\w*"],
  short: "Nekróza kože a podkožia z dlhotrvajúceho tlaku na kostné výčnelky (krížová kosť, päta) u imobilizovaných ľudí; tlak stlačí cievy a vznikne ischémia."
},
{
  id: "omrzliny",
  title: "Omrzliny",
  match: ["omrzlin\\w*"],
  short: "Poškodenie tkaniva extrémnym chladom (tvorba ľadových kryštálov, spazmus ciev).",
  body: "<ul><li>Vedú k nekróze a gangréne.</li></ul>"
},
{
  id: "popaleniny",
  title: "Popáleniny",
  match: ["popáleni\\w*"],
  short: "Poškodenie tkaniva teplom (koagulácia bielkovín)."
},
{
  id: "mumifikacia", et: "arab. <i>mumiya</i>",
  title: "Mumifikácia",
  match: ["mumifikáci\\w*"],
  img: {
    "src": "assets/images/gangrene-foot.jpg",
    "alt": "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    "caption": "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    "credit": "آرمین · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Gangrene_Foot_01.jpg"
  },
  short: "Vysušenie mŕtveho tkaniva (suchá gangréna)."
},
{
  id: "maceracia", et: "lat. <i>macerare</i> „zmäkčiť, namáčať“",
  title: "Macerácia",
  match: ["macerá\\w*"],
  short: "Rozmočenie a rozpad plodu v plodovej vode alebo kože vo vlhku."
},
{
  id: "supravitalne", et: "lat. <i>supra</i> „nad, za“ + <i>vita</i> „život“",
  title: "Supravitálne reakcie",
  match: ["supravitáln\\w*"],
  short: "Reakcie tkaniva, ktoré ešte krátko po smrti zareagujú na podnet (zrenice na lieky, svaly na elektrický dráždivý prúd), kým nezaniknú bunky."
},
{
  id: "perforin", et: "lat. <i>perforare</i> „preraziť“",
  title: "Perforín",
  match: ["perforín\\w*"],
  short: "Bielkovina cytotoxických T-lymfocytov a NK buniek, ktorá vytvorí v cieľovej bunke póry."
},
{
  id: "granzym", et: "granulum + enzým",
  title: "Granzýmy",
  match: ["granzým\\w*"],
  short: "Enzýmy, ktoré vojdú cez póry perforínu do cieľovej bunky a spustia kaspázy (apoptózu)."
},
{
  id: "involucia", et: "lat. <i>involutio</i> „zvinutie“ (<i>involvere</i> „zvinúť“)",
  title: "Involúcia",
  match: ["involúci\\w*"],
  short: "Fyziologické zmenšenie orgánu po splnení funkcie (maternica po pôrode, týmus v puberte). Nastáva apoptózou a atrofiou buniek."
},
{
  id: "kastracia", et: "lat. <i>castrare</i> „vykastrovať“",
  title: "Kastrácia",
  match: ["kastráci\\w*"],
  short: "Odstránenie alebo vyradenie pohlavných žliaz. Vyradenie hormónov vedie k atrofii na nich závislých tkanív (prostata, prsník, maternica)."
},
{
  id: "fosfolipidy",
  title: "Fosfolipidy",
  match: ["fosfolipid\\w*"],
  short: "Tvoria dvojvrstvu bunkových membrán."
},
{
  id: "glycerol", et: "gr. <i>glykeros</i> „sladký“",
  title: "Glycerol",
  match: ["glycerol\\w*"],
  short: "Tri-alkohol, ktorý s tromi mastnými kyselinami tvorí triacylglycerol."
},
{
  id: "proteosynteza", et: "proteín: gr. <i>proteios</i> „prvotný, základný“; syntéza: <i>synthesis</i> „skladanie“",
  title: "Proteosyntéza (syntéza bielkovín)",
  match: ["proteosyntéz\\w*", "translác\\w*"],
  short: "Tvorba bielkovín na ribozómoch podľa informácie z mRNA. Je citlivá na nedostatok ATP a na toxíny (diftérický exotoxín, α-amanitín)."
},
{
  id: "amanitin",
  title: "α-amanitín (muchotrávka zelená)",
  match: ["α-amanitín\\w*", "muchotrávk\\w*"],
  short: "Toxín muchotrávky zelenej: blokuje RNA-polymerázu II a zastaví tvorbu mRNA. Postihne najmä pečeň (masívna nekróza hepatocytov)."
},
{
  id: "alfa-glukozidaza",
  title: "α-glukozidáza",
  match: ["α-glukozidáz\\w*"],
  short: "Lyzozómový enzým, ktorý štiepi glykogén."
},
{
  id: "pompe", et: "podľa Johanna Pompeho",
  img: {
    src: "assets/images/pompe-vacuoles.jpg",
    alt: "Pompeho choroba: veľké vakuoly vo svalových vláknach (H&E, zmrazený rez).",
    caption: "Pompeho choroba: veľké vakuoly vo svalových vláknach (H&E, zmrazený rez).",
    credit: "Jensflorian · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Pompe_vacuoles.jpg"
  },
  title: "Pompeho choroba",
  match: ["Pompeh\\w*(?:\\s+choro\\w*)?"],
  short: "Nedostatok α-glukozidázy vedie k hromadeniu glykogénu v svalstve a srdci."
},
{
  id: "chaperony", et: "franc. <i>chaperon</i> „sprievodkyňa“",
  title: "Chaperóny",
  match: ["chaperón\\w*"],
  short: "Bielkoviny, ktoré pomáhajú novým reťazcom poskladať sa do správneho tvaru."
},
{
  id: "misfolding", et: "angl. <i>mis-</i> + <i>folding</i>",
  title: "Misfolding",
  match: ["misfolding\\w*", "nesprávne\\s+poskladan\\w*"],
  short: "Nesprávne skladanie bielkoviny — vznikajú nerozpustné agregáty (základ amyloidózy a prionových chorôb)."
}

);

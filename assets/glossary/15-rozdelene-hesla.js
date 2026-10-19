/* Glosár PATOLY — heslá, ktoré boli pôvodne zlúčené (viac pojmov v jednom okne) a sú teraz rozdelené:
   každý pojem má vlastné okno. Zoznamy zástupcov a odkazy „Ďalší v skupine“ doplní súbor 99-skupiny.js.
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── bunky kosti ─────────────────────────────────────────────────────── */
{
  id: "kostne-bunky",
  title: "Bunky kosti",
  match: ["kostn\\w*\\s+bun\\w*", "bunk\\w*\\s+kosti"],
  short: "Kosť sa celý život prestavuje: jedny bunky ju tvoria, iné rozkladajú a tretie ju udržiavajú. Rovnováha medzi tvorbou a odbúravaním určuje hustotu kosti (osteoporóza je jej porucha)."
},
{
  id: "osteoblast", et: "gr. <i>osteon</i> „kosť“ + <i>blastos</i> „klíček“",
  title: "Osteoblast",
  match: ["osteoblast\\w*"],
  short: "Bunka, ktorá tvorí kostnú hmotu: vylučuje osteoid (kolagén typu I) a podporuje jeho mineralizáciu.",
  body:
    "<ul>" +
      "<li><b>Pôvod:</b> z mezenchýmových kmeňových buniek.</li>" +
      "<li><b>Špecifické:</b> je zdrojom alkalickej fosfatázy (zvýšená pri intenzívnej tvorbe kosti); pri hojení zlomeniny tvorí kalus.</li>" +
      "<li><b>Osud:</b> časť sa zamuruje do kostnej hmoty a stane sa osteocytom.</li>" +
    "</ul>"
},
{
  id: "osteocyt", et: "gr. <i>osteon</i> „kosť“ + <i>kytos</i> „bunka“",
  title: "Osteocyt",
  match: ["osteocyt\\w*"],
  short: "Najpočetnejšia bunka kosti: osteoblast zamurovaný v kostnej dutinke, ktorý žije desaťročia a spojený je drobnými kanálikmi so susedmi.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> vníma mechanické zaťaženie a riadi, kde sa má kosť zosilniť a kde odbúrať.</li>" +
      "<li><b>Pri nekróze:</b> po odumretí kosti ostanú prázdne dutinky bez jadier.</li>" +
    "</ul>"
},
{
  id: "osteoklast", et: "gr. <i>osteon</i> „kosť“ + <i>klastos</i> „lámaný“",
  title: "Osteoklast",
  match: ["osteoklast\\w*"],
  short: "Veľká viacjadrová bunka, ktorá kosť rozkladá: pod sebou vytvorí kyslé prostredie a vylúči enzým katepsín K.",
  body:
    "<ul>" +
      "<li><b>Pôvod:</b> splynutím buniek z rady monocytov a makrofágov (signály M-CSF a RANKL).</li>" +
      "<li><b>Špecifické:</b> sedí v „lakune“ na povrchu odbúravanej kosti. Jeho činnosť tlmia bisfosfonáty a denosumab (lieky pri osteoporóze).</li>" +
    "</ul>"
},

/* ── pohlavné hormóny ────────────────────────────────────────────────── */
{
  id: "pohlavne-hormony",
  title: "Pohlavné hormóny",
  match: ["pohlavn\\w*\\s+hormón\\w*"],
  short: "Steroidné hormóny z vaječníkov, semenníkov a kôry nadobličiek. Riadia vývin a funkciu pohlavných orgánov a pôsobia aj na kosti, prsník a prostatu."
},
{
  id: "estrogeny", et: "gr. <i>oistros</i> „pudiaca sila, ruja“ + <i>-genes</i> „tvoriaci“",
  title: "Estrogény",
  match: ["estrogén\\w*"],
  short: "Ženské pohlavné hormóny z vaječníkov (a z tukového tkaniva). Stimulujú rast sliznice maternice a mliečnej žľazy.",
  body:
    "<ul>" +
      "<li><b>Nerovnováha:</b> dlhodobý nadbytok estrogénov bez protiváhy progesterónu vedie k hyperplázii endometria.</li>" +
      "<li><b>Špecifické:</b> udržiavajú kostnú hmotu — po menopauze ich pokles urýchľuje osteoporózu.</li>" +
    "</ul>"
},
{
  id: "progesteron", et: "lat. <i>pro</i> „v prospech“ + <i>gestare</i> „nosiť (plod)“ + steroid + <i>-on</i>",
  title: "Progesterón (gestagény)",
  match: ["progesterón\\w*", "gestagén\\w*"],
  short: "Hormón žltého telieska po ovulácii: mení sliznicu maternice z proliferačnej na sekrečnú a pripravuje ju na uhniezdenie.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> brzdí účinok estrogénov na endometrium; po poklese hladiny (bez tehotenstva) sa sliznica odlúpne — menštruácia.</li>" +
    "</ul>"
},

/* ── vírusy ──────────────────────────────────────────────────────────── */
{
  id: "enterovirusy", et: "gr. <i>enteron</i> „črevo“ + lat. <i>virus</i> „jed“",
  title: "Enterovírusy a adenovírusy",
  match: ["enterovír\\w*\\s+a\\s+adenovír\\w*", "enterovír\\w*"],
  short: "Vírusy, ktoré vstupujú dýchacími cestami alebo črevom. Enterovírusy majú RNA (poliovírus, Coxsackie), adenovírusy DNA; väčšinou vyvolávajú zápal slizníc."
},
{
  id: "poliovirus", et: "gr. <i>polios</i> „sivý“ + <i>myelos</i> „dreň“ (poliomyelitída = zápal sivej hmoty miechy)",
  title: "Poliovírus (detská obrna)",
  match: ["poliovír\\w*", "poliomyelitíd\\w*"],
  short: "Enterovírus, ktorý sa po infekcii čreva môže dostať do miechy a zničiť motorické neuróny predných rohov.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> chabá obrna svalov, ktorých neuróny zanikli — sval atrofuje (neurogénna atrofia). Očkovanie ho takmer vyhubilo.</li>" +
    "</ul>"
},
{
  id: "coxsackie", et: "podľa mesta Coxsackie v štáte New York, kde bol vírus prvýkrát izolovaný",
  title: "Coxsackie vírusy",
  match: ["Coxsackie\\w*"],
  short: "Enterovírusy, ktoré vyvolávajú zápal slizníc a kože (ochorenie rúk, nôh a úst), meningitídu a myokarditídu.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> v myokarde môžu vyvolať vírusovú myokarditídu — zápal s lymfocytmi a nekrózou kardiomyocytov.</li>" +
    "</ul>"
},
{
  id: "adenovirus", et: "gr. <i>aden</i> „žľaza“ (prvýkrát izolovaný z adenoidného tkaniva) + lat. <i>virus</i> „jed“",
  title: "Adenovírusy",
  match: ["adenovír\\w*", "adenovirus"],
  short: "Vírusy s DNA, ktoré vyvolávajú zápal dýchacích ciest, spojoviek a čreva.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> v postihnutých bunkách vytvárajú veľké jadrové inklúzie („smudge cells“) a môžu vyvolať ťažkú pneumóniu u detí a imunosuprimovaných.</li>" +
    "</ul>"
},

/* ── krvácanie do telesných dutín ────────────────────────────────────── */
{
  id: "krvacanie-do-dutin",
  img: {
    src: "assets/images/hemopericardium-gross.jpg",
    alt: "Hemoperikard: krv v osrdcovníkovom vaku.",
    caption: "Hemoperikard: krv v osrdcovníkovom vaku.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_hemopericardium.jpg"
  },
  title: "Krvácanie do telesných dutín",
  match: ["krvácani\\w*\\s+do\\s+(?:telesn\\w*\\s+)?dutín\\w*"],
  short: "Krv, ktorá unikne z cievy do prirodzenej dutiny (osrdcovník, pohrudnica, brušná dutina, kĺb, komory mozgu), sa tam nevie vstrebať ani odtiecť. Názov hovorí, o akú dutinu ide, a nebezpečné je stlačenie orgánu."
},
{
  id: "hemoperikard", et: "gr. <i>haima</i> „krv“ + <i>peri</i> „okolo“ + <i>kardia</i> „srdce“",
  title: "Hemoperikard",
  match: ["hemoperikard\\w*"],
  short: "Krv v osrdcovníku. Pri rýchlom nahromadení stlačí srdce a vyvolá tamponádu srdca.",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> prasknutie steny srdca po infarkte, roztrhnutie aorty, poranenie.</li>" +
      "<li><b>Špecifické:</b> osrdcovník sa nevie rýchlo roztiahnuť, preto stačí aj niekoľko stoviek mililitrov krvi na smrteľnú tamponádu.</li>" +
    "</ul>",
  img: {
    src: "assets/images/hemopericardium-gross.jpg",
    alt: "Pitevný obraz hemoperikardu: srdce v osrdcovníku vyplnenom krvou.",
    caption: "Hemoperikard pri pitve: osrdcovník vyplnený krvou.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_hemopericardium.jpg"
  }
},
{
  id: "hemotorax", et: "gr. <i>haima</i> „krv“ + <i>thorax</i> „hrudník, pancier“",
  title: "Hemotorax",
  match: ["hemotorax\\w*"],
  short: "Krv v pohrudnicovej dutine. Stlačí pľúca a posúva mediastinum.",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> poranenie hrudníka, prasknutie aneuryzmy aorty, nádor, antikoagulačná liečba.</li>" +
      "<li><b>Špecifické:</b> krv v pohrudnici sa zráža pomaly (pohyby pľúc ju premiešavajú), preto sa dá odsať drénom.</li>" +
    "</ul>"
},
{
  id: "hemocefalus", et: "gr. <i>haima</i> „krv“ + <i>kephale</i> „hlava“",
  img: {
    src: "assets/images/cerebral-hemorrhage.jpg",
    alt: "Masívne vnútrolebkové krvácanie.",
    caption: "Masívne vnútrolebkové krvácanie.",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Hemorr%C3%A0gia_cerebral.1444.jpg"
  },
  title: "Hemocefalus a krvácanie do komôr mozgu",
  match: ["hemocefalus\\w*"],
  short: "Krv v komorovom systéme mozgu. Zablokuje odtok likvoru a zväčší komory (hydrocefalus).",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> prelomenie intracerebrálneho krvácania do komôr, u nedonosených novorodencov krvácanie zo zárodočnej matrice.</li>" +
    "</ul>"
},
{
  id: "hemoperitoneum", et: "gr. <i>haima</i> „krv“ + <i>peritoneum</i> „pobrušnica“",
  title: "Hemoperitoneum",
  match: ["hemoperitone\\w*"],
  short: "Krv v brušnej dutine. Vzniká pri prasknutí sleziny alebo pečene, mimomaternicovej gravidity, aneuryzmy aorty alebo poranení.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> krv dráždi pobrušnicu (bolesť, rigidita brucha); väčšie množstvo vedie k hypovolemickému (hemoragickému) šoku.</li>" +
    "</ul>"
},

/* ── názvy krvácania podľa miesta ────────────────────────────────────── */
{
  id: "nazvy-krvacania", et: "-rágia: gr. <i>rhegnynai</i> „pretrhnúť, vyvaliť sa“",
  title: "Názvy krvácania podľa miesta",
  match: ["názv\\w*\\s+krvácani\\w*\\s+podľa\\s+miesta", "názv\\w*\\s+krvácani\\w*", "krvácani\\w*\\s+podľa\\s+miesta"],
  short: "Medicína pomenúva krvácanie podľa toho, odkiaľ krv vychádza a ako sa objaví. Z názvu hneď vidno, v ktorom orgáne hľadať zdroj."
},
{
  id: "gastroragia", et: "gr. <i>gaster</i> „žalúdok“ + <i>rhegnynai</i> „pretrhnúť, vyvaliť sa“",
  title: "Gastrorágia",
  match: ["gastrorági\\w*"],
  short: "Krvácanie zo žalúdka. Môže sa prejaviť vracaním krvi (hemateméza) alebo čiernou stolicou (meléna).",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> peptický vred, erózie (NSAID, stres), varixy pažeráka, nádor.</li>" +
    "</ul>"
},
{
  id: "enteroragia", et: "gr. <i>enteron</i> „črevo“ + <i>rhegnynai</i> „pretrhnúť, vyvaliť sa“",
  title: "Enterorágia",
  match: ["enterorági\\w*"],
  short: "Krvácanie z čreva (tenkého aj hrubého) navonok stolicou. Čím nižšie je zdroj, tým je krv jasnejšia.",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> divertikuly, nádory, zápalové choroby čreva, hemoroidy, angiodysplázie.</li>" +
    "</ul>"
},
{
  id: "menoragia", et: "gr. <i>men</i> „mesiac“ + <i>rhegnynai</i> „pretrhnúť, vyvaliť sa“",
  title: "Menorágia",
  match: ["menorági\\w*", "hypermenore\\w*"],
  short: "Silná alebo predĺžená menštruácia v pravidelnom cykle. Môže viesť k nedostatku železa.",
  body:
    "<ul>" +
      "<li><b>Príčiny:</b> myómy, hyperplázia endometria, poruchy zrážania (napr. von Willebrandova choroba).</li>" +
    "</ul>"
},
{
  id: "metroragia", et: "gr. <i>metra</i> „maternica“ + <i>rhegnynai</i> „pretrhnúť, vyvaliť sa“",
  title: "Metrorágia",
  match: ["metrorági\\w*"],
  short: "Krvácanie z maternice mimo menštruačného cyklu (medzi menštruáciami, po menopauze). Býva dôvodom na vylúčenie nádoru endometria."
},

/* ── štítna žľaza ────────────────────────────────────────────────────── */
{
  id: "stitna-zlaza",
  title: "Štítna žľaza",
  match: ["štítn\\w*\\s+žľaz\\w*", "štítn\\w*"],
  short: "Žľaza na prednej strane krku, ktorá tvorí hormóny regulujúce metabolizmus (tyroxín a trijódtyronín) a riadi sa hormónom hypofýzy TSH. Jej poruchy sú buď nedostatok, nadbytok hormónov alebo zväčšenie žľazy."
},
{
  id: "hypotyreoza", et: "gr. <i>hypo</i> „pod“ + <i>thyreoeides</i> „štítovitý“ (<i>thyreos</i> „štít“)",
  title: "Hypotyreóza",
  match: ["hypotyreóz\\w*"],
  short: "Nedostatok hormónov štítnej žľazy: spomalenie metabolizmu, únava, priberanie, studená koža a opuch podkožia (myxedém)."
},
{
  id: "hypertyreoza", et: "gr. <i>hyper</i> „nad“ + <i>thyreoeides</i> „štítovitý“; tyreotoxikóza: + <i>toxikon</i> „jed“",
  title: "Hypertyreóza (tyreotoxikóza)",
  match: ["hypertyreóz\\w*", "tyreotoxikóz\\w*"],
  short: "Nadbytok hormónov štítnej žľazy: zrýchlený metabolizmus, tachykardia, chudnutie, potenie a trasenie rúk."
},
{
  id: "struma", et: "lat. <i>struma</i> „opuchlina, hrča“",
  img: {
    src: "assets/images/thyroid-hyperplasia-gross.jpg",
    alt: "Difúzna hyperplázia štítnej žľazy – struma (MA).",
    caption: "Difúzna hyperplázia štítnej žľazy – struma (MA).",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Thyroid,_Diffuse_Hyperplasia.jpg"
  },
  title: "Struma (hrvoľ)",
  match: ["strum\\w*"],
  short: "Zväčšenie štítnej žľazy. Najčastejšie pri nedostatku jódu: málo hormónov → ↑ TSH → žľaza rastie, aby ich vyrobila viac."
},

/* ── typy šoku ───────────────────────────────────────────────────────── */
{
  id: "hypovolemicky-sok",
  img: {
    src: "assets/images/shock-kidney-gross.jpg",
    alt: "Oblička pri smrteľnom hypovolemickom šoku (MA).",
    caption: "Oblička pri smrteľnom hypovolemickom šoku (MA).",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Ronyó.Xoc_hipovolèmic.0299.jpg"
  },
  title: "Hypovolemický šok",
  match: ["hypovolemick\\w*(?:\\s+šok\\w*)?"],
  short: "Šok z nedostatku objemu krvi: krvácanie, dehydratácia, rozsiahle popáleniny. Srdce nemá čo prečerpať.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> studená, bledá, spotená koža (centralizácia obehu), rýchly slabý pulz a nízky tlak; dobre odpovedá na doplnenie objemu.</li>" +
    "</ul>"
},
{
  id: "kardiogenny-sok", et: "gr. <i>kardia</i> „srdce“ + <i>-genes</i> „tvoriaci“",
  title: "Kardiogénny šok",
  match: ["kardiogénn\\w*(?:\\s+šok\\w*)?"],
  short: "Šok zo zlyhania pumpy: srdce nevie vypudiť dosť krvi (rozsiahly infarkt myokardu, ťažká arytmia, akútna chlopňová chyba).",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> objem krvi je normálny alebo zvýšený, a preto sa pred zlyhávajúcou komorou hromadí: nabrekajú žily na krku a pľúca sú v edéme.</li>" +
    "</ul>"
},
{
  id: "distribucny-sok", et: "lat. <i>distribuere</i> „rozdeliť“; neurogénny: gr. <i>neuron</i> „nerv“ + <i>-genes</i> „tvoriaci“",
  title: "Distribučný šok (septický, anafylaktický, neurogénny)",
  match: ["distribučn\\w*(?:\\s+šok\\w*)?", "septick\\w*\\s+šok\\w*", "neurogénn\\w*\\s+šok\\w*", "anafylaktick\\w*\\s+šok\\w*"],
  short: "Šok z rozšírenia ciev: krvi je dosť, ale cievne riečisko sa príliš rozšíri a tlak klesne.",
  body:
    "<ul>" +
      "<li><b>Septický:</b> mediátory zápalu rozšíria cievy a zvýšia ich priepustnosť.</li>" +
      "<li><b>Anafylaktický:</b> histamín z mastocytov po IgE reakcii.</li>" +
      "<li><b>Neurogénny:</b> strata sympatikového tonusu (poranenie miechy), cievy ochabnú.</li>" +
    "</ul>"
},
{
  id: "obstrukcny-sok", et: "lat. <i>obstruere</i> „zatarasiť“ (<i>ob</i> „proti“ + <i>struere</i> „stavať“)",
  title: "Obštrukčný šok",
  match: ["obštrukčn\\w*\\s+šok\\w*"],
  short: "Šok z mechanickej prekážky plnenia alebo vypudenia krvi: masívna pľúcna embólia, tamponáda srdca, napätý pneumotorax."
},

/* ── hypertrofia ─────────────────────────────────────────────────────── */
{
  id: "koncentricka-hypertrofia", et: "lat. <i>con-</i> „spolu“ + <i>centrum</i> „stred“ (gr. <i>kentron</i> „stred, osteň“)",
  img: {
    src: "assets/images/lvh-gross.jpg",
    alt: "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    caption: "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_left_ventricular_hypertrophy.jpg"
  },
  title: "Koncentrická hypertrofia",
  match: ["koncentrick\\w*\\s+hypertrofi\\w*"],
  short: "Stena komory zhrubne bez zväčšenia dutiny. Vzniká pri tlakovej záťaži (hypertenzia, zúženie aorty): sarkoméry pribúdajú paralelne.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> komora je tuhá (diastolická dysfunkcia), pretože sval zhrubol a ťažko sa napĺňa.</li>" +
    "</ul>"
},
{
  id: "excentricka-hypertrofia", et: "lat. <i>ex-</i> „von“ + <i>centrum</i> „stred“",
  title: "Excentrická hypertrofia",
  match: ["excentrick\\w*\\s+hypertrofi\\w*"],
  short: "Zväčší sa dutina aj stena komory. Vzniká pri objemovej záťaži (nedomykavosť chlopne, anémia): sarkoméry pribúdajú sériovo.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> hmotnosť srdca rastie, ale pomer steny k dutine zostáva; neskôr sa komora rozšíri a zlyhá.</li>" +
    "</ul>"
},

/* ── hormóny pankreasu ───────────────────────────────────────────────── */
{
  id: "inzulin", et: "lat. <i>insula</i> „ostrov“ (Langerhansove ostrovčeky)",
  title: "Inzulín",
  match: ["inzulín\\w*"],
  short: "Hormón β-buniek Langerhansových ostrovčekov. Po jedle znižuje hladinu glukózy: otvára jej vstup do svalov a tukových buniek a podporuje ukladanie glykogénu a tuku.",
  body:
    "<ul>" +
      "<li><b>Nedostatok</b> (diabetes 1. typu) alebo <b>necitlivosť buniek</b> naň (inzulínová rezistencia pri diabete 2. typu) vedie k hyperglykémii.</li>" +
    "</ul>"
},
{
  id: "glukagon",
  title: "Glukagón",
  match: ["glukagón\\w*"],
  short: "Hormón α-buniek Langerhansových ostrovčekov, ktorý zvyšuje glykémiu: rozkladá glykogén v pečeni a podporuje tvorbu glukózy.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> je protiváhou inzulínu; pri hypoglykémii sa vstrekuje ako záchranný liek.</li>" +
    "</ul>"
},

/* ── eikosanoidy ─────────────────────────────────────────────────────── */
{
  id: "eikosanoidy", et: "gr. <i>eikosi</i> „dvadsať“ (20 atómov uhlíka) + <i>-eides</i> „podobný“",
  title: "Eikosanoidy (mediátory z kyseliny arachidónovej)",
  match: ["eikosanoid\\w*", "arachidón\\w*"],
  short: "Mediátory zápalu, ktoré bunky vyrobia z kyseliny arachidónovej uvoľnenej z membrán. Cyklooxygenázová dráha dáva prostaglandíny a tromboxán, lipoxygenázová leukotriény."
},
{
  id: "prostaglandiny", et: "prostata (kde boli prvýkrát nájdené) + lat. <i>glans, glandis</i> „žaluď“ (žľaza)",
  title: "Prostaglandíny",
  match: ["prostaglandín\\w*"],
  short: "Cyklooxygenázou vyrobené mediátory: rozširujú cievy, zvyšujú citlivosť na bolesť a spolu s IL-1 posúvajú v hypotalame teplotu vyššie (horúčka).",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> v žalúdku chránia sliznicu, preto ich blokáda (NSAID) poškodzuje žalúdok.</li>" +
    "</ul>"
},
{
  id: "tromboxan", et: "gr. <i>thrombos</i> „zrazenina“ + oxán (kruh s kyslíkom v molekule)",
  title: "Tromboxán A₂",
  match: ["tromboxán\\w*(?:\\s*A[₂2])?", "TXA[₂2]"],
  short: "Cyklooxygenázou vyrobený mediátor doštičiek: stiahne cievu a zlepuje doštičky do zátky.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> kyselina acetylsalicylová nevratne zablokuje jeho tvorbu v doštičkách (doštičky nemajú jadro a enzým si nevyrobia nový).</li>" +
    "</ul>"
},
{
  id: "leukotrieny", et: "gr. <i>leukos</i> „biely“ (leukocyty) + trién (tri striedavé dvojité väzby)",
  title: "Leukotriény",
  match: ["leukotrién\\w*", "lipoxygenáz\\w*"],
  short: "Mediátory vyrobené lipoxygenázou: zúžia priedušky, zvýšia priepustnosť ciev a priťahujú neutrofily.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> sú dôležité pri astme; blokuje ich napr. montelukast. Nezastavia ich NSAID.</li>" +
    "</ul>"
},

/* ── pro-resolvujúce mediátory ───────────────────────────────────────── */
{
  id: "spm",
  title: "Pro-resolvujúce mediátory (SPM; angl. specialized pro-resolving mediators)",
  match: ["pro-?resolvuj\\w*\\s+mediátor\\w*", "pro-?resolving", "špecializovan\\w*\\s+pro-?resolv\\w*", "SPM"],
  short: "Mediátory, ktoré zápal aktívne ukončujú: zastavia prílev neutrofilov a podporia odstránenie odumretých buniek makrofágmi. Vznikajú z nenasýtených mastných kyselín."
},
{
  id: "lipoxiny",
  title: "Lipoxíny",
  match: ["lipoxín\\w*"],
  short: "Mediátory z kyseliny arachidónovej, ktoré tlmia migráciu neutrofilov a podporujú čistenie ložiska makrofágmi.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> vznikajú spoluprácou dvoch druhov buniek a sú „prepínačom“ od iniciácie k ústupu zápalu; kyselina acetylsalicylová zvyšuje tvorbu ich stabilnej formy.</li>" +
    "</ul>"
},
{
  id: "rezolviny", et: "lat. <i>resolvere</i> „rozviazať, vyriešiť“ (ústup zápalu)",
  title: "Rezolvíny",
  match: ["rezolvín\\w*", "resolvin\\w*"],
  short: "Mediátory z omega-3 mastných kyselín (EPA, DHA), ktoré zastavujú prílev neutrofilov a podporujú eferocytózu."
},
{
  id: "protektiny", et: "lat. <i>protegere</i> „chrániť“",
  title: "Protektíny",
  match: ["protektín\\w*"],
  short: "Mediátory z DHA, ktoré chránia tkanivo a tlmia zápal."
},
{
  id: "marezin", et: "angl. <i>macrophage mediators in resolving inflammation</i>",
  title: "Marezíny",
  match: ["marezín\\w*"],
  short: "Mediátory z DHA, ktoré podporujú čistenie ložiska a hojenie."
},

/* ── katecholamíny ───────────────────────────────────────────────────── */
{
  id: "katecholaminy", et: "katechol (z katechu, rastlinného extraktu) + amín",
  title: "Katecholamíny",
  match: ["katecholamín\\w*"],
  short: "Hormóny drene nadobličiek a mediátory sympatikového nervstva. Pripravujú telo na záťaž: zrýchlia srdce, zvýšia tlak a stiahnu cievy kože a vnútorností."
},
{
  id: "adrenalin", et: "lat. <i>ad</i> „pri“ + <i>ren</i> „oblička“ (hormón nadobličky)",
  title: "Adrenalín",
  match: ["adrenalín\\w*"],
  short: "Hlavný hormón drene nadobličiek. Zrýchli srdce, rozšíri priedušky a zvýši glykémiu.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> je liekom prvej voľby pri anafylaxii a pri zástave srdca.</li>" +
    "</ul>"
},
{
  id: "noradrenalin", et: "nor- z nem. <i>N ohne Radikal</i> „dusík bez metylovej skupiny“ + adrenalín",
  title: "Noradrenalín",
  match: ["noradrenalín\\w*"],
  short: "Prenášač sympatikových nervov a hormón drene nadobličiek. Stiahne cievy (zvýši tlak) menej však urýchli srdce.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> je liekom pri septickom šoku — vazopresor, ktorý zdvihne tlak.</li>" +
    "</ul>"
},

/* ── zápaly (siblings-only skupiny) ──────────────────────────────────── */
{
  id: "cholecystitida", et: "gr. <i>chole</i> „žlč“ + <i>kystis</i> „mechúr“ + <i>-itis</i> „zápal“",
  title: "Cholecystitída",
  match: ["cholecystitíd\\w*"],
  short: "Zápal žlčníka, najčastejšie po zaklinení žlčového kameňa v jeho vývode. Prejaví sa bolesťou v pravom podrebrí, horúčkou a zápalom steny.",
  body:
    "<ul>" +
      "<li><b>Komplikácie:</b> empyém žlčníka, gangréna, perforácia.</li>" +
    "</ul>"
},
{
  id: "cholangitida", et: "gr. <i>chole</i> „žlč“ + <i>angeion</i> „cieva“ + <i>-itis</i> „zápal“",
  title: "Cholangitída",
  match: ["cholangitíd\\w*"],
  short: "Zápal žlčových ciest, najčastejšie baktériový po zablokovaní odtoku (kameň, nádor). Klasická trojica: horúčka, žltačka, bolesť.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> baktérie vystupujú do pečene, čo vedie k abscesom v pečeni.</li>" +
    "</ul>"
},
{
  id: "cholestaza", et: "gr. <i>chole</i> „žlč“ + <i>stasis</i> „zastavenie“",
  title: "Cholestáza",
  match: ["cholestáz\\w*"],
  short: "Porucha odtoku žlče. Žlč sa hromadí v pečeni, bilirubín a žlčové kyseliny stúpajú v krvi (žltačka, svrbenie).",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> stolica je odfarbená, moč tmavý; v pečeni sa nahromadí žlč (žlčové zátky).</li>" +
    "</ul>"
},
{
  id: "sinusitida", et: "lat. <i>sinus</i> „zátoka, dutina“ + gr. <i>-itis</i> „zápal“",
  title: "Sinusitída",
  match: ["sinusitíd\\w*"],
  short: "Zápal prinosových dutín. Opuch sliznice zatvorí vývody, hnis sa nahromadí a dutina bolí.",
},
{
  id: "rinitida", et: "gr. <i>rhis, rhinos</i> „nos“ + <i>-itis</i> „zápal“",
  title: "Rinitída",
  match: ["rinitíd\\w*"],
  short: "Zápal nosovej sliznice. Infekčná (nádcha) je najčastejšie vírusová, alergická vzniká po vdýchnutí alergénu (IgE, histamín)."
},
{
  id: "tracheitida", et: "gr. <i>tracheia</i> „drsná (trubica)“ + <i>-itis</i> „zápal“",
  title: "Tracheitída",
  match: ["tracheitíd\\w*"],
  short: "Zápal sliznice priedušnice.",
  body: "<ul><li>Vírusový býva katarálny, pri chrípke môže byť hemoragický alebo príškvarový.</li></ul>"
},
{
  id: "laryngotracheitida",
  title: "Laryngotracheitída",
  match: ["laryngotracheitíd\\w*"],
  short: "Zápal hrtana a priedušnice; u detí vyvolá zúženie dýchacích ciest."
},
{
  id: "cystitida", et: "gr. <i>kystis</i> „mechúr“ + <i>-itis</i> „zápal“",
  title: "Cystitída",
  match: ["cystitíd\\w*"],
  short: "Zápal močového mechúra, najčastejšie baktériový (E. coli) a vzostupný z močovej rúry. Prejaví sa pálením pri močení a častým močením.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> hemoragická cystitída môže vzniknúť po cyklofosfamide alebo vírusovej infekcii.</li>" +
    "</ul>"
},
{
  id: "uretritida", et: "gr. <i>ourethra</i> „močová rúra“ (<i>ouron</i> „moč“) + <i>-itis</i> „zápal“",
  title: "Uretritída",
  match: ["uretritíd\\w*"],
  short: "Zápal močovej rúry, často pohlavne prenosný (gonokok, chlamýdie). Pálenie pri močení a výtok."
},
{
  id: "pyelonefritida", et: "gr. <i>pyelos</i> „nádoba, panvička“ + <i>nephros</i> „oblička“ + <i>-itis</i> „zápal“",
  title: "Pyelonefritída",
  match: ["pyelonefritíd\\w*"],
  short: "Zápal obličkovej panvičky a parenchýmu, najčastejšie vzostupný z močového mechúra. Horúčka, bolesť v bedre a hnisavé ložiská.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> môže viesť k abscesom a zjazveniu obličky.</li>" +
    "</ul>"
},
{
  id: "hyperkalciemia", et: "gr. <i>hyper</i> „nad“ + lat. <i>calx</i> „vápno“ + gr. <i>haima</i> „krv“",
  title: "Hyperkalciémia",
  match: ["hyperkalciémi\\w*"],
  short: "Vápnik v krvi nad hornou hranicou normy. Vedie k smädu, zápche, poruchám rytmu srdca a únave; príčinou je napr. nádor, hyperparatyreóza alebo sarkoidóza."
},
{
  id: "hyperkalciuria", et: "gr. <i>hyper</i> „nad“ + lat. <i>calx</i> „vápno“ + gr. <i>ouron</i> „moč“",
  title: "Hyperkalciúria",
  match: ["hyperkalciúri\\w*"],
  short: "Zvýšené vylučovanie vápnika močom. Podporuje vznik obličkových kameňov a nefrokalcinózy."
},
{
  id: "menstruacia", et: "lat. <i>menstruus</i> „mesačný“ (<i>mensis</i> „mesiac“)",
  title: "Menštruácia",
  match: ["menštruáci\\w*"],
  short: "Cyklické odlúpenie sliznice maternice po poklese hladiny progesterónu, keď nenastalo tehotenstvo. Trvá bežne 3–7 dní."
}

);

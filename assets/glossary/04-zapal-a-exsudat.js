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
  id: "exsudat",
  title: "Exsudát",
  match: ["exsudát\\w*", "exsudáci\\w*"],
  short: "Zápalový výpotok bohatý na bielkoviny — vzniká, keď je poškodená priepustnosť cievnej steny.",
  body:
    '<p class="chain">mediátory zápalu → kontrakcia endotelu a transcytóza → <b>↑ priepustnosť ciev</b> → z cievy uniká voda, elektrolyty a bielkoviny (fibrinogén, imunoglobulíny) → exsudát</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bielkoviny v exsudáte <b>naťahujú do tkaniva ďalšiu vodu</b> a opuch rastie. Podľa toho, čo v exsudáte prevláda, sa zápaly delia (serózny, fibrinózny, hnisavý…).</p>'
},
{
  id: "transsudat",
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
  id: "hyperemia",
  title: "Hyperémia",
  match: ["hyperémi\\w*"],
  short: "Zvýšený obsah krvi v tkanive — aktívna (viac prítoku) alebo pasívna (horší odtok).",
  body:
    '<div class="fork">' +
      "<div><b>Aktívna</b><br>vazodilatácia arteriol<br>červené, teplé — zápal</div>" +
      "<div><b>Pasívna (kongescia)</b><br>ťažký odtok žilovej krvi<br>modrasté, chladné — srdcové zlyhanie</div>" +
    "</div>"
},
{
  id: "staza",
  title: "Krvná stáza",
  match: ["stáz\\w*"],
  short: "Spomalenie až zastavenie toku krvi v zápalovom riečisku.",
  body:
    '<p class="chain">↑ priepustnosť ciev → strata tekutiny → ↑ viskozita krvi + rozšírené riečisko → <b>tok sa spomalí</b> → leukocyty sa dostanú k stene cievy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez spomalenia by leukocyty prúdili stredom cievy a k endotelu by sa nedostali. Pri ťažkom zápale môže stáza viesť k <b>trombóze a nekróze</b>.</p>'
},
{
  id: "histamin",
  title: "Histamín a mastocyty",
  match: ["histamín\\w*", "mastocyt\\w*", "žírn\\w*\\s+bunk\\w*"],
  short: "Histamín z mastocytov spôsobí okamžité rozšírenie ciev a zvýšenie ich priepustnosti.",
  body:
    '<p class="chain">poškodenie → <b>mastocyty</b> uvoľnia histamín → receptory H1 na endoteli → kontrakcia endotelových buniek → <b>medzery</b> medzi bunkami → únik plazmy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ide o <b>rýchlu, prechodnú</b> odpoveď (desiatky minút). Neskoršiu a dlhšiu priepustnosť vyvolávajú cytokíny (TNF-α, IL-1).</p>'
},
{
  id: "bradykinin",
  title: "Bradykinín",
  match: ["bradykinín\\w*"],
  short: "Peptid z kininového systému, ktorý zvyšuje priepustnosť ciev a dráždi receptory bolesti.",
  body:
    '<p class="chain">poškodenie → aktivácia kininového systému → <b>bradykinín</b> → vazodilatácia + ↑ priepustnosť + podráždenie nervových zakončení</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo zápal <b>bolí</b> a prečo opuchne aj bez zásahu mastocytov.</p>'
},
{
  id: "cytokiny-zapal",
  title: "TNF-α a IL-1 (cytokíny zápalu)",
  match: ["TNF-?α", "TNF", "IL-\\d+\\w*", "interleukín\\w*", "cytokín\\w*", "chemokín\\w*"],
  short: "Signalizačné bielkoviny, ktoré zmenia endotel: viac adhezívnych molekúl a dlhšie trvajúca priepustnosť.",
  body:
    '<p class="chain">makrofág alebo poškodená bunka → <b>TNF-α, IL-1</b> → endotel exprimuje E-selektín a ICAM-1/VCAM-1 → leukocyty sa naviažu; zároveň pomalšia a dlhšia retrakcia endotelu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tieto molekuly prepájajú <b>lokálny zápal s celkovou reakciou</b> (horúčka, akútna fáza).</p>'
},
{
  id: "transcytoza",
  title: "Transcytóza",
  match: ["transcytóz\\w*"],
  short: "Prenos bielkovín cez endotelovú bunku v pľuzgierikoch (vezikulách) — nie medzerou, ale bunkou.",
  body:
    '<p class="chain">bielkovina na luminálnej strane → <b>vezikula</b> → bunkou na abluminálnu stranu → vyprázdnenie do tkaniva</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to druhá cesta úniku bielkovín pri zápale (popri medzerách medzi bunkami). Stupňuje ju napr. VEGF.</p>'
},
{
  id: "selektiny-integriny",
  title: "Selektíny a integríny",
  match: ["selektín\\w*", "integrín\\w*", "[PE]-selektín\\w*", "β2-integrín\\w*", "ICAM-1", "VCAM-1", "LFA-1", "Mac-1", "PECAM-1", "sialyl-Lewis\\s+X", "rolling", "pavimentáci\\w*", "marginácia", "marginác\\w*"],
  short: "Dve rodiny adhezívnych molekúl: selektíny leukocyt spomalia (rolling), integríny ho zastavia.",
  body:
    '<p class="chain">stáza → <b>marginácia</b> → <b>selektíny</b> (slabá, rozpojiteľná väzba) → leukocyt sa „prevaľuje“ (rolling) → chemokíny aktivujú <b>integríny</b> → pevná adhézia → zastavenie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Každý krok je samostatný ovládač — preto sa dá zápal <b>zacieliť</b> (blokádou integrínov pri niektorých chorobách).</p>'
},
{
  id: "diapedeza",
  title: "Diapedéza (transmigrácia)",
  match: ["diapedéz\\w*", "transmigrác\\w*"],
  short: "Prechod leukocytu cez cievnu stenu von z cievy — najčastejšie medzi bunkami postkapilárnej venuly.",
  body:
    '<p class="chain">pevne naviazaný leukocyt → <b>preplazí sa medzi endotelovými bunkami</b> (molekuly ako PECAM-1) → prekoná bazálnu membránu natrávením kolagenázou → je v tkanive</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez tohto kroku by zápalové bunky zostali v cieve a nedosiahli ložisko.</p>'
},
{
  id: "chemotaxia",
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
  id: "neutrofil",
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
  id: "makrofag-patola",
  title: "Makrofág",
  match: ["makrofág\\w*", "histiocyt\\w*"],
  short: "Fagocyt tkaniva — pohltí, prezentuje antigén a riadi hojenie.",
  body:
    '<p class="chain">monocyt z krvi → v tkanive <b>makrofág</b> → fagocytuje → uvoľní cytokíny → <b>rozbehne hojenie</b> (granulačné tkanivo)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na rozdiel od neutrofilov <b>prežije</b> a pri chronickom zápale sa stáva hlavnou bunkou — tvorí granulóm.</p>'
},
{
  id: "plazmocyt",
  title: "Lymfocyty a plazmocyty",
  match: ["plazmocyt(?!óm)\\w*", "lymfocyt\\w*", "nehnisav\\w*"],
  short: "Bunky špecifickej imunity — lymfocyty rozpoznávajú, plazmocyty (z B lymfocytov) vyrábajú protilátky.",
  body:
    '<p class="chain">antigén → B lymfocyt → <b>plazmocyt</b> → protilátky (imunoglobulíny)<br>T lymfocyt → cytokíny a cytotoxicita</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Lymfocytárny zápal ukazuje na <b>vírusovú infekciu alebo imunitnú reakciu</b> (autoimunitu, rejekciu), nie na bežnú bakteriálnu.</p>'
},
{
  id: "eozinofil",
  title: "Eozinofil",
  /* len podstatné meno (bunka); prídavné meno „eozinofilná“ = farbí sa eozínom → heslo he-farbenie */
  match: ["eozinofil", "eozinofily", "eozinofilov", "eozinofilmi", "eozinofilom", "eozinofiloch", "eozinofilné\\s+granulocyt\\w*"],
  short: "Granulocyt s ružovými granulami — typický pri alergii a parazitárnych infekciách.",
  body:
    '<p class="chain">IL-5 → <b>eozinofily</b> → granuly s toxickými bielkovinami → zabíjajú parazity; pri alergii poškodzujú aj tkanivo</p>' +
    '<p class="why"><b>Pozor na slovo.</b> „Eozinofilná cytoplazma“ neznamená eozinofily — znamená, že sa tkanivo farbí eozínom do ružova.</p>'
},
{
  id: "fibrin",
  title: "Fibrín a fibrinogén",
  match: ["fibrín\\w*", "fibrinogén\\w*", "fibrinózn\\w*", "serofibrinózn\\w*"],
  short: "Fibrinogén z plazmy sa v zápale premení na fibrín — vlákna, ktoré zachytávajú a spevňujú exsudát.",
  body:
    '<p class="chain">↑ priepustnosť → únik <b>fibrinogénu</b> → trombín → <b>fibrín</b> → siete vlákien na povrchu alebo v tkanive</p>' +
    "<ul>" +
      "<li><b>Odstránenie</b> — fibrinolýza (plazmín) a makrofágy.</li>" +
      "<li><b>Ak sa neodstráni</b> — organizuje sa granulačným tkanivom → <b>zrasty</b> (adhézie).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Fibrín obmedzuje šírenie infekcie, ale spôsobuje zrasty (napr. na perikarde alebo pobrušnici).</p>'
},
{
  id: "bakterialne-enzymy",
  title: "Enzýmy šírenia: koagulázy, fibrinolyzín, hyaluronidáza",
  match: ["koagulázu", "koagulázy", "koagulázou", "fibrinolyzín\\w*", "hyaluronidáz\\w*"],
  short: "Baktérie majú enzýmy, ktoré rozhodujú, či sa infekcia ohraničí (absces), alebo rozšíri (flegmóna).",
  body:
    '<div class="fork">' +
      "<div><b>Koagulázy</b> (stafylokok)<br>zrážajú fibrín, tvoria bariéru<br>→ <b>absces</b></div>" +
      "<div><b>Fibrinolyzín, hyaluronidáza</b> (streptokok)<br>rozpúšťajú fibrín a medzibunkovú hmotu<br>→ <b>flegmóna</b></div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Ten istý zápal skončí ohraničený, alebo difúzny podľa toho, aký enzým má pôvodca.</p>'
},
{
  id: "pyogenne-bakterie",
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
  id: "absces",
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
  id: "flegmona",
  title: "Flegmóna",
  match: ["flegmón\\w*"],
  short: "Neohraničený, difúzne sa šíriaci hnisavý zápal v intersticiu.",
  body:
    '<p class="chain">baktérie s <b>fibrinolyzínom a hyaluronidázou</b> → rozpúšťajú fibrín a medzibunkovú hmotu → hnis sa šíri po vrstvách väziva bez hraníc</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez bariéry sa infekcia šíri rýchlo a môže viesť k <b>sepse</b>.</p>'
},
{
  id: "empyem",
  title: "Empyém",
  match: ["empyém\\w*"],
  short: "Nahromadenie hnisu v už existujúcej dutine (pohrudnica, žlčník, perikard).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Hnis v dutine sa nevstrebe, preto treba <b>odvodnenie</b>.</p>'
},
{
  id: "pyogenna-membrana",
  title: "Pyogénna membrána",
  match: ["pyogénn\\w*\\s+membrán\\w*"],
  short: "Stena chronického abscesu — granulačné tkanivo s makrofágmi, ktoré ho ohraničuje.",
  body:
    '<p class="chain">absces pretrváva → okolo vzniká <b>granulačné tkanivo</b> → vytvára stenu → produkuje hnis a zároveň ohraničuje</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Po drenáži sa dutina musí zahojiť zvnútra; inak sa absces vráti.</p>'
},
{
  id: "furunkul-karbunkul",
  title: "Furunkul a karbunkul",
  match: ["furunkul\\w*", "karbunkul\\w*"],
  short: "Hnisavý zápal vlasového folikulu (furunkul) a splynutie viacerých furunklov (karbunkul).",
  body:
    '<p class="chain">stafylokok vo folikule → <b>absces v koži</b> → jeden = furunkul; viac splynutých s viacerými ústiami = <b>karbunkul</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Karbunkul je závažnejší, často na šiji a chrbte, a šíri sa hlbšie.</p>'
},
{
  id: "pyosalpinx",
  title: "Pyosalpinx",
  match: ["pyosalpinx"],
  short: "Hnis vo vajíčkovode — empyém vajíčkovodu.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Klasický príklad hnisavého zápalu <b>v dutom orgáne</b> so zabráneným odtokom.</p>'
},
{
  id: "pseudoabsces",
  title: "Pseudoabsces",
  match: ["pseudoabsces\\w*"],
  short: "Nahromadenie hnisu v už predtým existujúcej dutine, nie v novovytvorenej nekróze.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Nemá vlastnú stenu; využíva vrodenú dutinu orgánu, preto ho treba odlíšiť od pravého abscesu.</p>'
},
{
  id: "lymfangitida-pyemia",
  title: "Lymfangitída, flebitída a pyémia",
  match: ["lymfangitíd\\w*", "flebitíd\\w*", "pyémi\\w*", "tromboflebitíd\\w*"],
  short: "Šírenie hnisavého zápalu cievami: lymfatikami, žilami a krvou.",
  body:
    "<ul>" +
      "<li><b>Lymfangitída</b> — zápal lymfatickej cievy (červený pruh na koži).</li>" +
      "<li><b>Flebitída</b> — zápal žily; môže viesť k trombóze.</li>" +
      "<li><b>Pyémia</b> — infikované tromby sa odlomia a <b>rozsejú</b> hnis do orgánov (septické infarkty a abscesy).</li>" +
    "</ul>"
},
{
  id: "zaskrt",
  title: "Záškrt (diftéria) a difterická myokarditída",
  match: ["záškrt\\w*", "diftéri\\w*", "diphtheriae", "difterick\\w* myokardit\\w*"],
  short: "Infekcia <i>Corynebacterium diphtheriae</i>: baktéria ostáva v hltane, no jej toxín krvou poškodí srdce a nervy.",
  body:
    '<p class="chain">baktéria v hltane (toxín tvoria len kmene nesúce gén <i>tox</i> z bakteriofága) → toxín do krvi → podjednotka B sa naviaže na receptor bunky a vpustí podjednotku A do cytoplazmy → A ADP-ribozyluje <b>elongačný faktor 2</b> → <b>zastaví sa proteosyntéza</b> → bunka tukovo degeneruje a odumrie</p>' +
    "<ul>" +
      "<li><b>Hltan</b> — nekróza sliznice + fibrín → sivá, pevne prisadnutá <b>pablana</b> (difterický typ), pri strhnutí krváca; opuch krku, hrozí upchatie dýchacích ciest.</li>" +
      "<li><b>Srdce (myokarditída)</b> — obvykle v 2. týždni: kardiomyocyty s tukovou degeneráciou a ložiskovými nekrózami, len <b>riedky infiltrát</b> (baktéria v srdci nie je) → neskôr fibróza. Klinicky blokády vedenia, arytmie, zlyhanie srdca, náhla smrť; ↑ troponín, zmeny EKG.</li>" +
      "<li><b>Nervy</b> — rozpad myelínu: najprv ochrnutie mäkkého podnebia (nosová reč, návrat tekutín nosom), o niekoľko týždňov periférna polyneuropatia.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vzorový <b>alteratívny zápal</b> – toxín ničí bunky skôr, než príde obrana. <b>Antitoxín</b> neutralizuje len toxín voľný v krvi, nie ten, ktorý už vstúpil do buniek, preto sa podáva čo najskôr. Očkovanie <b>toxoidom</b> (inaktivovaný toxín) vytvorí protilátky, ktoré toxín zachytia ešte v krvi – preto je dnes záškrt v očkovaných populáciách zriedkavý.</p>'
},
{
  id: "pablana",
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
  id: "katar",
  title: "Katarálny zápal (katar)",
  match: ["katar\\w*"],
  short: "Zápal sliznice so zvýšenou tvorbou hlienu.",
  body:
    '<p class="chain">zápal sliznice → ↑ sekrécia hlienu (serózny → hlienový) → <b>hlienový povlak</b> na povrchu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ide o povrchový zápal bez hlbšej nekrózy, ktorý sa zvyčajne úplne zahojí.</p>'
},
{
  id: "ulceracia",
  title: "Ulcerácia (vred)",
  match: ["ulcerác\\w*", "exulcerác\\w*", "vred\\w*"],
  short: "Defekt sliznice alebo kože po odlúčení nekrotického tkaniva.",
  body:
    '<p class="chain">nekróza povrchu → odlúčenie mŕtveho tkaniva → <b>defekt</b> so spodinou z granulačného tkaniva → hojenie alebo chronicita</p>'
},
{
  id: "zrasty",
  title: "Zrasty (adhézie, synechie)",
  match: ["zrast\\w*", "synechi\\w*"],
  short: "Väzivové spojenia medzi povrchmi, ktoré vznikli organizáciou fibrínu.",
  body:
    '<p class="chain">fibrínový exsudát sa neodstráni → <b>organizuje sa</b> granulačným tkanivom → jazva spojí dva povrchy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na perikarde môžu obmedziť srdce (konstriktívna perikarditída), v brušnej dutine spôsobiť obštrukciu čreva.</p>'
},
{
  id: "ef2",
  title: "Elongačný faktor 2 (EF-2)",
  match: ["elongačn\\w*\\s+faktor\\w*\\s+2", "EF-2", "eEF2"],
  short: "Bielkovina, ktorá pri tvorbe bielkovín posúva ribozóm po mRNA o jeden kodón; bez nej sa proteosyntéza zastaví.",
  body:
    '<p class="chain">ribozóm pripojí aminokyselinu k reťazcu → <b>EF-2</b> (poháňa ho GTP) posunie ribozóm o jeden kodón → voľné miesto pre ďalšiu aminokyselinu → reťazec rastie</p>' +
    '<p class="chain">difterický toxín (podjednotka A) prenesie na EF-2 ADP-ribózu z NAD⁺ → EF-2 nefunguje → ribozómy stoja → bunka netvorí bielkoviny → odumrie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Toxín je enzým – nespotrebuje sa, takže aj malé množstvo vyradí EF-2 v celej bunke. Rovnakým spôsobom pôsobí exotoxín A <i>Pseudomonas aeruginosa</i>.</p>'
},
{
  id: "il-1",
  title: "IL-1 (interleukín 1)",
  match: ["IL-1[αβ]?(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-1 je poplašný signál makrofágov: zapne endotel a vyvolá horúčku.",
  body:
    '<p class="chain">makrofág rozpozná mikrób alebo zvyšky mŕtvych buniek → <b>IL-1</b> → endotel vystaví adhezívne molekuly (leukocyty sa prichytia) · hypotalamus zvýši nastavenú teplotu (horúčka) · pečeň spolu s IL-6 tvorí bielkoviny akútnej fázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Spolu s TNF-α prepája miestny zápal s celkovou odpoveďou. Blokáda receptora pre IL-1 tlmí horúčkové autoinflamačné choroby – dôkaz, že za horúčku zodpovedá práve on.</p>'
},
{
  id: "il-2",
  title: "IL-2 (interleukín 2)",
  match: ["IL-2(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-2 je rastový faktor T-lymfocytov.",
  body:
    '<p class="chain">T-lymfocyt rozpozná antigén → tvorí <b>IL-2</b> aj receptor preň → sám seba a susedné T-lymfocyty núti deliť sa → klon buniek proti jednému antigénu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bez IL-2 sa odpoveď T-lymfocytov nerozbehne. Lieky po transplantácii (cyklosporín, takrolimus) blokujú jeho tvorbu, a tak bránia odvrhnutiu štepu. IL-2 zároveň udržiava regulačné T-lymfocyty, ktoré imunitu brzdia.</p>'
},
{
  id: "il-4",
  title: "IL-4 (interleukín 4)",
  match: ["IL-4(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-4 je hlavný signál odpovede typu 2 (alergia, parazity) a prepína makrofágy na hojenie.",
  body:
    '<p class="chain">Th2 lymfocyty, žírne bunky a bazofily → <b>IL-4</b> → B-lymfocyty prepnú na tvorbu IgE · makrofágy sa aktivujú „alternatívne“ (M2) · fibroblasty tvoria viac kolagénu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo alergický zápal sprevádza IgE a eozinofily a prečo dlhotrvajúca odpoveď typu 2 končí fibrózou.</p>'
},
{
  id: "il-6",
  title: "IL-6 (interleukín 6)",
  match: ["IL-6(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-6 nesie správu o zápale do pečene.",
  body:
    '<p class="chain">makrofágy, endotel a fibroblasty v ložisku → <b>IL-6</b> krvou do pečene → hepatocyty tvoria bielkoviny akútnej fázy: CRP, fibrinogén, sérový amyloid A, hepcidín</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> CRP v krvi je vlastne meranie účinku IL-6. Dlhodobo zvýšený IL-6 vedie cez hepcidín k anémii chronických chorôb a cez sérový amyloid A k AA amyloidóze.</p>'
},
{
  id: "il-8",
  title: "IL-8 (interleukín 8, CXCL8)",
  match: ["IL-8(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-8 je chemokín, ktorý privoláva neutrofily.",
  body:
    '<p class="chain">makrofágy, endotel a epitel v ložisku → <b>IL-8</b> → na povrchu endotelu aktivuje integríny neutrofilu (pevná adhézia) → v tkanive vytvorí spád koncentrácie, po ktorom neutrofil putuje k ložisku</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kde je veľa IL-8, tam je hnis: je to hlavný dôvod, prečo bakteriálny zápal infiltrujú práve neutrofily.</p>'
},
{
  id: "il-10",
  title: "IL-10 (interleukín 10)",
  match: ["IL-10(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-10 je brzda zápalu.",
  body:
    '<p class="chain">reparačné makrofágy (M2) a regulačné T-lymfocyty → <b>IL-10</b> → makrofágy tvoria menej TNF-α, IL-1 a IL-12 a horšie predvádzajú antigén → zápal utícha</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Patrí k signálom, ktoré zápal aktívne ukončujú. Keď chýba, zápal trvá aj po odstránení príčiny a poškodzuje vlastné tkanivo.</p>'
},
{
  id: "il-12",
  title: "IL-12 (interleukín 12)",
  match: ["IL-12(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-12 nasmeruje obranu proti mikróbom, ktoré žijú vnútri buniek.",
  body:
    '<p class="chain">makrofág alebo dendritická bunka pohltí mikrób → <b>IL-12</b> → T-lymfocyty dozrejú na Th1 a spolu s NK bunkami tvoria interferón γ → interferón γ zosilní zabíjanie v makrofágoch</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na osi IL-12 → interferón γ stojí granulóm. Ľudia s jej vrodenou poruchou ťažko ochorejú aj na málo virulentné mykobaktérie.</p>'
},
{
  id: "il-13",
  title: "IL-13 (interleukín 13)",
  match: ["IL-13(?!\\d)"],
  short: "Interleukín – cytokín, ktorým sa dorozumievajú bunky imunity. IL-13 je príbuzný IL-4: odpoveď typu 2, hlien a fibróza.",
  body:
    '<p class="chain">Th2 lymfocyty → <b>IL-13</b> → makrofágy sa aktivujú „alternatívne“ (M2) · epitel dýchacích ciest tvorí viac hlienu · fibroblasty tvoria kolagén</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Spolu s IL-4 vysvetľuje obraz astmy – hlien v prieduškách a postupná prestavba ich steny.</p>'
}
);

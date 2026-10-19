/* Glosár PATOLY — adaptácia, poškodenie a riadená bunková smrť.
   Formát záznamu: assets/glossary/README.md. Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "homeostaza", et: "gr. <i>homoios</i> „podobný, rovnaký“ + <i>stasis</i> „stav, stálosť“",
  title: "Homeostáza",
  match: ["homeostáz\\w*"],
  short: "Udržiavanie stálosti vnútorného prostredia bunky v úzkom rozmedzí — východisko, od ktorého sa všetko ostatné odvíja.",
  body:
    '<p class="chain">podnet v znesiteľných medziach → bunka ho vyrovná → <b>homeostáza</b><br>' +
    'podnet mimo medzí → <b>adaptácia</b> (ak sa dá) <span class="x">alebo</span> <b>poškodenie</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Hranica medzi „ešte zvláda“ a „už nezvláda“ nie je pre všetky bunky rovnaká — závisí od typu bunky, jej zásobenia a predchádzajúcej záťaže. Preto tá istá noxa jednu bunku zmenší a druhú zabije.</p>'
},
{
  id: "noxa", et: "lat. <i>noxa</i> „škoda, poškodenie“",
  title: "Noxa (škodlivý podnet)",
  match: ["nox\\w*", "stresor\\w*"],
  short: "Čokoľvek, čo bunku vyvedie z rovnováhy — od nedostatku kyslíka po mikróby.",
  body:
    "<ul>" +
      "<li><b>Hypoxia a ischémia</b> — najčastejšia príčina poškodenia.</li>" +
      "<li><b>Fyzikálne</b> — mechanická sila, teplo, chlad, žiarenie, elektrický prúd.</li>" +
      "<li><b>Chemické</b> — toxíny, lieky, alkohol, kyseliny a zásady.</li>" +
      "<li><b>Biologické a imunitné</b> — mikróby, imunitná reakcia proti vlastným bunkám.</li>" +
      "<li><b>Genetické a nutričné</b> — chýbajúci enzým, nedostatok alebo nadbytok živín.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Výsledok neurčuje druh noxy sám, ale jej <b>intenzita, trvanie a typ zasiahnutej bunky</b>: menší podnet vyvolá adaptáciu, väčší poškodenie.</p>'
},
{
  id: "adaptacia", et: "lat. <i>adaptare</i> „prispôsobiť“ (<i>ad</i> „k“ + <i>aptus</i> „vhodný“)",
  title: "Adaptácia bunky",
  match: ["adaptáci\\w*", "adaptačn\\w*", "adaptuj\\w*", "adaptovan\\w*"],
  short: "Zmena veľkosti, počtu alebo typu buniek, ktorou tkanivo prežije zvýšenú záťaž alebo nedostatok.",
  body:
    "<ul>" +
      "<li><b>Atrofia</b> — menšie bunky (alebo ich menej).</li>" +
      "<li><b>Hypertrofia</b> — väčšie bunky, rovnaký počet.</li>" +
      "<li><b>Hyperplázia</b> — viac buniek.</li>" +
      "<li><b>Metaplázia</b> — iný typ bunky, odolnejší proti podnetu.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Adaptácia je <b>vratná, kým podnet ostáva v zvládnuteľných medziach</b>. Keď ich prekročí, prechádza do poškodenia — preto je adaptácia často prvým stupňom choroby, nie jej opakom.</p>'
},
{
  id: "atrofia", et: "gr. <i>a-</i> „bez“ + <i>trophe</i> „výživa“",
  title: "Atrofia",
  match: ["atrofi\\w*", "atrofick\\w*"],
  short: "Zmenšenie orgánu, ktoré vzniká zmenšením buniek alebo poklesom ich počtu.",
  body:
    '<p class="chain">↓ podnet (záťaž, inervácia, prekrvenie, hormón, výživa) → ↓ syntéza bielkovín + ↑ ich odbúravanie (ubikvitín-proteazóm, autofágia) → <b>menšia bunka</b> → menší orgán</p>' +
    "<ul>" +
      "<li><b>Jednoduchá</b> — bunky sú menšie, ale je ich rovnako veľa.</li>" +
      "<li><b>Numerická</b> — bunky aj zanikli (apoptózou).</li>" +
      "<li><b>Hnedá atrofia</b> — zmenšené bunky sú plné lipofuscínu, orgán stmavne.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Kým bunky ostali, po návrate podnetu sa dá vrátiť; keď zanikli, už nie. Nezamieňať s <b>hypopláziou</b> (orgán sa nevyvinul) — atrofia je zmenšenie už vyvinutého.</p>',
  img: {
    src: "assets/images/neurogenic-atrophy-muscle.jpg",
    alt: "Neurogénna atrofia svalu v H&E.",
    caption: "Atrofické vlákna (menšie) vedľa normálnych.",
    credit: "Jensflorian · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Neurogenic_atrophy_muscle_biopsy_HE_x100.jpg"
  }
},
{
  id: "hypertrofia", et: "gr. <i>hyper</i> „nad, nadmerne“ + <i>trophe</i> „výživa, rast“",
  img: {
    src: "assets/images/lvh-gross.jpg",
    alt: "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    caption: "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_left_ventricular_hypertrophy.jpg"
  },
  title: "Hypertrofia",
  match: ["hypertrofi\\w*", "hypertrofick\\w*"],
  short: "Zväčšenie orgánu zväčšením buniek — syntéza bielkovín stúpne, počet buniek ostáva.",
  body:
    "<ul>" +
      "<li><b>Fyziologická</b> — sval pri tréningu.</li>" +
      "<li><b>Patologická</b> — myokard, ktorý tlačí proti vysokému tlaku (hypertenzia, stenóza chlopne).</li>" +
    "</ul>" +
    '<p class="chain">↑ záťaž → mechanické a hormonálne signály → ↑ syntéza kontraktilných bielkovín → <b>väčšia bunka</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bunky, ktoré sa nedelia (kardiomyocyt, kostrový sval), rastú <b>iba</b> hypertrofiou. Rast však predbehne zásobenie a rezervu — hypertrofovaný myokard je dobrým príkladom, ako sa kompenzácia mení na dekompenzáciu.</p>'
},
{
  id: "hyperplazia", et: "gr. <i>hyper</i> „nad, nadmerne“ + <i>plasis</i> „utváranie“",
  img: {
    src: "assets/images/endometrial-hyperplasia.jpg",
    alt: "Hyperplázia endometria: nepravidelné, cysticky rozšírené žliazky.",
    caption: "Hyperplázia endometria: nepravidelné, cysticky rozšírené žliazky.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Simple_endometrial_hyperplasia_-_low_mag.jpg"
  },
  title: "Hyperplázia",
  match: ["hyperplázi\\w*", "hyperplastick\\w*"],
  short: "Zväčšenie orgánu zvýšením počtu buniek — možné len v tkanivách, ktoré sa vedia deliť.",
  body:
    "<ul>" +
      "<li><b>Hormonálna</b> — prsník v gravidite, endometrium v cykle.</li>" +
      "<li><b>Kompenzačná</b> — pečeň dorastá po čiastočnej resekcii.</li>" +
      "<li><b>Patologická</b> — nadbytok hormónu alebo rastového faktora (endometrium pri nadbytku estrogénu).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Hyperplázia rastie <b>len pod tlakom podnetu</b> a po jeho zániku ustúpi — to ju odlišuje od nádoru. Neustále delenie však zvyšuje šancu na chybu v DNA, preto z patologickej hyperplázie môže vzniknúť nádor.</p>'
},
{
  id: "metaplazia", et: "gr. <i>meta</i> „zmena“ + <i>plasis</i> „utváranie“",
  img: {
    src: "assets/images/squamous-metaplasia-columnar.jpg",
    alt: "Metaplázia: hlienotvorný cylindrický epitel prechádza do viacvrstvového dlaždicového (krčok maternice).",
    caption: "Metaplázia: hlienotvorný cylindrický epitel prechádza do viacvrstvového dlaždicového (krčok maternice).",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Squamous_metaplasia.jpg"
  },
  title: "Metaplázia",
  match: ["metapláz\\w*", "metaplastick\\w*"],
  short: "Náhrada jedného zrelého typu buniek iným, ktorý lepšie znáša danú záťaž.",
  body:
    "<ul>" +
      "<li><b>Fajčiar</b> — riasinkový cylindrický epitel priedušiek → dlaždicový.</li>" +
      "<li><b>Refluxná choroba</b> — dlaždicový epitel pažeráka → cylindrický (Barrettov pažerák).</li>" +
    "</ul>" +
    '<p class="chain">chronický podnet → zmena signalizácie v kmeňových bunkách → <b>nový typ diferenciácie</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Odolnejší epitel je zároveň <b>menej funkčný</b> (dlaždicový nemá riasinky ani hlien). Ak podnet pretrváva, metaplázia môže prejsť do dysplázie a karcinómu.</p>'
},
{
  id: "hypoxia", et: "gr. <i>hypo</i> „pod“ + <i>oxys</i> „kyslý“ (kyslík)",
  img: {
    src: "assets/images/shock-liver.jpg",
    alt: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    caption: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_shock_liver.jpg"
  },
  title: "Hypoxia",
  match: ["hypoxi\\w*", "hypoxick\\w*"],
  short: "Nedostatok kyslíka v tkanive — najčastejšia príčina bunkového poškodenia.",
  body:
    '<p class="chain">↓ O₂ → ↓ oxidatívna fosforylácia → <b>↓ ATP</b> → zlyhá Na⁺/K⁺-ATPáza → vstup Na⁺ a vody → <b>opuch bunky</b><br>' +
    '↑ anaeróbna glykolýza → ↑ laktát → ↓ pH → zhlukovanie chromatínu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kým sa dá obnoviť prísun kyslíka, celý reťazec je <b>vratný</b>. Pretrvávajúci deficit ATP vedie k poškodeniu membrán a nekróze.</p>'
},
{
  id: "ischemia", et: "gr. <i>ischein</i> „zadržať“ + <i>haima</i> „krv“",
  img: {
    src: "assets/images/renal-infarct-gross.jpg",
    alt: "Dôsledok ischémie: biele infarkty obličky.",
    caption: "Dôsledok ischémie: biele infarkty obličky.",
    credit: "Denis Desaulniers a Bernard Têtu · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Rein_Infarctus_55-o.apatho-1486a-rein.jpg"
  },
  title: "Ischémia",
  match: ["ischémi\\w*", "ischemick\\w*"],
  short: "Nedostatočný prítok krvi — bunka nedostane kyslík ani živiny a nemá kam odviesť odpad.",
  body:
    '<p class="chain">uzáver alebo zúženie tepny → ↓ prítok krvi → ↓ O₂ <b>aj</b> ↓ glukóza → hromadenie laktátu a odpadových látok → poškodenie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ischémia poškodzuje <b>rýchlejšie než čistá hypoxia</b>: pri hypoxii môže bunka ešte získať ATP glykolýzou, pri ischémii chýba aj substrát a odvoz kyseliny. Uzáver cievy s nekrózou oblasti je <b>infarkt</b>.</p>'
},
{
  id: "bod-nezvratnosti",
  title: "Bod nezvratnosti (hranica reverzibility)",
  match: ["bod\\w*\\s+nezvratnosti", "bod\\w*\\s+nevratnosti", "hranic\\w*\\s+reverzibilit\\w*"],
  img: {
    "src": "assets/images/renal-infarct-histology.jpg",
    "alt": "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    "caption": "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Renal_cortical_infarction_showing_coagulative_necrosis_4X.jpg"
  },
  short: "Hranica, za ktorou už odstránenie noxy bunku nezachráni.",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Hranicu poznáme až spätne. Morfologické zmeny nekrózy sa objavia až hodiny po jej prekročení, takže v čase, keď ešte „nič nevidno“, môže byť bunka už odsúdená — preto sa nekróza dokazuje aj laboratórne (uniknuté vnútrobunkové enzýmy).</p>"
},
{
  id: "vratne-poskodenie", et: "lat. <i>reversibilis</i> „vratný“ (<i>re-</i> „späť“ + <i>vertere</i> „obracať“)",
  title: "Reverzibilné (vratné) poškodenie",
  match: ["reverzibiln\\w*(?:\\s+poškodeni\\w*)?", "vratn\\w*\\s+poškodeni\\w*"],
  short: "Poškodenie, po ktorom sa bunka vráti do normálu, ak sa noxa odstráni včas — membrány a mitochondrie sú ešte funkčné.",
  body: "<ul><li><b>Čo sa deje:</b> ↓ ATP → zlyhanie Na⁺/K⁺-ATPázy → vstup Na⁺ a vody → opuch bunky a organel.</li><li><b>Čo vidno:</b> kalné zdurenie, hydropická degenerácia, drobné tukové vakuoly (steatóza); jadro je zachované.</li><li><b>Koniec:</b> po obnovení prísunu kyslíka a živín bunka obnoví ATP a vráti sa do pôvodného stavu.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Takéto zmeny nie sú nekróza — orgán je zväčšený a bledý, ale funkciu možno ešte obnoviť.</p>"
},
{
  id: "nevratne-poskodenie", et: "lat. <i>ir-</i> „ne-“ (= <i>in-</i> „ne-“) + <i>reversibilis</i> „vratný“",
  title: "Ireverzibilné (nezvratné) poškodenie",
  match: ["ireverzibiln\\w*(?:\\s+poškodeni\\w*)?", "nezvratn\\w*\\s+poškodeni\\w*"],
  short: "Poškodenie, po ktorom bunka smeruje k smrti, aj keď noxa pominie.",
  body: "<ul><li><b>Znaky:</b> trvalé zlyhanie mitochondrií (ATP sa nedá obnoviť) a rozsiahle poškodenie membrán — plazmatickej aj lyzozómových.</li><li><b>Čo nasleduje:</b> únik enzýmov, vtok Ca²⁺, rozpad vnútrobunkových štruktúr → nekróza (pri riadenej forme apoptóza).</li><li><b>Dôkaz:</b> únik vnútrobunkových bielkovín do krvi (troponín, ALT).</li></ul>"
},
{
  id: "apoptoza-patola", et: "gr. <i>apo</i> „od, preč“ + <i>ptosis</i> „padanie“ (opadávanie ako lístia)",
  img: {
    src: "assets/images/acute-hepatitis-histology.jpg",
    alt: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    caption: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    credit: "Alexander Boyd, Owen Cain, Abhishek Chauhan, Gwilym James Webb (Frontline Gastroenterology 2020) · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_acute_hepatitis.jpg"
  },
  title: "Apoptóza",
  match: ["apoptóz\\w*", "apoptotick\\w*"],
  short: "Riadená, energeticky závislá smrť bunky — bunka sa zbalí a odstráni tak, že okolie nič nespozoruje.",
  body:
    '<div class="fork">' +
      "<div><b>Vonkajšia dráha</b><br>ligand (FasL, TNF) na receptore smrti<br>→ kaspáza 8</div>" +
      "<div><b>Vnútorná dráha</b><br>stres, poškodená DNA → mitochondria → cytochróm c<br>→ kaspáza 9</div>" +
    "</div>" +
    '<p class="chain">iniciačné kaspázy → <b>exekučné kaspázy (3, 6, 7)</b> → štiepenie bielkovín a DNA → bunka sa zmrští → <b>apoptotické telieska</b> → fagocytóza bez zápalu</p>' +
    "<ul>" +
      "<li><b>Fyziologická</b> — vývoj (prsty), obmena buniek, odstránenie autoreaktívnych lymfocytov.</li>" +
      "<li><b>Patologická</b> — poškodenie DNA, vírusové bunky, ↓ rastové faktory.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Zlyhanie apoptózy dáva <b>nádor</b> (bunky neumierajú), jej nadmerná aktivácia <b>degeneráciu tkaniva</b>. Rozhoduje o tom, či bunka zanikne „ticho“ (apoptóza), alebo so zápalom (nekróza).</p>'
},
{
  id: "apoptoticke-telieska",
  img: {
    src: "assets/images/acute-hepatitis-histology.jpg",
    alt: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    caption: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    credit: "Alexander Boyd, Owen Cain, Abhishek Chauhan, Gwilym James Webb (Frontline Gastroenterology 2020) · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_acute_hepatitis.jpg"
  },
  title: "Apoptotické telieska",
  match: ["apoptotick\\w*\\s+teliesk\\w*"],
  short: "Membránou obalené úlomky apoptotickej bunky — signál „zjedz ma“ pre fagocyty.",
  body:
    '<p class="chain">zmrštená bunka → jadro sa rozpadne → bunka sa rozdelí na <b>telieska s celou membránou</b> → na povrchu fosfatidylserín → fagocyt ich pohltí</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Membrána ostáva celá, takže sa <b>nevyleje obsah</b> a zápal nevznikne. Ak telieska nikto nestihne odstrániť, dopadnú ako <b>sekundárna nekróza</b>.</p>'
},
{
  id: "councilmanove-telieska",
  img: {
    src: "assets/images/acute-hepatitis-histology.jpg",
    alt: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    caption: "Acidofilné (Councilmanove) telieska — apoptotické hepatocyty pri hepatitíde.",
    credit: "Alexander Boyd, Owen Cain, Abhishek Chauhan, Gwilym James Webb (Frontline Gastroenterology 2020) · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_acute_hepatitis.jpg"
  },
  title: "Councilmanove telieska",
  match: ["Councilmanov\\w*\\s+teliesk\\w*", "Councilmanov\\w*"],
  short: "Eozinofilné, zmrštené apoptotické hepatocyty pri vírusovej hepatitíde.",
  body:
    '<p class="chain">vírus v hepatocyte → cytotoxický T lymfocyt → apoptóza → <b>ružová guľôčka v pečeňovom tkanive</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to učebnicový príklad <b>apoptózy jednej bunky uprostred zdravého tkaniva</b> — dôkaz, že imunitný systém zabíja bunky riadene, nie nekrózou.</p>'
},
{
  id: "kaspazy", et: "angl. <i>cysteine-aspartic protease</i>: cysteín + aspartát + proteáza",
  title: "Kaspázy",
  match: ["kaspáz\\w*"],
  short: "Proteázy s cysteínom v aktívnom mieste, ktoré vykonávajú apoptózu — kaskáda, v ktorej jedna aktivuje ďalšiu.",
  body:
    "<ul>" +
      "<li><b>Iniciačné (8, 9)</b> — sú na začiatku; 8 patrí vonkajšej dráhe, 9 vnútornej.</li>" +
      "<li><b>Exekučné (3, 6, 7)</b> — štiepia jadrové a cytoskeletové bielkoviny a aktivujú DNázy.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Kaskáda <b>zosilní malý signál na nezvratné rozhodnutie</b> — po aktivácii exekučných kaspáz sa už bunka nevráti.</p>'
},
{
  id: "cytochrom-c", et: "gr. <i>kytos</i> „bunka“ + <i>chroma</i> „farba“; „c“ je typ cytochrómu",
  title: "Cytochróm c",
  match: ["cytochróm\\w*\\s+c"],
  short: "Bielkovina dýchacieho reťazca, ktorá po úniku z mitochondrie spustí apoptózu.",
  body:
    '<p class="chain">poškodená DNA alebo ↓ rastové faktory → prevaha Bax/Bak nad Bcl-2 → póry vo vonkajšej membráne mitochondrie → <b>únik cytochrómu c</b> → apoptozóm (s Apaf-1) → kaspáza 9 → exekučné kaspázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tá istá molekula, ktorá v mitochondrii vyrába ATP, po úniku do cytoplazmy bunku zabíja — mitochondria tak rozhoduje o živote aj smrti bunky.</p>'
},
{
  id: "bcl-2", et: "angl. <i>B-cell lymphoma 2</i> (gén nájdený pri lymfóme z B-buniek)",
  title: "Bcl-2 a Bcl-xL (ochrancovia bunky)",
  match: ["Bcl-2\\w*", "Bcl2", "BCL-xL"],
  short: "Bielkoviny vonkajšej membrány mitochondrie, ktoré ju držia celú a tým brzdia apoptózu.",
  body: "<ul><li><b>Čo robia:</b> viažu a tlmia Bax a Bak, aby nevytvorili póry — bunka prežije.</li><li><b>Pri strese:</b> keď ich prevážia proteíny „len-BH3“, brzda sa uvoľní.</li><li><b>Pri nádore:</b> pri folikulárnom lymfóme (t(14;18)) je Bcl-2 nadprodukovaný.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Nádorové bunky neumierajú — nádor rastie nie preto, že sa rýchlo delí, ale preto, že nezaniká.</p>"
},
{
  id: "bax-bak", et: "angl. <i>Bcl-2-associated X protein</i> a <i>Bcl-2 antagonist/killer</i>",
  title: "Bax a Bak (výkonné bielkoviny apoptózy)",
  match: ["Bax", "Bak"],
  short: "Bielkoviny, ktoré po aktivácii vytvoria v membráne mitochondrie póry, cez ktoré unikne cytochróm c.",
  body: "<p class=\"chain\">stres → proteíny len-BH3 aktivujú Bax a Bak → póry vo vonkajšej membráne mitochondrie → únik cytochrómu c → apoptozóm → kaspázy</p><p class=\"why\"><b>Prečo to je dôležité.</b> Je to bod, od ktorého sa apoptóza už zvyčajne nezastaví.</p>"
},
{
  id: "len-bh3", et: "angl. <i>BH3</i> = <i>Bcl-2 homology 3</i>, krátka spoločná doména rodiny",
  title: "Proteíny len-BH3 (BIM, PUMA)",
  match: ["len-BH3", "BH3", "BIM", "PUMA"],
  short: "Senzory bunkového stresu z rodiny Bcl-2: spustia apoptózu tým, že zablokujú ochrancov alebo aktivujú Bax a Bak.",
  body: "<ul><li>Prevážia nad Bcl-2 a tým uvoľnia Bax a Bak.</li><li>Každý senzor reaguje na iný druh stresu.</li></ul><ul><li>Zachytia poškodenú DNA, nedostatok rastových faktorov alebo stres ER.</li><li><b>BIM</b> a <b>PUMA</b> sú najznámejší zástupcovia; PUMA sa zapína pod vplyvom p53.</li></ul>"
},
{
  id: "apoptozom", et: "angl. <i>apoptotic protease-activating factor 1</i>",
  title: "Apoptozóm (Apaf-1)",
  match: ["Apaf-1", "apoptozóm\\w*"],
  short: "Kolesovitý komplex cytochrómu c, bielkoviny Apaf-1 a prokaspázy 9, v ktorom sa aktivuje kaspáza 9.",
  body: "<ul><li>Skladá sa z cytochrómu c a siedmich podjednotiek Apaf-1; vznikne až po úniku cytochrómu c z mitochondrie.</li><li>Kaspáza 9 je iniciačná kaspáza vnútornej (mitochondriálnej) dráhy.</li><li>Bcl-2 a Bcl-xL jeho vznik bránia tým, že držia membránu mitochondrie celú.</li></ul><p class=\"chain\">cytochróm c + Apaf-1 (+ ATP) → apoptozóm → kaspáza 9 → exekučné kaspázy 3 a 7 → rozpad bunky</p>"
},
{
  id: "p53-patola", et: "p = <i>protein</i> (bielkovina), 53 = relatívna hmotnosť ≈ 53 kDa",
  title: "p53",
  match: ["p53"],
  short: "Strážca genómu: pri poškodenej DNA zastaví delenie a ak sa oprava nepodarí, spustí apoptózu.",
  body:
    '<p class="chain">poškodenie DNA → <b>↑ p53</b> → zastavenie bunkového cyklu (p21) → oprava<br>oprava zlyhá → Bax → <b>apoptóza</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Mutácia p53 patrí k <b>najčastejším zmenám v ľudských nádoroch</b> — bunka s poškodenou DNA sa už nezastaví a neumrie, ale ďalej sa delí a hromadí chyby.</p>'
},
{
  id: "anoikis", et: "gr. <i>an-</i> „bez“ + <i>oikos</i> „domov“ (bunka bez „domova“, teda bez kontaktu s okolím)",
  title: "Anoikis",
  match: ["anoikis"],
  short: "Apoptóza spustená stratou kontaktu bunky s okolitými bunkami a matrix.",
  body:
    '<p class="chain">bunka sa odlúči od matrix → stratí signály z integrínov → <b>apoptóza</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bráni tomu, aby sa bunka „zachytila“ na nesprávnom mieste. Nádorové bunky ju vedia obísť, a preto môžu prežiť v krvi a <b>metastázovať</b>.</p>'
},
{
  id: "autofagia", et: "gr. <i>autos</i> „sám“ + <i>phagein</i> „jesť“",
  img: {
    src: "assets/images/k1-21.jpg",
    alt: "Autofágia: schéma, elektrónová mikroskopia a fluorescenčné značenie.",
    caption: "Autofágia: schéma, elektrónová mikroskopia a fluorescenčné značenie.",
    credit: "Juhasz G., Neufeld T. P. (PLoS Biol 4(2):e36) · CC BY 2.5",
    href: "https://commons.wikimedia.org/wiki/File:Autophagy_diagram_PLoS_Biology.jpg"
  },
  title: "Autofágia",
  match: ["autofág\\w*", "autofagick\\w*", "autofagozóm\\w*", "autofagolyzozóm\\w*"],
  short: "Bunka trávi vlastné organely a bielkoviny v lyzozómoch — nástroj prežitia pri hladovaní a spôsob, ako sa zbaviť odpadu.",
  body:
    '<p class="chain">hladovanie alebo stres → <b>fagofor</b> obopne časť cytoplazmy → autofagozóm → splynie s lyzozómom → autofagolyzozóm → rozklad → <b>recyklované stavebné látky</b></p>' +
    "<ul>" +
      "<li><b>Prospešná</b> — prežitie pri nedostatku živín, odstránenie poškodených mitochondrií.</li>" +
      "<li><b>Pri dlhom strese</b> nestačí a bunka nakoniec zahynie apoptózou alebo nekrózou.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Autofágia je jedným z mechanizmov <b>atrofie</b> a stojí za hromadením lipofuscínu; jej porucha sa spája s neurodegeneráciou.</p>'
},
{
  id: "lipofuscin", et: "gr. <i>lipos</i> „tuk“ + lat. <i>fuscus</i> „tmavý, hnedý“",
  img: {
    src: "assets/images/myocardial-lipofuscin.jpg",
    alt: "Lipofuscín v kardiomyocytoch: zlatohnedé zrnká pri jadrách (H&E).",
    caption: "Lipofuscín v kardiomyocytoch: zlatohnedé zrnká pri jadrách (H&E).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Myocardial_lipofuscin_(annotated).jpg"
  },
  title: "Lipofuscín",
  match: ["lipofuscín\\w*"],
  short: "Žltohnedý „pigment opotrebenia“ — nestrávené zvyšky membrán, ktoré sa hromadia v dlho žijúcich bunkách.",
  body:
    "<ul>" +
      "<li><b>Kde</b> — pečeň, myokard, mozog; s vekom pribúda.</li>" +
      "<li><b>Čo je</b> — zvyšky z autofágie a oxidácie lipidov, ktoré lyzozómy nedokážu úplne rozložiť.</li>" +
      "<li><b>Škodí?</b> — samotný pigment nie; je to <b>značka</b> opotrebovaných buniek.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Keď sa bunky zmenšia (atrofia), lipofuscín v nich ostane a tkanivo stmavne — <b>hnedá atrofia</b>.</p>'
},
{
  id: "kachexia", et: "gr. <i>kakos</i> „zlý“ + <i>hexis</i> „stav“",
  title: "Kachexia",
  match: ["kachexi\\w*", "kachexín\\w*", "kachektín\\w*"],
  short: "Celkové chradnutie pri chronickej chorobe, ktoré vzniká aj pri dostatočnom príjme jedla.",
  body:
    '<p class="chain">nádor alebo chronický zápal → cytokíny (najmä TNF-α) a nádorové faktory → <b>↑ odbúravanie svalových bielkovín a tukov</b> + ↓ chuť do jedla → úbytok hmotnosti a svalu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ide o aktívnu zmenu metabolizmu, nie len o hlad — preto samotné prikrmovanie kachexiu <b>nezvráti</b>.</p>'
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "bitotove-skvrny", et: "podľa Pierra Bitota (1822–1888), francúzskeho lekára",
  img: {
    src: "assets/images/bitot-spots.jpg",
    alt: "Bitotove škvrny na spojovke pri nedostatku vitamínu A.",
    caption: "Bitotove škvrny na spojovke pri nedostatku vitamínu A.",
    credit: "CDC / Nutrition Program · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Bitot.jpg"
  },
  title: "Bitotove škvrny",
  match: ["Bitotov\\w*\\s+škvrn\\w*", "Bitot\\w*"],
  short: "Sivobiele škvrny na spojovke oka pri nedostatku vitamínu A. Nezrelý epitel spojovky bez vitamínu dozrieva dlaždicovo a rohovatie."
}

);

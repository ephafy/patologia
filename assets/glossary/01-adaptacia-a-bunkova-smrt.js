/* Glosár PATOLY — adaptácia, poškodenie a riadená bunková smrť.
   Formát záznamu: assets/glossary/README.md. Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "homeostaza",
  title: "Homeostáza",
  match: ["homeostáz\\w*"],
  short: "Udržiavanie stálosti vnútorného prostredia bunky v úzkom rozmedzí — východisko, od ktorého sa všetko ostatné odvíja.",
  body:
    '<p class="chain">podnet v znesiteľných medziach → bunka ho vyrovná → <b>homeostáza</b><br>' +
    'podnet mimo medzí → <b>adaptácia</b> (ak sa dá) <span class="x">alebo</span> <b>poškodenie</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Hranica medzi „ešte zvláda“ a „už nezvláda“ nie je pre všetky bunky rovnaká — závisí od typu bunky, jej zásobenia a predchádzajúcej záťaže. Preto tá istá noxa jednu bunku zmenší a druhú zabije.</p>'
},
{
  id: "noxa",
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
  id: "adaptacia",
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
  id: "atrofia",
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
  id: "hypertrofia",
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
  id: "hyperplazia",
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
  id: "metaplazia",
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
  id: "hypoxia",
  title: "Hypoxia",
  match: ["hypoxi\\w*", "hypoxick\\w*"],
  short: "Nedostatok kyslíka v tkanive — najčastejšia príčina bunkového poškodenia.",
  body:
    '<p class="chain">↓ O₂ → ↓ oxidatívna fosforylácia → <b>↓ ATP</b> → zlyhá Na⁺/K⁺-ATPáza → vstup Na⁺ a vody → <b>opuch bunky</b><br>' +
    '↑ anaeróbna glykolýza → ↑ laktát → ↓ pH → zhlukovanie chromatínu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kým sa dá obnoviť prísun kyslíka, celý reťazec je <b>vratný</b>. Pretrvávajúci deficit ATP vedie k poškodeniu membrán a nekróze.</p>'
},
{
  id: "ischemia",
  title: "Ischémia",
  match: ["ischémi\\w*", "ischemick\\w*"],
  short: "Nedostatočný prítok krvi — bunka nedostane kyslík ani živiny a nemá kam odviesť odpad.",
  body:
    '<p class="chain">uzáver alebo zúženie tepny → ↓ prítok krvi → ↓ O₂ <b>aj</b> ↓ glukóza → hromadenie laktátu a odpadových látok → poškodenie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ischémia poškodzuje <b>rýchlejšie než čistá hypoxia</b>: pri hypoxii môže bunka ešte získať ATP glykolýzou, pri ischémii chýba aj substrát a odvoz kyseliny. Uzáver cievy s nekrózou oblasti je <b>infarkt</b>.</p>'
},
{
  id: "bod-nezvratnosti",
  title: "Reverzibilné a ireverzibilné poškodenie",
  match: ["bod\\w*\\s+nezvratnosti", "bod\\w*\\s+nevratnosti", "ireverzibiln\\w*", "reverzibiln\\w*"],
  short: "Hranica, za ktorou už odstránenie noxy bunku nezachráni.",
  body:
    '<div class="fork">' +
      "<div><b>Reverzibilné</b><br>↓ ATP, opuch bunky, zmeny organel, steatóza<br>po odstránení noxy sa bunka vráti</div>" +
      "<div><b>Ireverzibilné</b><br>neobnoviteľná mitochondriálna funkcia + zlyhanie membrán<br>→ nekróza alebo apoptóza</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Hranicu poznáme až <b>spätne</b>. Morfologické zmeny nekrózy sa objavia až hodiny po jej prekročení, takže v čase, keď ešte „nič nevidno“, môže byť bunka už odsúdená — preto sa nekróza dokazuje aj laboratórne (uniknuté vnútrobunkové enzýmy).</p>'
},
{
  id: "apoptoza-patola",
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
  title: "Apoptotické telieska",
  match: ["apoptotick\\w*\\s+teliesk\\w*"],
  short: "Membránou obalené úlomky apoptotickej bunky — signál „zjedz ma“ pre fagocyty.",
  body:
    '<p class="chain">zmrštená bunka → jadro sa rozpadne → bunka sa rozdelí na <b>telieska s celou membránou</b> → na povrchu fosfatidylserín → fagocyt ich pohltí</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Membrána ostáva celá, takže sa <b>nevyleje obsah</b> a zápal nevznikne. Ak telieska nikto nestihne odstrániť, dopadnú ako <b>sekundárna nekróza</b>.</p>'
},
{
  id: "councilmanove-telieska",
  title: "Councilmanove telieska",
  match: ["Councilmanov\\w*\\s+teliesk\\w*", "Councilmanov\\w*"],
  short: "Eozinofilné, zmrštené apoptotické hepatocyty pri vírusovej hepatitíde.",
  body:
    '<p class="chain">vírus v hepatocyte → cytotoxický T lymfocyt → apoptóza → <b>ružová guľôčka v pečeňovom tkanive</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to učebnicový príklad <b>apoptózy jednej bunky uprostred zdravého tkaniva</b> — dôkaz, že imunitný systém zabíja bunky riadene, nie nekrózou.</p>'
},
{
  id: "kaspazy",
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
  id: "cytochrom-c",
  title: "Cytochróm c",
  match: ["cytochróm\\w*\\s+c"],
  short: "Bielkovina dýchacieho reťazca, ktorá po úniku z mitochondrie spustí apoptózu.",
  body:
    '<p class="chain">poškodená DNA alebo ↓ rastové faktory → prevaha Bax/Bak nad Bcl-2 → póry vo vonkajšej membráne mitochondrie → <b>únik cytochrómu c</b> → apoptozóm (s Apaf-1) → kaspáza 9 → exekučné kaspázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tá istá molekula, ktorá v mitochondrii vyrába ATP, po úniku do cytoplazmy bunku zabíja — mitochondria tak rozhoduje o živote aj smrti bunky.</p>'
},
{
  id: "bcl-2",
  title: "Bcl-2, Bax a Bak",
  match: ["Bcl-2\\w*", "Bcl2", "BCL-xL", "Bax", "Bak", "BIM", "PUMA", "len-BH3", "BH3", "Apaf-1", "apoptozóm\\w*"],
  short: "Rodina bielkovín na mitochondrii, ktorá rozhoduje, či bunka apoptózou zomrie.",
  body:
    '<div class="fork">' +
      "<div><b>Senzory (proteíny „len-BH3“: BIM, PUMA…)</b><br>zachytia stres, poškodenú DNA, ↓ rastové faktory<br><i>tlmia ochrancov</i></div>" +
      "<div><b>Ochrancovia (Bcl-2, Bcl-xL)</b><br>držia membránu mitochondrie celú<br><i>brzdia apoptózu</i></div>" +
      "<div><b>Efektory (Bax, Bak)</b><br>vytvoria póry, unikne cytochróm c → s Apaf-1 apoptozóm → kaspáza 9<br><i>spúšťajú apoptózu</i></div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri folikulárnom lymfóme (t(14;18)) je Bcl-2 nadprodukovaný, takže <b>nádorové bunky neumierajú</b> — nádor rastie nie preto, že sa rýchlo delí, ale preto, že nezaniká.</p>'
},
{
  id: "p53-patola",
  title: "p53",
  match: ["p53"],
  short: "Strážca genómu: pri poškodenej DNA zastaví delenie a ak sa oprava nepodarí, spustí apoptózu.",
  body:
    '<p class="chain">poškodenie DNA → <b>↑ p53</b> → zastavenie bunkového cyklu (p21) → oprava<br>oprava zlyhá → Bax → <b>apoptóza</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Mutácia p53 patrí k <b>najčastejším zmenám v ľudských nádoroch</b> — bunka s poškodenou DNA sa už nezastaví a neumrie, ale ďalej sa delí a hromadí chyby.</p>'
},
{
  id: "anoikis",
  title: "Anoikis",
  match: ["anoikis"],
  short: "Apoptóza spustená stratou kontaktu bunky s okolitými bunkami a matrix.",
  body:
    '<p class="chain">bunka sa odlúči od matrix → stratí signály z integrínov → <b>apoptóza</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Bráni tomu, aby sa bunka „zachytila“ na nesprávnom mieste. Nádorové bunky ju vedia obísť, a preto môžu prežiť v krvi a <b>metastázovať</b>.</p>'
},
{
  id: "autofagia",
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
  id: "lipofuscin",
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
  id: "kachexia",
  title: "Kachexia",
  match: ["kachexi\\w*", "kachexín\\w*", "kachektín\\w*"],
  short: "Celkové chradnutie pri chronickej chorobe, ktoré vzniká aj pri dostatočnom príjme jedla.",
  body:
    '<p class="chain">nádor alebo chronický zápal → cytokíny (najmä TNF-α) a nádorové faktory → <b>↑ odbúravanie svalových bielkovín a tukov</b> + ↓ chuť do jedla → úbytok hmotnosti a svalu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Ide o aktívnu zmenu metabolizmu, nie len o hlad — preto samotné prikrmovanie kachexiu <b>nezvráti</b>.</p>'
}
);

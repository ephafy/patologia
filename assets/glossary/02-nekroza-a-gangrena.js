/* Glosár PATOLY — nekróza, jej druhy, infarkt, gangréna a osud mŕtveho tkaniva. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "nekroza",
  title: "Nekróza",
  match: ["nekróz\\w*", "nekrotick\\w*", "nekrotizuj\\w*"],
  short: "Nekontrolovaná smrť bunky po poškodení — obsah sa vyleje do okolia a spustí zápal.",
  body:
    '<p class="chain">noxa → zlyhanie ATP a membrán → opuch a prasknutie bunky → <b>únik enzýmov a DAMP</b> → <b>zápal</b><br>' +
    'lyzozómové hydrolázy strávia bunku; bielkoviny sa denaturujú</p>' +
    "<ul>" +
      "<li><b>Cytoplazma</b> — sýtejšie ružová (stratená RNA, denaturované bielkoviny).</li>" +
      "<li><b>Jadro</b> — pyknóza → karyorexa → karyolýza.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vyliaty obsah bunky sa dostane do krvi — preto sa nekróza dokazuje aj <b>laboratórne</b> (troponín pri myokarde, ALT a AST pri pečeni, amyláza a lipáza pri pankrease).</p>'
},
{
  id: "zmeny-jadra",
  title: "Zmeny jadra: pyknóza, karyorexa, karyolýza",
  match: ["karyolýz\\w*", "karyorex\\w*", "pyknóz\\w*", "pyknotick\\w*"],
  short: "Tri stupne rozpadu jadra: zmrštenie, rozpad na úlomky, rozpustenie.",
  body:
    '<p class="chain"><b>pyknóza</b> (zmrštené, tmavé jadro) → <b>karyorexa</b> (rozpad na úlomky) → <b>karyolýza</b> (jadro sa rozpustí a vybledne)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pyknóza a karyorexa vznikajú aj pri <b>apoptóze</b>, takže samotné jadro nerozlíši smrť nekrózou od apoptózy — rozhoduje vzhľad bunky ako celku a to, či je okolo zápal.</p>'
},
{
  id: "koagulacna-nekroza",
  title: "Koagulačná nekróza",
  match: ["koagulačn\\w*\\s+nekróz\\w*"],
  short: "Mŕtve tkanivo stuhne a zachová obrys — typické pre ischémiu okrem mozgu.",
  body:
    '<p class="chain">ischémia → ↓ pH → <b>denaturácia bielkovín</b> vrátane lyzozómových enzýmov → proteolýza je pomalá → tkanivo ostáva pevné, obrysy buniek ostávajú viditeľné niekoľko dní</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Klasický príklad je <b>bledý infarkt</b> srdca, obličky alebo sleziny: klinovitý, pevný, s viditeľným pôvodným tvarom tkaniva.</p>'
},
{
  id: "kolikvacna-nekroza",
  title: "Kolikvačná nekróza",
  match: ["kolikvačn\\w*\\s+nekróz\\w*", "kolikvačn\\w*"],
  short: "Mŕtve tkanivo sa rozpustí na tekutú hmotu — typické pre hnisavé infekcie a mozog.",
  body:
    '<p class="chain">baktérie a neutrofily uvoľnia hydrolázy → <b>enzymatické natrávenie prevýši denaturáciu</b> → tkanivo skvapalnie → hnis alebo cystická dutina</p>' +
    "<ul>" +
      "<li><b>Absces</b> — kolikvačná nekróza + hnis.</li>" +
      "<li><b>Mozog</b> — pri ischémii sa tiež skvapalní; presný dôvod nie je úplne objasnený.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Po infarkte mozgu ostane <b>cystická dutina</b> (pseudocysta), nie jazva.</p>',
  img: {
    src: "assets/images/brain-infarct-histology.jpg",
    alt: "Organizujúci sa infarkt mozgu — skvapalnené tkanivo s makrofágmi.",
    caption: "Skvapalnená nekróza mozgu po ischémii.",
    credit: "Patho · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Organizing_ischemic_cerebral_infarction,_HE_4.JPG"
  }
},
{
  id: "kazeozna-nekroza",
  title: "Kazeózna (kaseifikačná) nekróza",
  match: ["kaseifikačn\\w*", "kazeifikačn\\w*", "kazeózn\\w*", "kaseózn\\w*", "zosýrovaten\\w*"],
  short: "„Zosyrovatená“ nekróza — biela až žltá krehká hmota bez obrysov, typická pre tuberkulózu.",
  body:
    '<p class="chain">mykobaktérie → Th1 lymfocyty → IFN-γ → aktivácia makrofágov → <b>granulóm</b> → v strede zmes koagulačnej a kolikvačnej nekrózy = <b>amorfná ružová hmota bez štruktúry</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kazeóza je značka <b>granulomatózneho zápalu</b> — okolo nej nájdeš epiteloidné bunky a Langhansove obrovské bunky. Podobne vyzerá centrum gummy pri syfilise.</p>',
  img: {
    src: "assets/images/caseating-granuloma.jpg",
    alt: "Kazeifikujúci granulóm v tuberkulóznej uzline.",
    caption: "Amorfná granulárna nekróza obklopená epiteloidnými bunkami.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  }
},
{
  id: "tukova-nekroza",
  title: "Tuková (Balserova) nekróza",
  match: ["Balserov\\w*\\s+nekróz\\w*", "tukov\\w*\\s+nekróz\\w*", "saponifikáci\\w*", "vápenat\\w*\\s+mydl\\w*"],
  short: "Nekróza tukového tkaniva po uvoľnení lipáz — akútna pankreatitída alebo trauma.",
  body:
    '<p class="chain">poškodenie pankreasu → únik lipázy → <b>hydrolýza triacylglycerolov</b> na mastné kyseliny → viažu Ca²⁺ → <b>vápenaté mydlá (saponifikácia)</b> → biele kriedové ložiská</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Viazanie vápnika môže pri ťažkej pankreatitíde znížiť hladinu Ca²⁺ v sére. Traumatická nekróza tuku (napr. v prsníku) vytvorí <b>uzol, ktorý napodobňuje nádor</b>.</p>',
  img: {
    src: "assets/images/fat-necrosis-pancreatitis.jpg",
    alt: "Enzymatická tuková nekróza pri pankreatitíde.",
    caption: "Tieňové obrysy tukových buniek a zápalový lem.",
    credit: "Patho · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Tryptic_fat_tissue_necrosis_in_severe_pancreatitis,_HE_1.JPG"
  }
},
{
  id: "hemoragicka-nekroza",
  title: "Hemoragická nekróza",
  match: ["hemoragick\\w*\\s+nekróz\\w*", "hemoragick\\w*\\s+infarkt\\w*", "hemoragick\\w*\\s+\\(červen\\w*\\)\\s+infarkt\\w*"],
  short: "Nekróza s masívnym krvácaním do mŕtveho tkaniva.",
  body:
    '<p class="chain">uzáver žily <span class="x">alebo</span> orgán s dvojitým obehom (pľúca, pečeň) <span class="x">alebo</span> bohaté kolaterály (črevo) → krv sa dostáva do mŕtveho tkaniva → <b>nekróza + hemorágia</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tak vzniká <b>hemoragický (červený) infarkt</b>. Pri pankreatitíde sa mieša s tukovou nekrózou a rozpúšťaním cievnych stien enzýmami.</p>'
},
{
  id: "fibrinoid",
  title: "Fibrinoid",
  match: ["fibrinoid\\w*"],
  short: "Ružová, homogénna, „fibrínu podobná“ hmota — zmes plazmatických bielkovín a imunokomplexov v stene cievy alebo vo väzive.",
  body:
    "<ul>" +
      "<li><b>Fibrinoidná nekróza</b> — stena cievy pri vaskulitíde alebo malígnej hypertenzii; imunokomplexy + presiaknutá plazma.</li>" +
      "<li><b>Fibrinoidná dystrofia</b> — podobná hmota v intersticiu, často pri imunitných chorobách väziva.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vyzerá ako fibrín, ale nie je to zrazenina z koagulácie. Nezamieňať s <b>hyalínom</b> ani s <b>amyloidom</b> — hlavný rozdiel je v tom, čím sa látka vyfarbí a z čoho vzniká.</p>',
  img: {
    src: "assets/images/fibrinoid-necrosis-arteriole.jpg",
    alt: "Fibrinoidná nekróza steny arterioly.",
    caption: "Jasne ružový homogénny prstenec okolo lúmenu.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Pulmonary_hypertension-associated_vasculitis_(4348170903).jpg"
  }
},
{
  id: "zenkerova-nekroza",
  title: "Zenkerova (voskovitá) nekróza",
  match: ["Zenkerov\\w*"],
  short: "Nekróza priečne pruhovaného svalu — vlákno stratí pruhovanie a zhomogenizuje sa.",
  body:
    '<p class="chain">ťažká infekcia (napr. brušný týfus), trauma → poškodenie svalového vlákna → <b>strata priečneho pruhovania</b>, homogénna sarkoplazma → prítomnosť histiocytov</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Postihuje najmä priamy brušný sval a bránicu. Ak zostane sarkolema, sval sa môže <b>zregenerovať</b>.</p>'
},
{
  id: "gumma",
  title: "Gumma (gumatózna nekróza)",
  match: ["gumm\\w*", "gumatózn\\w*"],
  short: "Ohraničené ložisko nekrózy pri terciárnom syfilise — húževnatá, „gumovitá“ hmota.",
  body:
    '<p class="chain"><i>Treponema pallidum</i> → chronická imunitná reakcia → <b>koagulačná nekróza v strede</b> + okolo epiteloidné bunky, <b>plazmocyty</b> a jazvenie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Od tuberkulózneho granulómu sa odlišuje prítomnosťou plazmocytov a zmenami cievnej steny.</p>'
},
{
  id: "infarkt",
  title: "Infarkt",
  match: ["infarkt\\w*"],
  short: "Ohraničená ischemická nekróza tkaniva po uzávere prívodnej cievy.",
  body:
    '<div class="fork">' +
      "<div><b>Bledý (biely)</b><br>uzáver tepny, orgán s jedným zásobením<br>srdce, oblička, slezina<br>koagulačná nekróza</div>" +
      "<div><b>Hemoragický (červený)</b><br>uzáver žily alebo dvojitý obeh<br>pľúca, črevo<br>krv presiakne do mŕtveho tkaniva</div>" +
    "</div>" +
    '<p class="chain">uzáver cievy → ischémia → <b>klinovitá nekróza</b> (báza pri povrchu, vrchol pri uzávere) → zápalový lem → jazva</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tvar infarktu kopíruje zásobenú oblasť cievy. Infikovaný trombus môže spôsobiť <b>septický infarkt</b> a absces.</p>',
  img: {
    src: "assets/images/lung-hemorrhagic-infarct.jpg",
    alt: "Hemoragický infarkt pľúc — klinovitá červená oblasť.",
    caption: "Hemoragický (červený) infarkt pľúc.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Recent_hemorrhagic_infarct_(3732297830).jpg"
  }
},
{
  id: "gangrena",
  title: "Gangréna",
  match: ["gangrén\\w*", "gangrenózn\\w*", "hnilob\\w*", "putrídn\\w*"],
  short: "Nekróza, na ktorú sa nasadila infekcia alebo vyschnutie — klinický pojem, nie samostatný druh nekrózy.",
  body:
    '<div class="fork">' +
      "<div><b>Suchá</b><br>ischémia bez infekcie<br>tkanivo vyschne a zčernie<br>ostrý demarkačný lem</div>" +
      "<div><b>Vlhká</b><br>nekróza + hnilobné baktérie<br>opuch, zápach, zelenkavé sfarbenie<br>šíri sa</div>" +
      "<div><b>Plynová</b><br><i>Clostridium</i><br>plyn v tkanive (crepitus)<br>rýchly priebeh</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vlhká gangréna sa šíri a môže viesť k <b>sepse</b>, preto sa rieši chirurgicky. Suchá ostáva ohraničená.</p>',
  img: {
    src: "assets/images/k1-19.jpg",
    alt: "Suchá gangréna prstov nohy pri diabete.",
    caption: "Suchá gangréna — tmavé vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:GangreneFoot.JPG"
  }
},
{
  id: "sekvester",
  title: "Sekvester",
  match: ["sekvest\\w*"],
  short: "Mŕtvy kúsok tkaniva (najčastejšie kosti), ktorý sa oddelil od živého okolia a sám sa nezhojí.",
  body:
    '<p class="chain">nekróza kosti pri osteomyelitíde → mŕtvy úlomok obklopený hnisom → <b>nedá sa odstrániť fagocytózou</b> → udržiava hnisanie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kým sekvester zostáva, infekcia sa nezahojí — treba ho odstrániť.</p>'
},
{
  id: "demarkacny-lem",
  title: "Demarkačný lem",
  match: ["demarkačn\\w*"],
  short: "Zápalový lem na rozhraní mŕtveho a živého tkaniva — oddeľuje ho a začína odstraňovať nekrózu.",
  body:
    '<p class="chain">nekróza uvoľní mediátory → hyperémia a neutrofily na hranici → <b>makrofágy odstraňujú mŕtve tkanivo</b> → granulačné tkanivo → jazva</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri suchej gangréne ostro ohraničuje postihnuté miesto od zdravého.</p>'
},
{
  id: "granulacne-tkanivo",
  title: "Granulačné tkanivo",
  match: ["granulačn\\w*\\s+tkani\\w*"],
  short: "Mladé, bohato cievnaté väzivo, ktoré vypĺňa defekt po zápale alebo nekróze.",
  body:
    '<p class="chain">makrofágy → rastové faktory → <b>nové kapiláry + fibroblasty</b> → kolagén → zrenie → <b>jazva</b> (cievy ustupujú)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Nezamieňať s <b>granulómom</b>: granulačné tkanivo je hojivé, granulóm je osobitný typ chronického zápalu.</p>'
},
{
  id: "granulom-patola",
  title: "Granulóm",
  match: ["granulóm\\w*", "granulomatózn\\w*", "epiteloidn\\w*"],
  short: "Ohraničené nahromadenie aktivovaných makrofágov (epiteloidných buniek) — pokus izolovať to, čo sa nedá zničiť.",
  body:
    '<p class="chain">pretrvávajúci podnet → Th1 lymfocyty → IFN-γ → <b>epiteloidné makrofágy</b> → splynú na obrovské bunky → ohraničenie lymfocytmi a fibrózou</p>' +
    '<div class="fork">' +
      "<div><b>Kazeifikujúci</b><br>nekróza v strede<br>tuberkulóza</div>" +
      "<div><b>Nekazeifikujúci</b><br>bez nekrózy<br>sarkoidóza, Crohnova choroba, cudzie teleso</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Granulóm izoluje pôvodcu, ale za cenu <b>straty funkčného tkaniva</b> (fibróza, jazvenie).</p>',
  img: {
    src: "assets/images/caseating-granuloma.jpg",
    alt: "Kazeifikujúci granulóm.",
    caption: "Epiteloidné bunky okolo kazeóznej nekrózy.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  }
}
);

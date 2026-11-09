/* Glosár PATOLY — nekróza, jej druhy, infarkt, gangréna a osud mŕtveho tkaniva. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "nekroza", et: "gr. <i>nekros</i> „mŕtvy“ + <i>-osis</i> „dej, stav“",
  img: {
    src: "assets/images/renal-infarct-histology.jpg",
    alt: "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    caption: "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Renal_cortical_infarction_showing_coagulative_necrosis_4X.jpg"
  },
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
  id: "pyknoza", et: "gr. <i>pyknos</i> „hustý“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/nuclear-changes-diagram.jpg",
    alt: "Tri osudy jadra: pyknóza, karyorexa a karyolýza.",
    caption: "Tri osudy jadra: pyknóza, karyorexa a karyolýza.",
    credit: "J. Cartwright · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Nuclear_changes.jpg"
  },
  title: "Pyknóza",
  match: ["pyknóz\\w*", "pyknotick\\w*"],
  short: "Zmrštenie jadra: chromatín sa zhustí a jadro je malé, guľaté a tmavé.",
  body: "<ul><li>Je prvým stupňom rozpadu jadra.</li><li>Vzniká pri nekróze aj pri apoptóze.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Samotné jadro nerozlíši smrť nekrózou od apoptózy — rozhoduje vzhľad bunky ako celku a to, či je okolo zápal.</p>"
},
{
  id: "karyorexa", et: "gr. <i>karyon</i> „jadro“ + <i>rhexis</i> „trhanie“",
  img: {
    src: "assets/images/karyorrhexis-mi.jpg",
    alt: "Karyorexa: neutrofily s rozpadnutými jadrami pri infarkte myokardu (H&E).",
    caption: "Karyorexa: neutrofily s rozpadnutými jadrami pri infarkte myokardu (H&E).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_myocardial_infarction_with_karyorrhexis_and_few_lymphocytes.jpg"
  },
  title: "Karyorexa",
  match: ["karyorex\\w*"],
  short: "Rozpad zmršteného jadra na úlomky chromatínu rozptýlené v cytoplazme.",
  body: "<ul><li>Chromatín sa rozpadne na tmavé úlomky (gr. <i>rhexis</i> „trhanie“).</li><li>Úlomky jadra tvoria časť apoptotických teliesok.</li><li>Pri rozpade neutrofilov vzniká „jadrový prach“ typický pre leukocytoklastickú vaskulitídu.</li></ul><ul><li>Nasleduje po pyknóze.</li><li>Vo vzorke vidno tmavé zrnká namiesto jedného jadra.</li><li>Vzniká aj pri apoptóze.</li></ul>"
},
{
  id: "karyolyza", et: "gr. <i>karyon</i> „jadro“ + <i>lysis</i> „rozpúšťanie“",
  img: {
    src: "assets/images/nuclear-changes-diagram.jpg",
    alt: "Karyolýza – jadro bledne a zaniká (vľavo na schéme).",
    caption: "Karyolýza – jadro bledne a zaniká (vľavo na schéme).",
    credit: "J. Cartwright · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Nuclear_changes.jpg"
  },
  title: "Karyolýza",
  match: ["karyolýz\\w*"],
  short: "Rozpustenie jadra: chromatín sa rozloží enzýmami a jadro vybledne až zmizne.",
  body: "<ul><li>Za rozpustenie chromatínu zodpovedajú DNázy a kyslé pH odumierajúcej bunky.</li><li>Z bunky ostane len bledý eozinofilný „duch“ — obrys tkaniva.</li><li>Je znak nekrózy; pri apoptóze zvyčajne jadro rozpadne a nerozpustí sa.</li></ul><ul><li>Jadro sa slabo farbí hematoxylínom.</li><li>Je posledným stupňom; bunka je už mŕtva.</li></ul>"
},
{
  id: "koagulacna-nekroza", et: "lat. <i>coagulare</i> „zrážať“ (zrazenie bielkovín)",
  img: {
    src: "assets/images/renal-infarct-histology.jpg",
    alt: "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    caption: "Nezvratné poškodenie: nekrotické tubuly majú obrys, ale nie jadrá.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Renal_cortical_infarction_showing_coagulative_necrosis_4X.jpg"
  },
  title: "Koagulačná nekróza",
  match: ["koagulačn\\w*\\s+nekróz\\w*"],
  short: "Mŕtve tkanivo stuhne a zachová obrys — typické pre ischémiu okrem mozgu.",
  body:
    '<p class="chain">ischémia → ↓ pH → <b>denaturácia bielkovín</b> vrátane lyzozómových enzýmov → proteolýza je pomalá → tkanivo ostáva pevné, obrysy buniek ostávajú viditeľné niekoľko dní</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Klasický príklad je <b>bledý infarkt</b> srdca, obličky alebo sleziny: klinovitý, pevný, s viditeľným pôvodným tvarom tkaniva.</p>'
},
{
  id: "kolikvacna-nekroza", et: "lat. <i>colliquare</i> „skvapalniť, roztopiť“",
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
  id: "kazeozna-nekroza", et: "lat. <i>caseus</i> „syr“ (nález pripomína tvaroh)",
  title: "Kazeózna (kaseifikačná) nekróza",
  match: ["kaseifikačn\\w*", "kazeifikačn\\w*", "kazeózn\\w*(?:\\s+nekróz\\w*)?", "kaseózn\\w*", "zosýrovaten\\w*"],
  img: {
    "src": "assets/images/caseating-granuloma.jpg",
    "alt": "Kazeifikujúci granulóm v tuberkulóznej uzline.",
    "caption": "Amorfná granulárna nekróza obklopená epiteloidnými bunkami.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  },
  short: "„Zosyrovatená“ nekróza — biela až žltá krehká hmota bez obrysov, typická pre tuberkulózu.",
  body: "<p class=\"chain\">mykobaktérie → Th1 lymfocyty → IFN-γ → aktivácia makrofágov → <b>granulóm</b> → v strede zmes koagulačnej a kolikvačnej nekrózy = <b>amorfná ružová hmota bez štruktúry</b></p><p class=\"why\"><b>Prečo to je dôležité.</b> Kazeóza je značka <b>granulomatózneho zápalu</b> — okolo nej nájdeš epiteloidné bunky a Langhansove obrovské bunky. Podobne vyzerá centrum gummy pri syfilise.</p>"
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
  id: "hemoragicka-nekroza", et: "gr. <i>haima</i> „krv“ + <i>rhegnynai</i> „pretrhnúť, vyliať sa“",
  img: {
    src: "assets/images/adrenal-hemorrhage-wfs.jpg",
    alt: "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    caption: "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Waterhouse-Friderichsen._IMG_2912.jpg"
  },
  title: "Hemoragická nekróza",
  match: ["hemoragick\\w*\\s+nekróz\\w*", "hemoragick\\w*\\s+infarkt\\w*", "hemoragick\\w*\\s+\\(červen\\w*\\)\\s+infarkt\\w*"],
  short: "Nekróza s masívnym krvácaním do mŕtveho tkaniva.",
  body:
    '<p class="chain">uzáver žily <span class="x">alebo</span> orgán s dvojitým obehom (pľúca, pečeň) <span class="x">alebo</span> bohaté kolaterály (črevo) → krv sa dostáva do mŕtveho tkaniva → <b>nekróza + hemorágia</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tak vzniká <b>hemoragický (červený) infarkt</b>. Pri pankreatitíde sa mieša s tukovou nekrózou a rozpúšťaním cievnych stien enzýmami.</p>'
},
{
  id: "fibrinoid", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>-eides</i> „podobný“",
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
  id: "gumma", et: "lat. <i>gummi</i> „guma, živica“ (podľa gumovitej konzistencie)",
  img: {
    src: "assets/images/gumma-nose.jpg",
    alt: "Guma nosa pri terciárnom syfilise.",
    caption: "Guma nosa pri terciárnom syfilise.",
    credit: "CDC / J. Pledger · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Gumma_of_nose_due_to_a_long_standing_tertiary_syphilitic_Treponema_pallidum_infection_5330_lores.jpg"
  },
  title: "Gumma (gumatózna nekróza)",
  match: ["gumm\\w*", "gumatózn\\w*", "gum(?:a|u|y|e|ou)"],
  short: "Ohraničené ložisko nekrózy pri terciárnom syfilise — húževnatá, „gumovitá“ hmota.",
  body:
    '<p class="chain"><i>Treponema pallidum</i> → chronická imunitná reakcia → <b>koagulačná nekróza v strede</b> + okolo epiteloidné bunky, <b>plazmocyty</b> a jazvenie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Od tuberkulózneho granulómu sa odlišuje prítomnosťou plazmocytov a zmenami cievnej steny.</p>'
},
{
  id: "infarkt", et: "lat. <i>infarcire</i> „napchať, napĺňať“ (<i>in</i> „do“ + <i>farcire</i> „napchávať“)",
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
  id: "gangrena", et: "gr. <i>gangraina</i> „požierajúci, hnilobný vred“",
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
  id: "sekvester", et: "lat. <i>sequestrare</i> „oddeliť, odložiť bokom“",
  img: {
    src: "assets/images/sequestra-osteomyelitis.jpg",
    alt: "Sekvestre pri osteomyelitíde: odumreté kostné úlomky.",
    caption: "Sekvestre pri osteomyelitíde: odumreté kostné úlomky.",
    credit: "Otis Historical Archives, National Museum of Health and Medicine · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:4821323599_676b57f7b5_bSEQUESTRA_OSTEOMYELITIS.jpg"
  },
  title: "Sekvester",
  match: ["sekvest\\w*"],
  short: "Mŕtvy kúsok tkaniva (najčastejšie kosti), ktorý sa oddelil od živého okolia a sám sa nezhojí.",
  body:
    '<p class="chain">nekróza kosti pri osteomyelitíde → mŕtvy úlomok obklopený hnisom → <b>nedá sa odstrániť fagocytózou</b> → udržiava hnisanie</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kým sekvester zostáva, infekcia sa nezahojí — treba ho odstrániť.</p>'
},
{
  id: "demarkacny-lem", et: "franc. <i>démarcation</i> „vytýčenie hranice“ (<i>de-</i> „od“ + <i>marque</i> „značka, hranica“)",
  img: {
    src: "assets/images/gangrene-foot.jpg",
    alt: "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    caption: "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    credit: "آرمین · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gangrene_Foot_01.jpg"
  },
  title: "Demarkačný lem",
  match: ["demarkačn\\w*\\s+lem\\w*", "demarkačn\\w*"],
  short: "Zápalový lem na rozhraní mŕtveho a živého tkaniva — oddeľuje ho a začína odstraňovať nekrózu.",
  body:
    '<p class="chain">nekróza uvoľní mediátory → hyperémia a neutrofily na hranici → <b>makrofágy odstraňujú mŕtve tkanivo</b> → granulačné tkanivo → jazva</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri suchej gangréne ostro ohraničuje postihnuté miesto od zdravého.</p>'
},
{
  id: "granulacne-tkanivo", et: "lat. <i>granulum</i> „zrniečko“ (<i>granum</i> „zrno“) – zrnitý povrch",
  img: {
    src: "assets/images/granulation-tissue.jpg",
    alt: "Granulačné tkanivo: množstvo novotvorených kapilár a fibroblasty.",
    caption: "Granulačné tkanivo: množstvo novotvorených kapilár a fibroblasty.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Granulation_tissue_low_power.jpg"
  },
  title: "Granulačné tkanivo",
  match: ["granulačn\\w*\\s+tkani\\w*"],
  short: "Mladé, bohato cievnaté väzivo, ktoré vypĺňa defekt po zápale alebo nekróze.",
  body:
    '<p class="chain">makrofágy → rastové faktory → <b>nové kapiláry + fibroblasty</b> → kolagén → zrenie → <b>jazva</b> (cievy ustupujú)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Nezamieňať s <b>granulómom</b>: granulačné tkanivo je hojivé, granulóm je osobitný typ chronického zápalu.</p>'
},
{
  id: "granulom-patola", et: "lat. <i>granulum</i> „zrniečko“ + gr. <i>-oma</i> „opuch, nádor“",
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
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "tunel",
  title: "TUNEL (angl. terminal deoxynucleotidyl transferase dUTP nick end labeling)",
  match: ["TUNEL"],
  img: {
    "src": "assets/images/tunel-scheme.jpg",
    "alt": "Princíp TUNEL: značené nukleotidy sa pripoja na nastrihané konce DNA.",
    "caption": "Princíp TUNEL: značené nukleotidy sa pripoja na nastrihané konce DNA.",
    "credit": "Ultrabem · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:TUNEL_assay.png"
  },
  short: "Metóda, ktorá značí nastrihanú DNA apoptotických buniek: enzým TdT pripojí na voľné konce DNA značené nukleotidy a tie sa odhalia fluorescenciou alebo farbou. Označené jadrá sú apoptotické; metóda však odhalí aj nekrotickú DNA, preto sa hodnotí s morfológiou.",
  body: "<ul><li>Enzým TdT pripojí značený nukleotid na voľné konce prestrihnutej DNA.</li><li>Falošne pozitívne môže byť aj nekrotické tkanivo — metóda nie je dokonale špecifická.</li></ul>"
},
{
  id: "livores-mortis", et: "lat. <i>livor</i> „modrina“ + <i>mors</i> „smrť“",
  title: "Posmrtné škvrny (livores mortis)",
  match: ["posmrtn\\w*\\s+škvrn\\w*", "livores\\s+mortis", "livor\\w*\\s+mortis"],
  img: {
    "src": "assets/images/livor-mortis.jpg",
    "alt": "Posmrtné škvrny na chrbte mŕtveho tela.",
    "caption": "Posmrtné škvrny na chrbte mŕtveho tela.",
    "credit": "goga312 · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Пятна_трупные.jpg"
  },
  short: "Fialovočervené škvrny na najnižšie položených miestach mŕtveho tela: bez tlaku srdca krv pasívne klesá do ciev tej časti, na ktorej telo leží (hypostáza). Prezradia polohu tela po smrti.",
  body: "<ul><li>Objavujú sa v prvých hodinách a postupne sa zafixujú.</li><li>Na miestach tlaku (podložka) ostáva bledosť.</li></ul>"
},
{
  id: "vlhka-gangrena",
  img: {
    src: "assets/images/wet-gangrene-foot.jpg",
    alt: "Vlhká gangréna nohy (múzejný preparát).",
    caption: "Vlhká gangréna nohy (múzejný preparát).",
    credit: "علاء · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Wet_gangrene_of_the_foot.jpg"
  },
  title: "Vlhká gangréna (humida)",
  match: ["vlhk\\w*\\s+gangrén\\w*"],
  short: "Mŕtve tkanivo, ktoré rozložia anaeróbne baktérie vo vlhkom prostredí. Sirovodík z rozkladu bielkovín reaguje s hemoglobínom na zelený verdohemoglobín. Príkladom je noma alebo gangréna čreva."
}

);

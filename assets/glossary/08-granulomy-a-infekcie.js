/* Glosár PATOLY — granulomatózne a špecifické zápaly (kap. 7): bunky a signály granulómu, imunita T-lymfocytov,
   tuberkulóza, lepra, hnisavé granulómy, reumatická horúčka, vaskulitídy, syfilis; farbenia a laboratórne testy;
   anatómia a klinické pojmy, ktoré kapitola používa bez výkladu. Texty sú vlastné (CLAUDE.md §4.1).
   Skratky, ktoré sú aj bežným slovom, sa zámerne nechytajú. Vzor sa píše bez pravej hranice (engine ju pridá);
   spojovník je hranica slova, preto tvary typu „Th1-lymfocyt“ majú vlastnú vetvu vo vzore. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── fagocytóza a bunky granulómu ────────────────────────────────────── */
{
  id: "fagozom", et: "gr. <i>phagein</i> + <i>soma</i>",
  title: "Fagozóm",
  match: ["fagozóm\\w*"],
  short: "Membránový vačok s pohltenou časticou.",
  body: "<ul><li>Vzniká vchlípením membrány okolo častice.</li><li>Splynutie s lyzozómom vytvorí fagolyzozóm.</li></ul>"
},
{
  id: "fagolyzozom",
  title: "Fagolyzozóm",
  match: ["fagolyzozóm\\w*"],
  short: "Vzniká splynutím fagozómu s lyzozómom — enzýmy a radikály časticu rozložia.",
  body: "<p class=\"chain\">pohltenie častice → fagozóm → splynutie s lyzozómom → fagolyzozóm (kyslé prostredie, hydrolázy, radikály) → rozklad</p><p class=\"why\"><b>Prečo to je dôležité.</b> Mykobaktérie bránia splynutiu fagozómu s lyzozómom, a tak v makrofágu prežijú — odtiaľ granulóm.</p>"
},
{
  id: "dusikove-radikaly",
  title: "Dusíkové radikály (oxid dusnatý)",
  match: ["dusíkov\\w*\\s+radikál\\w*", "oxid\\w*\\s+dusnat\\w*"],
  short: "Reaktívne molekuly s dusíkom (napr. oxid dusnatý, NO), ktoré aktivovaný makrofág tvorí popri kyslíkových radikáloch na zabíjanie pohltených mikróbov.",
  body: "<ul><li>NO vzniká z arginínu pôsobením iNOS.</li><li>Zabíja baktérie, ale poškodzuje aj okolité tkanivo.</li></ul>"
},
{
  id: "epiteloidna-bunka", et: "epitel + gr. <i>-eides</i> „podobný“ (bunka podobná epitelu)",
  title: "Epiteloidná bunka",
  img: {
    src: "assets/images/granuloma-colon-crohn.jpg",
    alt: "Granulóm bez nekrózy v H&E.",
    caption: "Svetlé epiteloidné bunky s bohatou cytoplazmou tvoria zhluk; okolo lymfocyty (Crohnova choroba, hrubé črevo).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_granuloma_of_colonic_mucosa.jpg"
  },
  match: ["epiteloidn\\w*\\s+bun\\w*"],
  short: "Makrofág aktivovaný IFN-γ, ktorý sa tvarom podobá epitelovej bunke: ležia tesne vedľa seba, málo fagocytujú a viac vylučujú cytokíny a enzýmy. Tvoria stenu granulómu.",
  body:
    '<p class="chain">pretrvávajúci antigén → Th1 → <b>IFN-γ</b> → makrofág sa sploští a pripojí k susedom (adherentné spoje, desmozómy) → <b>epiteloidná bunka</b></p>'
},
{
  id: "obrovska-bunka",
  img: {
    src: "assets/images/langhans-giant-cell.jpg",
    alt: "Langhansova obrovská viacjadrová bunka s jadrami na okraji.",
    caption: "Langhansova obrovská viacjadrová bunka s jadrami na okraji.",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Langhans_Giant_Cell_(10189844503).jpg"
  },
  title: "Obrovská viacjadrová bunka",
  match: ["obrovsk\\w*\\s+viacjadrov\\w*\\s+bun\\w*", "obrovsk\\w*\\s+bun\\w*", "viacjadrov\\w*\\s+obrovsk\\w*"],
  short: "Bunka vzniknutá splynutím viacerých makrofágov, s desiatkami jadier. Pohltí časticu, ktorá je pre jeden makrofág priveľká. Podľa usporiadania jadier sa rozoznávajú tri typy.",
  body:
    "<p><b>Typy</b> (kliknutím sa otvoria):</p>" +
    "<ul>" +
      "<li>Langhansova obrovská bunka — jadrá na okraji</li>" +
      "<li>Toutonova obrovská bunka — jadrá v strede</li>" +
      "<li>Typ z cudzích telies (reakcia na cudzie teleso) — jadrá rozhádzané</li>" +
    "</ul>"
},
{
  id: "langhans",
  title: "Langhansova obrovská bunka",
  match: ["Langhansov\\w*(?:\\s+obrovsk\\w*\\s+bun\\w*)?"],
  img: {
    "src": "assets/images/langhans-giant-cell.jpg",
    "alt": "Langhansova obrovská bunka v H&E.",
    "caption": "Jadrá sú zoradené do venca na okraji bunky; okolo epiteloidné bunky granulómu.",
    "credit": "Ed Uthman · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Langhans_Giant_Cell_(10189844503).jpg"
  },
  short: "Obrovská bunka s desiatkami jadier zoradených na okraji do podkovy alebo venca. Typická pre imunitné granulómy (tuberkulóza, sarkoidóza), nie je však špecifická pre žiadnu chorobu.",
  body: "<ul><li>Vznikne splynutím makrofágov.</li><li>Typicky v granulóme pri tuberkulóze a sarkoidóze.</li></ul>"
},
{
  id: "touton",
  title: "Toutonova obrovská bunka",
  match: ["Toutonov\\w*(?:\\s+obrovsk\\w*\\s+bun\\w*)?"],
  img: {
    "src": "assets/images/touton-giant-cell.jpg",
    "alt": "Toutonova obrovská bunka v H&E.",
    "caption": "Veniec jadier v strede bunky, okolo svetlá penovitá cytoplazma (juvenilný xantogranulóm).",
    "credit": "Jacob Collie, DO · StatPearls · CC BY 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Touton_giant_cell.jpg"
  },
  short: "Obrovská bunka s vencom jadier v strede a penovitou cytoplazmou na okraji (pohltené lipidy). Nachádza sa v xantómoch a xantogranulómoch.",
  body: "<ul><li>Vzniká pri fagocytóze lipidov.</li><li>Nachádza sa v xantómoch a xantogranulómoch.</li></ul>"
},
{
  id: "cudzie-teleso",
  title: "Cudzie teleso (reakcia na cudzie teleso)",
  match: ["cudz\\w*\\s+tele(?:s|i)\\w*"],
  img: {
    "src": "assets/images/foreign-body-giant-cell.jpg",
    "alt": "Obrovská bunka z cudzích telies v H&E.",
    "caption": "Viacjadrová bunka obopína nestrávený materiál; jadrá sú rozložené nepravidelne.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Foreign_body_engulfed_by_a_giant_cell.jpg"
  },
  short: "Nestráviteľný materiál (steh, trieska, mastenec, kryštály, keratín). Makrofágy ho nezničia, a tak ho obklopia obrovskými bunkami z cudzích telies a väzivovým puzdrom — granulóm bez účasti T-lymfocytov.",
  body: "<ul><li>Obrovské bunky z cudzích telies majú jadrá rozptýlené po celej cytoplazme.</li><li>Cudzí materiál (steh, kryštály) vo svetle polarizovanom často svieti.</li></ul>"
},
{
  id: "cd4", et: "angl. <i>cluster of differentiation 4</i>",
  title: "CD4⁺ lymfocyty",
  match: ["CD4⁺?(?:-\\w+)?"],
  short: "Pomocné T-lymfocyty: riadia ostatné bunky imunity cytokínmi.",
  body: "<ul><li>Cieľ vírusu HIV — ich úbytok vedie k AIDS.</li></ul>"
},
{
  id: "cd8", et: "angl. <i>cluster of differentiation 8</i>",
  title: "CD8⁺ lymfocyty",
  match: ["CD8⁺?(?:-\\w+)?"],
  short: "Cytotoxické T-lymfocyty: zabíjajú infikované a nádorové bunky.",
  body: "<ul><li>Pomer CD4⁺/CD8⁺ sa využíva napr. v laváži pľúc.</li></ul>"
},
{
  id: "ifn-gama", et: "interferón: angl. <i>interfere</i> „zasahovať, rušiť“ (lat. <i>inter</i> + <i>ferire</i> „biť“) – ruší množenie vírusov; gama = gr. písmeno γ",
  title: "IFN-γ (interferón gama; angl. interferon gamma)",
  match: ["IFN-?γ", "interferón\\w*[-\\s]?γ", "interferón\\w*\\s+gama"],
  short: "Cytokín, ktorý tvoria Th1-lymfocyty a NK bunky. Aktivuje makrofágy, aby vedeli zabíjať pohltené mikróby; je kľúčový pre vznik granulómu.",
  body: "<ul><li>Zdroj: Th1-lymfocyty a NK bunky.</li><li>Cieľ: makrofág (aktivácia, tvorba NO); základ granulómu.</li><li>Test IGRA meria jeho uvoľnenie z T-lymfocytov.</li></ul>"
},
{
  id: "dendriticka-bunka", et: "gr. <i>dendron</i> „strom“ (rozkonárené výbežky)",
  title: "Dendritická bunka",
  match: ["dendritick\\w*\\s+bun\\w*"],
  short: "Bunka s výbežkami, ktorá pohltí antigén v tkanive, odnesie ho do lymfatickej uzliny a „ukáže“ ho T-lymfocytom. Tým spúšťa špecifickú imunitnú odpoveď.",
  body: "<ul><li>Tkanivovou podobou v koži sú Langerhansove bunky.</li><li>Po stretnutí s antigénom dozrie a putuje lymfou do uzliny.</li></ul>"
},
{
  id: "antigen", et: "gr. <i>anti</i> + <i>-genes</i>",
  title: "Antigén",
  match: ["antigén\\w*", "antigénn\\w*"],
  short: "Látka (spravidla bielkovina mikróba), ktorú imunitný systém rozpozná ako cudziu.",
  body: "<ul><li>Môže ním byť bielkovina, polysacharid alebo lipid.</li><li>Epitop je malá časť antigénu, ktorú rozpozná protilátka alebo receptor T-lymfocytu.</li></ul>"
},
{
  id: "prezentacia-antigenu",
  title: "Prezentácia antigénu",
  match: ["prezentáci\\w*\\s+antigén\\w*"],
  short: "Makrofág alebo dendritická bunka vystaví antigén na povrchu, aby ho T-lymfocyt rozpoznal.",
  body: "<p class=\"chain\">pohltenie mikróba → rozklad na peptidy → peptid na molekule HLA → rozpoznanie T-lymfocytom → aktivácia</p>"
},
{
  id: "protilatky", et: "imunoglobulín: lat. <i>immunis</i> „chránený“ + <i>globulus</i> „guľôčka“ (frakcia bielkovín)",
  title: "Protilátky (imunoglobulíny)",
  match: ["protilátk\\w*", "imunoglobulín\\w*"],
  short: "Bielkoviny, ktoré tvoria plazmocyty proti určitému antigénu. Naviažu sa naň, označia ho na zničenie a aktivujú komplement. Pri autoimunite môžu namieriť proti vlastným štruktúram.",
  body: "<ul><li>Päť tried: IgG, IgA, IgM, IgE, IgD.</li><li>IgM je prvá, IgG pamäťová, IgA sliznicová, IgE sa uplatňuje pri alergii.</li></ul>"
},
{
  id: "precitlivenost-iv", et: "hypersenzitivita: gr. <i>hyper</i> „nad“ + lat. <i>sensitivus</i> „citlivý“ (<i>sentire</i> „cítiť“)",
  title: "Precitlivenosť (hypersenzitivita) IV. typu",
  match: ["precitlivenos\\w*(?:\\s+IV\\.\\s+typu)?", "hypersenzitivit\\w*"],
  short: "Oneskorená reakcia sprostredkovaná T-lymfocytmi, nie protilátkami; vrchol dosahuje za 1–3 dni. Podkladom granulómov, kontaktnej dermatitídy a tuberkulínového testu.",
  body: "<ul><li><b>I. typ</b> — IgE a mastocyty, okamžitá alergia.</li><li><b>II. typ</b> — protilátky proti bunkám alebo tkanivu.</li><li><b>III. typ</b> — imunokomplexy v stene ciev a tkanív.</li><li><b>IV. typ</b> — T-lymfocyty, oneskorená reakcia.</li></ul>"
},
{
  id: "senzibilizacia", et: "lat. <i>sensibilis</i> „vnímateľný“ (<i>sentire</i> „cítiť“)",
  title: "Senzibilizácia",
  match: ["senzibiliz\\w*", "senzitiz\\w*"],
  short: "Stav, keď imunitný systém po prvom stretnutí s antigénom vytvoril pamäťové bunky a pri ďalšom stretnutí odpovie rýchlejšie a silnejšie.",
  body: "<ul><li>Pri alergii vzniká IgE, pri kontaktnej dermatitíde T-lymfocyty.</li><li>Pri ďalšom kontakte nasleduje reakcia (hypersenzitivita).</li></ul>"
},
{
  id: "adherentne-spoje", et: "lat. <i>adhaerere</i> „lipnúť“",
  title: "Adherentné spoje",
  match: ["adherentn\\w*\\s+spoj\\w*"],
  short: "Bunkové spoje, ktorými sa bunky držia k sebe cez kadheríny napojené na aktínové vlákna.",
  body: "<ul><li>Kadherín–katenín–aktín.</li><li>Strata E-kadherínu pomáha nádorovým bunkám šíriť sa.</li></ul>"
},
{
  id: "desmozom", et: "gr. <i>desmos</i> „puto“ + <i>soma</i>",
  title: "Desmozóm",
  match: ["desmozóm\\w*"],
  short: "Pevný bunkový spoj, ktorý nesie vlákna cytoskeletu.",
  body: "<ul><li>Autoprotilátky proti desmogleínom (zložke desmozómov) spôsobujú pemfigus.</li></ul>"
},
{
  id: "kadherin", et: "angl. <i>calcium-dependent adhesion</i> „vápnikom podmienená adhézia“",
  title: "E-kadherín",
  match: ["E-kadherín\\w*", "kadherín\\w*"],
  short: "Bielkovina adherentných spojov, ktorá spája susedné epitelové bunky. Epiteloidné bunky ju využívajú, preto v granulóme ležia ako epitel.",
  body: "<ul><li>Viaže vápnik (calcium-dependent).</li><li>Pri lobulárnom karcinóme prsníka chýba (mutácia CDH1).</li></ul>"
},
{
  id: "ace",
  title: "Angiotenzín konvertujúci enzým (ACE; angl. angiotensin-converting enzyme)",
  match: ["angiotenzín\\w*\\s+konvertuj\\w*\\s+enzým\\w*", "ACE"],
  short: "Enzým, ktorý mení angiotenzín I na angiotenzín II (zvyšuje tlak). Epiteloidné bunky granulómu ho tvoria navyše, a preto jeho hladina v sére mierne odráža množstvo granulómov pri sarkoidóze.",
  body: "<ul><li>ACE inhibítory sa používajú pri hypertenzii a zlyhaní srdca.</li><li>Zvýšený ACE v sére sa pri sarkoidóze používal ako orientačný ukazovateľ.</li></ul>"
},
{
  id: "kalcitriol", et: "lat. <i>calx</i> „vápno“ + triol",
  title: "Kalcitriol",
  match: ["kalcitriol\\w*", "aktívn\\w*\\s+vitamín\\w*\\s+D"],
  short: "Aktívna forma vitamínu D: zvyšuje vstrebávanie vápnika v čreve.",
  body: "<ul><li>Vzniká v obličke vplyvom 1α-hydroxylázy.</li><li>Makrofágy granulómu ho tvoria nezávisle od parathormónu.</li></ul>"
},
{
  id: "1a-hydroxylaza",
  title: "1α-hydroxyláza",
  match: ["1α-hydroxyláz\\w*"],
  short: "Enzým, ktorý aktivuje vitamín D na kalcitriol.",
  body: "<ul><li>Je v obličke a aj v makrofágoch granulómu.</li></ul>"
},
{
  id: "parathormon", et: "gr. <i>para</i> „vedľa“ (pri štítnej žľaze) + hormón (gr. <i>hormaein</i> „podnecovať“)",
  title: "Parathormón (PTH; angl. parathyroid hormone)",
  match: ["parathormón\\w*"],
  short: "Hormón prištítnych teliesok, ktorý zvyšuje hladinu vápnika v krvi (uvoľňuje ho z kostí, šetrí ho v obličkách, zvyšuje tvorbu kalcitriolu).",
  body: "<ul><li>Reguluje ho hladina vápnika: pokles ↑ PTH.</li><li>Nadbytok (hyperparatyreóza) dáva kostné zmeny a kamene.</li></ul>"
},
{
  id: "nefrokalcinoza", et: "gr. <i>nephros</i> + lat. <i>calx</i> + <i>-osis</i>",
  title: "Nefrokalcinóza",
  match: ["nefrokalcinóz\\w*"],
  short: "Ukladanie vápenatých solí do tkaniva obličky.",
  body: "<ul><li>Príčiny: hyperkalciémia (hyperparatyreóza, sarkoidóza, nadbytok vitamínu D).</li><li>Vápnik sa ukladá v dreni a kôre obličky.</li></ul>"
},
{
  id: "oblickove-kamene",
  title: "Obličkové kamene",
  match: ["obličkov\\w*\\s+kame\\w*", "nefrolitiáz\\w*"],
  short: "Tvrdé konkrementy v močových cestách (nefrolitiáza).",
  body: "<ul><li>Najčastejšie sú z oxalátu vápenatého.</li><li>Prejavia sa kolikou a hematúriou.</li></ul><ul><li>Spoločnou príčinou s nefrokalcinózou býva dlhodobo zvýšený vápnik v moči.</li></ul>"
},
{
  id: "glukokortikoidy", et: "glukóza (gr. <i>glykys</i> „sladký“) + lat. <i>cortex</i> „kôra“ + gr. <i>-eides</i> „podobný“",
  title: "Glukokortikoidy",
  match: ["glukokortikoid\\w*", "kortikoid\\w*", "kortikosteroid\\w*"],
  short: "Steroidné hormóny kôry nadobličiek a ich lieky (prednizón, dexametazón). Silno tlmia zápal a imunitu, ale zhoršujú obranu proti mikróbom — preto zhoršia neliečenú tuberkulózu.",
  body: "<ul><li>Receptor je v jadre a ovplyvňuje génovú expresiu.</li><li>Nežiaduce účinky: osteoporóza, diabetes, hypertenzia, cushingoidný vzhľad.</li></ul>"
},
{
  id: "imunosupresia", et: "lat. <i>immunis</i> „chránený“ + <i>supprimere</i> „potlačiť“",
  title: "Imunosupresia",
  match: ["imunosupres\\w*"],
  short: "Zníženie imunitnej odpovede, či už liekmi (glukokortikoidy, anti-TNF, cytostatiká), alebo chorobou (HIV, malnutrícia). Zvyšuje riziko oportúnnych infekcií a reaktivácie latentných ložísk.",
  body: "<ul><li>Liekmi: glukokortikoidy, cyklosporín, biologiká.</li><li>Príznaky: oportúnne infekcie a nádory.</li></ul>"
},
{
  id: "anti-tnf",
  title: "Lieky proti TNF (anti-TNF; angl. tumor necrosis factor inhibitors)",
  match: ["anti-?TNF", "lie\\w*\\s+proti\\s+TNF", "infliximab\\w*", "adalimumab\\w*", "etanercept\\w*"],
  short: "Biologické lieky, ktoré blokujú cytokín TNF (infliximab, adalimumab, etanercept). Liečia reumatoidnú artritídu a Crohnovu chorobu, ale rozvoľnia granulómy a môžu reaktivovať latentnú tuberkulózu."
},
{
  id: "reumatoidna-artritida", et: "gr. <i>rheuma</i> „tok, prúd“ + <i>-eides</i> „podobný“; <i>arthron</i> „kĺb“ + <i>-itis</i> „zápal“",
  title: "Reumatoidná artritída",
  match: ["reumatoidn\\w*\\s+artrit\\w*"],
  short: "Chronický autoimunitný zápal kĺbov: synoviálna blana sa zhrubne, vrastá do kĺbu a ničí chrupku a kosť. Komplikáciou sú reumatoidné uzly v podkoží.",
  body: "<ul><li>Pannus je zápalové väzivo, ktoré rastie do kĺbu a ničí chrupku.</li><li>Symetricky postihuje malé kĺby rúk.</li></ul>"
},
{
  id: "reumatoidny-uzol",
  title: "Reumatoidný uzol",
  match: ["reumatoidn\\w*\\s+uz\\w*"],
  img: {
    "src": "assets/images/rheumatoid-nodule.jpg",
    "alt": "Reumatoidný uzol: fibrinoidná nekróza v strede a palisáda histiocytov (H&E, anotované).",
    "caption": "Reumatoidný uzol: fibrinoidná nekróza v strede a palisáda histiocytov (H&E, anotované).",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_a_rheumatoid_nodule.png"
  },
  short: "Pevná hrčka v podkoží nad tlakovými miestami: v strede fibrinoidná nekróza, okolo nej palisáda makrofágov.",
  body: "<ul><li>Najčastejšie na lakti a predlaktí.</li><li>Vyskytuje sa pri seropozitívnej forme.</li></ul>"
},
{
  id: "reumatoidny-faktor",
  title: "Reumatoidný faktor",
  match: ["reumatoidn\\w*\\s+faktor\\w*"],
  short: "Protilátka proti vlastným protilátkam IgG; nachádza sa v sére väčšiny chorých na reumatoidnú artritídu.",
  body: "<ul><li>Je to IgM proti Fc časti IgG.</li><li>Pozitívny býva aj pri iných chorobách; špecifickejšie sú anti-CCP.</li></ul>"
},
{
  id: "crohn",
  title: "Crohnova choroba",
  match: ["Crohnov\\w*(?:\\s+choro\\w*)?"],
  img: {
    "src": "assets/images/granuloma-colon-crohn.jpg",
    "alt": "Nekazeifikujúci granulóm v sliznici hrubého čreva (H&E).",
    "caption": "Granulóm medzi kryptami pri Crohnovej chorobe – zhluk epiteloidných buniek bez nekrózy.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_granuloma_of_colonic_mucosa.jpg"
  },
  short: "Chronický zápalový proces čreva, ktorý môže postihnúť ktorýkoľvek úsek od úst po konečník (najčastejšie terminálny ileum). Zápal prechádza celou stenou a často tvorí nekazeifikujúce granulómy.",
  body: "<ul><li>Postihnutie je „skokové“ (skip lesions).</li><li>Transmurálny zápal vedie k fistulám a striktúram.</li><li>Slizničné vredy dávajú obraz dlažobných kociek.</li></ul>"
},
{
  id: "chgb",
  title: "Chronická granulomatózna choroba",
  match: ["chronick\\w*\\s+granulomatózn\\w*\\s+choro\\w*"],
  short: "Vrodená porucha enzýmu NADPH-oxidázy vo fagocytoch: bunky nevedia tvoriť kyslíkové radikály, a preto nezabijú určité baktérie a huby. Tkanivá sa plnia granulómami a abscesmi.",
  body:
    '<p class="chain">chýba <b>NADPH-oxidáza</b> → fagocyt netvorí kyslíkové radikály → pohltený mikrób prežíva → opakované infekcie → stále nové <b>granulómy</b> a abscesy</p>'
},
{
  id: "nadph-oxidaza",
  title: "NADPH-oxidáza (angl. nicotinamide adenine dinucleotide phosphate oxidase)",
  match: ["NADPH-?oxidáz\\w*"],
  short: "Enzým fagocytov, ktorý z kyslíka tvorí superoxid — východisko kyslíkových radikálov na zabíjanie mikróbov. Jej vrodený defekt spôsobuje chronickú granulomatóznu chorobu.",
  body: "<ul><li>Skladá sa z membránových a cytosolových podjednotiek, ktoré sa pri aktivácii spoja.</li><li>Pri defekte sa množia kataláza-pozitívne mikróby (stafylokok, Aspergillus).</li></ul>"
},

/* ── histochémia, laboratórne a zobrazovacie metódy ──────────────────── */
{
  id: "polarizovane-svetlo", et: "gr. <i>polos</i> „os, pól“",
  title: "Polarizované svetlo",
  match: ["polarizovan\\w*\\s+svetl\\w*", "polarizáci\\w*"],
  img: {
    "src": "assets/images/amyloid-congo-red-polarized.jpg",
    "alt": "Congo red v polarizovanom svetle: jablkovozelený dvojlom amyloidu.",
    "caption": "Congo red v polarizovanom svetle: jablkovozelený dvojlom amyloidu.",
    "credit": "Tulemo · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Amyloid_Liver_Congo_Red_Bar=100um.jpg"
  },
  short: "Mikroskop s polarizačnými filtrami: látky s pravidelnou kryštalickou stavbou sa na tmavom pozadí rozsvietia.",
  body: "<ul><li>Svietia kryštály kyseliny močovej, mastenec, silikón a amyloid po farbení kongo červeňou.</li></ul>"
},
{
  id: "dvojlom",
  title: "Dvojlom",
  match: ["dvojlom\\w*"],
  short: "Schopnosť pravidelnej štruktúry rozdeliť polarizované svetlo na dva lúče; vďaka nej látka v polarizovanom svetle svieti.",
  body: "<ul><li>Kongo červeň + amyloid → jablkovozelený dvojlom.</li><li>Urát sodný tvorí ihlicovité kryštály so záporným dvojlomom.</li></ul>"
},
{
  id: "warthin-starry",
  title: "Striebrenie podľa Warthina a Starryho",
  match: ["Warthin\\w*[–-]Starry\\w*"],
  short: "Striebrenie, pri ktorom sa na tenké baktérie (špirochéty, bartonely, <i>Helicobacter</i>) nasadí striebro: tkanivo je žltohnedé, baktérie čierne.",
  body: "<ul><li>Dokazuje Helicobacter pylori, Treponema pallidum a Bartonella.</li><li>Baktérie sa na reze ukážu ako čierne tyčinky alebo špirály.</li></ul>"
},
{
  id: "fite-faraco",
  title: "Fite–Faraco (modifikované Ziehl–Neelsen)",
  match: ["Fite\\w*[–-]Faraco\\w*"],
  img: {
    "src": "assets/images/leprosy-afb-globi.jpg",
    "alt": "Acidorezistentné tyčinky M. leprae v makrofágoch (Wade–Fite) – snopy pšenice.",
    "caption": "Acidorezistentné tyčinky M. leprae v makrofágoch (Wade–Fite) – snopy pšenice.",
    "credit": "SB Lucas, Wellcome Collection · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Lepromatous_leprosy_histoid_leprosy_Wellcome_W0043388.jpg"
  },
  short: "Mierna úprava farbenia podľa Ziehla a Neelsena na dôkaz <i>Mycobacterium leprae</i>. Lepra baktéria sa totiž odfarbuje ľahšie než tuberkulózna, preto sa odfarbuje jemnejším postupom.",
  body: "<ul><li>Pri deparafinácii sa používa olej, aby sa voskový obal baktérie nezničil.</li><li>Odfarbuje sa slabou kyselinou.</li></ul>"
},
{
  id: "auramin", et: "lat. <i>aurum</i> „zlato“ (žltá farba) + amín",
  title: "Auramínové (fluorescenčné) farbenie",
  match: ["auramín\\w*", "fluorescenčn\\w*"],
  short: "Mykobaktérie sa vyfarbia fluorescenčným farbivom a v mikroskope svietia žlto na tmavom pozadí. Pri malom zväčšení sa hľadajú ľahšie než pri farbení Ziehl–Neelsen.",
  body: "<ul><li>Pozitívny nález sa potvrdí farbením podľa Ziehla a Neelsena.</li><li>Hodí sa na skríning veľkého počtu vzoriek.</li></ul>"
},
{
  id: "bal", et: "bronchus: gr. <i>bronchos</i> „priedušnica“; alveolus: lat. <i>alveolus</i> „jamka“; laváž: franc. <i>lavage</i> „umývanie, preplachovanie“ (lat. <i>lavare</i> „umývať“)",
  title: "Bronchoalveolárna laváž (BAL; angl. bronchoalveolar lavage)",
  match: ["bronchoalveolárn\\w*\\s+lavá\\w*", "BAL"],
  short: "Pri bronchoskopii sa do časti pľúc vstrekne fyziologický roztok a odsaje sa späť. Získané bunky (lymfocyty, makrofágy) a mikróby sa vyšetria — napr. pomer CD4⁺/CD8⁺ pri sarkoidóze.",
  body: "<ul><li>Pri sarkoidóze býva lymfocytóza a vysoký pomer CD4⁺/CD8⁺.</li><li>Pri alergickej alveolitíde sú lymfocyty s nízkym pomerom CD4⁺/CD8⁺.</li></ul>"
},
{
  id: "bronchoskopia", et: "gr. <i>bronchos</i> „priedušnica“ + <i>skopein</i> „pozerať“",
  title: "Bronchoskopia",
  match: ["bronchoskop\\w*"],
  short: "Vyšetrenie dýchacích ciest ohybným prístrojom s kamerou, ktorý sa zavedie ústami alebo nosom. Cez prístroj sa dá odobrať vzorka tkaniva, hlienu alebo výplach (laváž).",
  body: "<ul><li>Cez prístroj sa dá odobrať biopsia, výplach (BAL) alebo kefka.</li><li>Používa sa pri nádore, sarkoidóze, infekcii a krvácaní.</li></ul>"
},
{
  id: "pcr",
  title: "PCR (polymerázová reťazová reakcia; angl. polymerase chain reaction)",
  match: ["PCR", "Xpert\\s+MTB/RIF"],
  short: "Laboratórna metóda, ktorá z mikroskopického množstva DNA (napr. mykobaktérie) vyrobí milióny kópií, a tak ju dá spoľahlivo dokázať. Test Xpert MTB/RIF navyše odhalí mutáciu pre rezistenciu na rifampicín.",
  body: "<ul><li>Princíp: opakované cykly zahrievania a ochladzovania s polymerázou.</li><li>Výhoda: výsledok za hodiny namiesto týždňov pri kultivácii.</li></ul>"
},
{
  id: "kultivacia", et: "lat. <i>colere, cultum</i> „obrábať, pestovať“",
  title: "Kultivácia",
  match: ["kultivác\\w*"],
  img: {
    "src": "assets/images/tb-culture-lj.jpg",
    "alt": "Kultúra Mycobacterium tuberculosis na Löwenstein–Jensenovom a Ogawovom médiu po 6 týždňoch.",
    "caption": "Kultúra Mycobacterium tuberculosis na Löwenstein–Jensenovom a Ogawovom médiu po 6 týždňoch.",
    "credit": "HansN. · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:M.tuberculosis.jpg"
  },
  short: "Pestovanie mikróbov z vzorky na živnom médiu. Umožňuje určiť druh aj citlivosť na lieky; pri pomaly rastúcich mykobaktériách trvá týždne.",
  body: "<ul><li>Umožní určiť druh aj citlivosť na lieky.</li><li>Pri mykobaktériách trvá rast týždne.</li></ul>"
},
{
  id: "serologia", et: "lat. <i>serum</i> „srvátka“ + gr. <i>logos</i> „náuka“",
  title: "Sérológia",
  match: ["sérológi\\w*", "sérologick\\w*"],
  short: "Vyšetrenie krvného séra na protilátky alebo antigény. Nepriamo dokazuje, že sa organizmus s mikróbom stretol.",
  body: "<ul><li>Pri syfilise je hlavnou metódou dôkazu.</li><li>Pozitívny nález môže znamenať aj starú, prekonanú infekciu.</li></ul>"
},
{
  id: "igra",
  title: "IGRA (angl. interferon-gamma release assay)",
  match: ["IGRA"],
  short: "Krvný test: T-lymfocyty pacienta sa v skúmavke vystavia antigénom mykobaktérií a meria sa, či tvoria IFN-γ. Dokazuje stretnutie s mykobaktériou (senzibilizáciu), nie aktívnu chorobu; očkovanie BCG ho neskreslí."
},
{
  id: "tuberkulinovy-test",
  img: {
    src: "assets/images/mantoux-test.jpg",
    alt: "Odčítanie tuberkulínového testu po 48 h – meria sa priemer indurácie.",
    caption: "Odčítanie tuberkulínového testu po 48 h – meria sa priemer indurácie.",
    credit: "CDC · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mantoux_Test_48h.jpeg"
  },
  title: "Tuberkulínový test",
  match: ["tuberkulínov\\w*\\s+test\\w*"],
  short: "Do kože sa vpichne tuberkulín a po 48–72 h sa meria tuhý opuch. Je to reakcia IV. typu: ukazuje senzibilizáciu na mykobaktérie (infekciou aj očkovaním), nie aktívnu chorobu."
},
{
  id: "bcg",
  title: "BCG (očkovanie; angl. Bacillus Calmette–Guérin)",
  match: ["BCG"],
  short: "Vakcína z oslabeného kmeňa <i>Mycobacterium bovis</i>. Chráni najmä deti pred miliárnou tuberkulózou a meningitídou, pred pľúcnou tuberkulózou dospelých chráni málo. Na Slovensku sa plošne nepodáva od roku 2012."
},
{
  id: "antituberkulotika", et: "gr. <i>anti</i> + lat. <i>tuberculum</i>",
  title: "Antituberkulotiká",
  match: ["antituberkulotik\\w*"],
  short: "Lieky proti tuberkulóze (izoniazid, rifampicín, pyrazínamid, etambutol).",
  body: "<ul><li>Štandardne dva mesiace štyri lieky, potom štyri mesiace izoniazid a rifampicín.</li><li>Rezistencia vzniká pri nedokončenej liečbe.</li></ul><ul><li>Kombinujú sa najmenej 6 mesiacov, lebo jediný liek by vyselektoval rezistentné kmene.</li><li>Rezistencia na rifampicín a izoniazid = multirezistentná tuberkulóza.</li></ul>"
},
{
  id: "rifampicin",
  title: "Rifampicín",
  match: ["rifampicín\\w*"],
  short: "Antibiotikum, ktoré blokuje bakteriálnu RNA-polymerázu.",
  body: "<ul><li>Je súčasťou liečby tuberkulózy aj lepry.</li><li>Môže poškodiť pečeň a sfarbí telesné tekutiny do oranžova.</li></ul>"
},
{
  id: "izoniazid",
  title: "Izoniazid",
  match: ["izoniazid\\w*"],
  short: "Liek, ktorý blokuje tvorbu mykolových kyselín mykobaktérií.",
  body: "<ul><li>Môže poškodiť pečeň a nervy.</li></ul>"
},
{
  id: "dapson",
  title: "Dapsón",
  match: ["dapsón\\w*"],
  short: "Liek proti lepre; podáva sa v kombinácii s rifampicínom.",
  body: "<ul><li>Sulfón, ktorý blokuje syntézu kyseliny listovej baktérie.</li><li>Môže vyvolať hemolytickú anémiu (nedostatok G6PD).</li></ul>"
},
{
  id: "klofazimin",
  title: "Klofazimín",
  match: ["klofazimín\\w*"],
  short: "Liek proti lepre; farbí kožu do hnedočervena.",
  body: "<ul><li>Podáva sa v kombinácii 6 alebo 12 mesiacov (podľa formy), lebo samotný liek by selektoval odolné kmene.</li></ul>"
},
{
  id: "rezistencia", et: "lat. <i>resistere</i> „odolávať“",
  title: "Rezistencia na lieky",
  match: ["rezistenci\\w*"],
  short: "Schopnosť mikróba prežiť liek, ktorý ho normálne zabíja (mutáciou, vylučovaním lieku, zmenou cieľa). Vzniká tlakom nedostatočnej liečby, preto sa antituberkulotiká kombinujú."
},
{
  id: "biopsia", et: "gr. <i>bios</i> „život“ + <i>opsis</i> „videnie, pohľad“",
  title: "Biopsia",
  match: ["biops\\w*"],
  short: "Odber vzorky tkaniva z živého človeka na mikroskopické vyšetrenie. Môže byť ihlová, endoskopická (cez prístroj) alebo chirurgická; vzorka sa spracuje na histologický rez a patológ ju popíše.",
  body: "<ul><li>Typy: excízna (celé ložisko), incízna (časť), ihlová.</li><li>Vzorka sa fixuje čo najskôr, aby tkanivo nehnilo.</li></ul>"
},
{
  id: "diferencialna-diagnoza", et: "lat. <i>differre</i> „líšiť sa“; diagnóza: gr. <i>diagnosis</i> „rozoznanie“ (<i>dia</i> + <i>gignoskein</i> „poznávať“)",
  title: "Diferenciálna diagnóza",
  match: ["diferenciáln\\w*\\s+diagnóz\\w*"],
  short: "Zoznam chorôb, ktoré by mohli spôsobiť ten istý nález, a postup, ktorým sa zúži na jednu. Vždy začína tými, ktoré sú najčastejšie alebo najnebezpečnejšie."
},
{
  id: "prevalencia", et: "lat. <i>praevalere</i> „prevládať“",
  title: "Prevalencia",
  match: ["prevalenci\\w*"],
  short: "Podiel ľudí, ktorí chorobu majú v určitom čase.",
  body: "<ul><li>Závisí od incidencie a od trvania choroby.</li><li>Chronické choroby majú vysokú prevalenciu aj pri nízkej incidencii.</li></ul>"
},
{
  id: "incidencia", et: "lat. <i>incidere</i> „dopadnúť, nastať“",
  title: "Incidencia",
  match: ["incidenci\\w*"],
  short: "Počet nových prípadov za určité obdobie (napr. za rok).",
  body: "<ul><li>Vyjadruje sa na 100 000 osôb a rok.</li><li>Akútne a krátko trvajúce choroby majú vysokú incidenciu a nízku prevalenciu.</li></ul>"
},
{
  id: "inkubacia", et: "lat. <i>incubare</i> „ležať na“ (<i>in</i> „na“ + <i>cubare</i> „ležať“) – ako kvočka na vajciach",
  title: "Inkubácia",
  match: ["inkubáci\\w*"],
  short: "Čas od nákazy po prvé príznaky. Pri tuberkulóze trvá týždne, pri lepre aj roky."
},

/* ── sarkoidóza ──────────────────────────────────────────────────────── */
{
  id: "sarkoidoza", et: "gr. <i>sarx, sarkos</i> „mäso“ + <i>-eides</i> „podobný“ + <i>-osis</i>",
  title: "Sarkoidóza",
  img: {
    src: "assets/images/sarcoid-granuloma.jpg",
    alt: "Nekazeifikujúci granulóm pri sarkoidóze (H&E).",
    caption: "Granulóm z epiteloidných buniek s riedkym lemom lymfocytov, v strede bez nekrózy.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Non-necrotizing_granuloma_(6201646890).jpg"
  },
  match: ["sarkoidóz\\w*", "sarkoidov\\w*"],
  short: "Systémová choroba neznámej príčiny s nekazeifikujúcimi granulómami (najčastejšie v pľúcach a hilových uzlinách). Podkladom je prehnaná odpoveď Th1 na slabý antigén; dobre odpovedá na glukokortikoidy.",
  body:
    '<p class="chain">slabý antigén u predisponovaného človeka → <b>Th1/Th17</b> → veľa <b>granulómov bez nekrózy</b> → pri trvaní fibróza</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Diagnóza sa robí vylúčením, najmä tuberkulózy: kortikoidy by ju rozšírili.</p>'
},
{
  id: "lofgren",
  title: "Löfgrenov syndróm",
  match: ["Löfgren\\w*(?:\\s+syndróm\\w*)?"],
  short: "Akútna forma sarkoidózy: horúčka, obojstranné zväčšenie hilových uzlín, zápal členkov a erythema nodosum. Má dobrú prognózu, väčšinou sa vylieči sama."
},
{
  id: "erythema-nodosum", et: "gr. <i>erythros</i> „červený“ + <i>erythema</i> „sčervenanie“; lat. <i>nodosus</i> „uzlovitý“ (<i>nodus</i> „uzol“)",
  title: "Erythema nodosum",
  match: ["erythema\\s+nodosum", "uzlovit\\w*\\s+erytém\\w*"],
  img: {
    "src": "assets/images/erythema-nodosum.jpg",
    "alt": "Erythema nodosum – boľavé červené uzly na predkolení.",
    "caption": "Erythema nodosum – boľavé červené uzly na predkolení.",
    "credit": "James Heilman, MD · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Erythema_nodosum_on_hairy_legs.jpg"
  },
  short: "Bolestivé červené uzly na predkoleniach — zápal podkožného tuku. Je to reaktívna zmena pri sarkoidóze, tuberkulóze, streptokokových infekciách a zápalových chorobách čreva.",
  body: "<ul><li>V histológii septálna panikulitída.</li><li>Je to reaktívna zmena, nie infekcia kože.</li></ul>"
},
{
  id: "uveitida", et: "lat. <i>uva</i> „hrozno“ (uvea sa podobá hroznu) + gr. <i>-itis</i> „zápal“",
  title: "Uveitída",
  match: ["uveitíd\\w*"],
  short: "Zápal stredného obalu oka (dúhovka, riasnaté teliesko, cievnatka). Prejavuje sa bolesťou, začervenaním a zhoršeným videním; pri sarkoidóze je častá."
},
{
  id: "berylium", et: "gr. <i>beryllos</i> „beryl (drahokam)“",
  title: "Berýlium",
  match: ["berýli\\w*"],
  short: "Kov, ktorého prach pôsobí na náchylných ľudí (najmä alely HLA-DPB1) imunitne.",
  body: "<ul><li>Pri podozrení na sarkoidózu sa preto vylučuje expozícia berýliu.</li></ul>"
},
{
  id: "beryliza",
  title: "Berylióza",
  match: ["berylióz\\w*"],
  short: "Imunitný granulomatózny zápal pľúc po vdychovaní berýlia, podobný sarkoidóze.",
  body: "<ul><li>Dôkaz: proliferácia lymfocytov po vystavení berýliu (BeLPT).</li><li>Granulómy sú bez kazeácie, ako pri sarkoidóze.</li></ul>"
},
{
  id: "hla",
  title: "HLA (ľudské leukocytové antigény; angl. human leukocyte antigens)",
  match: ["HLA(?:-\\w+)?"],
  short: "Bielkoviny na povrchu buniek, ktoré vystavujú antigény T-lymfocytom. Ich genetické varianty (alely) rozhodujú, na čo je človek náchylný — napr. HLA-DRB1 pri sarkoidóze."
},
{
  id: "asteroidne-teliesko", et: "gr. <i>aster</i> „hviezda“ + <i>-eides</i> „podobný“",
  title: "Asteroidné teliesko",
  img: {
    src: "assets/images/asteroid-body.jpg",
    alt: "Asteroidné teliesko v obrovskej bunke (H&E).",
    caption: "Hviezdicovitá inklúzia v cytoplazme obrovskej bunky pri sarkoidóze.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Asteroid_body_(6152059052).jpg"
  },
  match: ["asteroidn\\w*\\s+tel\\w*"],
  short: "Hviezdicovitá bielkovinová inklúzia v cytoplazme obrovskej bunky. Často sa nájde pri sarkoidóze, ale nie je preň špecifická."
},
{
  id: "schaumann",
  img: {
    src: "assets/images/sarcoid-granuloma.jpg",
    alt: "Sarkoidový granulóm bez kazeácie.",
    caption: "Sarkoidový granulóm bez kazeácie.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Non-necrotizing_granuloma_(6201646890).jpg"
  },
  title: "Schaumannove telieska",
  img: {
    src: "assets/images/schaumann-polarized.jpg",
    alt: "Kryštalická inklúzia v obrovskej bunke pri sarkoidóze (polarizované svetlo).",
    caption: "Dvojlomný kryštál v obrovskej bunke; z takých kryštálov sa vrstvením vápnika tvorí Schaumannovo teliesko.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Crystalline_inclusion_with_developing_Schaumann_body,_polarized.jpg"
  },
  match: ["Schaumannov\\w*\\s+tel\\w*"],
  short: "Vrstvené, zvápenatené guľôčky v obrovských bunkách granulómu. Typické pre sarkoidózu, vyskytujú sa však aj pri iných granulómoch."
},
{
  id: "hilus", et: "lat. <i>hilum</i> „drobnosť, jazvička na semene“",
  title: "Hilus pľúc",
  match: ["hilus\\s+pľúc\\w*", "hilov\\w*", "hilus\\w*"],
  img: {
    "src": "assets/images/sarcoid-hilar-nodes-gross.jpg",
    "alt": "Zväčšené hilové uzliny pri sarkoidóze (MA).",
    "caption": "Zväčšené hilové uzliny pri sarkoidóze (MA).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Bilateral_hilar_lymphadenoathy_(6077534292).jpg"
  },
  short: "Miesto na pľúcach, kde vstupujú priedušky a cievy; okolo ležia hilové uzliny.",
  body: "<ul><li>Pri sarkoidóze sú hilové uzliny zväčšené obojstranne.</li><li>Pri primárnej tuberkulóze zvyčajne jednostranne.</li></ul>"
},
{
  id: "mediastinum", et: "lat. <i>medius</i> „stredný“",
  title: "Mediastinum",
  match: ["mediastinál\\w*", "mediastin\\w*"],
  short: "Priestor medzi pľúcami: srdce, veľké cievy, priedušnica a uzliny.",
  body: "<ul><li>Obsahuje srdce, aortu, priedušnicu, pažerák a uzliny.</li><li>Zväčšené uzliny vidno na RTG a CT.</li></ul>"
},
{
  id: "lymfaticka-uzlina",
  title: "Lymfatická uzlina",
  match: ["lymfatick\\w*\\s+uzlin\\w*", "hilov\\w*\\s+uzlin\\w*", "mediastinál\\w*\\s+uzlin\\w*", "uzlin\\w*"],
  short: "Zrniečko lymfatického tkaniva na dráhe lymfy, ktoré filtruje lymfu z okolia a spúšťa imunitnú odpoveď. Pri zápale v spádovej oblasti sa zväčší (reaktívna lymfadenitída).",
  body: "<ul><li>Kôra: folikuly (B-lymfocyty), parakortex: T-lymfocyty, dreň: plazmocyty.</li><li>Pri reaktívnej lymfadenitíde sa zväčšujú zárodočné centrá.</li></ul>"
},
{
  id: "lymfadenitida", et: "lat. <i>lympha</i> „čistá voda“ + gr. <i>aden</i> „žľaza“ + <i>-itis</i> „zápal“",
  title: "Lymfadenitída",
  match: ["lymfadenitíd\\w*"],
  short: "Zápal lymfatickej uzliny, ktorý sa prejaví jej zväčšením a bolestivosťou. Môže byť reaktívny alebo hnisavý, pri tuberkulóze kazeifikujúci."
},
{
  id: "lymfaticke-cievy", et: "lat. <i>lympha</i> „čistá voda“",
  title: "Lymfatické cievy",
  match: ["lymfatick\\w*\\s+ciev\\w*", "lymfatick\\w*\\s+cest\\w*"],
  img: {
    "src": "assets/images/sarcoid-perilymphatic.jpg",
    "alt": "Sarkoidové granulómy ležia pozdĺž lymfatických ciev okolo bronchovaskulárneho zväzku (H&E).",
    "caption": "Sarkoidové granulómy ležia pozdĺž lymfatických ciev okolo bronchovaskulárneho zväzku (H&E).",
    "credit": "Atlas of Pulmonary Pathology · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Sarcoidosis-Lymphangitic_localization_of_granulomas_(52174352983).jpg"
  },
  short: "Slepo začínajúce cievy, ktoré odvádzajú tkanivovú tekutinu cez uzliny späť do žíl.",
  body: "<ul><li>Slúžia aj ako cesta, ktorou sa šíria mikróby a nádorové bunky.</li></ul>"
},
{
  id: "lymfa",
  title: "Lymfa",
  match: ["lymf(?:a|y|e|u|ou)"],
  short: "Číra tkanivová tekutina, ktorú odvádzajú lymfatické cievy.",
  body: "<ul><li>Vzniká z tkanivovej tekutiny, ktorá sa nevrátila do žíl.</li><li>Obsahuje lymfocyty a bielkoviny.</li><li>Do krvi sa vracia hrudným lymfatickým vývodom.</li></ul>"
},
{
  id: "pohrudnica", et: "gr. <i>pleura</i> „bok, rebro“",
  title: "Pohrudnica (pleura)",
  match: ["pohrudnic\\w*", "pleur\\w*"],
  short: "Dvojvrstvová seróza, ktorá pokrýva pľúca (viscerálna) a vnútro hrudnej steny (parietálna). Medzi nimi je tenká vrstva tekutiny, ktorá umožňuje kĺzanie pri dýchaní."
},
{
  id: "priedusky", et: "gr. <i>bronchos</i> „priedušnica“",
  title: "Priedušky (bronchy)",
  match: ["priedušk\\w*", "bronch\\w*"],
  short: "Dýchacie cesty, ktoré vedú vzduch z priedušnice do pľúc a delia sa na menšie až k alveolám.",
  body: "<ul><li>Stena má chrupku, hladkú svalovinu a riasinkový epitel.</li><li>Zápal je bronchitída, rozšírenie bronchiektázie.</li></ul>"
},
{
  id: "priedusnica", et: "gr. <i>tracheia</i> „drsná“",
  title: "Priedušnica",
  match: ["priedušnic\\w*"],
  short: "Dýchacia cesta z hrtana, ktorá sa delí na dve hlavné priedušky.",
  body: "<ul><li>Má podkovovité chrupky; zadná stena je z hladkej svaloviny.</li><li>Zápal je tracheitída.</li></ul>"
},
{
  id: "alveolarny-makrofag", et: "lat. <i>alveolus</i> „jamka“ + makrofág",
  title: "Alveolárny makrofág",
  match: ["alveolárn\\w*\\s+makrofág\\w*"],
  short: "Makrofág pľúcnych alveol, ktorý čistí vdýchnutý prach a mikróby. Je prvou bunkou, ktorá sa stretne s mykobaktériou pri vdýchnutí."
},
{
  id: "restrikcia", et: "lat. <i>restringere</i> „stiahnuť, obmedziť“",
  title: "Reštrikčná porucha pľúc",
  match: ["reštrikčn\\w*\\s+poruch\\w*", "reštrikci\\w*"],
  short: "Pľúca sa nevedia dostatočne roztiahnuť (zjazvené alebo stuhnuté), preto sa zmenšuje ich objem. Pacient je dýchavičný a vitálna kapacita je znížená."
},
{
  id: "vostinovita-prestavba",
  img: {
    src: "assets/images/sarcoid-honeycomb.jpg",
    alt: "Voštinovitá prestavba pľúc – koniec sarkoidózy (MA).",
    caption: "Voštinovitá prestavba pľúc – koniec sarkoidózy (MA).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Honeycombing_(6076192489).jpg"
  },
  title: "Voštinovitá prestavba pľúc",
  match: ["voštinovit\\w*"],
  short: "Konečné štádium fibrózy pľúc: tkanivo je plné cýst a väzivových priehradiek ako plást. Dá sa vidieť na CT aj na reze."
},
{
  id: "kardiomyocyt", et: "gr. <i>kardia</i> „srdce“ + <i>mys</i> „sval“ + <i>kytos</i> „bunka“",
  img: {
    src: "assets/images/myocardial-hypertrophy-histology.jpg",
    alt: "Hypertrofované kardiomyocyty so zväčšenými hranatými jadrami.",
    caption: "Hypertrofované kardiomyocyty so zväčšenými hranatými jadrami.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_moderate_myocardial_hypertrophy_-_boxcar_nuclei.jpg"
  },
  title: "Kardiomyocyt",
  match: ["kardiomyocyt\\w*"],
  short: "Bunka srdcového svalu. Sťahuje sa rytmicky, je bohatá na mitochondrie a po poškodení sa takmer neobnovuje — nahradí ju jazva."
},
{
  id: "prevodovy-system",
  title: "Prevodový systém srdca",
  match: ["prevodov\\w*\\s+systém\\w*"],
  short: "Špecializované bunky srdca (sínusový uzol, AV uzol, Hisov zväzok a Purkyňove vlákna), ktoré tvoria a vedú elektrický impulz. Poškodenie vedie k blokádam alebo arytmiám."
},
{
  id: "arytmia", et: "gr. <i>a-</i> „bez“ + <i>rhythmos</i> „pravidelný pohyb, rytmus“",
  title: "Arytmia",
  match: ["arytmi\\w*"],
  short: "Porucha rytmu srdca — príliš pomalý, rýchly alebo nepravidelný. Komorové arytmie môžu viesť k zástave srdca.",
  body: "<ul><li>Príčiny: ischémia, zápal, poruchy elektrolytov.</li><li>Fibrilácia komôr zastaví prečerpávanie krvi.</li></ul>"
},
{
  id: "endokard", et: "gr. <i>endon</i> + <i>kardia</i>",
  title: "Endokard",
  match: ["endokard\\w*"],
  short: "Vnútorná výstelka srdca vrátane chlopní.",
  body: "<ul><li>Tvorí ho endotel a väzivo.</li><li>Pri endokarditíde vznikajú na chlopniach vegetácie.</li></ul>"
},
{
  id: "myokard", et: "gr. <i>mys</i> + <i>kardia</i>",
  title: "Myokard",
  match: ["myokard\\w*"],
  short: "Svalová stena srdca.",
  body: "<ul><li>Kardiomyocyty tvoria funkčné syncýcium.</li><li>Pri infarkte odumierajú a nahradí ich jazva.</li></ul><ul><li>Reumatická horúčka a niektoré infekcie zapália všetky vrstvy naraz (pankarditída).</li></ul>"
},
{
  id: "karditida", et: "gr. <i>kardia</i> + <i>-itis</i>",
  title: "Karditída",
  match: ["karditíd\\w*", "pankarditíd\\w*"],
  img: {
    "src": "assets/images/lymphocytic-myocarditis.jpg",
    "alt": "Lymfocytárna myokarditída: infiltrát medzi kardiomyocytmi.",
    "caption": "Lymfocytárna myokarditída: infiltrát medzi kardiomyocytmi.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_myocarditis_with_myocyte_necrosis.jpg"
  },
  short: "Zápal srdca; pri zápale všetkých vrstiev ide o pankarditídu.",
  body: "<ul><li>Príčiny: infekcie, autoimunita (reumatická horúčka), toxíny.</li><li>Pri pankarditíde sú zapálené všetky vrstvy.</li></ul>"
},
{
  id: "myokarditida",
  title: "Myokarditída",
  match: ["myokarditíd\\w*"],
  short: "Zápal srdcového svalu.",
  body: "<ul><li>Najčastejšie vírusová (Coxsackie).</li><li>Lymfocytový infiltrát a nekróza kardiomyocytov.</li><li>Môže viesť k arytmii a dilatačnej kardiomyopatii.</li></ul>"
},
{
  id: "endokarditida",
  title: "Endokarditída",
  match: ["endokarditíd\\w*"],
  short: "Zápal vnútornej výstelky srdca, najmä chlopní.",
  body: "<ul><li>Infekčná: baktérie na chlopniach (vegetácie).</li><li>Neinfekčná: reumatická a marantická (trombotická).</li></ul>"
},
{
  id: "perikarditida",
  title: "Perikarditída",
  match: ["perikarditíd\\w*"],
  short: "Zápal osrdcovníka.",
  body: "<ul><li>Typy: serózna, fibrinózna („chlieb s maslom“), hnisavá.</li><li>Príčiny: vírusy, infarkt, urémia, tuberkulóza.</li></ul>"
},
{
  id: "chlopne",
  title: "Srdcové chlopne",
  match: ["srdcov\\w*\\s+chlopn\\w*", "srdcov\\w*\\s+chlopň\\w*", "chlopň\\w*", "chlopn\\w*"],
  short: "Blanité záklopky, ktoré riadia smer toku krvi cez srdce.",
  body: "<ul><li>Štyri chlopne: mitrálna, trikuspidálna, aortová a pľúcna.</li><li>Poškodenie: stenóza (zúženie) alebo insuficiencia (nedovieranie).</li></ul>"
},
{
  id: "mitralna-chlopna", et: "lat. <i>mitra</i> „čelenka, biskupská čiapka“",
  img: {
    src: "assets/images/mitral-stenosis-gross.jpg",
    alt: "Mitrálna stenóza: zhrubnuté cípy chlopne (pohľad z ľavej predsiene).",
    caption: "Mitrálna stenóza: zhrubnuté cípy chlopne (pohľad z ľavej predsiene).",
    credit: "CDC / Dr. Edwin P. Ewing, Jr. · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mitral_stenosis,_gross_pathology_20G0015_lores.jpg"
  },
  title: "Mitrálna chlopňa",
  match: ["mitráln\\w*\\s+chlopň\\w*", "mitráln\\w*"],
  short: "Chlopňa medzi ľavou predsieňou a komorou; po zápale sa zjazví a zúži (stenóza).",
  body: "<ul><li>Zápal (reumatická horúčka) zjazví cípy a chlopňu zúži.</li><li>Dôsledok: zväčšená ľavá predsieň a pľúcna venostáza.</li></ul>"
},
{
  id: "aorta", et: "gr. <i>aorte</i> „veľká tepna“",
  title: "Aorta",
  match: ["aort\\w*"],
  short: "Hlavná tepna tela, ktorá vedie krv z ľavej komory.",
  body: "<ul><li>Stenu tvorí najmä elastín.</li><li>Najčastejšie choroby: ateroskleróza, aneuryzma, disekcia, aortitída.</li></ul>"
},
{
  id: "aneuryzma", et: "gr. <i>ana</i> „hore“ + <i>eurys</i> „široký“",
  title: "Aneuryzma",
  match: ["aneuryzm\\w*"],
  short: "Vakovité alebo vretenovité rozšírenie steny cievy po jej oslabení, ktoré môže prasknúť.",
  body: "<ul><li>Pravá aneuryzma má všetky vrstvy steny, nepravá nie.</li><li>Príčiny: ateroskleróza, hypertenzia, syfilis, genetické poruchy väziva.</li><li>Komplikácia: prasknutie.</li></ul>"
},
{
  id: "intima", et: "lat. <i>intimus</i> „najvnútornejší“",
  title: "Intima",
  match: ["intim\\w*"],
  short: "Vnútorná vrstva steny cievy: endotel a pod ním riedke väzivo.",
  body: "<ul><li>Tu sa tvoria aterosklerotické pláty.</li><li>Endotel reguluje zrážanie a tonus cievy.</li></ul>"
},
{
  id: "media", et: "lat. <i>medius</i> „stredný“",
  title: "Média",
  match: ["médi(?:a|e|i|ou|u)"],
  short: "Stredná vrstva steny cievy — svalovina.",
  body: "<ul><li>Tvoria ju hladké svalové bunky a elastín.</li><li>Pri hypertenzii sa zhrubne.</li></ul>"
},
{
  id: "adventicia", et: "lat. <i>advenire</i> „prichádzať“",
  title: "Adventícia",
  match: ["adventíci\\w*"],
  short: "Vonkajšia vrstva steny cievy — väzivo.",
  body: "<ul><li>Obsahuje vasa vasorum a nervy.</li><li>Pri vaskulitíde býva zapálená.</li></ul>"
},
{
  id: "vasa-vasorum", et: "lat. „cievy ciev“ (<i>vas, vasa</i> „nádoba, cieva“)",
  title: "Vasa vasorum",
  match: ["vasa\\s+vasorum"],
  short: "Drobné cievky, ktoré vyživujú stenu veľkých ciev (napr. aorty) zvonku. Keď sa zapália, stena sa nezásobí a oslabí."
},
{
  id: "endarteritida", et: "gr. <i>endon</i> + <i>arteria</i> + <i>-itis</i>",
  title: "Endarteritída",
  match: ["endarteritíd\\w*"],
  short: "Zápal vnútornej vrstvy tepny.",
  body: "<ul><li>Zhrubnutie intimy zužuje lúmen.</li><li>Typická pri syfilise, žiarení a Buergerovej chorobe.</li></ul>"
},
{
  id: "obliterativna-endarteritida", et: "lat. <i>obliterare</i> „vymazať“",
  title: "Obliteratívna endarteritída",
  match: ["obliteratívn\\w*\\s+endarteritíd\\w*"],
  short: "Intima sa zhrubne a zúži priesvit tak, že cieva sa takmer uzavrie — dôsledkom je ischémia.",
  body: "<ul><li>Úplný uzáver vedie k ischémii a gangréne.</li><li>Vzniká pri syfilise, žiarení a Buergerovej chorobe.</li></ul>"
},
{
  id: "aortitida",
  title: "Aortitída",
  match: ["aortitíd\\w*"],
  short: "Zápal steny aorty. Syfilitická aortitída oslabí hrudnú aortu a vedie k aneuryzme."
},
{
  id: "glomerulonefritida", et: "lat. <i>glomerulus</i> „klbôčko“ + gr. <i>nephros</i> „oblička“ + <i>-itis</i> „zápal“",
  title: "Glomerulonefritída",
  match: ["glomerulonefritíd\\w*"],
  short: "Zápal glomerulov (cievnych klbiek) obličky. Prejaví sa krvou a bielkovinou v moči, často aj zvýšeným tlakom a zhoršenou funkciou obličiek.",
  body: "<ul><li>Nefritický syndróm: hematúria, hypertenzia, ↓ GFR.</li><li>Mechanizmus: imunokomplexy alebo protilátky proti bazálnej membráne.</li><li>Dôkaz: biopsia (imunofluorescencia, elektrónová mikroskopia).</li></ul>"
},
{
  id: "prinosove-dutiny",
  title: "Prinosové dutiny",
  match: ["prinosov\\w*\\s+dutin\\w*"],
  short: "Vzdušné dutiny v lebke okolo nosa (čelová, čeľusťová, sitová a klinová). Pri zápale sa upchajú a bolia.",
  body: "<ul><li>Sliznica vylučuje hlien, ktorý odvádzajú ústia dutín.</li><li>Zápal je sinusitída.</li></ul>"
},
{
  id: "sliznica",
  title: "Sliznica",
  match: ["sliznic\\w*", "slizničn\\w*"],
  short: "Vlhká vrstva, ktorá vystiela duté orgány (nos, ústa, črevo, dýchacie cesty). Skladá sa z epitelu a väziva pod ním a vylučuje hlien.",
  body: "<ul><li>Skladá sa z epitelu, väziva pod ním a hladkej svaloviny.</li><li>Hlien chráni pred mechanickým a chemickým poškodením.</li></ul>"
},
{
  id: "epiderma", et: "gr. <i>epi</i> + <i>derma</i> „koža“",
  title: "Epiderma",
  match: ["epiderm\\w*"],
  short: "Povrchový dlaždicový epitel kože.",
  body: "<ul><li>Viacvrstvový dlaždicový epitel s rohovatením.</li><li>Bunky bazálnej vrstvy sa posúvajú k povrchu a odlupujú.</li></ul>"
},
{
  id: "dermis",
  title: "Dermis",
  match: ["dermis", "dermisu"],
  short: "Väzivo kože s cievami a nervami pod epidermou.",
  body: "<ul><li>Má papilárnu a retikulárnu vrstvu.</li><li>Obsahuje kolagén, elastín, cievy, nervy, potné a mazové žľazy.</li></ul>"
},
{
  id: "podkozie",
  title: "Podkožie",
  match: ["podkož[ií]\\w*"],
  short: "Tuková vrstva pod dermisom.",
  body: "<ul><li>Tuk izoluje a slúži ako zásoba energie.</li><li>Zápal tuku je panikulitída (napr. erythema nodosum).</li></ul>"
},
{
  id: "hrtan",
  title: "Hrtan",
  match: ["hrtan\\w*"],
  short: "Chrupavkový orgán na krku, ktorý chráni vstup do dýchacích ciest a tvorí hlas (hlasivky). Spútum sa pri vykašliavaní prehĺta a môže infikovať hrtan.",
  body: "<ul><li>Obsahuje hlasivky.</li><li>Zápal môže zúžiť dýchacie cesty (krup).</li></ul>"
},

/* ── tuberkulóza ─────────────────────────────────────────────────────── */
{
  id: "kazeum", et: "lat. <i>caseus</i> „syr“",
  title: "Kazeum",
  match: ["kazeum\\w*", "kazeom", "kazea"],
  img: {
    "src": "assets/images/caseating-granuloma.jpg",
    "alt": "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    "caption": "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  },
  short: "Beztvará, drobivá, sivobiela až žltá hmota v strede tuberkulózneho granulómu.",
  body: "<ul><li>Vzniká zánikom makrofágov a tkaniva pod útokom Th1 imunity.</li><li>Obsahuje veľa lipidov zo steny mykobaktérií, preto vyzerá ako tvaroh.</li></ul>"
},
{
  id: "kazeifikacia", et: "lat. <i>caseus</i> + <i>facere</i> „robiť“",
  title: "Kazeifikácia",
  match: ["kazeifik\\w*", "nekazeifik\\w*"],
  short: "Dej, ktorým tkanivo v granulóme zmení na kazeum.",
  body: "<p class=\"chain\">Th1 odpoveď → aktivované makrofágy zahubia aj okolité tkanivo → zánik bez zachovania štruktúry → kazeum</p>"
},
{
  id: "palisada", et: "franc. <i>palissade</i> „plot z kolov“ (lat. <i>palus</i> „kôl“)",
  img: {
    src: "assets/images/caseating-granuloma.jpg",
    alt: "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    caption: "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  },
  title: "Palisáda",
  match: ["palisád\\w*"],
  short: "Usporiadanie buniek vedľa seba do radu kolmo na okraj, ako plot. Epiteloidné bunky alebo makrofágy tak lemujú ložisko nekrózy."
},
{
  id: "primarna-tbc", et: "lat. <i>primarius</i> „prvý“",
  title: "Primárna tuberkulóza",
  match: ["progresívn\\w*\\s+primárn\\w*\\s+tuberkulóz\\w*", "primárn\\w*\\s+tuberkulóz\\w*"],
  img: {
    "src": "assets/images/ghon-focus.jpg",
    "alt": "Primárne ložisko pri tuberkulóze: kazeózne ložisko pod pohrudnicou (MA).",
    "caption": "Primárne ložisko pri tuberkulóze: kazeózne ložisko pod pohrudnicou (MA).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tuberculosis_-_Sub-pleural_primary_(Ghon)_focus_(6596011395).jpg"
  },
  short: "Tuberkulóza pri prvom stretnutí s mykobaktériou; ložisko je pod pohrudnicou a v hilových uzlinách.",
  body: "<ul><li>Vytvorí sa Ghonov komplex; väčšinou sa zahojí.</li><li>Pri oslabenej imunite môže prejsť do progresívnej formy.</li></ul>"
},
{
  id: "postprimarna-tbc", et: "lat. <i>secundarius</i> „druhotný“",
  title: "Postprimárna (sekundárna) tuberkulóza",
  match: ["postprimárn\\w*(?:\\s+tuberkulóz\\w*)?", "sekundárn\\w*\\s+tuberkulóz\\w*"],
  short: "Tuberkulóza u už senzibilizovaného človeka — reaktiváciou latentného ložiska alebo reinfekciou.",
  body: "<ul><li>Typicky vo vrcholoch pľúc, kde je najviac kyslíka.</li><li>Vzniká kaverna a šírenie cez priedušky.</li></ul>"
},
{
  id: "ghon", et: "podľa Antona Ghona",
  title: "Ghonovo ložisko",
  match: ["Ghonov\\w*\\s+ložisk\\w*", "Ghonov\\w*"],
  img: {
    "src": "assets/images/ghon-focus.jpg",
    "alt": "Ghonovo ložisko: ohraničené žltobiele kazeózne ložisko pod pohrudnicou (MA).",
    "caption": "Ghonovo ložisko: ohraničené žltobiele kazeózne ložisko pod pohrudnicou (MA).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tuberculosis_-_Sub-pleural_primary_(Ghon)_focus_(6596011395).jpg"
  },
  short: "Kazeózne ložisko v pľúcach pod pohrudnicou — miesto prvého uchytenia mykobaktérií.",
  body: "<ul><li>Vzniká pri prvom kontakte, keď makrofágy mykobaktérie pohltia, no nezničia.</li><li>Centrum kazeifikuje, okolo je granulóm.</li></ul>"
},
{
  id: "ghon-komplex",
  title: "Ghonov komplex",
  match: ["Ghonov\\w*\\s+komplex\\w*", "Ghonov\\w*\\s+\\(primárn\\w*\\)\\s+komplex\\w*"],
  short: "Ghonovo ložisko + zápal lymfatických ciev + zväčšené kazeózne zmenené uzliny.",
  body: "<ul><li>Mykobaktérie putujú lymfou do hilovej uzliny.</li><li>Väčšina komplexov sa zahojí jazvou a kalcifikuje.</li></ul>"
},
{
  id: "ranke",
  title: "Rankeho komplex",
  match: ["Rankeh\\w*\\s+komplex\\w*"],
  short: "Zahojený a kalcifikovaný Ghonov komplex.",
  body: "<ul><li>Dôkaz prekonanej infekcie.</li><li>Mykobaktérie v ňom môžu prežívať a po poklese imunity sa reaktivovať.</li></ul>"
},
{
  id: "latentna-tbc", et: "lat. <i>latere</i> „skrývať sa“",
  img: {
    src: "assets/images/ranke-complex.jpg",
    alt: "Rankeho komplex: zahojené a kalcifikované ložiská.",
    caption: "Rankeho komplex: zahojené a kalcifikované ložiská.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculosis_-_Ranke_complex_(13449099823).jpg"
  },
  title: "Latentná tuberkulóza (latentná infekcia)",
  match: ["latentn\\w*\\s+tuberkulóz\\w*", "latentn\\w*\\s+infekci\\w*", "latenci\\w*", "latentn\\w*"],
  short: "Stav, keď človek nesie živé mykobaktérie v zjazvených ložiskách, no nie je chorý ani infekčný. Pozitívny je tuberkulínový test alebo IGRA. U 5–10 % ľudí sa choroba počas života reaktivuje."
},
{
  id: "reaktivacia", et: "lat. <i>re-</i> + <i>activus</i>",
  title: "Reaktivácia",
  match: ["reaktiváci\\w*"],
  short: "Opätovné ožitie latentných mikróbov v tele (napr. pri poklese imunity)."
},
{
  id: "reinfekcia", et: "lat. <i>re-</i> + <i>inficere</i>",
  title: "Reinfekcia",
  match: ["reinfekci\\w*"],
  short: "Nová nákaza zvonku u človeka, ktorý už infekciu prekonal."
},
{
  id: "kaverna", et: "lat. <i>caverna</i> „dutina, jaskyňa“ (<i>cavus</i> „dutý“)",
  img: {
    src: "assets/images/tb-cavity.jpg",
    alt: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    caption: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Cavitary_tuberculosis_(6572341159).jpg"
  },
  title: "Kaverna",
  match: ["kavern\\w*"],
  short: "Dutina v pľúcach po prevalení skvapalneného kazea do priedušky. Je prevzdušnená, preto sa v nej mykobaktérie rýchlo množia; chorý vykašliava baktérie do okolia.",
  body:
    '<p class="chain">kazeózne ložisko → skvapalnenie kazea → prevalenie do <b>priedušky</b> → vzduch v dutine → množenie baktérií → ďalšia nekróza ⟳</p>'
},
{
  id: "mykolove-kyseliny", et: "gr. <i>mykes</i> „huba“ (mykobaktérie rastú v kultúre ako plesňový povlak)",
  img: {
    src: "assets/images/ziehl-neelsen.jpg",
    alt: "Ziehlovo–Neelsenovo farbenie: acidorezistentné tyčinky sú červené.",
    caption: "Ziehlovo–Neelsenovo farbenie: acidorezistentné tyčinky sú červené.",
    credit: "CDC / George P. Kubica · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg"
  },
  title: "Mykolové kyseliny",
  match: ["mykolov\\w*\\s+kyselin\\w*"],
  short: "Veľmi dlhé mastné kyseliny v stene mykobaktérií. Tvoria voskový obal, ktorý chráni pred kyselinami, lyzozómovými enzýmami aj liekmi a zachytáva farbivo pri Ziehlovom–Neelsenovom farbení."
},
{
  id: "orthove-bunky",
  title: "Orthove bunky",
  match: ["Orthov\\w*\\s+bun\\w*"],
  short: "Voľné makrofágy plné mykobaktérií, ktoré plávajú v serofibrinóznom výpotku pri exsudatívnej (oslabená imunita) tuberkulóze namiesto vytvorenia granulómov."
},
{
  id: "kochov-fenomen",
  title: "Kochov fenomén",
  match: ["Kochov\\w*\\s+fenomén\\w*"],
  short: "Prudká, nekrotizujúca reakcia už senzibilizovaného organizmu na mykobaktérie alebo ich antigény. Vysvetľuje, prečo pri postprimárnej tuberkulóze nekróza rýchlo mení kazeum na kavernu.",
  body:
    '<p class="chain">organizmus už pozná antigén (pamäťové <b>Th1</b>) → znovu sa stretne s mykobaktériami → rýchla a silná odpoveď (<b>IFN-γ</b>, <b>TNF</b>) → aktivované makrofágy a cytotoxické lymfocyty ničia aj okolité tkanivo → <b>kazeózna nekróza</b> → skvapalnenie → prevalenie do priedušky → <b>kaverna</b></p>' +
    '<p class="why"><b>Prečo to tak je.</b> Imunita tu nie je len ochrana: tá istá odpoveď, ktorá ložisko ohraničí, ho pri veľkom množstve antigénu aj poškodzuje (precitlivenosť IV. typu). Koch to pozoroval u morčiat – už nakazené zvieratá odpovedali na novú dávku baktérií rýchlou nekrózou v mieste vpichu, ktorá ložisko ohraničila, kým zdravé reagovali pomaly a baktérie sa šírili.</p>' +
    '<p class="why"><b>Kde ho nájdeš.</b> Pri postprimárnej tuberkulóze (reaktivácia alebo reinfekcia): ložisko sa dobre ohraničí, ale nekróza je rozsiahla a mení sa na kavernu.</p>'
},
{
  id: "arozivne-krvacanie", et: "lat. <i>arrodere</i> „obhlodať, rozožrať“ (<i>rodere</i> „hlodať“)",
  img: {
    src: "assets/images/tb-cavity.jpg",
    alt: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    caption: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Cavitary_tuberculosis_(6572341159).jpg"
  },
  title: "Arozívne krvácanie",
  match: ["arozívn\\w*"],
  short: "Krvácanie z cievy, ktorú rozleptal zápal alebo nádor (napr. tepna v stene kaverny). Môže byť rýchle a smrteľné."
},
{
  id: "pneumotorax", et: "gr. <i>pneuma</i> „vzduch, dych“ + <i>thorax</i> „hrudník“",
  title: "Pneumotorax",
  match: ["pneumotorax\\w*"],
  short: "Vzduch v pleurálnej dutine, ktorý stlačí pľúca a znemožní ich roztiahnutie. Vznikne napr. prevalením kaverny alebo prasknutím pľúcneho pľuzgiera.",
  body: "<ul><li>Typy: spontánny, traumatický, tenzný.</li><li>Tenzný pneumotorax posúva mediastinum a ohrozuje život.</li></ul>"
},
{
  id: "aspergilom", et: "lat. <i>aspergillum</i> „kropidlo“ (<i>aspergere</i> „pokropiť“) + gr. <i>-oma</i>",
  img: {
    src: "assets/images/aspergilloma-tb.jpg",
    alt: "Aspergilóm – kolónia plesne vo vyčistenej tuberkulóznej kaverne (MA).",
    caption: "Aspergilóm – kolónia plesne vo vyčistenej tuberkulóznej kaverne (MA).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Aspergilloma_complicating_tuberculosis_2.jpg"
  },
  title: "Aspergilóm",
  match: ["aspergilóm\\w*", "aspergil\\w*"],
  short: "Guľa z vlákien plesne <i>Aspergillus</i> v starej pľúcnej dutine (kaverna po tuberkulóze). Môže krvácať a vyvolať hemoptýzu."
},
{
  id: "miliarna-tbc", et: "lat. <i>milium</i> „proso“ (<i>miliaris</i> „prosovitý“)",
  img: {
    src: "assets/images/miliary-tb-kidney.jpg",
    alt: "Miliárna tuberkulóza obličky – drobné uzlíky v kôre (MA).",
    caption: "Miliárna tuberkulóza obličky – drobné uzlíky v kôre (MA).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Miliary_tuberculosis_involving_kidney_(6539942623).jpg"
  },
  title: "Miliárna tuberkulóza",
  match: ["miliárn\\w*"],
  short: "Rozsiate drobné (1–2 mm) sivobiele ložiská ako prosové zrnká (lat. milium = proso) v mnohých orgánoch po prielome kazeózneho ložiska do cievy. Najzávažnejšia forma; typicky postihne pľúca, pečeň, slezinu, obličky a mozgové obaly."
},
{
  id: "mykobakteremia", et: "gr. <i>mykes</i> „huba“ + <i>bakterion</i> „paličká“ + <i>haima</i> „krv“",
  img: {
    src: "assets/images/miliary-tb-cxr.jpg",
    alt: "Rozsev mykobaktérií krvou – miliárna tuberkulóza na RTG hrudníka.",
    caption: "Rozsev mykobaktérií krvou – miliárna tuberkulóza na RTG hrudníka.",
    credit: "B. Herreros, I. Plaza, R. García et al. · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_miliary_tuberculosis_1.jpg"
  },
  title: "Mykobakterémia",
  match: ["mykobakterémi\\w*", "hematogénn\\w*"],
  short: "Prítomnosť mykobaktérií v krvi, najčastejšie po prielome kazeózneho ložiska do steny žily. Hematogénne šírenie je jednou z ciest rozsevu ložísk po tele."
},
{
  id: "skrofuloza", et: "lat. <i>scrofula</i> „prasiatko“ (<i>scrofa</i> „prasnica“) + gr. <i>-osis</i>",
  img: {
    src: "assets/images/scrofula.jpg",
    alt: "Skrofulóza – tuberkulózna lymfadenitída na krku (historická fotografia, 1893).",
    caption: "Skrofulóza – tuberkulózna lymfadenitída na krku (historická fotografia, 1893).",
    credit: "Bramwell B., Atlas of Clinical Medicine, 1893 · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Scrofula.jpeg"
  },
  title: "Skrofulóza",
  match: ["skrofulóz\\w*"],
  short: "Tuberkulóza lymfatických uzlín na krku: uzliny splývajú a môžu sa prevaliť cez kožu so zanechaním hnisajúcich píšťal."
},
{
  id: "meningitida", et: "gr. <i>meninx, meningos</i> „blana“ + <i>-itis</i> „zápal“",
  title: "Meningitída",
  match: ["meningitíd\\w*"],
  img: {
    "src": "assets/images/tb-meningitis.jpg",
    "alt": "Tuberkulózna meningitída: mäkké obaly pri báze mozgu sú zhrubnuté zápalovým exsudátom (MA).",
    "caption": "Tuberkulózna meningitída: mäkké obaly pri báze mozgu sú zhrubnuté zápalovým exsudátom (MA).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tuberculous_leptomeningitis.jpg"
  },
  short: "Zápal mozgových obalov. Prejaví sa horúčkou, bolesťou hlavy a stuhnutým krkom; pri tuberkulóze postihuje najmä spodinu mozgu (bazilárna meningitída).",
  body: "<ul><li>Bakteriálna je hnisavá, vírusová lymfocytárna.</li><li>Pri tuberkulóze postihuje spodinu mozgu a môže vyvolať hydrocefalus.</li></ul>"
},
{
  id: "pleuritida",
  title: "Pleuritída (zápal pohrudnice)",
  match: ["pleuritíd\\w*"],
  short: "Zápal pohrudnice, často s výpotkom. Býva bolestivý pri dýchaní a pri kašli.",
  body: "<ul><li>Suchá (fibrinózna) a vlhká (s výpotkom).</li><li>Pri tuberkulóze býva výpotok serofibrinózny.</li></ul>"
},
{
  id: "pneumonia",
  title: "Pneumónia (zápal pľúc)",
  match: ["pneumóni\\w*", "pneumón\\w*", "bronchopneumóni\\w*"],
  img: {
    "src": "assets/images/lung-abscess-gross.jpg",
    "alt": "Komplikácia pneumónie: pľúcny absces.",
    "caption": "Komplikácia pneumónie: pľúcny absces.",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Lung_abscess_(7468374496).jpg"
  },
  short: "Zápal pľúcneho parenchýmu, spravidla infekčný. Podľa pôvodcu a rozsahu ide o lobárnu, bronchopneumóniu alebo (pri tuberkulóze) kazeóznu pneumóniu.",
  body: "<ul><li>Lobárna postihne celý lalok, bronchopneumónia ložiskovo okolo prieduškov.</li><li>Intersticiálna (napr. vírusová) je v interstíciu.</li></ul>"
},
{
  id: "subfebrilie", et: "lat. <i>sub</i> + <i>febris</i> „horúčka“",
  title: "Subfebrílie",
  match: ["subfebríli\\w*"],
  short: "Dlhodobo mierne zvýšené teploty (zhruba 37–38 °C).",
  body: "<ul><li>Spolu s nočným potením, chudnutím a kašľom sú typickým „obrazom“ chronickej infekcie, ako je tuberkulóza.</li></ul>"
},
{
  id: "nocne-potenie",
  title: "Nočné potenie",
  match: ["nočn\\w*\\s+poten\\w*"],
  short: "Silné potenie v noci, často pri chronickej infekcii alebo nádore."
},
{
  id: "ftiza", et: "gr. <i>phthisis</i> „chradnutie, úbytok“ (<i>phthinein</i> „chradnúť“)",
  img: {
    src: "assets/images/tb-cavity.jpg",
    alt: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    caption: "Kavernózna tuberkulóza: dutiny s kazeóznou nekrózou v hornom laloku pľúc.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Cavitary_tuberculosis_(6572341159).jpg"
  },
  title: "Ftíza",
  match: ["ftíz\\w*"],
  short: "Starý názov pre tuberkulózu pľúc (z gréckeho „úbytok“, „chradnutie“), odvodený od typického chudnutia chorého."
},
{
  id: "sputum", et: "lat. <i>sputum</i> „vyplutá vec“ (<i>spuere</i> „pľuť“)",
  title: "Spútum",
  match: ["spút\\w*"],
  short: "Hlien vykašliavaný z dolných dýchacích ciest. Používa sa na dôkaz mikróbov (mikroskopia, kultivácia, PCR).",
  body: "<ul><li>Kvalitná vzorka je hnisavá, nie len slina.</li><li>Na dôkaz tuberkulózy sa odoberá viac ranných vzoriek.</li></ul>"
},
{
  id: "nater-ster",
  title: "Náter (stery) na mikroskopiu",
  match: ["náter\\w*", "ster(?:e|y|u|om)"],
  img: {
    "src": "assets/images/ziehl-neelsen.jpg",
    "alt": "Ziehlovo–Neelsenovo farbenie: acidorezistentné tyčinky sú červené.",
    "caption": "Ziehlovo–Neelsenovo farbenie: acidorezistentné tyčinky sú červené.",
    "credit": "CDC / George P. Kubica · Public domain",
    "href": "https://commons.wikimedia.org/wiki/File:Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg"
  },
  short: "Tenká vrstva vzorky (hlien, hnis, škrab z kože) rozotretá na podložné sklíčko a nafarbená. Slúži na rýchly dôkaz mikróbov pod mikroskopom.",
  body: "<ul><li>Farbí sa podľa Grama, Ziehla a Neelsena alebo Giemsu.</li><li>Je rýchly, ale menej citlivý než kultivácia.</li></ul>"
},
{
  id: "acinozno-nodozna-tbc", et: "lat. <i>acinus</i> „bobuľa, zrnko hrozna“; <i>nodus</i> „uzol“",
  title: "Acinózno-nodózna tuberkulóza",
  match: ["acinózno-nodózn\\w*(?:\\s+tuberkulóz\\w*)?"],
  short: "Rozsev drobných uzlíkov v pľúcach po vdýchnutí kazea z kaverny do iných lalokov. Každý uzlík zodpovedá jednému acinu (koncovej funkčnej jednotke pľúc)."
},
{
  id: "acinus", et: "lat. <i>acinus</i> „bobuľa, zrnko hrozna“",
  title: "Acinus (pľúcny)",
  match: ["acin\\w*"],
  short: "Koncová funkčná jednotka pľúc: oblasť zásobená jednou terminálnou bronchiolou s alveolárnymi chodbami a alveolami."
},

/* ── lepra a príbuzné ────────────────────────────────────────────────── */
{
  id: "lepra", et: "gr. <i>lepra</i> „šupinatá vyrážka“ (<i>lepis</i> „šupina“)",
  title: "Lepra (Hansenova choroba)",
  match: ["lepr\\w*", "leprov\\w*", "Hansenov\\w*"],
  img: {
    "src": "assets/images/leprosy-skin-lesions.jpg",
    "alt": "Multibacilárna lepra – plošné kožné ložiská na chrbte a boku.",
    "caption": "Multibacilárna lepra – plošné kožné ložiská na chrbte a boku.",
    "credit": "CDC · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Multibacillary_leprosy_lesion.jpg"
  },
  short: "Chronická infekcia <i>Mycobacterium leprae</i>, ktorá napáda kožu a periférne nervy v chladnejších častiach tela. Podľa imunity chorého má dve protikladné formy: tuberkuloidnú a lepromatóznu.",
  body: "<ul><li>Inkubácia je dlhá (roky).</li><li>Napáda chladnejšie časti tela: koža, nos, periférne nervy.</li><li>Liečba je kombinácia dapsónu, rifampicínu a klofazimínu.</li></ul>"
},
{
  id: "tuberkuloidna-lepra", et: "lat. <i>tuberculum</i> „hrbolček“ + gr. <i>-eides</i> „podobný“",
  title: "Tuberkuloidná lepra",
  match: ["tuberkuloidn\\w*(?:\\s+lepr\\w*)?"],
  img: {
    "src": "assets/images/leprosy-tt-histology.jpg",
    "alt": "Tuberkuloidná lepra: granulóm z epiteloidných buniek s Langhansovými bunkami a lymfocytmi (H&E).",
    "caption": "Tuberkuloidná lepra: granulóm z epiteloidných buniek s Langhansovými bunkami a lymfocytmi (H&E).",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Leprosy_-_Tuberculoid_(TT)_-_2.jpg"
  },
  short: "Forma lepry pri silnej Th1 odpovedi: granulómy pozdĺž kožných nervov, málo baktérií, ohraničené necitlivé svetlé škvrny. Nízko infekčná.",
  body: "<ul><li>Granulómy s epiteloidnými bunkami a Langhansovými obrovskými bunkami.</li><li>Baktérie nájdeme len ojedinele.</li><li>Postihnutie nervov vedie k strate citlivosti v ložiskách.</li></ul>"
},
{
  id: "lepromatozna-lepra",
  title: "Lepromatózna lepra",
  match: ["lepromatózn\\w*(?:\\s+lepr\\w*)?"],
  img: {
    "src": "assets/images/leprosy-ll-histology.jpg",
    "alt": "Lepromatózna lepra: infiltrát z penových histiocytov takmer bez lymfocytov (H&E).",
    "caption": "Lepromatózna lepra: infiltrát z penových histiocytov takmer bez lymfocytov (H&E).",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Leprosy_-_Lepromatous_(LL)_40x.jpg"
  },
  short: "Forma lepry pri slabej Th1 odpovedi: v koži penové makrofágy plné baktérií, uzly a zhrubnutie tváre, šírenie do nosa, očí, semenníkov. Vysoko infekčná.",
  body: "<ul><li>V koži sú penové makrofágy (Virchowove bunky) plné baktérií.</li><li>V stere je množstvo kyselinovzdorných tyčiniek.</li><li>Nervy sa postihujú symetricky a neskôr.</li></ul>"
},
{
  id: "virchow-lepra",
  title: "Virchowove leprové bunky",
  match: ["Virchowov\\w*\\s+leprov\\w*\\s+bun\\w*"],
  img: {
    "src": "assets/images/leprosy-ll-histology.jpg",
    "alt": "Virchowove leprové bunky – penové histiocyty plné baktérií (H&E).",
    "caption": "Virchowove leprové bunky – penové histiocyty plné baktérií (H&E).",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Leprosy_-_Lepromatous_(LL)_40x.jpg"
  },
  short: "Penové makrofágy v koži, nabité <i>M. leprae</i>, ktoré vypĺňajú dermis pri lepromatóznej lepre. Pod epidermou ostáva úzky pruh nepostihnutej kože.",
  body: "<ul><li>Pod epidermou ostáva úzky pruh nepostihnutej kože.</li><li>Baktérie ležia v zhlukoch, ktoré pripomínajú zväzky cigár.</li></ul>"
},
{
  id: "schwannova-bunka",
  title: "Schwannova bunka",
  match: ["Schwannov\\w*"],
  short: "Bunka, ktorá obaľuje nervové vlákna periférnych nervov myelínom. Baktéria lepry v nej žije, a tak ničí nerv.",
  body: "<ul><li>Jedna Schwannova bunka tvorí myelín jedného úseku axónu.</li><li>Jej poškodenie vedie k demyelinizácii a zlyhaniu vedenia.</li></ul>"
},
{
  id: "mutilacia", et: "lat. <i>mutilare</i> „zmrzačiť“",
  title: "Mutilácia",
  match: ["mutiláci\\w*"],
  short: "Zmrzačenie častí tela — pri lepre prstov, ktoré sa po opakovaných poraneniach necitlivej kože skracujú.",
  body: "<ul><li>Necitlivosť spôsobí opakované drobné úrazy a popáleniny, infekciu a zánik kosti.</li><li>Prsty ničí strata citlivosti, nie baktéria priamo.</li></ul>"
},
{
  id: "leprominovy-test",
  title: "Lepromínový test",
  match: ["lepromínov\\w*\\s+test\\w*"],
  short: "Vpichnutie usmrtených lepra baktérií do kože s odčítaním po 3 týždňoch. Ukazuje bunkovú imunitu: pri tuberkuloidnej lepre vznikne uzlík, pri lepromatóznej nie. Na diagnózu nie je určený."
},
{
  id: "paucibacilarna-lepra", et: "lat. <i>paucus</i> „málo“ + <i>bacillum</i> „paličká“",
  title: "Paucibacilárna lepra",
  match: ["paucibacilárn\\w*(?:\\s+lepr\\w*)?"],
  short: "Praktické delenie podľa WHO: 1–5 kožných ložísk, bez baktérií v stere.",
  body: "<ul><li>Liečba trvá 6 mesiacov.</li><li>Zodpovedá prevažne tuberkuloidným formám.</li></ul>"
},
{
  id: "multibacilarna-lepra", et: "lat. <i>multus</i> „mnoho“ + <i>bacillum</i>",
  title: "Multibacilárna lepra",
  match: ["multibacilárn\\w*(?:\\s+lepr\\w*)?"],
  short: "Viac ložísk, postihnutie nervov alebo baktérie v stere.",
  body: "<ul><li>Liečba trvá 12 mesiacov.</li><li>Zodpovedá lepromatóznym a hraničným formám.</li></ul>"
},
{
  id: "penove-makrofagy",
  title: "Penové makrofágy",
  match: ["penov\\w*\\s+makrofág\\w*", "penov\\w*\\s+bun\\w*"],
  img: {
    "src": "assets/images/leprosy-ll-histology.jpg",
    "alt": "Penové makrofágy: plachty histiocytov s penovitou cytoplazmou pri lepromatóznej lepre (H&E).",
    "caption": "Penové makrofágy: plachty histiocytov s penovitou cytoplazmou pri lepromatóznej lepre (H&E).",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Leprosy_-_Lepromatous_(LL)_40x.jpg"
  },
  short: "Makrofágy s bledou, jemne penovitou cytoplazmou, ktorá je plná pohltených lipidov alebo baktérií. Nachádzajú sa v xantómoch, pri lepromatóznej lepre aj v ateroskleróze.",
  body: "<ul><li>Penový vzhľad vzniká, keď sa lipidy pri spracovaní z cytoplazmy vyplavia.</li><li>Pri ateroskleróze vznikajú pohltením oxidovaného LDL.</li></ul>"
},
{
  id: "xantom", et: "gr. <i>xanthos</i> „žltý“ + <i>-oma</i>",
  img: {
    src: "assets/images/xanthoma-histology.jpg",
    alt: "Xantóm: makrofágy s penovitou cytoplazmou plnou cholesterolu (H&E).",
    caption: "Xantóm: makrofágy s penovitou cytoplazmou plnou cholesterolu (H&E).",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Xanthoma_100X.jpg"
  },
  title: "Xantóm",
  match: ["xantóm\\w*"],
  short: "Ložisko penových makrofágov s cholesterolom, často žltkasté.",
  body: "<ul><li>Eruptívne xantómy sa objavia pri vysokých triacylglyceroloch, xantelazmy sú na viečkach.</li><li>Nález upozorní na dyslipidémiu.</li></ul><ul><li>Vzniká pri vysokom cholesterole v krvi alebo ako reakcia na uvoľnený tuk.</li></ul>"
},
{
  id: "xantogranulom",
  title: "Xantogranulóm",
  match: ["xantogranulóm\\w*"],
  short: "Zápalové ložisko s penovými makrofágmi, obrovskými bunkami a lymfocytmi, vzniknuté reakciou na uvoľnený tuk alebo žlč."
},
{
  id: "atypicke-mykobakterie", et: "gr. <i>a-</i> „ne-“ + <i>typos</i> „vzor, odtlačok“; <i>mykes</i> „huba“ + <i>bakterion</i> „paličká“",
  img: {
    src: "assets/images/mac-lymph-node-afb.jpg",
    alt: "Mycobacterium avium komplex v uzline pri AIDS: acidorezistentné tyčinky v histiocytoch (Ziehl–Neelsen).",
    caption: "Mycobacterium avium komplex v uzline pri AIDS: acidorezistentné tyčinky v histiocytoch (Ziehl–Neelsen).",
    credit: "CDC / Dr. Edwin P. Ewing, Jr. · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mycobacterium_avium-intracellulare.jpg"
  },
  title: "Atypické mykobaktérie (<i>M. avium</i>)",
  match: ["atypick\\w*\\s+mykobaktéri\\w*", "avium\\s+komplex\\w*", "M\\.\\s*avium"],
  short: "Mykobaktérie iné než <i>M. tuberculosis</i> a <i>M. leprae</i>, bežne žijúce vo vode a pôde. Zdravého človeka nechajú, no pri oslabenej imunite (AIDS s nízkym CD4) vyvolajú rozsiahle infekcie s makrofágmi plnými baktérií."
},
{
  id: "hiv", et: "angl. <i>human immunodeficiency virus</i>",
  title: "HIV",
  match: ["HIV"],
  short: "Vírus, ktorý ničí CD4⁺ lymfocyty.",
  body: "<ul><li>Prenos: krv, pohlavný styk, z matky na dieťa.</li><li>Vírus vstupuje do buniek cez CD4 a koreceptor.</li><li>Vedie k oportúnnym infekciám a nádorom (Kaposiho sarkóm, lymfómy).</li></ul>"
},
{
  id: "aids", et: "angl. <i>acquired immunodeficiency syndrome</i>",
  title: "AIDS",
  match: ["AIDS"],
  short: "Pokročilé štádium HIV s hlbokou poruchou imunity (CD4⁺ < 200/µl), v ktorom prepuknú infekcie a nádory, ktoré zdravá imunita zvláda.",
  body: "<ul><li>Typické infekcie: pneumocystová pneumónia, kryptokokóza, toxoplazmóza, atypické mykobaktérie.</li><li>Typické nádory: Kaposiho sarkóm a lymfómy.</li></ul>"
},
{
  id: "rinosklerom", et: "gr. <i>rhis</i> + <i>skleroma</i>",
  title: "Rinosklerom",
  match: ["rinoskler\\w*"],
  img: {
    "src": "assets/images/rhinoscleroma.jpg",
    "alt": "Rinosklerom: penovité Mikuliczove bunky a plazmocyty (H&E).",
    "caption": "Rinosklerom: penovité Mikuliczove bunky a plazmocyty (H&E).",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Rhinoscleroma_-_very_high_mag.jpg"
  },
  short: "Chronický zápal nosa a horných dýchacích ciest, ktorý vyvoláva Klebsiella rhinoscleromatis.",
  body: "<ul><li>Tri štádiá: katarálne, granulomatózne, sklerotické.</li><li>Jazva zúži nosové a dýchacie cesty.</li></ul>"
},
{
  id: "mikuliczove-bunky", et: "podľa Jana Mikulicza",
  title: "Mikuliczove bunky",
  match: ["Mikuliczov\\w*(?:\\s+bun\\w*)?"],
  short: "Veľké penové makrofágy s baktériami v rinosklerome.",
  body: "<ul><li>Baktérie sú v nich dobre vidieť pri striebrení a PAS.</li><li>Okolo nich sú plazmocyty a Russellove telieska.</li></ul>"
},
{
  id: "whipple",
  img: {
    src: "assets/images/whipple-pas.jpg",
    alt: "Whippleova choroba: makrofágy v klku plné PAS-pozitívneho materiálu.",
    caption: "Whippleova choroba: makrofágy v klku plné PAS-pozitívneho materiálu.",
    credit: "Ed Uthman · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Whipples_Disease,_PAS_(6881958781).jpg"
  },
  title: "Whippleova choroba",
  match: ["Whippleov\\w*(?:\\s+choro\\w*)?"],
  short: "Zriedkavá infekcia <i>Tropheryma whipplei</i>. Makrofágy v slizničnom väzive tenkého čreva sa plnia baktériami (PAS-pozitívne), blokujú vstrebávanie a odvod lymfy; chorý chudne, má hnačky a bolesti kĺbov."
},

/* ── cudzie teleso a kryštály ────────────────────────────────────────── */
{
  id: "mastenec", et: "arab. <i>talq</i> (cez franc. <i>talc</i>)",
  title: "Mastenec (talk)",
  match: ["mastenc\\w*", "mastenec"],
  short: "Minerál, ktorý sa používa ako plnivo (napr. v práškoch a tabletách). Po vstreknutí alebo vdýchnutí je pre makrofágy nestráviteľný a vyvolá granulóm z cudzích telies."
},
{
  id: "keratin", et: "gr. <i>keras, keratos</i> „roh“",
  img: {
    src: "assets/images/keratin-granuloma.jpg",
    alt: "Granulóm z keratínu: obrovské bunky z cudzích telies okolo keratínových lamiel (H&E).",
    caption: "Granulóm z keratínu: obrovské bunky z cudzích telies okolo keratínových lamiel (H&E).",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Foreign_body_granuloma_2.jpg"
  },
  title: "Keratín",
  match: ["keratín\\w*", "zrohovaten\\w*", "keratinizác\\w*"],
  short: "Pevná bielkovina rohovej vrstvy kože, vlasov a nechtov. Ak sa dostane do tkaniva (prasknutá epidermová cysta), je nestráviteľný a vyvolá reakciu na cudzie teleso."
},
{
  id: "tofus", et: "lat. <i>tofus</i> „pórovitý kameň, tuf“",
  title: "Tofus (dna)",
  match: ["tof(?:us|u|y|e|om|ov)\\w*"],
  img: {
    "src": "assets/images/gout-tophus-histology.jpg",
    "alt": "Dnavý tofus: svetlé amorfné ložiská po urátoch s okolitým zápalom (H&E).",
    "caption": "Dnavý tofus: svetlé amorfné ložiská po urátoch s okolitým zápalom (H&E).",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Gouty_tophus_-_low_mag.jpg"
  },
  short: "Uzol z kryštálov kyseliny močovej v tkanive pri dne. Kryštály vyvolajú zápal s obrovskými bunkami z cudzích telies. Formalín kryštály rozpustí, preto sa vzorka fixuje v alkohole."
},
{
  id: "kyselina-mocova",
  title: "Kyselina močová",
  match: ["kyselin\\w*\\s+močov\\w*"],
  img: {
    "src": "assets/images/urate-crystals-polarized.jpg",
    "alt": "Ihlicovité kryštály urátu v polarizovanom svetle.",
    "caption": "Ihlicovité kryštály urátu v polarizovanom svetle.",
    "credit": "Ed Uthman · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Monosodium_Urate_Crystals_in_Tophaceous_Gout_(4306256393).jpg"
  },
  short: "Konečný produkt rozkladu purínov. Pri nadbytku sa v krvi vyzráža na ihlicovité kryštály, ktoré sa ukladajú do kĺbov (dna) a obličiek (kamene).",
  body: "<ul><li>Purín → xantín → kyselina močová (enzým xantínoxidáza).</li><li>Hyperurikémia vzniká nadprodukciou alebo zníženým vylučovaním obličkami.</li></ul>"
},
{
  id: "pilonidalny-sinus", et: "lat. <i>pilus</i> „vlas“ + <i>nidus</i> „hniezdo“; <i>sinus</i> „záhyb, zátoka“",
  img: {
    src: "assets/images/pilonidal-hair.jpg",
    alt: "Pilonidálny sínus s vlasom (H&E); šípka ukazuje úlomok vlasu.",
    caption: "Pilonidálny sínus s vlasom (H&E); šípka ukazuje úlomok vlasu.",
    credit: "Atlas of Medical Foreign Bodies · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Hair_in_a_pilonidal_sinus_(51567239455).jpg"
  },
  title: "Pilonidálny sínus",
  match: ["pilonidáln\\w*\\s+sínus\\w*"],
  short: "Slepý kanálik v koži medzi sedacími svalmi, do ktorého vrastú vlasy. Sú pre telo cudzie teleso, a preto vyvolajú granulóm a opakované hnisanie."
},
{
  id: "fixacia", et: "lat. <i>fixare</i> „upevniť“",
  title: "Fixácia tkaniva",
  match: ["fixáci\\w*", "fixovan\\w*"],
  img: {
    "src": "assets/images/fixed-colon-adenoma-gross.jpg",
    "alt": "Resekát čreva po jednonočnej fixácii vo formole, rozopnutý a pripravený na odber vzoriek.",
    "caption": "Resekát čreva po jednonočnej fixácii vo formole, rozopnutý a pripravený na odber vzoriek.",
    "credit": "Ed Uthman · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Villous_Adenoma_of_the_Sigmoid_Colon.jpg"
  },
  short: "Chemické zakonzervovanie vzorky, aby tkanivo nehnilo a zachovalo štruktúru.",
  body: "<ul><li>Najčastejšie 4% formalín (neutrálne pufrovaný).</li><li>Dôležitý je pomer tekutiny k tkanivu a čas fixácie.</li></ul><ul><li>Niektoré látky (napr. kryštály kyseliny močovej) sa pri tom rozpustia.</li></ul>"
},
{
  id: "formalin", et: "lat. <i>formica</i> „mravec“",
  title: "Formalín",
  match: ["formalín\\w*"],
  short: "Najčastejšie fixatívum — 4% roztok formaldehydu.",
  body: "<ul><li>Zosieťuje bielkoviny, preto tkanivo stuhne a nehnije.</li><li>Zachová štruktúru, ale môže zakryť epitopy — pri imunohistochémii sa robí „odmaskovanie“.</li></ul>"
},
{
  id: "cysta", et: "gr. <i>kystis</i> „mechúr, vačok“",
  title: "Cysta",
  match: ["cyst(?:a|y|e|u|ou|ám|ách|ami)", "cystick\\w*"],
  short: "Dutina s vlastnou epitelovou stenou a tekutým alebo kašovitým obsahom. Pseudocysta nemá epitelovú výstelku.",
  body: "<ul><li>Pravá cysta má epitelovú výstelku, pseudocysta nie.</li><li>Vznik: zadržanie sekrétu, vrodená porucha, parazit, nádor.</li></ul>"
},
{
  id: "pistala", et: "lat. <i>fistula</i> „rúrka, píšťala“",
  title: "Píšťala (fistula)",
  match: ["píšťal\\w*", "fistul\\w*"],
  short: "Chodba medzi dvoma dutinami alebo medzi dutinou a povrchom tela, ktorá vznikla zápalom (pri aktinomykóze, Crohnovej chorobe, tuberkulóze). Hnis alebo obsah ňou odteká."
},
{
  id: "puzdro",
  title: "Väzivové puzdro",
  match: ["väzivov\\w*\\s+puzdr\\w*", "puzdr\\w*"],
  short: "Vrstva väziva, ktorou telo ohraničí ložisko, ktoré nevie odstrániť (granulóm, absces, cudzie teleso). Tvoria ho fibroblasty a kolagén."
},

/* ── hnisavé granulómy ───────────────────────────────────────────────── */
{
  id: "hnisavy-granulom",
  img: {
    src: "assets/images/cat-scratch-histology.jpg",
    alt: "Hnisavý granulóm v uzline: neutrofily, hviezdicovité mikroabscesy a granulómy (H&E).",
    caption: "Hnisavý granulóm v uzline: neutrofily, hviezdicovité mikroabscesy a granulómy (H&E).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Cat_scratch_disease_-_very_high_mag.jpg"
  },
  title: "Hnisavý (abscedujúci) granulóm",
  match: ["abscedujúc\\w*\\s+granulóm\\w*", "hnisav\\w*\\s+granulóm\\w*", "mikroabsces\\w*", "hviezdicovit\\w*\\s+absces\\w*"],
  short: "Granulóm, v strede ktorého je malý absces s neutrofilmi, lemovaný palisádou epiteloidných buniek. Vyvolávajú ho baktérie žijúce v makrofágoch, ktoré zároveň priťahujú neutrofily.",
  body:
    '<p class="chain">intracelulárna baktéria → <b>makrofág</b> (granulóm) + zároveň príťažlivosť pre <b>neutrofily</b> → v strede <b>mikroabsces</b> → v uzline splývanie do hviezdicovitých abscesov</p>'
},
{
  id: "bartonella",
  img: {
    src: "assets/images/cat-scratch-histology.jpg",
    alt: "Choroba z mačacieho škrabnutia: neutrofily a mikroabscesy v uzline (H&E).",
    caption: "Choroba z mačacieho škrabnutia: neutrofily a mikroabscesy v uzline (H&E).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Cat_scratch_disease_-_very_high_mag.jpg"
  },
  title: "Choroba z mačacieho škrabnutia",
  match: ["mačac\\w*\\s+škrabnut\\w*", "Bartonell\\w*", "bartonel\\w*"],
  short: "Infekcia <i>Bartonella henselae</i> po škrabnutí alebo uhryznutí mačkou (najmä mláďaťom). V mieste vstupu je papula, o 1–3 týždne sa zväčší spádová lymfatická uzlina. Väčšinou sa vylieči sama."
},
{
  id: "papula", et: "lat. <i>papula</i> „pupenec“",
  title: "Papula",
  match: ["papul\\w*", "papuľ\\w*"],
  img: {
    "src": "assets/images/cat-scratch-papule.jpg",
    "alt": "Papula v mieste vstupu pri chorobe z mačacieho škrabnutia.",
    "caption": "Papula v mieste vstupu pri chorobe z mačacieho škrabnutia.",
    "credit": "CDC / Dr. Thomas F. Sellers, Emory University · Public domain",
    "href": "https://commons.wikimedia.org/wiki/File:Cat-scratch_disease_lesion.jpg"
  },
  short: "Malý (do 1 cm) pevný vyvýšený uzlík v koži bez dutiny a bez hnisu.",
  body: "<ul><li>Väčšia vyvýšená plocha je plak.</li><li>Pustula obsahuje hnis.</li></ul>"
},
{
  id: "tularemia", et: "podľa okresu Tulare v Kalifornii + gr. <i>haima</i> „krv“",
  img: {
    src: "assets/images/tularemia-ulcer.jpg",
    alt: "Tularémia – kožný vred na chrbte ruky.",
    caption: "Tularémia – kožný vred na chrbte ruky.",
    credit: "CDC · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Tularemia_lesion.jpg"
  },
  title: "Tularémia",
  match: ["tularémi\\w*", "Francisell\\w*"],
  short: "Infekcia <i>Francisella tularensis</i>, ktorá sa prenáša zo zajacov, hlodavcov a kliešťov. V mieste vstupu vznikne vred, v spádovej uzline hnisavý granulóm."
},
{
  id: "yersiniozna-lymfadenitida",
  title: "Mezenteriálna lymfadenitída (yersinióza)",
  match: ["mezenteriáln\\w*\\s+lymfadenitíd\\w*", "Yersini\\w*", "yersini\\w*"],
  short: "Zápal uzlín v mezentériu (závese čreva) po nákaze <i>Yersinia enterocolitica</i> alebo <i>Y. pseudotuberculosis</i> z kontaminovanej potravy. U detí a dospievajúcich napodobní zápal slepého čreva."
},
{
  id: "terminalny-ileum", et: "lat. <i>terminalis</i> „koncový“; <i>ileum</i> (<i>ilia</i>) „útroby, slabiny“",
  title: "Terminálny ileum",
  match: ["terminál\\w*\\s+ile\\w*", "ileum\\w*"],
  short: "Posledný úsek tenkého čreva pred slepým črevom. Je bohatý na lymfatické tkanivo (Peyerove plaky), preto sa tu často zapália uzliny."
},
{
  id: "listerioza",
  title: "Listerióza",
  match: ["listerióz\\w*", "Listeri\\w*"],
  short: "Infekcia <i>Listeria monocytogenes</i> z potravín (nepasterizované mliečne výrobky, údeniny). U tehotných ohrozuje plod, u novorodenca vyvolá drobné hnisavé granulómy vo viacerých orgánoch."
},
{
  id: "lgv", et: "venerický: lat. <i>venereus</i> (<i>Venus</i> „bohyňa lásky“); lymfogranulóm: <i>lympha</i> + <i>granulum</i> + gr. <i>-oma</i>",
  title: "Venerický lymfogranulóm",
  match: ["venerick\\w*\\s+lymfogranulóm\\w*", "lymphogranuloma\\s+venereum"],
  short: "Pohlavne prenosná infekcia <i>Chlamydia trachomatis</i> (sérotypy L1–L3): hnisavé zväčšenie slabinových uzlín s píšťalami. Pri rektálnej infekcii proktitída a striktúry, jazvy blokujúce lymfu môžu viesť k elefantiáze."
},
{
  id: "chlamydie", et: "gr. <i>chlamys</i> „plášť“ (obal okolo vtrúseniny v bunke)",
  title: "Chlamýdie",
  match: ["chlamýdi\\w*", "Chlamydi\\w*"],
  short: "Drobné baktérie, ktoré žijú len vo vnútri buniek. <i>Chlamydia trachomatis</i> vyvoláva pohlavné infekcie a trachóm.",
  body: "<ul><li>Obligátne vnútrobunkové baktérie.</li><li>Životný cyklus: elementárne telieska infikujú, retikulárne sa v bunke množia (inklúzie).</li></ul>"
},
{
  id: "proktitida", et: "gr. <i>proktos</i> „konečník“ + <i>-itis</i>",
  title: "Proktitída",
  match: ["proktitíd\\w*"],
  short: "Zápal konečníka.",
  body: "<ul><li>Príčiny: infekcie (gonokok, chlamýdie), ulcerózna kolitída, ožiarenie.</li><li>Prejav: tenezmy, hlien a krv v stolici.</li></ul>"
},
{
  id: "striktura", et: "lat. <i>strictura</i> „stiahnutie“",
  title: "Striktúra",
  match: ["striktúr\\w*"],
  short: "Zúženie dutého orgánu (čreva, močovej trubice) jazvou po zápale."
},
{
  id: "aktinomykoza", et: "gr. <i>aktis, aktinos</i> „lúč“ + <i>mykes</i> „huba“ + <i>-osis</i>",
  img: {
    src: "assets/images/actinomycosis.jpg",
    alt: "Kolónia Actinomyces (sírová granula) obklopená neutrofilmi.",
    caption: "Kolónia Actinomyces (sírová granula) obklopená neutrofilmi.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Actinomycosis_(5287905500).jpg"
  },
  title: "Aktinomykóza",
  match: ["aktinomykóz\\w*", "Actinomyces", "aktinomycét\\w*"],
  short: "Chronický hnisavý zápal vyvolaný anaeróbnou vláknitou baktériou <i>Actinomyces israelii</i>, ktorá bežne žije v ústach. Tvorí abscesy a píšťaly šíriace sa naprieč tkanivom, ktoré okolo zatvrdne ako drevo."
},
{
  id: "sirove-granuly",
  img: {
    src: "assets/images/actinomyces-splendore-hoeppli.jpg",
    alt: "Sírové granuly (drúzy): bazofilné kolónie s ružovým eozinofilným lemom – fenomén Splendoreho–Hoeppliho (H&E).",
    caption: "Sírové granuly (drúzy): bazofilné kolónie s ružovým eozinofilným lemom – fenomén Splendoreho–Hoeppliho (H&E).",
    credit: "Mark ong · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Actinomyces_with_Splendore-Hoeppli_phenomenon.jpg"
  },
  title: "Sírové granuly (drúzy)",
  match: ["sírov\\w*\\s+granul\\w*", "drúz\\w*", "Splendore\\w*[–-]Hoeppli\\w*"],
  short: "Žlté zrnká v hnise pri aktinomykóze: kolónie vláknitých baktérií s lemom z protilátok a antigénu (Splendoreho–Hoeppliho jav). Na reze sa volajú drúzy."
},
{
  id: "aerobne-bakterie", et: "gr. <i>aer</i> „vzduch“ + <i>bios</i> „život“",
  title: "Aeróbne baktérie",
  match: ["aeróbn\\w*(?:\\s+baktéri\\w*)?"],
  img: {
    "src": "assets/images/k1-20.jpg",
    "alt": "Plynová gangréna stehna: opuch, pľuzgiere a crepitus.",
    "caption": "Plynová gangréna stehna: opuch, pľuzgiere a crepitus.",
    "credit": "Schröpfer E., Rauthe S., Meyer T. (Cases J 2008, 1:252) · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Gas_gangrene.jpg"
  },
  short: "Potrebujú kyslík (napr. mykobaktérie).",
  body: "<ul><li>Preto M. tuberculosis uprednostňuje vrcholy pľúc.</li></ul>"
},
{
  id: "anaerobne-bakterie", et: "gr. <i>an-</i> „bez“ + <i>aer</i> + <i>bios</i>",
  title: "Anaeróbne baktérie",
  match: ["anaeróbn\\w*(?:\\s+baktéri\\w*)?"],
  short: "Rastú bez kyslíka a kyslík im škodí (aktinomycéty, klostrídie)."
},
{
  id: "fascia", et: "lat. <i>fascia</i> „páska, obväz“",
  title: "Fascia",
  match: ["fasci\\w*"],
  short: "Pevná väzivová blana, ktorá obaľuje svaly a orgány. Hnisavé ložiská ju vedia obísť a šíria sa pozdĺž nej."
},

/* ── reumatická horúčka, vaskulitídy, syfilis ────────────────────────── */
{
  id: "reumaticka-horucka", et: "gr. <i>rheuma</i> „tok, prúd“ (podľa predstavy o toku škodlivých tekutín)",
  img: {
    src: "assets/images/aschoff-body.jpg",
    alt: "Aschoffov uzlík: makrofágy a lymfocyty v interstíciu myokardu.",
    caption: "Aschoffov uzlík: makrofágy a lymfocyty v interstíciu myokardu.",
    credit: "Ed Uthman · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Aschoff_Body_in_Rheumatic_Myocarditis.jpg"
  },
  title: "Reumatická horúčka",
  match: ["reumatick\\w*\\s+horúčk\\w*", "reumatick\\w*\\s+myokarditíd\\w*", "reumatick\\w*\\s+chorob\\w*"],
  short: "Autoimunitná komplikácia neliečenej streptokokovej angíny (2–4 týždne po nej): protilátky proti M-proteínu streptokoka skrížene reagujú s myozínom srdca. Zapáli srdce, kĺby, kožu a mozog; opakované ataky zjazvia chlopne.",
  body:
    '<p class="chain">angína (streptokok A) → protilátky a T-lymfocyty proti <b>M-proteínu</b> → skrížená reakcia s <b>myozínom a chlopňami</b> → Aschoffove uzlíky → vretenovitá jazva → zjazvená mitrálna chlopňa</p>'
},
{
  id: "molekulove-mimikry", et: "angl. <i>mimicry</i> „napodobňovanie“ (gr. <i>mimos</i> „herec, napodobňovateľ“)",
  title: "Molekulové mimikry",
  match: ["molekulov\\w*\\s+mimikr\\w*"],
  short: "Antigén mikróba sa podobá vlastnej bielkovine tela. Imunitná odpoveď proti mikróbu potom napadne aj vlastné tkanivo — takto vzniká napr. reumatická horúčka."
},
{
  id: "aschoff",
  img: {
    src: "assets/images/aschoff-body.jpg",
    alt: "Aschoffov uzlík: makrofágy a lymfocyty v interstíciu myokardu.",
    caption: "Aschoffov uzlík: makrofágy a lymfocyty v interstíciu myokardu.",
    credit: "Ed Uthman · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Aschoff_Body_in_Rheumatic_Myocarditis.jpg"
  },
  title: "Aschoffov uzlík",
  match: ["Aschoffov\\w*\\s+uzl\\w*", "Aschoffov\\w*\\s+bun\\w*"],
  short: "Charakteristické ložisko pri reumatickej myokarditíde: v strede fibrinoidne zmenený kolagén, okolo makrofágy (Aničkovove a Aschoffove bunky) a lymfocyty. Hojí sa vretenovitou jazvičkou."
},
{
  id: "anickov",
  img: {
    src: "assets/images/anitschkow-cells.jpg",
    alt: "Aničkovove bunky: jadro s chromatínom v pozdĺžnom pruhu (H&E).",
    caption: "Aničkovove bunky: jadro s chromatínom v pozdĺžnom pruhu (H&E).",
    credit: "Ed Uthman · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Anitschkow_Myocytes_in_an_Aschoff_Body,_Rheumatic_Myocarditis.jpg"
  },
  title: "Aničkovove bunky",
  match: ["Aničkov\\w*(?:\\s+bun\\w*)?", "Anitschkow\\w*"],
  short: "Makrofágy v Aschoffovom uzlíku s chromatínom zoradeným v pozdĺžnom pruhu. Na priečnom reze vyzerajú ako sovie oko, pozdĺžne ako húsenica."
},
{
  id: "jones",
  title: "Jonesove kritériá",
  match: ["Jonesov\\w*\\s+kritéri\\w*"],
  short: "Súbor hlavných a vedľajších kritérií na diagnózu akútnej reumatickej horúčky, spolu s dôkazom predošlej streptokokovej infekcie. Revízia z roku 2015 pridala echokardiografický dôkaz karditídy."
},
{
  id: "echokardiografia", et: "gr. <i>echo</i> „ozvena“ + <i>kardia</i> „srdce“ + <i>graphein</i> „písať, zaznamenať“",
  title: "Echokardiografia",
  match: ["echokardiograf\\w*"],
  short: "Ultrazvukové vyšetrenie srdca. Ukáže stavbu chlopní, pohyb steny, veľkosť dutín a ejekčnú frakciu.",
  body: "<ul><li>Dopplerom sa meria rýchlosť toku — odhalí stenózu a regurgitáciu.</li><li>Robí sa cez hruď alebo cez pažerák.</li></ul>"
},
{
  id: "aslo",
  title: "ASLO (angl. ASO, antistreptolysin O titre)",
  match: ["ASLO", "antistreptolyzín\\w*"],
  short: "Protilátky proti streptolyzínu O, toxínu streptokoka skupiny A. Zvýšená hladina dokazuje nedávnu streptokokovú infekciu (napr. pred reumatickou horúčkou)."
},
{
  id: "penicilin", et: "lat. <i>penicillus</i> „štetček“ (plesň <i>Penicillium</i> má štetčekovité výtrusnice)",
  title: "Penicilín",
  match: ["penicilín\\w*"],
  short: "Antibiotikum, ktoré blokuje tvorbu bunkovej steny baktérií. Je liekom prvej voľby pri streptokokovej angíne a syfilise."
},
{
  id: "gpa",
  img: {
    src: "assets/images/gpa-histology.jpg",
    alt: "Granulomatóza s polyangiitídou – pľúcna biopsia (H&E).",
    caption: "Granulomatóza s polyangiitídou – pľúcna biopsia (H&E).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Wegener's_granulomatosis_-b-_intermed_mag.jpg"
  },
  title: "Granulomatóza s polyangiitídou (GPA; angl. granulomatosis with polyangiitis)",
  match: ["granulomatóz\\w*\\s+s\\s+polyangiitíd\\w*", "Wegenerov\\w*\\s+granulomatóz\\w*", "GPA"],
  short: "Vaskulitída malých ciev s nekrotizujúcimi granulómami v nose, prinosových dutinách a pľúcach a glomerulonefritídou. Podkladom sú protilátky ANCA proti proteináze 3 (c-ANCA).",
  body:
    '<p class="chain">c-ANCA proti proteináze 3 → aktivácia neutrofilov → poškodenie steny cievy → <b>nekrotizujúca vaskulitída + granulómy</b> v dýchacích cestách → glomerulonefritída</p>'
},
{
  id: "anca",
  title: "ANCA (angl. antineutrophil cytoplasmic antibodies)",
  match: ["c-?ANCA", "p-?ANCA", "ANCA"],
  short: "Protilátky proti bielkovinám v neutrofiloch (c-ANCA: proteináza 3; p-ANCA: myeloperoxidáza). Aktivujú neutrofily a poškodzujú steny malých ciev; používajú sa na diagnostiku vaskulitíd."
},
{
  id: "polyangiitida", et: "gr. <i>polys</i> „mnoho“ + <i>angeion</i> „cieva“ + <i>-itis</i> „zápal“",
  img: {
    src: "assets/images/fibrinoid-necrosis-vasculitis.jpg",
    alt: "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    caption: "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Churg-Strauss_syndrome_-_high_mag.jpg"
  },
  title: "Polyangiitída",
  match: ["polyangiitíd\\w*"],
  short: "Zápal viacerých ciev naraz. V názve GPA označuje, že choroba postihuje aj malé cievy (kapiláry, venuly, arterioly)."
},
{
  id: "chapel-hill",
  img: {
    src: "assets/images/fibrinoid-necrosis-vasculitis.jpg",
    alt: "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    caption: "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Churg-Strauss_syndrome_-_high_mag.jpg"
  },
  title: "Konsenzus z Chapel Hill",
  match: ["Chapel\\s+Hill"],
  short: "Medzinárodná dohoda o názvosloví vaskulitíd. Revízia z roku 2012 nahradila mená osôb (Wegener, Churg–Straussová) opisom podstaty choroby."
},
{
  id: "syfilis", et: "z básne Girolama Fracastora (1530), v ktorej pastier Syphilus ochorie na túto chorobu",
  img: {
    src: "assets/images/gumma-nose.jpg",
    alt: "Guma nosa pri terciárnom syfilise.",
    caption: "Guma nosa pri terciárnom syfilise.",
    credit: "CDC / J. Pledger · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Gumma_of_nose_due_to_a_long_standing_tertiary_syphilitic_Treponema_pallidum_infection_5330_lores.jpg"
  },
  title: "Syfilis",
  match: ["syfilis\\w*", "syfilit\\w*", "Treponem\\w*", "treponém\\w*"],
  short: "Pohlavne prenosná infekcia špirochétou <i>Treponema pallidum</i>. Prebieha v štádiách (primárne, sekundárne, terciárne) a vo všetkých sa opakuje infiltrát z plazmocytov a obliteratívna endarteritída.",
  body:
    '<p class="chain">primárny vred (≈ 3 týždne po nákaze) → sekundárny rozsev s vyrážkou → roky latencie → terciárne štádium: <b>guma</b>, aortitída, neurosyfilis</p>' +
    "<ul>" +
      "<li><b>Primárne štádium</b> — nebolestivý tvrdý vred (ulcus durum) v mieste vstupu a nebolestivo zväčšené spádové uzliny; vred sa zahojí sám.</li>" +
      "<li><b>Sekundárne štádium</b> — treponémy sa rozsejú krvou: vyrážka a ploché kondylómy, vysoko infekčné.</li>" +
      "<li><b>Latencia</b> — roky bez príznakov, nález len v sérológii.</li>" +
      "<li><b>Terciárne štádium</b> — guma (ložisko koagulačnej nekrózy s ostávajúcimi obrysmi buniek), aortitída a neurosyfilis.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo sa nález opakuje.</b> Plazmocyty tvoria protilátky proti treponéme a treponéma poškodzuje malé tepny: ich stena sa zhrubne (obliteratívna endarteritída), priesvit sa zúži a tkanivo za nimi trpí ischémiou. Preto guma nekrotizuje koagulačne, nie kazeózne.</p>' +
    '<p class="why"><b>Ako sa potvrdí.</b> V tkanive striebrením alebo imunohistochémiou; v praxi sérologicky — netreponémové testy (RPR, VDRL) sledujú aktivitu a liečbu, treponémové (TPHA, TPPA) ostávajú pozitívne celý život.</p>'
},
{
  id: "ulcus-durum", et: "lat. <i>ulcus</i> „vred“ + <i>durus</i> „tvrdý“",
  title: "Ulcus durum (tvrdý vred)",
  match: ["ulcus\\s+durum"],
  img: {
    "src": "assets/images/syphilis-chancre.jpg",
    "alt": "Tvrdý vred (ulcus durum) pri primárnom syfilise.",
    "caption": "Tvrdý vred (ulcus durum) pri primárnom syfilise.",
    "credit": "CDC / M. Rein · Public domain",
    "href": "https://commons.wikimedia.org/wiki/File:Chancres_on_the_penile_shaft_due_to_a_primary_syphilitic_infection_caused_by_Treponema_pallidum_6803_lores.jpg"
  },
  short: "Nebolestivý tvrdý vred v mieste vstupu treponémy pri primárnom syfilise. Spádové uzliny sú nebolestivo zväčšené.",
  body: "<ul><li>Vzniká týždne po nákaze.</li><li>Bez liečby sa zahojí, ale infekcia pokračuje do sekundárneho štádia.</li></ul>"
},
{
  id: "kondylomy", et: "gr. <i>kondyloma</i> „hrčka“ (<i>kondylos</i> „hrčka, hlavica“); lat. <i>latus</i> „široký, plochý“",
  title: "Ploché kondylómy (condylomata lata)",
  match: ["ploch\\w*\\s+kondylóm\\w*", "kondylóm\\w*"],
  short: "Vlhké ploché papuly na koži v oblasti genitálu a konečníka pri sekundárnom syfilise. Obsahujú množstvo treponém, preto sú vysoko infekčné."
},
{
  id: "netreponemove-testy",
  title: "Netreponémové testy",
  match: ["netreponémov\\w*\\s+test\\w*", "RPR", "VDRL"],
  short: "Merajú protilátky proti lipidom z poškodených buniek (RPR, VDRL); sledujú aktivitu choroby a liečbu.",
  body: "<ul><li>Môžu byť falošne pozitívne (tehotenstvo, autoimunita).</li><li>Po liečbe titer klesá.</li></ul>"
},
{
  id: "treponemove-testy", et: "gr. <i>trepein</i> „točiť“ + <i>nema</i> „vlákno“",
  title: "Treponémové testy",
  match: ["treponémov\\w*\\s+test\\w*", "TPHA", "TPPA"],
  short: "Dokazujú protilátky priamo proti treponéme (TPHA, TPPA) a ostávajú pozitívne celý život.",
  body: "<ul><li>Po liečbe ostávajú pozitívne.</li><li>Potvrdia skutočný syfilis pri pozitívnom netreponémovom teste.</li></ul>"
},
{
  id: "spirochety", et: "gr. <i>speira</i> „závit“ + <i>chaite</i> „vlasy, štetina“",
  img: {
    src: "assets/images/treponema-silver.jpg",
    alt: "Treponema pallidum v tkanive – striebrenie podľa Steinera.",
    caption: "Treponema pallidum v tkanive – striebrenie podľa Steinera.",
    credit: "CDC / Dr. Edwin P. Ewing, Jr. · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Treponema_pallidum_01.png"
  },
  title: "Špirochéty",
  match: ["špirochét\\w*"],
  short: "Skupina vláknitých, špirálovitých baktérií (Treponema, Borrelia, Leptospira). Sú také tenké, že sa vo svetelnom mikroskope nevidia, treba ich zviditeľniť striebrením alebo imunohistochémiou."
},

/* ── drobnosti: jazyk textu ──────────────────────────────────────────── */
{
  id: "systemova-choroba", et: "gr. <i>systema</i> „celok zložený z častí“",
  title: "Systémová choroba",
  match: ["systémov\\w*\\s+choro\\w*"],
  short: "Choroba, ktorá postihuje viac orgánov alebo celé sústavy naraz (sarkoidóza, vaskulitídy, amyloidóza), na rozdiel od choroby jedného orgánu."
},
{
  id: "inertny-material", et: "lat. <i>iners, inertis</i> „nečinný“; <i>materia</i> „látka“",
  title: "Inertný materiál",
  match: ["inertn\\w*"],
  short: "Látka, ktorá nevstupuje do chemických reakcií a bunkám nijako neškodí. Telo ju však nevie rozložiť, a preto ju obalí."
},
{
  id: "difuzia", et: "lat. <i>diffundere</i> „rozlievať“ (<i>dis-</i> „rozne“ + <i>fundere</i> „liať“)",
  title: "Difúzia",
  match: ["difúzi\\w*"],
  short: "Samovoľný pohyb látky z miesta s vyššou koncentráciou na miesto s nižšou. Tkanivo bez ciev, ako je granulóm, sa z okolia zásobuje len difúziou — preto jeho stred ľahko odumrie."
},
{
  id: "patogen", et: "gr. <i>pathos</i> „utrpenie, choroba“ + <i>-genes</i> „tvoriaci“",
  title: "Patogén (pôvodca choroby)",
  match: ["patogén\\w*"],
  short: "Mikroorganizmus, ktorý vyvoláva chorobu — baktéria, vírus, huba alebo prvok.",
  body: "<ul><li>Oportúnny patogén vyvolá chorobu len pri oslabenej imunite.</li><li>Virulencia je miera schopnosti vyvolať chorobu.</li></ul>"
},
{
  id: "mutacia", et: "lat. <i>mutare</i> „meniť“",
  title: "Mutácia",
  match: ["mutáci\\w*"],
  short: "Zmena v poradí báz DNA. Môže byť vrodená alebo získaná; u baktérií spôsobuje rezistenciu na lieky.",
  body: "<ul><li>Typy: bodová, delécia, inzercia.</li><li>Mutácie v onkogénoch a supresorových génoch môžu viesť k nádoru.</li></ul>"
},
{
  id: "detritus", et: "lat. <i>detritus</i> „zotretý, rozdrobený“ (<i>deterere</i> „zotrieť“)",
  title: "Detritus",
  match: ["detrit\\w*"],
  short: "Rozpadnutá drobná hmota z mŕtvych buniek a jadier. Pod mikroskopom je to zrnitý bazofilný prach."
},
{
  id: "uzlik",
  title: "Uzlík",
  match: ["uzlík\\w*"],
  short: "Pevné ohraničené ložisko v tkanive do ≈ 1 cm."
},
{
  id: "uzol",
  title: "Uzol",
  match: ["uzol\\w*", "uzl(?:a|e|y|u|om|ov|ami|ách)"],
  short: "Pevné ohraničené ložisko v tkanive väčšie ako uzlík.",
  body: "<ul><li>Lymfatická uzlina je naopak normálny orgán lymfatického systému.</li></ul>"
},
{
  id: "infekcnost", et: "lat. <i>inficere</i> „nakaziť“ (<i>in-</i> + <i>facere</i> „robiť“)",
  title: "Infekčnosť",
  match: ["infekčn\\w*"],
  short: "Schopnosť chorého prenášať mikróba na iných. Pri tuberkulóze je najvyššia pri otvorenej kavernóznej forme, pri lepre pri lepromatóznej."
},
{
  id: "alveolitida", et: "lat. <i>alveolus</i> „jamka“ + gr. <i>-itis</i>; alergická: gr. <i>allos</i> „iný“ + <i>ergon</i> „pôsobenie“",
  title: "Exogénna alergická alveolitída",
  match: ["exogénn\\w*\\s+alergick\\w*\\s+alveolitíd\\w*", "alveolitíd\\w*"],
  short: "Zápal pľúcnych alveol po opakovanom vdychovaní organického prachu (plesne, pierko, seno). Vzniká imunitný granulóm bez nekrózy a pri trvaní fibróza (napr. farmárske pľúca)."
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "lupus-pernio", et: "lat. <i>lupus</i> „vlk“ + <i>pernio</i> „omrzlina“ (červenofialová koža ako po omrzline)",
  img: {
    src: "assets/images/lupus-pernio.jpg",
    alt: "Lupus pernio: červenofialové plaky a uzly na nose a lícach.",
    caption: "Lupus pernio: červenofialové plaky a uzly na nose a lícach.",
    credit: "M. Sand, D. Sand, C. Thrandorf, V. Paech, P. Altmeyer, F. G. Bechara · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Lupus_pernio_01.jpg"
  },
  title: "Lupus pernio",
  match: ["lupus\\s+pernio"],
  short: "Kožná podoba sarkoidózy na strede tváre: červenofialové tuhé plaky a uzly na nose a lícach. Býva pri chronickom priebehu choroby."
},
{
  id: "pottova-choroba", et: "podľa Percivalla Potta (1714–1788), anglického chirurga",
  img: {
    src: "assets/images/pott-spine.jpg",
    alt: "Hrudná chrbtica so skolabovanými stavcami po tuberkulóze (kostný preparát).",
    caption: "Hrudná chrbtica so skolabovanými stavcami po tuberkulóze (kostný preparát).",
    credit: "Otis Historical Archives, National Museum of Health and Medicine, foto Brian Spatola · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Spine_-_Kyphosis_from_Tuberculosis.jpg"
  },
  title: "Pottova choroba (tuberkulóza chrbtice)",
  match: ["Pottov\\w*\\s+chorob\\w*", "tuberkulózn\\w*\\s+spondylitíd\\w*"],
  short: "Tuberkulóza chrbtice. Mykobaktérie sa dostanú do stavcov krvou alebo lymfou, zničia telá stavcov pri medzistavcovej platničke a predná časť sa zrúti.",
  body:
    '<p class="chain">rozsev mykobaktérií → <b>zničenie tiel stavcov</b> pri platničke → predný kolaps → <b>kyfóza (gibbus)</b></p>' +
    "<ul>" +
      "<li><b>Kde</b> — najčastejšie hrudná a driekova chrbtica.</li>" +
      "<li><b>Prečo tu</b> — stavce majú bohaté cievne zásobenie, ktoré mykobaktériám otvára cestu; platnička je cievami chudobná.</li>" +
      "<li><b>Komplikácie</b> — abscesy okolo chrbtice a poškodenie miechy.</li>" +
    "</ul>"
},
{
  id: "richove-lozisko",
  title: "Richove ložiská",
  match: ["Richov\\w*\\s+ložisk\\w*"],
  short: "Drobné tuberkulózne ložiská v mozgovom tkanive alebo v mozgových obaloch. Keď prasknú do subarachnoidálneho priestoru, vyvolajú tuberkulóznu meningitídu."
},
{
  id: "autonefrektomia", et: "gr. <i>autos</i> „sám“ + <i>nephros</i> „oblička“ + <i>ektomé</i> „odstránenie“",
  title: "Autonefrektómia",
  match: ["autonefrektómi\\w*"],
  short: "Zánik funkcie obličky bez operácie: pri pokročilej tuberkulóze sa oblička zmenší, zvápenatie a prestane fungovať (tzv. tmelová oblička)."
},
{
  id: "lepra-reakcie",
  title: "Lepra reakcie (typ 1 a typ 2)",
  match: ["erythema\\s+nodosum\\s+leprosum", "reverzn\\w*\\s+reakci\\w*", "lepra\\s+reakci\\w*"],
  short: "Náhle vzplanutia zápalu pri lepre, ktoré rýchlo poškodia nervy. Typ 1 (reverzná) = oneskorená precitlivenosť pri hraničných formách; typ 2 (erythema nodosum leprosum) = imunokomplexy pri lepromatóznom konci spektra.",
  body:
    "<ul>" +
      "<li><b>Typ 1</b> — vzrastie bunková imunita (IV. typ): opuch a bolesť kožných ložísk a nervov, strata funkcie nervu.</li>" +
      "<li><b>Typ 2</b> — ukladanie imunokomplexov (III. typ): bolestivé červené uzly, horúčka a celkový zápal; postihuje takmer polovicu chorých pri lepromatóznom konci.</li>" +
    "</ul>"
},
{
  id: "ridley-jopling",
  title: "Ridleyho–Joplingova klasifikácia lepry",
  match: ["Ridley\\w*\\s+a\\s+Jopling\\w*", "Ridley\\w*[–-]Jopling\\w*"],
  short: "Delenie lepry na spektrum podľa sily bunkovej imunity a množstva baktérií: tuberkuloidná (TT) – hraničné formy (BT, BB, BL) – lepromatózna (LL)."
}

);

/* Glosár PATOLY — metódy patologického a klinického vyšetrenia: spracovanie vzorky, farbenie a molekulové metódy,
   pitva, laboratórne a zobrazovacie vyšetrenia (hlavne kap. 0, ale používajú ich všetky kapitoly). Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── spracovanie vzorky ──────────────────────────────────────────────── */
{
  id: "formaldehyd", et: "lat. <i>formica</i> „mravec“ + aldehyd",
  title: "Formaldehyd",
  match: ["formaldehyd\\w*", "formolov\\w*"],
  short: "Aldehyd, ktorý zosieťuje bielkoviny v tkanive a tým ho zakonzervuje; 4% roztok je formalín.",
  body: "<ul><li>Pri dlhej fixácii v krvou bohatých tkanivách vzniká hnedý formalínový pigment.</li></ul>"
},
{
  id: "glutaraldehyd",
  title: "Glutaraldehyd",
  match: ["glutaraldehyd\\w*"],
  short: "Aldehyd používaný ako fixatív pre elektrónovú mikroskopiu.",
  body: "<ul><li>Rýchlo prenikne a zachová jemnú štruktúru organel.</li></ul>"
},
{
  id: "fixativum", et: "lat. <i>fixare</i> „upevniť“",
  title: "Fixatívum",
  match: ["fixatív\\w*"],
  short: "Látka, ktorá tkanivo zakonzervuje, aby nehnilo a zachovalo štruktúru.",
  body: "<ul><li>Typy: zosieťujúce (aldehydy) a koagulačné (alkohol).</li><li>Alkohol sa použije, keď treba zachovať kryštály (urát).</li></ul>"
},
{
  id: "parafin", et: "lat. <i>parum</i> „málo“ + <i>affinis</i> „príbuzný“ (málo reaktívny)",
  title: "Parafínový blok",
  match: ["parafínov\\w*\\s+blok\\w*", "parafín\\w*", "zaliati\\w*", "odparafínovan\\w*", "paraffin"],
  img: {
    "src": "assets/images/microtome-ribbon.jpg",
    "alt": "Mikrotóm krája z parafínového bločka pás tenkých rezov.",
    "caption": "Mikrotóm krája z parafínového bločka pás tenkých rezov.",
    "credit": "Ed Uthman · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tissue_processing_-_Microtome_is_used_to_cut_a_ribbon_of_5-micron-thick_sections_from_the_paraffin_block.jpg"
  },
  short: "Fixované tkanivo sa odvodní a zaleje do parafínu; vytvrdnutý blok sa potom krája na rezy.",
  body: "<ul><li>Pred farbením sa parafín z rezu odstráni (odparafínovanie).</li><li>Takto spracované tkanivo sa dá archivovať roky a opakovane vyšetriť.</li></ul>"
},
{
  id: "mikrotom", et: "gr. <i>mikros</i> „malý“ + <i>tome</i> „rez“",
  title: "Mikrotóm",
  match: ["mikrotóm\\w*"],
  short: "Prístroj, ktorým sa z parafínového bloku krájajú tenké rezy hrubé ≈ 4 µm.",
  body: "<ul><li>Rez musí byť dosť tenký, aby cez neho prešlo svetlo mikroskopu.</li></ul>"
},
{
  id: "kryostat", et: "gr. <i>kryos</i> „mráz“ + <i>statos</i> „stojaci“",
  title: "Kryostat",
  match: ["kryostat\\w*"],
  img: {
    "src": "assets/images/frozen-section-cryostat.jpg",
    "alt": "Tkanivo zaliate v médiu na držiaku kryostatu.",
    "caption": "Tkanivo zaliate v médiu na držiaku kryostatu.",
    "credit": "000jaw · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Tissue_for_frozen_section_in_cryostat.JPG"
  },
  short: "Chladený prístroj, v ktorom sa zmrazená vzorka krája na rezy.",
  body: "<ul><li>Zmrazená vzorka sa krája pri teplote okolo −20 °C.</li></ul>"
},
{
  id: "zmrazeny-rez",
  title: "Zmrazený rez",
  match: ["zmrazen\\w*\\s+rez\\w*"],
  short: "Čerstvá vzorka sa zmrazí, narežú sa z nej rezy a do 15–20 minút sa posúdia.",
  body: "<ul><li>Hodí sa na rýchlu diagnózu, na tuky a niektoré farbenia.</li><li>Ľadové kryštály spôsobujú artefakty.</li></ul><ul><li>Kvalita je horšia než pri parafíne.</li></ul>"
},
{
  id: "peroperacne-vysetrenie", et: "lat. <i>per</i> „cez“ + <i>operatio</i> „výkon“",
  title: "Peroperačné vyšetrenie",
  match: ["peroperačn\\w*(?:\\s+vyšetreni\\w*)?", "intra-?operative"],
  short: "Rýchle vyšetrenie vzorky počas operácie, kým je pacient v narkóze — napr. či je okraj nádoru voľný.",
  body: "<ul><li>Typické otázky: je to nádor? sú okraje čisté? je uzlina postihnutá?</li><li>Výsledok nie je konečná diagnóza.</li></ul>"
},
{
  id: "grossing", et: "angl. <i>gross</i> „hrubý, makroskopický“ (lat. <i>grossus</i> „hrubý“)",
  title: "Makroskopické spracovanie (grossing)",
  match: ["grossing", "resekát\\w*", "prepitvan\\w*"],
  short: "Patológ vzorku zmeria, opíše voľným okom, nareže a vyberie reprezentatívne úseky na histologické spracovanie. Resekát je chirurgicky odstránené tkanivo alebo orgán."
},
{
  id: "preanalytika", et: "lat. <i>prae</i> „pred“ + gr. <i>analysis</i> „rozbor“",
  title: "Preanalytická fáza",
  match: ["preanalytik\\w*"],
  short: "Všetko, čo sa so vzorkou stane pred meraním: odber, čas do fixácie, typ fixatívu, doprava. Zlá preanalytika (napr. oneskorená fixácia) znehodnotí aj najlepšiu analýzu."
},
{
  id: "artefakt", et: "lat. <i>ars, artis</i> „umenie, um“ + <i>factum</i> „urobené“ (umelo vzniknutý útvar)",
  title: "Artefakt",
  match: ["artefakt\\w*"],
  short: "Zmena vo vzorke, ktorú nespôsobila choroba, ale spracovanie (stlačenie, roztrhnutie, vysušenie, farbivo). Treba ju odlíšiť od skutočného nálezu."
},

/* ── farbenia a imunohistochémia ─────────────────────────────────────── */
{
  id: "epitop", et: "gr. <i>epi</i> „na“ + <i>topos</i> „miesto“",
  title: "Epitop",
  match: ["epitop\\w*"],
  short: "Malá časť antigénu, ktorú rozpoznáva protilátka. Pri fixácii formalínom sa epitopy zosieťujú, preto sa pred imunohistochémiou „demaskujú“ teplom alebo enzýmom."
},
{
  id: "dab", et: "angl. <i>3,3′-diaminobenzidine</i>",
  title: "DAB (diaminobenzidín)",
  match: ["diaminobenzidín\\w*", "DAB"],
  img: {
    "src": "assets/images/her2-ihc-3plus.jpg",
    "alt": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "caption": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "credit": "Marvin 101 · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Her2neu_3%2Bstaining.jpg"
  },
  short: "Bezfarebné činidlo, ktoré peroxidáza premení na hnedú zrazeninu — vizualizácia signálu v imunohistochémii."
},
{
  id: "peroxidaza",
  title: "Peroxidáza",
  match: ["peroxidáz\\w*"],
  short: "Enzým naviazaný na protilátku, ktorý mení DAB na hnedú zrazeninu.",
  body: "<ul><li>Endogénna peroxidáza (v erytrocytoch) sa pred farbením zablokuje, aby nedávala falošný signál.</li></ul>"
},
{
  id: "cytokeratiny", et: "gr. <i>kytos</i> „bunka“ + <i>keras, keratos</i> „roh“",
  title: "Cytokeratíny",
  match: ["cytokeratín\\w*"],
  short: "Intermediárne filamenty epitelových buniek. Preto cytokeratínová pozitivita v nádore ukazuje na epitelový pôvod (karcinóm), negativita na sarkóm alebo lymfóm."
},
{
  id: "cytologia", et: "gr. <i>kytos</i> „bunka“ + <i>logos</i> „náuka“",
  title: "Cytológia",
  match: ["cytológi\\w*", "cytologick\\w*"],
  short: "Hodnotí jednotlivé bunky, nie tkanivo.",
  body: "<ul><li>Výhoda: rýchla a menej invazívna.</li><li>Nevidno architektúru tkaniva.</li></ul>"
},
{
  id: "papanicolaou", et: "podľa Georgea Papanicolaoua",
  title: "Papanicolaouovo farbenie",
  match: ["Papanicolaou\\w*(?:\\s+farben\\w*)?"],
  img: {
    "src": "assets/images/pap-smear-normal.jpg",
    "alt": "Normálne dlaždicové bunky v Papanicolaouovom nátere.",
    "caption": "Normálne dlaždicové bunky v Papanicolaouovom nátere.",
    "credit": "Alex_brollo · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pap_test_normal.jpg"
  },
  short: "Farbenie bunkových náterov, najmä cervikálnych sterov.",
  body: "<ul><li>Jadrá modrofialové, cytoplazma ružová až zelenomodrá.</li><li>Základ skríningu karcinómu krčka maternice.</li></ul>"
},
{
  id: "exfoliativna-cytologia",
  title: "Exfoliatívna cytológia",
  match: ["exfoliatívn\\w*(?:\\s+cytológi\\w*)?"],
  short: "Skúma bunky zoškrabnuté alebo olúpané z povrchu (cervikálny steri, spútum)."
},
{
  id: "aspiracna-cytologia", et: "lat. <i>aspirare</i> „nasávať“",
  title: "Tenkoihlová aspirácia (FNA)",
  match: ["tenkoihlov\\w*(?:\\s+aspiráci\\w*)?", "fine-?needle", "aspiračn\\w*", "aspiráci\\w*"],
  img: {
    "src": "assets/images/fna-fibroadenoma.jpg",
    "alt": "Tenkoihlová aspirácia z fibroadenómu prsníka (Papanicolaou): zhluky buniek bez architektúry tkaniva.",
    "caption": "Tenkoihlová aspirácia z fibroadenómu prsníka (Papanicolaou): zhluky buniek bez architektúry tkaniva.",
    "credit": "KGH · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Breast_fibroadenoma_by_fine_needle_aspiration_(2)_PAP_stain.jpg"
  },
  short: "Odoberie bunky tenkou ihlou na cytologické vyšetrenie.",
  body: "<ul><li>Použitie: štítna žľaza, prsník, lymfatické uzliny.</li><li>Nerozlíši invazívny od neinvazívneho nádoru.</li></ul>"
},
{
  id: "core-cut",
  title: "Hruboihlová biopsia (core-cut)",
  match: ["hruboihlov\\w*(?:\\s+biopsi\\w*)?", "core-?cut"],
  short: "Odoberie valček tkaniva, ktorý zachová štruktúru.",
  body: "<ul><li>Zachová architektúru, dá sa vyšetriť imunohistochemicky.</li><li>Používa sa pri prsníku, prostate a pečeni.</li></ul>"
},
{
  id: "trepanobiopsia",
  title: "Trepanobiopsia",
  match: ["trepanobiopsi\\w*"],
  short: "Odber kosti s kostnou dreňou.",
  body: "<ul><li>Odoberá sa z hrebeňa bedrovej kosti.</li><li>Dokazuje leukémiu, myelóm a infiltráciu nádorom.</li></ul>"
},
{
  id: "elektronova-mikroskopia", et: "elektrón: gr. <i>elektron</i> „jantár“ (trením elektrizovaný); mikroskop: <i>mikros</i> „malý“ + <i>skopein</i> „pozerať“",
  title: "Elektrónová mikroskopia",
  match: ["elektrónov\\w*\\s+mikroskop\\w*", "ultratenk\\w*", "ultraštrukt\\w*"],
  short: "Mikroskop, ktorý používa zväzok elektrónov a zobrazí štruktúry do ≈ 1 nm (organely, membrány, usadeniny v glomeruloch). Vyžaduje ultratenké rezy a špeciálnu fixáciu."
},
{
  id: "fish", et: "angl. <i>fluorescence in situ hybridization</i>",
  img: {
    src: "assets/images/fish-her2.jpg",
    alt: "Amplifikácia génu HER2 vo FISH – v jadre množstvo fluorescenčných bodov sondy.",
    caption: "Amplifikácia génu HER2 vo FISH – v jadre množstvo fluorescenčných bodov sondy.",
    credit: "IrinaPav · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:FISH_Her2.jpg"
  },
  title: "FISH",
  match: ["FISH"],
  short: "Fluorescenčne značená sonda sa naviaže na zodpovedajúcu sekvenciu DNA alebo RNA priamo v tkanive.",
  body: "<ul><li>Dokazuje amplifikáciu génov (napr. HER2) a translokácie.</li></ul>"
},
{
  id: "hybridizacia", et: "lat. <i>hybrida</i> „kríženec“",
  title: "Hybridizácia in situ",
  match: ["hybridizáci\\w*(?:\\s+in\\s+situ)?"],
  short: "Párovanie značenej sondy so zodpovedajúcou nukleovou kyselinou priamo v tkanive."
},
{
  id: "sekvenovanie", et: "lat. <i>sequi</i> „nasledovať“",
  title: "Sekvenovanie",
  match: ["sekvenovan\\w*", "sekvenci\\w*"],
  short: "Určuje poradie báz DNA.",
  body: "<ul><li>Sangerovo sekvenovanie sa používa na jeden gén.</li><li>NGS číta viac génov naraz.</li></ul>"
},
{
  id: "ngs", et: "angl. <i>next-generation sequencing</i>",
  title: "NGS (sekvenovanie novej generácie)",
  match: ["next-?generation", "NGS"],
  short: "Sleduje stovky génov naraz a nájde mutácie, ktoré určujú liečbu nádoru."
},
{
  id: "amplifikacia", et: "lat. <i>amplificare</i> „zväčšiť“",
  title: "Amplifikácia génu",
  match: ["amplifikáci\\w*(?:\\s+gén\\w*)?"],
  short: "Znásobenie počtu kópií génu v bunke (nádorové bunky s viac kópiami HER2).",
  body: "<ul><li>Príklady: HER2 pri karcinóme prsníka, N-MYC pri neuroblastóme.</li><li>Dôkaz: FISH.</li></ul>"
},
{
  id: "translokacia", et: "lat. <i>trans</i> „cez“ + <i>locus</i> „miesto“",
  title: "Translokácia",
  match: ["translokáci\\w*"],
  short: "Prenesenie úseku chromozómu na iný (BCR–ABL pri chronickej myeloidnej leukémii).",
  body: "<ul><li>Príklady: t(9;22) pri CML (Philadelphský chromozóm), t(14;18) pri folikulárnom lymfóme.</li><li>Vzniká fúzny gén.</li></ul>"
},
{
  id: "msi",
  title: "Mikrosatelitová instabilita",
  match: ["mikrosatelitov\\w*(?:\\s+instabilit\\w*)?"],
  short: "Skracovanie alebo predlžovanie krátkych opakujúcich sa úsekov DNA pri poruche opravy chybného párovania (MMR). Nájde sa v časti karcinómov hrubého čreva a maternice a predpovedá odpoveď na imunoterapiu."
},
{
  id: "egfr", et: "angl. <i>epidermal growth factor receptor</i>",
  title: "EGFR",
  match: ["EGFR(?:-\\w+)?"],
  img: {
    "src": "assets/images/her2-ihc-3plus.jpg",
    "alt": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "caption": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "credit": "Marvin 101 · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Her2neu_3%2Bstaining.jpg"
  },
  short: "Receptor rastových faktorov; jeho mutácie poháňajú rast nádoru (napr. pľúca) a sú cieľom cielenej liečby.",
  body: "<ul><li>Mutácie v pľúcnom adenokarcinóme sú cieľom inhibítorov tyrozínkinázy.</li></ul>"
},
{
  id: "her2", et: "angl. <i>human epidermal growth factor receptor 2</i>",
  title: "HER2",
  match: ["HER2", "anti-?HER\\w*"],
  short: "Receptor rastových faktorov; jeho nadprodukcia poháňa rast nádoru (prsník) a je cieľom cielenej liečby.",
  body: "<ul><li>Dôkaz: imunohistochémia (0 – 3+) a FISH.</li><li>Trastuzumab sa viaže na HER2.</li></ul>"
},
{
  id: "imunoonkologia",
  title: "Imunoonkológia",
  match: ["imunoonkológi\\w*"],
  short: "Liečba, ktorá uvoľní brzdy imunitnej odpovede proti nádoru."
},
{
  id: "inhibitory-kontrolnych-bodov",
  title: "Inhibítory kontrolných bodov (PD-1/PD-L1)",
  match: ["inhibítor\\w*\\s+kontroln\\w*\\s+bod\\w*", "PD-?L?1"],
  short: "Inhibítory PD-1/PD-L1 blokujú signál, ktorým nádor vypína T-lymfocyty.",
  body: "<ul><li>Predikciu odpovede podporuje imunohistochémia PD-L1.</li></ul>"
},
{
  id: "biomarker", et: "gr. <i>bios</i> „život“ + marker",
  title: "Biomarker",
  match: ["biomarker\\w*"],
  short: "Merateľný znak choroby.",
  body: "<ul><li>Príklady: HER2, ER/PR, PSA, KRAS.</li><li>Môže byť prediktívny aj prognostický.</li></ul>"
},
{
  id: "prediktivny-marker", et: "lat. <i>praedicere</i> „predpovedať“",
  title: "Prediktívny marker",
  match: ["prediktívn\\w*(?:\\s+marker\\w*)?"],
  img: {
    "src": "assets/images/her2-ihc-3plus.jpg",
    "alt": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "caption": "Silná membránová pozitivita HER2 (3+): hnedý produkt DAB.",
    "credit": "Marvin 101 · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Her2neu_3%2Bstaining.jpg"
  },
  short: "Hovorí, či liečba zaberie (HER2).",
  body: "<ul><li>Príklad: HER2 → trastuzumab; mutácia EGFR → inhibítory tyrozínkinázy.</li></ul>"
},
{
  id: "prognosticky-marker", et: "gr. <i>pro</i> „pred“ + <i>gnosis</i> „poznanie“",
  title: "Prognostický marker",
  match: ["prognostick\\w*(?:\\s+marker\\w*)?"],
  short: "Hovorí, ako choroba pravdepodobne prebehne bez liečby.",
  body: "<ul><li>Príklady: grading nádoru, Ki-67, stav lymfatických uzlín.</li></ul>"
},
{
  id: "skrining", et: "angl. <i>screening</i> „preosievanie, preverovanie“ (<i>screen</i> „sito“)",
  title: "Skríning",
  match: ["skríning\\w*", "screening"],
  short: "Vyšetrenie zdravých ľudí na včasné odhalenie choroby (cytologický steri z krčka maternice, mamografia, kolonoskopia). Musí zachytiť chorobu, ktorá sa dá v ranom štádiu liečiť."
},

/* ── pitva ───────────────────────────────────────────────────────────── */
{
  id: "pitva", et: "nekropsia: gr. <i>nekros</i> „mŕtvy“ + <i>opsis</i> „pohľad“",
  title: "Pitva (obdukcia, nekropsia)",
  match: ["pitv\\w*", "pitevn\\w*", "obdukci\\w*", "nekropsi\\w*", "prosekci\\w*", "autopsy"],
  short: "Vyšetrenie tela po smrti na zistenie príčiny smrti a rozsahu chorôb. Klinická pitva overuje diagnózu a liečbu, súdnolekárska zisťuje príčinu a okolnosti násilnej alebo nejasnej smrti."
},
{
  id: "sudne-lekarstvo",
  title: "Súdne lekárstvo",
  match: ["súdnolekárs\\w*", "súdn\\w*\\s+lekárstv\\w*"],
  short: "Skúma príčiny a okolnosti smrti a poranení pre potreby práva."
},
{
  id: "toxikologia", et: "gr. <i>toxikon</i> „jed“ + <i>logos</i> „náuka“",
  title: "Toxikológia",
  match: ["toxikológi\\w*"],
  short: "Dokazuje jedy, lieky a drogy v tele."
},
{
  id: "virtopsia", et: "lat. <i>virtualis</i> „zdanlivý“ (<i>virtus</i> „schopnosť“) + gr. <i>opsis</i> „pohľad“",
  title: "Virtopsia (virtuálna pitva)",
  match: ["virtopsi\\w*"],
  short: "Vyšetrenie mŕtveho tela počítačovou tomografiou a magnetickou rezonanciou namiesto (alebo pred) otvorením tela. Dobre ukáže zlomeniny a plyn, horšie drobné zmeny orgánov."
},
{
  id: "mri",
  title: "Magnetická rezonancia (MRI; angl. magnetic resonance imaging)",
  match: ["magnetick\\w*\\s+rezonanci\\w*", "MRI"],
  short: "Zobrazenie tela magnetickým poľom a rádiovými vlnami bez ionizujúceho žiarenia. Skvelé na mäkké tkanivá (mozog, kĺby, srdce)."
},
{
  id: "ultrazvuk", et: "lat. <i>ultra</i> „za, nad“; sonografia: lat. <i>sonus</i> „zvuk“ + gr. <i>graphein</i> „zaznamenať“",
  title: "Ultrazvuk (sonografia)",
  match: ["ultrazvuk\\w*", "sonografi\\w*"],
  short: "Zobrazenie orgánov odrazom ultrazvukových vĺn, bez žiarenia. Využíva sa pri vyšetrení srdca (echokardiografia), brucha a pri biopsiách pod kontrolou obrazu."
},
{
  id: "scintigrafia", et: "lat. <i>scintilla</i> „iskra“ + gr. <i>graphein</i> „zaznamenať“",
  title: "Scintigrafia",
  match: ["scintigrafi\\w*"],
  short: "Zobrazenie rozloženia rádioaktívne označenej látky v tele (kosti, štítna žľaza, pľúcna perfúzia). Ukazuje funkciu, nie len tvar orgánu."
},
{
  id: "angiografia", et: "gr. <i>angeion</i> „cieva“ + <i>graphein</i> „písať“",
  title: "Angiografia",
  match: ["angiografi\\w*"],
  short: "Zobrazenie ciev kontrastnou látkou vstreknutou do cievy pod rtg. kontrolou; ukáže zúženie, uzáver a krvácanie."
},
{
  id: "katetrizacia", et: "gr. <i>katheter</i> „zavádzač“",
  title: "Katetrizácia",
  match: ["katetrizáci\\w*", "katéter\\w*"],
  short: "Zavedenie katétra do cievy; cez rovnaký prístup sa dá cieva aj liečiť.",
  body: "<ul><li>Príklady: koronárna a srdcová katetrizácia.</li><li>Riziká: krvácanie, embólia, kontrastná nefropatia.</li></ul>"
},

/* ── laboratórium ────────────────────────────────────────────────────── */
{
  id: "crp", et: "angl. <i>C-reactive protein</i>",
  title: "CRP (C-reaktívny proteín)",
  match: ["C-reaktívn\\w*(?:\\s+proteín\\w*)?", "CRP"],
  short: "Bielkovina akútnej fázy, ktorú pečeň tvorí po IL-6; zvyšuje sa pri každom zápale.",
  body: "<ul><li>Stúpa po hodinách, vrchol dosiahne približne za dva dni.</li><li>Slúži na sledovanie zápalu a infekcie.</li></ul>"
},
{
  id: "prokalcitonin",
  title: "Prokalcitonín",
  match: ["prokalcitonín\\w*"],
  short: "Bielkovina, ktorá sa zvyšuje najmä pri baktériovej infekcii a sepse."
},
{
  id: "hemolyza", et: "gr. <i>haima</i> „krv“ + <i>lysis</i> „rozpúšťanie“",
  title: "Hemolýza",
  match: ["hemolýz\\w*", "hemolytick\\w*"],
  short: "Rozpad erytrocytov s uvoľnením hemoglobínu. Vnútrocievna hemolýza zafarbí plazmu a moč; hemoglobín sa odbúrava na bilirubín, takže vzniká žltačka."
},
{
  id: "bilirubin", et: "lat. <i>bilis</i> „žlč“ + <i>ruber</i> „červený“",
  img: {
    src: "assets/images/bruise-ring-resolution.jpg",
    alt: "Modrina 1., 9., 13. a 15. deň – žltý okraj dáva bilirubín.",
    caption: "Modrina 1., 9., 13. a 15. deň – žltý okraj dáva bilirubín.",
    credit: "Clarinetguy097 · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Bruise_-_ring_resolution.jpg"
  },
  title: "Bilirubín",
  match: ["bilirubín\\w*"],
  short: "Žltý pigment z rozpadu hemu; preto modriny žltnú.",
  body: "<ul><li>Voľný (nepriamy) bilirubín sa v pečeni konjuguje na priamy.</li><li>Žltačka vzniká pri zvýšenej tvorbe, poruche konjugácie alebo odtoku žlče.</li></ul>"
},
{
  id: "biliverdin", et: "lat. <i>bilis</i> „žlč“ + <i>viridis</i> „zelený“",
  img: {
    src: "assets/images/bruise-ring-resolution.jpg",
    alt: "Modrina 1., 9., 13. a 15. deň – zelenkastý odtieň dáva biliverdín.",
    caption: "Modrina 1., 9., 13. a 15. deň – zelenkastý odtieň dáva biliverdín.",
    credit: "Clarinetguy097 · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Bruise_-_ring_resolution.jpg"
  },
  title: "Biliverdín",
  match: ["biliverdín\\w*"],
  short: "Zelený pigment, na ktorý sa hem mení ako prvý; ďalej sa premení na bilirubín."
},
{
  id: "hematoidin", et: "gr. <i>haima</i> „krv“ + <i>-eides</i> „podobný“",
  title: "Hematoidín",
  match: ["hematoidín\\w*"],
  short: "Kryštáliky bilirubínu v starých krvných výrontoch."
},
{
  id: "albumin", et: "lat. <i>albumen</i> „bielok“",
  title: "Albumín",
  match: ["albumín\\w*"],
  short: "Hlavná bielkovina plazmy a hlavný nositeľ onkotického tlaku.",
  body: "<ul><li>Tvorí sa v pečeni.</li><li>Hypoalbuminémia vzniká pri cirhóze, nefrotickom syndróme a hladovaní.</li></ul>"
},
{
  id: "hypoalbuminemia",
  title: "Hypoalbuminémia",
  match: ["hypoalbuminémi\\w*"],
  short: "Nízka hladina albumínu (málo tvorby v pečeni, strata obličkami) vyvolá edémy."
},
{
  id: "hypoproteinemia",
  title: "Hypoproteinémia",
  match: ["hypoproteinémi\\w*"],
  short: "Nízka koncentrácia bielkovín v plazme."
},
{
  id: "hyperproteinemia",
  title: "Hyperproteinémia",
  match: ["hyperproteinémi\\w*"],
  short: "Zvýšená koncentrácia bielkovín v plazme (napr. pri myelóme)."
},
{
  id: "transaminazy",
  title: "Transaminázy (AST, ALT)",
  match: ["transamináz\\w*", "aspartátaminotransferáz\\w*"],
  short: "Enzýmy, ktoré sa z poškodených hepatocytov uvoľnia do krvi.",
  body: "<ul><li>ALT je špecifickejšia pre pečeň.</li><li>Veľké zvýšenie býva pri vírusovej hepatitíde a toxickom poškodení.</li></ul>"
},
{
  id: "fosfataza",
  title: "Fosfatázy (ALP)",
  match: ["fosfatáz\\w*"],
  short: "Enzýmy zvýšené pri poruche žlčových ciest (cholestáza) a pri zvýšenej tvorbe kosti."
},
{
  id: "leukogram", et: "gr. <i>leukos</i> „biely“ + <i>gramma</i> „záznam“",
  title: "Leukogram (diferenciálny krvný obraz)",
  match: ["leukogram\\w*", "neutrofíli\\w*", "leukocytóz\\w*"],
  short: "Počet jednotlivých druhov leukocytov v krvi. Neutrofília (nárast neutrofilov) sprevádza baktériové infekcie a stres, lymfocytóza vírusové infekcie."
},
{
  id: "transfuzia", et: "lat. <i>transfundere</i> „pretočiť“ (<i>trans</i> „cez“ + <i>fundere</i> „liať“)",
  title: "Transfúzia",
  match: ["transfúzi\\w*"],
  short: "Podanie krvi alebo jej zložiek (erytrocyty, plazma, doštičky) do cievy. Treba zhodu krvných skupín; nezhoda vyvolá hemolytickú reakciu."
},
{
  id: "dialyza", et: "gr. <i>dia</i> „cez“ + <i>lysis</i> „rozpúšťanie, uvoľnenie“",
  title: "Dialýza (hemodialýza)",
  match: ["dialýz\\w*", "hemodialýz\\w*", "dialyzačn\\w*", "dialyzovan\\w*"],
  short: "Mechanické čistenie krvi od odpadov a vody pri zlyhaní obličiek: krv prechádza cez membránu a vymieňa látky s dialyzačným roztokom."
},

/* ── lieky a zákroky ─────────────────────────────────────────────────── */
{
  id: "antibiotika", et: "gr. <i>anti</i> „proti“ + <i>bios</i> „život“",
  title: "Antibiotiká",
  match: ["antibiotik\\w*", "aminoglykozid\\w*"],
  short: "Lieky, ktoré zabíjajú baktérie alebo zastavujú ich rast (penicilíny, aminoglykozidy, makrolidy). Neúčinkujú na vírusy."
},
{
  id: "cytostatika",
  title: "Cytostatiká",
  match: ["cytostatik\\w*"],
  short: "Lieky, ktoré zabíjajú deliace sa bunky; poškodzujú aj zdravé rýchlo sa deliace tkanivá (kostná dreň, sliznice, vlasy) a spomaľujú hojenie."
},
{
  id: "chemoterapia",
  title: "Chemoterapia",
  match: ["chemoterapi\\w*"],
  short: "Liečba nádorov cytostatikami."
},
{
  id: "cyklofosfamid",
  title: "Cyklofosfamid",
  match: ["cyklofosfamid\\w*"],
  short: "Cytostatikum používané pri nádoroch aj pri autoimunite."
},
{
  id: "radioterapia", et: "lat. <i>radius</i> „lúč“ + gr. <i>therapeia</i> „liečenie“",
  title: "Rádioterapia",
  match: ["rádioterapi\\w*"],
  short: "Liečba nádorov žiarením."
},
{
  id: "ionizujuce-ziarenie",
  title: "Ionizujúce žiarenie",
  match: ["ionizujúc\\w*(?:\\s+žiaren\\w*)?", "ožiaren\\w*", "žiaren\\w*"],
  short: "Poškodzuje DNA; rýchlo sa deliace bunky odumierajú. Využíva sa pri liečbe nádorov, v nadbytku škodí (vyvolá nekrózu a nádory)."
},
{
  id: "antiagreganty", et: "gr. <i>anti</i> „proti“ + lat. <i>aggregare</i> „pripojiť do stáda“ (<i>grex</i> „stádo“)",
  title: "Antiagreganciá (aspirín, clopidogrel)",
  match: ["antiagreganci\\w*", "acetylsalicylov\\w*", "aspirín\\w*", "clopidogrel\\w*"],
  short: "Lieky, ktoré bránia zhlukovaniu doštičiek. Kyselina acetylsalicylová nevratne blokuje cyklooxygenázu a tvorbu tromboxánu A₂ v doštičkách."
},
{
  id: "antikoagulancia", et: "gr. <i>anti</i> „proti“ + lat. <i>coagulare</i> „zrážať“; heparín: gr. <i>hepar</i> „pečeň“ (pôvodne z pečene); warfarín: Wisconsin Alumni Research Foundation + kumarín",
  title: "Antikoagulanciá",
  match: ["antikoagulanci\\w*", "antikoagulačn\\w*\\s+lieč\\w*"],
  short: "Lieky, ktoré brzdia tvorbu trombínu alebo jeho účinok, a tým zrážanie krvi.",
  body: "<ul><li><b>Heparín</b> zosilní antitrombín; <b>warfarín</b> blokuje vitamín K, takže faktory II, VII, IX a X sú nefunkčné; novšie lieky priamo blokujú faktor Xa alebo trombín.</li><li>Predávkovanie vyvolá krvácanie.</li></ul>"
},
{
  id: "nsaid", et: "antiflogistiká: gr. <i>anti</i> „proti“ + <i>phlogistos</i> „zapálený“ (<i>phlegein</i> „horieť“)",
  title: "NSAID (nesteroidné antiflogistiká; angl. nonsteroidal anti-inflammatory drugs)",
  match: ["NSAID", "nesteroidn\\w*", "antiflogistik\\w*", "cyklooxygenáz\\w*", "COX-?[12]"],
  short: "Lieky (ibuprofén, diklofenak), ktoré blokujú cyklooxygenázu a tvorbu prostaglandínov. Tlmia bolesť, zápal a horúčku, ale poškodzujú žalúdočnú sliznicu."
},
{
  id: "antihistaminika",
  title: "Antihistaminiká",
  match: ["antihistaminik\\w*"],
  short: "Lieky, ktoré blokujú histamínový receptor H₁ a tlmia prejavy alergie (svrbenie, kýchanie, opuch)."
},
{
  id: "debridement", et: "franc. <i>débridement</i> „uvoľnenie z pút“",
  title: "Débridement",
  match: ["débridement\\w*", "debridement\\w*"],
  short: "Chirurgické odstránenie mŕtveho a infikovaného tkaniva z rany.",
  body: "<ul><li>Odstráni živnú pôdu pre baktérie a umožní vznik granulačného tkaniva.</li></ul>"
},
{
  id: "nekrektomia", et: "gr. <i>nekros</i> „mŕtvy“ + <i>ektome</i> „vyrezanie“",
  title: "Nekrektómia",
  match: ["nekrektómi\\w*", "excíz\\w*"],
  short: "Chirurgické vyrezanie nekrotického tkaniva."
},
{
  id: "amputacia", et: "lat. <i>amputare</i> „odrezať“ (<i>am-</i> „okolo“ + <i>putare</i> „strihať“)",
  img: {
    src: "assets/images/gangrene-foot.jpg",
    alt: "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    caption: "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    credit: "آرمین · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Gangrene_Foot_01.jpg"
  },
  title: "Amputácia",
  match: ["amputáci\\w*", "amputačn\\w*"],
  short: "Chirurgické odstránenie časti končatiny pri gangréne, ťažkej infekcii, nádore alebo ťažkom úraze."
},
{
  id: "dehiscencia", et: "lat. <i>dehiscere</i> „roztvoriť sa“ (<i>hiscere</i> „zívať“)",
  img: {
    src: "assets/images/wound-dehiscence.jpg",
    alt: "Dehiscencia: rozostúpenie okrajov rany po operácii.",
    caption: "Dehiscencia: rozostúpenie okrajov rany po operácii.",
    credit: "Phoenix119 · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Wound_Dehiscence_post_inguinal_hernia_repair_2014-05-27_00-46.jpg"
  },
  title: "Dehiscencia rany",
  match: ["dehiscenci\\w*\\s+ran\\w*", "dehiscenci\\w*"],
  short: "Rozídenie okrajov chirurgickej rany po úplnom alebo čiastočnom pretrhnutí stehov. Príčinou býva infekcia, nadmerné napätie alebo zlé hojenie."
},
{
  id: "biofilm", et: "gr. <i>bios</i> „život“ + angl. <i>film</i> „blanka“",
  title: "Biofilm",
  match: ["biofilm\\w*"],
  short: "Spoločenstvo baktérií v lepkavej matrix na povrchu (rana, katéter, zub). Chráni ich pred imunitou a antibiotikami, preto chronické rany so stálym biofilmom nehoja."
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "pd-l1", et: "angl. <i>programmed death-ligand 1</i> – ligand receptora programovanej bunkovej smrti 1",
  img: {
    src: "assets/images/pdl1-nsclc.jpg",
    alt: "PD-L1 na nádorových bunkách nemalobunkového karcinómu pľúc (IHC): hnedá membránová pozitivita.",
    caption: "PD-L1 na nádorových bunkách nemalobunkového karcinómu pľúc (IHC): hnedá membránová pozitivita.",
    credit: "Ventana Medical Systems Inc. · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Figure_4b_PD-L1_staining_in_NSCLC.tif"
  },
  title: "PD-L1 (angl. programmed death-ligand 1)",
  match: ["PD-L1", "PD-1"],
  short: "Bielkovina na povrchu nádorových a imunitných buniek, ktorá po naviazaní na receptor PD-1 zabrzdí T-lymfocyt. Lieky, ktoré túto brzdu uvoľnia, zaberú tým lepšie, čím viac nádorových buniek má PD-L1 na membráne (skóre TPS)."
},
{
  id: "imprint-cytologia",
  img: {
    src: "assets/images/imprint-cytology-scc.jpg",
    alt: "Odtlačková cytológia dlaždicobunkového karcinómu (H&E, 400×).",
    caption: "Odtlačková cytológia dlaždicobunkového karcinómu (H&E, 400×).",
    credit: "Naveed H., Abid M., Hashmi A. A., Edhi M. M. a kol. · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Touch_prep_cytology_of_poorly_differentiated_squamous_cell_carcinoma.jpg"
  },
  title: "Odtlačková cytológia (imprint)",
  match: ["imprint\\w*"],
  short: "Bunky sa z čerstvej reznej plochy tkaniva odtlačia priamo na sklíčko. Výsledok je rýchly a dopĺňa zmrazený rez či biopsiu, no architektúru tkaniva neukáže."
},
{
  id: "digitalna-patologia",
  img: {
    src: "assets/images/whole-slide-prostate.jpg",
    alt: "Celé sklíčko (polovica prostaty s adenokarcinómom) naskenované stolovým skenerom.",
    caption: "Celé sklíčko (polovica prostaty s adenokarcinómom) naskenované stolovým skenerom.",
    credit: "Alex_brollo · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Prostate_adenocarcinoma_whole_slide.jpg"
  },
  title: "Digitálna patológia (whole slide imaging)",
  match: ["digitáln\\w*\\s+patológi\\w*", "whole\\s+slide\\s+imaging"],
  short: "Skener nasníma celé sklíčko po políčkach a zloží ich do jedného obrazu, ktorý možno prezerať na diaľku a analyzovať algoritmami (počítanie mitóz, kvantifikácia markerov)."
}

);

/* Glosár PATOLY — spoločné mechanizmy (energia, vápnik, enzýmy, typy smrti), zápal a hojenie,
   farbenia, laboratórne markery a klinické skratky. Texty sú vlastné (CLAUDE.md §4.1).
   Pozor: vyhľadávanie ignoruje veľkosť písmen — skratky, ktoré sú aj bežným slovom
   (MI, MA, IM, AL), sa zámerne nechytajú. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── zápal a hojenie ─────────────────────────────────────────────────── */
{
  id: "zapal", et: "lat. <i>inflammare</i> „zapáliť“ (<i>in</i> „do“ + <i>flamma</i> „plameň“)",
  img: {
    src: "assets/images/cellulitis-leg-foot.jpg",
    alt: "Zápal navonok: začervenanie a opuch pri celulitíde.",
    caption: "Zápal navonok: začervenanie a opuch pri celulitíde.",
    credit: "cbinrva · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Cellulitis_of_lower_leg_and_foot.jpg"
  },
  title: "Zápal (inflamácia)",
  match: ["zápal\\w*", "inflamáci\\w*", "zapálen\\w*"],
  short: "Obranná reakcia živého tkaniva s cievami na poškodenie — privedie k miestu tekutinu a bunky, odstráni príčinu a spustí hojenie.",
  body:
    '<p class="chain">poškodenie (mikróby, nekróza) → rozpoznanie (DAMP, PAMP) → mediátory → <b>cievna reakcia</b> (vazodilatácia, ↑ priepustnosť → exsudát) → <b>leukocyty</b> prejdú do tkaniva → odstránenie príčiny → <b>hojenie</b></p>' +
    '<div class="fork">' +
      "<div><b>Akútny</b><br>hodiny až dni<br>exsudát, neutrofily</div>" +
      "<div><b>Chronický</b><br>týždne a dlhšie<br>lymfocyty, makrofágy, plazmocyty, fibróza</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Zápal je podmienený <b>živým tkanivom s cievami</b> — preto jeho prítomnosť okolo mŕtveho tkaniva dokazuje, že smrť nastala za života (vitálna reakcia).</p>'
},
{
  id: "alteracia", et: "lat. <i>alterare</i> „zmeniť“ (<i>alter</i> „iný“)",
  title: "Alterácia",
  match: ["alterác\\w*", "alteratívn\\w*"],
  short: "Poškodenie tkaniva na začiatku zápalu — od dystrofie po nekrózu.",
  body:
    '<p class="chain">príčina zápalu → <b>poškodené bunky</b> uvoľnia mediátory a DAMP → spustia cievnu reakciu (exsudáciu) a prílev buniek (infiltráciu)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Čím väčšia alterácia, tým väčší defekt ostane a tým skôr sa tkanivo hojí <b>jazvou</b> namiesto regenerácie.</p>'
},
{
  id: "infiltrat", et: "lat. <i>in</i> „do“ + <i>filtrum</i> „plstené cedidlo“ – presakovanie do tkaniva",
  img: {
    src: "assets/images/lymphocytic-myocarditis.jpg",
    alt: "Lymfocytárna myokarditída: infiltrát medzi kardiomyocytmi.",
    caption: "Lymfocytárna myokarditída: infiltrát medzi kardiomyocytmi.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_myocarditis_with_myocyte_necrosis.jpg"
  },
  title: "Zápalový infiltrát",
  match: ["infiltrát\\w*", "infiltráci\\w*", "celulizáci\\w*"],
  short: "Nahromadenie zápalových buniek v tkanive — jeho zloženie prezrádza, aký je zápal starý a čo ho vyvolalo.",
  body:
    "<ul>" +
      "<li><b>Neutrofily</b> — akútny zápal, baktérie (prvých 6–24 h).</li>" +
      "<li><b>Makrofágy</b> — od 24–48 h, upratovanie a hojenie.</li>" +
      "<li><b>Lymfocyty, plazmocyty</b> — vírusy, autoimunita, chronický zápal.</li>" +
      "<li><b>Eozinofily</b> — alergia, parazity.</li>" +
    "</ul>"
},
{
  id: "leukocyty", et: "gr. <i>leukos</i> „biely“ + <i>kytos</i> „bunka“",
  img: {
    src: "assets/images/abscess-histology.jpg",
    alt: "Absces: hustý infiltrát neutrofilov a nekrotický detritus.",
    caption: "Absces: hustý infiltrát neutrofilov a nekrotický detritus.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_abscess.jpg"
  },
  title: "Leukocyty (biele krvinky)",
  match: ["leukocyt\\w*", "granulocyt\\w*"],
  short: "Bunky imunity, ktoré sa krvou dostanú na miesto zápalu a prejdú cez stenu cievy do tkaniva.",
  body:
    "<ul>" +
      "<li><b>Granulocyty</b> — neutrofily, eozinofily, bazofily (granuly s enzýmami a mediátormi).</li>" +
      "<li><b>Monocyty</b> — v tkanive sa menia na makrofágy.</li>" +
      "<li><b>Lymfocyty</b> — B (→ plazmocyty, protilátky), T, NK.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Do tkaniva sa dostanú len cez <b>leukocytovú kaskádu</b> (rolling, adhézia, diapedéza, chemotaxia).</p>'
},
{
  id: "fagocytoza", et: "gr. <i>phagein</i> „jesť“ + <i>kytos</i> „bunka“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/pseudomonas-phagocytosis.jpg",
    alt: "Fagocytóza: neutrofil pohltil baktérie Pseudomonas aeruginosa.",
    caption: "Fagocytóza: neutrofil pohltil baktérie Pseudomonas aeruginosa.",
    credit: "Paulo Henrique Orlandi Mourao · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Pseudomonas_aeruginosa_smear_MGG_2010-02-10.JPG"
  },
  title: "Fagocytóza",
  match: ["fagocyt\\w*"],
  short: "Pohltenie častice bunkou (neutrofilom, makrofágom) a jej strávenie v lyzozóme.",
  body:
    '<p class="chain">rozpoznanie (opsoníny, „zjedz ma“ signál) → obalenie membránou → fagozóm → splynie s lyzozómom → <b>strávenie</b> (enzýmy, ROS)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Apoptotické telieska sa fagocytujú potichu, baktérie a nekrotické zvyšky so zápalom — enzýmy a ROS fagocytov môžu uniknúť a poškodiť okolie.</p>'
},
{
  id: "komplement", et: "lat. <i>complementum</i> „doplnok“ (<i>complere</i> „dopĺňať“)",
  title: "Komplement",
  match: ["komplement\\w*", "C3b"],
  short: "Kaskáda plazmatických bielkovín, ktorá označí, priláka a zabije mikróby.",
  body: "<ul><li>Tri dráhy aktivácie: klasická (protilátky), alternatívna a lektínová.</li><li>Spoločný krok: C3 → C3b.</li><li>Výsledok: opsonizácia (C3b), anafylatoxíny (C3a, C5a) a lýza (C5b–9).</li></ul><ul><li>C3b opsonizuje, komplex C5b–9 prederaví membránu.</li></ul>"
},
{
  id: "imunokomplex", et: "lat. <i>immunis</i> „chránený“ + <i>complexus</i> „zovretie“",
  title: "Imunokomplex",
  match: ["imunokomplex\\w*"],
  short: "Protilátka naviazaná na antigén, ktorá aktivuje komplement.",
  body: "<p class=\"chain\">imunokomplex v stene cievy → aktivácia komplementu → C5a priláka neutrofily → neutrofily uvoľnia enzýmy → poškodenie steny (fibrinoid)</p><p class=\"why\"><b>Prečo to je dôležité.</b> Je to podstata precitlivenosti III. typu (vaskulitídy, SLE).</p>"
},
{
  id: "arthus", et: "podľa Maurice Arthusa",
  title: "Arthusov fenomén",
  match: ["Arthusov\\w*(?:\\s+fenomén\\w*)?", "Arthus\\w*"],
  short: "Miestna imunokomplexová reakcia v koži po opakovanom podaní antigénu.",
  body: "<ul><li>Vzniká pri opakovanom podaní antigénu u človeka s protilátkami IgG.</li><li>Reakcia vrcholí po hodinách: opuch, krvácanie, nekróza.</li></ul><ul><li>Imunokomplexy v stene ciev → komplement → nekróza (fibrinoid).</li></ul>"
},
{
  id: "edem", et: "gr. <i>oidema</i> „opuch“ (<i>oidein</i> „puchnúť“)",
  title: "Edém (opuch)",
  match: ["edém\\w*", "edematózn\\w*"],
  img: {
    "src": "assets/images/pitting-edema.jpg",
    "alt": "Edém predkolenia s jamkou po zatlačení.",
    "caption": "Edém predkolenia s jamkou po zatlačení.",
    "credit": "James Heilman, MD · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pitting_Edema2008.jpg"
  },
  short: "Nadbytok tekutiny v interstíciu — zápalový (exsudát) alebo nezápalový (transsudát).",
  body: "<ul><li>Môže byť lokálny (zápal, uzáver žily alebo lymfy) alebo celkový (srdce, obličky, pečeň).</li><li>Edém s nízkym obsahom bielkovín nechá po zatlačení jamku.</li></ul><div class=\"fork\"><div><b>Zápalový</b><br>↑ priepustnosť ciev<br>bohatý na bielkoviny</div><div><b>Nezápalový</b><br>↑ hydrostatický / ↓ onkotický tlak, zlá lymfatická drenáž<br>chudobný na bielkoviny</div></div>"
},
{
  id: "serozny", et: "lat. <i>serum</i> „srvátka, vodnatá tekutina“",
  title: "Serózny zápal",
  match: ["serózn\\w*\\s+zápal\\w*", "serózn\\w*\\s+exsudát\\w*", "serózn\\w*\\s+výpot\\w*"],
  img: {
    "src": "assets/images/serous-blister.jpg",
    "alt": "Serózny zápal: pľuzgier s čírou tekutinou pod epidermou.",
    "caption": "Serózny zápal: pľuzgier s čírou tekutinou pod epidermou.",
    "credit": "Hanabishi · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Acute_serous_inflammation.jpg"
  },
  short: "Exsudát riedky ako krvné sérum — málo bielkovín a buniek; vzniká pri slabom podnete.",
  body: "<ul><li>Typické príklady: pľuzgier po popálení, výpotok do pleurálnej dutiny, alergická nádcha.</li><li>Býva pri vírusových infekciách, alergii a popáleninách.</li></ul><p class=\"chain\">slabý podnet → vazodilatácia a mierne ↑ priepustnosť → <b>vodnatý exsudát</b> → resorpcia → hojenie bez defektu</p>"
},
{
  id: "serozne-blany",
  title: "Serózne blany",
  match: ["serózn\\w*\\s+blan\\w*"],
  img: {
    "src": "assets/images/fibrinous-pericarditis.jpg",
    "alt": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "caption": "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    "credit": "K. Bielnik a kol. · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pericarditis_fibrinosa.jpg"
  },
  short: "Pleura, perikard a peritoneum — hladké blany vystielajúce telesné dutiny.",
  body: "<ul><li>Majú dva listy — parietálny a viscerálny — a medzi nimi tenkú vrstvu tekutiny.</li><li>Vystiela ich mezotel.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Zápal na nich tvorí výpotok do dutiny; fibrín, ktorý sa nerozpustí, zlepí listy do <b>zrastov</b>.</p>"
},
{
  id: "regeneracia", et: "lat. <i>regenerare</i> „znovu zrodiť“ (<i>re-</i> „znova“ + <i>generare</i> „plodiť“); <i>ad integrum</i> „do pôvodného stavu“ = „do celosti“ (<i>integer</i> „neporušený“)",
  title: "Regenerácia (ad integrum)",
  match: ["regenerác\\w*", "regeneruj\\w*", "zregener\\w*", "ad\\s+integrum"],
  short: "Náhrada zaniknutých buniek rovnakými bunkami — tkanivo sa obnoví bez jazvy.",
  body:
    '<p class="chain">zaniknuté bunky + <b>zachovaná kostra</b> (bazálna membrána, retikulín) + bunky schopné delenia → nové bunky vystelú pôvodnú kostru → <b>pôvodná stavba</b></p>' +
    "<ul>" +
      "<li><b>Delia sa stále</b> — epitel kože a slizníc, kostná dreň.</li>" +
      "<li><b>Delia sa na podnet</b> — hepatocyty, tubulárny epitel.</li>" +
      "<li><b>Nedelia sa</b> — kardiomyocyty, neuróny → vždy jazva (alebo glióza).</li>" +
    "</ul>"
},
{
  id: "jazva",
  title: "Jazva",
  match: ["jazv\\w*"],
  img: {
    "src": "assets/images/mi-healing-4-scar.jpg",
    "alt": "Zrelá jazva: husté zväzky kolagénu s málo bunkami.",
    "caption": "Zrelá jazva: husté zväzky kolagénu s málo bunkami.",
    "credit": "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_dense_fibrous_scar_replacing_myocyte_loss_in_myocardial_infarction.jpg"
  },
  short: "Náhrada zaniknutého tkaniva kolagénovým väzivom — defekt sa zacelí, ale funkcia sa stratí.",
  body: "<p class=\"chain\">zničená kostra alebo nedeliace sa bunky → granulačné tkanivo (TGF-β) → fibroblasty ukladajú kolagén → cievy ustupujú → jazva</p><p class=\"why\"><b>Prečo to je dôležité.</b> Jazva v orgáne je trvalá strata funkčného tkaniva — v pečeni cirhóza, v myokarde po infarkte.</p>"
},
{
  id: "fibroza", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/scar-collagen-polarized.jpg",
    alt: "Kolagén v jazve v polarizovanom svetle (picrosirius red).",
    caption: "Kolagén v jazve v polarizovanom svetle (picrosirius red).",
    credit: "PW31 · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Scar_collagen.jpg"
  },
  title: "Fibróza",
  match: ["fibróz\\w*", "fibrotizác\\w*", "fibrotick\\w*", "sklerotizác\\w*"],
  short: "Nadmerné ukladanie kolagénového väziva v orgáne; v pľúcach, pečeni či myokarde stráca funkčné tkanivo.",
  body: "<ul><li>Jazva nahrádza zaniknuté tkanivo, fibróza stuhne zachovaný orgán.</li><li>Príklady: pľúcna fibróza, cirhóza, fibróza myokardu.</li></ul><ul><li>Vyvoláva ju dlhodobé poškodenie a zápal; kľúčový je TGF-β.</li><li>Postihnutý orgán stuhne a stratí poddajnosť.</li></ul>"
},
{
  id: "organizacia", et: "gr. <i>organon</i> „nástroj, orgán“ (organizovať = utvoriť do funkčného celku)",
  title: "Organizácia",
  match: ["organizáci\\w*", "organizuj\\w*", "karnifikáci\\w*"],
  img: {
    "src": "assets/images/mi-healing-2-granulation.jpg",
    "alt": "Organizácia infarktu: granulačné tkanivo vrastá do nekrózy.",
    "caption": "Organizácia infarktu: granulačné tkanivo vrastá do nekrózy.",
    "credit": "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_granulation_tissue_with_formation_of_microvessels_in_myocardial_infarction.jpg"
  },
  short: "Prerastenie nerozpusteného materiálu (fibrín, trombus, nekróza) granulačným tkanivom až na väzivo.",
  body: "<ul><li>Postihuje trombus, hematóm, fibrinózny exsudát aj infarkt.</li><li>Výsledok: jazva, zrasty alebo organizovaný trombus.</li></ul><p class=\"chain\">fibrín sa nestihne rozpustiť → vrastú kapiláry a fibroblasty → <b>väzivo na mieste exsudátu</b> → zrasty; v pľúcach <b>karnifikácia</b> (tuhé „mäsité“ pľúca)</p>"
},
{
  id: "pseudocysta", et: "gr. <i>pseudes</i> „nepravý“ + <i>kystis</i> „mechúr, vačok“",
  title: "Pseudocysta",
  match: ["pseudocyst\\w*"],
  img: {
    "src": "assets/images/brain-infarct-histology.jpg",
    "alt": "Skvapalnená nekróza mozgu — z nej ostáva cystická dutina.",
    "caption": "Skvapalnená nekróza mozgu — z nej ostáva cystická dutina.",
    "credit": "Patho · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Organizing_ischemic_cerebral_infarction,_HE_4.JPG"
  },
  short: "Dutina bez epitelovej výstelky, ktorá ostane po resorpcii kolikvačnej nekrózy (mozog, pankreas).",
  body: "<ul><li>Typicky po akútnej pankreatitíde (tekutina okolo pankreasu) a v mozgu po infarkte.</li><li>Stenu tvorí väzivo alebo glióza, nie epitel.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Pravá cysta má epitel, pseudocysta len stenu z gliózy alebo väziva.</p>"
},
{
  id: "lobarna-pneumonia", et: "lobárna: gr. <i>lobos</i> „lalok“; pneumónia: gr. <i>pneumon</i> „pľúca“",
  title: "Krupózna (lobárna) pneumónia",
  match: ["krupózn\\w*\\s+pneumóni\\w*", "lobárn\\w*\\s+pneumóni\\w*", "hepatizáci\\w*"],
  short: "Fibrinózny zápal celého laloka pľúc, typicky pneumokokový — prebieha v štádiách.",
  body:
    '<p class="chain">kongescia → <b>červená hepatizácia</b> (erytrocyty, neutrofily, fibrín) → <b>sivá hepatizácia</b> (rozpad erytrocytov, fibrín) → <b>rezolúcia</b> (fibrín sa rozpustí)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Steny alveol ostávajú celé, preto sa pľúca obvykle obnovia bez jazvy. Ak sa fibrín nerozpustí → karnifikácia.</p>'
},
{
  id: "lad",
  title: "Deficit adhézie leukocytov (LAD; angl. leukocyte adhesion deficiency)",
  match: ["LAD", "deficit\\w*\\s+adhézi\\w*\\s+leukocyt\\w*"],
  short: "Vrodená porucha, pri ktorej sa leukocyty nevedia prichytiť na endotel a opustiť cievu.",
  body:
    '<div class="fork">' +
      "<div><b>LAD 1</b><br>chýba β2-integrín (CD18)<br>chýba pevná adhézia</div>" +
      "<div><b>LAD 2</b><br>chýba sialyl-Lewis X<br>chýba rolling</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> V krvi je veľa neutrofilov, v tkanive žiadne → opakované bakteriálne infekcie <b>bez hnisu</b>. Dôkaz, že každý krok kaskády je nevyhnutný.</p>'
},
{
  id: "light",
  title: "Lightove kritériá",
  match: ["Lightov\\w*\\s+kritéri\\w*"],
  short: "Pravidlo na rozlíšenie pleurálneho exsudátu od transsudátu podľa bielkovín a LD vo výpotku a v sére.",
  body:
    "<p>Exsudát, ak platí <b>aspoň jedno</b>:</p>" +
    "<ul>" +
      "<li>bielkoviny výpotok / sérum &gt; 0,5</li>" +
      "<li>LD výpotok / sérum &gt; 0,6</li>" +
      "<li>LD vo výpotku &gt; ⅔ hornej hranice normy v sére</li>" +
    "</ul>"
},
{
  id: "trombus", et: "gr. <i>thrombos</i> „zrazenina, hrudka“",
  title: "Trombus",
  match: ["trombus", "trombu", "tromby", "trombov", "trombmi", "trombom", "trombe", "trombami", "trombách"],
  img: {
    src: "assets/images/gl-trombus-rast.svg",
    alt: "Štyri prierezy cievou: poškodený endotel, nástenný trombus, zúžený priesvit a uzáver.",
    caption: "Ako trombus v cieve rastie a zužuje priesvit.",
    credit: "vlastná schéma · CC BY-NC-SA 4.0"
  },
  short: "Zrazenina krvi vytvorená za života v cieve alebo srdci, prichytená k stene.",
  body: "<ul><li>Pozostáva z doštičiek, fibrínu a erytrocytov v rôznom pomere.</li><li>V tepnách rastie smerom proti toku krvi, v žilách po toku.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Na rozdiel od posmrtnej zrazeniny je trombus priľnavý k stene, matný a vrstevnatý.</p>"
},
{
  id: "tromboza", et: "gr. <i>thrombos</i> „zrazenina“ + <i>-osis</i> „stav, proces“",
  title: "Trombóza",
  match: ["trombóz\\w*", "trombotiz\\w*"],
  short: "Vznik trombu v cieve alebo srdci za života.",
  body: "<ul><li>Arteriálna vzniká najmä pri poškodení steny (aterosklerotický plát).</li><li>Venózna vzniká pri stáze a zvýšenej zrážanlivosti.</li></ul><p class=\"chain\">poškodený endotel + spomalený tok + ↑ zrážanlivosť (Virchowova trias) → trombus → uzáver cievy (ischémia, infarkt) alebo odlomenie (embólia)</p>"
},
{
  id: "sepsa", et: "gr. <i>sepsis</i> „hnitie, rozklad“ (<i>sepein</i> „hniť“)",
  img: {
    src: "assets/images/adrenal-hemorrhage-wfs.jpg",
    alt: "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    caption: "Krvácanie do nadobličiek (Waterhouseov–Friderichsenov syndróm).",
    credit: "Amadalvarez · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Waterhouse-Friderichsen._IMG_2912.jpg"
  },
  title: "Sepsa",
  match: ["seps\\w*", "septick\\w*"],
  short: "Život ohrozujúca porucha funkcie orgánov pri nekontrolovanej odpovedi organizmu na infekciu.",
  body:
    '<p class="chain">infekcia → masívne uvoľnenie cytokínov → vazodilatácia, ↑ priepustnosť ciev, poškodený endotel → ↓ perfúzia orgánov → <b>zlyhanie orgánov</b></p>' +
    '<p><b>Septický šok</b> = sepsa, pri ktorej treba vazopresory na udržanie MAP ≥ 65 mm Hg a laktát je &gt; 2 mmol/l napriek doplneniu tekutín (Sepsis-3, 2016).</p>' +
    '<p class="why"><b>Prečo tekutiny prestanú pomáhať.</b> Rozšírené cievy pojmú oveľa viac krvi, než je v obehu, a poškodený endotel prepúšťa tekutinu do tkanív (edém). Doplnený objem preto nezvýši žilový návrat, srdcový výdaj ani tlak – treba cievy zúžiť liekmi.</p>'
},
{
  id: "sofa",
  title: "SOFA — skóre zlyhania orgánov (angl. Sequential Organ Failure Assessment)",
  match: ["SOFA", "qSOFA"],
  short: "<i>Sequential Organ Failure Assessment</i>: každý zo šiestich orgánových systémov dostane 0–4 body podľa miery zlyhania (spolu 0–24).",
  body:
    "<ul>" +
      "<li><b>pľúca</b> — pomer PaO₂/FiO₂ (ako dobre krv prijíma kyslík)</li>" +
      "<li><b>zrážanie</b> — počet trombocytov</li>" +
      "<li><b>pečeň</b> — bilirubín</li>" +
      "<li><b>obeh</b> — MAP a potreba vazopresorov</li>" +
      "<li><b>mozog</b> — Glasgowská škála bezvedomia</li>" +
      "<li><b>obličky</b> — kreatinín alebo množstvo moču</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Vzostup o ≥ 2 body pri infekcii = <b>sepsa</b> podľa Sepsis-3. Rýchly skríning pri lôžku je <b>qSOFA</b> (dych ≥ 22/min, zmenené vedomie, systolický tlak ≤ 100 mm Hg; ≥ 2 z 3 = vysoké riziko).</p>'
},
{
  id: "sirs",
  title: "SIRS — syndróm systémovej zápalovej odpovede (angl. systemic inflammatory response syndrome)",
  match: ["SIRS"],
  short: "Celková zápalová reakcia s aspoň dvoma zo štyroch kritérií; dnes sa už nepoužíva na definíciu sepsy.",
  body:
    "<ul>" +
      "<li><b>teplota</b> &gt; 38 °C alebo &lt; 36 °C</li>" +
      "<li><b>pulz</b> &gt; 90/min</li>" +
      "<li><b>dych</b> &gt; 20/min alebo PaCO₂ &lt; 4,3 kPa (32 mm Hg)</li>" +
      "<li><b>leukocyty</b> &gt; 12 alebo &lt; 4 × 10⁹/l, alebo &gt; 10 % nezrelých foriem</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo ho opustili.</b> Kritériá splní aj pacient po operácii či s chrípkou bez ohrozenia života – nerozlišujú neškodnú odpoveď od zlyhávania orgánov.</p>'
},
{
  id: "mods",
  img: {
    src: "assets/images/shock-liver.jpg",
    alt: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    caption: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_shock_liver.jpg"
  },
  title: "MODS — syndróm multiorgánovej dysfunkcie (angl. multiple organ dysfunction syndrome)",
  match: ["MODS", "multiorgánov\\w*"],
  short: "Postupné zlyhávanie dvoch a viacerých orgánov u ťažko chorého, pri ktorom telo bez liečby neudrží rovnováhu.",
  body:
    '<p class="chain">hypoperfúzia + mikrotromby + cytokíny → poškodenie buniek v orgánoch → zlyhá napr. oblička → hromadia sa toxíny a tekutina → zaťažia srdce a pľúca → ďalší orgán zlyhá</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Každý zlyhaný orgán zhoršuje ostatné, preto úmrtnosť stúpa s počtom zlyhaných orgánov.</p>'
},
{
  id: "map",
  title: "MAP — stredný arteriálny tlak (angl. mean arterial pressure)",
  match: ["MAP", "stredn\\w* arteriáln\\w* tlak\\w*"],
  short: "Priemerný tlak v tepnách počas celého srdcového cyklu; ≈ diastolický + ⅓ (systolický − diastolický), norma ≈ 70–100 mm Hg.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> MAP poháňa krv cez orgány. Pod ≈ 65 mm Hg obličky, mozog a srdce prestávajú udržať prietok – preto je to cieľ liečby septického šoku.</p>'
},
{
  id: "vazopresory", et: "lat. <i>vas</i> „cieva“ + <i>premere</i> „tlačiť“ (zvyšujú tlak v cievach)",
  title: "Vazopresory",
  match: ["vazopresor\\w*"],
  short: "Lieky, ktoré zúžia cievy a tým zvýšia krvný tlak (napr. noradrenalín cez α₁-receptory).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri septickom šoku sú cievy rozšírené tak, že tekutina tlak nezvýši; potreba vazopresorov na udržanie MAP ≥ 65 mm Hg je súčasť definície septického šoku.</p>'
},
{
  id: "tbc", et: "tuberkulóza: lat. <i>tuberculum</i> „hrbolček“ (zdrobnenina <i>tuber</i> „hrča“)",
  img: {
    src: "assets/images/caseating-granuloma.jpg",
    alt: "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    caption: "Kazeifikujúci granulóm v tuberkulóznej lymfatickej uzline.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_4X.jpg"
  },
  title: "Tuberkulóza (TBC; angl. tuberculosis, TB)",
  match: ["TBC", "tuberkulóz\\w*", "tuberkulózn\\w*", "mykobaktéri\\w*"],
  short: "Infekcia <i>Mycobacterium tuberculosis</i> — vzor granulomatózneho zápalu s kazeóznou nekrózou.",
  body:
    '<p class="chain">mykobaktéria prežíva v makrofágu → Th1 lymfocyty → IFN-γ → <b>granulóm</b> (epiteloidné bunky, Langhansove obrovské bunky) → v strede <b>kazeózna nekróza</b> → kalcifikácia alebo skvapalnenie a šírenie</p>'
},

/* ── bunka: energia, vápnik, enzýmy ──────────────────────────────────── */
{
  id: "atp", et: "angl. <i>adenosine triphosphate</i>",
  title: "ATP",
  match: ["ATP"],
  short: "Energetická mena bunky: pohlcuje a uvoľňuje energiu pre pumpy, syntézu bielkovín a pohyb.",
  body: "<ul><li>Pri odštiepení fosfátu na ADP uvoľní energiu.</li><li>Vzniká v mitochondriách oxidatívnou fosforyláciou a v cytoplazme glykolýzou.</li><li>Bez dostatku kyslíka jeho tvorba prudko klesne.</li></ul><ul><li>Poháňa iónové pumpy (Na⁺/K⁺-ATPáza, Ca²⁺-ATPáza).</li><li>Pokles ATP je prvý krok hypoxického poškodenia.</li></ul>"
},
{
  id: "mitochondria", et: "gr. <i>mitos</i> „niť“ + <i>chondrion</i> „zrnko“",
  title: "Mitochondrie",
  match: ["mitochondri\\w*"],
  short: "Organely, v ktorých vzniká väčšina ATP; rozhodujú aj o živote a smrti bunky.",
  body: "<ul><li>Majú vlastnú DNA, ktorá sa dedí po matke.</li><li>Vnútorná membrána tvorí kristy.</li><li>Pór MPT sa pri poškodení otvorí a bunka sa dostane za hranicu nezvratnosti.</li></ul><ul><li>Trvalé zlyhanie mitochondrií je znak nezvratného poškodenia.</li><li>Po prederavení membrány unikne cytochróm c a spustí apoptózu.</li></ul>"
},
{
  id: "oxidativna-fosforylacia",
  title: "Oxidatívna fosforylácia",
  match: ["oxidatívn\\w*\\s+fosforyláci\\w*"],
  short: "Tvorba ATP v mitochondrii z energie dýchacieho reťazca; potrebuje kyslík.",
  body: "<ul><li>Prebieha na vnútornej membráne mitochondrie.</li><li>Z jednej glukózy dá asi 30 ATP (glykolýza len 2).</li><li>Cyanid a oxid uhoľnatý blokujú dýchací reťazec.</li></ul><p class=\"chain\">O₂ → dýchací reťazec → gradient protónov → ATP-syntáza → ATP</p>"
},
{
  id: "glykolyza", et: "gr. <i>glykys</i> „sladký“ + <i>lysis</i> „rozpúšťanie“",
  title: "Glykolýza",
  match: ["anaeróbn\\w*\\s+glykolýz\\w*", "glykolýz\\w*"],
  short: "Rozklad glukózy v cytoplazme; bez kyslíka dáva málo ATP a laktát.",
  body: "<ul><li>Čistý zisk 2 ATP z jednej glukózy.</li><li>Laktát znižuje pH cytoplazmy a poškodzuje bunku.</li></ul><p class=\"chain\">bez O₂ → anaeróbna glykolýza → málo ATP → laktát → ↓ pH</p>"
},
{
  id: "vapnik",
  title: "Vápnik (Ca²⁺) v poškodenej bunke",
  match: ["Ca²⁺", "Ca²⁺-\\w+", "vápnik\\w*"],
  short: "V cytosole je Ca²⁺ normálne asi 10 000× menej než mimo bunky; jeho prílev zapína enzýmy, ktoré bunku rozkladajú.",
  body:
    '<p class="chain">↓ ATP alebo poškodená membrána → zlyhajú Ca²⁺-pumpy → <b>↑ Ca²⁺ v cytosole</b> → fosfolipázy (membrány), proteázy (cytoskelet), endonukleázy (DNA), otvorenie póru MPT (mitochondria)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vápnik mení energetickú krízu na <b>rozklad bunky</b> — je spojkou medzi hypoxiou a nekrózou.</p>'
},
{
  id: "mpt",
  title: "Pór MPT (mitochondrial permeability transition)",
  match: ["pór\\w*\\s+MPT", "MPT", "mitochondriov\\w*\\s+pór\\w*"],
  short: "Kanál vo vnútornej membráne mitochondrie; jeho trvalé otvorenie je bod, odkiaľ niet návratu.",
  body:
    '<p class="chain">↑ Ca²⁺ v mitochondrii + ROS + normálne pH → <b>pór sa otvorí</b> → stratí sa membránový potenciál → ATP sa nevytvorí ani s kyslíkom → smrť bunky</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri ischémii ho drží zatvorený kyslé pH; otvára sa najmä pri <b>reperfúzii</b>.</p>'
},
{
  id: "ros",
  title: "Voľné kyslíkové radikály (ROS; angl. reactive oxygen species)",
  match: ["ROS", "voľn\\w*\\s+radikál\\w*", "kyslíkov\\w*\\s+radikál\\w*", "radikál\\w*", "oxidačn\\w*\\s+stres\\w*", "peroxidáci\\w*\\s+lipid\\w*"],
  short: "Reaktívne formy kyslíka (superoxid, peroxid vodíka, hydroxylový radikál), ktoré poškodzujú lipidy, bielkoviny a DNA.",
  body:
    '<p class="chain">zdroje: mitochondrie (únik z dýchacieho reťazca), neutrofily (NADPH-oxidáza), žiarenie, toxíny, Fe²⁺ → <b>ROS</b> → peroxidácia lipidov membrán, oxidácia bielkovín, zlomy DNA</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> ROS sú spoločná cesta mnohých nox (reperfúzia, zápal, alkohol, žiarenie). Bunka ich odstraňuje antioxidantmi (glutatión, kataláza, SOD); keď ich prevýšia, vzniká <b>oxidačný stres</b>.</p>'
},
{
  id: "enzymy-rozkladu", et: "gr. <i>hydor</i> „voda“ + <i>lysis</i> „rozpúšťanie“",
  title: "Hydrolázy (enzýmy rozkladu bunky)",
  match: ["hydroláz\\w*"],
  short: "Enzýmy, ktoré štiepia väzby pomocou vody: z lyzozómov, neutrofilov alebo pankreasu.",
  body: "<ul><li>Zapne ich ↑ Ca²⁺ v cytosole alebo prasknutie lyzozómov.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Keď prevážia enzýmy, tkanivo sa skvapalní (kolikvačná nekróza); keď prevážia denaturácia, stuhne (koagulačná).</p>"
},
{
  id: "fosfolipazy", et: "gr. <i>lipos</i> „tuk“",
  title: "Fosfolipázy",
  match: ["fosfolipáz\\w*"],
  short: "Enzýmy, ktoré štiepia fosfolipidy membrán.",
  body: "<ul><li>Fosfolipáza A2 uvoľňuje kyselinu arachidónovú (základ prostaglandínov a leukotriénov).</li><li>Unikajú z lyzozómov a pri pankreatitíde z pankreasu.</li></ul><ul><li>Rozbijú membránu a spustia únik obsahu.</li></ul>"
},
{
  id: "proteazy", et: "gr. <i>proteios</i> „prvotný“",
  title: "Proteázy",
  match: ["proteáz\\w*", "proteolytick\\w*"],
  short: "Enzýmy, ktoré štiepia bielkoviny.",
  body: "<ul><li>Rozkladajú cytoskelet a bielkoviny medzibunkovej hmoty.</li><li>Neutrofily vylučujú elastázu a kolagenázu.</li></ul><ul><li>Rozkladajú cytoskelet a bielkoviny medzibunkovej hmoty.</li></ul>"
},
{
  id: "endonukleazy", et: "gr. <i>endon</i> „vnútri“ + lat. <i>nucleus</i> „jadro“",
  title: "Endonukleázy",
  match: ["endonukleáz\\w*"],
  short: "Enzýmy, ktoré štiepia DNA v jadre.",
  body: "<ul><li>Pri apoptóze CAD štiepi DNA medzi nukleozómami — „rebríček“ úlomkov.</li><li>Pri nekróze DNA štiepi náhodne (šmuha).</li></ul><ul><li>Pri apoptóze nastrihajú DNA na úlomky.</li></ul>"
},
{
  id: "lipazy", et: "gr. <i>lipos</i> „tuk“",
  title: "Lipázy",
  match: ["lipáz\\w*"],
  short: "Enzýmy, ktoré štiepia triacylglyceroly na mastné kyseliny a glycerol.",
  body: "<ul><li>Pankreatická lipáza je zdrojom tukovej nekrózy: mastné kyseliny viažu vápnik a vzniknú mydlá (saponifikácia).</li><li>Zvýšená lipáza v krvi poukazuje na pankreatitídu.</li></ul><ul><li>Pri pankreatitíde unikne lipáza a natrávi tukové tkanivo (tuková nekróza).</li></ul>"
},
{
  id: "lyzozom", et: "gr. <i>lysis</i> „rozpúšťanie“ + <i>soma</i> „teleso“",
  title: "Lyzozóm",
  match: ["lyzozóm\\w*"],
  short: "Organela s kyslým obsahom a hydrolázami — „tráviaci systém“ bunky.",
  body:
    '<p class="chain">materiál z fagocytózy alebo autofágie → <b>lyzozóm</b> → rozklad na stavebné látky<br>chýbajúci enzým → materiál sa hromadí (lyzozómové storage choroby)<br>prasknutý lyzozóm → enzýmy natrávia bunku (nekróza)</p>'
},
{
  id: "ubikvitin", et: "lat. <i>ubique</i> „všade“",
  title: "Ubikvitín",
  match: ["ubikvitín\\w*"],
  short: "Malý bielkovinový „štítok“, ktorým bunka označí bielkovinu určenú na rozklad.",
  body: "<ul><li>Spojí sa s bielkovinou do reťazca štyroch a viac ubikvitínov.</li><li>Poškodené alebo nepotrebné bielkoviny tak dostanú „pečiatku“ pre proteazóm.</li></ul><ul><li>Reťaz ubikvitínov označí bielkovinu pre proteazóm.</li></ul>"
},
{
  id: "proteazom", et: "proteáza + gr. <i>soma</i> „teleso“",
  title: "Proteazóm",
  match: ["proteazóm\\w*", "ubikvitín-proteazómov\\w*"],
  short: "Bielkovinový komplex, ktorý označené bielkoviny rozstrihá na peptidy.",
  body: "<ul><li>Veľký valcovitý komplex, ktorý rozstrihá bielkovinu na krátke peptidy.</li><li>Inhibítory proteazómu (bortezomib) sa používajú pri myelóme.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Keď nestíha, zhluky označených bielkovín sa hromadia (Malloryho hyalín).</p>"
},
{
  id: "ubikvitinligazy",
  title: "Ubikvitínligázy (atrogín-1, MuRF1)",
  match: ["ubikvitínligáz\\w*", "atrogín\\w*", "MuRF1"],
  short: "Enzýmy, ktoré ubikvitín pripájajú na bielkovinu; vo svale ich zapína zníženie signalizácie IGF-1.",
  body: "<ul><li>Ligázy E3 vyberajú, ktorú bielkovinu označiť.</li><li>Vo svale ich zapína nečinnosť, kortizol a nádorová kachexia.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Keď sa odbúravanie zrýchli, bunka sa zmenší (atrofia).</p>"
},
{
  id: "mtor-foxo",
  title: "Dráha PI3K–Akt–mTOR a FoxO",
  match: ["PI3K–Akt–mTOR"],
  short: "Signálna dráha, ktorou záťaž, inzulín a IGF-1 udržiavajú bunku „veľkú“.",
  body: "<p class=\"chain\">inzulín / IGF-1, záťaž → PI3K → Akt → mTOR (↑ syntéza bielkovín); zároveň Akt ⊣ FoxO</p><p class=\"chain\">↓ signál → ↓ mTOR a uvoľnený FoxO → gény ubikvitínligáz a autofágie → atrofia</p>"
},
{
  id: "igf-1", et: "angl. <i>insulin-like growth factor 1</i>",
  title: "IGF-1",
  match: ["IGF-1"],
  short: "Rastový faktor podobný inzulínu; zapína dráhu PI3K–Akt a udržiava veľkosť svalových buniek.",
  body: "<ul><li>Tvorí sa v pečeni pod vplyvom rastového hormónu.</li><li>Zapína dráhu PI3K–Akt, a tým syntézu bielkovín.</li></ul><ul><li>Pri jeho poklese svaly atrofujú.</li></ul>"
},
{
  id: "pi3k", et: "angl. <i>phosphoinositide 3-kinase</i>",
  title: "PI3K",
  match: ["PI3K"],
  short: "Kináza na začiatku dráhy, ktorá po signáli z receptora zapne Akt.",
  body: "<ul><li>Tvorí fosfolipid PIP3, ktorý priláka Akt k membráne.</li><li>Dráha je nadmerne aktívna v mnohých nádoroch.</li></ul><ul><li>Ďalej Akt → mTOR.</li></ul>"
},
{
  id: "mtor", et: "angl. <i>mechanistic target of rapamycin</i>",
  title: "mTOR",
  match: ["mTOR"],
  short: "Kináza, ktorá zapína syntézu bielkovín a rast bunky.",
  body: "<ul><li>Zapína syntézu bielkovín a rast, a inhibuje autofágiu.</li><li>Inhibítory mTOR (sirolimus, everolimus) sa používajú pri transplantáciách a niektorých nádoroch.</li></ul><ul><li>Pri poklese signálu sa vypne a bunka sa zmenšuje.</li></ul>"
},
{
  id: "foxo", et: "angl. <i>forkhead box O</i>",
  title: "FoxO",
  match: ["FoxO"],
  short: "Transkripčný faktor, ktorý po vypnutí Akt zapne gény odbúrania bielkovín a autofágie.",
  body: "<ul><li>Aktívny Akt FoxO fosforyluje a vyradí z jadra.</li><li>Pri poklese signálu FoxO zapne ubikvitínligázy a autofágiu.</li></ul><ul><li>Je „brzdou“ rastu: vedie k atrofii.</li></ul>"
},
{
  id: "denaturacia", et: "lat. <i>de-</i> „zbavenie“ + <i>natura</i> „prirodzená povaha“",
  title: "Denaturácia bielkovín",
  match: ["denaturáci\\w*\\s+bielkovín\\w*", "denaturáci\\w*", "denaturuj\\w*", "denaturovan\\w*", "koaguluj\\w*"],
  short: "Strata priestorového tvaru bielkoviny (teplo, ↓ pH) — bielkovina sa zrazí ako uvarený bielok a stratí funkciu.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri ischémii ↓ pH denaturuje aj enzýmy, ktoré by tkanivo rozložili — preto tkanivo stuhne a zachová obrys (<b>koagulačná nekróza</b>). Denaturované bielkoviny viažu viac eozínu → cytoplazma je sýto ružová.</p>'
},
{
  id: "er", et: "endoplazmatické: gr. <i>endon</i> „vnútri“ + <i>plasma</i> „utvorené“; retikulum: lat. <i>reticulum</i> „sieťka“",
  title: "Endoplazmatické retikulum (ER; angl. endoplasmic reticulum)",
  match: ["ER", "endoplazmatick\\w*\\s+retikul\\w*"],
  short: "Sieť membrán, kde sa (na drsnom ER s ribozómami) tvoria a skladajú bielkoviny a (na hladkom ER) lipidy.",
  body:
    '<p class="chain">↓ ATP → ribozómy sa odlúpnu → ↓ syntéza bielkovín (aj apoproteínov → steatóza)<br>nahromadené zle zložené bielkoviny → <b>stres ER</b> → pri pretrvávaní apoptóza</p>'
},

/* ── typy bunkovej smrti ─────────────────────────────────────────────── */
{
  id: "receptory-smrti",
  title: "Receptory smrti (Fas, TNFR1; angl. death receptors, tumor necrosis factor receptor 1)",
  match: ["FasL", "Fas", "FAS-R", "TNFR1", "receptor\\w*\\s+smrti", "ligand\\w*\\s+smrti"],
  short: "Receptory na povrchu bunky, ktoré po naviazaní ligandu priamo spustia apoptózu (vonkajšia dráha).",
  body:
    '<p class="chain">FasL (napr. na T lymfocyte) alebo TNF → <b>Fas / TNFR1</b> → adaptorové bielkoviny → <b>kaspáza 8</b> → exekučné kaspázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Takto cytotoxické T lymfocyty zabíjajú infikované bunky a takto sa odstraňujú autoreaktívne lymfocyty.</p>'
},
{
  id: "cad",
  title: "CAD — DNáza aktivovaná kaspázou (angl. caspase-activated DNase)",
  match: ["CAD", "internukleozomáln\\w*"],
  short: "Enzým, ktorý v apoptóze strihá DNA medzi nukleozómami na pravidelné úseky ≈ 180–200 bp.",
  body:
    '<p class="chain">exekučná kaspáza 3 → rozštiepi inhibítor (ICAD) → uvoľnená <b>CAD</b> → DNA na úseky ≈ 180–200 bp a ich násobky → „rebrík“ na elektroforéze</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri nekróze sa DNA rozkladá náhodne (rozmazaná škvrna) — rebrík je znak apoptózy.</p>'
},
{
  id: "detekcia-apoptozy",
  title: "Dôkaz apoptózy",
  match: ["dôkaz\\w*\\s+apoptóz\\w*"],
  short: "Metódy, ktoré zachytia apoptotickú bunku skôr, než ju fagocyty odstránia.",
  body: "<ul><li>Apoptotické bunky fagocyty rýchlo odstránia, preto ich býva v reze málo.</li><li>Hodnotí sa vzhľad v H&E, TUNEL, annexín V a štiepená kaspáza 3.</li><li>Žiadna metóda nie je dokonale špecifická — preto sa kombinujú.</li></ul>"
},
{
  id: "annexin",
  title: "Annexín V",
  match: ["annexín\\w*(?:\\s+V)?"],
  short: "Bielkovina, ktorá sa viaže na fosfatidylserín preklopený na povrch apoptotickej bunky.",
  body: "<ul><li>Značí sa fluorescenciou; v kombinácii s farbivom, ktoré prejde len cez poškodenú membránu, rozlíši skorú apoptózu od nekrózy.</li></ul><ul><li>Používa sa v prietokovej cytometrii.</li></ul>"
},
{
  id: "fosfatidylserin",
  title: "Fosfatidylserín",
  match: ["fosfatidylserín\\w*"],
  short: "Fosfolipid normálne na vnútornej strane membrány; v apoptóze sa preklopí von a funguje ako signál „zjedz ma“.",
  body: "<ul><li>V živej bunke ho na vnútornej strane drží enzým flipáza.</li><li>Kaspázy ho vypnú → fosfatidylserín sa objaví na povrchu → makrofág bunku odstráni bez zápalu.</li></ul><ul><li>Rozpozná ho makrofág pri eferocytóze.</li><li>Aj aktivovaná doštička ho preklopí navonok – na tomto záporne nabitom povrchu sa cez Ca²⁺ skladajú tenáza a protrombináza.</li></ul>"
},
{
  id: "regulovana-smrt",
  title: "Regulovaná nekróza",
  match: ["regulovan\\w*\\s+(?:smr\\w*|nekróz\\w*)"],
  short: "Formy smrti, ktoré vyzerajú ako nekróza (membrána praskne, vznikne zápal), ale riadi ich vlastný molekulový aparát.",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Keďže majú vlastné molekuly, dajú sa liekmi ovplyvniť — na rozdiel od „náhodnej“ nekrózy. Vzhľad sám ich od nej neodlíši.</p>"
},
{
  id: "nekroptoza", et: "<i>nekros</i> „mŕtvy“ + <i>apoptosis</i> „opadávanie lístia“",
  title: "Nekroptóza",
  match: ["nekroptóz\\w*", "RIPK1", "RIPK3", "MLKL"],
  short: "Kinázy RIPK1 a RIPK3 fosforylujú bielkovinu MLKL, ktorá prederaví plazmatickú membránu.",
  body: "<ul><li>Zapína ju receptor TNFR1 pri zablokovanej kaspáze 8.</li><li>Výsledok je prasknutie bunky, únik DAMP a zápal.</li><li>Uplatňuje sa pri ischemicko-reperfúznom poškodení.</li></ul><ul><li>Záloha, keď vírus zablokuje kaspázy.</li></ul>"
},
{
  id: "pyroptoza", et: "gr. <i>pyr</i> „oheň“ + <i>ptosis</i> „pád“",
  title: "Pyroptóza",
  match: ["pyroptóz\\w*", "gasdermín\\w*", "inflamazóm\\w*"],
  short: "Inflamazóm aktivuje kaspázu 1, ktorá rozštiepi gasdermín D; ten vytvorí póry a uniká IL-1β → silný zápal.",
  body: "<ul><li>Zapína ju inflamazóm (senzor PAMP a DAMP) → kaspáza 1.</li><li>Gasdermín D vytvorí póry v membráne; uniká IL-1β a IL-18.</li><li>Typická pri odpovedi na intracelulárne baktérie.</li></ul>"
},
{
  id: "feroptoza", et: "lat. <i>ferrum</i> „železo“ + gr. <i>ptosis</i> „pád“",
  title: "Feroptóza",
  match: ["feroptóz\\w*", "GPX4"],
  short: "Peroxidácia lipidov membrán závislá od železa, keď zlyhá ochranný enzým GPX4 (glutatiónperoxidáza 4).",
  body: "<ul><li>Závisí od železa a peroxidácie nenasýtených lipidov membrán.</li><li>GPX4 s glutatiónom lipidové peroxidy neutralizuje; keď zlyhá, bunka zahynie.</li><li>Uplatňuje sa pri ischemickom poškodení a neurodegenerácii.</li></ul>"
},
{
  id: "damp",
  title: "DAMP (signály poškodenia; angl. damage-associated molecular patterns)",
  match: ["DAMP", "HMGB1", "PAMP"],
  short: "Molekuly z vnútra bunky (DNA, ATP, HMGB1, kyselina močová), ktoré po úniku z mŕtvej bunky oznámia imunite poškodenie.",
  body:
    '<p class="chain">nekróza → obsah bunky unikne → <b>DAMP</b> → receptory makrofágov (TLR, inflamazóm) → cytokíny → <b>zápal</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo nekróza vyvolá zápal aj bez infekcie a apoptóza nie (obsah ostane v membráne). PAMP sú obdobné signály z mikróbov.</p>'
},
{
  id: "reperfuzia", et: "lat. <i>re-</i> „znova“ + <i>perfundere</i> „prelievať“ (<i>per</i> „cez“ + <i>fundere</i> „liať“)",
  title: "Reperfúzne poškodenie",
  match: ["reperfúzi\\w*", "reperfúzn\\w*", "ischemicko-reperfúzn\\w*"],
  short: "Paradox: obnovenie prietoku zachráni väčšinu buniek, ale tie blízko bodu zvratu môže zabiť.",
  body:
    '<p class="chain">návrat krvi → O₂ do poškodených mitochondrií → <b>nárazová tvorba ROS</b> + Ca²⁺ do mitochondrií + úprava pH → otvorenie póru MPT → smrť bunky<br>+ neutrofily a komplement poškodia endotel</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Napriek tomu sa pri infarkte tepna otvára čo najskôr — prínos záchrany prevýši škodu.</p>'
},
{
  id: "vitalna-reakcia", et: "lat. <i>vitalis</i> „životný“ (<i>vita</i> „život“); reakcia: <i>re-</i> „späť“ + <i>actio</i> „pôsobenie“",
  title: "Vitálna reakcia",
  match: ["vitáln\\w*\\s+reakci\\w*", "intravitáln\\w*"],
  short: "Zápal na rozhraní mŕtveho a živého tkaniva — dôkaz, že poškodenie vzniklo za života.",
  body: "<ul><li>Dôležitá v súdnom lekárstve: odlíši poranenie za života od poranenia po smrti.</li><li>Znaky: krvácanie, zápalová reakcia, zrážanie krvi.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Rozlišuje <b>nekrózu</b> (so zápalom) od <b>posmrtnej autolýzy</b> (bez neho) — v súdnom lekárstve aj pri hodnotení poranení.</p>"
},
{
  id: "posmrtne-zmeny",
  title: "Posmrtné zmeny",
  match: ["posmrtn\\w*\\s+zmen\\w*", "kadaverózn\\w*"],
  short: "Zmeny tkanív po smrti organizmu — bez zápalovej reakcie.",
  body: "<ul><li>Poradie: chladnutie, posmrtné škvrny, stuhnutosť, autolýza, hniloba.</li><li>Pomáhajú odhadnúť čas smrti.</li><li>Od nekrózy sa líšia tým, že chýba zápalová (vitálna) reakcia.</li></ul>"
},
{
  id: "autolyza", et: "gr. <i>autos</i> „sám“ + <i>lysis</i> „rozpúšťanie“",
  img: {
    src: "assets/images/renal-autolysis.jpg",
    alt: "Autolýza obličky: bunky sú mŕtve, no bez zápalovej reakcie (H&E).",
    caption: "Autolýza obličky: bunky sú mŕtve, no bez zápalovej reakcie (H&E).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_renal_autolysis.jpg"
  },
  title: "Autolýza",
  match: ["autolýz\\w*"],
  short: "Samonatrávenie tkanív vlastnými enzýmami po smrti.",
  body: "<ul><li>Pri teplote tela prebieha rýchlejšie než v chlade.</li><li>Najskôr postihuje orgány bohaté na enzýmy: žalúdok, pankreas, črevo.</li><li>Vo vzorke spôsobuje artefakty, preto sa tkanivo fixuje čo najskôr.</li></ul><ul><li>Najskôr postihuje pankreas a žalúdok.</li></ul>"
},
{
  id: "putrefakcia", et: "lat. <i>putrefacere</i> „zhnilobiť“",
  title: "Putrefakcia",
  match: ["putrefakci\\w*"],
  short: "Hniloba tkanív po smrti účinkom baktérií.",
  body: "<ul><li>Baktérie z čreva sa rozšíria cez steny orgánov do ciev.</li><li>Plyny nafúknu telo; prvá sa sfarbí koža podbruška do zelena.</li><li>Prebieha rýchlejšie v teple a vo vlhku.</li></ul>"
},
{
  id: "algor-mortis", et: "lat. <i>algor</i> „chlad“ + <i>mors</i> „smrť“",
  title: "Algor mortis",
  match: ["algor\\s+mortis"],
  short: "Postupné chladnutie tela po smrti.",
  body: "<ul><li>Telo chladne zhruba o 1 °C za hodinu (orientačne).</li><li>Rýchlosť závisí od okolia, oblečenia a veľkosti tela, preto je odhad času smrti z teploty len približný.</li></ul>"
},
{
  id: "rigor-mortis", et: "lat. <i>rigor</i> „stuhnutosť“",
  title: "Rigor mortis",
  match: ["rigor\\s+mortis"],
  short: "Posmrtné stuhnutie svalov: chýba ATP, ktoré by uvoľnilo aktín od myozínu.",
  body: "<ul><li>Začína v mimických svaloch a v čeľusti a postupuje nadol.</li><li>Neskôr ustúpi, keď svaly zmäknú autolýzou (časový údaj sa v pramenoch líši).</li><li>Rýchlejšia je pri vysokej teplote a po veľkej svalovej námahe.</li></ul>"
},

/* ── tkanivo a farbenia ──────────────────────────────────────────────── */
{
  id: "he-farbenie",
  title: "Farbenie hematoxylín–eozín (H&E)",
  match: ["H&E"],
  short: "Základné farbenie v histológii: hematoxylín farbí jadrá modrofialovo, eozín cytoplazmu a kolagén ružovo.",
  body: "<ul><li>Jadro je modrofialové, cytoplazma a kolagén ružové.</li><li>Je to najbežnejšie farbenie rezov; ostatné sú špeciálne.</li><li>Pri nekróze sa mení pomer farieb: cytoplazma je eozinofilnejšia.</li></ul>"
},
{
  id: "hematoxylin", et: "gr. <i>haima</i> „krv“ + <i>xylon</i> „drevo“",
  title: "Hematoxylín",
  match: ["hematoxylín\\w*"],
  short: "Zásadité farbivo, ktoré sa viaže na kyslé štruktúry (DNA, RNA) a farbí ich modrofialovo.",
  body: "<ul><li>Oxidovaný hematoxylín s hliníkovou soľou tvorí komplex, ktorý sa viaže na kyslé jadrové štruktúry.</li><li>Zafarbí DNA aj cytoplazmu bohatú na RNA (bazofilná cytoplazma).</li></ul>"
},
{
  id: "eozin", et: "gr. <i>eos</i> „zora“",
  title: "Eozín",
  match: ["eozín\\w*"],
  short: "Kyslé farbivo, ktoré sa viaže na bázické štruktúry (bielkoviny) a farbí ich ružovo.",
  body: "<ul><li>Farbí cytoplazmu, kolagén, svalové vlákna a erytrocyty.</li><li>Intenzita ružovej závisí od množstva a stavu bielkovín (denaturované viažu viac).</li></ul>"
},
{
  id: "eozinofilny",
  title: "Eozinofilný",
  match: ["eozinofiln\\w*"],
  short: "Ružový po farbení eozínom (bielkoviny cytoplazmy, kolagén, fibrín).",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Znamená „farbí sa eozínom“, nie „obsahuje eozinofily“. Mŕtva bunka je eozinofilnejšia: stratí RNA a jej denaturované bielkoviny viažu viac eozínu.</p>"
},
{
  id: "bazofilny", et: "báza + gr. <i>philos</i> „milujúci“",
  title: "Bazofilný",
  match: ["bazofiln\\w*"],
  short: "Modrofialový po farbení hematoxylínom (jadro, ribozómy).",
  body: "<ul><li>Bázické farbivo sa viaže na kyslé (aniónové) štruktúry: DNA a RNA.</li><li>Bazofilná cytoplazma znamená veľa RNA, čiže aktívnu tvorbu bielkovín (napr. plazmocyt).</li></ul>"
},
{
  id: "hyperchromazia", et: "gr. <i>hyper</i> „nad, nadmerne“ + <i>chroma</i> „farba“",
  title: "Hyperchromázia",
  match: ["hyperchróm\\w*", "hyperchromáz\\w*"],
  short: "Jadro sa farbí tmavšie vďaka zhustenému chromatínu.",
  body: "<ul><li>Typická pre pyknózu a pre nádorové jadrá (atypia).</li><li>Pyknotické jadro je malé a okrúhle, nádorové veľké a nepravidelné.</li></ul>"
},
{
  id: "imunohistochemia", et: "lat. <i>immunis</i> „oslobodený, chránený“ + gr. <i>histos</i> „tkanivo“ + <i>chemeia</i> „chémia“",
  img: {
    src: "assets/images/he-vs-ki67.jpg",
    alt: "Ten istý nádor v H&E (vľavo) a v imunohistochémii Ki-67 (vpravo).",
    caption: "Ten istý nádor v H&E (vľavo) a v imunohistochémii Ki-67 (vpravo).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Invasive_cervical_squamous_cell_carcinoma_on_H%26E_histopathology_and_Ki-67_immunohistochemistry.jpg"
  },
  title: "Imunohistochémia",
  match: ["imunohistochémi\\w*", "imunohistochemick\\w*"],
  short: "Dôkaz konkrétnej bielkoviny na reze pomocou značenej protilátky.",
  body:
    '<p class="chain">protilátka proti hľadanej bielkovine → naviaže sa v tkanive → farebná reakcia → <b>vidno, ktoré bunky bielkovinu majú</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Určí typ amyloidu (κ, λ, TTR, AA), pôvod nádoru alebo štiepenú kaspázu 3 pri apoptóze.</p>'
},
{
  id: "parenchym", et: "gr. <i>para</i> „vedľa“ + <i>en</i> „v“ + <i>chyma</i> „vyliate“",
  title: "Parenchým",
  match: ["parenchým\\w*", "parenchýmov\\w*"],
  short: "Funkčné bunky orgánu (hepatocyty, tubuly).",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Keď parenchým zanikne, na jeho miesto nastúpi stróma (fibróza) alebo tuk — orgán môže mať podobnú veľkosť, ale menej funkcie.</p>"
},
{
  id: "stroma", et: "gr. <i>stroma</i> „podstielka, lôžko“",
  title: "Stróma",
  match: ["stróm\\w*"],
  short: "Oporné väzivo orgánu s cievami a nervami.",
  body: "<ul><li>Obsahuje cievy, nervy, fibroblasty a kolagén.</li><li>Pri nádoroch tvorí oporu a vedie cievy (napr. desmoplastická stróma).</li></ul>"
},
{
  id: "intersticium", et: "lat. <i>interstitium</i> „medzera“ (<i>inter</i> „medzi“ + <i>sistere</i> „stáť“)",
  title: "Interstícium",
  match: ["interstíci\\w*", "intersticiu", "intersticiáln\\w*"],
  short: "Priestor medzi bunkami a cievami: medzibunková hmota (kolagén, proteoglykány), tkanivový mok a bunky väziva.",
  body:
    '<p class="chain">kapilára → <b>interstícium</b> (difúzia O₂ a živín) → bunka; prebytok tekutiny odvádza lymfa</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Čo sa v ňom nahromadí (exsudát, amyloid, hyalín), predĺži difúznu dráhu a utláča bunky. „Intersticiálny zápal“ = zápal v stróme orgánu, nie na povrchu.</p>'
},
{
  id: "endotel", et: "gr. <i>endon</i> „vnútri“ + <i>thele</i> „bradavka“ (jemný vnútorný povlak)",
  title: "Endotel",
  match: ["endotel\\w*"],
  short: "Jedna vrstva buniek vystielajúca cievy — riadi priepustnosť, zrážanie krvi a prechod leukocytov.",
  body:
    '<p class="chain">zápalové mediátory → endotelové bunky sa stiahnu (medzery), vystavia selektíny a ICAM-1 → <b>únik plazmy a prechod leukocytov</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Poškodený endotel = presakovanie plazmy do steny (hyalín, fibrinoid) a trombóza.</p>'
},
{
  id: "fibroblast", et: "lat. <i>fibra</i> „vlákno“ + gr. <i>blastos</i> „klíček, výhonok“",
  title: "Fibroblast",
  match: ["fibroblast\\w*"],
  img: {
    "src": "assets/images/mi-healing-3-collagen.jpg",
    "alt": "Fibroblasty a mladý kolagén v hojacom sa infarkte.",
    "caption": "Fibroblasty a mladý kolagén v hojacom sa infarkte.",
    "credit": "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_fibroblast_proliferation_and_early_collagen_deposition_in_myocardial_infarction.jpg"
  },
  short: "Bunka väziva, ktorá vyrába kolagén a medzibunkovú hmotu (aj GAG).",
  body: "<ul><li>Vretenovitá bunka väziva.</li><li>TGF-β ho mení na myofibroblast.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Pri hojení vytvára <b>jazvu</b>; pri hypotyreóze zvýšene tvorí GAG (myxedém).</p>"
},

/* ── laboratórne markery ─────────────────────────────────────────────── */
{
  id: "markery-nekrozy",
  title: "Markery nekrózy",
  match: ["marker\\w*\\s+nekróz\\w*"],
  short: "Bielkoviny z vnútra buniek, ktoré po poškodení membrány uniknú do krvi — laboratórny dôkaz nekrózy.",
  body: "<p class=\"why\"><b>Prečo to je dôležité.</b> Marker sa v krvi objaví až po hodinách, preto sa odber opakuje a rozhoduje vzostup.</p>"
},
{
  id: "troponin",
  title: "Troponín",
  match: ["hs-troponín\\w*", "troponín\\w*"],
  short: "Najšpecifickejší marker poškodenia myokardu (troponín T a I).",
  body: "<ul><li>Stúpa v priebehu hodín po poškodení a ostáva zvýšený niekoľko dní.</li><li>Zvýšenie nie je špecifické pre infarkt: aj myokarditída, pľúcna embólia alebo zlyhanie obličiek ho môžu zvýšiť.</li></ul>"
},
{
  id: "ck", et: "angl. <i>creatine kinase</i>",
  title: "CK a CK-MB",
  match: ["CK-MB", "CK", "kreatínkináz\\w*"],
  short: "Kreatínkináza: v kostrovom svale a srdci; izoforma MB je srdcová.",
  body: "<ul><li>CK-MB bol dlho marker infarktu; dnes ho väčšinou nahrádza troponín.</li><li>Veľmi vysoká CK vzniká pri rabdomyolýze.</li></ul>"
},
{
  id: "myoglobin", et: "gr. <i>mys</i> „sval“ + lat. <i>globus</i> „guľa“",
  title: "Myoglobín",
  match: ["myoglobín\\w*"],
  short: "Bielkovina svalu, ktorá po rozpade svalu uniká do krvi a moču.",
  body: "<ul><li>Zo svalu uniká veľmi rýchlo, ale je nešpecifický.</li><li>Pri rabdomyolýze farbí moč tmavo a môže poškodiť obličkové tubuly (akútna tubulárna nekróza).</li></ul>"
},
{
  id: "alt", et: "angl. <i>alanine aminotransferase</i>",
  title: "ALT",
  match: ["ALT"],
  short: "Pečeňový enzým, špecifickejší pre pečeň než AST.",
  body: "<ul><li>Je hlavne v cytoplazme hepatocytov.</li><li>Zvyšuje sa pri hepatitíde, steatóze a liekoch.</li><li>Pri alkoholovom poškodení býva AST vyššia než ALT.</li></ul>"
},
{
  id: "ast", et: "angl. <i>aspartate aminotransferase</i>",
  title: "AST",
  match: ["AST"],
  short: "Enzým pečene, srdca a svalu; zvýšený pri poškodení týchto orgánov.",
  body: "<ul><li>Je v mitochondriách aj cytoplazme hepatocytov, v myokarde a vo svale.</li><li>Pomer AST/ALT pomáha odlíšiť príčinu (alkohol: AST vyššia).</li></ul>"
},
{
  id: "ld", et: "angl. <i>lactate dehydrogenase</i>",
  title: "LD (laktátdehydrogenáza)",
  match: ["LDH", "LD"],
  short: "Nešpecifický marker — je takmer vo všetkých bunkách.",
  body: "<ul><li>Zvýšená pri hemolýze, infarkte, nádore a poškodení pečene.</li><li>Štiepi laktát na pyruvát.</li></ul>"
},
{
  id: "gmt",
  title: "GMT",
  match: ["GMT"],
  short: "Enzým, ktorý sa zvyšuje pri poruche žlčových ciest.",
  body: "<ul><li>Gama-glutamyltransferáza je enzým žlčových ciest a pečene.</li><li>Citlivo reaguje na alkohol a lieky.</li></ul>"
},
{
  id: "amylaza",
  title: "Amyláza",
  match: ["amyláz\\w*"],
  short: "Enzýmy pankreasu zvýšené pri jeho poškodení.",
  body: "<ul><li>Pri akútnej pankreatitíde stúpne v priebehu hodín; zvýšená môže byť aj pri zápale slinných žliaz.</li><li>Špecifickejšia je lipáza.</li></ul>"
},

/* ── choroby a klinické pojmy ────────────────────────────────────────── */
{
  id: "diabetes", et: "gr. <i>diabetes</i> „pretekanie“ (<i>dia</i> „cez“ + <i>bainein</i> „ísť“) + lat. <i>mellitus</i> „medový, sladký“ (<i>mel</i> „med“)",
  title: "Diabetes mellitus (DM)",
  match: ["T1DM", "T2DM", "DM", "diabet\\w*(?:\\s+mellit\\w*)?", "inzulínov\\w*\\s+rezistenci\\w*", "mikroangiopati\\w*", "makroangiopati\\w*", "Armaniho\\s+zón\\w*"],
  img: {
    "src": "assets/images/kw-nodular-glomerulosclerosis.jpg",
    "alt": "Uzlovitá glomeruloskleróza (Kimmelstielova–Wilsonova) pri diabete.",
    "caption": "Uzlovitá glomeruloskleróza (Kimmelstielova–Wilsonova) pri diabete.",
    "credit": "Doc.mari · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Diabetic_nephropathy.jpg"
  },
  short: "Chronická hyperglykémia z nedostatku inzulínu (1. typ) alebo z inzulínovej rezistencie s vyčerpaním β-buniek (2. typ).",
  body: "<p class=\"chain\">↑ glukóza → AGE (zosieťovaný kolagén, zhrubnuté bazálne membrány) + polyolová dráha + ROS → <b>mikroangiopatia</b> (sietnica, oblička, nervy) a <b>makroangiopatia</b> (ateroskleróza)</p><p class=\"why\"><b>Prečo to je dôležité.</b> Väčšina komplikácií DM sú <b>cievne</b> — hyalínna arterioloskleróza, Kimmelstiel–Wilsonove uzly, diabetická noha.</p>"
},
{
  id: "proteinuria", et: "gr. <i>proteios</i> „prvotný“ + <i>ouron</i> „moč“",
  title: "Proteinúria",
  match: ["proteinúri\\w*", "mikroalbuminúri\\w*"],
  short: "Bielkovina v moči — poškodený glomerulárny filter ju prepúšťa.",
  body: "<ul><li>Fyziologicky do ≈ 150 mg za deň.</li><li>Glomerulárna proteinúria (albumín) a tubulárna (malé bielkoviny).</li><li>Nad 3,5 g za deň ide o nefrotický rozsah.</li></ul>"
},
{
  id: "gfr", et: "angl. <i>glomerular filtration rate</i>",
  title: "GFR",
  match: ["GFR"],
  short: "Glomerulárna filtrácia — jej pokles znamená stratu funkčných nefrónov.",
  body: "<ul><li>Norma ≈ 90–120 ml/min/1,73 m².</li><li>Pokles znamená stratu funkčných nefrónov.</li><li>Odhaduje sa z kreatinínu v sére.</li></ul>"
},
{
  id: "obliky-ckd", et: "angl. <i>chronic kidney disease</i>",
  title: "CKD (chronická choroba obličiek)",
  match: ["CKD", "chronick\\w*\\s+chorob\\w*\\s+obličiek"],
  img: {
    "src": "assets/images/hyaline-cast-urine.jpg",
    "alt": "Hyalínny valec v močovom sedimente pri proteinúrii.",
    "caption": "Hyalínny valec v močovom sedimente pri proteinúrii.",
    "credit": "Ajay Kumar Chaurasiya · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Hyaline_Cast_in_Urine_Microscopy.jpg"
  },
  short: "Poškodenie obličiek alebo ↓ GFR trvajúce viac ako 3 mesiace.",
  body: "<ul><li>Stupne G1–G5 podľa GFR.</li><li>Príčiny: diabetes, hypertenzia, glomerulonefritída.</li><li>Výsledok je nefroskleróza a zmenšená oblička.</li></ul>"
},
{
  id: "vaskulitida", et: "lat. <i>vasculum</i> „cievka“ + gr. <i>-itis</i> „zápal“",
  title: "Vaskulitída",
  match: ["vaskulitíd\\w*"],
  img: {
    "src": "assets/images/fibrinoid-necrosis-vasculitis.jpg",
    "alt": "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    "caption": "Fibrinoidná nekróza steny cievy pri vaskulitíde.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Churg-Strauss_syndrome_-_high_mag.jpg"
  },
  short: "Zápal steny cievy; imunitná cesta k fibrinoidnej nekróze.",
  body: "<p class=\"chain\">imunokomplexy / protilátky → komplement, neutrofily → zápal steny → fibrinoidná nekróza</p><p class=\"why\"><b>Prečo to je dôležité.</b> Následok: zúžený lúmen, trombóza, ischémia orgánu (napr. oblička).</p>"
},
{
  id: "polyarteritis-nodosa", et: "gr. <i>poly</i> „mnoho“ + <i>arteria</i> „tepna“ + lat. <i>nodosus</i> „uzlovitý“",
  title: "Polyarteritis nodosa",
  match: ["polyarteritis\\s+nodosa"],
  short: "Vaskulitída stredne veľkých tepien s ložiskovou nekrózou steny a aneuryzmami.",
  body: "<ul><li>Nekróza steny stredne veľkých tepien a uzlovité aneuryzmy dali chorobe meno.</li><li>V jednej cieve sú ložiská v rôznych štádiách vývoja.</li></ul><ul><li>Neprítomná je glomerulonefritída a ANCA.</li><li>Postihuje obličky, črevo, kožu a nervy.</li></ul>"
},
{
  id: "maligna-hypertenzia", et: "lat. <i>malignus</i> „zlomyseľný“ + gr. <i>hyper</i> „nad, nadmerne“ + lat. <i>tensio</i> „napätie“",
  title: "Malígna hypertenzia",
  match: ["malígn\\w*\\s+hypertenzi\\w*"],
  short: "Extrémne zvýšený tlak, ktorý priamo poškodí endotel — plazma presiakne do steny a vznikne fibrinoidná nekróza.",
  body: "<ul><li>Arterioly sa zhrubnú (obraz „cibuľových šupiek“).</li><li>Oblička má na povrchu drobné krvácania.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Rýchlo vedie k zlyhaniu obličiek, mozgu a sietnice.</p>"
},
{
  id: "hypertenzna-kriza", et: "gr. <i>krisis</i> „rozhodnutie, zlom“",
  title: "Hypertenzná kríza",
  match: ["hypertenzn\\w*\\s+kríz\\w*"],
  short: "Náhly extrémny vzostup tlaku s ohrozením orgánov.",
  body: "<ul><li>Hypertenzná urgencia je bez poškodenia orgánov, emergencia s poškodením.</li><li>Ohrozuje mozog (encefalopatia), srdce, obličky a sietnicu.</li><li>Príliš rýchly pokles tlaku môže zhoršiť prekrvenie orgánov.</li></ul>"
},
{
  id: "plazmocytom", et: "plazmocyt + gr. <i>-oma</i> „nádor, útvar“",
  title: "Plazmocytóm",
  match: ["plazmocytóm\\w*", "plazmocytov\\w*\\s+dyskrázi\\w*"],
  img: {
    "src": "assets/images/russell-bodies.jpg",
    "alt": "Plazmatické bunky s Russellovými telieskami.",
    "caption": "Plazmatické bunky s Russellovými telieskami.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Russell_bodies_2_high_mag.jpg"
  },
  short: "Nádor z jedného klonu plazmocytov, ktorý vyrába nadbytok jednej protilátky alebo jej ľahkých reťazcov.",
  body: "<ul><li>Solitárny plazmocytóm je jedno ložisko v kosti alebo mäkkom tkanive.</li><li>Mnohopočetný myelóm je jeho generalizovaná forma.</li></ul>"
},
{
  id: "myelom", et: "gr. <i>myelos</i> „dreň“ + <i>-oma</i> „nádor, útvar“",
  title: "Mnohopočetný myelóm",
  match: ["mnohopočetn\\w*\\s+myelóm\\w*", "myelóm\\w*"],
  short: "Plazmocytový nádor kostnej drene s postihnutím viacerých miest.",
  body: "<ul><li>Plazmocyty v dreni dosahujú približne 10 % a viac.</li><li>Dôkaz: M-proteín v sére alebo moči (elektroforéza), osteolytické ložiská na RTG.</li></ul><ul><li>Rozsypané „vyrazené“ defekty v kostiach, anémia, zlyhanie obličiek, infekcie.</li><li>Klon tvorí monoklonálny proteín (M-proteín).</li></ul>"
},
{
  id: "bence-jones", et: "podľa Henryho Bence-Jonesa",
  title: "Bence-Jonesova bielkovina",
  match: ["Bence-Jones\\w*(?:\\s+bielkovin\\w*)?"],
  short: "Voľné ľahké reťazce imunoglobulínov v moči.",
  body: "<ul><li>Dôkaz je elektroforézou alebo imunofixáciou moču.</li></ul><ul><li>Bežný testovací prúžok ich nezachytí.</li><li>Poškodzujú obličkové tubuly a môžu tvoriť AL amyloid.</li></ul>"
},
{
  id: "glykogen", et: "gr. <i>glykys</i> „sladký“ + <i>-genes</i> „tvoriaci“",
  title: "Glykogén",
  match: ["glykogén\\w*"],
  short: "Zásobný polysacharid glukózy v pečeni (pre celé telo) a vo svale (len pre seba).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri bežnom spracovaní sa vo vode rozpustí a cytoplazma vyzerá prázdna („clear cell“); dokazuje sa <b>PAS</b>, ktorý po diastáze zmizne.</p>'
},
{
  id: "storage", et: "angl. <i>storage</i> „ukladanie, skladovanie“",
  title: "Lyzozómové storage choroby",
  match: ["lyzozómov\\w*\\s+storage\\w*(?:\\s+chorob\\w*)?", "storage\\s+chorob\\w*", "lipidóz\\w*"],
  short: "Vrodené chýbanie lyzozómového enzýmu — nestrávený materiál sa hromadí v lyzozómoch.",
  body:
    '<p class="chain">mutácia → chýba lyzozómová hydroláza → substrát sa nerozloží → <b>preplnené lyzozómy</b> → zväčšené orgány, poškodenie neurónov</p>' +
    "<ul>" +
      "<li><b>Lipidózy</b> — Gaucherova, Niemannova–Pickova choroba.</li>" +
      "<li><b>Mukopolysacharidózy</b> — GAG (Hurlerov syndróm).</li>" +
      "<li><b>Glykogenóza II</b> — Pompeho choroba.</li>" +
    "</ul>"
},
{
  id: "rtg",
  title: "RTG — röntgen (angl. X-ray, radiography)",
  match: ["RTG"],
  short: "Zobrazenie röntgenovým žiarením; kosti a vzduch v pľúcach dávajú najlepší kontrast.",
  body: "<ul><li>Dobré na kosti, pľúca a zlomeniny.</li><li>Slabé na mäkké tkanivá.</li><li>Dávka žiarenia je nízka, ale kumulatívna.</li></ul>"
},
{
  id: "ct",
  title: "CT — počítačová tomografia (angl. computed tomography)",
  match: ["CT"],
  short: "Röntgenové rezy telom poskladané počítačom; ukáže krvácanie, nádor aj atrofiu orgánu.",
  body: "<ul><li>Výborné na krvácanie v mozgu, pľúcne uzly, zlomeniny a embóliu.</li><li>Dávka žiarenia je vyššia než pri RTG.</li><li>Kontrastná látka ukáže cievy a perfúziu.</li></ul>"
},
{
  id: "usg",
  title: "USG — ultrasonografia (angl. ultrasonography)",
  match: ["USG"],
  short: "Zobrazenie ultrazvukom bez žiarenia; tuk a väzivo ultrazvuk rozptyľujú, preto je stukovatená pečeň „svetlá“.",
  body: "<ul><li>Bez žiarenia, dostupné pri lôžku.</li><li>Dobré na brucho, srdce (echo), cievy a tekutinu.</li><li>Obmedzujú ho vzduch a kosť.</li></ul>"
},
{
  id: "mr",
  title: "MR — magnetická rezonancia (angl. magnetic resonance, MRI)",
  match: ["MR"],
  short: "Zobrazenie v magnetickom poli bez žiarenia; najlepšie rozlíši mäkké tkanivá (mozog, svaly).",
  body: "<ul><li>Najlepšie na mozog, miechu, svaly a kĺby.</li><li>Vyšetrenie je dlhšie; prekážkou sú niektoré kovové implantáty.</li></ul>"
},
{
  id: "ekg",
  title: "EKG — elektrokardiogram (angl. ECG, electrocardiogram)",
  match: ["EKG"],
  short: "Záznam elektrickej aktivity srdca; ischémia a infarkt menia tvar kriviek.",
  body: "<ul><li>ST elevácia je znak akútneho transmurálneho infarktu.</li><li>Zachytí arytmie a blokády.</li><li>Mení sa pri hyperkaliémii a perikarditíde.</li></ul>"
},
{
  id: "pci",
  title: "PCI — perkutánna koronárna intervencia (angl. percutaneous coronary intervention)",
  match: ["PCI"],
  short: "Otvorenie upchatej koronárnej tepny katétrom cez kožu (balónik, stent).",
  body: "<ul><li>Pri STEMI je liečbou prvej voľby.</li><li>Stent drží tepnu otvorenú.</li></ul>"
},
{
  id: "git",
  title: "GIT — gastrointestinálny trakt (angl. GI tract, gastrointestinal tract)",
  match: ["GIT"],
  short: "Tráviaca trubica od pažeráka po konečník.",
  body: "<ul><li>Pažerák, žalúdok, tenké a hrubé črevo, konečník.</li><li>K tráviacej sústave patria aj pečeň, žlčník a pankreas.</li></ul>"
},
{
  id: "cmv",
  title: "CMV — cytomegalovírus (angl. cytomegalovirus)",
  match: ["CMV"],
  img: {
    "src": "assets/images/cmv-owl-eye.jpg",
    "alt": "Inklúzia „sovie oko“ pri cytomegalovírusovej infekcii.",
    "caption": "Inklúzia „sovie oko“ pri cytomegalovírusovej infekcii.",
    "credit": "CDC/Dr. Edwin P. Ewing, Jr. (PHIL #958) · public domain",
    "href": "https://commons.wikimedia.org/wiki/File:Cytomegalovirus_01.jpg"
  },
  short: "Herpetický vírus; v bunke vytvorí veľké jadrové inklúzie („sovie oko“), nebezpečný pri oslabenej imunite.",
  body: "<ul><li>Inklúzie „sovie oko“ sa nachádzajú v jadre aj cytoplazme zväčšenej bunky (cytomegalia).</li><li>Latentne ho nesie väčšina dospelých.</li><li>Nebezpečný je pri transplantácii a AIDS (retinitída, kolitída, pneumónia).</li></ul>"
},
{
  id: "hcc",
  title: "HCC — hepatocelulárny karcinóm (angl. hepatocellular carcinoma)",
  match: ["HCC"],
  short: "Zhubný nádor z hepatocytov; vzniká najmä v cirhotickej pečeni.",
  body: "<ul><li>Najčastejšie vzniká na pôde cirhózy (HBV, HCV, alkohol, MASH).</li><li>Marker: α-fetoproteín.</li><li>Šíri sa cez cievy (invázia do vrátnice).</li></ul>"
},
{
  id: "rcc",
  title: "RCC — karcinóm z obličkových buniek (angl. renal cell carcinoma)",
  match: ["RCC"],
  short: "Zhubný nádor z epitelu obličkových tubulov (renal cell carcinoma); najčastejší typ má svetlú cytoplazmu plnú glykogénu a lipidov.",
  body: "<ul><li>Svetlobunkový typ súvisí so stratou génu VHL.</li><li>Na reze je žltý (lipidy, glykogén) a krváca.</li><li>Rastie do renálnej žily.</li></ul>"
},
{
  id: "sle",
  title: "SLE — systémový lupus erythematosus (angl. systemic lupus erythematosus)",
  match: ["lupus(?:u|e|om)?(?!\\s+(?:pernio|vulgaris))(?:\\s+erythematos\\w*)?", "systémov\\w*\\s+lupus\\w*(?:\\s+erythematos\\w*)?"], csMatch: ["SLE"],
  short: "Autoimunitná choroba s protilátkami proti vlastným jadrám; imunokomplexy poškodzujú obličky, kožu, kĺby a cievy.",
  body: "<p class=\"chain\">porucha odstraňovania odumretých buniek a tolerancie → autoprotilátky (ANA, anti-dsDNA) → imunokomplexy v obličkách, koži, kĺboch a cievach → komplement → zápal (precitlivenosť III. typu)</p><ul><li>Imunokomplexy spôsobujú lupusovú nefritídu; typická je „motýlia“ vyrážka na tvári a fotosenzitivita.</li><li>Protilátky proti krvinkám spôsobia trombocytopéniu a hemolýzu, antifosfolipidové protilátky naopak trombózu.</li></ul>"
},
{
  id: "als",
  title: "ALS — amyotrofická laterálna skleróza (angl. amyotrophic lateral sclerosis)",
  match: ["ALS"],
  img: {
    "src": "assets/images/neurogenic-atrophy-muscle.jpg",
    "alt": "Neurogénna atrofia svalu: skupiny atrofických vlákien po strate motoneurónov.",
    "caption": "Neurogénna atrofia svalu: skupiny atrofických vlákien po strate motoneurónov.",
    "credit": "Jensflorian · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Neurogenic_atrophy_muscle_biopsy_HE_x100.jpg"
  },
  short: "Zánik motorických neurónov v mozgu a mieche → neurogénna atrofia svalov a ochrnutie.",
  body: "<ul><li>Postihuje horný aj dolný motoneurón → spazmy a atrofia.</li><li>Postupuje rýchlo a zasiahne aj dýchacie svaly.</li></ul>"
},
{
  id: "gvhd",
  title: "GvHD — reakcia štepu proti hostiteľovi (angl. graft-versus-host disease)",
  match: ["GvHD"],
  short: "Po transplantácii kostnej drene napadnú T-lymfocyty darcu tkanivá príjemcu (koža, pečeň, črevo).",
  body: "<ul><li>Akútna: koža, pečeň (cholestáza), črevo (hnačka).</li><li>Chronická pripomína autoimunitu a sklerodermiu.</li></ul>"
},
{
  id: "cmp",
  title: "CMP — cievna mozgová príhoda (angl. stroke, cerebrovascular accident)",
  match: ["CMP"],
  img: {
    src: "assets/images/mca-stroke-brain.jpg",
    alt: "Infarkt mozgu v povodí strednej mozgovej tepny (pitva).",
    caption: "Infarkt mozgu v povodí strednej mozgovej tepny (pitva).",
    credit: "Marvin 101 · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:MCA-Stroke-Brain-Humn-2A.jpg"
  },
  short: "Náhla porucha prekrvenia mozgu: ischémia (infarkt mozgu) alebo krvácanie.",
  body: "<ul><li>Ischemická (infarkt mozgu) alebo hemoragická.</li><li>Rozhoduje čas: trombolýza a trombektómia pomáhajú len v krátkom okne.</li></ul>"
},
{
  id: "ichdk",
  title: "ICHDK — ischemická choroba dolných končatín (angl. peripheral arterial disease, PAD)",
  match: ["ICHDK"],
  img: {
    "src": "assets/images/gangrene-foot.jpg",
    "alt": "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    "caption": "Gangréna nohy: čierne vyschnuté tkanivo s ostrým prechodom do zdravej kože.",
    "credit": "آرمین · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Gangrene_Foot_01.jpg"
  },
  short: "Zúženie tepien nôh aterosklerózou → bolesť pri chôdzi, pri ťažkej forme gangréna.",
  body: "<ul><li>Bolesť pri chôdzi ustúpi v pokoji (klaudikácie).</li><li>V pokročilom štádiu je bolesť v pokoji, vredy a gangréna.</li></ul>"
},
{
  id: "kmp",
  title: "KMP — kardiomyopatia (angl. cardiomyopathy)",
  match: ["KMP"],
  img: {
    "src": "assets/images/lvh-gross.jpg",
    "alt": "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    "caption": "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_left_ventricular_hypertrophy.jpg"
  },
  short: "Choroba samotného srdcového svalu, ktorú nevysvetlí ischémia, chlopňa ani hypertenzia.",
  body: "<ul><li>Typy: dilatačná, hypertrofická, reštrikčná.</li><li>Príčiny: genetické, toxické (alkohol), zápalové.</li></ul>"
},
{
  id: "rds",
  title: "RDS — syndróm respiračnej tiesne novorodenca (angl. respiratory distress syndrome)",
  match: ["RDS"],
  short: "Nedonosené pľúca nemajú dosť surfaktantu → alveoly kolabujú, plazma presiakne a vytvorí hyalínne membrány.",
  body: "<ul><li>Surfaktant tvoria pneumocyty II. typu; u nedonosených ho je málo.</li><li>Hyalínne membrány sa skladajú zo spadnutých buniek a bielkovín plazmy.</li></ul>"
},
{
  id: "bmi",
  title: "BMI — index telesnej hmotnosti (angl. body mass index)",
  match: ["BMI"],
  short: "Hmotnosť v kg delená druhou mocninou výšky v m; nadváha od 25 kg/m², obezita od 30 kg/m².",
  body: "<ul><li>Norma 18,5–24,9 kg/m².</li><li>Nerozlíši tukovú od svalovej hmoty.</li></ul>"
},
{
  id: "hdl",
  title: "HDL — lipoproteín s vysokou hustotou (angl. high-density lipoprotein)",
  match: ["HDL"],
  short: "Odvádza cholesterol z tkanív do pečene; nízke HDL je rizikový faktor aterosklerózy.",
  body: "<ul><li>Zabezpečuje spätný transport cholesterolu z tkanív do pečene.</li><li>Pôsobí ochranne pred aterosklerózou.</li></ul>"
},
{
  id: "acth",
  title: "ACTH — adrenokortikotropný hormón (angl. adrenocorticotropic hormone)",
  match: ["ACTH"],
  short: "Hormón adenohypofýzy, ktorý riadi tvorbu kortizolu v kôre nadobličiek.",
  body: "<ul><li>Tvorí sa v adenohypofýze pod vplyvom CRH.</li><li>Vysoký je pri Cushingovej chorobe, nízky pri nádore nadobličky.</li></ul>"
},
{
  id: "makrofag-m1",
  img: {
    src: "assets/images/mi-healing-1-macrophages.jpg",
    alt: "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    caption: "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    credit: "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_macrophages_and_lymphocyte_infiltration_with_early_removal_of_necrotic_debris_in_myocardial_infarction.jpg"
  }, title: "M1 — prozápalový makrofág (angl. classically activated macrophage)",
  match: ["prozápalov\\w*\\s+makrofág\\w*\\s+\\(M1\\)", "makrofág\\w*\\s+M1", "M1"],
  short: "„Klasicky aktivovaný“ makrofág: zabíja mikróby, upratuje mŕtve tkanivo a zápal zosilňuje.",
  body:
    "<ul>" +
      "<li><b>Čo ho zapne</b> — mikrobiálne produkty (lipopolysacharid) a interferón γ z NK buniek a T-lymfocytov.</li>" +
      "<li><b>Čo tvorí</b> — kyslíkové radikály, TNF-α, IL-1, IL-6, IL-12.</li>" +
      "<li><b>Čo robí</b> — fagocytuje baktérie, fibrín a mŕtve bunky, volá ďalšie leukocyty.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> V rane prevláda prvé dni. Ak sa neprepne na M2 (infekcia, diabetes), rana ostáva v zápalovej fáze a nehojí sa. M1 a M2 sú krajné stavy tej istej bunky, nie dva druhy buniek.</p>'
},
{
  id: "makrofag-m2",
  img: {
    src: "assets/images/mi-healing-2-granulation.jpg",
    alt: "Reparačná fáza: granulačné tkanivo s novými cievami.",
    caption: "Reparačná fáza: granulačné tkanivo s novými cievami.",
    credit: "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_granulation_tissue_with_formation_of_microvessels_in_myocardial_infarction.jpg"
  }, title: "M2 — reparačný makrofág (angl. alternatively activated macrophage)",
  match: ["reparačn\\w*\\s+makrofág\\w*\\s+\\(M2\\)", "makrofág\\w*\\s+M2", "M2"],
  short: "„Alternatívne aktivovaný“ makrofág: tlmí zápal a rastovými faktormi stavia granulačné tkanivo.",
  body:
    "<ul>" +
      "<li><b>Čo ho zapne</b> — IL-4, IL-13 a pohltenie apoptotických neutrofilov (eferocytóza).</li>" +
      "<li><b>Čo tvorí</b> — IL-10 a TGF-β (tlmia zápal), VEGF, PDGF, FGF-2 (cievy a fibroblasty).</li>" +
      "<li><b>Čo robí</b> — riadi rast kapilár a tvorbu kolagénu.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Prepnutie M1 → M2 je okamih, keď sa zápal mení na hojenie. Príliš dlhá činnosť M2 vedie k nadmernej jazve a fibróze.</p>'
},
{
  id: "eferocytoza", et: "lat. <i>efferre</i> „vyniesť (na pohreb), pochovať“ + gr. <i>kytos</i> „bunka“ + <i>-osis</i> „stav, proces“",
  title: "Eferocytóza",
  match: ["eferocytóz\\w*"],
  img: {
    "src": "assets/images/mi-healing-1-macrophages.jpg",
    "alt": "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    "caption": "Makrofágy medzi odumretými kardiomyocytmi pohlcujú zvyšky buniek.",
    "credit": "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_macrophages_and_lymphocyte_infiltration_with_early_removal_of_necrotic_debris_in_myocardial_infarction.jpg"
  },
  short: "Pohltenie apoptotických buniek makrofágom; na rozdiel od fagocytózy baktérií zápal nespúšťa, ale tlmí.",
  body: "<ul><li>Makrofág rozpozná fosfatidylserín na povrchu apoptotickej bunky.</li><li>Spustí tvorbu IL-10, TGF-β a lipoxínov — zápal sa ukončí.</li><li>Pri zlyhaní vzniká sekundárna nekróza a môže sa spustiť autoimunita.</li></ul>"
},
{
  id: "pdgf", title: "PDGF — rastový faktor z krvných doštičiek (angl. platelet-derived growth factor)",
  match: ["PDGF"],
  short: "<i>Platelet-derived growth factor</i>: uložený v granulách doštičiek, tvoria ho aj makrofágy a endotel. Privoláva a rozmnožuje fibroblasty, bunky hladkého svalu a pericyty.",
  body:
    '<p class="chain">poranenie → doštičky sa aktivujú → <b>PDGF</b> → fibroblasty migrujú do rany a delia sa</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to prvý signál hojenia – uvoľní sa už pri vzniku zrazeniny, skôr než prídu makrofágy.</p>'
},
{
  id: "tgf-beta",
  img: {
    src: "assets/images/keloid-histology.jpg",
    alt: "Keloid: hrubé sklovité kolagénové pruhy pri nadmernej fibrotizácii.",
    caption: "Keloid: hrubé sklovité kolagénové pruhy pri nadmernej fibrotizácii.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Keloid_-1.jpg"
  }, title: "TGF-β — transformujúci rastový faktor β (angl. transforming growth factor beta)",
  match: ["TGF-β\\d?"],
  short: "<i>Transforming growth factor β</i>: hlavný signál tvorby väziva. Tvoria ho doštičky, makrofágy M2 a regulačné T-lymfocyty.",
  body:
    "<ul>" +
      "<li><b>Fibroblast</b> — tvorí viac kolagénu.</li>" +
      "<li><b>Rozklad matrix</b> — tlmí metaloproteinázy, kolagén sa preto hromadí.</li>" +
      "<li><b>Myofibroblast</b> — mení fibroblasty na bunky, ktoré ranu sťahujú.</li>" +
      "<li><b>Zápal</b> — tlmí lymfocyty a makrofágy.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Krátko pôsobí → jazva. Trvalo pôsobí → <b>fibróza orgánu</b> (cirhóza, pľúcna fibróza, keloid).</p>'
},
{
  id: "vegf", title: "VEGF — rastový faktor cievneho endotelu (angl. vascular endothelial growth factor)",
  match: ["VEGF(?:-A)?"],
  short: "<i>Vascular endothelial growth factor</i>: núti endotel migrovať a deliť sa (nové kapiláry) a zároveň zvyšuje priepustnosť ciev.",
  body:
    '<p class="chain">hypoxia → HIF → <b>VEGF</b> → endotel pučí smerom k miestu s nedostatkom kyslíka → nová kapilára</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo je granulačné tkanivo červené a opuchnuté. Nádory ho zneužívajú na vlastné cievne zásobenie; lieky proti VEGF preto zároveň zhoršujú hojenie rán.</p>'
},
{
  id: "hif", title: "HIF — faktor indukovaný hypoxiou (angl. hypoxia-inducible factor)",
  match: ["HIF(?:-1α?)?"],
  short: "<i>Hypoxia-inducible factor</i>: transkripčný faktor, ktorým bunka meria kyslík.",
  body:
    '<p class="chain">dosť O₂ → HIF sa hydroxyluje (enzým potrebuje kyslík) → rozloží ho proteazóm<br>málo O₂ → HIF ostane, vstúpi do jadra → gény pre <b>VEGF</b>, erytropoetín a enzýmy glykolýzy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vďaka nemu rastú cievy presne tam, kde chýba kyslík – v rane, v ischemickom tkanive aj v nádore.</p>'
},
{
  id: "fgf",
  title: "FGF-2 — fibroblastový rastový faktor 2 (angl. fibroblast growth factor 2)",
  match: ["FGF-2", "bFGF", "FGF"],
  short: "<i>Fibroblast growth factor 2</i> (bázický FGF): podporuje delenie endotelu a fibroblastov; spolu s VEGF riadi rast nových ciev.",
  body: "<ul><li>Tvoria ho aj endotel a makrofágy.</li><li>Spolu s VEGF riadi angiogenézu v granulačnom tkanive.</li></ul>"
},
{
  id: "mmp", title: "MMP — matrixové metaloproteinázy (angl. matrix metalloproteinases)",
  match: ["matrixov\\w*\\s+metaloproteináz\\w*", "metaloproteináz\\w*", "MMP(?:-\\d+)?"],
  short: "Enzýmy so zinkom v aktívnom mieste, ktoré štiepia kolagén a ostatné zložky medzibunkovej hmoty.",
  body:
    "<ul>" +
      "<li><b>Kto ich tvorí</b> — makrofágy, neutrofily, fibroblasty, endotel.</li>" +
      "<li><b>Načo sú</b> — uvoľnia cestu pučiacej kapiláre a migrujúcim bunkám, prestavujú jazvu.</li>" +
      "<li><b>Čo ich brzdí</b> — tkanivové inhibítory (TIMP).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Rozhoduje rovnováha: priveľa MMP (chronická rana) rozloží matrix aj rastové faktory a rana sa nehojí; primálo → kolagén sa hromadí (fibróza).</p>'
},
{
  id: "angiogeneza", et: "gr. <i>angeion</i> „cieva“ + <i>genesis</i> „vznik“",
  title: "Angiogenéza",
  match: ["angiogenéz\\w*"],
  img: {
    "src": "assets/images/granulation-tissue.jpg",
    "alt": "Granulačné tkanivo: množstvo novotvorených kapilár a fibroblasty.",
    "caption": "Granulačné tkanivo: množstvo novotvorených kapilár a fibroblasty.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Granulation_tissue_low_power.jpg"
  },
  short: "Vznik nových kapilár pučaním z ciev, ktoré už existujú; spúšťa ju hypoxia cez HIF a VEGF.",
  body: "<ul><li>Postup: odlúčenie pericytov, pučanie endotelu, tvorba lúmenu, dozrievanie.</li><li>Aktivátory: VEGF a FGF-2; inhibítor: endostatín.</li><li>Bez nej nádor nerastie nad niekoľko milimetrov.</li></ul>"
},
{
  id: "myofibroblast", et: "gr. <i>mys</i> „sval“ + fibroblast",
  img: {
    src: "assets/images/dupuytren-hand.jpg",
    alt: "Dupuytrenova kontraktúra: myofibroblasty a kolagén sťahujú aponeurózu dlane.",
    caption: "Dupuytrenova kontraktúra: myofibroblasty a kolagén sťahujú aponeurózu dlane.",
    credit: "Markbenecke · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Hand_of_Morbus_Dupuytren_Patient.jpg"
  }, title: "Myofibroblast",
  match: ["myofibroblast\\w*"],
  short: "Fibroblast, ktorý pod vplyvom TGF-β a mechanického napätia získal sťahovacie vlákna (aktín hladkého svalu, α-SMA).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Sťahuje okraje rany k sebe. Po zahojení má zaniknúť apoptózou; ak pretrvá, vzniká kontraktúra, hypertrofická jazva alebo fibróza.</p>'
},
{
  id: "luh", title: "Lúh (silná zásada)",
  match: ["lúh\\w*"],
  short: "Roztok hydroxidu (napr. sodného v čističoch odpadov). Tuky zmydelňuje a bielkoviny rozpúšťa → kolikvačná nekróza, ktorá sa šíri do hĺbky.",
  body:
    '<p class="chain">lúh → rozpustí bielkoviny a tuky → mäkká, mazľavá nekróza bez bariéry → preniká ďalej<br>kyselina → bielkoviny zrazí → suchá chrasta (koagulačná nekróza) → ďalší prienik brzdí</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Poleptanie pažeráka lúhom je preto hlbšie než kyselinou a hojí sa jazvou, ktorá pažerák zužuje.</p>'
},
{
  id: "van-gieson",
  title: "Van Gieson",
  match: ["van\\s+Gieson\\w*"],
  short: "Farbenie väziva: kolagén červený, sval, cytoplazma, fibrín a fibrinoid žlté, jadrá čierne.",
  body:
    '<p class="chain">zmes dvoch kyslých farbív: malá molekula <b>kyseliny pikrovej</b> (žltá) prenikne všade → veľká molekula <b>kyslého fuchsínu</b> (červená) ju vytlačí len z riedkej, pórovitej siete kolagénu → <b>kolagén červený, ostatné žlté</b></p>' +
    "<ul>" +
      "<li><b>Jadrá</b> — čierne (železitý hematoxylín).</li>" +
      "<li><b>S elastikou</b> — po pridaní farbiva na elastické vlákna sú tie čierne (stena tepny).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Ukáže, koľko je v tkanive väziva (jazva, fibróza, cirhóza), a odlíši <b>hyalín z kolagénu</b> (červený) od <b>fibrinoidu</b> (žltý), ktoré sú v H&E oba ružové.</p>',
  img: {
    src: "assets/images/stain-van-gieson.jpg",
    alt: "Kostrový sval vo farbení van Gieson: svalové vlákna žlté, väzivo medzi nimi červené.",
    caption: "Van Gieson: sval žltý, kolagén červený.",
    credit: "Aigaby · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Tinci%C3%B3n_de_Van_Gieson.jpg"
  }
},
{
  id: "trichrom", et: "gr. <i>tri-</i> „tri“ + <i>chroma</i> „farba“",
  title: "Trichróm (Masson)",
  match: ["trichróm\\w*", "Masson\\w*"],
  short: "Farbenie troma farbivami: kolagén modrý alebo zelený, sval, cytoplazma a fibrín červené, jadrá tmavé.",
  body:
    '<p class="chain">červené farbivo zafarbí všetko → kyselina fosfomolybdénová ho vytlačí z kolagénu (ten je najpórovitejší) → do uvoľneného kolagénu vstúpi veľká molekula modrého alebo zeleného farbiva → <b>kolagén modrý/zelený, bunky červené</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Kontrast väziva a buniek je väčší než v H&E, preto sa ním hodnotí <b>stupeň fibrózy</b> – v pečeni (od jemných vlákien po cirhózu), v obličke, v myokarde po infarkte. Kolagén sa farbí inak než fibrín, takže odlíši aj jazvu od čerstvého fibrínu.</p>',
  img: {
    src: "assets/images/stain-masson-trichrome.jpg",
    alt: "Pečeň so steatózou vo farbení trichrómom: hepatocyty červené, jemné väzivo zelené.",
    caption: "Trichróm: väzivo zelené, hepatocyty červené (steatóza pečene s miernou fibrózou).",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Non-alcoholic_fatty_liver_disease1.jpg"
  }
},
{
  id: "perls",
  title: "Perlsova reakcia (berlínska modrá)",
  match: ["Perlsov\\w*\\s+reakci\\w*", "Perlsov\\w*", "berlínsk\\w*\\s+modr\\w*"],
  short: "Dôkaz železa v tkanive: hemosiderín sa sfarbí sýtomodro.",
  body:
    '<p class="chain">kyselina chlorovodíková uvoľní Fe³⁺ z hemosiderínu → Fe³⁺ + ferokyanid draselný → nerozpustný modrý pigment (<b>berlínska modrá</b>) priamo na mieste železa</p>' +
    "<ul>" +
      "<li><b>Farbí sa</b> — hemosiderín (zásobné železo v makrofágoch a hepatocytoch).</li>" +
      "<li><b>Nefarbí sa</b> — železo pevne viazané v heme (hemoglobín v erytrocytoch).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Hnedý zrnitý pigment v H&E môže byť hemosiderín, lipofuscín aj melanín – modrý vyjde len hemosiderín. Dokáže staré krvácanie, siderofágy v pľúcach pri venostáze (hromadení krvi pri zlyhávajúcom srdci) a preťaženie železom (hemochromatóza).</p>',
  img: {
    src: "assets/images/stain-perls.jpg",
    alt: "Pľúca vo farbení berlínskou modrou: makrofágy v alveolách plné modrého hemosiderínu.",
    caption: "Perlsova reakcia: hemosiderín v makrofágoch alveol je modrý (stav po krvácaní do pľúc).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Intra-alveolar_hemosiderin_deposition_-_Prussian_blue_stain.jpg"
  }
},
{
  id: "von-kossa",
  title: "Von Kossa",
  match: ["von\\s+Koss\\w*"],
  short: "Dôkaz vápenatých solí v tkanive: ložiská kalcifikácie sú čierne.",
  body:
    '<p class="chain">dusičnan strieborný → striebro nahradí vápnik vo fosfátoch a uhličitanoch → svetlo ho zredukuje na <b>čierne kovové striebro</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Reakcia v skutočnosti dokazuje fosfát a uhličitan, na ktoré je vápnik viazaný. V H&E je vápnik tmavomodrý a ľahko sa zamení; von Kossa potvrdí dystrofickú kalcifikáciu v nekróze aj metastatickú pri hyperkalciémii.</p>',
  img: {
    src: "assets/images/stain-von-kossa.jpg",
    alt: "Farbenie von Kossa: okrúhle zvápenatené telieska v makrofágoch sú čierne.",
    caption: "Von Kossa: zvápenatené telieska sú čierne (malakoplakia).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Malakoplakia_-_Von_Kossa_stain_Case_189_(5938810870).jpg"
  }
},
{
  id: "olejova-cerven",
  title: "Olejová červeň (Oil Red O)",
  match: ["olejov\\w*\\s+červe\\w*", "Oil\\s+Red\\s+O"],
  img: {
    "src": "assets/images/stain-oil-red-o.jpg",
    "alt": "Zmrazený rez pečene vo farbení olejovou červeňou: tukové kvapôčky jasnočervené.",
    "caption": "Olejová červeň: tukové kvapôčky v steatotickej pečeni sú červené.",
    "credit": "VB83 · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:OIL_RED_IN_LIVER_(LIPIDS).jpg"
  },
  short: "Farbivo rozpustné v tukoch: kvapôčky neutrálneho tuku sú červené.",
  body: "<p class=\"chain\">farbivo sa v tuku rozpúšťa lepšie než vo svojom rozpúšťadle → prejde do tukovej kvapôčky → tuk červený</p><p class=\"why\"><b>Prečo to je dôležité.</b> Funguje len na zmrazenom reze: pri bežnom parafínovom spracovaní alkohol a xylén tuk vyplavia. Potvrdí steatózu a tukovú embóliu.</p>"
},
{
  id: "sudan",
  title: "Sudán",
  match: ["Sudán\\w*", "Sudan\\w*"],
  short: "Skupina farbív rozpustných v tukoch (Sudán III, IV, čierny); tuk po nich oranžovo až červeno.",
  body: "<ul><li>Sudán III a IV farbia tuk oranžovo až červeno.</li><li>Sudán čierny B ho farbí tmavomodro.</li><li>Farbí neutrálny tuk na zmrazenom reze.</li></ul>"
},
{
  id: "retikulin", et: "lat. <i>reticulum</i> „sieťka“",
  title: "Retikulín",
  match: ["retikulín\\w*"],
  img: {
    "src": "assets/images/stain-reticulin.jpg",
    "alt": "Pečeň vo striebrení na retikulín: čierna sieť vlákien pozdĺž trámcov hepatocytov, portálne pole a centrálna žila.",
    "caption": "Striebrenie na retikulín: čierna sieť je kostra pečeňového lalôčika.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Liver_reticulin.jpg"
  },
  short: "Jemné vlákna kolagénu typu III, ktoré tvoria kostru pečene, lymfatickej uzliny, sleziny a kostnej drene; v H&E ich nevidno.",
  body: "<ul><li>Zdravá pečeň — pravidelná sieť pozdĺž trámcov hrubých 1–2 bunky.</li><li>Po nekróze sieť skolabuje; pri nádore chýba alebo sú trámce príliš hrubé.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Retikulín je kostra, po ktorej sa pri regenerácii usporiadajú nové bunky. Kým je zachovaný, orgán sa obnoví do pôvodnej štruktúry.</p>"
},
{
  id: "striebrenie",
  title: "Striebrenie (impregnácia striebrom)",
  match: ["striebren\\w*", "impregnáci\\w*"],
  short: "Metódy, pri ktorých sa striebro usadí na štruktúrach a po redukcii ich zafarbí na čierno.",
  body: "<p class=\"chain\">roztok striebornej soli → striebro sa usadí na vláknach / bunkových stenách → redukcia → čierne kovové striebro</p><ul><li>Retikulín, steny húb (Grocott), tenké baktérie (Warthin–Starry).</li></ul>"
},
{
  id: "gram",
  title: "Gramovo farbenie",
  match: ["grampozitívn\\w*", "gramnegatívn\\w*", "Gramov\\w*\\s+farben\\w*", "podľa\\s+Grama", "Gram(?=\\s*[,)])"],
  short: "Delí baktérie podľa stavby steny: grampozitívne sú modrofialové, gramnegatívne červené.",
  body:
    '<p class="chain">kryštálová violeť + jód vytvoria v bunke veľký komplex → alkohol: <b>hrubá vrstva peptidoglykánu</b> komplex udrží (grampozitívne, fialové) × tenká vrstva pod vonkajšou membránou ho pustí (gramnegatívne, odfarbia sa) → dofarbenie červeným farbivom</p>' +
    "<ul>" +
      "<li><b>Grampozitívne</b> — stafylokoky, streptokoky, klostrídiá.</li>" +
      "<li><b>Gramnegatívne</b> — <i>E. coli</i>, neisérie, pseudomonády; ich vonkajšia membrána nesie lipopolysacharid (endotoxín).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Výsledok je za pár minút a spolu s tvarom baktérie (koky, tyčinky) usmerní prvú voľbu antibiotika skôr, než vyrastie kultivácia.</p>',
  img: {
    src: "assets/images/stain-gram.jpg",
    alt: "Náter hnisu v Gramovom farbení: fialové koky v zhlukoch medzi červeno sfarbenými neutrofilmi.",
    caption: "Gram: grampozitívne koky v zhlukoch (stafylokoky) v hnise.",
    credit: "Ajay Kumar Chaurasiya · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Pus_in_Gram_stain_showing_Gram_positive_cocci_in_singles,_pairs_and_clusters.jpg"
  }
},
{
  id: "grocott",
  title: "Grocott (striebrenie húb)",
  match: ["Grocott\\w*", "GMS"],
  short: "Striebrenie, ktoré zafarbí steny húb načierno na zelenom pozadí.",
  body:
    '<p class="chain">kyselina chrómová oxiduje polysacharidy steny huby na aldehydy → aldehydy zredukujú striebro z roztoku → <b>čierne kovové striebro na stene</b>; pozadie sa dofarbí nazeleno</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> V H&E sú huby bledé a v nekróze sa stratia; po striebrení vidno ich tvar – vetvené hýfy aspergila, kvasinky kandidy, cysty pneumocysty – a podľa tvaru sa určí pôvodca.</p>',
  img: {
    src: "assets/images/stain-grocott.jpg",
    alt: "Pľúca vo farbení podľa Grocotta: čierne vetvené hýfy na zelenom pozadí.",
    caption: "Grocott: čierne vetvené hýfy aspergila prerastajú do steny cievy.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Aspergillosis,_angioinvasive,_-_GMS_stain_(5390967417).jpg"
  }
},
{
  id: "alcianova-modra",
  title: "Alciánová modrá",
  match: ["alciánov\\w*\\s+modr\\w*"],
  short: "Farbenie kyslého hlienu a kyslých glykozaminoglykánov namodro.",
  body:
    '<p class="chain">kladne nabitá molekula farbiva → naviaže sa na záporne nabité karboxylové a sulfátové skupiny kyslých mucínov a glykozaminoglykánov → <b>modrá farba</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Spolu s PAS rozlíši druh hlienu: neutrálny (žalúdok) je purpurový, kyslý (pohárikové bunky čreva) modrý. Modré pohárikové bunky v pažeráku alebo žalúdku tak prezradia <b>intestinálnu metapláziu</b>.</p>',
  img: {
    src: "assets/images/stain-alcian-blue.jpg",
    alt: "Sliznica tenkého čreva vo farbení alciánovou modrou: pohárikové bunky sýtomodré.",
    caption: "Alciánová modrá: hlien v pohárikových bunkách čreva je modrý.",
    credit: "Endolysosome · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Small_intestine_Alcian_blue_400x.jpg"
  }
},
{
  id: "ziehl-neelsen", et: "acidorezistentný: lat. <i>acidus</i> „kyslý“ + <i>resistere</i> „odolávať“",
  title: "Ziehl–Neelsen (acidorezistentné tyčinky)",
  match: ["Ziehl\\w*[–-]Neelsen\\w*", "acidorezistentn\\w*"],
  short: "Farbenie mykobaktérií: tyčinky sú červené na modrom pozadí.",
  body:
    '<p class="chain">karbolfuchsín za tepla prenikne voskovou stenou mykobaktérií → kyslý alkohol vypláchne farbivo zo všetkých ostatných buniek, no z mykobaktérií nie, lebo ich stena je bohatá na <b>mykolové kyseliny</b> → mykobaktérie ostanú červené a pozadie sa dofarbí namodro</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> „Acidorezistentný“ znamená práve to, že sa baktéria kyselinou neodfarbí. Tyčiniek býva málo, preto negatívny nález tuberkulózu nevylučuje – rozhoduje kultivácia a PCR.</p>',
  img: {
    src: "assets/images/ziehl-neelsen.jpg",
    alt: "Mycobacterium tuberculosis vo farbení Ziehl–Neelsen: červené tyčinky na modrom pozadí.",
    caption: "Ziehl–Neelsen: červené acidorezistentné tyčinky.",
    credit: "CDC / George P. Kubica · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mycobacterium_tuberculosis_Ziehl-Neelsen_stain_02.jpg"
  }
},
{
  id: "kozny-step",
  title: "Kožný štep",
  match: ["kožn\\w*\\s+štep\\w*", "dermoepidermov\\w*"],
  short: "Kúsok kože odobratý z iného miesta tela a prenesený na ranu bez vlastných ciev – žije z toho, čo mu dá spodina.",
  body:
    "<ul>" +
      "<li><b>Dermoepidermový (tenký)</b> — epidermis s časťou dermis; ujme sa ľahšie, odberové miesto sa zahojí samo z vlasových folikulov a žliaz.</li>" +
      "<li><b>V plnej hrúbke</b> — epidermis s celou dermis; lepší vzhľad a menej sa zmršťuje, no potrebuje výborne prekrvenú spodinu.</li>" +
    "</ul>" +
    '<p class="chain">prvé dni výživa difúziou zo spodiny → cievy spodiny vrastú do štepu → štep je prihojený</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Štep sa ujme len tam, kde je čisté, dobre prekrvené tkanivo – preto sa dobre drží na granulačnom tkanive a neujme sa na holej kosti, šľache ani v infikovanej rane. Na rozdiel od neho <b>lalok</b> si nesie vlastné cievy.</p>'
},
{
  id: "schlofferov-tumor", et: "lat. <i>tumor</i> „opuch, nádor“ (<i>tumere</i> „puchnúť“)",
  title: "Schlofferov tumor (nepravý nádor okolo stehu)",
  match: ["Schloffer\\w*\\s+(?:pseudo)?tumor\\w*", "Schloffer\\w*"],
  img: {
    "src": "assets/images/suture-granuloma.jpg",
    "alt": "Granulóm okolo stehu v brušnej stene: sýtoružové úlomky vlákna obkolesené obrovskými viacjadrovými bunkami a väzivom.",
    "caption": "Granulóm okolo stehu v brušnej stene (H&E) – mikroskopický podklad Schlofferovho tumoru.",
    "credit": "Ed Uthman · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Suture_Granuloma,_Abdominal_Wall_(6264529452).jpg"
  },
  short: "Tuhé zápalové zdurenie okolo stehu alebo iného cudzieho materiálu po operácii – nie je to nádor, len ho napodobňuje.",
  body: "<p class=\"chain\">steh (najmä nevstrebateľný) ostane v tkanive → makrofágy ho nestrávia → <b>granulóm z cudzích telies</b> → ak sú na vlákne baktérie, pridá sa hnisanie → okolo rastie granulačné tkanivo a väzivo → <b>tuhá hrča</b> v jazve alebo v bruchu</p><ul><li><b>Kedy</b> — mesiace až roky po operácii, preto si ju pacient s výkonom často nespojí.</li><li><b>Mikroskopicky</b> — vlákna stehu (dvojlomné v polarizovanom svetle) obkolesené obrovskými viacjadrovými bunkami, okolo chronický zápal a väzivo, niekedy drobný absces v strede.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Hmatom aj na zobrazení vyzerá ako nádor alebo návrat nádoru po onkologickej operácii. Rozhodne až histológia – žiadne atypické bunky, len reakcia na cudzí materiál.</p>"
},
{
  id: "npwt",
  title: "NPWT — podtlaková terapia rán (angl. negative-pressure wound therapy)",
  match: ["NPWT", "podtlakov\\w*\\s+terapi\\w*"],
  short: "<i>Negative pressure wound therapy</i>: pena v rane pod fóliou napojená na pumpu, ktorá udržiava podtlak – odsáva exsudát, zmenšuje opuch a podnecuje rast granulačného tkaniva.",
  body: "<ul><li>Odstraňuje exsudát a znižuje bakteriálnu záťaž.</li><li>Mechanický podtlak podporuje granulačné tkanivo.</li></ul>"
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "keloid", et: "gr. <i>kélé</i> „hrča, výčnelok“ + <i>eidos</i> „podoba“",
  img: {
    src: "assets/images/keloid-ear.jpg",
    alt: "Keloid ušného lalôčika.",
    caption: "Keloid ušného lalôčika.",
    credit: "Bobjgalindo · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:A_keloid_scar_on_ear_lobe.jpg"
  },
  title: "Keloid",
  match: ["keloid\\w*"],
  short: "Jazva, ktorá prerastá za okraje pôvodnej rany, sama nezmenšuje a po vyrezaní sa vracia. Tvoria ju hrubé hyalinizované kolagénové pruhy medzi riedkymi fibroblastmi."
},
{
  id: "hypertroficka-jazva",
  img: {
    src: "assets/images/hypertrophic-scar-vaccination.jpg",
    alt: "Hypertrofická jazva po očkovaní: vyvýšená, v hraniciach pôvodnej rany.",
    caption: "Hypertrofická jazva po očkovaní: vyvýšená, v hraniciach pôvodnej rany.",
    credit: "シトラマタ · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Hypertrophic_scar_of_smallpox_vaccination.jpg"
  },
  title: "Hypertrofická jazva",
  match: ["hypertrofick\\w*\\s+jazv\\w*"],
  short: "Vyvýšená jazva, ktorá neprerastá za okraje pôvodnej rany a časom sa môže sama zmenšiť. Pri nadmernej tvorbe kolagénu pri hojení sa líši od keloidu práve tým, že ostáva v hraniciach rany."
},
{
  id: "kalus", et: "lat. <i>callus</i> „zatvrdnutá koža, mozoľ“",
  img: {
    src: "assets/images/fracture-callus-xray.jpg",
    alt: "Kalus okolo zlomeniny ramennej kosti (RTG).",
    caption: "Kalus okolo zlomeniny ramennej kosti (RTG).",
    credit: "Bill Rhodes · CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Communitive_midshaft_humeral_fracture_callus.jpg"
  },
  title: "Kalus (kostný)",
  match: ["kalus\\w*"],
  short: "Nové tkanivo, ktoré sa vytvorí medzi úlomkami zlomenej kosti: najprv väzivový a chrupkový, potom skostnatí. Je to organizácia výronu medzi úlomkami, ktorá končí kosťou."
},
{
  id: "dekubit", et: "lat. <i>decumbere</i> „ležať“",
  img: {
    src: "assets/images/pressure-ulcer.jpg",
    alt: "Preležanina 4. stupňa.",
    caption: "Preležanina 4. stupňa.",
    credit: "Ibrahim Husain Meraj · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Pressure_Ulcer_grade_4.jpg"
  },
  title: "Preležanina (dekubit)",
  match: ["preležanin\\w*", "dekubit\\w*"],
  short: "Chronická rana vzniknutá z dlhého tlaku na tkanivo, ktorý zastaví prekrvenie a vyvolá ischemickú nekrózu. Podľa hĺbky sa delí na štyri stupne; najťažší siaha do hlbokých vrstiev."
}

);

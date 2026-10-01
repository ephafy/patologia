/* Glosár PATOLY — spoločné mechanizmy (energia, vápnik, enzýmy, typy smrti), zápal a hojenie,
   farbenia, laboratórne markery a klinické skratky. Texty sú vlastné (CLAUDE.md §4.1).
   Pozor: vyhľadávanie ignoruje veľkosť písmen — skratky, ktoré sú aj bežným slovom
   (MI, MA, IM, AL), sa zámerne nechytajú. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── zápal a hojenie ─────────────────────────────────────────────────── */
{
  id: "zapal",
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
  id: "alteracia",
  title: "Alterácia",
  match: ["alterác\\w*", "alteratívn\\w*"],
  short: "Poškodenie tkaniva na začiatku zápalu — od dystrofie po nekrózu.",
  body:
    '<p class="chain">príčina zápalu → <b>poškodené bunky</b> uvoľnia mediátory a DAMP → spustia cievnu reakciu (exsudáciu) a prílev buniek (infiltráciu)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Čím väčšia alterácia, tým väčší defekt ostane a tým skôr sa tkanivo hojí <b>jazvou</b> namiesto regenerácie.</p>'
},
{
  id: "infiltrat",
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
  id: "leukocyty",
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
  id: "fagocytoza",
  title: "Fagocytóza",
  match: ["fagocyt\\w*"],
  short: "Pohltenie častice bunkou (neutrofilom, makrofágom) a jej strávenie v lyzozóme.",
  body:
    '<p class="chain">rozpoznanie (opsoníny, „zjedz ma“ signál) → obalenie membránou → fagozóm → splynie s lyzozómom → <b>strávenie</b> (enzýmy, ROS)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Apoptotické telieska sa fagocytujú potichu, baktérie a nekrotické zvyšky so zápalom — enzýmy a ROS fagocytov môžu uniknúť a poškodiť okolie.</p>'
},
{
  id: "komplement",
  title: "Komplement a imunokomplexy",
  match: ["komplement\\w*", "C5a", "C3b", "imunokomplex\\w*", "Arthus\\w*"],
  short: "Komplement je kaskáda plazmatických bielkovín; imunokomplex je protilátka naviazaná na antigén, ktorá ho aktivuje.",
  body:
    '<p class="chain">imunokomplex uložený v stene cievy → <b>aktivácia komplementu</b> → C5a priláka neutrofily, C3b opsonizuje, komplex C5b–9 prederaví membrány → neutrofily uvoľnia enzýmy → <b>poškodenie steny</b> (fibrinoid)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to podstata precitlivenosti <b>III. typu</b> (vaskulitídy, SLE, Arthusov fenomén).</p>'
},
{
  id: "edem",
  title: "Edém (opuch)",
  match: ["edém\\w*", "edematózn\\w*"],
  short: "Nadbytok tekutiny v interstíciu — zápalový (exsudát) alebo nezápalový (transsudát).",
  body:
    '<div class="fork">' +
      "<div><b>Zápalový</b><br>↑ priepustnosť ciev<br>bohatý na bielkoviny</div>" +
      "<div><b>Nezápalový</b><br>↑ hydrostatický / ↓ onkotický tlak, zlá lymfatická drenáž<br>chudobný na bielkoviny</div>" +
    "</div>"
},
{
  id: "serozny",
  title: "Serózny zápal",
  match: ["serózn\\w*\\s+zápal\\w*", "serózn\\w*\\s+exsudát\\w*", "serózn\\w*\\s+výpot\\w*"],
  short: "Exsudát riedky ako krvné sérum — málo bielkovín a buniek; vzniká pri slabom podnete.",
  body:
    '<p class="chain">slabý podnet → vazodilatácia a mierne ↑ priepustnosť → <b>vodnatý exsudát</b> → resorpcia → hojenie bez defektu</p>'
},
{
  id: "serozne-blany",
  title: "Serózne blany",
  match: ["serózn\\w*\\s+blan\\w*"],
  short: "Pleura, perikard a peritoneum — hladké blany vystielajúce telesné dutiny.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zápal na nich tvorí výpotok do dutiny; fibrín, ktorý sa nerozpustí, zlepí listy do <b>zrastov</b>.</p>'
},
{
  id: "regeneracia",
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
  title: "Jazva a fibróza",
  match: ["jazv\\w*", "fibróz\\w*", "fibrotizác\\w*", "fibrotick\\w*", "sklerotizác\\w*"],
  short: "Náhrada zaniknutého tkaniva kolagénovým väzivom — defekt sa zacelí, ale funkcia sa stratí.",
  body:
    '<p class="chain">zničená kostra tkaniva alebo nedeliace sa bunky → makrofágy (TGF-β) → <b>granulačné tkanivo</b> → fibroblasty ukladajú kolagén → cievy ustupujú → <b>jazva</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Jazva v orgáne je trvalá strata funkčného tkaniva — v pečeni cirhóza, v myokarde po infarkte, v pľúcach fibróza.</p>'
},
{
  id: "organizacia",
  title: "Organizácia",
  match: ["organizáci\\w*", "organizuj\\w*", "karnifikáci\\w*"],
  short: "Prerastenie nerozpusteného materiálu (fibrín, trombus, nekróza) granulačným tkanivom až na väzivo.",
  body:
    '<p class="chain">fibrín sa nestihne rozpustiť → vrastú kapiláry a fibroblasty → <b>väzivo na mieste exsudátu</b> → zrasty; v pľúcach <b>karnifikácia</b> (tuhé „mäsité“ pľúca)</p>'
},
{
  id: "pseudocysta",
  title: "Pseudocysta",
  match: ["pseudocyst\\w*"],
  short: "Dutina bez epitelovej výstelky, ktorá ostane po resorpcii kolikvačnej nekrózy (mozog, pankreas).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pravá cysta má epitel, pseudocysta len stenu z gliózy alebo väziva.</p>'
},
{
  id: "lobarna-pneumonia",
  title: "Krupózna (lobárna) pneumónia",
  match: ["krupózn\\w*\\s+pneumóni\\w*", "lobárn\\w*\\s+pneumóni\\w*", "hepatizáci\\w*"],
  short: "Fibrinózny zápal celého laloka pľúc, typicky pneumokokový — prebieha v štádiách.",
  body:
    '<p class="chain">kongescia → <b>červená hepatizácia</b> (erytrocyty, neutrofily, fibrín) → <b>sivá hepatizácia</b> (rozpad erytrocytov, fibrín) → <b>rezolúcia</b> (fibrín sa rozpustí)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Steny alveol ostávajú celé, preto sa pľúca obvykle obnovia bez jazvy. Ak sa fibrín nerozpustí → karnifikácia.</p>'
},
{
  id: "lad",
  title: "Deficit adhézie leukocytov (LAD)",
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
  id: "trombus",
  title: "Trombus a trombóza",
  match: ["trombus", "trombu", "tromby", "trombov", "trombmi", "trombóz\\w*", "trombotiz\\w*"],
  short: "Zrazenina krvi vytvorená za života v cieve alebo srdci, prichytená k stene.",
  body:
    '<p class="chain">poškodený endotel + spomalený tok + ↑ zrážanlivosť (Virchowova triáda) → <b>trombus</b> → uzáver cievy (ischémia, infarkt) alebo odlomenie (embólia)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Na rozdiel od posmrtnej zrazeniny je trombus <b>priľnavý k stene</b>, matný a vrstevnatý.</p>'
},
{
  id: "sepsa",
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
  title: "SOFA — skóre zlyhania orgánov",
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
  title: "SIRS — syndróm systémovej zápalovej odpovede",
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
  title: "MODS — syndróm multiorgánovej dysfunkcie",
  match: ["MODS", "multiorgánov\\w*"],
  short: "Postupné zlyhávanie dvoch a viacerých orgánov u ťažko chorého, pri ktorom telo bez liečby neudrží rovnováhu.",
  body:
    '<p class="chain">hypoperfúzia + mikrotromby + cytokíny → poškodenie buniek v orgánoch → zlyhá napr. oblička → hromadia sa toxíny a tekutina → zaťažia srdce a pľúca → ďalší orgán zlyhá</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Každý zlyhaný orgán zhoršuje ostatné, preto úmrtnosť stúpa s počtom zlyhaných orgánov.</p>'
},
{
  id: "map",
  title: "MAP — stredný arteriálny tlak",
  match: ["MAP", "stredn\\w* arteriáln\\w* tlak\\w*"],
  short: "Priemerný tlak v tepnách počas celého srdcového cyklu; ≈ diastolický + ⅓ (systolický − diastolický), norma ≈ 70–100 mm Hg.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> MAP poháňa krv cez orgány. Pod ≈ 65 mm Hg obličky, mozog a srdce prestávajú udržať prietok – preto je to cieľ liečby septického šoku.</p>'
},
{
  id: "vazopresory",
  title: "Vazopresory",
  match: ["vazopresor\\w*"],
  short: "Lieky, ktoré zúžia cievy a tým zvýšia krvný tlak (napr. noradrenalín cez α₁-receptory).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri septickom šoku sú cievy rozšírené tak, že tekutina tlak nezvýši; potreba vazopresorov na udržanie MAP ≥ 65 mm Hg je súčasť definície septického šoku.</p>'
},
{
  id: "tbc",
  title: "Tuberkulóza (TBC)",
  match: ["TBC", "tuberkulóz\\w*", "tuberkulózn\\w*", "mykobaktéri\\w*"],
  short: "Infekcia <i>Mycobacterium tuberculosis</i> — vzor granulomatózneho zápalu s kazeóznou nekrózou.",
  body:
    '<p class="chain">mykobaktéria prežíva v makrofágu → Th1 lymfocyty → IFN-γ → <b>granulóm</b> (epiteloidné bunky, Langhansove obrovské bunky) → v strede <b>kazeózna nekróza</b> → kalcifikácia alebo skvapalnenie a šírenie</p>'
},

/* ── bunka: energia, vápnik, enzýmy ──────────────────────────────────── */
{
  id: "atp-mitochondria",
  title: "Mitochondrie a ATP",
  match: ["ATP", "mitochondri\\w*", "oxidatívn\\w*\\s+fosforyláci\\w*", "anaeróbn\\w*\\s+glykolýz\\w*", "glykolýz\\w*"],
  short: "ATP je „energetická mena“ bunky; najviac ho vyrábajú mitochondrie oxidatívnou fosforyláciou, ktorá potrebuje O₂.",
  body:
    '<p class="chain">O₂ → dýchací reťazec v mitochondrii → <b>ATP</b> → poháňa iónové pumpy (Na⁺/K⁺-ATPáza, Ca²⁺-ATPáza), syntézu bielkovín, pohyb</p>' +
    '<p class="chain">bez O₂ → len <b>anaeróbna glykolýza</b> (málo ATP) → laktát → ↓ pH</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pokles ATP je <b>prvý krok</b> hypoxického poškodenia; trvalé zlyhanie mitochondrií je znak nezvratnosti.</p>'
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
  title: "Voľné kyslíkové radikály (ROS)",
  match: ["ROS", "voľn\\w*\\s+radikál\\w*", "kyslíkov\\w*\\s+radikál\\w*", "radikál\\w*", "oxidačn\\w*\\s+stres\\w*", "peroxidáci\\w*\\s+lipid\\w*"],
  short: "Reaktívne formy kyslíka (superoxid, peroxid vodíka, hydroxylový radikál), ktoré poškodzujú lipidy, bielkoviny a DNA.",
  body:
    '<p class="chain">zdroje: mitochondrie (únik z dýchacieho reťazca), neutrofily (NADPH-oxidáza), žiarenie, toxíny, Fe²⁺ → <b>ROS</b> → peroxidácia lipidov membrán, oxidácia bielkovín, zlomy DNA</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> ROS sú spoločná cesta mnohých nox (reperfúzia, zápal, alkohol, žiarenie). Bunka ich odstraňuje antioxidantmi (glutatión, kataláza, SOD); keď ich prevýšia, vzniká <b>oxidačný stres</b>.</p>'
},
{
  id: "enzymy-rozkladu",
  title: "Enzýmy, ktoré rozkladajú bunku",
  match: ["hydroláz\\w*", "fosfolipáz\\w*", "proteáz\\w*", "endonukleáz\\w*", "lipáz\\w*", "proteolytick\\w*"],
  short: "Hydrolázy štiepia väzby pomocou vody: fosfolipázy membrány, proteázy bielkoviny, endonukleázy DNA, lipázy tuky.",
  body:
    "<ul>" +
      "<li><b>Odkiaľ</b> — z lyzozómov vlastnej bunky, z neutrofilov (hnis), z pankreasu (lipáza).</li>" +
      "<li><b>Čo ich zapne</b> — ↑ Ca²⁺ v cytosole, prasknutie lyzozómov.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Keď enzýmy prevážia nad denaturáciou, tkanivo sa skvapalní (<b>kolikvačná nekróza</b>); keď ich ↓ pH denaturuje, tkanivo stuhne (<b>koagulačná</b>).</p>'
},
{
  id: "lyzozom",
  title: "Lyzozóm",
  match: ["lyzozóm\\w*"],
  short: "Organela s kyslým obsahom a hydrolázami — „tráviaci systém“ bunky.",
  body:
    '<p class="chain">materiál z fagocytózy alebo autofágie → <b>lyzozóm</b> → rozklad na stavebné látky<br>chýbajúci enzým → materiál sa hromadí (lyzozómové storage choroby)<br>prasknutý lyzozóm → enzýmy natrávia bunku (nekróza)</p>'
},
{
  id: "proteazom",
  title: "Ubikvitín a proteazóm",
  match: ["ubikvitín-proteazómov\\w*", "proteazóm\\w*", "ubikvitín\\w*", "ubikvitínligáz\\w*", "atrogín\\w*", "MuRF1"],
  short: "Systém na cielené odbúranie bielkovín: ubikvitín bielkovinu označí, proteazóm ju rozstrihá.",
  body:
    '<p class="chain">ubikvitínligáza (napr. atrogín-1, MuRF1 vo svale) → bielkovina <b>označená reťazou ubikvitínu</b> → proteazóm → peptidy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Keď sa odbúravanie zrýchli, bunka sa zmenší (<b>atrofia</b>); keď nestíha, zhluky označených bielkovín sa hromadia (Malloryho hyalín).</p>'
},
{
  id: "mtor-foxo",
  title: "Rastové signály: IGF-1, PI3K–Akt–mTOR, FoxO",
  match: ["PI3K–Akt–mTOR", "PI3K", "mTOR", "FoxO", "IGF-1"],
  short: "Signálna dráha, ktorou záťaž, inzulín a IGF-1 udržiavajú bunku „veľkú“.",
  body:
    '<p class="chain">inzulín / IGF-1, záťaž → PI3K → Akt → <b>mTOR</b> (↑ syntéza bielkovín) a zároveň Akt ⊣ <b>FoxO</b></p>' +
    '<p class="chain">↓ signál → ↓ mTOR a uvoľnený FoxO → gény ubikvitínligáz a autofágie → <b>atrofia</b></p>'
},
{
  id: "denaturacia",
  title: "Denaturácia bielkovín",
  match: ["denaturáci\\w*", "denaturuj\\w*", "denaturovan\\w*", "koaguluj\\w*"],
  short: "Strata priestorového tvaru bielkoviny (teplo, ↓ pH) — bielkovina sa zrazí ako uvarený bielok a stratí funkciu.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri ischémii ↓ pH denaturuje aj enzýmy, ktoré by tkanivo rozložili — preto tkanivo stuhne a zachová obrys (<b>koagulačná nekróza</b>). Denaturované bielkoviny viažu viac eozínu → cytoplazma je sýto ružová.</p>'
},
{
  id: "er",
  title: "Endoplazmatické retikulum (ER)",
  match: ["ER", "endoplazmatick\\w*\\s+retikul\\w*"],
  short: "Sieť membrán, kde sa (na drsnom ER s ribozómami) tvoria a skladajú bielkoviny a (na hladkom ER) lipidy.",
  body:
    '<p class="chain">↓ ATP → ribozómy sa odlúpnu → ↓ syntéza bielkovín (aj apoproteínov → steatóza)<br>nahromadené zle zložené bielkoviny → <b>stres ER</b> → pri pretrvávaní apoptóza</p>'
},

/* ── typy bunkovej smrti ─────────────────────────────────────────────── */
{
  id: "receptory-smrti",
  title: "Receptory smrti (Fas, TNFR1)",
  match: ["FasL", "Fas", "FAS-R", "TNFR1", "receptor\\w*\\s+smrti", "ligand\\w*\\s+smrti"],
  short: "Receptory na povrchu bunky, ktoré po naviazaní ligandu priamo spustia apoptózu (vonkajšia dráha).",
  body:
    '<p class="chain">FasL (napr. na T lymfocyte) alebo TNF → <b>Fas / TNFR1</b> → adaptorové bielkoviny → <b>kaspáza 8</b> → exekučné kaspázy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Takto cytotoxické T lymfocyty zabíjajú infikované bunky a takto sa odstraňujú autoreaktívne lymfocyty.</p>'
},
{
  id: "cad",
  title: "CAD — DNáza aktivovaná kaspázou",
  match: ["CAD", "internukleozomáln\\w*"],
  short: "Enzým, ktorý v apoptóze strihá DNA medzi nukleozómami na pravidelné úseky ≈ 180–200 bp.",
  body:
    '<p class="chain">exekučná kaspáza 3 → rozštiepi inhibítor (ICAD) → uvoľnená <b>CAD</b> → DNA na úseky ≈ 180–200 bp a ich násobky → „rebrík“ na elektroforéze</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Pri nekróze sa DNA rozkladá náhodne (rozmazaná škvrna) — rebrík je znak apoptózy.</p>'
},
{
  id: "detekcia-apoptozy",
  title: "Dôkaz apoptózy: TUNEL, annexín V",
  match: ["TUNEL", "annexín\\w*", "fosfatidylserín\\w*"],
  short: "Metódy, ktoré zachytia apoptotickú bunku skôr, než ju fagocyty odstránia.",
  body:
    "<ul>" +
      "<li><b>Fosfatidylserín</b> — normálne na vnútornej strane membrány; v apoptóze sa preklopí von (signál „zjedz ma“).</li>" +
      "<li><b>Annexín V</b> — viaže preklopený fosfatidylserín (prietoková cytometria).</li>" +
      "<li><b>TUNEL</b> — značí voľné konce nastrihanej DNA na reze.</li>" +
      "<li><b>Štiepená kaspáza 3</b> — imunohistochémia.</li>" +
    "</ul>"
},
{
  id: "regulovana-smrt",
  title: "Regulovaná nekróza: nekroptóza, pyroptóza, feroptóza",
  match: ["nekroptóz\\w*", "pyroptóz\\w*", "feroptóz\\w*", "RIPK1", "RIPK3", "MLKL", "gasdermín\\w*", "inflamazóm\\w*", "GPX4", "regulovan\\w*\\s+smr\\w*"],
  short: "Formy smrti, ktoré vyzerajú ako nekróza (membrána praskne, vznikne zápal), ale riadi ich vlastný molekulový aparát.",
  body:
    "<ul>" +
      "<li><b>Nekroptóza</b> — kinázy <b>RIPK1</b> a <b>RIPK3</b> fosforylujú bielkovinu <b>MLKL</b>, ktorá prederaví plazmatickú membránu. Záloha, keď vírus zablokuje kaspázy.</li>" +
      "<li><b>Pyroptóza</b> — <b>inflamazóm</b> aktivuje kaspázu 1 → tá rozštiepi <b>gasdermín D</b>, ktorý vytvorí póry v membráne; uniká IL-1β → silný zápal.</li>" +
      "<li><b>Feroptóza</b> — peroxidácia lipidov membrán závislá od železa, keď zlyhá ochranný enzým <b>GPX4</b> (glutatiónperoxidáza 4).</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Keďže majú vlastné molekuly, dajú sa liekmi ovplyvniť — na rozdiel od „náhodnej“ nekrózy. Vzhľad sám ich od nej neodlíši.</p>'
},
{
  id: "damp",
  title: "DAMP (signály poškodenia)",
  match: ["DAMP", "HMGB1", "PAMP"],
  short: "Molekuly z vnútra bunky (DNA, ATP, HMGB1, kyselina močová), ktoré po úniku z mŕtvej bunky oznámia imunite poškodenie.",
  body:
    '<p class="chain">nekróza → obsah bunky unikne → <b>DAMP</b> → receptory makrofágov (TLR, inflamazóm) → cytokíny → <b>zápal</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo nekróza vyvolá zápal aj bez infekcie a apoptóza nie (obsah ostane v membráne). PAMP sú obdobné signály z mikróbov.</p>'
},
{
  id: "reperfuzia",
  title: "Reperfúzne poškodenie",
  match: ["reperfúzi\\w*", "reperfúzn\\w*", "ischemicko-reperfúzn\\w*"],
  short: "Paradox: obnovenie prietoku zachráni väčšinu buniek, ale tie blízko bodu zvratu môže zabiť.",
  body:
    '<p class="chain">návrat krvi → O₂ do poškodených mitochondrií → <b>nárazová tvorba ROS</b> + Ca²⁺ do mitochondrií + úprava pH → otvorenie póru MPT → smrť bunky<br>+ neutrofily a komplement poškodia endotel</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Napriek tomu sa pri infarkte tepna otvára čo najskôr — prínos záchrany prevýši škodu.</p>'
},
{
  id: "vitalna-reakcia",
  title: "Vitálna reakcia",
  match: ["vitáln\\w*\\s+reakci\\w*", "intravitáln\\w*"],
  short: "Zápal na rozhraní mŕtveho a živého tkaniva — dôkaz, že poškodenie vzniklo za života.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Rozlišuje <b>nekrózu</b> (so zápalom) od <b>posmrtnej autolýzy</b> (bez neho) — v súdnom lekárstve aj pri hodnotení poranení.</p>'
},
{
  id: "autolyza",
  title: "Autolýza a posmrtné zmeny",
  match: ["autolýz\\w*", "putrefakci\\w*", "posmrtn\\w*\\s+zmen\\w*", "kadaverózn\\w*", "rigor\\s+mortis", "algor\\s+mortis", "livores\\s+mortis", "pallor\\s+mortis", "cruores\\s+mortis"],
  short: "Rozklad tkanív po smrti organizmu vlastnými enzýmami a neskôr baktériami — bez zápalovej reakcie.",
  body:
    "<ul>" +
      "<li><b>Algor mortis</b> — chladnutie tela.</li>" +
      "<li><b>Livores mortis</b> — posmrtné škvrny z klesnutej krvi.</li>" +
      "<li><b>Rigor mortis</b> — stuhnutie: chýba ATP na uvoľnenie aktínu od myozínu.</li>" +
      "<li><b>Autolýza</b> — samonatrávenie, najskôr pankreas a žalúdok.</li>" +
      "<li><b>Putrefakcia</b> — hniloba baktériami.</li>" +
    "</ul>"
},

/* ── tkanivo a farbenia ──────────────────────────────────────────────── */
{
  id: "he-farbenie",
  title: "Farbenie H&E: eozinofilné a bazofilné",
  match: ["H&E", "hematoxylín\\w*", "eozín\\w*", "eozinofiln\\w*", "eozinofíli\\w*", "bazofiln\\w*", "hyperchróm\\w*"],
  short: "Základné farbenie v histológii: hematoxylín farbí kyslé štruktúry (DNA, RNA) do modrofialova, eozín bázické (bielkoviny) do ružova.",
  body:
    '<div class="fork">' +
      "<div><b>Bazofilné</b> (hematoxylín)<br>jadro, ribozómy (RNA)<br>modrofialové</div>" +
      "<div><b>Eozinofilné</b> (eozín)<br>bielkoviny cytoplazmy, kolagén, fibrín, hyalín<br>ružové</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> „Eozinofilná“ znamená <b>farbí sa eozínom</b>, nie „obsahuje eozinofily“. Mŕtva bunka je eozinofilnejšia: stratí RNA (menej hematoxylínu) a jej denaturované bielkoviny viažu viac eozínu. <b>Hyperchrómne</b> jadro sa farbí tmavšie (zhustený chromatín).</p>'
},
{
  id: "imunohistochemia",
  title: "Imunohistochémia",
  match: ["imunohistochémi\\w*", "imunohistochemick\\w*"],
  short: "Dôkaz konkrétnej bielkoviny na reze pomocou značenej protilátky.",
  body:
    '<p class="chain">protilátka proti hľadanej bielkovine → naviaže sa v tkanive → farebná reakcia → <b>vidno, ktoré bunky bielkovinu majú</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Určí typ amyloidu (κ, λ, TTR, AA), pôvod nádoru alebo štiepenú kaspázu 3 pri apoptóze.</p>'
},
{
  id: "parenchym-stroma",
  title: "Parenchým a stróma",
  match: ["parenchým\\w*", "parenchýmov\\w*", "stróm\\w*"],
  short: "Parenchým = funkčné bunky orgánu (hepatocyty, tubuly); stróma = oporné väzivo s cievami a nervami.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Keď parenchým zanikne, na jeho miesto nastúpi stróma (fibróza) alebo tuk (lipomatóza) — orgán môže mať podobnú veľkosť, ale menej funkcie.</p>'
},
{
  id: "intersticium",
  title: "Interstícium",
  match: ["interstíci\\w*", "intersticiu", "intersticiáln\\w*"],
  short: "Priestor medzi bunkami a cievami: medzibunková hmota (kolagén, proteoglykány), tkanivový mok a bunky väziva.",
  body:
    '<p class="chain">kapilára → <b>interstícium</b> (difúzia O₂ a živín) → bunka; prebytok tekutiny odvádza lymfa</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Čo sa v ňom nahromadí (exsudát, amyloid, hyalín), predĺži difúznu dráhu a utláča bunky. „Intersticiálny zápal“ = zápal v stróme orgánu, nie na povrchu.</p>'
},
{
  id: "endotel",
  title: "Endotel",
  match: ["endotel\\w*"],
  short: "Jedna vrstva buniek vystielajúca cievy — riadi priepustnosť, zrážanie krvi a prechod leukocytov.",
  body:
    '<p class="chain">zápalové mediátory → endotelové bunky sa stiahnu (medzery), vystavia selektíny a ICAM-1 → <b>únik plazmy a prechod leukocytov</b></p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Poškodený endotel = presakovanie plazmy do steny (hyalín, fibrinoid) a trombóza.</p>'
},
{
  id: "fibroblast",
  title: "Fibroblast",
  match: ["fibroblast\\w*"],
  short: "Bunka väziva, ktorá vyrába kolagén a medzibunkovú hmotu (aj GAG).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri hojení vytvára <b>jazvu</b>; pri hypotyreóze zvýšene tvorí GAG (myxedém).</p>'
},

/* ── laboratórne markery ─────────────────────────────────────────────── */
{
  id: "markery-nekrozy",
  title: "Markery nekrózy: troponín, CK, ALT, AST, LD",
  match: ["hs-troponín\\w*", "troponín\\w*", "CK-MB", "CK", "kreatínkináz\\w*", "myoglobín\\w*", "ALT", "AST", "LDH", "LD", "GMT", "amyláz\\w*"],
  short: "Bielkoviny z vnútra buniek, ktoré po poškodení membrány uniknú do krvi — laboratórny dôkaz nekrózy.",
  body:
    "<ul>" +
      "<li><b>Myokard</b> — troponín (T, I; najšpecifickejší), CK-MB.</li>" +
      "<li><b>Kostrový sval</b> — CK (kreatínkináza), myoglobín.</li>" +
      "<li><b>Pečeň</b> — ALT (špecifickejšia pre pečeň), AST, GMT (žlčové cesty).</li>" +
      "<li><b>Nešpecifické</b> — LD (laktátdehydrogenáza), je takmer vo všetkých bunkách.</li>" +
      "<li><b>Pankreas</b> — amyláza, lipáza.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Marker sa v krvi objaví až po <b>hodinách</b> (musí preniknúť cez poškodenú membránu a lymfou do krvi) — preto sa odber opakuje a rozhoduje vzostup.</p>'
},

/* ── choroby a klinické pojmy ────────────────────────────────────────── */
{
  id: "diabetes",
  title: "Diabetes mellitus (DM)",
  match: ["T1DM", "T2DM", "DM", "diabet\\w*", "hyperglykémi\\w*", "inzulínov\\w*\\s+rezistenci\\w*", "mikroangiopati\\w*", "makroangiopati\\w*", "Armaniho\\s+zón\\w*"],
  short: "Chronická hyperglykémia z nedostatku inzulínu (1. typ) alebo z inzulínovej rezistencie s vyčerpaním β-buniek (2. typ).",
  body:
    '<p class="chain">↑ glukóza → AGE (zosieťovaný kolagén, zhrubnuté bazálne membrány) + polyolová dráha + ROS → <b>mikroangiopatia</b> (sietnica, oblička, nervy) a <b>makroangiopatia</b> (ateroskleróza)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Väčšina komplikácií DM sú <b>cievne</b> — hyalínna arterioloskleróza, Kimmelstiel–Wilsonove uzly, diabetická noha.</p>'
},
{
  id: "obliky-ckd",
  title: "Proteinúria, GFR, CKD",
  match: ["CKD", "GFR", "chronick\\w*\\s+chorob\\w*\\s+obličiek", "proteinúri\\w*", "nefrotick\\w*\\s+syndróm\\w*", "mikroalbuminúri\\w*"],
  short: "Ukazovatele poškodenia obličky: bielkovina v moči (proteinúria), pokles filtrácie (GFR) a jeho trvanie (CKD).",
  body:
    "<ul>" +
      "<li><b>Proteinúria</b> — poškodený glomerulárny filter prepúšťa bielkoviny.</li>" +
      "<li><b>Nefrotický syndróm</b> — proteinúria nad 3,5 g/deň, hypoalbuminémia, edémy, hyperlipidémia.</li>" +
      "<li><b>GFR</b> — glomerulárna filtrácia; jej pokles = strata funkčných nefrónov.</li>" +
      "<li><b>CKD</b> — chronická choroba obličiek: poškodenie alebo ↓ GFR trvajúce &gt; 3 mesiace.</li>" +
    "</ul>"
},
{
  id: "vaskulitida",
  title: "Vaskulitída a malígna hypertenzia",
  match: ["vaskulitíd\\w*", "polyarteritis\\s+nodosa", "malígn\\w*\\s+hypertenzi\\w*", "hypertenzn\\w*\\s+kríz\\w*"],
  short: "Dve cesty k fibrinoidnej nekróze steny cievy: imunitný zápal (vaskulitída) a extrémny tlak (malígna hypertenzia).",
  body:
    '<div class="fork">' +
      "<div><b>Vaskulitída</b><br>imunokomplexy / protilátky → komplement, neutrofily → zápal steny</div>" +
      "<div><b>Malígna hypertenzia</b><br>tlak priamo poškodí endotel → plazma presiakne do steny</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Následok je rovnaký: zúžený lúmen, trombóza, ischémia orgánu (napr. oblička).</p>'
},
{
  id: "plazmocytom",
  title: "Plazmocytóm a myelóm",
  match: ["plazmocytóm\\w*", "myelóm\\w*", "plazmocytov\\w*\\s+dyskrázi\\w*", "Bence-Jones\\w*"],
  short: "Nádor z jedného klonu plazmocytov, ktorý vyrába nadbytok jednej protilátky alebo jej ľahkých reťazcov.",
  body:
    '<p class="chain">klon plazmocytov → nadbytok ľahkých reťazcov (Bence-Jonesova bielkovina v moči) → <b>AL amyloid</b>, Russellove telieska, poškodenie obličky</p>'
},
{
  id: "glykogen",
  title: "Glykogén",
  match: ["glykogén\\w*"],
  short: "Zásobný polysacharid glukózy v pečeni (pre celé telo) a vo svale (len pre seba).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri bežnom spracovaní sa vo vode rozpustí a cytoplazma vyzerá prázdna („clear cell“); dokazuje sa <b>PAS</b>, ktorý po diastáze zmizne.</p>'
},
{
  id: "storage",
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
  id: "rtg", title: "RTG — röntgen", match: ["RTG"],
  short: "Zobrazenie röntgenovým žiarením; kosti a vzduch v pľúcach dávajú najlepší kontrast.",
  body: ""
},
{
  id: "ct", title: "CT — počítačová tomografia", match: ["CT"],
  short: "Röntgenové rezy telom poskladané počítačom; ukáže krvácanie, nádor aj atrofiu orgánu.",
  body: ""
},
{
  id: "usg", title: "USG — ultrasonografia", match: ["USG"],
  short: "Zobrazenie ultrazvukom bez žiarenia; tuk a väzivo ultrazvuk rozptyľujú, preto je stukovatená pečeň „svetlá“.",
  body: ""
},
{
  id: "mr", title: "MR — magnetická rezonancia", match: ["MR"],
  short: "Zobrazenie v magnetickom poli bez žiarenia; najlepšie rozlíši mäkké tkanivá (mozog, svaly).",
  body: ""
},
{
  id: "ekg", title: "EKG — elektrokardiogram", match: ["EKG"],
  short: "Záznam elektrickej aktivity srdca; ischémia a infarkt menia tvar kriviek.",
  body: ""
},
{
  id: "pci", title: "PCI — perkutánna koronárna intervencia", match: ["PCI"],
  short: "Otvorenie upchatej koronárnej tepny katétrom cez kožu (balónik, stent).",
  body: ""
},
{
  id: "git", title: "GIT — gastrointestinálny trakt", match: ["GIT"],
  short: "Tráviaca trubica od pažeráka po konečník.",
  body: ""
},
{
  id: "cmv", title: "CMV — cytomegalovírus", match: ["CMV"],
  short: "Herpetický vírus; v bunke vytvorí veľké jadrové inklúzie („sovie oko“), nebezpečný pri oslabenej imunite.",
  body: ""
},
{
  id: "hcc", title: "HCC — hepatocelulárny karcinóm", match: ["HCC"],
  short: "Zhubný nádor z hepatocytov; vzniká najmä v cirhotickej pečeni.",
  body: ""
},
{
  id: "rcc", title: "RCC — karcinóm z obličkových buniek", match: ["RCC"],
  short: "Zhubný nádor z epitelu obličkových tubulov (renal cell carcinoma); najčastejší typ má svetlú cytoplazmu plnú glykogénu a lipidov.",
  body: ""
},
{
  id: "sle", title: "SLE — systémový lupus erythematosus", match: ["SLE"],
  short: "Autoimunitná choroba s protilátkami proti vlastným jadrám; imunokomplexy poškodzujú obličky, kožu, kĺby a cievy.",
  body: ""
},
{
  id: "als", title: "ALS — amyotrofická laterálna skleróza", match: ["ALS"],
  short: "Zánik motorických neurónov v mozgu a mieche → neurogénna atrofia svalov a ochrnutie.",
  body: ""
},
{
  id: "gvhd", title: "GvHD — reakcia štepu proti hostiteľovi", match: ["GvHD"],
  short: "Po transplantácii kostnej drene napadnú T-lymfocyty darcu tkanivá príjemcu (koža, pečeň, črevo).",
  body: ""
},
{
  id: "cmp", title: "CMP — cievna mozgová príhoda", match: ["CMP"],
  short: "Náhla porucha prekrvenia mozgu: ischémia (infarkt mozgu) alebo krvácanie.",
  body: ""
},
{
  id: "ichdk", title: "ICHDK — ischemická choroba dolných končatín", match: ["ICHDK"],
  short: "Zúženie tepien nôh aterosklerózou → bolesť pri chôdzi, pri ťažkej forme gangréna.",
  body: ""
},
{
  id: "kmp", title: "KMP — kardiomyopatia", match: ["KMP"],
  short: "Choroba samotného srdcového svalu, ktorú nevysvetlí ischémia, chlopňa ani hypertenzia.",
  body: ""
},
{
  id: "rds", title: "RDS — syndróm respiračnej tiesne novorodenca", match: ["RDS"],
  short: "Nedonosené pľúca nemajú dosť surfaktantu → alveoly kolabujú, plazma presiakne a vytvorí hyalínne membrány.",
  body: ""
},
{
  id: "bmi", title: "BMI — index telesnej hmotnosti", match: ["BMI"],
  short: "Hmotnosť v kg delená druhou mocninou výšky v m; nadváha od 25 kg/m², obezita od 30 kg/m².",
  body: ""
},
{
  id: "hdl", title: "HDL — lipoproteín s vysokou hustotou", match: ["HDL"],
  short: "Odvádza cholesterol z tkanív do pečene; nízke HDL je rizikový faktor aterosklerózy.",
  body: ""
},
{
  id: "acth", title: "ACTH — adrenokortikotropný hormón", match: ["ACTH"],
  short: "Hormón adenohypofýzy, ktorý riadi tvorbu kortizolu v kôre nadobličiek.",
  body: ""
},
{
  id: "makrofag-m1", title: "M1 — prozápalový makrofág",
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
  id: "makrofag-m2", title: "M2 — reparačný makrofág",
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
  id: "eferocytoza", title: "Eferocytóza",
  match: ["eferocytóz\\w*"],
  short: "Pohltenie apoptotických buniek makrofágom; na rozdiel od fagocytózy baktérií zápal nespúšťa, ale tlmí.",
  body: ""
},
{
  id: "pdgf", title: "PDGF — rastový faktor z krvných doštičiek",
  match: ["PDGF"],
  short: "<i>Platelet-derived growth factor</i>: uložený v granulách doštičiek, tvoria ho aj makrofágy a endotel. Privoláva a rozmnožuje fibroblasty, bunky hladkého svalu a pericyty.",
  body:
    '<p class="chain">poranenie → doštičky sa aktivujú → <b>PDGF</b> → fibroblasty migrujú do rany a delia sa</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to prvý signál hojenia – uvoľní sa už pri vzniku zrazeniny, skôr než prídu makrofágy.</p>'
},
{
  id: "tgf-beta", title: "TGF-β — transformujúci rastový faktor β",
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
  id: "vegf", title: "VEGF — rastový faktor cievneho endotelu",
  match: ["VEGF(?:-A)?"],
  short: "<i>Vascular endothelial growth factor</i>: núti endotel migrovať a deliť sa (nové kapiláry) a zároveň zvyšuje priepustnosť ciev.",
  body:
    '<p class="chain">hypoxia → HIF → <b>VEGF</b> → endotel pučí smerom k miestu s nedostatkom kyslíka → nová kapilára</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vysvetľuje, prečo je granulačné tkanivo červené a opuchnuté. Nádory ho zneužívajú na vlastné cievne zásobenie; lieky proti VEGF preto zároveň zhoršujú hojenie rán.</p>'
},
{
  id: "hif", title: "HIF — faktor indukovaný hypoxiou",
  match: ["HIF(?:-1α?)?"],
  short: "<i>Hypoxia-inducible factor</i>: transkripčný faktor, ktorým bunka meria kyslík.",
  body:
    '<p class="chain">dosť O₂ → HIF sa hydroxyluje (enzým potrebuje kyslík) → rozloží ho proteazóm<br>málo O₂ → HIF ostane, vstúpi do jadra → gény pre <b>VEGF</b>, erytropoetín a enzýmy glykolýzy</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vďaka nemu rastú cievy presne tam, kde chýba kyslík – v rane, v ischemickom tkanive aj v nádore.</p>'
},
{
  id: "fgf", title: "FGF-2 — fibroblastový rastový faktor 2",
  match: ["FGF-2", "bFGF", "FGF"],
  short: "<i>Fibroblast growth factor 2</i> (bázický FGF): podporuje delenie endotelu a fibroblastov; spolu s VEGF riadi rast nových ciev.",
  body: ""
},
{
  id: "mmp", title: "MMP — matrixové metaloproteinázy",
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
  id: "angiogeneza", title: "Angiogenéza",
  match: ["angiogenéz\\w*"],
  short: "Vznik nových kapilár pučaním z ciev, ktoré už existujú; spúšťa ju hypoxia cez HIF a VEGF.",
  body: ""
},
{
  id: "myofibroblast", title: "Myofibroblast",
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
}
);

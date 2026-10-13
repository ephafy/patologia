/* Glosár PATOLY — bunky, tkanivá, epitely, hormóny a orgány, ktoré texty používajú bez výkladu (kap. 0–9).
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── bunky a tkanivá ─────────────────────────────────────────────────── */
{
  id: "adipocyt", et: "lat. <i>adeps, adipis</i> „tuk“ + gr. <i>kytos</i> „bunka“",
  title: "Adipocyt (tuková bunka)",
  match: ["adipocyt\\w*", "tukov\\w*\\s+bun\\w*"],
  short: "Bunka tukového tkaniva s jednou veľkou kvapkou triacylglycerolov, ktorá odtláča jadro k okraju. Zásobáreň energie, tepelná izolácia a endokrinný orgán (leptín, adiponektín).",
  body: "<ul><li>Biely tuk ukladá energiu, hnedý tvorí teplo.</li><li>Lipóm je nádor z tukových buniek.</li></ul>"
},
{
  id: "astrocyt", et: "gr. <i>astron</i> „hviezda“ + <i>kytos</i>",
  title: "Astrocyt",
  match: ["astrocyt\\w*"],
  short: "Podporná bunka mozgu: vyživuje neuróny a po poškodení tvorí gliovú „jazvu“.",
  body: "<ul><li>Astrocytóm je nádor z astrocytov.</li><li>Reaktívna glióza po poškodení mozgu: zhrubnutie výbežkov.</li></ul>"
},
{
  id: "mikroglia", et: "gr. <i>mikros</i> + <i>glia</i> „lepidlo“",
  title: "Mikroglia",
  match: ["mikroglií", "mikrogliu", "mikroglia", "mikrogliá\\w*"],
  short: "Makrofágy mozgu — odstraňujú odumreté bunky a mikróby.",
  body: "<ul><li>Pochádza z žĺtkového vačku, nie z kostnej drene.</li><li>Aktivuje sa pri neurodegenerácii a zápale mozgu.</li></ul>"
},
{
  id: "glioza",
  title: "Glióza",
  match: ["glióz\\w*"],
  short: "Gliová jazva: astrocyty zaplnia miesto po zaniknutých neurónoch.",
  body: "<ul><li>V reze sú hviezdicovité astrocyty s eozinofilnými výbežkami.</li><li>Mozog nemá kolagénové väzivo, preto je jeho jazva gliová.</li></ul>"
},
{
  id: "hepatocyt", et: "gr. <i>hepar, hepatos</i> „pečeň“ + <i>kytos</i> „bunka“",
  title: "Hepatocyt",
  match: ["hepatocyt\\w*"],
  short: "Hlavná bunka pečene (≈ 80 % jej objemu). Tvorí bielkoviny krvnej plazmy, žlč, ukladá glykogén a odbúrava lieky a toxíny. Dobre sa regeneruje.",
  body: "<ul><li>Zonácia: periportálne hepatocyty majú viac kyslíka, centrolobulárne sú náchylné na hypoxiu.</li><li>Po resekcii dobre regenerujú.</li></ul>"
},
{
  id: "osifikacia", et: "lat. <i>os, ossis</i> „kosť“ + <i>facere</i>",
  title: "Osifikácia",
  match: ["osifikáci\\w*", "skostnat\\w*", "skostnen\\w*"],
  short: "Tvorba kostného tkaniva.",
  body: "<ul><li>Typy: intramembranózna (ploché kosti) a enchondrálna (cez chrupku).</li><li>Pri hojení zlomeniny: kalus → kosť.</li></ul>"
},
{
  id: "heterotopicka-osifikacia",
  img: {
    src: "assets/images/heterotopic-ossification-hip.jpg",
    alt: "Heterotopická osifikácia okolo implantátu bedrového kĺbu (RTG).",
    caption: "Heterotopická osifikácia okolo implantátu bedrového kĺbu (RTG).",
    credit: "Tdvorak · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Heterotopic_Ossification_Hip2.JPG"
  },
  title: "Heterotopická osifikácia",
  match: ["heterotopick\\w*\\s+osifikáci\\w*", "ossificans"],
  short: "Vzniká mimo kostry (napr. vo svale po úraze — myositis ossificans), keď sa fibroblasty a stromálne bunky premenia na osteoblasty.",
  body: "<ul><li>Príčiny: trauma, popáleniny, poranenie miechy.</li><li>Na RTG vidno ložisko s okrajovým zvápenatením.</li></ul>"
},
{
  id: "kmenova-bunka",
  title: "Kmeňová bunka",
  match: ["kmeňov\\w*\\s+bun\\w*", "progenitorov\\w*"],
  short: "Bunka, ktorá sa vie deliť a premeniť na viac druhov buniek.",
  body: "<ul><li>Typy: embryonálne, tkanivové (napr. krvotvorné), indukované pluripotentné.</li><li>Nádorové kmeňové bunky sa vedia deliť bez obmedzenia.</li></ul>"
},
{
  id: "diferenciacia", et: "lat. <i>differentia</i> „rozdiel“",
  title: "Diferenciácia",
  match: ["diferenciáci\\w*", "diferencovan\\w*", "nediferencovan\\w*"],
  short: "Dozrievanie bunky do špecializovanej podoby.",
  body: "<ul><li>Nádorové bunky ju strácajú: nediferencované bunky sú agresívnejšie.</li></ul>"
},
{
  id: "atypia", et: "gr. <i>a-</i> „ne-“ + <i>typos</i> „vzor“",
  title: "Atypia (bunková atypia)",
  match: ["atypi\\w*", "atypick\\w*"],
  short: "Odchýlka bunky od normy — väčšie, tmavšie, nepravidelné jadrá, zmenený pomer jadro/cytoplazma, abnormálne delenie. Je znakom dysplázie a nádoru."
},
{
  id: "dysplazia", et: "gr. <i>dys-</i> „zle“ + <i>plasis</i> „utváranie“",
  title: "Dysplázia",
  match: ["dysplázi\\w*", "dysplastick\\w*"],
  short: "Porucha dozrievania a usporiadania buniek v epiteli s bunkovou atypiou, ale bez prerastania cez bazálnu membránu. Je prekancerózou: stupeň ľahký–ťažký, ťažká dysplázia sa blíži karcinómu in situ.",
  body: "<ul><li>Stupne: nízky a vysoký.</li><li>Pri ťažkej dysplázii je postihnutá celá hrúbka epitelu.</li><li>V ľahkom štádiu môže po odstránení príčiny ustúpiť.</li></ul>"
},
{
  id: "remodelacia", et: "lat. <i>re-</i> „znova“ + <i>modulus</i> „miera, vzor“",
  img: {
    src: "assets/images/mi-healing-4-scar.jpg",
    alt: "Zrelá jazva: husté zväzky kolagénu s málo bunkami.",
    caption: "Zrelá jazva: husté zväzky kolagénu s málo bunkami.",
    credit: "Michaud K. a kol., Virchows Arch 2020 · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_dense_fibrous_scar_replacing_myocyte_loss_in_myocardial_infarction.jpg"
  },
  title: "Remodelácia",
  match: ["remodeláci\\w*", "remodelovan\\w*"],
  short: "Prestavba tkaniva: kolagén jazvy sa postupne odbúrava a nahrádza lepšie usporiadaným, takže jazva sa zmenšuje a spevňuje. Rovnaký pojem sa používa pri prestavbe kosti, srdca a ciev."
},
{
  id: "cytoskelet", et: "gr. <i>kytos</i> „bunka“ + <i>skeleton</i> „vysušené (telo)“",
  title: "Cytoskelet",
  match: ["cytoskelet\\w*"],
  short: "Bielkovinová kostra bunky (aktín, mikrotubuly, intermediárne filamenty). Udržiava tvar bunky, rozvádza organely a umožňuje pohyb a delenie.",
  body: "<ul><li>Aktín zabezpečuje pohyb a tvar, mikrotubuly transport a delenie.</li><li>Intermediárne filamenty (cytokeratíny) slúžia aj ako markery nádorov.</li></ul>"
},
{
  id: "organela", et: "gr. <i>organon</i> „nástroj, orgán“ (zdrobnenina: „malý orgán“)",
  title: "Organely",
  match: ["organel\\w*"],
  short: "Útvary vo vnútri bunky s vlastnou funkciou: jadro, mitochondrie, endoplazmatické retikulum, Golgiho aparát, lyzozómy, peroxizómy."
},
{
  id: "mezotel", et: "gr. <i>mesos</i> „stredný“ (pôvodom z mezodermu) + <i>thele</i> „bradavka“ (ako pri endoteli)",
  title: "Mezotel",
  match: ["mezotel\\w*"],
  short: "Jednovrstvová výstelka seróznych dutín (pohrudnice, pobrušnice, osrdcovníka) z plochých buniek. Vylučuje tekutinu, ktorá umožňuje kĺzanie orgánov.",
  body: "<ul><li>Mezotelióm je nádor z mezotelu a súvisí s azbestom.</li><li>Reaktívny mezotel pri výpotku môže napodobniť nádor.</li></ul>"
},
{
  id: "hladka-svalovina",
  title: "Hladká svalovina",
  match: ["hladk\\w*\\s+sval\\w*"],
  short: "Vystiela steny dutých orgánov a ciev; sťahuje sa pomaly a mimovoľne."
},
{
  id: "pruhovana-svalovina",
  title: "Priečne pruhovaná svalovina",
  match: ["pruhovan\\w*\\s+sval\\w*", "priečn\\w*\\s+pruhovan\\w*(?:\\s+sval\\w*)?"],
  short: "Kostrová a srdcová: má sarkoméry a sťahuje sa rýchlo; srdcová mimovoľne."
},
{
  id: "sarkomera", et: "gr. <i>sarx</i> „mäso“ + <i>meros</i> „časť“",
  title: "Sarkoméra",
  match: ["sarkomér\\w*"],
  short: "Základná sťahová jednotka priečne pruhovaného svalu: usporiadané vlákna aktínu a myozínu medzi dvoma Z-liniami. Pri hypertrofii srdca ich pribúda."
},

/* ── epitely ─────────────────────────────────────────────────────────── */
{
  id: "epitel", et: "gr. <i>epi</i> „na“ + <i>thele</i> „bradavka“",
  title: "Epitel",
  match: ["epitel\\w*", "epiteliáln\\w*"],
  short: "Tkanivo z tesne priliehajúcich buniek na povrchu tela a vo výstelke dutín a žliaz. Leží na bazálnej membráne, nemá cievy a vyživuje sa difúziou z väziva pod ním.",
  body: "<ul><li>Funkcie: bariéra, vstrebávanie, vylučovanie, ochrana.</li><li>Z epitelu vznikajú karcinómy.</li></ul>"
},
{
  id: "dlazdicovy-epitel",
  title: "Dlaždicový epitel",
  match: ["dlaždicov\\w*(?:\\s+epitel\\w*)?"],
  short: "Epitel z plochých buniek. Viacvrstvový dlaždicový epitel chráni povrchy namáhané trením (koža, ústa, pažerák, pošva) a môže rohovatieť.",
  body: "<ul><li>Nádor: dlaždicovobunkový karcinóm.</li><li>Nahrádza iné epitely pri metapláziách (napr. u fajčiarov).</li></ul>"
},
{
  id: "cylindricky-epitel", et: "gr. <i>kylindros</i> „valec“ (<i>kylindein</i> „valiť“)",
  title: "Cylindrický (valcový) epitel",
  match: ["cylindrick\\w*(?:\\s+epitel\\w*)?", "valcov\\w*\\s+epitel\\w*"],
  short: "Epitel z vysokých buniek, ktoré vstrebávajú alebo vylučujú (žalúdok, črevo, maternicový hrdlo). Často tvorí žliazky.",
  body: "<ul><li>Nádor: adenokarcinóm.</li><li>Na rozhraní pažeráka a žalúdka vzniká Barrettov pažerák.</li></ul>"
},
{
  id: "prechodny-epitel", et: "urotel: gr. <i>ouron</i> „moč“ + <i>thele</i>",
  title: "Prechodný epitel (urotel)",
  match: ["prechodn\\w*\\s+epitel\\w*", "urotel\\w*"],
  short: "Viacvrstvový epitel močových ciest (obličková panvička, močovody, močový mechúr), ktorý sa vie roztiahnuť a je nepriepustný pre moč.",
  body: "<ul><li>Nádor: urotelový karcinóm (rizikom je fajčenie).</li><li>Pri naplnení mechúra sa vrstvy vyrovnajú.</li></ul>"
},
{
  id: "jednovrstvovy-epitel",
  title: "Jednovrstvový epitel",
  match: ["jednovrstvov\\w*(?:\\s+epitel\\w*)?"],
  short: "Výstelka čriev a alveol — slúži na výmenu a vstrebávanie."
},
{
  id: "viacvrstvovy-epitel",
  title: "Viacvrstvový epitel",
  match: ["viacvrstvov\\w*(?:\\s+epitel\\w*)?", "viacradov\\w*"],
  short: "Koža, pažerák — slúži na ochranu pred mechanickým poškodením."
},
{
  id: "riasinkovy-epitel",
  title: "Riasinkový epitel",
  match: ["riasinkov\\w*(?:\\s+epitel\\w*)?"],
  short: "Epitel priedušiek s riasinkami; fajčenie ho poškodzuje a mení na dlaždicový epitel (metaplázia)."
},
{
  id: "mukociliarny-klirens",
  title: "Mukociliárny klírens",
  match: ["mukociliárn\\w*(?:\\s+klírens\\w*)?", "samočisten\\w*"],
  short: "Riasinky posúvajú hlien s prachom a mikróbmi k hrtanu — samočistenie dýchacích ciest."
},
{
  id: "poharikova-bunka",
  title: "Pohárikové bunky",
  match: ["pohárikov\\w*(?:\\s+bun\\w*)?", "hlienotvorn\\w*"],
  img: {
    "src": "assets/images/gastric-intestinal-metaplasia.jpg",
    "alt": "Intestinálna metaplázia žalúdka: pohárikové bunky so svetlým hlienom.",
    "caption": "Intestinálna metaplázia žalúdka: pohárikové bunky so svetlým hlienom.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Stomach_with_intestinal_metaplasia_--_intermed_mag.jpg"
  },
  short: "Jednobunkové žliazky v epiteli dýchacích ciest a čreva, ktoré vylučujú hlien (mucín). Pri chronickom podráždení ich pribúda.",
  body: "<ul><li>Pri chronickej bronchitíde ich pribúda (hyperplázia).</li><li>Pri črevnej metapláziu sa objavujú aj v žalúdku.</li></ul>"
},
{
  id: "apokrinne", et: "gr. <i>apo</i> „od, preč“ + <i>krinein</i> „oddeľovať, vylučovať“",
  img: {
    src: "assets/images/apocrine-metaplasia.jpg",
    alt: "Apokrinná metaplázia prsníka (H&E, anotované).",
    caption: "Apokrinná metaplázia prsníka (H&E, anotované).",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_apocrine_metaplasia_of_breast,_annotated.png"
  },
  title: "Apokrinný epitel",
  match: ["apokrinn\\w*"],
  short: "Epitel, ktorý pri vylučovaní odštiepi vrchnú časť cytoplazmy (potné žľazy podpazušia, mliečna žľaza). Apokrinná metaplázia sa vyskytuje v cystách prsníka."
},

/* ── hormóny a žľazy ─────────────────────────────────────────────────── */
{
  id: "hormon", et: "gr. <i>hormaein</i> „podnecovať, poháňať“",
  title: "Hormón",
  match: ["hormón\\w*", "hormonáln\\w*"],
  short: "Signálna látka vylučovaná žľazou do krvi, ktorá pôsobí na vzdialené cieľové bunky cez receptor. Reguluje metabolizmus, rast, rozmnožovanie a rovnováhu vody a solí.",
  body: "<ul><li>Skupiny: peptidové, steroidné a odvodené od aminokyselín.</li><li>Tvorba sa reguluje spätnou väzbou.</li></ul>"
},
{
  id: "testosteron", et: "lat. <i>testis</i> „semenník“ + steroid + <i>-on</i>",
  title: "Testosterón",
  match: ["testosterón\\w*"],
  short: "Mužský pohlavný hormón.",
  body: "<ul><li>Tvoria ho Leydigove bunky semenníka.</li><li>Tvorbu riadi LH z hypofýzy.</li></ul>"
},
{
  id: "dht",
  title: "Dihydrotestosterón (DHT)",
  match: ["dihydrotestosterón\\w*", "DHT", "α-reduktáz\\w*"],
  short: "V prostate ho enzým 5α-reduktáza vytvára z testosterónu; je účinnejší a podporuje rast žľazy (benígna hyperplázia prostaty)."
},
{
  id: "tsh", et: "tyreotropín: gr. <i>thyreos</i> „štít“ (štítna žľaza) + <i>tropos</i> „smer“ (pôsobí na ňu)",
  title: "TSH (tyreotropín; angl. thyroid-stimulating hormone)",
  match: ["TSH", "tyreotropín\\w*"],
  short: "Hormón hypofýzy, ktorý podnecuje štítnu žľazu k tvorbe hormónov a k rastu. Pri nedostatku hormónov štítnej žľazy TSH stúpa a žľaza rastie (struma).",
  body: "<ul><li>Spätná väzba: ↓ T3/T4 → ↑ TSH.</li><li>TSH stúpa pri hypotyreóze a klesá pri hypertyreóze.</li></ul>"
},
{
  id: "hypofyza", et: "gr. <i>hypo</i> „pod“ + <i>physis</i> „rast“ (výrastok pod mozgom)",
  title: "Hypofýza",
  match: ["hypofýz\\w*", "adenohypofýz\\w*"],
  short: "Žľaza veľkosti hrášku pod mozgom, ktorá riadi ostatné žľazy tela (štítna žľaza, nadobličky, pohlavné žľazy). Predný lalok (adenohypofýza) tvorí ACTH, TSH, rastový hormón a ďalšie.",
  body: "<ul><li>Adenómy: prolaktinóm, somatotropný (akromegália), kortikotropný (Cushingova choroba).</li><li>Zadný lalok uvoľňuje ADH a oxytocín.</li></ul>"
},
{
  id: "hashimoto",
  title: "Hashimotova tyreoiditída",
  match: ["Hashimotov\\w*(?:\\s+tyreoiditíd\\w*)?"],
  short: "Autoimunitný zápal štítnej žľazy s lymfocytmi a zárodočnými centrami; najčastejšia príčina hypotyreózy v oblastiach s dostatkom jódu.",
  body: "<ul><li>Lymfocyty, zárodočné centrá a Hürthleho bunky.</li><li>Protilátky proti peroxidáze a tyreoglobulínu.</li></ul>"
},
{
  id: "kortizol", et: "lat. <i>cortex</i> „kôra“",
  title: "Kortizol",
  match: ["kortizol\\w*"],
  short: "Hlavný glukokortikoid kôry nadobličiek: zvyšuje glykémiu, tlmí zápal a imunitu.",
  body: "<ul><li>Tvorí sa v zona fasciculata a riadi ho ACTH.</li><li>Má denný rytmus — ráno je najvyšší.</li></ul>"
},
{
  id: "cushing", et: "podľa Harveya Cushinga",
  title: "Cushingov syndróm",
  match: ["Cushingov\\w*(?:\\s+syndróm\\w*)?"],
  short: "Nadbytok kortizolu: centrálna obezita, strie, hypertenzia a diabetes.",
  body: "<ul><li>Príčiny: lieky (glukokortikoidy), adenóm hypofýzy (Cushingova choroba), nádor nadobličky, ektopický ACTH.</li></ul>"
},
{
  id: "adh", et: "antidiuretický: gr. <i>anti</i> „proti“ + <i>diourein</i> „močiť“; vazopresín: lat. <i>vas</i> „cieva“ + <i>premere</i> „tlačiť“",
  title: "ADH (antidiuretický hormón, vazopresín; angl. antidiuretic hormone, vasopressin)",
  match: ["antidiuretick\\w*", "ADH", "vazopresín\\w*"],
  short: "Hormón zadnej hypofýzy, ktorý v obličkách zadržiava vodu (zahusťuje moč). Pri strate objemu krvi sa jeho tvorba zvyšuje.",
  body: "<ul><li>Nedostatok: diabetes insipidus.</li><li>Nadbytok: SIADH.</li></ul>"
},
{
  id: "hyperaldosteronizmus",
  title: "Hyperaldosteronizmus",
  match: ["hyperaldosteronizm\\w*"],
  short: "Nadbytok aldosterónu (nádor alebo hyperplázia nadobličky). Zadržiava sodík a vodu, vylučuje draslík: vzniká hypertenzia s nízkym draslíkom v krvi."
},
{
  id: "glykogenolyza", et: "glykogén + gr. <i>lysis</i>",
  title: "Glykogenolýza",
  match: ["glykogenolýz\\w*"],
  short: "Rozklad glykogénu na glukózu.",
  body: "<ul><li>Aktivujú ju glukagón a adrenalín.</li><li>V pečeni dodá glukózu do krvi, vo svale len pre vlastnú potrebu.</li></ul>"
},
{
  id: "glukoneogeneza", et: "gr. <i>glykys</i> + <i>neos</i> + <i>genesis</i>",
  title: "Glukoneogenéza",
  match: ["glukoneogenéz\\w*"],
  short: "Tvorba glukózy z aminokyselín a laktátu.",
  body: "<ul><li>Prebieha v pečeni a obličke.</li><li>Surovinou je laktát, glycerol a aminokyseliny.</li><li>Dôležitá pri hladovaní.</li></ul>"
},
{
  id: "lipolyza",
  title: "Lipolýza",
  match: ["lipolýz\\w*"],
  short: "Rozklad tukov na mastné kyseliny.",
  body: "<ul><li>Aktivujú ju adrenalín a glukagón, tlmí inzulín.</li><li>Mastné kyseliny sa v pečeni môžu uložiť ako TAG (steatóza).</li></ul>"
},
{
  id: "lipogeneza",
  title: "Lipogenéza",
  match: ["lipogenéz\\w*"],
  short: "Tvorba tukov (z cukrov a mastných kyselín).",
  body: "<ul><li>Podporuje ju inzulín.</li><li>V pečeni vedie pri nadbytku cukrov k steatóze.</li></ul>"
},
{
  id: "glykemia", et: "gr. <i>glykys</i> + <i>haima</i>",
  title: "Glykémia",
  match: ["glykémi\\w*"],
  short: "Koncentrácia glukózy v krvi.",
  body: "<ul><li>Na lačno ≈ 3,9–5,6 mmol/l.</li></ul>"
},
{
  id: "hypoglykemia",
  title: "Hypoglykémia",
  match: ["hypoglykémi\\w*"],
  short: "Pokles glukózy v krvi (pod ≈ 3,0 mmol/l) ohrozuje mozog, ktorý závisí od glukózy.",
  body: "<ul><li>Príznaky: potenie, tras, zmätenosť, kóma.</li><li>Najčastejšie pri predávkovaní inzulínom.</li></ul>"
},
{
  id: "hyperglykemia",
  title: "Hyperglykémia",
  match: ["hyperglykémi\\w*"],
  short: "Zvýšená glukóza v krvi — dlhodobo poškodzuje cievy a nervy.",
  body: "<ul><li>Diabetes: glykémia nalačno ≥ 7,0 mmol/l.</li><li>Chronicky vedie ku glykácii bielkovín (AGE).</li></ul>"
},
{
  id: "natriureticky-peptid", et: "natrium (sodík) + gr. <i>ouron</i> „moč“; peptid: gr. <i>peptos</i> „stráviteľný“",
  title: "Natriuretické peptidy (ANP, BNP; angl. atrial natriuretic peptide, B-type natriuretic peptide)",
  match: ["natriuretick\\w*(?:\\s+peptid\\w*)?", "BNP", "NT-proBNP"],
  short: "Hormóny, ktoré uvoľňuje preťažené srdce (predsiene — ANP, komory — BNP). Zvyšujú vylučovanie sodíka a vody a rozširujú cievy; ich hladina v krvi je ukazovateľ zlyhania srdca."
},

/* ── orgány a anatómia ───────────────────────────────────────────────── */
{
  id: "endometrium", et: "gr. <i>endon</i> „vnútri“ + <i>metra</i> „maternica“",
  img: {
    src: "assets/images/endometrial-hyperplasia.jpg",
    alt: "Hyperplázia endometria: nepravidelné, cysticky rozšírené žliazky.",
    caption: "Hyperplázia endometria: nepravidelné, cysticky rozšírené žliazky.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Simple_endometrial_hyperplasia_-_low_mag.jpg"
  },
  title: "Endometrium",
  match: ["endometri\\w*"],
  short: "Sliznica výstelky dutiny maternice. Mení sa počas menštruačného cyklu: v prvej polovici sa pod vplyvom estrogénov množí, po ovulácii pod vplyvom progesterónu sekrečne dozrieva, ak nenastane tehotenstvo, odlúpne sa (menštruácia)."
},
{
  id: "maternica", et: "gr. <i>metra</i>, lat. <i>uterus</i>",
  title: "Maternica",
  match: ["maternic\\w*"],
  short: "Svalový orgán, kde sa vyvíja plod.",
  body: "<ul><li>Vrstvy: endometrium, myometrium, perimetrium.</li><li>Choroby: leiomyóm, endometrióza, karcinóm endometria.</li></ul>"
},
{
  id: "vajecnik",
  title: "Vaječník",
  match: ["vaječník\\w*"],
  short: "Párový orgán, ktorý tvorí vajíčka a pohlavné hormóny.",
  body: "<ul><li>Cysty a nádory (serózne, mucinózne).</li><li>Menopauza je zánik folikulov.</li></ul>"
},
{
  id: "vajickovod",
  title: "Vajíčkovod",
  match: ["vajíčkovod\\w*"],
  short: "Trubica, ktorá vedie vajíčko do maternice; tu sa vajíčko oplodní.",
  body: "<ul><li>Pri zápale môže vzniknúť pyosalpinx.</li></ul>"
},
{
  id: "gravidita", et: "lat. <i>gravida</i> „tehotná“",
  title: "Gravidita",
  match: ["gravidn\\w*", "gravidit\\w*"],
  short: "Tehotenstvo.",
  body: "<ul><li>Mimomaternicová gravidita sa najčastejšie uhniezdi vo vajíčkovode.</li><li>Komplikácie: preeklampsia a eklampsia.</li></ul>"
},
{
  id: "prostata", et: "gr. <i>prostates</i> „stojaci pred“ (<i>pro</i> „pred“ + <i>histanai</i> „postaviť“)",
  title: "Prostata",
  match: ["prostat\\w*"],
  img: {
    "src": "assets/images/prostate-nodular-hyperplasia.jpg",
    "alt": "Uzlovitá hyperplázia prostaty: zmnožené žliazky a väzivová stróma.",
    "caption": "Uzlovitá hyperplázia prostaty: zmnožené žliazky a väzivová stróma.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Nodular_hyperplasia_of_the_prostate.jpg"
  },
  short: "Žľaza pod močovým mechúrom, ktorá obklopuje začiatok močovej trubice a tvorí časť semennej tekutiny. S vekom sa zväčšuje (benígna hyperplázia), čo zužuje močovú trubicu.",
  body: "<ul><li>Periférna zóna: karcinóm; tranzitná zóna: hyperplázia.</li><li>PSA je laboratórny marker.</li></ul>"
},
{
  id: "oblicka",
  title: "Oblička",
  match: ["obličk\\w*"],
  short: "Párový orgán, ktorý filtruje krv a tvorí moč v nefrónoch.",
  body: "<ul><li>Kôra obsahuje glomeruly, dreň tubuly a zberné kanáliky.</li><li>Ischémia vedie k nekróze tubulov.</li></ul>"
},
{
  id: "nefron", et: "gr. <i>nephros</i> „oblička“",
  title: "Nefrón",
  match: ["nefrón\\w*"],
  short: "Funkčná jednotka obličky: glomerulus a tubul.",
  body: "<ul><li>Glomerulus filtruje, tubuly resorbujú.</li><li>Proximálny tubulus je najcitlivejší na ischémiu.</li></ul>"
},
{
  id: "mocovod",
  title: "Močovod",
  match: ["močovod\\w*"],
  short: "Trubica, ktorá vedie moč z obličky do močového mechúra.",
  body: "<ul><li>Zúženie vyvolá hydronefrózu.</li><li>Kameň uviazne v miestach zúženia.</li></ul>"
},
{
  id: "mocovy-mechur",
  title: "Močový mechúr",
  match: ["močov\\w*\\s+mechúr\\w*"],
  short: "Dutý orgán, v ktorom sa moč zhromažďuje až do vyprázdnenia cez močovú rúru; vystiela ho prechodný epitel (urotel).",
  body: "<ul><li>Nádor: urotelový karcinóm.</li><li>Zápal: cystitída.</li></ul>"
},
{
  id: "zaludok",
  title: "Žalúdok",
  match: ["žalúd\\w*", "žalúdk\\w*"],
  short: "Dutý orgán, ktorý potravu mieša s kyselinou a pepsínom; vystiela ho žľazový epitel.",
  body: "<ul><li>Choroby: gastritída, vred, karcinóm.</li><li>Parietálne bunky tvoria kyselinu, hlavné bunky pepsinogén.</li></ul>"
},
{
  id: "pazerak",
  title: "Pažerák",
  match: ["pažerák\\w*"],
  short: "Trubica, ktorá vedie potravu z hltana do žalúdka; vystiela ho dlaždicový epitel.",
  body: "<ul><li>Dlaždicový epitel: dlaždicovobunkový karcinóm.</li><li>Dolný koniec: Barrettova metaplázia → adenokarcinóm.</li><li>Achalázia a varixy pri portálnej hypertenzii.</li></ul>"
},
{
  id: "pankreas", et: "gr. <i>pan</i> „všetko“ + <i>kreas</i> „mäso“",
  title: "Pankreas (podžalúdková žľaza)",
  match: ["pankreas\\w*", "pankreat\\w*", "podžalúdkov\\w*"],
  short: "Žľaza, ktorá tvorí tráviace enzýmy (exokrinná časť) a hormóny inzulín a glukagón (Langerhansove ostrovčeky, endokrinná časť)."
},
{
  id: "pecen", et: "gr. <i>hepar</i>",
  title: "Pečeň",
  match: ["pečeň\\w*", "pečen\\w*"],
  short: "Najväčšia metabolická žľaza tela: spracúva živiny, tvorí bielkoviny plazmy a žlč, odbúrava lieky.",
  body: "<ul><li>Väčšina krvi prichádza vrátnicou, menšia pečeňovou tepnou.</li><li>Regeneračná schopnosť je vysoká.</li></ul>"
},
{
  id: "zlc", et: "lat. <i>bilis</i>",
  title: "Žlč",
  match: ["žlč(?:a|e|i|ou|u|í)?", "žlčník\\w*", "žlčov\\w*"],
  short: "Tekutina z pečene, ktorá emulguje tuky v čreve.",
  body: "<ul><li>Obsahuje žlčové kyseliny, cholesterol a bilirubín.</li><li>Pri nadbytku cholesterolu môžu vzniknúť kamene.</li></ul>"
},
{
  id: "zlcove-cesty",
  title: "Žlčové cesty",
  match: ["žlčov\\w*\\s+cest\\w*", "žlčov\\w*\\s+ciest\\w*"],
  short: "Systém kanálikov, ktorý odvádza žlč z pečene do dvanástnika.",
  body: "<ul><li>Ich zápal je cholangitída, upchatie vyvolá cholestázu.</li></ul>"
},
{
  id: "dvanastnik", et: "lat. <i>duodenum</i>",
  title: "Dvanástnik",
  match: ["dvanástnik\\w*"],
  short: "Prvý úsek tenkého čreva: prijíma žalúdočnú kašu, žlč a šťavu pankreasu.",
  body: "<ul><li>Brunnerove žľazy neutralizujú kyselinu.</li><li>Je častým miestom peptického vredu.</li></ul>"
},
{
  id: "tenke-crevo",
  title: "Tenké črevo",
  match: ["tenk\\w*\\s+črev\\w*", "jejun\\w*"],
  short: "Dvanástnik, lačník a bedrovník — hlavné miesto trávenia a vstrebávania živín.",
  body: "<ul><li>Klky zväčšujú povrch.</li><li>Celiakia klky atrofuje.</li></ul>"
},
{
  id: "hrube-crevo", et: "gr. <i>kolon</i>",
  title: "Hrubé črevo",
  match: ["hrub\\w*\\s+črev\\w*"],
  short: "Vstrebáva vodu a elektrolyty a formuje stolicu.",
  body: "<ul><li>Kolorektálny karcinóm vzniká z adenómu.</li><li>Časté choroby: divertikuly a ulcerózna kolitída.</li></ul>"
},
{
  id: "konecnik", et: "gr. <i>proktos</i>, lat. <i>rectum</i>",
  title: "Konečník",
  match: ["konečník\\w*", "rekt\\w*"],
  short: "Posledný úsek hrubého čreva, ktorý stolicu zhromažďuje až do vyprázdnenia.",
  body: "<ul><li>Hemoroidy vznikajú z ciev konečníka.</li><li>Karcinóm konečníka.</li></ul>"
},
{
  id: "peritoneum", et: "gr. <i>peri</i> „okolo“ + <i>teinein</i> „natiahnuť“",
  title: "Pobrušnica (peritoneum)",
  match: ["pobrušnic\\w*", "peritone\\w*", "retroperitone\\w*", "mezentéri\\w*", "mezenterick\\w*"],
  img: {
    "src": "assets/images/fibrinopurulent-peritonitis.jpg",
    "alt": "Fibrinózno-hnisavá peritonitída.",
    "caption": "Fibrinózno-hnisavá peritonitída.",
    "credit": "CoRus13 · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Acute_fibrinopurulent_peritonitis,_high_mag.jpg"
  },
  short: "Serózna blana vystielajúca brušnú dutinu a pokrývajúca orgány. Mezentérium je jej záhyb, v ktorom visí črevo a vedú cievy a uzliny.",
  body: "<ul><li>Peritonitída je život ohrozujúca.</li><li>Mezotelióm môže vzniknúť aj v pobrušnici.</li></ul>"
},
{
  id: "osrdcovnik", et: "perikard: gr. <i>peri</i> „okolo“ + <i>kardia</i> „srdce“",
  img: {
    src: "assets/images/fibrinous-pericarditis.jpg",
    alt: "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    caption: "Fibrinózna perikarditída: fibrínový povlak na povrchu osrdcovníka.",
    credit: "K. Bielnik a kol. · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Pericarditis_fibrinosa.jpg"
  },
  title: "Osrdcovník (perikard)",
  match: ["osrdcovník\\w*"],
  short: "Dvojvrstvový obal srdca. Medzi vrstvami je tenká vrstva tekutiny, ktorá znižuje trenie; zápal alebo výpotok môže sťažiť plnenie srdca."
},
{
  id: "komory",
  title: "Komory srdca",
  match: ["komor\\w*(?:\\s+srdc\\w*)?"],
  short: "Dve dutiny srdca, ktoré vytláčajú krv do tepien — ľavá do veľkého obehu, pravá do pľúc.",
  body: "<ul><li>Ľavá komora má hrubšiu stenu, lebo čerpá proti vysokému tlaku.</li><li>Pravá hypertrofuje pri pľúcnej hypertenzii (cor pulmonale).</li></ul>"
},
{
  id: "predsiene",
  title: "Predsiene srdca",
  match: ["predsie\\w*(?:\\s+srdc\\w*)?"],
  short: "Dve dutiny srdca, ktoré prijímajú krv a plnia komory.",
  body: "<ul><li>Ľavá predsieň sa rozširuje pri mitrálnej chybe.</li><li>Fibrilácia predsiení zvyšuje riziko trombu v ušku.</li></ul>"
},
{
  id: "koronarne-cievy", et: "lat. <i>corona</i> „veniec“",
  title: "Koronárne tepny",
  match: ["koronárn\\w*", "vencovit\\w*"],
  short: "Tepny, ktoré vyživujú srdcový sval. Ich zúženie (ateroskleróza) alebo uzáver (trombus) vedie k ischémii a infarktu myokardu."
},
{
  id: "subendokard", et: "lat. <i>sub</i> „pod“ + gr. <i>endon</i> „vnútri“ + <i>kardia</i>",
  title: "Subendokard",
  match: ["subendokard\\w*"],
  short: "Vrstva myokardu tesne pod vnútornou výstelkou komory. Je najvzdialenejšia od koronárnych tepien a má najvyšší tlak, preto je najcitlivejšia na ischémiu."
},
{
  id: "arteriola", et: "lat. <i>arteriola</i>",
  title: "Arterioly",
  match: ["arteriol\\w*"],
  short: "Najmenšie tepny: svojím stiahnutím riadia prietok krvi a tlak."
},
{
  id: "venula", et: "lat. <i>venula</i>",
  title: "Venuly",
  match: ["venul\\w*"],
  short: "Najmenšie žily, ktoré zbierajú krv z kapilár; práve cez postkapilárne venuly prechádzajú leukocyty do zápalu."
},
{
  id: "anastomoza", et: "gr. <i>ana</i> „znova“ + <i>stoma</i> „ústie“",
  title: "Anastomóza",
  match: ["anastomóz\\w*"],
  short: "Prirodzené alebo chirurgické spojenie dvoch ciev, dutých orgánov alebo nervov. Cievne anastomózy umožňujú náhradný prietok pri uzávere tepny (kolaterály)."
},
{
  id: "vratnica",
  title: "Vrátnica",
  match: ["vrátnic\\w*"],
  short: "Žila, ktorá vedie krv z čriev, žalúdka a sleziny do pečene."
},
{
  id: "portalna-hypertenzia", et: "lat. <i>porta</i> „brána“",
  title: "Portálna hypertenzia",
  match: ["portáln\\w*(?:\\s+hypertenzi\\w*)?"],
  short: "Zvýšený tlak vo vrátnici pri cirhóze.",
  body: "<ul><li>Vedie k ascitu, rozšíreným žilám pažeráka a splenomegálii.</li></ul>"
},
{
  id: "bludny-nerv", et: "lat. <i>vagus</i> „blúdiaci“",
  title: "Bludný nerv (vagus)",
  match: ["bludn\\w*\\s+nerv\\w*", "blúdiv\\w*", "vagus\\w*"],
  short: "Hlavný parasympatický nerv: upokojuje a spomaľuje srdce."
},
{
  id: "sympatikus", et: "gr. <i>syn</i> + <i>pathos</i>",
  title: "Sympatikus",
  match: ["sympatik\\w*"],
  short: "Časť autonómneho nervstva, ktorá pripravuje telo na záťaž (zrýchľuje srdce)."
},
{
  id: "parasympatikus",
  title: "Parasympatikus",
  match: ["parasympatik\\w*"],
  short: "Časť autonómneho nervstva, ktorá upokojuje (najmä bludný nerv)."
},
{
  id: "autonomny-nerv",
  title: "Autonómny nervový systém",
  match: ["autonómn\\w*(?:\\s+nervov\\w*\\s+systém\\w*)?"],
  short: "Riadi orgány mimovoľne; má sympatickú a parasympatickú časť."
},
{
  id: "baroreceptory", et: "gr. <i>baros</i> „tlak“ + receptor",
  title: "Baroreceptory",
  match: ["baroreceptor\\w*"],
  short: "Tlakové senzory v stene aorty a krčnej tepny; cez nervový systém tlak krvi upravujú."
},
{
  id: "autoregulacia", et: "gr. <i>autos</i> + lat. <i>regulare</i>",
  title: "Autoregulácia",
  match: ["autoregulác\\w*"],
  short: "Udržiavanie prietoku krvi orgánom (mozog, oblička) v širokom rozpätí tlaku."
},
{
  id: "hypotalamus", et: "gr. <i>hypo</i> „pod“ + <i>thalamos</i> „komnata, lôžko“",
  title: "Hypotalamus",
  match: ["hypotalam\\w*"],
  short: "Časť mozgu, ktorá riadi teplotu tela, smäd, hlad a hormóny hypofýzy. Pri zápale pod vplyvom pyrogénov (IL-1, IL-6, PGE₂) nastaví vyššiu hodnotu telesnej teploty (horúčka)."
},
{
  id: "kostna-dren",
  title: "Kostná dreň",
  match: ["kostn\\w*\\s+dre\\w*", "krvotvorb\\w*", "krvotvorn\\w*"],
  short: "Mäkké tkanivo vo vnútri kostí, kde vznikajú krvinky z kmeňových buniek (krvotvorba). Chorobné zmeny sa preukazujú trepanobiopsiou.",
  body: "<ul><li>Červená (krvotvorná) a žltá (tuková).</li><li>Pri leukémii a myelóme ju zasiahnu nádorové bunky.</li></ul>"
}

);

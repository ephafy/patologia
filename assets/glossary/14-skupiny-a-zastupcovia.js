/* Glosár PATOLY — skupiny pojmov a ich zástupcovia (kap. 7).
   Pravidlo: heslo skupiny popisuje skupinu a pod popisom vymenúva zástupcov; každý zástupca má vlastné heslo
   (otvorí sa ako ďalšie okno) s tým, čo je pre neho špecifické, a podľa možnosti s fotografiou.
   Zástupcov v tele skupiny značkuje engine sám podľa ich vzorov — netreba ručné odkazy.
   Texty sú vlastné (CLAUDE.md §4.1). Obrázky: register ZDROJE-OBRAZKOV.md. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(

/* ── systémové mykózy ────────────────────────────────────────────────── */
{
  id: "mykozy", et: "gr. <i>mykes</i> „huba“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/histoplasma-gms.jpg",
    alt: "Histoplazma v striebrení podľa Grocotta.",
    caption: "Histoplazma v striebrení podľa Grocotta.",
    credit: "Mikael Häggström, M.D. · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_Histoplasma_capsulatum,_GMS_stain.jpg"
  },
  title: "Systémové mykózy (infekcie hubami)",
  match: ["systémov\\w*\\s+mykóz\\w*", "mykóz\\w*"],
  short: "Hlbokú infekciu vyvoláva huba, ktorej spóry sa vdýchnu z pôdy. V pľúcach ich pohltia makrofágy; huba v nich prežije, a preto telo odpovie granulómom — často takým, ktorý nemožno od tuberkulózneho rozlíšiť len podľa tvaru.",
  body:
    "<p><b>Zástupcovia</b> (kliknutím sa otvoria):</p>" +
    "<ul>" +
      "<li>Histoplasma — histoplazmóza</li>" +
      "<li>Cryptococcus — kryptokokóza</li>" +
      "<li>Coccidioides — kokcidioidomykóza</li>" +
      "<li>Blastomyces — blastomykóza</li>" +
    "</ul>" +
    '<p class="why"><b>Spoločné.</b> Rozhoduje imunita: u zdravého človeka ložisko ohraničí a zjazví (často kalcifikuje), pri oslabení (AIDS, glukokortikoidy, lieky proti TNF) sa huba rozsieva. V rezoch ju zviditeľní PAS alebo striebrenie podľa Grocotta — v H&amp;E sa často nevidí. Líšia sa tým, kde sa vyskytujú a ako vyzerá huba v tkanive.</p>'
},
{
  id: "histoplazma", et: "gr. <i>histos</i> „tkanivo“ + <i>plasma</i> „útvar“ + <i>-osis</i> „stav, proces“",
  title: "Histoplazmóza (Histoplasma capsulatum)",
  match: ["histoplazm\\w*", "Histoplasm\\w*"],
  short: "Pôdna huba z miest s trusom vtákov a netopierov (údolia riek Ohio a Mississippi). V tkanive tvorí drobné kvasinky (≈ 2–4 µm), ktoré sa množia vo vnútri makrofágov.",
  body:
    "<ul>" +
      "<li><b>Granulóm:</b> epiteloidný, často s kazeifikáciou — podobný tuberkulóznemu; zahojené ložiská kalcifikujú (na RTG pripomínajú Rankeho komplex).</li>" +
      "<li><b>Na reze:</b> v H&amp;E malé okrúhle telieska s svetlým lemom v cytoplazme makrofágov; spoľahlivo ich ukáže striebrenie podľa Grocotta alebo PAS.</li>" +
      "<li><b>Rozsiata forma</b> pri AIDS: plné makrofágy vo sleziene, pečeni, dreni a nadobličkách.</li>" +
    "</ul>",
  img: {
    src: "assets/images/histoplasma-gms.jpg",
    alt: "Kvasinky Histoplasma capsulatum, striebrenie podľa Grocotta.",
    caption: "Histoplasma pri striebrení podľa Grocotta (GMS): čierne okrúhle kvasinky.",
    credit: "Mikael Häggström, M.D. · CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_Histoplasma_capsulatum,_GMS_stain.jpg"
  }
},
{
  id: "kryptokok", et: "gr. <i>kryptos</i> „skrytý“ + <i>kokkos</i> „zrno“",
  title: "Kryptokokóza (Cryptococcus neoformans)",
  match: ["kryptokok\\w*", "Cryptococc\\w*"],
  short: "Kvasinka s hrubou polysacharidovou kapsulou, ktorá sa šíri z holubieho trusu a prachu. Vyvoláva infekciu pľúc a mozgových obalov hlavne u imunosuprimovaných (AIDS).",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> kapsula sa v H&amp;E nezafarbí a okolo bunky ostane svetlý „dvor“; mucikarmín ju zafarbí do červena, v likvore sa ukáže tušom (India ink).</li>" +
      "<li><b>Granulóm:</b> pri dobrej imunite epiteloidný, pri AIDS málo zápalových buniek a husto naplnené kvasinkami (želatínový vzhľad).</li>" +
      "<li><b>Klinika:</b> meningoencefalitída s bolesťou hlavy a horúčkou; likvor sa vyšetruje na antigén kapsuly.</li>" +
    "</ul>",
  img: {
    src: "assets/images/cryptococcus-mucicarmine.jpg",
    alt: "Cryptococcus v pľúcnom tkanive, mucikarmínové farbenie.",
    caption: "Pľúca pri AIDS, mucikarmín: kapsuly kryptokokov sú červené.",
    credit: "CDC / Dr. Edwin P. Ewing, Jr. · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Cryptococcosis_of_lung_in_patient_with_AIDS._Mucicarmine_stain_962_lores.jpg"
  }
},
{
  id: "kokcidioidy", et: "gr. <i>kokkos</i> „zrno“ + <i>-eides</i> „podobný“",
  title: "Kokcidioidomykóza (Coccidioides)",
  match: ["kokcidioid\\w*", "Coccidioid\\w*"],
  short: "Pôdna huba polosuchých oblastí (juhozápad USA, Mexiko, Južná Amerika; „údolná horúčka“). Na rozdiel od ostatných netvorí v tkanive kvasinky, ale veľké guľovité sférule plné endospór.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> sférula je mnohonásobne väčšia než kvasinka histoplazmy; po prasknutí uvoľní endospóry, z ktorých vzniknú nové sférule — preto sa v ložisku nachádzajú rôzne veľké formy.</li>" +
      "<li><b>Granulóm:</b> epiteloidný s kazeifikáciou a hnisavou zložkou; zahojené ložisko v pľúcach ostane ako „mincový“ uzlík.</li>" +
      "<li><b>Klinika:</b> pľúcna infekcia ako chrípka; u oslabených rozsev do kože, kostí a mozgových obalov.</li>" +
    "</ul>",
  img: {
    src: "assets/images/coccidioides-spherule.jpg",
    alt: "Zrelá sférula Coccidioides s endospórami v tkanive.",
    caption: "Zrelá sférula s endospórami (H&E).",
    credit: "CDC / Dr. Lucille K. Georg · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Mature_spherule_with_endospores_of_Coccidioides_immitis_PHIL_480_lores.jpg"
  }
},
{
  id: "blastomycety", et: "gr. <i>blastos</i> „klíček“ + <i>mykes</i> „huba“",
  title: "Blastomykóza (Blastomyces dermatitidis)",
  match: ["blastomycét\\w*", "blastomykóz\\w*", "Blastomyc\\w*"],
  short: "Pôdna huba Severnej Ameriky (okolie Veľkých jazier, údolia riek Ohio a Mississippi). V tkanive je to kvasinka (≈ 8–15 µm) s hrubou dvojitou stenou, ktorá sa množí pučaním na širokej báze.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> granulóm je zmiešaný — epiteloidné bunky s obrovskými bunkami a zároveň mikroabscesy z neutrofilov (pyogranulóm); kvasinky leží aj v obrovských bunkách.</li>" +
      "<li><b>Postihnutie:</b> pľúca a koža (bradavičnaté ložiská), ďalej kosti a urogenitálny trakt.</li>" +
    "</ul>",
  img: {
    src: "assets/images/blastomycosis-giant-cells.jpg",
    alt: "Obrovské viacjadrové bunky s kvasinkami Blastomyces (šípky).",
    caption: "Blastomykóza (H&E): kvasinky vo vnútri obrovských buniek (šípky).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:North_American_blastomycosis_3.jpg"
  }
},

/* ── vnútrobunkové prvoky ────────────────────────────────────────────── */
{
  id: "vnutrobunkove-prvoky", et: "protozoá: gr. <i>protos</i> „prvý“ + <i>zoon</i> „živočích“",
  img: {
    src: "assets/images/leishmania-amastigotes.jpg",
    alt: "Amastigoty Leishmanie vo vnútri makrofágov.",
    caption: "Amastigoty Leishmanie vo vnútri makrofágov.",
    credit: "Ajay Kumar Chaurasiya · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Leishmania_donovani_amastigotes_in_Giemsa_stained_smear_of_FNAC.jpg"
  },
  title: "Vnútrobunkové prvoky",
  match: ["vnútrobunkov\\w*\\s+prvok\\w*", "prvok\\w*"],
  short: "Prvoky sú jednobunkové organizmy so zložitejšou bunkou než baktérie. Niektoré žijú vo vnútri buniek hostiteľa (často v makrofágoch), a preto ich imunita zničí ťažko a odpovie granulómom.",
  body:
    "<p><b>Zástupcovia v tejto kapitole:</b></p>" +
    "<ul>" +
      "<li>Toxoplazma — toxoplazmóza</li>" +
      "<li>Leishmánie — leishmanióza</li>" +
    "</ul>" +
    '<p class="why"><b>Spoločné.</b> Obe infekcie sa dajú v tkanive rozoznať len pri dôkladnom pohľade: parazity sú drobné (niekoľko µm) a leží ich veľa v jednej bunke.</p>'
},
{
  id: "toxoplazma", et: "gr. <i>toxon</i> „luk, oblúk“ + <i>plasma</i> „útvar“ (tvar polmesiaca)",
  title: "Toxoplazmóza (Toxoplasma gondii)",
  match: ["toxoplazm\\w*", "Toxoplasm\\w*"],
  short: "Vnútrobunkový prvok, ktorého definitívnym hostiteľom je mačka (oocysty v truse). Človek sa nakazí surovým mäsom alebo neumytou zeleninou; po infekcii prežíva doživotne v cystách s pomaly sa množiacimi formami (bradyzoity).",
  body:
    "<ul>" +
      "<li><b>Zdravý človek:</b> infekcia ostane nepovšimnutá alebo ako zväčšené uzliny (lymfadenitída s drobnými granulómami z epiteloidných buniek).</li>" +
      "<li><b>AIDS:</b> reaktivácia cýst v mozgu → ložiská nekrózy a mozgové abscesy.</li>" +
      "<li><b>Tehotenstvo:</b> prvá infekcia matky počas gravidity môže postihnúť plod (hydrocefalus, kalcifikácie, zápal sietnice).</li>" +
    "</ul>",
  img: {
    src: "assets/images/toxoplasma-cyst-brain.jpg",
    alt: "Tkanivová cysta Toxoplasma gondii v mozgu myši, plná bradyzoitov.",
    caption: "Tkanivová cysta v mozgu (myš): okrúhla štruktúra plná parazitov.",
    credit: "Jitinder P. Dubey, USDA · Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Toxoplasma_gondii_tissue_cyst_in_mouse_brain.jpg"
  }
},
{
  id: "leishmania",
  title: "Leishmanióza (Leishmania)",
  match: ["leishmáni\\w*", "leishmaniáz\\w*", "Leishmani\\w*"],
  short: "Vnútrobunkový prvok prenášaný uštipnutím samičiek piesočných mušiek. V makrofágoch sa množí vo forme drobných amastigotov (≈ 2–4 µm), ktoré ich postupne zaplnia.",
  body:
    "<ul>" +
      "<li><b>Na reze:</b> v H&amp;E drobné bodky s jadrom a tyčinkovitým kinetoplastom v cytoplazme makrofágov; v Giemsovom nátere fialové.</li>" +
      "<li><b>Podľa postihnutia:</b> kožná (vred, ktorý sa hojí jazvou), slizničná (ničí chrupku nosa) a viscerálna (kala-azar: zväčšená slezina a pečeň, cytopénie).</li>" +
    "</ul>",
  img: {
    src: "assets/images/leishmania-amastigotes.jpg",
    alt: "Makrofág naplnený amastigotmi Leishmania, Giemsovo farbenie.",
    caption: "Makrofág s amastigotmi leishmánií (Giemsa, náter z punkcie).",
    credit: "Ajay Kumar Chaurasiya · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Leishmania_donovani_amastigotes_in_Giemsa_stained_smear_of_FNAC.jpg"
  }
},

/* ── pomocné T-lymfocyty ─────────────────────────────────────────────── */
{
  id: "th-lymfocyty", et: "T = týmus (v ňom lymfocyty dozrievajú); Th = angl. <i>T helper</i> „T pomocník“",
  title: "Pomocné T-lymfocyty (Th)",
  match: ["pomocn\\w*\\s+T-lymfocyt\\w*", "pomocn\\w*\\s+lymfocyt\\w*"],
  short: "CD4⁺ T-lymfocyty, ktoré neničia bunky samy, ale riadia ostatné bunky imunity cytokínmi. Podľa toho, na akú odpoveď sa špecializujú, sa delia na podskupiny.",
  body:
    "<p><b>Hlavné podskupiny:</b></p>" +
    "<ul>" +
      "<li>Th1 — aktivujú makrofágy</li>" +
      "<li>Th2 — alergia a obrana proti parazitom</li>" +
      "<li>Th17 — obrana slizníc, neutrofily</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Smer odpovede určuje typ zápalu: Th1 vyvolá granulóm, Th2 eozinofily a IgE, Th17 neutrofily.</p>'
},
{
  id: "th1",
  title: "Th1-lymfocyty (angl. T helper 1 cells)",
  match: ["Th1(?:-\\w+)?"],
  short: "Pomocné T-lymfocyty, ktoré vznikajú pod vplyvom IL-12 a tvoria IFN-γ a IL-2. IFN-γ aktivuje makrofágy, aby vedeli zabíjať pohltené mikróby.",
  body:
    '<p class="chain">pretrvávajúci antigén → <b>IL-12</b> → Th1 → <b>IFN-γ</b> → aktivovaný makrofág → epiteloidné bunky → <b>granulóm</b></p>' +
    "<ul>" +
      "<li><b>Špecifické:</b> sú nevyhnutné pri obrane proti mykobaktériám a hubám vo vnútri makrofágov; pri ich nedostatku (HIV, poruchy IL-12/IFN-γ) sa mikróby voľne množia.</li>" +
      "<li><b>Nadmerná odpoveď:</b> základ sarkoidózy a časti autoimunitných chorôb.</li>" +
    "</ul>"
},
{
  id: "th2",
  title: "Th2-lymfocyty (angl. T helper 2 cells)",
  match: ["Th2(?:-\\w+)?"],
  short: "Pomocné T-lymfocyty, ktoré tvoria IL-4, IL-5 a IL-13. Podporujú eozinofily a tvorbu protilátok IgE.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> riadia obranu proti parazitom (helminty) a alergickú odpoveď; IL-4 a IL-13 zároveň podporujú splývanie makrofágov do obrovských buniek.</li>" +
      "<li><b>Brzda:</b> IL-4 a IL-13 tlmia Th1 odpoveď — pri lepromatóznej lepre prevláda Th2 a granulóm nevznikne.</li>" +
    "</ul>"
},
{
  id: "th17",
  title: "Th17-lymfocyty (angl. T helper 17 cells)",
  match: ["Th17(?:-\\w+)?"],
  short: "Pomocné T-lymfocyty, ktoré tvoria IL-17 a IL-22. Priťahujú neutrofily a chránia sliznice pred baktériami a hubami.",
  body:
    "<ul>" +
      "<li><b>Špecifické:</b> podieľajú sa na hnisavých zápaloch a na autoimunitných chorobách (psoriáza, zápalové choroby čreva).</li>" +
      "<li><b>V granulóme:</b> pri sarkoidóze sa spolu s Th1 podieľajú na pretrvávajúcom zápale.</li>" +
    "</ul>"
}

);

/* Glosár PATOLY — dystrofie: tuk, bielkoviny, hlien, amyloid, sacharidy. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "dystrofia", et: "gr. <i>dys-</i> „zle, porucha“ + <i>trophe</i> „výživa“; degenerácia: lat. <i>degenerare</i> „vyrodiť sa“",
  img: {
    src: "assets/images/ballooning-hepatocytes.jpg",
    alt: "Hydropická dystrofia: nafúknuté hepatocyty so svetlou cytoplazmou.",
    caption: "Hydropická dystrofia: nafúknuté hepatocyty so svetlou cytoplazmou.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Ballooning_degeneration_high_mag_cropped.jpg"
  },
  title: "Dystrofia (degenerácia)",
  match: ["dystrofi\\w*", "dystrofick\\w*", "degeneráci\\w*"],
  short: "Vratné hromadenie látky v bunke alebo medzibunkovej hmote, ktorá tam v tomto množstve alebo tvare nepatrí.",
  body:
    '<p class="chain">prísun (P) &gt; premena (M) + odvoz (E) → <b>látka sa hromadí</b></p>' +
    "<ul>" +
      "<li><b>Príliš veľký prísun</b> — látky je priveľa.</li>" +
      "<li><b>Zlyhá premena</b> — chýba enzým alebo bielkovina sa zle zloží.</li>" +
      "<li><b>Zlyhá odvoz</b> — export alebo odbúranie.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Zvyčajne je zmena <b>vratná</b> a bez straty funkcie; pri veľkom ukladaní však poškodí orgán. <b>Výnimky:</b> amyloid a vrodené poruchy sú trvalé.</p>'
},
{
  id: "steatoza", et: "gr. <i>stear, steatos</i> „loj, tuk“ + <i>-osis</i> „dej, stav“",
  title: "Steatóza (stukovatenie)",
  match: ["steatóz\\w*", "stukovaten\\w*", "steatotick\\w*"],
  short: "Nahromadenie triacylglycerolov v cytoplazme buniek — najčastejšie hepatocytov.",
  body:
    '<p class="chain">tuk sa hromadí, keď platí: <b>prísun + tvorba mastných kyselín &gt; spaľovanie + export</b></p>' +
    "<ul>" +
      "<li><b>↑ prísun MK</b> — hladovanie, diabetes, ↑ lipolýza.</li>" +
      "<li><b>↑ tvorba MK</b> — alkohol, inzulínová rezistencia.</li>" +
      "<li><b>↓ spaľovanie</b> — hypoxia, toxíny, alkohol.</li>" +
      "<li><b>↓ export</b> — nedostatok apoB100, toxíny (napr. CCl₄), podvýživa.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Samotná steatóza je <b>reverzibilná</b>. Pri dlhom preťažení však vzniká <b>lipotoxicita</b> → zápal → fibróza → cirhóza. Na dôkaz tuku treba zmrazený rez (Sudan, Oil Red O) — bežné spracovanie tuk vyplaví a zostanú „prázdne vakuoly“.</p>',
  img: {
    src: "assets/images/steatosis-liver.jpg",
    alt: "Steatóza pečene v H&E.",
    caption: "Hepatocyty s čírymi tukovými vakuolami.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Fatty_change_liver_-_Lipid_steatosis_40X.jpg"
  }
},
{
  id: "masld",
  img: {
    src: "assets/images/steatosis-liver.jpg",
    alt: "Steatóza pečene: tukové kvapky v hepatocytoch.",
    caption: "Steatóza pečene: tukové kvapky v hepatocytoch.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Fatty_change_liver_-_Lipid_steatosis_40X.jpg"
  },
  title: "MASLD (predtým NAFLD; angl. metabolic dysfunction-associated steatotic liver disease, non-alcoholic fatty liver disease)",
  match: ["MASLD", "NAFLD", "MASH", "NASH", "MetALD", "SLD", "ASH", "steatohepatit\\w*"],
  short: "Tuková choroba pečene spojená s metabolickou dysfunkciou — od roku 2023 nový názov pre NAFLD.",
  body:
    "<p><b>Čo znamenajú písmená</b> (skratky sú z angličtiny):</p>" +
    "<ul>" +
      "<li><b>SLD</b> — <i>Steatotic Liver Disease</i>, steatotická (tuková) choroba pečene; zastrešujúci názov pre všetky nižšie.</li>" +
      "<li><b>MASLD</b> — <i>Metabolic dysfunction-Associated SLD</i>, tuková choroba pečene spojená s metabolickou dysfunkciou: steatóza + aspoň jeden kardiometabolický rizikový faktor (nadváha alebo veľký obvod pása, prediabetes či diabetes 2. typu, vysoký tlak, ↑ triacylglyceroly, ↓ HDL).</li>" +
      "<li><b>MASH</b> — <i>Metabolic dysfunction-Associated SteatoHepatitis</i>, steatohepatitída: MASLD so zápalom a poškodením hepatocytov.</li>" +
      "<li><b>MetALD</b> — <i>Metabolic dysfunction and Alcohol-related Liver Disease</i>: MASLD s vyšším príjmom alkoholu.</li>" +
      "<li><b>NAFLD / NASH</b> — staré názvy: <i>Non-Alcoholic Fatty Liver Disease</i> (nealkoholová tuková choroba pečene) a <i>Non-Alcoholic SteatoHepatitis</i> (nealkoholová steatohepatitída).</li>" +
      "<li><b>ASH</b> — <i>Alcoholic SteatoHepatitis</i>, alkoholová steatohepatitída.</li>" +
    "</ul>" +
    '<p class="chain">steatóza → <b>lipotoxicita</b> → zápal a poškodenie hepatocytov → aktivácia stelátových buniek → fibróza → cirhóza → hepatocelulárny karcinóm</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Staršie delenie stavalo na tom, čo pečeň <i>nemá</i> (žiadny alkohol); dnes sa diagnóza opiera o to, čo v tele <b>je</b> (metabolické kritériá).</p>'
},
{
  id: "cirhoza", et: "gr. <i>kirrhos</i> „žltohnedý“ + <i>-osis</i> „stav, proces“ (podľa farby pečene)",
  img: {
    src: "assets/images/cirrhosis-liver-gross.jpg",
    alt: "Cirhóza pečene: uzly regenerujúceho parenchýmu oddelené väzivovými pruhmi (MA).",
    caption: "Cirhóza pečene: uzly regenerujúceho parenchýmu oddelené väzivovými pruhmi (MA).",
    credit: "Narraburra · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Cirrhosis_liver.jpg"
  },
  title: "Cirhóza pečene",
  match: ["cirhóz\\w*", "cirhotick\\w*"],
  short: "Nevratná prestavba celej pečene: väzivové pruhy ju rozdelia na uzly regenerujúcich hepatocytov.",
  body:
    '<p class="chain">dlhodobé poškodenie hepatocytov (alkohol, MASH, vírusová hepatitída) → zápal aktivuje <b>stelátové bunky</b> → kolagén (fibróza) → väzivové pruhy prepoja portálne polia a centrálne vény → zvyšné hepatocyty regenerujú v <b>uzloch</b> bez normálnej stavby lalôčika</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Uzly nemajú normálne cievne zásobenie ani odtok žlče → klesá funkcia pečene a väzivo zvyšuje odpor v portálnom obehu (portálna hypertenzia, ascites, varixy). Cirhóza je hlavný terén pre <b>hepatocelulárny karcinóm</b>.</p>'
},
{
  id: "reye",
  title: "Reyeho syndróm",
  match: ["Reyeho\\s+syndróm\\w*", "Reyeho", "Reyov\\w*"],
  short: "Akútne poškodenie mitochondrií u dieťaťa po vírusovej infekcii liečenej aspirínom: zlyhanie pečene s malokvapkovou steatózou a opuch mozgu.",
  body:
    '<p class="chain">vírusová infekcia (chrípka, ovčie kiahne) + <b>kyselina acetylsalicylová</b> → poškodené mitochondrie → ↓ β-oxidácia mastných kyselín → <b>mikrovezikulárna steatóza</b> pečene, ↑ amoniak → <b>opuch mozgu</b> (encefalopatia)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Preto sa deťom pri horúčke nepodáva aspirín. Malokvapková steatóza je vždy znak poruchy mitochondrií, nie len nadbytku tuku.</p>'
},
{
  id: "lipomatoza", et: "gr. <i>lipos</i> „tuk“ + <i>-oma</i> „nádor, hmota“ + <i>-osis</i> „stav, proces“",
  title: "Lipomatóza",
  match: ["lipomatóz\\w*", "lipomatózn\\w*"],
  short: "Tuk v intersticiu namiesto zaniknutého parenchýmu — nie v bunkách, ale medzi nimi.",
  body:
    '<p class="chain">parenchým zanikne (atrofia) → <b>tukové tkanivo vyplní miesto</b> → orgán vyzerá makroskopicky „normálne veľký“, ale funkčne je atrofický</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Rozdiel voči steatóze: pri steatóze je tuk <b>vnútri</b> buniek, pri lipomatóze <b>medzi</b> nimi.</p>',
  img: {
    src: "assets/images/pancreatic-lipomatosis.jpg",
    alt: "Lipomatóza pankreasu.",
    caption: "Tuk medzi lalôčikmi aj v nich namiesto parenchýmu.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_moderate_to_severe_pancreatic_lipomatosis.jpg"
  }
},
{
  id: "lipotoxicita", et: "gr. <i>lipos</i> „tuk“ + <i>toxikon</i> „jed“",
  img: {
    src: "assets/images/ballooning-hepatocytes.jpg",
    alt: "Balónovité hepatocyty — dôsledok lipotoxického poškodenia.",
    caption: "Balónovité hepatocyty — dôsledok lipotoxického poškodenia.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Ballooning_degeneration_high_mag_cropped.jpg"
  },
  title: "Lipotoxicita",
  match: ["lipotoxicit\\w*"],
  short: "Toxický účinok nadbytku voľných mastných kyselín na bunku.",
  body:
    '<p class="chain">tuková kvapka najprv viaže voľné MK („ochrana“) → dlhodobé preťaženie → <b>ROS a stres endoplazmatického retikula</b> → poškodené mitochondrie → horšia β-oxidácia → ešte viac tuku ⟳</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vzniká <b>circulus vitiosus</b>, ktorý mení nevinnú steatózu na zápal a fibrózu.</p>'
},
{
  id: "tag", et: "triacylglycerol: gr. <i>glykeros</i> „sladký“ (glycerol) + tri mastné kyseliny",
  title: "Triacylglyceroly (TAG)",
  match: ["triacylglycerol\\w*", "TAG"],
  img: {
    "src": "assets/images/steatosis-liver.jpg",
    "alt": "Steatóza pečene: tukové kvapky v hepatocytoch.",
    "caption": "Steatóza pečene: tukové kvapky v hepatocytoch.",
    "credit": "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Fatty_change_liver_-_Lipid_steatosis_40X.jpg"
  },
  short: "Zásobná forma tuku: glycerol viazaný na tri mastné kyseliny.",
  body: "<ul><li>V pečeni vznikajú z mastných kyselín a glycerolu.</li><li>Osud: spálenie v β-oxidácii alebo export ako VLDL.</li><li>Tuk sa hromadí, keď prísun prevyšuje spaľovanie a export.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Porucha ktoréhokoľvek kroku (prísun, tvorba, spaľovanie, export) dá steatózu.</p>"
},
{
  id: "vldl", et: "angl. <i>very-low-density lipoprotein</i>",
  title: "VLDL (lipoproteín s veľmi nízkou hustotou)",
  match: ["VLDL", "apolipoprote\\w*", "apoproteín\\w*"],
  short: "Častica, v ktorej pečeň vyváža TAG do krvi.",
  body: "<ul><li>Vzniká v hepatocyte a do krvi sa dostáva cez sínusoidy.</li><li>Po odovzdaní TAG sa mení na IDL a LDL.</li></ul><ul><li>Zložená z TAG, cholesterolu, fosfolipidov a apolipoproteínu B100.</li><li>Bez apoB100 sa TAG nedajú vyviezť a hromadia sa v hepatocyte.</li></ul>"
},
{
  id: "beta-oxidacia",
  title: "β-oxidácia mastných kyselín",
  match: ["β-oxidáci\\w*", "beta-oxidáci\\w*"],
  short: "Postupné odštiepovanie dvojuhlíkových zvyškov z mastnej kyseliny v mitochondrii; vzniká acetyl-CoA a ATP.",
  body: "<ul><li>Prebieha v matrix mitochondrie; dlhé reťazce sa tam dostanú cez karnitín.</li><li>Vzniká NADH a FADH₂ → dýchací reťazec, preto dej závisí od kyslíka.</li></ul><ul><li>Potrebuje kyslík (cez dýchací reťazec) — pri hypoxii sa zastaví.</li><li>Ak zlyhá, tuk sa v bunke hromadí (steatóza).</li></ul>"
},
{
  id: "mastne-kyseliny",
  title: "Mastné kyseliny",
  match: ["MK", "mastn\\w*\\s+kyselin\\w*"],
  short: "Stavebné jednotky tukov: zdroj energie spaľovaný v mitochondriách, alebo zásoba uložená ako TAG.",
  body: "<ul><li>Do pečene prichádzajú z krvi (z tukového tkaniva), z potravy a vznikajú v pečeni z cukrov.</li><li>Voľné vo vysokej koncentrácii poškodzujú bunku (lipotoxicita).</li></ul>"
},
{
  id: "kalne-zdurenie",
  title: "Kalné zdurenie",
  match: ["kaln\\w*\\s+zdurenie\\w*"],
  short: "Prvé štádium vratného poškodenia: bunka nasaje vodu a má hrubú zrnitú cytoplazmu.",
  body: "<ul><li>Napučia mitochondrie a ER → zrnitá cytoplazma.</li><li>Orgán je zväčšený, bledý a „kalný“, no zmena je vratná.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Je to prvé viditeľné znamenie zlyhania iónových púmp (↓ ATP → Na⁺ a H₂O dnu).</p>"
},
{
  id: "hydropicka-degeneracia", et: "gr. <i>hydrops</i> „vodnatieľka“ (<i>hydor</i> „voda“ + <i>ops</i> „vzhľad“); lat. <i>degenerare</i> „vyrodiť sa“",
  title: "Hydropická degenerácia",
  match: ["hydropick\\w*(?:\\s+degenerác\\w*)?", "vakuolárn\\w*\\s+degenerác\\w*"],
  img: {
    "src": "assets/images/ballooning-hepatocytes.jpg",
    "alt": "Balónovitá degenerácia hepatocytov.",
    "caption": "Zväčšené hepatocyty s vodnatou cytoplazmou.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Ballooning_degeneration_high_mag_cropped.jpg"
  },
  short: "Pokročilejšie štádium opuchu bunky: v cytoplazme vzniknú číre vodnaté vakuoly.",
  body: "<p class=\"chain\">hypoxia alebo toxín → ↓ ATP → zlyhá Na⁺/K⁺-ATPáza → Na⁺ a H₂O vstúpia do bunky → vodnaté vakuoly</p><p class=\"why\"><b>Prečo to je dôležité.</b> Ešte vratná zmena; hranica nezvratnosti nastane pri zlyhaní mitochondrií a membrán.</p>"
},
{
  id: "hyalin", et: "gr. <i>hyalos</i> „sklo“ (sklovitý vzhľad)",
  title: "Hyalín",
  match: ["hyalín\\w*", "hyalinizác\\w*", "hyalinizovan\\w*"],
  short: "Nie látka, ale vzhľad: homogénna, sklovitá, ružová hmota — rôzne procesy dajú rovnaký obraz.",
  body:
    "<ul>" +
      "<li><b>Intersticiálny</b> — degenerovaný kolagén (staršia jazva), steny arteriol pri hypertenzii a diabete, glomeruly.</li>" +
      "<li><b>Epitelový</b> — hyalínne valce v obličkových tubuloch, corpora amylacea.</li>" +
      "<li><b>Intracelulárny</b> — kvapôčky bielkovín v tubuloch pri proteinúrii, Malloryho hyalín, Russellove telieska, Crookove bunky.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Samotné slovo „hyalín“ nestačí — treba povedať, <b>z čoho</b> je (kolagén? plazmatické bielkoviny? imunoglobulíny?), lebo od toho závisí príčina.</p>',
  img: {
    src: "assets/images/hyalinized-collagen.jpg",
    alt: "Hyalinizovaný kolagén v H&E.",
    caption: "Homogénna sklovitá ružová hmota s minimom jadier.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Pulmonary_hyalinizing_granuloma_Case_177_(5601451988).jpg"
  }
},
{
  id: "malloryho-hyalin",
  title: "Malloryho (Malloryho–Denkove) telieska",
  match: ["Mallory\\w*\\s+hyalín\\w*", "Mallory\\w*\\s+teliesk\\w*", "Mallory\\w*", "Mallory-Denk\\w*"],
  short: "Eozinofilné inklúzie v hepatocytoch — zhluky prekrútených cytokeratínových filamentov.",
  body:
    '<p class="chain">poškodenie hepatocytu (alkohol, metabolická záťaž) → <b>cytokeratínové filamenty sa zhlukujú</b> s ubikvitínom → ružová inklúzia v cytoplazme</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Typicky pri <b>steatohepatitíde</b> (alkoholovej aj metabolickej) a pri niektorých cholestázach.</p>',
  img: {
    src: "assets/images/mallory-body.jpg",
    alt: "Malloryho telieska v hepatocytoch.",
    caption: "Eozinofilné inklúzie z cytokeratínových filamentov.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Mallory_body_high_mag_cropped.jpg"
  }
},
{
  id: "russellove-telieska",
  title: "Russellove telieska",
  match: ["Russell\\w*\\s+teliesk\\w*", "Russellov\\w*", "Russell"],
  short: "Eozinofilné guľôčky nahromadených imunoglobulínov v plazmatických bunkách.",
  body:
    '<p class="chain">plazmocyt vyrába viac imunoglobulínu, než stihne vylúčiť → <b>Ig sa nahromadí v ER</b> → hyalínna guľôčka</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vidno ich pri chronickom zápale a plazmocytových nádoroch.</p>',
  img: {
    src: "assets/images/russell-bodies.jpg",
    alt: "Russellove telieska v plazmatických bunkách.",
    caption: "Eozinofilné guľôčky nahromadeného imunoglobulínu.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Russell_bodies_2_high_mag.jpg"
  }
},
{
  id: "crookove-bunky",
  title: "Crookove bunky",
  match: ["Crookov\\w*\\s+bunk\\w*", "Crookov\\w*"],
  short: "Kortikotropné bunky hypofýzy so sklovitou zmenou po nadbytku glukokortikoidov.",
  body:
    '<p class="chain">↑ kortizol (alebo lieky) → spätná väzba utlmí tvorbu ACTH granúl → <b>v cytoplazme sa nahromadia cytokeratínové filamenty</b> → sklovitý prstenec</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to vizitka <b>Cushingovho syndrómu</b> vo vzorke hypofýzy.</p>'
},
{
  id: "mucin", et: "lat. <i>mucus</i> „hlien“",
  title: "Hlien (mucín)",
  match: ["mucín\\w*", "mucinózn\\w*", "zhlienovaten\\w*", "hlienov\\w*\\s+dystrofi\\w*"],
  short: "Glykoproteín hlienu; pri poruche tvorby, zloženia alebo odvodu sa hromadí v bunke alebo v tkanive.",
  body:
    '<div class="fork">' +
      "<div><b>Množstvo</b><br>hypersekrécia alebo hyposekrécia</div>" +
      "<div><b>Zloženie</b><br>hustý lepkavý hlien<br>(cystická fibróza)</div>" +
      "<div><b>Miesto</b><br>vývod zablokovaný<br>→ retenčná cysta</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Ten istý hlien, ktorý chráni sliznicu, pri poruche upchá vývody a živí infekciu.</p>',
  img: {
    src: "assets/images/mucinous-carcinoma.jpg",
    alt: "Mucinózny karcinóm prsníka.",
    caption: "Nádorové bunky v jazerách hlienu.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_mucinous_invasive_ductal_carcinoma_of_the_breast.jpg"
  }
},
{
  id: "signet-ring", et: "angl. <i>signet ring</i> „pečatný prsteň“ (lat. <i>signum</i> „znak, pečať“) – jadro stlačené k okraju bunky",
  title: "Prsteňovité bunky (signet-ring)",
  match: ["signet[- ]ring", "pečatn\\w*\\s+prste\\w*"],
  short: "Bunka s hlienovou vakuolou, ktorá odtlačila jadro na okraj — tvar pečatného prsteňa.",
  body:
    '<p class="chain">hlien sa nevylúči (strata adhézie bunky, napr. E-kadherín) → <b>vakuola vytlačí jadro na okraj</b> → prsteňovitá bunka</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Typicky <b>difúzny karcinóm žalúdka</b>, lobulárny karcinóm prsníka, niektoré kolorektálne karcinómy.</p>',
  img: {
    src: "assets/images/signet-ring-stomach-arrows.jpg",
    alt: "Prsteňovité bunky pri karcinóme žalúdka.",
    caption: "Hlienová vakuola odtláča jadro na okraj do tvaru polmesiaca (šípky).",
    credit: "Nephron · CC BY-SA 3.0, upravené (šípky)",
    href: "https://commons.wikimedia.org/wiki/File:Signet_ring_cell_carcinoma_-_very_high_mag.jpg"
  }
},
{
  id: "gag", et: "gr. <i>glykys</i> „sladký“ → glykán (reťazec cukrov) + amín",
  title: "Glykozaminoglykány (GAG; angl. glycosaminoglycans)",
  match: ["GAG", "glykozaminoglykán\\w*", "hyaluronan\\w*", "myxedém\\w*", "mukopolysacharidóz\\w*"],
  short: "Dlhé polysacharidové reťazce medzibunkovej hmoty (hyaluronan, chondroitín sulfát…) — viažu obrovské množstvo vody.",
  body:
    '<p class="chain">poruchy odbúravania (mukopolysacharidózy) alebo hormonálne zmeny (hypotyreóza) → <b>GAG sa hromadia v intersticiu</b> → viažu vodu → <b>myxedém</b>, „slizovité“ tkanivo</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vyzerá ako hlien, ale je to <b>iná látka</b>: farbí sa alciánovou modrou, nie PAS.</p>'
},
{
  id: "cysticka-fibroza", et: "gr. <i>kystis</i> „mechúr, vačok“ + lat. <i>fibra</i> „vlákno“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/bronchial-mucous-plug.jpg",
    alt: "Hlienová zátka v prieduške – dôsledok hustého, zle hydratovaného hlienu (MA).",
    caption: "Hlienová zátka v prieduške – dôsledok hustého, zle hydratovaného hlienu (MA).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Bronchial_mucous_plug_(4861516258).jpg"
  },
  title: "Cystická fibróza",
  match: ["cystick\\w*\\s+fibróz\\w*", "CFTR"],
  short: "Vrodená porucha chloridového kanála CFTR: hlien je hustý a lepkavý a upchá vývody.",
  body:
    '<p class="chain">mutácia <b>CFTR</b> → ↓ sekrécia Cl⁻ (a HCO₃⁻) → ↓ hydratácia sekrétov → <b>hustý hlien</b> → upchatie vývodov (pľúca, pankreas, črevo) → infekcie a poškodenie orgánu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Príklad <b>dyskrínie</b> (zmeneného zloženia sekrétu). V pote je zvýšená koncentrácia chloridov — základ potného testu.</p>'
},
{
  id: "amyloid", et: "gr. <i>amylon</i> „škrob“ + <i>-eides</i> „podobný“ (pôvodne omylom pokladaný za škrob)",
  title: "Amyloid",
  match: ["amyloid\\w*"],
  short: "Nerozpustné extracelulárne vlákna z nesprávne poskladaných bielkovín — pre proteázy nestráviteľné.",
  body:
    '<p class="chain">prekurzor (iný pre každý typ) → <b>chybné skladanie do β-listu</b> → fibrily + P-komponent + GAG → depozit → utláča bunky a cievy → <b>zlyhanie orgánu</b></p>' +
    "<ul>" +
      "<li><b>Dôkaz</b> — Congo red: v polarizovanom svetle jablkovo-zelená dvojlomnosť.</li>" +
      "<li><b>Trvalý</b> — depozit sa spontánne nerozpúšťa; liečba znižuje tvorbu prekurzora.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Nie je to jedna látka, ale skupina rôznych bielkovín s <b>rovnakou štruktúrou</b> — typ prekurzora určuje príčinu aj liečbu.</p>',
  img: {
    src: "assets/images/amyloid-kidney-he.jpg",
    alt: "Amyloidóza obličky v H&E.",
    caption: "Amorfná ružová hmota v glomeruloch a stenách ciev.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Renal_amyloidosis_-_high_mag.jpg"
  }
},
{
  id: "congo-red", et: "farbivo pomenované podľa Konga (obchodný názov)",
  title: "Congo red (kongo červeň)",
  match: ["Congo\\s+red", "kongo\\w*\\s+červe\\w*"],
  short: "Farbivo, ktoré sa viaže na β-skladaný list amyloidu — v polarizovanom svetle dáva jablkovo-zelenú dvojlomnosť.",
  body:
    '<p class="chain">Congo red naviazaný na amyloid → <b>červené farbenie</b> → polarizované svetlo → jablkovo-zelené svetlo</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Hyalín ani fibrinoid sa takto nevyfarbia — preto je to <b>rozlišovacia skúška</b> amyloidu.</p>',
  img: {
    src: "assets/images/amyloid-congo-red-polarized.jpg",
    alt: "Amyloid vyfarbený Congo red v polarizovanom svetle.",
    caption: "Jablkovo-zelená dvojlomnosť.",
    credit: "Tulemo · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Amyloid_Liver_Congo_Red_Bar=100um.jpg"
  }
},
{
  id: "beta-skladany-list",
  img: {
    src: "assets/images/amyloid-congo-red-polarized.jpg",
    alt: "Congo red v polarizovanom svetle: jablkovozelený dvojlom amyloidu.",
    caption: "Congo red v polarizovanom svetle: jablkovozelený dvojlom amyloidu.",
    credit: "Tulemo · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Amyloid_Liver_Congo_Red_Bar=100um.jpg"
  },
  title: "β-skladaný list",
  match: ["β-skladan\\w*\\s+list\\w*", "β-list\\w*"],
  short: "Usporiadanie bielkoviny, v ktorom susedné vlákna ležia vedľa seba a držia sa vodíkovými väzbami — základ amyloidových fibríl.",
  body:
    '<p class="chain">zle poskladaný prekurzor → jeho úseky sa zoradia do <b>β-listov</b> → dlhé fibrily → stabilné a proteázam odolné</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Práve táto štruktúra robí amyloid <b>nestráviteľným</b> a viaže naň Congo red.</p>'
},
{
  id: "amyloid-typy",
  title: "Typy amyloidu",
  match: ["typ\\w*\\s+amyloid\\w*"],
  img: {
    "src": "assets/images/amyloid-congo-red.jpg",
    "alt": "Amyloid vo farbení Congo red: depozit sa farbí do červena.",
    "caption": "Amyloid vo farbení Congo red: depozit sa farbí do červena.",
    "credit": "Michael Feldman, MD, PhD (University of Pennsylvania) · CC BY 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Small_bowel_duodenum_with_amyloid_deposition_congo_red_10X.jpg"
  },
  short: "Názov typu = skratka bielkoviny, z ktorej fibrily vznikli.",
  body: "<ul><li>Typ amyloidu sa určuje imunohistochemicky alebo hmotnostnou spektrometriou.</li><li>Od typu závisí liečba: AL — chemoterapia klonu plazmocytov; AA — liečba zápalu; ATTR — stabilizácia transtyretínu.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Zdroj bielkoviny ukazuje na chorobu, ktorú treba liečiť: nádor plazmocytov (AL), chronický zápal (AA).</p>"
},
{
  id: "amyloid-al", et: "angl. <i>amyloid light chain</i>",
  title: "AL amyloid (z ľahkých reťazcov)",
  match: ["AL\\s+amyloid\\w*", "AL(?!\\.)", "ľahk\\w*\\s+reťaz\\w*"],
  short: "Amyloid z ľahkých reťazcov imunoglobulínov, ktoré tvorí klon plazmocytov.",
  body: "<ul><li>Je najčastejší typ systémovej amyloidózy.</li><li>Postihuje srdce (reštrikčná kardiomyopatia), obličky (nefrotický syndróm), jazyk (makroglosia) a nervy.</li><li>Dôkaz: kongo červeň a jablkovozelený dvojlom v polarizovanom svetle.</li></ul><ul><li>Vzniká pri plazmocytovej dyskrázii alebo myelóme.</li><li>Ukladá sa najmä v srdci, obličkách, nervoch a mäkkých tkanivách.</li></ul>"
},
{
  id: "amyloid-aa", et: "angl. <i>amyloid A</i>",
  title: "AA amyloid (zo sérového amyloidu A)",
  match: ["AA\\s+amyloid\\w*", "AA", "SAA"],
  short: "Amyloid zo sérového amyloidu A, bielkoviny akútnej fázy tvorenej v pečeni pri zápale.",
  body: "<ul><li>Hladina SAA stúpa v zápale po IL-6.</li><li>Najčastejšie sa prejaví nefrotickým syndrómom (obličky).</li><li>Ukladá sa aj v pečeni a slezine.</li></ul><ul><li>Vzniká po dlhom chronickom zápale (reumatoidná artritída, tuberkulóza, chronické črevné zápaly).</li><li>Ukladá sa najmä v obličkách, pečeni a slezine.</li></ul>"
},
{
  id: "amyloid-attr", et: "angl. <i>transthyretin</i>",
  img: {
    src: "assets/images/cardiac-amyloid-congo.jpg",
    alt: "Senilná srdcová amyloidóza (Congo red): extracelulárny červený amyloid medzi svalovými vláknami.",
    caption: "Senilná srdcová amyloidóza (Congo red): extracelulárny červený amyloid medzi svalovými vláknami.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Cardiac_amyloidosis_intermed_mag.jpg"
  },
  title: "ATTR amyloid (z transtyretínu)",
  match: ["ATTR", "TTR", "transtyretín\\w*", "senilná\\s+amyloidóz\\w*"],
  short: "Amyloid z transtyretínu, ktorý v krvi prenáša hormóny štítnej žľazy a vitamín A.",
  body: "<ul><li>Transtyretín je tetramér; jeho rozpad na monoméry dáva fibrily.</li><li>Senilná (nemutovaná) forma je častá príčina zlyhania srdca u starších mužov.</li><li>Dedičná forma vzniká mutáciou génu TTR.</li></ul><ul><li><b>Senilná forma:</b> nemutovaný transtyretín, najmä v srdci starších ľudí.</li><li><b>Dedičná forma:</b> mutovaný transtyretín, často s neuropatiou.</li></ul>"
},
{
  id: "amyloid-ab2m",
  title: "Aβ2M amyloid (z β₂-mikroglobulínu)",
  match: ["Aβ2M", "β2-mikroglobulín\\w*"],
  short: "Amyloid z β₂-mikroglobulínu, ktorý sa pri zlyhaní obličiek hromadí v krvi.",
  body: "<ul><li>β₂-mikroglobulín je súčasť molekúl HLA I.</li><li>Dialýza ho z krvi odstráni len málo, preto sa pri dlhej dialýze hromadí.</li></ul><ul><li>Vzniká pri dlhodobej dialýze.</li><li>Ukladá sa najmä v kĺboch a väzivách (napr. syndróm karpálneho tunela).</li></ul>"
},
{
  id: "amylin", et: "angl. <i>islet amyloid polypeptide</i>",
  title: "Amylín (IAPP)",
  match: ["IAPP", "amylín\\w*"],
  short: "Peptid vylučovaný spolu s inzulínom; pri diabete 2. typu tvorí amyloid v Langerhansových ostrovčekoch.",
  body: "<ul><li>Vylučujú ho β-bunky spolu s inzulínom.</li><li>Fyziologicky spomaľuje vyprázdňovanie žalúdka a tlmí glukagón.</li><li>Pri diabete 2. typu sa zhluky amylínu ukladajú do ostrovčekov a zhoršujú ich funkciu.</li></ul><ul><li>Amyloid ostrovčekov sa zhoduje s poklesom funkcie β-buniek.</li></ul>"
},
{
  id: "glykogenozy", et: "gr. <i>glykys</i> „sladký“ + <i>-genes</i> „tvoriaci“ (glykogén) + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/gsd-liver-pas.jpg",
    alt: "Glykogenóza pečene: hepatocyty plné glykogénu reagujú v PAS purpurovo.",
    caption: "Glykogenóza pečene: hepatocyty plné glykogénu reagujú v PAS purpurovo.",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Liver_biopsy_of_glycogen_storage_disorder_PAS_positive.jpg"
  },
  title: "Glykogenózy",
  match: ["glykogenóz\\w*"],
  short: "Vrodené poruchy enzýmov odbúravania glykogénu — glykogén sa hromadí v pečeni, svale a srdci.",
  body:
    "<ul>" +
      "<li><b>I — von Gierke</b> — glukózo-6-fosfatáza; pečeň, hypoglykémia.</li>" +
      "<li><b>II — Pompe</b> — lyzozómová α-glukozidáza; srdce a sval.</li>" +
      "<li><b>III — Cori</b> — odvetvovací enzým.</li>" +
      "<li><b>V — McArdle</b> — myofosforyláza; kŕče pri námahe.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Typ určuje, <b>ktorý orgán</b> trpí — podľa toho, kde je chýbajúci enzým potrebný.</p>'
},
{
  id: "pas",
  title: "PAS (kyselina jodistá – Schiffovo činidlo; angl. periodic acid–Schiff)",
  match: ["PAS", "diastáz\\w*"],
  short: "Farbenie cukrov: glykogén, neutrálny hlien, bazálne membrány a steny húb sú purpurové.",
  body:
    '<p class="chain">kyselina jodistá oxiduje susedné OH skupiny cukru na aldehydy → Schiffovo činidlo sa na aldehydy naviaže → <b>purpurová farba</b></p>' +
    "<ul>" +
      "<li><b>Čo farbí</b> — glykogén, neutrálne mucíny, bazálne membrány, steny húb.</li>" +
      "<li><b>PAS po diastáze</b> — enzým glykogén rozloží; ak farba zmizne, bol to glykogén (<i>diastáza-labilný</i>), ak ostane, je to hlien alebo iný glykoproteín.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Svetlá „prázdna“ cytoplazma v H&E môže byť glykogén, hlien, tuk aj voda – PAS s diastázou povie, či je to glykogén.</p>',
  img: {
    src: "assets/images/stain-pas.jpg",
    alt: "Pečeň vo farbení PAS: hepatocyty plné purpurovo sfarbeného glykogénu.",
    caption: "PAS: glykogén v hepatocytoch je purpurový (glykogenóza).",
    credit: "Department of Pathology, Calicut Medical College · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Glycogen_storage_disorder_(PAS_stain).jpg"
  }
},
{
  id: "kimmelstiel-wilson", et: "lat. <i>glomerulus</i> „klbko“ + gr. <i>sklerosis</i> „zatvrdnutie“",
  title: "Kimmelstiel–Wilsonova glomeruloskleróza",
  match: ["Kimmelstiel\\w*", "K–W", "K-W", "nodulárn\\w*\\s+glomeruloskleróz\\w*"],
  short: "Nodulárna glomeruloskleróza pri diabete — okrúhle hyalínne uzly v glomeruloch.",
  body:
    '<p class="chain">chronická hyperglykémia → AGE, ↑ mezangiálna matrix, zhrubnutie bazálnej membrány → <b>hyalínne uzly</b> → ↓ filtrácia → diabetická nefropatia</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to charakteristická zmena diabetickej nefropatie a hlavná príčina zlyhania obličiek pri diabete.</p>',
  img: {
    src: "assets/images/kw-nodular-glomerulosclerosis.jpg",
    alt: "Nodulárna diabetická glomeruloskleróza.",
    caption: "Hyalínne uzly v glomeruloch.",
    credit: "Doc.mari · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Diabetic_nephropathy.jpg"
  }
},
{
  id: "age",
  img: {
    src: "assets/images/kw-nodular-glomerulosclerosis.jpg",
    alt: "Uzlovitá glomeruloskleróza (Kimmelstielova–Wilsonova) pri diabete.",
    caption: "Uzlovitá glomeruloskleróza (Kimmelstielova–Wilsonova) pri diabete.",
    credit: "Doc.mari · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Diabetic_nephropathy.jpg"
  },
  title: "AGE — pokročilé produkty glykácie (angl. advanced glycation end products)",
  match: ["AGE"],
  short: "Bielkoviny trvalo zmenené naviazanou glukózou — zosieťujú kolagén a bazálne membrány.",
  body:
    '<p class="chain">↑ glukóza → neenzymatická glykácia → <b>AGE</b> → zosieťovanie kolagénu (tuhé cievy, zhrubnuté bazálne membrány) + väzba na receptor RAGE → ↑ ROS a zápal</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tak sa hyperglykémia mení na <b>mikro- a makroangiopatiu</b>, nefropatiu a neuropatiu.</p>'
},
{
  id: "corpora-amylacea", et: "lat. <i>corpus</i> „telo“ (mn. č. <i>corpora</i> „telieska“) + <i>amylaceus</i> „škrobový“ (gr. <i>amylon</i> „škrob“)",
  title: "Corpora amylacea",
  match: ["corpora\\s+amylacea"],
  short: "Guľovité vrstevnaté telieska v prostate, mozgu a pľúcach — nie skutočný amyloid, názov je podľa podobnosti so škrobom.",
  body:
    '<p class="chain">sekrét alebo zvyšky bunkového materiálu → <b>koncentrické vrstvenie</b> → hyalínne guľôčky</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Nezamieňať s amyloidom: napriek názvu to spravidla nie je amyloid a sú klinicky nevýznamné.</p>',
  img: {
    src: "assets/images/corpora-amylacea-prostate.jpg",
    alt: "Corpora amylacea v prostatických žľazách.",
    caption: "Koncentricky vrstevnaté eozinofilné telieska.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Corpora_amylacea_intermed_mag.jpg"
  }
},
{
  id: "dystroficka-kalcifikacia", et: "gr. <i>dys-</i> „zle“ + <i>trophe</i> „výživa“; lat. <i>calx, calcis</i> „vápno“ + <i>facere</i> „robiť“",
  img: {
    src: "assets/images/ranke-complex.jpg",
    alt: "Rankeho komplex: zahojené a kalcifikované ložiská.",
    caption: "Rankeho komplex: zahojené a kalcifikované ložiská.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Tuberculosis_-_Ranke_complex_(13449099823).jpg"
  },
  title: "Dystrofická kalcifikácia",
  match: ["kalcifik\\w*", "dystrofick\\w*\\s+kalcifik\\w*"],
  short: "Ukladanie vápenatých solí do už poškodeného alebo mŕtveho tkaniva pri normálnej hladine Ca²⁺ v sére.",
  body:
    '<p class="chain">rozpad membrán → fosfolipidy viažu Ca²⁺ + fosfatázy dodajú fosfát → <b>kryštály fosforečnanu vápenatého</b> (hydroxyapatit) → tvrdé ložisko (napr. v kazeóznej nekróze, v starom trombe)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Rozdiel voči <b>metastatickej</b> kalcifikácii: tu je Ca²⁺ v sére v poriadku, poškodené je len tkanivo.</p>'
},
{
  id: "muskatova-pecen", et: "lat. <i>nux muscata</i> „orech s vôňou pižma“ (<i>muscus</i> „pižmo“)",
  title: "Muškátová pečeň",
  match: ["muškátov\\w*\\s+pečeň", "muškátov\\w*"],
  img: {
    "src": "assets/images/nutmeg-liver-gross.jpg",
    "alt": "Muškátová pečeň: tmavé stredy lalôčikov pri venóznom prekrvení.",
    "caption": "Muškátová pečeň: tmavé stredy lalôčikov pri venóznom prekrvení.",
    "credit": "Narraburra · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Liver._chronic_passive_congestion.jpg"
  },
  short: "Pečeň s tmavými centrami lalôčkov a žltou perifériou pri chronickej pravostrannej venostáze.",
  body: "<p class=\"chain\">pravostranné zlyhanie → venostáza → centrolobulárna hypoxia → tmavé centrá, žltá periféria</p><p class=\"why\"><b>Prečo to je dôležité.</b> Rez pripomína rez muškátovým orechom. Hypoxia zastaví spaľovanie mastných kyselín, preto sa tuk hromadí tam, kde je najmenej kyslíka.</p>"
},
{
  id: "tigrovane-srdce",
  title: "Tigrované srdce",
  match: ["tigrovan\\w*\\s+srdc\\w*"],
  short: "Srdce so žltými pruhmi tuku v myokarde pri chronickej hypoxii (napr. ťažká anémia).",
  body: "<ul><li>Pruhy sú v bradavkových svaloch a pod endokardom, kde je prekrvenie najhoršie.</li><li>Obraz pripomína kožušinu tigra.</li></ul><p class=\"chain\">chronická anémia → hypoxia myokardu → tuková degenerácia → žlté pruhy v najhoršie zásobených miestach</p>"
},
/* ── doplnené heslá k obrázkom (13. 10. 2026) ──────────────────────── */
{
  id: "niemann-pick",
  img: {
    src: "assets/images/niemann-pick-spleen.jpg",
    alt: "Niemannova–Pickova choroba: penové makrofágy v slezine (H&E).",
    caption: "Niemannova–Pickova choroba: penové makrofágy v slezine (H&E).",
    credit: "W.CC · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Niemann_pick_cell_in_spleen.jpg"
  },
  title: "Niemannova–Pickova choroba",
  match: ["Niemann\\w*[–-]Pick\\w*"],
  short: "Lyzozómová lipidóza: chýba kyslá sfingomyelináza, sfingomyelín sa hromadí v lyzozómoch makrofágov. Tie sa ukladajú v pečeni, slezine, pľúcach aj mozgu a zväčšujú orgány."
},
{
  id: "malokvapkova-steatoza",
  img: {
    src: "assets/images/microvesicular-steatosis.jpg",
    alt: "Malokvapková steatóza: penovité hepatocyty s jadrom v strede (H&E).",
    caption: "Malokvapková steatóza: penovité hepatocyty s jadrom v strede (H&E).",
    credit: "Ronen J., Shaheen S., Steinberg D., Justus K. R. a kol. · CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_microvesicular_steatosis.jpg"
  },
  title: "Malokvapková (mikrovezikulárna) steatóza",
  match: ["mikrovezikulárn\\w*\\s+steatóz\\w*", "malokvapkov\\w*"],
  short: "Pečeňové bunky plné drobných tukových kvapiek, pri ktorých jadro ostáva v strede. Ukazuje na poruchu mitochondriálnej β-oxidácie a býva závažná (napr. akútna tuková pečeň v tehotenstve)."
}

);

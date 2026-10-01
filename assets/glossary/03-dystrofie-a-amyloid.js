/* Glosár PATOLY — dystrofie: tuk, bielkoviny, hlien, amyloid, sacharidy. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "dystrofia",
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
  id: "steatoza",
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
  title: "MASLD (predtým NAFLD)",
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
  id: "cirhoza",
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
  match: ["Reyeho", "Reyov\\w*"],
  short: "Akútne poškodenie mitochondrií u dieťaťa po vírusovej infekcii liečenej aspirínom: zlyhanie pečene s malokvapkovou steatózou a opuch mozgu.",
  body:
    '<p class="chain">vírusová infekcia (chrípka, ovčie kiahne) + <b>kyselina acetylsalicylová</b> → poškodené mitochondrie → ↓ β-oxidácia mastných kyselín → <b>mikrovezikulárna steatóza</b> pečene, ↑ amoniak → <b>opuch mozgu</b> (encefalopatia)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Preto sa deťom pri horúčke nepodáva aspirín. Malokvapková steatóza je vždy znak poruchy mitochondrií, nie len nadbytku tuku.</p>'
},
{
  id: "lipomatoza",
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
  id: "lipotoxicita",
  title: "Lipotoxicita",
  match: ["lipotoxicit\\w*"],
  short: "Toxický účinok nadbytku voľných mastných kyselín na bunku.",
  body:
    '<p class="chain">tuková kvapka najprv viaže voľné MK („ochrana“) → dlhodobé preťaženie → <b>ROS a stres endoplazmatického retikula</b> → poškodené mitochondrie → horšia β-oxidácia → ešte viac tuku ⟳</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vzniká <b>circulus vitiosus</b>, ktorý mení nevinnú steatózu na zápal a fibrózu.</p>'
},
{
  id: "tag-vldl",
  title: "Triacylglyceroly (TAG) a VLDL",
  match: ["triacylglycerol\\w*", "TAG", "VLDL", "MK", "mastn\\w*\\s+kyselin\\w*", "β-oxidáci\\w*", "apolipoprote\\w*", "apoproteín\\w*"],
  short: "TAG sú zásobná forma tuku; pečeň ich vyváža do krvi v častici VLDL.",
  body:
    '<p class="chain">mastné kyseliny → <b>TAG</b> → buď (a) <b>spália sa</b> v mitochondriách (β-oxidácia, potrebuje O₂) alebo (b) <b>vyvezú sa ako VLDL</b> (TAG + apolipoproteín B100 + fosfolipidy)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tuk sa v pečeni nehromadí, kým prísun zodpovedá spaľovaniu a exportu. Porucha <b>ktoréhokoľvek</b> kroku (prísun, tvorba, spaľovanie, export) dá steatózu.</p>'
},
{
  id: "hydropicka-degeneracia",
  title: "Kalné zdurenie a hydropická degenerácia",
  match: ["hydropick\\w*", "kaln\\w*\\s+zdurenie\\w*", "kalné\\s+zdurenie", "vakuolárn\\w*\\s+degenerác\\w*"],
  short: "Prvé vratné štádiá poškodenia: bunka nasaje vodu — najprv zrnitá, potom s čírymi vakuolami.",
  body:
    '<p class="chain">hypoxia alebo toxín → <b>↓ ATP</b> → zlyhá Na⁺/K⁺-ATPáza → Na⁺ a H₂O vstúpia do bunky → napučia mitochondrie a ER → <b>hrubé zrnká</b> (kalné zdurenie) → vodnaté vakuoly (hydropická degenerácia)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Je to <b>prvé viditeľné znamenie</b> zlyhania iónových púmp. Orgán je zväčšený, bledý a „kalný“, ale zmena je ešte vratná.</p>',
  img: {
    src: "assets/images/ballooning-hepatocytes.jpg",
    alt: "Balónovitá degenerácia hepatocytov.",
    caption: "Zväčšené hepatocyty s vodnatou cytoplazmou.",
    credit: "Nephron · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Ballooning_degeneration_high_mag_cropped.jpg"
  }
},
{
  id: "hyalin",
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
  id: "mucin",
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
  id: "signet-ring",
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
  id: "gag",
  title: "Glykozaminoglykány (GAG)",
  match: ["GAG", "glykozaminoglykán\\w*", "hyaluronan\\w*", "myxedém\\w*", "mukopolysacharidóz\\w*"],
  short: "Dlhé polysacharidové reťazce medzibunkovej hmoty (hyaluronan, chondroitín sulfát…) — viažu obrovské množstvo vody.",
  body:
    '<p class="chain">poruchy odbúravania (mukopolysacharidózy) alebo hormonálne zmeny (hypotyreóza) → <b>GAG sa hromadia v intersticiu</b> → viažu vodu → <b>myxedém</b>, „slizovité“ tkanivo</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Vyzerá ako hlien, ale je to <b>iná látka</b>: farbí sa alciánovou modrou, nie PAS.</p>'
},
{
  id: "cysticka-fibroza",
  title: "Cystická fibróza",
  match: ["cystick\\w*\\s+fibróz\\w*", "CFTR"],
  short: "Vrodená porucha chloridového kanála CFTR: hlien je hustý a lepkavý a upchá vývody.",
  body:
    '<p class="chain">mutácia <b>CFTR</b> → ↓ sekrécia Cl⁻ (a HCO₃⁻) → ↓ hydratácia sekrétov → <b>hustý hlien</b> → upchatie vývodov (pľúca, pankreas, črevo) → infekcie a poškodenie orgánu</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Príklad <b>dyskrínie</b> (zmeneného zloženia sekrétu). V pote je zvýšená koncentrácia chloridov — základ potného testu.</p>'
},
{
  id: "amyloid",
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
  id: "congo-red",
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
  title: "β-skladaný list",
  match: ["β-skladan\\w*\\s+list\\w*", "β-list\\w*"],
  short: "Usporiadanie bielkoviny, v ktorom susedné vlákna ležia vedľa seba a držia sa vodíkovými väzbami — základ amyloidových fibríl.",
  body:
    '<p class="chain">zle poskladaný prekurzor → jeho úseky sa zoradia do <b>β-listov</b> → dlhé fibrily → stabilné a proteázam odolné</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Práve táto štruktúra robí amyloid <b>nestráviteľným</b> a viaže naň Congo red.</p>'
},
{
  id: "amyloid-typy",
  title: "Typy amyloidu: AL, AA, ATTR, Aβ2M",
  /* „AL“ bez bodky za ním — inak by sa zhodlo s „et al.“ v zdrojoch (vyhľadávanie ignoruje veľkosť písmen) */
  match: ["AL\\s+amyloid\\w*", "AA\\s+amyloid\\w*", "AL(?!\\.)", "AA", "ATTR", "TTR", "transtyretín\\w*", "Aβ2M", "β2-mikroglobulín\\w*", "SAA", "IAPP", "amylín\\w*", "ľahk\\w*\\s+reťaz\\w*", "senilná\\s+amyloidóz\\w*"],
  short: "Názov typu = skratka bielkoviny, z ktorej fibrily vznikli.",
  body:
    "<ul>" +
      "<li><b>AL</b> — z ľahkých reťazcov imunoglobulínov (plazmocytová dyskrázia, myelóm).</li>" +
      "<li><b>AA</b> — zo sérového amyloidu A (reaktant akútnej fázy); po chronickom zápale (reumatoidná artritída, tuberkulóza).</li>" +
      "<li><b>ATTR</b> — z transtyretínu; senilná (srdce) alebo dedičná forma.</li>" +
      "<li><b>Aβ2M</b> — z β₂-mikroglobulínu; pri dlhodobej dialýze.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Zdroj bielkoviny ukazuje na chorobu, ktorú treba liečiť: nádor plazmocytov (AL), chronický zápal (AA).</p>'
},
{
  id: "glykogenozy",
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
  title: "PAS a alciánová modrá",
  match: ["PAS", "alciánov\\w*\\s+modr\\w*", "diastáz\\w*"],
  short: "Histochemické farbenia sacharidov: PAS purpurovo, alciánová modrá kyslé glykozaminoglykány.",
  body:
    "<ul>" +
      "<li><b>PAS</b> — farbí glykogén, neutrálny hlien a bazálne membrány.</li>" +
      "<li><b>Diastáza</b> — po jej použití PAS zmizne, ak ide o glykogén (<i>diastáza-labilné</i>).</li>" +
      "<li><b>Alciánová modrá</b> — kyslé GAG a hlien.</li>" +
    "</ul>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Umožní rozlíšiť glykogén od hlienu a GAG na základe farbenia, nie odhadu.</p>'
},
{
  id: "kimmelstiel-wilson",
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
  title: "AGE — pokročilé produkty glykácie",
  match: ["AGE"],
  short: "Bielkoviny trvalo zmenené naviazanou glukózou — zosieťujú kolagén a bazálne membrány.",
  body:
    '<p class="chain">↑ glukóza → neenzymatická glykácia → <b>AGE</b> → zosieťovanie kolagénu (tuhé cievy, zhrubnuté bazálne membrány) + väzba na receptor RAGE → ↑ ROS a zápal</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Tak sa hyperglykémia mení na <b>mikro- a makroangiopatiu</b>, nefropatiu a neuropatiu.</p>'
},
{
  id: "corpora-amylacea",
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
  id: "dystroficka-kalcifikacia",
  title: "Dystrofická kalcifikácia",
  match: ["kalcifik\\w*", "dystrofick\\w*\\s+kalcifik\\w*"],
  short: "Ukladanie vápenatých solí do už poškodeného alebo mŕtveho tkaniva pri normálnej hladine Ca²⁺ v sére.",
  body:
    '<p class="chain">rozpad membrán → fosfolipidy viažu Ca²⁺ + fosfatázy dodajú fosfát → <b>kryštály fosforečnanu vápenatého</b> (hydroxyapatit) → tvrdé ložisko (napr. v kazeóznej nekróze, v starom trombe)</p>' +
    '<p class="why"><b>Prečo to je dôležité.</b> Rozdiel voči <b>metastatickej</b> kalcifikácii: tu je Ca²⁺ v sére v poriadku, poškodené je len tkanivo.</p>'
},
{
  id: "muskatova-pecen",
  title: "Muškátová pečeň a tigrované srdce",
  match: ["muškátov\\w*\\s+pečeň", "muškátov\\w*", "tigrovan\\w*\\s+srdc\\w*"],
  short: "Dva makroskopické obrazy hypoxického tuku a kongescie.",
  body:
    '<div class="fork">' +
      "<div><b>Muškátová pečeň</b><br>pravostranné zlyhanie → venostáza → centrolobulárna hypoxia<br>tmavé centrá, žltá periféria</div>" +
      "<div><b>Tigrované srdce</b><br>chronická anémia → hypoxia myokardu<br>žlté pruhy tuku v najhoršie zásobených miestach</div>" +
    "</div>" +
    '<p class="why"><b>Prečo to je dôležité.</b> Hypoxia zastaví spaľovanie mastných kyselín, a preto sa tuk hromadí <b>najskôr tam, kde je najmenej kyslíka</b>.</p>'
}
);

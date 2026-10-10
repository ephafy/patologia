/* Glosár PATOLY — celkové poruchy obehu (kap. 9): zlyhanie srdca, venostáza orgánov, edém, kolaps a šok.
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "zlyhanie-srdca",
  title: "Zlyhanie srdca",
  match: ["zlyhan\\w*\\s+srdca", "zlyhávan\\w*\\s+srdca", "srdcov\\w*\\s+zlyhan\\w*", "zlyhan\\w*\\s+(?:ľavej|pravej)\\s+komory", "zlyhávan\\w*\\s+(?:ľavej|pravej)\\s+komory"],
  short: "Srdce neprečerpá toľko krvi, koľko tkanivá potrebujú: dopredu jej je málo, dozadu sa hromadí pred komorou, ktorá nestíha.",
  body:
    '<p class="chain">zlyhá <b>ľavá</b> komora → krv stojí v pľúcach → edém pľúc, dýchavica<br>zlyhá <b>pravá</b> komora → krv stojí vo veľkom obehu → pečeň, slezina, opuchy, výpotky</p>'
},
{
  id: "ejekcna-frakcia",
  title: "Ejekčná frakcia",
  match: ["ejekčn\\w*\\s+frakci\\w*"],
  short: "Podiel krvi, ktorý ľavá komora pri sťahu vypudí. Zlyhanie srdca sa delí na formu so zníženou (≤ 40 %), mierne zníženou (41–49 %) a zachovanou (≥ 50 %) frakciou.",
  body: ""
},
{
  id: "frank-starling",
  title: "Frankov-Starlingov zákon",
  match: ["Frankov\\w*[-\\s]Starlingov\\w*\\s+(?:zákon\\w*|krivk\\w*)"],
  short: "Čím viac sa komora naplní a natiahne svoje vlákna, tým silnejšie sa stiahne — ale len po určitú hranicu.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Zlyhávajúca komora je za vrcholom krivky: ďalšie plnenie sťah nezosilní, len zvýši tlak v žilách → venostáza a edém.</p>'
},
{
  id: "cor-pulmonale",
  title: "Cor pulmonale",
  match: ["cor\\s+pulmonale"],
  short: "Zmena pravej komory, ktorej príčina je v pľúcach alebo ich cievach: akútne rozšírenie (masívna embólia), chronicky hypertrofia (choroby pľúc).",
  body: "",
  img: {
    src: "assets/images/cor-pulmonale-gross.jpg",
    alt: "Rez srdcom so zhrubnutou stenou pravej komory.",
    caption: "Hypertrofia pravej komory pri cor pulmonale.",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Heart_-_cor_pulmonale-_right_ventricular_hypertrophy_(4351163511).jpg"
  }
},
{
  id: "plucna-hypertenzia",
  title: "Pľúcna hypertenzia",
  match: ["pľúcn\\w*\\s+(?:artériov\\w*\\s+)?hypertenzi\\w*"],
  short: "Stredný tlak v pľúcnici nad 20 mmHg v pokoji. Preťažuje pravú komoru.",
  body:
    "<ul>" +
      "<li><b>Za pľúcami</b> — zlyháva ľavé srdce.</li>" +
      "<li><b>Hypoxia</b> — choroby pľúc, spánkové apnoe.</li>" +
      "<li><b>Menšie riečisko</b> — opakované embólie, fibróza.</li>" +
      "<li><b>Chorá stena tepničiek</b> — pľúcna artériová hypertenzia.</li>" +
    "</ul>"
},
{
  id: "hypertenzia",
  title: "Systémová hypertenzia",
  match: ["systémov\\w*\\s+hypertenzi\\w*", "esenciáln\\w*\\s+hypertenzi\\w*", "sekundárn\\w*\\s+hypertenzi\\w*"],
  short: "Opakovane nameraný tlak 140/90 mmHg a viac. Esenciálna nemá zistiteľnú príčinu; sekundárna má (obličky, hormóny, tehotenstvo).",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Najčastejšia príčina chronického tlakového preťaženia ľavej komory → koncentrická hypertrofia → zlyhanie.</p>'
},
{
  id: "ortopnoe",
  title: "Ortopnoe",
  match: ["ortopnoe"],
  short: "Dýchavica v ľahu, ktorá ustúpi v sede — v ľahu sa krv z nôh presunie do hrudníka a zlyhávajúca ľavá komora ju neprečerpá.",
  body: ""
},
{
  id: "nykturia",
  title: "Nyktúria",
  match: ["nyktúri\\w*"],
  short: "Nočné močenie — pri zlyhávaní srdca sa v ľahu tekutina z opuchov vracia do obehu a obličky ju vylúčia.",
  body: ""
},
{
  id: "cyanoza",
  title: "Cyanóza",
  match: ["cyanóz\\w*", "cyanotick\\w*"],
  short: "Modrasté sfarbenie kože a slizníc, keď je v krvi kapilár aspoň 50 g/l hemoglobínu bez kyslíka.",
  body:
    '<p class="why"><b>Pozor.</b> Meria množstvo odkysličeného hemoglobínu, nie hĺbku hypoxie: anemický pacient cyanotický nebude, hoci je hypoxický.</p>'
},
{
  id: "induracia",
  title: "Indurácia",
  match: ["indurác\\w*"],
  short: "Stvrdnutie orgánu drobnou fibrózou pri dlhej venostáze: cyanotická (slezina, obličky, pečeň) alebo hrdzavá (pľúca – farbu dáva hemosiderín).",
  body: ""
},
{
  id: "kardialna-fibroza",
  title: "Kardiálna fibróza pečene",
  match: ["kardiáln\\w*\\s+fibróz\\w*", "srdcov\\w*\\s+cirhóz\\w*"],
  short: "Konečné štádium dlhej venostázy pečene: väzivo okolo centrálnych žíl, ktoré sa spája medzi lalôčikmi („srdcová cirhóza“).",
  body: ""
},
{
  id: "onkoticky-tlak",
  title: "Onkotický tlak",
  match: ["onkotick\\w*\\s+tlak\\w*"],
  short: "Sila, ktorou bielkoviny plazmy (hlavne albumín) držia vodu v cieve. Klesá pri nedostatku albumínu → hypoproteinemický edém.",
  body: ""
},
{
  id: "hydrostaticky-tlak",
  title: "Hydrostatický tlak",
  match: ["hydrostatick\\w*\\s+tlak\\w*"],
  short: "Tlak krvi na stenu kapiláry, ktorý vytláča tekutinu do tkaniva. Stúpa, keď krv neodteká (uzáver žily, zlyhávanie srdca).",
  body: ""
},
{
  id: "lymfedem",
  title: "Lymfedém",
  match: ["lymfedém\\w*", "elefantiáz\\w*"],
  short: "Opuch z viaznucej lymfy. V tkanive ostávajú aj bielkoviny, ktoré dráždia väzivo k fibróze — opuch časom tuhne (elefantiáza).",
  body: "",
  img: {
    src: "assets/images/lymphedema-leg.jpg",
    alt: "Dolná končatina s výrazným opuchom.",
    caption: "Lymfedém dolnej končatiny.",
    credit: "Bobjgalindo · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Lymphedema.jpg"
  }
},
{
  id: "anasarka",
  title: "Anasarka a výpotky",
  match: ["anasark\\w*", "hydrotorax\\w*", "hydroperikard\\w*", "ascit\\w*"],
  short: "Anasarka je rozsiahly edém celého podkožia. Transsudát v dutinách: hydrotorax (pohrudnica), hydroperikard (osrdcovník), ascites (brušná dutina).",
  body: ""
},
{
  id: "raas",
  title: "Renín–angiotenzín–aldosterón",
  match: ["renín\\w*[–\\-\\s→]+angiotenzín\\w*[–\\-\\s→,]+(?:a\\s+)?aldosterón\\w*", "aldosterón\\w*"],
  short: "Hormonálna os, ktorou nedokrvená oblička zadržiava soľ a vodu a sťahuje cievy.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri strate krvi zachraňuje tlak; pri zlyhaní srdca zadržaná tekutina len zvyšuje tlak v žilách a edém.</p>'
},
{
  id: "kolaps",
  title: "Kolaps (synkopa)",
  match: ["kolaps\\w*", "synkop\\w*"],
  short: "Krátka strata vedomia zo zníženého prietoku krvi mozgom, ktorá sa sama upraví a nezanechá poškodenie.",
  body: ""
},
{
  id: "sok",
  title: "Šok",
  match: ["šok", "šoku", "šokom", "šoky", "šokov\\w*"],
  short: "Zlyhanie obehu, pri ktorom prietok tkanivami nestačí bunkám na kyslík — bez zásahu sa prehlbuje do multiorgánového zlyhania.",
  body:
    "<ul>" +
      "<li><b>Hypovolemický</b> — málo krvi alebo plazmy.</li>" +
      "<li><b>Kardiogénny</b> — slabá pumpa.</li>" +
      "<li><b>Obštrukčný</b> — prekážka (embólia, tamponáda).</li>" +
      "<li><b>Distribučný</b> — príliš široké cievy (sepsa, anafylaxia, poranenie miechy).</li>" +
    "</ul>"
},
{
  id: "centralizacia-obehu",
  title: "Centralizácia obehu",
  match: ["centralizáci\\w*\\s+obehu", "centralizáci\\w*"],
  short: "Pri šoku sympatikus stiahne cievy kože, svalov, čriev a obličiek; cievy mozgu a srdca sa sťahujú menej, takže zvyšný výdaj ide k nim.",
  body: ""
},
{
  id: "tubularna-nekroza",
  title: "Akútna tubulárna nekróza",
  match: ["tubulárn\\w*\\s+nekróz\\w*", "šokov\\w*\\s+obličk\\w*"],
  short: "Odumretie buniek obličkových tubulov (najmä proximálnych) z ischémie alebo jedu; klbká sú ušetrené. Najčastejšia príčina akútneho zlyhania obličiek v nemocnici.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Bunky tubulov sa delia a bazálna membrána ostáva — po prežitom šoku sa výstelka obnoví.</p>'
},
{
  id: "dad",
  title: "Difúzne alveolárne poškodenie (šoková pľúca, ARDS)",
  match: ["difúzn\\w*\\s+alveolárn\\w*\\s+poškoden\\w*", "šokov\\w*\\s+pľúc\\w*", "ARDS"],
  short: "Poškodenie endotelu a výstelky alveol: edém, krvácanie a hyalínne membrány — ružové blany z bielkovín a zvyškov buniek v alveolách. Klinicky syndróm akútnej dychovej tiesne (ARDS).",
  body: "",
  img: {
    src: "assets/images/dad-hyaline-membranes.jpg",
    alt: "Pľúcne tkanivo s ružovými blanami vystieľajúcimi alveoly.",
    caption: "Hyalínne membrány pri difúznom alveolárnom poškodení (H&E).",
    credit: "Yale Rosen · CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Diffuse_alveolar_damage_(DAD)_(4564039878).jpg"
  }
},
{
  id: "stresovy-vred",
  title: "Stresové vredy",
  match: ["stresov\\w*\\s+(?:erózi\\w*|vred\\w*)(?:\\s+a\\s+vred\\w*)?"],
  short: "Erózie a vredy žalúdka a dvanástnika pri šoku a ťažkých stavoch — ischemická sliznica stratí ochranu pred kyselinou.",
  body: ""
},
{
  id: "dehydratacia",
  title: "Dehydratácia",
  match: ["dehydratáci\\w*"],
  short: "Úbytok vody z tela: zahustená krv, znížené napätie kože, vpadnuté oči; pri veľkej strate hypovolemický šok.",
  body: ""
}
);

/* Glosár PATOLY — celkové poruchy obehu (kap. 9): zlyhanie srdca, venostáza orgánov, edém, kolaps a šok.
   Texty sú vlastné (CLAUDE.md §4.1). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  id: "zlyhanie-srdca",
  title: "Zlyhanie srdca",
  match: ["zlyhan\\w*\\s+srdca", "zlyhávan\\w*\\s+srdca", "srdcov\\w*\\s+zlyhan\\w*", "zlyhan\\w*\\s+(?:ľavej|pravej)\\s+komory", "zlyhávan\\w*\\s+(?:ľavej|pravej)\\s+komory"],
  img: {
    "src": "assets/images/lvh-gross.jpg",
    "alt": "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    "caption": "Koncentrická hypertrofia ľavej komory: hrubá stena, úzka dutina.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_left_ventricular_hypertrophy.jpg"
  },
  short: "Srdce neprečerpá toľko krvi, koľko tkanivá potrebujú: dopredu jej je málo, dozadu sa hromadí pred komorou, ktorá nestíha.",
  body: "<ul><li>Príčiny: ischemická choroba, hypertenzia, chlopňové chyby, kardiomyopatie.</li><li>Kompenzácia (sympatikus, RAAS, hypertrofia) pri dlhodobom pôsobení škodí.</li></ul><p class=\"chain\">zlyhá <b>ľavá</b> komora → krv stojí v pľúcach → edém pľúc, dýchavica<br>zlyhá <b>pravá</b> komora → krv stojí vo veľkom obehu → pečeň, slezina, opuchy, výpotky</p>"
},
{
  id: "ejekcna-frakcia", et: "lat. <i>eicere</i> „vyhodiť, vypudiť“; <i>fractio</i> „zlomok“ (<i>frangere</i> „lámať“)",
  title: "Ejekčná frakcia",
  match: ["ejekčn\\w*\\s+frakci\\w*"],
  short: "Podiel krvi, ktorý ľavá komora pri sťahu vypudí. Zlyhanie srdca sa delí na formu so zníženou (≤ 40 %), mierne zníženou (41–49 %) a zachovanou (≥ 50 %) frakciou.",
  body: "<ul><li>Norma ≈ 55–70 %.</li><li>Určuje sa echokardiografiou.</li></ul>"
},
{
  id: "frank-starling",
  title: "Frankov-Starlingov zákon",
  match: ["Frankov\\w*[-\\s]Starlingov\\w*\\s+(?:zákon\\w*|krivk\\w*)"],
  short: "Čím viac sa komora naplní a natiahne svoje vlákna, tým silnejšie sa stiahne — ale len po určitú hranicu.",
  body: "<ul><li>Väčšie natiahnutie sarkoméry vedie k silnejšiemu sťahu.</li><li>Zabezpečuje, že pravá a ľavá komora vypudia rovnaký objem.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Zlyhávajúca komora je za vrcholom krivky: ďalšie plnenie sťah nezosilní, len zvýši tlak v žilách → venostáza a edém.</p>"
},
{
  id: "cor-pulmonale", et: "lat. <i>cor</i> „srdce“ + <i>pulmonalis</i> „pľúcny“ (<i>pulmo</i> „pľúca“)",
  title: "Cor pulmonale",
  match: ["cor\\s+pulmonale"],
  img: {
    "src": "assets/images/cor-pulmonale-gross.jpg",
    "alt": "Rez srdcom so zhrubnutou stenou pravej komory.",
    "caption": "Hypertrofia pravej komory pri cor pulmonale.",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Heart_-_cor_pulmonale-_right_ventricular_hypertrophy_(4351163511).jpg"
  },
  short: "Zmena pravej komory, ktorej príčina je v pľúcach alebo ich cievach: akútne rozšírenie (masívna embólia), chronicky hypertrofia (choroby pľúc).",
  body: "<ul><li>Akútne: masívna pľúcna embólia.</li><li>Chronické: CHOCHP, fibróza pľúc, pľúcna hypertenzia.</li><li>Zlyhanie pravého srdca vedie k venostáze orgánov.</li></ul>"
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
  id: "hypertenzia", et: "gr. <i>hyper</i> „nad“ + lat. <i>tensio</i> „napätie“ (<i>tendere</i> „napínať“)",
  title: "Systémová hypertenzia",
  match: ["systémov\\w*\\s+hypertenzi\\w*", "esenciáln\\w*\\s+hypertenzi\\w*", "sekundárn\\w*\\s+hypertenzi\\w*"],
  img: {
    "src": "assets/images/arteriolar-hyalinosis.jpg",
    "alt": "Hyalínna arterioloskleróza: homogénne zhrubnutá stena arterioly.",
    "caption": "Hyalínna arterioloskleróza: homogénne zhrubnutá stena arterioly.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_renal_arteriolar_hyalinosis,_annotated.jpg"
  },
  short: "Opakovane nameraný tlak 140/90 mmHg a viac. Esenciálna nemá zistiteľnú príčinu; sekundárna má (obličky, hormóny, tehotenstvo).",
  body: "<ul><li>Sekundárne príčiny: oblička, nadoblička, štítna žľaza, tehotenstvo.</li><li>Komplikácie: ateroskleróza, infarkt, mozgová príhoda, zlyhanie obličiek.</li></ul><p class=\"why\"><b>Prečo to je dôležité.</b> Najčastejšia príčina chronického tlakového preťaženia ľavej komory → koncentrická hypertrofia → zlyhanie.</p>"
},
{
  id: "ortopnoe", et: "gr. <i>orthos</i> „rovný, vzpriamený“ + <i>pnoe</i> „dýchanie“",
  title: "Ortopnoe",
  match: ["ortopnoe"],
  short: "Dýchavica v ľahu, ktorá ustúpi v sede — v ľahu sa krv z nôh presunie do hrudníka a zlyhávajúca ľavá komora ju neprečerpá.",
  body: "<ul><li>Pacient si podkladá viac vankúšov.</li><li>Je znakom zlyhania ľavého srdca.</li></ul>"
},
{
  id: "nykturia", et: "gr. <i>nyx, nyktos</i> „noc“ + <i>ouron</i> „moč“",
  title: "Nyktúria",
  match: ["nyktúri\\w*"],
  short: "Nočné močenie — pri zlyhávaní srdca sa v ľahu tekutina z opuchov vracia do obehu a obličky ju vylúčia.",
  body: "<ul><li>V ľahu sa tekutina z opuchov vracia do obehu.</li><li>Môže ju spôsobiť aj diabetes alebo zväčšená prostata.</li></ul>"
},
{
  id: "cyanoza", et: "gr. <i>kyanos</i> „tmavomodrý“ + <i>-osis</i> „stav, proces“",
  img: {
    src: "assets/images/cyanosis-hand.jpg",
    alt: "Cyanóza ruky pri nízkej saturácii kyslíkom.",
    caption: "Cyanóza ruky pri nízkej saturácii kyslíkom.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Cynosis.JPG"
  },
  title: "Cyanóza",
  match: ["cyanóz\\w*", "cyanotick\\w*"],
  short: "Modrasté sfarbenie kože a slizníc, keď je v krvi kapilár aspoň 50 g/l hemoglobínu bez kyslíka.",
  body: "<ul><li>Centrálna (↓ saturácia kyslíkom) a periférna (pomalý prietok).</li><li>Chýba pri ťažkej anémii.</li></ul><p class=\"why\"><b>Pozor.</b> Meria množstvo odkysličeného hemoglobínu, nie hĺbku hypoxie: anemický pacient cyanotický nebude, hoci je hypoxický.</p>"
},
{
  id: "induracia", et: "lat. <i>induratio</i> „zatvrdnutie“ (<i>durus</i> „tvrdý“)",
  title: "Indurácia",
  match: ["indurác\\w*"],
  img: {
    "src": "assets/images/lung-congestion-siderophages.jpg",
    "alt": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "caption": "Venostáza pľúc: preplnené kapiláry a siderofág.",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_pulmonary_congestion_and_siderophages.jpg"
  },
  short: "Stvrdnutie orgánu drobnou fibrózou pri dlhej venostáze: cyanotická (slezina, obličky, pečeň) alebo hrdzavá (pľúca – farbu dáva hemosiderín).",
  body: "<ul><li>Cyanotická: slezina, obličky, pečeň.</li><li>Hrdzavá indurácia pľúc: hemosiderín v siderofágoch.</li></ul>"
},
{
  id: "kardialna-fibroza", et: "gr. <i>kardia</i> „srdce“; lat. <i>fibra</i> „vlákno“",
  title: "Kardiálna fibróza pečene",
  match: ["kardiáln\\w*\\s+fibróz\\w*", "srdcov\\w*\\s+cirhóz\\w*"],
  img: {
    "src": "assets/images/congestive-hepatopathy-trichrome.jpg",
    "alt": "Kongestívna pečeň v trichróme: väzivo okolo centrálnych žíl.",
    "caption": "Kongestívna pečeň v trichróme: väzivo okolo centrálnych žíl.",
    "credit": "Nephron · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Congestive_hepatopathy_intermed_mag.jpg"
  },
  short: "Konečné štádium dlhej venostázy pečene: väzivo okolo centrálnych žíl, ktoré sa spája medzi lalôčikmi („srdcová cirhóza“).",
  body: "<ul><li>Vzniká pri chronickom pravostrannom zlyhaní.</li><li>Od cirhózy sa líši: väzivo spája centrálne žily, nie portálne polia.</li></ul>"
},
{
  id: "onkoticky-tlak", et: "gr. <i>onkos</i> „objem, hmota, opuch“",
  title: "Onkotický tlak",
  match: ["onkotick\\w*\\s+tlak\\w*"],
  short: "Sila, ktorou bielkoviny plazmy (hlavne albumín) držia vodu v cieve. Klesá pri nedostatku albumínu → hypoproteinemický edém.",
  body: "<ul><li>Norma okolo 25 mmHg.</li><li>Najväčší podiel nesie albumín.</li></ul>"
},
{
  id: "hydrostaticky-tlak", et: "gr. <i>hydor</i> „voda“ + <i>statikos</i> „stojaci, v rovnováhe“",
  title: "Hydrostatický tlak",
  match: ["hydrostatick\\w*\\s+tlak\\w*"],
  short: "Tlak krvi na stenu kapiláry, ktorý vytláča tekutinu do tkaniva. Stúpa, keď krv neodteká (uzáver žily, zlyhávanie srdca).",
  body: "<ul><li>Na arteriálnom konci kapiláry býva orientačne ≈ 35 mmHg, na venóznom ≈ 15 mmHg.</li></ul>"
},
{
  id: "lymfedem", et: "lat. <i>lympha</i> „čistá voda“ + gr. <i>oidema</i> „opuch“",
  title: "Lymfedém",
  match: ["lymfedém\\w*", "elefantiáz\\w*"],
  img: {
    "src": "assets/images/lymphedema-leg.jpg",
    "alt": "Dolná končatina s výrazným opuchom.",
    "caption": "Lymfedém dolnej končatiny.",
    "credit": "Bobjgalindo · CC BY-SA 4.0",
    "href": "https://commons.wikimedia.org/wiki/File:Lymphedema.jpg"
  },
  short: "Opuch z viaznucej lymfy. V tkanive ostávajú aj bielkoviny, ktoré dráždia väzivo k fibróze — opuch časom tuhne (elefantiáza).",
  body: "<ul><li>Primárny (vrodený) a sekundárny (po operácii, ožiarení, infekcii, parazite).</li><li>Filarióza vedie k elefantiáze.</li></ul>"
},
{
  id: "anasarka", et: "gr. <i>ana</i> „cez“ + <i>sarx</i> „mäso“",
  title: "Anasarka",
  match: ["anasark\\w*"],
  img: {
    "src": "assets/images/pitting-edema.jpg",
    "alt": "Edém predkolenia s jamkou po zatlačení.",
    "caption": "Edém predkolenia s jamkou po zatlačení.",
    "credit": "James Heilman, MD · CC BY-SA 3.0",
    "href": "https://commons.wikimedia.org/wiki/File:Pitting_Edema2008.jpg"
  },
  short: "Rozsiahly edém celého podkožia.",
  body: "<ul><li>Vzniká pri ťažkom zlyhaní srdca, obličiek alebo pečene.</li></ul>"
},
{
  id: "hydrotorax", et: "gr. <i>hydor</i> „voda“ + <i>thorax</i> „hrudník“",
  title: "Hydrotorax",
  match: ["hydrotorax\\w*"],
  short: "Transsudát v pohrudničnej dutine.",
  body: "<ul><li>Príčiny: zlyhanie srdca, hypoalbuminémia.</li><li>Na rozdiel od pleurálneho exsudátu má málo bielkovín (Lightove kritériá).</li></ul>"
},
{
  id: "hydroperikard", et: "gr. <i>hydor</i> „voda“ + <i>peri</i> „okolo“ + <i>kardia</i> „srdce“",
  title: "Hydroperikard",
  match: ["hydroperikard\\w*"],
  short: "Transsudát v osrdcovníku.",
  body: "<ul><li>Príčina: zlyhanie srdca.</li><li>Pri rýchlom hromadení tekutiny hrozí tamponáda.</li></ul>"
},
{
  id: "ascites", et: "gr. <i>askites</i> „vak“",
  img: {
    src: "assets/images/ascites-cirrhosis.jpg",
    alt: "Masívny ascites pri portálnej hypertenzii.",
    caption: "Masívny ascites pri portálnej hypertenzii.",
    credit: "James Heilman, MD · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Hepaticfailure.jpg"
  },
  title: "Ascites",
  match: ["ascit\\w*"],
  short: "Tekutina v brušnej dutine.",
  body: "<ul><li>Častá pri cirhóze (portálna hypertenzia, ↓ albumín) a pravostrannom zlyhaní srdca.</li></ul>"
},
{
  id: "raas", et: "renín: lat. <i>ren</i> „oblička“; angiotenzín: gr. <i>angeion</i> „cieva“ + lat. <i>tensio</i> „napätie“",
  title: "Renín–angiotenzín–aldosterón",
  match: ["renín\\w*[–\\-\\s→]+angiotenzín\\w*[–\\-\\s→,]+(?:a\\s+)?aldosterón\\w*", "aldosterón\\w*"],
  short: "Hormonálna os, ktorou nedokrvená oblička zadržiava soľ a vodu a sťahuje cievy.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Pri strate krvi zachraňuje tlak; pri zlyhaní srdca zadržaná tekutina len zvyšuje tlak v žilách a edém.</p>'
},
{
  id: "kolaps", et: "lat. <i>collapsus</i> „zrútenie“ (<i>labi</i> „padať“); synkopa: gr. <i>synkope</i> „odseknutie“ (<i>syn</i> „spolu“ + <i>koptein</i> „sekať“)",
  title: "Kolaps (synkopa)",
  match: ["kolaps\\w*", "synkop\\w*"],
  short: "Krátka strata vedomia zo zníženého prietoku krvi mozgom, ktorá sa sama upraví a nezanechá poškodenie.",
  body: "<ul><li>Od šoku sa líši tým, že je prechodný a bez poškodenia orgánov.</li><li>Príčiny: vazovagálna reakcia, ortostáza, arytmia.</li></ul>"
},
{
  id: "sok", et: "angl. <i>shock</i> „náraz, otras“ (franc. <i>choc</i>)",
  img: {
    src: "assets/images/shock-liver.jpg",
    alt: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    caption: "Pečeň po šoku: odumreté hepatocyty v stredoch lalôčikov.",
    credit: "Mikael Häggström, M.D. · CC0",
    href: "https://commons.wikimedia.org/wiki/File:Histopathology_of_shock_liver.jpg"
  },
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
  id: "centralizacia-obehu", et: "lat. <i>centrum</i> „stred“ z gr. <i>kentron</i> „hrot kružidla, stred“",
  title: "Centralizácia obehu",
  match: ["centralizáci\\w*\\s+obehu", "centralizáci\\w*"],
  short: "Pri šoku sympatikus stiahne cievy kože, svalov, čriev a obličiek; cievy mozgu a srdca sa sťahujú menej, takže zvyšný výdaj ide k nim.",
  body: "<ul><li>Zabezpečuje prekrvenie mozgu a srdca na úkor kože a čriev.</li><li>Pri dlhšom trvaní vedie k ischémii obličiek a čreva.</li></ul>"
},
{
  id: "tubularna-nekroza", et: "lat. <i>tubulus</i> „rúrka“ (zdrobnenina <i>tubus</i> „trubica“)",
  title: "Akútna tubulárna nekróza",
  match: ["tubulárn\\w*\\s+nekróz\\w*", "šokov\\w*\\s+obličk\\w*"],
  short: "Odumretie buniek obličkových tubulov (najmä proximálnych) z ischémie alebo jedu; klbká sú ušetrené. Najčastejšia príčina akútneho zlyhania obličiek v nemocnici.",
  body:
    '<p class="why"><b>Prečo to je dôležité.</b> Bunky tubulov sa delia a bazálna membrána ostáva — po prežitom šoku sa výstelka obnoví.</p>'
},
{
  id: "dad", et: "difúzne: lat. <i>diffundere</i> „rozlievať“; alveolárne: lat. <i>alveolus</i> „jamka“",
  title: "Difúzne alveolárne poškodenie (DAD, šoková pľúca, ARDS; angl. diffuse alveolar damage, acute respiratory distress syndrome)",
  match: ["difúzn\\w*\\s+alveolárn\\w*\\s+poškoden\\w*", "šokov\\w*\\s+pľúc\\w*", "ARDS"],
  img: {
    "src": "assets/images/dad-hyaline-membranes.jpg",
    "alt": "Pľúcne tkanivo s ružovými blanami vystieľajúcimi alveoly.",
    "caption": "Hyalínne membrány pri difúznom alveolárnom poškodení (H&E).",
    "credit": "Yale Rosen · CC BY-SA 2.0",
    "href": "https://commons.wikimedia.org/wiki/File:Diffuse_alveolar_damage_(DAD)_(4564039878).jpg"
  },
  short: "Poškodenie endotelu a výstelky alveol: edém, krvácanie a hyalínne membrány — ružové blany z bielkovín a zvyškov buniek v alveolách. Klinicky syndróm akútnej dychovej tiesne (ARDS).",
  body: "<ul><li>Fázy: exsudatívna (edém, hyalínne membrány) a proliferatívna.</li><li>Príčiny: sepsa, aspirácia, pankreatitída, trauma.</li></ul>"
},
{
  id: "stresovy-vred",
  title: "Stresové vredy",
  match: ["stresov\\w*\\s+(?:erózi\\w*|vred\\w*)(?:\\s+a\\s+vred\\w*)?"],
  short: "Erózie a vredy žalúdka a dvanástnika pri šoku a ťažkých stavoch — ischemická sliznica stratí ochranu pred kyselinou.",
  body: "<ul><li>Mnohopočetné povrchové vredy, najmä vo fundu žalúdka.</li><li>Cushingov vred vzniká po poškodení mozgu.</li></ul>"
},
{
  id: "dehydratacia", et: "lat. <i>de-</i> „odnímanie“ + gr. <i>hydor</i> „voda“",
  title: "Dehydratácia",
  match: ["dehydratáci\\w*"],
  short: "Úbytok vody z tela: zahustená krv, znížené napätie kože, vpadnuté oči; pri veľkej strate hypovolemický šok.",
  body: "<ul><li>Typy: hypertonická, izotonická, hypotonická.</li><li>Krv sa zahustí: ↑ hematokrit, ↑ albumín.</li></ul>"
}
);

/* Glosár PATOLY — choroby a pojmy bez vysvetlivky, vysvetlivky mechanizmov pre ikonku ⓘ (pripomienky autora 16.–18. 10. 2026).
   SÚBOR JE GENEROVANÝ: py pracovne/_pomocne/gen_choroby.py. Texty sú vlastné (CLAUDE.md §4.1). info:true = vysvetlivka mechanizmu,
   ktorú v texte otvára ikonka ⓘ ({{i:id}} v .md); kde = sekcia knihy, ak ju build neodvodí sám. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
 "id": "i-venostaza-opuch",
 "info": true,
 "title": "Prečo zablokovaný odtok vytlačí tekutinu z kapilár",
 "match": [],
 "short": "Tlak v kapiláre neurčuje len prítok – sleduje najmä tlak v žile, do ktorej kapilára ústi.",
 "body": "<p class=\"chain\">voľný odtok → tlak pozdĺž kapiláry klesá (krv tečie od vyššieho tlaku k nižšiemu) → na začiatku trochu tekutiny vytečie, na konci sa vráti</p><p class=\"chain\">zablokovaný odtok → krv nemá kam odtiecť, prúd sa zastaví → tlak sa vyrovná s tlakom na vstupe a tlačí na stenu v celej dĺžke → <b>filtrácia prevýši spätné vstrebávanie</b> → opuch</p><ul><li><b>Fyzika:</b> prietok = rozdiel tlakov / odpor (Q = ΔP / R). Keď rozdiel tlakov na začiatku a konci kapiláry zmizne, tlak už „nemá kam klesnúť“ – ako v hadici, ktorej koniec zavrieš.</li><li><b>Rovnica filtrácie</b> (Starling): J = K · [(P<sub>kap</sub> − P<sub>tk</sub>) − σ(π<sub>kap</sub> − π<sub>tk</sub>)] – von tlačí hydrostatický tlak P, späť drží onkotický tlak bielkovín π.</li><li>Odpor pred kapilárou (arterioly) je niekoľkokrát väčší než za ňou, preto sa tlak v kapiláre riadi hlavne tlakom v žile – žilová prekážka opuch vyvolá ľahšie než silnejší prítok.</li></ul>",
 "img": {
  "src": "assets/images/gl-kapilara-tlak.svg",
  "alt": "Kapilára s voľným a so zablokovaným odtokom a priebeh tlaku v nej.",
  "caption": "Tlak v kapiláre pri voľnom a pri zablokovanom žilovom odtoku.",
  "credit": "vlastná schéma · CC BY-NC-SA 4.0"
 }
},
{
 "id": "i-hypoxia-steatoza",
 "info": true,
 "title": "Prečo bunky pri nedostatku kyslíka tukovatejú",
 "match": [],
 "short": "Mastné kyseliny sa „spaľujú“ v mitochondriách len za prítomnosti kyslíka – bez neho sa v bunke hromadia ako tuk.",
 "body": "<p class=\"chain\">↓ O₂ → mitochondrie nestíhajú β-oxidáciu mastných kyselín → kyseliny sa v cytoplazme menia na triacylglyceroly → <b>tukové kvapky</b> (stukovatenie) → pri dlhom trvaní bunka atrofuje</p><ul><li>V pečeni pri venostáze najviac trpia hepatocyty okolo centrálnej žily – dostanú krv ako posledné, s najmenším obsahom kyslíka; vzniká obraz „muškátovej“ pečene.</li><li>Ten istý mechanizmus pozná stukovatenie srdca pri anémii („tigrované srdce“).</li></ul>",
 "kde": "02_dystrofie#sub-2-3-1"
},
{
 "id": "i-kasabach",
 "info": true,
 "title": "Prečo veľký cievny nádor „zje“ doštičky",
 "match": [
  "Kasabach\\w*[-–\\s]+Merritt\\w*(?:\\s+(?:fenomén|syndróm)\\w*)?"
 ],
 "short": "Kasabachov–Merrittovej fenomén: v spleti abnormálnych ciev cievneho nádoru sa doštičky zachytávajú, aktivujú a spotrebúvajú.",
 "body": "<p class=\"chain\">cievny nádor dojčaťa s abnormálnym endotelom a pomalým prúdom → doštičky sa v ňom zachytia a aktivujú → mikrotromby → <b>ťažká trombocytopénia</b> a spotreba fibrinogénu → krvácanie, nádor rýchlo rastie a tmavne</p><ul><li>Dnes vieme, že ho nespôsobujú obyčajné hemangiómy dojčiat, ale zriedkavé nádory: kaposiformný hemangioendotelióm a chumáčikovitý (tufted) angióm.</li><li>Transfúzia doštičiek pomôže len krátko – doštičky sa v nádore znova spotrebujú; lieči sa samotný nádor.</li></ul>"
},
{
 "id": "i-itp-mechanizmus",
 "info": true,
 "title": "Ako protilátky ničia doštičky",
 "match": [],
 "short": "Pri imunitnej trombocytopénii protilátka doštičku „označí“ a makrofágy ju odstránia; navyše brzdí aj jej tvorbu.",
 "body": "<p class=\"chain\">autoprotilátka IgG proti receptoru doštičky (najčastejšie GP IIb/IIIa) → naviaže sa na doštičky → makrofágy sleziny a pečene ich cez Fc receptory pohltia → doštičky žijú namiesto ≈ 7–10 dní len hodiny až dni</p><ul><li>Tie isté protilátky zasiahnu aj megakaryocyty v dreni – tvorba nestíha.</li><li><b>Lieky</b> (napr. chinín, heparín) vyvolajú protilátky, ktoré sa na doštičku viažu len v prítomnosti lieku – po vysadení ustúpia.</li><li><b>Vírusy</b> môžu vyvolať protilátky, ktoré skrížene reagujú s doštičkami – typicky u detí niekoľko týždňov po infekcii.</li></ul>"
},
{
 "id": "waldenstrom",
 "et": "podľa švédskeho lekára Jana Waldenströma; makro- „veľký“ + globulín + gr. <i>haima</i> „krv“",
 "title": "Waldenströmova makroglobulinémia",
 "match": [
  "Waldenström\\w*(?:\\s+makroglobulinémi\\w*)?",
  "makroglobulinémi\\w*"
 ],
 "short": "Lymfóm z B-lymfocytov, ktorého bunky tvoria veľa monoklonálneho IgM – veľkej molekuly, ktorá krv zahustí.",
 "body": "<p class=\"chain\">nádorové lymfoplazmocytové bunky v dreni → priveľa IgM (pentamér, veľká molekula) → ↑ viskozita krvi → krv sa v drobných cievach spomalí → bolesti hlavy, poruchy videnia, krvácanie zo slizníc</p><ul><li>Najčastejšia príčina syndrómu hyperviskozity.</li><li>Lieči sa nádor; pri hyperviskozite rýchlo pomôže výmena plazmy.</li></ul>"
},
{
 "id": "varix",
 "et": "lat. <i>varix</i> „rozšírená žila, uzol“",
 "title": "Varix (kŕčová žila)",
 "match": [
  "varix\\w*",
  "varixy",
  "varixov\\w*",
  "kŕčov\\w*\\s+žil\\w*",
  "varik\\w*"
 ],
 "short": "Trvalo rozšírená, kľukatá povrchová žila, najčastejšie na dolných končatinách.",
 "body": "<p class=\"chain\">chlopne žily netesnia → krv tečie späť a tlak sa prenáša do povrchových žíl → stena sa naťahuje, prestavuje a rozširuje → ďalšie chlopne prestanú tesniť ⟳</p><ul><li>Riziko: vek, ženské pohlavie, tehotenstvo, dlhé státie, prekonaná hlboká trombóza, dedičnosť.</li><li>Komplikácie: stáza a trombóza, opuch, zmeny kože, vred predkolenia; prasknutý varix krváca.</li><li>Varixy pažeráka vznikajú inak – pri portálnej hypertenzii (pozri cirhózu).</li></ul>",
 "img": {
  "src": "assets/images/varicose-veins-nhlbi.jpg",
  "alt": "Normálna žila a varix.",
  "caption": "Normálna žila (A) a varix s netesniacou chlopňou (B).",
  "credit": "National Heart, Lung and Blood Institute · Public domain",
  "href": "https://commons.wikimedia.org/wiki/File:Varicose_veins.jpg"
 }
},
{
 "id": "aplazia-drene",
 "et": "gr. <i>a-</i> „bez“ + <i>plasis</i> „tvorenie“",
 "title": "Aplázia kostnej drene (aplastická anémia)",
 "match": [
  "aplázi\\w*(?:\\s+(?:kostnej\\s+)?dren\\w*)?",
  "aplastick\\w*\\s+anémi\\w*"
 ],
 "short": "Zlyhanie krvotvorných kmeňových buniek: dreň je prázdna, nahradená tukom, a v krvi chýbajú všetky tri rady krviniek (pancytopénia).",
 "body": "<p class=\"chain\">poškodenie kmeňových buniek (najčastejšie imunitné – vlastné T-lymfocyty; lieky, chemikálie, žiarenie, vírusy, vrodené poruchy) → dreň netvorí krvinky → anémia + infekcie (málo neutrofilov) + krvácanie (málo doštičiek)</p><ul><li>Biopsia drene: prevažne tuk, málo krvotvorných buniek.</li><li>Liečba: transplantácia krvotvorných buniek alebo imunosupresia.</li></ul>",
 "img": {
  "src": "assets/images/marrow-hypocellular.jpg",
  "alt": "Hypocelulárna kostná dreň s prevahou tukových buniek.",
  "caption": "Hypocelulárna kostná dreň s prevahou tuku.",
  "credit": "Krista J. M. Stibbe, Hajo I. J. Wildschut, Pieternella J. Lugtenburg · CC BY 4.0",
  "href": "https://commons.wikimedia.org/wiki/File:13256_2010_Article_1435_Fig1_HTML.webp"
 }
},
{
 "id": "uremia",
 "et": "gr. <i>uron</i> „moč“ + <i>haima</i> „krv“",
 "title": "Urémia",
 "match": [
  "urémi\\w*",
  "uremick\\w*"
 ],
 "short": "Súbor príznakov pri ťažkom zlyhaní obličiek, keď sa v krvi hromadia látky, ktoré mali odísť močom.",
 "body": "<ul><li>Postihne takmer všetky orgány: nevoľnosť, svrbenie, fibrinózna perikarditída (uremický „chlpaté srdce“), porucha vedomia.</li><li><b>Krvácanie:</b> zadržané látky tlmia funkciu doštičiek – horšie sa prichytia k vWF a zhlukujú sa; počet doštičiek pritom býva normálny (trombocytopatia).</li><li>Zlepší ju dialýza.</li></ul>"
},
{
 "id": "bernard-soulier",
 "et": "podľa francúzskych hematológov J. Bernarda a J.-P. Souliera (1948)",
 "title": "Bernardov–Soulierov syndróm",
 "match": [
  "Bernardov\\w*[-–]Soulierov\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Vrodený nedostatok receptora GP Ib-IX-V: doštičky sa neprichytia na vWF – porucha adhézie.",
 "body": "<ul><li>Doštičky sú <b>obrovské</b> a je ich menej (trombocytopénia).</li><li>Krvácanie zo slizníc od detstva; dedí sa autozómovo recesívne.</li><li>Mechanizmus prvého kroku zátky: vWF na kolagéne → GP Ib doštičky.</li></ul>",
 "img": {
  "src": "assets/images/giant-platelet-smear.jpg",
  "alt": "Obrovská doštička v krvnom nátere.",
  "caption": "Obrovská doštička v krvnom nátere – typická pre Bernardov–Soulierov syndróm.",
  "credit": "Ed Uthman · CC BY 2.0",
  "href": "https://commons.wikimedia.org/wiki/File:Giant_Platelet,_Peripheral_Blood_Smear_(6032662354).jpg"
 }
},
{
 "id": "hemolyticka-anemia",
 "et": "gr. <i>haima</i> „krv“ + <i>lysis</i> „rozpúšťanie“; <i>an-</i> „bez“ + <i>haima</i>",
 "title": "Hemolytická anémia",
 "match": [
  "hemolytick\\w*\\s+anémi\\w*"
 ],
 "short": "Anémia zo skráteného života erytrocytov – rozpadajú sa rýchlejšie, než ich dreň dorobí.",
 "body": "<p class=\"chain\">rozpad erytrocytov (v cievach alebo v slezine) → ↑ voľný hemoglobín → ↓ haptoglobín, ↑ LDH a nekonjugovaný bilirubín (žltačka) → dreň zrýchli tvorbu (↑ retikulocyty)</p><ul><li><b>Príčina v krvinke:</b> vrodené chyby membrány, enzýmov alebo hemoglobínu (kosáčikovitá anémia).</li><li><b>Príčina mimo nej:</b> protilátky, mechanické trieštenie o mikrotromby (schistocyty), infekcie, toxíny.</li></ul>"
},
{
 "id": "ankyloza",
 "et": "gr. <i>ankylos</i> „ohnutý, skrivený“",
 "title": "Ankylóza",
 "match": [
  "ankylóz\\w*",
  "ankylotick\\w*"
 ],
 "short": "Stuhnutie kĺbu – kĺbové plochy zrastú väzivom alebo kosťou a pohyb zanikne.",
 "body": "<ul><li>Konečný stav po zničení chrupky: opakované krvácanie (hemofília), hnisavá artritída, reumatoidná artritída, Bechterevova choroba.</li><li>Väzivová ankylóza ešte dovolí malý pohyb, kostená nie.</li></ul>"
},
{
 "id": "aterom",
 "et": "gr. <i>athere</i> „kaša“ + <i>-oma</i> „nádor, útvar“",
 "title": "Ateróm (aterosklerotický plát)",
 "match": [
  "ateróm\\w*",
  "aterosklerotick\\w*\\s+plát\\w*"
 ],
 "short": "Ložisko aterosklerózy v intime tepny: kašovité lipidové jadro prikryté väzivovou čiapkou.",
 "body": "<p class=\"chain\">poškodený endotel → LDL prenikne do intimy a oxiduje sa → makrofágy ho pohlcujú (penové bunky) → hladké svalové bunky tvoria väzivovú čiapku → plát rastie a zužuje priesvit</p><ul><li>Keď tenká čiapka praskne, kontakt krvi s jadrom spustí <b>trombózu</b> – infarkt myokardu, mozgu.</li><li>Obsah prasknutého aterómu môže embolizovať (cholesterolové kryštály).</li></ul>"
},
{
 "id": "nbte",
 "et": "marantický: gr. <i>marantikos</i> „vädnúci, chradnúci“",
 "title": "Nebakteriálna trombotická (marantická) endokarditída",
 "match": [
  "nebakteriáln\\w*\\s+trombotick\\w*\\s+\\(marantick\\w*\\)\\s+endokarditíd\\w*",
  "nebakteriáln\\w*\\s+trombotick\\w*\\s+endokarditíd\\w*",
  "marantick\\w*\\s+endokarditíd\\w*"
 ],
 "short": "Sterilné vegetácie z fibrínu a doštičiek na chlopniach pri zvýšenej zrážanlivosti krvi – bez baktérií a bez zápalu chlopne.",
 "body": "<ul><li>Pri pokročilých nádoroch (najmä adenokarcinómoch tvoriacich hlien), antifosfolipidovom syndróme a lupuse (tam pod názvom Libmanova–Sacksova endokarditída).</li><li>Vegetácie sú drobné a voľné – ľahko sa odtrhnú: embólie do mozgu a ďalších orgánov.</li><li>Je to tá istá zvýšená zrážanlivosť ako pri Trousseauovom syndróme, len na chlopni.</li></ul>"
},
{
 "id": "phlegmasia-alba",
 "et": "gr. <i>phlegmasia</i> „zápal“; lat. <i>alba</i> „biela“, <i>dolens</i> „bolestivá“",
 "title": "Phlegmasia alba dolens",
 "match": [
  "phlegmasia\\s+alba\\s+dolens"
 ],
 "short": "Masívna trombóza panvových a stehenných žíl: končatina je opuchnutá, bledá a bolestivá.",
 "body": "<ul><li>Bledá je od opuchu, ktorý stláča drobné cievy kože; tepnový prítok ešte funguje.</li><li>Ak sa upchajú aj kolaterály, prechádza do phlegmasia cerulea dolens.</li></ul>"
},
{
 "id": "phlegmasia-cerulea",
 "et": "gr. <i>phlegmasia</i> „zápal“; lat. <i>caerulea</i> „modrá“, <i>dolens</i> „bolestivá“",
 "title": "Phlegmasia cerulea dolens",
 "match": [
  "phlegmasia\\s+cerulea\\s+dolens"
 ],
 "short": "Najťažšia žilová trombóza končatiny: odtok sa zastaví úplne, končatina zmodrie a hrozí žilová gangréna.",
 "body": "<p class=\"chain\">upchaté hlboké žily aj kolaterály → krv nemá kam odtiecť → tlak v tkanive stúpne nad tlak v kapilárach a tepnách → zastaví sa aj prítok → ischémia → gangréna</p><ul><li>Často je za ňou nádor; pacientovi hrozí aj šok, lebo veľa tekutiny ostane v končatine.</li></ul>"
},
{
 "id": "flebolit",
 "et": "gr. <i>phleps</i> „žila“ + <i>lithos</i> „kameň“",
 "title": "Flebolit",
 "match": [
  "flebolit\\w*"
 ],
 "short": "Zvápenatený zorganizovaný trombus v žile – na RTG drobný okrúhly tieň, typicky v žilách malej panvy.",
 "body": "<ul><li>Vzniká z trombu, ktorý sa nerozpustil, zorganizoval sa a dystroficky zvápenatel.</li><li>Na snímke sa nesmie zameniť s kameňom v močovode.</li></ul>"
},
{
 "id": "puriformne-zmaknutie",
 "et": "lat. <i>pus</i>, <i>puris</i> „hnis“ + <i>forma</i> „tvar“",
 "title": "Puriformné zmäknutie trombu",
 "match": [
  "puriformn\\w*\\s+zmäkn\\w*"
 ],
 "short": "Skvapalnenie stredu veľkého trombu enzýmami leukocytov – kašovitá hmota podobná hnisu, ktorá však nie je infikovaná.",
 "body": "<ul><li>Najmä vo veľkých trombech v srdci.</li><li>Zmäknutý trombus sa ľahko trhá – riziko embólie.</li></ul>"
},
{
 "id": "tma",
 "et": "gr. <i>thrombos</i> „zrazenina“; <i>mikros</i> „malý“ + <i>angeion</i> „cieva“ + <i>pathos</i> „choroba“",
 "title": "Trombotická mikroangiopatia (TMA)",
 "match": [
  "trombotick\\w*\\s+mikroangiopati\\w*"
 ],
 "csMatch": [
  "TMA"
 ],
 "short": "Obraz, pri ktorom v drobných cievach vznikajú doštičkové mikrotromby: ubúda doštičiek, erytrocyty sa o ne trieštia a orgány trpia ischémiou.",
 "body": "<p class=\"chain\">poškodený endotel alebo priveľa „lepkavého“ vWF → doštičky sa zlepujú priamo v mikrocirkulácii → <b>spotreba doštičiek</b> + <b>trieštenie erytrocytov</b> (schistocyty, hemolýza) + <b>ischémia</b> obličiek a mozgu</p><ul><li>Hlavné formy: <b>TTP</b> (chýba ADAMTS13), <b>HUS</b> (Shiga toxín alebo porucha regulácie komplementu) a sekundárne TMA (tehotenstvo, malígna hypertenzia, lieky, transplantácia).</li><li><b>PT a aPTT sú v norme</b> – zátky vznikajú cez doštičky a vWF (primárna hemostáza), nie cez masívnu aktiváciu koagulácie tkanivovým faktorom ako pri DIC.</li></ul>",
 "img": {
  "src": "assets/images/fibrin-thrombi-glomerulus.jpg",
  "alt": "Fibrínové mikrotromby v kapilárach glomerulu.",
  "caption": "Mikrotromby v kapilárach klbka obličky pri TMA.",
  "credit": "Nephron · CC BY-SA 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:Acute_thrombotic_microangiopathy_-_high_mag.jpg"
 }
},
{
 "id": "hus",
 "et": "gr. <i>haima</i> „krv“ + <i>lysis</i> „rozpúšťanie“; <i>uron</i> „moč“ + <i>haima</i>",
 "title": "Hemolyticko-uremický syndróm (HUS)",
 "match": [
  "hemolytick\\w*-uremick\\w*\\s+syndróm\\w*"
 ],
 "csMatch": [
  "HUS"
 ],
 "short": "Trombotická mikroangiopatia, ktorá postihuje najmä obličky: trombocytopénia, hemolytická anémia a akútne zlyhanie obličiek.",
 "body": "<p class=\"chain\"><b>typický HUS:</b> E. coli tvoriaca Shiga toxín (nedovarené mäso, kontaminovaná voda) → krvavá hnačka → toxín v krvi sa viaže na receptor Gb3, ktorého je najviac na endoteli klbiek → endotel odumiera, aktivuje sa komplement → mikrotromby v obličkách</p><ul><li>Typicky malé deti po hnačkovom ochorení.</li><li><b>Atypický HUS:</b> bez hnačky; vrodená alebo získaná porucha brzdenia komplementu (napr. faktor H) → komplement poškodzuje vlastný endotel.</li></ul>"
},
{
 "id": "ehlers-danlos",
 "et": "podľa dermatológov E. Ehlersa a H.-A. Danlosa",
 "title": "Ehlersov–Danlosov syndróm",
 "match": [
  "Ehlersov\\w*[-–]Danlosov\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Skupina vrodených chýb tvorby alebo spracovania kolagénu: prepínavá koža, nadmerne pohyblivé kĺby, krehké tkanivá.",
 "body": "<ul><li>Ľahko vznikajú modriny, rany sa zle hoja a jazvy sú široké.</li><li>Cievny typ (chyba kolagénu III) je najnebezpečnejší: môže prasknúť tepna, črevo alebo maternica.</li></ul>"
},
{
 "id": "hypoxemia",
 "et": "gr. <i>hypo</i> „pod“ + <i>oxys</i> „ostrý, kyslý“ (kyslík) + <i>haima</i> „krv“",
 "title": "Hypoxémia",
 "match": [
  "hypoxémi\\w*"
 ],
 "short": "Nízky obsah kyslíka v tepnovej krvi – na rozdiel od hypoxie, ktorá znamená nedostatok kyslíka v tkanive.",
 "body": "<ul><li>Príčiny: pľúca, ktoré sa vetrajú, ale neprekrvujú (embólia), alebo naopak (zápal pľúc), skrat, nízky tlak kyslíka vo vzduchu.</li><li>Meria sa krvnými plynmi (pO₂) alebo saturáciou.</li></ul>"
},
{
 "id": "sideropenicka-anemia",
 "et": "gr. <i>sideros</i> „železo“ + <i>penia</i> „nedostatok“",
 "title": "Anémia z nedostatku železa (sideropenická)",
 "match": [
  "anémi\\w*\\s+z\\s+nedostatku\\s+železa",
  "sideropenick\\w*\\s+anémi\\w*"
 ],
 "short": "Najčastejšia anémia: dreň nemá dosť železa na tvorbu hemoglobínu, erytrocyty sú malé a bledé.",
 "body": "<p class=\"chain\">opakovaná strata krvi alebo nedostatočný príjem → vyčerpané zásoby (↓ feritín) → málo hemoglobínu → mikrocytové, hypochrómne erytrocyty</p><ul><li>U muža a ženy po menopauze je najčastejšou príčinou skryté krvácanie do tráviacej rúry – treba hľadať jeho zdroj.</li></ul>"
},
{
 "id": "extravazacia",
 "et": "lat. <i>extra</i> „mimo“ + <i>vas</i> „cieva“",
 "title": "Extravazácia",
 "match": [
  "extravazáci\\w*",
  "extravazovan\\w*"
 ],
 "short": "Únik krvi alebo jej zložiek (erytrocytov, tekutiny, lieku) z cievy do okolitého tkaniva.",
 "body": "<ul><li>Pri krvácaní „per diapedesin“: erytrocyty prestúpia celou stenou drobných ciev bez trhliny.</li><li>Tak isto sa volá únik infúzie mimo žilu.</li></ul>"
},
{
 "id": "torzia",
 "et": "lat. <i>torquere</i> „krútiť“",
 "title": "Torzia (pretočenie orgánu)",
 "match": [
  "torzi\\w*",
  "pretočeni\\w*\\s+(?:orgán\\w*|stopk\\w*)",
  "orgán\\w*\\s+(?:so\\s+zaškrten\\w*|na)\\s+stopk\\w*"
 ],
 "short": "Pretočenie orgánu okolo jeho stopky, v ktorej idú cievy – semenník, vaječník, kľučka čreva (volvulus).",
 "body": "<p class=\"chain\">stopka sa pretočí → najprv sa stlačia tenkostenné žily → krv priteká, ale neodteká → opuch a krvácanie do tkaniva → napokon sa stlačí aj tepna → <b>hemoragická infarzácia</b></p><ul><li>Torzia semenníka: náhla prudká bolesť u chlapca; operovať treba do niekoľkých hodín.</li></ul>",
 "kde": "08_miestne_poruchy_obehu#sec-8-7"
},
{
 "id": "strangulacia",
 "et": "lat. <i>strangulare</i> „zaškrtiť“",
 "title": "Strangulácia (zaškrtenie)",
 "match": [
  "strangulác\\w*",
  "strangulovan\\w*",
  "zaškrten\\w*\\s+(?:črev\\w*|kľučk\\w*|prietrž\\w*)"
 ],
 "short": "Zaškrtenie orgánu tak, že sa mu stlačia cievy – typicky kľučka čreva v úzkom otvore prietrže.",
 "body": "<ul><li>Zaškrtenie stlačí najprv žily, potom tepnu – vzniká hemoragická infarzácia čreva.</li><li>Kým tlak v tkanive neprevýši tlak v tepne, dá sa črevo zachrániť uvoľnením.</li></ul>",
 "kde": "08_miestne_poruchy_obehu#sec-8-7"
},
{
 "id": "subklavialny-steal",
 "et": "angl. <i>steal</i> „kradnúť“; lat. <i>subclavius</i> „podkľúčový“",
 "title": "Subklaviálny steal syndróm",
 "match": [
  "subklaviáln\\w*\\s+steal\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Zúženie a. subclavia pred odstupom a. vertebralis: ruka si „ukradne“ krv z mozgového riečiska spätným tokom v a. vertebralis.",
 "body": "<p class=\"chain\">zúžená a. subclavia → za zúžením nízky tlak → krv tečie z druhej a. vertebralis cez spojenie na spodine mozgu <b>spätne</b> do a. vertebralis na postihnutej strane → do ruky</p><ul><li>Väčšinou bez príznakov; pri práci rukou sa môže objaviť závrat, poruchy rovnováhy a slabosť či bolesť ruky.</li><li>Príbuzné: koronárno-subklaviálny steal po bypasse z a. thoracica interna a steal pri dialyzačnej spojke na predlaktí.</li></ul>",
 "img": {
  "src": "assets/images/subclavian-steal.jpg",
  "alt": "Schéma spätného toku v ľavej a. vertebralis pri uzávere ľavej a. subclavia.",
  "caption": "Pri uzávere ľavej a. subclavia tečie krv z pravej a. vertebralis do ľavej a odtiaľ spätne do ľavej ruky.",
  "credit": "Rajtheja · CC BY-SA 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:The_promixal_part_of_left_subclavian_is_blocked_on_left_side_so_no_flow_in_vertebral_and_to_left_arm-blood_from_right_vertebral_enters_left_vertebral_and_flows_back_to_supply_left_arm_2013-07-05_17-11.jpg"
 }
},
{
 "id": "vk-faktory",
 "title": "Faktory závislé od vitamínu K (II, VII, IX, X)",
 "match": [],
 "csMatch": [
  "[Ff]aktor\\w*\\s+II,\\s*VII,\\s*IX\\s+a\\s+X",
  "II,\\s*VII,\\s*IX\\s+a\\s+X"
 ],
 "short": "Štyri koagulačné faktory, ktoré pečeň dokončí len s vitamínom K – a tie isté chýbajú pri warfaríne.",
 "body": "<ul><li><b>Faktor II</b> (protrombín) · <b>faktor VII</b> · <b>faktor IX</b> · <b>faktor X</b> – a brzdy proteín C a proteín S.</li><li>Vitamín K pridá na koniec ich molekuly karboxylovú skupinu (γ-karboxylácia); vďaka nej viažu Ca²⁺ a prichytia sa na doštičku.</li><li>Faktor VII má najkratší polčas – pri nedostatku vitamínu K preto prvý stúpne PT (INR).</li></ul>"
},
{
 "id": "ziskana-hemofilia",
 "et": "gr. <i>haima</i> „krv“ + <i>philia</i> „sklon“",
 "title": "Získaná hemofília (protilátky proti faktoru)",
 "match": [
  "získan\\w*\\s+hemofíli\\w*",
  "protilátk\\w*\\s+proti\\s+faktor\\w*"
 ],
 "short": "Krvácavý stav, pri ktorom si telo vytvorí autoprotilátky proti vlastnému koagulačnému faktoru – takmer vždy proti faktoru VIII.",
 "body": "<p class=\"chain\">zlyhá tolerancia → autoprotilátka (inhibítor) proti faktoru VIII → faktor sa vyradí → na doštičke sa nezloží tenáza → málo trombínu → rozsiahle krvácanie do kože a svalov</p><ul><li>Postihuje najmä starších ľudí a ženy po pôrode, ďalej pri autoimunitných chorobách a nádoroch; časť zostane bez príčiny.</li><li>Pacient predtým nikdy nekrvácal – na rozdiel od vrodenej hemofílie.</li><li>Laboratórne: predĺžený aPTT, ktorý sa po zmiešaní s normálnou plazmou neupraví (protilátka vyradí aj pridaný faktor).</li><li>Iná vec sú protilátky, ktoré si vytvorí hemofilik proti podávanému faktoru (aloprotilátky).</li></ul>"
},
{
 "id": "vicc",
 "et": "angl. venom-induced consumption coagulopathy",
 "title": "Koagulopatia z hadieho jedu",
 "match": [
  "hadi\\w*\\s+jed\\w*",
  "jed\\w*\\s+hadov"
 ],
 "short": "Jedy niektorých zmijí a austrálskych hadov obsahujú enzýmy, ktoré priamo aktivujú faktory zrážania – faktory sa spotrebujú a krv sa prestane zrážať.",
 "body": "<ul><li>Rôzne jedy aktivujú faktor X a V, protrombín, alebo samy pôsobia ako trombín na fibrinogén.</li><li>V skúmavke sa krv zrazí rýchlo, v tele vzniká nezrážanlivosť a krvácanie; ako test slúži, či sa krv zrazí do 20 minút.</li><li>Kedysi sa označovala ako DIC, dnes sa od nej odlišuje; účinnou liečbou je antisérum.</li></ul>"
},
{
 "id": "spazmus",
 "et": "gr. <i>spasmos</i> „kŕč“",
 "title": "Spazmus tepny (vazospazmus)",
 "match": [
  "spazm\\w*",
  "vazospazm\\w*",
  "vazospastick\\w*"
 ],
 "short": "Prechodné prudké stiahnutie hladkého svalu tepny, ktoré zúži alebo uzavrie priesvit.",
 "body": "<ul><li>Pri poškodenom endoteli chýba oxid dusnatý, ktorý sval uvoľňuje, a sval reaguje prehnane na sťahujúce podnety.</li><li>Spúšťače: fajčenie (najsilnejší rizikový činiteľ spazmu vencovitých tepien), kokaín a amfetamíny, chlad, stres.</li><li>Na reze po ňom neostane stopa – dokazuje sa počas angiografie.</li></ul>"
},
{
 "id": "pletora",
 "et": "gr. <i>plethore</i> „plnosť“",
 "title": "Pletora",
 "match": [
  "pletor\\w*"
 ],
 "short": "Plnokrvnosť – zvýšený objem krvi a počet erytrocytov, ktorý sa prejaví začervenanou až fialovou tvárou.",
 "body": "<ul><li>Pri polycytémii (primárnej aj sekundárnej pri chronickej hypoxii).</li><li>Hustejšia krv tečie pomalšie – sklon k trombóze.</li></ul>"
},
{
 "id": "nefriticky-syndrom",
 "et": "gr. <i>nephros</i> „oblička“ + <i>-itis</i> „zápal“",
 "title": "Nefritický syndróm",
 "match": [
  "nefritick\\w*\\s+syndróm\\w*"
 ],
 "short": "Obraz zápalu klbiek: krv a málo bielkoviny v moči, opuchy, vysoký tlak a pokles filtrácie.",
 "body": "<ul><li>Zápal poškodí kapiláry klbiek → erytrocyty prechádzajú do moču (hematúria), filtrácia klesá → obličky zadržiavajú soľ a vodu → opuchy a hypertenzia.</li><li>Odlišuje sa od nefrotického syndrómu, pri ktorom dominuje veľká strata bielkoviny.</li></ul>"
},
{
 "id": "transpozicia",
 "et": "lat. <i>transponere</i> „preložiť“",
 "title": "Transpozícia veľkých tepien",
 "match": [
  "transpozíci\\w*\\s+veľkých\\s+tepien"
 ],
 "short": "Vrodená chyba, pri ktorej aorta odstupuje z pravej a pľúcnica z ľavej komory – oba obehy idú vedľa seba ako dva oddelené okruhy.",
 "body": "<ul><li>Novorodenec prežije len vďaka spojke medzi nimi (otvorené foramen ovale, ductus arteriosus).</li><li>Cyanóza od narodenia; rieši sa operáciou v prvých dňoch.</li></ul>"
},
{
 "id": "gamna-gandy",
 "et": "podľa talianskeho lekára C. Gamnu a francúzskeho C. Gandyho",
 "title": "Gamnove–Gandyho telieska",
 "match": [
  "Gamnov\\w*[-–]Gandyho\\s+telies\\w*"
 ],
 "short": "Hnedé tuhé uzlíky v slezine z väziva prestúpeného železom a vápnikom – stopa po drobných krvácaniach pri dlhej venostáze.",
 "body": "<ul><li>Typické pre portálnu hypertenziu a chronickú venostázu sleziny.</li><li>Farbia sa na železo (Perls) aj vápnik.</li></ul>"
},
{
 "id": "heerfordt",
 "title": "Heerfordtov syndróm",
 "match": [
  "Heerfordtov\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Zvláštna podoba sarkoidózy: zápal dúhovky, zväčšené príušné žľazy, horúčka a obrna tvárového nervu.",
 "body": "<ul><li>Granulómy sarkoidózy postihnú oko, slinnú žľazu a nerv naraz.</li></ul>"
},
{
 "id": "kveim",
 "title": "Kveimov test",
 "match": [
  "Kveimov\\w*(?:\\s+test\\w*)?"
 ],
 "short": "Historický kožný test na sarkoidózu: vpich suspenzie zo sleziny chorého vyvolal po týždňoch v koži granulóm.",
 "body": "<ul><li>Dnes sa nepoužíva – materiál bol ľudského pôvodu a diagnózu nahradila biopsia a zobrazovanie.</li></ul>"
},
{
 "id": "bruceloza",
 "et": "podľa Davida Brucea, ktorý pôvodcu opísal",
 "title": "Brucelóza",
 "match": [
  "brucelóz\\w*",
  "brucel\\w*"
 ],
 "short": "Zoonóza z nepasterizovaného mlieka a kontaktu s dobytkom; baktérie (Brucella) žijú vnútri makrofágov.",
 "body": "<ul><li>Vlnitá horúčka, potenie, bolesti kĺbov, zväčšená slezina a pečeň.</li><li>V orgánoch drobné nekazeifikujúce granulómy.</li></ul>"
},
{
 "id": "donovanoza",
 "et": "podľa Charlesa Donovana",
 "title": "Donovanóza (granuloma inguinale)",
 "match": [
  "donovanóz\\w*",
  "granuloma\\s+inguinale"
 ],
 "short": "Pohlavne prenosná infekcia (Klebsiella granulomatis) s pomaly rastúcimi, nebolestivými, ľahko krvácajúcimi vredmi na genitáliách.",
 "body": "<ul><li>V makrofágoch sú drobné tyčinky – Donovanove telieska.</li><li>Vyskytuje sa v trópoch.</li></ul>"
},
{
 "id": "skrofuloderma",
 "et": "lat. <i>scrofa</i> „prasnica“ (zdurené uzliny) + gr. <i>derma</i> „koža“",
 "title": "Skrofuloderma",
 "match": [
  "skrofuloderm\\w*"
 ],
 "short": "Tuberkulóza kože, ktorá vznikne prerazením kazeózneho ložiska z uzliny alebo kosti na povrch – s píšťalami a jazvami.",
 "body": "<ul><li>Najčastejšie na krku nad tuberkuloznými uzlinami.</li></ul>"
},
{
 "id": "lupus-vulgaris",
 "et": "lat. <i>lupus</i> „vlk“ + <i>vulgaris</i> „obyčajný“",
 "title": "Lupus vulgaris",
 "match": [
  "lupus\\s+vulgaris"
 ],
 "short": "Chronická tuberkulóza kože u človeka s dobrou imunitou: červenohnedé ložiská, najmä na tvári, ktoré sa hoja jazvou.",
 "body": "<ul><li>Pri zatlačení sklíčkom majú farbu „jablkového rôsolu“.</li><li>Nemá nič spoločné so systémovým lupusom – zhodný je len latinský názov.</li></ul>"
},
{
 "id": "erythema-marginatum",
 "et": "gr. <i>erythema</i> „začervenanie“; lat. <i>marginatus</i> „s okrajom“",
 "title": "Erythema marginatum",
 "match": [
  "erythema\\s+marginatum"
 ],
 "short": "Nesvrbivá vyrážka s ružovým okrajom a bledým stredom na trupe – jedno z hlavných kritérií reumatickej horúčky.",
 "body": "<ul><li>Prstence sa menia v priebehu hodín.</li></ul>"
},
{
 "id": "chorea",
 "et": "gr. <i>choreia</i> „tanec“",
 "title": "Chorea (Sydenhamova)",
 "match": [
  "chore\\w*\\s+minor",
  "Sydenhamov\\w*\\s+chore\\w*",
  "chorea"
 ],
 "short": "Mimovoľné, nepravidelné, rýchle pohyby končatín a tváre; pri reumatickej horúčke (Sydenhamova chorea) z protilátok proti bazálnym gangliám.",
 "body": "<ul><li>Objaví sa s odstupom mesiacov po streptokokovej infekcii a sama odznie.</li></ul>"
},
{
 "id": "tabes",
 "et": "lat. <i>tabes</i> „chradnutie“; <i>dorsalis</i> „chrbtový“",
 "title": "Tabes dorsalis",
 "match": [
  "tabes\\s+dorsalis"
 ],
 "short": "Neskorá syfilis miechy: zánik zadných povrazcov a koreňov – porucha hlbokého citu, neistá chôdza, vystreľujúce bolesti.",
 "body": "<ul><li>Pacient nevie, kde má nohy, kým sa nepozerá; kĺby sa poškodia, lebo necíti bolesť (Charcotov kĺb).</li></ul>"
},
{
 "id": "progresivna-paralyza",
 "title": "Progresívna paralýza",
 "match": [
  "progresívn\\w*\\s+paralýz\\w*"
 ],
 "short": "Neskorá syfilis mozgu: treponémy v mozgovej kôre spôsobia demenciu, zmeny osobnosti a ochrnutia.",
 "body": "<ul><li>Mozog je zmenšený (atrofia kôry), v tkanive sú treponémy.</li></ul>"
},
{
 "id": "argyll-robertson",
 "title": "Argyll Robertsonove zreničky",
 "match": [
  "Argyll\\w*\\s+Robertson\\w*(?:\\s+zreni\\w*)?"
 ],
 "short": "Malé zreničky, ktoré sa nezúžia na svetlo, ale zúžia sa pri pohľade na blízko – typický znak neurosyfilisu.",
 "body": "<ul><li>Poškodená je dráha reflexu na svetlo, dráha akomodácie ostáva.</li></ul>"
},
{
 "id": "hutchinson",
 "title": "Hutchinsonova trias",
 "match": [
  "Hutchinsonov\\w*\\s+tri\\w+"
 ],
 "short": "Tri znaky vrodenej syfilis: zúbkované rezáky, zápal rohovky a hluchota.",
 "body": "<ul><li>Treponémy postihnú plod a poškodia vyvíjajúce sa zuby, oko a vnútorné ucho.</li></ul>"
},
{
 "id": "curschmann",
 "title": "Curschmannova choroba („cukrová poleva“ pečene a sleziny)",
 "match": [
  "Curschmannov\\w*(?:\\s+chorob\\w*)?"
 ],
 "short": "Hrubé biele zhyalinizované väzivo na povrchu sleziny alebo pečene, ktoré pripomína cukrovú polevu.",
 "body": "<ul><li>Zvyšok po chronickom zápale pobrušnice alebo po dlhodobom výpotku.</li></ul>"
},
{
 "id": "mekoniovy-ileus",
 "et": "gr. <i>mekonion</i> „makovica, makový sok“; <i>eileos</i> „zvrat, zápcha“",
 "title": "Mekóniový ileus",
 "match": [
  "mekóniov\\w*\\s+ileus\\w*"
 ],
 "short": "Upchatie čreva novorodenca hustým, lepkavým prvým stolicou (mekóniom) – často prvý prejav cystickej fibrózy.",
 "body": "<ul><li>Chyba chloridového kanála CFTR → hlien a črevný obsah sú husté.</li></ul>"
},
{
 "id": "ganglion",
 "et": "gr. <i>ganglion</i> „uzlík pod kožou“",
 "title": "Ganglion (synoviálna cysta)",
 "match": [
  "ganglion"
 ],
 "short": "Cysta vyplnená hustým rôsolom pri kĺbe alebo šľache, najčastejšie na chrbte zápästia.",
 "body": "<ul><li>Vzniká hlienovou premenou väziva puzdra; nemá pravú výstelku.</li><li>Pozor: v neurológii sa „ganglion“ volá aj nervová uzlina.</li></ul>"
},
{
 "id": "makroglosia",
 "et": "gr. <i>makros</i> „veľký“ + <i>glossa</i> „jazyk“",
 "title": "Makroglosia",
 "match": [
  "makrogloss?i\\w*"
 ],
 "short": "Zväčšený jazyk – pri amyloidóze (amyloid medzi svalovými vláknami), hypotyreóze, akromegálii či vrodených syndrómoch.",
 "body": "<ul><li>Pri AL amyloidóze má jazyk na okrajoch odtlačky zubov.</li></ul>"
},
{
 "id": "addison",
 "title": "Addisonova choroba",
 "match": [
  "Addisonov\\w*\\s+chorob\\w*"
 ],
 "short": "Primárne zlyhanie kôry nadobličiek: chýba kortizol aj aldosterón.",
 "body": "<p class=\"chain\">zničená kôra (autoimunita, kedysi tuberkulóza) → ↓ kortizol → hypofýza tvorí viac ACTH a z rovnakého prekurzora aj MSH → <b>hnedá pigmentácia</b> kože a slizníc</p><ul><li>Únava, nízky tlak, hyponatriémia, hyperkaliémia; hrozí addisonská kríza.</li></ul>"
},
{
 "id": "vitiligo",
 "et": "lat. <i>vitiligo</i> „vyrážka, škvrna“",
 "title": "Vitiligo",
 "match": [
  "vitilig\\w*"
 ],
 "short": "Biele ostro ohraničené škvrny na koži, kde imunitný systém zničil melanocyty.",
 "body": "<ul><li>Častejšie pri iných autoimunitných chorobách (štítna žľaza, diabetes 1. typu).</li></ul>"
},
{
 "id": "ochronoza",
 "et": "gr. <i>ochros</i> „žltohnedý“ + <i>-osis</i> „stav, proces“",
 "title": "Ochronóza",
 "match": [
  "ochronóz\\w*"
 ],
 "short": "Tmavomodré až čierne sfarbenie chrupiek a väziva pri alkaptonúrii – hromadí sa v nich pigment z kyseliny homogentízovej.",
 "body": "<ul><li>Chýba enzým na rozklad kyseliny homogentízovej; moč na vzduchu stmavne.</li><li>Poškodené chrupky → artróza chrbtice a veľkých kĺbov.</li></ul>"
},
{
 "id": "albinizmus",
 "et": "lat. <i>albus</i> „biely“",
 "title": "Albinizmus",
 "match": [
  "albinizm\\w*",
  "albín\\w*"
 ],
 "short": "Vrodená porucha tvorby melanínu (najčastejšie chyba tyrozinázy): biela koža a vlasy, svetlé oči.",
 "body": "<ul><li>Melanocytov je normálny počet, ale netvoria pigment.</li><li>Koža je bez ochrany pred UV – vyššie riziko rakoviny kože; slabší zrak.</li></ul>"
},
{
 "id": "gilbert",
 "title": "Gilbertov syndróm",
 "match": [
  "Gilbertov\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Častá neškodná dedičná porucha: pečeň pomalšie konjuguje bilirubín, ktorý pri hladovaní alebo strese mierne stúpne.",
 "body": "<ul><li>Znížená aktivita enzýmu UGT1A1.</li><li>Ľahká žltačka bez iných príznakov; netreba liečiť.</li></ul>"
},
{
 "id": "antrakoza",
 "et": "gr. <i>anthrax</i> „uhlie“ + <i>-osis</i>",
 "title": "Antrakóza",
 "match": [
  "antrakóz\\w*",
  "antrakotick\\w*"
 ],
 "short": "Uloženie vdýchnutých uhlíkových čiastočiek v pľúcach a uzlinách – čierne škvrny a čierne uzliny u mestských ľudí a fajčiarov.",
 "body": "<ul><li>Makrofágy čiastočky pohltia a odnesú do lymfatických ciest; samy o sebe neškodia.</li><li>Pri masívnej expozícii (baníci) vzniká pneumokonióza s fibrózou.</li></ul>"
},
{
 "id": "argyria",
 "et": "gr. <i>argyros</i> „striebro“",
 "title": "Argyria",
 "match": [
  "argyri\\w*",
  "argýri\\w*"
 ],
 "short": "Sivomodré trvalé sfarbenie kože zo striebra, ktoré sa uložilo v tkanive po dlhom užívaní alebo kontakte.",
 "body": "<ul><li>Striebro sa viaže v bazálnych membránach a na svetle tmavne.</li></ul>"
},
{
 "id": "psamomove-telieska",
 "et": "gr. <i>psammos</i> „piesok“ + <i>-oma</i> „nádor, útvar“",
 "title": "Psamómové telieska",
 "match": [
  "psamómov\\w*\\s+telies\\w*",
  "psamóm\\w*"
 ],
 "short": "Drobné okrúhle vrstvené zvápenatené telieska v niektorých nádoroch (papilárny karcinóm štítnej žľazy, serózny karcinóm vaječníka, meningeóm).",
 "body": "<ul><li>Vznikajú dystrofickou kalcifikáciou odumretých nádorových buniek na špičkách papíl.</li><li>Pre patológa dôležitá stopa k typu nádoru.</li></ul>"
},
{
 "id": "riedel",
 "title": "Riedelova tyreoiditída",
 "match": [
  "Riedelov\\w*(?:\\s+tyreoiditíd\\w*)?"
 ],
 "short": "Zriedkavá chronická fibrotizujúca tyreoiditída: štítnu žľazu nahradí kamenne tuhé väzivo, ktoré prerastá aj do okolia.",
 "body": "<ul><li>Dnes sa radí k chorobe asociovanej s IgG4.</li><li>Napodobní nádor – tlačí na priedušnicu a pažerák.</li></ul>"
},
{
 "id": "angioedem",
 "et": "gr. <i>angeion</i> „cieva“ + <i>oidema</i> „opuch“",
 "title": "Angioedém",
 "match": [
  "angioedém\\w*"
 ],
 "short": "Náhly opuch hlbších vrstiev kože a slizníc (pery, viečka, jazyk, hrtan) zo zvýšenej priepustnosti ciev.",
 "body": "<ul><li><b>Histamínový</b> (alergia, so žihľavkou) – pomôžu antihistaminiká a adrenalín.</li><li><b>Bradykinínový</b> (dedičný nedostatok inhibítora C1, ACE-inhibítory) – bez žihľavky, antihistaminiká nepomôžu.</li><li>Opuch hrtana ohrozuje život.</li></ul>"
},
{
 "id": "folikulitida",
 "et": "lat. <i>folliculus</i> „mešček“ + <i>-itis</i> „zápal“",
 "title": "Folikulitída",
 "match": [
  "folikulitíd\\w*"
 ],
 "short": "Povrchový hnisavý zápal vlasového folikulu – pupienok s chĺpkom v strede, najčastejšie zo stafylokoka.",
 "body": "<ul><li>Keď zápal prenikne hlbšie do okolia folikulu, vzniká furunkul; viac splývajúcich je karbunkul.</li></ul>"
},
{
 "id": "noma",
 "et": "gr. <i>nome</i> „rozožieranie“",
 "title": "Noma (cancrum oris)",
 "match": [
  "noma"
 ],
 "short": "Rýchlo postupujúca gangréna ústnej dutiny a tváre u podvyživených detí v chudobných oblastiach.",
 "body": "<ul><li>Zmiešaná anaeróbna infekcia pri oslabenej imunite (podvýživa, osýpky).</li><li>Bez liečby vysoká úmrtnosť, prežívajúcich znetvorí.</li></ul>"
}
);

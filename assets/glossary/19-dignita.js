/* Glosár PATOLY — dignita, invázia, metastázy, grading, staging, dôsledky nádorov (kap. 11, 29. 10. 2026).
   SÚBOR JE GENEROVANÝ: py pracovne/_pomocne/gen_dignita.py. Texty sú vlastné (CLAUDE.md §4.1), fakty z pracovne/11_fakty.md. */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
 "id": "dignita",
 "et": "lat. <i>dignitas</i> „hodnota, povaha“",
 "title": "Dignita nádoru",
 "match": [
  "dignit\\w*"
 ],
 "short": "Biologická povaha nádoru – či je benígny (nezhubný), intermediárny alebo malígny (zhubný).",
 "body": "<ul><li>Určuje sa z tkaniva: z diferenciácie buniek, z toho, či nádor okolie odtláča alebo prerastá, a z metastáz.</li><li>Jediný úplne spoľahlivý znak malignity je metastáza.</li><li>Podľa dignity sa volí rozsah operácie a ďalšia liečba.</li></ul>",
 "kde": "11_nadory_dignita#sec-11-5"
},
{
 "id": "benigny-nador",
 "et": "lat. <i>bene</i> „dobre“ + <i>genus</i> „rod, pôvod“",
 "title": "Benígny (nezhubný) nádor",
 "match": [
  "benígn\\w*",
  "nezhubn\\w*"
 ],
 "short": "Nádor, ktorý rastie len na mieste vzniku, okolie odtláča a nemetastázuje.",
 "body": "<ul><li>Bunky verne napodobňujú tkanivo pôvodu, mitóz je málo.</li><li>Okolie pod tlakom atrofuje a vytvorí okolo nádoru pseudopuzdro – chirurg ho vylúpne.</li><li>Aj benígny nádor môže zabiť polohou (v lebke) alebo hormónom (inzulinóm).</li></ul>",
 "img": {
  "src": "assets/images/fibroadenoma-gross.jpg",
  "alt": "Fibroadenóm prsníka – ostro ohraničený benígny nádor.",
  "caption": "Fibroadenóm prsníka – ostro ohraničený benígny nádor.",
  "credit": "Netha Hussain · CC BY-SA 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:FibroAdenoma_of_the_breast.JPG"
 },
 "kde": "11_nadory_dignita#sub-11-5-1"
},
{
 "id": "maligny-nador",
 "et": "lat. <i>malignus</i>, z <i>malum</i> „zlo“",
 "title": "Malígny (zhubný) nádor",
 "match": [
  "malígn\\w*",
  "zhubn\\w*"
 ],
 "short": "Nádor, ktorý prerastá do okolia, ničí ho a môže metastázovať.",
 "body": "<ul><li>Bunky strácajú podobnosť s tkanivom pôvodu (atypia, anaplázia).</li><li>Nemá puzdro alebo ho prerastá; po neúplnom odstránení recidivuje.</li><li>Pri zhubnom nádore sa určuje stupeň (grade) a rozsah (stage).</li></ul>",
 "img": {
  "src": "assets/images/idc-breast-gross.jpg",
  "alt": "Invazívny karcinóm prsníka prerastá výbežkami do tuku.",
  "caption": "Invazívny karcinóm prsníka prerastá výbežkami do tuku.",
  "credit": "Ed Uthman, MD · Public domain",
  "href": "https://commons.wikimedia.org/wiki/File:Infiltrating_ductal_carcinoma_of_the_breast.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-5-1"
},
{
 "id": "anaplazia",
 "et": "gr. <i>ana</i> „späť“ + <i>plasis</i> „tvorenie“",
 "title": "Anaplázia",
 "match": [
  "anapláz\\w*",
  "anaplastick\\w*"
 ],
 "short": "Úplná alebo takmer úplná strata diferenciácie – nádorové bunky už nepripomínajú tkanivo, z ktorého vyrástli.",
 "body": "<ul><li>Bunky a jadrá sú rôzne veľké, bizarné, veľa je atypických mitóz.</li><li>Pôvod nádoru sa dá často určiť len imunohistochémiou.</li><li>Anaplastické nádory rastú rýchlo a sú najagresívnejšie.</li></ul>",
 "img": {
  "src": "assets/images/anaplasia-urothelial.jpg",
  "alt": "Anaplastické bunky uroteliálneho karcinómu.",
  "caption": "Anaplastické bunky uroteliálneho karcinómu.",
  "credit": "CoRus13 · CC0",
  "href": "https://commons.wikimedia.org/wiki/File:Urothelial_carcinoma_with_marked_pleomorphism,_high_mag.1.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-2-1"
},
{
 "id": "dediferenciacia",
 "et": "lat. <i>de-</i> „od, preč“ + diferenciácia",
 "title": "Dediferenciácia",
 "match": [
  "dediferenci\\w*"
 ],
 "short": "Strata znakov zrelej bunky; v nádoroch sa tak tradične vysvetľoval nezrelý vzhľad.",
 "body": "<ul><li>Dnes sa nezrelý vzhľad väčšinou vysvetľuje zastaveným dozrievaním potomkov nádorovej kmeňovej bunky.</li><li>Skutočný prechod z dobre do slabo diferencovanej podoby sa pozoruje napríklad pri dediferencovanom liposarkóme.</li><li>Schopnosť meniť stupeň diferenciácie (plasticita) patrí medzi znaky nádoru.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-4"
},
{
 "id": "nadorove-kmenove-bunky",
 "title": "Nádorové kmeňové bunky",
 "match": [
  "nádorov\\w*\\s+kmeňov\\w*\\s+bunk\\w*"
 ],
 "short": "Malá populácia buniek nádoru, ktorá sa sama obnovuje a dáva vznik ostatným, viac či menej dozretým nádorovým bunkám.",
 "body": "<p class=\"chain\">mutácia v kmeňovej bunke → potomkovia nedozrejú do konca → nádor vyzerá nezrelo</p><ul><li>Delia sa zriedka a dobre opravujú DNA – chemoterapiu a ožarovanie prežívajú.</li><li>Z nich sa nádor po zdanlivo úspešnej liečbe vracia.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-4"
},
{
 "id": "fenotypova-plasticita",
 "title": "Fenotypová plasticita",
 "match": [
  "fenotypov\\w*\\s+plasticit\\w*"
 ],
 "short": "Schopnosť nádorovej bunky zmeniť smer alebo stupeň svojej diferenciácie – napríklad vrátiť sa do nezrelého stavu.",
 "body": "<ul><li>Od roku 2022 je zaradená medzi znaky nádoru.</li><li>Prispieva k tomu, že nádor unikne liečbe zameranej na jeden typ buniek.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-4"
},
{
 "id": "pleomorfia",
 "et": "gr. <i>pleón</i> „viac“ + <i>morfé</i> „tvar“",
 "title": "Pleomorfia (anizocytóza)",
 "match": [
  "pleomorf\\w*",
  "anizocytóz\\w*"
 ],
 "short": "Rôzna veľkosť a tvar buniek a jadier v nádore – strata ich rovnakosti.",
 "body": "<p class=\"chain\">nestabilita genómu → bunky s rôznym počtom chromozómov → rôzne veľké bunky a jadrá</p><ul><li>Je súčasťou atypie; v karcinóme prsníka sa hodnotí v Nottinghamskom systéme 1–3 bodmi.</li><li>Najvýraznejšia je v anaplastických nádoroch (obrovské, bizarné bunky).</li></ul>",
 "img": {
  "src": "assets/images/idc-pleomorphism-3.jpg",
  "alt": "Výrazná pleomorfia jadier v karcinóme prsníka.",
  "caption": "Výrazná pleomorfia jadier v karcinóme prsníka.",
  "credit": "Mikael Häggström, M.D. · CC0",
  "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_invasive_ductal_carcinoma_with_high_nuclear_pleomorphism_(3_points).jpg"
 },
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "anizonukleoza",
 "et": "gr. <i>anisos</i> „nerovnaký“ + lat. <i>nucleus</i> „jadro“",
 "title": "Anizonukleóza",
 "match": [
  "anizonukleóz\\w*",
  "anizonukleolóz\\w*"
 ],
 "short": "Jadrá nádorových buniek sú rôzne veľké a tvarovo nerovnaké; pri anizonukleolóze to isté platí pre jadierka.",
 "body": "<ul><li>Vzniká z nerovnomerného rozdelenia chromozómov pri atypických mitózach.</li><li>Je jedným z cytologických znakov atypie.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "strata-polarity",
 "title": "Strata polarity",
 "match": [
  "strat\\w*\\s+polarit\\w*"
 ],
 "short": "Jadrá epitelových buniek neležia pravidelne pri bazálnej membráne, ale v bunke náhodne.",
 "body": "<ul><li>Polohu jadra v normálnom epiteli udržiavajú adhézne molekuly; v nádore sú chybné.</li><li>Je znakom atypie v dysplázii aj v karcinóme.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "pomer-jadro-cytoplazma",
 "title": "Pomer jadro/cytoplazma",
 "match": [
  "pomer\\w*\\s+jadro\\s*/\\s*cytoplazm\\w*"
 ],
 "short": "Pomer plochy jadra k ploche cytoplazmy; v nádorových bunkách je zvýšený – jadro zaberá veľkú časť bunky.",
 "body": "<ul><li>Pri najmenej diferencovaných nádoroch ostane okolo jadra len tenký lem cytoplazmy („malé modré bunky“).</li><li>Hodnotí sa najmä v cytológii.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "atypicka-mitoza",
 "title": "Atypická mitóza",
 "match": [
  "atypick\\w*\\s+mitóz\\w*"
 ],
 "short": "Abnormálne delenie bunky – troj-, štvor- alebo viacpólové či nesúmerné; chromozómy sa rozdelia nerovnomerne.",
 "body": "<ul><li>Je charakteristickým znakom zhubného nádoru – typické mitózy sú aj v normálnom tkanive.</li><li>Z nej vznikajú bunky s nesprávnym počtom chromozómov (aneuploidia).</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "aneuploidia",
 "et": "gr. <i>an-</i> „ne“ + <i>eu</i> „dobre“ + <i>ploos</i> „-násobný“",
 "title": "Aneuploidia",
 "match": [
  "aneuploid\\w*"
 ],
 "short": "Nesprávny počet chromozómov v bunke – chromozóm navyše alebo chýbajúci.",
 "body": "<p class=\"chain\">chybné deliace vretienko (atypická mitóza) → chromozómy sa rozdelia nerovnomerne → bunky s rôznym počtom chromozómov</p><ul><li>Je častá v zhubných nádoroch a zväčšuje ich genetickú rôznorodosť.</li><li>Meria sa cytometriou DNA alebo analýzou chromozómov.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-2"
},
{
 "id": "aberantny-fenotyp",
 "et": "lat. <i>aberrare</i> „zablúdiť, odchýliť sa“",
 "title": "Aberantný fenotyp",
 "match": [
  "aberantn\\w*\\s+fenotyp\\w*"
 ],
 "short": "Nádorová bunka vystaví bielkovinu, ktorú jej normálny náprotivok nemá alebo nemá v takom množstve.",
 "body": "<ul><li>Príklad: nadbytok bielkoviny BCL2 vo folikulovom lymfóme po presune génu <i>BCL2</i> k génu imunoglobulínu.</li><li>Imunohistochémia ho využíva na odlíšenie nádoru od reaktívnej zmeny.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-3"
},
{
 "id": "nadorovy-marker",
 "title": "Nádorový marker",
 "match": [
  "nádorov\\w*\\s+marker\\w*"
 ],
 "short": "Látka tvorená nádorom, ktorú možno merať v krvi, moči alebo likvore (PSA, AFP, CEA, CA 125, hCG).",
 "body": "<ul><li>Nádor <b>nediagnostikuje</b> – tvoria ho aj normálne bunky a stúpa aj pri zápale.</li><li>Slúži na sledovanie liečby a včasné odhalenie recidívy.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-3"
},
{
 "id": "psa",
 "title": "PSA – prostatický špecifický antigén",
 "match": [
  "PSA"
 ],
 "short": "Bielkovina tvorená epitelom prostaty; v sére stúpa pri karcinóme prostaty, ale aj pri hyperplázii a zápale prostaty.",
 "body": "<ul><li>Používa sa na sledovanie karcinómu prostaty po liečbe.</li><li>Samotné zvýšenie nie je diagnóza – rozhodne biopsia.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-2-3",
 "cs": true
},
{
 "id": "expanzivny-rast",
 "title": "Expanzívny rast",
 "match": [
  "expanzívn\\w*(?:\\s+rast\\w*)?"
 ],
 "short": "Rast, pri ktorom nádor okolie odtláča a neprerastá do neho – typický pre benígne nádory.",
 "body": "<p class=\"chain\">pomalý rast nádoru → tlak na okolie → tlaková atrofia a zhustenie väziva → pseudopuzdro → ostré ohraničenie</p><ul><li>Nádor je pohyblivý a dá sa vylúpnuť.</li><li>Chýbanie puzdra ešte neznamená malignitu (leiomyóm maternice).</li></ul>",
 "kde": "11_nadory_dignita#sub-11-3-1"
},
{
 "id": "pseudopuzdro",
 "et": "gr. <i>pseudés</i> „klamný“ + puzdro",
 "title": "Pseudopuzdro",
 "match": [
  "pseudopuzdr\\w*"
 ],
 "short": "Väzivový lem okolo benígneho nádoru; netvorí ho nádor, ale stlačená stróma okolitého tkaniva.",
 "body": "<ul><li>Pri leiomyóme maternice je to len pásik stlačenej svaloviny.</li><li>Zhubný nádor vzniknutý v opúzdrenom adenóme puzdro prerastá – to je znak malignity.</li></ul>",
 "img": {
  "src": "assets/images/leiomyoma-uterus-gross.jpg",
  "alt": "Leiomyóm maternice ohraničený stlačeným myometriom.",
  "caption": "Leiomyóm maternice ohraničený stlačeným myometriom.",
  "credit": "Ed Uthman, MD · Public domain",
  "href": "https://commons.wikimedia.org/wiki/File:Leiomyoma_of_the_Uterus.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-3-1"
},
{
 "id": "invazia-nadoru",
 "title": "Invázia nádoru",
 "match": [
  "invázi\\w*(?:\\s+nádor\\w*)?",
  "invazívn\\w*",
  "infiltratívn\\w*\\s+rast\\w*"
 ],
 "short": "Prerastanie nádorových buniek do okolitého tkaniva cez jeho bariéry – základná vlastnosť zhubného nádoru.",
 "body": "<p class=\"chain\">↓ E-kadherín → bunky sa uvoľnia → integríny ich prichytia k matrixu → metaloproteinázy rozložia bazálnu membránu → pohyb do strómy</p><ul><li>Invazívny rast okolie ničí a nahrádza, infiltratívny preniká medzi pôvodné štruktúry.</li><li>Infiltrácia siaha za viditeľnú hranicu – preto sa nádor odstraňuje so širokým lemom.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-3-2"
},
{
 "id": "bazalna-membrana",
 "et": "gr. <i>basis</i> „základ“ + lat. <i>membrana</i> „blana“",
 "title": "Bazálna membrána",
 "match": [
  "bazáln\\w*\\s+membrán\\w*"
 ],
 "short": "Tenká vrstva matrixu (kolagén IV, laminín) pod epitelom a okolo ciev; oddeľuje epitel od strómy.",
 "body": "<ul><li>V epiteli nie sú cievy – kým nádor bazálnu membránu neprerazí (carcinoma in situ), nemetastázuje.</li><li>Rozkladajú ju matrixové metaloproteinázy (kolagenáza IV).</li></ul>",
 "kde": "11_nadory_dignita#sub-11-3-2"
},
{
 "id": "emt",
 "title": "Epitelovo-mezenchýmový prechod (EMT)",
 "match": [
  "epitelovo-mezenchýmov\\w*\\s+prechod\\w*",
  "EMT"
 ],
 "short": "Program, v ktorom epitelová bunka stratí väzby a polaritu a získa vlastnosti pohyblivej mezenchýmovej bunky.",
 "body": "<p class=\"chain\">transkripčné faktory (SNAI, TWIST, ZEB) → ↓ E-kadherín, ↑ znaky mezenchýmu → bunka je vretenovitá a pohyblivá → invázia</p><ul><li>Býva neúplný – bunky sú „napoly“ epitelové.</li><li>Na novom mieste sa bunky vracajú k epitelovej podobe (mezenchýmovo-epitelový prechod).</li></ul>",
 "kde": "11_nadory_dignita#sub-11-3-3"
},
{
 "id": "met-prechod",
 "title": "Mezenchýmovo-epitelový prechod",
 "match": [
  "mezenchýmovo-epitelov\\w*\\s+prechod\\w*"
 ],
 "short": "Návrat buniek, ktoré prešli EMT, k epitelovej podobe – v metastáze znova tvoria žľazky a súdržné útvary.",
 "body": "<ul><li>Vysvetľuje, prečo metastáza karcinómu často pripomína primárny nádor.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-3-3"
},
{
 "id": "perineuralna-invazia",
 "title": "Perineurálna invázia (Pn)",
 "match": [
  "perineuráln\\w*\\s+invázi\\w*"
 ],
 "short": "Prerastanie nádorových buniek do obalu nervov a pozdĺž nich.",
 "body": "<ul><li>Typická pre karcinóm prostaty, pankreasu, hlavy a krku a kolorekta.</li><li>Vysvetľuje bolesť a vyššie riziko recidívy; v správe sa uvádza ako Pn1.</li></ul>",
 "img": {
  "src": "assets/images/perineural-invasion-prostate.jpg",
  "alt": "Adenokarcinóm prostaty obkolesuje nerv.",
  "caption": "Adenokarcinóm prostaty obkolesuje nerv.",
  "credit": "Mikael Häggström, M.D. · CC0",
  "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_prostatic_adenocarcinoma_with_circumferential_perineural_invasion.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-3-4"
},
{
 "id": "vaskularna-invazia",
 "title": "Invázia do ciev (L, V)",
 "match": [
  "vaskulárn\\w*\\s+invázi\\w*",
  "angioinvazivit\\w*",
  "lymfovaskulárn\\w*\\s+invázi\\w*"
 ],
 "short": "Nádorové bunky v priesvite lymfatických ciev (L1) alebo žíl (V1) – krok tesne pred metastázou.",
 "body": "<ul><li>Lymfatické cievy majú tenkú stenu – nádor do nich prerastá najľahšie.</li><li>Tepny invázii dlho odolávajú.</li><li>Patológ ju uvádza v každej správe o zhubnom nádore.</li></ul>",
 "img": {
  "src": "assets/images/lymphatic-invasion-crc.jpg",
  "alt": "Skupina nádorových buniek v lymfatickej cieve.",
  "caption": "Skupina nádorových buniek v lymfatickej cieve.",
  "credit": "Mikael Häggström, M.D. · CC0",
  "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_colorectal_adenocarcinoma_with_lymphatic_invasion.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-3-4"
},
{
 "id": "nadorovy-trombus",
 "title": "Nádorový trombus",
 "match": [
  "nádorov\\w*\\s+tromb\\w*"
 ],
 "short": "Nádor, ktorý prerástol do žily a rastie v jej priesvite ako trombus.",
 "body": "<ul><li>Typicky karcinóm obličky v <i>v. renalis</i> a <i>v. cava inferior</i>.</li><li>Z neho sa môžu uvoľňovať nádorové emboly.</li></ul>",
 "img": {
  "src": "assets/images/renal-tumor-thrombus.jpg",
  "alt": "Nádorový trombus odstránený z dolnej dutej žily.",
  "caption": "Nádorový trombus odstránený z dolnej dutej žily.",
  "credit": "Medkatz · CC BY-SA 4.0",
  "href": "https://commons.wikimedia.org/wiki/File:Large_left_renal_tumor_with_tumor_thrombus_all_the_way_to_the_heart.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-3-4"
},
{
 "id": "metastaticka-kaskada",
 "title": "Metastatická kaskáda",
 "match": [
  "metastatick\\w*\\s+kaskád\\w*"
 ],
 "short": "Reťaz krokov, ktorými musí nádorová bunka prejsť, aby založila metastázu.",
 "body": "<p class=\"chain\">invázia → intravazácia → prežitie v krvi → zachytenie → extravazácia → kolonizácia</p><ul><li>V každom kroku väčšina buniek zahynie.</li><li>Kolonizácia cudzieho orgánu je najťažší krok.</li></ul>",
 "img": {
  "src": "chapters/fig/fig-metastaza-kaskada.svg",
  "alt": "Metastatická kaskáda v šiestich krokoch.",
  "caption": "Metastatická kaskáda v šiestich krokoch.",
  "credit": "vlastná schéma · CC BY-NC-SA 4.0"
 },
 "kde": "11_nadory_dignita#sub-11-4-1"
},
{
 "id": "intravazacia",
 "et": "lat. <i>intra</i> „dnu“ + <i>vas</i> „cieva“",
 "title": "Intravazácia",
 "match": [
  "intravazáci\\w*"
 ],
 "short": "Prienik nádorovej bunky cez stenu cievy do krvi alebo lymfy.",
 "body": "<ul><li>Najľahšia je do lymfatických kapilár a do novotvorených ciev nádoru bez pericytov a súvislej bazálnej membrány.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-4-1"
},
{
 "id": "nk-bunky",
 "et": "angl. <i>natural killer</i>",
 "title": "NK bunky (prirodzení zabíjači)",
 "match": [
  "NK\\s+bunk\\w*"
 ],
 "short": "Lymfocyty vrodenej imunity, ktoré zabíjajú bunky bez predchádzajúcej senzibilizácie – aj nádorové bunky v krvi.",
 "body": "<ul><li>Rozpoznajú bunky, ktoré stratili molekuly MHC I. triedy.</li><li>Nádorové bunky pred nimi chránia trombocyty, ktoré ich obalia.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-4-1"
},
{
 "id": "lymfogenna-metastaza",
 "title": "Lymfogénne šírenie (metastáza)",
 "match": [
  "lymfogénn\\w*"
 ],
 "short": "Šírenie nádoru lymfatickými cievami do spádovej uzliny a ďalej.",
 "body": "<ul><li>Typické pre karcinómy; bunky sa usadia najprv v podpuzdrovom (subkapsulárnom) sínuse uzliny.</li><li>Prvá uzlina v odtoku je sentinelová.</li></ul>",
 "img": {
  "src": "assets/images/ln-metastasis-crc.jpg",
  "alt": "Metastáza adenokarcinómu čreva v lymfatickej uzline.",
  "caption": "Metastáza adenokarcinómu čreva v lymfatickej uzline.",
  "credit": "Nephron · CC BY-SA 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:Colorectal_carcinoma_lymph_node_metastasis_--_low_mag.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-4-2"
},
{
 "id": "hematogenna-metastaza",
 "title": "Hematogénne šírenie",
 "match": [
  "hematogénn\\w*"
 ],
 "short": "Šírenie krvou – nádorových buniek (hematogénne metastázy) aj mikróbov (napríklad pri tuberkulóze); zachytia sa v prvej kapilárnej sieti po prúde.",
 "body": "<ul><li>Z povodia <i>v. cava</i> do pľúc, z povodia <i>v. portae</i> do pečene.</li><li>Typické pre sarkómy a karcinómy, ktoré vrastajú do žíl.</li></ul>",
 "img": {
  "src": "assets/images/liver-metastases-gross.jpg",
  "alt": "Viacpočetné metastázy v pečeni.",
  "caption": "Viacpočetné metastázy v pečeni.",
  "credit": "Haymanj · Public domain",
  "href": "https://commons.wikimedia.org/wiki/File:Secondary_tumor_deposits_in_the_liver_from_a_primary_cancer_of_the_pancreas.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-4-2"
},
{
 "id": "karcinoza",
 "title": "Karcinóza (karcinomatóza)",
 "match": [
  "karcinóz\\w*",
  "karcinomatóz\\w*"
 ],
 "short": "Rozsev nádoru po seróznej blane – stovky drobných belavých uzlíkov na pobrušnici alebo pohrudnici.",
 "body": "<ul><li>Blana odpovedá výpotkom, často krvavým; v jeho cytológii sa nájdu nádorové bunky.</li><li>Typická pri karcinóme vaječníka, žalúdka, pankreasu a hrubého čreva.</li></ul>",
 "img": {
  "src": "assets/images/peritoneal-carcinomatosis.jpg",
  "alt": "Karcinóza pobrušnice pri karcinóme žalúdka.",
  "caption": "Karcinóza pobrušnice pri karcinóme žalúdka.",
  "credit": "Kiran K. Turaga, T. Clark Gamblin, and Sam Pappas · CC BY 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:Intestines_with_peritoneal_carcinomatosis_from_gastric_cancer.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-4-2"
},
{
 "id": "sentinelova-uzlina",
 "et": "angl. <i>sentinel</i> „stráž“",
 "title": "Sentinelová (strážna) uzlina",
 "match": [
  "sentinelov\\w*(?:\\s+uzlin\\w*)?",
  "strážn\\w*\\s+uzlin\\w*"
 ],
 "short": "Prvá lymfatická uzlina v odtoku lymfy z nádoru.",
 "body": "<ul><li>Nájde sa modrým farbivom alebo technéciom a gama sondou.</li><li>Ak je bez metastázy, ďalšie uzliny sú takmer isto tiež – ušetrí sa rozsiahla operácia.</li><li>Výsledok: makrometastáza, mikrometastáza alebo izolované nádorové bunky.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-4-2"
},
{
 "id": "krukenbergov-nador",
 "title": "Krukenbergov nádor",
 "match": [
  "Krukenbergov\\w*\\s+nádor\\w*"
 ],
 "short": "Obojstranná metastáza hlienotvorného karcinómu z buniek pečatného prsteňa do vaječníkov.",
 "body": "<ul><li>Asi 70 % pochádza zo žalúdka, ďalšie hlavne z hrubého čreva.</li><li>F. Krukenberg ho opísal ako primárny nádor vaječníka.</li></ul>",
 "img": {
  "src": "assets/images/krukenberg-tumor.jpg",
  "alt": "Krukenbergov nádor – makroskopicky a v H&E.",
  "caption": "Krukenbergov nádor – makroskopicky a v H&E.",
  "credit": "Nakamura, Yoshiaki; Hiramatsu, Ayako; Koyama, Takafumi; Oyama, Yu; Tanaka, Ayuko; Honma, Koichi · CC BY 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:Gross_pathology_and_histopathology_of_signet_ring_cell_carcinoma_metastasis_to_the_ovary.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-4-2"
},
{
 "id": "selektivne-metastazovanie",
 "title": "Selektívne metastázovanie (homing)",
 "match": [
  "selektívn\\w*\\s+metastázovani\\w*",
  "homing"
 ],
 "short": "Prednostné metastázovanie nádoru do určitých orgánov bez ohľadu na anatómiu ciev.",
 "body": "<ul><li>Kosti sú obľúbeným cieľom karcinómu prostaty a prsníka; karcinóm pľúc sa často usadí v mozgu a v nadobličkách; neuroblastóm dieťaťa zakladá ložiská v pečeni a v kostiach.</li><li>Naopak kostrový sval a slezina dostanú metastázy zriedka, hoci nimi tečie veľa krvi – rozhoduje „pôda“, nie len prúd.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-4-3"
},
{
 "id": "osteoblastova-metastaza",
 "title": "Osteoblastová (osteoplastická) metastáza",
 "match": [
  "osteoblastov\\w*\\s+metastáz\\w*",
  "osteoplastick\\w*"
 ],
 "short": "Metastáza, ktorá povzbudí tvorbu kosti – na RTG je hustejšia ako okolie; typicky karcinóm prostaty.",
 "img": {
  "src": "assets/images/osteoblastic-metastasis-prostate.jpg",
  "alt": "Osteoblastové metastázy karcinómu prostaty.",
  "caption": "Osteoblastové metastázy karcinómu prostaty.",
  "credit": "Wan-Hsiu Liao, Sheng-Hsiang Lin and Tsu-Tuan Wu · CC BY-SA 2.0",
  "href": "https://commons.wikimedia.org/wiki/File:Osteoplastic_bone_metastasis_prostate_cancer_01.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-4-3"
},
{
 "id": "tekuta-biopsia",
 "title": "Tekutá biopsia",
 "match": [
  "tekut\\w*\\s+biopsi\\w*"
 ],
 "short": "Vyšetrenie nádoru z krvi alebo inej telovej tekutiny – z cirkulujúcich nádorových buniek a nádorovej DNA.",
 "body": "<ul><li>Pomáha sledovať liečbu a včas odhaliť návrat nádoru.</li><li>Tkanivovú diagnózu nenahrádza.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-4-4"
},
{
 "id": "gist",
 "title": "Gastrointestinálny stromálny nádor (GIST)",
 "match": [
  "gastrointestináln\\w*\\s+stromáln\\w*\\s+nádor\\w*",
  "GIST"
 ],
 "short": "Mezenchýmový nádor steny tráviacej rúry z intersticiálnych Cajalových buniek, poháňaný mutáciou <i>KIT</i> alebo <i>PDGFRA</i>.",
 "body": "<ul><li>Najčastejšie v žalúdku (≈ 60 %) a tenkom čreve (≈ 30 %).</li><li>Správanie sa udáva ako riziko podľa veľkosti, počtu mitóz na 5 mm² a miesta.</li><li>Mutácia <i>KIT</i> je zároveň cieľom liečby imatinibom.</li></ul>",
 "img": {
  "src": "assets/images/gist-stomach-gross.jpg",
  "alt": "GIST žalúdka na reze.",
  "caption": "GIST žalúdka na reze.",
  "credit": "Ed Uthman, MD · Public domain",
  "href": "https://commons.wikimedia.org/wiki/File:Gastrointestinal_Stromal_Tumor_(GIST)_of_Stomach.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-5-2"
},
{
 "id": "grading",
 "et": "angl. <i>grade</i> „stupeň“",
 "title": "Grading (stupeň malignity)",
 "match": [
  "grading\\w*",
  "grade"
 ],
 "short": "Odhad agresivity zhubného nádoru z jeho histologického obrazu.",
 "body": "<ul><li>Hodnotí sa diferenciácia, jadrová atypia, mitózy alebo Ki-67 a nekróza.</li><li>Všeobecne G1 dobre, G2 stredne, G3 slabo diferencovaný (G4 nediferencovaný); mnohé orgány majú vlastný systém.</li><li>Vyšší grade = rýchlejší rast, viac metastáz, kratšie prežívanie.</li></ul>",
 "kde": "11_nadory_dignita#sec-11-6"
},
{
 "id": "ki-67",
 "title": "Ki-67",
 "match": [
  "Ki-67"
 ],
 "short": "Jadrová bielkovina, ktorú majú bunky vo všetkých fázach bunkového cyklu, ale nie v pokoji (G₀).",
 "body": "<ul><li>Imunohistochémia ju zafarbí hnedo; podiel pozitívnych jadier je proliferačný index.</li><li>Používa sa pri gradingu neuroendokrinných nádorov a pri karcinóme prsníka.</li></ul>",
 "img": {
  "src": "assets/images/ki67-breast.jpg",
  "alt": "Ki-67 v karcinóme prsníka – hnedé jadrá deliacich sa buniek.",
  "caption": "Ki-67 v karcinóme prsníka – hnedé jadrá deliacich sa buniek.",
  "credit": "Sandi Shen, Gaofang Xiao, Richang Du, Ningdong Hu, Xu Xia and Haibo Zhou · CC BY 3.0",
  "href": "https://commons.wikimedia.org/wiki/File:Positive_immunohistochemistry_of_KI-67_in_invasive_breast_cancer.jpg"
 },
 "kde": "11_nadory_dignita#sub-11-6-1",
 "cs": true
},
{
 "id": "hpf",
 "title": "HPF – zorné pole veľkého zväčšenia",
 "match": [
  "HPF"
 ],
 "short": "Plocha, ktorú vidno v mikroskope pri veľkom zväčšení (angl. <i>high-power field</i>); medzi mikroskopmi sa líši.",
 "body": "<ul><li>Preto WHO udáva mitózy na mm² – pri GIST 5 mm² zodpovedá približne 50 HPF.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-6-1",
 "cs": true
},
{
 "id": "nos",
 "title": "NOS – bez bližšieho určenia",
 "match": [
  "NOS"
 ],
 "short": "Skratka v diagnóze, keď sa nádor nedá bližšie zaradiť (angl. <i>not otherwise specified</i>).",
 "kde": "11_nadory_dignita#sub-11-2-1",
 "cs": true
},
{
 "id": "gleasonovo-skore",
 "title": "Gleasonovo skóre a skupiny ISUP",
 "match": [
  "Gleason\\w*(?:\\s+skór\\w*)?",
  "ISUP",
  "grade\\s+groups?"
 ],
 "short": "Grading karcinómu prostaty podľa stavby žliazok: dva najčastejšie vzorce (1–5) sa sčítajú; od roku 2014 sa skóre prevádza na päť skupín ISUP.",
 "body": "<ul><li>Skupina 1 = skóre ≤ 6, 2 = 3+4, 3 = 4+3, 4 = 8, 5 = 9–10.</li><li>3+4 a 4+3 majú rovnaký súčet, ale 4+3 je agresívnejší.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-6-2"
},
{
 "id": "nottingham",
 "title": "Nottinghamský systém (prsník)",
 "match": [
  "Nottingham\\w*"
 ],
 "short": "Grading karcinómu prsníka: tvorba tubulov, jadrová pleomorfia a mitózy, každé 1–3 body.",
 "body": "<ul><li>Súčet 3–5 = G1, 6–7 = G2, 8–9 = G3.</li><li>Je modifikáciou Bloomovho–Richardsonovho systému a súčasťou stagingu AJCC.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-6-2"
},
{
 "id": "os-prezivanie",
 "title": "OS – celkové prežívanie",
 "match": [
  "OS"
 ],
 "short": "Čas od diagnózy alebo začiatku liečby do smrti z akejkoľvek príčiny (angl. <i>overall survival</i>).",
 "kde": "11_nadory_dignita#sub-11-6-3",
 "cs": true
},
{
 "id": "pfs",
 "title": "PFS – prežívanie bez progresie",
 "match": [
  "PFS"
 ],
 "short": "Čas, počas ktorého choroba nepostupuje (angl. <i>progression-free survival</i>).",
 "kde": "11_nadory_dignita#sub-11-6-3",
 "cs": true
},
{
 "id": "staging",
 "et": "angl. <i>stage</i> „štádium“",
 "title": "Staging (štádium, rozsah choroby)",
 "match": [
  "staging\\w*"
 ],
 "short": "Určenie rozsahu zhubného nádoru v tele – veľkosť a prerastanie, uzliny, vzdialené metastázy.",
 "body": "<ul><li>Najčastejšie systémom TNM, z ktorého sa určí štádium 0–IV.</li><li>Pre prognózu váži spravidla viac ako grade.</li></ul>",
 "kde": "11_nadory_dignita#sec-11-7"
},
{
 "id": "tnm",
 "title": "Systém TNM",
 "match": [
  "TNM"
 ],
 "short": "Medzinárodný zápis rozsahu nádoru: T – primárny nádor, N – regionálne uzliny, M – vzdialené metastázy.",
 "body": "<ul><li>Predpony: c klinický, p patologický, y po neoadjuvantnej liečbe, r recidíva.</li><li>Doplnky: R (reziduum), L, V, Pn (cievy a nervy), G (grade).</li><li>Spravuje ho UICC spolu s AJCC; platí 9. vydanie (2025).</li></ul>",
 "img": {
  "src": "chapters/fig/fig-tnm-stena.svg",
  "alt": "Kategória T podľa hĺbky prerastania stenou čreva.",
  "caption": "Kategória T podľa hĺbky prerastania stenou čreva.",
  "credit": "vlastná schéma · CC BY-NC-SA 4.0"
 },
 "kde": "11_nadory_dignita#sub-11-7-1",
 "cs": true
},
{
 "id": "neoadjuvantna-liecba",
 "et": "gr. <i>neos</i> „nový“ + lat. <i>adiuvare</i> „pomáhať“",
 "title": "Neoadjuvantná liečba",
 "match": [
  "neoadjuvantn\\w*"
 ],
 "short": "Liečba (chemoterapia, ožarovanie) podaná pred operáciou, aby sa nádor zmenšil.",
 "body": "<ul><li>Nádor sa potom klasifikuje s predponou y (ypT, ypN) a hodnotí sa jeho odpoveď na liečbu.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-7-2"
},
{
 "id": "stadium-0-iv",
 "title": "Štádium 0–IV",
 "match": [
  "štádi\\w*\\s+0[–-]IV",
  "prognostick\\w*\\s+štádi\\w*",
  "klinick\\w*\\s+štádi\\w*"
 ],
 "short": "Zoskupenie kombinácií T, N a M s podobnou prognózou: 0 = carcinoma in situ, I = malý lokalizovaný nádor, II–III = lokálne pokročilý, IV = vzdialené metastázy.",
 "kde": "11_nadory_dignita#sub-11-7-3"
},
{
 "id": "uicc",
 "title": "UICC",
 "match": [
  "UICC"
 ],
 "short": "Medzinárodná únia proti rakovine (angl. <i>Union for International Cancer Control</i>) – spravuje klasifikáciu TNM.",
 "kde": "11_nadory_dignita#sub-11-7-1",
 "cs": true
},
{
 "id": "ajcc",
 "title": "AJCC",
 "match": [
  "AJCC"
 ],
 "short": "Americký spoločný výbor pre rakovinu (angl. <i>American Joint Committee on Cancer</i>) – vydáva TNM spolu s UICC.",
 "kde": "11_nadory_dignita#sub-11-7-1",
 "cs": true
},
{
 "id": "figo",
 "title": "FIGO",
 "match": [
  "FIGO"
 ],
 "short": "Systém štádií gynekologických nádorov Medzinárodnej federácie gynekológie a pôrodníctva.",
 "kde": "11_nadory_dignita#sub-11-7-3",
 "cs": true
},
{
 "id": "ann-arbor",
 "title": "Ann Arbor",
 "match": [
  "Ann\\s+Arbor"
 ],
 "short": "Systém klinických štádií lymfómov.",
 "kde": "11_nadory_dignita#sub-11-7-3"
},
{
 "id": "breslow",
 "title": "Hrúbka podľa Breslowa",
 "match": [
  "Breslow\\w*"
 ],
 "short": "Hĺbka melanómu v milimetroch od povrchu kože po najhlbšiu nádorovú bunku – hlavný prognostický údaj melanómu.",
 "kde": "11_nadory_dignita#sub-11-7-3"
},
{
 "id": "paraneoplasticky-syndrom",
 "et": "gr. <i>para</i> „vedľa“ + neoplázia",
 "title": "Paraneoplastický syndróm",
 "match": [
  "paraneoplastick\\w*(?:\\s+syndróm\\w*)?"
 ],
 "short": "Príznaky, ktoré sa nedajú vysvetliť rastom nádoru ani metastázami – vznikajú látkami z nádoru alebo imunitnou odpoveďou naň.",
 "body": "<ul><li>Postihuje až 8 % pacientov so zhubným nádorom.</li><li>Môže byť prvým prejavom nádoru; po jeho odstránení ustúpi.</li><li>Mechanizmy: ektopické hormóny (ACTH, ADH, PTHrP), protilátky, poruchy zrážania.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-8-3"
},
{
 "id": "pthrp",
 "title": "PTHrP",
 "match": [
  "PTHrP"
 ],
 "short": "Bielkovina príbuzná parathormónu, ktorú tvoria niektoré nádory; pôsobí na kosť a obličky ako parathormón a vyvolá hyperkalciémiu.",
 "body": "<ul><li>Typicky dlaždicový karcinóm pľúc, karcinóm obličky a prsníka.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-8-3",
 "cs": true
},
{
 "id": "myasthenia-gravis",
 "title": "Myasthenia gravis",
 "match": [
  "myasthenia\\s+gravis",
  "myasténi\\w*"
 ],
 "short": "Autoimunitné ochorenie s protilátkami proti acetylcholínovému receptoru svalu → unaviteľná svalová slabosť.",
 "body": "<ul><li>Často spojená s tymómom.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-8-3"
},
{
 "id": "acanthosis-nigricans",
 "et": "gr. <i>akantha</i> „tŕň“ + lat. <i>nigricans</i> „černejúci“",
 "title": "Acanthosis nigricans",
 "match": [
  "acanthosis\\s+nigricans"
 ],
 "short": "Stmavnutá, zhrubnutá koža v záhyboch (pazuchy, krk); ako paraneoplastický prejav najmä pri karcinóme žalúdka.",
 "kde": "11_nadory_dignita#sub-11-8-3"
},
{
 "id": "syndrom-z-rozpadu-nadoru",
 "title": "Syndróm z rozpadu nádoru",
 "match": [
  "syndróm\\w*\\s+z\\s+rozpadu\\s+nádoru",
  "rozpad\\w*\\s+nádoru"
 ],
 "short": "Náhly rozpad veľkého množstva nádorových buniek, najčastejšie po začatí chemoterapie, zaplaví krv ich obsahom.",
 "body": "<p class=\"chain\">↑ K⁺ → arytmie · ↑ fosfáty → viažu Ca²⁺ → hypokalciémia · nukleové kyseliny → kyselina močová → upchá tubuly → akútne poškodenie obličiek</p><ul><li>Hrozí najmä pri Burkittovom lymfóme a akútnych leukémiách.</li><li>Predchádza sa mu hydratáciou a liekmi proti kyseline močovej.</li></ul>",
 "kde": "11_nadory_dignita#sub-11-8-4"
},
{
 "id": "stadia-kachexie",
 "title": "Štádiá kachexie",
 "match": [
  "prekachexi\\w*",
  "refraktérn\\w*\\s+kachexi\\w*"
 ],
 "short": "Kachexia postupuje od prekachexie cez kachexiu po refraktérnu kachexiu, keď sa úbytok už zastaviť nedá.",
 "body": "<ul><li>Zasiahnuť treba pred vyčerpaním zásob tuku a svalu.</li><li>Kritérium kachexie: úbytok > 5 % hmotnosti za 6 mesiacov.</li></ul>",
 "img": {
  "src": "chapters/fig/fig-kruh-kachexia.svg",
  "alt": "Bludný kruh kachexie.",
  "caption": "Bludný kruh kachexie.",
  "credit": "vlastná schéma · CC BY-NC-SA 4.0"
 },
 "kde": "11_nadory_dignita#sub-11-8-2"
},
{
 "id": "precizna-medicina",
 "title": "Precízna (personalizovaná) medicína",
 "match": [
  "precízn\\w*\\s+medicín\\w*",
  "personalizovan\\w*\\s+medicín\\w*"
 ],
 "short": "Voľba liečby podľa vlastností nádoru konkrétneho pacienta – najmä podľa prediktívnych markerov (HER2, KIT, EGFR).",
 "body": "<ul><li>Často sa vyšetruje naraz celý panel génov sekvenovaním novej generácie.</li></ul>",
 "kde": "11_nadory_dignita#sec-11-9"
}
);

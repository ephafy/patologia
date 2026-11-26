/* Glosár PATOLY — revízia 5. 11. 2026: heslá pre zložené slová, ktoré dovtedy otvárali cudzie heslo
   (bronchitída → priedušky, arterioloskleróza → arteriola, nodulárna fasciitída → fascia; poistka:
   tools/glossary-audit.js – CUDZÍ VÝZNAM). Texty sú vlastné (CLAUDE.md §4.1); písané zo štandardných učebnicových
   faktov – overiť pri odbornej kontrole (§8, bod 4). */
(window.PF_GLOSSARY = window.PF_GLOSSARY || []).push(
{
  "id": "bronchitida", et: "gr. <i>bronchos</i> „priedušnica“ + <i>-itis</i> „zápal“",
  title: "Bronchitída",
  match: ["bronchitíd\\w*"],
  short: "Zápal výstelky priedušiek. Krátky (akútny) prichádza s vírusom a ustúpi; dlhodobý udržiava trvalé dráždenie, u nás hlavne dym z cigariet.",
  body: "<ul><li><b>Akútna:</b> vírus zničí bunky s riasinkami → výpotok → kašeľ; epitel sa do týždňov obnoví, lebo jeho bunky sa delia (labilné tkanivo).</li><li><b>Chronická</b> sa určuje podľa pacienta, nie podľa biopsie – vykašliava hlien väčšinu dní aspoň štvrť roka, a to dva roky za sebou.</li><li><b>Prečo trvá:</b> dym → sliznica tvorí viac hlienu a riasinkový epitel sa mení na dlaždicový, ktorý hlien neposúva → hlien ostáva → baktérie → nový zápal ⟳. Spolu s emfyzémom patrí pod CHOCHP.</li></ul>"
},
{
  "id": "bronchiektazie", et: "gr. <i>bronchos</i> „priedušnica“ + <i>ektasis</i> „roztiahnutie“",
  title: "Bronchiektázie",
  match: ["bronchiektáz\\w*"],
  short: "Trvalé rozšírenie priedušiek: chronický zápal a infekcia zničia svalovinu a elastické vlákna ich steny a prieduška sa už nestiahne.",
  body: "<p class=\"chain\">zlé čistenie priedušiek (cystická fibróza, porucha riasiniek, prekážka v prieduške, ťažký zápal pľúc) → hlien stagnuje → infekcia → neutrofily a ich enzýmy (elastáza) ničia stenu → prieduška sa rozšíri → hlien stagnuje ešte viac ⟳</p><ul><li><b>Klinika:</b> kašeľ s veľkým množstvom hnisavého spúta, opakované infekcie, vykašliavanie krvi.</li><li><b>Dôkaz:</b> CT s vysokým rozlíšením – prieduška širšia ako tepna, ktorá ju sprevádza.</li><li>Zápal trvajúci roky môže viesť k AA amyloidóze.</li></ul>"
},
{
  "id": "hyalinna-arterioloskleroza", et: "gr. <i>hyalos</i> „sklo“; lat. <i>arteriola</i> „malá tepna“ + gr. <i>sklérósis</i> „stvrdnutie“",
  title: "Hyalínna arterioloskleróza",
  match: ["hyalínn\\w*\\s+arterioloskler\\w*", "arterioloskler\\w*"],
  short: "Homogénne ružové (eozinofilné) zhrubnutie steny arteriol z plazmatických bielkovín, ktoré do nej presiakli; priesvit sa zúži a tkanivo za ním trpí nedokrvením.",
  body: "<p class=\"chain\">vysoký tlak (hypertenzia) alebo glykácia bielkovín (diabetes) poškodí endotel → plazmatické bielkoviny presiaknu do steny + bunky steny tvoria viac bazálnej membrány → <b>hyalín</b> → zúžený priesvit → ischémia</p><ul><li>V obličke: atrofia nefrónov a jemne zrnitý povrch (benígna nefroskleróza).</li><li>Mierny stupeň patrí aj k vyššiemu veku.</li><li><b>Neplieť:</b> pri malígnej hypertenzii je stena vrstvená ako cibuľa (hyperplastická arterioloskleróza), niekedy s fibrinoidnou nekrózou.</li></ul>",
  img: {
    "src": "assets/images/arteriolar-hyalinosis.jpg",
    "alt": "Hyalínna arterioloskleróza: homogénne zhrubnutá stena arterioly.",
    "caption": "Homogénne ružové zhrubnutie steny arterioly pri glomeruli (šípky).",
    "credit": "Mikael Häggström, M.D. · CC0",
    "href": "https://commons.wikimedia.org/wiki/File:Histopathology_of_renal_arteriolar_hyalinosis,_annotated.jpg"
  }
},
{
  "id": "nodularna-fasciitida", et: "lat. <i>nodulus</i> „uzlík“ + <i>fascia</i> „páska“ + gr. <i>-itis</i> „zápal“ (napriek názvu nejde o zápal)",
  title: "Nodulárna fasciitída",
  match: ["nodulárn\\w*\\s+fasciitíd\\w*"],
  short: "Benígna proliferácia myofibroblastov v podkoží, ktorá rastie rýchlo (týždne) a má veľa mitóz – preto sa môže zameniť so sarkómom. Sama ustúpi.",
  body: "<ul><li>Typicky mladý dospelý, uzlík do 3 cm, často na predlaktí.</li><li>Mitóz je veľa, ale sú <b>normálne</b> a jadrá bez výraznej atypie; bunky voľne rozložené v riedkej hmote.</li><li>Molekulovo prestavba génu <i>USP6</i> – klonálny, ale prechodný („samoobmedzujúci sa“) proces; po vyrezaní sa takmer nevracia.</li><li><b>Poučenie:</b> počet mitóz sám o dignite nerozhodne.</li></ul>",
  kde: "11_nadory_dignita#sub-11-5-1"
},
{
  "id": "nekrotizujuca-fasciitida", et: "gr. <i>nekrósis</i> „odumretie“ + lat. <i>fascia</i> „páska“ + gr. <i>-itis</i> „zápal“",
  title: "Nekrotizujúca fasciitída",
  match: ["nekrotizujúc\\w*\\s+fasciitíd\\w*"],
  short: "Rýchlo sa šíriaca infekcia podkožia a povrchovej fascie s nekrózou – život ohrozujúca, rieši ju okamžitá chirurgická revízia.",
  body: "<p class=\"chain\">baktérie (zmes aeróbov a anaeróbov pri diabete či po operácii; alebo <i>Streptococcus pyogenes</i>) → enzýmy a toxíny sa šíria pozdĺž fascie + trombóza drobných ciev → nekróza bez hranice → toxíny v krvi → šok</p><ul><li><b>Varovný znak:</b> bolesť oveľa silnejšia, než zodpovedá nálezu na koži; rýchly postup za hodiny.</li><li><b>Pri revízii:</b> sivá, nekrvácajúca fascia, ktorá sa ľahko oddeľuje.</li><li>Antibiotiká samé nestačia – mŕtve tkanivo bez prietoku krvi ich nedostane; treba odstrániť nekrózu.</li></ul>"
}
);

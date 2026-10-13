/* Glosár PATOLY — skupiny pojmov (načítava sa ako posledný súbor, až keď sú všetky heslá zaregistrované).
   Pravidlo: heslo skupiny popisuje skupinu a vymenúva zástupcov; každý zástupca má vlastné okno a v ňom
   riadok „Patrí do skupiny“ a „Ďalší v skupine“. Odkazy píšu názvy obyčajným textom — klikateľné z nich robí
   engine (glossary.js) podľa vzorov hesiel, preto musí každý názov (label) zodpovedať vzoru cieľového hesla;
   to overuje pomôcka pracovne/_pomocne/glosar_skupiny.js.
   list:true = skupina dostane v tele zoznam zástupcov (list:false = zoznam už má v texte hesla).
   id:null = skupina bez vlastného hesla (len riadok „Skupina“ vo všetkých členoch). */
(function () {
  var D = window.PF_GLOSSARY || [];
  var by = Object.create(null);
  D.forEach(function (t) { by[t.id] = t; });

  var GROUPS = [
    { id: "mykozy", label: "Systémové mykózy", list: false, members: [
      ["histoplazma", "Histoplazmóza"], ["kryptokok", "Kryptokokóza"], ["kokcidioidy", "Kokcidioidomykóza"], ["blastomycety", "Blastomykóza"]] },
    { id: "vnutrobunkove-prvoky", label: "Vnútrobunkové prvoky", list: false, members: [
      ["toxoplazma", "Toxoplazmóza"], ["leishmania", "Leishmanióza"]] },
    { id: "th-lymfocyty", label: "Pomocné T-lymfocyty", list: false, members: [
      ["th1", "Th1"], ["th2", "Th2"], ["th17", "Th17"]] },
    { id: "obrovska-bunka", label: "Obrovská viacjadrová bunka", list: false, members: [
      ["langhans", "Langhansova obrovská bunka"], ["touton", "Toutonova obrovská bunka"], ["cudzie-teleso", "Cudzie teleso"]] },
    { id: "kostne-bunky", label: "Kostné bunky", list: true, members: [
      ["osteoblast", "Osteoblast", "tvorí kosť"], ["osteocyt", "Osteocyt", "udržiava kosť"], ["osteoklast", "Osteoklast", "odbúrava kosť"]] },
    { id: "pohlavne-hormony", label: "Pohlavné hormóny", list: true, members: [
      ["estrogeny", "Estrogény"], ["progesteron", "Progesterón"], ["testosteron", "Testosterón"]] },
    { id: "enterovirusy", label: "Enterovírusy a adenovírusy", list: true, members: [
      ["poliovirus", "Poliovírus"], ["coxsackie", "Coxsackie"], ["adenovirus", "Adenovírusy"]] },
    { id: "krvacanie-do-dutin", label: "Krvácanie do telesných dutín", list: true, members: [
      ["hemoperikard", "Hemoperikard"], ["hemotorax", "Hemotorax"], ["hemocefalus", "Hemocefalus"],
      ["hemoperitoneum", "Hemoperitoneum"], ["hemartros", "Hemartros"]] },
    { id: "nazvy-krvacania", label: "Názvy krvácania podľa miesta", list: true, members: [
      ["epistaxa", "Epistaxa", "z nosa"], ["hemoptyza", "Hemoptýza", "z pľúc"], ["hemoptoe", "Hemoptoe", "z pľúc, masívne"],
      ["hematemeza", "Hemateméza", "zo žalúdka, vracaním"], ["gastroragia", "Gastrorágia", "zo žalúdka"], ["melena", "Meléna", "z horného traktu, čierna stolica"],
      ["enteroragia", "Enterorágia", "z čreva"], ["hematuria", "Hematúria", "z močových ciest"],
      ["menoragia", "Menorágia", "z maternice, silná menštruácia"], ["metroragia", "Metrorágia", "z maternice, mimo cyklu"]] },
    { id: "stitna-zlaza", label: "Štítna žľaza", list: true, listTitle: "Poruchy a choroby", members: [
      ["hypotyreoza", "Hypotyreóza"], ["hypertyreoza", "Hypertyreóza"], ["hashimoto", "Hashimotova tyreoiditída"], ["struma", "Struma"]] },
    { id: "sok", label: "Šok", list: false, members: [
      ["hypovolemicky-sok", "Hypovolemický šok"], ["kardiogenny-sok", "Kardiogénny šok"],
      ["distribucny-sok", "Distribučný šok"], ["obstrukcny-sok", "Obštrukčný šok"]] },
    { id: "hypertrofia", label: "Hypertrofia", list: true, listTitle: "Podoby", members: [
      ["koncentricka-hypertrofia", "Koncentrická hypertrofia"], ["excentricka-hypertrofia", "Excentrická hypertrofia"],
      ["vikarujuca", "Vikarujúca hypertrofia"]] },
    { id: "pankreas", label: "Pankreas", list: true, listTitle: "Hormóny", members: [
      ["inzulin", "Inzulín"], ["glukagon", "Glukagón"]] },
    { id: "eikosanoidy", label: "Eikosanoidy", list: true, members: [
      ["prostaglandiny", "Prostaglandíny"], ["tromboxan", "Tromboxán"], ["leukotrieny", "Leukotriény"]] },
    { id: "spm", label: "Pro-resolvujúce mediátory", list: true, members: [
      ["lipoxiny", "Lipoxíny"], ["rezolviny", "Rezolvíny"], ["protektiny", "Protektíny"], ["marezin", "Marezíny"]] },
    { id: "katecholaminy", label: "Katecholamíny", list: true, members: [
      ["adrenalin", "Adrenalín"], ["noradrenalin", "Noradrenalín"]] },
    { id: null, name: "Choroby žlčníka a žlčových ciest", members: [
      ["cholecystitida", "Cholecystitída"], ["cholangitida", "Cholangitída"], ["cholestaza", "Cholestáza"]] },
    { id: null, name: "Zápaly dýchacích ciest", members: [
      ["sinusitida", "Sinusitída"], ["rinitida", "Rinitída"], ["tracheitida", "Tracheitída"]] },
    { id: null, name: "Zápaly močových ciest", members: [
      ["cystitida", "Cystitída"], ["uretritida", "Uretritída"], ["pyelonefritida", "Pyelonefritída"]] },
    { id: null, name: "Poruchy vápnika", members: [
      ["hyperkalciemia", "Hyperkalciémia"], ["hyperkalciuria", "Hyperkalciúria"]] },
    { id: null, name: "Reverzibilita poškodenia bunky", members: [["vratne-poskodenie", "Reverzibilné poškodenie"], ["bod-nezvratnosti", "Bod nezvratnosti"], ["nevratne-poskodenie", "Ireverzibilné poškodenie"]] },
    { id: null, name: "Rodina Bcl-2 a apoptozóm", members: [["bcl-2", "Bcl-2"], ["len-bh3", "BH3"], ["bax-bak", "Bax"], ["apoptozom", "Apoptozóm"]] },
    { id: null, name: "Zmeny jadra pri smrti bunky", members: [["pyknoza", "Pyknóza"], ["karyorexa", "Karyorexa"], ["karyolyza", "Karyolýza"]] },
    { id: null, name: "Tuk v pečeni", members: [["mastne-kyseliny", "Mastné kyseliny"], ["tag", "Triacylglyceroly"], ["beta-oxidacia", "β-oxidácia"], ["vldl", "VLDL"]] },
    { id: null, name: "Vodné zmeny pri vratnom poškodení", members: [["kalne-zdurenie", "Kalné zdurenie"], ["hydropicka-degeneracia", "Hydropická degenerácia"]] },
    { id: "amyloid-typy", label: "Typy amyloidu", list: true, listTitle: "Typy", members: [["amyloid-al", "AL amyloid"], ["amyloid-aa", "AA amyloid"], ["amyloid-attr", "ATTR"], ["amyloid-ab2m", "Aβ2M"], ["amylin", "Amylín"]] },
    { id: null, name: "Hypoxický tuk a kongescia", members: [["muskatova-pecen", "Muškátová pečeň"], ["tigrovane-srdce", "Tigrované srdce"]] },
    { id: null, name: "Okamžitá cievna odpoveď", members: [["mastocyt", "Mastocyt"], ["histamin", "Histamín"], ["bradykinin", "Bradykinín"]] },
    { id: "cytokiny-zapal", label: "Cytokíny", list: true, listTitle: "Zástupcovia", members: [["tnf-alfa", "TNF-α"], ["interleukiny", "Interleukíny"], ["il-1", "IL-1"], ["il-6", "IL-6"], ["chemokiny", "Chemokíny"]] },
    { id: null, name: "Leukocytová kaskáda", members: [["marginacia", "Marginácia"], ["selektiny", "Selektíny"], ["icam-1", "ICAM-1"], ["integriny", "Integríny"], ["diapedeza", "Diapedéza"], ["chemotaxia", "Chemotaxia"]] },
    { id: null, name: "Lymfocyty a ich potomstvo", members: [["lymfocyt", "Lymfocyt"], ["b-lymfocyt", "B-lymfocyt"], ["plazmocyt", "Plazmocyt"], ["t-lymfocyt", "T-lymfocyt"]] },
    { id: null, name: "Fibrín a fibrinogén", members: [["fibrinogen", "Fibrinogén"], ["fibrin", "Fibrín"], ["fibrinozny-zapal", "Fibrinózny zápal"]] },
    { id: "bakterialne-enzymy", label: "Enzýmy šírenia", list: true, listTitle: "Enzýmy", members: [["koagulaza", "Koagulázy"], ["fibrinolyzin", "Fibrinolyzín"], ["hyaluronidaza", "Hyaluronidáza"]] },
    { id: null, name: "Hnisavé ložiská", members: [["furunkul", "Furunkul"], ["karbunkul", "Karbunkul"], ["absces", "Absces"], ["flegmona", "Flegmóna"], ["empyem", "Empyém"], ["pyogenne-bakterie", "Pyogénne baktérie"], ["hnis", "Hnis"], ["pyogenna-membrana", "Pyogénna membrána"], ["pyosalpinx", "Pyosalpinx"], ["pseudoabsces", "Pseudoabsces"]] },
    { id: null, name: "Šírenie hnisavého zápalu cievami", members: [["lymfangitida", "Lymfangitída"], ["flebitida", "Flebitída"], ["pyemia", "Pyémia"]] },
    { id: null, name: "Imunokomplexové poškodenie", members: [["imunokomplex", "Imunokomplex"], ["komplement", "Komplement"], ["arthus", "Arthusov fenomén"], ["anafylatoxiny", "Anafylatoxíny"]] },
    { id: null, name: "Náhrada väzivom", members: [["jazva", "Jazva"], ["fibroza", "Fibróza"], ["granulacne-tkanivo", "Granulačné tkanivo"]] },
    { id: null, name: "Trombus a trombóza", members: [["tromboza", "Trombóza"], ["trombus", "Trombus"], ["virchowova-trias", "Virchowova trias"], ["trombofilia", "Trombofília"], ["zahnove-linie", "Zahnove línie"], ["rekanalizacia", "Rekanalizácia"]] },
    { id: null, name: "Energetika bunky", members: [["atp", "ATP"], ["mitochondria", "Mitochondrie"], ["oxidativna-fosforylacia", "Oxidatívna fosforylácia"], ["glykolyza", "Glykolýza"]] },
    { id: "enzymy-rozkladu", label: "Hydrolázy", list: true, listTitle: "Zástupcovia", members: [["fosfolipazy", "Fosfolipázy"], ["proteazy", "Proteázy"], ["endonukleazy", "Endonukleázy"], ["lipazy", "Lipázy"]] },
    { id: null, name: "Ubikvitín–proteazómová dráha", members: [["ubikvitin", "Ubikvitín"], ["ubikvitinligazy", "Ubikvitínligázy"], ["proteazom", "Proteazóm"]] },
    { id: "mtor-foxo", label: "PI3K–Akt–mTOR", list: true, listTitle: "Zložky dráhy", members: [["igf-1", "IGF-1"], ["pi3k", "PI3K"], ["mtor", "mTOR"], ["foxo", "FoxO"]] },
    { id: "detekcia-apoptozy", label: "Dôkaz apoptózy", list: true, listTitle: "Metódy", members: [["tunel", "TUNEL"], ["annexin", "Annexín V"], ["fosfatidylserin", "Fosfatidylserín"]] },
    { id: "regulovana-smrt", label: "Regulovaná nekróza", list: true, listTitle: "Formy", members: [["nekroptoza", "Nekroptóza"], ["pyroptoza", "Pyroptóza"], ["feroptoza", "Feroptóza"]] },
    { id: "posmrtne-zmeny", label: "Posmrtné zmeny", list: true, listTitle: "Zmeny", members: [["autolyza", "Autolýza"], ["putrefakcia", "Putrefakcia"], ["algor-mortis", "Algor mortis"], ["livores-mortis", "Livores mortis"], ["rigor-mortis", "Rigor mortis"], ["supravitalne", "Supravitálne"], ["vitalna-reakcia", "Vitálna reakcia"], ["mumifikacia", "Mumifikácia"], ["maceracia", "Macerácia"]] },
    { id: null, name: "Farbenie H&E", members: [["he-farbenie", "H&E"], ["hematoxylin", "Hematoxylín"], ["eozin", "Eozín"], ["eozinofilny", "Eozinofilný"], ["bazofilny", "Bazofilný"], ["hyperchromazia", "Hyperchromázia"]] },
    { id: null, name: "Parenchým a stróma", members: [["parenchym", "Parenchým"], ["stroma", "Stróma"]] },
    { id: "markery-nekrozy", label: "Markery nekrózy", list: true, listTitle: "Markery", members: [["troponin", "Troponín"], ["ck", "CK"], ["myoglobin", "Myoglobín"], ["alt", "ALT"], ["ast", "AST"], ["ld", "LD"], ["gmt", "GMT"], ["amylaza", "Amyláza"]] },
    { id: null, name: "Ukazovatele poškodenia obličky", members: [["proteinuria", "Proteinúria"], ["nefroticky-syndrom", "Nefrotický syndróm"], ["gfr", "GFR"], ["obliky-ckd", "CKD"]] },
    { id: null, name: "Záškrt", members: [["zaskrt", "Záškrt"], ["difteria-toxin", "Difterický toxín"], ["difteria-myokarditida", "Difterická myokarditída"], ["difteria-neuropatia", "Difterická neuropatia"], ["pablana", "Pablana"], ["ef2", "Elongačný faktor 2"]] },
    { id: null, name: "Embólia", members: [["embolia", "Embólia"], ["embolus", "Embolus"], ["trombembolia", "Trombembólia"], ["plucna-embolia", "Pľúcna embólia"], ["paradoxna-embolia", "Paradoxná embólia"], ["tukova-embolia", "Tuková embólia"], ["vzduchova-embolia", "Vzduchová embólia"], ["embolia-plodovou-vodou", "Embólia plodovou vodou"], ["ateroembolia", "Ateroembólia"]] },
    { id: null, name: "Fibrinolýza", members: [["fibrinolyza", "Fibrinolýza"], ["plazmin", "Plazmín"], ["trombolyza", "Trombolýza"], ["d-dimery", "D-diméry"]] },
    { id: null, name: "Brzdy koagulácie", members: [["antitrombin", "Antitrombín"], ["protein-c", "Proteín C"], ["protein-s", "Proteín S"], ["fibrinolyza", "Fibrinolýza"]] },
    { id: null, name: "Krvácanie do kože a slizníc", members: [["petechie", "Petechie"], ["purpura", "Purpura"], ["ekchymoza", "Ekchymóza"], ["sufuzia", "Sufúzia"], ["hematom", "Hematóm"]] },
    { id: null, name: "Pigment z rozpadnutého hemoglobínu", members: [["hemosiderin", "Hemosiderín"], ["siderofag", "Siderofág"], ["bilirubin", "Bilirubín"], ["perls", "Perlsova reakcia"]] },
    { id: null, name: "Výpotky v dutinách", members: [["anasarka", "Anasarka"], ["hydrotorax", "Hydrotorax"], ["hydroperikard", "Hydroperikard"], ["ascites", "Ascites"], ["transsudat", "Transsudát"], ["edem", "Edém"]] },
    { id: null, name: "Fagocytóza", members: [["fagocytoza", "Fagocytóza"], ["fagozom", "Fagozóm"], ["fagolyzozom", "Fagolyzozóm"], ["lyzozom", "Lyzozóm"], ["opsoniny", "Opsoníny"]] },
    { id: null, name: "T-lymfocyty", members: [["t-lymfocyt", "T-lymfocyt"], ["cd4", "CD4⁺"], ["cd8", "CD8⁺"]] },
    { id: null, name: "Prezentácia antigénu", members: [["antigen", "Antigén"], ["prezentacia-antigenu", "Prezentácia antigénu"], ["dendriticka-bunka", "Dendritická bunka"], ["makrofag-patola", "Makrofág"]] },
    { id: null, name: "Bunkové spoje", members: [["adherentne-spoje", "Adherentné spoje"], ["desmozom", "Desmozóm"], ["kadherin", "E-kadherín"], ["epiteloidna-bunka", "Epiteloidná bunka"]] },
    { id: null, name: "Vitamín D a vápnik", members: [["kalcitriol", "Kalcitriol"], ["1a-hydroxylaza", "1α-hydroxyláza"], ["parathormon", "Parathormón"], ["hyperkalciemia", "Hyperkalciémia"]] },
    { id: null, name: "Vápnik v obličke", members: [["nefrokalcinoza", "Nefrokalcinóza"], ["oblickove-kamene", "Obličkové kamene"], ["hyperkalciuria", "Hyperkalciúria"]] },
    { id: null, name: "Reumatoidná artritída", members: [["reumatoidna-artritida", "Reumatoidná artritída"], ["reumatoidny-uzol", "Reumatoidný uzol"], ["reumatoidny-faktor", "Reumatoidný faktor"]] },
    { id: null, name: "Polarizačná mikroskopia", members: [["polarizovane-svetlo", "Polarizované svetlo"], ["dvojlom", "Dvojlom"], ["congo-red", "Congo red"]] },
    { id: null, name: "Liečba tuberkulózy a lepry", members: [["antituberkulotika", "Antituberkulotiká"], ["rifampicin", "Rifampicín"], ["izoniazid", "Izoniazid"], ["dapson", "Dapsón"], ["klofazimin", "Klofazimín"]] },
    { id: null, name: "Epidemiologické ukazovatele", members: [["prevalencia", "Prevalencia"], ["incidencia", "Incidencia"]] },
    { id: null, name: "Prach a granulómy v pľúcach", members: [["berylium", "Berýlium"], ["beryliza", "Berylióza"], ["sarkoidoza", "Sarkoidóza"], ["silikoza", "Silikóza"]] },
    { id: null, name: "Hrudník – orientačné miesta", members: [["hilus", "Hilus pľúc"], ["mediastinum", "Mediastinum"], ["pohrudnica", "Pohrudnica"]] },
    { id: null, name: "Lymfatický systém", members: [["lymfa", "Lymfa"], ["lymfaticke-cievy", "Lymfatické cievy"], ["lymfaticka-uzlina", "Lymfatická uzlina"], ["lymfadenitida", "Lymfadenitída"]] },
    { id: null, name: "Dýchacie cesty", members: [["priedusnica", "Priedušnica"], ["priedusky", "Priedušky"], ["alveolarny-makrofag", "Alveolárny makrofág"]] },
    { id: null, name: "Vrstvy srdca", members: [["endokard", "Endokard"], ["myokard", "Myokard"], ["osrdcovnik", "Osrdcovník"], ["chlopne", "Srdcové chlopne"], ["mitralna-chlopna", "Mitrálna chlopňa"]] },
    { id: "karditida", label: "Karditída", list: true, listTitle: "Podľa vrstvy", members: [["endokarditida", "Endokarditída"], ["myokarditida", "Myokarditída"], ["perikarditida", "Perikarditída"]] },
    { id: null, name: "Aorta a jej choroby", members: [["aorta", "Aorta"], ["aneuryzma", "Aneuryzma"], ["aortitida", "Aortitída"], ["ateroskleroza", "Ateroskleróza"]] },
    { id: null, name: "Vrstvy steny cievy", members: [["intima", "Intima"], ["media", "Média"], ["adventicia", "Adventícia"], ["vasa-vasorum", "Vasa vasorum"], ["endotel", "Endotel"]] },
    { id: null, name: "Zápaly tepien", members: [["endarteritida", "Endarteritída"], ["obliterativna-endarteritida", "Obliteratívna endarteritída"], ["aortitida", "Aortitída"]] },
    { id: null, name: "Vrstvy kože", members: [["epiderma", "Epiderma"], ["dermis", "Dermis"], ["podkozie", "Podkožie"]] },
    { id: null, name: "Tuberkulóza – kazeózny granulóm", members: [["kazeifikacia", "Kazeifikácia"], ["kazeum", "Kazeum"], ["kazeozna-nekroza", "Kazeózna nekróza"], ["granulom-patola", "Granulóm"]] },
    { id: null, name: "Primárna a postprimárna tuberkulóza", members: [["primarna-tbc", "Primárna tuberkulóza"], ["ghon", "Ghonovo ložisko"], ["ghon-komplex", "Ghonov komplex"], ["ranke", "Rankeho komplex"], ["postprimarna-tbc", "Postprimárna tuberkulóza"], ["reaktivacia", "Reaktivácia"], ["reinfekcia", "Reinfekcia"]] },
    { id: null, name: "Celkové príznaky chronickej infekcie", members: [["subfebrilie", "Subfebrílie"], ["nocne-potenie", "Nočné potenie"], ["pyrogeny", "Pyrogény"]] },
    { id: null, name: "Klasifikácia lepry", members: [["lepra", "Lepra"], ["tuberkuloidna-lepra", "Tuberkuloidná lepra"], ["lepromatozna-lepra", "Lepromatózna lepra"], ["ridley-jopling", "Ridleyho–Joplingova"], ["paucibacilarna-lepra", "Paucibacilárna lepra"], ["multibacilarna-lepra", "Multibacilárna lepra"]] },
    { id: null, name: "Penové makrofágy", members: [["xantom", "Xantóm"], ["xantogranulom", "Xantogranulóm"], ["penove-makrofagy", "Penové makrofágy"], ["mikuliczove-bunky", "Mikuliczove bunky"]] },
    { id: null, name: "HIV a AIDS", members: [["hiv", "HIV"], ["aids", "AIDS"], ["cd4", "CD4⁺"]] },
    { id: null, name: "Chronické granulomatózne infekcie", members: [["rinosklerom", "Rinosklerom"], ["mikuliczove-bunky", "Mikuliczove bunky"], ["aktinomykoza", "Aktinomykóza"]] },
    { id: null, name: "Fixácia a spracovanie tkaniva", members: [["fixacia", "Fixácia"], ["formalin", "Formalín"], ["formaldehyd", "Formaldehyd"], ["parafin", "Parafínový blok"], ["kryostat", "Kryostat"], ["mikrotom", "Mikrotóm"], ["parafin", "Parafínový blok"], ["artefakt", "Artefakt"], ["digitalna-patologia", "Digitálna patológia"], ["peroperacne-vysetrenie", "Peroperačné vyšetrenie"], ["grossing", "Grossing"], ["preanalytika", "Preanalytika"], ["imprint-cytologia", "Imprint"]] },
    { id: null, name: "Jazvenie v čreve", members: [["proktitida", "Proktitída"], ["striktura", "Striktúra"], ["jazva", "Jazva"]] },
    { id: null, name: "Baktérie podľa nároku na kyslík", members: [["aerobne-bakterie", "Aeróbne baktérie"], ["anaerobne-bakterie", "Anaeróbne baktérie"]] },
    { id: null, name: "Sérologické testy na syfilis", members: [["syfilis", "Syfilis"], ["netreponemove-testy", "Netreponémové testy"], ["treponemove-testy", "Treponémové testy"]] },
    { id: null, name: "Uzlíky, uzly a uzliny", members: [["uzlik", "Uzlík"], ["uzol", "Uzol"], ["lymfaticka-uzlina", "Lymfatická uzlina"]] },
    { id: null, name: "Lipidy", members: [["lipidy", "Lipidy"], ["glykolipidy", "Glykolipidy"], ["cholesterol", "Cholesterol"], ["fosfolipidy", "Fosfolipidy"]] },
    { id: null, name: "Bunka – cytoplazma a jadro", members: [["cytoplazma", "Cytoplazma"], ["jadro", "Jadro"], ["chromatin", "Chromatín"]] },
    { id: null, name: "Vlastnosti diagnostického testu", members: [["citlivost", "Citlivosť"], ["specificita", "Špecificita"]] },
    { id: null, name: "Opis nálezu v patológii", members: [["histologia", "Histológia"], ["morfologia", "Morfológia"], ["makroskopicky", "Makroskopický obraz"], ["mikroskopicky", "Mikroskopický obraz"]] },
    { id: null, name: "Príčina a mechanizmus choroby", members: [["etiologia", "Etiológia"], ["patogeneza", "Patogenéza"], ["expozicia", "Expozícia"], ["dispozicia", "Dispozícia"]] },
    { id: null, name: "Poloha mikróba", members: [["intracelularne", "Intracelulárne"], ["extracelularne", "Extracelulárne"]] },
    { id: null, name: "Špecifický a nešpecifický zápal", members: [["nespecificky-zapal", "Nešpecifický zápal"], ["specificky-zapal", "Špecifický zápal"], ["granulom-patola", "Granulóm"]] },
    { id: null, name: "Podporné bunky mozgu", members: [["astrocyt", "Astrocyt"], ["mikroglia", "Mikroglia"], ["glioza", "Glióza"]] },
    { id: null, name: "Tvorba kosti", members: [["osifikacia", "Osifikácia"], ["heterotopicka-osifikacia", "Heterotopická osifikácia"], ["osteoblast", "Osteoblast"]] },
    { id: null, name: "Kmeňové bunky a diferenciácia", members: [["kmenova-bunka", "Kmeňová bunka"], ["diferenciacia", "Diferenciácia"], ["dysplazia", "Dysplázia"], ["atypia", "Atypia"]] },
    { id: null, name: "Svalovina", members: [["hladka-svalovina", "Hladká svalovina"], ["pruhovana-svalovina", "Priečne pruhovaná svalovina"], ["sarkomera", "Sarkoméra"], ["kardiomyocyt", "Kardiomyocyt"]] },
    { id: null, name: "Typy epitelu", members: [["epitel", "Epitel"], ["jednovrstvovy-epitel", "Jednovrstvový epitel"], ["viacvrstvovy-epitel", "Viacvrstvový epitel"], ["dlazdicovy-epitel", "Dlaždicový epitel"], ["cylindricky-epitel", "Cylindrický epitel"], ["prechodny-epitel", "Prechodný epitel"], ["riasinkovy-epitel", "Riasinkový epitel"]] },
    { id: null, name: "Samočistenie dýchacích ciest", members: [["riasinkovy-epitel", "Riasinkový epitel"], ["mukociliarny-klirens", "Mukociliárny klírens"], ["poharikova-bunka", "Pohárikové bunky"]] },
    { id: null, name: "Androgény v prostate", members: [["testosteron", "Testosterón"], ["dht", "Dihydrotestosterón"], ["prostata", "Prostata"]] },
    { id: null, name: "Kortizol a nadobličky", members: [["kortizol", "Kortizol"], ["cushing", "Cushingov syndróm"], ["glukokortikoidy", "Glukokortikoidy"], ["adh", "ADH"]] },
    { id: null, name: "Metabolizmus glukózy a tukov", members: [["glykogenolyza", "Glykogenolýza"], ["glukoneogeneza", "Glukoneogenéza"], ["lipolyza", "Lipolýza"], ["lipogeneza", "Lipogenéza"], ["glykogen", "Glykogén"]] },
    { id: null, name: "Glykémia", members: [["glykemia", "Glykémia"], ["hypoglykemia", "Hypoglykémia"], ["hyperglykemia", "Hyperglykémia"], ["inzulin", "Inzulín"], ["glukagon", "Glukagón"]] },
    { id: null, name: "Fibrinoidná nekróza ciev", members: [["vaskulitida", "Vaskulitída"], ["polyarteritis-nodosa", "Polyarteritis nodosa"], ["maligna-hypertenzia", "Malígna hypertenzia"], ["hypertenzna-kriza", "Hypertenzná kríza"], ["fibrinoid", "Fibrinoid"]] },
    { id: null, name: "Plazmocytové nádory", members: [["plazmocytom", "Plazmocytóm"], ["myelom", "Mnohopočetný myelóm"], ["bence-jones", "Bence-Jonesova bielkovina"], ["plazmocyt", "Plazmocyt"], ["amyloid-al", "AL amyloid"]] },
    { id: null, name: "Farbenie tukov", members: [["olejova-cerven", "Olejová červeň"], ["sudan", "Sudán"], ["steatoza", "Steatóza"]] },
    { id: null, name: "Striebrenie", members: [["striebrenie", "Striebrenie"], ["retikulin", "Retikulín"], ["warthin-starry", "Warthin–Starry"], ["grocott", "Grocott"]] },
    { id: null, name: "Ženské pohlavné orgány", members: [["maternica", "Maternica"], ["vajecnik", "Vaječník"], ["vajickovod", "Vajíčkovod"], ["gravidita", "Gravidita"], ["endometrium", "Endometrium"]] },
    { id: null, name: "Močové ústrojenstvo", members: [["oblicka", "Oblička"], ["nefron", "Nefrón"], ["mocovod", "Močovod"], ["mocovy-mechur", "Močový mechúr"], ["pyelonefritida", "Pyelonefritída"], ["cystitida", "Cystitída"], ["uretritida", "Uretritída"]] },
    { id: null, name: "Horná časť tráviacej rúry", members: [["pazerak", "Pažerák"], ["zaludok", "Žalúdok"], ["dvanastnik", "Dvanástnik"], ["tenke-crevo", "Tenké črevo"], ["hrube-crevo", "Hrubé črevo"], ["konecnik", "Konečník"]] },
    { id: null, name: "Pečeň a žlč", members: [["pecen", "Pečeň"], ["zlc", "Žlč"], ["zlcove-cesty", "Žlčové cesty"], ["cholestaza", "Cholestáza"], ["cholangitida", "Cholangitída"], ["cholecystitida", "Cholecystitída"], ["vratnica", "Vrátnica"]] },
    { id: null, name: "Dutiny srdca", members: [["komory", "Komory srdca"], ["predsiene", "Predsiene srdca"], ["chlopne", "Srdcové chlopne"]] },
    { id: null, name: "Malé cievy", members: [["arteriola", "Arterioly"], ["venula", "Venuly"], ["kapilara", "Kapilára"]] },
    { id: null, name: "Portálna hypertenzia", members: [["vratnica", "Vrátnica"], ["portalna-hypertenzia", "Portálna hypertenzia"], ["cirhoza", "Cirhóza"], ["ascites", "Ascites"], ["splenomegalia", "Splenomegália"]] },
    { id: null, name: "Autonómne nervstvo", members: [["autonomny-nerv", "Autonómny nervový systém"], ["sympatikus", "Sympatikus"], ["parasympatikus", "Parasympatikus"], ["bludny-nerv", "Bludný nerv"]] },
    { id: null, name: "Regulácia tlaku krvi", members: [["baroreceptory", "Baroreceptory"], ["autoregulacia", "Autoregulácia"], ["raas", "Renín–angiotenzín–aldosterón"], ["natriureticky-peptid", "Natriuretické peptidy"]] },
    { id: null, name: "Poruchy vrodené v čreve", members: [["hirschsprung", "Hirschsprungova choroba"], ["megakolon", "Megakolon"]] },
    { id: null, name: "Poruchy výživy", members: [["malabsorpcia", "Malabsorpcia"], ["maldigescia", "Maldigescia"], ["malnutricia", "Malnutrícia"], ["kwashiorkor", "Kwashiorkor"], ["anorexia", "Anorexia"], ["celiakia", "Celiakia"]] },
    { id: null, name: "Choroby obličiek – pojmy", members: [["nefroskleroza", "Nefroskleróza"], ["nefropatia", "Nefropatia"], ["hydronefroza", "Hydronefróza"], ["nefroticky-syndrom", "Nefrotický syndróm"], ["glomerulonefritida", "Glomerulonefritída"]] },
    { id: null, name: "Choroby z prachu", members: [["silikoza", "Silikóza"], ["pneumokonioza", "Pneumokonióza"], ["alveolitida", "Alveolitída"]] },
    { id: null, name: "Srdce pod záťažou", members: [["dilatacia", "Dilatácia"], ["dekompenzacia", "Dekompenzácia"], ["zlyhanie-srdca", "Zlyhanie srdca"], ["koncentricka-hypertrofia", "Koncentrická hypertrofia"], ["excentricka-hypertrofia", "Excentrická hypertrofia"]] },
    { id: null, name: "Vrodené chyby srdca", members: [["vrodene-chyby-srdca", "Vrodené chyby srdca"], ["fallot", "Fallotova tetralógia"], ["koarktacia", "Koarktácia aorty"], ["skrat", "Skrat"], ["cyanoza", "Cyanóza"]] },
    { id: null, name: "Nízky tlak krvi", members: [["hypotenzia", "Hypotenzia"], ["ortostaticka-hypotenzia", "Ortostatická hypotenzia"], ["vazovagalna-synkopa", "Vazovagálna synkopa"], ["kolaps", "Kolaps"]] },
    { id: null, name: "Precitlivenosť", members: [["alergia", "Alergia"], ["anafylaxia", "Anafylaxia"], ["precitlivenost-iv", "Precitlivenosť IV. typu"], ["histamin", "Histamín"], ["mastocyt", "Mastocyt"]] },
    { id: null, name: "Hypertenzia v tehotenstve", members: [["preeklampsia", "Preeklampsia"], ["eklampsia", "Eklampsia"], ["hypertenzia-kriza", "Hypertenzia"]] },
    { id: null, name: "Zvýšený počet erytrocytov", members: [["polycytemia", "Polycytémia"], ["polyglobulia", "Polyglobúlia"], ["erytrocyty", "Erytrocyty"], ["hyperviskozita", "Hyperviskozita"]] },
    { id: null, name: "Nádory krvotvorby", members: [["leukemia", "Leukémia"], ["lymfom", "Lymfóm"], ["mds", "Myelodysplastický syndróm"], ["plazmocytom", "Plazmocytóm"]] },
    { id: null, name: "Zväčšenie sleziny a pečene", members: [["splenomegalia", "Splenomegália"], ["hepatomegalia", "Hepatomegália"], ["hypersplenizmus", "Hypersplenizmus"], ["slezina", "Slezina"]] },
    { id: null, name: "Kolagén a vitamín C", members: [["vitamin-c", "Vitamín C"], ["hydroxylacia-kolagenu", "Hydroxylácia kolagénu"], ["kolagen", "Kolagén"], ["skorbut", "Skorbut"]] },
    { id: null, name: "Cievne nádory a malformácie", members: [["hemangiom", "Hemangióm"], ["malformacia-ciev", "Malformácia ciev"], ["teleangiektazia", "Teleangiektázia"], ["hht", "Hereditárna hemoragická teleangiektázia"]] },
    { id: null, name: "Poruchy krvných lipidov", members: [["hypercholesterolemia", "Hypercholesterolémia"], ["hyperlipoproteinemia", "Hyperlipoproteinémia"], ["dyslipidemia", "Dyslipidémia"], ["ldl", "LDL"], ["ateroskleroza", "Ateroskleróza"]] },
    { id: null, name: "Lipoproteíny", members: [["lipoproteiny", "Lipoproteíny"], ["chylomikron", "Chylomikróny"], ["vldl", "VLDL"], ["ldl", "LDL"], ["hdl", "HDL"]] },
    { id: null, name: "Mikrovaskulárne komplikácie diabetu", members: [["retinopatia", "Retinopatia"], ["neuropatia", "Neuropatia"], ["nefropatia", "Nefropatia"], ["diabetes", "Diabetes mellitus"], ["age", "AGE"]] },
    { id: null, name: "Kyselina močová", members: [["hyperurikemia", "Hyperurikémia"], ["dna", "Dnavý zápal"], ["tofus", "Tofus"], ["kyselina-mocova", "Kyselina močová"]] },
    { id: null, name: "Neurodegeneratívne choroby", members: [["neurodegenerativne-choroby", "Neurodegeneratívne choroby"], ["alzheimer", "Alzheimerova choroba"], ["parkinson", "Parkinsonova choroba"], ["als", "ALS"], ["prion", "Priónové choroby"], ["chaperony", "Chaperóny"]] },
    { id: null, name: "Nádory – benígne a zhubné", members: [["adenom", "Adenóm"], ["leiomyom", "Leiomyóm"], ["fibroadenom", "Fibroadenóm"], ["seminom", "Seminóm"], ["adenokarcinom", "Adenokarcinóm"], ["karcinom", "Karcinóm"], ["in-situ", "Karcinóm in situ"]] },
    { id: null, name: "Meningokoková sepsa", members: [["meningokok", "Meningokok"], ["waterhouse-friderichsen", "Waterhouseov–Friderichsenov syndróm"], ["meningitida", "Meningitída"], ["sepsa", "Sepsa"]] },
    { id: null, name: "Zápaly slinných žliaz", members: [["parotitida", "Parotitída"], ["sialoadenitida", "Sialoadenitída"], ["sjogren", "Sjögrenov syndróm"]] },
    { id: null, name: "HPV a bradavice", members: [["hpv", "HPV"], ["bradavice", "Bradavice"], ["kondylomy", "Ploché kondylómy"]] },
    { id: null, name: "Fixatíva", members: [["fixativum", "Fixatívum"], ["formaldehyd", "Formaldehyd"], ["formalin", "Formalín"], ["glutaraldehyd", "Glutaraldehyd"], ["elektronova-mikroskopia", "Elektrónová mikroskopia"]] },
    { id: null, name: "Zmrazený rez", members: [["kryostat", "Kryostat"], ["zmrazeny-rez", "Zmrazený rez"], ["peroperacne-vysetrenie", "Peroperačné vyšetrenie"]] },
    { id: null, name: "Imunohistochémia – vizualizácia", members: [["imunohistochemia", "Imunohistochémia"], ["dab", "DAB"], ["peroxidaza", "Peroxidáza"], ["epitop", "Epitop"]] },
    { id: null, name: "Cytologické vyšetrenie", members: [["cytologia", "Cytológia"], ["papanicolaou", "Papanicolaouovo farbenie"], ["exfoliativna-cytologia", "Exfoliatívna cytológia"], ["aspiracna-cytologia", "Tenkoihlová aspirácia"]] },
    { id: null, name: "Odbery tkaniva ihlou", members: [["aspiracna-cytologia", "Tenkoihlová aspirácia"], ["core-cut", "Hruboihlová biopsia"], ["trepanobiopsia", "Trepanobiopsia"], ["biopsia", "Biopsia"]] },
    { id: null, name: "Molekulové metódy", members: [["fish", "FISH"], ["hybridizacia", "Hybridizácia in situ"], ["sekvenovanie", "Sekvenovanie"], ["ngs", "NGS"], ["amplifikacia", "Amplifikácia génu"], ["translokacia", "Translokácia"], ["msi", "Mikrosatelitová instabilita"]] },
    { id: null, name: "Receptory rastových faktorov", members: [["egfr", "EGFR"], ["her2", "HER2"]] },
    { id: null, name: "Imunoonkológia", members: [["imunoonkologia", "Imunoonkológia"], ["inhibitory-kontrolnych-bodov", "Inhibítory kontrolných bodov"]] },
    { id: null, name: "Biomarkery", members: [["biomarker", "Biomarker"], ["prediktivny-marker", "Prediktívny marker"], ["prognosticky-marker", "Prognostický marker"]] },
    { id: null, name: "Súdne lekárstvo", members: [["sudne-lekarstvo", "Súdne lekárstvo"], ["toxikologia", "Toxikológia"], ["pitva", "Pitva"], ["virtopsia", "Virtopsia"]] },
    { id: null, name: "Cievne zobrazenie", members: [["angiografia", "Angiografia"], ["katetrizacia", "Katetrizácia"], ["pci", "PCI"]] },
    { id: null, name: "Bielkoviny akútnej fázy", members: [["crp", "CRP"], ["prokalcitonin", "Prokalcitonín"], ["fibrinogen", "Fibrinogén"], ["hepcidin", "Hepcidín"], ["il-6", "IL-6"]] },
    { id: null, name: "Pigmenty z hemu", members: [["biliverdin", "Biliverdín"], ["bilirubin", "Bilirubín"], ["hematoidin", "Hematoidín"], ["hemosiderin", "Hemosiderín"]] },
    { id: null, name: "Bielkoviny plazmy", members: [["albumin", "Albumín"], ["hypoalbuminemia", "Hypoalbuminémia"], ["hypoproteinemia", "Hypoproteinémia"], ["hyperproteinemia", "Hyperproteinémia"], ["onkoticky-tlak", "Onkotický tlak"]] },
    { id: null, name: "Enzýmy v krvi pri poškodení orgánu", members: [["transaminazy", "Transaminázy"], ["fosfataza", "Fosfatázy"], ["alt", "ALT"], ["ast", "AST"], ["gmt", "GMT"]] },
    { id: null, name: "Protinádorová liečba", members: [["cytostatika", "Cytostatiká"], ["chemoterapia", "Chemoterapia"], ["cyklofosfamid", "Cyklofosfamid"], ["radioterapia", "Rádioterapia"], ["ionizujuce-ziarenie", "Ionizujúce žiarenie"]] },
    { id: null, name: "Chirurgia rany", members: [["debridement", "Débridement"], ["nekrektomia", "Nekrektómia"], ["amputacia", "Amputácia"], ["dehiscencia", "Dehiscencia"]] },
    { id: null, name: "Označenie mikróba pre fagocyt", members: [["opsoniny", "Opsoníny"], ["opsonizacia", "Opsonizácia"], ["komplement", "Komplement"], ["fagocytoza", "Fagocytóza"]] },
    { id: null, name: "Zbrane neutrofilu", members: [["superoxid", "Superoxid"], ["elastaza", "Elastáza"], ["kataláza", "Kataláza"], ["nbt-test", "Nitrotetrazóliová modrá"], ["nadph-oxidaza", "NADPH-oxidáza"], ["net", "NET"], ["pad4", "PAD4"]] },
    { id: null, name: "Neurogénny zápal", members: [["nociceptor", "Nociceptor"], ["substancia-p", "Substancia P"], ["neuropeptid", "Neuropeptidy"]] },
    { id: null, name: "Svrbenie a žihľavka", members: [["zihlavka", "Žihľavka"], ["svrbenie", "Svrbenie"], ["histamin", "Histamín"], ["mastocyt", "Mastocyt"]] },
    { id: null, name: "Frekvencia srdca", members: [["tachykardia", "Tachykardia"], ["bradykardia", "Bradykardia"], ["arytmia", "Arytmia"], ["fibrilacia", "Fibrilácia"]] },
    { id: null, name: "Perfúzia tkaniva", members: [["mikrocirkulacia", "Mikrocirkulácia"], ["hypoperfuzia", "Hypoperfúzia"], ["sok", "Šok"]] },
    { id: null, name: "Železo v zápale", members: [["hepcidin", "Hepcidín"], ["ferroportin", "Ferroportín"], ["hemosiderin", "Hemosiderín"], ["il-6", "IL-6"]] },
    { id: null, name: "Horúčka", members: [["pyrogeny", "Pyrogény"], ["horucka", "Horúčka"], ["lps", "Lipopolysacharid"], ["il-1", "IL-1"], ["tnf-alfa", "TNF-α"]] },
    { id: null, name: "Adhezívne molekuly endotelu", members: [["icam-1", "ICAM-1"], ["vcam-1", "VCAM-1"], ["pecam-1", "PECAM-1"], ["selektiny", "Selektíny"], ["integriny", "Integríny"]] },
    { id: null, name: "Podmienky trombózy – prúdenie", members: [["turbulencia", "Turbulencia"], ["stagnacia", "Stagnácia krvi"], ["virchowova-trias", "Virchowova trias"]] },
    { id: null, name: "Objem krvi", members: [["hypovolemia", "Hypovolémia"], ["hypervolemia", "Hypervolémia"], ["hydremia", "Hydrémia"], ["dehydratacia", "Dehydratácia"]] },
    { id: null, name: "Výmena tekutiny v kapiláre", members: [["filtracia", "Filtrácia"], ["reabsorpcia", "Reabsorpcia"], ["onkoticky-tlak", "Onkotický tlak"], ["hydrostaticky-tlak", "Hydrostatický tlak"], ["edem", "Edém"]] },
    { id: null, name: "Príznaky zlyhania srdca", members: [["dyspnoe", "Dyspnoe"], ["paroxyzmalna-dyspnoe", "Paroxyzmálna nočná dyspnoe"], ["ortopnoe", "Ortopnoe"], ["nykturia", "Nyktúria"], ["cyanoza", "Cyanóza"]] },
    { id: null, name: "Typy zlyhania srdca", members: [["systolicke-zlyhanie", "Systolické zlyhanie"], ["diastolicke-zlyhanie", "Diastolické zlyhanie"], ["ejekcna-frakcia", "Ejekčná frakcia"], ["zlyhanie-srdca", "Zlyhanie srdca"]] },
    { id: null, name: "Hemoglobín a hem", members: [["hemoglobin", "Hemoglobín"], ["hem", "Hem"], ["cyanoza", "Cyanóza"], ["erytrocyty", "Erytrocyty"]] },
    { id: null, name: "Fibromatózy", members: [["fibromatozy", "Fibromatózy"], ["dupuytren", "Dupuytrenova choroba"], ["ledderhose", "Ledderhoseho choroba"], ["aponeuroza", "Aponeuróza"]] },
    { id: null, name: "Väzivo svalu", members: [["aponeuroza", "Aponeuróza"], ["endomyzium", "Endomýzium"], ["perimyzium", "Perimýzium"]] },
    { id: null, name: "Choroby kostí a kĺbov", members: [["osteomyelitida", "Osteomyelitída"], ["osteoporoza", "Osteoporóza"], ["artritida", "Artritída"], ["reumatoidna-artritida", "Reumatoidná artritída"]] },
    { id: null, name: "Fyzikálne poškodenie tkaniva", members: [["omrzliny", "Omrzliny"], ["popaleniny", "Popáleniny"], ["kompresia", "Kompresia"], ["gangrena", "Gangréna"]] },
    { id: null, name: "Vysychanie a rozmáčanie", members: [["mumifikacia", "Mumifikácia"], ["maceracia", "Macerácia"], ["gangrena", "Gangréna"]] },
    { id: null, name: "Cytotoxická zbraň lymfocytu", members: [["perforin", "Perforín"], ["granzym", "Granzýmy"], ["kaspazy", "Kaspázy"], ["cd8", "CD8⁺"]] },
    { id: null, name: "Lipidy v bunke", members: [["fosfolipidy", "Fosfolipidy"], ["glycerol", "Glycerol"], ["tag", "Triacylglyceroly"]] },
    { id: null, name: "Lyzozómové a glykogénové choroby", members: [["alfa-glukozidaza", "α-glukozidáza"], ["pompe", "Pompeho choroba"], ["glykogenozy", "Glykogenózy"], ["storage", "Storage choroby"]] },
    { id: null, name: "Skladanie bielkovín", members: [["chaperony", "Chaperóny"], ["misfolding", "Misfolding"], ["amyloid", "Amyloid"], ["prion", "Priónové choroby"]] },
    { id: null, name: "Zápaly dýchacích ciest", members: [["tracheitida", "Tracheitída"], ["laryngotracheitida", "Laryngotracheitída"], ["sinusitida", "Sinusitída"], ["rinitida", "Rinitída"]] },
    { id: null, name: "Druhy nekrózy", members: [["nekroza", "Nekróza"], ["koagulacna-nekroza", "Koagulačná nekróza"], ["kolikvacna-nekroza", "Kolikvačná nekróza"], ["kazeozna-nekroza", "Kazeózna nekróza"], ["tukova-nekroza", "Tuková nekróza"], ["hemoragicka-nekroza", "Hemoragická nekróza"], ["zenkerova-nekroza", "Zenkerova"], ["gumma", "Gumma"], ["mapovita-nekroza", "Mapovitá"], ["fibrinoid", "Fibrinoid"]] },
    { id: null, name: "Gangréna a ohraničenie nekrózy", members: [["gangrena", "Gangréna"], ["vlhka-gangrena", "Vlhká gangréna"], ["sekvester", "Sekvester"], ["demarkacny-lem", "Demarkačný"], ["infarkt", "Infarkt"], ["mumifikacia", "Mumifikácia"]] },
    { id: null, name: "Telieska a inklúzie v bunkách", members: [["hyalin", "Hyalín"], ["malloryho-hyalin", "Malloryho telieska"], ["russellove-telieska", "Russellove telieska"], ["crookove-bunky", "Crookove bunky"], ["councilmanove-telieska", "Councilmanove telieska"], ["corpora-amylacea", "Corpora amylacea"], ["lipofuscin", "Lipofuscín"], ["asteroidne-teliesko", "Asteroidné teliesko"], ["schaumann", "Schaumannove telieska"], ["inkluzia", "Inklúzia"]] },
    { id: null, name: "Mechanizmy poškodenia bunky", members: [["hypoxia", "Hypoxia"], ["ischemia", "Ischémia"], ["mpt", "Pór MPT"], ["vapnik", "Vápnik"], ["reperfuzia", "Reperfúzne"], ["denaturacia", "Denaturácia"], ["er", "Endoplazmatické retikulum"], ["damp", "DAMP"], ["dusikove-radikaly", "Dusíkové radikály"], ["ros", "ROS"]] },
    { id: null, name: "Apoptóza", members: [["apoptoza-patola", "Apoptóza"], ["apoptoticke-telieska", "Apoptotické telieska"], ["receptory-smrti", "Receptory smrti"], ["cad", "CAD"], ["cytochrom-c", "Cytochróm c"], ["p53-patola", "p53"], ["anoikis", "Anoikis"], ["kaspazy", "Kaspázy"], ["autofagia", "Autofágia"], ["eferocytoza", "Eferocytóza"]] },
    { id: null, name: "Adaptácia bunky", members: [["adaptacia", "Adaptácia"], ["atrofia", "Atrofia"], ["hypertrofia", "Hypertrofia"], ["hyperplazia", "Hyperplázia"], ["metaplazia", "Metaplázia"], ["dysplazia", "Dysplázia"], ["involucia", "Involúcia"], ["kastracia", "Kastrácia"], ["homeostaza", "Homeostáza"], ["noxa", "Noxa"]] },
    { id: null, name: "Hlien a glykozaminoglykány", members: [["gag", "Glykozaminoglykány"], ["cysticka-fibroza", "Cystická fibróza"], ["poharikova-bunka", "Pohárikové bunky"], ["katar", "Katarálny"], ["mucin", "Mucín"], ["signet-ring", "Signet-ring"]] },
    { id: null, name: "Interleukíny", members: [["il-1", "IL-1"], ["il-2", "IL-2"], ["il-4", "IL-4"], ["il-6", "IL-6"], ["il-8", "IL-8"], ["il-10", "IL-10"], ["il-12", "IL-12"], ["il-13", "IL-13"], ["interleukiny", "Interleukíny"]] },
    { id: null, name: "Základné pojmy zápalu", members: [["zapal", "Zápal"], ["alteracia", "Alterácia"], ["exsudat", "Exsudát"], ["celsove-znaky", "Celsove znaky"], ["leukocyty", "Leukocyty"], ["neutrofil", "Neutrofil"], ["eozinofil", "Eozinofil"], ["bazofil", "Bazofily"], ["monocyty", "Monocyty"], ["serozny", "Serózny zápal"], ["serozne-blany", "Serózne blany"], ["hyperemia", "Hyperémia"], ["transcytoza", "Transcytóza"], ["infiltrat", "Infiltrát"], ["staza", "Stáza"]] },
    { id: null, name: "Systémová odpoveď na infekciu", members: [["sirs", "SIRS"], ["sofa", "SOFA"], ["mods", "MODS"], ["map", "MAP"], ["vazopresory", "Vazopresory"], ["sepsa", "Sepsa"], ["horucka", "Horúčka"], ["pyrogeny", "Pyrogény"], ["hepcidin", "Hepcidín"]] },
    { id: null, name: "Rastové faktory a hojenie", members: [["pdgf", "PDGF"], ["tgf-beta", "TGF-β"], ["vegf", "VEGF"], ["hif", "HIF"], ["fgf", "FGF-2"], ["mmp", "MMP"], ["angiogeneza", "Angiogenéza"], ["myofibroblast", "Myofibroblast"], ["fibroblast", "Fibroblast"], ["granulacne-tkanivo", "Granulačné tkanivo"], ["regeneracia", "Regenerácia"], ["luxurians", "Hypergranulácia"], ["kozny-step", "Kožný štep"], ["npwt", "NPWT"], ["remodelacia", "Remodelácia"], ["zrasty", "Zrasty"], ["organizacia", "Organizácia"], ["schlofferov-tumor", "Schlofferov tumor"]] },
    { id: null, name: "Makrofágy a ich podoby", members: [["makrofag-patola", "Makrofág"], ["makrofag-m1", "M1"], ["makrofag-m2", "M2"], ["alveolarny-makrofag", "Alveolárny makrofág"], ["epiteloidna-bunka", "Epiteloidná bunka"], ["penove-makrofagy", "Penové makrofágy"], ["obrovska-bunka", "Obrovská viacjadrová bunka"], ["langhans", "Langhansova obrovská bunka"], ["touton", "Toutonova obrovská bunka"]] },
    { id: null, name: "Špeciálne farbenia", members: [["van-gieson", "Van Gieson"], ["trichrom", "Trichróm"], ["perls", "Perlsova reakcia"], ["von-kossa", "Von Kossa"], ["olejova-cerven", "Olejová červeň"], ["retikulin", "Retikulín"], ["gram", "Gramovo farbenie"], ["grocott", "Grocott"], ["alcianova-modra", "Alciánová modrá"], ["ziehl-neelsen", "Ziehl–Neelsen"], ["fite-faraco", "Fite–Faraco"], ["auramin", "Auramínové"], ["pas", "PAS"], ["congo-red", "Congo red"], ["warthin-starry", "Warthin–Starry"], ["he-farbenie", "H&E"]] },
    { id: null, name: "Zobrazovacie metódy", members: [["rtg", "RTG"], ["ct", "CT"], ["usg", "USG"], ["mr", "MR"], ["scintigrafia", "Scintigrafia"], ["angiografia", "Angiografia"], ["echokardiografia", "Echokardiografia"], ["ekg", "EKG"], ["pci", "PCI"], ["virtopsia", "Virtopsia"], ["ultrazvuk", "Ultrazvuk"]] },
    { id: null, name: "Hemostáza — zložky", members: [["hemostaza", "Hemostáza"], ["vwf", "Von Willebrandov faktor"], ["tkanivovy-faktor", "Tkanivový faktor"], ["trombin", "Trombín"], ["fibrin", "Fibrín"], ["fibrinogen", "Fibrinogén"], ["protrombinovy-cas", "Protrombínový čas"], ["aptt", "aPTT"], ["leidenska-mutacia", "Leidenská mutácia"], ["vitamin-k", "Vitamín K"], ["agregacia", "Agregácia"], ["antikoagulancia", "Antikoagulanciá"], ["antiagreganty", "Antiagreganciá"]] },
    { id: null, name: "Krvácavé stavy", members: [["trombocytopenia", "Trombocytopénia"], ["itp", "ITP"], ["ttp", "TTP"], ["schistocyty", "Schistocyty"], ["trombocytopatia", "Trombocytopatia"], ["koagulopatia", "Koagulopatia"], ["hemofilia", "Hemofília"], ["von-willebrandova-choroba", "Von Willebrandova choroba"], ["glanzmann", "Glanzmannova"], ["dic", "DIC"], ["iga-vaskulitida", "IgA vaskulitída"], ["hht", "Hereditárna hemoragická teleangiektázia"], ["antifosfolipidovy-syndrom", "Antifosfolipidový syndróm"], ["skorbut", "Skorbut"], ["skorbut-moller", "Möllerova–Barlowova"]] },
    { id: null, name: "Ischémia a infarkt", members: [["ischemia", "Ischémia"], ["infarkt", "Infarkt"], ["hemoragicka-infarzacia", "Hemoragická infarzácia"], ["rozvodia", "Rozvodia"], ["kolateraly", "Kolaterály"], ["steal", "Steal"], ["raynaud", "Raynaudov"], ["hypoxia", "Hypoxia"], ["tubularna-nekroza", "Tubulárna nekróza"]] },
    { id: null, name: "Formy tuberkulózy", members: [["tbc", "Tuberkulóza"], ["latentna-tbc", "Latentná tuberkulóza"], ["miliarna-tbc", "Miliárna"], ["acinozno-nodozna-tbc", "Acinózno-nodózna tuberkulóza"], ["skrofuloza", "Skrofulóza"], ["pottova-choroba", "Pottova choroba"], ["richove-lozisko", "Richove ložiská"], ["autonefrektomia", "Autonefrektómia"], ["mykobakteremia", "Mykobakterémia"], ["kaverna", "Kaverna"], ["aspergilom", "Aspergilóm"], ["pneumotorax", "Pneumotorax"], ["arozivne-krvacanie", "Arozívne"], ["kochov-fenomen", "Kochov fenomén"], ["orthove-bunky", "Orthove bunky"]] },
    { id: null, name: "Diagnostika tuberkulózy", members: [["igra", "IGRA"], ["tuberkulinovy-test", "Tuberkulínový test"], ["bcg", "BCG"], ["pcr", "PCR"], ["kultivacia", "Kultivácia"], ["nater-ster", "Náter"], ["sputum", "Spútum"], ["ziehl-neelsen", "Ziehl–Neelsen"], ["auramin", "Auramínové"], ["bronchoskopia", "Bronchoskopia"], ["bal", "Bronchoalveolárna laváž"], ["mykolove-kyseliny", "Mykolové kyseliny"], ["rezistencia", "Rezistencia"]] },
    { id: null, name: "Lepra – klinika a bunky", members: [["virchow-lepra", "Virchowove leprové bunky"], ["schwannova-bunka", "Schwannova"], ["mutilacia", "Mutilácia"], ["leprominovy-test", "Lepromínový test"], ["lepra-reakcie", "Lepra reakcie"], ["leva-obliciaj", "Leví obličaj"], ["lepra", "Lepra"]] },
    { id: null, name: "Zriedkavé granulomatózne infekcie", members: [["whipple", "Whippleova choroba"], ["tularemia", "Tularémia"], ["yersiniozna-lymfadenitida", "Mezenteriálna lymfadenitída"], ["listerioza", "Listerióza"], ["lgv", "Venerický lymfogranulóm"], ["chlamydie", "Chlamýdie"], ["aktinomykoza", "Aktinomykóza"], ["sirove-granuly", "Sírové granuly"], ["atypicke-mykobakterie", "Atypické mykobaktérie"], ["terminalny-ileum", "Terminálny ileum"], ["bartonella", "Bartonella"]] },
    { id: null, name: "Granulómy z cudzieho materiálu", members: [["mastenec", "Mastenec"], ["keratin", "Keratín"], ["silikon", "Silikón"], ["cudzie-teleso", "Cudzie teleso"], ["pilonidalny-sinus", "Pilonidálny sínus"], ["hnisavy-granulom", "Hnisavý granulóm"], ["tofus", "Tofus"], ["inertny-material", "Inertný"], ["puzdro", "Väzivové puzdro"], ["pistala", "Píšťala"]] },
    { id: null, name: "Reumatická horúčka", members: [["reumaticka-horucka", "Reumatická horúčka"], ["molekulove-mimikry", "Molekulové mimikry"], ["aschoff", "Aschoffov uzlík"], ["anickov", "Aničkovove bunky"], ["jones", "Jonesove kritériá"], ["aslo", "ASLO"], ["penicilin", "Penicilín"], ["echokardiografia", "Echokardiografia"], ["karditida", "Karditída"]] },
    { id: null, name: "Vaskulitídy", members: [["gpa", "Granulomatóza s polyangiitídou"], ["anca", "ANCA"], ["polyangiitida", "Polyangiitída"], ["mapovita-nekroza", "Mapovitá"], ["sedlovity-nos", "Sedlovitý nos"], ["vaskulitida", "Vaskulitída"], ["iga-vaskulitida", "IgA vaskulitída"], ["polyarteritis-nodosa", "Polyarteritis nodosa"], ["chapel-hill", "Chapel Hill"]] },
    { id: null, name: "Sarkoidóza", members: [["sarkoidoza", "Sarkoidóza"], ["lofgren", "Löfgrenov syndróm"], ["erythema-nodosum", "Erythema nodosum"], ["uveitida", "Uveitída"], ["asteroidne-teliesko", "Asteroidné teliesko"], ["schaumann", "Schaumannove telieska"], ["hla", "HLA"], ["lupus-pernio", "Lupus pernio"], ["ace", "Angiotenzín konvertujúci enzým"], ["berylium", "Berýlium"]] },
    { id: null, name: "Syfilis", members: [["syfilis", "Syfilis"], ["ulcus-durum", "Ulcus durum"], ["kondylomy", "Ploché kondylómy"], ["spirochety", "Špirochéty"], ["gumma", "Gumma"], ["netreponemove-testy", "Netreponémové testy"], ["treponemove-testy", "Treponémové testy"], ["aortitida", "Aortitída"]] },
    { id: null, name: "Imunitná odpoveď", members: [["protilatky", "Protilátky"], ["senzibilizacia", "Senzibilizácia"], ["antigen", "Antigén"], ["ifn-gama", "IFN-γ"], ["hla", "HLA"], ["toll-like", "Toll-like"], ["lektinova-draha", "Lektínová"], ["rejekcia", "Rejekcia"], ["gvhd", "GvHD"], ["sle", "SLE"], ["autoimunita", "Autoinflamatórne"], ["kalikrein", "Kalikreín"]] },
    { id: null, name: "Lieky tlmiace imunitu", members: [["imunosupresia", "Imunosupresia"], ["anti-tnf", "Lieky proti TNF"], ["glukokortikoidy", "Glukokortikoidy"], ["cytostatika", "Cytostatiká"], ["cyklofosfamid", "Cyklofosfamid"], ["nsaid", "NSAID"], ["antihistaminika", "Antihistaminiká"]] },
    { id: null, name: "Choroby tráviacej rúry", members: [["helicobacter", "Helicobacter"], ["gastritida", "Gastritída"], ["pepticky-vred", "Peptický vred"], ["stresovy-vred", "Stresové vredy"], ["achalazia", "Achalázia"], ["barrett", "Barrettov pažerák"], ["polyp", "Polyp"], ["ulceroznakolitida", "Ulcerózna kolitída"], ["crohn", "Crohnova choroba"], ["hepatitida", "Hepatitída"], ["pankreatitida", "Pankreatitída"], ["dysenteria", "Dyzentéria"], ["celiakia", "Celiakia"], ["hirschsprung", "Hirschsprungova choroba"]] },
    { id: null, name: "Parazity", members: [["schistosomoza", "Schistosomóza"], ["echinokok", "Echinokokóza"], ["filarioza", "Filarióza"], ["helminty", "Helminty"], ["eozinofil", "Eozinofil"], ["histoplazma", "Histoplazmóza"], ["toxoplazma", "Toxoplazmóza"], ["leishmania", "Leishmanióza"]] },
    { id: null, name: "Baktérie – predstavitelia", members: [["klostridie", "Klostrídie"], ["corynebacterium", "Corynebacterium"], ["meningokok", "Meningokok"], ["neisseria", "Kvapavka"], ["impetigo", "Impetigo"], ["helicobacter", "Helicobacter"], ["aktinomykoza", "Aktinomykóza"], ["pyogenne-bakterie", "Pyogénne baktérie"], ["chlamydie", "Chlamýdie"], ["staphylococcus", "Staphylococcus"]] },
    { id: null, name: "Choroby srdca", members: [["angina-pectoris", "Angina pectoris"], ["infarkt", "Infarkt"], ["cor-pulmonale", "Cor pulmonale"], ["kmp", "KMP"], ["prevodovy-system", "Prevodový systém"], ["koronarne-cievy", "Koronárne"], ["subendokard", "Subendokard"], ["tamponada", "Tamponáda"], ["vegetacia", "Vegetácia"], ["frank-starling", "Frankov-Starlingov zákon"], ["kardialna-fibroza", "Kardiálna fibróza"], ["blokada-srdca", "Blokáda"]] },
    { id: null, name: "Pľúca – pojmy", members: [["restrikcia", "Reštrikčná porucha"], ["vostinovita-prestavba", "Voštinovitá"], ["acinus", "Acinus"], ["pneumonia", "Pneumónia"], ["lobarna-pneumonia", "Krupózna pneumónia"], ["pleuritida", "Pleuritída"], ["pohrudnica", "Pohrudnica"], ["plucna-hypertenzia", "Pľúcna hypertenzia"], ["dad", "Difúzne alveolárne poškodenie"], ["rds", "RDS"]] },
    { id: null, name: "Hormonálne osi", members: [["hormon", "Hormón"], ["hypofyza", "Hypofýza"], ["tsh", "TSH"], ["nadobličky", "Nadobličky"], ["hypotalamus", "Hypotalamus"], ["adh", "ADH"], ["acth", "ACTH"], ["hyperaldosteronizmus", "Hyperaldosteronizmus"], ["kortizol", "Kortizol"], ["stitna-zlaza", "Štítna žľaza"], ["feochromocytom", "Feochromocytóm"]] },
    { id: null, name: "Hodnotenie choroby", members: [["diagnoza", "Diagnóza"], ["prognoza", "Prognóza"], ["komplikacia", "Komplikácia"], ["diferencialna-diagnoza", "Diferenciálna diagnóza"], ["inkubacia", "Inkubácia"], ["infekcnost", "Infekčnosť"], ["kolonizacia", "Kolonizácia"], ["serotyp", "Sérotyp"], ["skrining", "Skríning"], ["systemova-choroba", "Systémová choroba"]] },
    { id: null, name: "Podporná liečba", members: [["antibiotika", "Antibiotiká"], ["transfuzia", "Transfúzia"], ["dialyza", "Dialýza"], ["antikoagulancia", "Antikoagulanciá"], ["antiagreganty", "Antiagreganciá"], ["vazopresory", "Vazopresory"]] },
    { id: null, name: "Hnisavý zápal – pojmy", members: [["pyogenne-bakterie", "Pyogénne baktérie"], ["hnis", "Hnis"], ["pyogenna-membrana", "Pyogénna membrána"], ["pyosalpinx", "Pyosalpinx"], ["pseudoabsces", "Pseudoabsces"], ["pseudocysta", "Pseudocysta"], ["cysta", "Cysta"], ["ulceracia", "Ulcerácia"]] },
    { id: null, name: "Vitamín D a granulómy", members: [["vitamin-d", "Vitamín D"], ["kalcitriol", "Kalcitriol"], ["ace", "Angiotenzín konvertujúci enzým"], ["sarkoidoza", "Sarkoidóza"]] },
    { id: null, name: "Tkanivá a bunky – základy", members: [["hepatocyt", "Hepatocyt"], ["adipocyt", "Adipocyt"], ["mezotel", "Mezotel"], ["periferny-nerv", "Periférny nerv"], ["sinusoidy", "Sínusoidy"], ["glykokalyx", "Glykokalyx"], ["pericyty", "Pericyty"], ["sept", "Septá"], ["cytoskelet", "Cytoskelet"], ["organela", "Organely"], ["intersticium", "Interstícium"]] },
    { id: null, name: "Pohlavné orgány a hormóny", members: [["semennik", "Semenníky"], ["prostata", "Prostata"], ["menstruacia", "Menštruácia"], ["endometrium", "Endometrium"], ["testosteron", "Testosterón"], ["estrogeny", "Estrogény"], ["progesteron", "Progesterón"]] },
    { id: null, name: "Krv a erytrocyty", members: [["hemolyza", "Hemolýza"], ["kosacikovita-anemia", "Kosáčikovitá"], ["leukogram", "Leukogram"], ["transfuzia", "Transfúzia"], ["agregacia", "Agregácia"], ["hemoglobin", "Hemoglobín"]] },
    { id: null, name: "Úraz a hojenie rán", members: [["polytrauma", "Polytrauma"], ["preleziny", "Preležanina"], ["wallerova", "Wallerova degenerácia"], ["marjolin", "Marjolinov vred"], ["luxurians", "Hypergranulácia"], ["biofilm", "Biofilm"]] },
    { id: null, name: "Apendix a mezentérium", members: [["apendix", "Slepé črevo"], ["peritoneum", "Pobrušnica"], ["terminalny-ileum", "Terminálny ileum"], ["yersiniozna-lymfadenitida", "Mezenteriálna lymfadenitída"], ["polyserozitida", "Polyserozitída"]] },
    { id: null, name: "Mechanizmy cievnych porúch", members: [["anastomoza", "Anastomóza"], ["kolateraly", "Kolaterály"], ["hemodynamika", "Hemodynamika"], ["autoregulacia", "Autoregulácia"], ["centralizacia-obehu", "Centralizácia obehu"], ["hemoroidy", "Hemoroidy"], ["apoplexia", "Apoplexia"]] }
  ];

  window.PF_GROUPS = GROUPS;

  function sibBlock(inner) { return '<div class="sib">' + inner + "</div>"; }

  /* Skupina bez vlastného hesla (id:null) dostane heslo vytvorené tu, aby sa dal názov v riadku „Skupina“
     rozkliknúť: okno vypíše členov skupiny a tí sa klikateľnými stanú sami (engine ich pozná podľa vzorov). */
  function groupTerm(g) {
    var slug = g.name.toLowerCase().replace(/[^a-z0-9áäčďéíĺľňóôŕšťúýž]+/g, "-");
    var id = "skupina-" + slug;
    if (by[id]) return by[id];
    /* každý člen dostane za názvom prvú vetu svojho hesla, aby zoznam nebol len holé názvy */
    function hint(t) {
      var s = String(t.short || "").replace(/<[^>]+>/g, "").trim();
      var cut = s.search(/[.:;](\s|$)/);
      if (cut > 12) s = s.slice(0, cut);
      if (s.length > 100) s = s.slice(0, 100).replace(/\s+\S*$/, "") + "…";
      return s;
    }
    var rows = g.members.filter(function (m) { return by[m[0]]; }).map(function (m) {
      var h = m[2] || hint(by[m[0]]);
      return "<li>" + m[1] + (h ? ' <span class="sib-h">' + h + "</span>" : "") + "</li>";
    });
    var esc = g.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    var t = {
      id: id, title: g.name, group: true, match: [esc],
      short: "Pojmy, ktoré k sebe patria. Kliknutím na niektorý sa otvorí jeho vysvetlivka.",
      body: '<ul class="sib-l">' + rows.join("") + "</ul>"
    };
    D.push(t);
    by[id] = t;
    return t;
  }

  GROUPS.forEach(function (g) {
    if (!g.id) groupTerm(g);
    var term = g.id ? by[g.id] : null;
    if (g.id && !term) return;                     /* skupina bez hesla v dátach — nič nerob */

    if (term && g.list) {
      var rows = g.members.filter(function (m) { return by[m[0]]; }).map(function (m) {
        return "<li>" + m[1] + (m[2] ? ' <span class="sib-h">' + m[2] + "</span>" : "") + "</li>";
      });
      term.body = (term.body || "") +
        sibBlock("<p><b>" + (g.listTitle || "Zástupcovia") + ":</b></p><ul class=\"sib-l\">" + rows.join("") + "</ul>");
    }

    g.members.forEach(function (m) {
      var t = by[m[0]];
      if (!t) return;
      var others = g.members.filter(function (o) { return o[0] !== m[0] && by[o[0]]; }).map(function (o) { return o[1]; });
      var html = g.id
        ? "<p><b>Patrí do skupiny:</b> " + g.label + "</p>"
        : "<p><b>Skupina:</b> " + g.name + "</p>";
      if (others.length) html += "<p><b>Ďalší v skupine:</b> " + others.join(" · ") + "</p>";
      t.body = (t.body || "") + sibBlock(html);
    });
  });
})();

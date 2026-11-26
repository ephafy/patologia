# Skratky na okraji

Slovník skratiek pre **okrajové poznámky** (CLAUDE.md §5.3). Súbor začína „_“, build ho nestavia ako
kapitolu, len z neho číta. Keď sa skratka v kapitole objaví **prvý raz**, `tools/build.js` vloží za daný
odsek, box alebo tabuľku drobnú poznámku na okraj (na mobile a v tlači riadok pod blokom). Sekcie
*Otázky* a *Zdroje* sa neprehľadávajú.

- **Skratka** – ako sa zobrazí na okraji.
- **Význam** – krátko, slovensky; pôvodný anglický názov kurzívou len tam, kde zo skratky inak nie je jasný.
- **Vzor** – nepovinný regulárny výraz, keď sa v texte hľadá iný tvar než samotná skratka
  (zvislú čiaru píš ako `\|`). Hľadá sa s rozlíšením veľkých a malých písmen a len celé „slovo“.
- **Len kap.** – nepovinné čísla kapitol oddelené čiarkou, keď skratka znamená v rôznych kapitolách
  rôzne veci (napr. MAC).

Nová skratka v texte = nový riadok tu. Význam je fakt (názov), nie formulácia z učebnice (§4.1).

## Bunka a metabolizmus

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| ATP | adenozíntrifosfát – „energetická mena“ bunky | | |
| DNA | deoxyribonukleová kyselina | | |
| RNA | ribonukleová kyselina | | |
| mRNA | mediátorová RNA – prepis génu, podľa ktorého ribozóm skladá bielkovinu | | |
| ER | endoplazmatické retikulum | | 1, 2 |
| ROS | reaktívne formy kyslíka, kyslíkové radikály (*reactive oxygen species*) | | |
| MPT | zmena priepustnosti mitochondriovej membrány (*mitochondrial permeability transition*) | | |
| NADH | redukovaný nikotínamidadeníndinukleotid – prenášač elektrónov | | |
| NADPH | redukovaný nikotínamidadeníndinukleotidfosfát – darca elektrónov | | |
| ECM | extracelulárna matrix – medzibunková hmota | | |
| GAG | glykozaminoglykány | | 2 |
| MK | mastné kyseliny | | 2 |
| TAG | triacylglyceroly | | 2 |
| VLDL | lipoproteín s veľmi nízkou hustotou – vyváža tuk z pečene | | |
| HDL | lipoproteín s vysokou hustotou | | |
| AGE | pokročilé produkty glykácie (*advanced glycation end-products*) | | 2 |
| GLUT4 | glukózový transportér 4 | | |
| CFTR | chloridový kanál epitelov (*cystic fibrosis transmembrane conductance regulator*) | | |
| ENaC | epitelový sodíkový kanál | | |
| BCL-2 | *B-cell lymphoma 2* – bielkovina, ktorá bráni apoptóze | `BCL-2\|BCL2` | |
| BAX, BAK | bielkoviny rodiny BCL-2, ktoré apoptózu spúšťajú | `BAX\|BAK` | |
| NPWT | podtlaková terapia rán (*negative pressure wound therapy*) | | |
| NK | prirodzený zabíjač (*natural killer*) – lymfocyt vrodenej imunity | | |

## Poškodenie bunky a hromadenie látok

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| DAMP | molekulové vzory poškodenia (*damage-associated molecular patterns*) | | |
| PAMP | molekulové vzory mikróbov (*pathogen-associated molecular patterns*) | | |
| HMGB1 | *high mobility group box 1* – jadrová bielkovina, mimo bunky signál poškodenia | | |
| TUNEL | značenie koncov nastrihanej DNA (*TdT-mediated dUTP nick end labeling*) | | |
| AL | amyloid z ľahkých reťazcov imunoglobulínov | | 2 |
| AA | amyloid zo sérového amyloidu A | | |
| ATTR | amyloid z transtyretínu | | |
| Aβ2M | amyloid z β₂-mikroglobulínu | | |
| SAA | sérový amyloid A | | |
| TTR | transtyretín | | |
| IAPP | ostrovčekový amyloidový polypeptid (amylín) | | |
| APP | amyloidový prekurzorový proteín | | |
| MGUS | monoklonová gamapatia neurčeného významu | | |
| ISA | Medzinárodná spoločnosť pre amyloidózu (*International Society of Amyloidosis*) | | |
| MASLD | steatotická choroba pečene spojená s metabolickou dysfunkciou | | |
| NAFLD | nealkoholová tuková choroba pečene – starší názov MASLD | | |
| MASH | steatohepatitída spojená s metabolickou dysfunkciou | | |
| NASH | nealkoholová steatohepatitída – starší názov MASH | | |
| MetALD | MASLD so zvýšeným príjmom alkoholu | | |
| K–W | Kimmelstiel–Wilson (uzly v glomerule pri diabete) | | |

## Zápal a imunita

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| TNF, TNF-α | tumor nekrotizujúci faktor – cytokín makrofágov | `TNF(?:-α)?` | |
| IL | interleukín – cytokín, ktorým sa dorozumievajú bunky imunity; číslo označuje typ | `IL-\d+[αβ]?` | |
| IFN-γ | interferón gama | | |
| PG… | prostaglandín; písmeno a index označujú typ (PGE₂, PGI₂, PGD₂) | `PG[A-Z]₂?` | |
| LT… | leukotrién; písmeno označuje typ (LTB₄, LTC₄…) | `LT[A-E]₄?` | |
| COX-1, COX-2 | cyklooxygenáza 1 a 2 | `COX-[12]` | |
| PAF | faktor aktivujúci doštičky (*platelet-activating factor*) | | |
| C1–C9 | zložky komplementu; malé písmeno (C3a, C3b) označuje štiepny produkt | `C[1-9][abq]?` | |
| C1-INH | inhibítor C1 | | |
| MAC | komplex atakujúci membránu (*membrane attack complex*) | | 3 |
| ACE | enzým konvertujúci angiotenzín (*angiotensin-converting enzyme*) | | |
| HAE | hereditárny angioedém | | |
| ICAM-1 | medzibunková adhezívna molekula 1 na endoteli | | |
| LAD | deficit adhézie leukocytov (*leukocyte adhesion deficiency*) | | |
| CGD | chronická granulomatózna choroba (*chronic granulomatous disease*) | | |
| PAD4 | peptidylarginíndeimináza 4 | | |
| NET | neutrofilová extracelulárna pasca (*neutrophil extracellular trap*) | | 3 |
| M1, M2 | dva krajné stavy makrofágu: prozápalový (M1) a reparačný (M2) | `M[12]` | 3,5 |
| Th1, Th2, Th17 | pomocné T-lymfocyty (*T helper*) typu 1, 2 a 17 – líšia sa cytokínmi, ktoré tvoria | `Th\d+` | |
| CD4⁺, CD8⁺ | T-lymfocyty pomocné (CD4⁺) a cytotoxické (CD8⁺) | `CD[48]` | |
| CD + číslo | označenie povrchovej molekuly bunky (*cluster of differentiation*) | `CD\d+` | |
| IgG | imunoglobulín G; IgG4 je jeho štvrtá podtrieda | `IgG4?` | |
| HLA | ľudské leukocytové antigény – molekuly, ktoré predkladajú antigén T-lymfocytom | `HLA(?:-[A-Z0-9]+)?` | |
| CRP | C-reaktívny proteín | | |
| SIRS | syndróm systémovej zápalovej odpovede | | |
| CARS | kompenzačná protizápalová odpoveď | | |
| MODS | syndróm multiorgánovej dysfunkcie | | |
| DIC | diseminovaná intravaskulárna koagulácia | | |
| MAP | stredný arteriálny tlak (*mean arterial pressure*) | | 3 |
| SOFA | bodovanie zlyhávania orgánov (*Sequential Organ Failure Assessment*) | | |
| PaCO₂ | parciálny tlak CO₂ v artériovej krvi | `PaCO₂?` | |
| JIS | jednotka intenzívnej starostlivosti | | |
| GvHD | reakcia štepu proti hostiteľovi (*graft-versus-host disease*) | | |
| ANCA | protilátky proti cytoplazme neutrofilov | | |
| ASLO | antistreptolyzín O – protilátky po streptokokovej infekcii | | |

## Hojenie

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| TGF-β | transformujúci rastový faktor β | | |
| PDGF | rastový faktor z krvných doštičiek | | |
| VEGF | rastový faktor cievneho endotelu | | |
| FGF-2 | fibroblastový rastový faktor 2 | | |
| HIF | faktor indukovaný hypoxiou | | |
| MMP | matrixové metaloproteinázy | `MMP(?:-\d+)?` | |
| α-SMA | aktín hladkého svalu α (*smooth muscle actin*) | | |
| IgG4-RD | choroba asociovaná s IgG4 (*IgG4-related disease*) | | |
| ACR/EULAR | americká a európska reumatologická spoločnosť | | |

## Granulomatózne zápaly a infekcie

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| TBC | tuberkulóza | | |
| ZN | farbenie podľa Ziehla–Neelsena | | 7 |
| BAL | bronchoalveolárna laváž | | 7 |
| IGRA | test uvoľnenia interferónu γ (*interferon-gamma release assay*) | | |
| PPD | purifikovaný proteínový derivát – tuberkulín na kožný test (*purified protein derivative*) | | 7 |
| FW | sedimentácia erytrocytov (podľa Fåhraea a Westergrena) | | |
| AHA | Americká kardiologická spoločnosť (*American Heart Association*) | | |
| BCG | bacil Calmetta a Guérina – oslabený kmeň *M. bovis* | | |
| MAC | komplex *Mycobacterium avium* | | 7 |
| GPA | granulomatóza s polyangiitídou | | 7 |
| HIV | vírus ľudskej imunitnej nedostatočnosti | | |
| AIDS | syndróm získanej imunitnej nedostatočnosti | | |
| CMV | cytomegalovírus | | |
| RPR, VDRL | netreponémové testy na syfilis (*rapid plasma reagin*, *Venereal Disease Research Laboratory*) | `RPR\|VDRL` | |
| TPHA, TPPA | treponémové testy na syfilis (hemaglutinačný a časticový aglutinačný test) | `TPHA\|TPPA` | |
| AHA | Americká kardiologická asociácia (*American Heart Association*) | | |
| WHO | Svetová zdravotnícka organizácia | | |
| WSES | Svetová spoločnosť urgentnej chirurgie (*World Society of Emergency Surgery*) | | |

## Adaptácia a rast

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| ANP | predsieňový nátriuretický peptid | | |
| BNP | nátriuretický peptid typu B – tvorí ho preťažená komora | | |
| NFAT | jadrový faktor aktivovaných T-lymfocytov – transkripčný faktor, ktorý zapína kalcineurín | | |
| IGF-1 | inzulínu podobný rastový faktor 1 | | |
| PI3K–Akt | signálna dráha fosfatidylinozitol-3-kinázy a kinázy Akt – rast a prežitie bunky | `PI3K–Akt\|PI3K` | |
| DHT | dihydrotestosterón | | |
| TSH | tyreotropín – hormón hypofýzy, ktorý riadi štítnu žľazu | | |
| HPV | ľudský papilomavírus | | |
| PSA | prostatický špecifický antigén | | |
| EIN | endometrioidná intraepitelová neoplázia | | |
| PTEN | nádorový supresor – fosfatáza, ktorá brzdí dráhu PI3K | | |
| PAX2 | transkripčný faktor, ktorého strata sprevádza atypickú hyperpláziu endometria | | |
| MMR | bielkoviny opravy chybného párovania báz DNA (*mismatch repair*) | | |
| CDX2 | transkripčný faktor črevnej diferenciácie | | |
| BMP | kostné morfogenetické proteíny | | |

## Metódy a nález

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| MA | makroskopický nález – voľným okom | | |
| MI | mikroskopický nález – svetelný mikroskop | | |
| EM | elektrónový mikroskop | | 2 |
| HE, H&E | hematoxylín–eozín, základné farbenie | `H&E\|HE` | |
| PAS | kyselina jodistá–Schiff (*periodic acid–Schiff*) | | |
| IHC | imunohistochémia | | |
| FFPE | fixované formolom, zaliate do parafínu | | |
| FNA | tenkoihlová aspirácia | | |
| DAB | diaminobenzidín | | |
| FISH | fluorescenčná *in situ* hybridizácia | | |
| PCR | polymerázová reťazová reakcia | | |
| NGS | sekvenovanie novej generácie (*next-generation sequencing*) | | |
| ctDNA | cirkulujúca nádorová DNA | | |
| HER2 | receptor 2 ľudského epidermového rastového faktora | | |
| EGFR | receptor epidermového rastového faktora | | |
| PD-1, PD-L1 | receptor programovanej smrti 1 a jeho ligand – brzda T-lymfocytov | `PD-L1\|PD-1` | |
| TPS | podiel pozitívnych nádorových buniek (*tumor proportion score*) | | |
| ASCO/CAP | americká onkologická spoločnosť a kolégium amerických patológov | | |
| CT | počítačová tomografia | | |
| MR, MRI | magnetická rezonancia | `MRI\|MR` | |
| USG | ultrasonografia | | |
| RTG | röntgen | | |
| EKG | elektrokardiogram | | |

## Klinika

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| IM | infarkt myokardu | | 2 |
| CMP | cievna mozgová príhoda | | |
| ICHDK | ischemická choroba dolných končatín | | |
| PCI | perkutánna koronárna intervencia | | |
| CK, CK-MB | kreatínkináza; MB je jej srdcový izoenzým | `CK(?:-MB)?` | |
| ALT, AST | alanín- a aspartátaminotransferáza – enzýmy hepatocytov | `ALT\|AST` | |
| ACTH | adrenokortikotropný hormón | | |
| ALS | amyotrofická laterálna skleróza | | |
| DM | diabetes mellitus | | |
| T1DM, T2DM | diabetes mellitus 1. a 2. typu | `T[12]DM` | |
| CKD | chronická choroba obličiek (*chronic kidney disease*) | | |
| GFR | glomerulová filtrácia | | |
| HCC | hepatocelulárny karcinóm | | |
| RCC | karcinóm z obličkových buniek (*renal cell carcinoma*) | | |
| RDS | syndróm respiračnej tiesne novorodenca | | |
| SLE | systémový lupus erythematosus | | |
| GIT | gastrointestinálny trakt | | |
| KMP | kardiomyopatia | | |

## Obeh a hemostáza

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| vWF | von Willebrandov faktor – bielkovina, ktorou sa doštičky chytajú o kolagén; chráni faktor VIII | | |
| TF | tkanivový faktor (*tissue factor*) – spúšťač koagulácie na bunkách pod endotelom | | 8 |
| TFPI | inhibítor dráhy tkanivového faktora (*tissue factor pathway inhibitor*) | | |
| GP | glykoproteín – tu receptor na povrchu doštičky (GP Ib, GP IIb/IIIa) | `GP I` | 8 |
| ADP | adenozíndifosfát – tu látka z granúl doštičiek, ktorá aktivuje ďalšie doštičky | | 8 |
| PT, INR | protrombínový čas; INR je jeho prepočet na medzinárodne porovnateľný pomer | `PT\|INR` | |
| aPTT | aktivovaný parciálny tromboplastínový čas | | |
| HIT | heparínom indukovaná trombocytopénia | | |
| ITP | imunitná trombocytopénia (kedysi idiopatická trombocytopenická purpura) | | |
| TTP | trombotická trombocytopenická purpura | | |
| ADAMTS13 | enzým, ktorý strihá veľké multiméry von Willebrandovho faktora | | |
| ISTH | Medzinárodná spoločnosť pre trombózu a hemostázu | | |
| IgA | imunoglobulín A | | |
| ARDS | syndróm akútnej dychovej tiesne (*acute respiratory distress syndrome*) | | |
| IgE | imunoglobulín E – protilátka alergických reakcií | | |
| TT | tuberkuloidná lepra (pól so silnou bunkovou imunitou, málo baktérií) | | 7 |
| LL | lepromatózna lepra (pól so slabou bunkovou imunitou, veľa baktérií) | | 7 |
| BT | hraničná tuberkuloidná lepra (*borderline tuberculoid*) – hraničná forma bližšie k TT | | 7 |
| BB | stredná hraničná lepra (*mid-borderline*) – presne medzi TT a LL | | 7 |
| BL | hraničná lepromatózna lepra (*borderline lepromatous*) – hraničná forma bližšie k LL | | 7 |
| MSH | hormón stimulujúci melanocyty | | |
| ALP | alkalická fosfatáza | | |
| GGT | gama-glutamyltransferáza | | |
| UV | ultrafialové (žiarenie) | | |
| Rh | rhesus – systém krvných skupín (antigén D) | | |
| PAWP | zaklinený tlak v pľúcnici; odráža tlak v ľavej predsieni (*pulmonary arterial wedge pressure*) | | 9 |
| PVR | pľúcny cievny odpor (*pulmonary vascular resistance*) | | 9 |
| WU | Woodova jednotka odporu, mmHg na l/min | | 9 |

## Nádory epitelu

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| APC | gén adenomatóznej polypózy hrubého čreva – supresorový gén, ktorého strata začína cestu adenóm → karcinóm | | |
| FAP | familiárna adenomatózna polypóza | | |
| EBV | vírus Epsteina a Barrovej | | |
| KRAS | onkogén z rodiny RAS – prenáša signál rastových faktorov do jadra | | |
| TP53 | gén bielkoviny p53 – „strážcu genómu“ | | |
| BRAF | onkogén kinázy dráhy MAPK; mutovaný v pílovitej dráhe kolorektálneho karcinómu a v melanóme | | |
| CK7, CK20 | cytokeratín 7 a 20 – ich kombinácia pomáha určiť orgán pôvodu karcinómu | `CK7\|CK20` | |
| TTF-1 | tyreoidálny transkripčný faktor 1 – marker pľúc a štítnej žľazy | | |
| GATA3 | transkripčný faktor buniek prsníka a urotelu | | |
| CEA | karcinoembryonálny antigén | | |
| AFP | alfa-fetoproteín | | |
| PTCH1 | gén receptora Patched 1 – brzda signálnej dráhy Hedgehog | | |
| SMO | Smoothened – receptor dráhy Hedgehog, ktorý PTCH1 brzdí | | |
| VHL | gén von Hippelovej–Lindauovej bielkoviny – supresor; jeho strata zapína tvorbu rastových faktorov ciev | | |
| PitNET | hypofyzárny neuroendokrinný nádor (*pituitary neuroendocrine tumour*) | | |
| NET | dobre diferencovaný neuroendokrinný nádor (*neuroendocrine tumour*) | | 11, 14 |
| NEC | zle diferencovaný neuroendokrinný karcinóm (*neuroendocrine carcinoma*) | | 11, 14 |
| MiNEN | zmiešaný neuroendokrinný a neneuroendokrinný nádor | | |
| MIB-1 | protilátka proti Ki-67 | | |
| GLOBOCAN | celosvetové odhady výskytu a úmrtnosti na nádory (IARC) | | |
| CDH1 | gén E-kadherínu | | |
| BMPR1A, SMAD4 | gény dráhy kostných morfogenetických bielkovín; ich zárodočná mutácia spôsobuje juvenilnú polypózu | `BMPR1A\|SMAD4` | |
| ISUP | Medzinárodná spoločnosť urologickej patológie – skupiny stupňa karcinómu prostaty | | |

## Mezenchýmové nádory

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| FNCLCC | francúzsky systém gradingu sarkómov (*Fédération Nationale des Centres de Lutte Contre le Cancer*) – diferenciácia + mitózy + nekróza | | |
| GIST | gastrointestinálny stromálny nádor | | |
| DFSP | dermatofibrosarcoma protuberans | | |
| UPS | nediferencovaný pleomorfný sarkóm (*undifferentiated pleomorphic sarcoma*) | | |
| MFH | malígny fibrózny histiocytóm – zrušená diagnóza | | |
| PEComa | nádor z perivaskulárnych epiteloidných buniek | | |
| HHV-8 | ľudský herpesvírus 8 – pôvodca Kaposiho sarkómu | | |
| LANA-1 | jadrový antigén latencie HHV-8 | | |
| GLUT1 | transportér glukózy 1 – marker infantilného hemangiómu | | |
| FNA | aspiračná cytológia tenkou ihlou (*fine-needle aspiration*) | | |
| RT-PCR | reverzná transkripcia a polymerázová reťazová reakcia – dôkaz prepisu fúzneho génu | | |
| NGS | sekvenovanie novej generácie | | |
| SMA | hladkosvalový aktín | | |
| EMA | epitelový membránový antigén | | |
| MDM2 | bielkovina, ktorá viaže p53 a posiela ho na odbúranie; amplifikovaná v liposarkóme | | |
| CDK4 | cyklín-dependentná kináza 4 – posúva bunku z fázy G₁ do S | | |
| NTRK | gény receptorových tyrozínkináz TRK; ich fúzie poháňajú niektoré nádory | `NTRK\d?` | |
| KIT | receptorová tyrozínkináza (CD117) mutovaná v GIST | | |
| PDGFRA | receptor α pre rastový faktor z doštičiek | | |
| DOG1 | marker GIST (*discovered on GIST 1*) | | |
| SDH | sukcinátdehydrogenáza – enzým Krebsovho cyklu a dýchacieho reťazca; gény jej podjednotiek *SDHx* | `SDH[BDx]?` | |
| NF1 | neurofibromatóza 1. typu | | |
| RANKL | ligand receptora RANK – signál na tvorbu osteoklastov | | |
| GNAS | gén podjednotky Gs-proteínu; mutovaný pri fibróznej dysplázii | | |
| ERG | transkripčný faktor endotelu – marker cievnych nádorov | | |
| NSE | neurón-špecifická enoláza | | |
| LCA | spoločný antigén leukocytov (CD45) | | |
| HMB-45 | marker melanocytov a buniek PEComa | | |
| HPF | zorné pole veľkého zväčšenia (*high-power field*) | | |
| TNM | systém stagingu: T – nádor, N – uzliny, M – metastázy | | |
| AJCC | Americký spoločný výbor pre rakovinu – vydáva pravidlá TNM | | |
| R0 | resekcia s okrajmi bez nádoru (R1 – nádor v okraji mikroskopicky, R2 – makroskopicky) | | |
| bFGF | základný rastový faktor fibroblastov | | |
| NF-κB | transkripčný faktor zápalu a prežitia bunky | `NF-κB` | |
| MyoD1 | jadrový transkripčný faktor svalovej diferenciácie | | |
| NKX2-2 | jadrový transkripčný faktor – marker Ewingovho sarkómu | | |
| PVC | polyvinylchlorid | | |

## Neuroektodermové a neuroendokrinné nádory

| Skratka | Význam | Vzor | Len kap. |
| --- | --- | --- | --- |
| CNS | centrálny nervový systém – mozog a miecha |  |  |
| NE | neuroendokrinný (bunka, program) |  | 14 |
| NEN | neuroendokrinné neoplázie – NET, NEC a MiNEN |  |  |
| LCNEC | veľkobunkový neuroendokrinný karcinóm (*large cell neuroendocrine carcinoma*) |  |  |
| SCNEC | malobunkový neuroendokrinný karcinóm (*small cell neuroendocrine carcinoma*) |  |  |
| PanNET | neuroendokrinný nádor pankreasu (*pancreatic neuroendocrine tumour*) |  |  |
| PNET | primitívny neuroektodermový nádor – zrušený súborný názov | `CNS-PNET\|PNET` |  |
| AT/RT | atypický teratoidný/rabdoidný nádor CNS | `AT/RT` |  |
| MPNST | malígny nádor obalov periférneho nervu (*malignant peripheral nerve sheath tumour*) |  |  |
| MMNST | malígny melanotický nádor obalov nervov |  |  |
| NF2 | gén merlínu; zárodočná mutácia spôsobuje NF2-SWN |  |  |
| NF2-SWN | schwannomatóza súvisiaca s génom NF2 (kedysi neurofibromatóza 2. typu) |  |  |
| PRKAR1A | gén regulačnej podjednotky proteínkinázy A – mutovaný pri Carneyho komplexe |  |  |
| SMARCB1 | gén komplexu prestavby chromatínu (INI1) – schwannomatóza, rabdoidné nádory |  |  |
| LZTR1 | gén, ktorého zárodočná mutácia spôsobuje schwannomatózu |  |  |
| PRC2 | represívny komplex Polycomb 2 – udržiava gény vypnuté |  |  |
| CDKN2A | gén brzdy bunkového cyklu p16 (homozygotná delécia aj *CDKN2A/B*) | `CDKN2A(?:/B)?` |  |
| RAS | malé G-bielkoviny, ktoré prenášajú signál na delenie (aktívna forma RAS-GTP, neaktívna RAS-GDP) | `RAS-GTP\|RAS-GDP\|RAS` |  |
| NRAS | gén z rodiny RAS |  |  |
| MAPK | dráha mitogénom aktivovaných kináz (RAS–RAF–MEK–ERK) |  |  |
| RAF | kináza dráhy MAPK priamo za RAS (BRAF je jej forma) |  |  |
| MEK | kináza dráhy MAPK medzi RAF a ERK |  |  |
| ERK | koncová kináza dráhy MAPK – zapína gény delenia |  |  |
| V600E | najčastejšia mutácia BRAF (valín → glutamát v pozícii 600) |  |  |
| MYCN | gén transkripčného faktora z rodiny MYC – amplifikovaný v neuroblastóme | `MYCN\|N-MYC` |  |
| ALK | receptorová tyrozínkináza – mutovaná v časti neuroblastómov |  |  |
| PHOX2B | transkripčný faktor sympatikových neurónov – marker neuroblastómu |  |  |
| VMA | kyselina vanilmandľová – odbúraný adrenalín a noradrenalín v moči |  |  |
| HVA | kyselina homovanilová – odbúraný dopamín v moči |  |  |
| VIP | vazoaktívny intestinálny peptid |  |  |
| INRG | medzinárodný systém rizikových skupín neuroblastómu (*International Neuroblastoma Risk Group*) |  |  |
| MS | štádium neuroblastómu dojčiat s metastázami len v koži, pečeni a kostnej dreni (predtým 4S) |  | 14 |
| CD99 | membránová bielkovina – marker Ewingovho sarkómu |  |  |
| CD45 | spoločný antigén leukocytov – marker lymfómov a leukémií |  |  |
| EWSR1 | gén, ktorý sa pri Ewingovom sarkóme spája s FLI1 (fúzia *EWSR1::FLI1*) |  |  |
| FLI1 | transkripčný faktor; partner EWSR1 vo fúzii Ewingovho sarkómu |  |  |
| PAX3 | transkripčný faktor; jeho fúzia s FOXO1 poháňa alveolárny rabdomyosarkóm | `PAX3/7\|PAX3` |  |
| FOXO1 | transkripčný faktor; partner PAX3 alebo PAX7 vo fúzii rabdomyosarkómu |  |  |
| WT1 | gén Wilmsovho nádoru – marker nefroblastómu |  |  |
| GFAP | gliová fibrilárna kyslá bielkovina – marker astrocytov |  |  |
| SOX10 | transkripčný faktor buniek nervovej lišty – marker Schwannových buniek a melanocytov |  |  |
| S100 | bielkovina viažuca vápnik – marker Schwannových buniek, melanocytov a sustentakulárnych buniek |  |  |
| INSM1 | jadrový transkripčný faktor neuroendokrinnej diferenciácie |  |  |
| SSTR | somatostatínový receptor (SSTR1–5, najdôležitejší SSTR2) | `SSTR\d?` |  |
| PRRT | rádionuklidová terapia cielená na peptidový receptor (*peptide receptor radionuclide therapy*) |  |  |
| 5-HIAA | kyselina 5-hydroxyindoloctová – odbúraný serotonín v moči |  |  |
| ECL | bunky podobné enterochromafinným (*enterochromaffin-like*) – tvoria histamín v žalúdku |  |  |
| MEN1 | mnohopočetná endokrinná neoplázia 1. typu (gén *MEN1*, menín) |  |  |
| MEN2 | mnohopočetná endokrinná neoplázia 2. typu (gén *RET*) | `MEN2[AB]?` |  |
| RET | receptorová tyrozínkináza – aktivačná mutácia pri MEN2 |  |  |
| HIF | faktor indukovaný hypoxiou – zapína gény pre cievy a glykolýzu |  |  |
| PASS | skóre histologických znakov feochromocytómu (*Pheochromocytoma of the Adrenal gland Scaled Score*) |  |  |
| GAPP | skóre feochromocytómu a paragangliómu s typom katecholamínov a Ki-67 |  |  |
| WDHA | vodnaté hnačky, hypokaliémia, achlórhydria – syndróm VIPómu |  |  |
| IDH | izocitrátdehydrogenáza – jej mutácia delí gliómy dospelých | `IDH\d?` |  |
| H3 | histón H3 – jeho mutácia pri gliómoch strednej čiary u detí |  | 14 |
| WNT | signálna dráha cez β-katenín – skupina meduloblastómu |  |  |
| SHH | signálna dráha *sonic hedgehog* – skupina meduloblastómu |  |  |
| MCPyV | polyomavírus Merkelových buniek (*Merkel cell polyomavirus*) |  |  |
| CK20 | cytokeratín 20 – marker karcinómu z Merkelových buniek a hrubého čreva |  |  |
| TTF-1 | tyreoidálny transkripčný faktor 1 – marker pľúc a štítnej žľazy |  |  |
| RB1 | supresorový gén retinoblastómu; jeho bielkovina RB brzdí bunkový cyklus | `RB1\|RB` | 14 |
| ATRX | gén remodelácie chromatínu pri teloméroch – mutovaný v NET pankreasu |  |  |
| DAXX | gén partnera ATRX pri ukladaní histónu H3.3 – mutovaný v NET pankreasu |  |  |
| MUTYH | gén opravy DNA vystrihnutím bázy |  |  |
| CHEK2 | gén kontrolného bodu bunkového cyklu po poškodení DNA |  |  |
| ATP6AP1/2 | gény pomocných podjednotiek protónovej pumpy lyzozómov – mutované v nádore z granulárnych buniek | `ATP6AP[12]` |  |
| mTOR | kináza, ktorá riadi rast bunky a syntézu bielkovín |  |  |
| Ki-67 | bielkovina jadier deliacich sa buniek – index proliferácie |  |  |
| PET | pozitrónová emisná tomografia |  |  |
| ABCDE | pomôcka na podozrivé znamienko: asymetria, okraj, farba, priemer, vývoj |  |  |
| APUD | staršie označenie buniek, ktoré prijímajú a dekarboxylujú prekurzory amínov |  |  |

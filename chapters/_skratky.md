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
| NET | neutrofilová extracelulárna pasca (*neutrophil extracellular trap*) | | |
| M1, M2 | dva krajné stavy makrofágu: prozápalový (M1) a reparačný (M2) | `M[12]` | |
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

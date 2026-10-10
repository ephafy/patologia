/* PATOLA — GENEROVANÉ nástrojom tools/build.js (funkcia buildServiceWorker).
   Neupravuj ručne. Zoznam súborov nižšie sa pri každom builde prepočíta
   z aktuálneho obsahu chapters/ a assets/, takže sa nemôže rozísť s knihou.
   Registruje ho assets/js/pwa.js. */
"use strict";
const CACHE_VERSION = "1791626918569";
const CACHE_NAME = "patola-" + CACHE_VERSION;
const PRECACHE_URLS = [
  "assets/fonts/SourceSerif4Variable-Italic.ttf.woff2",
  "assets/fonts/SourceSerif4Variable-Roman.ttf.woff2",
  "assets/fonts/fonts.css",
  "assets/glossary/01-adaptacia-a-bunkova-smrt.js",
  "assets/glossary/02-nekroza-a-gangrena.js",
  "assets/glossary/03-dystrofie-a-amyloid.js",
  "assets/glossary/04-zapal-a-exsudat.js",
  "assets/glossary/05-mechanizmy-a-skratky.js",
  "assets/glossary/06-obeh-a-hemostaza.js",
  "assets/glossary/07-celkovy-obeh.js",
  "assets/images/abscess-histology.jpg",
  "assets/images/actinomycosis.jpg",
  "assets/images/acute-hepatitis-histology.jpg",
  "assets/images/adrenal-hemorrhage-wfs.jpg",
  "assets/images/amniotic-fluid-embolism.jpg",
  "assets/images/amyloid-congo-red-polarized.jpg",
  "assets/images/amyloid-congo-red.jpg",
  "assets/images/amyloid-kidney-he.jpg",
  "assets/images/arteriolar-hyalinosis.jpg",
  "assets/images/aschoff-body.jpg",
  "assets/images/asteroid-body.jpg",
  "assets/images/ballooning-hepatocytes.jpg",
  "assets/images/barrett-alcian-blue.jpg",
  "assets/images/bowel-hemorrhagic-infarct.jpg",
  "assets/images/bph-bladder-gross.jpg",
  "assets/images/brain-atrophy-ct.png",
  "assets/images/brain-infarct-histology.jpg",
  "assets/images/caseating-granuloma.jpg",
  "assets/images/cerebral-hemorrhage.jpg",
  "assets/images/cholesterol-embolus.jpg",
  "assets/images/cmv-owl-eye.jpg",
  "assets/images/congestive-hepatopathy-trichrome.jpg",
  "assets/images/cor-pulmonale-gross.jpg",
  "assets/images/corpora-amylacea-prostate.jpg",
  "assets/images/dad-hyaline-membranes.jpg",
  "assets/images/dic-schistocytes.jpg",
  "assets/images/dupuytren-hand.jpg",
  "assets/images/dvt-leg.jpg",
  "assets/images/endometrial-hyperplasia.jpg",
  "assets/images/fat-embolism-lung.jpg",
  "assets/images/fat-necrosis-pancreatitis.jpg",
  "assets/images/fibrin-thrombi-glomerulus.jpg",
  "assets/images/fibrinoid-necrosis-arteriole.jpg",
  "assets/images/fibrinoid-necrosis-vasculitis.jpg",
  "assets/images/fibrinopurulent-peritonitis.jpg",
  "assets/images/fibrinous-pericarditis.jpg",
  "assets/images/foreign-body-giant-cell.jpg",
  "assets/images/frozen-section-cryostat.jpg",
  "assets/images/gangrene-foot.jpg",
  "assets/images/gastric-intestinal-metaplasia.jpg",
  "assets/images/granulation-finger.jpg",
  "assets/images/granulation-tissue.jpg",
  "assets/images/gumma-nose.jpg",
  "assets/images/he-vs-ki67.jpg",
  "assets/images/her2-ihc-3plus.jpg",
  "assets/images/hht-lips.jpg",
  "assets/images/hyaline-cast-urine.jpg",
  "assets/images/hyalinized-collagen.jpg",
  "assets/images/iga-vasculitis-purpura.jpg",
  "assets/images/k1-19.jpg",
  "assets/images/k1-20.jpg",
  "assets/images/k1-21.jpg",
  "assets/images/keloid-histology.jpg",
  "assets/images/keloid-postsurgical.jpg",
  "assets/images/kw-nodular-glomerulosclerosis.jpg",
  "assets/images/langhans-giant-cell.jpg",
  "assets/images/lung-abscess-gross.jpg",
  "assets/images/lung-congestion-siderophages.jpg",
  "assets/images/lung-hemorrhagic-infarct.jpg",
  "assets/images/lvh-gross.jpg",
  "assets/images/lymphedema-leg.jpg",
  "assets/images/lymphocytic-myocarditis.jpg",
  "assets/images/mallory-body.jpg",
  "assets/images/mi-healing-1-macrophages.jpg",
  "assets/images/mi-healing-2-granulation.jpg",
  "assets/images/mi-healing-3-collagen.jpg",
  "assets/images/mi-healing-4-scar.jpg",
  "assets/images/microtome-ribbon.jpg",
  "assets/images/miliary-tb.jpg",
  "assets/images/mucinous-carcinoma.jpg",
  "assets/images/myocardial-hypertrophy-histology.jpg",
  "assets/images/neurogenic-atrophy-muscle.jpg",
  "assets/images/nutmeg-liver-gross.jpg",
  "assets/images/pancreatic-lipomatosis.jpg",
  "assets/images/pap-smear-normal.jpg",
  "assets/images/petechiae-leg.jpg",
  "assets/images/pitting-edema.jpg",
  "assets/images/prostate-nodular-hyperplasia.jpg",
  "assets/images/pseudomembranous-colitis.jpg",
  "assets/images/pulmonary-embolus-gross.jpg",
  "assets/images/purulent-pericarditis.jpg",
  "assets/images/ranke-complex.jpg",
  "assets/images/recanalized-thrombus.jpg",
  "assets/images/renal-infarct-gross.jpg",
  "assets/images/renal-infarct-histology.jpg",
  "assets/images/russell-bodies.jpg",
  "assets/images/sarcoid-granuloma.jpg",
  "assets/images/serous-blister.jpg",
  "assets/images/shock-liver.jpg",
  "assets/images/signet-ring-stomach-arrows.jpg",
  "assets/images/splenic-infarcts-healed.jpg",
  "assets/images/stain-alcian-blue.jpg",
  "assets/images/stain-gram.jpg",
  "assets/images/stain-grocott.jpg",
  "assets/images/stain-masson-trichrome.jpg",
  "assets/images/stain-oil-red-o.jpg",
  "assets/images/stain-pas.jpg",
  "assets/images/stain-perls.jpg",
  "assets/images/stain-reticulin.jpg",
  "assets/images/stain-van-gieson.jpg",
  "assets/images/stain-von-kossa.jpg",
  "assets/images/steatosis-liver.jpg",
  "assets/images/suture-granuloma.jpg",
  "assets/images/tb-cavity.jpg",
  "assets/images/thrombus-lines-of-zahn.jpg",
  "assets/images/traumatic-neuroma.jpg",
  "assets/images/ziehl-neelsen.jpg",
  "assets/img/icon-180.png",
  "assets/img/icon-192.png",
  "assets/img/icon-32.png",
  "assets/img/icon-512.png",
  "assets/img/icon-maskable-512.png",
  "assets/img/icon-maskable.svg",
  "assets/img/icon.svg",
  "assets/js/glossary.js",
  "assets/js/peek.js",
  "assets/js/pwa.js",
  "assets/js/site.js",
  "assets/styles/glossary.css",
  "assets/styles/palette.css",
  "assets/styles/site.css",
  "chapters/00_uvod_metody.html",
  "chapters/01_atrofia_nekroza_apoptoza.html",
  "chapters/02_dystrofie.html",
  "chapters/03_zapal_vseobecne.html",
  "chapters/04_typy_zapalu.html",
  "chapters/05_hojenie.html",
  "chapters/06_progresivne_zmeny.html",
  "chapters/07_granulomatozne_zapaly.html",
  "chapters/08_miestne_poruchy_obehu.html",
  "chapters/09_celkove_poruchy_obehu.html",
  "chapters/fig/fig-adaptacia-mapa.svg",
  "chapters/fig/fig-akumulacia.svg",
  "chapters/fig/fig-amyloid-struktura.svg",
  "chapters/fig/fig-amyloid-vznik.svg",
  "chapters/fig/fig-apoptoza-drahy.svg",
  "chapters/fig/fig-casovy-priebeh.svg",
  "chapters/fig/fig-cftr.svg",
  "chapters/fig/fig-diabetes-komplikacie.svg",
  "chapters/fig/fig-edem-sily.svg",
  "chapters/fig/fig-embolia-cesty.svg",
  "chapters/fig/fig-granulom-mapa.svg",
  "chapters/fig/fig-hojenie-os.svg",
  "chapters/fig/fig-hypoxia-dystrofie.svg",
  "chapters/fig/fig-intersticium.svg",
  "chapters/fig/fig-koagulacna-kolikvacna.svg",
  "chapters/fig/fig-kruh-absces.svg",
  "chapters/fig/fig-kruh-dic.svg",
  "chapters/fig/fig-kruh-hypertrofia.svg",
  "chapters/fig/fig-kruh-mpt.svg",
  "chapters/fig/fig-kruh-rana.svg",
  "chapters/fig/fig-kruh-sepsa.svg",
  "chapters/fig/fig-kruh-sok.svg",
  "chapters/fig/fig-kruh-srdce.svg",
  "chapters/fig/fig-leukocytova-kaskada.svg",
  "chapters/fig/fig-nekroza-apoptoza.svg",
  "chapters/fig/fig-nekroza-patogeneza.svg",
  "chapters/fig/fig-obeh-celkovy-mapa.svg",
  "chapters/fig/fig-obeh-mapa.svg",
  "chapters/fig/fig-osud-bunky.svg",
  "chapters/fig/fig-regeneracia-matica.svg",
  "chapters/fig/fig-steatoza-miesta.svg",
  "chapters/fig/fig-typy-zapalu.svg",
  "chapters/fig/fig-zapal-mapa.svg",
  "index.html",
  "manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(PRECACHE_URLS.map((u) =>
        fetch(u, { cache: "reload" }).then((resp) => { if (resp.ok) return cache.put(u, resp); }).catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // cudziu doménu (napr. odkaz na ChatGPT) nikdy necachuj
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((resp) => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return resp;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

/* Vynútená aktualizácia (tlačidlo „Aktualizovať appku“ na hlavnej stránke, assets/js/pwa.js):
   keď na serveri nie je nová verzia, stiahnu sa všetky súbory nanovo do tej istej cache.
   Stránka dostáva priebeh cez port zo správy a po skončení sa načíta znova. Súbor, ktorý
   sa stiahnuť nepodarí, ostáva v cache v pôvodnej podobe. */
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "pf-refresh") return;
  const port = event.ports && event.ports[0];
  const say = (m) => { if (port) port.postMessage(m); };
  const total = PRECACHE_URLS.length;
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const queue = PRECACHE_URLS.slice();
      let done = 0, failed = 0;
      const next = () => {
        const u = queue.shift();
        if (!u) return Promise.resolve();
        return fetch(u, { cache: "reload" })
          .then((resp) => { if (!resp.ok) throw new Error(String(resp.status)); return cache.put(u, resp); })
          .catch(() => { failed++; })
          .then(() => { done++; say({ done, total }); return next(); });
      };
      return Promise.all([0, 1, 2, 3, 4, 5].map(next)).then(() => say({ finished: true, failed, total }));
    })
  );
});

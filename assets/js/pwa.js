/* Registrácia service workera pre offline appku (PWA). Zdieľaný súbor všetkých kníh (KNIHY-CORE);
   názov knihy berie z <meta name="pf-book"> (vkladá build / hub).

   Cesta k service-worker.js sa odvodzuje z URL tohto skriptu rovnako ako
   v assets/js/glossary.js, takže funguje z index.html aj z chapters/*.html
   bez toho, aby musel poznať svoju hĺbku v strome (a bez ohľadu na to, či
   beží z domény alebo z podcesty GitHub Pages). */
(function () {
  "use strict";
  var ROOT = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName("script");
      s = all[all.length - 1];
    }
    var src = (s && s.src) || "";
    var i = src.lastIndexOf("/assets/js/");
    return i === -1 ? "./" : src.slice(0, i + 1);
  })();

  // lokálne nástroje autora: len z disku a len ak existuje admin/ (je v .gitignore, na webe nie je)
  if (location.protocol === "file:") {
    var a = document.createElement("script");
    a.src = ROOT + "admin/admintools.js";
    a.onerror = function () { a.remove(); };
    document.head.appendChild(a);
  }

  if (!("serviceWorker" in navigator)) return;
  // file:// nemá Service Worker API vôbec, takže offline z lokálneho disku
  // funguje aj bez neho — toto len doplní inštalovateľnú appku.
  if (location.protocol !== "http:" && location.protocol !== "https:") return;

  var sw = navigator.serviceWorker;
  // kapitola v ráme (čítačka na hlavnej stránke, náhľad) aktualizáciu nerieši — robí to okno nad ňou
  var TOP = window.top === window.self;
  var hadController = !!sw.controller;   // false = prvá návšteva, niet čo aktualizovať
  var OPENED = Date.now();

  window.addEventListener("load", function () {
    sw.register(ROOT + "service-worker.js", { scope: ROOT })
      .then(function (reg) {
        if (!TOP) return;
        /* Novú verziu hľadá prehliadač sám len pri načítaní stránky. Nainštalovaná
           appka však ostáva otvorená na pozadí celé dni — preto sa pri každom
           návrate do nej opýtame sami (najviac raz za minútu). */
        var asked = Date.now();
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState !== "visible" || Date.now() - asked < 60000) return;
          asked = Date.now();
          reg.update().catch(function () {});
        });
      })
      .catch(function () {
        /* offline-first appka je bonus, nie predpoklad — zlyhanie registrácie
           (napr. starý prehliadač) nesmie nič v knihe rozbiť. */
      });
  });

  /* Nová verzia je stiahnutá a prevzala stránku (service-worker.js: skipWaiting +
     clients.claim), no otvorená stránka je ešte zo starej. Načítame ju znova, aby
     čitateľ nevidel starú až do ďalšieho otvorenia; pozíciu v texte obnoví peek.js,
     otvorenú kapitolu hlavná stránka. Nie uprostred čítania: hneď len krátko po
     otvorení alebo keď je appka na pozadí, inak až keď z nej čitateľ odíde. */
  if (!TOP) return;

  var reloading = false;
  var reload = function () {
    if (reloading) return;
    reloading = true;
    location.reload();
  };
  var forcing = false;   // čitateľ stlačil „Aktualizovať appku“ — načítať znova hneď
  var reloadUpdated = function () {
    try { sessionStorage.setItem("pwa-updated", "1"); } catch (e) {}
    reload();
  };
  sw.addEventListener("controllerchange", function () {
    if (forcing) { reloadUpdated(); return; }
    if (!hadController) { hadController = true; return; }
    if (document.visibilityState !== "visible" || Date.now() - OPENED < 30000) { reload(); return; }
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible") reload();
    });
  });

  /* ── offline kópia celej knihy (23. 11. 2026) ──
     Service worker pri inštalácii stiahne text a kód; zvyšok (obrázky) sťahuje táto slučka po
     dávkach. Po výpadku, zavretí appky alebo zmazaní údajov pokračuje tam, kde prestala. */
  var offlineView = null;   // hlavná stránka tu zobrazuje stav
  var lastState = null;
  var mb = function (b) { return (b / 1048576).toLocaleString("sk-SK", { maximumFractionDigits: 0 }) + " MB"; };
  var ask = function (msg, ms) {
    return sw.ready.then(function (reg) {
      return new Promise(function (ok, no) {
        var target = reg.active;
        if (!target) { no(new Error("bez service workera")); return; }
        var ch = new MessageChannel();
        var t = setTimeout(function () { no(new Error("bez odpovede")); }, ms || 120000);
        ch.port1.onmessage = function (e) {
          clearTimeout(t);
          if (e.data && e.data.error) no(new Error(e.data.error)); else ok(e.data);
        };
        target.postMessage(msg, [ch.port2]);
      });
    });
  };
  var syncing = false, waitMs = 0, retry = 0, userAsked = false;
  var showState = function (s) { lastState = s; if (offlineView) offlineView(s); };
  var syncLoop = function () {
    if (syncing) return;
    clearTimeout(retry);
    var saver = navigator.connection && navigator.connection.saveData;
    if (navigator.onLine === false || (saver && !userAsked)) {
      ask({ type: "pf-status" }).then(function (s) { s.paused = !s.complete && (saver && !userAsked ? "saver" : "offline"); showState(s); }).catch(function () {});
      return;
    }
    syncing = true;
    var step = function (before) {
      ask({ type: "pf-sync", max: 24 }).then(function (s) {
        showState(s);
        if (s.complete) {
          syncing = false; waitMs = 0;
          if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
          return;
        }
        if (s.quota) { syncing = false; return; }
        if (s.done > before) { waitMs = 0; step(s.done); return; }
        syncing = false;                        // bez pokroku: skúsi znova o chvíľu
        waitMs = Math.min(waitMs ? waitMs * 2 : 5000, 60000);
        retry = setTimeout(syncLoop, waitMs);
      }).catch(function () {
        syncing = false;
        waitMs = Math.min(waitMs ? waitMs * 2 : 5000, 60000);
        retry = setTimeout(syncLoop, waitMs);
      });
    };
    step(-1);
  };
  window.addEventListener("load", function () { sw.ready.then(syncLoop).catch(function () {}); });
  window.addEventListener("online", function () { waitMs = 0; syncLoop(); });
  window.addEventListener("offline", function () { syncLoop(); });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && (!lastState || !lastState.complete)) syncLoop();
  });

  /* ── tlačidlo „Stiahnuť appku“ (vpravo na lište hlavnej stránky, index.html) ──
     Chrome, Edge a prehliadače na Androide ponúkajú inštaláciu udalosťou
     beforeinstallprompt: tlačidlo sa ukáže, až keď príde, a klik otvorí systémové
     okno inštalácie. iPhone a iPad túto udalosť nemajú — tam tlačidlo ukáže, kde je
     „Pridať na plochu“. V už nainštalovanej appke a v prehliadači, ktorý inštaláciu
     nevie (Firefox na počítači), ostáva skryté. */
  (function () {
    var inst = document.getElementById("appInstall");
    var tip = document.getElementById("appInstallTip");
    if (!inst || !tip) return;
    var installed = navigator.standalone === true ||
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
    if (installed) return;

    var offer = null;   // odložená ponuka prehliadača
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();   // namiesto lišty prehliadača vlastné tlačidlo
      offer = e;
      inst.hidden = false;
    });
    window.addEventListener("appinstalled", function () {
      offer = null;
      inst.hidden = true;
      tip.hidden = true;
    });

    // iPad sa hlási ako Mac, prezradí ho dotyková obrazovka
    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios) inst.hidden = false;

    inst.addEventListener("click", function () {
      if (!offer) { tip.hidden = !tip.hidden; return; }
      var e = offer;
      offer = null;          // ponuka sa dá použiť len raz; po odmietnutí pošle prehliadač novú
      inst.hidden = true;
      e.prompt();
    });
    document.addEventListener("click", function (e) {
      if (!tip.hidden && !inst.contains(e.target) && !tip.contains(e.target)) tip.hidden = true;
    });
  })();

  /* ── tlačidlo „Aktualizovať appku“ (dole na hlavnej stránke, index.html) ──
     Vynútená aktualizácia pre prípad, že appka ostala na starej verzii.
     1. Opýta sa servera na novú verziu. Ak je, service worker ju stiahne celú
        a stránka sa načíta znova.
     2. Ak je verzia rovnaká, service worker skontroluje odtlačok každého uloženého
        súboru (správa „pf-check“), poškodený zmaže a chýbajúce stiahne — oprava
        poškodenej alebo neúplnej offline kópie.
     Bez pripojenia sa nič nemaže ani neprepisuje. */
  var box = document.getElementById("appUpdate");
  var btn = document.getElementById("appUpdateBtn");
  var info = document.getElementById("appUpdateInfo");
  if (!box || !btn || !info || !window.caches) return;
  box.hidden = false;

  var say = function (t) { info.textContent = t; };

  var justUpdated = false;
  try {
    justUpdated = sessionStorage.getItem("pwa-updated") === "1";
    sessionStorage.removeItem("pwa-updated");
  } catch (e) {}
  var busy = false;   // kým beží tlačidlo, stav sťahovania neprepisuje jeho hlásenie
  var stateText = function (s) {
    var d = new Date(s.version), p = function (n) { return (n < 10 ? "0" : "") + n; };
    var ver = "Verzia " + d.getDate() + ". " + (d.getMonth() + 1) + ". " + d.getFullYear() + " " + p(d.getHours()) + ":" + p(d.getMinutes());
    if (s.complete) return (justUpdated ? "Aktualizované. " : "") + "✓ Celá kniha je offline (" + s.total + " súborov, " + mb(s.totalBytes) + "). " + ver + ".";
    var part = s.done + " / " + s.total + " súborov, " + mb(s.bytes) + " z " + mb(s.totalBytes);
    if (s.quota) return "V zariadení nie je dosť miesta na offline verziu (" + part + "). Uvoľni miesto a stlač tlačidlo.";
    if (s.paused === "offline") return "Bez internetu. Offline je zatiaľ " + part + "; po pripojení sa stiahne zvyšok.";
    if (s.paused === "saver") return "Šetrič dát je zapnutý. Offline je " + part + "; zvyšok stiahne tlačidlo.";
    return "Sťahujem knihu na offline čítanie: " + part + "…";
  };
  offlineView = function (s) { if (!busy) say(stateText(s)); };
  if (lastState) offlineView(lastState);
  ask({ type: "pf-status" }).then(showState).catch(function () {});

  var giveUp = function (text) {
    forcing = false;
    busy = false;
    btn.disabled = false;
    say(text);
  };

  /* nová verzia: počkať, kým ju service worker stiahne a prevezme stránku */
  var waitFor = function (worker) {
    say("Sťahujem novú verziu… (môže trvať pol minúty)");
    var timer = setTimeout(function () { giveUp("Sťahovanie trvá príliš dlho — skús to znova."); }, 120000);
    var check = function () {
      if (worker.state === "activated") { clearTimeout(timer); reloadUpdated(); }
      else if (worker.state === "redundant") { clearTimeout(timer); giveUp("Aktualizácia sa nepodarila — skús to znova."); }
    };
    worker.addEventListener("statechange", check);
    check();
  };

  /* rovnaká verzia: skontroluje každý uložený súbor, poškodený zmaže a chýbajúce stiahne */
  var refresh = function () {
    forcing = false;
    var bad = 0;
    var check = function (from) {
      ask({ type: "pf-check", from: from, n: 40 }).then(function (r) {
        bad += r.bad;
        if (r.next < r.total) {
          say("Kontrolujem offline kópiu… " + r.next + " / " + r.total);
          check(r.next);
          return;
        }
        busy = false;
        btn.disabled = false;
        userAsked = true;
        waitMs = 0;
        if (bad) say("Opravujem " + bad + " poškodených súborov…");
        syncLoop();
      }).catch(function () { giveUp("Appka neodpovedá — zatvor ju, otvor znova a skús ešte raz."); });
    };
    check(0);
  };

  btn.addEventListener("click", function () {
    if (btn.disabled) return;
    btn.disabled = true;
    busy = true;
    say("Hľadám novú verziu…");
    sw.register(ROOT + "service-worker.js", { scope: ROOT })
      .then(function (reg) {
        var before = reg.active;
        forcing = true;
        return reg.update().then(function () {
          var fresh = reg.installing || reg.waiting || (reg.active !== before ? reg.active : null);
          if (fresh) waitFor(fresh); else refresh();
        });
      })
      .catch(function () { giveUp("Nedá sa pripojiť na server — bez internetu sa aktualizovať nedá."); });
  });
})();

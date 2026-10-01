/* PATOLA — registrácia service workera pre offline appku (PWA).
   Vlastný súbor projektu (nie zdieľaný s patofyziológiou, CLAUDE.md §5/§7).

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

  /* ── tlačidlo „Aktualizovať appku“ (dole na hlavnej stránke, index.html) ──
     Vynútená aktualizácia pre prípad, že appka ostala na starej verzii.
     1. Opýta sa servera na novú verziu. Ak je, service worker ju stiahne celú
        a stránka sa načíta znova.
     2. Ak je verzia rovnaká, service worker stiahne všetky súbory nanovo do
        tej istej cache (správa „pf-refresh“, service-worker.js) — oprava
        poškodenej alebo neúplnej offline kópie.
     Bez pripojenia sa nič nemaže ani neprepisuje. */
  var box = document.getElementById("appUpdate");
  var btn = document.getElementById("appUpdateBtn");
  var info = document.getElementById("appUpdateInfo");
  if (!box || !btn || !info || !window.caches) return;
  box.hidden = false;

  var say = function (t) { info.textContent = t; };

  /* verzia = čas zostavenia knihy (CACHE_VERSION v service-worker.js, tools/build.js) */
  var showVersion = function (prefix) {
    caches.keys().then(function (names) {
      var best = 0;
      names.forEach(function (n) {
        var m = /^patola-(\d+)$/.exec(n);
        if (m && +m[1] > best) best = +m[1];
      });
      if (!best) { say(prefix); return; }
      var d = new Date(best), p = function (n) { return (n < 10 ? "0" : "") + n; };
      say(prefix + "Verzia v zariadení: " + d.getDate() + ". " + (d.getMonth() + 1) + ". " + d.getFullYear() +
        " " + p(d.getHours()) + ":" + p(d.getMinutes()));
    }).catch(function () {});
  };
  var justUpdated = false;
  try {
    justUpdated = sessionStorage.getItem("pwa-updated") === "1";
    sessionStorage.removeItem("pwa-updated");
  } catch (e) {}
  showVersion(justUpdated ? "Aktualizované. " : "");

  var giveUp = function (text) {
    forcing = false;
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

  /* rovnaká verzia: service worker stiahne všetky súbory nanovo a hlási priebeh */
  var refresh = function () {
    forcing = false;
    if (!sw.controller) { giveUp("Appka sa ešte len inštaluje — skús to o chvíľu."); return; }
    say("Sťahujem súbory nanovo…");
    var channel = new MessageChannel();
    var silent = setTimeout(function () { giveUp("Appka neodpovedá — zatvor ju, otvor znova a skús ešte raz."); }, 8000);
    channel.port1.onmessage = function (e) {
      var m = e.data || {};
      clearTimeout(silent);
      if (!m.finished) { say("Sťahujem súbory nanovo… " + m.done + " / " + m.total); return; }
      if (m.failed) giveUp("Nepodarilo sa stiahnuť " + m.failed + " z " + m.total + " súborov — skontroluj pripojenie a skús znova.");
      else reloadUpdated();
    };
    sw.controller.postMessage({ type: "pf-refresh" }, [channel.port2]);
  };

  btn.addEventListener("click", function () {
    if (btn.disabled) return;
    btn.disabled = true;
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

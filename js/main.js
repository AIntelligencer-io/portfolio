(function () {
  "use strict";

  var D = window.PORTFOLIO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* giriş animasyonu yalnızca sayfa görünürken (arka planda açılırsa marka hazır görünsün) */
  if (!reduceMotion && document.visibilityState === "visible") {
    document.documentElement.classList.add("anim-on");
    setTimeout(function () { document.documentElement.classList.remove("anim-on"); }, 2000);
  }

  /* ---------- kişisel bilgiler ---------- */
  var P = D.person;
  $$("[data-name]").forEach(function (el) { el.textContent = P.name; });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $("#email").textContent = P.email;
  $("#mail-link").href = "mailto:" + P.email;
  $("#social").innerHTML = P.links.map(function (l) {
    return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + "</a></li>";
  }).join("");

  /* ---------- kategoriler ve projeler ---------- */
  var catById = {};
  D.categories.forEach(function (c) { catById[c.id] = c; c.count = 0; });
  D.projects.forEach(function (p) { catById[p.category].count += 1; });
  var byId = function (id) { return D.projects.find(function (x) { return x.id === id; }); };

  /* proje görseli (kapak): data.js'teki image */
  function art(p) {
    return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' : "";
  }
  var isFull = function (p) { return !!p.image; };
  /* Kırpılan kapaklarda ürünü göster: focus (0-100) ürünün görseldeki dikey konumu.
     Kutuya sığan görünür yükseklik oranına göre object-position hesaplanır; böylece ürün kutunun ortasına gelir. */
  function focusImg(img, focus) {
    if (!img || focus == null) return null;
    function apply() {
      var box = img.parentNode.getBoundingClientRect();
      if (!box.width || !box.height || !img.naturalWidth) return;
      var v = (box.height * img.naturalWidth / img.naturalHeight) / box.width;   /* görünen yükseklik oranı */
      var y = v >= 1 ? 0.5 : Math.min(1, Math.max(0, (focus / 100 - v / 2) / (1 - v)));
      img.style.objectPosition = "50% " + (y * 100).toFixed(1) + "%";
    }
    if (img.complete && img.naturalWidth) apply(); else img.addEventListener("load", apply, { once: true });
    return apply;
  }

  /* ---------- giriş: arka plan videosu, kesintisiz döngü ----------
     Video 13 sn: ilk 12 sn döngünün kendisi, son 1 sn ise döngünün başının aynen tekrarı.
     Biri 12. saniyeye gelince diğeri baştan (geçen süre kadar ileriden) başlar. O an ikisi de AYNI kareleri
     gösterdiği için üst üste binmeleri gözle görülmez; bitiş ile yeni başlangıç tek akış olur. */
  (function heroVideo() {
    var vs = [$("#hero-v0"), $("#hero-v1")];
    if (!vs[0] || !vs[1]) return;
    function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (reduceMotion) { vs[0].pause(); return; }   /* hareket azaltıldıysa ilk kare sabit kalır */
    var LOOP = 12, XF = 0.8, cur = 0, switching = false;
    play(vs[0]);
    vs.forEach(function (v) {
      v.addEventListener("ended", function () { if (v === vs[cur] && !switching) { v.currentTime = 0; play(v); } });
    });
    function swap() {
      var out = vs[cur], inn = vs[1 - cur];
      switching = true;
      inn.currentTime = Math.max(0, out.currentTime - LOOP);   /* gecikmeyi telafi et */
      out.style.zIndex = 1; inn.style.zIndex = 2;
      play(inn);
      inn.classList.add("is-on");
      setTimeout(function () {
        out.classList.remove("is-on");
        out.pause(); out.currentTime = 0;
        cur = 1 - cur;
        switching = false;
      }, XF * 1000 + 100);
    }
    setInterval(function () {
      var v = vs[cur];
      if (!switching && !v.paused && v.currentTime >= LOOP) swap();
    }, 40);
  })();

  /* ---------- giriş: marka adı ve değişen kelime ---------- */
  var WORDS = ["ürün tasarımı", "UI/UX tasarım", "grafik tasarım"];
  var wordEl = $("#mark-word");
  var rootEl = document.documentElement;
  var typing = false, typeTimer = null;
  function startTyping() {
    if (typing) return;
    typing = true;
    var wi = 0, ci = 0, deleting = false;
    function step() {
      var w = WORDS[wi];
      if (!deleting) {
        ci++;
        wordEl.textContent = w.slice(0, ci);
        if (ci === w.length) { deleting = true; typeTimer = setTimeout(step, 2200); return; }
        typeTimer = setTimeout(step, 70); return;
      }
      ci--;
      wordEl.textContent = w.slice(0, ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % WORDS.length; typeTimer = setTimeout(step, 350); return; }
      typeTimer = setTimeout(step, 35);
    }
    typeTimer = setTimeout(step, 900);
  }

  if (reduceMotion) wordEl.textContent = WORDS[0]; else startTyping();

  /* ---------- kayan bant ---------- */
  var SKILLS = ["Kullanıcı araştırması", "Eskiz", "Yüzey modelleme", "Konsept", "Prototip", "Render"];
  /* liste kısa olduğu için iki kez yazılır: bant geniş ekranlarda da boşluksuz akar */
  var tk = SKILLS.concat(SKILLS).map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("");
  $("#ticker").innerHTML = tk + tk;

  /* ---------- menü: en üstte geniş, kaydırınca dar ---------- */
  var navWrap = $("#nav-wrap");
  function onScroll() {
    navWrap.classList.toggle("is-compact", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- çalışmalar ---------- */
  var active = "tumu";
  var filtersEl = $("#filters"), namesEl = $("#names");
  function visible() { return active === "tumu" ? D.projects : D.projects.filter(function (p) { return p.category === active; }); }
  function renderFilters() {
    var all = [{ id: "tumu", label: "Tümü", count: D.projects.length }].concat(D.categories);
    filtersEl.innerHTML = all.map(function (c) {
      return '<button type="button" data-filter="' + c.id + '" aria-pressed="' + (c.id === active) + '">' + esc(c.label) + '<span class="count">' + c.count + "</span></button>";
    }).join("");
  }
  function renderNames() {
    var list = visible();
    clearTimeout(hoverTimer);
    namesEl.innerHTML = list.map(function (p, i) {
      return '<li class="name-row" data-id="' + p.id + '"><button type="button" class="name-btn" data-id="' + p.id + '">' +
        '<span class="n-idx label">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="n-name">' + esc(p.title) + "</span>" +
        '<span class="n-meta"><span class="label">' + esc(catById[p.category].label) + " · " + p.year + "</span>" + (p.summary ? '<span class="n-sum">' + esc(p.summary) + "</span>" : "") + '<span class="label n-open">Projeyi aç →</span></span>' +
        '</button><div class="n-preview" aria-hidden="true"><div class="n-preview-in"></div></div></li>';
    }).join("");
  }

  /* üzerine gelince bir süre sonra açılan önizleme (fare ve klavye) */
  var HOVER_DELAY = 800;   /* satırın üzerinde bu kadar kalınca açılır (fare hareket etse de) */
  var hoverTimer = null;
  function openPreview(li) {
    var inner = $(".n-preview-in", li);
    if (!inner.firstChild) {
      var p = byId(li.dataset.id);
      if (!p) return;
      inner.innerHTML = '<div class="n-prev-media' + (isFull(p) ? " is-full" : "") + '">' + art(p) + "</div>";
    }
    var pv = byId(li.dataset.id);
    if (pv) focusImg($("img", inner), pv.focus);
    $$(".name-row.is-open", namesEl).forEach(function (o) { if (o !== li) o.classList.remove("is-open"); });
    li.classList.add("is-open");
  }
  function scheduleOpen(li) {
    clearTimeout(hoverTimer);
    if (li.classList.contains("is-open")) return;
    hoverTimer = setTimeout(function () { openPreview(li); }, HOVER_DELAY);
  }
  function cancelOpen(li) {
    clearTimeout(hoverTimer);
    li.classList.remove("is-open");
  }
  namesEl.addEventListener("pointerover", function (e) {
    if (e.pointerType === "touch") return;
    var li = e.target.closest(".name-row");
    if (!li || (e.relatedTarget && li.contains(e.relatedTarget))) return;
    scheduleOpen(li);
  });
  namesEl.addEventListener("pointerout", function (e) {
    if (e.pointerType === "touch") return;
    var li = e.target.closest(".name-row");
    if (!li || (e.relatedTarget && li.contains(e.relatedTarget))) return;
    cancelOpen(li);
  });
  namesEl.addEventListener("focusin", function (e) {
    var li = e.target.closest(".name-row");
    if (li && e.target.matches(":focus-visible")) scheduleOpen(li);
  });
  namesEl.addEventListener("focusout", function (e) {
    var li = e.target.closest(".name-row");
    if (li && !(e.relatedTarget && li.contains(e.relatedTarget))) cancelOpen(li);
  });
  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-filter]");
    if (!b || b.dataset.filter === active) return;
    active = b.dataset.filter;
    $$("button[data-filter]", filtersEl).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderNames();
  });
  namesEl.addEventListener("click", function (e) {
    var b = e.target.closest(".name-btn, .n-preview");
    var li = b && b.closest(".name-row");
    if (li) openCase(li.dataset.id);
  });

  /* ---------- proje detay sayfası (adres: #proje-kimligi) ---------- */
  var dlg = $("#case");
  var canModal = typeof dlg.showModal === "function";
  /* Detay sayfasındaki anlatım bölümleri: gallery'deki her görsel bir bölüm olur,
     metinleri data.js'teki sections listesinden sırayla alır (metni olmayan görsel tek başına gösterilir). */
  function caseSections(p) {
    return (p.gallery || []).map(function (g, i) {
      var s = (p.sections && p.sections[i]) || {};
      return { label: s.label, title: s.title, text: s.text, image: g.src || (g.parts && g.parts[0].src), parts: g.parts, w: g.w, h: g.h };
    });
  }  /* görselin oranına göre düzen: yatay (16:9, 16:10) → tam genişlik, açıklama altta;
     çok uzun (vaka sayfası) → açıklama üstte, görsel tam boyunda; diğerleri → açıklama solda, görsel sağda */
  function sectionKind(s) {
    if (!s.image || !s.w || !s.h) return "side";
    var r = s.w / s.h;
    return r >= 1.3 ? "wide" : (r < 0.5 ? "long" : "side");   /* yatay görseller (16:9, A-serisi yatay vb.) */
  }
  function sectionMedia(p, s, i, kind) {
    if (s.parts) {
      /* dilimlenmiş çok uzun görsel: parçalar boşluksuz alt alta, her biri ayrı yüklenir */
      return '<figure class="case-media case-media--long case-media--stack">' + s.parts.map(function (t, k) {
        return '<img src="' + esc(t.src) + '" alt="' + (k ? "" : esc(p.title)) + '" width="' + t.w + '" height="' + t.h + '" loading="lazy" decoding="async">';
      }).join("") + "</figure>";
    }
    if (s.image) {
      var cls = "case-media case-media--" + kind + (kind === "side" && s.w < s.h ? " case-media--portrait" : "");
      var ar = s.w && s.h ? ' style="--ar: ' + s.w + " / " + s.h + '"' : "";
      var dims = s.w && s.h ? ' width="' + s.w + '" height="' + s.h + '"' : "";
      return '<figure class="' + cls + '"' + ar + '><img src="' + esc(s.image) + '" alt="' + esc(p.title + ", görsel " + (i + 2)) + '"' + dims + ' loading="lazy" decoding="async"></figure>';
    }
    return "";
  }
  var heroFocus = null;
  window.addEventListener("resize", function () { if (heroFocus && dlg.open) heroFocus(); });
  function fillCase(p) {
    var idx = D.projects.indexOf(p);
    $("#case-title").textContent = p.title;
    var hero = $("#case-hero-media");
    hero.className = "case-hero-media" + (isFull(p) ? " is-full" : "");
    hero.innerHTML = art(p);
    hero.parentNode.classList.toggle("has-img", !!p.image);
    heroFocus = focusImg($("img", hero), p.focus);
    /* noText: true olan projede (ör. GetFit) açıklama yazısı yok, yalnızca görseller */
    var intro = $("#case-intro");
    /* intro: detay sayfasında başlığın altındaki açıklama (yoksa summary) */
    intro.textContent = p.noText ? "" : (p.intro || p.summary || "");
    intro.hidden = !intro.textContent;
    var num = 0;   /* numara yalnızca metinli bölümlere verilir */
    $("#case-secs").innerHTML = caseSections(p).map(function (s, i) {
      var kind = sectionKind(s);
      /* text tek metin ya da paragraf listesi olabilir; label ve title isteğe bağlı */
      var paras = s.text ? [].concat(s.text) : [];
      if (p.noText || !(s.label || s.title || paras.length)) return '<section class="case-sec case-sec--' + kind + ' case-sec--bare">' + sectionMedia(p, s, i, kind) + "</section>";
      return '<section class="case-sec case-sec--' + kind + '"><div class="case-copy"><p class="label label--muted">' + String(++num).padStart(2, "0") + (s.label ? " — " + (/^brief$/i.test(s.label) ? '<span lang="en">' + esc(s.label) + "</span>" : esc(s.label)) : "") + "</p>" +
        (s.title ? '<h3 class="case-h">' + esc(s.title) + "</h3>" : "") +
        (paras.length ? '<div class="case-text">' + paras.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" : "") + "</div>" + sectionMedia(p, s, i, kind) + "</section>";
    }).join("");    var next = D.projects[(idx + 1) % D.projects.length];
    $("#case-next").dataset.id = next.id;
    $("#case-next-title").textContent = next.title;
    document.title = p.title + " · " + P.name;
    setupReveal();
  }

  /* bölümler kaydırdıkça belirir */
  var rvObs = null;
  function setupReveal() {
    if (rvObs) rvObs.disconnect();
    var targets = $$(".case-head > *, .case-copy, .case-media, .case-next", dlg);
    targets.forEach(function (el) {
      el.classList.remove("in");
      el.classList.add("rv");
      el.style.setProperty("--d", (el.matches(".case-media, .case-head > :last-child") ? 0.12 : 0) + "s");
    });
    if (!("IntersectionObserver" in window) || reduceMotion) { targets.forEach(function (el) { el.classList.add("in"); }); return; }
    rvObs = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); rvObs.unobserve(x.target); } });
    }, { root: dlg, threshold: 0, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { rvObs.observe(el); });
  }
  function playCase() {
    dlg.classList.remove("play");
    void dlg.offsetWidth;
    dlg.classList.add("play");
  }
  var baseTitle = document.title;
  /* Geçmiş: her açılış bir kayıt ekler (pushState), "geri" tam olarak listedeki yere döner.
     depth = bu sayfada üst üste açılan proje sayısı; kapatırken hepsi tek seferde geri alınır. */
  var closing = false, currentCase = null, savedScroll = 0;
  var caseNav = $(".case-nav", dlg);
  function depthNow() { return (history.state && history.state.d) || 0; }
  function showCase(id) {
    var p = byId(id);
    if (!p || (currentCase === id && dlg.open)) return;
    fillCase(p);
    if (!dlg.open) { if (canModal) dlg.showModal(); else dlg.setAttribute("open", ""); }
    if (heroFocus) heroFocus();   /* kapak kutusu artık ölçülebilir: ürünü ortala */
    setupReel(p);                 /* reel düzenli projelerde dikey akış */
    dlg.scrollTop = 0;
    caseNav.classList.remove("is-compact");
    currentCase = id;
    playCase();
  }
  function hideCase() {
    if (!currentCase) return;
    stopReel();
    if (dlg.open) {
      closing = true;
      if (canModal) dlg.close(); else dlg.removeAttribute("open");
      closing = false;
    }
    currentCase = null;
    document.title = baseTitle;
    var target = savedScroll || Math.max(0, $("#calismalar").offsetTop - 96);
    window.scrollTo({ top: target, behavior: "instant" });
  }
  function openCase(id) {
    if (!byId(id)) return;
    if (!dlg.open) savedScroll = window.scrollY;
    history.pushState({ d: depthNow() + 1 }, "", "#" + id);
    showCase(id);
  }
  function leave() {
    var d = depthNow();
    if (d > 0) history.go(-d);          /* popstate → hideCase */
    else { history.replaceState(null, "", location.pathname + location.search); hideCase(); }
  }
  function route() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId(id)) showCase(id); else hideCase();
  }
  dlg.addEventListener("close", function () {
    if (!closing && currentCase) leave();   /* Esc ile kapandı */
  });
  /* ana sayfadaki gibi: 40 px kaydırınca menü kapsüle dönüşür */
  dlg.addEventListener("scroll", function () { caseNav.classList.toggle("is-compact", dlg.scrollTop > 40); }, { passive: true });
  $("#case-back").addEventListener("click", leave);
  $("#case-home").addEventListener("click", function (e) { e.preventDefault(); leave(); });   /* logo da ana sayfaya döndürür */
  $("#case-next").addEventListener("click", function () { openCase(this.dataset.id); });
  window.addEventListener("popstate", route);

  /* ---------- reel: dikey, sonsuz döngülü görsel akışı (architecture.film'deki yatay akışın dikey hali) ---------- */
  var reelEl = $("#case-reel"), reelTrack = $("#reel-track"), reelBox = $("#reel-box"), reelBoxMedia = $("#reel-box-media");
  var R = { on: false, items: [], n: 0, y: 0, target: 0, total: 0, stageH: 0, raf: 0, gap: 28, active: -1, drag: null, moved: false, lastFocus: null };
  function reelMedia(it, cls) {
    /* video (ör. GIF'ten çevrilen animasyonlu post): sessiz, döngüde; yüklenene kadar ilk karesi (poster) görünür */
    if (it.type === "video") return '<video class="' + cls + '" src="' + esc(it.src) + '"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + ' muted loop playsinline autoplay preload="metadata" aria-label="Görsel ' + it.no + '"></video>';
    return '<img class="' + cls + '" src="' + esc(it.src) + '" alt="' + esc(it.alt || "Görsel " + it.no) + '" draggable="false" decoding="async">';
  }
  function setupReel(p) {
    var isReel = p.layout === "reel";
    dlg.classList.toggle("case--reel", isReel);
    reelEl.hidden = !isReel;
    stopReel();
    if (!isReel) return;
    /* alt kategoriler (sekmeler): reelGroups [{ label, items }] */
    var groups = p.reelGroups || [];
    if (!groups.length) return;
    R.groups = groups;
    $("#reel-title").textContent = p.title;
    var tabs = $("#reel-tabs");
    tabs.hidden = groups.length < 2;
    tabs.innerHTML = groups.length < 2 ? "" : groups.map(function (g, i) {
      return '<button type="button" data-g="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(g.label) + '<span class="count">' + g.items.length + "</span></button>";
    }).join("");
    R.on = true;
    showReelGroup(0);
    reelEl.focus({ preventScroll: true });
  }
  function showReelGroup(gi) {
    var g = R.groups[gi];
    var list = g.items.map(function (it, i) { var o = {}; for (var k in it) o[k] = it[k]; o.no = String(i + 1).padStart(2, "0"); o.index = i; return o; });
    R.group = gi; R.list = list; R.n = list.length; R.y = R.target = 0; R.active = -1;
    /* dikey (story gibi) görseller daha dar sütunda gösterilir */
    R.tall = list.every(function (it) { return it.h / it.w > 1.4; });
    $$("button[data-g]", $("#reel-tabs")).forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.g === gi)); });
    layoutReel();
  }
  $("#reel-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-g]");
    if (b && +b.dataset.g !== R.group) showReelGroup(+b.dataset.g);
  });
  function layoutReel() {
    if (!R.on) return;
    var box = reelEl.getBoundingClientRect();
    R.stageH = box.height;
    var w = Math.min(R.tall ? 320 : 440, box.width * (R.tall ? 0.6 : 0.72));
    reelEl.style.setProperty("--rw", w + "px");
    /* her görsel yalnızca bir kez yer alır (tekrar yok, aynı görsel ekranda iki kez görünmez) */
    var seq = [], sum = 0, maxH = 0;
    R.list.forEach(function (it) {
      var h = w * it.h / it.w;
      seq.push({ it: it, h: h, base: sum });
      sum += h + R.gap; maxH = Math.max(maxH, h);
    });
    R.items = seq; R.total = sum;
    /* loop: görseller ekranı aşacak kadar çoksa sonsuz döngü (bir görsel çıkmadan aynısı girmez)
       bounded: döngü için az ama ekrana sığmıyorsa ilk ve son görsel arasında kayar
       static: hepsi ekrana sığıyorsa (ör. tek story) ortada sabit durur */
    R.mode = sum >= R.stageH + maxH ? "loop" : (sum - R.gap <= R.stageH ? "static" : "bounded");
    R.loop = R.mode === "loop";
    R.maxY = seq.length ? seq[seq.length - 1].base + seq[seq.length - 1].h / 2 - seq[0].h / 2 : 0;
    reelEl.classList.toggle("is-static", R.mode === "static");
    reelTrack.innerHTML = seq.map(function (s, i) {
      return '<div class="reel-item" data-i="' + i + '" style="height:' + s.h + 'px"><button type="button" class="reel-tile" aria-label="Görsel ' + s.it.no + ', büyüt">' + reelMedia(s.it, "reel-media") + "</button></div>";
    }).join("");
    R.nodes = $$(".reel-item", reelTrack);
    /* sessiz videoları açıkça başlat (bazı tarayıcılar sonradan eklenen videoda otomatik oynatmayı atlar) */
    $$("video", reelTrack).forEach(function (v) { v.muted = true; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); });
    renderReel();
  }
  function renderReel() {
    var T = R.total, half = T / 2, best = Infinity, act = -1;
    var start = R.stageH / 2 - (T - R.gap) / 2;   /* döngü yoksa: dizinin tamamı dikeyde ortalanır */
    for (var i = 0; i < R.items.length; i++) {
      var s = R.items[i], top, c;
      if (R.mode !== "static") {
        /* görselin merkezinin sahne merkezine göre konumu, döngü içinde [-T/2, T/2] aralığına sarılır */
        c = s.base + s.h / 2 - R.y - R.items[0].h / 2;   /* başlangıçta ilk görsel ortada */
        if (R.loop) c = ((c + half) % T + T) % T - half;
        top = R.stageH / 2 + c - s.h / 2;
      } else {
        top = start + s.base;
        c = top + s.h / 2 - R.stageH / 2;
      }
      R.nodes[i].style.transform = "translate3d(0," + top.toFixed(2) + "px,0)";
      if (Math.abs(c) < best) { best = Math.abs(c); act = s.it.index; }
    }
    /* üst çubuk diğer sayfalardaki gibi: kaydırmaya başlayınca kapsüle dönüşür */
    caseNav.classList.toggle("is-compact", Math.abs(R.y) > 40);
    if (act !== R.active) { R.active = act; $("#reel-count").textContent = String(act + 1).padStart(2, "0") + " / " + String(R.n).padStart(2, "0"); }
  }  function tickReel() {
    var d = R.target - R.y;
    R.y = reduceMotion || Math.abs(d) < 0.3 ? R.target : R.y + d * 0.09;   /* yumuşak, ataletli takip */
    renderReel();
    R.raf = R.y !== R.target ? requestAnimationFrame(tickReel) : 0;
  }
  function clampReel(v) { return R.mode === "bounded" ? Math.min(R.maxY, Math.max(0, v)) : v; }
  function moveReel(dy) { if (!R.on || R.mode === "static") return; R.target = clampReel(R.target + dy); if (!R.raf) R.raf = requestAnimationFrame(tickReel); }
  function stopReel() { R.on = false; cancelAnimationFrame(R.raf); R.raf = 0; closeReelBox(); reelTrack.innerHTML = ""; }
  reelEl.addEventListener("wheel", function (e) { e.preventDefault(); moveReel((e.deltaMode === 1 ? 32 : 1) * (e.deltaY || e.deltaX)); }, { passive: false });
  reelEl.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    R.drag = { y: e.clientY, t: R.target, id: e.pointerId }; R.moved = false;
  });
  window.addEventListener("pointermove", function (e) {
    if (!R.drag || e.pointerId !== R.drag.id) return;
    var dy = e.clientY - R.drag.y;
    if (!R.moved && Math.abs(dy) > 6) { R.moved = true; reelEl.classList.add("is-drag"); }
    if (R.moved && R.mode !== "static") { R.target = clampReel(R.drag.t - dy); if (!R.raf) R.raf = requestAnimationFrame(tickReel); }
  });
  window.addEventListener("pointerup", function () { if (R.drag) { R.drag = null; reelEl.classList.remove("is-drag"); } });
  /* Klavyeyle (Tab) ekran dışındaki bir görsele geçilince tarayıcı akış kutusunu kendisi kaydırmasın:
     yerel kaydırma sıfırlanır, odaklanan görsel akışın kendi hareketiyle ortaya getirilir. */
  reelEl.addEventListener("scroll", function () { if (reelEl.scrollTop) reelEl.scrollTop = 0; });
  reelEl.addEventListener("focusin", function (e) {
    var tile = e.target.closest(".reel-tile");
    if (reelEl.scrollTop) reelEl.scrollTop = 0;
    if (!tile || R.mode === "static") return;
    var r = tile.getBoundingClientRect(), box = reelEl.getBoundingClientRect();
    var off = (r.top + r.height / 2) - (box.top + box.height / 2);   /* görselin ortaya uzaklığı */
    if (Math.abs(off) > 2) moveReel(off);
  });
  reelEl.addEventListener("keydown", function (e) {
    var step = (R.items[0] ? R.items[0].h : 300) + R.gap;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); moveReel(step); }
    if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); moveReel(-step); }
  });
  /* tıklayınca büyük, gerçek boyutunda göster (sürükleme tıklama sayılmaz) */
  reelTrack.addEventListener("click", function (e) {
    var b = e.target.closest(".reel-tile");
    if (!b || R.moved) { R.moved = false; return; }
    var s = R.items[+b.parentNode.dataset.i];
    R.lastFocus = b;
    reelBoxMedia.innerHTML = reelMedia(s.it, "reel-box-img").replace("<video ", "<video controls ");
    reelBox.hidden = false;
    $("#reel-close").focus();
  });
  function closeReelBox() {
    if (reelBox.hidden) return;
    reelBox.hidden = true; reelBoxMedia.innerHTML = "";
    if (R.lastFocus && R.on) R.lastFocus.focus({ preventScroll: true });
  }
  $("#reel-close").addEventListener("click", closeReelBox);
  reelBox.addEventListener("click", function (e) { if (e.target === reelBox || e.target === reelBoxMedia) closeReelBox(); });
  dlg.addEventListener("cancel", function (e) { if (!reelBox.hidden) { e.preventDefault(); closeReelBox(); } });   /* Esc önce büyük görseli kapatır */
  window.addEventListener("resize", function () { if (R.on) layoutReel(); });

  /* ---------- e-posta kopyalama ---------- */
  var copyBtn = $("#copy-email");
  var copyTimer = null;
  copyBtn.addEventListener("click", function () {
    var label = "Adresi kopyala";
    function show(text) {
      copyBtn.textContent = text;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () { copyBtn.textContent = label; }, 2400);
    }
    function fallback() {
      var range = document.createRange();
      range.selectNodeContents($("#email"));
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      show("Adres seçildi, Ctrl+C ile kopyalayın");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(P.email).then(function () { show("Kopyalandı"); }, fallback);
    } else {
      fallback();
    }
  });

  renderFilters();
  renderNames();
  route();   /* adreste proje kimliği varsa doğrudan o proje açılır */
  document.documentElement.classList.remove("deep-case");   /* proje sayfası açıldı (ya da yok): ana sayfayı göster */
})();

// 巻物：単語パネルを生成して組み込み、無限ループ＋イージング(ぬるぬる)＋クリックで該当パネルへ滑走。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ja';

  var WORDS = ['modeling','simulation','perception'];
  var DATA = {
    modeling:{k:'モデリング',
      ja:'地形や空間の形を、ポリゴンや曲面で一からつくる工程。粘土のように削り込む<span class="seed">sculpting</span>、表面に色と質感を与える<span class="seed">texturing</span>、光を置いて陰影をつくる<span class="seed">lighting</span>、動きを付ける<span class="seed">animation</span>、計算して画像に仕上げる<span class="seed">rendering</span>──いずれも、見えるものにする<span class="seed">visualization</span>ための工程である。',
      en:'Building the form of terrain and space from scratch with polygons and surfaces. Carving like clay <span class="seed">sculpting</span>, giving surfaces color and material <span class="seed">texturing</span>, placing light for shadow <span class="seed">lighting</span>, adding movement <span class="seed">animation</span>, computing it into an image <span class="seed">rendering</span> — all are steps toward making something visible <span class="seed">visualization</span>.'},
    simulation:{k:'シミュレーション',
      ja:'水・光・風・植生といった環境を、手で描かずルールに沿って計算する工程。小さなコードを書く<span class="seed">scripting</span>、道具やシステムを組む<span class="seed">programming</span>、コードを書く<span class="seed">coding</span>、規則から形を生成する<span class="seed">generation</span>、数値を計算する<span class="seed">calculation</span>が、その手段にあたる。',
      en:'Computing environment — water, light, wind, vegetation — by rules instead of drawing it by hand. The means include writing small code <span class="seed">scripting</span>, building tools and systems <span class="seed">programming</span>, writing code <span class="seed">coding</span>, generating form from rules <span class="seed">generation</span>, and running numerical computation <span class="seed">calculation</span>.'},
    perception:{k:'パーセプション',
      ja:'景観の見え方に関わる領域。同じ場所でも、視点<span class="seed">perspective</span>が変われば違って見える。どこから・どう見せるかを選び、伝わる像へ翻訳する<span class="seed">visualization</span>までを扱う。',
      en:'The domain of how a landscape appears. The same place looks different as the point of view <span class="seed">perspective</span> changes. It covers choosing where and how to show it, and translating it into an image that reads <span class="seed">visualization</span>.'}
  };

  // --- 単語パネルを生成し、ヒーローの直後に挿入 ---
  var hero = deck.querySelector('.panel.hero') || deck.children[0];
  var after = hero.nextSibling;
  WORDS.forEach(function (w) {
    var d = DATA[w]; if (!d) return;
    var sec = document.createElement('section');
    sec.className = 'panel word-panel';
    sec.id = 'w-' + w;
    sec.innerHTML = '<div class="wrap">'
      + '<h2 class="word-title">' + w + '</h2>'
      + (LANG === 'ja' ? '<p class="word-reading">' + d.k + '</p>' : '')
      + '<p class="word-desc">' + d[LANG] + '</p>'
      + '<div class="word-examples"><p class="section-eyebrow">' + (LANG === 'en' ? 'Examples' : '実例') + '</p>'
      + '<div class="word-ex-grid"><div class="word-ex"></div><div class="word-ex"></div><div class="word-ex"></div></div>'
      + '<p class="word-ex-note">' + (LANG === 'en' ? 'coming soon' : '準備中') + '</p></div>'
      + '</div>';
    deck.insertBefore(sec, after);
  });

  // --- パネルをトラックに移し、transform で動かす（scrollLeftをやめてチカチカ解消） ---
  var track = document.createElement('div');
  track.className = 'deck-track';
  while (deck.firstChild) track.appendChild(deck.firstChild);
  deck.appendChild(track);

  // --- 無限ループ用に前後へ複製 ---
  var originals = Array.prototype.slice.call(track.children);
  var setCount = originals.length;
  function cloneSet() {
    var frag = document.createDocumentFragment();
    originals.forEach(function (p) {
      var c = p.cloneNode(true);
      c.removeAttribute('id');
      var ids = c.querySelectorAll('[id]');
      for (var i = 0; i < ids.length; i++) ids[i].removeAttribute('id');
      c.setAttribute('aria-hidden', 'true');
      frag.appendChild(c);
    });
    return frag;
  }
  track.insertBefore(cloneSet(), originals[0]);
  track.appendChild(cloneSet());

  // --- 動きは physics.js の方程式から構成する ---
  var P = window.PHYSICS || {
    damp: function (v, c) { return v * (1 - c); },
    springAccel: function (x, x0, v, k, c) { return -k * (x - x0) - c * v; },
    attenuate: function (I0, r) { return I0 / (1 + r * r); },
    kinetic: function (v, m) { return 0.5 * (m || 1) * v * v; }
  };
  var FRICTION = 0.06;    // 粘性摩擦 c（フリックの滑走：小さいほど長く滑る）
  var WHEEL_GAIN = 0.18;  // ホイール入力 → 速度インパルス
  var SPRING_K = 0.014;   // ばね定数 k（クリック収束の強さ）
  var SPRING_C = 0.18;    // 減衰 c（収束の落ち着き）
  var pos = 0, target = 0, vel = 0, mode = 'free', raf = null, running = false;
  var dragging = false, lastX = 0, lastDX = 0;

  // --- 自然光と影の層（陽が空を移動し、地形に陰影が差す） ---
  var light = document.createElement('div');
  light.className = 'deck-light';
  deck.appendChild(light);
  function shine(v) {
    var ke = P.kinetic(v, 1);                          // 運動エネルギー E = ½mv²
    var a = Math.min(0.075, 0.022 + P.attenuate(ke * 0.05, 0)); // 影の濃さ（動くほどわずかに深く）
    var sw = setW();
    var phase = ((pos % sw) + sw) % sw / sw;           // 巻物の進み 0..1（陽の位置）
    var lx = (12 + phase * 76).toFixed(1);             // 光源が空を 12%→88% 周回
    light.style.background =
      'radial-gradient(135% 115% at ' + lx + '% 8%, rgba(255,249,235,0) 32%, rgba(58,49,36,' + a.toFixed(4) + ') 100%)';
  }

  function setW() { return setCount * window.innerWidth; }
  function render() { track.style.transform = 'translate3d(' + (-pos) + 'px,0,0)'; }
  function wrap() {
    var sw = setW();
    if (pos < sw) { pos += sw; target += sw; }
    else if (pos > sw * 2) { pos -= sw; target -= sw; }
  }
  function tick() {
    if (mode === 'spring') {
      // 減衰調和振動  ẍ = −k(x−x₀) − c·ẋ
      vel += P.springAccel(pos, target, vel, SPRING_K, SPRING_C);
      pos += vel;
      if (Math.abs(target - pos) < 0.3 && Math.abs(vel) < 0.3) { pos = target; vel = 0; }
    } else {
      // 粘性摩擦による慣性滑走  v ← v·(1−c)
      pos += vel;
      vel = P.damp(vel, FRICTION);
      if (Math.abs(vel) < 0.02) vel = 0;
    }
    wrap();
    render();
    shine(vel);
    if (vel !== 0 || (mode === 'spring' && pos !== target)) { raf = requestAnimationFrame(tick); }
    else { running = false; raf = null; shine(0); }
  }
  function start() { if (!running) { running = true; raf = requestAnimationFrame(tick); } }
  function goTo(panel) { if (!panel) return; mode = 'spring'; target = panel.offsetLeft; vel = 0; start(); }

  pos = setW(); target = pos; render();

  // ホイール／トラックパッド（縦・横どちらも横移動に）＝速度へインパルス
  deck.addEventListener('wheel', function (e) {
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    mode = 'free'; vel += d * WHEEL_GAIN; e.preventDefault(); start();
  }, { passive: false });

  // ドラッグ（マウス＋タッチ共通）＝指に追従＋離すと慣性
  deck.addEventListener('pointerdown', function (e) {
    dragging = true; mode = 'free'; lastX = e.clientX; lastDX = 0; vel = 0;
    if (raf) { cancelAnimationFrame(raf); raf = null; } running = false;
    try { deck.setPointerCapture(e.pointerId); } catch (_) {}
  });
  deck.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastDX = dx; lastX = e.clientX;
    pos -= dx; target = pos; wrap(); render(); shine(dx);
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    try { deck.releasePointerCapture(e.pointerId); } catch (_) {}
    mode = 'free'; vel = -lastDX; start();   // 離した瞬間の速度を慣性に
  }
  deck.addEventListener('pointerup', endDrag);
  deck.addEventListener('pointercancel', endDrag);

  // クリック：単語／アンカー → 該当パネルへ滑走（別ページに飛ばさない）
  Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
    var href = a.getAttribute('href');
    if (href.indexOf('word.html?w=') !== -1) {
      var w = href.split('w=')[1].split('&')[0];
      a.addEventListener('click', function (e) { var p = document.getElementById('w-' + w); if (p) { e.preventDefault(); goTo(p); } });
    } else if (href.charAt(0) === '#') {
      a.addEventListener('click', function (e) { var t = document.getElementById(href.slice(1)); if (t) { e.preventDefault(); goTo(t.closest('.panel') || t); } });
    }
  });

  window.addEventListener('resize', function () { pos = setW(); target = pos; render(); });
})();

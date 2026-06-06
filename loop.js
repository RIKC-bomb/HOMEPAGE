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

  // --- 自前の慣性スクロール物理（transform） ---
  var EASE = 0.085;       // 目標へ寄る速さ（小さいほど長く滑る）
  var MOMENTUM = 18;      // ドラッグ離した後の慣性の伸び
  var pos = 0, target = 0, raf = null, running = false;
  var dragging = false, lastX = 0, lastDX = 0;

  function setW() { return setCount * window.innerWidth; }
  function render() { track.style.transform = 'translate3d(' + (-pos) + 'px,0,0)'; }
  function wrap() {
    var sw = setW();
    if (pos < sw) { pos += sw; target += sw; }
    else if (pos > sw * 2) { pos -= sw; target -= sw; }
  }
  function tick() {
    var diff = target - pos;
    pos += diff * EASE;
    if (Math.abs(diff) < 0.3) pos = target;
    wrap();
    render();
    if (Math.abs(target - pos) > 0.3) { raf = requestAnimationFrame(tick); }
    else { running = false; raf = null; }
  }
  function start() { if (!running) { running = true; raf = requestAnimationFrame(tick); } }
  function goTo(panel) { if (!panel) return; target = panel.offsetLeft; start(); }

  pos = setW(); target = pos; render();

  // ホイール／トラックパッド（縦・横どちらも横移動に）
  deck.addEventListener('wheel', function (e) {
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    target += d; e.preventDefault(); start();
  }, { passive: false });

  // ドラッグ（マウス＋タッチ共通）＝指に追従＋離すと慣性
  deck.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; lastDX = 0; target = pos;
    if (raf) { cancelAnimationFrame(raf); raf = null; } running = false;
    try { deck.setPointerCapture(e.pointerId); } catch (_) {}
  });
  deck.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastDX = dx; lastX = e.clientX;
    pos -= dx; target = pos; wrap(); render();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    try { deck.releasePointerCapture(e.pointerId); } catch (_) {}
    target = pos - lastDX * MOMENTUM; start();
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

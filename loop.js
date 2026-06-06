// 巻物：単語パネルを生成して組み込み、無限ループ＋イージング(ぬるぬる)＋クリックで該当パネルへ滑走。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ja';

  var WORDS = ['modeling','simulation','speculation'];
  var DATA = {
    modeling:{k:'モデリング',
      ja:'世界をまず形にする。点を立て、面を張り、塊を起こす。粘土のように削り込み<span class="seed">sculpting</span>、表面に色と質感を与え<span class="seed">texturing</span>、光を置いて陰影をつくり<span class="seed">lighting</span>、時間を与えて動かし<span class="seed">animation</span>、最後に計算で一枚の画像へ焼き上げる<span class="seed">rendering</span>。すべては、見えるようにする<span class="seed">visualization</span>ための手数だ。',
      en:'First, the world is made into form. Points stand, surfaces stretch, mass rises. We carve it like clay <span class="seed">sculpting</span>, give the surface color and material <span class="seed">texturing</span>, place light for shadow <span class="seed">lighting</span>, add time to move it <span class="seed">animation</span>, and bake it into a single image <span class="seed">rendering</span>. Every move is to make it visible <span class="seed">visualization</span>.'},
    simulation:{k:'シミュレーション',
      ja:'現象を、手で描かずに計算させる。流体や布や破壊が、ルールに従って勝手に動く。そのために小さなコードを書き<span class="seed">scripting</span>、ソフトの外に道具を組み<span class="seed">programming</span>、コードそのものを書く<span class="seed">coding</span>。規則から形を生み<span class="seed">generation</span>、数を回して答えを出す<span class="seed">calculation</span>。動かしているのは、いつも数式だ。',
      en:'Instead of drawing motion by hand, we let it be computed. Fluids, cloth, destruction move on their own by rules. For that we write small code <span class="seed">scripting</span>, build tools beyond the software <span class="seed">programming</span>, write the code itself <span class="seed">coding</span>, grow form from rules <span class="seed">generation</span>, and turn numbers into answers <span class="seed">calculation</span>. What moves it is always an equation.'},
    speculation:{k:'スペキュレーション',
      ja:'まだ無い未来を、先に見る。ありえる世界、ありえた世界を構想し、その姿を描く。これが bomb の核だ。思索とは、世界の見え方そのもの<span class="seed">perspective</span>を選ぶこと。そして選んだ視点を、人が直感で掴める像へ翻訳する<span class="seed">visualization</span>。3, 6, 9 ── 複雑な方程式から、シンプルな解へ。',
      en:'We see the not-yet future first. We envision worlds that could be, that could have been, and draw their shape. This is the core of bomb. To speculate is to choose how the world is seen <span class="seed">perspective</span>, and to translate that view into an image one can grasp at once <span class="seed">visualization</span>. 3, 6, 9 — from a complex equation toward a simple solution.'}
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

  // --- 無限ループ用に前後へ複製 ---
  var originals = Array.prototype.slice.call(deck.children);
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
  deck.insertBefore(cloneSet(), originals[0]);
  deck.appendChild(cloneSet());

  // --- イージング＋ループ ---
  var EASE = 0.06, targetX = 0, animating = false, raf = null, touching = false;
  function setW() { return setCount * window.innerWidth; }
  function wrapNow() {
    var sw = setW();
    if (deck.scrollLeft < sw) { deck.scrollLeft += sw; targetX += sw; }
    else if (deck.scrollLeft > sw * 2) { deck.scrollLeft -= sw; targetX -= sw; }
  }
  function loopFn() {
    if (touching) { animating = false; raf = null; return; }
    var diff = targetX - deck.scrollLeft;
    if (Math.abs(diff) < 0.5) { deck.scrollLeft = targetX; wrapNow(); animating = false; raf = null; return; }
    deck.scrollLeft += diff * EASE;
    wrapNow();
    raf = requestAnimationFrame(loopFn);
  }
  function start() { if (!animating) { animating = true; raf = requestAnimationFrame(loopFn); } }
  function goTo(panel) { if (!panel) return; targetX = panel.offsetLeft; start(); }

  deck.scrollLeft = setW();
  targetX = deck.scrollLeft;

  deck.addEventListener('wheel', function (e) {
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    targetX += d; e.preventDefault(); start();
  }, { passive: false });
  deck.addEventListener('touchstart', function () { touching = true; if (raf) { cancelAnimationFrame(raf); raf = null; } animating = false; }, { passive: true });
  deck.addEventListener('touchend', function () { touching = false; targetX = deck.scrollLeft; }, { passive: true });
  deck.addEventListener('scroll', function () {
    if (animating) return;
    requestAnimationFrame(function () { wrapNow(); if (!animating) targetX = deck.scrollLeft; });
  }, { passive: true });

  // --- クリック：単語/アンカー → 該当パネルへ滑走（別ページに飛ばさない） ---
  Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
    var href = a.getAttribute('href');
    if (href.indexOf('word.html?w=') !== -1) {
      var w = href.split('w=')[1].split('&')[0];
      a.addEventListener('click', function (e) { var p = document.getElementById('w-' + w); if (p) { e.preventDefault(); goTo(p); } });
    } else if (href.charAt(0) === '#') {
      a.addEventListener('click', function (e) { var t = document.getElementById(href.slice(1)); if (t) { e.preventDefault(); goTo(t.closest('.panel') || t); } });
    }
  });

  window.addEventListener('resize', function () { deck.scrollLeft = setW(); targetX = deck.scrollLeft; });
})();

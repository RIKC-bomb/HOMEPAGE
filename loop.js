// 巻物：単語パネルを生成して組み込み、無限ループ＋イージング(ぬるぬる)＋クリックで該当パネルへ滑走。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ja';

  var WORDS = ['modeling','sculpting','texturing','lighting','animation','rendering','coding','scripting','programming','generation','calculation','simulation','speculation','visualization','perspective'];
  var DATA = {
    modeling:{k:'モデリング',ja:'3DCGで「形」を作る工程。ポリゴンやNURBSで物体や空間のかたちを一から構築する。',en:'Building 3D form from scratch with polygons or NURBS.'},
    sculpting:{k:'スカルプティング',ja:'粘土をこねるように3Dモデルを彫り込む手法。有機的で繊細な造形に向く。',en:'Shaping a 3D model like clay — ideal for organic, detailed forms.'},
    texturing:{k:'テクスチャリング',ja:'モデルの表面に色や質感を与え、素材としての説得力を作る工程。',en:'Giving surfaces color and material so they feel real.'},
    lighting:{k:'ライティング',ja:'3D空間に光を配置し、陰影・空気・時間帯・感情をつくる工程。',en:'Placing light to shape shadow, atmosphere and emotion.'},
    animation:{k:'アニメーション',ja:'キーフレームで「こう動かしたい」を手付けする工程。',en:'Authoring intended motion by hand with keyframes.'},
    rendering:{k:'レンダリング',ja:'3Dシーンを計算し、最終的な画像・映像へ焼き上げる工程。',en:'Computing a 3D scene into the final image or film.'},
    coding:{k:'コーディング',ja:'コードを書く行為全般。自動化やツール作りを含む総称。',en:'Writing code — the umbrella for automation and tools.'},
    scripting:{k:'スクリプティング',ja:'既存ソフトの中で動く小さなコード。自動化や手続き的生成を担う。',en:'Small code inside software to automate and generate.'},
    programming:{k:'プログラミング',ja:'独立したソフトやシステム、制作パイプラインを設計・構築する。',en:'Building standalone software, systems and pipelines.'},
    generation:{k:'ジェネレーション',ja:'ルールやアルゴリズムから形・パターンを生成する。',en:'Creating form and pattern from rules and algorithms.'},
    calculation:{k:'カリキュレーション',ja:'数値計算。形状・物理・最適化などの土台になる演算。',en:'Numerical computation behind geometry and physics.'},
    simulation:{k:'シミュレーション',ja:'物理やルールで動き・現象を計算する（流体・布・破壊など）。',en:'Computing motion and phenomena by physics — fluids, cloth, destruction.'},
    speculation:{k:'スペキュレーション',ja:'まだ無い未来や世界を構想し、ありえる姿を思索する。bombの核。',en:'Envisioning futures that do not yet exist. The core of bomb.'},
    visualization:{k:'ビジュアライゼーション',ja:'データや構想を、人が直感で掴める画像・映像へ翻訳する。',en:'Translating data and ideas into images one can grasp.'},
    perspective:{k:'パースペクティブ',ja:'視点。世界の見え方そのもの。すべてが最後に立ち返る軸。',en:'A point of view — how the world is seen. Where all returns.'}
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
  var EASE = 0.1, targetX = 0, animating = false, raf = null, touching = false;
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

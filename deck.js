// 連続・ぬるぬる横スクロール。ホイール/トラックパッドはイージング、スマホはネイティブ慣性。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var panels = Array.prototype.slice.call(deck.querySelectorAll('.panel'));
  var dotsWrap = document.querySelector('.dots');
  var prevBtn = document.querySelector('.deck-arrow.prev');
  var nextBtn = document.querySelector('.deck-arrow.next');
  var hint = document.querySelector('.scroll-hint');
  var dots = [];

  var targetX = deck.scrollLeft;
  var raf = null;
  var animating = false;

  function clampX(x) { return Math.max(0, Math.min(deck.scrollWidth - deck.clientWidth, x)); }
  function index() { return Math.round(deck.scrollLeft / deck.clientWidth); }

  function update() {
    var i = index();
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('active', k === i);
    if (prevBtn) prevBtn.classList.toggle('hidden', deck.scrollLeft <= 2);
    if (nextBtn) nextBtn.classList.toggle('hidden', deck.scrollLeft >= deck.scrollWidth - deck.clientWidth - 2);
    if (hint && deck.scrollLeft > 12) hint.classList.add('gone');
  }

  function loop() {
    var diff = targetX - deck.scrollLeft;
    if (Math.abs(diff) < 0.5) {
      deck.scrollLeft = targetX;
      animating = false; raf = null;
      update();
      return;
    }
    deck.scrollLeft += diff * 0.16; // イージング係数（小さいほどゆっくり滑る）
    update();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!animating) { animating = true; raf = requestAnimationFrame(loop); } }

  function go(i) {
    i = Math.max(0, Math.min(panels.length - 1, i));
    targetX = clampX(i * deck.clientWidth);
    start();
  }

  // ホイール／トラックパッド（縦回転も横へ）→ イージングで滑らかに
  deck.addEventListener('wheel', function (e) {
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (e.deltaMode === 1) d *= 16; // 行単位の場合はpxへ概算
    targetX = clampX(targetX + d);
    e.preventDefault();
    start();
  }, { passive: false });

  // タッチ中はネイティブの慣性スクロールに任せる
  deck.addEventListener('touchstart', function () {
    if (raf) { cancelAnimationFrame(raf); raf = null; animating = false; }
    targetX = deck.scrollLeft;
  }, { passive: true });

  deck.addEventListener('scroll', function () {
    if (!animating) targetX = deck.scrollLeft;
    window.requestAnimationFrame(update);
  }, { passive: true });

  if (dotsWrap) {
    panels.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', (i + 1) + '番目へ');
      b.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
  }
  if (prevBtn) prevBtn.addEventListener('click', function () { go(index() - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(index() + 1); });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (!t) return;
      var i = panels.indexOf(t.closest('.panel'));
      if (i >= 0) { e.preventDefault(); go(i); }
    });
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });
  window.addEventListener('resize', function () { targetX = clampX(targetX); update(); });

  update();
})();

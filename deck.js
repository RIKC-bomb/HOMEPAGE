// 縦スクロール→横移動はCSS(スクロール駆動アニメ)。PCホイールに強めの慣性(イージング)を付与。
(function () {
  var track = document.querySelector('.scroll-track');
  if (!track) return;
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var n = panels.length;
  var dotsWrap = document.querySelector('.dots');
  var prevBtn = document.querySelector('.deck-arrow.prev');
  var nextBtn = document.querySelector('.deck-arrow.next');
  var hint = document.querySelector('.scroll-hint');
  var dots = [];

  var EASE = 0.075;  // 小さいほど長く滑る
  var SPEED = 1.15;  // ホイール1刻みの移動量
  var targetY = window.scrollY, animating = false, raf = null, touching = false;

  function maxScroll() { return Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
  function clampY(y) { return Math.max(0, Math.min(maxScroll(), y)); }
  function index() { return Math.round((window.scrollY / maxScroll()) * (n - 1)); }

  function update() {
    var i = index();
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('active', k === i);
    if (prevBtn) prevBtn.classList.toggle('hidden', window.scrollY <= 2);
    if (nextBtn) nextBtn.classList.toggle('hidden', window.scrollY >= maxScroll() - 2);
    if (hint && window.scrollY > 12) hint.classList.add('gone');
  }

  function loop() {
    var cur = window.scrollY;
    var diff = targetY - cur;
    if (Math.abs(diff) < 0.5) {
      window.scrollTo(0, Math.round(targetY));
      animating = false; raf = null; update();
      return;
    }
    window.scrollTo(0, cur + diff * EASE);
    update();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!animating) { animating = true; raf = requestAnimationFrame(loop); } }

  function go(i) {
    i = Math.max(0, Math.min(n - 1, i));
    targetY = clampY((i / (n - 1)) * maxScroll());
    start();
  }

  // PCホイール/トラックパッド → 慣性つきで縦スクロール（CSSが横へ変換）
  window.addEventListener('wheel', function (e) {
    if (touching) return;
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (e.deltaMode === 1) d *= 16;
    targetY = clampY(targetY + d * SPEED);
    e.preventDefault();
    start();
  }, { passive: false });

  // スマホはネイティブ慣性に委譲
  window.addEventListener('touchstart', function () {
    touching = true;
    if (raf) { cancelAnimationFrame(raf); raf = null; animating = false; }
    targetY = window.scrollY;
  }, { passive: true });
  window.addEventListener('touchend', function () { touching = false; targetY = window.scrollY; }, { passive: true });

  window.addEventListener('scroll', function () {
    if (!animating) targetY = window.scrollY;
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
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(index() + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(index() - 1); }
  });
  window.addEventListener('resize', function () { targetY = clampY(targetY); update(); });

  update();
})();

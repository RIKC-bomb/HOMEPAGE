// 縦スクロール操作（ホイール/上下フリック）→ 横移動（巻物）に変換する
(function () {
  var track = document.querySelector('.h-track');
  var rail = document.querySelector('.h-rail');
  if (!track || !rail) return;
  var panels = Array.prototype.slice.call(rail.querySelectorAll('.panel'));
  var dotsWrap = document.querySelector('.dots');
  var prevBtn = document.querySelector('.deck-arrow.prev');
  var nextBtn = document.querySelector('.deck-arrow.next');
  var hint = document.querySelector('.scroll-hint');
  var dots = [];

  function maxX() { return Math.max(0, rail.scrollWidth - window.innerWidth); }
  function setHeight() { track.style.height = (maxX() + window.innerHeight) + 'px'; }
  function curX() {
    return Math.min(Math.max(window.scrollY - track.offsetTop, 0), maxX());
  }
  function index() { return Math.round(curX() / window.innerWidth); }

  function render() {
    var x = curX();
    rail.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    var idx = Math.round(x / window.innerWidth);
    for (var i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === idx);
    if (prevBtn) prevBtn.classList.toggle('hidden', x <= 1);
    if (nextBtn) nextBtn.classList.toggle('hidden', x >= maxX() - 1);
    if (hint && x > 12) hint.classList.add('gone');
  }

  function go(i) {
    i = Math.max(0, Math.min(panels.length - 1, i));
    window.scrollTo({ top: track.offsetTop + i * window.innerWidth, behavior: 'smooth' });
  }

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

  // ページ内リンク（#about 等）→ 該当パネルへ横移動
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (!t) return;
      var panel = t.closest('.panel');
      var i = panels.indexOf(panel);
      if (i >= 0) { e.preventDefault(); go(i); }
    });
  });

  window.addEventListener('scroll', function () { window.requestAnimationFrame(render); }, { passive: true });
  window.addEventListener('resize', function () { setHeight(); render(); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });

  setHeight();
  render();
  // フォント読み込み等でrailの幅が変わる場合に再計算
  window.addEventListener('load', function () { setHeight(); render(); });
})();

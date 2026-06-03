// ネイティブ横スクロール。PCはホイール(縦)を横へ変換、スマホは横スワイプで滑らかに。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var panels = Array.prototype.slice.call(deck.querySelectorAll('.panel'));
  var dotsWrap = document.querySelector('.dots');
  var prevBtn = document.querySelector('.deck-arrow.prev');
  var nextBtn = document.querySelector('.deck-arrow.next');
  var hint = document.querySelector('.scroll-hint');
  var dots = [];

  function index() { return Math.round(deck.scrollLeft / deck.clientWidth); }

  function update() {
    var i = index();
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('active', k === i);
    if (prevBtn) prevBtn.classList.toggle('hidden', deck.scrollLeft <= 2);
    if (nextBtn) nextBtn.classList.toggle('hidden', deck.scrollLeft >= deck.scrollWidth - deck.clientWidth - 2);
    if (hint && deck.scrollLeft > 12) hint.classList.add('gone');
  }

  function go(i) {
    i = Math.max(0, Math.min(panels.length - 1, i));
    deck.scrollTo({ left: i * deck.clientWidth, behavior: 'smooth' });
  }

  // マウスホイール（縦回転）→ 横スクロールへ変換
  deck.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      deck.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

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
      var i = panels.indexOf(t.closest('.panel'));
      if (i >= 0) { e.preventDefault(); go(i); }
    });
  });

  deck.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });

  update();
})();

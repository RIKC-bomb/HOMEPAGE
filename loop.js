// 巻物を無限ループ：パネル列を前後に複製し、端で継ぎ目なく中央へワープ。
// ネイティブ横スクロール＋ホイール(縦)→横変換。左右どちらにも循環。
(function () {
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var originals = Array.prototype.slice.call(deck.children);
  var setCount = originals.length;
  if (setCount < 1) return;

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
  // [clone][original][clone]
  deck.insertBefore(cloneSet(), originals[0]);
  deck.appendChild(cloneSet());

  function setW() { return setCount * window.innerWidth; }
  function center() { deck.scrollLeft = setW(); }
  center();

  var ticking = false;
  deck.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var sw = setW();
      if (deck.scrollLeft < sw) deck.scrollLeft += sw;
      else if (deck.scrollLeft > sw * 2) deck.scrollLeft -= sw;
      ticking = false;
    });
  }, { passive: true });

  // ホイール／トラックパッド：縦回転も横スクロールへ
  deck.addEventListener('wheel', function (e) {
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    deck.scrollLeft += d;
    e.preventDefault();
  }, { passive: false });

  // ページ内リンク（#contact 等）→ 該当パネルへ
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.getElementById(this.getAttribute('href').slice(1));
      if (!t) return;
      var panel = t.closest('.panel');
      if (panel) { e.preventDefault(); deck.scrollTo({ left: panel.offsetLeft, behavior: 'smooth' }); }
    });
  });

  window.addEventListener('resize', center);
})();

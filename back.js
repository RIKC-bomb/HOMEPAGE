// サブページ（縦ページ）を上下に引っ張る／ホイールを送ると、物理でスーッとホームへ戻る。
// 端で更に引っ張る＝ゴムのように追従し、しきい値を超えるとスライドして遷移。説明不要の"戻る"。
(function () {
  var EDGE = 150;     // これ以上引っ張ると戻る
  var RESIST = 0.45;  // ゴムの抵抗（小さいほど重い）
  var home = document.body.getAttribute('data-home') || 'index.html';
  var doc = document.scrollingElement || document.documentElement;
  var pull = 0, releasing = false, decay = null;

  function atTop() { return doc.scrollTop <= 0; }
  function atBottom() { return doc.scrollTop + window.innerHeight >= doc.scrollHeight - 1; }

  function apply(p) {
    pull = p;
    document.body.style.transform = 'translateY(' + (p * RESIST) + 'px)';
    document.body.style.opacity = String(1 - Math.min(1, Math.abs(p) / EDGE) * 0.12);
  }
  function reset() {
    document.body.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), opacity .5s';
    apply(0);
    setTimeout(function () { document.body.style.transition = ''; }, 520);
  }
  function go(dir) {
    if (releasing) return;
    releasing = true;
    document.body.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1), opacity .5s';
    document.body.style.transform = 'translateY(' + (dir * window.innerHeight) + 'px)';
    document.body.style.opacity = '0';
    setTimeout(function () { location.href = home; }, 470);
  }

  // マウス／トラックパッド：端で更に送ると引っ張られ、鼓動を重ねるとしきい値超えで戻る
  window.addEventListener('wheel', function (e) {
    if (releasing) return;
    if (atTop() && e.deltaY < 0) { e.preventDefault(); apply(pull - e.deltaY); }
    else if (atBottom() && e.deltaY > 0) { e.preventDefault(); apply(pull - e.deltaY); }
    else { return; }
    clearTimeout(decay);
    if (Math.abs(pull) >= EDGE) { go(pull > 0 ? 1 : -1); return; }
    decay = setTimeout(reset, 170); // 送るのを止めたら戻る
  }, { passive: false });

  // タッチ：端で引っ張って離す
  var sy = null;
  window.addEventListener('touchstart', function (e) { sy = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (releasing || sy === null) return;
    var dy = e.touches[0].clientY - sy;
    if (atTop() && dy > 0) { e.preventDefault(); apply(dy); }
    else if (atBottom() && dy < 0) { e.preventDefault(); apply(dy); }
  }, { passive: false });
  window.addEventListener('touchend', function () {
    if (!releasing) { if (Math.abs(pull) >= EDGE) go(pull > 0 ? 1 : -1); else reset(); }
    sy = null;
  }, { passive: true });
})();

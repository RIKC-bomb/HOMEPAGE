// 法務ページ：内容を画面に収まるよう自動スケール（スクロール無し・端末サイズ対応）
(function () {
  var el = document.querySelector('.fit-page .legal');
  if (!el) return;
  function fit() {
    el.style.transform = 'translate(-50%, -50%) scale(1)';
    var availW = window.innerWidth - 40;
    var availH = window.innerHeight - 120; // 上部ヘッダー分の余白
    var s = Math.min(availW / el.offsetWidth, availH / el.offsetHeight, 1.5);
    if (!isFinite(s) || s <= 0) s = 1;
    el.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (document.readyState !== 'loading') fit();
  else document.addEventListener('DOMContentLoaded', fit);
})();

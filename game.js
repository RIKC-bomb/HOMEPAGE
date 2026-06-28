// 普通のサイトに唐突にボールが出現。ヒーローの言葉がブロック。下のバー=パドル（ドラッグ/十字キー）。
// 全部崩すと全要素がフェードして真っ白＝何もなくなる。リロードで復活。
(function () {
  var words = document.querySelectorAll('.hero-words span');
  if (!words.length) return;

  // モバイルでは出さない（軽量化）／モーション低減設定も尊重
  if (window.matchMedia &&
      (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  var APPEAR_RATE = 0.1; // 出現確率（0.1 = 10回に1回くらい・唐突なイースターエッグ）
  if (Math.random() > APPEAR_RATE) return;

  var paddle = document.createElement('div'); paddle.className = 'bk-paddle';
  var ball = document.createElement('div'); ball.className = 'bk-ball';
  document.body.appendChild(paddle);
  document.body.appendChild(ball);

  var W, H, pw, ph = 12, px, bx, by, bdx, bdy, br = 8, speed, cleared = false;

  function size() {
    W = window.innerWidth; H = window.innerHeight;
    pw = Math.max(90, Math.min(170, W * 0.16));
    paddle.style.width = pw + 'px';
  }
  size();
  px = W / 2;
  speed = Math.max(3.5, H / 175);
  bx = W / 2; by = H * 0.38; bdx = speed * 0.7; bdy = speed;

  var dragging = false;
  window.addEventListener('mousedown', function () { dragging = true; });
  window.addEventListener('mouseup', function () { dragging = false; });
  window.addEventListener('mousemove', function (e) { if (dragging) px = e.clientX; });
  window.addEventListener('touchmove', function (e) { if (e.touches[0]) px = e.touches[0].clientX; }, { passive: true });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') px -= 36;
    else if (e.key === 'ArrowRight') px += 36;
  });
  window.addEventListener('resize', size);

  function allBroken() {
    for (var i = 0; i < words.length; i++) if (!words[i].classList.contains('broken')) return false;
    return true;
  }

  function clearAll() {
    cleared = true;
    var fade = document.querySelectorAll('.site-header, .scroll-track, .deck-arrow');
    for (var k = 0; k < fade.length; k++) {
      fade[k].style.transition = 'opacity 0.6s ease';
      fade[k].style.opacity = '0';
    }
    setTimeout(function () {
      if (ball.parentNode) ball.parentNode.removeChild(ball);
      if (paddle.parentNode) paddle.parentNode.removeChild(paddle);
    }, 600);
  }

  function frame() {
    if (cleared) return; // 真っ白で停止（リロードで復活）
    if (!dragging) px += (bx - px) * 0.09; // バーは自動でボールを追う（手動ドラッグ時は手動優先）
    px = Math.max(pw / 2, Math.min(W - pw / 2, px));
    var py = H - 34 - ph;
    paddle.style.left = (px - pw / 2) + 'px';
    paddle.style.top = py + 'px';

    bx += bdx; by += bdy;
    if (bx < br) { bx = br; bdx = Math.abs(bdx); }
    if (bx > W - br) { bx = W - br; bdx = -Math.abs(bdx); }
    if (by < br) { by = br; bdy = Math.abs(bdy); }

    if (bdy > 0 && by + br >= py && by - br <= py + ph && bx >= px - pw / 2 - br && bx <= px + pw / 2 + br) {
      by = py - br;
      var hit = (bx - px) / (pw / 2);
      var ang = Math.max(-1.1, Math.min(1.1, hit * 1.1));
      bdx = speed * Math.sin(ang);
      bdy = -speed * Math.cos(ang);
    }

    // 落としても終わりにせず再投入
    if (by - br > H + 40) { bx = W / 2; by = 70; bdx = speed * (Math.random() < 0.5 ? 0.7 : -0.7); bdy = speed; }

    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w.classList.contains('broken')) continue;
      var r = w.getBoundingClientRect();
      if (r.width === 0) continue;
      if (bx + br > r.left && bx - br < r.right && by + br > r.top && by - br < r.bottom) {
        w.classList.add('broken');
        var ox = Math.min(bx + br - r.left, r.right - (bx - br));
        var oy = Math.min(by + br - r.top, r.bottom - (by - br));
        if (ox < oy) bdx *= -1; else bdy *= -1;
        break;
      }
    }
    if (allBroken()) { clearAll(); return; }

    ball.style.left = (bx - br) + 'px';
    ball.style.top = (by - br) + 'px';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

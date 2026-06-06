// 巻物版の背景：点からの色拡散(IDW)＋白へフェード。白い部分が多めの淡いグラデ。
(function () {
  var cv = document.getElementById('bg-seep');
  if (!cv) return;
  function hsl(h, sa, l) {
    var c = (1 - Math.abs(2 * l - 1)) * sa, x = c * (1 - Math.abs((h / 60) % 2 - 1)), mm = l - c / 2, r, g, b;
    if (h < 60) { r = c; g = x; b = 0; } else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; } else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; } else { r = c; g = 0; b = x; }
    return [(r + mm) * 255, (g + mm) * 255, (b + mm) * 255];
  }
  function render() {
    var w = window.innerWidth, h = window.innerHeight;
    cv.width = w; cv.height = h;
    var cols = 60, rows = Math.max(8, Math.round(60 * h / w));
    var off = document.createElement('canvas'); off.width = cols; off.height = rows;
    var octx = off.getContext('2d'); var img = octx.createImageData(cols, rows);
    var POW = 1.3, EMP = 2.0, GRAD = 0.5, MAXB = 3, MIND = 1.0; // GRAD大=白多め
    var N = 4 + Math.floor(Math.random() * 4); var srcs = [];
    for (var i = 0; i < N; i++) {
      var col = hsl(Math.random() * 360, 0.7, 0.58);
      srcs.push({ x: Math.random() * cols, y: Math.random() * rows, f: 3 + Math.random() * 6, r: col[0], g: col[1], b: col[2] });
    }
    for (var yy = 0; yy < rows; yy++) {
      for (var xx = 0; xx < cols; xx++) {
        var inf = [];
        for (var k = 0; k < srcs.length; k++) {
          var sp = srcs[k], dx = xx - sp.x, dy = yy - sp.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < MIND) d = MIND;
          inf.push({ v: Math.pow(sp.f, EMP) / Math.pow(d, POW), s: sp });
        }
        inf.sort(function (a, b) { return b.v - a.v; });
        inf = inf.slice(0, MAXB);
        var tot = 0; for (var m = 0; m < inf.length; m++) tot += inf[m].v;
        var idx = (yy * cols + xx) * 4, r = 255, g = 255, b = 255;
        if (tot > 0.001) {
          r = g = b = 0;
          for (var m2 = 0; m2 < inf.length; m2++) { r += inf[m2].s.r * inf[m2].v; g += inf[m2].s.g * inf[m2].v; b += inf[m2].s.b * inf[m2].v; }
          r /= tot; g /= tot; b /= tot;
          var tw = GRAD / (GRAD + tot); if (tw < 0) tw = 0; if (tw > 1) tw = 1;
          r = r + (255 - r) * tw; g = g + (255 - g) * tw; b = b + (255 - b) * tw;
        }
        img.data[idx] = r; img.data[idx + 1] = g; img.data[idx + 2] = b; img.data[idx + 3] = 255;
      }
    }
    octx.putImageData(img, 0, 0);
    var ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = true;
    ctx.drawImage(off, 0, 0, cols, rows, 0, 0, w, h);
  }
  render();
  window.addEventListener('resize', render);
})();

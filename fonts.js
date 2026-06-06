// リロードごとにランダムな無料フォントを1つ読み込む（日英で出し分け）。
// 印象の良い端正な書体のみに厳選（ガタガタ・奇抜・極太・ピクセル系は除外）。
(function () {
  var ja = [
    { css: '"Noto Sans JP",sans-serif', g: 'Noto+Sans+JP:wght@400;700;900' },
    { css: '"Noto Serif JP",serif', g: 'Noto+Serif+JP:wght@400;700;900' },
    { css: '"Zen Kaku Gothic New",sans-serif', g: 'Zen+Kaku+Gothic+New:wght@400;700;900' },
    { css: '"Zen Kaku Gothic Antique",sans-serif', g: 'Zen+Kaku+Gothic+Antique:wght@400;700;900' },
    { css: '"Zen Maru Gothic",sans-serif', g: 'Zen+Maru+Gothic:wght@400;700;900' },
    { css: '"Zen Old Mincho",serif', g: 'Zen+Old+Mincho:wght@400;700;900' },
    { css: '"Zen Antique",serif', g: 'Zen+Antique' },
    { css: '"Zen Antique Soft",serif', g: 'Zen+Antique+Soft' },
    { css: '"Zen Kurenaido",sans-serif', g: 'Zen+Kurenaido' },
    { css: '"M PLUS 1",sans-serif', g: 'M+PLUS+1:wght@400;700;800' },
    { css: '"M PLUS 2",sans-serif', g: 'M+PLUS+2:wght@400;700;800' },
    { css: '"M PLUS 1p",sans-serif', g: 'M+PLUS+1p:wght@400;700;800' },
    { css: '"M PLUS Rounded 1c",sans-serif', g: 'M+PLUS+Rounded+1c:wght@400;700;800' },
    { css: '"Kosugi",sans-serif', g: 'Kosugi' },
    { css: '"Kosugi Maru",sans-serif', g: 'Kosugi+Maru' },
    { css: '"Sawarabi Gothic",sans-serif', g: 'Sawarabi+Gothic' },
    { css: '"Sawarabi Mincho",serif', g: 'Sawarabi+Mincho' },
    { css: '"BIZ UDGothic",sans-serif', g: 'BIZ+UDGothic:wght@400;700' },
    { css: '"BIZ UDPGothic",sans-serif', g: 'BIZ+UDPGothic:wght@400;700' },
    { css: '"BIZ UDMincho",serif', g: 'BIZ+UDMincho:wght@400;700' },
    { css: '"BIZ UDPMincho",serif', g: 'BIZ+UDPMincho' },
    { css: '"Shippori Mincho",serif', g: 'Shippori+Mincho:wght@400;700;800' },
    { css: '"Shippori Mincho B1",serif', g: 'Shippori+Mincho+B1:wght@400;700;800' },
    { css: '"Shippori Antique",sans-serif', g: 'Shippori+Antique' },
    { css: '"Shippori Antique B1",sans-serif', g: 'Shippori+Antique+B1' },
    { css: '"Kaisei Decol",serif', g: 'Kaisei+Decol:wght@400;700' },
    { css: '"Kaisei Opti",serif', g: 'Kaisei+Opti:wght@400;700' },
    { css: '"Kaisei Tokumin",serif', g: 'Kaisei+Tokumin:wght@400;700;800' },
    { css: '"Kaisei HarunoUmi",serif', g: 'Kaisei+HarunoUmi:wght@400;700' },
    { css: '"Klee One",cursive', g: 'Klee+One:wght@400;600' },
    { css: '"Yomogi",cursive', g: 'Yomogi' },
    { css: '"Kiwi Maru",serif', g: 'Kiwi+Maru:wght@400;500' },
    { css: '"Murecho",sans-serif', g: 'Murecho:wght@400;700;800' },
    { css: '"IBM Plex Sans JP",sans-serif', g: 'IBM+Plex+Sans+JP:wght@400;700' }
  ];

  var en = [
    { css: '"Caveat",cursive', g: 'Caveat:wght@400;700' },
    { css: '"Architects Daughter",cursive', g: 'Architects+Daughter' },
    { css: '"Patrick Hand",cursive', g: 'Patrick+Hand' },
    { css: '"Shadows Into Light",cursive', g: 'Shadows+Into+Light' },
    { css: '"Kalam",cursive', g: 'Kalam:wght@300;400;700' },
    { css: '"Indie Flower",cursive', g: 'Indie+Flower' },
    { css: '"Handlee",cursive', g: 'Handlee' },
    { css: '"Delius",cursive', g: 'Delius' },
    { css: '"Itim",cursive', g: 'Itim' },
    { css: '"Merienda",cursive', g: 'Merienda:wght@400;700' },
    { css: '"Dancing Script",cursive', g: 'Dancing+Script:wght@400;700' },
    { css: '"Pacifico",cursive', g: 'Pacifico' },
    { css: '"Satisfy",cursive', g: 'Satisfy' },
    { css: '"Kaushan Script",cursive', g: 'Kaushan+Script' },
    { css: '"Great Vibes",cursive', g: 'Great+Vibes' },
    { css: '"Sacramento",cursive', g: 'Sacramento' },
    { css: '"Parisienne",cursive', g: 'Parisienne' },
    { css: '"Allura",cursive', g: 'Allura' },
    { css: '"Alex Brush",cursive', g: 'Alex+Brush' },
    { css: '"Pinyon Script",cursive', g: 'Pinyon+Script' },
    { css: '"Marck Script",cursive', g: 'Marck+Script' },
    { css: '"Petit Formal Script",cursive', g: 'Petit+Formal+Script' },
    { css: '"Cookie",cursive', g: 'Cookie' },
    { css: '"Yellowtail",cursive', g: 'Yellowtail' },
    { css: '"Tangerine",cursive', g: 'Tangerine:wght@400;700' },
    { css: '"Italianno",cursive', g: 'Italianno' },
    { css: '"Mr Dafoe",cursive', g: 'Mr+Dafoe' },
    { css: '"Style Script",cursive', g: 'Style+Script' }
  ];

  var PI = '31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066';
  var now = new Date();
  var CAPITAL = 969696; // bombの資本金 ¥969,696 — 会社の素を“ゆらぎ”に織り込む
  if (window.PI_BIG && window.PI_BIG.length > 1000) PI = window.PI_BIG; // π100万桁が読めれば使う
  var coord = parseInt(PI.substr(Math.min(CAPITAL, PI.length - 9), 9), 10) || 1; // 資本金969,696番目のπ＝会社の座標
  var conds = [
    CAPITAL,
    Date.now(),
    Math.floor(((window.performance && performance.now) ? performance.now() : 0) * 1000),
    now.getMilliseconds(),
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
    (screen.width || 1) * (screen.height || 1),
    Math.round((window.devicePixelRatio || 1) * 1000),
    -now.getTimezoneOffset(),
    (navigator.language || '').length + (navigator.languages ? navigator.languages.length : 0),
    Math.floor(Math.random() * 2147483647)
  ];
  var list = (document.documentElement.lang === 'en') ? en : ja;
  var seed = 1;
  var piOff = (Date.now() + CAPITAL) % (PI.length - 9); // 時刻＋資本金で π の読み出し位置を決める
  for (var ci = 0; ci < conds.length; ci++) {
    var piChunk = parseInt(PI.substr((piOff + ci * 9) % (PI.length - 9), 9), 10) || 1;
    seed = (seed + ((conds[ci] % 1000003) + 1) * (piChunk % 9973 + 1)) % 2147483647;
  }
  seed = (seed + (coord % 2147483647)) % 2147483647;
  seed = (seed ^ (seed >> 13) ^ (seed << 5)) >>> 0;
  var f = list[seed % list.length];

  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=' + f.g + '&display=swap';
  document.head.appendChild(l);
  document.documentElement.style.setProperty('--font', f.css);

  // フォントが変わっても「bomb」の見た目サイズを一定に（実測して合わせる）。
  // 書体ごとに字幅・字面が違うので、px固定だとリロードのたびに大きさが動く。
  // → "bomb" の描画幅を目標幅に合わせ、フォントに依らず同じ大きさに見せる。
  function fitTitle() {
    var hs = document.querySelectorAll('.hero-title');
    if (!hs.length) return;
    var first = hs[0];
    var a = first.querySelector('a') || first;
    first.style.fontSize = '100px';
    var w = a.getBoundingClientRect().width;
    if (w > 4) {
      var target = Math.min(window.innerWidth * 0.42, 320);  // 目標の描画幅
      var fs = Math.max(44, Math.min(100 * target / w, 126)); // 旧8rem(=128px)相当を超えない
      var px = fs.toFixed(2) + 'px';
      for (var i = 0; i < hs.length; i++) hs[i].style.fontSize = px;
    } else {
      first.style.fontSize = '';
    }
  }
  function whenReady() {
    fitTitle();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
  }
  if (document.readyState !== 'loading') whenReady();
  else document.addEventListener('DOMContentLoaded', whenReady);
  window.addEventListener('resize', fitTitle);
})();

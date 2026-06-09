// 多言語：自前辞書（外部依存ゼロ）＋言語パネル。Cフェーズ＝土台＋少数言語。
// 訳すのはUIラベル/リード文/会社表の見出しのみ（bomb・概念語・座標・メアドは共通）。
// ヒエログリフ(egy)は uniliteral signs への音訳（翻訳ではなく音をうつす表記）。
(function () {
  var DICT = {
    en: {name:'English', nav_contact:'Contact', contact:'Contact', location:'Location',
      recruit:'Recruit', privacy:'Privacy Policy', legal:'Legal notices', credits:'Credits',
      works:'works', coming:'coming soon',
      lead1:'We like to imagine things, and to make them.', lead2:'If anything catches your interest, feel free to email us.',
      th_name:'Name', th_founder:'Founder', th_founded:'Founded', th_address:'Address', th_contact:'Contact'},
    ja: {name:'日本語', nav_contact:'Contact', contact:'Contact', location:'Location',
      recruit:'Recruit', privacy:'Privacy Policy', legal:'Legal notices', credits:'Credits',
      works:'作例', coming:'準備中',
      lead1:'何かを想像したり、それを作ったりすることが好きです。', lead2:'気になることがあれば、自由にメールしてください。',
      th_name:'商号', th_founder:'代表社員', th_founded:'設立', th_address:'所在地', th_contact:'連絡先'},
    zh: {name:'中文', nav_contact:'联系', contact:'联系', location:'所在地',
      recruit:'招聘', privacy:'隐私政策', legal:'法律声明', credits:'鸣谢',
      works:'作品', coming:'筹备中',
      lead1:'我们喜欢想象，也喜欢去做出来。', lead2:'若有任何在意之处，欢迎随时来信。',
      th_name:'名称', th_founder:'代表', th_founded:'成立', th_address:'地址', th_contact:'联系方式'},
    es: {name:'Español', nav_contact:'Contacto', contact:'Contacto', location:'Ubicación',
      recruit:'Empleo', privacy:'Política de privacidad', legal:'Avisos legales', credits:'Créditos',
      works:'obras', coming:'próximamente',
      lead1:'Nos gusta imaginar cosas y hacerlas.', lead2:'Si algo te interesa, escríbenos sin dudarlo.',
      th_name:'Nombre', th_founder:'Fundador', th_founded:'Fundación', th_address:'Dirección', th_contact:'Contacto'},
    fr: {name:'Français', nav_contact:'Contact', contact:'Contact', location:'Lieu',
      recruit:'Recrutement', privacy:'Confidentialité', legal:'Mentions légales', credits:'Crédits',
      works:'travaux', coming:'bientôt',
      lead1:'Nous aimons imaginer des choses, et les fabriquer.', lead2:'Si quelque chose vous intéresse, écrivez-nous librement.',
      th_name:'Nom', th_founder:'Fondateur', th_founded:'Fondation', th_address:'Adresse', th_contact:'Contact'},
    de: {name:'Deutsch', nav_contact:'Kontakt', contact:'Kontakt', location:'Standort',
      recruit:'Karriere', privacy:'Datenschutz', legal:'Impressum', credits:'Credits',
      works:'Arbeiten', coming:'in Vorbereitung',
      lead1:'Wir stellen uns gern Dinge vor und machen sie.', lead2:'Wenn Sie etwas interessiert, schreiben Sie uns gern.',
      th_name:'Name', th_founder:'Gründer', th_founded:'Gegründet', th_address:'Adresse', th_contact:'Kontakt'},
    ru: {name:'Русский', nav_contact:'Контакты', contact:'Контакты', location:'Адрес',
      recruit:'Вакансии', privacy:'Конфиденциальность', legal:'Правовая информация', credits:'Авторы',
      works:'работы', coming:'скоро',
      lead1:'Нам нравится воображать и создавать.', lead2:'Если что-то заинтересует — пишите нам.',
      th_name:'Название', th_founder:'Основатель', th_founded:'Основано', th_address:'Адрес', th_contact:'Контакт'},
    ar: {name:'العربية', rtl:true, nav_contact:'تواصل', contact:'تواصل', location:'الموقع',
      recruit:'التوظيف', privacy:'الخصوصية', legal:'إشعارات قانونية', credits:'شكر وتقدير',
      works:'أعمال', coming:'قريبًا',
      lead1:'نحب أن نتخيّل الأشياء، وأن نصنعها.', lead2:'إن لفت انتباهك شيء، راسلنا بحرّية.',
      th_name:'الاسم', th_founder:'المؤسس', th_founded:'التأسيس', th_address:'العنوان', th_contact:'التواصل'},
    ko: {name:'한국어', nav_contact:'문의', contact:'문의', location:'소재지',
      recruit:'채용', privacy:'개인정보처리방침', legal:'법적 고지', credits:'크레딧',
      works:'작업', coming:'준비 중',
      lead1:'우리는 무언가를 상상하고, 만드는 것을 좋아합니다.', lead2:'관심 가는 것이 있으면 편하게 메일 주세요.',
      th_name:'상호', th_founder:'대표', th_founded:'설립', th_address:'주소', th_contact:'연락처'},
    eo: {name:'Esperanto', nav_contact:'Kontakto', contact:'Kontakto', location:'Loko',
      recruit:'Varbado', privacy:'Privateca politiko', legal:'Juraj avizoj', credits:'Atribuoj',
      works:'verkoj', coming:'baldaŭ',
      lead1:'Ni ŝatas imagi aferojn, kaj fari ilin.', lead2:'Se io interesas vin, skribu al ni libere.',
      th_name:'Nomo', th_founder:'Fondinto', th_founded:'Fondita', th_address:'Adreso', th_contact:'Kontakto'},
    pt: {name:'Português', nav_contact:'Contato', contact:'Contato', location:'Localização',
      recruit:'Carreiras', privacy:'Privacidade', legal:'Avisos legais', credits:'Créditos',
      works:'trabalhos', coming:'em breve',
      lead1:'Gostamos de imaginar coisas e de fazê-las.', lead2:'Se algo lhe interessar, escreva-nos à vontade.',
      th_name:'Nome', th_founder:'Fundador', th_founded:'Fundação', th_address:'Endereço', th_contact:'Contato'},
    it: {name:'Italiano', nav_contact:'Contatti', contact:'Contatti', location:'Sede',
      recruit:'Lavora con noi', privacy:'Privacy', legal:'Note legali', credits:'Crediti',
      works:'lavori', coming:'in arrivo',
      lead1:'Ci piace immaginare le cose e realizzarle.', lead2:'Se qualcosa ti interessa, scrivici liberamente.',
      th_name:'Nome', th_founder:'Fondatore', th_founded:'Fondazione', th_address:'Indirizzo', th_contact:'Contatti'},
    id: {name:'Bahasa Indonesia', nav_contact:'Kontak', contact:'Kontak', location:'Lokasi',
      recruit:'Karier', privacy:'Privasi', legal:'Pemberitahuan hukum', credits:'Kredit',
      works:'karya', coming:'segera hadir',
      lead1:'Kami suka membayangkan sesuatu, dan membuatnya.', lead2:'Jika ada yang menarik bagimu, kirim surel dengan bebas.',
      th_name:'Nama', th_founder:'Pendiri', th_founded:'Didirikan', th_address:'Alamat', th_contact:'Kontak'},
    tr: {name:'Türkçe', nav_contact:'İletişim', contact:'İletişim', location:'Konum',
      recruit:'Kariyer', privacy:'Gizlilik', legal:'Yasal uyarılar', credits:'Künye',
      works:'çalışmalar', coming:'yakında',
      lead1:'Bir şeyler hayal etmeyi ve onları yapmayı seviyoruz.', lead2:'İlginizi çeken bir şey olursa, çekinmeden yazın.',
      th_name:'Ad', th_founder:'Kurucu', th_founded:'Kuruluş', th_address:'Adres', th_contact:'İletişim'},
    nl: {name:'Nederlands', nav_contact:'Contact', contact:'Contact', location:'Locatie',
      recruit:'Vacatures', privacy:'Privacy', legal:'Juridische kennisgeving', credits:'Credits',
      works:'werk', coming:'binnenkort',
      lead1:'We verbeelden graag dingen en maken ze.', lead2:'Als iets je interesseert, mail ons gerust.',
      th_name:'Naam', th_founder:'Oprichter', th_founded:'Opgericht', th_address:'Adres', th_contact:'Contact'},
    pl: {name:'Polski', nav_contact:'Kontakt', contact:'Kontakt', location:'Lokalizacja',
      recruit:'Kariera', privacy:'Prywatność', legal:'Nota prawna', credits:'Twórcy',
      works:'prace', coming:'wkrótce',
      lead1:'Lubimy wyobrażać sobie rzeczy i je tworzyć.', lead2:'Jeśli coś Cię zainteresuje, napisz do nas śmiało.',
      th_name:'Nazwa', th_founder:'Założyciel', th_founded:'Założono', th_address:'Adres', th_contact:'Kontakt'},
    uk: {name:'Українська', nav_contact:'Контакти', contact:'Контакти', location:'Розташування',
      recruit:'Вакансії', privacy:'Конфіденційність', legal:'Правова інформація', credits:'Подяки',
      works:'роботи', coming:'незабаром',
      lead1:'Нам подобається уявляти речі та створювати їх.', lead2:'Якщо щось зацікавить — пишіть нам.',
      th_name:'Назва', th_founder:'Засновник', th_founded:'Засновано', th_address:'Адреса', th_contact:'Контакт'},
    vi: {name:'Tiếng Việt', nav_contact:'Liên hệ', contact:'Liên hệ', location:'Vị trí',
      recruit:'Tuyển dụng', privacy:'Quyền riêng tư', legal:'Thông báo pháp lý', credits:'Ghi nhận',
      works:'tác phẩm', coming:'sắp ra mắt',
      lead1:'Chúng tôi thích tưởng tượng ra mọi thứ, và làm ra chúng.', lead2:'Nếu bạn quan tâm điều gì, cứ thoải mái gửi email cho chúng tôi.',
      th_name:'Tên', th_founder:'Người sáng lập', th_founded:'Thành lập', th_address:'Địa chỉ', th_contact:'Liên hệ'},
    hi: {name:'हिन्दी', nav_contact:'संपर्क', contact:'संपर्क', location:'स्थान',
      recruit:'भर्ती', privacy:'गोपनीयता', legal:'कानूनी सूचना', credits:'श्रेय',
      works:'कार्य', coming:'जल्द आ रहा है',
      lead1:'हमें चीज़ों की कल्पना करना और उन्हें बनाना पसंद है।', lead2:'अगर कुछ आपको दिलचस्प लगे, तो बेझिझक हमें ईमेल करें।',
      th_name:'नाम', th_founder:'संस्थापक', th_founded:'स्थापना', th_address:'पता', th_contact:'संपर्क'},
    fa: {name:'فارسی', rtl:true, nav_contact:'تماس', contact:'تماس', location:'موقعیت',
      recruit:'استخدام', privacy:'حریم خصوصی', legal:'اطلاعیه حقوقی', credits:'دست‌اندرکاران',
      works:'کارها', coming:'به‌زودی',
      lead1:'ما دوست داریم چیزها را تصوّر کنیم و آن‌ها را بسازیم.', lead2:'اگر چیزی توجه شما را جلب کرد، با خیال راحت به ما ایمیل بزنید.',
      th_name:'نام', th_founder:'بنیان‌گذار', th_founded:'تأسیس', th_address:'نشانی', th_contact:'تماس'},
    th: {name:'ไทย', nav_contact:'ติดต่อ', contact:'ติดต่อ', location:'ที่ตั้ง',
      recruit:'ร่วมงาน', privacy:'ความเป็นส่วนตัว', legal:'ประกาศทางกฎหมาย', credits:'เครดิต',
      works:'ผลงาน', coming:'เร็ว ๆ นี้',
      lead1:'เราชอบจินตนาการสิ่งต่าง ๆ และลงมือทำมันขึ้นมา', lead2:'หากมีสิ่งใดที่คุณสนใจ เขียนอีเมลมาหาเราได้เลย',
      th_name:'ชื่อ', th_founder:'ผู้ก่อตั้ง', th_founded:'ก่อตั้ง', th_address:'ที่อยู่', th_contact:'ติดต่อ'},
    la: {name:'Latina', nav_contact:'Contactus', contact:'Contactus', location:'Locus',
      recruit:'Conductio', privacy:'Privata', legal:'Notae legales', credits:'Auctores',
      works:'opera', coming:'mox',
      lead1:'Res imaginari et eas facere amamus.', lead2:'Si quid te movet, scribe nobis libere.',
      th_name:'Nomen', th_founder:'Conditor', th_founded:'Condita', th_address:'Inscriptio', th_contact:'Contactus'}
  };

  // ヒエログリフ：ラテン文字→uniliteral signs（音訳）
  var EGY = {a:'𓄿',b:'𓃀',c:'𓎡',d:'𓂧',e:'𓇋',f:'𓆑',g:'𓎼',h:'𓉔',i:'𓇋',j:'𓆓',k:'𓎡',l:'𓂋',m:'𓅓',n:'𓈖',o:'𓍯',p:'𓊪',q:'𓎤',r:'𓂋',s:'𓋴',t:'𓏏',u:'𓅱',v:'𓆑',w:'𓅱',x:'𓎡𓋴',y:'𓇌',z:'𓊃',' ':' '};
  function toEgy(s){ var o=''; s=s.toLowerCase(); for(var i=0;i<s.length;i++){var ch=s[i]; o+=(EGY[ch]!==undefined?EGY[ch]:(/[a-z ]/.test(ch)?'':ch));} return o||s; }
  function dictFor(code){
    if(code==='egy'){ var base=DICT.en, d={name:'𓂀 hieroglyphs'}; for(var k in base){ if(k==='name') continue; d[k]=toEgy(base[k]); } d.rtl=false; return d; }
    return DICT[code];
  }
  function nameOf(code){ return SPECIAL_NAME[code] || (code==='egy'?'𓂀 hieroglyphs':(DICT[code]&&DICT[code].name)||code); }

  // 言語ごとにフォントもランダム（その文字体系の候補から・使った時だけ読み込む）
  var baseFont='', loadedF={};
  var SCRIPT_FONTS={
    zh:[{css:'"Noto Sans SC",sans-serif',g:'Noto+Sans+SC'},{css:'"Noto Serif SC",serif',g:'Noto+Serif+SC'},{css:'"ZCOOL XiaoWei",serif',g:'ZCOOL+XiaoWei'},{css:'"Ma Shan Zheng",cursive',g:'Ma+Shan+Zheng'},{css:'"ZCOOL QingKe HuangYou",sans-serif',g:'ZCOOL+QingKe+HuangYou'}],
    ko:[{css:'"Noto Sans KR",sans-serif',g:'Noto+Sans+KR'},{css:'"Noto Serif KR",serif',g:'Noto+Serif+KR'},{css:'"Nanum Gothic",sans-serif',g:'Nanum+Gothic'},{css:'"Nanum Myeongjo",serif',g:'Nanum+Myeongjo'},{css:'"Jua",sans-serif',g:'Jua'},{css:'"Do Hyeon",sans-serif',g:'Do+Hyeon'}],
    ar:[{css:'"Noto Sans Arabic",sans-serif',g:'Noto+Sans+Arabic'},{css:'"Noto Naskh Arabic",serif',g:'Noto+Naskh+Arabic'},{css:'"Amiri",serif',g:'Amiri'},{css:'"Cairo",sans-serif',g:'Cairo'},{css:'"Tajawal",sans-serif',g:'Tajawal'},{css:'"Reem Kufi",sans-serif',g:'Reem+Kufi'}],
    ru:[{css:'"Noto Sans",sans-serif',g:'Noto+Sans'},{css:'"PT Serif",serif',g:'PT+Serif'},{css:'"Jura",sans-serif',g:'Jura'},{css:'"Russo One",sans-serif',g:'Russo+One'},{css:'"Yeseva One",serif',g:'Yeseva+One'},{css:'"Pattaya",sans-serif',g:'Pattaya'}],
    hi:[{css:'"Noto Sans Devanagari",sans-serif',g:'Noto+Sans+Devanagari'},{css:'"Noto Serif Devanagari",serif',g:'Noto+Serif+Devanagari'},{css:'"Hind",sans-serif',g:'Hind'},{css:'"Mukta",sans-serif',g:'Mukta'},{css:'"Tiro Devanagari Hindi",serif',g:'Tiro+Devanagari+Hindi'},{css:'"Baloo 2",sans-serif',g:'Baloo+2'}],
    th:[{css:'"Noto Sans Thai",sans-serif',g:'Noto+Sans+Thai'},{css:'"Noto Serif Thai",serif',g:'Noto+Serif+Thai'},{css:'"Sarabun",sans-serif',g:'Sarabun'},{css:'"Kanit",sans-serif',g:'Kanit'},{css:'"Mitr",sans-serif',g:'Mitr'},{css:'"Chonburi",cursive',g:'Chonburi'}]
  };
  SCRIPT_FONTS.fa=SCRIPT_FONTS.ar; SCRIPT_FONTS.uk=SCRIPT_FONTS.ru; // 同じ文字体系を共用
  function loadFont(g){ if(loadedF[g])return; loadedF[g]=1; var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family='+g+'&display=swap'; document.head.appendChild(l); }
  function pickFont(code){
    var pool=SCRIPT_FONTS[code];
    if(!pool){ if(baseFont) document.documentElement.style.setProperty('--font', baseFont); return; }
    var f=pool[Math.floor(Math.random()*pool.length)];
    loadFont(f.g); document.documentElement.style.setProperty('--font', f.css);
  }
  // 概念語を式/コードに置換（mode無しなら元に戻す）
  function setConcept(mode){
    var els=document.querySelectorAll('.hero-domain, .hero-row a, .word-title');
    Array.prototype.forEach.call(els,function(el){
      var orig=el.getAttribute('data-orig'); if(orig===null){ orig=el.textContent.trim(); el.setAttribute('data-orig',orig); }
      var c=CONCEPT[orig.toLowerCase()];
      el.textContent=(mode&&c)?c[mode]:orig;
    });
  }
  var ORDER=['en','ja','zh','es','fr','de','ru','ar','ko','eo','pt','it','id','tr','nl','pl','uk','vi','hi','fa','th','la','math','lisp','py','egy'];
  var SHORT={en:'EN',ja:'JP',zh:'ZH',es:'ES',fr:'FR',de:'DE',ru:'RU',ar:'AR',ko:'KR',eo:'EO',pt:'PT',it:'IT',id:'ID',tr:'TR',nl:'NL',pl:'PL',uk:'UA',vi:'VI',hi:'HI',fa:'FA',th:'TH',la:'LA',math:'∑',lisp:'( )',py:'PY',egy:'𓂀'};
  var SPECIAL_NAME={math:'∑ formula', lisp:'Lisp', py:'Python'};
  // 各概念語の“パトス”を式・コードで（特殊モード）
  var CONCEPT={
    landscape:{math:'z = f(x, y)', lisp:'(surface x y)', py:'z = height(x, y)'},
    modeling:{math:'f : ∅ → ℝ³', lisp:'(make form)', py:'form = build(void)'},
    simulation:{math:'dx/dt = f(x, t)', lisp:'(loop (step world))', py:'while True: step(world)'},
    perspective:{math:"x' = f·X / Z", lisp:'(project world eye)', py:'img = project(world, eye)'}
  };

  function setText(el,t){ if(el && t!=null) el.textContent=t; }
  function apply(code){
    var special=(code==='math'||code==='lisp'||code==='py');
    var d=special?DICT.en:(dictFor(code)||DICT.en);
    var doc=document;
    setConcept(special?code:null);
    setText(doc.querySelector('.nav a[href="#contact"], .nav a[href$="#contact"]'), d.nav_contact);
    // eyebrow（文脈で判別）
    doc.querySelectorAll('.panel.contact .section-eyebrow').forEach(function(e){setText(e,d.contact);});
    doc.querySelectorAll('.panel-alt .section-eyebrow').forEach(function(e){setText(e,d.location);});
    doc.querySelectorAll('.word-examples .section-eyebrow').forEach(function(e){setText(e,d.works);});
    doc.querySelectorAll('.word-ex-note').forEach(function(e){setText(e,d.coming);});
    // footer links（各グループ内の順番で）
    doc.querySelectorAll('.footer-links').forEach(function(nav){
      var a=nav.querySelectorAll('a'); var ks=['recruit','privacy','legal','credits'];
      for(var i=0;i<a.length&&i<4;i++) setText(a[i],d[ks[i]]);
    });
    // 会社表の見出し
    doc.querySelectorAll('.company-table').forEach(function(tb){
      var th=tb.querySelectorAll('th'); var ks=['th_name','th_founder','th_founded','th_address','th_contact'];
      for(var i=0;i<th.length&&i<5;i++) setText(th[i],d[ks[i]]);
    });
    // リード文（2行）
    doc.querySelectorAll('.contact-lead').forEach(function(p){ p.innerHTML=d.lead1+'<br />'+d.lead2; });
    // 読み（モデリング等）は日本語以外では隠す
    doc.querySelectorAll('.word-reading').forEach(function(e){ e.style.display=(code==='ja'?'':'none'); });
    // 方向・言語・フォント
    doc.documentElement.setAttribute('dir', d.rtl?'rtl':'ltr');
    doc.body.classList.toggle('lang-egy', code==='egy');
    pickFont(code);
    if(code==='egy') ensureEgyFont();
    try{ localStorage.setItem('lang', code); }catch(e){}
    var lbl=document.getElementById('langCur'); if(lbl) lbl.textContent=(SHORT[code]||code.toUpperCase());
  }
  var egyLoaded=false;
  function ensureEgyFont(){ if(egyLoaded) return; egyLoaded=true; var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Egyptian+Hieroglyphs&display=swap'; document.head.appendChild(l); }

  function detect(){
    try{ var s=localStorage.getItem('lang'); if(s&&(DICT[s]||s==='egy'||SPECIAL_NAME[s])) return s; }catch(e){}
    var n=(navigator.language||'en').toLowerCase();
    for(var i=0;i<ORDER.length;i++){ var c=ORDER[i]; if(c!=='egy'&&(n===c||n.indexOf(c+'-')===0||n.split('-')[0]===c)) return c; }
    if(n.indexOf('zh')===0) return 'zh';
    return (document.documentElement.lang==='ja')?'ja':'en';
  }

  // 言語パネル
  function buildPanel(cur){
    var btn=document.createElement('button'); btn.className='lang-link'; btn.type='button';
    btn.innerHTML='<span id="langCur"></span>';
    var ov=document.createElement('div'); ov.className='lang-overlay'; ov.style.display='none';
    var box=document.createElement('div'); box.className='lang-list';
    ORDER.forEach(function(code){
      var it=document.createElement('button'); it.type='button'; it.className='lang-item';
      it.textContent=nameOf(code); it.setAttribute('data-code',code);
      if(code==='egy') it.style.fontFamily='"Noto Sans Egyptian Hieroglyphs", serif';
      it.addEventListener('click',function(){ apply(this.getAttribute('data-code')); ov.style.display='none'; });
      box.appendChild(it);
    });
    ov.appendChild(box);
    ov.addEventListener('click',function(e){ if(e.target===ov) ov.style.display='none'; });
    btn.addEventListener('click',function(){ ensureEgyFont();
      ov.style.display = (ov.style.display==='none')?'flex':'none'; });
    var nav=document.querySelector('.nav'); if(nav) nav.appendChild(btn);
    document.body.appendChild(ov);
  }

  function init(){ baseFont=document.documentElement.style.getPropertyValue('--font')||''; var cur=detect(); buildPanel(cur); apply(cur); }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();

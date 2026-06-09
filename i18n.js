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
      th_name:'Nomo', th_founder:'Fondinto', th_founded:'Fondita', th_address:'Adreso', th_contact:'Kontakto'}
  };

  // ヒエログリフ：ラテン文字→uniliteral signs（音訳）
  var EGY = {a:'𓄿',b:'𓃀',c:'𓎡',d:'𓂧',e:'𓇋',f:'𓆑',g:'𓎼',h:'𓉔',i:'𓇋',j:'𓆓',k:'𓎡',l:'𓂋',m:'𓅓',n:'𓈖',o:'𓍯',p:'𓊪',q:'𓎤',r:'𓂋',s:'𓋴',t:'𓏏',u:'𓅱',v:'𓆑',w:'𓅱',x:'𓎡𓋴',y:'𓇌',z:'𓊃',' ':' '};
  function toEgy(s){ var o=''; s=s.toLowerCase(); for(var i=0;i<s.length;i++){var ch=s[i]; o+=(EGY[ch]!==undefined?EGY[ch]:(/[a-z ]/.test(ch)?'':ch));} return o||s; }
  function dictFor(code){
    if(code==='egy'){ var base=DICT.en, d={name:'𓂀 hieroglyphs'}; for(var k in base){ if(k==='name') continue; d[k]=toEgy(base[k]); } d.rtl=false; return d; }
    return DICT[code];
  }
  var ORDER=['en','ja','zh','es','fr','de','ru','ar','ko','eo','egy'];

  function setText(el,t){ if(el && t!=null) el.textContent=t; }
  function apply(code){
    var d=dictFor(code)||DICT.en;
    var doc=document;
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
    if(code==='egy') ensureEgyFont();
    try{ localStorage.setItem('lang', code); }catch(e){}
    var lbl=document.getElementById('langCur'); if(lbl) lbl.textContent=(dictFor(code).name||code);
  }
  var egyLoaded=false;
  function ensureEgyFont(){ if(egyLoaded) return; egyLoaded=true; var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Egyptian+Hieroglyphs&display=swap'; document.head.appendChild(l); }

  function detect(){
    try{ var s=localStorage.getItem('lang'); if(s&&(DICT[s]||s==='egy')) return s; }catch(e){}
    var n=(navigator.language||'en').toLowerCase();
    for(var i=0;i<ORDER.length;i++){ var c=ORDER[i]; if(c!=='egy'&&(n===c||n.indexOf(c+'-')===0||n.split('-')[0]===c)) return c; }
    if(n.indexOf('zh')===0) return 'zh';
    return (document.documentElement.lang==='ja')?'ja':'en';
  }

  // 言語パネル
  function buildPanel(cur){
    var btn=document.createElement('button'); btn.className='lang-btn'; btn.type='button';
    btn.innerHTML='<span id="langCur"></span> ▾';
    var ov=document.createElement('div'); ov.className='lang-overlay'; ov.style.display='none';
    var box=document.createElement('div'); box.className='lang-list';
    var search=document.createElement('input'); search.className='lang-search'; search.type='text';
    search.setAttribute('placeholder','search / 検索 …'); search.setAttribute('aria-label','search language');
    search.addEventListener('input',function(){ var q=this.value.toLowerCase();
      box.querySelectorAll('.lang-item').forEach(function(it){
        it.style.display=((it.textContent+' '+(it.getAttribute('data-code')||'')).toLowerCase().indexOf(q)>=0)?'':'none'; }); });
    box.appendChild(search);
    ORDER.forEach(function(code){
      var it=document.createElement('button'); it.type='button'; it.className='lang-item';
      it.textContent=dictFor(code).name; it.setAttribute('data-code',code);
      if(code==='egy') it.style.fontFamily='"Noto Sans Egyptian Hieroglyphs", serif';
      it.addEventListener('click',function(){ apply(this.getAttribute('data-code')); ov.style.display='none'; });
      box.appendChild(it);
    });
    ov.appendChild(box);
    ov.addEventListener('click',function(e){ if(e.target===ov) ov.style.display='none'; });
    btn.addEventListener('click',function(){ ensureEgyFont();
      var open = ov.style.display==='none'; ov.style.display = open?'flex':'none';
      if(open){ search.value=''; box.querySelectorAll('.lang-item').forEach(function(it){it.style.display='';}); try{search.focus();}catch(e){} } });
    var nav=document.querySelector('.nav'); if(nav) nav.appendChild(btn);
    document.body.appendChild(ov);
  }

  function init(){ var cur=detect(); buildPanel(cur); apply(cur); }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();

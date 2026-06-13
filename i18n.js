// Multilingual: self-contained dictionary (zero external deps) + language panel.
// Every page is driven by data-i18n / data-i18n-html attributes; this file holds all strings.
// Translated: UI labels, lead copy, company-table headings, word descriptions, and the
// privacy / legal / credits pages — in full. (bomb, concept words, coordinates and email are shared.)
// Hieroglyphs (egy) transliterate the English into uniliteral signs (a phonetic transcription, not a translation).
(function () {
  var DICT = {
    en: {name:'English', nav_contact:'Contact', contact:'Contact', location:'Location',
      recruit:'Recruit', privacy:'Privacy Policy', legal:'Legal notices', credits:'Credits',
      works:'works', coming:'coming soon',
      lead1:'We like to imagine things, and to make them.', lead2:'If anything catches your interest, feel free to email us.',
      th_name:'Name', th_founder:'Founder', th_founded:'Founded', th_address:'Address', th_contact:'Contact',
      w_examples:'Examples', w_back:'← back',
      d_modeling:'Building 3D form — constructing the shape of objects and spaces from scratch with polygons or NURBS.',
      d_sculpting:'Shaping a 3D model as if it were clay — ideal for organic, detailed forms (e.g. ZBrush).',
      d_texturing:'Giving surfaces color and material — wood, metal, skin — so they feel real.',
      d_lighting:'Placing light in a 3D scene to shape shadow, atmosphere, time of day and emotion.',
      d_animation:'Authoring intended motion by hand with keyframes — movement with purpose.',
      d_rendering:'Computing a 3D scene into the final still image or film.',
      d_coding:'Writing code — the umbrella term for automation and tool-making.',
      d_scripting:'Small code that runs inside existing software to automate and procedurally generate.',
      d_programming:'Designing and building standalone software, systems and production pipelines.',
      d_generation:'Creating form and pattern from rules and algorithms — procedural and generative.',
      d_calculation:'Numerical computation — the foundation beneath geometry, physics and optimization.',
      d_simulation:'Computing motion and phenomena by physics or rules — fluids, cloth, destruction, crowds.',
      d_speculation:'Envisioning futures and worlds that do not yet exist — speculative design. The core of bomb.',
      d_visualization:'Translating data and ideas into images one can grasp at a glance.',
      d_perspective:'A point of view — how the world is seen. The axis every process returns to.',
      pp_h1:'Privacy Policy', pp_lead:'bomb LLC ("we", "us") sets out below how we handle the personal information and usage data of users on the website we operate ("the Site").',
      pp_s1:'1. Information We Collect', pp_b1:'To understand how the Site is used, we may collect information such as cookies, pages viewed, referral source, device/browser type, and approximate region via analytics tools. This data does not, in principle, identify individuals.',
      pp_s2:'2. Purpose of Use', pp_b2:'We use the collected information to improve the Site, analyze usage, and respond to inquiries.',
      pp_s3:'3. Analytics', pp_b3:'The Site uses Google Analytics, a web analytics service provided by Google, which uses cookies to collect traffic data. This data is collected anonymously and does not identify individuals. You may refuse data collection through your browser settings or Google’s opt-out add-on. See <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google’s policy</a> for details.',
      pp_s4:'4. Disclosure to Third Parties', pp_b4:'Except as required by law, we do not provide collected information to third parties without consent.',
      pp_s5:'5. Cookies', pp_b5:'You can disable cookies in your browser settings. Note that some features of the Site may not function properly in that case.',
      pp_s6:'6. Disclaimer', pp_b6:'While we strive for accuracy, we do not guarantee the completeness or accuracy of the Site’s content. We are not liable for any damages arising from use of the Site.',
      pp_s7:'7. Contact', pp_b7:'For inquiries regarding this policy, please contact <a href="mailto:info@bomb.co.jp">info@bomb.co.jp</a>.',
      pp_s8:'8. Revisions', pp_b8:'We may revise this policy as needed. Revisions take effect when posted on the Site.',
      eff:'Effective: 2026-06-29<br />bomb LLC',
      lg_h1:'Legal Notices', lg_lead:'Please note the following when using this website operated by bomb LLC.',
      lg_s1:'1. Accuracy of Information', lg_b1:'We strive to provide accurate information on this site, but we do not guarantee its accuracy, completeness, or usefulness.',
      lg_s2:'2. Limitation of Liability', lg_b2:'We assume no responsibility for any damages arising from the use of, or inability to use, this site. The content of this site may be changed, suspended, or terminated without notice.',
      lg_s3:'3. External Links', lg_b3:'We are not responsible for websites other than our own, or for information obtained from them, even where links to or from this site are provided.',
      lg_s4:'4. Copyright', lg_b4:'Copyright of the text, images, and logos on this site belongs to bomb LLC or the rightful owners. Unauthorized reproduction, redistribution, or modification is prohibited.',
      lg_s5:'5. Contact', lg_b5:'For inquiries regarding these notices, please contact <a href="mailto:info@bomb.co.jp">info@bomb.co.jp</a>.',
      cr_h1:'Credits', cr_lead:'Notes on the production and technology behind this site.',
      cr_s1:'Produced by', cr_made:'bomb LLC', cr_s2:'Built with',
      cr_li1:'HTML / CSS / JavaScript', cr_li2:'Fonts: Google Fonts (randomized each visit)', cr_li3:'Hosting: GitHub Pages', cr_li4:'Analytics: Google Analytics', cr_li5:'Map: Google Maps'},
    ja: {name:'日本語', nav_contact:'Contact', contact:'Contact', location:'Location',
      recruit:'Recruit', privacy:'Privacy Policy', legal:'Legal notices', credits:'Credits',
      works:'作例', coming:'準備中',
      lead1:'何かを想像したり、それを作ったりすることが好きです。', lead2:'気になることがあれば、自由にメールしてください。',
      th_name:'商号', th_founder:'代表社員', th_founded:'設立', th_address:'所在地', th_contact:'連絡先',
      w_examples:'実例', w_back:'← 戻る',
      d_modeling:'3DCGで「形」を作る工程。ポリゴンやNURBSで、物体や空間のかたちを一から構築する。',
      d_sculpting:'粘土をこねるように3Dモデルを彫り込む手法。有機的で繊細な造形に向く（ZBrush 等）。',
      d_texturing:'モデルの表面に色や質感（木・金属・肌など）を与え、素材としての説得力を作る工程。',
      d_lighting:'3D空間に光を配置し、陰影・空気・時間帯・感情をつくる工程。画の印象を決める。',
      d_animation:'キーフレームで「こう動かしたい」を手付けする工程。意図のある動きを作る。',
      d_rendering:'3Dシーンを計算し、最終的な一枚の画像・映像へと焼き上げる工程。',
      d_coding:'コードを書く行為全般。自動化やツール作りを含む総称。',
      d_scripting:'既存ソフトの中で動く小さなコード。作業の自動化や手続き的な生成を担う。',
      d_programming:'独立したソフトやシステム、制作パイプラインそのものを設計・構築する。',
      d_generation:'ルールやアルゴリズムから形・パターンを生成する（プロシージャル／ジェネレーティブ）。',
      d_calculation:'数値計算。形状・物理・最適化など、あらゆる工程の土台になる演算。',
      d_simulation:'物理やルールで動き・現象を計算する。流体・布・破壊・群衆などの“起こるはず”を出す。',
      d_speculation:'まだ無い未来や世界を構想し、ありえる姿を思索する（speculative design）。bombの核。',
      d_visualization:'データや構想を、人が直感で掴める画像・映像へと翻訳する。',
      d_perspective:'視点。世界の見え方そのもの。すべての工程が最後に立ち返る軸。',
      pp_h1:'プライバシーポリシー', pp_lead:'合同会社bomb（以下「当社」）は、当社が運営するウェブサイト（以下「本サイト」）における利用者の個人情報および利用情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。',
      pp_s1:'1. 取得する情報', pp_b1:'当社は、本サイトの利用状況を把握するため、アクセス解析ツールを通じて、Cookie・閲覧ページ・参照元・端末/ブラウザの種類・おおよその地域などの情報を取得する場合があります。これらの情報には、原則として個人を特定する情報は含まれません。',
      pp_s2:'2. 利用目的', pp_b2:'取得した情報は、本サイトの改善、利用状況の分析、お問い合わせへの対応のために利用します。',
      pp_s3:'3. アクセス解析ツールについて', pp_b3:'本サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスはトラフィックデータの収集のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。データ収集を無効にしたい場合は、ブラウザの設定やGoogle提供のオプトアウトアドオンにより拒否できます。詳細は<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Googleのポリシー</a>をご確認ください。',
      pp_s4:'4. 第三者への提供', pp_b4:'当社は、法令に基づく場合を除き、取得した情報を本人の同意なく第三者に提供しません。',
      pp_s5:'5. Cookieについて', pp_b5:'利用者はブラウザの設定によりCookieを無効化できます。ただし、その場合、本サイトの一部機能が正常に動作しないことがあります。',
      pp_s6:'6. 免責事項', pp_b6:'本サイトの内容には正確を期しておりますが、その完全性・正確性を保証するものではありません。本サイトの利用により生じたいかなる損害についても、当社は責任を負いかねます。',
      pp_s7:'7. お問い合わせ窓口', pp_b7:'本ポリシーに関するお問い合わせは、<a href="mailto:info@bomb.co.jp">info@bomb.co.jp</a>までご連絡ください。',
      pp_s8:'8. 改定', pp_b8:'当社は、必要に応じて本ポリシーを改定することがあります。改定後の内容は本サイトに掲載した時点から効力を生じます。',
      eff:'制定日：2026年6月29日<br />合同会社bomb',
      lg_h1:'免責事項', lg_lead:'本サイト（合同会社bombが運営するウェブサイト）のご利用にあたっては、以下の事項にご留意ください。',
      lg_s1:'1. 情報の正確性', lg_b1:'当社は本サイトに掲載する情報について、可能な限り正確な情報を掲載するよう努めていますが、その正確性・完全性・有用性を保証するものではありません。',
      lg_s2:'2. 損害等の責任', lg_b2:'本サイトの利用、または利用できなかったことにより生じたいかなる損害についても、当社は一切の責任を負いません。本サイトの内容は予告なく変更・中断・終了する場合があります。',
      lg_s3:'3. 外部リンク', lg_b3:'本サイトから他のウェブサイトへのリンク、または他のウェブサイトから本サイトへのリンクが提供されている場合でも、当社は当社以外のウェブサイトおよびそこから得られる情報について責任を負いません。',
      lg_s4:'4. 著作権', lg_b4:'本サイトに掲載されている文章・画像・ロゴ等の著作権は、当社または正当な権利者に帰属します。無断での複製・転載・改変等を禁じます。',
      lg_s5:'5. お問い合わせ', lg_b5:'本免責事項に関するお問い合わせは、<a href="mailto:info@bomb.co.jp">info@bomb.co.jp</a>までご連絡ください。',
      cr_h1:'クレジット', cr_lead:'本サイトの制作・使用技術に関する表記です。',
      cr_s1:'制作', cr_made:'合同会社bomb', cr_s2:'使用技術',
      cr_li1:'HTML / CSS / JavaScript', cr_li2:'フォント：Google Fonts（訪問ごとにランダム）', cr_li3:'ホスティング：GitHub Pages', cr_li4:'アクセス解析：Google Analytics', cr_li5:'地図：Google Maps'},
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
      lead1:'हमें चीज़ों की कल्पना करना और उन्हें बनाना पसंद है।', lead2:'अगर कुछ आपको दिलचस्प लगे, तो बेझिझक हमें ईमेल करें।',
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

  // Hieroglyphs: Latin letters -> uniliteral signs (transliteration)
  var EGY = {a:'𓄿',b:'𓃀',c:'𓎡',d:'𓂧',e:'𓇋',f:'𓆑',g:'𓎼',h:'𓉔',i:'𓇋',j:'𓆓',k:'𓎡',l:'𓂋',m:'𓅓',n:'𓈖',o:'𓍯',p:'𓊪',q:'𓎤',r:'𓂋',s:'𓋴',t:'𓏏',u:'𓅱',v:'𓆑',w:'𓅱',x:'𓎡𓋴',y:'𓇌',z:'𓊃',' ':' '};
  function toEgy(s){ var o=''; s=String(s).toLowerCase(); for(var i=0;i<s.length;i++){var ch=s[i]; o+=(EGY[ch]!==undefined?EGY[ch]:(/[a-z ]/.test(ch)?'':ch));} return o||String(s); }
  function dictFor(code){
    if(code==='egy'){ var base=DICT.en, d={name:'𓂀 hieroglyphs'}; for(var k in base){ if(k==='name'||k==='rtl') continue; var v=base[k];
        d[k]=(typeof v==='string' && v.indexOf('<')>=0)? v : toEgy(v); } d.rtl=false; return d; }
    return DICT[code];
  }
  function nameOf(code){ return SPECIAL_NAME[code] || (code==='egy'?'𓂀 hieroglyphs':(DICT[code]&&DICT[code].name)||code); }

  // Per-language random font (chosen from that script's pool; loaded only when used)
  var baseFont='', loadedF={};
  var SCRIPT_FONTS={
    zh:[{css:'"Noto Sans SC",sans-serif',g:'Noto+Sans+SC'},{css:'"Noto Serif SC",serif',g:'Noto+Serif+SC'},{css:'"ZCOOL XiaoWei",serif',g:'ZCOOL+XiaoWei'},{css:'"Ma Shan Zheng",cursive',g:'Ma+Shan+Zheng'},{css:'"ZCOOL QingKe HuangYou",sans-serif',g:'ZCOOL+QingKe+HuangYou'}],
    ko:[{css:'"Noto Sans KR",sans-serif',g:'Noto+Sans+KR'},{css:'"Noto Serif KR",serif',g:'Noto+Serif+KR'},{css:'"Nanum Gothic",sans-serif',g:'Nanum+Gothic'},{css:'"Nanum Myeongjo",serif',g:'Nanum+Myeongjo'},{css:'"Jua",sans-serif',g:'Jua'},{css:'"Do Hyeon",sans-serif',g:'Do+Hyeon'}],
    ar:[{css:'"Noto Sans Arabic",sans-serif',g:'Noto+Sans+Arabic'},{css:'"Noto Naskh Arabic",serif',g:'Noto+Naskh+Arabic'},{css:'"Amiri",serif',g:'Amiri'},{css:'"Cairo",sans-serif',g:'Cairo'},{css:'"Tajawal",sans-serif',g:'Tajawal'},{css:'"Reem Kufi",sans-serif',g:'Reem+Kufi'}],
    ru:[{css:'"Noto Sans",sans-serif',g:'Noto+Sans'},{css:'"PT Serif",serif',g:'PT+Serif'},{css:'"Jura",sans-serif',g:'Jura'},{css:'"Russo One",sans-serif',g:'Russo+One'},{css:'"Yeseva One",serif',g:'Yeseva+One'},{css:'"Pattaya",sans-serif',g:'Pattaya'}],
    hi:[{css:'"Noto Sans Devanagari",sans-serif',g:'Noto+Sans+Devanagari'},{css:'"Noto Serif Devanagari",serif',g:'Noto+Serif+Devanagari'},{css:'"Hind",sans-serif',g:'Hind'},{css:'"Mukta",sans-serif',g:'Mukta'},{css:'"Tiro Devanagari Hindi",serif',g:'Tiro+Devanagari+Hindi'},{css:'"Baloo 2",sans-serif',g:'Baloo+2'}],
    th:[{css:'"Noto Sans Thai",sans-serif',g:'Noto+Sans+Thai'},{css:'"Noto Serif Thai",serif',g:'Noto+Serif+Thai'},{css:'"Sarabun",sans-serif',g:'Sarabun'},{css:'"Kanit",sans-serif',g:'Kanit'},{css:'"Mitr",sans-serif',g:'Mitr'},{css:'"Chonburi",cursive',g:'Chonburi'}]
  };
  SCRIPT_FONTS.fa=SCRIPT_FONTS.ar; SCRIPT_FONTS.uk=SCRIPT_FONTS.ru; // share the same script
  function loadFont(g){ if(loadedF[g])return; loadedF[g]=1; var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family='+g+'&display=swap'; document.head.appendChild(l); }
  function pickFont(code){
    var pool=SCRIPT_FONTS[code];
    if(!pool){ if(baseFont) document.documentElement.style.setProperty('--font', baseFont); return; }
    var f=pool[Math.floor(Math.random()*pool.length)];
    loadFont(f.g); document.documentElement.style.setProperty('--font', f.css);
  }
  // Replace concept words with formulae/code (restore originals when no mode is set)
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
  // Each concept word's "pathos" as pure symbols (special modes; no English words)
  var CONCEPT={
    landscape:{math:'ℝ²↦ℝ', lisp:'(λ xy ⇒ z)', py:'z ≔ ƒ⟨x,y⟩'},
    modeling:{math:'∅ ↠ ℝ³', lisp:'(↦ ∅ ℝ³)', py:'Φ ≔ ℝ³∖∅'},
    sculpting:{math:'Φ ↦ Φ+ε∇', lisp:'(∇ Φ)', py:'Φ ⊕ ε∇'},
    texturing:{math:'Φ ⊗ τ', lisp:'(⊗ Φ τ)', py:'σ ≔ Φ⊗τ'},
    lighting:{math:'L = ∫ ƒᵣ cosθ dω', lisp:'(∫ Lᵢ ∂ω)', py:'L ≔ ∮ Lᵢ'},
    animation:{math:'x = x(t)', lisp:'(λ t ⇒ x)', py:'t ↦ x'},
    rendering:{math:'Ω ↠ ℝ²', lisp:'(⌈⌉ Ω)', py:'Ι ≔ ⌈Ω⌉'},
    coding:{math:'Σ* ↦ Σ*', lisp:'(λ s s)', py:'s′ ≔ ƒ(s)'},
    scripting:{math:'ƒ∘ⁿ', lisp:'(↻ ƒ)', py:'ƒⁿ(·)'},
    programming:{math:'g ∘ ƒ', lisp:'(∘ g ƒ)', py:'h ≔ g∘ƒ'},
    generation:{math:'G ⊢ ψ', lisp:'(G ω)', py:'ψ ≔ G(ω)'},
    calculation:{math:'Σ aᵢ', lisp:'(Σ xᵢ)', py:'Σᵢ xᵢ'},
    simulation:{math:'ẋ = ƒ(x,t)', lisp:'(↻ ∂ₜx)', py:'↻ x ⊕ ẋΔt'},
    speculation:{math:'◇ Ω', lisp:'(◇ Ω)', py:'Ω′ ≔ ◇Ω'},
    visualization:{math:'D ↠ ℝ²', lisp:'(↦ D 𝐯)', py:'𝐯 ≔ D↦ℝ²'},
    perspective:{math:'x′= ƒX∕Z', lisp:'(π Ω ⊙)', py:'⊙ ∘ Ω'}
  };

  function apply(code){
    var special=(code==='math'||code==='lisp'||code==='py');
    var d=special?DICT.en:(dictFor(code)||DICT.en);
    function T(k){ var v=d[k]; return (v!=null)?v:DICT.en[k]; }
    var doc=document;
    setConcept(special?code:null);
    // generic text nodes
    doc.querySelectorAll('[data-i18n]').forEach(function(el){ var v=T(el.getAttribute('data-i18n')); if(v!=null) el.textContent=v; });
    // generic HTML nodes (paragraphs that contain links)
    doc.querySelectorAll('[data-i18n-html]').forEach(function(el){ var v=T(el.getAttribute('data-i18n-html')); if(v!=null) el.innerHTML=v; });
    // contact lead (two lines)
    doc.querySelectorAll('.contact-lead').forEach(function(p){ p.innerHTML=T('lead1')+'<br />'+T('lead2'); });
    // nav contact link (only when it points to the contact anchor)
    var nc=doc.querySelector('.nav a[href="#contact"], .nav a[href$="#contact"]'); if(nc) nc.textContent=T('nav_contact');
    // reading (kana) is Japanese-only
    doc.querySelectorAll('.word-reading').forEach(function(e){ e.style.display=(code==='ja'?'':'none'); });
    // direction / language / font
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

  // Language panel
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

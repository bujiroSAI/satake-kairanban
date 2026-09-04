/* さたけの回覧板 v2 — モックアップ用（バックエンドなし） */

/* ---------- 1. ローディング（1日1回・1秒） ---------- */
(function () {
  var loader = document.getElementById('loader');
  if (!loader) return;
  var today = new Date();
  var key = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var slogans = [
    '今日も一日、\nがんばりましょう。',
    'いってらっしゃい、\nおかえりなさい。',
    '雨の日も、\n傘はいりません。',
    'ふくろうが、\n見守っています。'
  ];
  var facts = [
    '佐竹商店街は、明治31年から128年。',
    '龍角散は、もともと佐竹家の家伝薬でした。',
    '明治のころ、佐竹には見世物の大仏がありました。',
    'アーケードの長さは330m。端から端まで雨いらず。'
  ];
  var i = today.getDate() % slogans.length;
  document.getElementById('loaderSlogan').innerHTML = slogans[i].replace('\n', '<br>');
  document.getElementById('loaderFact').textContent = facts[i];
  setTimeout(function () {
    loader.classList.add('done');
  }, 2400);
})();

/* ---------- 2. あいさつ・日付・きょうの一言 ---------- */
(function () {
  var now = new Date();
  var wd = ['日', '月', '火', '水', '木', '金', '土'];
  document.getElementById('helloDate').textContent =
    (now.getMonth() + 1) + '月' + now.getDate() + '日（' + wd[now.getDay()] + '）';
  document.getElementById('helloGreet').textContent = '午後に雨が上がるよ。';
})();

/* ---------- 3. しめきりカウントダウン ---------- */
(function () {
  var today = new Date(); today.setHours(0, 0, 0, 0);
  document.querySelectorAll('.dl[data-due]').forEach(function (el) {
    var due = new Date(el.getAttribute('data-due') + 'T00:00:00');
    var days = Math.round((due - today) / 86400000);
    el.querySelector('.d-num span').textContent = days >= 0 ? 'あと' + days : '済';
  });
})();

/* ---------- 4. 回覧板の判子（見ました） ---------- */
(function () {
  var TOTAL = 53;
  document.querySelectorAll('.kairan .card[data-kid]').forEach(function (card) {
    var kid = card.getAttribute('data-kid');
    var base = parseInt(card.getAttribute('data-base'), 10) || 0;
    var btn = card.querySelector('.stamp-btn');
    var count = card.querySelector('.k-count');
    function draw() {
      var stamped = localStorage.getItem('satake-stamp-' + kid) === '1';
      btn.classList.toggle('stamped', stamped);
      btn.querySelector('.s-label').textContent = stamped ? '見ました' : '見ました を押す';
      btn.setAttribute('aria-pressed', stamped ? 'true' : 'false');
      count.textContent = TOTAL + '店中 ' + (base + (stamped ? 1 : 0)) + '店が確認';
    }
    btn.addEventListener('click', function () {
      var now = localStorage.getItem('satake-stamp-' + kid) === '1';
      localStorage.setItem('satake-stamp-' + kid, now ? '0' : '1');
      draw();
    });
    draw();
  });
})();

/* ---------- 5. おみせ（実データ・佐竹商店街公式サイトより 2026-09-04） ----------
   [店名, よみ, 種類ラベル, cat, 電話, 顔イラスト番号, 定休日(サンプル), ひとこと] */
var MISE = [
  ['青果物 ふくや','ふくや','八百屋','kau','0362401878',1,'日','季節の野菜と果物。いまは梨（豊水）が人気。'],
  ['居酒屋 まこつ','まこつ','居酒屋','taberu','0362401757',2,'月','仕事おわりの一杯に。'],
  ['篠原まるよし風鈴','しのはらまるよしふうりん','江戸風鈴','kau','0338320227',8,'無休','江戸風鈴の工房。絵付け体験ができます。'],
  ['とりそば若松','とりそばわかまつ','ラーメン','taberu','0358163303',2,'水',''],
  ['中華 盛興園','せいこうえん','中華','taberu','0358184955',2,'火',''],
  ['大江戸鍼灸整骨院','おおえどしんきゅう','整骨院','kurashi','0358210220',8,'日',''],
  ['上野ホルモン肉店','うえのほるもん','ホルモン','taberu','0358178456',5,'日',''],
  ['モードショップ ナカネ','なかね','婦人服','kau','0338312904',6,'木',''],
  ['PBファーム スーパー','ぴーびーふぁーむ','スーパー','kau','0338323240',1,'無休',''],
  ['フランス料理 K.H.','けーえいち','フレンチ','taberu','0358268663',3,'月',''],
  ['こまどり洋品店','こまどり','洋品','kau','0338319551',6,'木',''],
  ['インド料理 プラシッダ','ぷらしっだ','インド料理','taberu','0363123845',3,'無休',''],
  ['班家','ばんが','焼き肉','taberu','0338398929',5,'火',''],
  ['（株）徳山物産','とくやまぶっさん','食品','kau','0358121555',8,'土日',''],
  ['脇野歯科クリニック','わきのしか','歯科','kurashi','0356886480',8,'日祝',''],
  ['吉民整骨院','よしたみせいこつ','整骨院','kurashi','0338359144',8,'日',''],
  ['仏壇あとう','ぶつだんあとう','仏壇仏具','kau','0338358777',8,'水',''],
  ['トラヤ文具店','とらやぶんぐ','文具','kau','0338313967',8,'日',''],
  ['高島屋洋装店（南）','たかしまやようそう','洋装','kau','0338315785',6,'木',''],
  ['（有）康文社','こうぶんしゃ','印刷','kurashi','0358122581',8,'土日',''],
  ['GENKI NEXT 御徒町','げんきねくすと','介護リハビリ','kurashi','0358174880',7,'日',''],
  ['ベースキャンプコーヒー','べーすきゃんぷこーひー','コーヒー豆','taberu','0338310613',3,'火','自家焙煎の豆屋さん。新豆の試飲もできます。'],
  ['菅原弁当','すがわらべんとう','お弁当','taberu','09037532068',2,'日',''],
  ['インテリア オノ','いんてりあおの','インテリア','kau','0338314704',8,'水',''],
  ['魚旬','うおしゅん','海鮮','taberu','0358178870',5,'日',''],
  ['ブティック ウフ','ぶてぃっくうふ','婦人服','kau','0338375757',6,'木',''],
  ['大原生花店','おおはらせいかてん','お花','kau','0338314172',4,'無休','季節の花。きょうは、りんどうが入荷。'],
  ['持ち帰りすし 千代田鮨','ちよだずし','おすし','taberu','0366893415',2,'水',''],
  ['中華料理 一番','いちばん','中華','taberu','0356880499',2,'木',''],
  ['ラ、カフェ','らかふぇ','喫茶','taberu','0338312216',7,'日',''],
  ['ワタナベ','わたなべ','子供服','kau','0338324829',6,'木',''],
  ['ダウンタウンキッチン','だうんたうんきっちん','食堂','taberu','0338313521',3,'月',''],
  ['イトウ靴店','いとうくつてん','靴','kau','0338319717',8,'水',''],
  ['鳥越せんべい 加賀屋','かがや','せんべい','taberu','0338319051',6,'火',''],
  ['佐藤精肉店','さとうせいにく','精肉','kau','0338323683',5,'日',''],
  ['メディア','めでぃあ','クリーニング','kurashi','0338358351',7,'日',''],
  ['寿園茶舗','じゅえんちゃほ','お茶','kau','0338321847',6,'日',''],
  ['TSURYU 鶴龍','つるりゅう','中華','taberu','0368030518',3,'月',''],
  ['ロッキー','ろっきー','喫茶スナック','taberu','0338311775',7,'日',''],
  ['和調の装い 秋本','あきもと','和装','kau','0338319569',6,'木',''],
  ['30-1 サンジュウヒクイチ','さんじゅうひくいち','精肉・惣菜','kau','0362843716',5,'水','30−1＝29（ニク）。「新しい肉屋」。秋はコロッケが名物。'],
  ['タムラ','たむら','クリーニング','kurashi','0338335884',7,'日',''],
  ['牛煮込み ラ・オングレ','らおんぐれ','洋食','taberu','0362844016',3,'月',''],
  ['ユニオンマンスリー上野御徒町','ゆにおんまんすりー','マンスリーマンション','kurashi','0353383831',8,'土日',''],
  ['オオミナト','おおみなと','模型・ホビー','kau','0338311620',8,'水','昔ながらの模型屋さん。夕方は子どもたちの止まり木。'],
  ['宇治屋茶舗','うじやちゃほ','お茶','kau','0338312329',6,'日',''],
  ['中央法規出版','ちゅうおうほうき','出版','kurashi','',8,'土日',''],
  ['重盛の人形焼','しげもりのにんぎょうやき','人形焼','taberu','0338313314',6,'火','人形町の老舗・重盛の人形焼が買えるお店（ゼイタク煎餅 佐竹分店）。'],
  ['日用品の店 池田屋','いけだや','日用品','kau','0338313027',1,'日',''],
  ['割烹 輝てるぼうず','てるぼうず','割烹','taberu','0358124411',2,'日',''],
  ['ギャラリーカフェしろむじ','しろむじ','カフェ','taberu','0365553836',7,'月','ギャラリー併設。いまは昭和40年代の佐竹の写真展。'],
  ['印刷ショップ山本','いんさつやまもと','印刷','kurashi','0356882510',8,'土日',''],
  ['ベッシーロス','べっしーろす','雑貨','kau','0338313194',7,'水',''],
  ['佐竹商店街振興組合 事務所','さたけしんこうくみあい','組合','kurashi','0338318926',8,'土日','困りごとの相談はこちらへ。']
];

(function () {
  var list = document.getElementById('miseList');
  var count = document.getElementById('miseCount');
  var closedBox = document.getElementById('miseClosed');
  var search = document.getElementById('miseSearch');
  var moreBtn = document.getElementById('miseMore');
  var cat = 'all', showAll = false, LIMIT = 8;
  var sorted = MISE.slice().sort(function (a, b) { return a[1].localeCompare(b[1], 'ja'); });

  /* 本日おやすみ */
  var wd = ['日', '月', '火', '水', '木', '金', '土'][new Date().getDay()];
  var closed = sorted.filter(function (m) { return m[6].indexOf(wd) !== -1; }).map(function (m) { return m[0]; });
  closedBox.textContent = closed.length
    ? '本日定休（サンプル）：' + closed.slice(0, 6).join('、') + (closed.length > 6 ? ' ほか' : '')
    : '本日は、全店開いています。';

  function fmtTel(t) { return t.replace(/^(\d{2,4})(\d{4})(\d{4})$/, '$1-$2-$3'); }

  function render() {
    var q = (search.value || '').trim();
    var shown = sorted.filter(function (m) {
      return (cat === 'all' || m[3] === cat) &&
        (q === '' || m[0].indexOf(q) !== -1 || m[1].indexOf(q) !== -1 || m[2].indexOf(q) !== -1);
    });
    var cut = (showAll || q !== '' || cat !== 'all') ? shown : shown.slice(0, LIMIT);
    list.innerHTML = cut.map(function (m) {
      var idx = sorted.indexOf(m);
      return '<li><button class="mise-row" type="button" data-i="' + idx + '">' +
        '<img src="assets/img/face' + m[5] + '.png" alt="">' +
        '<div><div class="m-name">' + m[0] + '</div><div class="m-cat">' + m[2] + '・定休 ' + m[6] + '</div></div>' +
        '<svg class="m-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>' +
        '</button></li>';
    }).join('');
    count.textContent = shown.length + '店を表示（53店＋事務所）';
    if (q === '' && cat === 'all') {
      moreBtn.style.display = '';
      moreBtn.textContent = showAll ? '閉じる' : 'すべて見る';
    } else { moreBtn.style.display = 'none'; }
    list.querySelectorAll('.mise-row').forEach(function (row) {
      row.addEventListener('click', function () { openPop(sorted[parseInt(row.getAttribute('data-i'), 10)]); });
    });
  }
  document.querySelectorAll('.f-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.f-btn').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      cat = b.getAttribute('data-cat');
      render();
    });
  });
  search.addEventListener('input', render);
  moreBtn.addEventListener('click', function () {
    showAll = !showAll; render();
    if (!showAll) document.getElementById('mise').scrollIntoView();
  });
  render();

  /* ポップアップ */
  var wrap = document.getElementById('popWrap');
  var lastFocus = null;
  function openPop(m) {
    lastFocus = document.activeElement;
    document.getElementById('popImg').src = 'assets/img/face' + m[5] + '.png';
    document.getElementById('popName').textContent = m[0];
    document.getElementById('popCat').textContent = m[2] + '　／　定休日 ' + m[6] + '（サンプル）';
    document.getElementById('popDesc').textContent = m[7] || m[2] + 'のお店です。くわしくはお電話でどうぞ。';
    var tel = document.getElementById('popTel');
    if (m[4]) { tel.style.display = ''; tel.href = 'tel:' + m[4]; tel.textContent = '☏ ' + fmtTel(m[4]); }
    else { tel.style.display = 'none'; }
    document.getElementById('popMap').href =
      'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(m[0] + ' 佐竹商店街 台東区');
    document.getElementById('popSns').href =
      'https://www.instagram.com/explore/search/keyword/?q=' + encodeURIComponent(m[0]);
    wrap.classList.add('on');
    document.getElementById('popClose').focus();
  }
  function closePop() {
    wrap.classList.remove('on');
    if (lastFocus) lastFocus.focus();
  }
  document.getElementById('popClose').addEventListener('click', closePop);
  wrap.addEventListener('click', function (e) { if (e.target === wrap) closePop(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('on')) closePop(); });
})();

/* ---------- 6. タブバーの現在地（スクロール追従） ---------- */
(function () {
  var links = document.querySelectorAll('.tabbar a');
  var map = { top: links[0], calendar: links[1], mise: links[2], tel: links[3] };
  function setOn(a) { links.forEach(function (x) { x.classList.remove('on'); }); a.classList.add('on'); }
  links.forEach(function (a) { a.addEventListener('click', function () { setOn(a); }); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) setOn(map[e.target.id]);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ['top', 'calendar', 'mise', 'tel'].forEach(function (id) {
      var el = document.getElementById(id); if (el) io.observe(el);
    });
  }
})();

/* ---------- 6b. 告知バナー（とじたらその日は出さない） ---------- */
(function () {
  var b = document.getElementById('adBanner');
  if (!b) return;
  var key = 'satake-adclose-' + new Date().getDate();
  if (sessionStorage.getItem(key)) { b.classList.add('off'); return; }
  document.getElementById('adClose').addEventListener('click', function () {
    b.classList.add('off');
    sessionStorage.setItem(key, '1');
  });
})();

/* ---------- 7. 出現（ひかえめ・1回だけ） ---------- */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

/* ---------- 8. ふくろうAIガイド（画面のみのデモ） ---------- */
(function () {
  var wrap = document.getElementById('chatWrap');
  var fab = document.getElementById('fabOwl');
  if (!wrap || !fab) return;
  var log = document.getElementById('chatLog');
  var chipsBox = document.getElementById('chatChips');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var CHIPS = ['今日の予定は？', '近い締切は？', 'お店を探したい', '告知をのせたい'];

  function say(text, me) {
    var div = document.createElement('div');
    div.className = 'msg' + (me ? ' me' : '');
    div.innerHTML = (me ? '' : '<img src="assets/img/owl.png" alt="">') +
      '<div class="bubble">' + text + '</div>';
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
  function nearestDeadline() {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var best = null;
    document.querySelectorAll('.dl[data-due]').forEach(function (el) {
      var due = new Date(el.getAttribute('data-due') + 'T00:00:00');
      var days = Math.round((due - today) / 86400000);
      if (days >= 0 && (!best || days < best.days)) best = { days: days, name: el.querySelector('h3').textContent };
    });
    return best;
  }
  function reply(q) {
    setTimeout(function () {
      if (/予定|カレンダー|こよみ|工事|祭/.test(q)) {
        say('今週は 9月8日（月）に北側入口で水道管の工事、12日（土）19時にふくろう祭りの実行委員会があります。<a href="#calendar" data-close>予定の欄を見る →</a>');
      } else if (/締切|しめきり|助成|申請|期限/.test(q)) {
        var b = nearestDeadline();
        say(b ? 'いちばん近いのは「' + b.name + '」、あと' + b.days + '日です。<a href="shinsei.html">書類を出す →</a>' : 'いま近い締切はありません。');
      } else if (/告知|広告|チラシ|のせ|載せ/.test(q)) {
        say('告知の掲載は、商店街のお店・町会なら<b>無料</b>です。<a href="shinsei.html">「書類を出す」からどうぞ →</a>');
      } else if (/店|買|食|探/.test(q)) {
        say('お店の名前や、売っているものを書いてください。例：「ふくや」「コーヒー」');
      } else {
        var hit = (typeof MISE !== 'undefined') && MISE.filter(function (m) {
          return q && (m[0].indexOf(q) !== -1 || m[1].indexOf(q) !== -1 || m[2].indexOf(q) !== -1);
        })[0];
        if (hit) {
          say('「' + hit[0] + '」（' + hit[2] + '）ですね。定休日は' + hit[6] + '（サンプル）。' +
            (hit[4] ? '<a href="tel:' + hit[4] + '">☏ 電話する →</a>' : '') +
            ' <a href="#mise" data-close>お店の欄で見る →</a>');
        } else {
          say('ごめんなさい、うまく分かりませんでした。下のボタンから選ぶか、別の言葉で聞いてください。');
        }
      }
    }, 450);
  }
  CHIPS.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = c;
    b.addEventListener('click', function () { say(c, true); reply(c); });
    chipsBox.appendChild(b);
  });
  var greeted = false;
  function openChat() {
    wrap.classList.add('on');
    if (!greeted) {
      greeted = true;
      setTimeout(function () {
        say('こんにちは、案内係のふくろうです。この回覧板のことなら、なんでも聞いてください。（画面デモ・実際のAIにはまだつながっていません）');
      }, 250);
    }
    input.focus();
  }
  function closeChat() { wrap.classList.remove('on'); fab.focus(); }
  fab.addEventListener('click', openChat);
  document.getElementById('chatClose').addEventListener('click', closeChat);
  wrap.addEventListener('click', function (e) {
    if (e.target === wrap) closeChat();
    if (e.target.hasAttribute && e.target.hasAttribute('data-close')) closeChat();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('on')) closeChat(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    say(v, true); input.value = '';
    reply(v);
  });
})();

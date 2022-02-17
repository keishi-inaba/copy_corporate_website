/*
*スクロール時にヘッダーが変化
*/
let beforePos = 0;
function ScrollAnime() {
  let elemTop = $('#service').offset().top;
  let scroll = $(window).scrollTop();

  if(scroll == beforePos) {

  } else if(elemTop == scroll || 0 > scroll - beforePos) {
    $('#header').removeClass('UpMove');
    $('#header').addClass('DownMove');
  } else {
    $('#header').removeClass('DownMove');
    $('#header').addClass('UpMove');
  }

  beforePos = scroll;
}

/*
*クリックしたら円形拡大
*/
$('.open_btn').click(function() {
  $(this).toggleClass('active');
  $('#g-nav').toggleClass('panel');
  $('.circle-bg').toggleClass('circle_active');
});

$('#g-nav a').click(function() {
  $('.open_btn').removeClass('active');
  $('#g-nav').removeClass('panel');
  $('.circle-bg').removeClass('circle_active');
});

/*
*スクロール時エリアの高さに合わせて線が伸びる
*/
function ScrollTimeLineAnime() {
  $('.timeline li').each(function() {
    let elemPos = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();
    let startPoint = 500;

    if(scroll >= elemPos - windowH - startPoint) {
      let H = $(this).outerHeight(true);
      let percent = (scroll + startPoint - elemPos) / (H / 2) * 100;

      if(percent > 100) {
        percent = 100;
      }
      $(this).children('.border-line').css({
        height: percent + '%',
      });
    }
  });
}

/*
*スクロールの速さが変化
*/
$('#page-top').click(function() {
  $('body, html').animate({
    scrollTop: 0
  }, 1500, 'easeInOutQuint');
  return false;
})

/*
*ズームインアウト全画面
*/
//画像設定
let windowWidth = window.innerWidth || document.documentElement.clientWidth || 0;

if(windowWidth > 768) {
  var responsiveImage = [
    { src: './images/b-p-s19-4452.jpg'},
    { src: './images/asian-businessmen.jpg'},
    { src: './images/clipboard.jpg'}
  ];
} else {
  var responsiveImage = [
    { src: './images/b-p-s19-4452.jpg'},
    { src: './images/asian-businessmen.jpg'},
    { src: './images/clipboard.jpg'}
  ];
}

//vegas設定
$('#slider').vegas({
  overlay: false,
  transition: 'blur',
  transitionDuration: 2000,
  delay: 10000,
  animationDuration: 20000,
  animation: 'kenburns',
  slides: responsiveImage,
  timer: false,
});

/*
*ランダムに出現
*/
function moveAnimation() {
  let randomElm2 = $('.randomScroll');
  let randomElm2Child = $(randomElm2).children();
  randomScrollAnime();

  function randomScrollAnime() {
    let elemPos = $('.randomScroll').offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elemPos - windowH) {
      if(randomElm2Child.length > 0) {
        let rnd = Math.floor(Math.random() * randomElm2Child.length);
        let moveDate = 'flipDown';
        if(animeFlag) {
          animeFlag = false;
          $(randomElm2Child[rnd]).addClass(moveDate);
          setTimeout(function() {
            animeFlag = true;
            randomScrollAnime();
          }, 200);
          randomElm2Child.splice(rnd, 1);
        }
      }
    } else {
      animeFlag = true;
    }
  }
}

let animeFlag = true;

/*
*アニメーション
*/
function fadeAnime() {
  //アニメ1
  $('.fadeUpT').each(function() {
    let elemPos = $(this).offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elemPos - windowH) {
      $(this).addClass('fadeUp');
    } else {
      $(this).removeClass('fadeUp');
    }
  });

  //アニメ2
  $('.fadeLeftT').each(function() {
    let elemPos = $(this).offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elemPos - windowH) {
      $(this).addClass('fadeLeft');
    } else {
      $(this).removeClass('fadeLeft');
    }
  });

  //アニメ3
  $('.fadeRightT').each(function() {
    let elemPos = $(this).offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elemPos - windowH) {
      $(this).addClass('fadeRight');
    } else {
      $(this).removeClass('fadeRight');
    }
  });
}

/*
*関数をまとめる
*/
//スクロール時
$(window).scroll(function() {
  ScrollTimeLineAnime();
  ScrollAnime();
  moveAnimation();
  fadeAnime();
});

//ロード時
$(window).on('load', function() {
  $('#splash-logo').delay(1200).fadeOut('slow');

  $('#splash').delay(1500).fadeOut('slow', function() {
    $('body').addClass('appear');
    ScrollTimeLineAnime();
    ScrollAnime();
    moveAnimation();
  });

  $('.bg1').on('animationend', function() {
    fadeAnime();
  });
});
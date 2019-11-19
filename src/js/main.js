/* 
    Editor: zhao
*/

new WOW().init();

// Back to top
function goTop() {
  $('html,body').animate({ 'scrollTop': 0 }, 1000);
}
$(window).scroll(function(){
  if ($(document).scrollTop() >= 200) {
    $('#backtop, .home-bottom-fixed').addClass("on");
  } else {
    $('#backtop, .home-bottom-fixed').removeClass("on");
  }
});
// Mobile header nav dropdown-menu
$(document).on("click", ".mobile-navbtn", function(e){
  $(this).toggleClass("open");
  $(this).parents("a").next(".dropdown-menu").toggleClass("open");
  e.preventDefault();
});

/*
  Swiper API move to -> http://www.swiper.com.cn/
*/
{
  let home_sec4_swiper = new Swiper('.home-section4-swiper', {
    speed: 700,
    spaceBetween: 15,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.home-section4-next',
      prevEl: '.home-section4-prev'
    },
    on: {
      slideChangeTransitionStart: function() {
        $(".js-tabs .js-item.active").removeClass('active');
        $(".tabsflex.js-tabs .js-item").eq(this.activeIndex).addClass('active');
        $(".bottom-operate .js-tabs .js-item").eq(this.activeIndex).addClass('active');
      }
    }
  })
  $(".js-tabs .js-item").on('click', function(e) {
    e.preventDefault()
    $(this).addClass('active').siblings().removeClass('active')
    home_sec4_swiper.slideTo($(this).index())
  })

  let home_sec6_swiper = new Swiper('.home-section6-swiper', {
    speed: 700,
    spaceBetween: 15,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.home-section6-next',
      prevEl: '.home-section6-prev'
    },
    pagination: {
      el: '.home-section6-pagination',
      clickable: true
    },
    on: {
      slideChangeTransitionStart: function() {
        $(".home-section6-tabs a.active").removeClass('active');
        $(".home-section6-tabs a").eq(this.activeIndex).addClass('active');
      }
    }
  })
  $(".home-section6-tabs a").on('click', function(e) {
    e.preventDefault()
    $(this).addClass('active').siblings().removeClass('active')
    home_sec6_swiper.slideTo($(this).index())
  })

  new Swiper('.home-section10-swiper', {
    speed: 700,
    direction: 'vertical',
    watchOverflow: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.home-section10-pagination',
      clickable :true
    },
    breakpoints: {
      1200: {
        direction: 'horizontal',
      },
    }
  })
}

$('#videoModel').on('hide.bs.modal', function () {
  let video = document.getElementById("movie");
  video.pause();
})

{
  let popup_close = 0;
  setTimeout(() => {
    $(".home-popup").addClass("open");
    $(".home-popup-mask").addClass("open");
    $("body").css("overflow", "hidden");
    popup_close++;
  },10000);

  $(document).on("click", ".home-popup .close-popup-btn, .popup-mask", () => {
    if (popup_close === 3) {
      $(".home-popup").removeClass("open");
      $(".home-popup-mask").removeClass("open");
      $("body").css("overflow", "auto");
    }else{
      popup_close++;
      $(".home-popup").removeClass("open");
      $(".home-popup-mask").removeClass("open");
      $("body").css("overflow", "auto");
      setTimeout(function () {
        $(".home-popup").addClass("open");
        $(".home-popup-mask").addClass("open");
        $("body").css("overflow", "hidden");
      },20000);
    }
  })

  $(document).on("click", ".open-popup-btn", () => {
    $(".home-popup").addClass("open");
    $(".home-popup-mask").addClass("open");
    $("body").css("overflow", "hidden");
    popup_close++;
  })
}
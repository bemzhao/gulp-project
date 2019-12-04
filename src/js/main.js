function goTop() {
  $('html,body').animate({ 
    'scrollTop': 0 
  }, 1000);
}

$(window).scroll(function(){
  if ($(document).scrollTop() >= 200) {
    $('#backtop').addClass("on");
  } else {
    $('#backtop').removeClass("on");
  }
});
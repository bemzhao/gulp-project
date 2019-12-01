/* 
    Editor: zhao
*/

// Back to top
function goTop() {
  $('html,body').animate({ 'scrollTop': 0 }, 1000);
}
$(window).scroll(function(){
  if ($(document).scrollTop() >= 200) {
    $('#backtop').addClass("on");
  } else {
    $('#backtop').removeClass("on");
  }
});
// Mobile header nav dropdown-menu
$(document).on("click", ".mobile-navbtn", function(e){
  $(this).toggleClass("open");
  $(this).parents("a").next(".dropdown-menu").toggleClass("open");
  e.preventDefault();
});

function test () {
  let word = "hello world!";
  let arr = [1,2,3];
  var newArr = [...arr,4,5,6];
  alert(word);
  alert(newArr);
}

/*
  Swiper API move to -> http://www.swiper.com.cn/
*/

(() => {
  setTimeout( ()=> {
    test()
  }, 300)
})()
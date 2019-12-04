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

function test () {
  let arr = [0,1,2,3];
  var newArr = [...arr,4,5,6];
  alert(newArr);
}

(() => {
  setTimeout( ()=> {
    test()
  }, 300)
})()
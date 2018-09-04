var isMoving = false;

function pauseEvent(){
    isMoving = true;
    setTimeout(function() {
        isMoving=false;
    }, 1500);
}

function scrollUp(n) {
    disableScroll();
    pauseEvent();
    if (n === 1) {
        screen2Up(); 
    } else {
        scrollScreen(n+1, true);
    }
}

function scrollDown(n) {
    disableScroll();
    pauseEvent();
    if (n === 2) {
        screen2Down(); 
    } else {
        scrollScreen(n-1, false);
    }
}


$(document).ready(function() {
    disableScroll();
});

 $(window).on('mousewheel', function(event) {

    if (!isMoving) {
        processScroll();
    }
    
    function processScroll() {
        var scroll = event.deltaY, screen = $('[class$="on-screen"]');
        var number = parseInt(screen.find('a.ds-hidden-anchor').attr('id').slice(8));

        if (screen.height() > $(window).height()) {
            //var doScroll = false;

            console.log("longer screen detected");
            enableScroll();

            if (scroll < 0) {
                if ($('#dsScreen' + (number+1))[0]) {
                    var nextAnchor = $('#dsScreen' + (number+1)).offset().top;
                    if ($('html, body').scrollTop() >= (nextAnchor - $(window).height())){
                        scrollUp(number);
                        // disableScroll();
                        // if (doScroll == true) {
                        //     scrollUp(number);
                        //     console.log('doscroll');
                        // } else {
                        //     console.log('doscroll set true');
                        //     setTimeout(function(){
                        //         doScroll = true;
                        //     }, 100); 
                        // }
                    }
                }
            } else {
                var thisAnchor = $('#dsScreen' + number).offset().top;
                if ($('html, body').scrollTop() <= thisAnchor){
                    scrollDown(number);
                }
            }
            
        } else {
            if (scroll < 0) {
                scrollUp(number);
            } else {
                scrollDown(number);
            }
        }

    }
});

var screen2Up = function () {
    console.log('screen2Up called');
    $('.ds-screen-cover').animate({top: "10vh", opacity: 0});
    
    setTimeout(function(){
        $(".parallax-main").removeClass("d-none");
        var toppos = - $(window).height();
        $(".parallax-main").animate({top: toppos}, "slow", "swing");
        whiteMenu(false);
    }, 500);
    setTimeout(function(){
        $(window).scrollTop(0);
        $(".ds-screen2 .ds-main-content").animate({marginTop: "140px"}, "slow", "swing");
        // $(".ds-sidebar .sub-level").addClass("dmt-2");
        // $(".ds-sidebar .sub-level").animate({maxHeight: "200px"});
        activeMenu(2);
        onScreen(1, 2);
    }, 1200); 

};

var screen2Down = function () {
    console.log('screen2Down called');
    //$(".ds-screen2 .ds-main-content").animate({marginTop: "200px"});

    setTimeout(function(){
        $('.ds-sidebar li').removeClass('active');
        whiteMenu(true);
        $('.ds-screen-cover').animate({top: "15vh", opacity: 1});
        $(".parallax-main").animate({top: "100vh"}, "slow", "swing");
        $(".parallax-main").addClass("d-none");
        $(window).scrollTop(0);
        onScreen(2, 1);
    }, 500);
    
};

var scrollScreen = function(num, bol) {
    var scrollTo = '#dsScreen' + num;
    var upordown;
    if (bol === true) {  //up scroll
        upordown = num - 1;
    } else {
        upordown = num + 1;
    }
    //$(".ds-screen" + upordown + " .ds-main-content").animate({marginTop: "200px"});
    //$(".ds-screen" + upordown + " .ds-main-content").css('margin-top', '200px');

    console.log('anchor pos before'+$(scrollTo).offset().top);
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top
    }, 300, function() {
        window.location.hash = scrollTo;
        console.log('anchor pos after'+$(scrollTo).offset().top);
        console.log('body top'+$('html, body').scrollTop());
    });
    
    setTimeout(function(){
        $(".ds-screen" + num + " .ds-main-content").animate({marginTop: "100px"}, "slow", "swing");
    }, 800);
    setTimeout(function(){
        activeMenu(num);
        onScreen(upordown, num);
    }, 1000);

    //check if additional animation is needed
    let screenwani = [3, 4, 6, 7, 8];
    if (screenwani.includes(num)) {
        console.log('includes additional' + num);
        additionalAni(num);
    }
};

var onScreen = function(rm, ad) {
    $(".ds-screen" + rm).removeClass('on-screen');
    $(".ds-screen" + ad).addClass('on-screen');
};

//change menu and side bar color
var whiteMenu = function(bol) {
    if (bol) {
        $(".ds-ultimate-header").addClass('text-white');
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-ultimate-header").removeClass('text-white');
        $(".ds-sidebar").removeClass('text-white');
    }
};

var activeMenu = function(show) {
    $('.ds-sidebar li').removeClass('active');
    $('a[href="#dsScreen'+show+'"]').parents('li').addClass('active');
};

//additional animation dispatcher
var additionalAni = function(num) {
    switch(num) {
        case 3:
            if ($('.ds-screen3').hasClass('ds-layout')) {
                layoutScreen3Show();
            }
            break;
        case 4:
            if ($('.ds-screen3').hasClass('ds-layout')) {
                layoutScreen3Dis();
            }
            break;
        case 6:
            if ($('.ds-screen7').hasClass('ds-visual')) {
                $(".ds-sidebar").removeClass('text-white');
            }
            break;
        case 7:
            if ($('.ds-screen7').hasClass('ds-visual')) {
                $(".ds-sidebar").addClass('text-white');
            }
            break;
        case 8:
            if ($('.ds-screen8').hasClass('ds-layout')) {
                setTimeout(function(){
                    $('.ds-screen8 .tag1').addClass('ds-scale-animation');
                }, 1000);
                setTimeout(function(){
                    $('.ds-screen8 .tag2').addClass('ds-scale-animation');
                }, 1500);
            }
            break;
        default:
            return false;
    }
};

//additional animations
var layoutScreen3Show = function() {
    $(".ds-ultimate-header").removeClass('text-white');

    setTimeout(function(){
        var m, fullHeight = [1, 2, 11, 12];
        $(".ds-sidebar").removeClass("text-white");
        fullHeight.forEach(function(h) {
            $(".ds-screen3 .ds-layout-grid:nth-child("+ h +")").animate({height: "100vh"});
        });
        for (m = 3; m <11; m++) {
            $(".ds-screen3 .ds-layout-grid:nth-child("+ m + ")").animate({height: "70vh"});
        }
    }, 500); 

    setTimeout(function(){
        $(".ds-whsp-rect").animate({height: "258px"});
        $('.ds-whsp-rect:nth-child(2)').removeClass('dpr-1');
        $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','10');
        $('.ds-whsp-rect:last-child').removeClass('dpl-1');
        $('.ds-whsp-rect:last-child').css('grid-column-start','15');
        $('.ds-whsp-rect21').removeClass('smb-1');
        $('.ds-whsp-rect21').addClass('dmb-1');
        $('.ds-whsp-rect22').removeClass('dmt-1');
        $('.ds-whsp-rect22').addClass('dmt-1');
    }, 1000); 

    console.log($(window).scrollTop());
};

var layoutScreen3Dis = function() {
    var m, fullHeight = [1, 2, 11, 12];
    fullHeight.forEach(function(h) {
        $(".ds-screen3 .ds-layout-grid:nth-child("+ h +")").css('height', '0');
    });
    for (m = 3; m <11; m++) {
        $(".ds-screen3 .ds-layout-grid:nth-child("+ m + ")").css('height', '0');
    }
    $(".ds-whsp-rect").css('height', '376px');
    $('.ds-whsp-rect:nth-child(2)').addClass('dpr-1');
    $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','11');
    $('.ds-whsp-rect:last-child').addClass('dpl-1');
    $('.ds-whsp-rect:last-child').css('grid-column-start','14');
    $('.ds-whsp-rect21').addClass('smb-1');
    $('.ds-whsp-rect21').removeClass('dmb-1');
    $('.ds-whsp-rect22').addClass('dmt-1');
    $('.ds-whsp-rect22').removeClass('dmt-1');
};

//prevent and enable default scroll behavior
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    console.log('disabled');
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    console.log('abled');
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
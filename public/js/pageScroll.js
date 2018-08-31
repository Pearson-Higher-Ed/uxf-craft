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
    switch(n) {
        case 1:
            screen2Up();
            break;
        case 2:
            scrollScreen(3, true);
            if ($('.ds-screen3').hasClass('ds-layout')) {
                additionalAni(3, true);
            }
            break;
        case 3:
            scrollScreen(4, true);
            if ($('.ds-screen3').hasClass('ds-layout')) {
                additionalAni(3, false);
            }
            break;
        case 4:
            scrollScreen(5, true);
            break;
        case 5:
            scrollScreen(6, true);
            break;
        case 6:
            scrollScreen(7, true);
            if ($('.ds-screen7').hasClass('ds-visual')) {
                additionalAni(6, true);
            }
            break;
        case 7:
            scrollScreen(8, true);
            break;
        case 8:
            scrollScreen(9, true);
            break;
        case 9:
            scrollScreen(10, true);
            break;
        case 10:
            scrollScreen(11, true);
            break;
        case 11:
            scrollScreen(12, true);
            break;
        case 12:
            scrollScreen(13, true);
            break;
        case 13:
            scrollScreen(14, true);
            break;
        case 14:
            scrollScreen(15, true);
            break;
        default:
            return false;
    } 
}

function scrollDown(n) {
    disableScroll();
    pauseEvent();
    switch(n) {
        case 2:
            screen2Down();
            break;
        case 3:
            scrollScreen(2, false);
            break;
        case 4:
            scrollScreen(3, false);
            if ($('.ds-screen3').hasClass('ds-layout')) {
                additionalAni(3, true);
            }
            break;
        case 5:
            scrollScreen(4, false);
            break;
        case 6:
            scrollScreen(5, false);
            break;
        case 7:
            scrollScreen(6, false);
            if ($('.ds-screen7').hasClass('ds-visual')) {
                additionalAni(6, false);
            }
            break;
        case 8:
            scrollScreen(7, false);
            break;
        case 9:
            scrollScreen(8, false);
            break;
        case 10:
            scrollScreen(9, false);
            break;
        case 11:
            scrollScreen(10, false);
            break;
        case 12:
            scrollScreen(11, false);
            break;
        case 13:
            scrollScreen(12, false);
            break;
        case 14:
            scrollScreen(13, false);
            break;
        case 15:
            scrollScreen(14, false);
            break;
        default:
            return false;
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
var additionalAni = function(num, bol) {
    if (num === 2) {
        if (bol === true) { //up scroll
            $(".ds-ultimate-header").removeClass('text-white');
        } else {
            $(".ds-ultimate-header").addClass('text-white');
        }
    }
    if (num === 3) {
        if (bol === true) { //up scroll
            layoutScreen3Show();
        } else {
            layoutScreen3Dis();
        }
    }
    if (num === 6) {
        if (bol === true) { //up scroll
            $(".ds-sidebar").addClass('text-white');
        } else {
            $(".ds-sidebar").removeClass('text-white');
        }
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
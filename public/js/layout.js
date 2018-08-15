var activeScreen = function() {
    for (var n = 0; n <7; n++) {
       if ($('.ds-layout-screen'+n).hasClass('on-screen')) {
           return [n, $('.ds-layout-screen'+n)];
       }
    }
};

var isMoving = false;

function pauseEvent(){
    isMoving = true;
    setTimeout(function() {
        isMoving=false;
    },2000);
 }

$(document).ready(function() {
    
    var fillTheGrid = function(timeInter, numArray) {
        setTimeout(function() {
            console.log(numArray);
            $.each(numArray, function(index, item){
                $('.ds-layout-screen1 .ds-layout-grid:nth-child('+ item +')').addClass('ds-grid-fill'+item);
            });
        }, timeInter);
    };

    fillTheGrid(10, [2, 8, 10, 12]);
    fillTheGrid(200, [4, 6]);
    fillTheGrid(400, [1, 3, 5, 7]);
    fillTheGrid(600, [9, 11]);
    console.log($(window).height());
    console.log($('main').height());
    console.log($('.ds-layout-screen1').height());
    console.log($('.parallax-main').height());

});

$(window).on('mousewheel', function(event) {

    if (!isMoving) {
        processScroll();
        pauseEvent();
    } 
    
    function processScroll() {
        //console.log(new Date().getTime().toString());
        var scroll = event.deltaY, number = activeScreen()[0], screen = activeScreen()[1];

        if (screen.height() > $(window).height()) {
            console.log("longer screen detected");
            if (scroll < 0) {
                console.log("up scroll");
                console.log('scrollh' + $(window).height());
                console.log('h' + screen.height());
                console.log($(window).scrollTop());
                if ($(window).scrollTop() > (screen.height()-$(window).height())){
                    scrollUp(number);
                }
            } else {
                if ($(window).scrollTop() == 0){
                    console.log($(window).scrollTop());
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

        function scrollUp(activeNo) {
            switch(activeNo) {
                case 1:
                    screen2Up();
                    break;
                case 2:
                    screen3Up();
                    break;
                case 3:
                    screen4Up();
                    break;
                case 4:
                    screen5Up();
                    break;
                case 5:
                    screen6Up();
                    break;
                default:
                    return false;
            } 
        }

        function scrollDown(activeNo) {
            switch(activeNo) {
                case 2:
                    screen2Down();
                    break;
                case 3:
                    screen3Down();
                    break;
                case 4:
                    screen4Down();
                    break;
                case 5:
                    screen5Down();
                    break;
                case 6:
                    screen6Down();
                    break;
                default:
                    return false;
            }
        }
    }
});

var screen2Up = function () {
    console.log('screen2Up called');

    $('.ds-layout-cover').animate({top: "10vh", opacity: 0});
    
    setTimeout(function(){
        $(".parallax-main").removeClass("d-none");
        screenUpShow(2);
        $(".ds-sidebar").removeClass("text-white");
    }, 500);
    setTimeout(function(){
        $(".ds-layout-screen2 .ds-center-main").animate({marginTop: "140px"}, "slow", "swing");
        $(".ds-sidebar .sub-level").addClass("dmt-2");
        $(".ds-sidebar .sub-level").animate({maxHeight: "200px"});
        onScreen(1, 2);
    }, 1200); 
    console.log($(window).scrollTop());
};

var screen2Down = function () {
    console.log('screen2Down called');

    $(".ds-layout-screen2 .ds-center-main").animate({marginTop: "200px"});

    setTimeout(function(){
        $(".ds-sidebar .sub-level").removeClass("dmt-2");
        $(".ds-sidebar .sub-level").css('max-height', "0");
        $(".ds-sidebar").addClass("text-white");
        $('.ds-layout-cover').animate({top: "15vh", opacity: 1});
        $(".parallax-main").animate({top: "100vh"}, "slow", "swing");
        $(".parallax-main").addClass("d-none");
        onScreen(2, 1);
    }, 500);
    console.log($(window).scrollTop());
};

var screen3Up = function() {
    console.log('screen3Up called');

    $(".ds-ultimate-header").removeClass('text-white');
    screenUpShow(3);

    setTimeout(function(){
        var m, fullHeight = [1, 2, 11, 12];
        $(".ds-layout-screen3 .ds-whsp-content").animate({marginTop: "100px"});
        $(".ds-sidebar").removeClass("text-white");
        fullHeight.forEach(function(h) {
            $(".ds-layout-screen3 .ds-layout-grid:nth-child("+ h +")").animate({height: "100vh"});
        });
        for (m = 3; m <11; m++) {
            $(".ds-layout-screen3 .ds-layout-grid:nth-child("+ m + ")").animate({height: "70vh"});
        }
        onScreen(2, 3);
    }, 500); 

    setTimeout(function(){
        $(".ds-whsp-rect").animate({height: "258px"});
        $('.ds-whsp-rect1').removeClass('dmr-1');
        $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','10');
        $('.ds-whsp-rect3').removeClass('dml-1');
        $('.ds-whsp-rect:last-child').css('grid-column-start','15');
        $('.ds-whsp-rect21').removeClass('smb-1');
        $('.ds-whsp-rect21').addClass('dmb-1');
        $('.ds-whsp-rect22').removeClass('dmt-1');
        $('.ds-whsp-rect22').addClass('dmt-1');
    }, 1000); 

    console.log($(window).scrollTop());
};

var screen3Down = function() {
    console.log('screen3Down called');
    $(".ds-ultimate-header").addClass('text-white');
    screenDownShow(2);
    onScreen(3, 2);
};

var screen4Up = function() {
    console.log('screen4Up called');

    screenUpShow(4);
    
    onScreen(3, 4);
};

var screen4Down = function() {
    console.log('screen4Down called');
    
    screenDownShow(3);

    onScreen(4, 3);
};

var screen5Up = function() {
    console.log('screen5Up called');

    screenUpShow(5);

    onScreen(4, 5);
};

var screen5Down = function() {
    console.log('screen5Down called');

    screenDownShow(4);
    
    onScreen(5, 4);
};

var screen6Up = function() {
    console.log('screen6Up called');

    screenUpShow(6);

    onScreen(5, 6);
};

var screen6Down = function() {
    console.log('screen6Down called');

    screenDownShow(5);
    
    onScreen(6, 5);
};

var onScreen = function(rm, ad) {
    $(".ds-layout-screen" + rm).removeClass('on-screen');
    $(".ds-layout-screen" + ad).addClass('on-screen');
};

var getScreen = function(num) {
    var screen = $(".ds-layout-screen"+num);
    return screen;
};

var screenDownShow = function(num) {
    var toppos = - $(window).height() * (num - 1);
    $(window).scrollTop(0);
    $(".parallax-main").animate({top: toppos}, "slow", "swing");
};

var screenUpShow = function(num) {
    var toppos = (53 - $(window).height()) * (num - 1);
    $(window).scrollTop(0);
    $(".parallax-main").animate({top: toppos}, "slow", "swing");
};


var whiteMenu = function(bol) {
    if (bol) {
        $(".ds-ultimate-header").addClass('text-white');
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-ultimate-header").removeClass('text-white');
        $(".ds-sidebar").removeClass('text-white');
    }
};
var activeScreen = function() {
    for (var n = 0; n <7; n++) {
       if ($('.ds-layout-screen'+n).hasClass('on-screen')) {
           return n;
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

$(window).on('mousewheel', function(event) {

    if (!isMoving) {
        processScroll();
        pauseEvent();
    } 
    
    function processScroll() {
        console.log(new Date().getTime().toString());
        var scroll = event.deltaY;
        console.log(scroll);

        if (scroll < 0) {
            var activeNoA = activeScreen();
            console.log('activeA'+activeNoA);
            switch(activeNoA) {
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
        } else {
            var activeNoB = activeScreen();
            console.log('activeB'+activeNoB);
            switch(activeNoB) {
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
        screenUpShow(2);
        $(".ds-sidebar").removeClass("text-white");
    }, 500);
    setTimeout(function(){
        $(".ds-layout-screen2 .ds-center-main").animate({marginTop: "140px"}, "slow", "swing");
        $(".ds-sidebar .sub-level").addClass("mt-3");
        $(".ds-sidebar .sub-level").animate({maxHeight: "200px"});
        onScreen(1, 2);
    }, 1200); 
};

var screen2Down = function () {
    console.log('screen2Down called');

    $(".ds-layout-screen2 .ds-center-main").animate({marginTop: "200px"});

    setTimeout(function(){
        $(".ds-sidebar .sub-level").removeClass("mt-3");
        $(".ds-sidebar .sub-level").css('max-height', "0");
        $(".ds-sidebar").addClass("text-white");
        $('.ds-layout-cover').animate({top: "15vh", opacity: 1});
        screenDownDis(2);
        onScreen(2, 1);
    }, 500);
};

var screen3Up = function() {
    console.log('screen3Up called');

    $(".ds-ultimate-header").removeClass('text-white');
    screenUpDis(2);
    screenUpShow(3);

    setTimeout(function(){
        var m, fullHeight = [1, 2, 11, 12];
        $(".ds-layout-screen3 .ds-whsp-content").animate({marginTop: "100px"});
        $(".ds-sidebar").removeClass("text-white");
        fullHeight.forEach(function(h) {
            $(".ds-layout-screen3 .ds-layout-grid:nth-child("+ h +")").animate({height: "100vh"});
        });
        for (m = 3; m <11; m++) {
            $(".ds-layout-screen3 .ds-layout-grid:nth-child("+ m + ")").animate({height: "60vh"});
        }
        onScreen(2, 3);
    }, 500); 

    setTimeout(function(){
        $(".ds-whsp-rect").animate({height: "258px"});
        $('.ds-whsp-rect1').removeClass('mr-2');
        $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','10');
        $('.ds-whsp-rect3').removeClass('ml-2');
        $('.ds-whsp-rect:last-child').css('grid-column-start','15');
        $('.ds-whsp-rect21').removeClass('mb-1');
        $('.ds-whsp-rect21').addClass('mb-2');
        $('.ds-whsp-rect22').removeClass('mt-1');
        $('.ds-whsp-rect22').addClass('mt-2');
    }, 1000); 
};

var screen3Down = function() {
    console.log('screen3Down called');
    $(".ds-ultimate-header").addClass('text-white');
    screenDownShow(2);
    screenDownDis(3);
    onScreen(3, 2);
};

var screen4Up = function() {
    console.log('screen4Up called');

    whiteMenu(true);

    screenUpDis(3);
    screenUpShow(4);

    setTimeout(function(){
        $(".ds-layout-screen4 .ds-center-main").animate({marginTop: "140px"});
    }, 500); 

    setTimeout(function(){
        $(".ds-layout-screen4 .ds-center-main").animate({marginTop: "60px"});
    }, 1000); 

    onScreen(3, 4);
};

var screen4Down = function() {
    console.log('screen4Down called');

    whiteMenu(false);
    
    screenDownShow(3);
    screenDownDis(4);

    onScreen(4, 3);
};

var screen5Up = function() {
    console.log('screen5Up called');

    whiteMenu(false);

    screenUpDis(4);
    screenUpShow(5);

    onScreen(4, 5);
};

var screen5Down = function() {
    console.log('screen5Down called');

    whiteMenu(true);

    screenDownShow(4);
    screenDownDis(5);
    
    onScreen(5, 4);
};

var screen6Up = function() {
    console.log('screen6Up called');

    screenUpDis(5);
    screenUpShow(6);

    onScreen(5, 6);
};

var screen6Down = function() {
    console.log('screen6Down called');

    screenDownShow(5);
    screenDownDis(6);
    
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

var screenDownDis = function(num) {
    var screen = getScreen(num);
    screen.animate({top: "100vh"});
    screen.addClass("d-none");
};

var screenDownShow = function(num) {
    var screen = getScreen(num);
    screen.removeClass("d-none");
    //if (num==2) {
        screen.animate({top: 53 + "px"}, "slow", "swing");
    //} else {
    //    screen.animate({top: 106 + "px"}, "slow", "swing");
    //} 
};

var screenUpShow = function(num) {
    var screen = getScreen(num);
    screen.removeClass("d-none");
    screen.addClass("position-absolute");
    //if (num==2) {
        screen.animate({top: 53 + "px"}, "slow", "swing");
    //} else {
    //    screen.animate({top: 106 + "px"}, "slow", "swing");
    //}
};

// var screenToTop = function() 

var screenUpDis = function(num) {
    var screen = getScreen(num);
    screen.animate({top: "-100vh"}, "slow");
    setTimeout(function(){
        screen.addClass('d-none');
    }, 1200);
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
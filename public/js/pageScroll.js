var isMoving = false;

function pauseEvent(){
    isMoving = true;
    setTimeout(function() {
        isMoving=false;
    }, 1200);
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
            console.log("longer screen detected");
            enableScroll();

            if (scroll < 0) {
                if ($('#dsScreen' + (number+1))[0]) {
                    var nextAnchor = $('#dsScreen' + (number+1)).offset().top;
                    if ($('html, body').scrollTop() >= (nextAnchor - $(window).height())){
                        scrollScreen(number, true);
                    }
                }
            } else {
                var thisAnchor = $('#dsScreen' + number).offset().top;
                if ($('html, body').scrollTop() <= thisAnchor){
                    scrollScreen(number, false);
                }
            }
            
        } else {
            if (scroll < 0) {
                scrollScreen(number, true);
            } else {
                scrollScreen(number, false);
            }
        }

    }
});

var onScreen = function(rm, ad) {
    $(".ds-screen" + rm).removeClass('on-screen');
    $(".ds-screen" + ad).addClass('on-screen');
};

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
        activeMenu(2);
        onScreen(1, 2);
    }, 1200); 

};

var screen2Down = function () {
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
    disableScroll();
    pauseEvent();
    if (bol) {
        if (num === 1) {
            screen2Up(); 
        } else {
            scrollAnimation(num + 1);
        }
    } else {
        if (num === 2) {
            screen2Down(); 
        } else {
            scrollAnimation(num - 1);
        }
    }

    function scrollAnimation(n) {
        var scrollTo = '#dsScreen' + n;
    
        //console.log('anchor pos before'+$(scrollTo).offset().top);
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 300, function() {
            window.location.hash = scrollTo;
            //console.log('anchor pos after'+$(scrollTo).offset().top);
            //console.log('body top'+$('html, body').scrollTop());
        });
    
        screenAnimation(n);
    }
};

var screenAnimation = function(num) {
    setTimeout(function(){
        $(".ds-screen" + num + " .ds-main-content").animate({marginTop: "100px"}, "slow", "swing");
    }, 500);
    setTimeout(function(){
        activeMenu(num);
        $('[class^="ds-screen"]').removeClass('on-screen');
        $('.ds-screen' + num).addClass('on-screen');
    }, 700);

    followingAni(num);

    //check if additional animation is needed
    let screenwani = [3, 4, 6, 7, 8];
    if (screenwani.includes(num)) {
        additionalAni(num);
    }
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

var followingAni = function(num) {
    if ($(".ds-screen" + num).has(".ds-following-content").length) {
        for (var i=1; i<4; i++) {
            ani(i);
        }
    }

    function ani(i) {
        console.log('followingAni' + i);
        if (!$(".ds-screen" + num + " .ds-following-content.level" + i).hasClass('multi')) {
            setTimeout(function(){
                $(".ds-screen" + num + " .ds-following-content.level" + i).animate({marginTop: "48px"}, "slow", "swing");
            }, 700 + (i - 1) * 100);
        } else {
            setTimeout(function(){
                $(".ds-screen" + num + " .ds-following-content.level" + i + " .part1").animate({marginTop: "0px"}, "slow", "swing");
            }, 700 + (i - 1) * 100);
            setTimeout(function(){
                $(".ds-screen" + num + " .ds-following-content.level" + i + " .part2").animate({marginTop: "0px"}, "slow", "swing");
            }, 800 + (i - 1) * 100);
            if ($(".ds-screen" + num + " .ds-following-content.level" + i + " .part3").length) {
                setTimeout(function(){
                    $(".ds-screen" + num + " .ds-following-content.level" + i + " .part3").animate({marginTop: "0px"}, "slow", "swing");
                }, 900 + (i - 1) * 100);
            }
        }
    }
};
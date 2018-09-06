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
            //console.log("longer screen detected");
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
    console.log('screen animation'+num);
    $('[class^="ds-screen"]').removeClass('on-screen');
    $('.ds-screen' + num).addClass('on-screen');

    setTimeout(function(){
        $(".ds-screen" + num + " .ds-main-content").animate({marginTop: "100px"}, "slow", "swing");
    }, 300);
    setTimeout(function(){
        activeMenu(num);
    }, 500);

    if ($(".ds-screen" + num).has(".screen-following-content").length) {
        followingAni(num, true);
    }
    //check if additional animation is needed
    let screenwani = [3, 4, 6, 7, 8];
    if (screenwani.includes(num)) {
        console.log('screen additional animation'+num);
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

var followingAni = function(screennum, isScreen, sectionnum) {
    var prefix = isScreen ? '.ds-screen'+ screennum : '.ds-screen'+ screennum + ' .ds-section' + sectionnum;
    var target = isScreen ? ' .screen-following-content.level' : ' .section-following-content.level';
    ani(1);
    if ($(prefix + target + 2).length) {
        ani(2);
    }

    function ani(i) {
        if ($(prefix + target + i).hasClass('single')) {
            setTimeout(function(){
                $(prefix + target + i).animate({marginTop: "48px"}, "slow", "swing");
            }, 700 + (i - 1) * 150);
        } else if ($(prefix + target + i).hasClass('multi')) {
            partAni(1);
            partAni(2);
            if ($(prefix + target + i + " .part3").length) {
                partAni(3);
            }
        }
        function partAni(m) {
            setTimeout(function(){
                $(prefix + target + i + " .part" + m).animate({marginTop: "0px"}, "slow", "swing");
            }, 700 + (m - 1) * 100 + (i - 1) * 150);
        }
    }
};
$(document).ready(function() {
   var controller = new ScrollMagic.Controller({
       globalSceneOptions: {
           triggerHook: 'onLeave'
       }
   });
   var slides  = $('section.scroll-panel');
   var screens = $('a[id^="dsScreen"]');
   var LevelOneScenes = [];
   var LevelTwoScenes = [];
   var inter1;
   
   for (var i = 0; i < slides.length; i++) {
        LevelOneScenes[i] = new ScrollMagic.Scene({
           triggerElement: slides[i]
       })
       .setPin(slides[i])
       .addTo(controller);
   }

   for  (var m = 1; m < screens.length; m++) {
        LevelTwoScenes[m] = new ScrollMagic.Scene({
            triggerElement: screens[m]
        })
        .addTo(controller);
   }

    LevelOneScenes[0].on("enter", function (event) {
        coverAnimation();
    });

    LevelOneScenes[1].on("enter", function (event) {
        LevelOneScenes[1].remove();
    });

    LevelTwoScenes[1].on("enter", function (event) {
        clearInterval(inter1);
        whiteMenu(false);
        screenAnimation(2);
    });

    LevelTwoScenes[1].on("leave", function (event) {
        if (event.target.controller().info('scrollDirection') === 'REVERSE') {
            whiteMenu(true);
            coverAnimation();
            $('.ds-sidebar li').removeClass('active');
        } else {
            console.log('clearinterval');
            clearInterval(inter1);
        }
    });

    for  (var n = 2; n < screens.length; n++) {
        if (n === screens.length - 1) {
            transitionAni(n, true);
        } else {
            transitionAni(n, false);
        }
    }

    function transitionAni(num, bol) {
        LevelTwoScenes[num].on("enter", function (event) {
            screenAnimation(num+1);
            if (bol === true) {
                LevelOneScenes[0].removePin(slides[0]);
            }
        });
        LevelTwoScenes[num].on("leave", function (event) {
            if (event.target.controller().info('scrollDirection') === 'REVERSE') {
                activeMenu(num);
                if (bol === true) {
                    LevelOneScenes[0].setPin(slides[0]);
                }
            }
        });
    }

    function coverAnimation() {
        var windowheight = $(window).height();
    
        inter1 = setInterval(function(){
            $('.ds-screen-cover').css('opacity', (windowheight/2-controller.scrollPos())/(windowheight/2));
            if (controller.scrollPos() >= (windowheight - 160)) {
                $(".ds-sidebar").removeClass('text-white');
            } else {
                $(".ds-sidebar").addClass('text-white');
            }
        }, 80);
    }
});

var screenAnimation = function(num) {
    $(".ds-screen" + num + " .ds-main-content").animate({marginTop: "140px", opacity: 1}, 800, "easeOutSine");
    setTimeout(function(){
        activeMenu(num);
    }, 300);

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
                $(prefix + target + i).animate({marginTop: "48px"}, 800, "easeOutSine");
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
                $(prefix + target + i + " .part" + m).animate({marginTop: "0px"}, 500, "easeOutSine");
            }, 700 + (m - 1) * 100 + (i - 1) * 150);
        }
    }
};
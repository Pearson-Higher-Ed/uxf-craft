var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});
var slides  = $('section.scroll-panel');
var transitsScreen = $('a[class*="ds-transition-screen"]');
var transitsSection = $('a[class*="ds-transition-section"]');
var animations = $('.ds-animation-trigger');

var slidesScenes = [];
var transitsScrScenes = [];
var transitsSecScenes = [];
var animationsScenes = [];

var tweensScreen = [];
var tweensSection = [];
var inter1;

$(document).ready(function() {
   for (var i = 0; i < slides.length; i++) {
        slidesScenes[i] = new ScrollMagic.Scene({
           triggerElement: slides[i]
       })
       .addTo(controller);
       //.addIndicators({name: "slides scene"+i});
   }


    for  (var m = 0; m < transitsScreen.length; m++) {
        tweensScreen[m]= TweenMax.to('#dsTransitScreen'+m, 1, {paddingTop:"0", opacity: 1, ease: Power4.easeOut});

        transitsScrScenes[m] = new ScrollMagic.Scene({
            triggerElement: transitsScreen[m]
        })
        .setTween(tweensScreen[m])
        .duration(36)
        .addTo(controller);
        //.addIndicators({name: "transition"+m});
   }

   for  (var x = 0; x < transitsSection.length; x++) {

        tweensSection[x]= TweenMax.to('#dsTransitSection'+x, 1, {paddingTop:"0", opacity: 1, ease: Power4.easeOut});

        transitsSecScenes[x] = new ScrollMagic.Scene({
            triggerElement: transitsSection[x]
        })
        .setTween(tweensSection[x])
        .duration(36)
        .addTo(controller);
        //.addIndicators({name: "section transition"+x});
    }

   for (var n = 0; n < animations.length; n++) {
        animationsScenes[n] = new ScrollMagic.Scene({
            triggerElement: animations[n]
        })
        .addTo(controller);
        //.addIndicators({name: "animation scene"+n});
    }

    slidesScenes[0].on("enter", function (event) {
        coverAnimation();
    });

    slidesScenes[1].on("enter", function (event) {
        clearInterval(inter1);
    });


    transitsSecScenes[0].on("enter", function (event) {
        clearInterval(inter1);
    });

    animationsScenes[0].on("leave", function (event) {
        if (event.target.controller().info('scrollDirection') === 'REVERSE') {
            coverAnimation();
        } else {
            clearInterval(inter1);
        }
    });
    
    animationsScenes[1].on("enter", function (event) {
        SRanimation.play();
    });
    
    animationsScenes[2].on("enter", function (event) {
        SIanimation.play();
    });
    
    animationsScenes[3].on("enter", function (event) {
        setTimeout(function(){
            $('.ds-structure-tag1').addClass('ds-scale-animation');
        }, 100);
        setTimeout(function(){
            $('.ds-structure-tag2').addClass('ds-scale-animation');
        }, 400);
    });

    for  (var y = 0; y < transitsScrScenes.length; y++) {
        if (y === transitsScrScenes.length - 1) {
            transitionAni(y, true);
        } else {
            transitionAni(y);
        }
    }

    function transitionAni(num, bol) {
        transitsScrScenes[num].on("enter", function (event) {
            activeMenu(num+3);

            if (bol === true) {
                slidesScenes[0].removePin(slides[0]);
            }
        });
        transitsScrScenes[num].on("leave", function (event) {
            if (event.target.controller().info('scrollDirection') === 'REVERSE') {
                activeMenu(num+2);
                if (bol === true) {
                    slidesScenes[0].setPin(slides[0]);
                }
            }
        });
    }

    function coverAnimation() {
        var windowheight = $(window).height();
    
        inter1 = setInterval(function(){

            $('.ds-screen-cover').css('opacity', (windowheight/2-controller.scrollPos())/(windowheight/2));

            if (controller.scrollPos() >= (windowheight - 160)) {
                $("#overviewContent").css({"padding-top": "0", "opacity": "1"});
                squaresSmall();
                whiteMenu(false);
                activeMenu(2);
            } else {
                $("#overviewContent").css({"padding-top": "48px", "opacity": "0.5"});
                $(".ds-sidebar").addClass('text-white');
                $('.ds-sidebar li').removeClass('active');  
            }
        }, 80);
    }  
});

//change side bar color
var whiteMenu = function(bol) {
    if (bol) {
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-sidebar").removeClass('text-white');
    }
};

var activeMenu = function(show) {
    $('.ds-sidebar li').removeClass('active');
    $('a[href="#dsMenuScreen'+show+'"]').parents('li').addClass('active');
    switch(show) {
        case 1:
            whiteMenu(true);
            break;
        case 6:
            if ($('.ds-screen6').hasClass('ds-visual')) {
                whiteMenu(false);
            }
            break;
        case 7:
            if ($('.ds-screen7').hasClass('ds-visual')) {
                whiteMenu(true);
            }
            break;
        case 8:
            if ($('.ds-screen8').hasClass('ds-visual')) {
                whiteMenu(false);
            }
            break;
        default:
            return false;
    }
};
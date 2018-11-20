var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 0.8
    }
});

var menuController = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});

var transitsScreen = $('a[class*="ds-transition-screen"]');
var menuScreen = $('a[class*="ds-menu-anchor"]');
var transitsSection = $('a[class*="ds-transition-section"]');
var animations = $('.ds-animation-trigger');

var transitsScrScenes = [];
var menuScrScenes = [];
var transitsSecScenes = [];
var animationsScenes = [];

var tweensScreen = [];
var tweensSection = [];
var inter1;

$(document).ready(function() {
    coverAnimation();


    for  (var m = 0; m < transitsScreen.length; m++) {
        tweensScreen[m]= TweenMax.to('#dsTransitScreen'+m, 1, {opacity: 1, ease: Power4.easeOut});

        transitsScrScenes[m] = new ScrollMagic.Scene({
            triggerElement: transitsScreen[m]
        })
        .setTween(tweensScreen[m])
        .duration(100)
        .addTo(controller);
        //.addIndicators({name: "transition"+m});
    }

    for  (var z = 0; z < menuScreen.length; z++) {
        menuScrScenes[z] = new ScrollMagic.Scene({
            triggerElement: menuScreen[z]
        })
        .addTo(menuController);
        //.addIndicators({name: "menu"+z});
    }

   for  (var x = 0; x < transitsSection.length; x++) {

        tweensSection[x]= TweenMax.to('#dsTransitSection'+x, 1, {opacity: 1, ease: Power4.easeOut});

        transitsSecScenes[x] = new ScrollMagic.Scene({
            triggerElement: transitsSection[x]
        })
        .setTween(tweensSection[x])
        .duration(100)
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

    animationsScenes[0].on("enter", function (event) {
        squaresSmall();
        whiteMenu(false);
        clearInterval(inter1);
    });

    animationsScenes[0].on("leave", function (event) {
        if (event.target.controller().info('scrollDirection') === 'REVERSE') {
            coverAnimation();
            whiteMenu(true);
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
        $('.ds-structure-tag1').addClass('ds-scale-animation');
    });
    animationsScenes[4].on("enter", function (event) {
        $('.ds-structure-tag2').addClass('ds-scale-animation');
    });

    for  (var y = 0; y < menuScrScenes.length; y++) {
        transitionAni(y);
    }

    function transitionAni(num) {
        menuScrScenes[num].on("enter", function (event) {
            activeMenu(num);
            $('.ds-screen-cover').css('opacity', '0');
        });
        menuScrScenes[num].on("leave", function (event) {
            if (event.target.controller().info('scrollDirection') === 'REVERSE') {
                activeMenu(num-1);
            }
        });
    }

    function coverAnimation() {
        var windowheight = $(window).height();
    
        inter1 = setInterval(function(){

            $('.ds-screen-cover').css('opacity', (windowheight/2-controller.scrollPos())/(windowheight/2));

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
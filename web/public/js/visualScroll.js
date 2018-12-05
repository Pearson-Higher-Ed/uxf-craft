var menuBW = $('a[class*="ds-menu-transition"]'),
    menuTranScenes = [];

for  (var o = 0; o < menuBW.length; o++) {
    menuTranScenes[o] = new ScrollMagic.Scene({
        triggerElement: menuBW[o]
    })
    .addTo(menuController)
    .addIndicators({name: "transition"+o});
}

menuTranScenes[0].on("enter", function (event) {
    $('#dsSidebar').addClass('text-white');
});

menuTranScenes[0].on("leave", function (event) {
    $('#dsSidebar').removeClass('text-white');
});

menuTranScenes[1].on("enter", function (event) {
    $('#dsSidebar').removeClass('text-white');
});

menuTranScenes[1].on("leave", function (event) {
    $('#dsSidebar').addClass('text-white');
});

$(document).ready(function() {
    //cover animation
    $('.ds-cover-waves:first-child').addClass('ds-wave-animation00');
    $('.ds-cover-waves:nth-child(2)').addClass('ds-wave-animation01');
    $('.ds-cover-waves:nth-child(3)').addClass('ds-wave-animation02');

    animationsScenes[0].on("enter", function (event) {
        whiteMenu(false);
        clearInterval(coverInter);
    });

    animationsScenes[0].on("leave", function (event) {
        if (event.target.controller().info('scrollDirection') === 'REVERSE') {
            coverTransition();
            whiteMenu(true);
        } else {
            clearInterval(coverInter);
        }
    });

    animationsScenes[1].on("enter", function (event) {
        CDD00animation.play();
    });
    animationsScenes[2].on("enter", function (event) {
        CDD01animation.play();
    });
    animationsScenes[3].on("enter", function (event) {
        CDD02animation.play();
    });
    animationsScenes[4].on("enter", function (event) {
        CDD03animation.play();
    });
    animationsScenes[5].on("enter", function (event) {
        CDD04animation.play();
    });
    animationsScenes[6].on("enter", function (event) {
        CDD05animation.play();
    });
    animationsScenes[7].on("enter", function (event) {
        $('.ds-type-text').addClass('ds-type-animation');
    });
    animationsScenes[8].on("enter", function (event) {
        icons00animation.play();
    });
    animationsScenes[9].on("enter", function (event) {
        icons01animation.play();
    });
    animationsScenes[10].on("enter", function (event) {
        HTanimation.play();
    });
    animationsScenes[11].on("enter", function (event) {
        illusAnimation.play();
    });
});
var CDD00animation = createLottie('colorDoDont00'),
    CDD01animation = createLottie('colorDoDont01'),
    CDD02animation = createLottie('colorDoDont02'),
    CDD03animation = createLottie('colorDoDont03'),
    CDD04animation = createLottie('colorDoDont04'),
    CDD05animation = createLottie('colorDoDont05'),
    HTanimation = createLottie('hintText'),
    illusAnimation = createLottie('illustration'),
    icons00animation = createLottie('icons00'),
    icons01animation = createLottie('icons01'),
    typo00animation = createLottie('typography00'),
    typo01animation = createLottie('typography01');


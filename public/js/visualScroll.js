var menuBW = $('a[class*="ds-menu-transition"]'),
    menuTween= [],
    menuTranScenes = [];

menuTween[0] = TweenMax.to('#dsSidebar', 1, {className: '+=text-white', ease: Power4.easeOut});
menuTween[1] = TweenMax.to('#dsSidebar', 1, {className: '-=text-white', ease: Power4.easeOut});

for  (var o = 0; o < menuBW.length; o++) {
    menuTranScenes[o] = new ScrollMagic.Scene({
        triggerElement: menuBW[o]
    })
    .setTween(menuTween[o])
    .duration(200)
    .addTo(controller)
    .addIndicators({name: "transition"+m});
}

$(document).ready(function() {
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
        typo00animation.play();
    });
    animationsScenes[8].on("enter", function (event) {
        typo01animation.play();
    });
    animationsScenes[9].on("enter", function (event) {
        icons00animation.play();
    });
    animationsScenes[10].on("enter", function (event) {
        icons01animation.play();
    });
    animationsScenes[11].on("enter", function (event) {
        HTanimation.play();
    });
    animationsScenes[12].on("enter", function (event) {
        illusAnimation.play();
    });
});
var CDD00animation = createLottie('colorDoDont00');
var CDD01animation = createLottie('colorDoDont01');
var CDD02animation = createLottie('colorDoDont02');
var CDD03animation = createLottie('colorDoDont03');
var CDD04animation = createLottie('colorDoDont04');
var CDD05animation = createLottie('colorDoDont05');
var HTanimation = createLottie('hintText');
var illusAnimation = createLottie('illustration');
var icons00animation = createLottie('icons00');
var icons01animation = createLottie('icons01');
var typo00animation = createLottie('typography00');
var typo01animation = createLottie('typography01');


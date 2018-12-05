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

var transitsScreen = $('a[class*="ds-transition-screen"]'),
    menuScreen = $('a[class*="ds-menu-active-anchor"]'),
    transitsSection = $('a[class*="ds-transition-section"]'),
    animations = $('.ds-animation-trigger');

var transitsScrScenes = [],
    menuScrScenes = [],
    transitsSecScenes = [],
    animationsScenes = [];

var tweensScreen = [],
    tweensSection = [];

var coverInter;

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


function menuTransition(num) {
    menuScrScenes[num].on("enter", function (event) {
        activeMenu(num);
        $('.ds-screen-cover').css({'opacity': '0', 'display': 'none'});
        clearInterval(coverInter);
    });
    menuScrScenes[num].on("leave", function (event) {
        if (event.target.controller().info('scrollDirection') === 'REVERSE') {
            if (num==0) {
                $('.ds-sidebar li').removeClass('active');
                $('.ds-screen-cover').css('display', 'block'); 
                coverTransition();
            } else {
                activeMenu(num-1);
            }
        }
    });
    
}

function coverTransition() {
    var windowheight = $(window).height();

    coverInter = setInterval(function(){
        $('.ds-screen-cover').css('opacity', (windowheight/2-controller.scrollPos())/(windowheight/2));
    }, 80);
} 

function whiteMenu(bol) {
    if (bol) {
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-sidebar").removeClass('text-white');
    }
};

function activeMenu(show) {
    $('.ds-sidebar li').removeClass('active');
    $('a[href="#dsMenuScreen'+show+'"]').parents('li').addClass('active');
};

$(document).ready(function() {
    coverTransition();

    for  (var y = 0; y < menuScrScenes.length; y++) {
        menuTransition(y);
    } 
});

//remove focus outline on anchors
$('#dsSidebar a').click(function() {
    let target = $(this).attr('href').slice(1);
    console.log('clicked');
    setTimeout(() => {
        $(".ds-menu-position-anchor[name='"+target+"']").blur();  
    }, 100);
});
$(document).ready(function() {
    //cover animation
    var fillTheGrid = function(timeInter, numArray) {
        setTimeout(function() {
            $.each(numArray, function(index, item){
                $('.ds-cover .ds-grid-fill'+item).addClass('ds-grid-opacity'+item);
            });
        }, timeInter);
    };

    fillTheGrid(200, [2, 8, 10, 12]);
    fillTheGrid(400, [4, 6]);
    fillTheGrid(600, [1, 3, 5, 7]);
    fillTheGrid(800, [9, 11]);
    coverTransition();

    animationsScenes[0].on("enter", function (event) {
        squaresSmall();
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
});

var SRanimation = createLottie('spacingRedlines'),
    SIanimation = createLottie('spaceIncrement');

function squaresSmall() {
    setTimeout(function(){
        $(".ds-whsp-rect").animate({height: "258px", opacity: '0.5'}, 800, "easeOutSine");
        $(".ds-gray-border").animate({ height: "55%" }, 800, "easeOutSine");
        $('.ds-whsp-rect:nth-child(2)').removeClass('dpr-1');
        $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','10');
        $('.ds-whsp-rect:last-child').removeClass('dpl-1');
        $('.ds-whsp-rect:last-child').css('grid-column-start','15');
        $('.ds-whsp-rect21').removeClass('smb-1');
        $('.ds-whsp-rect21').addClass('dmb-1');
        $('.ds-whsp-rect22').removeClass('dmt-1');
        $('.ds-whsp-rect22').addClass('dmt-1');
    }, 100);
};

function squaresBig() {
    for (var m = 1; m < 9; m++) {
        $(".ds-overview .ds-layout-grid:nth-child("+ m + ")").css('height', '0');
    }
    $(".ds-whsp-rect").css('height', '376px');
    $(".ds-whsp-rect").css('opacity', '1');
    $('.ds-whsp-rect:nth-child(2)').addClass('dpr-1');
    $('.ds-whsp-rect:nth-child(2)').css('grid-column-end','11');
    $('.ds-whsp-rect:last-child').addClass('dpl-1');
    $('.ds-whsp-rect:last-child').css('grid-column-start','14');
    $('.ds-whsp-rect21').addClass('smb-1');
    $('.ds-whsp-rect21').removeClass('dmb-1');
    $('.ds-whsp-rect22').addClass('dmt-1');
    $('.ds-whsp-rect22').removeClass('dmt-1');
};

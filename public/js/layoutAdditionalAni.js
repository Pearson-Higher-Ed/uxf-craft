//additional animations
var layoutScreen2Show = function() {

    // setTimeout(function(){
    //     for (var m = 1; m < 9; m++) {
    //         $(".ds-screen2 .ds-layout-grid:nth-child("+ m + ")").animate({height: "70vh"}, 800, "easeOutSine");
    //     }
    // }, 500); 

    setTimeout(function(){
        $(".ds-whsp-rect").animate({height: "258px", opacity: '0.5'}, 800, "easeOutSine");
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

var layoutScreen3Dis = function() {
    for (var m = 1; m < 9; m++) {
        $(".ds-screen2 .ds-layout-grid:nth-child("+ m + ")").css('height', '0');
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

var followingAdditionlAni = function(num) {
    var sections = [];
    var n = num.toString();
    for (var i = 1; i < 4; i ++) {
        if ($("#dsSection" + n + i).length) {
            sections[i-1] = $("#dsSection" + n + i).offset().top - 700;
        }
    }
    
    var interval1 = setInterval(function() {
        if ( sections[0] <= $('html, body').scrollTop()) {
            followingAni(num, false, 1);
            clearInterval(interval1); 
        }
    }, 100);

    var interval2 = setInterval(function() {
        if ( sections[1] <= $('html, body').scrollTop() && $('html, body').scrollTop() < sections[2]) {
            followingAni(num, false, 2); 
            clearInterval(interval2);
        }
    }, 100);

    var interval3 = setInterval(function() {
        if ( sections[2] <= $('html, body').scrollTop()) {
            followingAni(num, false, 3); 
            clearInterval(interval3);
        }
    }, 100);
};
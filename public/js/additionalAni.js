//additional animation dispatcher
var additionalAni = function(num) {
    switch(num) {
        case 2:
            if ($('.ds-screen2').hasClass('ds-layout')) {
                layoutScreen2Show();
            }
            break;
        case 3:
            if ($('.ds-screen3').hasClass('ds-layout')) {
                playVideo('grid-video');
            }
            break;
        case 4:
            if ($('.ds-screen4').hasClass('ds-layout')) {
                playVideo('bp-video');
            }
            break;
        case 5:
            // if ($('.ds-screen7').hasClass('ds-visual')) {
            //     $(".ds-sidebar").removeClass('text-white');
            // }
            if ($('.ds-screen5').hasClass('ds-layout')) {
                followingAdditionlAni(5);
            }
            break;
        case 6:
            // if ($('.ds-screen7').hasClass('ds-visual')) {
            //     $(".ds-sidebar").addClass('text-white');
            // }
            if ($('.ds-screen6').hasClass('ds-layout')) {
                followingAdditionlAni(6);
            }
            break;
        case 7:
            if ($('.ds-screen7').hasClass('ds-layout')) {
                setTimeout(function(){
                    $('.ds-structure-tag1').addClass('ds-scale-animation');
                }, 1000);
                setTimeout(function(){
                    $('.ds-structure-tag2').addClass('ds-scale-animation');
                }, 1500);
            }
            break;
        default:
            return false;
    }
};
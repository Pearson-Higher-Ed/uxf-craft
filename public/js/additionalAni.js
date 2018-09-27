//additional animation dispatcher
var additionalAni = function(num) {
    switch(num) {
        case 2:
            if ($('.ds-screen2').hasClass('ds-layout')) {
                layoutScreen2Show();
            }
            break;
        // case 4:
        //     if ($('.ds-screen3').hasClass('ds-layout')) {
        //         layoutScreen3Dis();
        //     }
        //     break;
        case 6:
            if ($('.ds-screen7').hasClass('ds-visual')) {
                $(".ds-sidebar").removeClass('text-white');
            }
            if ($('.ds-screen6').hasClass('ds-layout')) {
                followingAdditionlAni(6);
            }
            break;
        case 7:
            if ($('.ds-screen7').hasClass('ds-visual')) {
                $(".ds-sidebar").addClass('text-white');
            }
            if ($('.ds-screen7').hasClass('ds-layout')) {
                followingAdditionlAni(7);
            }
            break;
        case 8:
            if ($('.ds-screen8').hasClass('ds-layout')) {
                setTimeout(function(){
                    $('.ds-screen8 .tag1').addClass('ds-scale-animation');
                }, 1000);
                setTimeout(function(){
                    $('.ds-screen8 .tag2').addClass('ds-scale-animation');
                }, 1500);
            }
            break;
        default:
            return false;
    }
};
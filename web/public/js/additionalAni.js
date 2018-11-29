//additional animation dispatcher
var additionalAni = function(num) {
    switch(num) {
        case 2:
            if ($('.ds-screen2').hasClass('ds-layout')) {
                layoutScreen2Show();
            }
            break;
        case 3:
            // if ($('.ds-screen3').hasClass('ds-layout')) {
            //     playVideo('grid-video');
            // }
            if ($('.ds-screen3').hasClass('ds-visual')) {
                visualScreen3();
            }
            
            break;
        case 4:
            if ($('.ds-screen4').hasClass('ds-visual')) {
                visualScreen4();
            }
            break;
        case 5:
            if ($('.ds-screen5').hasClass('ds-layout')) {
                followingAdditionlAni(5);
                layoutScreen5();
            }
            if ($('.ds-screen5').hasClass('ds-visual')) {
                visualScreen5();
            }
            break;
        case 6:
            if ($('.ds-screen6').hasClass('ds-layout')) {
                followingAdditionlAni(6);
            }
            if ($('.ds-screen6').hasClass('ds-visual')) {
                visualScreen6();
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
        case 8:
            if ($('.ds-screen8').hasClass('ds-visual')) {
                visualScreen8();
            }
            break;
        case 10:
            if ($('.ds-screen10').hasClass('ds-visual')) {
                visualScreen10();
            }
            break;
        case 11:
            if ($('.ds-screen11').hasClass('ds-visual')) {
                visualScreen11();
            }
            break;
        case 14:
            if ($('.ds-screen14').hasClass('ds-visual')) {
                visualScreen14();
            }
            break;
        default:
            return false;
    }
};
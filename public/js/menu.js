$('.ds-sidebar a').click(function(event) {
    $('.ds-sidebar li').removeClass('active');
    $(this).parents('li').addClass('active');

    var num = parseInt($(this).attr('href').slice(13));

    switch(num) {
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
    //setTimeout(function(){location.href = '#dsMenuScreen' + num;}, 1000);
});
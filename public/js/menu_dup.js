$('.ds-sidebar a').click(function() {
    $('.ds-sidebar li').removeClass('active');
    $(this).parents('li').addClass('active');

    var num = parseInt($(this).attr('href').slice(9));

    if (num === 1) {
        whiteMenu(true);
    } else if ($('.ds-screen' + num).has('.ds-type-bg').length) {
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-sidebar").removeClass('text-white');
    }

    screenAnimation(num);
});
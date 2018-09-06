$('.ds-sidebar a').click(function() {
    $('.ds-sidebar li').removeClass('active');
    $(this).parents('li').addClass('active');

    var num = parseInt($(this).attr('href').slice(9));

    if ($('.parallax-main').hasClass('d-none')) {
        $('.parallax-main').removeClass('d-none');
        $('.ds-screen-cover').css({"top": "10vh", "opacity": "0"});
        whiteMenu(false);
    }

    if ($('.ds-screen' + num).has('.ds-type-bg').length) {
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-sidebar").removeClass('text-white');
    }

    screenAnimation(num);
});
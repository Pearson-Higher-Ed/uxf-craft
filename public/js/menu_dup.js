$('.ds-sidebar a').click(function(event) {
    $('.ds-sidebar li').removeClass('active');
    $(this).parents('li').addClass('active');

    var num = parseInt($(this).attr('href').slice(13));

    if (num === 1) {
        whiteMenu(true);
    } else if ($('.ds-screen' + num).has('.ds-type-bg').length) {
        $(".ds-sidebar").addClass('text-white');
    } else {
        $(".ds-sidebar").removeClass('text-white');
    }
    setTimeout(function(){location.href = '#dsMenuScreen' + num;}, 1000);
});
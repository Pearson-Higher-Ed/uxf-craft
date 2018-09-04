$('.ds-sidebar a').click(function() {
    $('.ds-sidebar li').removeClass('active');
    $(this).parents('li').addClass('active');

    var num = $(this).attr('href').slice(9);
    console.log(num);

    if ($('.parallax-main').hasClass('d-none')) {
        $('.parallax-main').removeClass('d-none');
        $('.ds-screen-cover').css({"top": "10vh", "opacity": "0"});
        whiteMenu(false);
    }
    
    $('[class^="ds-screen"]').removeClass('on-screen');
    $('.ds-screen' + num).addClass('on-screen');
    setTimeout(function(){
        $(".ds-screen" + num + " .ds-main-content").animate({marginTop: "100px"}, "slow", "swing");
    }, 800);
});
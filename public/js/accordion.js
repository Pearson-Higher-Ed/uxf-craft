$('.accordion-button').click(function() {
    var id = $(this).attr('aria-controls');
    var totoalh = $('#' + id)[0].scrollHeight;
    console.log($('#' + id)[0].scrollHeight);
    if ($(this).attr('aria-expanded') == 'false') {
        $(this).attr('aria-expanded', 'true');
        $(this).addClass('ds-animate');
        $('#' + id).css('max-height', totoalh + 'px');
        $('#' + id).attr('aria-hidden', 'false');
    } else if ($(this).attr('aria-expanded') == 'true') {
        $(this).attr('aria-expanded', 'false');
        $(this).removeClass('ds-animate');
        $('#' + id).css('max-height', '0');
        $('#' + id).attr('aria-hidden', 'true');
    }
});
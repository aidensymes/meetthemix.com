var colors = ['#4F91CD', '#FF8400', '#FFCB02', '#FFFFFF'];

$(document).ready(function() {
  $('.remix').click(function() {
    var ranNum = Math.floor(Math.random() * colors.length);
    var newColor = colors[ranNum];
    $('html').css('background-color', newColor);
    $('.rule--light').css('border-color', newColor);
    $('.footer__social, #footer__caption, .remix, h1').css('color', newColor);
    $('.footer__logo').css('fill', newColor);
    setup();
  });
});

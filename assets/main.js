var colors = ['#4F91CD', '#FF8400', '#FFCB02', '#FFFFFF'];

$(document).ready(function() {
  $('#remix--button').click(function() {
    var ranNum = Math.floor(Math.random() * 4);
    var newColor = colors[ranNum];
    console.log(ranNum);
    $('html, body').css('background-color', newColor);
    $('.rule--light').css('border-color', newColor);
    $('.footer__social, h2, h1').css('color', newColor);
    $('.footer__logo').css('fill', newColor);
  });
});

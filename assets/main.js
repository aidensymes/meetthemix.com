var colors = ['#4F91CD', '#FF8400', '#FFCB02', '#FFFFFF'];
var current;

$(document).ready(function() {
  $('#remix--button').click(function() {
    var ranNum = Math.floor(Math.random() * colors.length);
    if (ranNum == current) {
      if (ranNum == 0) {
        ranNum += 1;
      } else if (ranNum == colors.length - 1) {
        ranNum -= 1;
      }
    }
    current = ranNum;
    var newColor = colors[ranNum];
    $('html, body').css('background-color', newColor);
    $('.rule--light').css('border-color', newColor);
    $('.footer__social, h2, h1').css('color', newColor);
    $('.footer__logo').css('fill', newColor);
  });
});

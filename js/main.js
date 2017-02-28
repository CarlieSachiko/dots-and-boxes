  ////////////////
 //HOME PAGE JS//
////////////////

//VARIABLES//
var $playbtn = $('div#play');
var $html = $('html');

//FUNCTIONS//
$(function () {
    var backgrounds = [
      'url(http://i.imgur.com/OtxkMsF.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/gRbWvzv.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/fXfnL69.jpg) no-repeat center center fixed'
      ];
    var current = 0;

    function nextBackground() {
        $html.css({
            'background':
        backgrounds[current = ++current % backgrounds.length], 'background-size': 'cover'});

        setTimeout(nextBackground, 1000);
    }
    setTimeout(nextBackground, 1000);
    $html.css('background', backgrounds[0]);
});


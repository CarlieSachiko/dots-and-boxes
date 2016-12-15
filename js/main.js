  ////////////////
 //HOME PAGE JS//
////////////////

//VARIABLES//
var $playbtn = $('div#play');
var $html = $('html');

//FUNCTIONS//
$(function () {
    var backgrounds = [
      'url(http://i.imgur.com/2AKSUaT.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/jMEuJo6.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/gsDnbu2.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/VHdQHzT.jpg) no-repeat center center fixed',
      'url(http://i.imgur.com/SIaBwPB.jpg) no-repeat center center fixed',
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


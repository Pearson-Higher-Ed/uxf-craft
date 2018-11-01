var SRanimation = createLottie('spacingRedlines');
var SIanimation = createLottie('spaceIncrement');
var CDD00animation = createLottie('colorDoDont00');
var CDD01animation = createLottie('colorDoDont01');
var CDD02animation = createLottie('colorDoDont02');
var CDD03animation = createLottie('colorDoDont03');
var CDD04animation = createLottie('colorDoDont04');
var CDD05animation = createLottie('colorDoDont05');
var HTanimation = createLottie('hintText');
var illusAnimation = createLottie('illustration');
var icons00animation = createLottie('icons00');
var icons01animation = createLottie('icons01');
var typo00animation = createLottie('typography00');
var typo01animation = createLottie('typography01');

function createLottie(lottieName) {
  var anipath = '/public/data/'+ lottieName + '.json';
  return bodymovin.loadAnimation({
    container: document.getElementById(lottieName),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: anipath
  });
}

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

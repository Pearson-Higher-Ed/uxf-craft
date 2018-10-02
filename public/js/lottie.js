var SRanimation = bodymovin.loadAnimation({
  container: document.getElementById('spacingRedlines'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/public/data/spacingRedlines.json'
});

var SIanimation = bodymovin.loadAnimation({
    container: document.getElementById('spaceIncrement'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/public/data/spaceIncrement.json'
});

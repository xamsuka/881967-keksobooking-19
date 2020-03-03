'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPins = document.createDocumentFragment();

  var generateMap = function () {
    for (var j = 1; j < window.data.generateAd.length; j++) {
      fragmentPins.appendChild(createPin(window.data.generateAd[j]));
    }
    mapPins.appendChild(fragmentPins);
  };

  var createPin = function (pinAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinAd.location.x + 'px';
    pinElement.style.top = pinAd.location.y + 'px';
    pinElement.querySelector('img').src = pinAd.author.avatar;
    pinElement.querySelector('img').alt = pinAd.offer.title;
    return pinElement;
  };

  window.map = {
    generateMap: generateMap
  };
})();

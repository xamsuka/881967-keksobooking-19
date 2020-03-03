'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPins = document.createDocumentFragment();
  var onGenerateMap = function (ads) {
    for (var j = 1; j < ads.length; j++) {
      fragmentPins.appendChild(createPin(ads[j]));
    }
    mapPins.appendChild(fragmentPins);
    window.card.renderCards(ads);
  };

  var onError = function (errorMessage) {
    var map = document.querySelector('.map');
    var errorTemplate = document.querySelector('#error').content;
    var error = errorTemplate.cloneNode(true);
    var blockErrorMessage = error.querySelector('.error__message');
    blockErrorMessage.textContent = errorMessage;
    map.appendChild(error);
    var buttonError = document.querySelector('.error__button');

    buttonError.addEventListener('click', function () {
      var errorBlock = document.querySelector('.error');
      errorBlock.remove();
      activeMap();
    });
  };

  var createPin = function (pinAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinAd.location.x + 'px';
    pinElement.style.top = pinAd.location.y + 'px';
    pinElement.querySelector('img').src = pinAd.author.avatar;
    pinElement.querySelector('img').alt = pinAd.offer.title;
    return pinElement;
  };

  var activeMap = function () {
    window.backend.loadAds(onGenerateMap, onError);
    window.form.activeForm();
  };

  window.map = {
    activeMap: activeMap,
  };
})();

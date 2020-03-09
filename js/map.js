'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var form = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');

  var onGenerateMap = function (ads) {
    var fragmentPins = document.createDocumentFragment();

    for (var j = 1; j < ads.length; j++) {
      if (ads[j].hasOwnProperty('offer')) {
        fragmentPins.appendChild(createPin(ads[j]));
      }
    }
    mapPins.appendChild(fragmentPins);
    window.card.renderCards(ads);
  };

  var onSuccess = function () {
    window.popup.openPopupModal();
    window.map.disabledMap();
  };

  var onError = function (errorMessage) {
    window.map.disabledMap();
    window.popup.openErrorModal(errorMessage);
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
    mapBlock.classList.remove('map--faded');
    window.form.statusForm();
  };

  var disabledMap = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
    window.pin.setDefaultPosition();
    window.form.statusForm();
    mapBlock.classList.add('map--faded');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.uploadAd(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  window.map = {
    activeMap: activeMap,
    disabledMap: disabledMap
  };


})();

'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPins = document.createDocumentFragment();
  var form = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');

  var onGenerateMap = function (ads) {
    for (var j = 1; j < ads.length; j++) {
      fragmentPins.appendChild(createPin(ads[j]));
    }
    mapPins.appendChild(fragmentPins);
    window.card.renderCards(ads);
  };

  var onSuccess = function () {
    window.popup.openPopupModal();
    window.form.statusForm();
  };

  var onError = function (errorMessage) {
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
  };

  form.addEventListener('submit', function (evt) {
    window.backend.uploadAd(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  window.map = {
    activeMap: activeMap,
  };


})();

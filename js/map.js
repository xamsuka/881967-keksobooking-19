'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPins = document.createDocumentFragment();

  var onCardEscPress = function (evt) {
    window.util.isEscPress(evt, closeCard);
  };

  var closeCard = function () {
    var popupModal = document.querySelector('.map__card');
    if (popupModal) {
      popupModal.remove();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var mountedCard = function (card) {
    var popupButtonClose = card.querySelector('.popup__close');
    popupButtonClose.addEventListener('click', function () {
      closeCard();
    });
  };

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

  var renderCard = function (pinAd) {
    var popupModal = document.querySelector('.map__card');
    if (popupModal) {
      popupModal.remove();
    }
    var card = window.card.createCard(pinAd);
    mountedCard(card);
    mapPins.appendChild(card);
    document.addEventListener('keydown', onCardEscPress);
  };

  var renderCards = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        renderCard(window.data.generateAd[index + 1]);
      });
    });
  };

  window.map = {
    generateMap: generateMap,
    renderCards: renderCards
  };
})();

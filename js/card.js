'use strict';

(function () {

  var houseTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var fragmentCard = document.createDocumentFragment();
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var infoAdPopup = template.cloneNode(true);
  var popupAdAvatar = infoAdPopup.querySelector('.popup__avatar');
  var popupAdTitle = infoAdPopup.querySelector('.popup__title');
  var popupAdAdress = infoAdPopup.querySelector('.popup__text--address');
  var popupAdPrice = infoAdPopup.querySelector('.popup__text--price');
  var popupAdType = infoAdPopup.querySelector('.popup__type');
  var popupAdCapacity = infoAdPopup.querySelector('.popup__text--capacity');
  var popupAdCheckin = infoAdPopup.querySelector('.popup__text--time');
  var popupAdDescription = infoAdPopup.querySelector('.popup__description');
  var popupAdPhotos = infoAdPopup.querySelector('.popup__photos');
  var mapPins = document.querySelector('.map__pins');

  var renderFeatures = function (pin, pinFeatures) {
    var popupAdFeatures = pinFeatures.querySelector('.popup__features').children;
    for (var i = 0; i < popupAdFeatures.length; i++) {
      var featreElement = popupAdFeatures[i];
      for (var k = 0; k < pin.offer.features.length; k++) {
        var features = pin.offer.features[k];

        if (featreElement.classList.contains('popup__feature--' + features)) {
          featreElement.style.display = 'none';
        }
      }
    }
  };

  var renderAdPhoto = function (pinAd) {
    var fragmentPhotos = document.createDocumentFragment();
    var templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');
    for (var i = 0; i < pinAd.offer.photos.length; i++) {
      var photoCard = templatePhoto.cloneNode();
      photoCard.src = pinAd.offer.photos[i];
      fragmentPhotos.appendChild(photoCard);
    }
    return fragmentPhotos;
  };

  var createCard = function (pinAd) {
    popupAdAvatar.src = pinAd.author.avatar;
    popupAdTitle.textContent = pinAd.offer.title;
    popupAdAdress.textContent = pinAd.offer.address;
    popupAdPrice.textContent = pinAd.offer.price + ' ₽/ночь';
    popupAdType.textContent = houseTypes[pinAd.offer.type];
    popupAdCapacity.textContent = pinAd.offer.rooms + ' комнаты для ' + pinAd.offer.guests + ' гостей';
    popupAdCheckin.textContent = 'Заезд после ' + pinAd.offer.checkin + ', выезд до ' + pinAd.offer.checkout;

    renderFeatures(pinAd, infoAdPopup);
    popupAdDescription.textContent = pinAd.offer.description;
    popupAdPhotos.innerHTML = '';
    popupAdPhotos.appendChild(renderAdPhoto(pinAd));
    fragmentCard.appendChild(infoAdPopup);
    return fragmentCard;
  };

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

  var renderCard = function (pinAd) {
    var popupModal = document.querySelector('.map__card');
    if (popupModal) {
      popupModal.remove();
    }
    var card = createCard(pinAd);
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

  window.card = {
    createCard: createCard,
    renderCards: renderCards
  };

})();



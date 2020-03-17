'use strict';

(function () {
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var infoAdPopup = templateCard.cloneNode(true);
  var cardAdFeatures = Array.from(infoAdPopup.querySelector('.popup__features').children);
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

  var renderFeatures = function (pin, features) {
    var blockFeatures = infoAdPopup.querySelector('.popup__features');
    blockFeatures.innerHTML = '';
    if (pin.offer.features.length > 0) {
      blockFeatures.style.display = 'block';
      var fragmentFeatures = document.createDocumentFragment();
      pin.offer.features.forEach(function (pinFeature) {
        for (var j = 0; j < features.length; j++) {
          if (features[j].classList.contains('popup__feature--' + pinFeature)) {
            fragmentFeatures.appendChild(features[j]);
            break;
          }
        }
      });
      blockFeatures.appendChild(fragmentFeatures);
    } else {
      blockFeatures.style.display = 'none';
      blockFeatures.innerHTML = '';
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
    popupAdType.textContent = window.data.getHouseMap[pinAd.offer.type].label;
    popupAdCapacity.textContent = pinAd.offer.rooms + ' комнаты для ' + pinAd.offer.guests + ' гостей';
    popupAdCheckin.textContent = 'Заезд после ' + pinAd.offer.checkin + ', выезд до ' + pinAd.offer.checkout;

    renderFeatures(pinAd, cardAdFeatures);
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
    var pinActive = document.querySelector('.map__pin--active');
    if (popupModal) {
      popupModal.remove();
    }
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var mountingToCard = function (card) {
    var popupButtonClose = card.querySelector('.popup__close');
    popupButtonClose.addEventListener('click', function () {
      closeCard();
    });
  };

  var renderCard = function (pinAd) {
    var pinActive = document.querySelector('.map__pin--active');
    var popupModal = document.querySelector('.map__card');
    if (popupModal) {
      popupModal.remove();
      pinActive.classList.remove('map__pin--active');
    }
    var card = createCard(pinAd);
    mountingToCard(card);
    mapPins.appendChild(card);
    document.addEventListener('keydown', onCardEscPress);
  };

  var startRenderCards = function (ads) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        renderCard(ads[index]);
        pin.classList.add('map__pin--active');
      });
    });
  };

  window.card = {
    executeCreateCard: createCard,
    executeRenderCards: startRenderCards,
    executeCloseCard: closeCard
  };

})();



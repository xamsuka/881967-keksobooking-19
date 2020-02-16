'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var FILTER_HEIGHT = 46;
var amountAd = 8;
var adTitles = ['1 комнатная квартира', '2х комнатная хата', 'очень большая квартира', 'Очень маленькая квартира', 'Пиздец какая дорогая', 'Элитная квартира', '3х комнатная квартира', '5ти комнатная'];
var adAddresses = ['Мира, 10', 'Крупской, 5', 'Фрунзе, 14', 'Красная, 15б'];
var adPrices = [35000, 15000, 45000, 13333, 50000, 70000, 180000, 23000, 123555, 15000, 5555];
var adTypes = ['palace', 'flat', 'house', 'bungalo'];
var adRooms = [1, 2, 3, 4, 5, 6, 7];
var adGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var adCheckings = ['12:00', '13:00', '14:00'];
var adCheckouts = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adDescriptions = ['Всё ок', 'Очень хорошая квартира', 'Просто нет слов'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapBlock = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPins = document.createDocumentFragment();
var houseTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

mapBlock.classList.remove('map--faded');

var getRandomElement = function (arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var generateAds = function () {
  var ad = [];
  for (var i = 1; i < amountAd + 1; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: getRandomElement(adTitles),
        address: getRandomElement(adAddresses),
        price: getRandomElement(adPrices),
        type: getRandomElement(adTypes),
        rooms: getRandomElement(adRooms),
        guests: getRandomElement(adGuests),
        checkin: getRandomElement(adCheckings),
        checkout: getRandomElement(adCheckouts),
        features: adFeatures.slice(getRandomArbitary(0, adFeatures.length), adFeatures.length),
        description: getRandomElement(adDescriptions),
        photos: adPhotos.slice(getRandomArbitary(0, adPhotos.length), adPhotos.length)
      },

      location: {
        x: getRandomArbitary(0, mapBlock.clientWidth - PIN_WIDTH),
        y: getRandomArbitary(130, mapBlock.clientHeight - PIN_HEIGHT - FILTER_HEIGHT)
      }
    };
  }

  return ad;
};

var closeAdCard = function (evt) {
  var target = evt.target;
  target.offsetParent.remove();
};

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
  var template = document.querySelector('#card').content.querySelector('.popup__photo');
  for (var i = 0; i < pinAd.offer.photos.length; i++) {
    var photoCard = template.cloneNode();
    photoCard.src = pinAd.offer.photos[i];
    fragmentPhotos.appendChild(photoCard);
  }
  return fragmentPhotos;
};

var createCard = function (pinAd) {
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


  popupAdAvatar.src = pinAd.author.avatar;
  popupAdTitle.textContent = pinAd.offer.title;
  popupAdAdress.textContent = pinAd.offer.address;
  popupAdPrice.textContent = pinAd.offer.price + ' ₽/ночь';
  popupAdType.textContent = houseTypes[pinAd.offer.type];
  popupAdCapacity.textContent = pinAd.offer.rooms + ' комнаты для ' + pinAd.offer.guests + ' гостей';
  popupAdCheckin.textContent = 'Заезд после ' + pinAd.offer.checkin + ', выезд до ' + pinAd.offer.checkout;

  renderFeatures(pinAd, infoAdPopup);
  popupAdDescription.textContent = pinAd.offer.description;
  popupAdPhotos.children[0].remove();
  popupAdPhotos.appendChild(renderAdPhoto(pinAd));
  fragmentCard.appendChild(infoAdPopup);
  return fragmentCard;
};

var mountedCard = function (card) {
  var popupButtonClose = card.querySelector('.popup__close');
  popupButtonClose.focus();
  popupButtonClose.addEventListener('click', closeAdCard);
};

var renderCard = function (pinAd) {
  var popupModal = document.querySelector('.map__card');
  if (popupModal) {
    popupModal.remove();
  }
  var card = createCard(pinAd);
  mountedCard(card);
  mapPins.appendChild(card);
};

var renderPins = function (pinAd) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinAd.location.x + 'px';
  pinElement.style.top = pinAd.location.y + 'px';
  pinElement.querySelector('img').src = pinAd.author.avatar;
  pinElement.querySelector('img').alt = pinAd.offer.title;
  return pinElement;
};

var pinsData = generateAds();

(function () {
  for (var j = 1; j < pinsData.length; j++) {
    fragmentPins.appendChild(renderPins(pinsData[j]));
  }
})();

mapPins.appendChild(fragmentPins);

(function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin, index) {
    pin.addEventListener('click', function () {
      renderCard(pinsData[index + 1]);
    });
  });
})();

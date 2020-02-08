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
var fragment = document.createDocumentFragment();

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
        photos: getRandomElement(adPhotos)
      },

      location: {
        x: getRandomArbitary(0, mapBlock.clientWidth - PIN_WIDTH),
        y: getRandomArbitary(130, mapBlock.clientHeight - PIN_HEIGHT - FILTER_HEIGHT)
      }
    };
  }

  return ad;
};

var renderPins = function (pinAd) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinAd.location.x + 'px';
  pinElement.style.top = pinAd.location.y + 'px';

  pinElement.querySelector('img').src = pinAd.author.avatar;
  pinElement.querySelector('img').alt = pinAd.offer.title;

  pinElement.addEventListener('click', function () {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var popupModal = document.querySelector('.map__card');
    if (popupModal) {
      popupModal.remove();
    }
    var infoAdPopup = template.cloneNode(true);
    var popupAdAvatar = infoAdPopup.querySelector('.popup__avatar');
    var popupAdTitle = infoAdPopup.querySelector('.popup__title');
    var popupAdAdress = infoAdPopup.querySelector('.popup__text--address');
    var popupAdPrice = infoAdPopup.querySelector('.popup__text--price');
    var popupAdType = infoAdPopup.querySelector('.popup__type');
    var popupAdCapacity = infoAdPopup.querySelector('.popup__text--capacity');
    var popupAdCheckin = infoAdPopup.querySelector('.popup__text--time');
    var popupAdDescription = infoAdPopup.querySelector('.popup__description');
    var popupAdPhotos = infoAdPopup.querySelector('.popup__photo');
    var popupAdFeatures = infoAdPopup.querySelector('.popup__features').children;

    popupAdAvatar.src = pinAd.author.avatar;
    popupAdTitle.textContent = pinAd.offer.title;
    popupAdAdress.textContent = pinAd.offer.address;
    popupAdPrice.textContent = pinAd.offer.price + ' ₽/ночь';

    switch (pinAd.offer.type) {
      case 'flat':
        popupAdType.textContent = 'Квартира';
        break;
      case 'bungalo':
        popupAdType.textContent = 'Бунгало';
        break;
      case 'house':
        popupAdType.textContent = 'Дом';
        break;
      case 'palace':
        popupAdType.textContent = 'Дворец';
        break;
      default:
        popupAdType.textContent = 'Неизвестный тип жилья';
    }

    popupAdCapacity.textContent = pinAd.offer.rooms + ' комнаты для ' + pinAd.offer.guests + ' гостей';
    popupAdCheckin.textContent = 'Заезд после ' + pinAd.offer.checkin + ', выезд до ' + pinAd.offer.checkout;

    for (var i = 0; i < popupAdFeatures.length; i++) {
      var featreElement = popupAdFeatures[i];
      for (var k = 0; k < pinAd.offer.features.length; k++) {
        var features = pinAd.offer.features[k];

        if (featreElement.classList.contains('popup__feature--' + features)) {
          featreElement.style.display = 'none';
        }
      }
    }

    popupAdDescription.textContent = pinAd.offer.description;
    popupAdPhotos.src = pinAd.offer.photos;
    mapPins.appendChild(infoAdPopup);
    var popupButtonClose = document.querySelector('.popup__close');

    popupButtonClose.addEventListener('click', function () {
      if (popupButtonClose) {
        infoAdPopup.remove();
      }
    });

  });

  return pinElement;
};

var pins = generateAds();

for (var j = 1; j < pins.length; j++) {
  fragment.appendChild(renderPins(pins[j]));
}

mapPins.appendChild(fragment);

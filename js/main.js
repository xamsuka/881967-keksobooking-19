'use sctrict;'

var amountHero = 8;
var PIN_WIDTH = 50; //ширина маркера
var PIN_HEIGHT = 70; //высота маркера
var FILTER_HEIGHT = 46; // высота фильтра
var adTitles = ['1 комнатная квартира', '2х комнатная хата', 'очень большая квартира', 'Очень маленькая квартира', 'Пиздец какая дорогая', 'Элитная квартира', '3х комнатная квартира', '5ти комнатная'];
var adLocations = [];
var adPrices = [35000, 15000, 45000, 13333, 50000, 70000, 180000, 23000, 123555, 15000, 5555];
var adTypes = ['palace', 'flat', 'house', 'bungalo'];
var adRooms = [1, 2, 3, 4 ,5, 6, 7];
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

mapBlock.classList.remove('map--faded'); // Это временное решение, этот класс переключает карту из неактивного состояния в активное

var getRandomElement = function (arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateAds = function () {
  var ad = [];
  for (var i = 1; i < amountHero + 1; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: getRandomElement(adTitles),
        address: toString(this.location.x) + toString(this.location.y),
        price: getRandomElement(adPrices),
        type: getRandomElement(adTypes),
        rooms: getRandomElement(adRooms),
        guests: getRandomElement(adGuests),
        checkin: getRandomElement(adCheckings),
        checkout: getRandomElement(adCheckouts),
        features: getRandomElement(adFeatures),
        description: getRandomElement(adDescriptions),
        photos: getRandomElement(adPhotos)
      },

      location: {
        x: getRandomArbitary(0, mapBlock.clientWidth - PIN_WIDTH),
        y: getRandomArbitary(130, mapBlock.clientHeight - PIN_HEIGHT - FILTER_HEIGHT)
      }
    };
  };

  return ad;
};

var renderPins = function (pinAd) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinAd.location.x + 'px';
  pinElement.style.top = pinAd.location.y + 'px';

  pinElement.querySelector('img').src = pinAd.author.avatar;
  pinElement.querySelector('img').alt = pinAd.offer.title;

  return pinElement;
};

var pins = generateAds(); //Массив объектов объявлений

for (var i = 1; i < pins.length; i++) {
  fragment.appendChild(renderPins(pins[i]));
};

mapPins.appendChild(fragment);

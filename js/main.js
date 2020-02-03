'use sctrict;'

var adTitle = ["1 комнатная квартира", "2х комнатная хата", "очень большая квартира", "Очень маленькая квартира", "Пиздец какая дорогая", "Элитная квартира", "3х комнатная квартира", "5ти комнатная"];
var adLocation = [];
var adPrice = [35000, 15000, 45000, 13333, 50000, 70000, 180000, 23000, 123555, 15000, 5555];
var adType = ["palace", "flat", "house", "bungalo"];
var adRooms = [1, 2, 3, 4 ,5, 6, 7];
var adGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var adCheckin = ["12:00", "13:00", "14:00"];
var adCheckout = ["12:00", "13:00", "14:00"];
var adFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var adDescription = ["Всё ок", "Очень хорошая квартира", "Просто нет слов"];
var adPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var mapBlock = document.querySelector('.map__pins');

var getRandomElement = function (arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateAds = function () {
  var ad = [];
  for (var i = 0; i < 8; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: getRandomElement(adTitle),
        address: toString(this.location.x) + toString(this.location.y),
        price: getRandomElement(adPrice),
        type: getRandomElement(adType),
        rooms: getRandomElement(adRooms),
        guests: getRandomElement(adGuests),
        checkin: getRandomElement(adCheckin),
        checkout: getRandomElement(adCheckout),
        features: getRandomElement(adFeatures),
        description: getRandomElement(adDescription),
        photos: getRandomElement(adPhotos)
      },

      location: {
        x: getRandomArbitary(0, 1200),
        y: getRandomArbitary(130, 630)
      }
    };
  };

  return ad;
};

var test = generateAds();
console.log(test);

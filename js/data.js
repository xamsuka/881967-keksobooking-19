'use strict';

(function () {
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
  var ad = [];
  var mapBlock = document.querySelector('.map');
  var houseMap = {
    palace: {
      label: 'Дворец',
      price: '10000'
    },
    flat: {
      label: 'Квартира',
      price: '1000'
    },
    house: {
      label: 'Дом',
      price: '5000'
    },
    bungalo: {
      label: 'Бунгало',
      price: '0'
    }
  };

  var houseApartments = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  for (var i = 1; i < amountAd + 1; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: window.util.randomElemet(adTitles),
        address: window.util.randomElemet(adAddresses),
        price: window.util.randomElemet(adPrices),
        type: window.util.randomElemet(adTypes),
        rooms: window.util.randomElemet(adRooms),
        guests: window.util.randomElemet(adGuests),
        checkin: window.util.randomElemet(adCheckings),
        checkout: window.util.randomElemet(adCheckouts),
        features: adFeatures.slice(window.util.randomArbitary(0, adFeatures.length), adFeatures.length),
        description: window.util.randomElemet(adDescriptions),
        photos: adPhotos.slice(window.util.randomArbitary(0, adPhotos.length), adPhotos.length)
      },

      location: {
        x: window.util.randomArbitary(0, mapBlock.clientWidth - PIN_WIDTH),
        y: window.util.randomArbitary(130, mapBlock.clientHeight - PIN_HEIGHT - FILTER_HEIGHT)
      }
    };
  }

  window.data = {
<<<<<<< HEAD
    generateAd: ad
=======
    generateAd: ad,
    getHouseMap: houseMap,
    getHouseApartments: houseApartments
>>>>>>> d2daab0dbe6f1274f02bfd9385bf13ab2ed5eb7c
  };

})();


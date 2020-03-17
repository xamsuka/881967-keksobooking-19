'use strict';

(function () {
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

  window.data = {
    getHouseMap: houseMap,
    getHouseApartments: houseApartments
  };

})();


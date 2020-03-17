'use strict';

(function () {
  var MAX_PINS = 5;
  var MIDDLE_PRICE_START = 10000;
  var MIDDLE_PRICE_END = 50000;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var form = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var formFilter = document.querySelector('.map__filters');

  var generateMap = function (ads) {
    var fragmentPins = document.createDocumentFragment();
    for (var j = 0; j < ads.length; j++) {
      if (ads[j].hasOwnProperty('offer') && j < MAX_PINS) {
        fragmentPins.appendChild(createPin(ads[j]));
      } else {
        break;
      }
    }
    mapPins.appendChild(fragmentPins);
    window.card.executeRenderCards(ads);
    window.form.executeActivateFilterForm();
  };

  var deleteAds = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
      window.card.executeCloseCard();
    });
  };

  var filterHouses = function (option, filterAds) {
    if (option.value !== 'any') {
      var adFilterHouseTypes = filterAds.filter(function (ad) {
        return ad.offer.type === option.value;
      });
    } else {
      return filterAds;
    }
    return adFilterHouseTypes;
  };

  var filterPrices = function (option, filterAds) {
    var adFilterHousePrices;
    switch (option) {
      case 'any':
        return filterAds;
      case 'middle':
        adFilterHousePrices = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_START && ad.offer.price <= MIDDLE_PRICE_END);
        });
        break;
      case 'low':
        adFilterHousePrices = filterAds.filter(function (ad) {
          return (ad.offer.price < MIDDLE_PRICE_START);
        });
        break;
      case 'high':
        adFilterHousePrices = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_END);
        });
        break;
      default:
        return filterAds;
    }

    return adFilterHousePrices;
  };

  var filterRooms = function (option, filterAds) {
    if (option.value !== 'any') {
      var adFilterHouseRooms = filterAds.filter(function (ad) {

        return ad.offer.rooms === Number(option.value);
      });
    } else {
      return filterAds;
    }
    return adFilterHouseRooms;
  };

  var filterGuests = function (option, filterAds) {
    if (option.value !== 'any') {
      var adFilterHouseGuests = filterAds.filter(function (ad) {
        return ad.offer.guests === Number(option.value);
      });
    } else {
      return filterAds;
    }
    return adFilterHouseGuests;
  };

  var filterFeatures = function (filterAds, features) {
    var adFilterHouseFeatures = filterAds;
    features.forEach(function (feature) {
      adFilterHouseFeatures = adFilterHouseFeatures.filter(function (ad) {
        return ad.offer.features.includes(feature);
      });
    });
    return adFilterHouseFeatures;
  };

  var onFilterPins = function () {
    var houseType = document.querySelector('#housing-type');
    var housePrice = document.querySelector('#housing-price');
    var houseRooms = document.querySelector('#housing-rooms');
    var houseGuests = document.querySelector('#housing-guests');
    var houseFeatures = document.querySelectorAll('input[type="checkbox"]:checked');
    var featureValues = Array.from(houseFeatures).map(function (el) {
      return el.value;
    });

    deleteAds();
    var filterAds = window.map.getAds;
    var houses = filterHouses(houseType, filterAds);
    var prices = filterPrices(housePrice.value, houses);
    var rooms = filterRooms(houseRooms, prices);
    var guests = filterGuests(houseGuests, rooms);
    var features = filterFeatures(guests, featureValues);
    generateMap(features);
  };

  formFilter.addEventListener('change', window.debounce(onFilterPins));

  var onSuccessLoad = function (data) {
    var ads = data;
    generateMap(ads);

    window.map.getAds = ads;
  };

  var onSuccessUpload = function () {
    window.popup.executeOpenPopupModal();
    window.map.executeDisableMap();
  };

  var onError = function (errorMessage) {
    window.map.executeDisableMap();
    window.popup.executeOpenErrorModal(errorMessage);
  };

  var createPin = function (pinAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinAd.location.x + 'px';
    pinElement.style.top = pinAd.location.y + 'px';
    pinElement.querySelector('img').src = pinAd.author.avatar;
    pinElement.querySelector('img').alt = pinAd.offer.title;
    return pinElement;
  };

  var activateMap = function () {
    window.backend.loadAds(onSuccessLoad, onError);
    mapBlock.classList.remove('map--faded');
    window.form.executeActivatedForm();
  };

  var disableMap = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
    window.form.executeDisableForm();
    window.form.executeDisableFilterForm();
    mapBlock.classList.add('map--faded');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.uploadAd(new FormData(form), onSuccessUpload, onError);
    evt.preventDefault();
  });

  window.map = {
    executeActivateMap: activateMap,
    executeDisableMap: disableMap
  };
})();

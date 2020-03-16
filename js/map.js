'use strict';

(function () {
  var MAX_PINS = 5;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var form = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var formFilter = document.querySelector('.map__filters');


  var onGenerateMap = function (ads) {
    var fragmentPins = document.createDocumentFragment();

    for (var j = 0; j < ads.length; j++) {
      if (ads[j].hasOwnProperty('offer') && j < MAX_PINS) {
        fragmentPins.appendChild(createPin(ads[j]));
      }
    }
    mapPins.appendChild(fragmentPins);
    window.card.renderCards(ads);
  };

  var deleteAds = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
      window.card.closeCard();
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
    var MIDDLE_PRICE_START = 10000;
    var MIDDLE_PRICE_END = 50000;
    var adFilterHousePrice;
    switch (option) {
      case 'any':
        return filterAds;
      case 'middle':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_START && ad.offer.price <= MIDDLE_PRICE_END);
        });
        break;
      case 'low':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price < MIDDLE_PRICE_START);
        });
        break;
      case 'high':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_END);
        });
        break;
      default:
        return filterAds;
    }

    return adFilterHousePrice;
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
    var house = filterHouses(houseType, filterAds);
    var price = filterPrices(housePrice.value, house);
    var rooms = filterRooms(houseRooms, price);
    var guests = filterGuests(houseGuests, rooms);
    var features = filterFeatures(guests, featureValues);
    onGenerateMap(features);
  };

  formFilter.addEventListener('change', onFilterPins);

  var onSuccessLoad = function (data) {
    var ads = data;
    onGenerateMap(ads);

    window.map.getAds = ads;
  };

  var onSuccessUpload = function () {
    window.popup.openPopupModal();
    window.map.disabledMap();
  };

  var onError = function (errorMessage) {
    window.map.disabledMap();
    window.popup.openErrorModal(errorMessage);
  };

  var createPin = function (pinAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinAd.location.x + 'px';
    pinElement.style.top = pinAd.location.y + 'px';
    pinElement.querySelector('img').src = pinAd.author.avatar;
    pinElement.querySelector('img').alt = pinAd.offer.title;
    return pinElement;
  };

  var activeMap = function () {
    window.backend.loadAds(onSuccessLoad, onError);
    mapBlock.classList.remove('map--faded');
    window.form.statusForm();
  };

  var disabledMap = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
    window.pin.setDefaultPosition();
    window.form.statusForm();
    mapBlock.classList.add('map--faded');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.uploadAd(new FormData(form), onSuccessUpload, onError);
    evt.preventDefault();
  });

  window.map = {
    activeMap: activeMap,
    disabledMap: disabledMap
  };


})();

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
      if (ads[j].hasOwnProperty('offer')) {
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
  }

  var filterHouses = function (options, filterAds) {
    var adFilterHouseTypes = window.map.getFilgterAds.filter(function (ad) {
      if (options.value !== 'any') {
        return ad.offer.type === options.value;
      } else {
        return ad;
      }
    });
    return adFilterHouseTypes;
  };

  var filterPrices = function (option, filterAds) {
    var MIDDLE_PRICE_START = 10000;
    var MIDDLE_PRICE_END = 50000;
    var adFilterHousePrice;
    switch (option) {
      case 'any':
        return window.map.getAds;
        // onGenerateMap(filterAds);
        break;
      case 'middle':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_START && ad.offer.price <= MIDDLE_PRICE_END);
        });
        // onGenerateMap(adFilterHousePrice);
        break;
      case 'low':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price < MIDDLE_PRICE_START);
        });
        // onGenerateMap(adFilterHousePrice);
        break;
      case 'high':
        adFilterHousePrice = filterAds.filter(function (ad) {
          return (ad.offer.price >= MIDDLE_PRICE_END);
        });
        // onGenerateMap(adFilterHousePrice);
        break;
      default:
        console.log('Произошла ошибка при фильтрации. Параметр ' + option + 'неизвестен');
    }

    return adFilterHousePrice;
  };

  var onFilterPins = function (evt) {
    var houseTypeValue = document.querySelector('#housing-type').value;
    var housePriceValue = document.querySelector('#housing-price').value;
    var houseRoomsValue = document.querySelector('#housing-rooms').value;
    var houseGuestsValue = document.querySelector('#housing-guests').value;
    var houseFeatures = document.querySelectorAll('input[type="checkbox"]:checked');
    var target = evt.target;
    deleteAds();
    var filterAds = filterPrices(housePriceValue, window.map.getFilgterAds);

    // filterPrices(target.value, window.map.getFilgterAds);

    var adFilterAds = filterAds.filter(function (ad) {
      if (target.value !== 'any') {
        return ad.offer.type === houseTypeValue;
      } else {
        return ad;
      }
    });
    onGenerateMap(adFilterAds);

    // switch (target.name) {
    //   case 'housing-type':
    //     filterAds = filterHouses(target);
    //     onGenerateMap(filterAds);
    //     break;
    //   case 'housing-price':
    //     filterPrices(target.value, filterAds);
    //     break;
    //   default:
    //   onGenerateMap(window.map.getAds);
    // }
  };

  formFilter.addEventListener('change', onFilterPins);

  var onSuccessLoad = function (data) {
    var ads = data;
    onGenerateMap(ads);

    window.map.getAds = ads;
    window.map.getFilgterAds = ads;
  }

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

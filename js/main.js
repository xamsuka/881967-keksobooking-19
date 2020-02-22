'use strict';

var ENTER_KEY = 'Enter';
// var ESCAPE_KEY = 'Escape';
var HALF_PIN_MAIN_WIDTH = 30;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var FILTER_HEIGHT = 46;
var startPosY = 130;
var endPosY = 630;
var startPosX = 0;
var endPosX = document.querySelector('.map').offsetWidth;
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
var pinCreatAd = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPins = document.createDocumentFragment();
var disalbedElement = ['fieldset', 'select'];
var houseTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

(function () {
  var formElement = document.querySelectorAll('fieldset');
  formElement.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
})();

(function () {
  var formElement = document.querySelectorAll('select');
  formElement.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
})();

(function () {
  var inputAddress = document.querySelector('#address');
  inputAddress.value = 'Y: ' + pinCreatAd.style.left + ' X: ' + pinCreatAd.style.top;
})();

var activeForm = function (element) {
  var createAdForm = document.querySelector('.ad-form');
  var formElement = document.querySelectorAll(element);
  formElement.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  createAdForm.classList.remove('ad-form--disabled');
  mapBlock.classList.remove('map--faded');
};

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
  popupButtonClose.addEventListener('click', function () {
    closeCard();
  });
};

var renderCard = function (pinAd) {
  var popupModal = document.querySelector('.map__card');
  if (popupModal) {
    popupModal.remove();
  }
  var card = createCard(pinAd);
  mountedCard(card);
  mapPins.appendChild(card);
  document.addEventListener('keydown', onCardEscPress);
};

var renderPin = function (pinAd) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinAd.location.x + 'px';
  pinElement.style.top = pinAd.location.y + 'px';
  pinElement.querySelector('img').src = pinAd.author.avatar;
  pinElement.querySelector('img').alt = pinAd.offer.title;
  return pinElement;
};

var pinsData = generateAds();

var renderPins = function () {
  for (var j = 1; j < pinsData.length; j++) {
    fragmentPins.appendChild(renderPin(pinsData[j]));
  }
  mapPins.appendChild(fragmentPins);
};

var renderCards = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin, index) {
    pin.addEventListener('click', function () {
      renderCard(pinsData[index + 1]);
    });
  });
};

var activeMap = function () {
  renderPins();
  renderCards();
  activeForm(disalbedElement);
};

pinCreatAd.addEventListener('mousedown', function (evt) {
  var inputAddress = document.querySelector('#address');
  if (evt.which === 1 && mapBlock.classList.contains('map--faded')) {
    activeMap();
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var coordY = pinCreatAd.offsetTop - shift.y;
    var coordX = pinCreatAd.offsetLeft - shift.x;
    if ((coordY > startPosY && coordY < endPosY) && (coordX > startPosX - HALF_PIN_MAIN_WIDTH && coordX < endPosX - HALF_PIN_MAIN_WIDTH)) {
      pinCreatAd.style.top = coordY + 'px';
      pinCreatAd.style.left = coordX + 'px';
    }
    inputAddress.value = 'Y: ' + coordY + 'px' + ' X: ' + (coordX + HALF_PIN_MAIN_WIDTH) + 'px';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

pinCreatAd.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY && mapBlock.classList.contains('map--faded')) {
    activeMap();
  }
});

var onCardEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closeCard();
  }
};

var closeCard = function () {
  var popupModal = document.querySelector('.map__card');
  if (popupModal) {
    popupModal.remove();
  }
  document.removeEventListener('keydown', onCardEscPress);
};


// Валидация. Выносим в одтельный модуль form.js

var inputTitleAd = document.querySelector('#title');
var inputPriceAd = document.querySelector('#price');
var selectTypeHouse = document.querySelector('#type');

inputTitleAd.addEventListener('invalid', function () {
  if (inputTitleAd.validity.tooShort) {
    inputTitleAd.setCustomValidity('Минимальная длина заголовка — 30 символов');
  } else if (inputTitleAd.validity.toLong) {
    inputTitleAd.setCustomValidity('Максимальная длина заголовка — 100 символов');
  } else if (inputTitleAd.validity.valueMissing) {
    inputTitleAd.setCustomValidity('Обязательное текстовое поле');
  } else {
    inputTitleAd.setCustomValidity('');
  }
});

inputPriceAd.addEventListener('invalid', function (evt) {
  var target = evt.target;
  if (inputPriceAd.validity.rangeUnderflow) {
    inputPriceAd.setCustomValidity('Минимальная цена за выбранный тип жилья — ' + target.min);
  } else if (inputPriceAd.validity.rangeOverflow) {
    inputPriceAd.setCustomValidity('Максимальная цена — 1 000 000 рублей');
  } else if (inputPriceAd.validity.valueMissing) {
    inputPriceAd.setCustomValidity('Обязательное поле');
  } else {
    inputPriceAd.setCustomValidity('');
  }
});

selectTypeHouse.addEventListener('change', function () {
  var value = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
  if (value === 'bungalo') {
    inputPriceAd.setAttribute('min', '0');
    inputPriceAd.setAttribute('placeholder', '0');
  } else if (value === 'flat') {
    inputPriceAd.setAttribute('min', '1000');
    inputPriceAd.setAttribute('placeholder', '1000');
  } else if (value === 'house') {
    inputPriceAd.setAttribute('min', '5000');
    inputPriceAd.setAttribute('placeholder', '5000');
  } else {
    inputPriceAd.setAttribute('min', '10000');
    inputPriceAd.setAttribute('placeholder', '10000');
  }

});

var fieldSetTime = document.querySelector('.ad-form__element--time');

var onInputTimeChange = function (evt) {
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  var selectTimeInValue = selectTimeIn.selectedIndex;
  var selectTimeOutValue = selectTimeOut.selectedIndex;
  var target = evt.target;
  if (target.name === 'timein') {
    selectTimeOut.selectedIndex = selectTimeInValue;
  } else {
    selectTimeIn.selectedIndex = selectTimeOutValue;
  }
};

fieldSetTime.addEventListener('change', onInputTimeChange);
/*
var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity').options;
var onInputRoomChange = function () {
  var selectRoomNumberValue = selectRoomNumber.options[selectRoomNumber.selectedIndex].value;
};

selectRoomNumber.addEventListener('change', onInputRoomChange);
*/

'use strict';

(function () {
  var formElementSelect = document.querySelectorAll('select');
  var formElementFieldset = document.querySelectorAll('fieldset');
  formElementSelect.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
  formElementFieldset.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
})();

(function () {
  var pinCreatAd = document.querySelector('.map__pin--main');
  var inputPriceAd = document.querySelector('#price');
  var selectTypeHouse = document.querySelector('#type');
  var inputAddress = document.querySelector('#address');
  inputAddress.value = 'Y: ' + pinCreatAd.offsetLeft + ' X: ' + pinCreatAd.offsetLeft;

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
})();

(function () {
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
})();

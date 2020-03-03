'use strict';

(function () {
  document.querySelectorAll('form input, form select, form textarea, form button')
  .forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });
})();

(function () {
  var mapBlock = document.querySelector('.map');
  var pinCreatAd = document.querySelector('.map__pin--main');

  var activeForm = function () {
    var createAdForm = document.querySelector('.ad-form');
    createAdForm.classList.remove('ad-form--disabled');
    mapBlock.classList.remove('map--faded');
    document.querySelectorAll('form input, form select, form textarea, form button')
    .forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
  };
  var changeAddressInput = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = 'Y: ' + pinCreatAd.offsetLeft + ' X: ' + pinCreatAd.offsetLeft;
  };

  var changeValueSelectHouse = function () {
    var inputPriceAd = document.querySelector('#price');
    var selectTypeHouse = document.querySelector('#type');
    var value = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
    inputPriceAd.setAttribute('min', window.data.houseMap[value].price);
    inputPriceAd.setAttribute('placeholder', window.data.houseMap[value].price);
  };

  changeAddressInput();
  changeValueSelectHouse();

  window.form = {
    activeForm: activeForm,
    changeAddressInput: changeAddressInput,
    changeValueSelectHouse: changeValueSelectHouse
  };
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

  selectTypeHouse.addEventListener('change', window.form.changeValueSelectHouse);

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

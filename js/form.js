'use strict';

(function () {
  var PIN_POS_Y = 375;
  var PIN_POS_X = 570;
  var createAdForm = document.querySelector('.ad-form');
  var filterAdForm = document.querySelector('.map__filters');
  var selectTypeHouse = document.querySelector('#type');

  document.querySelectorAll('form input, form select, form textarea, form button')
    .forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });

  var activeForm = function () {
    var formElements = document.querySelectorAll('form input, form select, form textarea, form button');
    createAdForm.classList.remove('ad-form--disabled');
    formElements.forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
  };

  var disabledForm = function () {
    var formElements = document.querySelectorAll('form input, form select, form textarea, form button');
    createAdForm.reset();
    filterAdForm.reset();
    setDefaultForm();
    createAdForm.classList.add('ad-form--disabled');

    formElements.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
  };

  var updateStatusForm = function () {
    if (createAdForm.classList.contains('ad-form--disabled')) {
      activeForm();
    } else {
      disabledForm();
    }
  };

  var changeAddressInput = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = 'Y: ' + PIN_POS_Y + ' X: ' + PIN_POS_X;
  };

  var changeValueSelectHouse = function () {
    var inputPriceAd = document.querySelector('#price');
    var value = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
    inputPriceAd.setAttribute('min', window.data.getHouseMap[value].price);
    inputPriceAd.setAttribute('placeholder', window.data.getHouseMap[value].price);
  };

  var setDefaultForm = function () {
    changeAddressInput();
    changeValueSelectHouse();
  };

  setDefaultForm();
  selectTypeHouse.addEventListener('change', changeValueSelectHouse);

  window.form = {
    activatedForm: activeForm,
    updateStatusForm: updateStatusForm,
    setDefaultForm: setDefaultForm
  };

})();

(function () {
  var inputTitleAd = document.querySelector('#title');
  var inputPriceAd = document.querySelector('#price');

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

(function () {
  var selectApartment = document.querySelector('#room_number');
  var selectApartmentValue = selectApartment.options[selectApartment.selectedIndex].value;

  var disabledSelectValues = function (element) {
    var selectCapacity = document.querySelector('#capacity');
    var selectCapacityOptions = Array.apply(null, selectCapacity.options);
    var optionUnBlock = window.data.getHouseApartments[element];
    selectCapacityOptions.forEach(function (elem) {
      elem.removeAttribute('selected');
      if (optionUnBlock.indexOf(Number(elem.value)) !== -1) {
        elem.disabled = false;
        selectCapacity.selectedIndex = elem.index;
      } else {
        elem.disabled = true;
      }
    });
  };
  disabledSelectValues(selectApartmentValue);

  var onSelectApartmentsChange = function () {
    selectApartmentValue = selectApartment.options[selectApartment.selectedIndex].value;
    disabledSelectValues(selectApartmentValue);
  };

  selectApartment.addEventListener('change', onSelectApartmentsChange);
})();

(function () {
  var buttonFormReset = document.querySelector('.ad-form__reset');
  buttonFormReset.addEventListener('click', window.map.disabledMap);
})();

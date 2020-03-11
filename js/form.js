'use strict';

(function () {
  var pinCreatAd = document.querySelector('.map__pin--main');
  var createAdForm = document.querySelector('.ad-form');
  var filterAdForm = document.querySelector('.map__filters');

  document.querySelectorAll('form input, form select, form textarea, form button')
  .forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });

  var activeForm = function () {
    defaultForm();
    var formElements = document.querySelectorAll('form input, form select, form textarea, form button');
    createAdForm.classList.remove('ad-form--disabled');
    formElements.forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
  };

  var disabledForm = function () {
    var formElements = document.querySelectorAll('form input, form select, form textarea, form button');
    createAdForm.classList.add('ad-form--disabled');
    createAdForm.reset();
    filterAdForm.reset();
    window.form.setDefaultForm();

    formElements.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
  };

  var statusForm = function () {
    if (createAdForm.classList.contains('ad-form--disabled')) {
      activeForm();
    } else {
      disabledForm();
    }
  };

  var changeAddressInput = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = 'Y: ' + pinCreatAd.offsetLeft + ' X: ' + pinCreatAd.offsetLeft;
  };

  var changeValueSelectHouse = function () {
    var inputPriceAd = document.querySelector('#price');
    var selectTypeHouse = document.querySelector('#type');
    var value = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
    inputPriceAd.setAttribute('min', window.data.getHouseMap[value].price);
    inputPriceAd.setAttribute('placeholder', window.data.getHouseMap[value].price);
  };

  var defaultForm = function () {
    changeAddressInput();
    changeValueSelectHouse();
  };

  window.form = {
    statusForm: statusForm,
    setDefaultForm: defaultForm
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

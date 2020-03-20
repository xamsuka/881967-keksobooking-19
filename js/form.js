'use strict';

(function () {
  var PIN_POS_Y = 375;
  var PIN_POS_X = 570;
  var createAdForm = document.querySelector('.ad-form');
  var filterAdForm = document.querySelector('.map__filters');
  var selectTypeHouse = document.querySelector('#type');
  var formFilterBlock = document.querySelector('.map__filters');
  var formFilterElements = formFilterBlock.querySelectorAll('form select, form input');
  var formBlock = document.querySelector('.ad-form');
  var formElements = formBlock.querySelectorAll('form input, form select, form textarea, form button');

  var selectApartment = document.querySelector('#room_number');
  var selectApartmentValue = selectApartment.options[selectApartment.selectedIndex].value;

  var disableSelectValues = function () {
    selectApartmentValue = selectApartment.options[selectApartment.selectedIndex].value;
    var selectCapacity = document.querySelector('#capacity');
    var selectCapacityOptions = Array.apply(null, selectCapacity.options);
    var optionUnBlock = window.data.getHouseApartments[selectApartmentValue];
    selectCapacityOptions.forEach(function (elem) {
      if (optionUnBlock.indexOf(Number(elem.value)) !== -1) {
        elem.disabled = false;
        selectCapacity.selectedIndex = elem.index;
      } else {
        elem.disabled = true;
      }
    });
  };
  disableSelectValues();

  var onSelectApartmentsChange = function () {
    selectApartmentValue = selectApartment.options[selectApartment.selectedIndex].value;
    disableSelectValues(selectApartmentValue);
  };

  selectApartment.addEventListener('change', onSelectApartmentsChange);

  var changeAddressInput = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = '{{' + PIN_POS_X + '}}, ' + '{{' + PIN_POS_Y + '}}';
  };

  var onSelectHouseChangeValue = function () {
    var inputPriceAd = document.querySelector('#price');
    var value = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
    inputPriceAd.setAttribute('min', window.data.getHouseMap[value].price);
    inputPriceAd.setAttribute('placeholder', window.data.getHouseMap[value].price);
  };

  var setDefaultForm = function () {
    changeAddressInput();
    onSelectHouseChangeValue();
    disableSelectValues();
  };

  selectTypeHouse.addEventListener('change', onSelectHouseChangeValue);

  var activateFilterForm = function () {
    formFilterElements.forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var disableFilterForm = function () {
    formFilterElements.forEach(function (elem) {
      elem.disabled = true;
    });
  };

  var activateForm = function () {
    createAdForm.classList.remove('ad-form--disabled');
    formElements.forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var disableForm = function () {
    window.card.executeCloseCard();
    window.pin.executeSetDefaultPosition();
    createAdForm.reset();
    filterAdForm.reset();
    setDefaultForm();
    createAdForm.classList.add('ad-form--disabled');
    formElements.forEach(function (elem) {
      elem.disabled = true;
      elem.style.border = 'none';
      elem.style.border = '1px solid #d9d9d3';
    });
  };

  disableForm();
  disableFilterForm();

  var updateStatusForm = function () {
    if (createAdForm.classList.contains('ad-form--disabled')) {
      activateForm();
    } else {
      disableForm();
    }
  };

  window.form = {
    executeActivateFilterForm: activateFilterForm,
    executeDisableFilterForm: disableFilterForm,
    executeActivatedForm: activateForm,
    executeDisableForm: disableForm,
    executeUpdateStatusForm: updateStatusForm,
    executeSetDefaultForm: setDefaultForm
  };

})();

(function () {
  var inputTitleAd = document.querySelector('#title');
  var inputPriceAd = document.querySelector('#price');

  inputTitleAd.addEventListener('input', function () {
    inputTitleAd.style.border = '2px solid #f92f08';
    if (inputTitleAd.validity.tooShort) {
      inputTitleAd.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else if (inputTitleAd.validity.toLong) {
      inputTitleAd.setCustomValidity('Максимальная длина заголовка — 100 символов');
    } else if (inputTitleAd.validity.valueMissing) {
      inputTitleAd.setCustomValidity('Обязательное текстовое поле');
    } else {
      inputTitleAd.setCustomValidity('');
      inputTitleAd.style.border = '1px solid #d9d9d3';
    }
  });

  inputPriceAd.addEventListener('input', function (evt) {
    var target = evt.target;
    inputPriceAd.style.border = '2px solid #f92f08';
    if (inputPriceAd.validity.rangeUnderflow) {
      inputPriceAd.setCustomValidity('Минимальная цена за выбранный тип жилья — ' + target.min);
    } else if (inputPriceAd.validity.rangeOverflow) {
      inputPriceAd.setCustomValidity('Максимальная цена — 1 000 000 рублей');
    } else if (inputPriceAd.validity.valueMissing) {
      inputPriceAd.setCustomValidity('Обязательное поле');
    } else {
      inputPriceAd.setCustomValidity('');
      inputPriceAd.style.border = '1px solid #d9d9d3';
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

})();

(function () {
  var buttonFormReset = document.querySelector('.ad-form__reset');
  buttonFormReset.addEventListener('click', window.map.executeDisableMap);
})();

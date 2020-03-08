'use strict';

(function () {
  var mainBlock = document.querySelector('main');

  var onPopupEscPress = function (evt) {
    window.util.isEscPress(evt, closePopup);
  };

  var closePopup = function () {
    var popupModal = document.querySelector('.success, .error');
    if (popupModal) {
      popupModal.remove();
    }

    document.removeEventListener('keypress', onPopupEscPress);
  };

  var openPopupSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successBlock = successTemplate.cloneNode(true);
    mainBlock.appendChild(successBlock);
    mainBlock.classList.add('map--faded');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var openPopupError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content;
    var error = errorTemplate.cloneNode(true);
    var blockErrorMessage = error.querySelector('.error__message');
    blockErrorMessage.textContent = errorMessage;
    mainBlock.appendChild(error);
    var buttonError = document.querySelector('.error__button');

    buttonError.addEventListener('click', function () {
      var errorBlock = document.querySelector('.error');
      errorBlock.remove();
      window.form.statusForm();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.popup = {
    openPopupModal: openPopupSuccess,
    openErrorModal: openPopupError
  };
})();

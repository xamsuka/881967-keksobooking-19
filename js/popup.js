'use strict';

(function () {
  var mainBlock = document.querySelector('main');

  var onPopupEscPress = function (evt) {
    window.util.isEscPress(evt, closePopup);
  };

  var onPopupOutClick = function (evt) {
    window.util.isClickOut(evt, closePopup);
  };

  var closePopup = function () {
    var popupModal = document.querySelector('.success, .error');
    if (popupModal) {
      popupModal.remove();
      window.pin.executeSetDefaultPosition();
    }

    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('mousedown', onPopupOutClick);
  };

  var openPopupSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successBlock = successTemplate.cloneNode(true);
    mainBlock.appendChild(successBlock);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupOutClick);
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
    });
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', function (evt) {
      if (evt.target.closest('.error__message') === null) {
        closePopup();
      }
    });
  };

  window.popup = {
    executeOpenPopupModal: openPopupSuccess,
    executeOpenErrorModal: openPopupError
  };
})();

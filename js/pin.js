'use strict';

(function () {
  var HALF_PIN_MAIN_WIDTH = 30;
  var startPosY = 130;
  var endPosY = 630;
  var startPosX = 0;
  var endPosX = document.querySelector('.map').offsetWidth;
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

  var activeMap = function () {
    window.map.generateMap();
    window.card.renderCards();
    activeForm();
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
      inputAddress.value = 'Y: ' + coordY + ' X: ' + (coordX + HALF_PIN_MAIN_WIDTH);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onPinActiveMap = function (evt) {
    window.util.isEnterPress(evt, activeMap);
  };

  pinCreatAd.addEventListener('keydown', onPinActiveMap);
})();

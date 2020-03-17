'use strict';

(function () {
  var HALF_PIN_MAIN_WIDTH = 30;
  var HALF_PIN_MAIN_HEIGHT = 65;
  var START_PIN_POS_X = 570;
  var START_PIN_POS_Y = 375;
  var START_POS_Y = 130;
  var END_POS_Y = 630;
  var START_POS_X = 0;
  var END_POS_X = document.querySelector('.map').offsetWidth;
  var mapBlock = document.querySelector('.map');
  var pinCreatAd = document.querySelector('.map__pin--main');

  var setDefaultPosition = function () {
    pinCreatAd.style.left = START_PIN_POS_X + 'px';
    pinCreatAd.style.top = START_PIN_POS_Y + 'px';
  };

  pinCreatAd.addEventListener('mousedown', function (evt) {
    var inputAddress = document.querySelector('#address');
    if (evt.which === 1 && mapBlock.classList.contains('map--faded')) {
      window.map.executeActivateMap();
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
      if ((coordY > START_POS_Y - HALF_PIN_MAIN_HEIGHT && coordY < END_POS_Y - HALF_PIN_MAIN_HEIGHT) && (coordX > START_POS_X - HALF_PIN_MAIN_WIDTH && coordX < END_POS_X - HALF_PIN_MAIN_WIDTH)) {
        pinCreatAd.style.top = coordY + 'px';
        pinCreatAd.style.left = coordX + 'px';
      }
      inputAddress.value = '{{' + (coordX + HALF_PIN_MAIN_WIDTH) + '}}, ' + '{{' + (coordY + HALF_PIN_MAIN_HEIGHT) + '}} ';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onPinEnterPress = function (evt) {
    window.util.isEnterPress(evt, window.map.activeMap);
  };

  pinCreatAd.addEventListener('keydown', onPinEnterPress);

  window.pin = {
    executeSetDefaultPosition: setDefaultPosition
  };

})();

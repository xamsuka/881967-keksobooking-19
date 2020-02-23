'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var mapBlock = document.querySelector('.map');

  window.util = {
    isEscPress: function (evt, action) {
      if (evt.key === ESCAPE_KEY) {
        action();
      }
    },
    isEnterPress: function (evt, action) {
      if (evt.key === ENTER_KEY && mapBlock.classList.contains('map--faded')) {
        action();
      }
    },
    randomElemet: function (arr) {
      var randomElement = arr[Math.floor(Math.random() * arr.length)];
      return randomElement;
    },
    randomArbitary: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();

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
    isClickOut: function (evt, action) {
      if (evt.target.closest('.success__message') === null) {
        action();
      }
    },
  };
})();

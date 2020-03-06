'use strict';

(function () {
  var UrlAddress = {
    URL_LOAD_ADS: 'https://js.dump.academy/keksobooking/data',
    URL_UPLOAD_AD: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var TIME_OUT_SERVER = 10000;

  var loadAds = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Произошла ошибка. Код ошибки: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте подключение к интернету');
    });

    xhr.addEventListener('timeoit', function () {
      onError('Запрос на получение данных не успел выполнится за: ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIME_OUT_SERVER;

    xhr.open('GET', UrlAddress.URL_LOAD_ADS);
    xhr.send();

    return xhr.response;
  };

  var uploadAd = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Произошла ошибка. Код ошибки: ' + xhr.status);
      }
    });

    xhr.open('POST', UrlAddress.URL_UPLOAD_AD);
    xhr.send(data);
  };

  window.backend = {
    loadAds: loadAds,
    uploadAd: uploadAd,
  };

})();

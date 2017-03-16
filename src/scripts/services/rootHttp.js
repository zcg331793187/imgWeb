/**
 * Created by zhoucaiguang on 16/9/1.
 */
angular.module('imgWebApp').service('rootHttp', ['$http', '$q', 'toastr', 'urlAction', function ($http, $q, toastr, urlAction) {

  return {
    httpGet: function (url,data) {


        var requestParam = {url: url, method: 'get',data:data};


        return this.RequestContainer(requestParam, this._HttpGet(url));
    },
    RequestContainer: function (requestParam, http) {

     var requestContainer =  this.getRequestContainer();

      var promise = requestContainer.put(JSON.stringify(requestParam), http);
      return promise.promise;
    }
    ,
    httpPost: function (url, arg) {
      var requestParam = {url: url, data: arg, method: 'post'};

      // console.log('httpPost');
      return this.RequestContainer(requestParam, this._HttpPost(url, arg));

    },
      _HttpGet: function (url) {

          var deferred = $q.defer();


          var requestParam = {url: url, method: 'get'};

          var requestContainer =  this.getRequestContainer();
          var isExist = requestContainer.verifyIfExist(JSON.stringify(requestParam));
          var canceler = $q.defer();
          var timeout = null;
          var isLine = navigator.onLine;
          if (isExist) {
              timeout = canceler.promise;
          } else if(isLine){
              timeout = 10000;
          }else{
              timeout = canceler.promise;
          }

          var postCfg = {
              headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
              timeout: timeout
          };

          // console.log(navigator);
          var ajax = $http.get(url,postCfg).then(function (res) {


              if (res.status == 200) {
                  deferred.resolve(res.data);
              }
          }, function (res) {
              var config = res['config'];
              var timeout = config.timeout;
              if (angular.isNumber(timeout)) {
                  // console.log('isNumber');
                  toastr.error('您网络似乎不太顺畅。', '提示');
              } else {


                  // console.log('isPromise');
              }
              // console.log(res);



              // urlAction.gotoUrl('newWorkError');
              deferred.reject([]);
          });


          deferred.promise.abort = function () {


              canceler.resolve();
          };


          return deferred.promise;
      }
      ,
    _HttpPost: function (url, arg) {

      var deferred = $q.defer();
      var transFn = function (data) {
        return $.param(data);
      };
      var requestParam = {url: url, data: arg, method: 'post'};

      var requestContainer =  this.getRequestContainer();
      var isExist = requestContainer.verifyIfExist(JSON.stringify(requestParam));
      var canceler = $q.defer();
      var timeout = null;
      var isLine = navigator.onLine;
      if (isExist) {
        timeout = canceler.promise;
      } else if(isLine){
        timeout = 10000;
      }else{
        timeout = canceler.promise;
      }

      var postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transFn,
        timeout: timeout
      };

      // console.log(navigator);
      var ajax = $http.post(url, arg, postCfg).then(function (res) {


        if (res.status == 200) {
          deferred.resolve(res.data);
        }
      }, function (res) {
        var config = res['config'];
        var timeout = config.timeout;
        if (angular.isNumber(timeout)) {
          // console.log('isNumber');
          toastr.error('您网络似乎不太顺畅。', '提示');
        } else {


          // console.log('isPromise');
        }
        // console.log(res);



        // urlAction.gotoUrl('newWorkError');
        deferred.reject([]);
      });


      deferred.promise.abort = function () {


        canceler.resolve();
      };


      return deferred.promise;
    },
    http: function (arg) {
      var deferred = $q.defer();
      $http(arg).then(function (data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }, get: function (url) {


      return this.httpGet(url).then(function (res) {


        return res;

      });


    },
    getRequestContainer:function () {

      return RequestContainer.getInstance();
    }
  }


}]);

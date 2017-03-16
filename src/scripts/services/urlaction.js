'use strict';

/**
 * @ngdoc service
 * @name imgWebApp.urlAction
 * @description
 * # urlAction
 * Service in the imgWebApp.
 */
angular.module('imgWebApp')
  .service('urlAction', ['$rootScope', '$timeout', '$location', function ($rootScope, $timeout, $location) {


    return {
      /**
       *
       * @param url 目标url
       * @param timeout 是否延时
       * @param ifReturn 是否可返回 true 不可以返回 false 可以返回
       */
      gotoUrl: function (url, timeout, ifReturn) {
      var _this=this;

        if (ifReturn) {
          if (timeout > 0) {
            $timeout(function () {


              _this.replace(url);

            }, timeout);

          } else {
            _this.replace(url);


          }

        } else {
          if (timeout > 0) {
            $timeout(function () {
              _this.notReplace(url);

            }, timeout);

          } else {

            _this.notReplace(url);

          }
        }


      }
      , replace: function (url) {
        $location.path('/' + url).replace();
      },
      notReplace: function (url) {

        if(this.checkHttpUrl(url)){
          //外部链接
          window.location.href=url;
        }else{
          //app内跳转
          $location.path('/' + url);
        }

      },
      checkHttpUrl:function (url) {
      var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;

        return reg.test(url);
      }


    }


  }]);

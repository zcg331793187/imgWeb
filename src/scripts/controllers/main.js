/**
 * Created by zhoucaiguang on 16/9/1.
 */

(function () {
  "use strict";
  angular.module('imgWebApp').controller('mainController', ['$rootScope', '$scope', '$routeParams', '$location', function ($rootScope, $scope, $routeParams, $location) {


    $rootScope.api = $location.$$protocol+'://'+'api.chowgiftking.com:3003';
    // $rootScope.host = $location.$$protocol+'://'+'img.chowgiftking.com';
      $rootScope.limitPage=0;






    $rootScope.views = {
      controller: {
        header: {}, footer: {}, classes: {}, titleSetting: function (title) {
          var ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger"){

          var body = document.getElementsByTagName('body')[0];
          document.title = title;
          var iframe = document.createElement("iframe");
          iframe.setAttribute("src", "loading.png");
          $(iframe).css("display", "none");
          iframe.addEventListener('load', function() {

            setTimeout(function() {
              $(iframe).unbind('load');
              $(iframe).remove();
            }, 0);
          });
          document.body.appendChild(iframe);
          }
        },
        back:function () {
          history.back();
        },
        rootButton:function (type) {

          $location.path('/' + type);
        }
      }
    };






    $rootScope.pubile = {};





  }]);


})();


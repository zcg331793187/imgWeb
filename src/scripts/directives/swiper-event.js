'use strict';

/**
 * @ngdoc directive
 * @name imgWebApp.directive:swiperEvent
 * @description
 * # swiperEvent
 */
angular.module('imgWebApp')
  .directive('swiperEvent', ['urlAction', function (urlAction) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        // console.log(element);


        if (attrs.urltype || attrs.gourl) {
          $(element).on('click', function () {
            // alert(attrs.urltype);

            var url = goToType(attrs.urltype,attrs.gourl);
            // console.log(url);
            if (url) {
             //响应两次有问题
              urlAction.gotoUrl(url, 10,false)
            }


          })
        }


        function goToType(type,goUrl) {

          var temp = type.replace(/\|[0-9]+/g,'');
          var url =null;
          var id = null;
          var returnURl =null;
          switch (temp) {
            case "S":
              url = 'shop';
              break;
            case "G":
              url = 'good';
              break;
            default:
              break;
          }
          if(url){
            id =type.replace(/[a-zA-Z]\|/g,'');
          }
          if(url&&id){
            returnURl = url+'/'+id;
          }else{
            if(goUrl){
              returnURl = goUrl;
            }
          }






      return returnURl;
        }


      }
    };
  }]);

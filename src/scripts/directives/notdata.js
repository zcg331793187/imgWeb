'use strict';

/**
 * @ngdoc directive
 * @name imgWebApp.directive:NotData
 * @description
 * # NotData
 */
angular.module('imgWebApp')
  .directive('notData', function () {
    return {
      template: '<div></div>',
      restrict: 'AE',
        replace:true,
      link: function postLink(scope, element, attrs) {
          // console.log(scope);
           element.css({textAlign:'center',lineHeight:'50px','display':'block'});
        element.text(attrs.content);
      }
    };
  });

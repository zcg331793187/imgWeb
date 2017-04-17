'use strict';

/**
 * @ngdoc function
 * @name imgWebApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the imgWebApp
 */
angular.module('imgWebApp')
  .controller('SearchCtrl',['$rootScope','$scope','$routeParams','getData','urlAction',function ($rootScope,$scope,$routeParams,getData,urlAction) {

      $scope.loading = true;

      getData.imgSearch($routeParams.title).then(function(data){




          $scope.imgSelect=data;
          $scope.count=data.length;
          $scope.loading = false;
      });


      $scope.searchAction=function(e){
          var keyCode = window.event?e.keyCode:e.which;
          if(keyCode===13){
              // loadnavbar.clean();
              $scope.loading = true;
              urlAction.gotoUrl('search/'+$scope.searchTitle);


          }




      };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name imgWebApp.controller:ImgdetailCtrl
 * @description
 * # ImgdetailCtrl
 * Controller of the imgWebApp
 */
angular.module('imgWebApp')
  .controller('ImgdetailCtrl',['$rootScope','$scope','$routeParams','getData',function ($rootScope,$scope,$routeParams,getData) {


      $scope.loading=true;
      getData.getDetail($routeParams.imgDetailId).then(function(data){
          $scope.imgs = data;
          $scope.loading=false;
      });
      $scope.title = $routeParams.imgDetailId;
  }]);

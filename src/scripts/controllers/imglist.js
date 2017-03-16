'use strict';

/**
 * @ngdoc function
 * @name imgWebApp.controller:ImglistCtrl
 * @description
 * # ImglistCtrl
 * Controller of the imgWebApp
 */
angular.module('imgWebApp')
  .controller('ImglistCtrl',['$rootScope','$scope','getData','urlAction','$routeParams',function ($rootScope,$scope,getData,urlAction,$routeParams) {




      $scope.loading = true;


      if(!Number($routeParams.limit)){
          $scope.limit = 0;
      }else{
          $scope.limit = $routeParams.limit;
      }

      getData.imgSelect($scope.limit).then(function(data){
          $scope.imgSelect = data;
          $scope.loading = false;

      });

      getData.imgTotal().then(function(data){


          $scope.imgTotal = data.count;
          $scope.loading = false;
      });



      $scope.searchAction=function(e){
          var keyCode = window.event?e.keyCode:e.which;
          if(keyCode===13){
              // loadnavbar.clean();
              $scope.loading = true;
              getData.imgSearch($scope.searchTitle).then(function(data){
                  $scope.imgSelect=data;
                  $scope.loading = false;
              });
          }




      };




      $scope.limitPageInfo = function() {
          $scope.loading = true;
          // loadnavbar.clean();
          $scope.$emit('limitPageInfo', $rootScope.limitPage);
      };
      $scope.goto=function(){
          console.log($rootScope.limitPage);
          $scope.limitPageInfo();
          imgdatabase.imgSelect($scope.limitPage).then(function(data){
              $scope.imgSelect = data;
              $scope.loading = false;
          });
      };

      $scope.page=function(page){

          // loadnavbar.clean();
          console.log($rootScope.loading);
          if(page){
              $rootScope.limitPage= Number($rootScope.limitPage)+18;


              urlAction.gotoUrl('imgList/'+$rootScope.limitPage);
              /*
              $scope.limitPageInfo();
              getData.imgSelect($rootScope.limitPage).then(function(data){
                  $scope.imgSelect = data;
                  $scope.loading = false;
              });
              */

          }else{
              if($rootScope.limitPage>0){
                  $rootScope.limitPage=Number($rootScope.limitPage)-18;
                  $scope.limitPageInfo();
                  getData.imgSelect($rootScope.limitPage).then(function(data){
                      $scope.imgSelect =data;
                      $scope.loading = false;

                  });
              }

          }
          console.log($rootScope.limitPage);
      }





  }]);

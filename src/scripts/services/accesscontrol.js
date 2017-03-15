'use strict';

/**
 * @ngdoc service
 * @name imgWeb.AccessControl
 * @description
 * # AccessControl
 * Service in the imgWeb.
 * 路由权限控制
 * needLoginList：需要登录的列表的控制器
 */
angular.module('imgWeb')
  .service('AccessControl',['$log',function ($log) {
    return {
      //需要登录进入的路由列表
      needLoginList:[
      ],
      checkNextRoute:function () {

            if(this.needLoginList.indexOf(this.nextRouteController)>-1){
              // $log.debug('需要登录，检查中');




            }



      },init:function (nextRoute) {
        // console.log('控制器'+nextRoute.$$route.controllerAs);

        // $log.info('accessStart');
        if(nextRoute.$$route){
        this.nextRouteController = nextRoute.$$route.controllerAs;
        // console.log('init');
        // $log.debug('下一个路由：'+this.nextRouteController);
        this.checkNextRoute();
        }else{
          $log.error(nextRoute);
        }
        // $log.info('accessEnd');
        // console.dir(nextRoute);
      }
    };

  }]);

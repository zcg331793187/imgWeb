(function () {

  "use strict";
  angular.module('imgWebApp',['ngRoute','ngAnimate','toastr','ksSwiper','LocalStorageModule','me-lazyimg'])
    .config(function(localStorageServiceProvider){
      localStorageServiceProvider.setPrefix('imgWebAppPrefix');
      // localStorageServiceProvider.setStorageCookieDomain('example.com');
      // localStorageServiceProvider.setStorageType('sessionStorage');
    })
  .config(['$provide', function ($provide) {
    $provide.decorator('ngClickDirective',['$delegate','$timeout', function ($delegate,$timeout) {
      var original = $delegate[0].compile;
      var delay = 200;
      $delegate[0].compile = function (element, attrs, transclude) {

        var disabled = false;
        function onClick(evt) {
          if (disabled) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
          } else {
            disabled = true;
            $timeout(function () { disabled = false; }, delay, false);
          }
        }
        //   scope.$on('$destroy', function () { iElement.off('click', onClick); });
        element.on('click', onClick);

        return original(element, attrs, transclude);
      };
      return $delegate;
    }]);
  }])
    .config(['$locationProvider', '$routeProvider','toastrConfig',function ($locationProvider,$routeProvider,toastrConfig) {
      // $locationProvider.html5Mode(true).hashPrefix('!');
      angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        positionClass: 'toast-center-center',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
          toast: 'directives/toast/toast.html',
          progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 2000,
        titleClass: 'toast-title',
        toastClass: 'toast'
      });


      $routeProvider
        .when('/imgList', {
          templateUrl: 'views/imglist.html',
          controller: 'ImglistCtrl',
          controllerAs: 'imgList'
        })
        .otherwise({
          redirectTo: '/imgList'
        })

    }])
    .run(['$rootScope','$location','AccessControl','views',function ($rootScope,$location,AccessControl,views) {
      $rootScope.$on('$routeChangeSuccess',function(evt,next,previous){



        // console.log('location:',$location);



      });
      $rootScope.$on('$routeChangeStart',function(evt,next,previous){

        // console.log($location);
        var requestContainer = RequestContainer.getInstance();
         requestContainer.clear(); //中断请求

        views.init(next);
        AccessControl.init(next); //登陆控制


      });
      $rootScope.$on('$routeChangeError',function(current,previous,rejection){
        // console.log(evt);
        console.log('$routeChangeError');
        console.warn(current);
        console.warn(previous);
        console.warn(rejection);

      });
    }]);

    //解决移动端延时300ms
    FastClick.attach(document.body);

})();






'use strict';

/**
 * @ngdoc directive
 * @name imgWebApp.directive:imgload
 * @description
 * # imgload
 */
angular.module('imgWebApp')
  .directive('imgload', ['$rootScope','getData',function ($rootScope,getData) {
    return {
        restrict: 'A',
      link: function postLink(scope, element, attrs) {

          var base64Url = attrs.tempSrc;

          var api  =$rootScope.api;
          var temp =  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScxMjBweCcgaGVpZ2h0PScxMjBweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtaG91cmdsYXNzIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PGc+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzI2NmJhIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTU4LjQsNTEuN2MtMC45LTAuOS0xLjQtMi0xLjQtMi4zczAuNS0wLjQsMS40LTEuNCBDNzAuOCw0My44LDc5LjgsMzAuNSw4MCwxNS41SDcwSDMwSDIwYzAuMiwxNSw5LjIsMjguMSwyMS42LDMyLjNjMC45LDAuOSwxLjQsMS4yLDEuNCwxLjVzLTAuNSwxLjYtMS40LDIuNSBDMjkuMiw1Ni4xLDIwLjIsNjkuNSwyMCw4NS41aDEwaDQwaDEwQzc5LjgsNjkuNSw3MC44LDU1LjksNTguNCw1MS43eiIgY2xhc3M9ImdsYXNzIj48L3BhdGg+PGNsaXBQYXRoIGlkPSJ1aWwtaG91cmdsYXNzLWNsaXAxIj48cmVjdCB4PSIxNSIgeT0iMjAiIHdpZHRoPSI3MCIgaGVpZ2h0PSIyNSIgY2xhc3M9ImNsaXAiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImhlaWdodCIgZnJvbT0iMjUiIHRvPSIwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdmxhdWVzPSIyNTswOzAiIGtleVRpbWVzPSIwOzAuNTsxIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieSIgZnJvbT0iMjAiIHRvPSI0NSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHZsYXVlcz0iMjA7NDU7NDUiIGtleVRpbWVzPSIwOzAuNTsxIj48L2FuaW1hdGU+PC9yZWN0PjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJ1aWwtaG91cmdsYXNzLWNsaXAyIj48cmVjdCB4PSIxNSIgeT0iNTUiIHdpZHRoPSI3MCIgaGVpZ2h0PSIyNSIgY2xhc3M9ImNsaXAiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImhlaWdodCIgZnJvbT0iMCIgdG89IjI1IiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdmxhdWVzPSIwOzI1OzI1IiBrZXlUaW1lcz0iMDswLjU7MSI+PC9hbmltYXRlPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGZyb209IjgwIiB0bz0iNTUiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiB2bGF1ZXM9IjgwOzU1OzU1IiBrZXlUaW1lcz0iMDswLjU7MSI+PC9hbmltYXRlPjwvcmVjdD48L2NsaXBQYXRoPjxwYXRoIGQ9Ik0yOSwyM2MzLjEsMTEuNCwxMS4zLDE5LjUsMjEsMTkuNVM2Ny45LDM0LjQsNzEsMjNIMjl6IiBjbGlwLXBhdGg9InVybCgjdWlsLWhvdXJnbGFzcy1jbGlwMSkiIGZpbGw9IiNmZmFiMDAiIGNsYXNzPSJzYW5kIj48L3BhdGg+PHBhdGggZD0iTTcxLjYsNzhjLTMtMTEuNi0xMS41LTIwLTIxLjUtMjBzLTE4LjUsOC40LTIxLjUsMjBINzEuNnoiIGNsaXAtcGF0aD0idXJsKCN1aWwtaG91cmdsYXNzLWNsaXAyKSIgZmlsbD0iI2ZmYWIwMCIgY2xhc3M9InNhbmQiPjwvcGF0aD48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA1MCA1MCIgdG89IjE4MCA1MCA1MCIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIHZhbHVlcz0iMCA1MCA1MDswIDUwIDUwOzE4MCA1MCA1MCIga2V5VGltZXM9IjA7MC43OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PC9zdmc+"
          attrs.$set('src',temp);


          if(!base64Url){

              return;
          }else{


              getData.imgProxy(base64Url).then(function (error,res) {

                  if(error){
                      console.log(
                          error
                      );
                      return;
                  }
                  attrs.$set('src',data.base64);
              });

          }



      }
    };
  }]);
/**
 * Created by zhoucaiguang on 16/9/1.
 */

angular.module('imgWebApp').service('getData', ['$rootScope', 'rootHttp', '$q', 'localStorageService', function ($rootScope, rootHttp, $q, localStorageService) {


    return {
        getDetail: function (title) {

            var url = $rootScope.api + '/img/imgDetail/title/' + title;
            var data = {
                title:title
            };

            return rootHttp.httpGet(url,data);
        },
        imgTotal: function () {

            var url = $rootScope.api + '/img/imgtotal';


            return rootHttp.httpGet(url);
        },
        imgSearch: function (title) {
            var url = $rootScope.api + '/img/imgSearch/title/' + title;

            var data = {
                title:title
            };

            return rootHttp.httpGet(url,data);

        }, imgSelect: function (limit) {
            var url = $rootScope.api + '/img/databaseSelect/limit/' + limit;

            var data = {
                limit:limit
            };

            return rootHttp.httpGet(url,data);
        }, imgProxy: function (imgUrl) {

            var url = $rootScope.api + '/img-proxy?path=' + encodeURIComponent(imgUrl);

            var data = {
                imgUrl:imgUrl
            };

            return rootHttp.httpGet(url, data);
        }


    }


}]);

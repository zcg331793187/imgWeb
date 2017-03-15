/**
 * Created by zhoucaiguang on 16/9/1.
 */

angular.module('imgWeb').service('getData', ['$rootScope', 'rootHttp', '$q', 'localStorageService', function ($rootScope, rootHttp, $q, localStorageService) {

  var lat = 113.327636;
  var lon = 23.147463;
  var userInfo, user_id;


  this.indexService = {
    swiperImgDefaultData:function () {


      return [
        {adFile:'wx/images/01.jpg'},
        {adFile:'wx/images/02.jpg'},
        {adFile:'wx/images/03.jpg'},
        {adFile:'wx/images/04.jpg'},
        {adFile:'wx/images/05.jpg'}
      ]

    },
    refundInfo:function (orderId) {
      var url = $rootScope.api +'get_tuikuan_xx.php';
      var arg  ={
        orderId:orderId
      };

      return rootHttp.httpPost(url, arg);


    },
    scopeNotice:function () {
      var url = $rootScope.api +'get_luck_gonggao.php';
      var arg  ={
        start:0,
        num:10
      };

      return rootHttp.httpPost(url, arg);



    },
    bankInfo:function () {
      var url = $rootScope.api +'get_fenxiao_tixian_yinhang.php';
      var arg  ={};

      return rootHttp.httpPost(url, arg);


    },
    withdrawList:function () {
      var url = $rootScope.api +'get_tixian_jilu.php';
      var userId = this.publicGetUserId();
      var arg  ={user_id:userId};

      return rootHttp.httpPost(url, arg);
    },
    userMoney:function () {
      var url = $rootScope.api +'get_tixian_pz.php';
      var userId = this.publicGetUserId();
      var arg  ={user_id:userId};

      return rootHttp.httpPost(url, arg);
    },
    useCoupon:function (shopId) {

      var url = $rootScope.api +'get_yhq_wsy2.php';
      var userId = this.publicGetUserId();
      var arg  ={shopId:shopId,user_id:userId};

      return rootHttp.httpPost(url, arg);

    },
    spikeTime:function () {

      var url = $rootScope.api +'get_miaosha_time.php';

      var arg  ={};

      return rootHttp.httpPost(url, arg);
    }
    ,
    getSendTimeList:function (shopId) {

      var url = $rootScope.api + 'get_shops_service.php';




      var arg = {
        shopId: shopId
      };

      return rootHttp.httpPost(url, arg);
    },
    activityCheckOrder: function (goodsId,types) {
      var url = $rootScope.api + 'get_ms_tg.php';
      var type = '';
      if(types=='groupBuy'){
        type = 'tg';
      }else if(types=='spike'){
        type='ms';
      }


      var userId = this.publicGetUserId();
      var arg = {
        goodsId: goodsId,
        type: type,
        user_id: userId
      };

      return rootHttp.httpPost(url, arg);

    },
    activityGoodsSwpier: function (goodsId) {

      var url = $rootScope.api + 'get_goods_lunbo.php';


      var arg = {goods_id: goodsId};

      return rootHttp.httpPost(url, arg);
    },
    activityGoods: function (goodsId, type) {
      var url = null;

      switch (type) {
        case 'groupBuy':
          url = $rootScope.api + 'get_tg_goods.php';
          break;
        case 'spike':
          url = $rootScope.api + 'get_ms_goods.php';
          break;

        default:
          break
      }


      var arg = {goods_id: goodsId};

      return rootHttp.httpPost(url, arg);

    },
    spikeList: function () {

      var url = $rootScope.api + 'get_miaosha_list2.php';
      var userId = this.publicGetUserId();

      var arg = {user_id: userId};

      return rootHttp.httpPost(url, arg);

    },
    groupBuyList: function () {

      var url = $rootScope.api + 'get_tuangou_list.php';

      return rootHttp.httpPost(url, {});
    },
    getLineCouponInfo: function (conponId) {

      var url = $rootScope.api + 'get_yhq_info.php';
      var arg = {youhui_id: conponId};

      return rootHttp.httpPost(url, arg);
    },
    canLineCouponList: function (catId) {
      var url = $rootScope.api + 'get_yhq_dlq_list2.php';
      var userId = this.publicGetUserId();

      var arg = {user_id: userId, catId: catId};

      return rootHttp.httpPost(url, arg);
    }, canUseCouponList: function (catId) {
      var url = $rootScope.api + 'get_yhq_wsy2.php';
      var userId = this.publicGetUserId();

      var arg = {user_id: userId,catId:catId};

      return rootHttp.httpPost(url, arg);
    },
    evaluateInfo: function (orderId) {
      var url = $rootScope.api + 'get_pingjia_info.php';
      var arg = {orderId: orderId};

      return rootHttp.httpPost(url, arg);

    },
    checkLocation: function () {
      var data = localStorageService.get('location');
      var nowTime = Date.parse(new Date()) / 1000;
      if (data) {
        if ((Number(nowTime) - Number(data.lastTime)) > 300) {
          data = null;
        }
      } else {
        data = null;
      }

      return data;
    },
    location: function () {
      var deferred = $q.defer();

      // console.log(localStorageService.get('location'));
      var getCookieLocation = this.checkLocation();


      if (getCookieLocation) {


        // console.log(getCookieLocation);
        deferred.resolve(getCookieLocation);
      } else {
        try {


          BaiduMap.getGeoLocation().then(function (res) {


            res.lastTime = Date.parse(new Date()) / 1000;
            // console.log(localStorageService.set('location',res));
            localStorageService.set('location', res);
            deferred.resolve(res);
          });
        } catch (e) {
          console.warn(e);
        }
      }

      return deferred.promise;
    },
    upLoadChatImg: function () {

      return {url: $rootScope.api + 'shangchuan_chat.php'};
    },
    upLoadUserImg: function () {

      return {url: $rootScope.api + 'shangchuan_user_img.php'};
    },
    upLoadShopImg: function () {

      return {url: $rootScope.api + 'shangchuan_sjrz.php'};
    },
    indexGetShops: function (classId, orderBy) {

      var url = $rootScope.api + 'get_dianpu.php';

      return this.location().then(function (res) {
        // console.log(point);
        if (res) {
          lon = res.point.lng;
          lat = res.point.lat;
          // console.log(point);

        }


        var arg = {lat: lat, lon: lon, lei: classId, paixu: orderBy, shaixuan: 0};

        return rootHttp.httpPost(url, arg);
      });
    },
    newswiperImg: function (type) {
      var url = $rootScope.api + 'get_home_lunbo.php';
      var arg = {type: type};

      return rootHttp.newHttpPost(url, arg);
    }
    ,
    swiperImg: function (type) {
      var url = $rootScope.api + 'get_home_lunbo.php';
      var arg = {type: type};

      return rootHttp.httpPost(url, arg);
    },
    newShopComeOn: function () {
      var url = $rootScope.api + 'get_new_dianpu.php';


      return this.location().then(function (res) {

        if (res) {
          lon = res.point.lng;
          lat = res.point.lat;


        }


        var arg = {lat: lat, lon: lon};

        return rootHttp.httpPost(url, arg);
      });
    },
    publicGetUserInfo: function () {
      var url = $rootScope.api + 'get_user.php';

      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      } else {
        user_id = null;
      }
      var arg = {user_id: user_id};
      return rootHttp.httpPost(url, arg);

    },
    publicGetUserId: function () {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      } else {
        user_id = null;
      }

      return user_id;
    },
    classInfo: function () {
      var url = $rootScope.api + 'get_fenlei_list.php';

      return rootHttp.httpGet(url);
    },
    areaGoodsInfo: function (url, arg) {
      return rootHttp.httpGet();
    },
    allOrder: function (limit,num) {
      var url = $rootScope.api + 'get_all_dingdan3.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id,start:limit,num:num};
      // console.log(arg);
      return rootHttp.httpPost(url, arg);

    },
    myAddressList: function () {
      var url = $rootScope.api + 'get_user_address_list.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id};

      return rootHttp.httpPost(url, arg);
    }, addressItem: function (addressId) {
      var url = $rootScope.api + 'get_user_address.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id, address_id: addressId};
      return rootHttp.httpPost(url, arg);
    }, collectionList: function () {
      var url = $rootScope.api + 'get_collection.php';
      user_id = $cookieStore.get('userInfo').userId;


      return this.location().then(function (res) {

        if (res) {
          lon = res.point.lng;
          lat = res.point.lat;
          // console.log(point);

        }


        var arg = {user_id: user_id, lat: lat, lon: lon};

        return rootHttp.httpPost(url, arg);
      });

      // var arg = {user_id: user_id, lat: lat, lon: lon};
      // return rootHttp.httpPost(url, arg);

    }, shopItemInfo: function (shopId) {
      var url = $rootScope.api + 'get_shops.php';
      var arg = {shopId: shopId};

      return rootHttp.httpPost(url, arg);
    }, serviceCenterListInfo: function () {
      var url = $rootScope.api + 'get_wenzhang_cat.php';


      return rootHttp.httpPost(url, {});

    }, serviceItemContent: function (catId) {
      var url = $rootScope.api + 'get_wenzhang.php';
      var arg = {articleId: catId};
      return rootHttp.httpPost(url, arg);

    }, serviceItemList: function (catId) {

      var url = $rootScope.api + 'get_wenzhang_list.php';

      var arg = {catId: catId};

      return rootHttp.httpPost(url, arg);

    }, shopSetting: function () {
      var url = $rootScope.api + 'get_info.php';


      return rootHttp.httpGet(url, {});
    }, myBalanceInfo: function () {
      var url = $rootScope.api + 'get_user.php';
      user_id = $cookieStore.get('userInfo').userId;
      var arg = {user_id: user_id};
      // console.log(arg);
      return rootHttp.httpPost(url, arg);
    }, myBalanceInfoList: function () {
      var url = $rootScope.api + 'get_zhangdan.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id};


      return rootHttp.httpPost(url, arg);
    }, myScoreInfo: function () {
      var url = $rootScope.api + 'get_user.php';

      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id};

      return rootHttp.httpPost(url, arg);
    }, myScoreInfoList: function () {
      var url = $rootScope.api + 'get_user_jf_jilu.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id};

      return rootHttp.httpPost(url, arg);
    }, allAddressList: function () {

      var url = $rootScope.api + 'get_address_list.php';


      return rootHttp.httpPost(url, {});

    }, allCommunitysList: function () {
      var url = $rootScope.api + 'get_address_list_communitys.php';
      return rootHttp.httpPost(url, {});
    }, orderDetailInfo: function (orderId) {

      var url = $rootScope.api + 'get_dingdan_xx2.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {user_id: user_id, orderId: orderId};

      return rootHttp.httpPost(url, arg);
    }, orderPayInfo: function (orderIdJson) {

      var url = $rootScope.api + 'get_pay_money.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {user_id: user_id, json: orderIdJson};

      return rootHttp.httpPost(url, arg);
    }, orderRefundInfo: function (orderId) {
      var url = $rootScope.api + 'get_order.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {user_id: user_id, orderId: orderId};

      return rootHttp.httpPost(url, arg);
    }, findPageInfo: function (type) {
      var url = $rootScope.api + 'get_jf_goods_list.php';


      var arg = {start: 0, end: 4, type: type};

      return rootHttp.httpPost(url, arg);
    }, checkPayPassWord: function (Number) {
      var url = $rootScope.api + 'pay_pwd_yanzheng.php';

      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      } else {
        user_id = 0;
      }


      var arg = {user_id: user_id, pwd: Number};

      return rootHttp.httpPost(url, arg);
    },
    getPayMoney: function (orderId) {
      var url = $rootScope.api + 'get_pay_money.php';
      var userId = $cookieStore.get('userInfo').userId;

      var data = [{orderId: orderId}];

      var arg = {user_id: userId, json: JSON.stringify(data)};


      return rootHttp.httpPost(url, arg);
    }

  };

  //积分商城
  this.scoreShop = {
    scoreGoodsInfo: function (type, goodsId) {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }
      var url = $rootScope.api + 'get_jf_goods.php';
      var arg = {type: type, goods_id: goodsId};
      if (user_id) {
        arg.user_id = user_id;
      } else {
        arg.user_id = 0;
      }

      return rootHttp.httpPost(url, arg);
    },
    scoreGoodList: function (type, start) {
      var url = $rootScope.api + 'get_jf_goods_list.php';
      var arg = {type: type, start: start};

      return rootHttp.httpPost(url, arg);
    },
    scoreOrders: function (start) {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }


      var url = $rootScope.api + 'get_jf_jilu.php';
      var arg = {user_id: user_id, start: start};

      return rootHttp.httpPost(url, arg);


    },
    scoreOrderDetail: function (orderId) {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }


      var url = $rootScope.api + 'get_jf_jilu_xx.php';
      var arg = {user_id: user_id, orderId: orderId};

      return rootHttp.httpPost(url, arg);
    },
    scorePayNormalGoods: function () {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }
      if ($cookieStore.get('scoreCart')) {
        var goodsId = JSON.parse($cookieStore.get('scoreCart')).goodsId;
      }
      // console.log($cookieStore.get('scoreCart'));
      var url = $rootScope.api + 'get_jf_goods.php';
      var arg = {user_id: user_id, goods_id: goodsId, type: 0};


      return rootHttp.httpPost(url, arg);
    },
    scorePayDefaultAddress: function () {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }

      var url = $rootScope.api + 'get_user_address_default.php';
      var arg = {user_id: user_id};

      return rootHttp.httpPost(url, arg);
    },
    scoreGoodsSwpierImg: function (goodsId) {

      var url = $rootScope.api + 'get_goods_lunbo.php';

      var arg = {goods_id: goodsId};

      return rootHttp.httpPost(url, arg);
    }

  };
  //店铺
  this.shop = {


    chatHistory:function (shopId) {

      var url = $rootScope.api + 'liaotian_csh.php';
      user_id = $cookieStore.get('userInfo').userId;
      var arg = {
        to_user_id:shopId,
        wb_id:0,
        user_id:user_id
      };

      return rootHttp.httpPost(url, arg);


    },
    searchGoods:function (postData) {
      var url  = $rootScope.api + 'get_sousuo_dianpu_goods.php';
      var arg = null;



       arg = postData;

      return rootHttp.httpPost(url, arg);
    },
    evaluateInfo: function (shopId) {

      var url = $rootScope.api + 'get_shop_shaidan.php';

      var arg = {shopId: shopId};

      return rootHttp.httpPost(url, arg);
    },
    shopsCate: function (shopId) {

      var url = $rootScope.api + 'get_shops_fenlei_list.php';

      var arg = {shop_id: shopId};

      return rootHttp.httpPost(url, arg);

    },
    shopCateGoods: function (shopId, cateId) {
      var url = $rootScope.api + 'get_shops_cat_goods.php';

      var arg = {
        get_num: 1,
        yiji_id: cateId,
        erji_id: 0,
        shop_id: shopId
      };

      return rootHttp.httpPost(url, arg);


    }, getShopLike: function (shopId) {

      var url = $rootScope.api + 'guanzhu_shop.php';
      user_id = this.publicGetUserId();

      var arg = {
        shopId: shopId,
        user_id: user_id,
        pan: '2'
      };

      return rootHttp.httpPost(url, arg);


    }, publicGetUserId: function () {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      } else {
        user_id = null;
      }

      return user_id;
    },
    goodsSwiper: function (goodsId) {

      var url = $rootScope.api + 'get_goods_lunbo.php';
      var arg = {goods_id: goodsId};


      return rootHttp.httpPost(url, arg);


    }, goodsInfo: function (goodsId) {


      var url = $rootScope.api + 'get_goods.php';
      var arg = {goods_id: goodsId};


      return rootHttp.httpPost(url, arg);


    }, goodsEvaluateList: function (goodsId) {

      var url = $rootScope.api + 'get_goods_shaidan.php';


      var arg = {goods_id: goodsId};


      return rootHttp.httpPost(url, arg);
    }, goodsAttr: function (goodsId) {
      var url = $rootScope.api + 'get_goods_shuxing.php';


      var arg = {goods_id: goodsId};


      return rootHttp.httpPost(url, arg);


    }


  }


}]);

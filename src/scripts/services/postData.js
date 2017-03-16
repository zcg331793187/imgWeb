/**
 * Created by zhoucaiguang on 16/9/1.
 */

angular.module('imgWebApp').service('postData', ['$rootScope', 'rootHttp', '$cookieStore', 'getData', 'shopCart', function ($rootScope, rootHttp, $cookieStore, getData, shopCart) {

  var user_id;

  /*
  {
    user_id:user_id,
      phone:phone,
    content:content,
    orderId:api.pageParam.wb_id,
    shopId:api.pageParam.shopId
  }
  */
  this.indexService = {
    shopChatMessage:function (to_user_id,content) {
      var url = $rootScope.api + 'liaotian_fasong.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg =  {
        to_user_id:to_user_id,
        wb_id:0,
        user_id:user_id,
        content:content
      };

      return rootHttp.httpPost(url, arg);


    },
    shopComplaints:function (data) {

      var url = $rootScope.api + 'dingdan_tousu.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {
        user_id:user_id,
        phone:data.phone,
        content:data.content,
        orderId:0,
        shopId:data.shopId
      };

      return rootHttp.httpPost(url, arg);
    },
    postWithdraw:function (data) {
      var url = $rootScope.api + 'tixian.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {
        user_id:user_id,
        yinhang:data.yinhang,
        zhihang:data.zhihang,
        kahao:data.kahao,
        xingming:data.xingming,
        sq_money:data.sq_money,
        tel:data.tel
      };

      return rootHttp.httpPost(url, arg);



    },
    resetPassword: function (data) {
      var url = $rootScope.api + 'cz_pwd.php';


      var arg = {
        mobile: data.mobile,
        pwd: data.pwd
      };

      return rootHttp.httpPost(url, arg);
    },
    spikeOrder: function (args) {
      var url = $rootScope.api + 'xiadan_for_miaosha.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {
        shopId: args.shopId,
        youhui_id: args.youhui_id,
        yxiaoji: args.yxiaoji,
        hxiaoji: args.hxiaoji,
        psway: args.psway,
        liuyan: args.liuyan,
        ps_time2: args.ps_time2,
        address_id: args.address_id,
        goods_id: args.goods_id,
        num: args.num,
        user_id: user_id,
        goodss_attr_id: args.goodss_attr_id,
        goods_attr: args.goods_attr
      };


      return rootHttp.httpPost(url, arg);
    },
    groupBuyOrder: function (args) {
      var url = $rootScope.api + 'xiadan_for_tuangou.php';
      user_id = $cookieStore.get('userInfo').userId;
      var arg = {
        shopId: args.shopId,
        youhui_id: args.youhui_id,
        yxiaoji: args.yxiaoji,
        hxiaoji: args.hxiaoji,
        psway: args.psway,
        liuyan: args.liuyan,
        ps_time2: args.ps_time2,
        address_id: args.address_id,
        goods_id: args.goods_id,
        num: args.num,
        user_id: user_id,
        goodss_attr_id: args.goodss_attr_id,
        goods_attr: args.goods_attr,
      };

      return rootHttp.httpPost(url, arg);
    },
    lineCoupon: function (couponId) {
      var url = $rootScope.api + 'lingqu_youhuiquan.php';
      var userId = getData.indexService.publicGetUserId();


      var arg = {
        user_id: userId,
        youhui_id: couponId
      };


      return rootHttp.httpPost(url, arg);
    },
    evaluate: function (orderInfo, starInfo, goodsInfo) {
      var url = $rootScope.api + 'set_pingjia_info.php';
      var userId = getData.indexService.publicGetUserId();


      var arg = {
        orderId: orderInfo.orderId,
        sever: starInfo.sever,
        diver: starInfo.diver,
        shopContent: orderInfo.shopContent,
        json: goodsInfo,
        user_id: userId,
        ni: orderInfo.ni
      };


      return rootHttp.httpPost(url, arg);
    },
    JoinShop: function (shopInfo, areasInfo, imgInfo) {


      var url = $rootScope.api + 'shangjiaruzhu.php';
      var userId = $cookieStore.get('userInfo').userId;
      return getData.indexService.location().then(function (res) {

        if (res) {
          var lon = res.point.lng;
          var lat = res.point.lat;


        }
        var arg = {
          user_id: userId,
          shopName: shopInfo.shopName,
          sheng: areasInfo.sheng_id,
          shi: areasInfo.shi_id,
          qu: areasInfo.qu_id,
          yiji_id: shopInfo.yiji_id,
          erji_id: shopInfo.erji_id,
          shopAddress: shopInfo.shopAddress,
          // xxAddress:sheng+shi+qu+shopAddress,
          xxAddress: shopInfo.shopAddress,
          name: shopInfo.name,
          phone: shopInfo.phone,
          email: shopInfo.email,
          yyzz: shopInfo.yyzz,
          id_number: shopInfo.id_number,
          src1: imgInfo.src1,
          src2: imgInfo.src2,
          src3: imgInfo.src3,
          lon: lon,
          lat: lat
        };

        return rootHttp.httpPost(url, arg);
      });
    },
    settingShopLike: function (shopId, settingType) {
      var url = $rootScope.api + 'guanzhu_shop.php';

      user_id = $cookieStore.get('userInfo').userId;
      var arg = {
        shopId: shopId,
        user_id: user_id,
        pan: settingType
      };

      return rootHttp.httpPost(url, arg);
    },
    complaintOrder: function (sendObj) {
      var url = $rootScope.api + 'dingdan_tousu.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {
        user_id: user_id,
        phone: sendObj.userPhone,
        content: sendObj.message,
        orderId: sendObj.orderId,
        shopId: sendObj.shopId
      };

      return rootHttp.httpPost(url, arg);
    },
    confirmOrder: function (orderId) {

      var url = $rootScope.api + 'set_orderStatus.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {orderId: orderId, user_id: user_id, status: '4'};
      // console.log(arg);
      return rootHttp.httpPost(url, arg);
    },
    cancelOrder: function (orderId) {
      var url = $rootScope.api + 'del_order.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {orderId: orderId, user_id: user_id};
      // console.log(arg);
      return rootHttp.httpPost(url, arg);
    },
    saveAddressInfo: function (addressId, addressInfo) {
      var url = $rootScope.api + 'set_user_address.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {
        user_id: user_id,
        user_name: addressInfo.userName,
        user_mobile: addressInfo.userPhone,
        address1: addressInfo.areaId1,
        address2: addressInfo.areaId2,
        address3: addressInfo.areaId3,
        address4: addressInfo.communityId,
        jiedao: addressInfo.address,
        address_id: addressId
      };

      return rootHttp.httpPost(url, arg);
    }, deleteAddress: function (addressId) {
      var url = $rootScope.api + 'delete_user_address.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {
        user_id: user_id,
        address_id: addressId
      };

      return rootHttp.httpPost(url, arg);

    }, settingDefaultAddress: function (addressId) {
      var url = $rootScope.api + 'set_user_address_default.php';
      user_id = $cookieStore.get('userInfo').userId;


      var arg = {
        user_id: user_id,
        address_id: addressId
      };

      return rootHttp.httpPost(url, arg);
    }, feedBackSend: function (content, phone) {
      var url = $rootScope.api + 'yijianfankui.php';
      user_id = $cookieStore.get('userInfo').userId;

      var type = 0;
      var arg = {
        user_id: user_id,
        phone: phone,
        content: content,
        type: type
      };
      return rootHttp.httpPost(url, arg);


    }, sendCode: function (phone, code) {
      var url = $rootScope.api + 'fssms_yzm.php';
      var arg = {
        mobile: phone,
        yzm: code

      };
      return rootHttp.httpPost(url, arg);
    }, registerAction: function (phone, passWord) {

      var url = $rootScope.api + 'register.php';
      var arg = {
        mobile: phone,
        pwd: passWord

      };
      return rootHttp.httpPost(url, arg);
    }, loginAction: function (userPhone, passWord) {
      var url = $rootScope.api + 'login.php';
      var arg = {
        zh: userPhone,
        pwd: passWord

      };
      return rootHttp.httpPost(url, arg);
    }, settPassWord: function (setStatus, oldPassWord, newPassWord) {
      var url = $rootScope.api + 'set_pay_pwd.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {};
      arg.user_id = user_id;
      arg.pan = setStatus;
      arg.ypwd = oldPassWord;
      arg.hpwd = newPassWord;

      return rootHttp.httpPost(url, arg);
    }, settingLoginPassWord: function (oldPassWord, newPassWord) {
      var url = $rootScope.api + 'set_pwd.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {
        user_id: user_id,
        ypwd: oldPassWord,
        pwd: newPassWord

      };
      return rootHttp.httpPost(url, arg);

    }, settingUserName: function (userName) {
      var url = $rootScope.api + 'set_user_name.php';
      user_id = $cookieStore.get('userInfo').userId;

      var arg = {
        user_id: user_id,
        user_name: userName

      };
      return rootHttp.httpPost(url, arg);

    }, saveNewAddressInfo: function (addressInfo) {
      var url = $rootScope.api + 'add_address.php';
      user_id = $cookieStore.get('userInfo').userId;
      var arg = {
        user_id: user_id,
        user_name: addressInfo.userName,
        user_mobile: addressInfo.userPhone,
        address1: addressInfo.areaId1,
        address2: addressInfo.areaId2,
        address3: addressInfo.areaId3,
        address4: addressInfo.communityId,
        jiedao: addressInfo.address
      };

      return rootHttp.httpPost(url, arg);
    }, orderRefund: function (orderId, refundType, refundExplain, srcArray) {
      var url = $rootScope.api + 'tuikuan.php';
      user_id = $cookieStore.get('userInfo').userId;
      var arg = {
        user_id: user_id,
        orderId: orderId,
        yy: refundType,
        shuoming: refundExplain,
        src1: srcArray[0],
        src2: srcArray[1],
        src3: srcArray[2]
      };


      return rootHttp.httpPost(url, arg);
    }
  };
  //积分模块接口
  this.scoreShop = {
    scoreOrderSubmit: function (addressId, goodsInfo) {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }
      var goodsId = goodsInfo[0].goodsId;
      var number = goodsInfo[0].payNumber;


      var url = $rootScope.api + 'jf_pay.php';
      var arg = {user_id: user_id, address: addressId, goods_id: goodsId, num: number};

      return rootHttp.httpPost(url, arg);
    }, scoreLotteryOrderSubmit: function (goodsId) {
      if ($cookieStore.get('userInfo')) {
        user_id = $cookieStore.get('userInfo').userId;
      }
      var goodsId = goodsId;

      var url = $rootScope.api + 'jf_cj.php';
      var arg = {user_id: user_id, goods_id: goodsId};

      return rootHttp.httpPost(url, arg);
    }


  };

  this.shopOrder = {
    postOrder: function (shop) {

      var url = $rootScope.api + 'xiadan_for_yungou.php';

      var userId = getData.indexService.publicGetUserId();

      var goodsInfo = shopCart.cart.getShopGoods(shop.shopId);
      var shopInfo = [
        {
          "shops_id": shop.shopId,
          "shops_youhui": shop.couponId,
          "yxiaoji": shop.yxiaoji,
          "hxiaoji": shop.hxiaoji,
          "shops_psway": shop.psway,
          "shops_liuyan": shop.message,
          "ps_time": shop.sendTime
        },
        {
          "address_id": shop.addressId
        }
      ];


      var arg = {
        user_id: userId,
        json: JSON.stringify(shopInfo),
        buycar: JSON.stringify(goodsInfo),
        shopId: shop.shopId
      };
      return rootHttp.httpPost(url, arg);
    },
    payMoney: function (orderIds, payType) {
      var url = $rootScope.api + 'pay.php';

      var userId = getData.indexService.publicGetUserId();
      var orderInfo = [];

      orderInfo = orderIds;


      var arg = {
        json: JSON.stringify(orderInfo),
        user_id: userId,
        pay_way: payType
      };
      return rootHttp.httpPost(url, arg);


    }


  };


}]);

/**
 * Created by zhoucaiguang on 16/9/1.
 */
angular.module('imgWeb')
  .factory('formatAjaxData', [ '$rootScope', 'localStorageService', '$routeParams', function ( $rootScope, localStorageService, $routeParams) {
    var _thisData = {sonAddress: [], communitysList: []};
    var _thisCat = [];
    return {
      handleEmojiData:function () {

        var j = 0;
        var data  = [];
        var max = emojiJson.length;

        for(var i = 0;max>i;i++){


          if(data[j]==undefined){
            data[j] = [];
          }


          if(data[j].length<35){
            data[j].push(emojiJson[i]);
          }else{
            data[j].push({name:'delete',text:'删除'});
            j++;
          }


          // console.log(max);
          if(i==max-1){
            data[j].push({name:'delete',text:'删除'});
          }



        }





        return data;

      },
      isPhoneExp:function (phone) {
        var exp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          return exp.test(phone);


      },
      stringToEmoji:function (string) {
        var   tempStringPath;

           tempStringPath = _.find(emojiJson, {
          text: string
        }, 'text');


         return tempStringPath;

      },
      moreEmojiTextToString:function (string) {



        var patt = /\[[^\]]+\]/g;


        var text = string.match(patt);


        var newString = '';
        var findResult = null;

        _(text).forEach(function (item) {







          findResult =  _.find(emojiJson, {
            text: item
          }, 'text');





          if(findResult){

            newString="<img src='"+$rootScope.host+'/emotion/'+findResult.name+".png"+"'/>";

            string= string.replace(item,newString);

          }


        });






        return string;

      },
      emojiToString:function (name) {
        var   tempStringPath;
         tempStringPath = _.find(emojiJson, {
          name: name
        }, 'name');


        return tempStringPath;
      },
      shopChatDifference: function (localData, data, shopId) {
        var status = null;
        var tempData = _.clone(data);
        // _(localData)
        _(data).forEach(function (item) {

          // console.log(item);


          if (item) {

            status = _.findIndex(localData, {
              'id': item.id
            });

            if (status > -1 || item.userId != shopId) {

              _.remove(tempData, function (n) {


                if (n.id == item.id) {
                  return true;
                } else {
                  return false;
                }

              });

              // console.log('已下载');
              // console.log();
            }
          }

        });

        // console.log(tempData);
        // console.log(data);

        if (tempData.length > 0) {

          _(tempData).forEach(function (item) {


            localData.push(item);

          });


        }


        return localData;
      },
      shopChat: function (data, userPhoto, shopPhoto, userId) {
        var reg = new RegExp(/src=\"/, "g"); //创建正则RegExp对象
        for (var i = 0; data.length > i; i++) {


          if (angular.isString(data[i].content)) {
            data[i].content = data[i].content.replace(reg, "src=\"" + $rootScope.host + '/');

          }

          if (!angular.isObject(data[i].content)) {
            data[i].content = $sce.trustAsHtml(data[i].content);
          }

          if (userId == data[i].userId) {


            if(userPhoto){
              data[i].userPhoto = {
                backgroundImage: 'url("' + $rootScope.host + '/' + userPhoto + '")'
              }
            }else{
              data[i].userPhoto = {
                backgroundImage: 'url("' + $rootScope.host + '/' + 'member.jpg' + '")'
              }
            }


          } else {



            if(shopPhoto){
              data[i].youUserPhoto = {
                backgroundImage: 'url("' + $rootScope.host + '/' + shopPhoto + '")'
              }
            }else{
              data[i].youUserPhoto = {
                backgroundImage: 'url("' + $rootScope.host + '/' + 'member.jpg' + '")'
              }
            }
          }


        }


        return data;
      },
      handleDiscountedMoney: function (totalMoney, breaksMenoy) {


        var money = parseFloat(totalMoney) * (1 - (parseFloat(breaksMenoy) / 10));
        return money;
      },
      couponDiscountedAllGoods: function () {
        var totalMoney = shopCart.cart.totalShopCartMoney(this.shopId);
        var couponInfo = this.couponInfo;
        // console.log(totalMoney);
        var money = 0;
        money = this.handleDiscountedMoney(totalMoney, couponInfo.breaks_menoy);
        return money;
      },
      couponDiscountedShopCat: function () {
        //弃用


      },
      couponDiscountedGoods: function () {
        var _this = this;


        var couponInfo = this.couponInfo;
        var goodsIds = this.couponSplit(couponInfo, 'good_id');
        var money = 0;
        // console.log(goodsIds);
        // return money;
        if (!goodsIds)return money;
        var goodsTotal = 0;
        _(goodsIds).forEach(function (item) {
          if (item) {
            goodsTotal += shopCart.cart.getCartGoodsTotalMoney(_this.shopId, item);

          }


        });

        money = this.handleDiscountedMoney(goodsTotal, couponInfo.breaks_menoy);


        return money;

      },
      couponDiscountedBrands: function () {
        //弃用


      },
      couponDiscountedPlatformCat: function () {

        var _this = this;
        var couponInfo = this.couponInfo;
        var money = 0;
        var catIds = this.couponSplit(couponInfo, 'deal_cate_id');

        var platformCatsTotalMoney = 0;

        var catType = '';
        if (!catIds)return money;
        if (Number(couponInfo.deal_cate_type) == 1) {
          catType = 'goodsCatId1';
        } else if (Number(couponInfo.deal_cate_type) == 2) {
          catType = 'goodsCatId2';
        } else if (Number(couponInfo.deal_cate_type) == 3) {
          catType = 'goodsCatId3';
        }

        _(catIds).forEach(function (item) {

          platformCatsTotalMoney += shopCart.cart.getCartPlatformCatsTotalMoney(_this.shopId, catType, item);


        });


        money = this.handleDiscountedMoney(platformCatsTotalMoney, couponInfo.breaks_menoy);


        return money;

      },
      couponDiscounted: function (couponInfo, shopId) {
        this.shopId = shopId;
        this.couponInfo = couponInfo;
        var money = 0;
        var couponScope = Number(couponInfo.youhui_scope);//优惠范围1所有商品2商品分类3指定商品4指定品牌5平台分类


        switch (couponScope) {
          case 1:
            money = this.couponDiscountedAllGoods();
            break;
          case 2:
            money = this.couponDiscountedShopCat();
            break;
          case 3:
            money = this.couponDiscountedGoods();
            break;
          case 4:
            money = this.couponDiscountedBrands();
            break;
          case 5:
            money = this.couponDiscountedPlatformCat();
            break;
          default:
            console.warn('未知优惠范围');
            break;
        }


        return money;
      },
      BJAreasInfoIsOk: function (data) {
        //商家入驻省市区校验
        var result = {status: true, 'message': '省市区验证通过'};
        _(data).forEach(function (item) {
          if (!item) {
            result = {status: false, 'message': '请选择完整省市区信息'};
          }

        });
        return result;
      },

      BJShopInfoIsOk: function (data) {
        //商家入驻店铺信息校验
        var result = {status: true, 'message': '店铺信息验证通过'};
        _(data).forEach(function (item) {
          if (!item) {
            result = {status: false, 'message': '请填写完整店铺信息'};
          }

        });


        return result;
      },
      BjImgInfoIsOk: function (data) {
        //商家入驻上传图片校验
        var result = {status: true, 'message': '上传图片验证通过'};
        _(data).forEach(function (item) {
          if (!item) {
            result = {status: false, 'message': '请上传完整图片信息'};
          }

        });


        return result;
      },
      checkBusinessJoinEnterData: function (type, data) {
        var areasInfo, shopInfo, imgInfo;
        var result = {status: false, 'message': '未知检查数据类型'};
        switch (type) {
          case 'areasInfo':
            result = this.BJAreasInfoIsOk(data);
            break;
          case 'shopInfo':
            result = this.BJShopInfoIsOk(data);
            break;
          case 'imgInfo':
            result = this.BjImgInfoIsOk(data);
            break;
        }

        return result;
      },
      handleCouponText: function (item) {
        //输入优惠文本
        var text = '满' + item.total_fee + '元';
        var couponType = Number(item.youhui_type);
        var couponTypeText = '';
        if (couponType == 0) {
          couponTypeText = '减' + item.breaks_menoy + '元';
        } else if (couponType == 1) {
          couponTypeText = item.breaks_menoy + '折';
        } else {

        }


        return text + couponTypeText;
      },
      couponSplit: function (info, type) {
        return info[type].split(",");
      },
      shopCartMoneyBigTotalFee: function (money, total_fee) {
        var status;
        if (Number(money) >= Number(total_fee)) {
          status = true;
        } else {
          status = false;
        }

        return status;
      },
      couponPlatformCat: function (info) {
        //优惠类型：商城分类
        var _this = this;
        var status = false;
        var platformCatsTotalMoney = 0;
        var cartCat = null;
        var catIds = this.couponSplit(info, 'deal_cate_id');

        if (!catIds)return false;

        var catType = '';

        if (Number(info.deal_cate_type) == 1) {
          catType = 'goodsCatId1';
        } else if (Number(info.deal_cate_type) == 2) {
          catType = 'goodsCatId2';
        } else if (Number(info.deal_cate_type) == 3) {
          catType = 'goodsCatId3';
        } else {


        }

        _(catIds).forEach(function (item) {

          platformCatsTotalMoney = shopCart.cart.getCartPlatformCatsTotalMoney(_this.shopId, catType, item);


          cartCat = shopCart.cart.getCartKeyData(_this.shopId, catType, item);


          if (cartCat > -1) {
            status = _this.shopCartMoneyBigTotalFee(platformCatsTotalMoney, info.total_fee);
          }


        });


        return status;
      },
      couponBrands: function (info) {
        //优惠类型：指定品牌
        var _this = this;
        var status = false;
        var cartCat = null;
        var brandIds = this.couponSplit(info, 'brand_id');

        if (!brandIds)return false;
        var brandTotal = null;


        _(brandIds).forEach(function (item) {
          brandTotal = shopCart.cart.getCartGoodsTotalMoney(_this.shopId, item);
          cartCat = shopCart.cart.getCartKeyData(_this.shopId, 'brandId', item);


          if (cartCat == true) {
            status = _this.shopCartMoneyBigTotalFee(brandTotal, info.total_fee);
          }


        });


        return status;

      },
      couponGoods: function (info) {
        //优惠类型：指定商品
        var _this = this;
        var status = false;
        var cartCat = null;
        var goodsIds = this.couponSplit(info, 'good_id');

        if (!goodsIds)return false;
        var goodsTotal = null;
        _(goodsIds).forEach(function (item) {
          goodsTotal = shopCart.cart.getCartGoodsTotalMoney(_this.shopId, item);
          cartCat = shopCart.cart.getCartKeyData(_this.shopId, 'goods_id', item);


          if (cartCat == true) {
            status = _this.shopCartMoneyBigTotalFee(goodsTotal, info.total_fee);

          }


        });


        return status;

      },
      couponShopCat: function (info) {
        //优惠类型：指定分类
        var _this = this;
        var status = false;
        var cartCat = null;
        var catIds = this.couponSplit(info, 'shop_cat_id');

        if (!catIds)return false;
        var shopCartTotal;
        var catType = '';
        if (Number(info.shop_cat_type) == 2) {
          catType = 'shopCatId1';
        } else if (Number(info.shop_cat_type) == 3) {
          catType = 'shopCatId2';
        }

        _(catIds).forEach(function (item) {

          shopCartTotal = shopCart.cart.getCartShopCatTotalMoney(_this.shopId, catType, item);

          cartCat = shopCart.cart.getCartKeyData(_this.shopId, catType, item);
          if (cartCat > -1) {
            status = _this.shopCartMoneyBigTotalFee(shopCartTotal, info.total_fee);
          }


        });


        return status;

      },
      couponAllGoods: function (info) {
        //优惠类型：所有商品
        var total_fee = info.total_fee;
        var _this = this;
        var shopCartTotal = shopCart.cart.totalShopCartMoney(this.shopId);
        var status;
        status = _this.shopCartMoneyBigTotalFee(shopCartTotal, total_fee);


        return status;
      },
      handleCouponType: function (type, couponInfo) {
        // console.log(type);
        // var cartList = shopCart.cart.getShopGoods(this.shopId);

        switch (type) {
          case 1:
            return this.couponAllGoods(couponInfo);
            break;
          case 2:
            return this.couponShopCat(couponInfo);
            break;
          case 3:
            return this.couponGoods(couponInfo);
            break;
          case 4:
            return this.couponBrands(couponInfo);
            break;
          case 5:
            return this.couponPlatformCat(couponInfo);
            break;
          default:
            console.warn('未知优惠券类型');
            break;
        }


      },
      checkUserCoupon: function (couponList) {
        this.shopId = $routeParams.shopId;
        var _this = this;
        var status = null;
        _(couponList).forEach(function (item) {


          status = _this.handleCouponType(Number(item.youhui_scope), item);

          if (status) {
            item.canUse = true;
            item.couponText = _this.handleCouponText(item);
          } else {
            item.canUse = false;
          }

        });


        return couponList;
      },
      updateSpikeTime: function (time) {
        var obj = {};
        var str;


        var sy_time = time.end_time - Number(Date.parse(new Date()) / 1000);

        var h = parseInt(Number(sy_time / 3600));
        var i = parseInt(Number((sy_time % 3600) / 60));
        var s = parseInt(Number(sy_time % 60));
        str = (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
        obj.value = str;
        obj.times = sy_time;
        return obj;
      },
      groupBuyUpdateTime: function (goodsList) {


        var now_time, time_value, endTime, sy_time, status, shi, fen, miao, tian;

        _(goodsList).forEach(function (item) {


          now_time = Number(Date.parse(new Date()) / 1000);
          // console.log(dq_time);
          endTime = item['endTime'];
          sy_time = Number(endTime) - Number(now_time);


          if (sy_time > 0) {


            if (sy_time > 3600 * 24) status = 1;
            else if (sy_time > 3600) status = 2;
            else status = 0;


            // console.log(status);
            if (status == 0) {
              fen = parseInt(sy_time / 60);
              miao = parseInt(sy_time % 60);
              time_value = (fen >= 10 ? fen : '0' + fen) + ':' + (miao >= 10 ? miao : '0' + miao);
            }
            else if (status == 1) {
              tian = parseInt(sy_time / (3600 * 24));
              shi = parseInt(sy_time % (3600 * 24) / 3600);
              fen = parseInt(sy_time % (3600 * 24) % 3600 / 60);
              miao = parseInt(sy_time % (3600 * 24) % 3600 % 60);
              time_value = tian + '天  ' + (shi >= 10 ? shi : '0' + shi) + ':' + (fen >= 10 ? fen : '0' + fen) + ':' + (miao >= 10 ? miao : '0' + miao);
              // console.log(time_value);
            }
            else if (status == 2) {
              shi = parseInt(sy_time % (3600 * 24) / 3600);
              fen = parseInt(sy_time % (3600 * 24) % 3600 / 60);
              miao = parseInt(sy_time % (3600 * 24) % 3600 % 60);
              time_value = (shi >= 10 ? shi : '0' + shi) + ':' + (fen >= 10 ? fen : '0' + fen) + ':' + (miao >= 10 ? miao : '0' + miao);
            }

            item['timeValue'] = time_value;
            item['time'] = now_time;
            // console.log(time_value);
          } else {

            item['timeValue'] = '已结束';
            item['canNotBuy'] = false;
            // $('.go').eq(i).css('display','none');
            // $('.go_no').eq(i).css('display','block');
          }


        });


        // console.log(goodsList);

        return goodsList;


      },
      handleImgHtml: function (html) {
        return html.replace(/\<img src="/g, '<img src="' + $rootScope.host);
      },
      ordersInfo: function (data) {
        for (var i = 0; i < data.length; i++) {

          data[i].orderStatusString = this.orderStatus(data[i].orderStatus);
          data[i].src = this.isRefundIng(data[i].isRefund);
          console.log(data[i].src);
        }
        return data;
      },
      isRefundIng: function (type) {
        var src = '';
        switch (Number(type)) {
          case 0:
            src = 'orderDetail';
            break;
          case 1:
            src = 'RefundView';
            break;
          case 2:
            src = 'RefundView';
            break;
          case 3:
            src = 'RefundView';
            break;
          default:
            src = 'orderDetail';
            break;
        }

        return src;
      },
      pushMoreOrderInfo: function (list, res) {

        var data = this.ordersInfo(res);
        data.forEach(function (item) {
          list.push(item);
        });


      }
      ,
      orderStatus: function (status) {
        var string = '';
        switch (status) {
          case '0':
            string = '等待发货';
            break;
          case '1':
            string = '已受理';
            break;
          case '2':
            string = '打包中';
            break;
          case '3':
            string = '配送中';
            break;
          case '4':
            string = '已完成';
            break;
          case '-1':
            string = '已取消';
            break;
          case '-2':
            string = '未付款';
            break;
          case '-6':
            string = '退款成功';
            break;
          case "-3":
            string = '退款中';
            break;
          case "-4":
            string = '退款成功';
            break;
          default:
            string = '未知状态';
            break;
        }
        return string;
      }, collectionTotal: function (data) {
        var total = {inArea: 0, notInArea: 0, count: 0};
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_quyu == 1) {
            total.inArea++;
          } else {
            total.notInArea++;
          }
          total.count++;
          // console.log(data[i]);
        }
        return total;
      }, collectionInWhere: function (data) {
        var _data = {inArea: [], notInArea: []};
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_quyu == 1) {
            // data[i].starCss = ''+this.fomatFloat(data[i].starCss);
            //未计算评价星星
            _data.inArea.push(data[i]);
          } else {
            _data.notInArea.push(data[i]);
          }
          // console.log(data[i]);
        }


        return _data;
      }, date: function (time) {

        return time + '000';
      }, IncDecString: function (data) {
        var _data;
        switch (data) {
          case '0':
            _data = '-';
            break;
          case '1':
            _data = '+';
            break;
          default:

            break;

        }

        return _data;
      },
      myBalanceData: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].time = this.date(data[i].time);
          data[i].IncDecString = this.IncDecString(data[i].IncDec);
        }
        return data;
      }, myScoreData: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].IncDecString = this.IncDecString(data[i].IncDec);
        }
        return data;

      }, settingReturnCode: function (returnCode) {
        var _stirng = '';
        switch (returnCode) {
          case 21:
            _stirng = '设置成功';

            break;
          case 22:
            _stirng = '设置失败';
            break;
          case 30:
            _stirng = '原密码错误';
            break;
          case 31:
            _stirng = '修改成功';
            break;
          case 32:
            _stirng = '修改失败';
            break;
        }


        return _stirng;
      }, settingLoginReturnCode: function (code) {
        var _string = '';
        switch (code) {
          case 1:
            _string = '设置成功';
            break;
          case -1:
            _string = '账号不存在';
            break;
          case -2:
            _string = '原密码错误';
            break;
          default:
            _string = '设置失败';
            break;


        }
        return _string;
      }, addressList: function (data) {
        var _data = {province: []};

        _thisData.sonAddress = [];

        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          if (data[i].parentId == 0) {
            _data.province.push(data[i]);
          } else {
            _thisData.sonAddress.push(data[i]);
          }

        }
        return _data;
      }, getSonAddress: function (pid) {
        var _data = [];
        // console.log(_thisData.sonAddress);
        for (var i = 0; i < _thisData.sonAddress.length; i++) {
          // console.log(data[i]);
          if (_thisData.sonAddress[i].parentId == pid) {
            _data.push(_thisData.sonAddress[i]);
          }

        }

        return _data;
      }, saveCommunitysList: function (data) {

        if (_thisData.communitysList.length > 0) {
          return;
        }
        for (var i = 0; i < data.length; i++) {
          _thisData.communitysList.push(data[i]);

        }
      }, getCommunitysList: function (county) {
        var _data = [];
        for (var i = 0; i < _thisData.communitysList.length; i++) {
          if (_thisData.communitysList[i].areaId3 == county) {
            _data.push(_thisData.communitysList[i]);
          }
        }
        return _data;
      }, scorePay: function (data) {
        var res = {};
        if (!$cookieStore.get('scoreCart')) {

          return res.message = '积分购物车为空';
        }
        var CartList = JSON.parse($cookieStore.get('scoreCart'));


        for (var i = 0; data.length > i; i++) {

          if (data[i]['goodsId'] == CartList.goodsId) {

            data[i].payNumber = CartList.payNumber;
            data[i].totalScore = data[i].payNumber * data[i].shopPrice;
          }
        }


        return data;
      },
      payPassWordSort: function (payPassWordArr) {
        var number = '';
        if (payPassWordArr.length !== 6) {
          console.error('passWord length not 6');
        }
        for (var i = 0; payPassWordArr.length > i; i++) {
          number += payPassWordArr[i];
          // console.log(number);
        }
        // console.log('完成后'+number);

        return number;
      }, sortClassData: function (data) {
        var _data = [];
        var _dataIni = 0;
        _data[_dataIni] = [];
        for (var i = 0; data.length > i; i++) {

          if (data[i].parentId == 0) {
            if (_data[_dataIni].length > 7) {
              _dataIni++;
              _data[_dataIni] = [];
            }
            // console.log(_data);
            _data[_dataIni].push(data[i]);

          }


        }
        // console.log(_data);

        return _data;
      },
      getParentId: function (data) {
        var _data = [];
        for (var i = 0; data.length > i; i++) {

          if (data[i].parentId == 0) {

            data[i].childLength = this.getChildLength(data[i].catId);
            // console.log( data[i].catId);
            _data.push(data[i]);
          }


        }


        return _data;
      },
      evaluateHandle: function (data) {


        var _data = {
          all: 0, good: 0,
          bad: 0, list: {all: [], good: [], bad: []},
          totalScope: 0,
          totalGoodsScore: 0,
          totalTimeScore: 0
        };
        if (data.length) {


          _data.all = data.length;
          var _temp = this.forEvaluate(data);
          _data.list = _temp.list;
          _data.good = _temp.list.good.length;

          _data.bad = _temp.list.bad.length;
          _data.totalScope = this.fomatFloat(_temp.totalScope, 1);

          _data.totalGoodsScore = this.fomatFloat(_temp.totalGoodsScore, 1);
          _data.totalTimeScore = this.fomatFloat(_temp.totalTimeScore, 1);

          _data.cssTotalGoodsScore = this.cssFloat('' + this.fomatFloat(_temp.totalGoodsScore, 1));
          _data.cssTotalTimeScore = this.cssFloat('' + this.fomatFloat(_temp.totalTimeScore, 1));
        }


        return _data;
      },
      forEvaluate: function (data) {
        var list = {all: [], good: [], bad: []};
        var totalScope = 0;
        var totalGoodsScore = 0;
        var totalTimeScore = 0;
        for (var i = 0; data.length > i; i++) {
          if (Number(data[i]['serviceScore']) >= 3) {
            list.good.push(data[i]);
          } else {
            list.bad.push(data[i]);
          }
          list.all.push(data[i]);
          totalGoodsScore += Number(data[i]['serviceScore']);
          totalTimeScore += Number(data[i]['timeScore']);


        }

        totalGoodsScore = totalGoodsScore / data.length;
        totalTimeScore = totalTimeScore / data.length;
        totalScope = (totalGoodsScore + totalTimeScore) / 2;


        return {
          list: list,
          totalScope: totalScope,
          totalGoodsScore: totalGoodsScore,
          totalTimeScore: totalTimeScore
        };
      }, fomatFloat: function (src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
      },
      cssFloat: function (string) {


        return string.replace(/\./, '');
      },
      orderDetail_orderStatus: function (input) {
        var _string = '';
        switch (input) {
          case '0':
            _string = '订单待确认';
            break;
          case '1':
            _string = '订单已提交';
            break;
          case '2':
            _string = '商家已接单';
            break;
          case '3':
            _string = '订单配送中';
            break;
          case '4':
            _string = '订单已完成';
            break;
          case '-1':
            _string = '订单退款成功';
            break;
          case '-2':
            _string = '订单待付款';
            break;
          case '-3':
            break;
          default:
            _string = '';
            break;


        }

        return _string;
      }, getChildCat: function (catId) {
        var child = [];

        for (var i = 0; _thisCat.length > i; i++) {

          if (_thisCat[i].parentId == catId) {


            _thisCat[i].childLength = this.getChildLength(_thisCat[i].catId);
            child.push(_thisCat[i]);

          }


        }
        // console.log(child);


        return child;
      }, getChildLength: function (catId) {
        var length = 0;
        for (var i = 0; _thisCat.length > i; i++) {

          if (_thisCat[i].parentId == catId) {
            length++;
          }


        }


        return length;
      }, saveCat: function (data) {
        localStorageService.set('catList', data);


        _thisCat = data;
      }, getCat: function () {
        _thisCat = localStorageService.get('catList');

        return _thisCat;
      },
      handleGoodsAttr: function (data) {
        var _data = {};

        _(data).forEach(function (item) {

          // _data[][]
          if (!_data[item.attrId]) {
            _data[item.attrId] = [];
            _data[item.attrId].attrName = item.attrName;
          }
          if (Number(item.isRecomm) == 1) {
            item.isSelected = 1;
          } else {
            item.isSelected = 0;
          }

          _data[item.attrId].push(item);
          // console.log(item.attrId);
        });

// console.log(_data);
        return _data;
      }, evaluateData: function (data) {
        var _data = {orderInfo: {}, orderGoodsInfo: []};
        var _temp = {};
        _(data).forEach(function (item) {


          if (!_data.orderInfo.orderId) {


            _data.orderInfo.orderId = item.orderId;
            _data.orderInfo.shopName = item.shopName;
            _data.orderInfo.deliverStar = 0;
            _data.orderInfo.shipTimeStar = 0;
          }


          _temp.goodsName = item.goodsName;
          _temp.goodsId = item.goodsId;
          _temp.goodsNums = item.goodsNums;
          _temp.goodsAttrName = item.goodsAttrName;
          _temp.goodsPrice = item.goodsPrice;
          _temp.goodsThums = item.goodsThums;
          _temp.isEnter = false;
          _temp.star = 0;
          _temp.message = '';
          // _temp.goodsName = item.;


          console.log(item);
          _data.orderGoodsInfo.push(_temp);
          _temp = {};
        });


        return _data;
      }, handlePostEvaluateGoodsData: function (data) {
        var _data = [];
        var temp = {};
        // console.log(data);
        _(data).forEach(function (item) {
          temp.id = item.goodsId;
          temp.xing = item.star;
          temp.content = item.message;


          _data.push(temp);
          temp = {};
        });


        return JSON.stringify(_data);
      }


    }


  }]);

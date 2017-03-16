'use strict';

/**
 * @ngdoc service
 * @name imgWebApp.views
 * @description
 * # views
 * Service in the imgWebApp.
 * 控制头部底部切换动画
 */
angular.module('imgWebApp')
  .service('views', ['$rootScope','$log',function ($rootScope,$log) {


    return {
      init:function (Route) {
        // console.log('viewsStart');
        $log.info('viewsStart');


        window.scrollTo(0, 0);
        // angular.element('body').animate({scrollTop: 0}, 500);

        //切换页面动画重置页面滚动条
        // console.log(Route);
        if(Route.$$route){


        $log.debug(Route);
        this.controllerName = Route.$$route.controllerAs;
        // console.log(this.controllerName);
        // this.checkHeader();
        // this.checkLoginRightHeader();
        // this.checkShopRightHeader();
        // this.checkOrderDetailRightHeader();
        // this.checkFooter();
        // this.checkIndexMyHeader();
        // this.checkIndexFooterIcon();
        // this.checkIndexLocationFont();
        this.controlPageAnimation();  //切换路由动画
        // this.weChatBowerTitleSetting();
        //   this.checkShopSearch();
        }else{
          $log.error(Route);
        }
        $log.info('viewsEnd');

      },
      indexPageList:['index','find','userOrders','my'],
      indexLocation:['index'],
      loginPageList:['login'],
      shopPageList:['shop'],
      indexMyPageList:['my'],
      orderDetailPageList:['orderDetail'],
      shopSearchPage:['shopSearch'],
      controllerAboutTitle:{
        userOrders:'订单',
        find:'发现',
        my:' ',
        orderDetail:'订单详情',
        coupon:"优惠券",
        myBalance:"我的钱包",
        myScope:'我的积分',
        myAddress:'我的地址',
        myCollection:'我的收藏',
        businessJoin:'商家入驻',
        serviceCenter:'服务中心',
        aboutShop:'关于我们',
        addNewAddress:'新增地址',
        editMyAddress:'编辑地址',
        feedBack:'意见反馈',
        newShopComeOn:'新店来袭',
        topUp:'充值',
        withdraw:'提现',
        scoreExplain:'积分说明',
        login:'登陆',
        resetPassWord:'忘记密码',
        register:'注册',
        userCenter:'个人中心',
        setPayPassWord:'设置支付密码',
        setLoginPassword:'设置登陆密码',
        setUserName:'设置用户名',
        setUserImg:'设置头像',
        Evaluate:'订单评价',
        Complaint:'订单评价',
        pay:'支付',
        refund:'申请退款',
        scoreGoods:'积分商品',
        scoreOrders:'兑换记录',
        scoreOrderDetail:'兑换详情',
        scorePay:'积分支付',
        moneyExplain:'余额说明',
        goods:'商品详情',
        spike:'秒杀',
        groupBuy:'团购',
        checkOrder:'确认下单',
        useCoupon:'使用优惠券',
        shopSearch:'店铺搜索',
        businessJoinInfo:'商家入驻信息',
        businessJoinProtocol:'商家入驻协议',
        lineCoupon:'领取优惠券',
        activityCheckOrder:' ',
        activityGoods:'商品详情',
        complaintOfShop:'店铺投诉',
        myScore:'我的积分'
      },
      controlPageAnimation:function () {
        if(this.indexPageList.indexOf(this.controllerName)>-1){
          $rootScope.pageViewAnimate = 'rootPage';

        }else{
          $rootScope.pageViewAnimate = 'childPage';


        }

      },
      checkShopSearch:function () {
        if(this.shopSearchPage.indexOf(this.controllerName)>-1){



          $rootScope.views.controller.classes.shopSearch = true;
        }else {
          $rootScope.views.controller.classes.shopSearch = false;
        }
      },
      checkIndexLocationFont:function () {

        if(this.indexLocation.indexOf(this.controllerName)>-1){
          $rootScope.views.controller.classes.index = true;
        }else {
          $rootScope.views.controller.classes.index = false;
        }
      },
      checkIndexFooterIcon:function () {
        if(this.indexPageList.indexOf(this.controllerName)>-1){
          $rootScope.selectedIcon = this.controllerName;
        }
      },
      checkIndexMyHeader:function () {


        if(this.indexMyPageList.indexOf(this.controllerName)>-1){
          // console.log('显示');
          $rootScope.views.controller.classes.my = true;
        }else{
          // console.log('隐藏');
          $rootScope.views.controller.classes.my = false;
        }


      },
      checkHeader:function () {


          if(this.indexPageList.indexOf(this.controllerName)>-1){
            $rootScope.views.controller.header.block = true;

          }else{
            $rootScope.views.controller.header.block = false;
          }


      },
      checkFooter:function () {
        if(this.indexPageList.indexOf(this.controllerName)>-1){
          $rootScope.views.controller.footer.block = true;

        }else{
          $rootScope.views.controller.footer.block = false;
        }
      },checkLoginRightHeader:function () {

        if(this.loginPageList.indexOf(this.controllerName)>-1){
          $rootScope.views.controller.classes.register = true;

        }else{
          $rootScope.views.controller.classes.register = false;
        }


      },checkShopRightHeader:function () {

        if(this.shopPageList.indexOf(this.controllerName)>-1){
          $rootScope.views.controller.classes.shop = true;

        }else{
          $rootScope.views.controller.classes.shop = false;
        }


      },checkOrderDetailRightHeader:function () {

        if(this.orderDetailPageList.indexOf(this.controllerName)>-1){
          $rootScope.views.controller.classes.OrderDetailCall = true;

        }else{
          $rootScope.views.controller.classes.OrderDetailCall = false;
        }


      },weChatBowerTitleSetting:function () {


      if(this.controllerAboutTitle[this.controllerName]){
        $rootScope.views.controller.titleSetting(this.controllerAboutTitle[this.controllerName]);
        // console.log('控制器名称：'+this.controllerAboutTitle[this.controllerName]);
      }

          // console.log(this.controllerAboutTitle[this.controllerName]);
      }



    }


  }]);

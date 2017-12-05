import angular from 'angular';
import uiRouter from 'angular-ui-router';
import router from './router/router.js';
import controller from './js/controllers/controller.js';

import './style/iconfont.less';
import './style/weui.less';
import './style/main.less';

const injectArr = [uiRouter, controller]
const app = angular.module('app', injectArr)
.directive('itemDish',[function(){
	return {
		restrict: 'AE',
		template:require('./pages/menus/dishItem.html')
	}
}])
.directive('cart',[function(){
	return {
		restrict:'AE',
		template: require('./pages/menus/cart.html')
	}
}])
.config(router)

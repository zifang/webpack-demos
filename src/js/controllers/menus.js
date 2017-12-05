'use strict';
import IScroll from 'iscroll';

export default class menusCtrl{
  constructor($state,$http,$timeout) {
  	let _this = this;
  	_this.$http = $http;
  	_this.isList = true;
		_this.menuCount = 0;
		_this.sumCount = 0;
		_this.sumPrice = 0;
		_this.dishesList = [];
		_this.cartList = [];
		_this.showCart = false;
		_this.showClearCart = false;
		_this.replaceCuIndex = false;
		_this.showAnimate = false;
		_this.currentIndex = 0;
		_this.listHeight = [];
		_this.scrollY = 0;
		_this.dropBalls = [];
		_this.balls = [
	        {
	          show:false
	        },
	        {
	          show:false
	        },
	        {
	          show:false
	        },
	        {
	          show:false
	        },
	        {
	          show:false
	        }
	    ];

		_this.$http({
	      	url: '../json/data.json',
	      	method:'GET'
	    }).then(function(res){
	      	_this.dishesList = res.data.model.dishesSortList;
	      	$timeout(function() {
			    	_this.initScroll();
						_this.initHeight();
			    }, 2000);
	    },function(err){
	        console.log(err);
	    });
	}
  initScroll() {
		//iscroll通用模块
		let _this = this;
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端	
		var clickEvent=true;
		if(isAndroid){clickEvent=true;}
		var wrapper = document.getElementById('shopmenu-list');
		_this.myScroll = new IScroll(wrapper, {
			click: clickEvent,
			scrollbars:false,
			probeType: 3,
			mouseWheel: true
			// scrollBar:false
		});

		//左侧菜单滚动条初始化
		var leftmenu = document.getElementById('shopmenu-category');
		_this.leftScroll = new IScroll(leftmenu, {
			click:clickEvent
		})

		_this.myScroll.on('scrollEnd', function () {
			_this.scrollY = Math.abs(Math.round(_this.y))
        for(var j=0; j<_this.listHeight.length; j++){
          var height1 = _this.listHeight[j];
          var height2 = _this.listHeight[j+1];
          if(!height2 || (_this.scrollY>=height1 && _this.scrollY<height2)){
            	if(_this.replaceCuIndex){//点击左边菜单
            		_this.replaceCuIndex = false;
                    return _this.currentIndex;
                }else{
                   	_this.currentIndex = j;
                   	// console.log(_this);
                   	// $scope.$apply();
                   	return;
                }
          }
        }
		});
	}

	//下一步
	nextClick() {
		var _cartList = this.cartList;
		sessionStorage.setItem("cartList",JSON.stringify(_cartList));
		alert(`共消费：¥${this.sumPrice.toFixed(2)}`);
		// $state.go("confirm");
	}

	//选中左侧菜单
	selectMenu(index,event) {
		let _this = this;
		_this.currentIndex = index;
        if(!_this.replaceCuIndex){
          _this.replaceCuIndex = true;
        }
        var foodList = document.getElementsByClassName("listgroup");
        var el = foodList[index];
        //获取列表dom，并且滚动到对应位置 
        _this.myScroll.scrollToElement(el,300);
	}

	//计算菜单分类高度
	initHeight() {
		//计算每个分类的高度
        var foodList = document.getElementsByClassName("listgroup");
        var height = 0;
        this.listHeight.push(height);
        for(let i in foodList){
        	height += i;
        	this.listHeight.push(height);
        }
        // for(var i=0;i<foodList.length;i++){
        //   var item = foodList[i];
        //   height += item.clientHeight;
        //   this.listHeight.push(height)
        // }
	}

	//加菜
	addDish(subitem,target){
		if(!subitem.count){
			subitem['count'] = 0;
		}

		subitem.count++;
		
		//初始化菜单总数量和点餐总数量
		this.initCount();

		//小球动画
		for(let i=0;i<this.balls.length;i++){
          var ball =this.balls[i]
          if(!ball.show){
            ball.show=true;
            ball.el=target;
            this.dropBalls.push(ball);
            return;
          }
        }
	};

	//减菜
	decreaseDish(subitem) {
		if(!subitem.count){
			return;
		}

		subitem.count--;

		//初始化菜单总数量和点餐总数量
		this.initCount();
	};

	//显示隐藏购物车
	showCartList() {
		if(this.sumCount==0) return;
		this.showCart = !this.showCart;
	};

	//确定要清空购物车吗？
	showClearBox() {
		this.showClearCart = true;
		this.showCart = false;
	};

	//确定清空购物车
	clearCart() {
		let _this = this;
		_this.cartList = [];
		_this.sumCount = 0;
		_this.sumPrice = 0;

		angular.forEach(_this.dishesList,function(data,index,array){
			_this.submenuCount = 0;
			angular.forEach(data.list,function(subdata,index,array){
				if(subdata.count){
					subdata.count = 0;
				}

			})
			if(data.submenuCount){
				data.submenuCount = 0
			}
		});

		_this.showClearCart = false;
	};

	//菜品数量统计
	initCount() {
		let _this = this;
		_this.cartList = [];
		_this.sumCount = 0;
		_this.sumPrice = 0;
		angular.forEach(this.dishesList,function(data,index,array){
			_this.submenuCount = 0;
			angular.forEach(data.list,function(subdata,index,array){
				if(subdata.count){
					_this.submenuCount += subdata.count;
					_this.sumCount += subdata.count;
					_this.sumPrice += subdata.count * subdata.price;
					_this.cartList.push(subdata);
				}

			})
			if(!data.submenuCount){
				data['submenuCount'] = 0;
			}
			data.submenuCount = _this.submenuCount;
		})
		
		//如果总数为0，隐藏购物车
		if(_this.sumCount==0){
			_this.showCart = false;
		}
	};
}

menusCtrl.$inject=['$state','$http','$timeout']
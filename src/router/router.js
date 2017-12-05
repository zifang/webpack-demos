const router = function($urlRouterProvider, $stateProvider, $locationProvider){
	// $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    template: require('../pages/menus.html')
  })
  // state('addVersion',{
  // 	url: '/addVersion',
  // 	template: require('../pages/addVersion/addVersion.html')
  // });
}

router.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

export default router;

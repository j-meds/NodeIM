(function(){
	angular.module('app', ['ui.router', 'btford.socket-io'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider){
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Chat', {
			url: '/chat',
			templateUrl: 'views/chat.html',
			controller: 'ChatController',
			controllerAs: 'vm'
		})
		$urlRouterProvider.otherwise('/');
	};
})();
(function(){
	'use strict';
	angular.module('app')
	.controller('ChatController', ChatController);
	ChatController.$inject = ['Socket','$scope', '$location'];

	function ChatController(Socket, $scope, $location){
		Socket.connect();

		$scope.$on('$locationChangeStart', function(event){
			Socket.disconnect(true);
		});
	};
})();
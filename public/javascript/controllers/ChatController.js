(function(){
	'use strict';
	angular.module('app')
	.controller('ChatController', ChatController);
	ChatController.$inject = ['Socket','$scope', '$location', '$interval', '$rootScope'];

	function ChatController(Socket, $scope, $location, $interval, $rootScope){
		var vm = this;
		$rootScope.particle = false;
		$scope.period = "";
		$scope.load = true;

		$scope.users = [];
		$scope.messages = [];

		Socket.connect();
		
		var load = 0;

		var runf = $interval(function(){
			$scope.period += '.'
			load++; 
			if($scope.period.length > 3){
				$scope.period = "";
			};
			if(load === 10){
				$interval.cancel(runf);
			}
			console.log(load);
		}, 500);

		Socket.emit('add-user' , {username: $rootScope.user.name});

		$scope.sendMessage = function(msg){
			Socket.emit('message', {message: msg});
			$scope.msg = '';
		};

		Socket.emit('request-users', {});

		Socket.on('users', function(data){
			$scope.users = data.users;
		});

		Socket.on('message' , function(data){
			$scope.messages.push(data);
		});

		Socket.on('add-user', function(data){
			$scope.users.push(data.username);
			$scope.messages.push({username: data.username, message: 'Has entered the channel'});
		});

		Socket.on('remove-user', function(data){
			$scope.users.splice($scope.users.indexOf(data.username), 1);
			$scope.messages.push({username: data, message: 'has left the channel'});
		});

		Socket.on('prompt-username', function(data){

		});



		$scope.$on('$locationChangeStart', function(event){
			Socket.disconnect(true);
		});


	};
})();
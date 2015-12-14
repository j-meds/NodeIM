(function(){
	'use strict';
	angular.module('app')
	.controller('ChatController', ChatController);
	ChatController.$inject = ['Socket','$scope', '$location', '$interval', '$rootScope', '$timeout', '$state'];

	function ChatController(Socket, $scope, $location, $interval, $rootScope, $timeout, $state){
		
		if($rootScope.user.name){
		Socket.emit('add-user' , {username: $rootScope.user.name});
		$scope.user = $rootScope.user.name;
		}else{
			$state.go('Home');
		}

		$scope.period = "";
		$scope.load = true;

		$scope.users = [];
		$scope.messages = [];

		Socket.connect();
		
		// var load = 0;

		// var runf = $interval(function(){
		// 	$scope.period += '.'
		// 	load++; 
		// 	if($scope.period.length > 3){
		// 		$scope.period = "";
		// 	};
		// 	if(load === 10){
		// 		$interval.cancel(runf);
		// 	}
		// 	console.log(load);
		// }, 500);


		$scope.sendMessage = function(msg){
			Socket.emit('message', {message: msg, date: new Date()});
			$scope.msg = '';
		}
		$scope.showUsers = function(){
			console.log('users: ', $scope.users);
		}
		$scope.showMessages = function(){
			console.log('messages: ', $scope.messages);
		}

		Socket.emit('request-users', function(data) {
			console.log(data);
			$scope.users.push(data);
		});

		Socket.on('users', function(data){
			$scope.users = data.users;
		});

		Socket.on('message' , function(data){
			$scope.messages.push(data);
		});

		Socket.on('add-users', function(data){
			$scope.users.push({username:data});
			$scope.messages.push({username: data, message: 'Has entered the channel'});
		});
		Socket.on('remove-user', function(data){
			$scope.users.splice($scope.users.indexOf(data.username), 1);
			$scope.messages.push({username: data, message: 'has left the channel'});
		});



		$scope.$on('$destroy', function(event){
			Socket.disconnect(true);
		});


	};
})();
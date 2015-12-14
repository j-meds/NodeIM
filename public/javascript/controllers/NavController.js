(function(){
	angular.module('app')
	.controller('NavController', NavController);
	NavController.$inject = ['$scope','$rootScope', '$state'];

	function NavController($scope ,$rootScope, $state){
		var vm = this;
		$rootScope.user = {};
		

		vm.usernameBox = function(){
			bootbox.prompt("Enter Username", function(result) {                
			  if(result){
			  	$rootScope.user.name = result;
			  	$state.go('Chat');
			  }else{
			  	console.log('no user has been entered');
			  }
			});
		}
	};
})();
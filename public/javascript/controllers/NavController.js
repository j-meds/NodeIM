(function(){
	angular.module('app')
	.controller('NavController', NavController);
	NavController.$inject = ['$scope','$rootScope', '$state'];

	function NavController($scope ,$rootScope, $state){
		var vm = this;
		$rootScope.user = {};

		if(!$rootScope.user.name){	
			vm.particle = true;
		}else vm.particle = false;
		

		vm.usernameBox = function(){
			bootbox.prompt("Enter Username", function(result) {                
			  if(result){
			  	$rootScope.user.name = result;
			  	vm.particle = false;
			  	$state.go('Chat');
			  }else{
			  	console.log('no user has been entered');
			  }
			});
		}
	};
})();
(function(){
	angular.module('app')
	.controller('NavController', NavController);
	NavController.$inject = [];

	function NavController(){
		var vm = this;
		vm.particle = true;
	};
})();
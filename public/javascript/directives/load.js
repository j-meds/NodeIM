(function(){
	angular.module('app')
	.directive('loadAnimation', load);

	function load(){
		return {
			restrict: 'AE',
			template: '<div><i class="loading"></i></div>'
		}
	}
})()
(function() {
	'use strict';
	angular.module('app')
	.factory('Socket', Socket);

	Socket.$inject = ['socketFactory'];

	function Socket(socketFactory) {
		return socketFactory();	
	}
})();
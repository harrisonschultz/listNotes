(function(){
	angular.module('listnotes')
		.service('sessionToken', ['$window', function($window) {
			function sessionToken(){
				this.sessionToken = $window.localStorage.getItem('SessionToken');
			}

			sessionToken.prototype.set = function(token) {
				this.sessionToken = token;
				$window.localStorage.setItem('SessionToken', token);
			};

			sessionToken.prototype.get = function(){
				return this.sessionToken;
			};

			sessionToken.prototype.clear = function() {
				this.sessionToken = undefined;
				$window.localStorage.removeItem('SessionToken');
			};
			return new sessionToken();
		}]);
})();
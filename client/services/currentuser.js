(function() {
	angular.module('listnotes')
		.service('currentUser', [ '$window', function($window) {
			function currentUser() {
				var currUser = $window.localStorage.getItem('currentUser');
				if (currUser && currUser !== "undefined") {
					this.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
				}
			}
			currentUser.prototype.set = function(user) {
				this.currentUser = user;
				$window.localStorage.setItem('currentUser', JSON.stringify(user));
			};
			currentUser.prototype.get = function() {
				return this.currentUser || {};
			};
			currentUser.prototype.clear = function() {
				this.currentUser = undefined;
				$window.localStorage.removeItem('currentUser');
			};
			currentUser.prototype.isSignedIn = function() {
				return !!this.get().id;
			};
			return new currentUser();
		}]);
})();
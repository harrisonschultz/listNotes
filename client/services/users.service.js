(function(){
	angular.module('listnotes')
		.service('UsersService', [
			'$http', 'API_BASE', 'SessionToken', 'CurrentUser',
			function($http, API_BASE, SessionToken, CurrentUser) {
				function UsersService(){

				}

				UsersService.prototype.create = function(user) {
					console.log(user);
					var userPromise = $http.post(API_BASE + 'user', {
						user: {username: 'test', password: 'test'}
					});

					userPromise.then(function(response){
						SessionToken.set(response.data.sessionToken);
						CurrentUser.set(response.data.user);
					});
					return userPromise;
				};

				UsersService.prototype.login = function(user) {
					var loginPromise = $http.post(API_BASE + 'login',{
						user: user
					});

					loginPromise.then(function(response){
						
						SessionToken.set(response.data.sessionToken);
						CurrentUser.set(response.data.user);
					});
					return loginPromise;
				};
				return new UsersService();
			}]);
})();
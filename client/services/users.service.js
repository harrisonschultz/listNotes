(function(){
	angular.module('listnotes')
		.service('UsersService', [
			'$http', 'API_BASE', 'sessionToken', 'currentUser',
			function($http, API_BASE, sessionToken, currentUser) {
				function UsersService(){

				}

				UsersService.prototype.create = function(user) {
					console.log("This is the user: ");
						console.log(user);
					var userPromise = $http.post(API_BASE + 'user', {user: user});

					userPromise.then(function(response){
						sessionToken.set(response.data.token);
						currentUser.set(response.data.user);
					});
					return userPromise;
				};

				UsersService.prototype.login = function(user) {
					var loginPromise = $http.post(API_BASE + 'login',{
						user: user
					});

					loginPromise.then(function(response){		
						sessionToken.set(response.data.token);
						currentUser.set(response.data.user);
					});
					return loginPromise;
				};
				return new UsersService();
			}]);
})();
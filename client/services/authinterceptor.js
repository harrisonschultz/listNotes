(function(){
	angular.module('listnotes')
		.factory('AuthInterceptor', ['sessionToken', 'API_BASE', 
			function(sessionToken, API_BASE) {
				return {
					request: function(config) {
						var token = sessionToken.get();
						if (token && config.url.indexOf(API_BASE) > -1) {
							config.headers['Authorization'] = token;
						}
						return config;
					}
				};
			}]);

	angular.module('listnotes')
		.config(['$httpProvider', function($httpProvider) {
			return $httpProvider.interceptors.push('AuthInterceptor');
		}]);
})();
(function () {
	angular.module('listnotes')
		.directive('userlinks',
		function () {
			UserLinksController.$inject = ['$state', 'currentUser', 'sessionToken'];
			function UserLinksController($state, currentUser, sessionToken) {
				var vm = this;
				vm.token = function () {
					return sessionToken.get();
				};

				vm.signedIn = function () {
					
					return !!(vm.token());
				};
				vm.signedOut = function () {
					return !(vm.token());
				};
				vm.login = function () {
					$('#id01').attr('style', 'display:table');
					$('#emailButton').removeAttr('required');
					$('#email').hide();
					$('#Signin').text('Sign In');
					$('#login').attr('value', 'Login');
					$('#new_user').attr('ng-submit', "ctrl.login()");
					$('#signupText').show();
					
				};

				vm.logout = function () {
					currentUser.clear();
					sessionToken.clear();
					$state.go('signin');
				};
			}

			return {
				scope: {},
				controller: UserLinksController,
				controllerAs: 'ctrl',
				bindToController: true,
				templateUrl: '/components/auth/userlinks.html'
			};
		});
})();
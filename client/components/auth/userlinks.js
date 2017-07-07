(function () {
	angular.module('listnotes')
		.directive('userlinks',
		function () {
			UserLinksController.$inject = ['$state', 'CurrentUser', 'SessionToken'];
			function UserLinksController($state, CurrentUser, SessionToken) {
				var vm = this;
				vm.user = function () {
					return CurrentUser.get();
				};

				vm.signedIn = function () {
					return !!(vm.user().id);
				};
				vm.signedOut = function () {
					return !(vm.user().id);
				};
				vm.login = function () {
					$('#id01').attr('style', 'display:table');
					$('#email').hide();
					$('#Signin').text('Sign In');
					$('#login').attr('value', 'Login');
					$('#new_user').attr('ng-submit', "ctrl.login()");
					$('#signupText').show();
					
				};

				vm.logout = function () {
					CurrentUser.clear();
					SessionToken.clear();
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
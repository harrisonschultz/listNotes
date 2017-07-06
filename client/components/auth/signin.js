(function(){
	angular
		.module('listnotes.auth.signin',['ui.router'])
		.config(signinConfig);

		function signinConfig($stateProvider) {
			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: '/components/auth/signin.html',
					controller: SignInController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signinConfig.$inject = ['$stateProvider'];

		function SignInController($state, UsersService) {
			var vm = this;
			vm.user = {};
			vm.login = function() {
                console.log('signincontroller');
				UsersService.login(vm.user).then(function(response){
					//$state.go('workspace');
				});

			};
            vm.closeSignIn = function (){
                $('#id01').removeAttr('style');
            };
		}

		SignInController.$inject = ['$state', "UsersService"];
})();
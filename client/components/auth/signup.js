(function(){
	angular
		.module('listnotes.auth.signup', ['ui.router'])
		.config(signupConfig);

		function signupConfig($stateProvider) {
			$stateProvider
				.state('signup',{
					url: '/signup',
					templateUrl: '/components/auth/signup.html',
					controller: SignUpController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signupConfig.$inject = ['$stateProvider'];

		function SignUpController($state, UsersService) {
			var vm = this;
			vm.user = {};
			console.log(vm);
			vm.message = "Sign up";
			vm.submit = function() {
				console.log("About to post");
				console.log('user' + vm.user);
				console.log(this);
					console.log('username: ' + vm.user.username);
				UsersService.create(vm.user).then(function(response){
					//$state.go('workspace');
				});
			};
		}

		SignUpController.$inject = ['$state', 'UsersService'];
})();
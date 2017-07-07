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
				if($('#login').attr('value') == 'Sign Up'){
					UsersService.create(vm.user).then(function(response){
					//$state.go('workspace');
					});
				}
				else{
				UsersService.login(vm.user).then(function(response){
					//$state.go('workspace');
				});
				}
			};
            vm.closeSignIn = function (){
                $('#id01').removeAttr('style');
            };
			vm.switchToSignup = function (){
				
				$('#email').slideDown();
				$("#emailButton").prop('required',true);
				$('#Signin').text('Sign Up');
				$('#login').attr('value', 'Sign Up');
				$('#new_user').attr('ng-submit',"ctrl.submit()");
				$('#signupText').hide();
			}
		}

		SignInController.$inject = ['$state', "UsersService"];
})();
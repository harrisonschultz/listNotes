(function () {


    var app = angular.module("listnotes", [
        "ui.router",
        'listnotes.workspace',
        'listnotes.auth.signin'
    ]);


    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise("/signin");
    }

    config.$inject = ["$urlRouterProvider"];
    app.config(config);
    app.constant("API_BASE", "//localhost:3000/api/");
})();
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
                console.log(vm.user);
				if($('#login').attr('value') == 'Sign Up'){
					UsersService.create(vm.user).then(function(response){
					$state.go('workspace');
					 $('#id01').removeAttr('style');
					});
				}
				else{
				UsersService.login(vm.user).then(function(response){
					$state.go('workspace');
					 $('#id01').removeAttr('style');
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
(function () {
    angular
        .module('listnotes.workspace', ['ui.router'])
        .config(workspaceConfig);

    function workspaceConfig($stateProvider) {
        $stateProvider
            .state('workspace', {
                url: '/workspace',
                templateUrl: '/components/workspace/workspace.html',
                controller: workspaceController,
                controllerAs: 'ctrl',
                bindToController: this
            });
    }

    workspaceConfig.$inject = ['$stateProvider'];

    function workspaceController($state, workspaceService) {
        var x = this;
        x.note = {};
        var workspaces = []
        var trix = document.querySelector("trix-editor")
        x.saveNotes = function () {
            x.note.content = JSON.stringify(trix.editor)
            console.log(x.note.content);
            console.log(x.note.title);
            workspaceService.create(x.note).then(function(){
                console.log('workspaceService.create() successful');
            })
        }
        x.loadNotes = function(){
            trix.editor.loadJSON(JSON.parse(localStorage["editorState"]))
        }
        x.getAll = function(){
            workspaceService.fetchAll();
           x.workspaces = workspaceService.getWorkspaces()
        }
        x.getAll();
    }
    workspaceController.$inject = ['$state', "workspaceService"];
})();
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
(function () {
    angular.module('listnotes')
        .service('workspaceService', workspaceService);

    workspaceService.$inject=  ['$http', 'API_BASE','currentUser']

    function workspaceService($http, API_BASE,currentUser) {
        var workspaceService = this;
        workspaceService.workspaces = [];


        workspaceService.create = function (note) {
            console.log("This is the notes: ");
            console.log(note);
            var notesPromise = $http.post(API_BASE + 'notes', { note: note, user: currentUser.get()});

            notesPromise.then(function (response) {
                console.log('POST request successful');
                workspaceService.workspaces.unshift(response.data);
            });
            return notesPromise;
        };

        // workspaceService.fetch = function (note) {
        //     return $http.get(API_BASE + 'notes')
        //         .then(function (response) {
        //             workspaceService.workspaces = response.data;
        //         });
        // };

        workspaceService.fetchAll = function () {
            console.log(currentUser.get());
             $http.get(API_BASE + 'notes')
                .then(function (response) {
                    workspaceService.workspaces = response.data;
                });
        };

        workspaceService.getWorkspaces = function () {
            return workspaceService.workspaces;
        };


    };
})();
//# sourceMappingURL=bundle.js.map

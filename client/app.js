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
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
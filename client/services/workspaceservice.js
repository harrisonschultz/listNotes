(function () {
    angular.module('listnotes')
        .service('workspaceService', workspaceService);

    workspaceService.$inject=  ['$http', 'API_BASE','currentUser']

    function workspaceService($http, API_BASE,currentUser) {
        var workspaceService = this;
        workspaceService.workspaces = [];
         workspaceService.currentNote;


        workspaceService.create = function (note) {
            console.log("This is the notes: ");
            console.log(note);
            var notesPromise = $http.post(API_BASE + 'notes', { note: note, user: currentUser.get()})
            .then(function (response) {
                console.log('POST request successful');        
            });
            return notesPromise;
        };

        workspaceService.fetch = function(title) {
            
               return $http.get(API_BASE + 'notesOne', {params: {user: currentUser.get(), title: title}})
                .then(function (response) {
                    console.log(response.data);
                     workspaceService.currentNote = response.data.note.content;
                })
                .catch(function(response){
                    console.log('something went wrong with getOne')
                    console.log(response);
                })
               
            
        };

        workspaceService.fetchAll = function () {
            console.log(currentUser.get());
             var fetchAllPromise = $http.get(API_BASE + 'notes', {params: {user: currentUser.get()}})
                .then(function (response) {
                    workspaceService.workspaces = response.data;
                    console.log(workspaceService.workspaces);
                })
                .catch(function(response){
                    console.log('something went wrong')
                    console.log(response);
                })
                return fetchAllPromise
        };

        workspaceService.update = function(note){
            return $http.post(API_BASE + 'notesUpdate', { note: note, user: currentUser.get()})
            .then(function (response) {
                console.log('POST request successful');        
            });
        }

        workspaceService.deleteOne = function(title){
             return $http.delete(API_BASE + 'notes',  {params: {user: currentUser.get(),title: title}})
            .then(function (response) {
                console.log(response);        
            });
        }

        workspaceService.getWorkspaces = function () {
            return workspaceService.workspaces;
        };


    };
})();
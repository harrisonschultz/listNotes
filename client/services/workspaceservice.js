(function () {
    angular.module('listnotes')
        .service('workspaceService',workspaceService);

           workspaceService.$inject('$http', 'API_BASE')

                function workspaceService() {
                    var workspaceService = this;
                    workspaceService.workspaces = [];
                

                workspaceService.create = function (note) {
                    console.log("This is the notes: ");
                    console.log(note);
                    var notesPromise = $http.post(API_BASE + 'notes', { note: note });

                    notesPromise.then(function (response) {
                        console.log('POST request successful');
                        var element = document.querySelector("trix-editor")
                        localStorage["editorState"] = JSON.stringify(element.editor)
                    });
                    return notesPromise;
                };
            };
})();
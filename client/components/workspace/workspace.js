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
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
        var workspaces = [];
        var trix = document.querySelector("trix-editor")
        x.saveNotes = function () {
            x.note.content = JSON.stringify(trix.editor)
            console.log(x.note.content);
            console.log(x.note.title);
           
            if(x.workspaces.indexOf(x.note.title) != -1){
                workspaceService.update(x.note)
            }else{
            workspaceService.create(x.note).then(function () {
                console.log('workspaceService.create() successful');
                x.workspaces.push(x.note.title);
                console.log(x.workspaces);
            })
            .catch(function(err){
                console.log(err);
            })
            }
        }

        x.deleteOne = function(title){
            workspaceService.deleteOne(title).then(function(){
                x.workspaces.splice(x.workspaces.indexOf(title),1);
            })
        }
   
         x.getOne = function (title) {
             console.log(title);
           workspaceService.fetch(title).then(function () {
               console.log(workspaceService.currentNote)
                trix.editor.loadJSON(JSON.parse(workspaceService.currentNote));
           })
           $('#titles').attr('value', title);
        }
        x.getAll = function () {
            workspaceService.fetchAll().then(function () {
               var temp = workspaceService.getWorkspaces().notes;
               x.workspaces = [];
                console.log(x.workspaces);
                for (let y = 0; y < temp.length; y++){
                     x.workspaces.push(temp[y].title)
                }
            })

        }
        x.getAll();
    }
    workspaceController.$inject = ['$state', "workspaceService"];
})();

module.exports = function (mongoose) {
    var notesSchema = new mongoose.Schema({
            content:  {type: Object},
            title: {type: String},
            user: {type: String}
    });

    var Notes = mongoose.model(/*name of table*/'notes',/*table template*/ notesSchema);

    var saveNotesCallback = function (err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Note was saved');
    };

    var saveNotes = function(noteContent,title,username){
        var note = new Notes({
            content: noteContent,
            title: title,
            user: username
        })
        note.save(saveNotesCallback);
    }
       var getNotes = function(username, res){
        Notes.findOne({'user': username}).then(function(data){
              var dataArray = data.toArray();
            res.json({
               notes: dataArray
            })
          
        })
    }

    var findNote = function(title, username, res){
        Notes.findOne({'title': title, 'user': username}).then(function(data){
             res.json({
               note: data 
            })
        })
    }
    //this is the object that is returned when this module is included in other files
    return {
       notes: Notes,
       saveNotes: saveNotes,
       getNotes : getNotes,
       findNote :findNote
    }
};
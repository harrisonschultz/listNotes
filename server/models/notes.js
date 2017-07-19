
module.exports = function (mongoose) {
    var notesSchema = new mongoose.Schema({
            content:  {type: Object},
            title: {type: String}
    });

    var Notes = mongoose.model(/*name of table*/'notes',/*table template*/ notesSchema);

    var saveNotesCallback = function (err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Note was saved');
    };

    var saveNotes = function(noteContent,title){
        var note = new Notes({
            content: noteContent,
            title: title
        })
        note.save(saveNotesCallback);
    }

    var findNotes = function(title, res){
        Notes.findOne({'title': title}).then(function(data){
            res.json({
               note: data 
            })
        })
    }
    //this is the object that is returned when this module is included in other files
    return {
       notes: Notes,
       saveNotes: saveNotes
    }
};
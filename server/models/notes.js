
module.exports = function (mongoose) {
    var notesSchema = new mongoose.Schema({
        content: { type: Object },
        title: { type: String },
        user: { type: String }
    });

    var Notes = mongoose.model(/*name of table*/'notes',/*table template*/ notesSchema);

    var saveNotesCallback = function (err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Note was saved');
    };

    var saveNotes = function (noteContent, title, username) {
        var note = new Notes({
            content: noteContent,
            title: title,
            user: username
        })
        var msg = 'saveNotes successful';
        var promise = Notes.findOne({ 'title': title }, function (err, result) {
            if (err) {
                console.log(err);
                msg = 'saveNotes findOne query error';
            }
            if (!result) {
                note.save(saveNotesCallback);
            }
            else {
                console.log('duplicate title exists');
            }
        }).then(function () {

        })
        return promise;
    }
    var getNotes = function (username, res) {
        Notes.find({ 'user': username }, 'title').then(function (data) {
            res.json({
                notes: data
            })

        })
            .catch(function (data) {
                console.log('couldnt find the user in the db');
                console.log(data);
            })
    }


    var findNote = function (title, username, res) {
        Notes.findOne({ 'title': title, 'user': username }).then(function (data) {
            res.json({
                note: data
            })
        })
    }

    var updateNotes = function (noteContent, title, username) {
        return Notes.findOne({ 'title': title, 'user': username }).then(function (data) {
            data.content = noteContent;
            data.save();
        })
    }
    var deleteNotes = function (title, username, res) {
        return Notes.findOne({ 'title': title, 'user': username }).then(function (data) {
            data.remove();
        })
    }
    //this is the object that is returned when this module is included in other files
    return {
        notes: Notes,
        saveNotes: saveNotes,
        getNotes: getNotes,
        findNote: findNote,
        updateNotes: updateNotes,
        deleteNotes: deleteNotes
    }
};
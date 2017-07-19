var mongoose = require('mongoose');
var mongodb = require('./db_mongo');
var Account = require('./models/users')(mongoose);//pass in mongoose to models/users.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var notesModel = require('./models/notes')(mongoose);



// Use connect method to connect to the Server 
mongoose.connect('mongodb://localhost:listNotes/listNotes', function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    /*{useMongoClient: true,}*/
});

mongoose.connection.on('connected', function () { console.log('connected to db ' + mongodb.databaseUrl) });

app.use(bodyParser.json());
//app includes the headers.js file
app.use(require('./middleware/headers'));
// app.use(require('./middleware/validate-session'));
// app.use('/api/login', require('./routes/session'));
// app.use('/api/user', require('./routes/user'));

app.post('/api/user', function (req, res) {
    console.log(req.body);
    var username = req.body.user.username;
    var pass = req.body.user.password;
    var email = req.body.user.email;

    var dbuser = Account.register(username, pass, email);
    res.json({
        user: dbuser.user,
        token: dbuser.token
    })
    req.user = dbuser.user;
     console.log('\n\n');
     console.log(req.user);
     console.log('\n\n');
});

app.post('/api/login', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    Account.login(username, pass, res, req)
     console.log('\n\n');
     console.log(req.user);
     console.log('\n\n');
});

app.post('/api/notes', function (req, res) { 
    notesModel.saveNotes(req.body.note.content, req.body.note.title, req.body.user.username)
});
app.get('/api/notes', function (req, res) {
    notesModel.getNotes(req.user.username, res);
});
// app.get('/api/notes', function (req, res) {
    
//     notesModel.findNote(req.body.note.title,  req.body.user.username, res);
// });

app.listen(3000, function () {
    console.log("app is listening on 3000");
});












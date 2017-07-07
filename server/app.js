var mongoose = require('mongoose');
var mongodb = require('./db_mongo');
var Account = require('./models/users')(mongoose);//pass in mongoose to models/users.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');


// Use connect method to connect to the Server 
mongoose.connect('mongodb://localhost:27107/test', {useMongoClient: true,})

mongoose.connection.on('connected', function () { console.log('connected to db ' + mongodb.databaseUrl) });



app.use(bodyParser.json());
//app includes the headers.js file
 app.use(require('./middleware/headers'));
// app.use(require('./middleware/validate-session'));
// app.use('/api/login', require('./routes/session'));
// app.use('/api/user', require('./routes/user'));

app.post('/api/user',function(req,res){
    var username = req.body.user.username;
    var pass = req.body.user.password; 

    Account.register(username, pass);
    res.send(200);
});

app.listen(3000, function () {
    console.log("app is listening on 3000");
});












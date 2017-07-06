var bcrypt = require('bcrypt');

module.exports = function (mongoose) {
    var UserSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String}
    });

    var User = mongoose.model(/*name of table*/'user',/*table template*/ UserSchema);

    var registerCallback = function(err) {
        if(err) {
            return console.log(err);
        };
        return console.log('Account was created');
    };
    
    var register = function(username, password){
        var user = new User({
            username: username,
            password: bcrypt.hashSync(password, 10)
        });
        user.save(registerCallback);//save user object into database
        console.log('Save command was sent');
    }
//this is the object that is returned when this module is included in other files
    return {
        User: User,
        register: register
    }
};
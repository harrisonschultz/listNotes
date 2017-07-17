var bcrypt = require('bcrypt');
var secret = require('../config/constants.js')
var jwt = require('jsonwebtoken');

module.exports = function (mongoose) {
    var UserSchema = new mongoose.Schema({
        username: { type: String },
        password: { type: String },
        email: { type: String }
    });

    var User = mongoose.model(/*name of table*/'user',/*table template*/ UserSchema);

    var registerCallback = function (err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Account was created');
    };

    var register = function (username, password, email) {
        var user = new User({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email
        });
        user.save(registerCallback);//save user object into database
        console.log("////////////////USER ID: " + user._id)
        var token = jwt.sign({ id: user._id }, secret.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        return ({
            user: user,
            token: token
        })

    }

    var login = function (username, password) {
       var user = User.findOne({ "username": username })
         
                console.log("//////////////////////////////////////////////////////////////////////////////////////////");
                console.log(user);
                if (user) {
                    bcrypt.compare(password, user.password, function (err, matches) {
                        if (matches) {
                            var token = jwt.sign({ id: user.id }, secret.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                            console.log("////////// CREATING A SESSION ///////////");
                            return ({
                                user: user,
                                token: token
                            })
                        }
                        else {
                            return ({ msg: "failed to authenticate" });
                        }
                    });
                }
                else {
                    return ({ msg: "failed to authenticate" });
                }
            }
    //this is the object that is returned when this module is included in other files
    return {
        User: User,
        register: register,
        login: login
    }
};
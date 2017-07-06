var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var UserUrl = "mongodb://localhost:27017/users";

module.exports = function (req, res, next) {
    var sessionToken = req.headers.authorization;

    if (!req.body.user && sessionToken) {
        jwt.verify(sessionToken, process.env.JWT_SECRET, function (err, decoded) {
            if (decoded) {
                // try to get the user details from the User model and attach it to the request object
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    db.users.findOne({_id: decoded._id})
                }).then(
                    function (user) {
                        console.log("I AM HERE");
                        //attach user to request object
                        req.user = user;

                        console.log(req.user.id);
                        next();
                    },
                    function () {
                        res.status(401).send({ error: 'Not authorized' });

                    }
                    );

            }
            else {
                res.status(401).send({ error: 'Not authorized' });
            }
        });
    }
    else {
        next();
    }
}
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/users');

module.exports = function(req,res,next){
    var sessionToken = req.headers.authorization;

    if (!req.body.user && sessionToken){
        jwt.verify(sessionToken, process.env.JWT_SECRET, function(err,decoded){
            if(decoded){
                 // try to get the user details from the User model and attach it to the request object
                User.findOne({
                    where: {id: decoded.id}
                }).then(
                    function(user){
                        console.log("I AM HERE");
                        //attach user to request object
                        req.user = user;
                        
                        console.log(req.user.id);
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Not authorized'});

                    }
                );

            }
            else {
                res.status(401).send({error: 'Not authorized'});
            }
        });
    }
    else {
        next();
    }
}
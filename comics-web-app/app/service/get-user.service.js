/**
 * Created by anastasiya on 24.11.16.
 */

var User = require('../models/user').User;

module.exports.getUserById = function(id, callback){

    User.findOne( { _id: id },
        function(err, user){

        if(err || !user) callback(null);

        callback(user);
    })

};

module.exports.getUserByEmail = function(email){

    User.findOne( {email: email},
        function(err, user){

            if(err || !user) return callback(null);

            callback(user);
        })
};
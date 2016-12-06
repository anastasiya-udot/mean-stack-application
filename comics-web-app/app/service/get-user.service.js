/**
 * Created by anastasiya on 24.11.16.
 */

let User = require('../models/user').User;

module.exports.getUserById = function(id, callback){

    User.findById( id ,
        function(err, user){

            if(err || !user) {
                callback(null);
            } else {

                callback(user);
            }

    })

};

module.exports.getUserByEmail = function(email, callback){

    User.findOne( {email: email},
        function(err, user){

            if(err) {
                callback(null);
            } else {
                callback(user);
            }

        }
    )
};

module.exports.getUserByToken = function(tokenType, token, callback){

    let searchObject= {};
    searchObject[tokenType] = token;

    User.findOne( searchObject,

        function (err, user) {

            if (err || !user) {
                callback(null);
            } else {
                callback(user);
            }
        })
};
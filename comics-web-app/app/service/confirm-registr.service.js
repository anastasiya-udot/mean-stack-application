/**
 * Created by anastasiya on 25.11.16.
 */

var User               = require('../models/user').User;
var AuthError          = require('../error/error').AuthError;
var constant           = require('../libs/constants').constant;

module.exports.initializeQueue = function(token) {

    return [findUserByToken,
            resetVerifyRegistrToken,
            saveChanges
    ];

    function findUserByToken(callback) {
        User.findOne({
            verifyRegistrToken: token
        }, function (err, user) {

            if (err || !user) return callback(new AuthError(constant.NO_VALID_USER));
            callback(null, user);
        });
    }

    function resetVerifyRegistrToken(user, callback) {
        user.verifyRegistrToken = null;
        callback(null, user);
    }

    function saveChanges(user, callback) {
        user.save(function (err) {
            if (err) return callback(new AuthError(constant.ERROR_SAVING));
            callback(null);
        });
    }
};
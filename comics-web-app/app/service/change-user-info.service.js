/**
 * Created by anastasiya on 25.11.16.
 */

var AuthError          = require('../error/error').AuthError;
var constant           = require('../libs/constants').constant;

module.exports.initializeQueue = function(req) {
    return [
        getUser,
        analyzeChanges
    ];


    function getUser(callback) {
        let data = {
            id: body.req.id,
            avatar: body.req.avatar,
            username: body.req.username,
            email: body.req.email,
            previousPassword: body.req.previousPassword,
            password: body.req.password,
            confirmPassword: body.req.confirmPassword
        };

        let getUserService = require('./get-user.service');
        getUserService.getUserById(data.id, function (user) {

            if (user) {
                callback(null, data, user);
            }
            callback(new AuthError(constant.NO_VALID_USER));

        });

    }

    function analyzeChanges(data, user, callback) {

        let analyzeChangesService = require('./analyze-changes.service');
        let async = require('async');
        async.series(

            analyzeChangesService.initializeQueue(data, user),

            function (err, results) {
                if (err) callback(err)
            }
        );

    }
};
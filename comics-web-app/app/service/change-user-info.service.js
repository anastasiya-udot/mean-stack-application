/**
 * Created by anastasiya on 25.11.16.
 */

let AuthError          = require('../error/error').AuthError;
let constant           = require('../libs/constants').constant;

module.exports.initializeQueue = function(req) {
    return [
        extractData,
        getUser,
        analyzeChanges
    ];

    function extractData(callback){

        let data = {
            id: req.body.id,
            username: req.body.username,
            email: req.body.email,
            previousPassword: req.body.previousPassword,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };

        callback(null, data);
    }

    function getUser(data, callback) {

        let getUserService = require('./get-user.service');

        getUserService.getUserById(data.id, function (user) {

            if (user) {
                callback(null, data, user);
            } else {
                callback(new AuthError(constant.NO_VALID_USER));
            }

        });

    }

    function analyzeChanges(data, user, callback) {

        let analyzeChangesService = require('./analyze-changes.service');
        let async = require('async');

        async.series(

            analyzeChangesService.initializeUserQueue(data, user, req.headers.host),

            function (err, results) {

                if (err) {
                    callback( { "message" : new AuthError(constant.ERROR)} );
                } else {
                    callback(null, results);
                }
            }
        );

    }
};
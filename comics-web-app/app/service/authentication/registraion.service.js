/**
 * Created by anastasiya on 25.11.16.
 */
let User        = require('../../models/user').User;
let AuthError   = require('../../error/error').AuthError;
let constant    = require('../../libs/constants').constant;


module.exports.initializeQueue = function(req) {

    return [
        extractData,
        createNewUser,
        sendVerificationEmail
    ];

    function extractData(callback) {

        let data = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            confirmed: req.body.confirmed
        };

        if (data.confirmed !== data.password){
            callback(new AuthError(constant.DIFFERENT_PASSWORDS));
        } else {
            callback(null, data);
        }
    }

    function createNewUser(data, callback) {

        let getUserByEmail = require('../user.service').getUserByEmail;

        getUserByEmail(data.email, function (user){

            if (user) {
                callback(new AuthError(constant.ERROR_SIGN_UP));
                return;
            }

            let newUser = new User();

            newUser.username = data.username;
            newUser.email = data.email;
            newUser.hashedPassword = newUser.getHashPassword(data.password);

            callback(null, newUser);

        });
    }

    function sendVerificationEmail(user, callback) {

        let userEmailService = require('././user-email.service.js');
        let sendCallback = require('././send-email.service.js').sendConfirmRegistrEmail;

        let tokenType = 'verifyRegistrToken';

        userEmailService.verify(user, sendCallback, req.headers.host, tokenType,  function (err) {
            if (err) return callback(err);
            callback(null);
        });
    }
};
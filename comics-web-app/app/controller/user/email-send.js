/**
 * Created by anastasiya on 11.11.16.
 */
var nodemailer = require('nodemailer');
var AuthError  = require('../../error/error').AuthError;
var constant   = require('../../libs/constants').constant;

var smtpTransport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection : false,
    port: 587,
    auth: {
        user: constant.USER_EMAIL,
        pass: constant.USER_PASSWORD
    }
});

module.exports.sendForgotEmail = function(email, host, token, callback) {

    var mailOptions = {
        to: email,
        from: 'comicsgenerator@comics.com',
        subject: 'Password reset',
        text: 'You\'ve received this letter, because ' +
        'you or someone else made the request for recovery\n\n ' +
        'Follow the link for recovering:\n\n ' +
        'http://' + host + '#/user/reset/' + token + '\n\n ' +
        'If you don\'to recover password ' +
        '- ignore this message.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return callback(err, email);
    });
};

module.exports.sendVerificationEmail = function(user, host, token, callback) {

    var mailOptions = {
        to: user.email,
        from: 'comicsgenerator@comics.com',
        subject: 'Confirm registration',
        text: 'You\'ve received this letter, because ' +
        'you\'ve signed up on our site and now you should confirm registration\n\n ' +
        'Follow the link for confirming:\n\n ' +
        'http://' + host + '#/user/confirm-registr/' + token + '\n\n ' +
        'If you didn\'t sign up ' +
        '- ignore this message.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        if (err) return next(new AuthError(constant.ERROR_SENDING));
        return callback(null, token,  user);
    });
};
/**
 * Created by anastasiya on 11.11.16.
 */
let nodemailer = require('nodemailer');
let constant   = require('../../libs/constants').constant;

const smtpTransport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection : false,
    port: 587,
    auth: {
        user: constant.USER_EMAIL,
        pass: constant.USER_PASSWORD
    }
});

module.exports.sendForgotEmail = function(user, host, token, callback) {

    const mailOptions = {
        to: user.email,
        from: 'comicsgenerator@comics.com',
        subject: 'Password reset',
        text: 'You\'ve received this letter, because ' +
        'you or someone else made the request for recovery\n\n ' +
        'Follow the link for recovering:\n\n ' +
        'http://' + host + '#/user/reset/' + token + '\n\n ' +
        'If you didn\'t recover password ' +
        '- ignore this message.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return callback(err);
    });
};

module.exports.sendConfirmRegistrEmail = function(user, host, token, callback) {

    const mailOptions = {
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
        return callback(err);
    });
};

module.exports.sendConfirmChangeEmail = function(user, host, token, callback) {

    const mailOptions = {
        to: user.tempEmail,
        from: 'comicsgenerator@comics.com',
        subject: 'Confirm email change',
        text: 'You\'ve received this letter, because ' +
        'you\'ve changed email on our site and now you should confirm it\n\n ' +
        'Follow the link for confirming:\n\n ' +
        'http://' + host + '#/account/confirm-change-email/' + token + '\n\n ' +
        'If you didn\'t sign up ' +
        '- ignore this message.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return callback(err);
    });
};
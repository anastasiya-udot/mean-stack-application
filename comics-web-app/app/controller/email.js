/**
 * Created by anastasiya on 11.11.16.
 */
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection : false,
    port: 587,
    auth: {
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASSWORD
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
        'http://' + host + '#/reset/' + token + '\n\n ' +
        'If you don\'to recover password ' +
        '- ignore this message.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return callback(err, email);
    });
};
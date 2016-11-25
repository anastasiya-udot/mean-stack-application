/**
 * Created by anastasiya on 30.10.16.
 */
var util = require('util');
var http = require('http');

function HttpError(status, message){
    Error.apply(this, arguments);
    this.stack = (new Error).stack;
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

function AuthError(message){
    console.log(message);
    Error.apply(this,arguments);
    this.stack = (new Error).stack;
    this.message = message  || "Error";
}

util.inherits(HttpError, Error);
util.inherits(AuthError, Error);
HttpError.prototype.name = "HttpError";
AuthError.prototype.name = "AuthError";

exports.HttpError = HttpError;
exports.AuthError = AuthError;
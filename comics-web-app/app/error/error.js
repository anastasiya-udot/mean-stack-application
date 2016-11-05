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

util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";
exports.HttpError = HttpError;
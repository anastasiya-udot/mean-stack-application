var express   = require('express');
var http      = require('http');
var path      = require('path');
var config    = require('./config');
var log       = require('./app/libs/log')(module);
var passport  = require('passport');
var HttpError = require('./app/error/error').HttpError;
var AuthError = require('./app/error/error').AuthError;
var mongoose  = require('./app/libs/mongoose');


//creates express application
var app = express();

var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var multer       = require('multer');
var session      = require('cookie-session');
var favicon      = require('serve-favicon');


if( app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.set('trust proxy', 1);
app.use(favicon('public/assets/favicon.ico'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(require('./app/middleware/sendHttpError'));
app.use(require('./app/middleware/sendAuthError'));
require('./app/middleware/passport');
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: config.get('session:cookie')
}));

require('./app/routes/index')(app);

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
    if (typeof err == 'number'){
        err = new HttpError(err);
    }

    if(err instanceof HttpError){
        log.error(err);
        res.sendHttpError(err);
    }
    if(err instanceof AuthError){
        log.error(err);
        res.sendAuthError(err);
    }
    else {
        if (app.get('env') === 'development') {
            var errorHandler = require('errorhandler');
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});


//http comics-web-app creating
http.createServer(app).listen(config.get('port'), function(){
   log.info("Express comics-web-app listening on port " + config.get('port'));
});

module.exports = app;

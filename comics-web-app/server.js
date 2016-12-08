let express   = require('express');
let http      = require('http');
let path      = require('path');
let config    = require('./config');
let log       = require('./app/libs/log')(module);
let passport  = require('passport');
let HttpError = require('./app/error/error').HttpError;
let AuthError = require('./app/error/error').AuthError;
let mongoose  = require('./app/libs/mongoose');


//creates express application
let app = express();

let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let multer       = require('multer');
let favicon      = require('serve-favicon');


if( app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.set('trust proxy', 1);
app.use(favicon('public/assets/favicon.ico'));
app.use(bodyParser.json({limmit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(multer());
app.use(cookieParser());
app.use(require('./app/middleware/sendHttpError'));
app.use(require('./app/middleware/sendAuthError'));
require('./app/service/authentication/passport.service.js');
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes/index')(app);

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
        log.error(err.message);
        res.sendAuthError(err);
    }
    else {
        if (app.get('env') === 'development') {
            let errorHandler = require('errorhandler');
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

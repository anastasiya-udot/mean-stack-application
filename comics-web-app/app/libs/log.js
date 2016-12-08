let winston = require('winston');
let constant = require('../libs/constants').constant;

function getLogger(module){

    let path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: constant.ENV == 'development' ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;
/**
 * Created by anastasiya on 18.11.16.
 */
var session      = require('cookie-session');
var constant     = require('../libs/constants').constant;
var config      = require('../../config');

module.exports =
        session({
            name: 'session',
            keys: [constant.SESSION_KEY_1, constant.SESSION_KEY_2],
            cookie: config.get('session:cookie')
        });


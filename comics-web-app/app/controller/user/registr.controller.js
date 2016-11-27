/**
 * Created by anastasiya on 1.11.16.
 */

var async       = require('async');
var constant    = require('../../libs/constants').constant;
var registrService       = require('../../service/registraion.service');

module.exports.post = function(req, res, next) {

    async.waterfall(

        registrService.initializeQueue(req),

        function(err){

            if(err) return next(err);
            res.json({"message" : constant.CONFIRM_MESSAGE});
        }

    );


};
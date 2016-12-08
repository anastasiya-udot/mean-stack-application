/**
 * Created by anastasiya on 1.11.16.
 */

let async          = require('async');
let constant       = require('../../../libs/constants').constant;
let registrService = require('../../../service/authentication/registraion.service.js');

module.exports.post = function(req, res, next) {
    console.log(req);
    async.waterfall(

        registrService.initializeQueue(req),

        function(err){

            if(err) return next(err);
            res.json({"message" : constant.CONFIRM_MESSAGE});
        }

    );


};
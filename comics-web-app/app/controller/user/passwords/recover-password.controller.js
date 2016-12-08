/**
 * Created by anastasiya on 11.11.16.
 */

let async                   = require('async');
let recoverPasswordService = require('../../../service/authentication/password/recover-password.service');

module.exports.post = function(req, res){

    async.waterfall(

        recoverPasswordService.initializeQueue(req.body),

        function(err, result){
            if (err) {
                res.json({"error" : err});
                return;
            }
            res.json(result);
        }

    );
};
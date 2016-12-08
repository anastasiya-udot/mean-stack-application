/**
 * Created by anastasiya on 24.11.16.
 */


let async                 = require('async');
let changeUserInfoService = require('../../../service/change-data/change-user-info.service.js');

module.exports.post = function(req, res){

    async.waterfall(

        changeUserInfoService.initializeQueue(req),

        function(err, result){

            res.send(result)
        }
    );


};

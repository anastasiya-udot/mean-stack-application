/**
 * Created by anastasiya on 24.11.16.
 */


var async                 = require('async');
var changeUserInfoService = require()

module.exports.post = function(req, res, next){

    async.waterfall([
        getUser,
        analyzeChanges

    ], function(err){

    });


};

/**
 * Created by anastasiya on 13.11.16.
 */
var Comics = require('../../models/comics').Comics;
//var cloudinary = require('../../libs/cloudinary').cloudinary;

module.exports.get = function(req,res){
    Comics.find(function(err, cursor){
        res.send(JSON.stringify(cursor));
    })
};
/**
 * Created by anastasiya on 13.11.16.
 */
let async = require('async');
let browserService = require('../../service/gallery.service.js');

module.exports.gallery = function(req,res){

    async.waterfall(

        browserService.initializeBrowserGalleryQueue(),

        function(err, result){
            res.send(JSON.stringify(result));
        }
    )
};

module.exports.account = function(req, res){
    let id = req.url.split('/')[3];

    async.waterfall(

        browserService.initializeAccountGalleryQueue(id),

        function(err, result){
            res.send(JSON.stringify(result));
        }
    )
};
/**
 * Created by anastasiya on 13.12.16.
 */
let Page = require('../../models/page').Page;
let Comics = require('../../models/comics').Comics;

module.exports.initializeQueue = function(req){
    return [
        extractData,
        checkPermission
    ];

    function extractData(callback){

        let data = {
            comicsId : req.comicsId,
            image : req.image,
            text : req.text,
            number : req.number,
            userId : req.id
        };

        callback(null, data);
    }

};

function checkPermission(data, callback){

    //Comics.findById(data.comicsId, function())

}
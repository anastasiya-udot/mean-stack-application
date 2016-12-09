/**
 * Created by anastasiya on 6.12.16.
 */

let constant  = require('../../../libs/constants').constant;

module.exports.changeComicsName = function(comics, newName, callback){

    comics.name = newName;
    comics.save(function(err){
        if(err){
            callback({"message" : constant.ERROR_SAVING});
        } else {
            callback({"message" : constant.COMICS_NAME_CHANGED});
        }
    })
};

module.exports.changeComicsDescription = function(comics, NewDescription, callback){
    comics.description = NewDescription;
    comics.save(function(err){
        if(err){
            callback({"message" : constant.ERROR_SAVING});
        } else {
            callback({"message" : constant.COMICS_DESCR_CHANGED} );
        }
    })
};
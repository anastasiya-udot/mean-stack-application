/**
 * Created by anastasiya on 11.11.16.
 */
var path = require('path');
var url = path.join(__dirname.split('/').slice(0,-1).join('/'), '../public/index.html');
module.exports.get = function(req,res){
    var fs = require('fs');
    var file = new fs.ReadStream(url);
    file.pipe(res);
};
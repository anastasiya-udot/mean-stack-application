/**
 * Created by anastasiya on 1.11.16.
 */
exports.get = function(req,res){
    var fs = require('fs');
    var file = new fs.ReadStream(path.join(__dirname.split('/').slice(0,-1).join('/'), '/views/result.html'));;
    file.pipe(res);
};

module.exports = function(app){
        app.get('/', function(req,res){
                var fs = require('fs');
                var path = require('path');
                var file = new fs.ReadStream(path.join(__dirname.split('/').slice(0,-1).join('/'), '../public/index.html'));
                file.pipe(res);
        });
        app.post('/login', require('./../controller/login').post);
        app.post('/registr', require('./../controller/registr').post);
        app.post('/forgot', require('./../controller/forgot').post);
};
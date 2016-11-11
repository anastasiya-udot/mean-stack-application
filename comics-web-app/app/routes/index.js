
module.exports = function(app){
        app.get('/', require('./../controller/init-page').get);
        app.post('/login', require('./../controller/login').post);
        app.post('/registr', require('./../controller/registr').post);
        app.post('/forgot', require('./../controller/forgot').post);
        app.post('/reset', require('./../controller/reset').post);
        app.post('/recover', require('./../controller/recover').post);

};
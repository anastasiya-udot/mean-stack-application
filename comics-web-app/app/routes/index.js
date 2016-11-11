
module.exports = function(app){
        app.get('/', require('./../controller/init-page').get);
        app.post('/login', require('./../controller/login').post);
        app.post('/registr', require('./../controller/registr').post);
        app.post('/forgot-password', require('./../controller/forgot').post);
        app.post('/reset-password', require('./../controller/reset').post);
        app.post('/recover-password', require('./../controller/recover').post);
        app.post('/confirm-registr', require('./../controller/confirm-registr').post);
};
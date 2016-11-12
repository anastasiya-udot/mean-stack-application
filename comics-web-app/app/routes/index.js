
module.exports = function(app){
        app.get('/', require('./../controller/init-page').get);
        app.post('/user/login', require('./../controller/user/login').post);
        app.post('/user/registr', require('./../controller/user/registr').post);
        app.post('/user/forgot-password', require('./../controller/user/forgot').post);
        app.post('/user/reset-password', require('./../controller/user/reset').post);
        app.post('/user/recover-password', require('./../controller/user/recover').post);
        app.post('/user/confirm-registr', require('./../controller/user/confirm-registr').post);
};
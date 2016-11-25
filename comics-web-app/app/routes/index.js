
module.exports = function(app){
        app.get('/', require('./../controller/init-page.controller').get);
        app.get('/gallery/get', require('./../controller/gallery/browse-gallery').get);
        app.get('/user/get/:id', require('./../controller/user/get-user.controller').get);

        app.post('/user/login', require('./../controller/user/login.controller').post);
        app.post('/user/registr', require('./../controller/user/registr.controller').post);
        app.post('/user/forgot-password', require('./../controller/user/forgot-password.controller.js').post);
        app.post('/user/reset-password', require('./../controller/user/reset-password.controller.js').post);
        app.post('/user/recover-password', require('./../controller/user/recover-password.controller.js').post);
        app.post('/user/confirm-registr', require('./../controller/user/confirm-registr.controller').post);
        app.post('/user/change-info', require('./../controller/user/change-user-info.controller.js').post);
};
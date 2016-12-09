
module.exports = function(app){
        app.get('/', require('./../controller/init-page.controller').get);

        app.get('/gallery/get/:id', require('./../controller/gallery/browse-gallery.controller').account);
        app.get('/gallery/get', require('./../controller/gallery/browse-gallery.controller').gallery);


        app.post('/user/login', require('./../controller/user/login/login.controller.js').post);
        app.post('/user/registr', require('./../controller/user/registration/registration.controller.js').post);
        app.post('/user/forgot-password', require('./../controller/user/passwords/forgot-password.controller.js').post);
        app.post('/user/reset-password', require('./../controller/user/passwords/reset-password.controller.js').post);
        app.post('/user/recover-password', require('./../controller/user/passwords/recover-password.controller.js').post);
        app.post('/user/confirm-registr', require('./../controller/user/registration/confirm-registration.controller.js').post);

        app.get('/account/get/:id', require('./../controller/user/get-user.controller').get);
        app.post('/account/change-info', require('./../controller/user/change-info/change-user-info.controller').post);
        app.post('/account/confirm-email', require('./../controller/user/change-info/confirm-email-change.controller.js').post);
        app.post('/account/avatar', require('./../controller/image.controller.js').avatar);

        app.post('/comics/create-comics', require('../controller/comics/comics.controller').new);
        app.post('/comics/edit-comics/:id', require('../controller/comics/comics.controller').edit);
        app.post('/comics/cover', require('./../controller/image.controller.js').cover);
        app.delete('/comics/delete', require('./../controller/comics/comics.controller').delete)

};

module.exports = function(app){
        app.get('/', require('./../controller/init-page.controller').get);
        app.get('/gallery/get/:id', require('./../controller/gallery/browse-gallery.controller').account);
        app.get('/gallery/get', require('./../controller/gallery/browse-gallery.controller').gallery);
        app.get('/account/get/:id', require('./../controller/user/get-user.controller').get);

        app.post('/user/login', require('./../controller/user/login.controller').post);
        app.post('/user/registr', require('./../controller/user/registr.controller').post);
        app.post('/user/forgot-password', require('./../controller/user/forgot-password.controller.js').post);
        app.post('/user/reset-password', require('./../controller/user/reset-password.controller.js').post);
        app.post('/user/recover-password', require('./../controller/user/recover-password.controller.js').post);
        app.post('/user/confirm-registr', require('./../controller/user/confirm-registr.controller.js').post);
        app.post('/account/change-info', require('./../controller/user/change-user-info.controller.js').post);
        app.post('/account/confirm-email', require('./../controller/user/confirm-email-change.controller.js').post);
        app.post('/account/avatar', require('./../controller/image.controller.js').avatar);

        app.post('/comics/create-comics', require('./../controller/gallery/comics/comics.controller.js').new);
        app.post('/comics/edit-comics/:id', require('./../controller/gallery/comics/comics.controller.js').edit);
        app.post('/comics/cover', require('./../controller/image.controller.js').cover)
};
const Router = require('express');
const router = new Router();
const controller = require('./Controller');

router.get('/', controller.begin);
router.post('/login', controller.login);
router.get('/register', controller.register);
router.post('/send', controller.send);
router.get('/welcome', controller.welcome);
router.get('/clearData', controller.clearData);
router.post('/data_user', controller.data_user);
router.get('/RemPass', controller.RemPass);
router.post('/mail', controller.mail);
router.get('*', controller.err_404);

module.exports = router;
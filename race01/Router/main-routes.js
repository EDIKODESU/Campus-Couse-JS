const express = require('express');

const { regGet, regPost, regGetStyle } =  require('../controllers/controlReg');
const { homeGet, loginGet, loginGetStyle, loginPost, homePost, checkPost, logoutPost,} = require('../controllers/controlLogin');
const { passGet, passGetStyle, passPost } = require('../controllers/controllRemPass');
const { playGet, playPost} = require('../controllers/controllPlay');

const jsonParser = express.json();
const router = express.Router();

router.post('/reg', jsonParser ,regPost);
router.get('/reg', regGet);
router.get('/style.css', regGetStyle);


router.post('/', jsonParser, homePost);
router.post('/login', jsonParser, loginPost);
router.post('/check', jsonParser, checkPost);
router.post('/logout', jsonParser, logoutPost);
router.get('/', homeGet);
router.get('/login', loginGet);
router.get('style.css', loginGetStyle);

router.post('/password', jsonParser, passPost);
router.get('/password', passGet);
router.get('/style.css', passGetStyle);

router.post('/playgame', playPost);
router.get('/playgame', playGet);

// router.get('/style.css', playGetStyle);

module.exports = router;
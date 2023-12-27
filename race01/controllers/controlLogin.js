const userLogin = require('../models/login');
const path = require("path");

let sen = path.resolve(__dirname, '../');
let ses;

const homeGet = (req, res) => {
    res.sendFile(sen + '/views/home.html');
}

const loginGet = (req, res) => {
    res.sendFile(sen + '/views/login.html');
}

const loginGetStyle = (req, res) => {
    res.sendFile(sen + '/public/style.css');
}

const loginPost = (req, res) => {
    ses = req.session;
    if (req.body.login == '' || req.body.pass == '') {
        res.json({ans: 'Fill in all the fields'});
    }
    
    else {
        let user = new userLogin(req.body.login, req.body.pass);
        user.selectInDb(res, ses);
    }
}

const homePost = (req, res) => {
    ses = req.session;

    if (!ses.content) {
        res.json({ans: 'TrueLog'})
    }

    else {
        res.json({
            ans: 'Nologin',
            login: ses.login,
            fullName: ses.fullName,
            email: ses.email,
        });

    }
}

const checkPost = (req, res) => {
    ses = req.session;

    if(ses.content) {
        res.json({ans: 'FalseLog'})
    }
}

const logoutPost = (req, res) => {
    ses = req.session;

    ses.content = false;
    res.json({ans: 'logout'});
}

module.exports = {
    homeGet,
    loginGet,
    loginGetStyle,
    loginPost,
    homePost,
    checkPost,
    logoutPost,
}
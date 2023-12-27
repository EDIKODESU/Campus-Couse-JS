const userReg = require('../models/registration');
const path = require("path");
const emailValidator = require("email-validator");

let sen = path.resolve(__dirname, '../');
const regGet = (req, res) => {
    res.sendFile(sen + '/views/register.html');
}

const regGetStyle = (req, res) => {
    res.sendFile(sen + '/public/style.css');
}

const regPost = (req, res) => {
    if (req.body.login == '' || req.body.pass == '' || req.body.fullName == '' || req.body.email == '') {
        res.json({ans: 'Fill in all the fields'});
    }

    else if(!emailValidator.validate(req.body.email)) {
        res.json({ans: 'Not valid email'});
    }

    else {
        let user = new userReg(req.body.login, req.body.pass, req.body.fullName, req.body.email);
        user.insertInDb(res);
    }
}

module.exports = {
    regGet,
    regPost,
    regGetStyle
};

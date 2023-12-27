const userPass = require('../models/remindPass');
const path = require('path');

let sen = path.resolve(__dirname, '../');

const passGet = (req, res) => {
    res.sendFile(sen + '/views/pass.html');
}

const passGetStyle = (req, res) => {
    res.sendFile(sen + '/public/style.css');
}

const passPost = (req, res) => {
    if (req.body.email == '') {
        res.json({ans: 'Enter email!'});
    }

    else {
        let user = new userPass(req.body.email);
        user.sendPass(res);
    }
}

module.exports = {
    passGet,
    passGetStyle,
    passPost,
};


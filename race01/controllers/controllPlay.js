const userLogin = require('../models/login');
const path = require("path");

let sen = path.resolve(__dirname, '../');
let ses;

const playGet = (req, res) => {
    res.sendFile(sen + '/views/play.html');
}

const playPost = (req, res) => {
    ses = req.session;
    // console.log(ses);
    // console.log(req.body);
    if (ses.login == undefined) {
        res.json({ans: 'YesLogin'});
    }
    else {
        res.json({
            ans: 'NoLogin',
            login: ses.login, 
        });
    }
    // if (req.body.login == '' || req.body.pass == '') {
    //     res.json({ans: 'Fill in all the fields'});
    // }
}

// const playGetStyle = (req, res) => {
//     res.sendFile(sen + '/public/style.css');
// }


module.exports = {
    playGet,
    playPost,
    // playGetStyle,
}
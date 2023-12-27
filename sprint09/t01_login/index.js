const express = require('express');
const app = express();
const User = require('./models/user.js');
const bCryp = require('bcrypt');
var jwt = require('jsonwebtoken');
const {secret_key} = require('./config.json');
var cookieParser = require('cookie-parser');

let port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/');
app.use(cookieParser());

var auth = function (req, res, next) {
  if(req.cookies.token){
    let token = req.cookies.token.split(';')[0].split(' ')[1];
    if(!token){
      console.log('not found cookies 1');
      // req.tokenUser = undefined;
      next();
    }
    else{
      let decodedToken = jwt.verify(token, secret_key);
      req.tokenUser = decodedToken;
      next();
    }
  }
  else{
    console.log('not found cookies 2');
    // req.tokenUser = undefined;
    next();
  }
};

app.use(auth);

app.get('/', function (req, res) {
  if(req.tokenUser){
    res.redirect('/welcome');
  }
  else {
    res.sendFile((__dirname + '/public/page2.html'));
  }
  // res.sendFile((__dirname + '/public/page.html'));
});

app.post('/login', async function (req, res) {
  let Candidate = new User('inf_user');
  let errObj = {};
    let info = await Candidate.find_login(req.body.login);
    if(info.length > 0){ 
      // console.log(info);
      const ResPassword = bCryp.compareSync(req.body.password, info[0].password);
      if(ResPassword){
        const token = jwt.sign({
          login : info[0].login,
          id: info[0].id
        }, secret_key, {expiresIn: 60 * 60});

        let strToken = `token = Bearer ${token}; max-age=3600`;
        // var stringObj=JSON.stringify(Obj);
        // console.log(stringObj);
        res.json({token: strToken});
      }
      else{
        console.log('pass');
        errObj.password = 'Wrong password';
        res.json(errObj);
        return;
      }
    } 
    else{
      console.log('log');
      errObj.login = 'User is not found';
      res.json(errObj);
      return;
    }
});

app.get('/register', function (req, res) {
  // res.sendFile((__dirname + '/public/page2.html'));
  res.sendFile((__dirname + '/public/page.html'));
});

app.post('/send', async function (req, res) {
    let errObj = {};
    let Candidate = new User('inf_user');
    let info = await Candidate.find_login(req.body.user);
    if(info.length > 0) errObj.login = 'This account already exists';
    let info_mail = await Candidate.find_mail(req.body.mail);
    if(info_mail.length > 0) errObj.mail = 'This E-mail already exists';
    if(!isEmpty(errObj)){
      res.json(errObj);
      return;
    }
    const hash = await bCryp.hash(req.body.passw, 5);
      let obj = {
        login: req.body.user,
        password: hash,
        name: req.body.username,
        mail: req.body.mail,
        role: 'user'
      }
      Candidate.save(obj); 
      res.json(errObj);
      // res.redirect('/');
  });

  app.get('/welcome', function (req, res) {
    if(req.tokenUser) {
      res.sendFile((__dirname + '/public/welcome.html'));
    }
    else res.redirect('/');
  });

  app.get('/clearData', function (req, res) {
    res.clearCookie('token');
    // req.tokenUser = undefined;
    res.redirect('/');
  }); 

  app.post('/data_user', async function (req, res) {
    let Candidate = new User('inf_user');
    let info = await Candidate.find_login(req.tokenUser.login);
    // console.log(info);
    let obj = {
      login: info[0].login,
      mail: info[0].mail,
      name: info[0].name,
      role: info[0].role
    }
    console.log(obj);
    res.json(obj);
  });

app.listen(port, function() {
  console.log('Server started');
});

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
}

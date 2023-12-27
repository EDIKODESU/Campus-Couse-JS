const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {secret_key} = require('./config.json');
const cookieParser = require('cookie-parser');
const outRout = require('./AuthRouter');

let port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/');
app.use(cookieParser());

var auth = function (req, res, next) {
  if(req.cookies.token){
    let token = req.cookies.token.split(';')[0].split(' ')[1];
    if(!token){
      console.log('not found cookies 1');
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
    next();
  }
};

app.use(auth);

app.use(outRout);

app.listen(port, function() {
  console.log('Server started');
});

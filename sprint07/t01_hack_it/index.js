var express = require('express');
var app = express();
var session = require('express-session')
const crypto = require('crypto');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;
let session_data;
let pass_salt;
let hash;
let not_ok = false;

app.get('/', function (req, res) {

    res.sendFile((__dirname + '/page.html'));
});

app.get('/check', function (req, res) {
  if(req.session.ok){
    res.json({cheked: true});
  }
  else{
    res.json({cheked: false});
  }
});

app.post('/sent', function (req, res) {
  pass_salt = req.body.Password + req.body.Salt;
  req.session.Password = req.body.Password;
  req.session.Salt = req.body.Salt;
  hash = crypto.createHash('sha1') 
    .update(pass_salt)
    .digest('hex');

  req.session.hash = hash;
  res.redirect('/page2');
});

app.get('/page2', function (req, res) {
    res.sendFile((__dirname + '/page_2.html'));
});

app.post('/sent2', function (req, res) {
  if(req.session.Password == req.body.Password){
    console.log('ok')
    req.session.ok = true;
    res.redirect('/forget');
  }
  else{
    console.log('not ok')
    not_ok = true;
  }
});

app.get('/check1', function (req, res) {
  if(not_ok){
    res.json({cheked: true});
  }
  else{
    res.json({cheked: false});
  }
});

app.get('/data', function (req, res) {
  console.log(req.session.hash);
  res.json( { hash: req.session.hash});
});

app.get('/forget',(req,res) => {
  //req.session.destroy();
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

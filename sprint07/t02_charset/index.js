var express = require('express');
var app = express();
var session = require('express-session');
var iconv = require('iconv-lite');
const utf8 = require('utf8');

let session_data = {};
let utf;
let win;
let iso;
let text = {};
let arrdata = [];

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;

app.get('/', function (req, res) {

    res.sendFile((__dirname + '/page.html'));
});

app.post('/sent', function (req, res) {
  session_data = req.session
  session_data.body = req.body;
  console.log(session_data.body);
  // utf = utf8.encode(session_data.body.string)
  utf = iconv.decode(session_data.body.string, 'UTF-8');
  win = iconv.decode(session_data.body.string, 'windows-1252');
  iso = iconv.decode(session_data.body.string, "ISO-8859-1");;
  text.utf = utf;
  text.win = win;
  text.iso = iso; 
  if(!Array.isArray(session_data.body.conversion)){
    // console.log('not arr');
    arrdata = [session_data.body.conversion];
    session_data.body.conversion = arrdata;
  } 
  res.json({
    name: session_data.body.conversion,
    text: text });
});

app.get('/clear', function (req, res) {
  res.redirect('/forget');
});

app.get('/forget',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

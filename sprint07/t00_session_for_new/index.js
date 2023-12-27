var express = require('express');
var app = express();
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;

app.get('/', function (req, res) {
  if (req.session.body) {res.redirect('/page2'); }
    res.sendFile((__dirname + '/page.html'));
});

let p;

app.post('/sent', function (req, res) {
  req.session.body = req.body;
  // console.log(req.body);
  req.session.body.purpose = 2;
  if(Array.isArray(req.session.body.expirience) && req.session.body.expirience.length)
					p = req.session.body.expirience.length;
  if(!Array.isArray(req.session.body.expirience)){
    p = 1;
  } 
  if(!req.session.body.expirience){
    p = 0;
  }       
  res.redirect('/page2');
});

app.get('/page2', function (req, res) {
  
  res.write(
    `<h1>Session for new</h1>
      <p> name:${req.session.body.name} </p>
      <p> alias:${req.session.body.alias} </p>
      <p> age:${req.session.body.age} </p>
      <p> description:${req.session.body.description} </p>
      <p> photo:${req.session.body.photo} </p>
      <p> exp:${p} </p>
      <p> level:${req.session.body.level} </p>
      <p> purpose:${req.session.body.purpose} </p>
      `);
      res.end('<button><a href='+'/forget'+'>Forget</a></button>');
});

app.get('/forget',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

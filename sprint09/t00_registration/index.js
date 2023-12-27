const express = require('express');
const app = express();
const User = require('./models/user.js');
const bCryp = require('bcrypt');


let port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/');


app.get('/', function (req, res) {
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
    // res.redirect('/sent2');
    // res.sendFile((__dirname + '/public/page.html'));
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

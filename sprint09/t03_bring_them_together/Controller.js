const nodemailer = require('nodemailer');
const User = require('./models/user.js');
const bCryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret_key} = require('./config.json');

class Controller{
    
    begin(req, res) {
        if(req.tokenUser){
            res.redirect('/welcome');
            }
        else {
            res.sendFile((__dirname + '/views/page2.html'));
        }
    }
    async login(req, res) {
        let Candidate = new User('inf_user');
  let errObj = {};
    let info = await Candidate.find_login(req.body.login);
    if(info.length > 0){ 
      const ResPassword = bCryp.compareSync(req.body.password, info[0].password);
      if(ResPassword){
        const token = jwt.sign({
          login : info[0].login,
          id: info[0].id
        }, secret_key, {expiresIn: 60 * 60});

        let strToken = `token = Bearer ${token}; max-age=3600`;
        res.json({token: strToken});
      }
      else{
        errObj.password = 'Wrong password';
        res.json(errObj);
        return;
      }
    } 
    else{
      errObj.login = 'User is not found';
      res.json(errObj);
      return;
    }
    }
    async register(req, res) {
        res.sendFile((__dirname + '/views/page.html'));
    }
    async send(req, res) {
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
    }
    async welcome(req, res) {
        if(req.tokenUser) {
            res.sendFile((__dirname + '/views/welcome.html'));
          }
          else res.redirect('/');
    }
    async clearData(req, res) {
        res.clearCookie('token');
    res.redirect('/');
    }
    async data_user(req, res) {
        let Candidate = new User('inf_user');
    let info = await Candidate.find_login(req.tokenUser.login);
    let obj = {
      login: info[0].login,
      mail: info[0].mail,
      name: info[0].name,
      role: info[0].role
    }
    res.json(obj);
    }
    async RemPass(req, res) {
        res.sendFile((__dirname + '/views/page3.html'));
    }
    async mail(req, res) {
        let Person = new User('inf_user');
    let errObj = {};
    let info_mail = await Person.find_mail(req.body.mail);
    if(info_mail.length > 0){

      var mailOptions = {
        from: 'nodejsyivanov@gmail.com',
        to: req.body.mail,
        subject: 'Sending Email using Node.js',
        text: 'You foget password :('
      };

      transporter.sendMail(mailOptions, function(error){
        if (error) {
          console.log(error);
        } else {
          errObj.mail = '<p style="color: #3c8d50;">letter sent</p>';
          res.json(errObj);
          return;
        }
      });
    } else { 
      errObj.mail = '<p style="color: rgb(255, 78, 78);;">This E-mail not found</p>';
      res.json(errObj);
      return;
    }   
    }
    async err_404(req, res) {
        res.status(404).send('404!');
    }
    

}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodejsyivanov@gmail.com',
      pass: '1qaZXCVB'
    }
  });

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
  
    return true;
  }

module.exports = new Controller();
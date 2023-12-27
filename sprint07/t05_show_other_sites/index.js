var express = require('express');
var app = express();
var request = require("request");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.post('/send', function (req, res) {
  // console.log(req.body);
  let html_body = '';
  let url = req.body.link;
  request.get( req.body.link, function(error, response, body){
    if( error )
      return next(error);
      html_body = body;
      html_body = html_body.replaceAll('<', "&lt");
      html_body = html_body.replaceAll('>', "&gt");
      let first =  html_body.indexOf("&ltbody");
      let second = html_body.indexOf("/body&gt");
       html_body = html_body.slice(first,second + 8);
      // console.log(html_body);
      res.json({
        url: url,
        html: html_body 
        });
    // res.send(body);
  });
});

app.post('/back', function (req, res) {
  res.redirect('/');
  
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');


var express = require('express');
var app = express();
var crypto = require('crypto');
var XMLHttpRequest = require('xhr2');

let public_key = 'fbbd098eea2bf4dfeaeaff75a248f795';
let private_key = 'a0f1ae16acbd9a630446ac09a7a603cef5d548f4';
let port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let hash = crypto.createHash('md5').update("1" + private_key + public_key).digest("hex");
let xhr = new XMLHttpRequest();
// xhr.responseType = 'json';
// xhr.overrideMimeType("application/json");

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});



app.post('/send', function (req, res) {
  xhr.open("get", `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${public_key}&hash=${hash}`, true);
  xhr.onload = function() {
    // var jsonResponse = xhr.response;
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
    }
    res.json(jsonResponse);
    // res.json({
    //   text: JSON.stringify(jsonResponse),
    // });
    // console.log(jsonResponse);
  };
  xhr.send();
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');
app.use(express.static(__dirname));


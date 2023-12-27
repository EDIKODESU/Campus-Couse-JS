var express = require('express');
var app = express();
const cookieParser = require("cookie-parser");

let port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');
app.use(express.static(__dirname));


var express = require('express');
var app = express();
const Note = require('./Note.js');
const NotePad = require('./NotePad.js');
var fs = require('fs');
var path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;
let fileList;
let param;
let select;

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.post('/send', function (req, res) {
  if(path.extname(req.body.name) == ''){
    req.body.name = req.body.name + '.txt';
  }
  select = req.body.select
  let readfile;
  let file = new Note(req.body.name);
  file.write(JSON.stringify(req.body));
  readfile = file.read();
  fileList = new NotePad();
  res.json({html: fileList.getHTMLList(),
            date: req.body.now
  });
});

app.get('/select-file', function (req, res) {
  param = req.query;
  res.sendFile((__dirname + '/page_2.html'));
});

app.get('/delete-file', function (req, res) {
  let parameters = req.query;
  let file = new Note(parameters.file);
  fileList = new NotePad();
  file.delete();
  // res.redirect('/');
  res.sendFile((__dirname + '/page_2.html'));
});

app.post('/pdata', function (req, res) {
  if( !param || !param.file){
    return;
  }
  let file = new Note(param.file);
  // console.log(file);
  let file_obj = JSON.parse(file.read());

  res.json({
          important: file_obj.important,
          name: file_obj.name,
          text: file_obj.text,
          date: file_obj.now
  });
  
});

app.get('/page.html', function (req, res) {
  fileList = new NotePad();
  res.json({html: fileList.getHTMLList()});
})

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

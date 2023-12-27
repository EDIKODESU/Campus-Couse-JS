var express = require('express');
var app = express();
const File = require('./File.js');
const FileList = require('./FileList.js');
var fs = require('fs');
var path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;
let fileList;
let param;

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.post('/send', function (req, res) {
  if(path.extname(req.body.name) == ''){
    req.body.name = req.body.name + '.txt';
  }
  console.log(req.body.name)
  let readfile;
  let file = new File(req.body.name);
  file.write(req.body.content);
  readfile = file.read();

  fileList = new FileList();
  res.json({html: fileList.getHTMLList(),
  });

});

app.get('/select-file', function (req, res) {
  param = req.query;
  res.sendFile((__dirname + '/page_2.html'));
});

app.post('/pdata', function (req, res) {
  let file = new File(param.file);

  res.json({
            read: file.read(),
            name: param.file
  });
  
});

app.post('/f_delete', function (req, res) {
  let file = new File(param.file);
  fileList = new FileList();
  file.delete();
  console.log(param.file);
  res.redirect('/');
  
});

app.get('/page.html', function (req, res) {
  fileList = new FileList();
  res.json({html: fileList.getHTMLList()});
})

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

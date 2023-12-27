var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
const multer  = require('multer')
const csv = require('csv-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(multer({dest:"uploads"}).single("filedata"));
app.set('views', __dirname+'/');
app.use(express.static(__dirname));

let port = 3000;

app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

let filedata;
let Path;
let fArray = [];

app.post('/sent', function (req, res) {
    filedata = req.file;
    Path = req.file.path;
    res.sendFile((__dirname + '/page_2.html'));

});

app.post('/table', function (req, res) {
  if(!filedata)
  res.redirect('/');
  fs.createReadStream(Path)
  .pipe(csv())
  .on('data', (data) => fArray.push(data))
  .on('end', () => {
    let html_table = Get_table(fArray);
    let html_select = Get_select(fArray);
    res.json({html: html_table, select: html_select});
  });

});

app.post('/sent_2', function (req, res, next) {
  let arr = [];
  arr = req.body.conversion;
  let str_name = arr[0];
  str_name = str_name.split(': ');
  let result = Get_sort_table(str_name, fArray);
  res.json({html: result});

});

app.listen(port, function() {
  console.log('Server started');
});

function Get_sort_table(arr_select, arr_obj){
  let resultSTR = '';
  let data = [];
  resultSTR += '<table id="customers">';
  resultSTR += '<tr id = "head">';
  for(let key in arr_obj[0]){
    resultSTR += `<th>${key}</th>`;
  }
  resultSTR += '</tr>';

  for(let i = 0; i < arr_obj.length; i++){
    for(let key in arr_obj[i]){
      if(arr_select[1] == arr_obj[i][key] && arr_select[0] == key){
        data.push(arr_obj[i])
        i++;
      }
    }
  }
  for(let i = 0; i < data.length; i++){
    resultSTR += '<tr>';
    for(let key in data[i]){
      resultSTR += `<td>${data[i][key]}</td>`;
    }
    resultSTR += '</tr>';
  }
  resultSTR += '</table>';
  return resultSTR;

}

function Get_select(fileArray){
  let resultSTR = '';
  let data = [];
  let keygen;
  resultSTR += '<select id="conversion" name="conversion">';
  for(let i = 0; i < fileArray.length; i++){
    for(let key in fileArray[i]){
      if(key == 'ID'){
        continue;
      }
      keygen = key + ": " + fileArray[i][key];
      if(data.includes(keygen))
        continue;
      else  
        data.push(keygen);
    }
  }
  data.sort();
  for(let i = 0; i < data.length; i++){
    resultSTR += `<option value="${data[i]}">${data[i]}</option>`
  }
  resultSTR += '</select>';
  resultSTR += '<button name="button" type="button" onclick="myFunction()">Apply</button>'
  return resultSTR;
}


function Get_table(fileArray){
  let resultSTR = '';
  resultSTR += '<table id="customers">';
  resultSTR += '<tr id = "head">';
  for(let key in fileArray[0]){
    resultSTR += `<th>${key}</th>`;
  }
  resultSTR += '</tr>';
  for(let i = 0; i < fileArray.length; i++){
    resultSTR += '<tr>';
    for(let key in fileArray[i]){
      resultSTR += `<td>${fileArray[i][key]}</td>`;
    }
    resultSTR += '</tr>';
  }
  resultSTR += '</table>';
  return resultSTR;

}
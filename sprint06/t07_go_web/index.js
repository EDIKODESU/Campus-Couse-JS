const normal = require('./normal-router');
const quantum = require('./quantum-router');
const host = 'localhost';

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/normal', function(req, res) {
    res.render('normal', {time: normal.calculateTime()});
});

app.get('/quantium', function(req, res){
    res.render('quantum', {time: quantum.calculateTime()});
});

app.listen(3000,host, function() {
    console.log("Server started");
});


const mysql = require('mysql2');
const config = require('./config.json');
const Model = require('./Model.js');

console.log('Get connection ...');

var conn = mysql.createConnection({
  database: config.database,
  host: config.host,
  user: config.user,
  password: config.password
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

conn.execute('SELECT * FROM heroes', function(err, result){
    if(err){
        console.log(err);
    }
    else console.log(result);
})
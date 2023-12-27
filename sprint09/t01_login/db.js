const mysql = require('mysql2');
const config = require('./config.json');

console.log('Get connection ...');

module.exports.startConnect = () => {
  var conn = mysql.createConnection({
    database: config.database,
    host: config.host,
    user: config.user,
    password: config.password
  });
  
  return conn;
}


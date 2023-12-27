const mysql = require('mysql2');
const config = require('./config.json');
const Hero = require('./models/hero.js')

console.log('Get connection ...');

var conn = mysql.createConnection({
  database: config.database,
  host: config.host,
  user: config.user,
  password: config.password
});


module.exports = conn;


// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// conn.execute('SELECT * FROM heroes', function(err, result){
//     if(err){
//         console.log(err);
//     }
//     else console.log(result);
// })

// let Person = new Hero(heroes);

// Person.find(2);
// Person.delete(1);
// Person.save(obj);
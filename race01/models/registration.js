const mysql = require('../db.js');
const Model = require('../model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


class userReg extends Model {
    constructor(login, pass, fullName, email) {
        super();
        this.login = login;
        this.pass = pass;
        this.fullName = fullName;
        this.email = email;
    }

    insertInDb(res) {
        let user = {
            login: this.login,
            pass: this.pass,
            fullName: this.fullName,
            email: this.email,
        }
        const sql = 'INSERT INTO users SET ?';

        // user.pass = bcrypt.hashSync(user.pass, bcrypt.genSaltSync(saltRounds));

        mysql.query(sql, user, function (err, rows) {
            if (err) {
                let str = err.message.split(' ')[err.message.split(' ').length - 1];
                if (str == "'users.email'") {
                    res.json({ans: 'User with this email is already registered'});
                }
                if (str == "'users.login'") {
                    res.json({ans: 'User with this login is already registered'});
                }
                return;
            }
            
            res.json({ans: 'OK'});
        });
    }
}

module.exports = userReg;
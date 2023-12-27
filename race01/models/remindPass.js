const mysql = require('../db.js');
const Model = require('../model.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const shortid = require('shortid');

class userPass extends Model {
    constructor(option) {
        super();
        this.email = option;
    }

    sendPass (res) {
        let user = {
            email: this.email,
        }

        let sql = 'SELECT * FROM users WHERE email=?';

        mysql.query(sql, user.email, (err, rows) => {
            if (err) {
                return console.log(err.message);
            }

            if (rows[0] === undefined) {
                res.json({and: 'User not found'});
            }

            else {
                const newPass = shortid.generate();
                let new_has = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10));

                mysql.query(`INSERT INTO users (login, pass, fullName, email) VALUES("${rows[0].login}", "${new_has}", "${rows[0].fullName}", "${rows[0].email}")
                 ON DUPLICATE KEY UPDATE pass="${new_has}", email="${rows[0].email}"`, (err, rows) => {
                    if (err) {
                        return console.log(err.message);
                    }
                });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ucode.dzhyhun@gmail.com',
                        pass: 'ucode222' 
                    }
                })

                transporter.sendMail({
                    from: 'ucode.dzhyhun@gmail.com',
                    to: user.email,
                    subject: 'Reminder Password',
                    html: `
                        <p>Dear user,</p>
                        <p>Your password is: ${newPass}</p>
                        <p>Слава Україні!</p>`
                }, (err, ress) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                res.json({ans: 'OK'});
            }
        })
    }
}

module.exports = userPass;
const Model = require('./../model.js')
const mysql = require('../db.js')

module.exports = class User extends Model {
    constructor(table_name){
        super(table_name);
    }
    async save(obj){
        let save_str = await super.save(obj);
        console.log(save_str);
    }
    async delete(id){
       let del = await super.delete(id);
       console.log(del);
    }
    async find(id){
       let arr = await super.find(id);
       console.log(arr);
    }

    async find_login(login){
        let result;
        let conn = mysql.startConnect();
        conn.connect();
        result = await conn.promise().query(`SELECT * FROM ${this.table_name} WHERE login=\'${login}\';`);
        conn.end();
        if(result){
            return result[0];
        }
        return result;
        // console.log(result[0]);
    }

    async find_mail(mail){
        let result;
        let conn = mysql.startConnect();
        conn.connect();
        result = await conn.promise().query(`SELECT * FROM ${this.table_name} WHERE mail=\'${mail}\';`);
        conn.end();
        if(result){
            return result[0];
        }
        return result;
        // console.log(result[0]);
    }
}
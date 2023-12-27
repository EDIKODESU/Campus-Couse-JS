const mysql = require('./db.js')

module.exports = class Model{
    constructor(table_name){
        this.table_name = table_name;
    }
    async find(id){
        let result = '';
        let conn = mysql.startConnect();
        conn.connect();
        result = await conn.promise().query(`SELECT * FROM ${this.table_name} WHERE id=${id};`).catch(err =>{
            if(err) console.log('ERRORR');
        });
        conn.end();
        return result[0];
    }

    async delete(id){
        let id_check = '';
        let del;
        let conn = mysql.startConnect();
        conn.connect();
        id_check = await conn.promise().query(`SELECT * FROM ${this.table_name} WHERE id = '${id}' ;`);
        if(id_check[0].length > 0){
            del = true;
        }
        else{
            del = false;
        }
        await conn.promise().query(`DELETE FROM ${this.table_name} WHERE id=${id};`).catch(err =>{
            if(err)console.log('ERRORR');
        });
        conn.end();
        return del;
    }

   async save(obj){
       let work = 'ok';
       let result = '';
       let arr = [];
       let arr_key = [];
       let str = '';
       let str_key = ' (';
       let str_value = ' (';
        for(let key in obj){
            arr.push(obj[key]);
            arr_key.push(key);
        }
        let i = 0;
        if(obj.id) i = 1
        for(i; i < arr.length; i++){
            str += `${arr_key[i]} = '${arr[i]}'`;
            str_value += `'${arr[i]}'`;
            str_key += `${arr_key[i]}`;
            if(arr.length - 1 > i){ str +=', '; str_key +=', '; str_value +=', '};
        }
        str_key += ')';
        str_value += ')';
        let conn = mysql.startConnect();
        conn.connect();

        if(obj.id){
          result = await conn.promise().query(`UPDATE ${this.table_name} SET ${str} WHERE id = ${obj.id};`).catch(err =>{
            if(err) { console.log('ERRORR'); work = 'not ok'};
        });
        }
        else {
            result = await conn.promise().query(`INSERT INTO ${this.table_name} ${str_key} VALUES ${str_value};`).catch(err =>{
                if(err) { console.log('ERRORR'); work = 'not ok'};
            });
        } 
        conn.end();
        return work;
    }
}

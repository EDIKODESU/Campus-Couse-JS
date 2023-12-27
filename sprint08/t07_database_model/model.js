const mysql = require('./db.js')

module.exports = class Model{
    constructor(table_name){
        this.table_name = table_name;
    }
    async find(id){
        let result = '';
        mysql.connect();
        result = await mysql.promise().query(`SELECT * FROM ${this.table_name} WHERE id=${id};`).catch(err =>{
            if(err) console.log('ERRORR');
        });
        mysql.end();
        return result[0];
        // console.log(result[0]);
    }

    async delete(id){
        let id_check = '';
        let del;
        mysql.connect();
        id_check = await mysql.promise().query(`SELECT * FROM ${this.table_name} WHERE id = '${id}' ;`);
        // console.log(id_check[0].length);
        if(id_check[0].length > 0){
            del = true;
        }
        else{
            del = false;
        }
        await mysql.promise().query(`DELETE FROM ${this.table_name} WHERE id=${id};`).catch(err =>{
            if(err)console.log('ERRORR');
        });
        // console.log(del);
        mysql.end;
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
        mysql.connect();

        if(obj.id){
          result = await mysql.promise().query(`UPDATE ${this.table_name} SET ${str} WHERE id = ${obj.id};`).catch(err =>{
            if(err) { console.log('ERRORR'); work = 'not ok'};
        });
        }
        else {
            result = await mysql.promise().query(`INSERT INTO ${this.table_name} ${str_key} VALUES ${str_value};`).catch(err =>{
                if(err) { console.log('ERRORR'); work = 'not ok'};
            });
        } 
        mysql.end;
        return work;
    }

}

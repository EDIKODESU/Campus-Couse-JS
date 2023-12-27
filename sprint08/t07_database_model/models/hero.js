const Model = require('./../model.js')

module.exports = class Hero extends Model {
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
}
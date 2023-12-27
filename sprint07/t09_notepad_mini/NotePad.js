var fs = require('fs');
const { fileURLToPath } = require('url');
var path = require('path');

module.exports = class {
    dir = 'tmp';
    arr = [];

    // constructor(){
        
    // }

    getList(){
        this.list = [];
        try {
           let data = fs.readdirSync(this.dir, {withFileTypes: true});
           data.forEach(file => {
            this.list.push(file.name);
        });
        }
        catch (err) {
            console.error(err);
        }
        return this.list;
    }

    hasFiles(){
        this.list = [];
        if(this.list){
            return true;
        }
        else{
            return false;
        }
    }

    getHTMLList(){
        this.list = [];
        this.list_2 = [];
        let ren;
        let file_obj;
        let rawdata;
        ren = '<ul>';
        try {
           let data = fs.readdirSync(this.dir, {withFileTypes: true});
           data.forEach(file => {
            this.list.push(file.name);
            rawdata = fs.readFileSync(path.resolve(__dirname,'tmp', file.name));
            file_obj = JSON.parse(rawdata);
            this.list_2.push(file_obj.now);
        });
            for(let i = 0; i<this.list.length;i++){
                ren += '<li><a href="/select-file?file='+ this.list[i] + '">'+ this.list_2[i] + ' > '+ this.list[i] +'</a>' + '<a href="/delete-file?file='+ this.list[i] + '"> Delete</a>' +'</li>';
            }
            ren += '</ul>';
        }
        catch (err) {
            console.error(err);
        }
        
        return ren;
    }
}

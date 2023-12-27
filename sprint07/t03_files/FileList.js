var fs = require('fs');

module.exports = class {
    dir = 'tmp';
    arr = [];

    constructor(){
        
    }

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
        let ren;
        ren = '<ul>';
        try {
           let data = fs.readdirSync(this.dir, {withFileTypes: true});
           data.forEach(file => {
            this.list.push(file.name);
        });
            for(let i = 0; i<this.list.length;i++){
                ren += '<li><a href="/select-file?file='+ this.list[i] + '">'+ this.list[i] +'</a></li>';
            }
            ren += '</ul>';
        }
        catch (err) {
            console.error(err);
        }
        
        return ren;
    }
}

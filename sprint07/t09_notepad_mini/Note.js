var fs = require('fs');

module.exports = class {
    dir = 'tmp';

    constructor(filename){
        this.filename = filename;
        this.filePath = this.dir + '/' + this.filename;
    }
    
    write(content){
        try {
            fs.accessSync(this.dir, fs.constants.R_OK);
        } 
        catch (err) {
            fs.mkdirSync(this.dir);
        }
        try {
            fs.appendFileSync(this.filePath, content);
        } 
        catch (err) {
            console.error(err);
        }
    }

    read(){
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return data;
        } 
        catch (err) {
            console.error(err);
        }

    }

    delete(){
        try {
            fs.unlinkSync(this.filePath);
        } 
        catch (err) {
            console.error(err);
        }
    }

}

module.exports = class Access {
    constructor(mark){
        this.mark = mark;
    }
    set behavior(mark){
        if(mark === ""){
            this.mark = `undefined`;
        }
        else if(mark  == null)   
            this.mark = `null`;
        else {
            this.mark = mark;
        }    
    }
    get beh(){
        return this.mark;
    }
  }
  
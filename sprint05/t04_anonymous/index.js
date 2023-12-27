const anonymous = class {
    constructor(name, alias, affiliation) {
        this.name = name;
        this.alias = alias;
        this.affiliation = affiliation;
    }
  }
  
exports.getAnonymous = function(name, alias, affiliation){
    const obj = new anonymous(name, alias, affiliation);
    return obj;
}

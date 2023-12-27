exports.Avenger = class {
    constructor(option) {
        this.name = option;
        this.alias = option;
        this.gender = option;
        this.age = option;
        this.power = option;
    }

    toString() {
        let str = '';
        str += this.name.toString();
        str += ' ';
        str += this.name.toString();
        str += ' ';
        str += this.age.toString();
        return str;
    }
}

exports.Avenger = function avenger(option){
    let Avenger = () => ([
        `${option.alias.toUpperCase()}`,
        `${option.powers.join('\n')}`
      ]).join('\n')
          Avenger.toString = () => [
            `name: ${option.name}`,
            `gender: ${option.gender}`,
            `age: ${option.age}`
          ].join('\n');
          return Avenger
}

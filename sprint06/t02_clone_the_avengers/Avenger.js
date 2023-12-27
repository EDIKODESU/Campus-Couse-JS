exports.Avenger = class {
    constructor(option) {
        this.name = option;
        this.alias = option;
        this.gender = option;
        this.age = option;
        this.powers = option;
        this.hp = option;
    }
    damage(damage) {
        this.hp -= damage.damage;
    }
}

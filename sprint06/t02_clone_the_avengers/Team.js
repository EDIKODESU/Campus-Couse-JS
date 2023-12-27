exports.Team = class {
    constructor(option, option) {
        this.id = option;
        this.avengers = option;
        this.result;
    }
    clone () {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    battle(damage) {
        this.avengers.forEach(item => item.damage(damage));
        this.avengers = this.avengers.filter(item => { if (item.hp > 0) return item; });
    }
    calculateLosses(clonedTeam) {
        this.avengers.length == clonedTeam.avengers.length ? 
        console.log(`We haven't lost anyone in this battle!`) : 
        (this.result = clonedTeam.avengers.length - this.avengers.length,
        console.log(`In this battle we lost ${this.result} Avengers`));


    }
}

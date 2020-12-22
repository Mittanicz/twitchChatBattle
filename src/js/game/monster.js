class Monster {
    constructor(health, armor, name) {
        this.health = health;
        this.armor = armor;
        this.name = name;
    }

    createMonster(){
        return {
            health: this.health,
            armor: this.armor,
            name: this.name,
        }
    }

    reduce(){
        this.health -=1;
    }
}

export default Monster;
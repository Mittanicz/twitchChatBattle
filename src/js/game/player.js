class Player {
  constructor(health, armor, baseDamage) {
    this.health = health;
    this.armor = armor;
    this.baseDamage = baseDamage;
  }

  createPlayer() {
    return {
      health: this.health,
      maxHealth: this.health,
      armor: this.armor,
      baseDamage: this.baseDamage,
    };
  }

  attack(monster, player, damage) {
    return player.baseDamage + damage - monster.armor;
  }
}

export default Player;

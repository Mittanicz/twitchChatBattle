import { monsterName } from './monsterNames';

class Monster {
  constructor() {}

  createMonster(player) {
    let result = {
      health: this.generateHealth(player),
      maxHealth: 0,
      armor: this.generateArmor(player),
      damage: this.generateDamage(player),
      attackSpeed: this.generateAttackSpeed(),
      name: this.generateName(),
    };
    result.maxHealth = result.health;
    return result;
  }

  generateAttackSpeed() {
    return Math.floor(2 + Math.floor(Math.random() * 5) * 1000);
  }

  generateHealth(player) {
    return Math.floor(1 + Math.floor(Math.random() * 30) + player.health * 1.1);
  }

  generateArmor(player) {
    return Math.floor(1 + Math.floor(Math.random() * 5) + player.baseDamage * 0.8);
  }

  generateDamage(player) {
    return Math.floor(1 + Math.floor(Math.random() * 6) + player.armor * 1.5);
  }

  generateName() {
    const random = Math.floor(Math.random() * monsterName.length);
    return monsterName[random];
  }

  attack(monster, player) {
    return monster.damage - player.armor;
  }
}

export default Monster;

import Monster from "./monster";
import { player } from "./player";

class Game {
    constructor() {
    }
    
    calculateDamage(damage, name, monster) {
        let userDamage = player.baseDamage + damage - monster.armor;
        let monsterHealth = document.getElementById('monsterHealth');
        if(userDamage > 0){
            monster.health = monster.health - userDamage;
        } else {
            userDamage = 0;
        }
        monsterHealth.innerHTML = monster.health;
        this.combatLog(userDamage, name);

        return userDamage
    }

    combatLog(userDamage, name){
        let record = document.createElement("li");
        if(userDamage <= 0){
            record.innerHTML = `Attack from ${name} was dodged`;
        } else {
            record.innerHTML = `${name} dealt ${userDamage}`;
        }
        document.getElementById("log").appendChild(record);

        let recordList = document.querySelectorAll('#log li').length
         

        if(recordList >= 8){
            let firstChild = document.getElementById("log");
            firstChild.removeChild(firstChild.childNodes[0])
        }
    }

    checkMonster(monsterHealth){
        if(monsterHealth <= 0){
            return true;
        }

    }

    createMonster(health){
        let monster;
        let monsterName = document.getElementById('monsterName');
        monsterName.innerHTML = 'qweqqw'
        return monster = new Monster(health * 3,2,'qwe')
    }

    storePreviousMonster(health){
        let monster;
        return monster = new Monster(health,2,'qwe')
    }

    gameInit(monster){
        let playerDamage = document.getElementById('playerDamage');
        let monsterArmor = document.getElementById('monsterArmor');
        playerDamage.innerHTML = player.baseDamage;
        monsterArmor.innerHTML = monster.armor;
    }
}

export default Game
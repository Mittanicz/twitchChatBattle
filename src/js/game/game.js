import Monster from "./monster";
import Player from "./player";

let monsterInstance = new Monster();
let playerInstance = new Player(100,2,3);

class Game {
    constructor() {
    }

    playerAttack(damage, monster){
        let userDamage = player.baseDamage + damage - monster.armor;
        return userDamage   
    }

    combatLog(damage, name){
        let record = document.createElement("li");
        if(damage <= 0){
            record.innerHTML = `Attack from ${name} was dodged`;
        } else {
            record.innerHTML = `${name} dealt ${damage}`;
        }
        document.getElementById("log").appendChild(record);

        let recordList = document.querySelectorAll('#log li').length
         
        if(recordList >= 8){
            let firstChild = document.getElementById("log");
            firstChild.removeChild(firstChild.childNodes[0])
        }
    }

    updatePlayerStats(){
        player.health += 2;
        player.baseDamage += 1;
        player.armor += 2;
        player.level +=1;
    }

    updateUi(monster, player){
        let playerArmor = document.getElementById('playerArmor');
        let playerDamage = document.getElementById('playerDamage');
        let monsterName = document.getElementById('monsterName');
        let monsterHealth = document.getElementById('monsterHealth');
        let monsterArmor = document.getElementById('monsterArmor');
        let monsterDamage = document.getElementById('monsterDamage');
        monsterName.innerHTML = monster.name;
        monsterHealth.innerHTML = monster.health;
        monsterArmor.innerHTML = monster.armor;
        monsterDamage.innerHTML = monster.damage;
        playerArmor.innerHTML = player.armor;
        playerDamage.innerHTML = player.baseDamage;

        let procentHealth = ((player.maxHealth / 100) * player.health);
        if(player.maxHealth == player.health){
            procentHealth = 100;
        }
        let playerHealthProgressBar = document.getElementById('healthProgressBar');
        playerHealthProgressBar.setAttribute('style', `background: linear-gradient(90deg, #860918 ${procentHealth}%, rgba(11,12,15,1) ${procentHealth}%);`)
        document.querySelector('#healthProgressBar div').innerHTML = `${player.health} / ${player.maxHealth}`

        let monsterProcentHealth = ((player.maxHealth / 100) * player.health);
        if(player.maxHealth == player.health){
            monsterProcentHealth = 100;
        }
        let monsterHealthProgressBar = document.getElementById('healthProgressBar');
        monsterHealthProgressBar.setAttribute('style', `background: linear-gradient(90deg, #860918 ${monsterProcentHealth}%, rgba(11,12,15,1) ${monsterProcentHealth}%);`)
        document.querySelector('#monsterHealthProgressBar div').innerHTML = `${monster.health} / ${monster.maxHealth}`
    }

    gameInit(monster, player){
        this.updateUi(monster, player)
    }

    checkGameStatus(monster, player){
        if(player.health <= 0){
            return 'playerDie';
        }
        if(monster.health <= 0){
            return 'monsterDie';
        }
    }

    createMonster(player) {
        let monster = monsterInstance.createMonster(player)
        this.updateUi(monster, player)
        return monster

    }

    restart(){
        let player = playerInstance.createPlayer()
        let monster = monsterInstance.createMonster(player)
        console.log(player)
        this.updateUi(monster, player)
        return {
            player: player,
            monster: monster,
        }
    }
}

export default Game
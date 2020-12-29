import '../scss/app.scss';
import Game from './game/game';
import Monster from './game/monster';
import Player from './game/player';

const game = new Game();
let playerInstance = new Player(100, 2, 3);
let monsterInstance = new Monster();
let player = playerInstance.createPlayer();
let monster = monsterInstance.createMonster(player);
game.gameInit(monster, player);

let gameStats = {
  current: {
    beatedMonsters: 0,
  },
  alltime: {
    beatedMonsters: 0,
  },
};

const client = new tmi.Client({
  options: {},
  connection: {
    reconnect: true,
    secure: true,
  },
  // Insert twitch channel name here
  channels: [''],
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
  if (self) return;
  function WordCount(message) {
    return message.split(' ').length;
  }
  playerAttack(WordCount(message), tags.username);
});

let tick = setInterval(monsterAttack, monster.attackSpeed);

function monsterAttack() {
  let damage = monsterInstance.attack(monster, player);
  if (damage > 0) {
    player.health = player.health - damage;
  } else {
    damage = 0;
  }
  game.combatLog(damage, monster.name);
  game.updateUi(monster, player);
  handleGameState();
}

function playerAttack(damage, user) {
  let userDamage = playerInstance.attack(monster, player, damage);
  if (userDamage > 0) {
    monster.health = monster.health - userDamage - 20;
  } else {
    userDamage = 0;
  }
  game.combatLog(userDamage, user);
  game.updateUi(monster, player);
  handleGameState();
}

function handleGameState() {
  let gameStatus = game.checkGameStatus(monster, player);

  if (gameStatus == 'playerDie') {
    console.log('playerDied');
    clearInterval(tick);
    let gameInfo = game.restart();
    gameRestart(gameInfo);
  } else if (gameStatus == 'monsterDie') {
    console.log('you beat a monster');
    game.updatePlayerStats(player);
    gameStats.current.beatedMonsters = gameStats.current.beatedMonsters + 1;
    game.updateGameStats(gameStats);
    clearInterval(tick);
    monster = monsterInstance.createMonster(player);
    tick = setInterval(monsterAttack, monster.attackSpeed);
  }
}

function gameRestart(gameInfo) {
  console.log('Restarting game...');
  game.updateUi(gameInfo.monster, gameInfo.player);
  if (gameStats.current.beatedMonsters > gameStats.alltime.beatedMonsters) {
    gameStats.alltime.beatedMonsters = gameStats.current.beatedMonsters;
  }
  monster = monsterInstance.createMonster(gameInfo.player);
  player = gameInfo.player;
  tick = setInterval(monsterAttack, monster.attackSpeed);
}

import '../scss/app.scss';
import Game from "./game/game";
import Monster from "./game/monster";

const game = new Game()
let monster = new Monster(10,1,'asd')
let previousMonster = new Monster(10,1,'asd')
game.gameInit(monster)
const client = new tmi.Client({
    options: { },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [ 'AdmiralBulldog' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    function WordCount(message) { 
        return message.split(" ").length;
    }
        calculate(WordCount(message), tags.username)

});

function calculate(damage, user) {
    game.calculateDamage(damage, user, monster);

    if(game.checkMonster(monster.health)){
        monster = game.createMonster(previousMonster.health,1,'asd')
        previousMonster = game.storePreviousMonster(monster.health,1,'asd')
    }
}


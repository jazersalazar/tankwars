import { Game } from './game';
import { Tank } from './entities/tank';

const g = new Game();

// Add player
const player = g.addEntity(new Tank(), 1, 1);

// Player Controller
window.addEventListener('keypress', function (e) {
    switch (e.key) {
        case 'w':
            player.move('north');
            break;
        case 'a':
            player.move('west');
            break;
        case 's':
            player.move('south');
            break;
        case 'd':
            player.move('east');
            break;
    }
});

g.app.ticker.add((delta) => {
    // Player Movments
    g.updateMoves(delta);
});
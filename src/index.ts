import { Game } from './game';
import { Tank } from './entities/tank';

let g = new Game();

// Add player
g.addEntity(new Tank(), 2, 8);
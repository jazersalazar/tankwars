import { Game } from './game';
import { Tank } from './tank';

let g = new Game();

// Add player
g.addEntity(new Tank(), 2, 8);
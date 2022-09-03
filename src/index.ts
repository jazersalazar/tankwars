import { Game } from './game';

const g = new Game();

// Player Controller
window.addEventListener('keypress', function (e) {
    // Movement
    switch (e.key) {
        case 'w':
            g.player.move('north');
            break;
        case 'a':
            g.player.move('west');
            break;
        case 's':
            g.player.move('south');
            break;
        case 'd':
            g.player.move('east');
            break;
    }

    // Transform
    if (e.key == 't') {
        g.player.changeColor();
    }
});

g.camera.ticker.add((delta) => {
    g.updateMoves(delta);

    if (!g.player.isMoving) {
        g.camera.renderer.render(g.camera.viewport);
    }
});

window.onresize = () => {
    g.camera.renderer.resize(window.innerWidth, window.innerHeight)
    g.camera.viewport.resize(window.innerWidth, window.innerHeight)
}
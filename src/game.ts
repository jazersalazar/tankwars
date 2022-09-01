import { Application, Container } from 'pixi.js';
import { Config } from './config';

export class Game {
    app         : Application;
    container   : Container;
    field       : Map<number, any>;

    constructor() {
        this.app = new Application({
            view            : document.getElementById('pixi-canvas') as HTMLCanvasElement,
            width           : Config.game.cells * Config.game.cellSize,
            height          : Config.game.rows * Config.game.cellSize,
            backgroundColor : Config.game.backgroundColor,
            resolution      : window.devicePixelRatio || 1,
        });

        this.container = new Container;
        this.app.stage.addChild(this.container);
        
        // enable zIndex
        this.container.sortableChildren = true;

        this.field = new Map();
    }
}
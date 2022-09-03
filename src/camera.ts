import { Renderer, Ticker, Graphics } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Config } from './helpers/config';

export class Camera {
    renderer    : Renderer;
    viewport    : Viewport;
    ticker      : Ticker;
    
    constructor(target: any) {
        this.renderer = new Renderer({
            backgroundAlpha : 0,
            width           : window.innerWidth,
            height          : window.innerHeight,
            resolution      : window.devicePixelRatio,
            antialias       : true,
            view            : document.getElementById("pixi-canvas") as HTMLCanvasElement,
        });

        this.viewport = new Viewport({
            worldWidth  : Config.game.columns * Config.game.cellSize,
            worldHeight : Config.game.rows * Config.game.cellSize,
            threshold   : Config.game.cellSize * 2,
        });

        this.viewport.follow(target.sprite, {
            speed           : 0,
            acceleration    : null,
            radius          : null,
        });
        
        this.viewport.addChild(target.sprite);
        this.viewport.sortableChildren = true;
        this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2);

        this.ticker = Ticker.shared;

        this.border();
    }

    border() {
        const line = this.viewport.addChild(new Graphics())
        line.lineStyle(10, 0xff0000).drawRect(0, 0, this.viewport.worldWidth, this.viewport.worldHeight)
        line.zIndex = -1;
    }
}

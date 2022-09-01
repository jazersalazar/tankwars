import { Application, Container, Sprite } from 'pixi.js';
import { Config } from './config';
import { Entity } from './entity';
import { Utils } from './utils';

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

    addEntity(entity: Entity, cell = 1, row = 1) {
        entity.setSprite(Sprite.from(entity.currentTexture));

        this.container.addChild(entity.sprite);

        const id = Utils.getRandomNum();
        entity.id = id;

        entity.setCellPosition(cell, row);
        this.field.set(id, entity);

        return this.field.get(id);
    }
}
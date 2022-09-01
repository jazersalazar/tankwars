import { Sprite } from 'pixi.js';
import { Utils } from './utils';

export class Entity {
    id              : number;
    sprite          : Sprite;
    positionCell    : number[];
    direction       : string;
    isDamagable     : boolean;
    isDestroyed     : boolean;
    health          : number;
    textures!       : any;
    currentTexture  : any;

    constructor(id: number = 0) {
        // Enity unique id
        this.id = id;

        this.sprite = new Sprite;

        // position & direction
        this.positionCell = [1, 1];
        this.direction = "North";

        // status
        this.isDamagable = true;
        this.isDestroyed = false;
        this.health = 1;
    }

    setTextures(normalTexture: string, destroyedTexture: string) {
        this.textures = {
            normal: normalTexture,
            destroyed: destroyedTexture
        };

        this.currentTexture = this.textures.normal;
    }

    setSprite(sprite: Sprite) {
        this.sprite = sprite;
        this.sprite.anchor.set(0.5);
    }

    setCellPosition(x: number, y: number) {
        this.positionCell = [x, y];
        this.sprite.x = Utils.cellToPos([x, y])[0];
        this.sprite.y = Utils.cellToPos([x, y])[1];
    }

    setDirection(direction: string) {
        this.direction = direction;
        switch (direction) {
            case 'east':
                this.sprite.angle = 90;
                break;
            case 'west':
                this.sprite.angle = 270;
                break;
            case 'north':
                this.sprite.angle = 0;
                break;
            case 'south':
                this.sprite.angle = 180;
                break;
        }
    }
}
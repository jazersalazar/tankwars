import { Sprite } from 'pixi.js';

export class Entity {
    id              : number;
    sprite          : Sprite;
    positionCell    : number[];
    facing          : string;
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
        this.facing = "North";

        // status
        this.isDamagable = true;
        this.isDestroyed = false;
        this.health = 1;
    }
}
import { Texture } from "pixi.js";
import { Config } from "../helpers/config";
import { Movable } from "./movable";

export class Tank extends Movable {
    tankColor       : keyof typeof Config.tanks;
    bulletDamage    : number;
    bulletCount     : number;

    constructor() {
        super();

        // Assign red as default tank values
        this.tankColor = 'red';
        this.setTextures(Config.tanks[this.tankColor].texture, '');
        this.bulletDamage = Config.tanks[this.tankColor].bulletDamage;
        this.bulletCount = Config.tanks[this.tankColor].bulletCount;
    }

    changeColor() {
        // Generate next transform color
        switch (this.tankColor) {
            case 'red':
                this.tankColor = 'green';
                break;
            case 'green':
                this.tankColor = 'blue';
                break;
            case 'blue':
                this.tankColor = 'red';
                break;
        }

        this.bulletDamage = Config.tanks[this.tankColor].bulletDamage;
        this.bulletCount = Config.tanks[this.tankColor].bulletCount;
        this.currentTexture = Config.tanks[this.tankColor].texture;
        this.sprite.texture = Texture.from(this.currentTexture);
    }
}
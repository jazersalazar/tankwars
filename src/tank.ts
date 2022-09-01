import { Config } from "./config";
import { Movable } from "./movable";

export class Tank extends Movable {
    bulletDamage    : number;
    bulletCount     : number;

    constructor() {
        super();

        // Assign red as default tank values
        this.setTextures(Config.textures.tanks.red, '');
        this.bulletDamage = Config.tanks.red.bulletDamage;
        this.bulletCount = Config.tanks.red.bulletCount;
    }
}
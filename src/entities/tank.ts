import { Texture } from "pixi.js";
import { Game } from "../game";
import { Config } from "../helpers/config";
import { Utils } from "../helpers/utils";
import { Bullet } from "./bullet";
import { Movable } from "./mobility";

export class Tank extends Movable {
    tankColor       : keyof typeof Config.tanks;
    bulletDamage    : number;
    bulletCount     : number;
    bulletSpeed     : number;
    shootingRate    : number;
    isFiring        : boolean;

    constructor() {
        super();

        // Assign red as default tank values
        this.tankColor = 'red';
        this.setTextures(Config.tanks[this.tankColor].texture, '');
        this.bulletDamage = Config.tanks[this.tankColor].bulletDamage;
        this.bulletCount = Config.tanks[this.tankColor].bulletCount;
        this.bulletSpeed = Config.bullets.speed;
        this.shootingRate = Config.bullets.shootingRate;
        this.isFiring = false;
        this.isDamageable = true;
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

    shoot(game: Game) {
        if (this.isFiring) {
            return;
        } else {
            this.isFiring = true;
        }

        setTimeout((tank = this) => {
            tank.isFiring = false
        }, 100 * (10 - this.shootingRate));

        this.fireBullet(game, this.bulletCount);
    }

    private fireBullet(game: Game, remainingBullets: number) {
        const bullet = game.addEntity(
            new Bullet(this.bulletDamage),
            this.positionCell[0],
            this.positionCell[1],
        );
        
        bullet.move(this.direction);

        remainingBullets--;

        // Fire bullets until there's no more remaining
        if (remainingBullets > 0) {
            Utils.sleep(100).then(() => {
                this.fireBullet(game, remainingBullets);
            });
        } else {
            return;
        }
    }
}

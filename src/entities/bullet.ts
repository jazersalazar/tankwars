import { Movable } from "./mobility";
import { Config } from "../helpers/config";
import { Entity } from "../entity";

export class Bullet extends Movable {
    damage : any;

    constructor(damage: number) {
        super();

        this.setTextures(Config.bullets.texture, '');
        this.damage = damage;
        this.isDamageable = false;
    }

    hasHitBorder() {
        // destroy on collission
        this.sprite.destroy();
    }

    hasHit(hitEntity: Entity) {
        // destroy on collission
        this.sprite.destroy();

        // damage entity if possible
        if (hitEntity.isDamageable) {
            hitEntity.takeDamage(this.damage);
        }
    }
}
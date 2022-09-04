import { Config } from "../helpers/config";
import { Unmovable } from "./mobility";

export class Haystack extends Unmovable {
    constructor() {
        super();

        this.setTextures(Config.hays.texture.normal, Config.hays.texture.destroyed);
        this.health = Config.hays.health;
        this.isDamageable = true;
    }
}
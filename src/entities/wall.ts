import { Config } from "../helpers/config";
import { Unmovable } from "./mobility";

export class Wall extends Unmovable {
    constructor() {
        super();

        this.setTextures(Config.walls.texture, '');
    }
}
import { Config } from "./config";

export class Utils {
    static getRandomNum() {
        return Math.floor(Math.random() * 9999);
    }

    static cellToPos(cellrow: number[]) {
        return [
            (cellrow[0] * Config.game.cellSize) - Config.game.cellSize / 2,
            (cellrow[1] * Config.game.cellSize) - Config.game.cellSize / 2,
        ]
    }

    static posToCell(xy: number[]) {
        return [
            Math.floor((xy[0] + Config.game.cellSize / 2) / Config.game.cellSize),
            Math.floor((xy[1] + Config.game.cellSize / 2) / Config.game.cellSize),
        ]
    }
}
import { Entity } from "../entity";

export class Movable extends Entity {
    isMoving    : boolean;
    moveToCell  : number[];

    constructor() {
        super();
        
        this.isMoving = false;
        this.moveToCell = [];
    }

    move(direction: string) {
        if (this.isMoving == true) {
            return;
        } else {
            this.isMoving = true;
        }

        // set default values
        this.moveToCell = [this.positionCell[0], this.positionCell[1]];

        // set movement direction
        switch (direction) {
            case "west":
                this.moveToCell[0] -= 1;
                break;
            case "east":
                this.moveToCell[0] += 1;
                break;
            case "north":
                this.moveToCell[1] -= 1;
                break;
            case "south":
                this.moveToCell[1] += 1;
                break;
        }

        // set direction
        this.setDirection(direction);
    }
}
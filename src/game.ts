import { Sprite } from 'pixi.js';
import { Config } from './helpers/config';
import { Entity } from './entity';
import { Movable } from './entities/movable';
import { Utils } from './helpers/utils';
import { Camera } from './camera';
import { Tank } from './entities/tank';

export class Game {
    field       : Map<number, any>;
    camera      : Camera;
    player      : any;
    constructor() {
        this.field = new Map();
        // Create and follow player
        this.player = this.addEntity(new Tank(), 1, 1, false);
        this.camera = new Camera(this.player);
    }

    public addEntity(entity: Entity, cell = 1, row = 1, addtoCamera = true) {
        entity.setSprite(Sprite.from(entity.currentTexture));

        if (addtoCamera) {
            this.camera.viewport.addChild(entity.sprite);
        }

        const id = Utils.getRandomNum();
        entity.id = id;

        entity.setCellPosition(cell, row);

        this.field.set(id, entity);

        return this.field.get(id);
    }

    moveEntity(entity: Movable, delta: any) {
        const currentLocation = [entity.sprite.x, entity.sprite.y];
        const targetLocation = Utils.cellToPos(entity.moveToCell);

        // Prevent entity from moving if it arrived to the target location
        if (currentLocation[0] === targetLocation[0] &&
            currentLocation[1] === targetLocation[1]) {

            entity.isMoving = false;
            return;
        }

        const nextLocation = [currentLocation[0], currentLocation[1]];

        switch (entity.direction) {
            case 'north':
                nextLocation[1] = currentLocation[1] - (entity.movementSpeed + delta);

                if (nextLocation[1] < targetLocation[1]) {
                    nextLocation[1] += targetLocation[1] - nextLocation[1];
                }
                break;
            case 'south':
                nextLocation[1] = currentLocation[1] + (entity.movementSpeed + delta);

                if (nextLocation[1] > targetLocation[1]) {
                    nextLocation[1] -= nextLocation[1] - targetLocation[1];
                }
                break;
            case 'west':
                nextLocation[0] = currentLocation[0] - (entity.movementSpeed + delta);

                if (nextLocation[0] < targetLocation[0]) {
                    nextLocation[0] += targetLocation[0] - nextLocation[0];
                }
                break;
            case 'east':
                nextLocation[0] = currentLocation[0] + (entity.movementSpeed + delta);

                if (nextLocation[0] > targetLocation[0]) {
                    nextLocation[0] -= nextLocation[0] - targetLocation[0];
                }
                break;
        }

        entity.sprite.x = nextLocation[0];
        entity.sprite.y = nextLocation[1];
    }

    detectCollision(entity: Movable) {
        for (let [, otherEntity] of this.field.entries()) {
            // Skip detection from self
            if (entity.id === otherEntity) {
                continue;
            }

            // Skip collision with non-damageable
            if (otherEntity.isDamageable === false ||
                otherEntity.isDestroyed) {

                continue;
            }

            // Detect game borders
            if (entity.moveToCell[0] < 1 ||
                entity.moveToCell[0] > Config.game.columns ||
                entity.moveToCell[1] < 1 ||
                entity.moveToCell[1] > Config.game.rows) {

                return true
            }
        }

        return false;
    }

    updateMoves(delta: any) {
        for (let [, entity] of this.field.entries()) {
            // Skip entity if it's not moving
            if (entity.isMoving !== true) continue;

            // Check collision
            if (this.detectCollision(entity)) {
                entity.isMoving = false;
                entity.moveToCell = entity.positionCell;
            } else {
                entity.positionCell = entity.moveToCell;
            }

            if (entity.isMoving) {
                this.moveEntity(entity, delta);
            }
        }
    }
}
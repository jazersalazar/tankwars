import { Sprite } from 'pixi.js';
import { Config } from './helpers/config';
import { Entity } from './entity';
import { Movable } from './entities/mobility';
import { Utils } from './helpers/utils';
import { Camera } from './camera';
import { Tank } from './entities/tank';
import { Wall } from './entities/wall';
import { Haystack } from './entities/haystack';
import { Bullet } from './entities/bullet';

export class Game {
    field       : Map<number, any>;
    camera      : Camera;
    player      : any;
    spawnMap   : any;

    constructor() {
        this.field = new Map();

        // Generate random starting position
        const x = Math.floor(Math.random() * Config.game.columns) + 1;
        const y = Math.floor(Math.random() * Config.game.rows) + 1;

        // Create and follow player
        this.player = this.addEntity(new Tank(), x, y, false);
        this.player.sprite.zIndex = 1;
        this.player.setDirection('south');

        this.camera = new Camera(this.player);

        // Intialize spawn map with palyer position
        this.spawnMap = [x + ',' + y];
        this.spawnEntities(Wall, Config.walls.spawnCount);
        this.spawnEntities(Haystack, Config.hays.spawnCount);
    }

    spawnEntities(entity: any, remainingEntities: number) {
        const x = Math.floor(Math.random() * Config.game.columns) + 1;
        const y = Math.floor(Math.random() * Config.game.rows) + 1;
        const coords = x + ',' + y;

        // Only spawn if it's a unique spot
        if (!this.spawnMap.includes(coords)) {
            this.addEntity(new entity, x, y);
            this.spawnMap.push(coords);
            remainingEntities--;
        }

        // Spawn until there's no more remaining to spawn
        if (remainingEntities > 0) {
            this.spawnEntities(entity, remainingEntities);
        } else {
            return;
        }
    }

    addEntity(entity: Entity, cell = 1, row = 1, addtoCamera = true) {
        entity.setSprite(Sprite.from(entity.currentTexture));

        if (addtoCamera) {
            this.camera.viewport.addChild(entity.sprite);
        }

        const id = Utils.getRandomNum();
        entity.id = id;

        entity.setCellPosition(cell, row);
        entity.sprite.zIndex = -2;

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
            if (entity instanceof Bullet) {
                entity.move(entity.direction);
            }

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
            if (entity.id === otherEntity.id) {
                continue;
            }

           // Skip collision with non-damageable
            if (otherEntity.isDestroyed) {
                continue;
            }

            // Check if collided with other entity
            switch (JSON.stringify(entity.moveToCell)) {
                case JSON.stringify(otherEntity.positionCell):
                case JSON.stringify(otherEntity.moveToCell):

                if (entity instanceof Bullet) {
                    entity.hasHit(otherEntity);
                    this.field.delete(entity.id);
                }

                return true;
            }

            // Detect game borders
            if (entity.moveToCell[0] < 1 ||
                entity.moveToCell[0] > Config.game.columns ||
                entity.moveToCell[1] < 1 ||
                entity.moveToCell[1] > Config.game.rows) {

                if (entity instanceof Bullet) {
                    entity.hasHitBorder();
                    this.field.delete(entity.id);
                }

                return true;
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
import {BLOCK_HEIGHT, BLOCK_WIDTH, blockSprite} from "./consts.js";

export class Block {
    constructor(x, y, spriteX, spriteY, spriteWidth, spriteHeight) {
        this.x = x;
        this.y = y;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = BLOCK_WIDTH;
        this.height = BLOCK_HEIGHT;
        this.blockSprite = blockSprite;
        this.isActive = true;
    }

    draw(ctx) {
        if(!this.isActive)
            return;
        ctx.drawImage(this.blockSprite, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    }

    hit(){
        this.isActive = false;
    }

    isCollidingWith(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }



}
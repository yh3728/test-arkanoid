import {PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_WIDTH, playerSprite, WALL_LEFT, WALL_RIGHT} from "./consts.js";

export class Player{
    speed;
    constructor(x ,y){
        this.startPos = {x: x, y: y};
        this.x = x
        this.y = y
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.sprite = playerSprite;
    }

    init(){
        this.x = this.startPos.x
        this.y = this.startPos.y
        this.speed = PLAYER_SPEED;
    }

    stopMoving(){
        this.speed = 0;
    }

    update(inputHandler){
        this.move(inputHandler);
    }

    move({moveLeft, moveRight}){
        if (moveLeft && !this.isCollidingWith(WALL_LEFT)) this.x -= this.speed;
        if (moveRight && !this.isCollidingWith(WALL_RIGHT)) this.x += this.speed;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

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
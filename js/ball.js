import {BALL_RADIUS, BALL_SPEED} from "./consts.js";

export class Ball {
    constructor(x, y) {
        this.startPos = {x: x, y: y};
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = BALL_RADIUS;
    }

    init(){
        this.x = this.startPos.x;
        this.y = this.startPos.y;
        this.vx = BALL_SPEED;
        this.vy = -1 * BALL_SPEED;
    }


    stopMoving(){
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill()
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    isCollidingWith(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.radius > other.x &&
            this.y < other.y + other.height &&
            this.y + this.radius > other.y
        );
    }
}
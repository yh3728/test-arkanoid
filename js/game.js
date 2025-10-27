import {Player} from "./player.js";
import {InputHandler} from "./input-handler.js";
import {cutTileset} from "./cut-tileset.js";
import {
    BLOCK_ROWS_COUNT,
    GAME_HEIGHT,
    GAME_WIDTH,
    BLOCK_COLS_COUNT,
    BLOCK_MARGIN,
    BLOCK_WIDTH,
    BLOCK_HEIGHT, PLAYER_WIDTH, WALL_LEFT, WALL_RIGHT, WALL_TOP, hitBlockSound, hitPlatformSound, deathSound, winSound
} from "./consts.js";
import {Block} from "./block.js";
import {Ball} from "./ball.js";
import {Menu} from "./menu.js";

export class Game {
    constructor() {
        this.bg = new Image();
        this.menu = new Menu(this);
        this.bg.src = './assets/Fields.png';
        this.ball = new Ball(GAME_WIDTH / 2, GAME_HEIGHT - GAME_HEIGHT/4);
        this.player = new Player(GAME_WIDTH / 2 - PLAYER_WIDTH / 2, GAME_HEIGHT - GAME_HEIGHT/8, this.ball);
        this.bgCut = cutTileset(2, 5, this.bg.width, this.bg.height);
        this.blocks = []
        this.bgNum = Math.floor(Math.random() * 8) + 1;
        this.score = 0;
        this.gameOver = false;
        this.win = false;
        this.inputHandler = new InputHandler();
        this.initBlocks()
    }

    startGame(){
        this.gameOver = false;
        this.win = false;
        this.player.init();
        this.ball.init();
        this.score = 0;
        this.gameOver = false;
        this.win = false;
        this.bgNum = Math.floor(Math.random() * 8) + 1;
        this.blocks = [];
        this.initBlocks();
    }

    endGame(){
        this.player.stopMoving();
        this.ball.stopMoving();
        if (this.gameOver)
            this.menu.changeText("GAME OVER!\n Your score is " + this.score);
        else if (this.win)
            this.menu.changeText("VICTORY!")
        this.menu.visible = true;
    }

    initBlocks(){
        let blockSprite = new Image();
        blockSprite.src = "./assets/blocks.png";
        let cut = cutTileset(1, 7, blockSprite.width, blockSprite.height);
        let color = Math.floor(Math.random() * 7) + 1;
        let x = 0, y = 0;
        for (let i = 0; i < BLOCK_ROWS_COUNT; i++) {
            x = (GAME_WIDTH - BLOCK_WIDTH * BLOCK_COLS_COUNT) / 2;
            y += BLOCK_MARGIN + BLOCK_HEIGHT;
            for (let j = 0; j < BLOCK_COLS_COUNT; j++) {
                this.blocks.push(new Block(x, y, ...cut.cords[color], cut.width, cut.height, this.ball));
                x += BLOCK_WIDTH;
            }
        }
    }

    detectBallCollision(){
        this.detectBallWallsCollision();
        this.detectBallPlayerCollision()
        this.detectBallBlocksCollision();
    }

    detectBallWallsCollision(){
        if (this.ball.isCollidingWith(WALL_LEFT) || this.ball.isCollidingWith(WALL_RIGHT)) {
            this.ball.vx *= -1;
        }
        if (this.ball.isCollidingWith(WALL_TOP)) {
            this.ball.vy *= -1;
        }
        if (this.ball.y > GAME_HEIGHT) {
            this.gameOver = true;
            deathSound.play();
            this.endGame();
        }
    }

    detectBallPlayerCollision(){
        if (this.ball.isCollidingWith(this.player)) {
            hitPlatformSound.play();
            let collidePoint = (this.ball.x - (this.player.x + this.player.width / 2)) / (this.player.width / 2);
            let angle = collidePoint * (Math.PI / 3);
            let speed = Math.sqrt(this.ball.vx ** 2 + this.ball.vy ** 2);
            this.ball.vx = speed * Math.sin(angle);
            this.ball.vy = -speed * Math.cos(angle);
        }
    }

    detectBallBlocksCollision(){
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i] === null) continue;
            if (this.ball.isCollidingWith(this.blocks[i])) {
                hitBlockSound.play();
                this.ball.vx *= -1;
                this.ball.vy *= -1;
                this.blocks[i].hit();
                this.blocks[i] = null;
                this.updateScore()
                return;
            }
        }
    }

    update() {
        if (!this.gameOver && !this.win) {
            this.player.update(this.inputHandler);
            this.detectBallCollision()
            this.ball.update()
            if ((this.blocks.every(block => block === null)) && !this.menu.visible) {
                this.win = true;
                winSound.play();
                this.endGame();
            }
        }
    }

    updateScore(){
        this.score += 100;
    }

    draw(ctx) {
        if (this.menu.visible)
            this.menu.draw(ctx);
        else {
            ctx.drawImage(this.bg, ...this.bgCut.cords[this.bgNum], this.bgCut.width, this.bgCut.height, 0, 0, GAME_WIDTH, GAME_HEIGHT);
            this.player.draw(ctx);
            this.ball.draw(ctx);
            for (let i = 0; i < this.blocks.length; i++) {
                if (this.blocks[i] === null) continue;
                this.blocks[i].draw(ctx);
            }
            ctx.font = "48px 'Pixelify Sans'";
            ctx.fillStyle = "red";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.fillText("SCORE: " + this.score, GAME_WIDTH - 300, GAME_HEIGHT - 20);
            ctx.strokeText("SCORE: " + this.score, GAME_WIDTH - 300, GAME_HEIGHT - 20);
        }
    }

}

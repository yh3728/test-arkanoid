import {Game} from "./game.js";
import {GAME_HEIGHT, GAME_WIDTH} from "./consts.js";

export class Menu {
    text;
    constructor(game) {
        this.game = game;
        this.text = "";
        this.visible = true;
        document.addEventListener('keydown', e => this.keyDown(e));
    }

    changeText(text){
        this.text = text;
    }

    draw(ctx) {
        if (!this.visible) {
            return;
        }
        ctx.font = "48px 'Pixelify Sans'";
        ctx.fillStyle = "red";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.fillText("Press space to start", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        ctx.strokeText("Press space to start", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        ctx.font = "20px 'Pixelify Sans'";
        ctx.fillText(this.text, GAME_WIDTH / 2, GAME_HEIGHT / 1.6);

    }

    keyDown(e) {
        if (e.code === "Space") {
            this.startGame();
        }
    }

    startGame(){
        clearInterval(this.interval);
        this.visible = false;
        this.game.startGame();
    }


}
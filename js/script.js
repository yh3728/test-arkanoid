import { Game } from "./game.js";
import {Menu} from "./menu.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//для корректного отображения пиксельной графики
ctx.imageSmoothingEnabled = false;

const game = new Game();
const menu = new Menu(game, "");

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
}

game.bg.onload = () => animate();

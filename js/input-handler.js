export class InputHandler {
    constructor() {
        document.addEventListener('keydown', e => this.keyDown(e));
        document.addEventListener('keyup', e => this.keyUp(e));
        this.moveLeft = false;
        this.moveRight = false;
    }

    keyDown(e) {
        if (e.code === "KeyA") {
            this.moveLeft = true;
        }
        if (e.code ===  "KeyD" ) {
            this.moveRight = true;
        }

    }
    keyUp(e) {
        if (e.code === "KeyA") {
            this.moveLeft = false;
        }
        if (e.code === "KeyD") {
            this.moveRight = false;
        }
    }
}
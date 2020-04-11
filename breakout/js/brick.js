import { collisionDetection } from "/js/collision.js";

export default class Brick {
  constructor(game, pos) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.width = 76;
    this.height = 30;
    this.position = pos;
    this.markedForDeletion = false;
  }

  draw(ctx) {
    var brickImg = document.getElementById("brick-img");
    ctx.drawImage(
      brickImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (collisionDetection(this.game.ball, this)) {
      this.game.ball.speed.y *= -1;
      this.markedForDeletion = true;
    }
  }
}

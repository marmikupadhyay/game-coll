import { collisionDetection } from "/js/collision.js";

export default class Ball {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.game = game;
    this.height = 40;
    this.width = 40;
    this.speed = {
      x: 4,
      y: 3,
    };
    this.position = {
      x: this.width + 20,
      y: this.gameHeight / 2,
    };
  }

  draw(ctx) {
    var ballImg = document.getElementById("ball-img");
    ctx.drawImage(
      ballImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  reset() {
    this.position = {
      x: this.width + 20,
      y: this.gameHeight / 2,
    };
  }
  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // detectCollision();
    if (this.position.x < 0 || this.position.x + this.width > this.gameWidth)
      this.speed.x *= -1;
    if (this.position.y < 0) this.speed.y *= -1;
    if (this.position.y + this.height > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    if (collisionDetection(this, this.game.paddle)) {
      this.speed.y *= -1;
      this.position.y = this.game.paddle.position.y - this.height;
    }
  }
}

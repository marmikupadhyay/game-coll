import collisionDetection from "/js/collision.js";

export default class Bullet {
  constructor(game) {
    this.radius = 10;
    this.height = this.radius;
    this.width = this.radius;
    this.bullet = document.getElementById("ball");
    this.speed = 10;
    this.power = 1;
    this.markedForDeletion = false;
    // this.bps = 15;
    this.position = {
      x: game.paddle.position.x + game.paddle.width / 2 - this.radius / 2,
      y: game.paddle.position.y - 20,
    };
  }
  draw(ctx, game) {
    ctx.drawImage(
      this.bullet,
      this.position.x,
      this.position.y,
      this.radius,
      this.radius
    );
  }
  update(game) {
    this.position.y -= this.speed;
    game.obstacles.forEach((obstacle) => {
      if (collisionDetection(this, obstacle)) {
        obstacle.health -= this.power;
        this.markedForDeletion = true;
      }
    });
    if (this.position.y < 0) return true;
    else return false;
  }
}

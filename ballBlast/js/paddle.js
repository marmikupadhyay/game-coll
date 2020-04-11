import Bullet from "/js/bullet.js";
import collisionDetection from "/js/collision.js";

export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 110;
    this.height = 110;
    this.maxSpeed = 10;
    this.speed = 0;
    this.health = 100;
    this.canonTurret = document.getElementById("canonturret");
    this.canonBody = document.getElementById("canonbody");
    this.canon = document.getElementById("canon");

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 20,
    };
  }

  draw(ctx, game) {
    ctx.fillStyle = "#0ff";
    ctx.drawImage(
      this.canon,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    // console.log(1);
  }
  update(game) {
    this.position.x += this.speed;
    var canvas = document.getElementById("game-screen");
    var wrapper = document.querySelector(".wrapper");
    var l = wrapper.clientWidth / 2 - canvas.clientWidth / 2;
    canvas.addEventListener("mousemove", (e) => {
      this.position.x = e.clientX - this.width / 2 - l;
    });
    game.obstacles.forEach((obstacle) => {
      if (collisionDetection(this, obstacle)) {
        this.health -= obstacle.health;
      }
    });
    if (this.position.x < 0) {
      this.speed = 0;
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.speed = 0;
      this.position.x = this.gameWidth - this.width;
    }
  }
}

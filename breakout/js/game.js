import Paddle from "/js/paddle.js";
import InputHandler from "/js/input.js";
import Ball from "/js/ball.js";
import { level1, level2, buildLevel } from "/js/level.js";

const GAMESTATE = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  newlevel: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gameState = GAMESTATE.menu;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.objects = [];
    new InputHandler(this.paddle, this);
    this.levels = [level1, level2];
    this.currentLevel = 0;
    this.lives = 3;
  }

  start() {
    if (
      this.gameState != GAMESTATE.menu &&
      this.gameState != GAMESTATE.newlevel
    )
      return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.objects = [this.paddle, this.ball, ...this.bricks];
    this.gameState = GAMESTATE.running;
  }
  update() {
    if (
      this.gameState == GAMESTATE.paused ||
      this.gameState === GAMESTATE.menu ||
      this.gameState === GAMESTATE.gameover
    )
      return;
    this.objects.forEach((object) => {
      object.update();
    });
    this.objects = this.objects.filter((object) => !object.markedForDeletion);
    if (this.lives < 0) {
      this.gameState = GAMESTATE.gameover;
    }

    if (this.objects.length === 2) {
      this.currentLevel++;
      console.log(this.currentLevel);
      this.gameState = GAMESTATE.newlevel;
      this.start();
    }
  }

  draw(ctx) {
    if (this.gameState === GAMESTATE.menu) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gameState === GAMESTATE.gameover) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GameOver", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.paused) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    this.objects.forEach((object) => {
      object.draw(ctx);
    });
    ctx.rect(700, 0, 20, 20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Lives : ${this.lives}`, 700, 20);
  }

  togglePause() {
    if (this.gameState === GAMESTATE.paused) {
      this.gameState = GAMESTATE.running;
    } else this.gameState = GAMESTATE.paused;
  }
}

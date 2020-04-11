import Paddle from "/js/paddle.js";
import InputHandler from "/js/input.js";
import Bullet from "/js/bullet.js";
import { level1, level2 } from "/js/level.js";
import Object from "/js/objects.js";

const GAMESTATE = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  newlevel: 4,
  gamecomplete: 5,
};
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default class Game {
  constructor(gameWidth, gameHeight, ctx) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gameState = GAMESTATE.menu;
    this.paddle = new Paddle(this);
    this.bullets = [];
    this.obstacles = [];
    this.ctx = ctx;
    new InputHandler(this.paddle, this);
    this.levels = [level1, level2];
    this.currentLevel = -1;
    this.lives = 3;
    this.bps = 8;
    this.lvlcount = 0;
    this.counter = 0;
    this.objects = [this.paddle];
  }

  start() {
    if (
      this.gameState != GAMESTATE.menu &&
      this.gameState != GAMESTATE.newlevel
    )
      return;
    console.log(1);
    // for (var i = 0; i < this.levels[this.currentLevel].x.length; i++) {
    //   this.obstacles.push(
    //     new Object(
    //       this.levels[this.currentLevel].radius[i],
    //       this.levels[this.currentLevel].x[i],
    //       this.levels[this.currentLevel].y[i],
    //       this.levels[this.currentLevel].health[i]
    //     )
    //   );
    // }
  }
  update(deltaTime) {
    if (
      this.gameState == GAMESTATE.paused ||
      this.gameState === GAMESTATE.menu ||
      this.gameState === GAMESTATE.gameover ||
      this.gameState === GAMESTATE.newlevel ||
      this.gameState === GAMESTATE.gamecomplete
    )
      return;
    this.objects.forEach((object) => {
      object.update(this);
    });
    this.counter++;
    if (this.counter % 600 == 0) {
      this.counter = 0;
    }
    if (this.counter % this.bps == 0) this.bullets.push(new Bullet(this));

    if (this.lvlcount <= 0 && this.obstacles.length == 0) {
      this.currentLevel++;
      this.gameState = GAMESTATE.newlevel;
      this.lvlcount = 2;
      if (this.currentLevel >= this.levels.length) {
        this.gameState = GAMESTATE.gamecomplete;
        this.currentLevel = -1;
        this.lvlcount = 0;
        this.draw(this.ctx);
      } else this.start();
    }

    if (this.counter % 150 == 0 && this.lvlcount > 0) {
      this.lvlcount--;
      this.obstacles.push(
        new Object(
          getRndInt(60, 100),
          getRndInt(0, 500),
          getRndInt(0, 100),
          getRndInt(10, 50)
        )
      );
    }

    this.bullets.forEach((bullet, i) => {
      if (bullet.update(this)) this.bullets.splice(i, 1);
    });
    this.obstacles.forEach((object, i) => {
      object.update(this, deltaTime);
    });
    this.obstacles = this.obstacles.filter(
      (object) => !object.markedForDeletion
    );
    if (this.paddle.health <= 0) {
      this.gameState = GAMESTATE.gameover;
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
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.gamecomplete) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Complete", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText(
        `(Press Space to Play Again)`,
        this.gameWidth / 2,
        this.gameHeight / 2 + 40
      );
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
    if (this.gameState === GAMESTATE.newlevel) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `Level - ${this.currentLevel + 1}`,
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillText(
        `(Press Space to Continue)`,
        this.gameWidth / 2,
        this.gameHeight / 2 + 40
      );
    }
    if (this.gameState === GAMESTATE.running) {
      ctx.fillStyle = "lightgray";
      ctx.fillRect(0, this.gameHeight - 20, this.gameWidth, 20);
      this.objects.forEach((object) => {
        object.draw(ctx, this);
      });
      ctx.rect(500, 0, 20, 20);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(`Level : ${this.currentLevel + 1}`, 500, 20);
      this.bullets.forEach((bullet, i) => {
        if (!bullet.markedForDeletion) bullet.draw(ctx);
      });
      this.obstacles.forEach((object) => {
        object.draw(ctx);
      });
    }
  }

  togglePause() {
    if (
      this.gameState === GAMESTATE.paused ||
      this.gameState === GAMESTATE.newlevel
    ) {
      this.gameState = GAMESTATE.running;
    } else this.gameState = GAMESTATE.paused;
  }
}

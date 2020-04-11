import Game from "/js/game.js";

var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 700;

let lastTime = 0;
var game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          paddle.speed = -paddle.maxSpeed;
          break;
        case 39:
          paddle.speed = paddle.maxSpeed;
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          {
            if (game.gameState != 3 && game.game != 5) game.gameState = 1;
            if (game.gameState === 5) {
              game.gameState = 0;
            }
          }
          break;
      }
    });
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.speed = 0;
          break;
        case 39:
          if (paddle.speed > 0) paddle.speed = 0;
          break;
      }
    });
  }
}

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
          game.start();
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

export function collisionDetection(ball, obj) {
  if (
    ball.position.y + ball.height >= obj.position.y &&
    ball.position.y <= obj.position.y + obj.height &&
    ball.position.x > obj.position.x &&
    ball.position.x < obj.position.x + obj.width
  ) {
    return true;
  } else return false;
}

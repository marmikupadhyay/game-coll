import collisionDetection from "/js/collision.js";

export default class Object {
  constructor(diameter, xcor, ycor, health) {
    this.diameter = diameter;
    this.width = diameter;
    this.height = diameter;
    this.time = 0;
    this.position = {
      x: xcor,
      y: ycor,
    };
    this.maxSpeed = 4;
    this.obstacle = document.getElementById("obstacle");
    this.speed = { x: 2, y: this.maxSpeed };
    this.acceleration = 0.5;
    this.health = health;
    this.childHealth = Math.floor(health / 2);
    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.obstacle,
      this.position.x,
      this.position.y,
      this.diameter,
      this.diameter
    );
    ctx.font = `${this.diameter / 2}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `${this.health}`,
      this.position.x + this.diameter / 2,
      this.position.y + this.diameter / 2
    );
  }
  update(game, deltaTime) {
    this.speed.y = this.speed.y + this.acceleration;
    this.position.y += this.speed.y;
    this.position.x += this.speed.x;
    if (
      this.position.x < 0 ||
      this.position.x + this.diameter > game.gameWidth
    ) {
      this.speed.x *= -1;
    }
    if (this.position.y + this.diameter > game.gameHeight - 20) {
      if (this.speed.y > 0 && this.speed.y < 3) this.speed.y *= -1.2;
      else this.speed.y *= -1;
      this.position.y = game.gameHeight - 20 - this.diameter;
    }
    if (this.position.y < 0) {
      if (this.speed.y > 0 && this.speed.y < this.maxSpeed / 2)
        this.speed.y *= -1.5;
      else this.speed.y *= -1;
    }

    if (this.health <= 0) {
      this.markedForDeletion = true;
      if (this.childHealth > 10) {
        var obj = new Object(
          this.diameter / 2,
          this.position.x + 10,
          this.position.y,
          Math.floor(this.childHealth)
        );
        if (obj.diameter < 20) obj.diameter = 40;
        obj.speed.y = this.speed.y;
        obj.speed.x = this.speed.x;
        game.obstacles.push(obj);
        obj = new Object(
          this.diameter / 2,
          this.position.x - 10,
          this.position.y,
          Math.floor(this.childHealth)
        );
        if (obj.diameter < 20) obj.diameter = 40;
        obj.speed.y = this.speed.y;
        obj.speed.x = -this.speed.x;
        game.obstacles.push(obj);
      }
    }
  }
}

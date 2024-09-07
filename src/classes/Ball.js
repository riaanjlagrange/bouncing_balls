class Ball {
  constructor(x, y, radius, color, velocity, acceleration) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  // DRAW BALL
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // UPDATE BALL
  update(ctx) {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw(ctx);
  }
}

export default Ball;

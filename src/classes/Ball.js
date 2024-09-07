class Ball {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
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
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.velocity.x = 2;
      this.velocity.y = 5;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw(ctx);
  }
}

export default Ball;

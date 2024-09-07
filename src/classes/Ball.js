class Ball {
  constructor(x, y, radius, color, velocity, acceleration) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.trail = [];
    this.maxTrailLength = 30;
    this.glowBlur = 15;
  }

  // DRAW BALL
  draw(ctx) {
    // BALL TRAIL EFFECT
    this.trail.forEach((position) => {
      ctx.beginPath();
      ctx.arc(
        position.x,
        position.y,
        this.radius * 0.05,
        0,
        Math.PI * 2,
        false
      );
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    });

    // GLOWING EFFECT
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 10, 0, Math.PI * 2, false); // Increase the radius for the glow
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.glowBlur;
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // MAIN BALL
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // UPDATE BALL
  update(ctx, canvas, balls) {
    // ADD CURRENT POSITION TO TRAIL
    this.trail.push({ x: this.x, y: this.y });

    // LIMIT LENGTH OF TRAIL
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }

    // CANVAS BORDER COLLISION
    if (this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
      this.x = this.radius;
    } else if (this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
      this.x = canvas.width - this.radius;
    }

    if (this.y - this.radius <= 0) {
      this.velocity.y = -this.velocity.y;
      this.y = this.radius;
    } else if (this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
      this.y = canvas.height - this.radius;
    }

    // ADD ACCELERATION TO VELOCITY
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    // COLLISION WITH OTHER BALLS
    for (let i = 0; i < balls.length; i++) {
      if (this === balls[i]) continue;

      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + balls[i].radius) {
        this.resolveCollision(balls[i]);
      }
    }

    // UPDATE BALL POSITION
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw(ctx);
  }

  // RESOLVE COLLISION BETWEEN BALLS
  resolveCollision(otherBall) {
    const xVelocityDiff = this.velocity.x - otherBall.velocity.x;
    const yVelocityDiff = this.velocity.y - otherBall.velocity.y;

    const xDist = otherBall.x - this.x;
    const yDist = otherBall.y - this.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(otherBall.y - this.y, otherBall.x - this.x);
      const m1 = this.mass || 1;
      const m2 = otherBall.mass || 1;

      const u1 = this.rotate(this.velocity, angle);
      const u2 = this.rotate(otherBall.velocity, angle);

      const v1 = {
        x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2),
        y: u2.y,
      };

      const finalVelocity1 = this.rotate(v1, -angle);
      const finalVelocity2 = this.rotate(v2, -angle);

      this.velocity.x = finalVelocity1.x;
      this.velocity.y = finalVelocity1.y;

      otherBall.velocity.x = finalVelocity2.x;
      otherBall.velocity.y = finalVelocity2.y;

      const overlap =
        this.radius +
        otherBall.radius -
        Math.sqrt(xDist * xDist + yDist * yDist);
      const angleMove = Math.atan2(yDist, xDist);

      this.x -= (overlap / 2) * Math.cos(angleMove);
      this.y -= (overlap / 2) * Math.sin(angleMove);

      otherBall.x += (overlap / 2) * Math.cos(angleMove);
      otherBall.y += (overlap / 2) * Math.sin(angleMove);
    }
  }

  // ROTATE VELOCITY BY ANGLE
  rotate(velocity, angle) {
    return {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };
  }
}

export default Ball;

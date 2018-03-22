class Ball {
  constructor() {
    this.pos = {
      x: 100,
      y: 100,
    };
    this.vel = {
      vx: 5,
      vy: 2,
    };
    this.radius = 25;
    this.color = '#B22222';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

module.exports = Ball;

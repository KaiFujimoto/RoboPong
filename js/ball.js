class Ball {
  constructor() {
    this.pos = {
      x: 400,
      y: 250,
    };
    this.vel = {
      vx: null,
      vy: null,
    };
    this.radius = 10;
    this.color = '#B22222';
    this.startDirectionGenerator();
  }

  startDirectionGenerator() {
    const num = Math.round(Math.random());
    if (num === 1) {
      this.vel.vy = 4;
      this.vel.vx = -10;
    } else {
      this.vel.vy = -4;
      this.vel.vx = 10;
    }
  }

  radius() {
    return this.radius;
  }

  xPos() {
    return this.pos.x;
  }

  yPos() {
    return this.pos.y;
  }

  xVel() {
    return this.vel.vx;
  }

  yVel() {
    return this.vel.vy;
  }

  goRight() {
    this.vel.vx = Math.abs(this.vel.vx);
  }

  goLeft() {
    this.vel.vx = Math.abs(this.vel.vx) * -1;
  }

  goDown() {
    this.vel.vy = Math.abs(this.vel.vy) + 5;
  }

  goUp() {
    this.vel.vy = Math.abs(this.vel.vy) * -1 + 5;
  }

  nextYPos() {
    return this.pos.y + this.vel.vy;
  }

  nextXPos() {
    return this.pos.x + this.vel.vx;
  }

  checkBoarders(dim) {
    if (this.nextYPos() > (dim - this.radius) ||
        this.nextYPos() < this.radius) {
      this.vel.vy = -this.vel.vy;
    }
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

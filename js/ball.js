const Util = require("./util");
const MovingObject = require("./moving_object");
const Paddle = require("./paddles");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

class Ball extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.robo_pong.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  collideWith(otherObject) {

    if (otherObject instanceof Paddle) {
      otherObject.relocate();
      return true;
    } else if (this.pos[0] === 1000) {
      otherObject.relocate();
      return true;
    } else if (this.pos[1] === 0) {
      otherObject.relocate();
      return true;
    }
    return false;
  }
}

module.exports = Ball;

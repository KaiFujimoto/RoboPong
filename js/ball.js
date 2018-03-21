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

  collideWith(otherObject) {
    debugger
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

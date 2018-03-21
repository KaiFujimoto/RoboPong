const Util = require("./util");
const MovingObject = require("./moving_object");
const Paddle = require("./paddle");

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
    if (otherObject instanceof Paddle) {
      this.relocate();
      return true;
    } else if (Ball.pos.y === Ball.board.dim ) {
      this.relocate();
      return true;
    } else if (Ball.pos.y === 0) {
      this.relocate();
      return true;
    }
    return false;
  }
}

module.exports = Asteroid;

const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.robo_pong = options.robo_pong;
    this.isWrappable = true;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject);
    return centerDist < (this.radius + otherObject[1]);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a
    debugger
    let time;
    if (this.pos[1] <= 5) {
      time = timeDelta * -1;
      debugger
    } else {
      time = timeDelta;
    }
    const velocityScale = time / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * Math.abs(velocityScale),
        offsetY = this.vel[1] * velocityScale;
      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        if (this.robo_pong.isOutOfBoundsX(this.pos)) {
          if (this.isWrappable) {
              this.pos = this.robo_pong.wrap(this.pos);
            } else {
              this.remove();
          }
        }

    }

  remove() {
    this.robo_pong.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

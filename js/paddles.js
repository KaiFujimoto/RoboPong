const Coordinate = require('./coordinates');
const RoboPong = require('./robo_pong');
const MovingObject = require('./moving_object');

class Paddle extends MovingObject {
  constructor(options = {}) {
    options.color = "#00FFFF";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  positionSetter() {
    if (this.type === 'L') {
      this.position = new Coordinate(0, Math.floor(robo_pong.DIM_Y/2));
    } else {
      this.position = new Coordinate(robo_pong.DIM_X, Math.floor(robo_pong.DIM_Y/2));
    }
  }

  currentPosition() {
    this.position.slice(-1);
  }

  move(direction) {
    this.position.push(this.position.plus(Paddle.DIRECTIONS[direction]));
  }
}

Paddle.DIRECTIONS = {
  "U": new Coordinate(0, 1),
  "D": new Coordinate(0, -1)
};

Paddle.TYPES = {
  "L": 0,
  "R": 1
};

Paddle.SYMBOL = ['l', 'r'];

module.exports = Paddle;

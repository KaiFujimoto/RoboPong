const Coordinate = require('./coordinates');
const RoboPong = require('./robo_pong');

class Paddle {
  constructor(type, robo_pong) {
    this.direction = "U";
    this.position = [];
    this.type = type;
    this.robo_pong = robo_pong;
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

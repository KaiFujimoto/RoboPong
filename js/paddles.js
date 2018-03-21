const Coordinate = require('./coordinates');

class Paddle {
  constructor(type, dim) {
    this.direction = "U";
    this.position = [];
    this.type = type;
    this.dim = dim;
  }

  positionSetter() {
    if (this.type === 'L') {
      this.position = new Coordinate(0, Math.floor(this.dim/2));
    } else {
      this.position = new Coordinate(this.dim, Math.floor(this.dim/2));
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

module.exports = Paddle;

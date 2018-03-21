const Coordinate = require('./coordinates');
const MovingObject = require('./moving_object');

class Paddle {
  constructor(type, board) {
    this.direction = "U";
    this.position = [];
    this.type = type;
    this.board = board;
  }

  positionSetter() {
    if (this.type === 'L') {
      this.position = new Coordinate(0, Math.floor(board.dim/2));
    } else {
      this.position = new Coordinate(board.dim, Math.floor(board.dim/2));
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

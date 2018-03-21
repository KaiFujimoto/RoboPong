const Paddle = require('./paddle');
const Coordinate = require('./coordinates');

class Board {
  constructor(dim) {
    this.dim = dim;
    this.paddle = new Paddle('L', dim);
  }

  static newBoard(dim) {
    let grid = [];

    for (i = 0; i < dim; i++) {
      let row = [];
      for (j = 0; j < dim; j++) {
        row.push(Board.SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  validPosition(position) {
    return (position.y < this.dim) && (position.y >= 0);
  }

  render() {

  }
}

Board.SYMBOL = '.';

module.exports = Board;

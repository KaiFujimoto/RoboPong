const Paddle = require('./paddle');
const Ball = require('./ball');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.l_paddle = new Paddle('L', this);
    this.r_paddle = new Paddle('R', this);
    this.ball = new Ball(this);
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

  validPaddlePosition(position) {
    return (position.y < this.dim) && (position.y >= 0);
  }

  render() {
    const grid = Board.newBoard(this.dim);

    this.l_paddle.position.forEach( position => {
      grid[position.x][position.y] = Paddle.SYMBOL[0];
    });

    this.r_paddle.position.forEach( position => {
      grid[position.x][position.y] = Paddle.SYMBOL[1];
    });

    grid[this.ball.position.x][this.ball.position.y] = Ball.SYMBOL;

    const rowStrs = [];
    grid.map( row => row.join("") ).join("\n");
  }
}

Board.SYMBOL = '.';

module.exports = Board;

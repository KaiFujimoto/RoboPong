const Paddle = require('./paddle_main');

class Sensei extends Paddle {
  constructor(options = {}) {
    super(options);
  }

  defend() {
    if (this.ball.nextXPos() > this.roboPong.dimX / 2) {
      if (this.ball.nextYPos() > this.paddle.posY()) {
        this.paddle.moveUp();
      } else {
        this.paddle.moveDown();
      }
    }
  }
}

module.exports = Sensei;

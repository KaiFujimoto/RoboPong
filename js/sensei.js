const Right = require('./right');

class Sensei {
  constructor(rightPaddle, ball, roboPong) {
    this.paddle = new Right();
    this.ball = ball;
    this.roboPong = roboPong;
  }

  defend() {
    if (this.ball.nextXPos() > this.roboPong.dimX / 2) {
      if (this.ball.nextYPos() > this.paddle.posY()) {
        this.paddle.moveDown();
      } else {
        this.paddle.moveUp();
      }
    }
  }
}

module.exports = Sensei;

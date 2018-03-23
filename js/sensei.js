const Right = require('./right');

class Sensei {
  constructor(ball, roboPong) {
    this.paddle = new Right();
    this.ball = ball;
    this.roboPong = roboPong;
  }

  draw(ctx) {
    this.paddle.draw(ctx);
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

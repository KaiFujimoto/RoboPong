const Paddle = require('./paddle_main');

class Sensei extends Paddle {
  constructor(options = {}, game) {
    super(options);
    this.dimX = game.dimX;
    this.dimY = game.dimY;

<<<<<<< HEAD
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
=======
  }

  defend(ball) {
    if (ball.nextXPos() > 0) {
      if (ball.nextYPos() > this.posY() && (this.posY() < this.paddleBounds(this.dimY))) {
        this.moveUp();
      } else {
        this.moveDown();
>>>>>>> development
      }
    }
  }
}

module.exports = Sensei;

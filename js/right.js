const Paddle = require('./paddle_main');

class Right extends Paddle {
  constructor(options = {}) {
    options.pos = options.pos || [750, 250];
    options.color = options.color || '#FFC0CB';
    super(options);
  }

  isCollidedWith(ball) {
    const ballX = ball.nextXPos();
    const ballY = ball.nextYPos();
    const rightPaddleX = this.pos[0];
    const rightPaddleY = this.pos[1];

    if ((ballX + (ball.radius) > rightPaddleX) &&
    (ballX + (ball.radius) < (rightPaddleX + this.dim[0])) &&
    (ballY + (ball.radius) > rightPaddleY) &&
    (ballY < (rightPaddleY + this.dim[1] + (ball.radius)))) {
       ball.goLeft();
    }
  }
}

module.exports = Right;

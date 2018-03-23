const Paddle = require('./paddle_main');

class Left extends Paddle {
  constructor(options = {}) {
    options.pos = options.pos || [25, 250];
    options.color = options.color || '#00FFFF';
    super(options);
  }

  isCollidedWith(ball) {
    const ballX = ball.nextXPos();
    const ballY = ball.nextYPos();
    const leftPaddleX = this.pos[0];
    const leftPaddleY = this.pos[1];

    if (((ballX - (ball.radius)) > leftPaddleX) &&
    ((ballX - (ball.radius)) < (leftPaddleX + this.dim[0])) &&
    (ballY + (ball.radius) > leftPaddleY - (ball.radius)) &&
    (ballY - (ball.radius) < (leftPaddleY + this.dim[1] + (ball.radius)))) {
      ball.goRight();
    }
  }
}

module.exports = Left;

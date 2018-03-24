const Paddle = require('./paddle_main');

class Sensei extends Paddle {
  constructor(options = {}, game) {
    super(options);
    this.dimX = game.dimX;
    this.dimY = game.dimY;

  }

  defend(ball) {
    if (ball.nextXPos() > 0) {
      if (ball.nextYPos() > this.posY() && (this.posY() < this.paddleBounds(this.dimY))) {
        this.moveUp();
      } else {
        this.moveDown();
      }
    }
  }
}

module.exports = Sensei;

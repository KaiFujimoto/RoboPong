const RoboPong = require('./robo_pong');

class RoboPongView {
  constructor(robo_pong, ctx) {
    this.ctx = ctx;
    this.robo_pong = robo_pong;
    this.left = this.robo_pong.left;
    this.right = this.robo_pong.right;
  }

  keyDownHandler(e) {
    switch (e.keyCode) {
      case (40):
        this.robo_pong.upPressed = true;
        break;

      case (38):
        this.robo_pong.downPressed = true;
        break;

      case (83):
        this.robo_pong.imPressed = true;
        break;

      case (87):
        this.robo_pong.dePressed = true;
        break;
    }
  }

  keyPressHandler(e) {
    switch (e.keyCode) {
      case (50):
        this.robo_pong.keyPressHandler(50);
        break;

      case (49):
        this.robo_pong.keyPressHandler(49);
        break;

      case (51):
        this.robo_pong.keyPressHandler(51);
        break;

      case (32):
        this.robo_pong.keyPressHandler(32);
        break;

      case (13):
        this.robo_pong.keyPressHandler(13);
        break;
    }
  }

  keyUpHandler(e) {
    switch (e.keyCode) {
      case (40):
        this.robo_pong.upPressed = false;
        break;

      case (38):
        this.robo_pong.downPressed = false;
        break;

      case (83):
        this.robo_pong.imPressed = false;
        break;

      case (87):
        this.robo_pong.dePressed = false;
        break;
    }
  }

  start() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    document.addEventListener("keypress", this.keyPressHandler.bind(this), false);
    requestAnimationFrame(this.animate.bind(this)) ;
  }

  animate() {

    this.robo_pong.updateScore();
    this.robo_pong.playGame(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = RoboPongView;

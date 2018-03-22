const RoboPong = require('./robo_pong');

class RoboPongView {
  constructor(robo_pong, ctx) {
    this.ctx = ctx;
    this.robo_pong = robo_pong;
    this.left = this.robo_pong.left;
    this.right = this.robo_pong.right;
  }

  keyDownHandler(e) {
    if(e.keyCode == 40) {
      this.robo_pong.upPressed = true;
    } else if(e.keyCode == 38) {
      this.robo_pong.downPressed = true;
    }

    if(e.keyCode == 83) {
      this.robo_pong.imPressed = true;
    } else if(e.keyCode == 87) {
      this.robo_pong.dePressed = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 40) {
      this.robo_pong.upPressed = false;
    } else if(e.keyCode == 38) {
      this.robo_pong.downPressed = false;
    }

    if(e.keyCode == 83) {
      this.robo_pong.imPressed = false;
    } else if(e.keyCode == 87) {
      this.robo_pong.dePressed = false;
    }
  }

  //
  // bindKeyHandlers() {
  //   const paddles = this.paddles;
  //   paddles.forEach(paddle => {
  //     if (paddle.type === 'L') {
  //       Object.keys(RoboPongView.LEFT).forEach(k => {
  //         const move = RoboPongView.LEFT[k];
  //         key(k, () => {
  //           paddle.move(k);
  //         });
  //       });
  //     } else {
  //       Object.keys(RoboPongView.RIGHT).forEach(k => {
  //         const move = RoboPongView.RIGHT[k];
  //         key(k ,() => {
  //           paddle.move(k);
  //         });
  //       });
  //     }
  //   });
  // }

  start() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    // let timeDelta = time - this.lastTime;
    this.robo_pong.draw(this.ctx);
    // this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
//
// RoboPongView.LEFT = {
//   w: [0, 1],
//   s: [0, -1]
// };
//
// RoboPongView.RIGHT = {
//   u: [0, 1],
//   d: [0, -1]
// };

module.exports = RoboPongView;

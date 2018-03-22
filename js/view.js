const RoboPong = require('./robo_pong');

class RoboPongView {
  constructor(robo_pong, ctx) {
    this.ctx = ctx;
    this.robo_pong = robo_pong;
    this.paddles = this.robo_pong.paddle;
  }

  bindKeyHandlers() {
    const paddles = this.paddles;
    paddles.forEach(paddle => {
      if (paddle.type === 'L') {
        Object.keys(RoboPongView.LEFT).forEach(k => {
          const move = RoboPongView.LEFT[k];
          key(k, () => {
            paddle.move(k);
          });
        });
      } else {
        Object.keys(RoboPongView.RIGHT).forEach(k => {
          const move = RoboPongView.RIGHT[k];
          key(k ,() => {
            paddle.move(k);
          });
        });
      }
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    let timeDelta = time - this.lastTime;

    this.robo_pong.step(timeDelta);
    this.robo_pong.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

RoboPongView.LEFT = {
  w: [0, 1],
  s: [0, -1]
};

RoboPongView.RIGHT = {
  u: [0, 1],
  d: [0, -1]
};

module.exports = RoboPongView;

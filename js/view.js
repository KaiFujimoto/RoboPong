const RoboPong = require('./robo_pong');

class RoboPongView {
  constructor(robo_pong, ctx) {
    this.ctx = ctx;
    this.robo_pong = robo_pong;
    this.paddle = this.robo_pong.addPaddle();
  }

  bindKeyHandlers() {
    const paddle = this.paddle;

    Object.keys(RoboPongView.MOVES).forEach((k) => {
      const move = RoboPongView.MOVES[k];
      key(k, () => { paddle.power(move); });
    });

    key("space", () => { paddle.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.robo_pong.step(timeDelta);
    this.robo_pong.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

RoboPongView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = RoboPongView;

const Paddle = require("./paddles");
const Ball = require("./ball");
const Util = require("./util");

class RoboPong {
  constructor() {
    this.paddle = [];
    this.ball = [];

    this.deploy();
  }

  add(object) {
    this.ball.push(object);
  }

  addPaddles() {
    const paddleL = new Paddle({
      type: 'L',
      game: this
    });
    this.paddle.push(paddleL);

    const paddleR = new Paddle({
      type: 'R',
      game: this
    });
    this.paddle.push(paddleR);
  }

  deploy() {
    this.add(new Ball({ robo_pong: this }));
  }

  allObjects() {
    return [].concat(this.paddle, this.ball);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);
    ctx.fillStyle = RoboPong.BG_COLOR;
    ctx.fillRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) ||
      (pos[0] > RoboPong.DIM_X);
  }

  moveObjects(delta) {
    this.ball[0].move(delta);
  }

  randomPosition() {
    return [
      RoboPong.DIM_X * Math.random(),
      RoboPong.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    if (object instanceof Paddle) {
      this.ball.splice(this.ball.indexOf(object), 1);
    } else if (object instanceof Ball) {
      this.paddle.splice(this.paddle.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], RoboPong.DIM_X), Util.wrap(pos[1], RoboPong.DIM_Y)
    ];
  }
}

RoboPong.BG_COLOR = "#000000";
RoboPong.DIM_X = 1000;
RoboPong.DIM_Y = 600;
RoboPong.FPS = 32;

module.exports = RoboPong;

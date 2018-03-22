const Right = require('./right');
const Left = require('./left');
const Ball = require("./ball");
// const Util = require("./util");

class RoboPong {
  constructor() {
    // this.paddle = [];
    this.left = new Left();
    this.right = new Right();
    this.ball = new Ball();
    this.upPressed = false;
    this.downPressed = false;
    this.imPressed = false;
    this.dePressed = false;

    // this.deploy();
  }
  replace() {
    this.ball = new Ball();
  }
  //
  // add(object) {
  //   this.ball.push(object);
  // }
  //
  // addPaddles() {
  //   const paddleL = new Paddle({
  //     type: 'L',
  //     game: this
  //   });
  //   this.paddle.push(paddleL);
  //
  //   const paddleR = new Paddle({
  //     type: 'R',
  //     game: this
  //   });
  //   this.paddle.push(paddleR);
  // }
  //
  // deploy() {
  //   this.add(new Ball({ robo_pong: this }));
  // }
  //
  // checkCollisions() {
  //   const allObjects = this.allObjects();
  //   for (let i = 0; i < allObjects.length; i++) {
  //     for (let j = 0; j < allObjects.length; j++) {
  //       const obj1 = allObjects[i];
  //       const obj2 = allObjects[j];
  //
  //       if (obj1.isCollidedWith(obj2)) {
  //         const collision = obj1.collideWith(obj2);
  //         if (collision) return;
  //       }
  //     }
  //   }
  // }

  checkOutOfBounds() {
    if (this.ball.pos.y + this.ball.vel.vy > 475 ||
        this.ball.pos.y + this.ball.vel.vy < 25) {
      this.ball.vel.vy = -this.ball.vel.vy;
    }
    if (this.ball.pos.x + this.ball.vel.vx > 800 ||
        this.ball.pos.x + this.ball.vel.vx < 0) {
      setTimeout(() => this.replace(), 1000);
    }
  }

  checkHitPaddle() {
    const ballX = this.ball.pos.x + this.ball.vel.vx;
    const ballY = this.ball.pos.y + this.ball.vel.vy;
    const leftX = this.left.pos[0];
    const leftY = this.left.pos[1];
    const rightX = this.right.pos[0];
    const rightY = this.right.pos[1];

    if (((ballX - 20) > leftX) && // if the ball is on the right of the left border of the left bar
    ((ballX - 20) < (leftX + this.left.dim[0])) && // if the ball is on the left of the right border of the left bar
    (ballY + 15 > leftY - 15) && // if the ballY is larger than the top border
    (ballY - 20 < (leftY + this.left.dim[1] + 20))) { // if ballY is less than the bottom border
      this.ball.vel.vx = -this.ball.vel.vx;
    }

    if ((ballX + 20 > rightX) &&
    (ballX + 20 < (rightX + this.right.dim[0])) &&
    (ballY + 20 > rightY - 20) &&
    (ballY - 20 < (rightY + this.right.dim[1] + 20))) {
       this.ball.vel.vx = -this.ball.vel.vx;
    }
  }

  checkKeyPress() {
    if(this.upPressed && this.right.pos[1] < 500 - this.right.dim[1]) {
      this.right.pos[1] += 7;
    }
    else if(this.downPressed && this.right.pos[1] > 0) {
      this.right.pos[1] -= 7;
    }

    if(this.imPressed && this.left.pos[1] < 500 - this.left.dim[1]) {
      this.left.pos[1] += 7;
    }
    else if(this.dePressed && this.left.pos[1] > 0) {
      this.left.pos[1] -= 7;
    }
  }

  draw(ctx) {

    ctx.clearRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);
    ctx.fillStyle = RoboPong.BG_COLOR;
    ctx.fillRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);
    debugger
    this.ball.draw(ctx);
    debugger
    this.ball.pos.x += this.ball.vel.vx;
    this.ball.pos.y += this.ball.vel.vy;

    this.checkOutOfBounds();
    debugger
    this.checkHitPaddle();
    this.checkKeyPress();

    this.left.draw(ctx);
    this.right.draw(ctx);
  }

  // isOutOfBoundsX(pos) {
  //   return (pos[0] < 0) ||
  //     (pos[0] > RoboPong.DIM_X);
  // }
  //
  // isOutOfBoundsY() {
  //   return (this.ball[0].pos[1] < 5) ||
  //     (this.ball[0].pos[1] > RoboPong.DIM_Y - 5);
  // }

  // moveObjects(delta) {
  //   this.ball[0].move(delta);
  // }
  //
  // randomPosition() {
  //   return [
  //     RoboPong.DIM_X * Math.random(),
  //     RoboPong.DIM_Y * Math.random()
  //   ];
  // }
  //
  // remove(object) {
  //   if (object instanceof Paddle) {
  //     this.ball.splice(this.ball.indexOf(object), 1);
  //   } else if (object instanceof Ball) {
  //     this.paddle.splice(this.paddle.indexOf(object), 1);
  //   } else {
  //     throw new Error("unknown type of object");
  //   }
  // }
  //
  // step(delta) {
  //   this.moveObjects(delta);
  //   this.checkCollisions();
  // }
  //
  // wrap(pos) {
  //   return [
  //     Util.wrap(pos[0], RoboPong.DIM_X), Util.wrap(pos[1], RoboPong.DIM_Y)
  //   ];
  // }

}

RoboPong.BG_COLOR = "#000000";
RoboPong.DIM_X = 800;
RoboPong.DIM_Y = 500;
RoboPong.FPS = 32;

module.exports = RoboPong;

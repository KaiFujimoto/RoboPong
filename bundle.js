/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Right = __webpack_require__(1);
const Left = __webpack_require__(4);
const Ball = __webpack_require__(5);
const Sensei = __webpack_require__(6);

class RoboPong {
  constructor() {
    this.dimX = 800;
    this.dimY = 500;
    this.backgroundColor = "#000000";
    this.leftPaddle = new Left();
    this.rightPaddle = new Right();
    this.ball = new Ball();
    this.sensei = new Sensei(this.ball, this);
    this.player1 = 0;
    this.player2 = 0;
    this.upPressed = false;
    this.downPressed = false;
    this.imPressed = false;
    this.dePressed = false;
    this.play = false;
    this.winner = '';
    this.gamePlay = true;
    this.gameOngoing = true;

    this.updateScore();
  }

  replace() {
    this.ball = new Ball();
    this.gameOngoing = true;
  }

  win(player) {

    if (player >= 5) {
      if (player === this.player1) {
        this.winner = "player1 wins!";
      } else {
        this.winner = "player2 wins!";
      }
      this.play = false;
      this.gamePlay = false;
      this.updateScore();
    }

  }

  updateScore() {
    const score = document.getElementById("players");

    score.innerText = `Player 1: ${this.player1}, Player 2: ${this.player2} Winner: ${this.winner}`;
  }

  checkOutOfBounds() {
    this.ball.checkBoarders(this.dimY);
  }

  score() {
    if (this.ball.nextXPos() > this.dimX) {
      setTimeout(() => this.replace(), 1000);
      if (this.gameOngoing) {
        this.player1 += 1;
        this.win(this.player1);
        this.gameOngoing = false;
      }
    }
    if (this.ball.nextXPos() < 0) {
      setTimeout(() => this.replace(), 1000);
      if (this.gameOngoing) {
        this.player2 += 1;
        this.win(this.player2);
        this.gameOngoing = false;
      }
    }
  }

  checkHitPaddle() {
    this.leftPaddle.isCollidedWith(this.ball);
    this.rightPaddle.isCollidedWith(this.ball);
  }

  keyPressHandler(eKeyCode) {
    switch (eKeyCode) {
      case (50):
        if (this.play === false) {
          this.leftPaddle = new Left();
          this.rightPaddle = new Right();
          this.play = true;
        }
        break;

      case (49):
        if (this.play === false) {
          this.leftPaddle = new Left();
          this.rightPaddle = new Sensei(this.ball, this);
          this.play = true;
        }
        break;

      case (32):
        this.play = false;
        break;

      case (13):
        if (this.gamePlay === false) {
          this.gamePlay = true;
          this.play = false;
        }
        return this.play;
    }
  }

  _inGame() {
    return (this.play && this.gamePlay);
  }

  keyControlsToPaddleMovement() {
    if (this._inGame()) {
      if (this.upPressed && this.rightPaddle.posY() < this.rightPaddle.paddleBounds(this.dimY)) {
        this.rightPaddle.moveUp();
      }
      else if (this.downPressed && this.rightPaddle.posY() > 0) {
        this.rightPaddle.moveDown();
      }

      if (this.imPressed && this.leftPaddle.posY() < this.leftPaddle.paddleBounds(this.dimY)) {
        this.leftPaddle.moveUp();
      }
      else if (this.dePressed && this.leftPaddle.posY() > 0) {
        this.leftPaddle.moveDown();
      }
    }
  }

  playGame(ctx) {
    this.draw(ctx);
    this.updateGame();
    if (this.play) {
      this.sensei.defend();
    }
  }

  updateGame() {
    this.checkOutOfBounds();
    this.score();
    this.checkHitPaddle();
    this.keyControlsToPaddleMovement();
  }

  draw(ctx) {
    // draw field
    ctx.beginPath();
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);
    ctx.fill();
    // draw line
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.dimX/2, 0);
    ctx.lineTo(this.dimX/2, this.dimY);
    ctx.closePath();
    ctx.stroke();
    // draw the ball
    this.ball.draw(ctx);
    if (this.play && this.gamePlay) {
      this.winner = '';
      this.ball.pos.x += this.ball.vel.vx;
      this.ball.pos.y += this.ball.vel.vy;
    } else if (this.gamePlay === false){
      this.reset();
    }

    this.leftPaddle.draw(ctx);
    this.rightPaddle.draw(ctx);
  }

  reset() {
    this.ball = new Ball();
    this.leftPaddle = new Left();
    this.rightPaddle = new Right();
    this.player1 = 0;
    this.player2 = 0;
  }
}

module.exports = RoboPong;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Paddle {
  constructor(options) {
    this.pos = options.pos;
    this.dim = [25, 85];
    this.color = options.color;
  }

  posX() {
    return this.pos[0];
  }

  posY() {
    return this.pos[1];
  }

  moveUp() {
    this.pos[1] += 7;
  }

  moveDown() {
    this.pos[1] -= 7;
  }

  paddleBounds(dim) {
    return dim - this.dim[1];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.dim[0], this.dim[1]);
    ctx.closePath();
  }

}

module.exports = Paddle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const RoboPong = __webpack_require__(0);
const RoboPongView = __webpack_require__(7);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("robopong");
  canvasEl.width = 800;
  canvasEl.height = 500;
  canvasEl.fillStyle = RoboPong.BG_COLOR;

  const ctx = canvasEl.getContext("2d");
  const robo_pong = new RoboPong();
  new RoboPongView(robo_pong, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(2);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Ball {
  constructor() {
    this.pos = {
      x: 400,
      y: 250,
    };
    this.vel = {
      vx: 7,
      vy: 3,
    };
    this.radius = 10;
    this.color = '#B22222';
  }

  radius() {
    return this.radius;
  }

  xPos() {
    return this.pos.x;
  }

  yPos() {
    return this.pos.y;
  }

  xVel() {
    return this.vel.vx;
  }

  yVel() {
    return this.vel.vy;
  }

  goRight() {
    this.vel.vx = Math.abs(this.vel.vx);
  }

  goLeft() {
    this.vel.vx = Math.abs(this.vel.vx) * -1;
  }

  nextYPos() {
    return this.pos.y + this.vel.vy;
  }

  nextXPos() {
    return this.pos.x + this.vel.vx;
  }

  checkBoarders(dim) {
    if (this.nextYPos() > (dim - this.radius) ||
        this.nextYPos() < this.radius) {
      this.vel.vy = -this.vel.vy;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

module.exports = Ball;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Right = __webpack_require__(1);

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
      }
    }
  }
}

module.exports = Sensei;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const RoboPong = __webpack_require__(0);

class RoboPongView {
  constructor(robo_pong, ctx) {
    this.ctx = ctx;
    this.robo_pong = robo_pong;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
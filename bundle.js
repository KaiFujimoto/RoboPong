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



const Paddle = __webpack_require__(2);
const Ball = __webpack_require__(5);

class RoboPong {
  constructor() {
    this.dimX = 800;
    this.dimY = 500;
    this.backgroundColor = "#000000";
    this.leftPaddle = new Paddle({type: "L"});
    this.rightPaddle = new Paddle({type: "R"});
    this.ball = new Ball();
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

  checkKeyPress() {
    if (this.play && this.gamePlay) {
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

  draw(ctx) {

    ctx.beginPath();
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);

    this.ball.draw(ctx);
    if (this.play && this.gamePlay) {
      this.winner = '';
      this.ball.pos.x += this.ball.vel.vx;
      this.ball.pos.y += this.ball.vel.vy;
    } else if (this.gamePlay === false){
      this.reset();
    }

    this.checkOutOfBounds();
    this.score();
    this.checkHitPaddle();
    this.checkKeyPress();

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
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

class Paddle {
  constructor(options) {
    this.type = options.type;
    this.pos = null;
    this.dim = [25, 85];
    this.color = "white";

    this.givePos();
  }

  givePos() {
    switch (this.type) {
      case "L":
        this.pos = [25, 250];
        break;
      case "R":
        this.pos = [750, 250];
        break;
    }
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

  isCollidedWith(ball) {
    const ballX = ball.nextXPos();
    const ballY = ball.nextYPos();
    const paddleX = this.posX();
    const paddleY = this.posY();

    if ((ballX + (ball.radius) > paddleX) &&
    (ballX + (ball.radius) < (paddleX + this.dim[0])) &&
    (ballY + (ball.radius) > paddleY) &&
    (ballY < (paddleY + this.dim[1] + (ball.radius)))) {
       ball.goLeft();
    } else if (((ballX - (ball.radius)) > paddleX) &&
    ((ballX - (ball.radius)) < (paddleX + this.dim[0])) &&
    (ballY + (ball.radius) > paddleY - (ball.radius)) &&
    (ballY - (ball.radius) < (paddleY + this.dim[1] + (ball.radius)))) {
      ball.goRight();
    }

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
/* 4 */,
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
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const RoboPong = __webpack_require__(0);

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

  keyPressHandler(e) {
    if (e.keyCode == 32) {
      if (this.robo_pong.play === true) {
        this.robo_pong.play = false;
      } else {
        this.robo_pong.play = true;
      }
    }

    if (e.keyCode == 13) {
      if (this.robo_pong.gamePlay === false) {
        this.robo_pong.gamePlay = true;
        this.robo_pong.play = false;
      }
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

  start() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    document.addEventListener("keypress", this.keyPressHandler.bind(this), false);
    requestAnimationFrame(this.animate.bind(this)) ;
  }

  animate() {

    this.robo_pong.updateScore();
    this.robo_pong.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = RoboPongView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
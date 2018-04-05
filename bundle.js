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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Sensei = __webpack_require__(3);
const Paddle = __webpack_require__(1);
const Ball = __webpack_require__(4);
const LearnBotChan = __webpack_require__(5);

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
    this.gamePlay = false;
    this.gameOngoing = true;
    this.botPlaying = false;
    this.bot2Playing = false;
    // this.learnBotPlaying = false;

    this.updateScore();
  }

  replace() {
    this.ball = new Ball();
    this.gameOngoing = true;
  }

  win(player) {

    if (player >= 5) {
      if (player === this.player1) {
        this.winner = "Player1 Wins!";
      } else {
        this.winner = "Player2 Wins!";
      }
      this.play = false;
      this.gamePlay = false;
      // this.learnBotPlaying = false;

      const winner = document.getElementById("winner");

      winner.classList.toggle('cows');
      winner.innerText = `Winner: ${this.winner}`;
      const node = document.createElement("p");
      const text = document.createTextNode(`Press Enter to select Mode and Play again`);
      node.appendChild(text);
      winner.appendChild(node);

      this.updateScore();
    }

  }

  updateScore() {
    const score = document.getElementById("players");

    score.innerText = `Player 1: ${this.player1}, Player 2: ${this.player2}`;

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
        // this.leftPaddle.setPos();
        // this.rightPaddle.setPos();
        this.gameOngoing = false;
      }
    }
    if (this.ball.nextXPos() < 0) {
      setTimeout(() => this.replace(), 1000);
      if (this.gameOngoing) {
        this.player2 += 1;
        this.win(this.player2);
        // this.leftPaddle.setPos();
        // this.rightPaddle.setPos();
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

        case (49):
        if (this.play === false && this.gamePlay === false) {
          this.leftPaddle = new Paddle({type: 'L'});
          this.rightPaddle = new Sensei({type: 'R'}, this);
          this.play = true;
          this.botPlaying = true;
          this.gamePlay = true;
        }
        break;

        case (50):
          if (this.play === false && this.gamePlay === false) {
            this.leftPaddle = new Paddle({type: 'L'});
            this.rightPaddle = new Paddle({type: 'R'});
            this.play = true;
            this.gamePlay = true;
          }
          break;

        case (51):
          if (this.play === false && this.gamePlay === false) {
            this.leftPaddle = new Sensei({type: 'L'}, this);
            this.rightPaddle = new Sensei({type: 'R'}, this);
            this.play = true;
            this.bot2Playing = true;
            this.gamePlay = true;
          }
          break;

        case (52):
          if (this.play === false && this.gamePlay === false) {
            this.leftPaddle = new LearnBotChan({type: 'L'}, this);
            this.rightPaddle = new Sensei({type: 'R'}, this);
            this.play = true;
            this.learnBotPlaying = true;
            this.gamePlay = true;
          }
          break;

        case (32):
          if (this.play === false) {
            this.play = true;
          } else {
            this.play = false;
          }
          break;

        case (13):
          if (this.gamePlay === false) {
            const winner = document.getElementById("winner");

            winner.classList.toggle('cows');
            winner.innerText = `Winner:`;
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
        if (!this.botPlaying && !this.bot2Playing) {
          this.rightPaddle.moveUp();
        }
      }
      else if (this.downPressed && this.rightPaddle.posY() > 0) {
        if (!this.botPlaying && !this.bot2Playing) {
          this.rightPaddle.moveDown();
        }
      }

      if (this.imPressed && this.leftPaddle.posY() < this.leftPaddle.paddleBounds(this.dimY)) {
        if (!this.bot2Playing) {
          this.leftPaddle.moveUp();
        }
      }
      else if (this.dePressed && this.leftPaddle.posY() > 0) {
        if (!this.bot2Playing) {
          this.leftPaddle.moveDown();
        }
      }
    }
  }

  playGame(ctx) {
    this.draw(ctx);
    this.updateGame();
  }

  updateGame() {
    this.checkOutOfBounds();
    this.score();
    this.checkHitPaddle();
    this.keyControlsToPaddleMovement();
    if (this.botPlaying && this.play) {
      this.rightPaddle.defend(this.ball);
    }
    if (this.bot2Playing && this.play) {
      this.leftPaddle.defend(this.ball);
      this.rightPaddle.defend(this.ball);
    }
    // if (this.learnBotPlaying && this.play) {
    //   if (this.ball.nextXPos() < this.dimX / 2) {
    //     this.leftPaddle.defend(this.ball);
    //   }
    //   this.rightPaddle.defend(this.ball);
    // }
  }

  draw(ctx) {

    ctx.beginPath();
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 500);
    ctx.lineWidth = 10;
    ctx.setLineDash([0, 5, 10, 15]);
    ctx.stroke();

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
    this.leftPaddle = new Paddle({type: "L"});
    this.rightPaddle = new Paddle({type: "R"});
    this.player1 = 0;
    this.player2 = 0;
  }
}

module.exports = RoboPong;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Paddle {
  constructor(options) {
    this.type = options.type;
    this.pos = null;
    this.dim = [25, 84];
    this.color = "white";

    this.setPos();
  }

  setPos() {
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
    this.pos[1] += 10;
  }

  moveDown() {
    this.pos[1] -= 10;
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const RoboPong = __webpack_require__(0);
const RoboPongView = __webpack_require__(6);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Ball {
  constructor() {
    this.pos = {
      x: 400,
      y: 250,
    };
    this.vel = {
      vx: null,
      vy: null,
    };
    this.radius = 10;
    this.color = '#B22222';
    this.startDirectionGenerator();
  }

  startDirectionGenerator() {
    const num = Math.round(Math.random());
    if (num === 1) {
      this.vel.vy = 4;
      this.vel.vx = -10;
    } else {
      this.vel.vy = -4;
      this.vel.vx = 10;
    }
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

  goDown() {
    this.vel.vy = Math.abs(this.vel.vy) + 5;
  }

  goUp() {
    this.vel.vy = Math.abs(this.vel.vy) * -1 + 5;
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
/* 5 */
/***/ (function(module, exports) {

// const Paddle = require('./paddle_main');
// const brain = require('brain.js');
//
//
// // so basically the machine learning guy (just taking a step back) is just a freakin paddle
// // and this paddle like learns to move with the stuff and not lose
//
// // need a way to punish bot chan for losing and reward bot chan for winning?
// // where would i keep that stat?
// // need a picture of the whole board somehow and the whole game or something
// // WTFFFFFF :(
//
//
//
// const INITIAL_VALUES = {
//   input: {
//     ballYPos: 0,
//     paddleYPos: 0
//   },
//   output: {score: 0.5}
// };
// // i need a live update thing
// window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([INITIAL_VALUES]);
//
//
// class LearnBotChan extends Paddle {
//
//   constructor(options = {}, game) {
//     super(options);
//     this.brain = new brain.NeuralNetwork({timeout: 10});
//     this.data = [];
//     this.game = game;
//     this.dimX = game.dimX;
//     this.dimY = game.dimY;
//     this.ball = game.ball;
//     this.points = 0;
//     this.oppPoints = 0;
//   }
//
//   updateData() {
//     this.data.push({
//       input: {
//         ballYPos: this.ball.yPos(),
//         paddleYPos: this.posY()
//       },
//       output: {
//         score: 0.5
//       }
//     });
//   }
//
//   checkPoints() {
//
//     const data = JSON.parse(window.localStorage.trainingData);
//     if (this.points > this.oppPoints) {
//       this.data[0].output.score = 1;
//     } else {
//       this.data[0].output.score = 0;
//     }
//
//     this.points = 0;
//     this.oppPoints = 0;
//     data.push(this.data[0]);
//
//     window.localStorage.trainingData = JSON.stringify(data);
//     this.data = [];
//   }
//
//   areThereAnyScores() {
//     if (this.points < this.game.player1 || this.oppPoints < this.game.player2) {
//       this.points = this.game.player1;
//       this.oppPoints = this.game.player2;
//       return true;
//     }
//     return false;
//   }
//
//   defend() {
//     if (this.game.gameOngoing) {
//       if (this.areThereAnyScores()) {
//         this.updateData();
//         this.checkPoints();
//       }
//     }
//
//     this.predictPaddlePosition();
//   }
//
//   predictPaddlePosition() {
//     const data = JSON.parse(window.localStorage.trainingData);
//     if (!data.length) {
//       return;
//     }
//
//     this.brain.train(data);
//     const results = [];
//     MAP.map(el => {
//       const input = {
//         ballYPos: this.ball.yPos(),
//         paddleYPos: this.pos[1] + el
//       };
//
//       const move = this.brain.run(input);
//       results.push(move.score);
//     });
//
//     if (results[0] >= results[1]) {
//       if (this.posY() < this.paddleBounds(this.dimY)) {
//         this.pos[1] += 10;
//       }
//     } else {
//       if (this.posY() > 0) {
//         this.pos[1] -= 10;
//       }
//     }
//   }
//
// }
//
// const MAP = [10, -10];
//
// module.exports = LearnBotChan;


/***/ }),
/* 6 */
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

      case (49):
      this.robo_pong.keyPressHandler(49);
      break;

      case (50):
        this.robo_pong.keyPressHandler(50);
        break;

      case (51):
        this.robo_pong.keyPressHandler(51);
        break;

      case (52):
        this.robo_pong.keyPressHandler(52);
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
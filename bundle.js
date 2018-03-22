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

// const Paddle = require("./paddles");
const Ball = __webpack_require__(5);
// const Util = require("./util");

class RoboPong {
  constructor() {
    // this.paddle = [];
    this.ball = new Ball();

    // this.deploy();
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
  //
  //   // const allObjects = this.allObjects();
  //   // for (let i = 0; i < allObjects.length; i++) {
  //   //   for (let j = 0; j < allObjects.length; j++) {
  //   //     const obj1 = allObjects[i];
  //   //     const obj2 = allObjects[j];
  //   //
  //   //     if (obj1.isCollidedWith(obj2)) {
  //   //       const collision = obj1.collideWith(obj2);
  //   //       if (collision) return;
  //   //     }
  //   //   }
  //   // }
  //
  // }

  draw(ctx) {
    ctx.clearRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);
    ctx.fillStyle = RoboPong.BG_COLOR;
    ctx.fillRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);

    this.ball.draw(ctx);
    this.ball.pos.x += this.ball.vel.vx;
    this.ball.pos.y += this.ball.vel.vy;

    if (this.ball.pos.y + this.ball.vel.vy > 490 ||
        this.ball.pos.y + this.ball.vel.vy < 10) {
      this.ball.vel.vy = -this.ball.vel.vy;
    }
    if (this.ball.pos.x + this.ball.vel.vx > 790 ||
        this.ball.pos.x + this.ball.vel.vx < 10) {
      this.ball.vel.vx = -(this.ball.vel.vx);
    }
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


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const RoboPong = __webpack_require__(0);
const RoboPongView = __webpack_require__(7);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("robopong");
  canvasEl.width = RoboPong.DIM_X;
  canvasEl.height = RoboPong.DIM_Y;
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
      x: 100,
      y: 100,
    };
    this.vel = {
      vx: 5,
      vy: 2,
    };
    this.radius = 25;
    this.color = '#ccc';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath()
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
    this.paddles = this.robo_pong.paddle;
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
    // this.bindKeyHandlers();
    // this.lastTime = 0;

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
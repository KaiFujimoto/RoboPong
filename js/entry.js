const RoboPong = require("./robo_pong");
const RoboPongView = require("./view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("robopong");
  canvasEl.width = RoboPong.DIM_X;
  canvasEl.height = RoboPong.DIM_Y;
  canvasEl.fillStyle = RoboPong.BG_COLOR;

  const ctx = canvasEl.getContext("2d");
  const robo_pong = new RoboPong();
  new RoboPongView(robo_pong, ctx).start();
});

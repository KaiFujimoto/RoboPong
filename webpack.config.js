module.exports = {
  entry: "./js/robo_pong.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js"]
  }
};

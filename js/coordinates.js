class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(direction) {
    return new Coordinate(this.x + direction.x, this.y + direction.y);
  }

}

module.exports = Coordinate;

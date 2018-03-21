class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(direction) {
    return new Coordinate(this.x + direction.x, this.y + direction.y);
  }

  equals(direction) {
      return (this.x == direction.x) && (this.y == direction.y);
  }

  isOpposite(direction) {
    return (this.x == (-1 * direction.x)) && (this.y == (-1 * direction.y));
  }
}

module.exports = Coordinate;

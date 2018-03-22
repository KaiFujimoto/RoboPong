class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(position) {
     return (this.x == position.x) && (this.y == position.y);
 }

 isOpposite(position) {
   return (this.x == (-1 * position.x)) && (this.y == (-1 * position.y));
 }

 plus(position) {
   return new Coord(this.x + position.x, this.y + position.y);
 }
}

module.exports = Coordinate;

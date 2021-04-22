class Direction {
  /**
   * @param {Number} deltaRow 1 : bas / -1 : haut
   * @param {Number} deltaColumn 1 : droite / -1 gauche
   */
  constructor(deltaRow, deltaColumn) {
    this._deltaRow = deltaRow;
    this._deltaColumn = deltaColumn;
  }

  /**
   * @returns {Number}
   */
  get deltaRow() {
    return this._deltaRow;
  }

  /**
   * @returns {Number}
   */
  get deltaColumn() {
    return this._deltaColumn;
  }

  static NORTH = new Direction(-1, 0);
  static SOUTH = new Direction(1, 0);
  static WEST = new Direction(0, -1);
  static EAST = new Direction(0, 1);
}

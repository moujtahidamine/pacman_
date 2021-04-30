/*
  Position des composants du jeu
*/
class Position {
  /**
   * @param {Number} row   l’indice de la ligne
   * @param {Number} column   l’indice de la colonne
   */
  constructor(row, column) {
    this._row = row;
    this._column = column;
  }

  /**
   * @returns {Number}
   */
  get row() {
    return this._row;
  }

  /**
   * @returns {Number}
   */
  get column() {
    return this._column;
  }

  /**
   * retourne la prochaine position dans la direction donnée
   * @param {Direction} dir
   * @return {Position}
   */
  nextPosition(dir) {
    const new_row = this._row + dir.deltaRow;
    const new_column = this._column + dir.deltaColumn;

    // if (new_row < 0 || new_row > this._row - 1) return null;
    // if (new_column < 0 || new_column > this._column - 1) return null;

    return new Position(new_row, new_column);
  }
}

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
}

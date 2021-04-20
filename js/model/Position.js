/*
  Position des composants du jeu
*/
class Position {
  /**
   * @param {Number} raw   l’indice de la ligne
   * @param {Number} column   l’indice de la colonne
   */
  constructor(raw, column) {
    this._raw = raw;
    this._column = column;
  }

  /**
   * @returns {Number}
   */
  get raw() {
    return this._raw;
  }

  /**
   * @returns {Number}
   */
  get column() {
    return this._column;
  }
}

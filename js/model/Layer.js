/*
  Les couches (Layer) regroupent chacune un ensemble de tuiles afin de
  constituer un niveau.
*/
class Layer {
  /**
   * @param {Number} nbRows   nombre de lignes
   * @param {Number} nbColumns   nombre de colonnes
   */
  constructor(nbRows, nbColumns) {
    this._nbRows = nbRows;
    this._nbColumns = nbColumns;

    this._array = Array(nbRows)
      .fill()
      .map(() => Array(nbColumns));
  }

  /**
   * retourne true si la position appartient bien au plateau
   * de couche (ligne/colonne entre 0 et nb de lignes/colonnes -1)
   * @param {Position} pos
   * @returns {boolean}
   */
  contains(pos) {
    if (pos.raw < 0 || pos.raw > this._nbRows - 1) return false;
    if (pos.column < 0 || pos.column > this._nbColumns - 1) return false;

    return true;
  }

  /**
   *  pour placer une tuile à une position donnée de la couche
   * @param {Position} pos
   * @param {Tile} tile
   */
  setTile(pos, tile) {
    this._array[pos.raw][pos.column] = tile;
  }

  /**
   * retourne la tuile présente sur la couche à la position donnée
   * @param {Position} pos
   * @returns {Tile}
   */
  getTile(pos) {
    return this._array[pos.raw][pos.column];
  }

  /**
   * retourne vrai si la position donnée contient bien une
   * tuile et pas un vide
   * @param {Position} pos
   * @returns {boolean}
   */
  hasTile(pos) {
    if (this.contains(pos) && this.getTile(pos) !== undefined) return true;

    return false;
  }
}

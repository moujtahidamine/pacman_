/**
 * the dot model.
 */
class Dot extends Tile {
  /**
   * @param {boolean} isEnergizer
   */
  constructor(id, isEnergizer) {
    super(id);
    this._isEnergizer = isEnergizer;
  }

  /**
   * @returns {boolean}
   */
  get isEnergizer() {
    return this._isEnergizer;
  }
}

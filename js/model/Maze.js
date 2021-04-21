/*
  La classe Maze permet de modéliser le labyrinthe du Jeu
*/
class Maze {
  /**
   * @param {Array} rawMaze   table 2D
   */
  constructor(rawMaze) {
    const array2d = rawMaze.table;
    this._nbRows = array2d.length;
    this._nbColumns = array2d[0].length;
    this._wallLayer = new Layer(array2d.length, array2d[0].length);
    this._dotLayer = new Layer(array2d.length, array2d[0].length);

    for (let i = 0; i < array2d.length; i++) {
      const line = array2d[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === 1) {
          // wall
          this._wallLayer.setTile(
            new Position(i, j),
            new Wall("wall-" + i + j)
          );
        } else if (line[j] === 2) {
          // gomme dot
          this._dotLayer.setTile(
            new Position(i, j),
            new Dot("dot-" + i + "-" + j, false)
          );
        } else if (line[j] === 3) {
          // gomme energizer
          this._dotLayer.setTile(
            new Position(i, j),
            new Dot("dot-energizer" + i + "-" + j, true)
          );
        }
      }
    }
  }

  /**
   * @returns {Number}
   */
  get nbRows() {
    return this._nbRows;
  }

  /**
   * @returns {Number}
   */
  get nbColumns() {
    return this._nbColumns;
  }

  /**
   * Après avoir vérifié que la position est bien contenue dans le layer, retourne la tuile mur disponible à la position donnée.
   * @param {Position} pos
   * @return {Tile}
   */
  getWallLayerTile(pos) {
    if (this._wallLayer.contains(pos)) {
      return this._wallLayer.getTile(pos);
    } else return null;
  }

  /**
   * Après avoir vérifié que la position est bien contenue dans le layer, retourne la tuile gomme disponible à la position donnée.
   * @param {Position} pos
   * @return {Tile}
   */
  getDotLayerTile(pos) {
    if (this._dotLayer.contains(pos)) {
      return this._dotLayer.getTile(pos);
    } else return null;
  }
}

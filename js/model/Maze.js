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

    this._nbDots = 0;

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
          this._nbDots++; // incrementer le nombre des gommes
        } else if (line[j] === 3) {
          // gomme energizer
          this._dotLayer.setTile(
            new Position(i, j),
            new Dot("dot-energizer" + i + "-" + j, true)
          );
          this._nbDots++; // incrementer le nombre des gommes
        } else if (line[j] === 4) {
          this._pacmanRespawn = new Position(i, j);
        } else if (line[j] === 5) {
          this._ghostRespawn = new Position(i, j);
        }
      }
    }
  }

  /**
   * @returns {Number}
   */
  get nbDots() {
    return this._nbDots;
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
   * position de départ du pacman
   * @returns {Position}
   */
  get pacmanRespawn() {
    return this._pacmanRespawn;
  }

  /**
   * position de départ du pacman
   * @returns {Position}
   */
  get ghostRespawn() {
    return this._ghostRespawn;
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

  /**
   * retourne true si la position fait partie du labyrinthe et s’il n’y a pas collision avec un mur à la position donnée, false sinon
   * @param {Position} position
   * @return {boolean}
   */
  canWalkOn(position) {
    if (position.row < 0 || position.row > this._nbRows - 1) return false;
    if (position.column < 0 || position.column > this.nbColumns - 1)
      return false;

    if (this._wallLayer.hasTile(position) === true) return false;
    else {
      return true;
    }
  }

  /**
   * retourne true si la position fait partie du labyrinthe et s’il y a une gomme à prendre
   * @param {Position} position
   * @return {boolean}
   */
  canPick(position) {
    if (position.row < 0 || position.row > this._nbRows - 1) return false;
    if (position.column < 0 || position.column > this.nbColumns - 1)
      return false;

    if (this._dotLayer.hasTile(position) === true) return true;
    else {
      return false;
    }
  }

  /**
   * Enlève et retourne la gomme présente à la position donnée. Pour procéder à l’enlèvement, la valeur doit être remplacée par undefined
   * Lance une erreur s’il n’y a rien
   * @param {Position} position
   * @return {Dot}
   */
  pick(position) {
    let dot = undefined;
    if (this.canPick(position)) {
      dot = this._dotLayer.getTile(position);
      this._dotLayer.setTile(position, undefined);
      return dot;
    } else console.error("Erreur! la position ne contient pas de gomme");
  }

  /**
   * Retourne true si toutes les gommes ont été mangées
   * @return {boolean}
   */
  isEmpty() {
    if (this._nbDots > 0) {
      return true;
    } else {
      return false;
    }
  }
}

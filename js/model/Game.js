/*
  La classe Game est une façade. Pour la première itération, elle ne possède que le labyrinthe en propriété.
*/
class Game {
  /**
   * @param {Array} rawMaze
   */
  constructor(rawMaze) {
    this._maze = new Maze(rawMaze);
    const pos = this._maze.pacmanRespawn;
    const direction = Direction.WEST;
    this._pacman = new Pacman(pos, direction);
  }

  /**
   * @return {Maze}
   */
  get maze() {
    return this._maze;
  }

  /**
   * @return {Pacman}
   */
  get pacman() {
    return this._pacman;
  }

  /**
   * Cette méthode va bouger le Pacman
   */
  moveSprites() {
    const pacman = this._pacman; // le pacman
    const askedDirection = this._pacman.askedDirection; // la direction demandé
    const pacmanPosition = this._pacman.position; // la position du pacman
    let canWalkOn = false;

    if (askedDirection !== undefined && pacman.askedToChangeDirection) {
      // si le pacman peut aller dans la direction souhaitée => canWalkOn <- true
      canWalkOn = this._maze.canWalkOn(
        pacmanPosition.nextPosition(pacman.askedDirection)
      );
    }

    // Si un changement de direction a été demandé et qu’il est possible d’aller dans la direction souhaitée
    if (canWalkOn) {
      this._pacman.changeDirection(); // changer la direction
      this._pacman.move(); // bouger le Pacman
    }
  }
}

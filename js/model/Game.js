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

    this._blinky = new Ghost(this._maze.ghostRespawn, Direction.NORTH);
    this._pinky = new Ghost(this._maze.ghostRespawn, Direction.WEST);
    this._inky = new Ghost(this._maze.ghostRespawn, Direction.EAST);
    this._clyde = new Ghost(this._maze.ghostRespawn, Direction.SOUTH);
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
   * @return {Ghost}
   */
  get pinky() {
    return this._pinky;
  }

  /**
   * @return {Ghost}
   */
  get blinky() {
    return this._blinky;
  }

  /**
   * @return {Ghost}
   */
  get inky() {
    return this._inky;
  }

  /**
   * @return {Ghost}
   */
  get clyde() {
    return this._clyde;
  }

  /**
   * Cette méthode va bouger le Pacman
   */
  moveSprites() {
    const pacman = this._pacman; // le pacman
    const blinky = this._blinky; // blinky
    const pinky = this._pinky; // pinky
    const clyde = this._clyde; // clyde

    let canPacmanWalkOn = false;

    if (pacman.askedDirection !== undefined && pacman.askedToChangeDirection) {
      // si le pacman peut aller dans la direction souhaitée => canWalkOn <- true
      canPacmanWalkOn = this._canSpriteWalkOn(pacman);

      // Si un changement de direction a été demandé et qu’il est possible d’aller dans la direction souhaitée
      if (canPacmanWalkOn) {
        pacman.changeDirection(); // changer la direction
        pacman.move(); // bouger le Pacman
      }
    }

    // pinky
    pinky.notifyIsBlocked();
    let canPinkyWalkOn = false;

    if (pinky.askedDirection !== undefined && pinky.askedToChangeDirection) {
      canPinkyWalkOn = this._canSpriteWalkOn(pinky);
    }
    // console.log(canPinkyWalkOn);
    this._moveGhost(pinky, canPinkyWalkOn);

    //blinky
    blinky.notifyIsBlocked();
    let canBlinkyWalkOn = false;

    if (blinky.askedDirection !== undefined && blinky.askedToChangeDirection) {
      canBlinkyWalkOn = this._canSpriteWalkOn(blinky);
    }
    // console.log(canBlinkyWalkOn);
    this._moveGhost(blinky, canBlinkyWalkOn);

    //clyde
    clyde.notifyIsBlocked();
    let canClydeWalkOn = false;

    if (clyde.askedDirection !== undefined && clyde.askedToChangeDirection) {
      canClydeWalkOn = this._canSpriteWalkOn(clyde);
    }
    // console.log(canClydeWalkOn);
    this._moveGhost(clyde, canClydeWalkOn);

    //inky
    const inky = this._inky;
    inky.notifyIsBlocked();
    let canInkyWalkOn = false;

    if (inky.askedDirection !== undefined && inky.askedToChangeDirection) {
      canInkyWalkOn = this._canSpriteWalkOn(inky);
    }
    // console.log(canInkyWalkOn);
    this._moveGhost(inky, canInkyWalkOn);
  }

  /**
   * @param {Sprite} sprite  pacman ou ghost
   * @return {boolean}
   */
  _canSpriteWalkOn(sprite) {
    return this._maze.canWalkOn(
      sprite.position.nextPosition(sprite.askedDirection)
    );
  }

  /**
   * @param {Ghost} ghost
   */
  _moveGhost(ghost, canGhostWalkOn) {
    if (canGhostWalkOn) {
      ghost.changeDirection(); // changer la direction
      ghost.move(); // bouger pinky
      if (ghost.canEat(this._pacman)) {
        console.log("Pacman got eaten");
      }
    } else {
      ghost.notifyIsBlocked();
    }
  }
}

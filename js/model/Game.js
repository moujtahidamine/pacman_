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

    this._score = 0; // Représente le score de la partie en cours.
    this._removedDot = undefined; //  Dernière gomme à avoir été mangée.

    /**
     * le meilleur score doit être chargé à partir du localstorage
     * Si aucune valeur n’est présente dans le localstorage, le meilleur score vaut 0.
     */
    if (localStorage.getItem("highScore") === null) {
      this._highScore = 0;
    } else {
      this._highScore = localStorage.getItem("highScore");
    }
  }

  /**
   * @return {Number}
   */
  get highScore() {
    return this._highScore;
  }

  /**
   * @return {Number}
   */
  get score() {
    return this._score;
  }

  /**
   * @return {Dot}
   */
  get removedDot() {
    return this._removedDot;
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

    //  si Pacman a été mangé alors réinitialise les propriétés de tous les sprites
    if (this.pacmanHasBeenEaten()) {
      this.respawn();
    }

    let canPacmanWalkOn = false; // variable de type boolean pour verifier est ce que le sprite peut se déplacer vers une position donnée
    if (pacman.askedDirection !== undefined && pacman.askedToChangeDirection) {
      // si le pacman peut aller dans la direction souhaitée => canWalkOn <- true
      canPacmanWalkOn = this._canSpriteWalkOn(pacman);

      // Si un changement de direction a été demandé et qu’il est possible d’aller dans la direction souhaitée
      if (canPacmanWalkOn) {
        pacman.changeDirection(); // changer la direction
        pacman.move(); // bouger le Pacman

        const maze = this._maze;
        // vérifiez si Pacman est sur un tuile où une gomme est présente.
        if (maze.canPick(pacman.position)) {
          let dot = maze.pick(pacman.position);
          if (dot.isEnergizer) {
            // dans le cas d’une super-gomme, 100 points sont ajoutés au score
            this._score = this._score + 100;
          } else {
            //dans le cas d’une gomme, 10 points sont ajoutés au score
            this._score = this._score + 10;
          }
          // ajouter une vie tous les 200 pts:
          const x = Math.ceil(this._score / 200) * 200;
          if (this._score === x) {
            pacman.addLive();
          }
          /**/

          this._removedDot = dot;
        }
      }
    }

    // pinky
    pinky.notifyIsBlocked();
    let canPinkyWalkOn = false; // variable de type boolean pour verifier est ce que le sprite peut se déplacer vers une position donnée

    if (pinky.askedDirection !== undefined && pinky.askedToChangeDirection) {
      canPinkyWalkOn = this._canSpriteWalkOn(pinky);
    }
    // console.log(canPinkyWalkOn);
    this._moveGhost(pinky, canPinkyWalkOn);

    //blinky
    blinky.notifyIsBlocked();
    let canBlinkyWalkOn = false; // variable de type boolean pour verifier est ce que le sprite peut se déplacer vers une position donnée

    if (blinky.askedDirection !== undefined && blinky.askedToChangeDirection) {
      canBlinkyWalkOn = this._canSpriteWalkOn(blinky);
    }
    // console.log(canBlinkyWalkOn);
    this._moveGhost(blinky, canBlinkyWalkOn);

    //clyde
    clyde.notifyIsBlocked();
    let canClydeWalkOn = false; // variable de type boolean pour verifier est ce que le sprite peut se déplacer vers une position donnée

    if (clyde.askedDirection !== undefined && clyde.askedToChangeDirection) {
      canClydeWalkOn = this._canSpriteWalkOn(clyde);
    }
    // console.log(canClydeWalkOn);
    this._moveGhost(clyde, canClydeWalkOn);

    //inky
    const inky = this._inky;
    inky.notifyIsBlocked();
    let canInkyWalkOn = false; // variable de type boolean pour verifier est ce que le sprite peut se déplacer dans la labyrinthe vers une position donnée

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
        this._pacman.hasBeenEaten();
      }
    } else {
      ghost.notifyIsBlocked();
    }
  }

  /** // TODO:  */
  /**
   * le jeu est terminé s’il ne reste pas de vie au Pacman.
   * @return {boolean}
   */
  isGameOver() {
    const nbLives = this._pacman.nbLives;
    if (nbLives > 0) {
      return false;
    } else return true;
  }
  /**
   *  retourne true si pacman a été mangé (s’il est mort).
   * @return {boolean}
   */
  pacmanHasBeenEaten() {
    return this._pacman.isDead;
  }

  /**
   *  réinitialise les propriétés position, movement et isDead pour tous les sprites en jeu.
   */
  respawn() {
    this._pacman.respawn();
    this._blinky.respawn();
    this._pinky.respawn();
    this._inky.respawn();
    this.clyde.respawn();
  }

  /**
   * Cette fonction compare le score courant avec le meilleur score. Si le score
   * courant est meilleur, alors il doit être sauvegardé (dans l’instance et dans le localstorage).
   */
  saveScore() {
    if (this._score > this._highScore) {
      this._highScore = this._score;
      localStorage.setItem("highScore", this._highScore);
    }
  }

  /**
   * Permet de savoir si le niveau courant est terminé
   * @return {boolean}
   */
  lvlSucceed() {
    const maze = this._maze;
    if (maze.isEmpty()) return true;
    else return false;
  }

  /**
   * Lorsque cette fonction est appelée, un nouveau labyrinthe est créé
   * et la position ainsi que la direction des personnages sont remises aux valeurs initiales.
   */
  nextLevel() {}

  addFantome() {
    console.log("Add new ghost");
  }
}

class GameView {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this._game = game;
    this._createBoard(game.maze);
  }

  /**
   * Permet de rafraîchir le jeu
   */
  updateFrame() {
    const pacman = this._game.pacman; // Demander au game le pacman
    const pacmanPosition = pacman.position; // Demander à ce pacman sa position
    //Modifier dans le css les propriétés top et left de ce pacman en conséquence
    const pacmanDiv = document.getElementById("pacman-id");
    pacmanDiv.style.top = TAILLE_TUILE * pacmanPosition.row + "px";
    pacmanDiv.style.left = TAILLE_TUILE * pacmanPosition.column + "px";

    // pinky
    const pinky = this._game.pinky; // Demander au game le pinky
    //Modifier dans le css les propriétés top et left de ce pacman en conséquence
    const pinkyDiv = document.getElementById("pinky-id");
    pinkyDiv.style.top = TAILLE_TUILE * pinky.position.row + "px";
    pinkyDiv.style.left = TAILLE_TUILE * pinky.position.column + "px";

    // blinky
    const blinky = this._game.blinky; // Demander au game le blinky
    //Modifier dans le css les propriétés top et left de ce pacman en conséquence
    const blinkyDiv = document.getElementById("blinky-id");
    blinkyDiv.style.top = TAILLE_TUILE * blinky.position.row + "px";
    blinkyDiv.style.left = TAILLE_TUILE * blinky.position.column + "px";

    // inky
    const inky = this._game.inky; // Demander au game le inky
    //Modifier dans le css les propriétés top et left de ce pacman en conséquence
    const inkyDiv = document.getElementById("inky-id");
    inkyDiv.style.top = TAILLE_TUILE * inky.position.row + "px";
    inkyDiv.style.left = TAILLE_TUILE * inky.position.column + "px";

    // clyde
    const clyde = this._game.clyde; // Demander au game le clyde
    //Modifier dans le css les propriétés top et left de ce pacman en conséquence
    const clydeDiv = document.getElementById("clyde-id");
    clydeDiv.style.top = TAILLE_TUILE * clyde.position.row + "px";
    clydeDiv.style.left = TAILLE_TUILE * clyde.position.column + "px";
  }

  /**
   * permet de visualiser la labyrinthe
   * @param {Maze} maze
   */
  _createBoard(maze) {
    const root = document.getElementById("root");
    root.style.width = TAILLE_TUILE * maze.nbColumns + "px";

    const board = document.getElementById("board");
    board.style.width = TAILLE_TUILE * maze.nbColumns + "px";
    board.style.height = TAILLE_TUILE * maze.nbRows + "px";

    const array2d = maze._wallLayer._array;

    for (let i = 0; i < maze.nbRows; i++) {
      const line = array2d[i];
      for (let j = 0; j < maze.nbColumns; j++) {
        const pos = new Position(i, j);

        const div = document.createElement("div");
        board.appendChild(div);

        if (maze.getWallLayerTile(pos) !== undefined) {
          div.classList.add("wall");
        } else if (maze.getDotLayerTile(pos) !== undefined) {
          const dot = maze.getDotLayerTile(pos);
          if (!dot.isEnergizer) div.classList.add("dot");
          else div.classList.add("dot-energizer");
        } else if (
          // position de départ du pacman
          i === maze.pacmanRespawn.row &&
          j === maze.pacmanRespawn.column
        ) {
          div.classList.add("pacman");
          div.id = "pacman-id";
        } else if (
          // position de départ du pacman
          i === maze.ghostRespawn.row &&
          j === maze.ghostRespawn.column
        ) {
          //pinky
          div.classList.add("pinky");
          div.id = "pinky-id";

          //blinky
          const blinkyDiv = document.createElement("div");
          board.appendChild(blinkyDiv, i, j);

          blinkyDiv.classList.add("blinky");
          blinkyDiv.id = "blinky-id";
          this._setDivPosition(blinkyDiv, i, j);

          // inky
          const inkyDiv = document.createElement("div");
          board.appendChild(inkyDiv);

          inkyDiv.classList.add("inky");
          inkyDiv.id = "inky-id";
          this._setDivPosition(inkyDiv, i, j);

          // clyde
          const clydeDiv = document.createElement("div");
          board.appendChild(clydeDiv);

          clydeDiv.classList.add("clyde");
          clydeDiv.id = "clyde-id";
          this._setDivPosition(clydeDiv);
        }

        this._setDivPosition(div, i, j);
      }
    }
  }

  _setDivPosition(div, i, j) {
    div.style.width = TAILLE_TUILE + "px";
    div.style.height = TAILLE_TUILE + "px";

    // puting the square in the right position
    div.style.position = "absolute";
    div.style.top = TAILLE_TUILE * i + "px";
    div.style.left = TAILLE_TUILE * j + "px";
  }
}

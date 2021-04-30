class GameView {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this._game = game;
    createBoard(game.maze);
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
  }
}

/**
 * @param {Maze} maze
 */
function createBoard(maze) {
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
      }
      div.style.width = TAILLE_TUILE + "px";
      div.style.height = TAILLE_TUILE + "px";

      // puting the square in the right position
      div.style.position = "absolute";
      div.style.top = TAILLE_TUILE * i + "px";
      div.style.left = TAILLE_TUILE * j + "px";
    }
  }
}

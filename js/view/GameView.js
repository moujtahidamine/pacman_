class GameView {
  /**
   * @param {Game}
   */
  constructor(game) {
    createBoard(game.maze);
  }
}

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

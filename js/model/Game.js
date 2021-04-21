/*
  La classe Game est une façade. Pour la première itération, elle ne possède que le labyrinthe en propriété.
*/
class Game {
  /**
   * @param {Array} rawMaze
   */
  constructor(rawMaze) {
    this._maze = new Maze(rawMaze);
  }

  /**
   * @return {Maze} maze
   */
  get maze() {
    return this._maze;
  }
}

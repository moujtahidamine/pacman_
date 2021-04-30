/*
  game controller
*/
class GameCtrl {
  constructor() {
    this._game = new Game(RAW_MAZE);
    this._view = new GameView(this._game);
    const pacman = this._game.pacman;
    const pacmanCtrl = new PacmanCtrl(pacman);
    const pacmanView = new PacmanView(pacmanCtrl);
    this.run();
  }

  /**
   * @return {Game}
   */
  get game() {
    return this._game;
  }

  /**
   * @return {View}
   */
  get view() {
    return this._view;
  }

  run() {
    this._timer = setInterval(() => {
      this._game.moveSprites();
      this._view.updateFrame();
    }, RUN_INTERVAL);
  }
}

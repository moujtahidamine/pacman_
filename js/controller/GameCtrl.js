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
      const isGameOver = this._game.isGameOver();

      // Lorsque le Pacman a perdu toutes ses vies => afficher un message dans la console et arrêter le mouvement des sprites.
      if (isGameOver === false) {
        this._game.moveSprites();
      } else {
        console.log("GAME OVER");
      }

      this._view.updateFrame();
      this._view.updateLives();
    }, RUN_INTERVAL);
  }
}

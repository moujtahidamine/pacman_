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
      const game = this._game;
      const view = this._view;
      const isGameOver = game.isGameOver();

      // Lorsque le Pacman a perdu toutes ses vies => afficher un message dans la console et arrêter le mouvement des sprites.
      if (isGameOver === false) {
        game.moveSprites();
      } else {
        console.log("GAME OVER");
        game.saveScore();
        view.displayGameOver();
      }

      view.updateFrame();
      view.updateLives();

      //
      if (game.pacmanHasToChangeColor()) {
        view.changePacmanColor();
      }
    }, RUN_INTERVAL);
  }
}

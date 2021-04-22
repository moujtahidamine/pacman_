/*
  controller
*/
class GameCtrl {
  constructor() {
    const game = new Game(RAW_MAZE);
    const view = new GameView(game);
  }
}

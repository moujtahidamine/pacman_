class PacmanView {
  /**
   * @param {PacmanCtrl}
   */
  constructor(pacmanCtrl) {
    this._pacmanCtrl = pacmanCtrl;
    this.handleKeyEvent();
  }

  handleKeyEvent() {
    const pacman = this._pacmanCtrl.pacman;
    console.log("avant le click", pacman);

    document.addEventListener("keydown", function(event) {
      let pressedKey = event.key;
      if (pressedKey == "ArrowUp") {
        pacman.askToChangeDirection(Direction.NORTH);
        console.log("You pressed the 'up' key!");
      } else if (pressedKey == "ArrowRight") {
        pacman.askToChangeDirection(Direction.EAST);
        console.log("You pressed the 'right' key!");
      } else if (pressedKey == "ArrowDown") {
        pacman.askToChangeDirection(Direction.WEST);
        console.log("You pressed the 'down' key!");
      } else if (pressedKey == "ArrowLeft") {
        pacman.askToChangeDirection(Direction.SOUTH);
        console.log("You pressed the 'left' key!");
      }

      pacman.changeDirection();
      pacman.move();
      console.log("aprés le click", pacman);
    });
  }
}

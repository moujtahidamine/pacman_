class PacmanView {
  /**
   * @param {PacmanCtrl}
   */
  constructor(pacmanCtrl) {
    this._pacmanCtrl = pacmanCtrl;
    this.handleKeyEvent();
  }

  handleKeyEvent() {
    const pacmanCtrl = this._pacmanCtrl;

    document.addEventListener("keydown", function(event) {
      let pressedKey = event.key;
      let askedDirection = undefined; // elle va etre changée si seuleument si une touche de direction a été appuyée

      if (pressedKey == "ArrowUp") {
        askedDirection = Direction.NORTH;
        // console.log("You pressed the 'up' key!");
      } else if (pressedKey == "ArrowRight") {
        askedDirection = Direction.EAST;
        // console.log("You pressed the 'right' key!");
      } else if (pressedKey == "ArrowDown") {
        askedDirection = Direction.SOUTH;
        // console.log("You pressed the 'down' key!");
      } else if (pressedKey == "ArrowLeft") {
        askedDirection = Direction.WEST;
        // console.log("You pressed the 'left' key!");
      }

      if (askedDirection !== undefined) {
        pacmanCtrl.askToChangeDirection(askedDirection);
      }
    });
  }
}

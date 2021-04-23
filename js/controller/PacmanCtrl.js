class PacmanCtrl {
  /**
   * @param {Pacman}
   */
  constructor(pacman) {
    this._pacman = pacman;
  }

  /**
   * @return {Pacman}
   */
  get pacman() {
    return this._pacman;
  }

  /**
   * Elle ne fait rien d’autre que d’appeler la méthode homonyme de l’objet Pacman.
   * Elle sera utilisée par la vue lorsque l’utilisateur appuiera sur une flèche du clavier.
   * @param {Direction}
   */
  askToChangeDirection(direction) {
    this._pacman.askToChangeDirection(direction);
  }
}

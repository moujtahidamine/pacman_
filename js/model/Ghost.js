/**
 * Ghost model
 */
class Ghost extends Sprite {
  /**
   * @param {Position} position the initial position
   * @param {Direction} direction the initial direction
   */
  constructor(position, direction) {
    super(position, direction, "2");
  }

  /**
   * va permettre au fantôme de signifier son intention de changer de direction
   * DIRECTIONS une liste des directions stockée dans le fichier constants.js
   * randomItem() depuis le fichier utils.js
   */
  _choiceNewDirection() {
    this._timer = setInterval(() => {
      let direction = randomItem(DIRECTIONS);
      this.askToChangeDirection(direction);
      // console.log(direction);
    }, GHOST_RUN_INTERVAL);
  }

  /**
   * retourne true si le Pacman et le fantôme se trouvent à la même position ou si le Pacman se retrouve à l’ancienne position du fantôme et que le
   * fantôme se retrouve sur l’ancienne position du Pacman.
   * @param{Pacman} pacman
   * @return {boolean}
   */
  canEat(pacman) {
    if (
      this._position.row === pacman.position.row &&
      this._position.column === pacman.position.column
    )
      return true;
    // si le Pacman et le fantôme se trouvent à la même position
    else if (
      (this._previousPosition.row === pacman.position.row &&
        this._previousPosition.column === pacman.position.column) ||
      (this.position.row === pacman.previousPosition.row &&
        this.position.column === pacman.previousPosition.column)
    )
      /**
       * si le Pacman se retrouve à l’ancienne position du fantôme et que le fantôme se retrouve sur l’ancienne position du Pacman
       */
      return true;
    else return false;
  }

  /**
   * une intention de changer de direction est signifiée lorsque le fantôme est bloqué.
   */
  notifyIsBlocked() {
    this._choiceNewDirection();
  }
}

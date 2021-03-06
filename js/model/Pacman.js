/**
 * The powerful, the pleasurable, the indestructible Pacman.
 */
class Pacman extends Sprite {
  /**
   * @param {Position} position the initial position
   * @param {Direction} direction the initial direction
   */
  constructor(position, direction) {
    super(position, direction, PACMAN_ID);
    this._nbLives = NB_LIVES; // 2 (voir le fichier constants.js)
    this._hasToChangeColor = false;
  }

  /**
   * @returns {Number}
   */
  get nbLives() {
    return this._nbLives;
  }

  /**
   * enlève une vie au Pacman en plus du comportement définit dans la classe mère
   */
  hasBeenEaten() {
    this._nbLives = this._nbLives - 1;
    super.hasBeenEaten();
  }

  /**
   * ajouter une vie
   */
  addLive() {
    this._nbLives = this._nbLives + 1;
  }

  /**
   * @return {boolean}
   */
  get hasToChangeColor() {
    return this._hasToChangeColor;
  }

  changeColor(hasToChangeColor) {
    this._hasToChangeColor = hasToChangeColor;
  }
}

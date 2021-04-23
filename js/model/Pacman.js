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
  }
}

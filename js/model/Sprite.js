class Sprite extends Component {
  /**
   * @param {String} id
   * @param {Position} position
   * @param {Direction} direction
   */
  constructor(position, direction, id) {
    super(id);
    this._position = position;
    this._direction = direction;
    this._askedToChangeDirection = false; // false par défault

    this._previousPosition = position;
  }

  /**
   * La position du sprite
   * @returns {Position}
   */
  get position() {
    return this._position;
  }

  /**
   * La position précedante du sprite
   * @returns {Position}
   */
  get previousPosition() {
    return this._previousPosition;
  }

  /**
   * La direction dans laquelle se déplace le sprite
   * @returns {Direction}
   */
  get direction() {
    return this._direction;
  }

  /**
   * true si une demande de changement de direction a été faite, false sinon
   * @returns {boolean}
   */
  get askedToChangeDirection() {
    return this._askedToChangeDirection;
  }

  /**
   * La direction qui a été demandée. Cette direction sera utilisée lorsqu’un changement de direction est possible
   * @returns {Direction}
   */
  get askedDirection() {
    return this._askedDirection;
  }

  /**
   * permet de faire avancer le sprite dans sa direction
   */
  move() {
    this._previousPosition = this.position;
    this._position = this._position.nextPosition(this._direction);
  }

  /**
   * Permet de signifier qu’à la prochaine occasion,
   * le sprite devra changer de direction. Il ne faut pas le faire encore, juste modifier les
   * propriétés askedToChangeDirection et askedDirection
   * @param {Direction} direction
   */
  askToChangeDirection(direction) {
    this._askedToChangeDirection = true;
    this._askedDirection = direction;
  }

  /**
   * Rend le changement de direction du sprite effectif
   */
  changeDirection() {
    this._askedToChangeDirection = false;
    this._direction = this._askedDirection;
    this._askedDirection = undefined;
  }

  /**
   * ne fait rien au niveau du sprite
   */
  notifyIsBlocked() {}
}

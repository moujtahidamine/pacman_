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
    this._isDead = false;
    this._initPosition = position; // stocker la position initiale
    this._initDirection = direction; // stocker la direction initiale
  }

  /**
   * La position du sprite
   * @returns {Position}
   */
  get position() {
    return this._position;
  }

  /**
   * @returns {bollean}
   */
  get isDead() {
    return this._isDead;
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

  /**
   * déclare le sprite mort
   */
  hasBeenEaten() {
    this._isDead = true;
  }

  /**
   * redonne la vie au sprite
   */
  respawn() {
    //modifie la valeur de l’attribut isDead;
    this._isDead = false;

    // fait réapparaître le sprite à la position qu’il a eu lors de son initialisation;
    this._position = this._initPosition;

    //modifie le mouvement pour que le sprite reparte dans la direction initiale;
    this._direction = this._initDirection;
  }
}

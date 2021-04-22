class Component {
  /**
   * To be created, a Component just need an id.
   *
   * @param {string} id unique Component's id
   */
  constructor(id) {
    this._id = id;
  }

  /**
   * @returns {string}
   */
  get id() {
    return this._id;
  }
}

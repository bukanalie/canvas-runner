class Body {
  constructor(gameObject, size) {
    this.gameObject = gameObject;
    this.velocity = new Vector(0, 0);
    this.size = size;
    gameObject.size = size;
    this.hitbox = new Hitbox(gameObject);
  }

  update(deltaTime) {
    this.velocity = new Vector(
      this.velocity.x,
      this.velocity.y + Physic.gravity * (deltaTime / 1000)
    );

    this.gameObject.position = new Vector(
      this.gameObject.position.x + this.velocity.x,
      this.gameObject.position.y + this.velocity.y
    );
  }

  get collisions() {
    return this.hitbox.collisions;
  }

  get isFalling() {
    return this.velocity.y > 0;
  }

  get isGrounded() {
    return this.velocity.y == 0;
  }

  get isRising() {
    return this.velocity.y < 0;
  }
}

class Character extends GameObject {
  constructor(name) {
    super(name);
    this.renderer = new Renderer(this);
    this.animator = new CharacterAnimator(this);
    this.position = new Vector(0, Game.drawer.canvas.height - 100);
    this.body = new Body(this, new Vector(30, 40));
  }

  update(deltaTime) {
    this.lastY = this.position.y;
    this.graphic = this.animator.animation.nextValue();
    this.body.velocity.x = 4;
    this.body.update(deltaTime);
    this.handleCollision();
    super.update();
  }

  draw() {
    this.renderer.draw(this.position);
  }

  jump() {
    if (this.body.isGrounded) {
      this.body.velocity = new Vector(0, -8);
    }
  }

  land(collision) {
    this.body.velocity.y = 0;
    const otherCorner = collision.otherHitbox.topLeftCorner;
    this.position.y = otherCorner.y - this.body.size.y
  }

  runInto(collision) {
    this.position.x = collision.otherHitbox.topLeftCorner.x - this.body.size.x
  }

  handleCollision() {
    this.body.collisions.forEach((collision) => {
      switch(collision.location) {
        case 'topRight':
        case 'right':
          this.runInto(collision);
          break;
        case 'bottomRight':
        case 'topRight':
          if (!this.body.isFalling) {
            this.runInto(collision);
          }
        case 'bottom':
        case 'bottomRight':
        case 'bottomLeft':
          if (this.body.isFalling) {
            this.land(collision);
          }
      }
    })
  }
}

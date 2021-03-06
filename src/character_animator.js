/**
 * The animator to use for the main character. Extends the Animator class but
 * defines no additional behaviour.
 */
class CharacterAnimator extends Animator {
  /**
   * @constructor
   * @param {Character} - The character to use when determining the animation
   *                      states.
   */
  constructor(character) {
    const fallAnimation = new ProportionSpriteAnimation(
      new SpriteSheet('assets/character_fall.png', 5),
      () => {
        return [character.body.velocity.y / 3, 1].min();
      }
    );

    const riseAnimation = new SpriteAnimation(
      new SpriteSheet('assets/character_rise.png', 2),
      0
    );

    const runAnimation = new SpriteAnimation(
      new SpriteSheet('assets/character_run.png', 5),
      14
    );

    super(
      character, {
        run: runAnimation,
        fall: fallAnimation,
        rise: riseAnimation
      }, (gameObject) => {
      if (gameObject.body.isFalling) {
        return 'fall';
      } else if (gameObject.body.isRising) {
        return 'rise';
      } else {
        return 'run';
      }
    });
  }
}

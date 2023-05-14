import Button from './Button.js';
export default class SceneGameOver extends Phaser.Scene {
    constructor() {
      super({ key: "SceneGameOver" });
    }
  
    preload() {
        this.load.image('background3', 'Assets/Title_screen_background.jpg');

    }
  
    create() {
        const backgroundImage = this.add.image(0, 0, 'background3').setOrigin(0, 0);
        backgroundImage.setScale(1);
        const loseText = this.add.text(430, 100, "GAME OVER!", { fontFamily: 'monospace', fontSize: '50px' });
        const retryText = this.add.text(280, 200, "Press retry or ENTER to try again...", { fontFamily: 'monospace', fontSize: '30px' });
        const button = new Button(530, 300, 'Retry', this, () => this.scene.start("SceneMain"));

        this.input.keyboard.on('keydown-ENTER', function() {
          this.scene.start("SceneMain");
        }, this);

    }

}
  
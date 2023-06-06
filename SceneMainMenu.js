import Button from './Button.js';

export default class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
  
    preload() {
        this.load.image('background', 'Assets/Game_start_image.png');

    }
  
    create() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(0.45);
        const button = new Button(530, 300, 'Start Game', this, () => this.scene.start("SceneMain"));

        //this.scene.start("SceneMain");

    }
  }
  
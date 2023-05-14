import Button from './Button.js';
export default class SceneWin extends Phaser.Scene {
    constructor() {
      super({ key: "SceneWin" });
    }
  
    preload() {
        this.load.image('background4', 'Assets/Title_screen_background.jpg');

    }
  
    create() {
        //set background
        const backgroundImage = this.add.image(0, 0, 'background4').setOrigin(0, 0);
        backgroundImage.setScale(1);

        //create button and text
        const button = new Button(530, 300, 'Retry', this, () => this.scene.start("SceneMain"));
        const winText = this.add.text(430, 100, "YOU WIN!", { fontFamily: 'monospace', fontSize: '50px' });

        //show score
        if(localStorage.highScore == localStorage.currentScore || localStorage.highScore < localStorage.currentScore) {
          const scoreNewText = this.add.text(430, 160, ("New high score: " + localStorage.highScore), { fontFamily: 'monospace', fontSize: '30px' });
        } else {
          const scoreCurrentText = this.add.text(430, 160, ("Score: " + localStorage.currentScore), { fontFamily: 'monospace', fontSize: '30px' });
          const highScoreText = this.add.text(430, 190, ("High score: " + localStorage.highScore), { fontFamily: 'monospace', fontSize: '30px' });
        }
        


    }
  }
  
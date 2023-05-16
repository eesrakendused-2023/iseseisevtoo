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
        if(window.localStorage.getItem('highScore') == window.localStorage.getItem('currentScore') || window.localStorage.getItem('highScore') < window.localStorage.getItem('currentScore')) {
          const scoreNewText = this.add.text(430, 160, ("New high score: " + window.localStorage.getItem('highScore')), { fontFamily: 'monospace', fontSize: '30px' });
        } else /* (window.localStorage.getItem('highScore') > window.localStorage.getItem('currentScore')) */{
          const scoreCurrentText = this.add.text(430, 160, ("Score: " + window.localStorage.getItem('currentScore')), { fontFamily: 'monospace', fontSize: '30px' });
          const highScoreText = this.add.text(430, 190, ("High score: " + window.localStorage.getItem('highScore')), { fontFamily: 'monospace', fontSize: '30px' });
        } /* else {
          window.localStorage.setItem('highScore', window.localStorage.getItem('currentScore'));
        } */
        


    }
  }
  

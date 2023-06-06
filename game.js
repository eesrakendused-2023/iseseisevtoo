import SceneGameOver from "./SceneGameOver.js";
import SceneMainMenu from "./SceneMainMenu.js";
import SceneMain from "./SceneMain.js";
import SceneWin from "./SceneWin.js";

// phaser config
const config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960,
        height: 480,
      }, 
      scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver,
        SceneWin
        
    ]
};

const game = new Phaser.Game(config);
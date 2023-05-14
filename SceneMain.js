export default class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }  

    preload() {
        this.scene.stop("SceneMainMenu");
        this.load.image('background2', 'Assets/Background.png');
        this.load.image('tiles', 'Assets/Tilesheet.png');
        this.load.image('water', 'Assets/water.png');
        this.load.image('coin', 'Assets/coin.png');
        this.load.tilemapTiledJSON('map', 'Assets/map1.json');
        this.load.atlas('player', 'Assets/Player.png', 'Assets/Player.json');
        this.load.audio("ded", ["Assets/ded_sound.mp3"]);
        this.load.audio("win", ["Assets/game_win.mp3"]);
        this.load.audio("coin_sound", ["Assets/game_coin.mp3"]);
        this.load.audio("music", ["Assets/game_music.mp3"]);
    }  

    create() {
        let CoinLayer;
        let coins;
        let text;
        this.text2;
        this.coinNumber = 0;
        this.coinScore = 0;
        this.playTime = 0;
        this.score = 0;
        this.timeScore = 0;
        this.startTime = this.time.now;
        //console.log(this.startTime);

        //sound and music
        this.ded = this.sound.add("ded", { loop: false });
        this.music = this.sound.add("music", { loop: true });
        this.win = this.sound.add("win", { loop: false, volume: 2});
        this.coin_sound = this.sound.add("coin_sound", { loop: false });
        this.music.play();

        //map, background and platforms
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage('main_game_tiles', 'tiles');
        const backgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        backgroundImage.setScale(1);
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 0);
        platforms.setScale(1);
        platforms.setCollisionByExclusion(-1, true);
        const water = map.createStaticLayer('Water', tileset, 0, 0);
      
        CoinLayer = map.getObjectLayer('Coins')['objects'];
      
       // player
       this.player = this.physics.add.sprite(1, 400, 'player');
       this.player.setCollideWorldBounds(true);
       this.physics.add.collider(this.player, platforms);
       this.player.body.bounce.y = 0.1;
      
      // ANIMATIONS //
       // walking animation
       this.anims.create({
         key: 'walk',
         frames: this.anims.generateFrameNames('player', {
           prefix: 'tile00',
           suffix: '.png',
           start: 1,
           end: 4,
         }),
         frameRate: 10,
         repeat: -1
       });
      
       // standing animation
       this.anims.create({
         key: 'idle',
         frames: [{ key: 'player', frame: 'tile000.png' }],
         frameRate: 10,
       });
      
       // jump animation
       this.anims.create({
         key: 'jump',
         frames: [{ key: 'player', frame: 'tile005.png' }],
         frameRate: 10,
       });
      
       // user input via keyboard
       this.cursors = this.input.keyboard.createCursorKeys();
      
      // COINS //
      function collectCoin(player, coin) {
        coin.destroy(coin.x, coin.y);
        this.coinNumber ++;
        this.coinScore += 500;
        this.coin_sound.play();
        text.setText(`Coins: ${this.coinNumber}`);
        return false;
      }

      coins = this.physics.add.staticGroup()
      CoinLayer.forEach(object => {
        let obj = coins.create(object.x, object.y, "coin"); 
          obj.setScale(object.width/16, object.height/16); 
          obj.setOrigin(0); 
          obj.body.width = object.width; 
          obj.body.height = object.height; 
      });
      
      //coin collisons
      this.physics.add.overlap(this.player, coins, collectCoin, null, this);
      
      //score
      text = this.add.text(50, 50, `Coins: ${this.coinNumber}`, {
        fontSize: '16px',
        fill: '#ffffff'
      });
      this.text2 = this.add.text(50, 70, `Total score: ${this.score}`, {
        fontSize: '16px',
        fill: '#ffffff'
      });


    }

    

    update() {
      //timer
      this.playTime = Math.floor((this.time.now - this.startTime)* 0.001);
      this.timeScore = Math.round(10000 - 80000*this.playTime/(2000+this.playTime));
      this.score = this.timeScore + this.coinScore;
      this.text2.setText(`Total score: ${this.score}`);
      
      // Player controls
      //console.log(this.player.x, this.player.y);
      if (this.cursors.left.isDown) {
          this.player.setVelocityX(-80);
          if (this.player.body.blocked.down) {
              this.player.play('walk', true);
          }
      } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(80);
          if (this.player.body.blocked.down) {
              this.player.play('walk', true);
          }
      } else {
          this.player.setVelocityX(0);
          if (this.player.body.blocked.down) {
              this.player.play('idle', true);
          }
      }
  
      if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.blocked.down) {
          this.player.setVelocityY(-200);
          this.player.play('jump', true);
      }
  
      if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(false);
      } else if (this.player.body.velocity.x < 0) {
          this.player.setFlipX(true);
      }
      // Falling out of map/drowning
      if(this.player.y == 472){
          localStorage.currentScore = this.score;
          this.ded.play();
          this.music.stop();
          //this.ded.stop();
          this.scene.start("SceneGameOver");
      }
      // Reaching the end coordinates
      if(this.player.y == 424 && this.player.x > 919 && this.player.x < 937){
          //high score tracking
          let highestScore = localStorage.highScore;
          if(highestScore < this.score){
            localStorage.highScore = this.score;
          }
          //current score tracking
          localStorage.currentScore = this.score;
          this.music.stop();
          this.win.play();
          this.scene.start("SceneWin");
      }
    }
}
  
  
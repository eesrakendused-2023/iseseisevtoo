// Tagatausta liikumiskiirus (koos kirjutatud)
let move_speed = 8;
	
// gravitatsioon
let gravity = 0.3;
	
// lennuelement
let plane = document.querySelector('.plane');
	
// Lennukielemendi omaduste saamine 
let plane_props = plane.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
	
// score-ile viide (Vanessa)
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let highscore_val = document.querySelector('.highscore_val');
let highscore_title = document.querySelector('.highscore_title');
	
// Mängu panek algusesse 
let game_state = 'Start';
	
// Klikkide kuulaja
document.addEventListener('keydown', (e) => {
	
// Mäng algab kui klikitakse (Vanessa)
if (e.key == ' ' &&
	game_state != 'Play') {
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
	e.remove();
	});
    document.querySelectorAll('.coin').forEach((e) => {
        e.remove();
      });
	plane.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    highscore_title.innerHTML = 'Highscore : ';
	play();
}
});

function play() {

     // defineering kogutavadele coinidele
    let coins = [];

    // funktsioon mündi loomiseks (Karl)
    function createCoin() {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.left = '100vw';
        coin.style.top = Math.floor(Math.random() * 65) + 'vh';
        coins.push(coin);
        document.body.appendChild(coin);
    }
    
    
    
    
    // Funktsioon mündi liigutamiseks
   // (Karl)
   function moveCoins() {
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const coinProps = coin.getBoundingClientRect();

     
      if (
        plane_props.left < coinProps.left + coinProps.width &&
        plane_props.left + plane_props.width > coinProps.left &&
        plane_props.top < coinProps.top + coinProps.height &&
        plane_props.top + plane_props.height > coinProps.top
      ) {
        coin.remove();
        coins.splice(i, 1);
        score_val.innerHTML = +score_val.innerHTML + 1;
        if (score_val.innerHTML > +highscore_val.innerHTML) {
          highscore_val.innerHTML = +highscore_val.innerHTML + 1;
        }
      } else {
        if (game_state === 'Play') {
            coin.style.left = coinProps.left - move_speed + 'px';
        }   
          // Remove coin when it goes off-screen
          if (coinProps.right < 0) {
            coin.remove();
            coins.splice(i, 1);
          }
       }
      }
      requestAnimationFrame(moveCoins);
    }
    requestAnimationFrame(moveCoins);

    
    
    
    //function move, Vanessa
    function move() {
        
        // tuvastada kas mänhg on lõppenud
        if (game_state != 'Play') return;
        
        // pipe elemendid
        let pipe = document.querySelectorAll('.pipe_sprite');
        pipe.forEach((element) => {
            
        let pipe_sprite_props = element.getBoundingClientRect();
        plane_props = plane.getBoundingClientRect();
            
        // kui torud on ekraanist väljas, siis need kustutatakse mälu säästmise eesmärgil
        if (pipe_sprite_props.right <= 0) {
            element.remove();
        } else {
            // Kokkupõrke detector (Vanessa)
            if (
            plane_props.left < pipe_sprite_props.left +
            pipe_sprite_props.width &&
            plane_props.left +
            plane_props.width > pipe_sprite_props.left &&
            plane_props.top < pipe_sprite_props.top +
            pipe_sprite_props.height &&
            plane_props.top +
            plane_props.height > pipe_sprite_props.top
            ) {
                
            // Kokkupõrke korral lõpetada mäng
            game_state = 'End';
            message.innerHTML = 'Press Space To Restart';
            message.style.left = '28vw';
            return;
            } else {
            
            
            
                // Skoori suurendamine kui torudest on möödutud (Karl )
            if (
                pipe_sprite_props.right < plane_props.left &&
                pipe_sprite_props.right +
                move_speed >= plane_props.left &&
                element.increase_score == '1'
            ) {
                score_val.innerHTML = +score_val.innerHTML + 1;
                if (score_val.innerHTML > +highscore_val.innerHTML) {
                    highscore_val.innerHTML = +highscore_val.innerHTML + 1;
                }
            }
            element.style.left =
                pipe_sprite_props.left - move_speed + 'px';
            }
        }
        });

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    
    // Karl
    let plane_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        plane_dy = plane_dy + gravity;
        document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowUp' || e.key == ' ') {
            plane_dy = -7.6;
        }
        });

        
        
        // kokkupõrke detector (Vanessa)
        if (plane_props.top <= 0 ||
            plane_props.bottom >= background.bottom) {
        game_state = 'End';
        message.innerHTML = 'Press Space To Restart';
        message.style.left = '28vw';
        return;
        }
        plane.style.top = plane_props.top + plane_dy + 'px';
        plane_props = plane.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
        
    // Konstantne vahe kahe toru vahel (Karl)
    let pipe_gap = 35;
    function create_pipe() {
        if (game_state != 'Play') return;
        
        // Uute torude loomine kui vanadest on möödutud (Vanessa)
        if (pipe_seperation > 115) {
        pipe_seperation = 0
            
        // suvaline vahe 
        //Kasutatud https://stackoverflow.com/questions/1202687/how-do-i-get-a-specific-range-of-numbers-from-rand abi
        // Kuid 
        let pipe_posi = Math.floor(Math.random() * 43) + 8;
        let pipe_sprite_inv = document.createElement('div');
        pipe_sprite_inv.className = 'pipe_sprite';
        pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
        pipe_sprite_inv.style.left = '100vw';
            
       
        document.body.appendChild(pipe_sprite_inv);
        let pipe = document.createElement('div');
        pipe.className = 'pipe_sprite';
        pipe.style.top = pipe_posi + pipe_gap + 'vh';
        pipe.style.left = '100vw';
        pipe.increase_score = '1';
            
       
        document.body.appendChild(pipe);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);

     // Müntide teke regullaarse intervalliga (Vanessa)
    function createCoinsInterval() {
        if (game_state != 'Play') return;
        createCoin();
        setTimeout(createCoinsInterval, Math.floor(Math.random() * 3000) + 2000);
    }
    createCoinsInterval();

}
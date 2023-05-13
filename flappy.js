// Tagatausta liikumiskiirus
let move_speed = 6;
	
// gravitatsioon
let gravity = 0.5;
	
// lennuelement
let plane = document.querySelector('.plane');
let plane_props = plane.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
	
	
// klikkide kuulaja
let game_state = 'Start';
document.addEventListener('keydown', (e) => {
	
// Mäng algab kui klikitakse 
if (e.key == ' ' &&
	game_state != 'Play') {
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
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
    function move() {
        
        // Jälgida kas mäng on lõppenud
        if (game_state != 'Play') return;
        
        // Getting reference to all the pipe elements
        let pipe = document.querySelectorAll('.pipe_sprite');
        pipe.forEach((element) => {
            
        let pipe_sprite_props = element.getBoundingClientRect();
        plane_props = plane.getBoundingClientRect();
            
        // Kadunud lennuelemendid kustutatakse
        if (pipe_sprite_props.right <= 0) {
            element.remove();
        } else {
            // Collision detection with plane and pipes
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
                
            // Change game state and end the game
            // if collision occurs
            game_state = 'End';
            message.innerHTML = 'Press Space To Restart';
            message.style.left = '28vw';
            return;
            } else {
            // Increase the score if player
            // has the successfully dodged the

            if (
                pipe_sprite_props.right < plane_props.left &&
                pipe_sprite_props.right +
                move_speed >= plane_props.left &&
                element.increase_score == '1'
            ) {
                score_val.innerHTML = +score_val.innerHTML + 1;
                if (score_val.innerHTML > highscore_val.innerHTML) {
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

    let plane_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        plane_dy = plane_dy + gravity;
        document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowUp' || e.key == ' ') {
            plane_dy = -7.6;
        }
        });
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
        
    // Pipeside vahe
    let pipe_gap = 35;
    function create_pipe() {
        if (game_state != 'Play') return;
        
        // uute pipeside loomine
    
        if (pipe_seperation > 115) {
        pipe_seperation = 0
            
        // random mathiga vahe leidmine 
        // kasutatud https://stackoverflow.com/questions/1202687/how-do-i-get-a-specific-range-of-numbers-from-rand
        //abi, kuid kood on kohandatud
        let pipe_posi = Math.floor(Math.random() *28 ) + 8;
        let pipe_sprite_inv = document.createElement('div');
        pipe_sprite_inv.className = 'pipe_sprite';
        pipe_sprite_inv.style.top = pipe_posi - 70 + 'px';
        pipe_sprite_inv.style.left = '80 px';
            
        // Append the created pipe element in DOM
        document.body.appendChild(pipe_sprite_inv);
        let pipe = document.createElement('div');
        pipe.className = 'pipe_sprite';
        pipe.style.top = pipe_posi + pipe_gap + 'px';
        pipe.style.left = '80vw';
        pipe.increase_score = '1';
            
    }
    requestAnimationFrame(create_pipe);
}
// Tagatausta liikumiskiirus (koos kirjutatud)
let move_speed = 8;
	
// gravitatsioon 
let gravity = 0.5;
	
// lennuelement
let plane = document.querySelector('.plane');
	
// Lennukielemendi omaduste saamine 
let plane_props = plane.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
	
// score-ile viide (Vanessa)
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
	
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
	plane.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
	score_val.innerHTML = '0';
	play();
}
});
// (Karl, terve function)
function play() { 
    function move() {
        
        // panna tähele kui mäng on lõppenud
        if (game_state != 'Play') return;
        
        // Pipe elementide reference
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            
        let pipe_sprite_props = element.getBoundingClientRect();
        plane_props = plane.getBoundingClientRect();
            
        // Väljaliikunud pipesid kustutatakse
        if (pipe_sprite_props.right <= 0) {
            element.remove();
        } else {
            // kokkupõrke detector
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
                
            // Muuta mäng uuesti alustusvalmis staadiumisse
            game_state = 'End';
            message.innerHTML = 'Press Space To Restart';
            message.style.left = '28vw';
            return;
            } else {
            // Skoori suurendatakse kui on pipesidest möödutud

            if (
                pipe_sprite_props.right < plane_props.left &&
                pipe_sprite_props.right +
                move_speed >= plane_props.left &&
                element.increase_score == '1'
            ) {
                score_val.innerHTML = +score_val.innerHTML + 1;
            }
            element.style.left =
                pipe_sprite_props.left - move_speed + 'px';
            }
        }
        });

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    // Kokkupõrke detector (Vanessa)
    let plane_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        plane_dy = plane_dy + gravity;
        document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowUp' || e.key == ' ') {
            plane_dy = -7.6;
        }
        });
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
        
    // konstantne väärtus kahe pipesi vahel (Karl)
    let pipe_gap = 35;
    function create_pipe() {
        if (game_state != 'Play') return;
        
    
        if (pipe_seperation > 115) {
        pipe_seperation = 0
            
        let pipe_posi = Math.floor(Math.random() * 43) + 8;
        let pipe_sprite_inv = document.createElement('div');
        pipe_sprite_inv.className = 'pipe_sprite';
        pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
        pipe_sprite_inv.style.left = '100vw';
         
        document.body.appendChild(pipe_sprite_inv);
        let pipe_sprite = document.createElement('div');
        pipe_sprite.className = 'pipe_sprite';
        pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
        pipe_sprite.style.left = '100vw';
        pipe_sprite.increase_score = '1';
            
        // (Karl)
        document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
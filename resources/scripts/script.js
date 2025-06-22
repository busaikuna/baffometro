let canvas = document.querySelector("#my-canvas");
let context = canvas.getContext('2d');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const camera = { x: 0, y: 0 };

let ground = new Ground(3000, HEIGHT);
let primaryCharacter = new Character(context);

function gameLoop() {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    if(currentCutscene){
        playCutscene(context);
        moviments();
    } else {
        context.fillStyle = 'skyblue';
        context.fillRect(0, 0, WIDTH, HEIGHT);
        ground.draw(context, camera);
        moviments();
        primaryCharacter.update(ground);
        primaryCharacter.draw(camera);
    }

    requestAnimationFrame(gameLoop);
}


gameLoop();

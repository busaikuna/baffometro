let canvas = document.querySelector("#my-canvas")
let context = canvas.getContext('2d');
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
canvas.width = WIDTH
canvas.height = HEIGHT

let primaryCharacter = new Character(context)
let ground = new Ground()

function gameLoop(){
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    primaryCharacter.update()
    moviments()
    primaryCharacter.draw()

    requestAnimationFrame(gameLoop)
}


primaryCharacter.sprites.onload = () =>{
    gameLoop()
}


const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    C: false,
    Escape: false
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") keys.ArrowLeft = true;
    if (event.key === "ArrowRight") keys.ArrowRight = true;
    if(event.key == "c") keys.C = true
    if (event.key === " ") {
       primaryCharacter.jump()
       keys.Space = true
    }
    if(event.key === "Escape") keys.Escape = true
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") keys.ArrowLeft = false;
    if (event.key === "ArrowRight") keys.ArrowRight = false;
    if (event.key === " ") keys.Space = false
    if(event.key == "c") keys.C = false
    if(event.key === "Escape") keys.Escape = false
});
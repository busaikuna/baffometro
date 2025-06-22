let stateDiv = document.querySelector("#stateDiv");
let currentState = "initial";
setState(currentState);
let save = localStorage.getItem("save")

function setState(state) {
    currentState = state;
    switch (state) {
        case "initial":
            stateDiv.className = "initial"
            stateDiv.innerHTML = ""
            stateDiv.innerHTML = `
                <img src="sprites/title.png">
                <button id="newGame">Novo Jogo</button>
                <button id="loadGame">Carregar Jogo</button>
                <button id="settings">Configurações</button>
                <p>by BusaiKuna</p>
                <div class="blur"></div>
            `;
            document.getElementById("newGame").onclick = start;
            document.getElementById("loadGame").onclick = loadGame;
            document.getElementById("settings").onclick = settings;
            break;
        case "game":
            stateDiv.innerHTML = "";
            stateDiv.style.display = "none"
            currentCutscene = 1
            break;
        case "settings":
            stateDiv.classList.toggle("initial")
            stateDiv.innerHTML = `
                <h1 style="color:white;">Configurações</h1>
                <button onclick="setState('initial')">Voltar</button>
                <div class="blur"></div>
            `;
            break;
        case "characters":
            stateDiv.className = "characters"
            stateDiv.innerHTML = "";
            stateDiv.innerHTML = `
                    <span id="left"><</span>
                    <span id="characterName"> Samuel </span>
                    <img src="sprites/sam-sprite.png">
                    <span id="right">></span>
                    <button>Tocar</button>
                    <div class="blur"></div>
                `;
                document.querySelector("button").onclick = startGame;
                document.querySelector("img").onload = changeCharacterActiivate();
            break;
    }
}

function start() {
    if (save) {
    } else {
        setState("characters")
    }
}

function loadGame() {
    alert("Carregar jogo ainda não implementado!");
}

function settings() {
    setState("settings");
}

function startGame() {
     setState("game")
}


//trocar de personagem na tela de personagem

function changeCharacterActiivate(){
    document.querySelector("#left").addEventListener("click", ()=>{
        changeCharacter(-1)
    })
    document.querySelector("#right").addEventListener("click", ()=>{
        changeCharacter(1)
    })
}
let characters = ["sam-sprite.png", "arth-sprite.png", "paulo-sprite.png"]
let indexCharacters = 0
function changeCharacter(direction) {
    indexCharacters += direction
    if (indexCharacters < 0) indexCharacters = characters.length - 1;
    if (indexCharacters >= characters.length) indexCharacters = 0;    
    document.querySelector(".characters img").src = `sprites/${characters[indexCharacters]}`
    switch (indexCharacters) {
        case 0:
            document.querySelector(".characters #characterName").innerText = "Samuel"
            primaryCharacter.sprites.src = `sprites/Sprite-sam-Sheet.png`;
            break
        case 1:
            document.querySelector(".characters #characterName").innerText = "Arthur"
            primaryCharacter.sprites.src = `sprites/Sprite-arth-Sheet.png`;
            break
        case 2:
            document.querySelector(".characters #characterName").innerText = "Paulo"
            primaryCharacter.sprites.src = `sprites/Sprite-paulo-Sheet.png`;
            break
    }
}

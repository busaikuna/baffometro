let currentCutscene = 0;
let currentTextIndex = 0;

let currentLength = 0;
let frameCounter = 0;
const framesPerChar = 5;

let textFinished = false;

let waitBeforeFade = 0;
const delayFrames = 30;


function getTextsForCutscene(cutscene) {
    switch (cutscene) {
        case 1:
            return [
                `Em um mundo onde fãs de Oasis percorrem terras \n
                distantes em busca de pau (pedaço de madeira)...`,
                `A banda BAFFOMETRO surge, ousando algo imperdoável:\n 
                tocar Oasis... melhor do que eles mesmos.`,
                `Movidas por esse desejo insano, elas estão atrás da gente. \n 
                E não... elas não vão parar tão cedo.`
            ];
        case 2:
            return [
                `Mas não tem como se esconder, hoje tem aula de matematica`,
                `Aula do Professor Sernio sobre Geometria Espacial`
            ];
        default:
            return [];
    }
}

function getCurrentTexts() {
    return getTextsForCutscene(currentCutscene);
}

function getCurrentText() {
    const texts = getCurrentTexts();
    if (!texts || currentTextIndex >= texts.length) return null;
    return texts[currentTextIndex];
}

function updateTypingProgress() {
    frameCounter++;
    if (frameCounter >= framesPerChar) {
        if (currentLength < getCurrentText().length) {
            currentLength++;
        } else {
            textFinished = true;
        }
        frameCounter = 0;
    }
}

function drawTypingText(ctx, x, y, fullText, centered) {
    const maxWidth = WIDTH * 0.7;
    const lineHeight = 40;

    ctx.font = "30px 'Pixelify Sans'";
    ctx.fillStyle = "white";
    ctx.textBaseline = "top";

    const fullParagraphs = fullText.split('\n');

    let lines = [];

    for (let p = 0; p < fullParagraphs.length; p++) {
        const paragraph = fullParagraphs[p].trim();
        const words = paragraph.split(' ');

        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + word + ' ';
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }

        lines.push(currentLine.trim());
    }

    // Monta texto com typing progress
    let charsToShow = currentLength;
    let renderedLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (charsToShow >= line.length) {
            renderedLines.push(line);
            charsToShow -= line.length;
        } else {
            renderedLines.push(line.substring(0, charsToShow));
            break;
        }
    }

    let startY = y - (renderedLines.length * lineHeight) / 2;
    renderedLines.forEach((line, index) => {
        ctx.textAlign = centered ? "center" : "left";
        ctx.fillText(line, x, startY + index * lineHeight);
    });
}

function playCutscene(ctx) {

    if (currentTextIndex === 0 && currentLength === 0 && frameCounter === 0) {
        waitBeforeFade = 0; // reseta aqui também pra garantir
        textFinished = false;
    }

    // Fundo preto
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const currentText = getCurrentText();

    if (!currentText) {
        // Quando acaba os textos da cutscene atual
        currentCutscene++;
        currentTextIndex = 0;
        currentLength = 0;
        frameCounter = 0;
        textFinished = false;
        waitBeforeFade = 0;

        // Se não tem mais cutscenes
        if (getTextsForCutscene(currentCutscene).length === 0) {
            currentCutscene = 0;
        }
        return;
    }

    if (!textFinished) {
        updateTypingProgress();
    } else {
        waitBeforeFade++;
        if (waitBeforeFade >= delayFrames) {
            currentTextIndex++;
            currentLength = 0;
            frameCounter = 0;
            textFinished = false;
            waitBeforeFade = 0;
        }
    }

    drawTypingText(ctx, WIDTH / 2, HEIGHT / 2, currentText, true);
}

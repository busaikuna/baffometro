class Character {
    constructor(context) {
        this.context = context;
        this.sprites = new Image();
        this.sprites.src = "sprites/Sprite-sam-Sheet.png";

        this.width = 64;
        this.height = 64;
        this.renderWidth = 200;
        this.renderHeight = 200;

        this.x = 100;
        this.y = 0;

        this.velocity = 5;
        this.StrengthJump = 15;
        this.gravity = 0.7;
        this.jumpVelocity = 0;
        this.isJumping = false;
        this.facing = "right";

        this.currentAnimation = "";
        this.spriteIndex = 0;
        this.frameCounter = 0;
        this.frameDelay = 0;
        this.maxFrames = 3;
        this.spriteY = 0;

        this.hitbox = {
            x: this.x,
            y: this.y,
            width: this.renderWidth,
            height: this.renderHeight
        };

        this.context.imageSmoothingEnabled = false;
        this.setAnimation("idle");
    }

    move(camera) {
        const centerX = WIDTH / 2 - this.renderWidth / 2;
    
        // Indo para a direita
        if (this.facing === "right") {
            if (camera.x >= 0) {
                camera.x += this.velocity;
            }
        }
    
        // Indo para a esquerda
        if (this.facing === "left") {
            if (camera.x > 0) {
                camera.x -= this.velocity;
                if (camera.x < 0) camera.x = 0; // trava no começo
            }
        }
    }
    

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity -= this.StrengthJump;
        }
    }

    update(ground) {
        this.jumpVelocity += this.gravity;
        this.y += this.jumpVelocity;

        this.hitbox.x = this.x;
        this.hitbox.y = this.y;

        if (checkCollision(this.hitbox, ground.hitbox)) {
            this.y = ground.y - this.renderHeight;
            this.jumpVelocity = 0;
            this.isJumping = false;
        }

        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            this.frameCounter = 0;
            this.spriteIndex++;
            if (this.spriteIndex > this.maxFrames) {
                this.spriteIndex = 0;
            }
        }
    }

    draw(camera) {
        const spriteX = this.spriteIndex * this.width;
        const spriteY = this.spriteY;

        const fixedX = WIDTH / 2 - this.renderWidth / 2 - 200;

        this.context.save();

        if (this.facing === "left") {
            this.context.translate(fixedX + this.renderWidth, this.y);
            this.context.scale(-1, 1);
            this.context.drawImage(
                this.sprites,
                spriteX, spriteY, this.width, this.height,
                0, 0, this.renderWidth, this.renderHeight
            );
        } else {
            this.context.drawImage(
                this.sprites,
                spriteX, spriteY, this.width, this.height,
                fixedX, this.y, this.renderWidth, this.renderHeight
            );
        }

        this.context.restore();
    }

    setAnimation(animation) {
        if (this.currentAnimation === animation) return;

        this.currentAnimation = animation;

        switch (animation) {
            case "idle":
                this.spriteY = 0 * this.height;
                this.maxFrames = 3;
                this.frameDelay = 15;
                break;
            case "walk":
                this.spriteY = 1 * this.height;
                this.maxFrames = 3;
                this.frameDelay = 10;
                break;
            case "jump":
                this.spriteY = 2 * this.height;
                this.maxFrames = 3;
                this.frameDelay = 10;
                break;
            case "crounch":
                this.spriteY = 3 * this.height;
                this.maxFrames = 3;
                this.frameDelay = 10;
                break;
        }

        this.spriteIndex = 0;
        this.frameCounter = 0;
    }
}

class Ground {
    constructor(width, height) {
        this.sprites = new Image();
        this.sprites.src = "https://static.vecteezy.com/ti/vetor-gratis/p1/41006157-pixel-arte-jogos-cena-com-chao-grama-arvores-ceu-nuvens-personagem-moedas-tesouro-baus-e-8-bits-coracao-vetor.jpg";
        
        this.x = 0;
        this.y = height - 100;
        this.width = width;    // largura total que queremos cobrir
        this.height = 100;

        this.hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        this.isLoaded = false;
        this.spriteWidth = 0;
        this.spriteHeight = 0;

        this.sprites.onload = () => {
            this.spriteWidth = this.sprites.width;
            this.spriteHeight = this.sprites.height;
            this.isLoaded = true;
        };
    }

    draw(context, camera) {
        if (!this.isLoaded) {
            // Se a imagem não carregou, desenha um retângulo provisório
            context.fillStyle = '#654321';
            context.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
            return;
        }

        // Calcula o X inicial alinhado com a câmera para não "pular" na repetição
        let startX = Math.floor(camera.x / this.spriteWidth) * this.spriteWidth - camera.x;

        // Repete a imagem até cobrir toda a largura do chão
        for (let x = startX; x < this.width; x += this.spriteWidth) {
            context.drawImage(
                this.sprites,
                x,
                this.y - camera.y,
                this.spriteWidth,
                this.height
            );
        }
    }
}


function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

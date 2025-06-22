class Character {
    constructor(context) {
        this.sprites = new Image();
        this.sprites.src = "";
        this.width = 64;
        this.height = 64;
        this.x = 100;
        this.y = 400;
        this.velocity = 5;
        this.StrengthJump = 15;
        this.context = context;
        this.gravity = 0.7;
        this.jumpVelocity = 0;
        this.isJumping = false;
        this.facing = "right";
        this.context.imageSmoothingEnabled = false;
        this.currentAnimation = 0;
        this.spriteIndex = 0;
        this.frameCounter = 0;
        this.frameDelay = 0;
        this.maxFrames = 3;
        this.spriteY = 0;
        this.setAnimation("idle");
    }

    move() {
        if (this.facing === "right") {
            this.x += this.velocity;
        } else if (this.facing === "left") {
            this.x -= this.velocity;
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity -= this.StrengthJump;
        }
    }

    update() {
        this.jumpVelocity += this.gravity;
        this.y += this.jumpVelocity;
    
        if (ground.verifyColision(this.y)) {
            this.y = ground.y;
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
    

    draw() {
        const spriteX = this.spriteIndex * this.width;
        const spriteY = this.spriteY;

        this.context.save();

        if (this.facing === "left") {
            this.context.translate(this.x + 200, this.y);
            this.context.scale(-1, 1);
            this.context.drawImage(
                this.sprites,
                spriteX, spriteY, this.width, this.height,
                0, 0, 200, 200
            );
        } else {
            this.context.drawImage(
                this.sprites,
                spriteX, spriteY, this.width, this.height,
                this.x, this.y, 200, 200
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
                this.frameDelay = 7;
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


//chao né
class Ground {
    constructor() {
        this.y = 400
    }
    verifyColision(thingY) {
        if (thingY > this.y) {
            return (true)
        } else {
            return (false)
        }
    }
}
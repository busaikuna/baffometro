let HoldTime = 0;
const HoldThreshold = 30;

function moviments() {
    if(currentCutscene){
        
    if (keys.Escape) {
        HoldTime++;
        if (HoldTime >= HoldThreshold) {
            currentCutscene = 0;
            HoldTime = 0;
        }
    } else {
        HoldTime = 0;
    }
    }else{
        let isMoving = false;
    let isCrouching = false;

    if (keys.C) {
        isCrouching = true;
    }

    if (keys.ArrowLeft && keys.ArrowRight) {
        primaryCharacter.setAnimation("idle");
    }

    if (keys.ArrowLeft && !keys.C) {
        primaryCharacter.facing = "left";
        primaryCharacter.move(camera, ground);
        isMoving = true;
    }

    if (keys.ArrowRight && !keys.C) {
        primaryCharacter.facing = "right";
        primaryCharacter.move(camera, ground);
        isMoving = true;
    }

    if (keys.Space && !primaryCharacter.isJumping) {
        primaryCharacter.jump();
    }

    if (primaryCharacter.isJumping) {
        primaryCharacter.setAnimation("jump");
    } else if (isCrouching) {
        primaryCharacter.setAnimation("crounch");
    } else if (isMoving) {
        primaryCharacter.setAnimation("walk");
    } else {
        primaryCharacter.setAnimation("idle");
    }
    }
    
}

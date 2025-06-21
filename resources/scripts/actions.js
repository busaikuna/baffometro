function moviments() {
    let isMoving = false;
    isCrounching = false

    if(keys.C){
        isCrounching = true
    }else{
        isCrounching = false
    }
    if(keys.ArrowLeft && keys.ArrowRight){
        primaryCharacter.setAnimation("idle");
    }
    if (keys.ArrowLeft && !keys.C) {
        primaryCharacter.facing = "left";
        primaryCharacter.move();
        isMoving = true;
    }
    if (keys.ArrowRight && !keys.C) {
        primaryCharacter.facing = "right";
        primaryCharacter.move();
        isMoving = true;
    }

    if (keys.Space && !primaryCharacter.isJumping && !primaryCharacter.isFalling) {
        primaryCharacter.jump();
    }

    // Animação
    if (primaryCharacter.isJumping) {
        primaryCharacter.setAnimation("jump");
    }
    else if(isCrounching){
        primaryCharacter.setAnimation("crounch")
    }
    else if (isMoving) {
        primaryCharacter.setAnimation("walk");
    } else {
        primaryCharacter.setAnimation("idle");
    }
}

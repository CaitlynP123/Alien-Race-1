class Rocket{
    constructor(x,y){
    
        this.sprite = createSprite(x,y)
        this.sprite.addAnimation("r1", rocketImg1)
        this.sprite.scale = 0.5

    }  

    move(){
        if(keyDown("right")){
            this.sprite.x +=10
        }
        if(keyDown("left")){
            this.sprite.x -=10
        }
    }

    shoot(){
        this.beam = createSprite(this.sprite.x, this.sprite.y)
        this.beam.addImage("shoot", laserImg1)
        this.beam.scale = 0.5
        
        if(keyDown("space")){    
            this.beam.velocityY = -6
            this.beam.lifetime = 100
        }
    }
}
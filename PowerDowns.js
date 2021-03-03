class PowerDowns{
    constructor(x,y){
        this.x = x
        this.y = y
    }

    spawnPowerDowns(){
        if(frameCount%50==0){
            this.sprite = createSprite(Math.round(random(this.x)),this.y)
            this.sprite.velocityY = 10
            this.sprite.lifetime = 100
    
            var rand = Math.round(random(1,3))
            switch(rand){
                case 1 : this.sprite.addImage("p1",powerDownImg1)
                         this.sprite.scale = 0.25
                break
                case 2 : this.sprite.addImage("p2",powerDownImg2)
                         this.sprite.scale = 0.5
                break   
                case 3 : this.sprite.addImage("p3",powerDownImg3) 
                         this.sprite.scale = 0.5   
                break             
            }
        }
    }
}
class Alien{
    constructor(x,y){    
        this.x = x
        this.y = y
    }

    spawnAlien(){
        if(frameCount%50==0){
            this.sprite = createSprite(Math.round(random(100, windowWidth-100)),0)
            this.sprite.velocityY = 8
            this.sprite.lifetime = 100            
            alienGroup.add(this.sprite)

            var rand = Math.round(random(1,4))
                switch(rand){
                case 1 : this.sprite.addImage("alien1", alienImg1)
                         this.sprite.scale = 0.145  
                break
                case 2 : this.sprite.addImage("alien2", alienImg2)
                          
                break
                case 3 : this.sprite.addImage("alien3", alienImg3)
                          
                break
                case 4 : this.sprite.addImage("alien4", alienImg4)
                         this.sprite.scale = 0.145  
                break
            }
        }
    }
}
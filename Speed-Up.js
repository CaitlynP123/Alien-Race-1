class SpeedUp{
    constructor(){
        this.sprite = createSprite(Math.round(random(100,windowWidth-100)),0)
        this.sprite.scale = 0.5
        this.sprite.velocityY = 10
        this.sprite.lifetime = 100
        this.sprite.addImage("speedUp", powerDownImg2)
        speedUpGroup.add(this.sprite)
    }
}
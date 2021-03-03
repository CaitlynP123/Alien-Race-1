var gameState = 0
var powerState = 'OFF'
var speedState = 'OFF'
var scoreState = 'OFF'
var shipState = 'OFF'

var bg, edges

var rocket
var rocketImg1, rocketImg2

var spaceship, beamGroup, spaceshipGroup
var spaceshipImg1, spaceshipImg2
var ship, beam

var alienImg1, alienImg2, alienImg3, alienImg4, alienGroup

var laserImg1, laserImg2

var slowDown, slowDownGroup
var scoreMultiply, scoreMultiplyGroup
var powerUpImg1, powerUpImg2, powerUpImg3

var powerDownImg1, powerDownImg2, powerDownImg3
var speedUp, speedUpGroup

var score = 0
var lives = 3

function preload(){
  bg = loadImage("Images/Space-Background.jpg")

  rocketImg1 = loadAnimation("Images/rocket-1-1.png","Images/rocket-1-2.png","Images/rocket-1-3.png"
  ,"Images/rocket-1-4.png")

  laserImg1 = loadImage("Images/LaserBeam1.png")
  laserImg2 = loadImage("Images/LaserBeam2.png")

  powerUpImg1 = loadImage("Images/Power-up.png")
  powerUpImg2 = loadImage("Images/Speed-Down.png")
  powerUpImg3 = loadImage("Images/Time-Add.png")

  powerDownImg1 = loadImage("Images/Power-Down-1.png")
  powerDownImg2 = loadImage("Images/Speed-Up.png")
  powerDownImg3 = loadImage("Images/LaserBeam2.png")

  alienImg1 = loadImage("Images/alien_1.png")
  alienImg2 = loadImage("Images/alien_2.png")
  alienImg3 = loadImage("Images/alien_3.png")
  alienImg4 = loadImage("Images/alien_4.png")

  spaceshipImg1 = loadImage("Images/space-ship-1.png")
  spaceshipImg2 = loadImage("Images/space-ship-2.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  alienGroup = createGroup()
  
  slowDownGroup = createGroup()
  scoreMultiplyGroup = createGroup()

  speedUpGroup = createGroup()
  beamGroup = createGroup()
  spaceshipGroup = createGroup()

  rocket = new Rocket(width/2, height-100)

  alien = new Alien(0)

  edges = createEdgeSprites()    
}

function draw(){
  background(bg)

  if(gameState == 0){
    fill("white")
    textSize(25)
    text("You are an alien sent on a mission to learn about planets.", windowWidth-1350,windowHeight-600)
    text("While navigating the perils of outer space,your spaceship is ", windowWidth-1350,windowHeight-570) 
    text("spotted	and reported to all planets in your vicinity. Since",windowWidth-1350,windowHeight-540)
    text("they can't directly prevent you from reaching their planet,",windowWidth-1350,windowHeight-510)
    text("because of space laws, they sent out obstacles to stop and",windowWidth-1350,windowHeight-480)
    text("confuse you. You have to dodge whatever they send your way. But",windowWidth-1350,windowHeight-450)
    text("if you can't, remember, these obstacles contain questions to",windowWidth-1350,windowHeight-420)
    text("stall your arrival, if you choose the correct option you can",windowWidth-1350,windowHeight-390)
    text("move on with your journey. You can only get question wrong",windowWidth-1350,windowHeight-360)
    text("thrice,	otherwise you have to head back to your planet and try",windowWidth-1350,windowHeight-330)
    text("again later.",windowWidth-1350,windowHeight-300)

    text("Look out for power ups like slimeballs, time-increases, or green arrows",windowWidth-1350,
    windowHeight-270)
    text("avoid red arrows, aliens, meteors and rogue spaceships",windowWidth-1350,windowHeight-240)

    text("Press Space to continue", windowWidth-1350,windowHeight-180)
  }

  if(keyDown("space")){
    gameState = 1
  }

  if(gameState == 1){
    fill("white")
    textSize(25)
    text("Score : "+score, 25,30)
    text("Lives : "+lives, 25,60)

    if(frameCount % 60==0){
      spaceship = new Spaceship()
    }
  
    if(spaceshipGroup.isTouching(rocket.sprite)){
      spawnSpaceship()
      shipState = 'ON'
    }

    if(shipState=='ON'){
      ship.bounceOff(edges[0])
      ship.bounceOff(edges[1])   
      ship.x = rocket.sprite.x 
    
      if(frameCount % 25==0){
      beam = createSprite(ship.x, ship.y)
      beam.addImage("laserBeam", laserImg2)
      beam.scale = 0.5
      beam.velocityY = 8
      beam.lifetime = 100
      beamGroup.add(beam)
      if(beam.y<ship.y){
        beam.x != ship.x
        beam.y != ship.y
      }
    } 
    setTimeout(setShipState,20000)
  }
    
    if(frameCount % 20==0){
    normalScore()
  }

  if(frameCount % 250 == 0){
    slowDown = new SlowDown()  
  }

  for(var i = 0; i<slowDownGroup.length;i++){
    if(slowDownGroup[i].isTouching(rocket.sprite)){
      powerState = 'ON'
      slowDownGroup.destroyEach()
    }
  }

  if(powerState=='ON'){
    slowDownEnemy()
    setTimeout(setSpeed,20000)
  }

  if(frameCount % Math.round(random(150,200)) == 0){
    speedUp = new SpeedUp()  
  }

  for(var i = 0; i<speedUpGroup.length;i++){
    if(speedUpGroup[i].isTouching(rocket.sprite)){
      powerState = 'SPEED'
      speedUpGroup.destroyEach()
    }
  }

  if(powerState=='SPEED'){
    speedUpEnemy()
    setTimeout(setSpeed,20000)
  }


  if(frameCount % Math.round(random(200,300))==0){
    scoreMultiply = new ScoreMultiply()
  }

  for(var i = 0; i<scoreMultiplyGroup.length;i++){
    if(scoreMultiplyGroup[i].isTouching(rocket.sprite)){
      scoreState = 'ON'
      scoreMultiplyGroup.destroyEach()
    }
  }

  if(scoreState=='ON'){
    scoreMultiplier()
    setTimeout(normalScore,20000)
  }

  if(alienGroup.isTouching(rocket.sprite)){
    score -=100
    alienGroup.destroyEach()
  }  

  rocket.move()
  alien.spawnAlien()
  }
 
  drawSprites()
}

function slowDownEnemy(){
  alienGroup.setVelocityYEach(4)
}

function speedUpEnemy(){
  alienGroup.setVelocityYEach(16)
}

function setSpeed(){
  alienGroup.setVelocityYEach(8)
  powerState = 'OFF'
}

function scoreMultiplier(){
  score +=10
}

function normalScore(){
  score += 5
  scoreState = 'OFF'
}

function spawnSpaceship(){
  ship = createSprite(windowWidth/2, 150)        
  ship.velocityX = 8
  spaceshipGroup.destroyEach()

  var rand = Math.round(random(1,2))
  switch(rand){
      case 1 : ship.addImage("1", spaceshipImg1)
               ship.scale = 0.3
      break
      case 2 : ship.addImage("2", spaceshipImg2)
               ship.scale = 2.5
      break
  }
}

function setShipState(){
  shipState = 'OFF'
  beamGroup.destroyEach()
  ship.destroy()
}
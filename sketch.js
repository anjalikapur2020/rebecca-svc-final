//Backgrounds
var bgwait, bgwaitimg;
var bglevel1, bglevel1img;
var bginfo, bginfoimg;

//Buttons
var leftArrow, leftArrowImg, rightArrow, rightArrowLeft;
var play, playImg, story, storyImg;
var setting, settingImg, reload, reloadImg;
var info, infoImg;
var level,levelimg;

//Animals
var rightshark, rightsharkImg, rightsharkGroup, leftshark, leftsharkImg, leftsharkGroup;
//var bomb, bombImg;
var crab, crabImg, crabGroup;
var fish1, fish1Img, fish1Group, fish2, fish2Img, fish2Group;
var scubadiver, scubadiverImg;
var treasure, treasureImg;

var gamestate="wait"
var score;
var lives;
var restart;


function preload(){
    bgwaitimg=loadImage("wait.gif");

    leftArrowImg=loadImage("LeftArrow.jpg");
    rightArrowImg=loadImage("RightArrow.jpg");
    playImg=loadImage("Play.jpg");
    settingImg=loadImage("Setting.jpg");
    storyImg=loadImage("Story.jpg");
   // infoButton=loadImage("InfoButton.jpg");
    levelimg=loadImage("level1.gif");

    rightsharkImg=loadImage("rightshark.gif");
    leftsharkImg=loadImage("leftshark.gif");
    crabImg=loadImage("crab.gif");
    fish1Img=loadImage("fish1.gif");
    fish2Img=loadImage("fish2.gif");
    //bombImg=loadImage("Bomb.png");
    scubadiverImg=loadImage("scubadiver.gif");
    treasureImg=loadImage("treasure.jpg")

    bgsetting=loadImage("bgsetting.gif")

    dieSound=loadSound("diesound.mp3")
    playSound=loadSound("playsound.mp3")
    winSound=loadSound("winsound.mp3")
}


function setup(){
createCanvas(windowWidth,windowHeight)

    bgwait =createSprite(1,1,1,1)
    bglevel1 =createSprite(1,1,1,1)
   // bgwait.visible=false
   // bglevel1.visible=false


    //Buttons
    leftArrow =createSprite(50,50,100,100);
    leftArrow.addImage(leftArrowImg)

    rightArrow =createSprite(50,520,100,100);
    rightArrow.addImage(rightArrowImg)

    play =createSprite(698,windowHeight-windowHeight/1.6,100,100);
    play.addImage(playImg)
    play.scale=2.04;

    story =createSprite(698,windowHeight-windowHeight/2.4,100,100);
    story.addImage(storyImg)
    story.scale=2;

    setting =createSprite(50,520,100,100);
    setting.addImage(settingImg)

    /*info = createSprite(windowWidth-100,50,100,100);
    info.addImage(infoButton)
    info.scale=0.7*/

    playSound.loop()
    //Animals
    rightshark = createSprite(800,420,100,100);
    rightshark.addImage(rightsharkImg)
    rightshark.scale=0.5

    leftshark = createSprite(950,425,100,100);
    leftshark.addImage(leftsharkImg)
    leftshark.scale=0.8

    fish1Group = new Group();
    fish2Group = new Group();
    crabGroup = new Group();
    leftsharkGroup = new Group();
    rightsharkGroup = new Group();

    scubadiver = createSprite(850,420,100,100);
    scubadiver.addImage(scubadiverImg)
    scubadiver.scale=0.3
/*
    bomb = createSprite(600,400,100,100);
    bomb.addImage(bombImg)
    bomb.scale=0.3*/

    /*treasure = createSprite(730,450,100,100);
    treasure.addImage(treasureImg)
    treasure.scale=1.5*/
    
    scubadiver.setCollider("rectangle",40, 40, 1000, 200, 0);
    scubadiver.debug = false
    scubadiver.visible=false
    

    sharkGroup = new Group()
    score = 0;
    lives = 3;
}

function draw(){
   background(bgwaitimg)
  
   /*fishes1();
   fishes2();
   crabs();
   leftsharks();
   rightsharks();*/

   if (keyDown("up")) {
     scubadiver.y = scubadiver.y -5;
   }
  
   if (keyDown("down")) {
     scubadiver.y = scubadiver.y +5;
   }


   if (keyDown("right")) {
     scubadiver.x = scubadiver.x +5;
   }

   if (keyDown("left")) {
     scubadiver.x = scubadiver.x -5;
   }

   /*if(fish1Group.isTouching(scubadiver)){
    fish1Group.destroyEach();
    score++;
  }*/

  for (var i=0; i<fish1Group.length;i++){
    if (fish1Group.get(i).isTouching(scubadiver)){
      fish1Group.get(i).destroy();
    score++;
    }
  }
  
 /* if(fish2Group.isTouching(scubadiver)){
    fish2Group.destroyEach();
    score++;
  }*/

  
  for (var a=0; a<fish2Group.length;a++){
    if (fish2Group.get(a).isTouching(scubadiver)){
      fish2Group.get(a).destroy();
    score++;
    }
  }
  
 /* if(crabGroup.isTouching(scubadiver)){
    crabGroup.destroyEach();
    score++;
  }
*/


for (var a=0; a<crabGroup.length;a++){
  if (crabGroup.get(a).isTouching(scubadiver)){
    crabGroup.get(a).destroy();
  score++;
  }
}
 /* if(sharkGroup.isTouching(scubadiver)){
    sharkGroup.destroyEach();
    lives--;
  }*/


  
for (var a=0; a<sharkGroup.length;a++){
  if (sharkGroup.get(a).isTouching(scubadiver)){
    sharkGroup.get(a).destroy();
    dieSound.play()
  lives--;
  }
}
  

  if(lives<1){
    gamestate="end";
    scubadiver.visible=false
    textSize(150)
    fill("lime")
    stroke(0)
    strokeWeight(5)
    text("Game Over",windowWidth/4,windowHeight/2)
  }


    if(gamestate==="wait"){
        bgwait.visible=true
 
        leftArrow.visible=false
        rightArrow.visible=false
        leftshark.visible=false
        rightshark.visible=false
        //treasure.visible=false
        //bomb.visible=false
        
    }

    if(gamestate==="end"){
      fish1Group.destroyEach();
      fish2Group.destroyEach();
      crabGroup.destroyEach();
      sharkGroup.destroyEach();
    }
    //Story
    if(mousePressedOver(story) ){
        gamestate="story"

        //text("You have sunk into the deep sea and lost your crew! Collect fishes but avoid dangerous creatures and objects")
        leftArrow.visible=true

    }

    if(gamestate==="story"){

        textSize(35)
        stroke(0)
        strokeWeight(3)
        fill("lime")

        text("After falling out of your ship, you have woken up at the bottom of the sea.", 150,180)
        text("You see new species of fish so you decide to collect them", 150,230)
        text("but you know that the sharks down there have a dangerous bite", 150,280)
       // text("so you need to avoid them and the bombs are also falling into the sea!", 220,300)
        text("Collect 25 Fishes and water creatures to Get Lucky and discover a TREASURE", 150,330)
        textSize(50)
        //fill("white")
        text("Avoid Sharks !",600,550)

        leftArrow.visible=true
        rightArrow.visible=false
        setting.visible=false
        //info.visible=false
        play.visible=false
        story.visible=false

        leftshark.visible=true
        rightshark.visible=true
        //bomb.visible=true
       
    }

    //LeftArrow Button
    if (mousePressedOver(leftArrow)){
        gamestate="wait"
        leftArrow.visible=false
        rightArrow.visible=false
        setting.visible=true
       // info.visible=true
        play.visible=true
        story.visible=true
        scubadiver.visible=false
    }

    if(gamestate==="back"){
        background("cyan")
    }

    //RightArrow Button
    if (mousePressedOver(rightArrow)){
        leftArrow.visible=true
        gamestate="forward"
            }

    if(gamestate==="forward"){
        background("green")
    }
        

    //Play Button
    if(mousePressedOver(play)){
       // background("yellow")
        bgwait.visible=false
        leftArrow.visible=true
        gamestate="play"
    }
    if(gamestate==="play"){
        background(levelimg)
        stroke("white")
        textSize(30);
        fill("white")
        text("Creatures Collected: "+ score, 550,150);
        text("Lives: "+ lives, 600,200);

        if(score>=25){
          background(treasureImg)
          //treasure.visible=true
          sharkGroup.destroyEach();
          //fish1Group.destroyEach();
          //fish2Group.destroyEach();
          //crabGroup.destroyEach();
          setting.visible=false
          leftArrow.visible=false
          playSound.stop()
          winSound.play()

          textSize(50)
          fill("lime")
          stroke(0)
          strokeWeight(5)
          text("You've Unlocked Treasure!",430,windowHeight/2)

        }
        rightArrow.visible=false
        play.visible=false
        story.visible=false
        fishes1();
   fishes2();
   crabs();
   //leftsharks();
  // rightsharks()
  sharks()
   scubadiver.visible=true

    }

    //Settings
    if(mousePressedOver(setting)){
        //background("magenta")
        
        
       // bgwait.visible=false
        //leftArrow.visible=true
        gamestate="setting"
    }

    if(gamestate==="setting"){
     background(bgsetting)
       
        textSize(30)
        fill("blue")

        text("Controls:", 200,150)
        text(" Up-Arrow => Move Up ", 200,200)
        text(" Down-Arrow => Move Down ", 200,250)
        text(" Left-Arrow => Move Left ", 200,300)
        text(" Right-Arrow => Move Right ", 200,350)
        text("Caution => Avoid Sharks and Bombs !! ", 200,400)



        leftArrow.visible=true
        rightArrow.visible=false
        setting.visible=false
        //info.visible=false
        play.visible=false
        story.visible=false
    }

    //Information Button
   /* if(mousePressedOver(info)){
        background("red")
        bgwait.visible=false
        leftArrow.visible=true
        gamestate="info"
    }

    if(gamestate==="info"){
        background(rgb(34, 59, 143))

        leftArrow.visible=true
        rightArrow.visible=false
        setting.visible=false
        info.visible=false
        play.visible=false
        story.visible=false
    }*/

    textSize(50)
    fill("white")
    text("Scuba Diver", windowWidth/2-150,100)

    drawSprites()

}

function fishes1(){
    if(World.frameCount%80 === 0){
      fish1 = createSprite(width,76,100,100);
      fish1.scale = 0.3;
      fish1.addImage("fish1",fish1Img);
      fish1.y = Math.round(random(100,windowHeight-100));
      fish1.velocityX = -5;
      fish1.setLifetime = 50;
      
      fish1Group.add(fish1);
    }
  }
  function fishes2(){
    if(World.frameCount%90 === 0){
      fish2 = createSprite(0,0,100,100);
      fish2.scale = 0.3;
      fish2.addImage("fish2",fish2Img);
      fish2.y = Math.round(random(100,windowHeight-100));
      fish2.velocityX = 5;
      fish2.setLifetime = 50;
      
      fish2Group.add(fish2);
    }
  }
  function crabs(){
    if(World.frameCount%85 === 0){
      crab = createSprite(width,76,100,100);
      crab.scale = 0.3;
      crab.addImage("crabfish",crabImg);
      crab.y = Math.round(random(100,windowHeight-100));
      crab.velocityX = -5;
      crab.setLifetime = 50;
      
      crabGroup.add(crab);
    }
  }
 /* function leftsharks(){
    if(World.frameCount%80 === 0){
      leftshark = createSprite(0,200,100,100);
      leftshark.scale = 1.5;
      leftshark.addImage("leftshark",leftsharkImg);
      leftshark.y = Math.round(random(80,800));
      leftshark.velocityX = 5;
      leftshark.setLifetime = 50;
      
      leftsharkGroup.add(leftshark);
    }
  }
  function rightsharks(){
    if(World.frameCount%80 === 0){
      rightshark = createSprite(width,200,100,100);
      rightshark.scale = 0.75;
      rightshark.addImage("rightshark",rightsharkImg);
      rightshark.y = Math.round(random(80,800));
      rightshark.velocityX = -5;
      rightshark.setLifetime = 50;
      
      rightsharkGroup.add(rightshark);
    }
  }*/

  function sharks(){
    if(World.frameCount%200 === 0){
      shark = createSprite(width,200,100,100);
      shark.y=Math.round(random(100,windowHeight-100))

      rand=Math.round(random(1,2))

      switch(rand){
        case 1: shark.addImage("rightshark",rightsharkImg)
        shark.scale = 0.5;
        shark.velocityX=-15
        break;

        case 2: shark.addImage("leftshark",leftsharkImg)
         shark.scale = 1;
         shark.x=0
         shark.velocityX=15
        break;
      }
      
      shark.setLifetime = 50;
      
  sharkGroup.add(shark);
    }
  }


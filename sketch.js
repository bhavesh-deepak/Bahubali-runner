var bahu, bahuImg, fall, fallImg,invisible;
var invisibleGroup,invisible2,invisible2Group;
var bg,bg1,bg2,bg3,bg4,amar,amarendra;
var downrock,downrockImg;
var sound;
var start,startImg;
var avantika,avantikaImg,avantikaGroup;
var rock,rockImg,rockGroup;
var LEVEL1=1;
var END=0;
var BEGINNING=2;
var RULES=3;
var gameState=BEGINNING;
var invisible,invisibleGroup;
var villain,villainImg,villainGroup;
var castle,castleImg,castleGroup;
var stone, stoneImg,stoneGroup;
var count,bahuArrow;
var arrow,arrowImg,arrowGroup;
var edges,mes1=" ";
var lotus,lotusImg,fire,fireImg,fireGroup,lotusGroup;
var rules,rulesImg,home,homeImg;
var butterfly,butterfltImg,butterflyGroup;
var butterfly1,butterfly2;
var score=0;
var again,againImg;
var count=300;


function preload(){
  fallImg=loadImage("water.jpg");
  bahuImg=loadImage("bahubali.jpg");
  sound=loadSound("amar.mp3");
  avantikaImg=loadImage("bahubali-heroine.jpg");
  rockImg=loadImage("images-removebg-preview.png");
  bg1=loadImage("bahubali-athirapally-scene.jpg");
  startImg=loadImage("bahubali.png");
  castleImg=loadImage("castle-removebg-preview.png");
  villainImg=loadImage("Baahubali_Rana-removebg-preview (2).png");
  stoneImg=loadImage("stone-removebg-preview.png");
  bahuArrow=loadAnimation("arrow2.png","arrow3.png","arrow2.png");
  arrowImg=loadImage("bahu-removebg-preview.png");
  lotusImg=loadImage("Lotus.jpg");
  
   fireImg=loadAnimation("fire1.png","fire2.png");
  rulesImg=loadImage("win-removebg-preview (1).png");
  homeImg=loadImage("home-removebg-preview (1).png");
  butterflyImg=loadAnimation("butterfly-removebg-preview.png","butterfly-removebg-preview (1).png");
  bg3=loadImage("killing.jpeg");
  bg4=loadImage("white.png");
  amar=loadImage("bahus.jpg");
  downrockImg=loadImage("downrock.jpg");
  againImg=loadImage("bahus-1.jpg");
}

function setup() {
  edges= createEdgeSprites();
  
  sound.loop();
  
  createCanvas(600,600);
  fall=createSprite(300,300,600,600);
  fall.addImage("fall",fallImg);
  fall.addImage("kill",bg3);
  fall.velocityY=1;
  fall.scale=2;
  
  again=createSprite(100,75);
  again.addImage(againImg);
  again.visible=false;
  again.scale=0.3;
  
 // amarendra=createSprite(300,300,600,600);
 // amarendra.addImage("amarendra",amar);
 // amarendra.visible=false;
 
  bahu=createSprite(300,0,50,50);
  bahu.addImage("bahu",bahuImg);
  bahu.scale=0.2;
  bahu.setCollider("rectangle",0,0,200,bahu.height);
  bahu.addAnimation("arrow",bahuArrow);
  
  bg=createSprite(300,300);
  bg.addImage("climb",bg1);
  bg.addImage("kill",bg3);
  bg.addImage("white",bg4);
  
  downrock=createSprite(300,550);
  downrock.addImage("rock",downrockImg);
  downrock.visible=false;
  downrock.velocityY=1;
  downrock.scale=0.40;
  downrock.setCollider("rectangle",0,-20,downrock.width,downrock.height+90)
  
  start=createSprite(500,500);
  start.addImage(startImg);
  start.scale=0.3;
  
  rules=createSprite(500,420);
  rules.addImage(rulesImg);
  rules.scale=0.6;
  
  home=createSprite(400,30);
  home.addImage(homeImg);
  home.visible=false;
  home.scale=0.5;
  
  score=0;
  
  avantikaGroup=new Group();
  rockGroup=new Group();
  invisibleGroup=new Group();
  stoneGroup=new Group();
  villainGroup=new Group();
  castleGroup= new Group();
  arrowGroup=new Group();
  fireGroup=new Group();
  lotusGroup=new Group();
  butterflyGroup = new Group();
  invisible2Group=new Group();
}

function draw() {
  if(fall.y>600){
    fall.y=fall.height/4;
  }
  
  fall.scale=2;
  
  if(frameCount%1000===0){
    count=count-10;
  }
  
  if(gameState===LEVEL1){

    downrock.visible=true;
    again.visible=false;
    
    fall.velocityY=1;
    
    bg.visible=false;
    bahu.visible=true;
    fall.visible=true;
    start.visible=false;
    rules.visible=false;
    mes1.visible=false;
    
    bahu.bounceOff(edges[2]);
    bahu.bounceOff(edges[1]);
    bahu.bounceOff(edges[0]);
    bahu.bounceOff(downrock);
    
    fall.changeImage("fall",fallImg);
    
    //bahu.y=0;
    
   // bahu.changeImage("bahu",bahuImg)
  
    if(keyDown('left_Arrow')){
    bahu.x=bahu.x-5;
  }
  
  if(keyDown('right_Arrow')){
    bahu.x=bahu.x+5;
  }
  
  if(keyDown('up_Arrow')){
    bahu.velocityY=-8;
  }
    
  bahu.velocityY=bahu.velocityY+0.8;
  
  tamannaah();
  spawnRock();
    
    spawnVillain1();

    if(bahu.isTouching(invisible2Group)){
      bahu.velocityY=0;
    }
    
    if(keyWentDown("Space")){
      bahu.changeAnimation("arrow",bahuArrow);
      bahu.scale=0.3; 
      
    }else if(keyWentUp("Space")){
      bahu.changeAnimation("bahu",bahuImg);
      bahu.scale=0.2;
      spawnArrow();
    }
    
     bahu.setCollider("rectangle",0,-50,bahu.width,bahu.height+150);
    
     if(arrowGroup.isTouching(rockGroup)){
      arrowGroup.destroyEach();
    }
    
    if(arrowGroup.isTouching(castleGroup)||
       arrowGroup.isTouching(villainGroup)){
       fire.visible=true;
       castle.velocityY=5;
       villain.velocityY=5;
       fire.velocityY=5;
       arrowGroup.destroyEach();
       score=score+5;
    }

    if(arrowGroup.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      lotus.visible=true;
      lotus.velocityX=0;
      score=score+10;
      arrowGroup.destroyEach();
    }
    
    if(bahu.isTouching(avantikaGroup)){
      avantika.visible=false;
      if(frameCount*0===0){
      spawnButterfly();
      }
      home.visible=false;
    }
        if(stoneGroup.isTouching(bahu)||
       bahu.y>600||
       invisibleGroup.isTouching(bahu)){
       gameState=END;
       bahu.visible=false;
       bg.changeImage("kill",bg3);
  }
  }else if(gameState===END){
    //sound.stop();
    fall.changeImage("kill",bg3);
    fall.scale=0.9;
    fall.y=300;
    fall.velocityY=0;
    start.visible=false;
    rules.visible=false;
    avantikaGroup.destroyEach();
    castleGroup.destroyEach();
    arrowGroup.destroyEach();
    stoneGroup.destroyEach();
    villainGroup.destroyEach();
    rockGroup.destroyEach();
    fireGroup.destroyEach();
    stoneGroup.destroyEach();
    invisibleGroup.destroyEach();
    invisible2Group.destroyEach();
    avantikaGroup.setVelocityYEach(0);
    avantikaGroup.setVelocityXEach(0);
    villainGroup.setVelocityXEach(0);
    villainGroup.setVelocityYEach(0);
    again.visible=true;
    again.x=300;
    again.y=300;
    score=0;
    
    if(mousePressedOver(again)){
      gameState=BEGINNING;
    }
    
  }else if(gameState===BEGINNING){
    bg.changeImage("climb",bg1);
    fall.visible=true;
    bahu.visible=false;
    start.visible=true;
    rules.visible=true;
    home.visible=false;
    bg.visible=true;
    bg.scale=2.5;
    again.visible=false;
    
    if(mousePressedOver(start)){
       gameState=LEVEL1;
       bahu.y = 0;
       downrock.y=550;
       bahu.changeImage("bahu",bahuImg);
       count=300;
       }
    if(mousePressedOver(rules)){
      gameState=RULES;
    }
    }else if(gameState===RULES){
   home.visible=true;
   bg.visible=true;
   fall.visible=false;
   rules.visible=false;
   start.visible=false;
   again.visible=false;
   bg.changeImage("white",bg4);
      
    if(mousePressedOver(home)){
      gameState=BEGINNING;
    }
    }
  drawSprites();
  
  if(gameState===BEGINNING){
    mes1="         BAHUBALI \n THE OFFICIAL GAME"
   stroke("white");
   textSize(20);
   fill ("white");
   text(mes1,350,300);
  }
  if(gameState===LEVEL1){
   stroke("black");
   textSize(20);
   fill ("black");
   text("Score: " + score,500,50);
  }
  if(gameState===RULES){
   stroke("black");
   textSize(20);
   fill ("black");
   message();
   text(mes1,10,50);
  }
}

function tamannaah(){
  if(frameCount%750===0){
  avantika=createSprite(200,200);
  avantika.addImage(avantikaImg)
  avantika.x=100||500;
  avantika.y=Math.round(random(200,400));
  avantika.velocityY=1;
  avantika.lifetime=100;

    if(avantika.x===100){
      avantika.velocityX=2;
    }else if(avantika.x===500){
      avantika.velocityX=-2;
    }
    
    avantika.depth=fall.depth;
    avantika.depth=stoneGroup.depth;
     avantika.depth=rockGroup.depth;
    avantika.depth=arrowGroup.depth;
    avantika.depth=avantikaGroup.depth+1;
    avantika.scale=0.3;
    avantikaGroup.add(avantika);
}
}
function spawnRock(){ 
      if(frameCount%count===0){
     rock=createSprite(500,-30,50,50);
     rock.velocityY=1;
     rock.x=Math.round(random(100,425));
     rock.addImage(rockImg);
     rock.scale=0.3;
     rockGroup.add(rock);
     rock.setCollider("rectangle",0,-10,rock.width-60,rock.height-60);
  
        
    invisible=createSprite(200,-25,45,2);
    invisible.velocityY=1;
    invisible.lifetime=600;
    invisible.x=rock.x;
    invisibleGroup.add(invisible);
    invisible.visible=false;
        
        invisible2=createSprite(200,-90,60,2);
        invisible2.velocityY=1;
        invisible2.lifetime=600;
        invisible2Group.add(invisible2);
        invisible2.x=rock.x;
        invisible2.visible=false;
   }
}
function spawnVillain1(){
  if(frameCount%450===0){
    villain=createSprite(550,-15,5,5);
    villain.addImage(villainImg);
    villain.velocityY=1;
    villain.lifetime=600;
    villainGroup.add(villain);
    villain.scale=0.2;
    
    castle=createSprite(550,-15,villain.width,2); 
    castle.velocityY=1;
    castle.addImage(castleImg);
    castle.lifetime=600;
    castle.x=villain.x;
    castle.y=villain.y+50;
    castleGroup.add(castle);
    castle.scale=0.3;
    
    castle.depth=villain.depth;
    castle.depth=castle.depth+1;
    
    fire=createSprite(600,-15);
    fire.velocityY=1;
    fire.addAnimation("fire",fireImg);
    fire.x=villain.x;
    fire.y=villain.y+50;
    fire.visible=false;
    fireGroup.add(fire);
    fire.scale=0.35;
    
  
            if(villain.x>10){
          stone=createSprite(50,-5);
          stone.x=villain.x;
          stone.addImage(stoneImg);
          stone.velocityX=-3;
          stone.velocityY=3;
          stone.scale=0.2;    
          stoneGroup.add(stone);
          stone.lifetime=600;
          stone.setCollider("circle",0,0,80);
                        
          lotus=createSprite(50,-5);
          lotus.x=stone.x;
          lotus.y=stone.y;
          lotus.velocityY=3;
          lotus.velocityX=-3;
          lotus.addImage(lotusImg);
          lotus.scale=0.2;
          lotusGroup.add(lotus);
          lotus.visible=false;
    } 
  }
}
function spawnArrow(){
  arrow=createSprite(500,100);
  arrow.x=bahu.x;
  arrow.y=bahu.y;
  arrow.velocityY=0; 
  arrow.velocityX=2;                                     
  arrow.addImage(arrowImg);
  arrowGroup.add(arrow);
  arrow.scale=0.3;
  arrow.lifetime=600;
  arrow.setCollider("circle",150,0,30)
}
function message(){
  mes1= "Story:\n \n When Bhallaladeva conspires against his brother \n Amarendra Bahubali, to become the king of Mahishmati, \n  orders Kattappa to assassinate Amarendra Bahubali, \n and imprisons his wife Devasena.\n Help Mahendra Bahubali to reach Mahishmathi and to \n avenge his father's death..... \n \nFunctions:\n \n Use Arrow keys to control bahubali.. \n Use Space key to fire an arrow.. \n There will be some rock in which you can stand (NB:Dont touch  \n the rock from down.)..\n \n How to earn points:\n \n You should fire an arrrow to Bhallaladeva.(5 points) \n or to the stone that is thrown by Bhallaladeva(10 points) \n to earn points...\n Make sure that the stone that is thrown by Bhallaladeva \n is not touching you.. "
}

function spawnButterfly(){
    butterfly1=createSprite(200,200);
  butterfly1.addAnimation("bluebutterfly",butterflyImg);
    butterfly1.x = avantika.x;
    butterfly1.y = avantika.y;
    butterfly1.velocityX = avantika.velocityX;
    butterfly1.velocityY = avantika.velocityY;
    butterfly1.scale=0.1
    butterflyGroup.add(butterfly1);
    butterfly1.lifetime=15;
    butterfly1.visible=false;
  
    butterfly=createSprite(200,200);
    butterflyGroup.add(butterfly);
    butterfly.x=butterfly1.x-Math.round(random(75,125));
    butterfly.y=butterfly1.y-Math.round(random(75,125));
    butterfly.velocityX=-2||2;
    butterfly.addAnimation("blue butterfly",butterflyImg);
    butterfly.lifetime=15;
    butterfly.scale=0.1;
    
  
  butterfly2=createSprite(200,200);
  butterflyGroup.add(butterfly2);
  butterfly2.x=butterfly1.x+Math.round(random(10,50));
  butterfly2.y=butterfly1.y+Math.round(random(10,50));
  butterfly.velocityX=-2||2;
  butterfly2.addAnimation("blue butterfly",butterflyImg);
  butterfly2.lifetime=15;
  butterfly2.scale=0.1;
}

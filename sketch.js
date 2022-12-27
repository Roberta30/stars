const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;
var ar;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var e1, e2, eImg;

var placar, ruim, medio, boa;
var placarN = 0;
var c1 = false;
var c2 = false;
var c3 = false;
var c4 = false;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  eImg = loadImage("star.png");
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  er = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  ruim = loadAnimation("empty.png");
  medio = loadAnimation("one_star.png");
  boa = loadAnimation("stars.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  e1 = createSprite(320, 50, 20, 20);
  e1.addImage(eImg);
  e1.scale = 0.02;

  e2 = createSprite(120, 300, 20, 20);
  e2.addImage(eImg);
  e2.scale = 0.02;

  ar = createImg("baloon2.png");
  ar.position(260, 370);
  ar.size(120, 120);
  ar.mouseClicked(Ar);

  placar = createSprite(50, 20, 30, 30);
  placar.scale = 0.2;
  placar.addAnimation("ruim", ruim);
  placar.addAnimation("medio", medio);
  placar.addAnimation("boa", boa);
  placar.changeAnimation("ruim");

  //botão 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(8,{x:200,y:90});
   rope2 = new Rope(7,{x:400,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(550,50);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,700,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(120,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,600,700);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit, bunny, 80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit, e1, 20) == true && placarN == 0 && c1 == false){
    placarN = 1;
    c1 = true;
  } 

  if(collide(fruit, e2, 20) == true && placarN == 1 && c2 == false && c1 == true){
    placarN = 2;
    c2 = true;
  }

  if(collide(fruit, e2, 20) == true && placarN == 0 && c3 == false){
    placarN = 1;
    c3 = true;
  }

  if(collide(fruit, e1, 20) == true && placarN == 1 && c4 == false && c3 == true){
    placarN = 2;
    c4 = true;
  }

  if(collide(fruit, e1, 20) == true){
    e1.destroy();
  }

  if(collide(fruit, e2, 20) == true){
    e2.destroy();
  }

  if(placarN == 1){
    placar.changeAnimation("medio");
  }

  if(placarN == 2){
    placar.changeAnimation("boa");
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body, sprite, area)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=area)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function Ar(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0, y:-0.03});
  er.play();

}
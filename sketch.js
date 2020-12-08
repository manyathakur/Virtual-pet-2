var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var milk

function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happy dog.png");
   milk=loadImage("Milk.png")
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,400,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  // for(var i=50; i<500; i=i+50){
  //   var m=createSprite(i, 200, 10,10)
  //   m.addImage("milk", milk)
  //   m.scale=0.05
  // }

  // for(var i=50; i<500; i=i+50){
  //   var m=createSprite(i, 300, 10,10)
  //   m.addImage("milk", milk)
  //   m.scale=0.05
  // }

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 


  b1=createButton("Feed the dog")
  b1.position(500,100)

  b2=createButton("Add feed")
  b2.position(600,100)

  b1.mousePressed(feed)
  b2.mousePressed(addfeed)
}

// function to display UI
function draw() {
  background(46,139,87);
 
  var x=80,y=100;
      
  imageMode(CENTER);
  image(milk,720,220,70,70);
  
  if(foodS!=0){
    for(var i=0;i<foodS;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(milk,x,y,50,50);
      x=x+30;
    }
  }
  

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,100);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
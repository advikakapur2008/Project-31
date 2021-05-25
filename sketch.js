var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var particle;
var turn;
var gameState = "play";
var count = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {   
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 25; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 5; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,375));
  }

  
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : " + score, 20,30);
  text("200",30,550);
  text("100",95,550);
  text("500",175,550);
  text("700",250,550);
  text("1000",335,550);
  text("900",415,550);
  text("300",495,550);
  text("800",590,550);
  text("400",655,550);
  Engine.update(engine);
  //ground.display();
  
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }

  /*if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30, width/2-10, 10, 10)));
    score++;
  }*/

  /*for(var j = 0; j < divisions.length; j++){
      particles[j].display();
  }*/
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle!=null){
    particle.display();
    if(particle.body.position.y > 760){
      if(particle.body.position.y < 300){
        score=score+500
        particle=null;
        if(count>=5) gameState="end";
      }
      else if(particle.body.position.x < 600 && particle.body.position.x > 301){
        score=score+100;
        particle=null;
        if(count>=5) gameState="end";
      
      }
      else if(particle.body.position.x < 900 && particle.body.position.x > 601){
        score=score+200;
        particle=null;
        if(count>=5) gameState="end";
      }
    }
  }
}

function mousePressed(){
  if(gameState!=="end"){
    count++;
    particle = new Particle(mouseX,10,10,10);
  }
}
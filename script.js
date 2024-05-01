/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Erika C. Montes
 * Game Name: The Mew Meow
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash";
var player1;
var timer;
var testPac; // pac on gameOver screen
var testBox; // a cherry on splash and game over screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0)

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 7/8);
  console.log(player1);

  timer = new Timer(30000); //30 seconds
  console.log(timer);
  dropTimer = new Timer(1000);// 1 second
  testBox = new Box(width/2, height/3);
  testPac = new Player(width/3, height/3);

}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch(gameState){
    case "splash" : 
    splash();
    break;
    case "play" :
      play();
      break;
      case "gameOver" :
        gameOver();
        break;
        default :
        console.log("no match found!");
  }
}

function splash() {
  // this is what you would see when the game starts
  background(240, 200, 240);
  fill(200, 100, 200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(220, 200, 240);
  fill(200, 100, 200)///-pastel-fuchsia?
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens!", width / 2, height / 4.5);
  player1.x = mouseX;
  player1.y = mouseY
  player1.display();
  player1.move()

  if (timer.isFinished()) {
     gameState = "gameOver"
    }

  if(dropTimer.isFinished()){
    let p = new Box(random(width), -40);  // new box, anywhere across the width of the canvas, but 40px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array
    dropTimer.start(); // restart timer for next drop
    }

    for(let i = 0; i < presents.length; i++) { 
        // for each element of the array, represented by 'i', do the following:
        presents[i].display(); // draw it on the canvas
        presents[i].move(); // make it drop
        presents[i].spin() // make it rotate

      if(presents[i].y > height) { // present went below the canvas
       presents.splice(i, 1); // remove 1 element from from "presents" at index 'i'
       score--; // decrement score by 1
     }
    
     let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
     if(d < 50){
      presents.splice(i, 1);
      score ++; // add 1 point
     }
    }//end of for() loop

textAlign(LEFT);
text("Elapsed time: " + timer.elapsedTime, 10, 20);
// show elapsed time in top left corner
text("Score: " + score, 20, 40);

}

function gameOver() {
  // this is what you see when the game ends
  background(0, 0, 0, 220);
  fill(190, 90, 190);
  textAlign(CENTER);
  textSize(46);
  textFont('Shine Typewriter')
  text("Game Over!", width / 2, height / 5.5);
  textSize(36);
  text("Your final score: " + score, width/2, height * 1.7/3);
  testBox.display();
  testBox.spin();
  testPac.display();
  //testPac.move();
}

function mousePressed() {

  console.log("click!");
  if(gameState == "splash") {
    gameState = "play";
    timer.start();
    dropTimer.start();
    score = 0; // reset score to 0 at start of game
  } else if(gameState == "play") {
    // gameState = "gameOver";
  } else if(gameState == "gameOver") {
    gameState = "splash";
  }
  console.log(gameState);
}

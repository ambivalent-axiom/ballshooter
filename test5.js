function setup() {createCanvas(400, 400);}function draw() {
//***************************************************************
  //global vars
  var backgroundColor = color(158, 178, 169);
  var shipColor = color(131, 151, 142);
  var attackColor = color(120, 120, 120);
  var wallColor = color(111, 151, 133);
  var bulletColor = color(255, 255, 255);
  var starShipPosX = 0;
  var attackers = [];
  var xPos = 195;
  var yPos = 380;

//Elements____________________________________________________________
  //ship drawing
  var drawStarship = function() {
    fill(shipColor);
    noStroke();
    ellipse(-110, 100, 13, 13);
    ellipse(-130, 100, 13, 13);
    stroke(52, 77, 65);
    strokeWeight(1);
    triangle(-110, 100, -120, 85, -130, 100);
  };
  //scrolling wall element drawing
  var wallImg = function(x, y) {
    this.x = x
    this.y = y
    stroke(wallColor);
    strokeWeight(4);
    noFill();
    rect(this.x, this.y, 23, 58);
    line(this.x, this.y, this.x+23, this.y+58);
    line(this.x+23, this.y, this.x, this.y+58);
  };

//Objects____________________________________________________________
  //starship object
  var starShip = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = drawStarship();
    this.energy = 10;
    this.score = 0;
    this.levelCounter = 0;
  };
  //bullet object
  var bullet = function() {
    for (var i = 0; i < 1; i++) {
      stroke(bulletColor);
      ellipse(xPos, yPos, 10, 10);
      yPos -= 10;
    }
  };
  //enemy model
  var attackBalls = function(x, y) {
    this.x = x;
    this.y = y;
  };






//Methods____________________________________________________________
  //starship drawing method
  starShip.prototype.draw = function() {
    this.x = constrain(this.x, -150, 160);
    applyMatrix();
    translate(315 + this.x, 290 + this.y);
    drawStarship();
    resetMatrix();
  };
  //movement to the right method
  starShip.prototype.right = function() {
    this.img = drawStarship();
    this.x += 5;
    starShipPosX = this.x;
  };
  //movement to the left method
  starShip.prototype.left = function() {
    this.img = drawStarship();
    this.x -= 5;
    starShipPosX = this.x;
  };

  //Method to check for bullet hit
  starShip.prototype.hitCheck = function(attackBalls) {
    //console.log(xPos + ' = ' + attackBalls.x);
      if (( attackBalls.x >= (xPos - 10) && attackBalls.x <= (xPos + 10)) &&
      (attackBalls.y >= (yPos - 10) && attackBalls.y <= (yPos + 10))) {
        attackBalls.x = -500;
        starShipa.score++;
        xPos = -500;
        //counting passed attackers to know when level is finished
      } else if (attackBalls.y === 400) {
         this.levelCounter++;
      }
  };
  //enemy Method
  attackBalls.prototype.draw = function(x, y) {
    fill(attackColor);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 20, 20);
  };

//Arrays____________________________________________________________
  //moving wall element
  var movingWall = [];
  for (var i = -6; i < 7; i++) {
    movingWall.push(i*62);
  }

//INSTANCES_________________________________________________________
  //creating instance of starShip
  var starShipa = new starShip(0, 0);


  //INITIALIZING ENEMIES
  for (i = 0; i < 100; i++) {
    attackers.push(new attackBalls(random(40, 260), i * 100 - 10000));
  };


//EXECUTING DRAW____________________________________________________
draw = function() {
  background(backgroundColor);
  //printing score on the screen
  text("Score " + floor(starShipa.score/2), 50, 50);

  //moving the wall
  for (var i = 0; i < movingWall.length; i++) {
    wallImg(2, movingWall[i]);
    wallImg(375, movingWall[i]);
    movingWall[i] += 1;
    if (movingWall[i] === 400) {
       movingWall[i] = -400;
    }
  }
  //drawing ENEMIES and checking for hit
  for (var i = 0; i < attackers.length; i++) {
    attackers[i].draw();
    starShipa.hitCheck(attackers[i]);
    attackers[i].y += 2;
  }

  //starship controls
  if (keyIsPressed == true && keyCode == LEFT_ARROW) {
    starShipa.left();
  } else if (keyIsPressed == true && keyCode == RIGHT_ARROW) {
    starShipa.right();
  } else if (keyPressed && keyCode == 32){
    bullet();
  };

  //Showing score and end level information
  if (starShipa.levelCounter === attackers.length) {
    noFill;
    stroke(255,0,0);
    strokeWeight(2);
    text("LEVEL COMPLETED!", 135, 130);
    text("You've Killed " + (floor(starShipa.score/2)) + " enemies!", 135, 150);
  }
  //drawing starship element
  starShipa.draw();
};
//Additional contrl func____________________________________________
  //function for shooting with space bar
keyPressed = function() {
  if (keyCode == 32) {
    xPos = starShipPosX + 195;
    yPos = 380;
  }
};

//******************************************************************
}

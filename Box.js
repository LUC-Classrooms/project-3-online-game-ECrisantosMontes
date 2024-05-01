function Box(_x, _y){
  this.x = _x;
  this.y = _y;

  this.xSpeed = 0;
  this.ySpeed = random(3, 7); // 1 - 2 (falling)
  this.rSpeed = random(-.02, .02); // rotation speed

  this.angle = 0;


  this.display = function(){

    push();
    translate(this.x, this.y);// moves new layers origin point on canvas
    rotate(this.angle);
    strokeWeight(2);
    stroke(0, 0, 0, 80);
    fill(200, 50, 100, 200);
    ellipse(-20, -10, 40, 40);
    ellipse(20, -10, 40, 40);
    noFill();
    strokeWeight(4);
    stroke(50, 100, 50, 200)
    arc(20, -55, 60, 60, HALF_PI, PI);
    arc(13, -30, 70, 70, PI, PI + QUARTER_PI);

    pop();

  }

  this.move = function() {
    this.y += this.ySpeed; // spin
  }

  this.spin = function() {
    this.angle += this.rSpeed; // spin
  }



}
/*
Game play: https://www.youtube.com/watch?v=fQoJZuBwrkU
*/

let pipes = [];
let bird;
let playing = false;

let birdImg, pipeImg, pipeRevImg, backgroundImg;

function preload() {
  birdImg = loadImage('assets/bird.png');
  pipeImg = loadImage('assets/pipes.png');
  pipeRevImg = loadImage('assets/pipes_reverse.png');
  backgroundImg = loadImage('assets/background.png');
}

function setup() {
  createCanvas(400, 600);
  frameRate(40);
  bird = new Bird(width/3, height / 3);
  bird.flap();
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
}

function draw() {
  background(backgroundImg);
  // drawLine()
  // console.log('Frame rate: ' + frameRate());
  if (frameCount % 50 == 0) {
    pipes.push(new Pipe());
    playing = true;
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offScreen()) {
      if (pipes[i].pass(bird)) {
        bird.score++;
      }
      pipes.splice(i, 1);
    }
    if (pipes[i].hit(bird)) {
      strokeWeight(8);
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, width - 80, 80);
      fill(0);
      text("Score: " +
        bird.score, width / 2, height / 2);
      playing = false;
      noLoop();
    }
  }
  // draw bird
  bird.show();
  bird.update();
  // show the current score
  if (playing) {
    text(bird.score, width / 2, height / 5);
  }
  if (pipes.length - 1 < 0) {
    text("Let's go", width / 2, height / 3);
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.flap();
  }
}

function mousePressed(){
  // click inside the canvas
  if(mouseX > 0 && mouseX < width &&
     mouseY > 0 && mouseY < height) {
    bird.flap();
  }
}


function drawLine() {
  let step = 100;
  stroke(1);
  for (let i = 0; i < height / step; i++) {
    line(0, i * step, width, i * step)
  }
}
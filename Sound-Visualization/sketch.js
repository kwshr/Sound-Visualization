//use key "2" to get a different pattern

let song;
let amplitude;
let particles = [];
const numberParticles = 1000;
const loudnessThreshold = 0.2;
let useCircles = true; 

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numberParticles; i++) {
    particles.push(new Particle());
  }
  song = loadSound('data/Damscray_DancingTiger.mp3', loaded);
  amplitude = new p5.Amplitude();
}

function loaded() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.loop();
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function draw() {
  background(0);
  let level = amplitude.getLevel();
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update(level);
    if (useCircles) {
      p.displayCircle();
    } else {
      p.displayLine();
    }
  }
}

function keyTyped() {
  if (key === '2') {
    useCircles = false;
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(1, 10);
    this.color = color(random(255), random(255), random(255), 100);
    this.speed = random(1, 3);
  }

  update(level) {
    if (level > loudnessThreshold) {
      let angle = atan2(this.y - height / 2, this.x - width / 2);
      this.x += cos(angle) * this.speed;
      this.y += sin(angle) * this.speed;
    } else {
      this.x = lerp(this.x, width / 2, 0.05);
      this.y = lerp(this.y, height / 2, 0.05);
    }
  }

  displayCircle() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius);
  }

   displayLine() {
    stroke(this.color);
    strokeWeight(random(1,5));
    let setY = (height / 2) - this.y; 
    let posY = height / 2 + setY * sin(frameCount * 0.1); 
    line(width / 2, posY, this.x, this.y);
  }
}
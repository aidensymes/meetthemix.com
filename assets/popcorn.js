var numBalls;
var spring = 1;
var friction = .9;
var dragging = false;
var dragged;
var balls = [];
var mx;
var my;
var pmx;
var pmy;
let images = [];
var gameWidth;
var gameHeight;

$(document).ready(function() {
  $(window).on('resize', function(e) {
    setup();
  });
});

function preload() {
  for(var i = 0; i < 10; i++){
    images[i] = loadImage('/assets/popcorn' + i + '.png');
  }
}

function setup() {
  gameWidth = $(window).width();
  gameHeight = $(window).height();
  canvas = createCanvas(gameWidth, gameHeight);
  canvas.parent('popcorn__canvas');
  balls = [];
  numBalls = map(gameWidth, 0, 10000, 5, 20);
  for (var i = 0; i < numBalls; i++) {
    var x = random(gameWidth);
    var y = random(gameHeight);
    var d = map(gameWidth, 0, 10000, 75, 250);
    balls.push(new Ball(x, y, d, i, balls));
  }
  noStroke();
  fill(255, 204);
}

function draw() {
  clear();
  cursor(ARROW);
  for (let ball of balls) {
    ball.drag();
    ball.collide();
    ball.move();
    ball.display();
  }
  mx = mouseX;
  pmx = pmouseX;
  my = mouseY;
  pmy = pmouseY;
}

function mouseReleased() {
  let mouseV = createVector(mx, my);
  let pmouseV = createVector(pmx, pmy);
  let dir = p5.Vector.sub(mouseV, pmouseV);
  if (dragging == true) {
    balls[dragged].setvx(dir.x);
    balls[dragged].setvy(dir.y);
  }
  dragging = false;
}

function Ball(x, y, diameter, index, others) {
  var vx = 0;
  var vy = 0;

  this.drag = function() {
    var disX = x - mouseX;
    var disY = y - mouseY;
    if (sqrt(sq(disX) + sq(disY)) < diameter / 2) {
      cursor(MOVE);
    }
    if (dragging == true) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
    if (dragging == false || dragged == index) {
      if (sqrt(sq(disX) + sq(disY)) < diameter / 2 && mouseIsPressed == true) {
        dragged = index;
        dragging = true;      }
    }
    if (dragging == true && dragged == index) {
      x = mouseX;
      y = mouseY;
    }
  }

  this.collide = function() {
    for (var i = index + 1; i < numBalls; i++) {
      var dx = others[i].x() - x;
      var dy = others[i].y() - y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = (others[i].diameter() / 2) + (diameter / 2);
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        var targetX = x + cos(angle) * minDist;
        var targetY = y + sin(angle) * minDist;
        var ax = (targetX - others[i].x()) * spring;
        var ay = (targetY - others[i].y()) * spring;
        vx -= ax;
        vy -= ay;
        others[i].setvx(others[i].vx() + ax);
        others[i].setvy(others[i].vy() + ay);
      }
    }
  }

  this.move = function() {
    vx *= friction;
    vy *= friction;
    x += vx;
    y += vy;
  }

  this.display = function() {
    if (index > 10) {
      image(images[index - 10], x - diameter / 1.8, y - diameter / 1.8, diameter * 1.2, diameter * 1.2);
    } else {
      image(images[index], x - diameter / 1.8, y - diameter / 1.8, diameter * 1.2, diameter * 1.2);
    }
  }

  this.diameter = function() {
    return diameter;
  }

  this.x = function() {
    return x;
  }

  this.y = function() {
    return y;
  }

  this.vx = function() {
    return vx;
  }

  this.vy = function() {
    return vy;
  }

  this.setvx = function (i) {
    vx = i;
  }

  this.setvy = function (i) {
    vy = i;
  }

}

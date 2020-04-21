// Global Animation Setting
'use strict';

window.requestAnimFrame = 
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
};

// Global cnvs Setting
let cnvs = document.getElementById('bg-blackhole2-layer');
let context = cnvs.getContext('2d');
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;


// Particles Around the Parent
function Particle(x, y, distance) {
  this.angle = Math.random() * 2 * Math.PI;
  this.radius = Math.random() ; 
  this.opacity =  (Math.random()*5 + 2)/10;
  this.distance = (1/this.opacity)*distance;
  this.speed = this.distance*0.00003;
  
  this.position = {
    x: x + this.distance * Math.cos(this.angle),
    y: y + this.distance * Math.sin(this.angle)
  };
  
  this.draw = function() {
    context.fillStyle = "rgba(255,255,255," + this.opacity + ")";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.closePath();
  }
  this.update = function() {
    this.angle += this.speed; 
    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle)
    };
    this.draw();
  }
}

function Emitter(x, y) {
  this.position = { x: x, y: y};
  this.radius = 30;
  this.count = 3000;
  this.particles = [];
  
  for(let i=0; i< this.count; i ++ ){
    this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
  }
}


Emitter.prototype = {
  draw: function() {
    context.fillStyle = "rgba(0,0,0,1)";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.closePath();    
  },
  update: function() {  
   for(let i=0; i< this.count; i++) {
     this.particles[i].update();
   }
    this.draw(); 
  }
}


let emitter = new Emitter(cnvs.width/2, cnvs.height/2);

function loop() {
  context.clearRect(0, 0, cnvs.width, cnvs.height);
  emitter.update();
  requestAnimFrame(loop);
}

loop();
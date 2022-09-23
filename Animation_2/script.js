const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

particlesArray = [];

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})


const mouse = {
  x: null,
  y: null,
}

canvas.addEventListener('click', function(ev){
  mouse.x = ev.x;
  mouse.y = ev.y;

  init();
})

canvas.addEventListener('mousemove', function(ev){
  mouse.x = ev.x;
  mouse.y = ev.y;
})

class Particle{
  constructor(){
    this.direction = 1;
    this.updates = 0;
    this.reverse = Math.random() * 60 + 30;
    this.x = mouse.x + Math.random() * 50;
    this.y = mouse.y + Math.random() * 50;;
    this.size = Math.random() * 7;
    this.speedX = Math.random() * 10 - 5;
    this.speedY = Math.random() * 10 - 5;

    this.opacity = Math.random();

    this.red = Math.random() * 255;
    this.green = Math.random() * 255;
    this.blue = Math.random() * 255;
    this.rgb = this.red + ', ' + this.green + ', ' + this.blue + ', ';
    this.color = 'rgba(' + this.rgb + this.opacity + ')'
  }
  update(){
    if(this.updates++ > this.reverse){
      this.direction *= -1;
      this.updates = 0;
    }
    this.x += (this.direction * this.speedX);
    this.y += (this.direction * this.speedY);

  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init(){
  // particlesArray = [];
  for (let i = 0; i < 100; i++){
    particlesArray.push(new Particle());
  }
}

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
      particlesArray[i].update();
      particlesArray[i].draw();
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
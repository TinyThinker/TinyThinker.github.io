const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
})

canvas.addEventListener('mousemove', function(ev){
  mouse.x = ev.x;
  mouse.y = ev.y;
})

class Particle{
  constructor(){
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.accelX = Math.random() * .2 - .2;
    this.accelY = Math.random() * .2 - .2;

    this.opacity = Math.random();

    this.red = Math.random() * 255;
    this.green = Math.random() * 255;
    this.blue = Math.random() * 255;
    this.rgb = this.red + ', ' + this.green + ', ' + this.blue + ', ';
    this.color = 'rgba(' + this.rgb + this.opacity + ')';
    this.garbage = false;

    // console.log(this);
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.speedX >= 0.1 || this.speedX <= -0.1){
      this.speedX += this.accelX;
    }
    else{
      // this.color = 'rgba(90,90,140, ' + this.opacity + ')';
      this.speedX = 0;
    }

    if(this.speedY >= 0.1 || this.speedY <= -0.1){
      this.speedY += this.accelY;
    }
    else{
      // this.color = 'rgba(221,220, 187, ' + this.opacity + ')';;
      this.speedY = 0;
    }

    if(this.speedX == 0.0 && this.speedY == 0.0){
      this.color = 'rgba(255,0,120, ' + this.opacity + ')';;
    }
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init(){
  for (let i = 0; i < 5500; i++){
    particlesArray.push(new Particle());
  }
}
init();
console.log(particlesArray);

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
      particlesArray[i].update();
      particlesArray[i].draw();
      if(particlesArray[i].garbage == true || particlesArray[i].x < 0 || 
         particlesArray[i].x > canvas.width || particlesArray[i].y < 0 ||
         particlesArray[i].y > canvas.height){
        particlesArray.splice(i, 1);
      }
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
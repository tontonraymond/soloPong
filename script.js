const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const buttons = document.querySelectorAll(".button");



const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  vx: 0.55,
  vy: -1,
  radius: 10,
  speed: 3,
  color: "BLACK",
};

const pad = {
  width: 75,
  height: 10,
  x: (canvas.width - 75) / 2,
  y: canvas.height - 20,
  speed: 10,
  color: "BLUE",
};



function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function drawPad() {
    context.beginPath();
    context.fillRect(pad.x, pad.y, pad.width, pad.height);
    context.fillStyle = pad.color;
    context.fill();
    context.closePath();
}

function moveBall() {
    ball.x += ball.vx * ball.speed;
    ball.y += ball.vy * ball.speed;
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius  < 0) {
        ball.vx = -ball.vx;
    }
    if (ball.y - ball.radius < 0) {
        ball.vy = -ball.vy;
    }
}


buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "left" && pad.x >= 0) { 
        pad.x -= pad.speed;
    } else if (button.id === "right" && pad.x <= canvas.width - pad.width) {
        pad.x += pad.speed;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

  })});


  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && pad.x >= 0) { 
        pad.x -= pad.speed;
    } else if (event.key === "ArrowRight" && pad.x <= canvas.width - pad.width) {
        pad.x += pad.speed;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

function loop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveBall();
    drawPad();
    drawBall();
    requestAnimationFrame(loop);
}

loop();
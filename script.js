const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const buttons = document.querySelectorAll(".button");
const startButton = document.getElementById("startButton");
let win = true;
let move = false;
let eventKey = null
const time = document.getElementById("time");
let startTime = null;


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

function reset(){
    ball.x = canvas.width / 2;  
    ball.y = canvas.height - 30;
    ball.vx = 0.55;
    ball.vy = -1;
    pad.x = (canvas.width - 75) / 2;
    win = true;
    move = false;
    eventKey = null;
    time.textContent = "0";
    startButton.disabled = false;
    alert("resetOK");
}


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
    if(ball.x > pad.x && ball.x < pad.x + pad.width && ball.y + ball.radius === pad.y){
        ball.vy = -ball.vy;
    }
    if (ball.y > canvas.height) {
       win = false
    }
}

function updateTime(){
    let timeStart = Math.floor((Date.now() - startTime) / 1000);
    time.textContent = timeStart;

}


buttons.forEach((button) => {
  button.addEventListener("touchstart", () => {
    if (button.id === "left" || button.id === "right"){
      move = true;
      eventKey = button.id;
    }
  });

  button.addEventListener("touchend", () => {
    move = false;
    eventKey = null;
  });
});


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { 
        move = true;
        eventKey = event.key;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        move = false;
        eventKey = null;
    }
});

function movePad() {
    if (move) {
        if ((eventKey === "ArrowLeft" ||  eventKey === "left") && pad.x > 0) {
            pad.x -= pad.speed;
        } else if ((eventKey === "ArrowRight" || eventKey === "right") && pad.x < canvas.width - pad.width) {
            pad.x += pad.speed;
        }
    }
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPad();
    drawBall(); 
}

function loop(){
    if (!win) {
        alert("Game Over");
        reset();
        draw();
        return;
    }
    updateTime();
    draw();
    movePad();
    moveBall();
    requestAnimationFrame(loop);
};



draw();
startButton.addEventListener("click", () => {
    startTime = Date.now();
    startButton.disabled = true;
    loop();   
});
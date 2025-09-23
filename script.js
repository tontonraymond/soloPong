const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");



const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
  speed: 5,
  color: "BLACK",
};

const pad = {
  width: 75,
  height: 10,
  x: (canvas.width - 75) / 2,
  y: canvas.height - 20,
  speed: 7,
  color: "BLUE",
};

context.beginPath();
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
context.fillStyle = ball.color;
context.fill();


context.fillRect(pad.x, pad.y, pad.width, pad.height);
context.fillStyle = pad.color;
context.fill();
context.closePath();
// Define the canvas
const canvas = document.querySelector("#clock");
const ctx = canvas.getContext("2d");

// Define some size
const radius = canvas.height / 2;

// Center the ctx;
ctx.translate(radius, radius);

// Define how to draw the Face
const drawFace = (ctx, radius) => {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#F8F8FF";
  ctx.fill();
};

// Define how to draw the Numbers
const drawNumbers = (ctx, radius) => {
  ctx.font = "14px 'Lato'";
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  // Rotate and put number and rotate back
  [...Array(12)].map((item, index) => {
    const num = index + 1;
    const ang = (num * Math.PI) / 6;
    ctx.rotate(ang);

    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  });
};

// Define how to draw the Hands
const drawHand = (ctx, pos, length, width, color) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.rotate(-pos);
};

// Draw the Hands depends on current time
const drawTime = (ctx, radius) => {
  // Get the current time
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Draw the Hour Hands
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.4, 4, "black");

  // Draw the Minute Hand
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.6, 2, "black");

  // Draw the Second Hand
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.75, 1, "#DC143C");
};

// Draw the Nose
const drawNose = (ctx, radius) => {
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
  ctx.fillStyle = "#DC143C";
  ctx.fill();
};

// Draw the Clock
const drawClock = () => {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  drawNose(ctx, radius);
};

// Draw the Clock evenry second
setInterval(drawClock, 1000);

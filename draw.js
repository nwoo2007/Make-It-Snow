// // Basic Frame
// ctx.fillStyle = "rgb(199, 211, 233)";
// ctx.fillRect(0, 0, cnv.width, cnv.height);

// Snowflakes generator
var snowflakes = [];
var swaySnowflakes = [];

for (let i = 0; i < 100; i++) {
  snowflakes.push({
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    radius: Math.random() * (4 - 0.5) + 0.5,
    colour: "white",
    dx: Math.random() * (0.5 + 0.3) - 0.3,
    dy: Math.random() * (1 - 0.5) + 0.5,
  });

  for (let i = 0; i < snowflakes.length; i++) {
    swaySnowflakes[i] = {
      iniX: snowflakes[i].x,
    };
  }
}
console.log(swaySnowflakes);

// Smoke
var smoke = [];

for (let i = 0; i < 9; i++) {
  smoke.push({
    x: 325,
    y: 250,
    radius: Math.random() * (25 - 10) + 10,
    colour: "#475760",
    dx: Math.random() * (0.3 + 0.2) - 0.2,
    dy: Math.random() * (1 - 0.3) + 0.3,
  });
}

// Sky Color
var sky = {
  r: 176,
  g: 222,
  b: 211,
};

// Windows Color
var windows = {
  r: 32,
  g: 32,
  b: 32,
};

// Rectangles
function rect(x, y, w, h, mode) {
  if (mode == "fill") {
    ctx.fillRect(x, y, w, h);
  } else if (mode == "stroke") {
    ctx.strokeRect(x, y, w, h);
  }
}

// Lines
function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1); //endpoint 1
  ctx.lineTo(x2, y2); // endpoint 2
  ctx.stroke();
}

// Circles
function circle(x, y, r, mode) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (mode == "fill") {
    ctx.fill();
  } else if (mode == "stroke") {
    ctx.stroke();
  }
}

// Triangle
function triangle(x1, y1, x2, y2, x3, y3, mode) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  if (mode == "fill") {
    ctx.fill();
  } else if (mode == "stroke") {
    ctx.closePath();
    ctx.stroke();
  }
}

// Canvas Setup
var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 900;

// Mouse Movement Listener
// Calc mouse coordinates using
// mouse event and canvas location info
let mouseX;
let mouseY;

cnv.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
  let rect = cnv.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log(`x: ${mouseX} Y: ${mouseY}`);
}

// Call functions
requestAnimationFrame(draw);
document.addEventListener("keypress", keypressHandler);
//

// Animation Frame
function draw() {
  // Clear previous frame
  ctx.fillStyle = `rgb(${sky.r}, ${sky.g}, ${sky.b})`;
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // DRAWING THE BACKGROUND

  // Draw Smoke
  for (let i = 0; i < smoke.length; i++) {
    ctx.fillStyle = smoke[i].colour;
    circle(smoke[i].x, smoke[i].y, smoke[i].radius, "fill");
  }

  // Animate Smoke
  for (let i = 0; i < smoke.length; i++) {
    // move upwards
    smoke[i].y -= smoke[i].dy;

    // move to right
    smoke[i].x -= smoke[i].dx;

    // reset
    if (smoke[i].y < 0) {
      smoke[i].y = 240;
      smoke[i].x = 325;
    }
  }

  // Log Cabin
  // chimney
  ctx.fillStyle = "#8B8B8B";
  rect(336, 222, 7, 20, "fill");
  rect(305, 222, 7, 20, "fill");
  //
  ctx.fillStyle = "#B3B3B3";
  rect(305, 250, 42, 200, "fill");
  rect(295, 240, 60, 10, "fill");
  triangle(295, 222, 325, 200, 355, 222, "fill");

  // snow on roof
  ctx.fillStyle = "white";
  circle(410, 300, 18, "fill");
  circle(385, 300, 10, "fill");
  circle(430, 300, 8, "fill");
  circle(450, 300, 15, "fill");
  circle(465, 300, 9, "fill");

  // red roof
  ctx.fillStyle = "#DE2A29";
  triangle(200, 700, 725, 700, 475, 300, "fill");
  triangle(375, 300, 475, 300, 425, 417, "fill"); // fill gap

  // wood wall
  ctx.fillStyle = "#C26B2E";
  triangle(150, 700, 600, 700, 375, 300, "fill");
  ctx.fillStyle = "#915521";
  triangle(175, 700, 575, 700, 375, 340, "fill");
  ctx.strokeStyle = "#582C0A";
  triangle(160, 705, 590, 705, 375, 320, "stroke");

  // patio
  ctx.fillStyle = "#582C0A";
  rect(210, 640, 330, 100, "fill");
  triangle(175, 700, 215, 700, 210, 640, "fill");
  triangle(575, 700, 540, 700, 540, 640, "fill");

  // door
  ctx.fillStyle = "#F4B824";
  rect(340, 530, 60, 110, "fill");
  ctx.strokeStyle = "#9E7818";
  ctx.lineWidth = 2;
  rect(340, 530, 60, 110, "stroke");
  //
  ctx.fillStyle = `rgb(${windows.r}, ${windows.g}, ${windows.b})`;
  rect(352, 545, 35, 35, "fill");
  //
  ctx.fillStyle = "#915521";
  circle(390, 600, 5, "fill");

  // windows
  ctx.fillStyle = "#F4B824";
  circle(370, 450, 35, "fill");
  rect(275, 555, 40, 40, "fill");
  rect(430, 555, 40, 40, "fill");
  rect(270, 595, 50, 10, "fill");
  rect(425, 595, 50, 10, "fill");
  //
  ctx.fillStyle = `rgb(${windows.r}, ${windows.g}, ${windows.b})`;
  circle(370, 450, 30, "fill");
  rect(282, 563, 25, 32, "fill");
  rect(438, 563, 25, 32, "fill");
  //
  ctx.strokeStyle = "#F4B824";
  ctx.lineWidth = 5;
  line(370, 420, 370, 485);
  line(340, 450, 400, 450);

  // GROUND
  ctx.fillStyle = "#EDF1F4";
  rect(0, 700, 1000, 200, "fill");
  circle(33, 700, 70, "fill");
  circle(110, 701, 40, "fill");
  circle(180, 701, 40, "fill");
  circle(220, 710, 35, "fill");

  circle(870, 701, 70, "fill");
  circle(800, 701, 40, "fill");
  //
  ctx.fillStyle = "white";
  circle(66, 840, 120, "fill");
  circle(232, 870, 90, "fill");
  circle(600, 870, 105, "fill");
  circle(760, 830, 150, "fill");
  circle(535, 800, 40, "fill");

  // Draw Snowflakes
  for (let i = 0; i < snowflakes.length; i++) {
    ctx.fillStyle = snowflakes[i].colour;
    ctx.beginPath();
    ctx.arc(
      snowflakes[i].x,
      snowflakes[i].y,
      snowflakes[i].radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  // ANIMATE the snowflakes
  for (let i = 0; i < snowflakes.length; i++) {
    // move downwards
    snowflakes[i].y += snowflakes[i].dy;
    snowflakes[i].x += snowflakes[i].dx;

    // make snowflakes sway
    if (snowflakes[i].x > swaySnowflakes[i].iniX + 20) {
      snowflakes[i].dx = -snowflakes[i].dx;
    } else if (snowflakes[i].x < swaySnowflakes[i].iniX - 20) {
      snowflakes[i].dx = -snowflakes[i].dx;
    }

    if (snowflakes[i].y > cnv.height) {
      // reapear at top
      snowflakes[i].y = -snowflakes[i].radius;

      // randomize position
      // Make a random number for the new x-position
      // Save this random number to both flake.x and flake.iniX

      snowflakes[i].x = Math.random() * cnv.width;
      swaySnowflakes[i].iniX = snowflakes[i].x;
    }
  }

  // Request new draw frame
  requestAnimationFrame(draw);
}

// Keyboard Control
function keypressHandler(event) {
  // display key pressed
  console.log(event.key);

  // increase # of snowflakes --> d
  var randNum = Math.round(Math.random() * 100);

  if (event.key == "d" && snowflakes.length < 700) {
    for (let i = 0; i < 10; i++) {
      snowflakes.push({
        x: Math.random() * cnv.width,
        y: Math.random() * cnv.height,
        radius: Math.random() * (4 - 0.5) + 0.5,
        colour: "white",
        dx: Math.random() * (0.2 + 0.2) - 0.2,
        dy: snowflakes[randNum].dy,
      });
    }

    for (let i = 100; i < 110; i++) {
      swaySnowflakes.push({
        iniX: snowflakes[i].x,
      });
    }
  }

  // decrease # of snowflakes --> a
  if (event.key == "a" && snowflakes.length > 50) {
    for (let i = 0; i < 10; i++) {
      snowflakes.pop();
    }
  }

  // increase speed --> w
  if (event.key == "w") {
    for (let i = 0; i < snowflakes.length; i++) {
      if (snowflakes[i].dy < 6) {
        snowflakes[i].dy += 0.5;
      }
    }
  }

  // decrease speed --> s
  if (event.key == "s") {
    for (let i = 0; i < snowflakes.length; i++) {
      if (snowflakes[i].dy > 1.3) {
        snowflakes[i].dy -= 0.5;
      }
    }
  }

  // Turn Night
  // sky --> #00213D
  if (event.key == "n") {
    if (sky.r >= 0) {
      sky.r -= 2.5;
    }
    if (sky.g >= 33) {
      sky.g -= 6;
    }
    if (sky.b >= 61) {
      sky.b -= 4;
    }
  }
  // windows --> #E46A22
  if (event.key == "n") {
    if (windows.r <= 288) {
      windows.r += 7;
    }
    if (windows.g <= 106) {
      windows.g += 8;
    }
    if (windows.b <= 34) {
      windows.b += 2;
    }
  }

  // Turn Morning

  // sky -->
  if (event.key == "m") {
    if (sky.r <= 176) {
      sky.r += 5;
    }
    if (sky.g <= 222) {
      sky.g += 5;
    }
    if (sky.b <= 211) {
      sky.b += 5;
    }
  }
  // windows --> 33, 33, 33
  if (event.key == "m") {
    if (windows.r >= 33) {
      windows.r -= 7;
    }
    if (windows.g >= 33) {
      windows.g -= 2;
    }
    if (windows.b >= 33) {
      windows.b -= 4;
    }
  }
}

// let myCircle = {
//   x: 200,
//   y: 200,
//   dx: 3,
//   dy: 3,
//   initX: 200,
// };

// // myCircle
// ctx.fillStyle = "green";
// ctx.beginPath();
// ctx.arc(myCircle.x, myCircle.y, 30, 0, 2 * Math.PI);
// ctx.fill();

// myCircle.x += myCircle.dx;

// if (myCircle.x > myCircle.initX + 200) {
//   myCircle.dx = -myCircle.dx;
// }

// if (myCircle.x < myCircle.initX - 200) {
//   myCircle.dx = -myCircle.dx;
// }

// myCircle.y += myCircle.dy;

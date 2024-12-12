// Array to store button colors
let lineColors = ['red', 'blue', 'green', 'black']; // Array holding available button colors
let selectedColour = "red"; // Default line color, initially set to red
let lineWidth = 1; // Default line width, initially set to 1
let buttonPositions = []; // Array to store the positions and colors of the color buttons

function setup() {
  createCanvas(400, 400); // Create a 400x400 pixel canvas

  // Create buttons for colors
  for (let i = 0; i < lineColors.length; i++) {
    let position = createVector(70 + i * 40, 320); // Calculate button positions
    buttonPositions.push({ position, color: lineColors[i] }); // Store each button's position and color
  }
}

function draw() {
  drawGradientBackground(); // Draw the gradient background

  // Draw title and instructions with a floating animation
  drawTitleAndInstructions();

  // Draw border around the canvas that changes color interactively
  drawBorder();

  // Draw animated lines with slight oscillation
  drawLines();

  // Draw color buttons with subtle animations
  drawColorButtons();

  // Draw width buttons with shadow effect
  drawButtonsWithShadows();

  // Draw reset button
  drawResetButton();
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c;
    if (y < height / 2) {
      c = lerpColor(color(255, 204, 0), color(102, 0, 204), inter * 2); // Smooth blend between yellow and purple in the top half
    } else {
      c = lerpColor(color(102, 0, 204), color(38, 0, 77), (inter - 0.5) * 2); // Smooth blend between purple and nebula color in the bottom half
    }
    stroke(c);
    line(0, y, width, y);
  }
}

function drawTitleAndInstructions() {
  fill(0);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER);
  let floating = sin(frameCount * 0.05) * 2; // Floating effect for text
  text('21 Lines', width / 2, 30 + floating);
  textSize(12);
  textStyle(NORMAL);
  text('Color buttons change the line colors', width / 2, 50 + floating);
  text('Width buttons change the line widths', width / 2, 70 + floating);
  text('Reset button resets color and line width', width / 2, 90 + floating);
}

function drawBorder() {
  let borderColor = color(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 150);
  stroke(borderColor);
  strokeWeight(4);
  noFill();
  rect(0, 0, width, height);
}

function drawLines() {
  stroke(selectedColour);
  strokeWeight(lineWidth);
  for (let i = 0; i < 21; i++) {
    let x1 = width / 21 * i;
    let y1 = 100 + sin(frameCount * 0.05 + i) * 10; // Oscillate vertically
    let x2 = width - (width / 21 * i);
    let y2 = height - 100 + sin(frameCount * 0.05 + i) * 10; // Oscillate vertically
    line(x1, y1, x2, y2);
  }
}

function drawColorButtons() {
  for (let i = 0; i < buttonPositions.length; i++) {
    let { position, color } = buttonPositions[i];
    fill(color);
    if (color === selectedColour) {
      stroke(0);
      strokeWeight(3);
      let pulse = sin(frameCount * 0.1) * 2; // Pulse effect using sine wave
      circle(position.x, position.y, 30 + pulse);
    } else {
      noStroke();
      circle(position.x, position.y, 30);
    }
  }
}

function drawButtonsWithShadows() {
  fill(150); // Set color for width buttons
  stroke(0); // Set border color for width buttons
  strokeWeight(1);

  // Draw increase button with shadow
  fill(0, 0, 0, 50); // Shadow color with transparency
  ellipse(303, 323, 32); // Draw shadow slightly offset
  fill(150);
  circle(300, 320, 30); // Draw increase button

  // Draw decrease button with shadow
  fill(0, 0, 0, 50); // Shadow color with transparency
  ellipse(353, 323, 32); // Draw shadow slightly offset
  fill(150);
  circle(350, 320, 30); // Draw decrease button

  // Draw symbols for width buttons
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('+', 300, 320);
  text('-', 350, 320);
}

function drawResetButton() {
  fill(200, 0, 0); // Set color for the reset button
  stroke(0); // Set border color for the reset button
  rect(10, 10, 60, 30, 5); // Draw the reset button with rounded corners

  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Reset', 40, 25); // Draw reset label on the reset button
}

function mousePressed() {
  // Check color button collisions
  for (let i = 0; i < buttonPositions.length; i++) {
    let { position, color } = buttonPositions[i]; // Destructure position and color for each button
    if (dist(mouseX, mouseY, position.x, position.y) < 15) { // Check if mouse is within radius of button
      selectedColour = color; // Set selected color to the button color
      return; // Exit function after setting color
    }
  }

  // Check width button collisions
  if (dist(mouseX, mouseY, 300, 320) < 15) { // Check if mouse is on the increase button
    lineWidth = min(lineWidth + 1, 10); // Increase width, max value is 10
  } else if (dist(mouseX, mouseY, 350, 320) < 15) { // Check if mouse is on the decrease button
    lineWidth = max(lineWidth - 1, 1); // Decrease width, min value is 1
  }

  // Check reset button collision
  if (mouseX > 10 && mouseX < 70 && mouseY > 10 && mouseY < 40) { // Check if mouse is within reset button bounds
    selectedColour = "red"; // Reset color to default (red)
    lineWidth = 1; // Reset line width to default (1)
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.8); // Resize the canvas to fit the window
}

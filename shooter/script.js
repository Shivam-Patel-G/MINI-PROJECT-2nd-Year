const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
let objects = [];
let score = 0;
let lastSpawnTime = 0; // Time of last object spawn

function spawnObject() {
    if (objects.length < 5) { // Spawn only if less than 5 objects
      let validPosition = false;
      while (!validPosition) { // Keep looping until a valid position is found
        const object = {
          x: Math.random() * (canvas.width - 40), // Adjust max X for object size
          y: Math.random() * (canvas.height - 40), // Adjust max Y for object size
          size: 80 // Double the size
        };
        // Check if object stays within canvas
        if (object.x >= 0 && object.x + object.size <= canvas.width &&
            object.y >= 0 && object.y + object.size <= canvas.height) {
          objects.push(object);
          validPosition = true;
          break; // Exit the loop after finding a valid position (instant spawn)
        }
      }
    }
  }
  

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw objects
  objects.forEach(object => {
    ctx.fillStyle = "lime"; // Change color if desired
    ctx.fillRect(object.x, object.y, object.size, object.size);
  });

  // Update score display
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function update() {
  // Check for collisions between mouse click and objects
  canvas.addEventListener("click", (event) => {
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    objects.forEach((object, i) => {
      if (
        clickX > object.x &&
        clickX < object.x + object.size &&
        clickY > object.y &&
        clickY < object.y + object.size
      ) {
        score++;
        objects.splice(i, 1);
      }
    });
  });
}

function gameLoop() {
  draw();
  update();
  spawnObject();

  requestAnimationFrame(gameLoop);
}

gameLoop();

function startGame() {
  score = 0;
  objects = [];
  gameLoop();
  // Start the timer for 60 seconds
  timer = setTimeout(() => {
    gameOver();
  }, 30000);
}

function gameOver() {
  // Stop the game loop
  window.cancelAnimationFrame(gameLoop);
  // Clear the timer
  clearTimeout(timer);

  // Display a popup with score and restart button
  const popup = document.createElement("div");
  popup.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    padding: 20px;
    border: 1px solid black;
    text-align: center;
  `;
  popup.innerHTML = `<h3>Game Over!</h3><p>Your score: ${score}</p>`;
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.addEventListener("click", () => {
    startGame();
    popup.remove();
  });
  popup.appendChild(restartButton);
  document.body.appendChild(popup);
}

startGame(); // Start the game
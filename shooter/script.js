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
          size: 40 // Double the size
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
    ctx.fillStyle = "red"; // Change color if desired
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

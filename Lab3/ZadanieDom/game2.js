const backgroundCanvas = document.getElementById("backgroundCanvas");
const bgCtx = backgroundCanvas.getContext("2d");

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");

const uiCanvas = document.getElementById("uiCanvas");
const uiCtx = uiCanvas.getContext("2d");

backgroundCanvas.width = gameCanvas.width = uiCanvas.width = window.innerWidth;
backgroundCanvas.height =
  gameCanvas.height =
  uiCanvas.height =
    window.innerHeight;

const maxLives = 3;
let playerLives = maxLives;
let score = 0;
let zombies = [];
let bullets = [];
const maxActiveZombies = 10;
const maxZombiesPerFrame = 2;
const zombieFrameCount = 10;
let zombieFrameWidth = 0;
let zombieFrameIndex = 0;
let animationTimer = 0;

let animationFrameId;
let isGameOver = false;

let assetsToLoad = 5;

function assetLoaded() {
  assetsToLoad--;
  if (assetsToLoad === 0) {
    backgroundMusic.loop = true;
    backgroundMusic.play();
    updateUI();
    gameLoop();
  }
}

const fullHeartImg = new Image();
fullHeartImg.src = "images/full_heart.png";
fullHeartImg.onload = assetLoaded;

const emptyHeartImg = new Image();
emptyHeartImg.src = "images/empty_heart.png";
emptyHeartImg.onload = assetLoaded;

const zombieImg = new Image();
zombieImg.src = "images/walkingdead.png"; // Arkusz animacji
zombieImg.onload = () => {
  zombieFrameWidth = zombieImg.width / zombieFrameCount;
  assetLoaded();
};

const crosshairImg = new Image();
crosshairImg.src = "images/aim.png";
crosshairImg.onload = assetLoaded;

let isMusicStarted = false;

function playBackgroundMusic() {
  if (!isMusicStarted) {
    isMusicStarted = true;
    backgroundMusic.loop = true;
    backgroundMusic.play().catch((e) => {
      console.warn("Nie udało się odtworzyć muzyki:", e);
    });
  }
}

const backgroundMusic = new Audio("sounds/sad-music.mp3");
backgroundMusic.addEventListener("canplaythrough", assetLoaded, false);

document.addEventListener("click", playBackgroundMusic, { once: true });

const backgroundImage = new Image();
backgroundImage.src = "images/board-bg.jpg";
backgroundImage.onload = () => {
  bgCtx.drawImage(
    backgroundImage,
    0,
    0,
    backgroundCanvas.width,
    backgroundCanvas.height
  );
  assetLoaded();
};

const crosshair = { x: gameCanvas.width / 2, y: gameCanvas.height / 2 };

gameCanvas.addEventListener("mousemove", (e) => {
  if (isGameOver) return;

  gameCtx.clearRect(crosshair.x - 100, crosshair.y - 100, 200, 200);

  crosshair.x = e.clientX;
  crosshair.y = e.clientY;

  drawCrosshair();
});

gameCanvas.addEventListener("click", () => {
  if (isGameOver) return;

  const bullet = { x: crosshair.x, y: crosshair.y };
  const shootSound = new Audio("sounds/gun-shots.mp3");
  shootSound.volume = 0.4;
  shootSound.play();
  let hit = false;
  zombies.forEach((zombie, zombieIndex) => {
    if (
      bullet.x > zombie.x &&
      bullet.x < zombie.x + zombie.width &&
      bullet.y > zombie.y &&
      bullet.y < zombie.y + zombie.height
    ) {
      score += 20;
      const shootSound = new Audio("sounds/zombie-death.mp3");
      shootSound.volume = 0.4;
      shootSound.play();
      zombies.splice(zombieIndex, 1);
      updateUI();
      hit = true;
    }
  });

  if (!hit) {
    score -= 5;
    if (score < 0) score = 0;
    updateUI();
    bullets.push(bullet);
  }
});

function generateNewZombies() {
  // Dodaj nowe zombie tylko jeśli jest mniej niż `maxActiveZombies`
  if (zombies.length < maxActiveZombies) {
    const numZombies = Math.floor(Math.random() * maxZombiesPerFrame);
    for (let i = 0; i < numZombies; i++) {
      const size = Math.random() * 50 + 50; // Rozmiar zombie
      zombies.push({
        x: gameCanvas.width,
        y: Math.random() * (gameCanvas.height - 100), // Ustaw zombie na ekranie
        width: size,
        height: size,
        speed: Math.random() * 2 + 1, // Zmienna prędkość (od 1 do 3 pikseli na klatkę)
      });
    }
  }
}

function moveZombies() {
  zombies.forEach((zombie) => {
    zombie.x -= zombie.speed;
    if (zombie.x + zombie.width < 0) {
      playerLives--;
      if (playerLives < 0) playerLives = 0;
      updateUI();
      zombies = zombies.filter((z) => z !== zombie);
    }
  });
}

function drawZombie(zombie) {
  animationTimer++;
  if (animationTimer % 10 === 0) {
    zombieFrameIndex = (zombieFrameIndex + 1) % zombieFrameCount;
  }

  gameCtx.drawImage(
    zombieImg,
    zombieFrameIndex * zombieFrameWidth,
    0,
    zombieFrameWidth,
    zombieImg.height,
    zombie.x,
    zombie.y,
    zombie.width,
    zombie.height
  );
}

function drawCrosshair() {
  gameCtx.drawImage(
    crosshairImg,
    crosshair.x - 100,
    crosshair.y - 100,
    200,
    200
  );
}

function updateUI() {
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

  uiCtx.font = "30px Arial";
  uiCtx.fillStyle = "white";
  uiCtx.textAlign = "right";
  uiCtx.fillText(`Score: ${score}`, uiCanvas.width - 20, 40);

  for (let i = 0; i < maxLives; i++) {
    if (i < playerLives) {
      uiCtx.drawImage(fullHeartImg, 20 + i * 40, 60, 30, 30);
    } else {
      uiCtx.drawImage(emptyHeartImg, 20 + i * 40, 60, 30, 30);
    }
  }
}

function drawGameElements() {
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  zombies.forEach((zombie) => {
    drawZombie(zombie);
  });

  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    gameCtx.beginPath();
    gameCtx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
    gameCtx.fillStyle = "red";
    gameCtx.fill();
  }

  drawCrosshair();
}

function gameLoop() {
  if (playerLives <= 0) {
    gameOver();
    return;
  }

  moveZombies();
  generateNewZombies();

  drawGameElements();

  animationFrameId = requestAnimationFrame(gameLoop);
}

function gameOver() {
  isGameOver = true;

  cancelAnimationFrame(animationFrameId);

  uiCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
  uiCtx.fillRect(0, 0, uiCanvas.width, uiCanvas.height);

  uiCtx.font = "50px Arial";
  uiCtx.fillStyle = "white";
  uiCtx.textAlign = "center";
  uiCtx.fillText("Game Over", uiCanvas.width / 2, uiCanvas.height / 2);

  uiCtx.font = "30px Arial";
  uiCtx.fillText(
    "Kliknij, aby zacząć od nowa",
    uiCanvas.width / 2,
    uiCanvas.height / 2 + 50
  );

  uiCanvas.style.pointerEvents = "auto";
  uiCanvas.addEventListener("click", restartGame, { once: true });
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function restartGame() {
  uiCanvas.removeEventListener("click", restartGame);

  playerLives = maxLives;
  score = 0;
  zombies = [];
  bullets = [];
  zombieFrameIndex = 0;
  animationTimer = 0;
  isGameOver = false;

  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  uiCanvas.style.pointerEvents = "none";
  backgroundMusic.play();
  updateUI();
  gameLoop();
}

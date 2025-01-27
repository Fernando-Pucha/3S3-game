
window.onload = function () {
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const gameOverScreen = document.getElementById('game-over-screen');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const gameArea = document.getElementById('game-area');
  const cat = document.getElementById('cat');

  let game; // added

  startButton.addEventListener("click", function () {
    console.log("Iniciamos")
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowRight",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -5;
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          break;
      }
    }
  }
  window.addEventListener("keydown", handleKeydown);

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

}
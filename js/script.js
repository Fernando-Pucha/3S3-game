
window.onload = function () {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
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

  function handleKeyup(event) {
    const key = event.key;
    if (["ArrowLeft", "ArrowRight"].includes(key)) {
      game.player.directionX = 0; // Detener el movimiento horizontal
    }
  }
  window.addEventListener("keyup", handleKeyup); 

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
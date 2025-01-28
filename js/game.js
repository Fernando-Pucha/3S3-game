class Game {
    constructor() {
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById("game-over-screen");
        this.numberScore = document.getElementById('numberScore')
        this.numberLives = document.getElementById('numberLives')
        this.finalScore = document.getElementById('final-score')
        this.youWinScreen = document.getElementById('you-win-screen')
        this.finalScoreWin = document.getElementById('final-score-win')
        this.player = new Cat(
            this.gameScreen,
            500,
            700,
            100,
            150,
            "./images/cat1.png"
        );
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.donuts = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000 / 60);  // 60fps

        this.levelMessage = document.getElementById('level-message');

        // Para el sonido
        this.donutSound = new Audio('./sounds/donut.mp3');
        this.hitSound = new Audio('./sounds/hit.mp3');
        this.soundStart = new Audio('./sounds/special-loop.mp3');
        this.soundGameOver = new Audio('./sounds/game-over.mp3');
    }

    start() {

        this.showLevelMessage('Nivel 1');
        setTimeout(() => {
            this.levelMessage.style.display = 'none'; // Ocultar el mensaje después de 5 segundos
        }, 2000);

        // Hide the start screen
        this.startScreen.style.display = "none";
        // Show the game screen
        this.gameScreen.style.display = "block";

        // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
        this.gameIntervalId = setInterval(() => {
            this.soundStart.play();
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    gameLoop() {
        this.update();
        if (this.score === 5) {
            this.showLevelMessage('Nivel 2');
        }

        if (this.score === 10) {
            this.showLevelMessage('Nivel 3');
        }
        if (this.score === 15) {
            clearInterval(this.gameIntervalId)
        }

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }



    update() {
        this.player.move();
        // Aumentar la velocidad de los obstáculos si el puntaje es mayor a 10
        if (this.score > 10) {
            this.obstacles.forEach(obstacle => {
                obstacle.top += 5;
            });
        }


        // Yunque
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                this.hitSound.play();
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                this.numberLives.innerText = this.lives
                i--;
            }
            else if (obstacle.top > this.height) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }
        }
        // Donut

        if (this.score > 5) {
            this.donuts.forEach(donut => {
                donut.top += 3;
            });
        }
        for (let i = 0; i < this.donuts.length; i++) {
            const donut = this.donuts[i];
            donut.move();

            if (this.player.didCollide(donut)) {
                this.donutSound.play();
                donut.element.remove();
                this.donuts.splice(i, 1);
                this.score++;
                this.numberScore.innerText = this.score
                i--;
            }
            else if (donut.top > this.height) {
                this.hitSound.play();
                this.lives--;
                this.numberLives.innerText = this.lives
                donut.element.remove();
                this.donuts.splice(i, 1);
                i--;
            }

        }

        // If the lives are 0, end the game
        if (this.lives === 0) {
            this.endGame();
        }

        if (this.score === 15) {
            this.youWin();
        }
        // Create a new obstacle based on a random probability, when there is no other obstacles on the screen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }

        if (Math.random() > 0.98 && this.donuts.length < 1) {
            this.donuts.push(new Donut(this.gameScreen));
        }
    }
    showLevelMessage(message) {
        this.levelMessage.innerText = message;
        this.levelMessage.style.display = 'block';
        setTimeout(() => {
            this.levelMessage.style.display = 'none';
        }, 2000);
    }
    // new method responsible for ending the game
    endGame() {
        this.soundStart.pause();
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.donuts.forEach(obstacle => obstacle.element.remove());
        this.gameIsOver = true;
        this.soundGameOver.play();
        this.gameScreen.style.display = "none";           
        this.gameEndScreen.style.display = "flex";  
        this.finalScore.innerText = this.score;       

    }

    youWin() {
        
        this.soundStart.pause();
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.donuts.forEach(obstacle => obstacle.element.remove());
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.youWinScreen.style.display = "flex";
        this.finalScoreWin.innerText = this.score;
    }
}
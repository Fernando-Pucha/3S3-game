class Game {
    constructor() {
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById("game-over-screen");
        this.numberScore=document.getElementById('numberScore')
        this.numberLives=document.getElementById('numberLives')
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


    }

    start() {
        // Set the height and width of the game screen
        /*  this.gameScreen.style.height = `${this.height}px`;
         this.gameScreen.style.width = `${this.width}px`; */

        // Hide the start screen
        this.startScreen.style.display = "none";

        // Show the game screen
        this.gameScreen.style.display = "block";
        // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    gameLoop() {
        console.log("in the game loop");

        this.update();

        // If "gameIsOver" is set to "true" clear the interval to stop the loop
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move();
        // Yunque
         for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                this.numberLives.innerText=this.lives
                i--;
            }
            else if (obstacle.top > this.height) {
                /* this.score++; */
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }
        } 
        // para el donut
        for (let i = 0; i < this.donuts.length; i++) {
            const donut = this.donuts[i];
            donut.move();

            if (this.player.didCollide(donut)) {
                donut.element.remove();
                this.donuts.splice(i, 1);
                this.score++;
                this.numberScore.innerText=this.score
                i--;
            }
            else if (donut.top > this.height) {
                this.lives--;
                this.numberLives.innerText=this.lives
                donut.element.remove();
                this.donuts.splice(i, 1);
                i--;
            }

        }


        // If the lives are 0, end the game
        if (this.lives === 0) {
            this.endGame();
        }

        // Create a new obstacle based on a random probability
        // when there is no other obstacles on the screen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }

        if (Math.random() > 0.98 && this.donuts.length < 1) {
            this.donuts.push(new Donut(this.gameScreen));
        }
    }

    // Create a new method responsible for ending the game
    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());

        this.gameIsOver = true;

        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
    }
}
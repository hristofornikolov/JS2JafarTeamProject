// Game logic and rendering engine:

function Game(scoreDisplay) {
    var startButton = document.getElementById('start-game'),
        restartButton = document.getElementById('restart-game'),
        endButton = document.getElementById('end-game'),
        canvas = document.getElementById('dynamic-canvas'),
        ctx = canvas.getContext('2d');

    var isGameRunning = false,
        isGameEnded = false,
        score = {left: 0, right: 0},
        leftBat,
        rightBat,
        ball,
        whiteLineWidth = 9;

    // Assigning event handlers to the navigation menu buttons and the keyboard keys:
    document.body.addEventListener("keydown", keyDownListener, true);
    startButton.onclick = startGame;
    restartButton.onclick = restartGame;
    endButton.onclick = endGame;

    // Initializing the score monitors and the game field:
    updateScore(0, 0);
    initializeField();

    // Initializing and drawing the ball and the bats:
    function initializeField() {
        leftBat = new Bat(0, 100);
        rightBat = new Bat(600 - 14, 100);
        ball = new Ball(300, 50);
        draw();
    }

    // Updating the two players' scores and initiating the re-drawing of the static score objects:
    function updateScore(scoreLeft, scoreRight) {
        score.left = scoreLeft;
        score.right = scoreRight;
        scoreDisplay(score.left, score.right);
    }

    // Drawing of the ball and the bats:
    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        leftBat.draw(ctx);
        rightBat.draw(ctx);
        ball.draw(ctx);
    }

    // The game animation engine:
    function animation() {
        // Calculation of the ball movement:
        ball.move();
        ball.bounce();
        // Drawing of the ball and the bats:
        draw();

        // A check whether the ball has left the field, an update of the current score and an initialization of a new round:
        switch (ball.placement(ctx)) {
            case "outsideRight":
                updateScore(score.left + 1, score.right);
                initializeField();
                break;
            case "outsideLeft":
                updateScore(score.left, score.right + 1);
                initializeField();
                break;
            default:
        }

        // Stopping the game animation upon pause.
        if (isGameRunning) {
            requestAnimationFrame(animation);
        }
    }

    // Event handling:
    // Start button click event:
    function startGame() {
        // Start a new game, if the game has ended:
        if (isGameEnded) {
            isGameEnded = false;
            isGameRunning = false;
            updateScore(0, 0);
            initializeField();
        }

        isGameRunning = !isGameRunning;

        // Pause or start the game animation:
        if (isGameRunning) {
            startButton.value = "Pause game";
            animation();
        }
        else {
            startButton.value = "Start game";
        }
    }

    // Reset game parameters before starting a new game: 
    function restartGame() {
        updateScore(0, 0);
        initializeField();
    }

    // End button click event: 
    function endGame() {
        isGameEnded = true;
        isGameRunning = false;
        startButton.value = "Start game";
    }

    // Here we enable the movement keys logic:
    function keyDownListener(e) {
        // Moving the left bat up by the Q key
        if (e.keyCode === 81 && leftBat.y >= whiteLineWidth) {
            leftBat.moveUp();
        }

        // Moving the left bat down by the A key
        if (e.keyCode === 65 && leftBat.y <= ctx.canvas.height - leftBat.height - whiteLineWidth) {
            leftBat.moveDown();
        }

        // Moving the right bat up by the P key
        if (e.keyCode === 80 && rightBat.y >= whiteLineWidth) {
            rightBat.moveUp();
        }

        // Moving the right bat down by the L key
        if (e.keyCode === 76 && rightBat.y <= ctx.canvas.height - rightBat.height - whiteLineWidth) {
            rightBat.moveDown();
        }
    }

    // Bat object creation:
    function Bat(x, y) {
        var cornerRadius = 7;

        // Current coordinates and dimensions:
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 14;

        // Here we draw the bat at its current coordinates:
        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + cornerRadius, this.y);
            ctx.lineTo(this.x + this.width - cornerRadius, this.y);
            ctx.arc(this.x + this.width - cornerRadius, this.y + cornerRadius, cornerRadius, 3 * Math.PI / 2, 0);
            ctx.lineTo(this.x + this.width, this.y + this.height - cornerRadius);
            ctx.arc(this.x + this.width - cornerRadius, this.y + this.height - cornerRadius, cornerRadius, 0, Math.PI / 2);
            ctx.lineTo(this.x + cornerRadius, this.y + this.height);
            ctx.arc(this.x + cornerRadius, this.y + this.height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI);
            ctx.lineTo(this.x, this.y + cornerRadius);
            ctx.arc(this.x + cornerRadius, this.y + cornerRadius, cornerRadius, Math.PI, 3 * Math.PI / 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.stroke();
        }

        // Upward movement via a re-calculation of Y
        this.moveUp = function () {
            this.y -= 4;
        }

        // Downward movement via a re-calculation of Y
        this.moveDown = function () {
            this.y += 4;
        }
    }

    // Ball object creation:
    function Ball(x, y) {
        var ballRadius = 8,
            ballSpeed = 2,
            direction = getRandomDirection(),
            directions = {
                "left": -1,
                "right": 1,
                "up": -1,
                "down": 1
            };

        //Current ball coordinates:
        this.x = x;
        this.y = y;

        // Here we draw the ball at its current coordinates:
        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        // Here we calculate whether the ball is inside the game field:
        this.placement = function (ctx) {
            if (this.x > ctx.canvas.width + ballRadius) {
                return "outsideRight";
            }
            if (this.x < 0 - ballRadius) {
                return "outsideLeft";
            }
            return "inside"
        }

        // Here we calculate the new coordinates of the ball after a movement:
        this.move = function () {
            this.x += ballSpeed * directions[direction.x];
            this.y += ballSpeed * directions[direction.y];
        }

        // Here we calculate the ball movement direction (always at a 45 degrees angle) after a bounce:
        this.bounce = function () {
            // Calculation of the new dirction after a bounce with the left bat
            if ((this.y + ballRadius >= leftBat.y && this.y - ballRadius <= leftBat.y + leftBat.height) && ((this.x - ballRadius <= leftBat.width) && (this.x - ballRadius > 0))) {
                direction.x = "right";
            }

            // Calculation of the new dirction after a bounce with the right bat
            if ((this.y + ballRadius >= rightBat.y && this.y - ballRadius <= rightBat.y + rightBat.height) && ((this.x + ballRadius >= ctx.canvas.width - rightBat.width) && this.x + ballRadius < ctx.canvas.width)) {
                direction.x = "left";
            }

            // Calculation of the new dirction after a bounce with the upper wall
            if (this.y - ballRadius < whiteLineWidth - 2) {
                direction.y = "down";
            }

            // Calculation of the new dirction after a bounce with the lower wall
            if (this.y + ballRadius > ctx.canvas.height - whiteLineWidth + 2) {
                direction.y = "up";
            }
        }

        // Here we provide a random initial movement direction:
        function getRandomDirection() {
            var direction = {
                x: 'right',
                y: 'down'
            };

            // Calculation of a random direction movement via a combination of a vertical and horizontal simultaneous movement: 
            // Calculation of a random horizontal direction
            if (Math.random() < 0.5) {
                direction.x = "left";
            }
            // Calculation of a random vertical direction
            if (Math.random() < 0.5) {
                direction.y = "up";
            }

            return direction;
        }
    }
}
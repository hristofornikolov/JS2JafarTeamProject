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

    document.body.addEventListener("keydown", keyDownListener, true);
    startButton.onclick = startGame;
    restartButton.onclick = restartGame;
    endButton.onclick = endGame;

    updateScore(0, 0);
    initializeField();

    function initializeField() {
        leftBat = new Bat(0, 100);
        rightBat = new Bat(600 - 14, 100);
        ball = new Ball(300, 50);
        draw();
    }

    function updateScore(scoreLeft, scoreRight) {
        score.left = scoreLeft;
        score.right = scoreRight;
        scoreDisplay(score.left, score.right);
    }

    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        leftBat.draw(ctx);
        rightBat.draw(ctx);
        ball.draw(ctx);
    }

    function animation() {
        ball.move();
        ball.bounce();
        draw();

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

        if (isGameRunning) {
            requestAnimationFrame(animation);
        }
    }

    function startGame() {
        if (isGameEnded) {
            isGameEnded = false;
            isGameRunning = false;
            updateScore(0, 0);
            initializeField();
        }

        isGameRunning = !isGameRunning;

        if (isGameRunning) {
            startButton.value = "Pause game";
            animation();
        }
        else {
            startButton.value = "Start game";
        }
    }

    function restartGame() {
        updateScore(0, 0);
        initializeField();
    }

    function endGame() {
        isGameEnded = true;
        isGameRunning = false;
        startButton.value = "Start game";
    }

    function keyDownListener(e) {
        if (e.keyCode === 81 && leftBat.y >= whiteLineWidth) {
            leftBat.moveUp();
        }

        if (e.keyCode === 65 && leftBat.y <= ctx.canvas.height - leftBat.height - whiteLineWidth) {
            leftBat.moveDown();
        }

        if (e.keyCode === 80 && rightBat.y >= whiteLineWidth) {
            rightBat.moveUp();
        }

        if (e.keyCode === 76 && rightBat.y <= ctx.canvas.height - rightBat.height - whiteLineWidth) {
            rightBat.moveDown();
        }
    }

    function Bat(x, y) {
        var cornerRadius = 7;

        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 14;

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

        this.moveUp = function () {
            this.y -= 4;
        }

        this.moveDown = function () {
            this.y += 4;
        }
    }

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

        this.x = x;
        this.y = y;

        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        this.placement = function (ctx) {
            if (this.x > ctx.canvas.width + ballRadius) {
                return "outsideRight";
            }
            if (this.x < 0 - ballRadius) {
                return "outsideLeft";
            }
            return "inside"
        }

        this.move = function () {
            this.x += ballSpeed * directions[direction.x];
            this.y += ballSpeed * directions[direction.y];
        }

        this.bounce = function () {
            if ((this.y + ballRadius >= leftBat.y && this.y - ballRadius <= leftBat.y + leftBat.height) && ((this.x - ballRadius <= leftBat.width) && (this.x - ballRadius > 0))) {
                direction.x = "right";
            }

            if ((this.y + ballRadius >= rightBat.y && this.y - ballRadius <= rightBat.y + rightBat.height) && ((this.x + ballRadius >= ctx.canvas.width - rightBat.width) && this.x + ballRadius < ctx.canvas.width)) {
                direction.x = "left";
            }

            if (this.y - ballRadius < whiteLineWidth - 2) {
                direction.y = "down";
            }

            if (this.y + ballRadius > ctx.canvas.height - whiteLineWidth + 2) {
                direction.y = "up";
            }
        }

        function getRandomDirection() {
            var direction = {
                x: 'right',
                y: 'down'
            };

            if (Math.random() < 0.5) {
                direction.x = "left";
            }
            if (Math.random() < 0.5) {
                direction.y = "up";
            }

            return direction;
        }
    }
}
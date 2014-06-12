(function () {
    var canvas = document.getElementById('dynamic-canvas');
    var ctx = canvas.getContext('2d');
    document.body.addEventListener("keydown", doKeyDown, true);

    var batHeight = 100,
        batWidth = 15,
        batCornerRadius =7,
        ballRadius = 8,
        ballSpeed = 1,
        isGameRunning = false;

    var direction = {
        x: 'right',
        y: 'down'

    }
    var directions = {
        "left": -1,
        "right": 1,
        "up": -1,
        "down": +1
    }
    function doKeyDown(e) {
        if (e.keyCode === 81 && leftBat.y >= 0) {
            leftBat.moveUp();
        }

        if (e.keyCode === 65 && leftBat.y <= ctx.canvas.height - batHeight) {
            leftBat.moveDown();
        }

        if (e.keyCode === 80 && rightBat.y >= 0) {
            rightBat.moveUp();
        }

        if (e.keyCode === 76 && rightBat.y <= ctx.canvas.height - batHeight) {
            rightBat.moveDown();
        }
    }

    function drawBall(x, y) {
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

        this.move = function () {
            this.x += ballSpeed * directions[direction.x];
            this.y += ballSpeed * directions[direction.y];
        }

        this.bounce = function () {
            if ((this.y > leftBat.y && this.y < leftBat.y + batHeight) && this.x - ballRadius === batWidth) {
                direction.x = "right";
            }

            if ((this.y > rightBat.y && this.y < rightBat.y + batHeight) && this.x + ballRadius === ctx.canvas.width - batWidth) {
                direction.x = "left";
            }

            if (this.y - ballRadius < 0) {
                direction.y = "down";
            }

            if (this.y + ballRadius > ctx.canvas.height) {
                direction.y = "up";
            }
        }
    }

    function drawBat(x, y) {
        this.x = x;
        this.y = y;

        this.draw = function (ctx) {

            //ctx.beginPath();
            //ctx.fillStyle = 'white';
            //ctx.strokeStyle = 'black';
            //ctx.fillRect(this.x, this.y, batWidth, batHeight);
            //ctx.strokeRect(this.x, this.y, batWidth, batHeight);

            ///end of flat bat

            //rounded corners bat
            ctx.beginPath();
            ctx.moveTo(this.x + batCornerRadius, this.y);
            ctx.lineTo(this.x + batWidth - batCornerRadius, this.y);
            ctx.arc(this.x + batWidth - batCornerRadius, this.y + batCornerRadius, batCornerRadius, 3 * Math.PI / 2, 0);
            ctx.lineTo(this.x + batWidth, this.y + batHeight - batCornerRadius);
            ctx.arc(this.x + batWidth - batCornerRadius, this.y + batHeight - batCornerRadius, batCornerRadius, 0, Math.PI / 2);
            ctx.lineTo(this.x + batCornerRadius, this.y + batHeight );
            ctx.arc(this.x + batCornerRadius, this.y + batHeight - batCornerRadius, batCornerRadius, Math.PI / 2, Math.PI);
            ctx.lineTo(this.x, this.y + batCornerRadius);
            ctx.arc(this.x + batCornerRadius, this.y + batCornerRadius, batCornerRadius, Math.PI, 3 * Math.PI / 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.stroke();
            ///
        }


        this.moveUp = function () {
            this.y -= 4;
        }

        this.moveDown = function () {
            this.y += 4;
        }
    }

    var startButton = document.getElementById('start-game');
    startButton.onclick = function startGame() {
        isGameRunning = !isGameRunning;

        if (isGameRunning) {
            startButton.value = "Pause game";
            animation();
        }
        else {
            startButton.value = "Start game";

        }
    }

    var restartButton = document.getElementById('restart-game');
    restartButton.onclick = function startGame() {
        //isGameRunning = true;
        initializeField();
        animation();

        //if (isGameRunning) {
        //    //restartButton.value = "Pause game";

        //}
        ////else {
        ////    startButton.value = "Start game";

        ////}
    }

    //function initializeField() {
    var leftBat = new drawBat(0, 100);
    leftBat.draw(ctx);

    var rightBat = new drawBat(600 - batWidth, 100);
    rightBat.draw(ctx);

    var ball = new drawBall(300, 50, 10);
    ball.draw(ctx);
    //}

    //initializeField();

    function animation() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        leftBat.draw(ctx);
        rightBat.draw(ctx);
        ball.draw(ctx);
        ball.move();
        ball.bounce();

        if (isGameRunning) {
            requestAnimationFrame(animation);
        }
    }

}());
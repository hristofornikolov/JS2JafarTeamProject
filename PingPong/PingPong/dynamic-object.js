(function () {
    var canvas = document.getElementById('dynamic-canvas');
    var ctx = canvas.getContext('2d');
    document.body.addEventListener("keydown", doKeyDown, true);
    var batHeight = 100;
    var batWidth = 15;
    var ballRadius = 10;
    var direction = {
        x: 'right',
        y: 'down'

    }
    function doKeyDown(e) {

        if (e.keyCode==87&&leftBat.y>=0) {
            leftBat.moveUp();
                             
        }
        if (e.keyCode == 83 && leftBat.y <= ctx.canvas.height - batHeight) {
            leftBat.moveDown();
           
        }
        if (e.keyCode == 38 && rightBat.y >= 0) {
            rightBat.moveUp();
        }
        if (e.keyCode==40&&rightBat.y <= ctx.canvas.height - batHeight) {
            rightBat.moveDown();
        }
      

    }
    function drawBall(x, y) {
        this.x = x;
        this.y = y;
       
        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

        }
    }
    function drawBat(x, y) {
        this.x = x;
        this.y = y;
        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = 'black';
            
            ctx.fillRect(this.x, this.y, batWidth, batHeight);
            ctx.fill();
            
        }
        this.moveUp = function () {
            this.y-=3;

           
        }
        this.moveDown = function () {
            this.y+=3;
        }
    }
    
    
    var leftBat = new drawBat(0, 100);
    leftBat.draw(ctx);
   
    var rightBat = new drawBat(600-batWidth, 100);
    rightBat.draw(ctx);
    var ball = new drawBall(150, 150, 10);
    ball.draw(ctx);
    function animation() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        leftBat.draw(ctx);
        rightBat.draw(ctx);
        ball.draw(ctx);
        requestAnimationFrame(animation);
       
    }
    animation();
}());
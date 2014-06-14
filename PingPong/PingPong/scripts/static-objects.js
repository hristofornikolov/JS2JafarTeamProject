function drawStaticObjects() {
    
    var theCanvas = document.getElementById("static-canvas");
    var ctx = theCanvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";

    ctx.fillRect(0, 0, 600, 5);
    ctx.fillRect(0, 395, 600, 5);

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.setLineDash([10, 10]);
    ctx.moveTo(300, 5);
    ctx.lineTo(300, 400);
    ctx.stroke();
    
    var leftPlayerScore = '0';
    var rightPlayerScore = '0';

    ctx.font = "60px Consolas";

    ctx.fillText(leftPlayerScore, 248,50);
    ctx.fillText(rightPlayerScore, 320, 50);

}

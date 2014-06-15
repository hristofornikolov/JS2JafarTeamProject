function Field() {
    var theCanvas = document.getElementById("static-canvas"),
        ctx = theCanvas.getContext("2d");

    this.draw = function (leftPlayerScore, rightPlayerScore) {
        ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);

        ctx.strokeStyle = "#FFF";
        ctx.fillStyle = "#FFF";

        ctx.beginPath();
        ctx.fillRect(0, 0, 600, 5);
        ctx.fillRect(0, 395, 600, 5);

        ctx.lineWidth = 5;
        ctx.setLineDash([10, 10]);
        ctx.moveTo(300, 5);
        ctx.lineTo(300, 400);
        ctx.stroke();

        ctx.font = "60px Consolas";
        ctx.fillText(leftPlayerScore, 248, 50);
        ctx.fillText(rightPlayerScore, 320, 50);
    }
}

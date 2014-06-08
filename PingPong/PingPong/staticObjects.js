window.onload = function() {
    
    var theCanvas = document.getElementById("static-canvas");
    var ctx = theCanvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";

    //ctx.strokeRect(10, 50, 600, 5);
    ctx.fillRect(10, 50, 600, 5);





    ctx.fillRect(10, 390, 600, 5);


    ctx.lineWidth = 5;

    ctx.moveTo(10, 10);
    ctx.lineTo(200, 100);
    ctx.stroke();


    


}
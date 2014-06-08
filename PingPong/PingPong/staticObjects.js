window.onload = function() {
    
    var theCanvas = document.getElementById("static-canvas");
    var ctx = theCanvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;

    ctx.moveTo(10, 10);
    ctx.lineTo(10, 300);
    ctx.stroke();


    


}
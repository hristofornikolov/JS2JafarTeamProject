window.onload = function () {
    var background = new Background(),
        field = new Field(),
        game = new Game(field.draw);

    background.draw();
}
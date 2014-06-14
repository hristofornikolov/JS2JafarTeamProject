function drawBackground() {
    var svg = document.getElementById("background-svg"),
        height = 0,
        width = 0,
        textureHeight = 64,
        textureWidth = 64,
        fragment = document.createDocumentFragment();

    var box = svg.getAttribute("viewBox");
    if (box === null) {
        width = svg.getAttribute("width");
        height = svg.getAttribute("height");
    }
    else {
        var parameters = box.split(", ");
        width = parameters[parameters.length - 2];
        height = parameters[parameters.length - 1];
    }

    for (var y = 0; y < height; y += textureHeight) {
        for (var x = 0; x < width; x += textureWidth) {
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'textures/grass.png');
            svgimg.setAttributeNS(null, 'height', textureHeight);
            svgimg.setAttributeNS(null, 'width', textureWidth);
            svgimg.setAttributeNS(null, 'x', x);
            svgimg.setAttributeNS(null, 'y', y);
            fragment.appendChild(svgimg);
        }
    }

    svg.appendChild(fragment);
}
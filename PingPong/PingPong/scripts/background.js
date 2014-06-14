function Background() {
    var svg = document.getElementById("background-svg"),
        textureHeight = 64,
        textureWidth = 64;

    this.draw = function () {
        var fragment = document.createDocumentFragment();
            dimensions = getBoxDimensions();

        for (var y = 0; y < dimensions.height; y += textureHeight) {
            for (var x = 0; x < dimensions.width; x += textureWidth) {
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

    function getBoxDimensions() {
        var box = svg.getAttribute("viewBox"),
            dimensions = {width: '0', height: '0'};

        if (box === null) {
            dimensions.width = svg.getAttribute("width");
            dimensions.height = svg.getAttribute("height");
        }
        else {
            var parameters = box.split(", ");
            dimensions.width = parameters[parameters.length - 2];
            dimensions.height = parameters[parameters.length - 1];
        }

        return dimensions;
    }
}

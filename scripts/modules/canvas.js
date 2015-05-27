(function () {
    define(function () {
        function CanvasObject () {
            //Empty
        }
        
        Canvas.prototype = {
            constructor: Canvas,
            init: function (context, id, parent) {
                var cnv = document.createElement('canvas'), 
                ctx = cnv.getContext('2d');
                parent = document.getElementById(parent);
                parent.appendChild(cnv);
            }
        };
        
        return CanvasObject;
    });
})();

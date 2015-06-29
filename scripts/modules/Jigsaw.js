(function () {
    'use strict';
    define(function (data, curvePoints) {
        
        var parent,
            img,
            canvas,
            ctx;
        
        function Jigsaw () {
            this.data = data;
            this.curvePoints = curvePoints;            
        }
        
        Jigsaw.prototype = {
            constructor: Jigsaw,
            init: function (data) {
                //Set up the defualts
                console.log('Setting up the JIGSAW PIECES!!');
                this.createPieces(data);
            },
            createPieces: function (data) {
                //Do the slicing  
                //Use the curvePoints Object that gets passed in.
                var numPieces = data.puzzle['level1'].pieces, width;
                img = document.createElement('img');
                img.src = data.image;
                // width = img.offsetWidth /
                console.log('Number of pieces', data.image);
                console.log('Number of ', numPieces);

                img.onload = function () {
                    for (var i = 0; i < numPieces; i++) {
                        //DO stuff
                        console.log('Value of i:', i);
                    }
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                };
            },
            appendTo: function (el) {
                var parent = typeof el === 'string' ? document.getElementById(el) : el;
            }
        };
        
        return Jigsaw;
    });
    
}());

(function () {
    define(['Events'], function (Events) {
        'use strict';
        
        function Jigsaw (data) {
            this.data = data;
            this.level = 1;      
        }
        
        Jigsaw.prototype = {
            constructor: Jigsaw,
            init: function () {
                //Set up the defualts                
                var evt = new Events();
                evt.addEvent(window, ['setLevel'], this.getLevel.bind(this));
                evt.addEvent(window, ['imagesize'], this.createPieces.bind(this));
            },
            createPieces: function (e) {
                //Do the slicing  
                //Use the curvePoints Object that gets passed in.
                console.log('Getting the call!!', e.data);
                var numPieces = this.data.puzzle['level'+this.level].pieces,
                    frag = document.createDocumentFragment(), 
                    width,
                    height, 
                    canvas, 
                    ctx, 
                    img, 
                    evt;
                
                img = document.createElement('img');
                img.src = this.data.image;
                console.log('Number of pieces', this.data.image, this.data);
                console.log('Number of ', numPieces);

                img.onload = function () {
                    for (var i = 0; i < numPieces; i++) {
                        canvas = document.createElement('canvas');
                        ctx = canvas.getContext('2d');
                        
                        ctx.save();
                        //ctx.bezierCurveTo(20,100,200,100,200,20); Create besier curve based on random and only from the right until the last image from the ight is made
                        ctx.drawImage(img, 0, 0);
                        //DO stuff
                        console.log('Value of i:', i);
                    }
                   
                };
            },
            getLevel: function (e) {
                this.level = e.target.id.substring(10, parseInt(e.target.id.length));
                console.log("GETTING THE LEVEL TARGET NUMBER:", this.level);
            },
            appendTo: function (el) {
                var parent = typeof el === 'string' ? document.getElementById(el) : el;
            }
        };
        
        return Jigsaw;
    });
    
}());

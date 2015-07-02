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
                    imgXValue = 0,
                    imgYValue = 0, 
                    canvas, 
                    ctx, 
                    img, 
                    evt;
                
                img = new Image();
                img.src = this.data.image;
                console.log('Number of pieces', this.data.image, this.data);
                console.log('Number of ', numPieces);

                img.onload = function () {
                    for (var i = 0; i < numPieces; i++) {
                        canvas = document.createElement('canvas');
                        canvas.className = 'jigsaw-piece';
                        canvas.width = (e.data.width/numPieces)*2;
                        canvas.height = (e.data.height/numPieces)*2;
                        canvas.style.border = 'solid 1px #ff0000';
                        ctx = canvas.getContext('2d');
                        
                        ctx.save();
                        ctx.bezierCurveTo(20,100,200,100,200,20);// Create besier curve based on random and only from the right until the last image from the ight is made
                        //ctx.drawImage(img, , (e.data.height) * i, e.data.width, e.data.height);
                        imgXValue = (canvas.width) * i;
                        
                        if (((canvas.width *i) - (canvas.width)) >= e.data.width) {
                            imgYValue += canvas.height;
                            console.log('Greater than or equal to width:', ((canvas.width *i) - (canvas.width)), 'Total Width:',  e.data.width, imgYValue);
                            //imgXValue = 0;
                        }
                        
                        //Create an object {} that stores the values of the image background position for each puzzle piece.  In this loop, I can reference that object and set each piece there.
                        if (((canvas.height *i) - (canvas.height)) >= e.data.height) {
                            //imgXValue += canvas.width;
                            console.log('Greater than or equal to height:', ((canvas.height *i) - (canvas.height)), 'Total height:',  e.data.height, imgXValue);
                            //imgXValue = 0;
                        }
                        
                        
                        ctx.drawImage(img, (-imgXValue), (-imgYValue), e.data.width, e.data.height);
                        
                        
                        /*for (var j = i; i < imgXValue; j++) {
                            //ctx.drawImage(img, (-imgXValue), (-imgYValue), e.data.width, e.data.height);
                        }*/
                        //DO stuff
                        console.log('Value of width:', canvas.width, 'Height:', canvas.height);
                        frag.appendChild(canvas);
                    }
                    this.appendTo('main', frag);
                   
                }.bind(this);
            },
            
            getLevel: function (e) {
                this.level = e.target.id.substring(10, parseInt(e.target.id.length));
                console.log("GETTING THE LEVEL TARGET NUMBER:", this.level);
            },
            appendTo: function (el, child) {
                var parent = typeof el === 'string' ? document.getElementById(el) : el;
                parent.appendChild(child);
            }
        };
        
        return Jigsaw;
    });
    
}());

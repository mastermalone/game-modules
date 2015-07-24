(function () {
    define(['Events', 'jquery-ui'], function (Events) {
        'use strict';
        
        function Jigsaw (data, parent) {
            this.data = data;
            this.parent = parent;
            this.level = 1;  
            this.imageMap = {};    
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
                    rows = Math.floor(Math.sqrt(numPieces)),//Horizontal
                    columns = Math.ceil(((numPieces)/Math.floor(Math.sqrt(numPieces)))),//Vertical Runded up to prevent uneven grids
                    frag = document.createDocumentFragment(), 
                    width,
                    height,
                    widthStr,
                    parentWidth,
                    imgXValue = 0,
                    imgYValue = 0, 
                    piece, 
                    ctx, 
                    img, 
                    evt;
                
                if (!this.data.image) {
                    return;
                    console.log('aduh hello!', this.data.image);
                }else {
                    img = new Image();                
                    img.src = this.data.image;
                    console.log('Number of pieces', this.data.image, this.data);
                    console.log('Number of ', numPieces);
    
                    img.onload = function () {
                        //for (var i = 0; i < numPieces; i++) {
                        for (var i = 0; i < rows*columns; i++) {
                            piece = document.createElement('canvas');
                            piece.className = 'jigsaw-piece';
                            piece.id = 'jigsaw-'+i;
                            piece.setAttribute('data', 'jigsaw-piece');
                            piece.width = (Math.ceil(e.data.width)/columns);
                            piece.height = (Math.ceil(e.data.height)/rows);
                            piece.style.border = 'solid 1px #ff0000';
                            ctx = piece.getContext('2d');
                            
                            ctx.save();
                            ctx.bezierCurveTo(20,100,200,100,200,20);// Create besier curve based on random and only from the right until the last image from the ight is made
                            
                            //Create image map grid
                            this.createImageMap(i, imgXValue, imgYValue);
                            
                            //X and Y coordinates for tray placement
                            piece.style.top += ((piece.height+10)*i)+'px';
                            piece.style.left = 10+'px';
                            widthStr = window.getComputedStyle(document.querySelector(this.parent)).width;
                            parentWidth = parseFloat(widthStr.substring(0, widthStr.length-2));
                            
                            //Subtract the imgXvalue to move the background position along according to the next piece that needs to be painted with a section of the image
                            ctx.drawImage(img, (-imgXValue), (-imgYValue), e.data.width, e.data.height);
                            
                            imgXValue += (piece.width);
                                                    
                            //If the width of one row of puzzle peices is greater than or equal to the total witdh of the image minus one puzzle piece, increase the Y value by one puzzle piece height
                            if ((imgXValue - (piece.width-piece.width)) >= (e.data.width -10)) {
                                imgYValue += piece.height;
                                console.log('Greater than or equal to width:', 'X Position:',(imgXValue - piece.width), 'Total Width:',  e.data.width, 'Y Position', imgYValue);
                                imgXValue = 0;
                            }
                            
                            console.log('Value of width:', piece.width, 'Height:', piece.height, "Rows", rows, 'Columns', columns, 'X Position value:', imgXValue);
                            frag.appendChild(piece);
                        }
                        
                        this.appendTo(this.parent, frag);
                        
                        $('.jigsaw-piece').draggable({
                            containment:'.main-wrap',
                            stack: 'canvas',//Forcess Z-index to top for current clicked canvas
                            distance: 0,
                            cursor: 'move',
                            snap: '#content',
                            revert: 'invalid'//flies back to original position
                        });
                       
                    }.bind(this);
                }
            },
            createImageMap: function (itterator, xValue, yValue) {
                //Use this to create the map that will be used for the guide and the preview for the puzzle.
                //This creates a grid
                this.imageMap['image'+itterator+'X'] = xValue;
                this.imageMap['image'+itterator+'Y'] = yValue;
            },
            getLevel: function (e) {
                this.level = e.target.id.substring(10, parseInt(e.target.id.length));
                console.log("GETTING THE LEVEL TARGET NUMBER:", this.level);
            },
            appendTo: function (el, child) {
                //var parent = typeof el === 'string' ? document.getElementById(el) : el;
                var parent = typeof el === 'string' ? document.querySelector(el) : el;
                parent.appendChild(child);
            }
        };
        
        return Jigsaw;
    });
}());

(function () {
    define(['PuzzlePieceFactory', 'Events', 'jquery-ui'], function (PuzzlePieceFactory, Events) {
        'use strict';
        
        function Jigsaw (data, parent, level) {
            this.data = data;
            this.parent = parent;
            this.level = level || 1;  
            this.imageMap = {};  
        }
        
        Jigsaw.prototype = {
            constructor: Jigsaw,
            init: function () {
                console.log('MAKING JIGSAW', this.data);
                //Set up the defualts                
                var evt = new Events();
                evt.addEvent(window, ['setLevel'], this.getLevel.bind(this));
                evt.addEvent(window, ['imageloaded'], this.createPieces.bind(this));
            },
            createPieces: function (e) {
                if (!this.data.image) return;

                var imageWidth = e.data.width;
                var imageHeight = e.data.height;

                var numPieces = this.data.puzzle['level' + this.level].pieces;
                var rows = Math.floor(Math.sqrt(numPieces));
                var columns = Math.ceil(numPieces / rows);

                var puzzlePieceContainer = document.createDocumentFragment();

                var puzzle = {
                    width: imageWidth,
                    height: imageHeight,
                    columns: columns,
                    rows: rows,
                    img: new Image()
                };

                puzzle.img = new Image();
                puzzle.img.src = this.data.image;
                puzzle.img.onload = function () {
                    var puzzleGrid = [];
                    var imgX = 0;
                    var imgY = 0;

                    var r, c;
                    var puzzlePiece;
                    for (r = 0; r < rows; r++) {
                        for (c = 0; c < columns; c++) {
                            puzzlePiece = PuzzlePieceFactory.createPiece('jigsaw', {
                                puzzle: puzzle,
                                neighborTop: r === 0 ? null : puzzleGrid[r - 1][c],
                                neighborLeft: c === 0 ? null : puzzleGrid[r][c - 1],
                                row: r,
                                column: c,
                                imgX: imgX,
                                imgY: imgY
                            });

                            imgX += (puzzlePiece.leftPadding + puzzlePiece.coreWidth - puzzlePiece.rightInset);

                            puzzlePieceContainer.appendChild(puzzlePiece.canvas);
                            this.appendTo(this.parent, puzzlePieceContainer);

                            if (!puzzleGrid[r]) {
                                puzzleGrid[r] = [];
                            }
                            puzzleGrid[r].push(puzzlePiece);
                        }
                        imgX = 0;
                        imgY += (puzzlePiece.topPadding + puzzlePiece.coreHeight - puzzlePiece.bottomInset);
                    }

                    $('.jigsaw-piece').draggable({
                        containment:'.main-wrap',
                        stack: 'canvas',//Forcess Z-index to top for current clicked canvas
                        distance: 0,
                        cursor: 'move',
                        snap: '#content',
                        //revert: 'invalid'//flies back to original position
                    });
                }.bind(this);
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

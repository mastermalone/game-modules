define(['Curve'], function (Curve) {
    'use strict';
    
    function setCurves (jigsawPiece) {
        var curveNames = Object.keys(Curve.UnitCurves);
        var isRandomInvertRight = Math.floor(Math.random() * 2) === 1;
        var isRandomInvertBottom = Math.floor(Math.random() * 2) === 1;
        var randomUnitCurve;
        var randomCurve;
        var randomIndex;

        if (jigsawPiece.neighborTop) {
            jigsawPiece.curves.top = Curve.invertXY(jigsawPiece.neighborTop.curves.bottom, jigsawPiece.coreWidth);
        }
        if (jigsawPiece.neighborLeft) {
            jigsawPiece.curves.left = Curve.invertXY(jigsawPiece.neighborLeft.curves.right, jigsawPiece.coreHeight);
        }
        if (jigsawPiece.column < jigsawPiece.puzzle.columns - 1) {
            randomIndex = Math.floor((Math.random() * curveNames.length));
            randomUnitCurve = Curve.UnitCurves[curveNames[randomIndex]];
            randomCurve = Curve.createCurve(randomUnitCurve, jigsawPiece.coreHeight, jigsawPiece.coreWidth);

            jigsawPiece.curves.right = isRandomInvertRight ? Curve.invertY(randomCurve) : randomCurve;
        }
        if (jigsawPiece.row < jigsawPiece.puzzle.rows - 1) {
            randomIndex = Math.floor((Math.random() * curveNames.length));
            randomUnitCurve = Curve.UnitCurves[curveNames[randomIndex]];
            randomCurve = Curve.createCurve(randomUnitCurve, jigsawPiece.coreWidth, jigsawPiece.coreHeight);

            jigsawPiece.curves.bottom = isRandomInvertBottom ? Curve.invertY(randomCurve) : randomCurve;
        }

        return jigsawPiece;
    }
    
    function setCanvasDimensions (jigsawPiece) {
        jigsawPiece.leftPadding = Curve.maxProtrusion(jigsawPiece.curves.left);
        jigsawPiece.rightPadding = Curve.maxProtrusion(jigsawPiece.curves.right);
        jigsawPiece.topPadding = Curve.maxProtrusion(jigsawPiece.curves.top);
        jigsawPiece.bottomPadding = Curve.maxProtrusion(jigsawPiece.curves.bottom);

        jigsawPiece.leftInset = Curve.maxDepression(jigsawPiece.curves.left);
        jigsawPiece.rightInset = Curve.maxDepression(jigsawPiece.curves.right);
        jigsawPiece.topInset = Curve.maxDepression(jigsawPiece.curves.top);
        jigsawPiece.bottomInset = Curve.maxDepression(jigsawPiece.curves.bottom);

        jigsawPiece.canvas.width += (jigsawPiece.leftPadding + jigsawPiece.rightPadding);
        jigsawPiece.canvas.height += (jigsawPiece.topPadding + jigsawPiece.bottomPadding);

        return jigsawPiece;
    }
    
    function cut (jigsawPiece) {
        function toRadians (degrees) {
            return Math.PI / 180 * degrees;
        }

        var ctx = jigsawPiece.canvas.getContext('2d');
        var pencil = Curve.createPencil(ctx);

        ctx.save();
        ctx.beginPath();

        ctx.translate(jigsawPiece.leftPadding, jigsawPiece.topPadding);
        ctx.moveTo(0, 0);
        if (jigsawPiece.curves.top) pencil.drawCurve(jigsawPiece.curves.top);
        else ctx.lineTo(jigsawPiece.coreWidth, 0);

        ctx.translate(jigsawPiece.coreWidth, 0);
        ctx.rotate(toRadians(90));
        if (jigsawPiece.curves.right) pencil.drawCurve(jigsawPiece.curves.right);
        else ctx.lineTo(jigsawPiece.coreHeight, 0);

        ctx.translate(jigsawPiece.coreHeight, 0);
        ctx.rotate(toRadians(90));
        if (jigsawPiece.curves.bottom) pencil.drawCurve(jigsawPiece.curves.bottom);
        else ctx.lineTo(jigsawPiece.coreWidth, 0);

        ctx.translate(jigsawPiece.coreWidth, 0);
        ctx.rotate(toRadians(90));
        if (jigsawPiece.curves.left) pencil.drawCurve(jigsawPiece.curves.left);
        else ctx.lineTo(jigsawPiece.coreHeight, 0);

        ctx.restore();
        ctx.clip();

        return jigsawPiece;
    }
    
    function applyImage (jigsawPiece) {
        var ctx = jigsawPiece.canvas.getContext('2d');
        ctx.drawImage(jigsawPiece.puzzle.img, -jigsawPiece.imgX, -jigsawPiece.imgY, jigsawPiece.puzzle.width, jigsawPiece.puzzle.height);

        return jigsawPiece;
    }

    function createJigsawPiece (params) {
        var piece = new JigsawPuzzlePiece(params);
        return piece.build();
    }

    function JigsawPuzzlePiece (params) {
        this.puzzle = params.puzzle;
        this.imgX = params.imgX;
        this.imgY = params.imgY;

        this.row = params.row;
        this.column = params.column;
        this.pieceNumber = params.row * this.puzzle.columns + params.column;

        this.coreWidth = Math.ceil(this.puzzle.width / this.puzzle.columns);
        this.coreHeight = Math.ceil(this.puzzle.height / this.puzzle.rows);

        this.leftPadding = 0;
        this.rightPadding = 0;
        this.topPadding = 0;
        this.bottomPadding = 0;
        this.leftInset = 0;
        this.rightInset = 0;
        this.topInset = 0;
        this.bottomInset = 0;

        this.neighborTop = params.neighborTop;
        this.neighborLeft = params.neighborLeft;

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'jigsaw-' + this.pieceNumber;
        this.canvas.className = 'jigsaw-piece';
        this.canvas.setAttribute('data', 'jigsaw-piece');
        this.canvas.width = this.coreWidth;
        this.canvas.height = this.coreHeight;

        this.curves = {
            top: null,
            left: null,
            right: null,
            bottom: null
        };
    }

    JigsawPuzzlePiece.prototype.build = function () {
        setCurves(this);
        setCanvasDimensions(this);
        cut(this);
        applyImage(this);

        return this;
    }

    return {
        createPiece: function (type, params) {
            switch (type) {
                case 'jigsaw':
                    return createJigsawPiece(params);
                default:
                    return null;
            }
        }
    };
});
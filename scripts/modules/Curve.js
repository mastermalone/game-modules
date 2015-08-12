define([], function () {
    'use strict';

    var unitCurves = {
        Simple: [
            {cx1: 0, cy1: 0, cx2: .35, cy2: .15, ex: .37, ey: .05},   // left shoulder
            {cx1: .37, cy1: .05, cx2: .40, cy2: 0, ex: .38, ey: -.05},  // left neck
            {cx1: .38, cy1: -.05, cx2: .20, cy2: -.20, ex: .50, ey: -.20}, // left head
            {cx1: .50, cy1: -.20, cx2: .80, cy2: -.20, ex: .62, ey: -.05},  // right head
            {cx1: .62, cy1: -.05, cx2: .60, cy2: 0, ex: .63, ey: .05},   // right neck
            {cx1: .63, cy1: .05, cx2: .65, cy2: .15, ex: 1, ey: 0}   // right shoulder
        ]
    };

    function invertY (curve) {
        return curve.map(function (bezier) {
            return {
                cx1: bezier.cx1, cy1: -bezier.cy1,
                cx2: bezier.cx2, cy2: -bezier.cy2,
                ex: bezier.ex, ey: -bezier.ey
            };
        });
    }

    function invertX (curve, boxWidth) {
        return (
            curve
                .reverse()
                .map(function (bezier, i) {
                    var isLastBezier = i === curve.length - 1;

                    return {
                        cx1: boxWidth - bezier.cx2,
                        cy1: bezier.cy2,
                        cx2: boxWidth - bezier.cx1,
                        cy2: bezier.cy1,
                        ex: isLastBezier ? boxWidth : boxWidth - curve[i + 1].ex,
                        ey: isLastBezier ? 0 : curve[i + 1].ey
                    };
                })
        );
    }

    function invertXY (curve, boxWidth) {
        return invertX(invertY(curve), boxWidth);
    }

    function createPencil (ctx) {
        return {
            drawCurve: function (curve) {
                curve.forEach(function (bezier) {
                    ctx.bezierCurveTo(
                        bezier.cx1, bezier.cy1,
                        bezier.cx2, bezier.cy2,
                        bezier.ex, bezier.ey);
                });
            }
        };
    }

    function maxProtrusion (curve) {
        var minY = 0;

        if (!curve) return minY;

        curve.forEach(function (bezier) {
            if (!minY) {
                minY = Math.min(bezier.cy1, bezier.cy2, bezier.ey);
            } else {
                minY = Math.min(bezier.cy1, bezier.cy2, bezier.ey, minY);
            }
        });

        return Math.abs(minY);
    }

    function maxDepression (curve) {
        var maxY = 0;

        if (!curve) return maxY;

        curve.forEach(function (bezier) {
            if (!maxY) {
                maxY = Math.max(bezier.cy1, bezier.cy2, bezier.ey);
            } else {
                maxY = Math.max(bezier.cy1, bezier.cy2, bezier.ey, maxY);
            }
        });

        return Math.abs(maxY);
    }

    function createCurve (unitCurve, boxWidth, boxHeight) {
        return unitCurve.map(function (bezier) {
            return {
                cx1: bezier.cx1 * boxWidth,
                cy1: bezier.cy1 * boxHeight,
                cx2: bezier.cx2 * boxWidth,
                cy2: bezier.cy2 * boxHeight,
                ex: bezier.ex * boxWidth,
                ey: bezier.ey * boxHeight
            };
        });
    }

    return {
        UnitCurves: unitCurves,

        invertX: invertX,
        invertY: invertY,
        invertXY: invertXY,
        createCurve: createCurve,
        createPencil: createPencil,
        maxProtrusion: maxProtrusion,
        maxDepression: maxDepression
    };
});
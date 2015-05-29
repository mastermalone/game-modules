(function () {
    'use strict';
    define(function (curvePoints) {
        var parent;
        
        function Jigsaw () {
            this.curverPoints = curvePoints;            
        }
        
        Jigsaw.prototype = {
            constructor: Jigsaw,
            init: function () {
                //Set up the defualts
            },
            createPieces: function () {
                //Do the slicing  
                //Use the curvePoints Object that gets passed in.
            },
            appendTo: function (el) {
                var parent = typeof el === 'string' ? document.getElementById(el) : el;
            }
            
        };
        
        return Jigsaw;
    });
    
}());

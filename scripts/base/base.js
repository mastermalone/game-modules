(function () {
    
    define(["Events"], function (Events) {
        "use strict";
        var evts = new Events();
        function Base () {
            //Empty
        }
        
        Base.prototype = {
            constructor: Base,
            cleanUp: function (elm, eType, callback) {
                var elm = typeof elm === "string" ? document.getElementById(elm) : elm;
                
                if (elm.hasEvent === true) {
                    evts.removeEvent(elm, eType, callback);
                }
                while (elm.childNodes.length > 0) {
                    elm.removeChild(elm.childNodes[0]);
                }
            }
        };
        
        return Base;
    });
    
}());

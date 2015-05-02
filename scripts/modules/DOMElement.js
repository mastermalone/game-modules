(function () {
    define(function () {
        "use strict";
        
        function DOMElement (type, attrs, attrVal) {
            this.type = type;
            this.attrs = attrs;
            this.attrVal = attrVal;
            console.log("MAKING THE NEW ELEMENT");
            this.makeElement(this.type, this.attrs, this.attrVal);
        }
        
        DOMElement.prototype = {
            constructor: DOMElement,
            makeElement: function (type, attrs, attrVal) {
                //var el = document.createElement(type);
                //Solution for custom parent/child DOMElements
                if (typeof type === "object") {
                    
                    for (var key in type) {
                        console.log("THE KEYS", key.value);
                    }
                    
                    /*for (var i = 0; i < type.length; i++) {
                        var el = document.createElement(type);
                        console.log("Createing Type from array", i);
                        
                        //if (typeof attrs === "object")
                    }*/
                }else {
                    console.log("NOT AN ARRAY", typeof type);
                }
                
                //return el;
            }
        };
        
        return DOMElement;
    });
}());

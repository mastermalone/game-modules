(function () {
    define(function(){
        "use strict";
        
        if (Object.create !== "function") {
            Object.create = function(o){
                var F = function(){
                    //Empty consturctor
                };
                F.prototype = o;
                return new F();
            };
        }
            
        function SubClass(){
            //Empty Constructor
        }
        
        //Parasitic inheritence
        SubClass.prototype = {
            constructor: SubClass,
            extend: function (childObj, parentObj) {
                var copyOfParent = Object.create(parentObj.prototype);
                copyOfParent.constructor = childObj;
                childObj.prototype = copyOfParent;
                //console.log("EXTENDING", copyOfParent);
                this.applyMembers(childObj, parentObj);
            },
            applyMembers: function (childObj, parentObj) {
                //var args = Array.slice(arguments);
                var params = Array.prototype.slice.call(parentObj), val = "Hi";
                
                parentObj.call(childObj.prototype, params, val);
                console.log("ARGUMENTS[1]", params);
            }
        };
        
        return SubClass;
    });

})();

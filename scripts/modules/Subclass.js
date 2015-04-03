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
            //Constructor
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
                childObj.prototype.absorb = (function () {
                    parentObj.call(childObj.prototype, arguments);
                    //console.log("APPLYING MEMBERS", arguments.length);
                }());
            }
        };
        
        return SubClass;
    });

})();

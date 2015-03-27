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
            //console.log("Constructing");
        }
        
        //Parasitic inheritence
        SubClass.prototype = {
            constructor: SubClass,
            extend: function (childObj, parentObj, args) {
                var copyOfParent = Object.create(parentObj.prototype);
                copyOfParent.constructor = childObj;
                childObj.prototype = copyOfParent;
                //console.log("EXTENDING", copyOfParent);
                this.applyMembers(childObj, parentObj);
            },
            applyMembers: function (childObj, parentObj, args) {
                //var args = Array.slice(arguments);
                childObj.prototype.absorb = (function (args) {
                    if(typeof args !== "undefined"){
                        parentObj.call(childObj.prototype, Array.slice(args[0]));
                    }else{
                        parentObj.call(childObj.prototype);
                    }
                    //console.log("APPLYING MEMBERS", arguments.length);
                }());
            }
        };
        
        return SubClass;
    });

})();

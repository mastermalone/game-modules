(function () {
    define(function(){
        'use strict';
        
        if (typeof Object.create !== 'function') {
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
            }
        };
        
        return SubClass;
    });

}());

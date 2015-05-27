define(function(){
    "use strict";
    function Evt () {
        //Constructor
        var convert = function (list) {
            //Create and object that is returned with the 
            //converted events
        };
    }
    
    Evt.prototype = {
        constructor: Evt,
        addEvent: function (target, list, callback, touch) {
            var targ;
            if(typeof target === "string"){
                targ = document.getElementById(target);
            }else{
                targ = target;
            }
            
            for(var i = 0; i < list.length; i++){
                if(window.addEventListener){
                    //Convert list and use it as the event list
                    targ.addEventListener(list[i], callback, true);
                }else{
                    targ.attachEvent(list[i], callback);
                }   
            }
        },
        removeEvent: function (target, list, callback, touch) {
            var targ;
            if(typeof target === "string"){
                targ = document.getElementById(target);
            }else{
                targ = target;
            }
            
            for(var i = 0; i < list.length; i++){
                if(window.removeEventListener){
                    //Convert list and use it as the event list
                    targ.removeEventListener(list[i], callback, true);
                }else{
                    targ.detachEvent(list[i], callback);
                } 
            }
        }
    };
    return Evt;
});
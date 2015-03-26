define(function(){
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
                    console.log("Getting lsitener", list[i]);
                    //Convert list and use it as the event list
                    targ.addEventListener(list[i], callback, true);
                }else{
                    targ.attachEvent(list[i], callback);
                }   
            }
        }
    };
    return Evt;
});
(function () {
    define(function () {
        'use strict';
        function Dispatch () {
            //Empty
        }
        Dispatch.prototype = {
            customEvent: function (dispatchElement, type) {
                var evt, elm;
                //Example create event
                //have some element listen for the event
                //have some element dispatch the event afterward
                
                if (window.Event) {
                    evt = new Event(type);
                }else {
                    evt =  document.createEvent('Event');
                    evt.initEvent(type, true, true);
                }
                
                elm = typeof dispatchElement === 'string' ? elm = document.getElementById(dispatchElement) : dispatchElement;
                
                if (typeof elm.dispatchEvent !== 'function') {
                    elm.dispatchEvent = function(e){
                        var F = function(){
                            //Empty consturctor
                        };
                        return new F();
                    };
                }
                
                elm.dispatchEvent(evt);
                
                console.log('Getting into  Dispatch', typeof elm, type, 'dispatcher name:', elm);
            }
        };
        return Dispatch;
    });
}());



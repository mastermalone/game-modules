(function () {
    define(function () {
        'use strict';
        function Emitter (obj) {
            //Empty
            this.self = this;
            this.obj = obj;
        }
        Emitter.prototype = {
            constructor: Emitter,
            dispatch: function (type, data) {
                var evt, elm, eventList, targetObject;
                //Example dispatch event
                //have some object listen for the event
                //have some object dispatch the event afterward
                
                if (typeof this.obj.prototype === 'undefined') {
                    console.log("No prototype");
                    targetObject = this.obj;
                }else {
                    console.log('Has Prototype', this.obj);
                    targetObject = this.obj.prototype;
                }
                
                targetObject.dispatch = function () {
                    if (document.createEvent) {
                        evt = document.createEvent('Event');
                        evt.initEvent(type, true, true);
                    }else {
                        evt = document.createEventObject();
                        evt.type = type;
                    }
                    
                    if (data && typeof data !== 'undefined') {
                        evt.data = data;//Attach a data object to the property
                    }else {
                        data = null;
                    }
                    
                    if (typeof this.dispatchEvent !== 'function') {
                        this.dispatchEvent = function(e){
                            var F = function(){
                                //Empty consturctor
                            };
                            return new F();
                        };
                    }
                    
                    this.dispatchEvent(evt);
                    
                    console.log('Getting into  Dispatch', typeof this, type, 'dispatcher name:', this);
                };
                
                targetObject.dispatch();
                console.log('ARGS LENGTH', this.self);
            },
            addEvent: function (type, callback) {
                console.log('Adding event listener');
            },
            removeEvent: function (type, callback) {
                console.log('Removing event listener');
            }
        };
        return Emitter;
    });
}());
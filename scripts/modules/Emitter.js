(function () {
    define(['EventEmitter2'], function (EventEmitter2) {
        'use strict';

        console.log('EVENT EMITTER:', EventEmitter2);
        function Emitter (obj) {
            //Empty
            this.self = this;
            this.obj = obj;
            
            EventEmitter2.call(this, obj);
            console.log("EVENT EMITTER2", EventEmitter2, this.obj);
        }
        
        Emitter.prototype = Object.create(EventEmitter2.prototype);
        //Emitter.prototype.constructor = this;
        
        console.log('EMITTER PROTOTYPE:', Emitter.prototype);
        /*Emitter.prototype = {
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
                    
                    if(!targetObject.dispatchEvent) {
                        targetObject.dispatchEvent = new Object();
                        if (typeof targetObject.dispatchEvent !== 'function') {
                            targetObject.dispatchEvent = function(e){
                                var F = function(){
                                    //Empty consturctor
                                };
                                return new F();
                            };
                        }
                    }
                    
                    targetObject.dispatchEvent(evt);
                    
                    console.log('Getting into  Dispatch', typeof targetObject, evt.type, 'dispatcher name:', require('events').EventEmitter);
                };
                
                targetObject.dispatch();
                console.log('ARGS LENGTH', this.self);
            },
            addEventListener: function (type, callback, bubbling) {
                
                for (var i = 0; i < this.obj.events[type]; i++) {
                    this.events.push(type);
                    if (this.obj.events.hasOwnProperty(type)) {
                            this.obj.events[type].push(callback);
                    }else {
                        this.obj.events[type] = [callback];
                    }
                }
                console.log('Adding event listener:', type, 'Object:', this.obj, 'Callback:', this.obj.events[type]);
            },
            removeEvent: function (type, callback) {
                console.log('Removing event listener');
            }
        };*/

        return new Emitter();
    });
}());
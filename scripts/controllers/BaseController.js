(function () {
    define(['BaseModel', 'LevelSelectModel', 'LevelSelectView', 'Tween', 'TweenCSS'], function (BaseModel, LevelSelectModel, LevelSelectView) {
        'use strict';
        
        function BaseController () {    
            this.debugging = false;
            this.tween = '';
            this.model = new BaseModel();
        }
        
        BaseController.prototype = {
            constructor: BaseController,
            data: function (data) {
                //Do stuff here if needed
            },
            updateModel: function (data, callback) {
                //Receives data from the App.init() call.  This method is called from the controller that is inheriting from this BaseContoller object.
                if(this.debugging === true){
                    if(!data || typeof data !== 'string'){
                        console.log('BaseController: You did not pass the data into this method.');
                        return;
                    }
                }
                
                //Send data to the Model and then pass it to the View
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            sendData: function (dataObject) {
                //Send an object back to the model
                return dataObject;
            },
            destroy: function (elm, removeChildNodes) {
                elm = typeof elm === 'string' ? document.querySelector(elm) : elm;
                
                if (removeChildNodes) {
                    while (elm.childNodes.length > 0) {
                        elm.removeChild(elm.childNodes[0]);
                    }
                }else {
                    elm.parentNode.removeChild(elm);
                }
                elm = null;
            },
            animate: function (el, from, to, easing, time) {
                //Animates page elements
                var elm = typeof el === 'string' ? document.querySelector(el) : el;
                
                createjs.CSSPlugin.install(createjs.Tween);
                elm.style.width = elm.parentNode.offsetWidth+'px';
                
                this.tween = new createjs.Tween.get(elm)
                .wait(0)
                .to(from)
                .to(to, time, easing)
                .call(this.handleComplete);
                
                createjs.Ticker.setFPS(60);
                
                this.tween = null;
                elm = null;
            }
        };
        
        return BaseController;
    });
}());

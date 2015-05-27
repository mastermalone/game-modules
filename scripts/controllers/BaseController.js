(function () {
    define(['BaseModel', 'Ajax', 'LevelSelectModel', 'LevelSelectView'], function (BaseModel, Ajax, LevelSelectModel, LevelSelectView) {
        'use strict';
        var ajax = new Ajax(), debugging = false, update, lsm = new LevelSelectModel(), lsv = LevelSelectView;
        
        function BaseController () {            
            //Empty Constructor
        }
        
        BaseController.prototype = {
            constructor: BaseController,
            updateModel: function (data, callback) {
                //Receives data from the App.init() call.  This method is called from the controller that is inheriting from this BaseContoller object.
                if(debugging === true){
                    if(!data || typeof data !== 'string'){
                        console.log('BaseController: You did not pass the data into this method.');
                        return;
                    }
                }
                
                //Send data to the Model and then pass it to the View
                if (typeof callback === 'function') {
                    callback(data);
                }
                //lsv.on.show(lsm.setData(data));
                //console.log('UPDATING FROM BASE', this, 'VALUE OF data', data);
            },
            sendData: function (dataObject) {
                //Send an object back to the model
                return dataObject;
            },
            destroy: function (elm, removeChildNodes) {
                elm = typeof elm === 'string' ? document.getElementById(elm) : elm;
                //console.log('VALUE OF removeChildNodes', removeChildNodes);
                if (removeChildNodes) {
                    while (elm.childNodes.length > 0) {
                        elm.removeChild(elm.childNodes[0]);
                    }
                }else {
                    elm.parentNode.removeChild(elm);
                }
                
            },
            test: function () {
                //console.log('Inheritence check');
            }
        };
        
        return BaseController;
    });
}());

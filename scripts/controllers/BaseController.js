(function () {
    define(["BaseModel", "Ajax", "LevelSelectModel", "LevelSelectView",], function (BaseModel, Ajax, LevelSelectModel, LevelSelectView) {
        "use strict";
        var ajax = new Ajax(), debugging = false, update, lsm = new LevelSelectModel(), lsv = LevelSelectView;
        
        function BaseController (names, date, date2, that, you, them) {
            this.name = names;
            this.date = date;
            
            //console.log("ARGS from BASE", Array.prototype.slice.call(arguments[0]), this);
            //console.log("ARGS from BASE", arguments, this);
            
            update = function (url) {
                ajax.getData(url, function (data) {
                    //Call level select view and pass in the data to the model, which is used by the view
                    lsv.on.show(lsm.setData(data));
                });
            };
        }
        
        BaseController.prototype = {
            constructor: BaseController,
            updateModel: function (url) {
                
                if(debugging === true){
                    if(!url || typeof url !== "string"){
                        console.log("BaseController: You did not pass the url into this method.");
                        return;
                    }
                }
                
               update(url); //Call private method for AJAX request
               console.log("UPDATEING FROM BASE", this);
            },
            sendData: function (dataObject) {
                //Send an object back to the model
                return dataObject;
            },
            test: function () {
                console.log("Inheritence check");
            }
        };
        
        return BaseController;
    });
}());

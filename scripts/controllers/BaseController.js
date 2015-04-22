(function () {
    define(["BaseModel"], function (BaseModel) {
        "use strict";
        
        function BaseController (names, date, date2, that, you, them) {
            this.name = names;
            this.date = date;
            
            //console.log("ARGS from BASE", Array.prototype.slice.call(arguments[0]), this);
            //console.log("ARGS from BASE", arguments, this);
            
            //Empty contructor
        }
        
        BaseController.prototype = {
            constructor: BaseController,
            update: function (data, callback, debugging) {
                //pass Data in from Model and use it in the callback
                //Call retrieve data from the model, which returns data from and AJAX call
                //This data should be sent to theview via the callback
                if(debugging === true){
                    if(!url || typeof url !== "string"){
                        console.log("BaseController: You did not pass any data to this function. Get the data from the model");
                        return;
                    }
                }
                
                console.log("Data");
                if(typeof callback === "function") {
                    callback(data);
                }
            },
            sendData: function (dataObject) {
                //Send an object back to the model
                return dataObject;
            }
        };
        
        return BaseController;
    });
}());

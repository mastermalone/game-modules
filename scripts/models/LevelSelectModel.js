(function () {
    define(["Subclass", "BaseModel", "LevelSelectView", "jquery", "Ajax"], function (Subclass, BaseModel, LevelSelectView, $, Ajax) {
        "use strict";
        var subClass = new Subclass(), lsv = LevelSelectView, ajax = new Ajax();
        
        function LevelSelectModel () {
            //Empty Constructor
            this.data = "";
        }
        
        subClass.extend(LevelSelectModel, BaseModel);
        
        LevelSelectModel.prototype = {
            constructor: LevelSelectModel,
            /*retrieveData: function (url, debugging) {
                if(debugging === true){
                    if(!url || typeof url !== "string"){
                        console.log("LevelSelectView ERROR : You did not specify the url, or it's type is not a string");
                        return;
                    }
                }
                var lsm = this; 
                console.log("VALUE OF JQUERY", $);
               
                console.log("Jquery is ready");
                console.log($("#stage").length);
                
                ajax.getData(url, function (data) {
                    console.log("VALUE FROM MY AJAX", data, lsm);
                });
                
                $.ajax({
                    url: url,
                    dataType: "json"
                }).done(function (data) {
                    
                    console.log("VALUE FROM MODEL NEW", data, url, lsm);
                    //LevelSelectModel.setData(data);
                    //lsv.on.show(data);//called from the view, gets data passed infrom the model's retrieve data
                });
               
            },*/
            setData: function (data) {
                //console.log("Value of set data", data);
                return data;
            }
        };
        return LevelSelectModel;
    });
}());
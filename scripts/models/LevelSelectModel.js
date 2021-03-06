(function () {
    define(["Subclass", "BaseModel", "LevelSelectView", "jquery", "Ajax"], function (Subclass, BaseModel, LevelSelectView, $, Ajax) {
        "use strict";
        var subClass = new Subclass(), lsv = LevelSelectView, ajax = new Ajax();
        
        function LevelSelectModel () {
            //Empty Constructor
            this.data = "";
            BaseModel.call(this);
        }
        
        subClass.extend(LevelSelectModel, BaseModel);
        //Add more methods to prototype if needed
        
        return LevelSelectModel;
    });
}());
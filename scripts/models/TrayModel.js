(function () {
    define(["Subclass", "BaseModel"], function (Subclass, BaseModel) {
        "use strict";
        var subClass = new Subclass();
        
        function TrayModel () {
            //Empty Constructor
            BaseModel.call(this);
        }
        
        subClass.extend(TrayModel, BaseModel);
        //Add more methods to prototype if needed
        
        TrayModel.prototype.state = function (state) {
            return state;
        };
        
        return TrayModel;
    });
}());

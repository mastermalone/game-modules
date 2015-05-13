(function () {
    define(["Subclass", "BaseModel"], function (Subclass, BaseModel) {
        "use strict";
        var subClass = new Subclass();
        
        function TrayModel () {
            //Empty Constructor
            this.data = "";
            BaseModel.call(this);
        }
        
        subClass.extend(TrayModel, BaseModel);
        //Add more methods to prototype if needed
        
        return TrayModel;
    });
}());

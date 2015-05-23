(function () {
    define(["BaseModel", "Subclass", "Ajax"], function (BaseModel, Subclass, Ajax) {
        "use strict";
        var subclass = new Subclass();
        
        function GamBoardModel () {
            BaseModel.call(this);
        }
        
        subclass.extend(GamBoardModel, BaseModel);
        
        return GamBoardModel;
    });
}());

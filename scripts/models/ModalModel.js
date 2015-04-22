(function () {
    define(["BaseModel", "Subclass"], function (BaseModel, SubClass) {
        "use strict";
        var subclass = new SubClass();
        function ModalModel () {
            //Empty Constructor
        }
        
        subclass.extend(ModalModel, BaseModel);
        
        ModalModel.prototype = {
            constuctor: ModalModel
        };
        
        return ModalModel;
        
    });
}());




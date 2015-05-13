(function () {
    define(["Subclass", "BaseController", "TrayModel", "TrayView"], function (Subclass, BaseController, TrayModel, TrayView) {
        "use strict";
        var subclass = new Subclass();
        
        function TrayController () {
            BaseController.call(this);
        }
        
        TrayController.prototype.init = function (data) {
            console.log("Showing Tray");
        };
        
        return TrayController;
        
    });
}());



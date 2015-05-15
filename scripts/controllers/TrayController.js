(function () {
    define(["Subclass", "BaseController", "TrayModel", "TrayView"], function (Subclass, BaseController, TrayModel, TrayView) {
        "use strict";
        var subclass = new Subclass(), tm = new TrayModel(), tv = TrayView;
        
        function TrayController () {
            BaseController.call(this);
        }
        
        TrayController.prototype.init = function (data) {
            console.log("Showing Tray");
            tv.on.show(tm.setData(data));//Do the level select on.show() with an evt.addListener();  displatch event rom here with level select dispatch event
        };
        
        return TrayController;
        
    });
}());



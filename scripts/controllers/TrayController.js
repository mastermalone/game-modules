(function () {
    define(["Subclass", "BaseController", "TrayModel", "TrayView", "Dispatch", "Events"], function (Subclass, BaseController, TrayModel, TrayView, Dispatch, Events) {
        "use strict";
        var subclass = new Subclass(), tm = new TrayModel(), tv = TrayView, dsp = new Dispatch(), evts = new Events();
        
        function TrayController () {
            BaseController.call(this);
        }
        
        TrayController.prototype.init = function (data) {
            console.log("Showing Tray");
            tv.on.show(tm.setData(data));//Do the level select on.show() with an evt.addListener();  displatch event rom here with level select dispatch event
            evts.addEvent("tray", ["mousedown"], this.fireEvents);
        };
        
        TrayController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            
            switch (targ.id) {
                case "level-selector":
                dsp.customEvent("level-selector", "levelSelect");
                break;
                case "level-indicator":
                //e.preventDefault();
                //e.stopPropagation();
                break;
            }
        }.bind(TrayController.prototype);
        
        TrayController.prototype.showLevelSelect = function () {
              
        };
        
        return TrayController;
        
    });
}());



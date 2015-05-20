(function () {
    define(["Subclass", "BaseController", "LevelSelectModel", "LevelSelectView", "Events", "Dispatch", "Easel", "Tween"], function (Subclass, BaseController, LevelSelectModel, LevelSelectView, Events, Dispatch) {
        "use strict";
        var update, subClass = new Subclass(), evts = new Events(), lsm = new LevelSelectModel(), lsv = LevelSelectView, dsp, tween;
				
		var canvas = document.createElement("canvas");
		var stage = new createjs.Stage(canvas);
		
		tween = new createjs.Tween({x:0, y:0});
		console.log("VALUE OF EASEL", stage, "Tween:", tween); 
        function LevelSelectController () {
            //Empty Constuctior
            BaseController.call(this);
        }
        
        //Extend the BaseController with LevelSelectController
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.init = function (data) {
            evts.addEvent(window, ["levelSelect"], function (e) {
                console.log("THIS SHOULD BE OPENING");
                this.showContent(data);
            }.bind(LevelSelectController.prototype));  
        };
        LevelSelectController.prototype.showContent = function (data) {
            //Receives data from the initial app.init() call in app.js
            this.updateModel(data, lsv.on.show(lsm.setData(data)));
            this.addInteraction();
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            evts.addEvent("level-select", ["mousedown"], this.fireEvents);
        };
        
        LevelSelectController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement, isSelectBtn = (targ.id.indexOf("select-btn") !== -1);
            console.log("Target: ", typeof targ.id, (targ.id.indexOf("select-btn") !== -1));
            switch (targ.id) {
                case "selector":
                //Expand Level Select to view the available levels
                switch (targ.childNodes[0].nodeType) {
                    case 1: console.log("HELLO", this); break;
                }
                break;
            }
            //Dispatch event to open the Level Select Modal
            switch (isSelectBtn) {
                case true:
                dsp = new Dispatch();
                console.log("Dispatch triggered");
                dsp.customEvent(targ.id, "displayModal");
                dsp = null;
                break;
            }
        }.bind(LevelSelectController.prototype);
        
        return LevelSelectController;        
    });
}());
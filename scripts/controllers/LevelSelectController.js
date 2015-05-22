(function () {
    define(["Subclass", "BaseController", "LevelSelectModel", "LevelSelectView", "Events", "Dispatch", "Easel", "Tween", "TweenCSS"], function (Subclass, BaseController, LevelSelectModel, LevelSelectView, Events, Dispatch) {
        "use strict";
        var update, 
        subClass = new Subclass(), 
        evts = new Events(), 
        lsm = new LevelSelectModel(), 
        lsv = LevelSelectView, 
        dsp, 
        tween,
        position = {},
        target = {};
				
			
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
                //console.log("THIS SHOULD BE OPENING");
                this.showLevelSelect(data);
            }.bind(LevelSelectController.prototype));  
            
        };
        
        LevelSelectController.prototype.showLevelSelect = function (data) {
            //Receives data from the initial app.init() call in app.js
            var ls;
            
            this.updateModel(data, lsv.on.show(lsm.setData(data)));
            ls = document.getElementById("level-select"), position, target;
            
            position = {left: ls.parentNode.offsetWidth, top: 0};
            target = {left: 0, top: 0};
                        
            this.animate(ls, position, target, createjs.Ease.cubicOut, 1500);
            this.addInteraction();
        };
        
        LevelSelectController.prototype.animate = function (el, from, to, easing, time) {
            var elm = typeof el === "string" ? document.getElementById("level-select") : el;
            
            createjs.CSSPlugin.install(createjs.Tween);
            
            elm.style.width = elm.parentNode.offsetWidth+"px";
            elm.style.left = elm.parentNode.offsetWidth+"px";
            
            console.log("E,TARGET from NEW STUFF: ", elm.parentNode.offsetWidth, typeof elm.parentNode.offsetWidth, "VALUE OF TICKER", createjs.Ticker);
            
            tween = new createjs.Tween.get(elm)
            .wait(0)
            .to(from)
            .to(to, time, easing);
            
            createjs.Ticker.setFPS(60);
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            evts.addEvent("level-select", ["mousedown"], this.fireEvents);
            evts.addEvent(window, ["retract"], this.retract);
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
        
        LevelSelectController.prototype.retract = function (e) {
            console.log("CALLING RETRACT from displatched event", e.type);
            var ls = document.getElementById("level-select"), position, target;
            
            position = {left: 0, top: 0};
            target = {left: ls.parentNode.offsetWidth, top: 0};
            
            this.animate(ls, position, target, createjs.Ease.cubicIn, 1000);
        }.bind(LevelSelectController.prototype);
        
        return LevelSelectController;        
    });
}());
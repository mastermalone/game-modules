(function () {
    define(["Subclass", "BaseController", "LevelSelectModel", "Events"], function (Subclass, BaseController, LevelSelectModel, Events) {
        "use strict";
        var subClass = new Subclass(), levleSelectModel = new LevelSelectModel(), evts = new Events();
        
        function LevelSelectController (name) {
            //Empty Constuctior
            this.name = name;
            console.log("The Args from LVS", arguments);
        }
        //Extend the BaseController with LevelSelectCOntroller
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.showContent =  function () {
            var date = new Date(); 
            
            levleSelectModel.retrieveData("json/game.json?a="+date.getTime(), true);//Called from model, which makes an AJAX call, debugging set to true
            this.addInteraction();
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            evts.addEvent("main", ["mousedown"], this.fireEvents);
        };
        LevelSelectController.prototype.fireEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            console.log("Target: ", targ.id);
            switch (targ.id) {
                case "selector":
                this.openLevelSelect(e);
                console.log("TYPE", typeof targ.childNodes[0].nodeType);
                switch (targ.childNodes[0].nodeType) {
                    case 1: this.openLevelSelect(e); console.log("HELLO"); break;
                }
                break;
            }
        }.bind(LevelSelectController.prototype);
        
        LevelSelectController.prototype.openLevelSelect = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            console.log("You hit the ", targ.id, "button", "Open Level Select", targ.childNodes[0].nodeType);
            if (targ.childNodes.length > 0) {
                console.log("This has child elments");
            }
        }.bind(LevelSelectController.prototype);
        
        return LevelSelectController;        
    });
})();

(function () {
    define(["Subclass", "BaseController", "LevelSelectModel", "Events"], function (Subclass, BaseController, LevelSelectModel, Events) {
        "use strict";
        var subClass = new Subclass(), levleSelectModel = new LevelSelectModel(), evts = new Events();
        
        function LevelSelectController () {
            //Empty Constuctior
        }
        //Extend the BaseController with LevelSelectCOntroller
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.showContent =  function () {
            var date = new Date(); 
            
            levleSelectModel.retrieveData("json/game.json?a="+date.getTime(), true);//Called from model, which makes an AJAX call, debugging set to true
            this.addInteraction();
        };
        
        LevelSelectController.prototype.addInteraction = function () {
            evts.addEvent("main", ["mousedown"], this.dispatchEvents);
        };
        LevelSelectController.prototype.dispatchEvents = function (e) {
            var targ = window.addEventListener ? e.target : e.srcElement;
            console.log("Target: ", targ.id);
        };
        
        LevelSelectController.prototype.changeLevel = function (e) {
            
        };
        
        return LevelSelectController;        
    });
})();

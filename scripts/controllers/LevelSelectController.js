(function () {
    define(["Subclass", "BaseController", "LevelSelectModel"], function (Subclass, BaseController, LevelSelectModel) {
        "use strict";
        var subClass = new Subclass(), levleSelectModel = new LevelSelectModel();
        
        function LevelSelectController () {
            //Empty Constuctior
        }
        //Extend the BaseController with LevelSelectCOntroller
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype.showContent =  function () {
            var date = new Date(); 
            
            levleSelectModel.retrieveData("json/game.json?a="+date.getTime(), true);//Called from model, which makes an AJAX call, debugging set to true
        };
        
        return LevelSelectController;        
    });
})();

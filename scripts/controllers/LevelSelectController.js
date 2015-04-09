(function () {
    define(["Subclass", "BaseController", "LevelSelectModel", "Events", "Ajax", "LevelSelectView"], function (Subclass, BaseController, LevelSelectModel, Events, Ajax, LevelSelectView) {
        "use strict";
        var update, subClass = new Subclass(), lsm = new LevelSelectModel(), evts = new Events(), ajax = new Ajax(), lsv = LevelSelectView;
        
        function LevelSelectController (name, date) {
            //Empty Constuctior
            this.name = name;
            this.date = date;
            console.log("The Args from LVS", arguments);
            //The view has a module that requires the data from the model.
            update = function (url) {
                ajax.getData(url, function (data) {
                    console.log("Getting Data,", data);
                    lsv.on.show(lsm.setData(data));
                });
            };
            
        }
        //Extend the BaseController with LevelSelectCOntroller
        subClass.extend(LevelSelectController, BaseController);
        
        LevelSelectController.prototype = {
            updateModel: function (url) {
               update(url); //Call private method for AJAX request
            },
            showContent: function (url) {
                var date = new Date();
                this.updateModel(url+"?a="+date.getTime());
                this.addInteraction();
            },
            addInteraction: function () {
                evts.addEvent("main", ["mousedown"], this.fireEvents);
            },
            fireEvents: function (e) {
                var targ = window.addEventListener ? e.target : e.srcElement;
                console.log("Target: ", targ.id);
                switch (targ.id) {
                    case "selector":
                    //this.openLevelSelect(e);
                    console.log("VALUE OF THIS", this);
                    console.log("TYPE", typeof targ.childNodes[0].nodeType);
                    switch (targ.childNodes[0].nodeType) {
                        case 1: /*this.openLevelSelect(e);*/ console.log("HELLO", this); break;
                    }
                    break;
                }
            }.bind(LevelSelectController.prototype),
            openLevelSelect: function (e) {
                var targ = window.addEventListener ? e.target : e.srcElement;
                console.log("You hit the ", targ.id, "button", "Open Level Select", targ.childNodes[0].nodeType);
                if (targ.childNodes.length > 0) {
                    console.log("This has child elments");
                }
            }.bind(LevelSelectController.prototype)
        };
        
        return LevelSelectController;        
    });
}());
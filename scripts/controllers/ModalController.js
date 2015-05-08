(function () {
    define(["BaseController", "Subclass", "Ajax", "ModalModel", "ModalView", "Events", "CssTransitions"], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Events, CssTransitions) {
        "use strict";
        var subclass = new SubClass, ajax = new Ajax(), date = new Date(), evts = new Events(), mm = new ModalModel(), mv = ModalView, transitionEnd = CssTransitions.transitionEnd(), privateUpdate, lvlNum, targ, modal;
        
        function ModalContoller () {
           privateUpdate = function (url) {
               ajax.getData(url, function (data) {
                   console.log("Getting Data now", data);
               });
           };
           
           BaseController.call(this);
        }
        
        subclass.extend(ModalContoller, BaseController);
        
        ModalContoller.prototype.init = function (data) {
            console.log("Initting ModalController", this);
            evts.addEvent(window, ["displayModal"], function (e) {                
                lvlNum = e.target.id.substring(10, parseInt(e.target.id.length));
                this.showModal(data, lvlNum);
            }.bind(ModalContoller.prototype));
            
            evts.addEvent(window, ["modalLoaded"], this.addInteraction.bind(ModalContoller.prototype));
        };
        
        ModalContoller.prototype.showModal = function (data, lvl) {
            this.updateModel(data, mv.on.show(data, lvl));
            
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.addInteraction = function (e) {
            //Add event to the modal DOM Element;
            modal = e.target.id;
            evts.addEvent(modal, ["mousedown"], this.fireEvents);
        };
        
        ModalContoller.prototype.fireEvents = function (e) {
            targ = window.addEventListener ? e.target : e.srcElement;
            switch (targ.id) {
                case "cancel":
                this.hideModal();
                break;
                case "confirm":
                this.changeLevel();
                this.hideModal();
                break;
            }
           
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.hideModal = function () {
            document.getElementById(modal).className = "fade-out";
            evts.addEvent(modal, [transitionEnd], this.transitionFinished);
        };
        
        ModalContoller.prototype.transitionFinished = function (e) {
            this.destroy(e.target.id);
            console.log("finished");
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.changeLevel = function () {
            //Use lvlNum to send the number of the level to the API or whatever means to change the current level
            console.log("FIRST HIDE, THEN CHANGE THE LEVEL");
        };
        
        return ModalContoller;
    });
}());

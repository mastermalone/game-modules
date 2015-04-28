(function () {
    define(["BaseController", "Subclass", "Ajax", "ModalModel", "ModalView", "Events"], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Events) {
        "use strict";
        var subclass = new SubClass, ajax = new Ajax(), date = new Date(), evts = new Events(), mm = new ModalModel(), mv = ModalView, privateUpdate;
        
        function ModalContoller () {
            //Empty Constructor
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
            //evts.addEvent(window, ["displayModal"], this.showModal);
            evts.addEvent(window, ["displayModal"], function (e) {
                console.log("Value if e.target", e.target.id, this);
                this.showModal(data);
            }.bind(ModalContoller.prototype));
        };
        
        ModalContoller.prototype.showModal = function (data) {
            //var id = e.target.id;
            //console.log("LAUNCHING MODAL", this, "Event Type:", e.target.id.substring(id.length -1));
            this.updateModel(data, mv.on.show(data));
            console.log("Value of data", data);
        }.bind(ModalContoller.prototype);
        
        ModalContoller.prototype.hideModal = function () {
            console.log("Hiding");
        };
        
        ModalContoller.prototype.updateModal = function (url) {
            console.log("Pasisng updated JSON data, or recieving it");
            privateUpdate(url+date.getTime());
        };
        
        return ModalContoller;
    });
}());

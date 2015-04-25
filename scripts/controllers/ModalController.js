(function () {
    define(["BaseController", "Subclass", "Ajax", "ModalModel", "ModalView", "Events"], function (BaseController, SubClass, Ajax, ModalModel, ModalView, Events) {
        "use strict";
        var subclass = new SubClass, ajax = new Ajax(), date = new Date(), evts = new Events(), privateUpdate;
        
        function ModalContoller () {
            //Empty Constructor
           privateUpdate = function (url) {
               ajax.getData(url, function (data) {
                   console.log("Getting Data now", data);
               });
           };
        }
        
        subclass.extend(ModalContoller, BaseController);
        
        ModalContoller.prototype = {
            //constructor: ModalContoller,
            init: function () {
                console.log("Initting ModalController", this);
                evts.addEvent(window, ["displayModal"], this.showModal);
            },
            showModal: function () {
                console.log("LAUNCHING MODAL");
            },
            hideModal: function () {
                console.log("Hiding");
            },
            updateModal: function (url) {
                console.log("Pasisng updated JSON data, or recieving it");
                privateUpdate(url+date.getTime());
            }
        };
        
        return ModalContoller;
    });
}());

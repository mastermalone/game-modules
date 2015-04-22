(function () {
    define(["BaseController", "Subclass", "Ajax", "ModalModel", "ModalView"], function (BaseController, SubClass, Ajax, ModalModel, ModalView) {
        "use strict";
        var subclass = new SubClass, ajax = new Ajax(), date = new Date(), privateUpdate;
        
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
            constructor: ModalContoller,
            init: function () {
                console.log("Initting Controller");
            },
            showModal: function () {
                console.log("Showing");
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

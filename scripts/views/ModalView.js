(function () {
    define(["ModalViewModule"], function (ModalViewModule) {
        "use strict";
        var mvm = ModalViewModule;
        console.log("VALUE OF ModalViewModule", ModalViewModule);
        var ModalView = {
            on: {
                show: function (data) {
                    //Send data to modal module
                    mvm.render(data);
                }
            }
        };
        
        return ModalView;
    });
}());

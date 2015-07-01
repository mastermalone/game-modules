(function () {
    define(['ModalViewModule'], function (ModalViewModule) {
        'use strict';
        var mvm = ModalViewModule;
        //console.log('VALUE OF ModalViewModule', ModalViewModule);
        var ModalView = {
            on: {
                show: function (data, lvl) {
                    //Send data to modal module
                    mvm.render(data, lvl);
                }
            }
        };
        
        return ModalView;
    });
}());

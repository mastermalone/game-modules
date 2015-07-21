(function () {
    define(['TrayModule'], function (TrayModule) {
        'use strict';
        var tm = TrayModule;
        console.log('VALUE OF TrayModule', TrayModule);
        var TrayView = {
            on: {
                show: function (data, lvl) {
                    //Send data to modal module
                    tm.render(data, lvl);
                }
            }
        };
        
        return TrayView;
    });
}());

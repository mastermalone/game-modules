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
            },
            setLevel: function (data, level) {
                tm.update(data, level);
                console.log('Calling tray MODULE');
            }
        };
        
        return TrayView;
    });
}());

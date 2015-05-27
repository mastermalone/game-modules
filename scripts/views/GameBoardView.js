(function () {
    define(['GameBoardModule'], function (GameBoardModule) {
        'use strict';
        var gbm = GameBoardModule;
        console.log('VALUE OF GameBoardModule', GameBoardModule);
        var GameBoardView = {
            on: {
                show: function (data, lvl) {
                    //Send data to modal module
                    gbm.render(data, lvl);
                }
            }
        };
        
        return GameBoardView;
    });
}());
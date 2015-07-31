(function () {
    define(['BaseModel','LevelSelectController', 'ModalController', 'TrayController', 'GameBoardController', 'Ajax', 'Emitter'], function (BaseModel, LevelSelectController, ModalController, TrayController, GameBoardController, Ajax, Emitter) {
        'use strict';
        
        var App = {
            initControllers: function (url) {
                if (!url || typeof url !== 'string') {
                    console.log('app.js:  You did not provide a URL or, the type of argument you passed in is not a string.');
                    return;
                }
                var baseModel = new BaseModel(),
                    lvc = new LevelSelectController(), 
                    mc = new ModalController(), 
                    tc = new TrayController(),
                    gbc = new GameBoardController(),
                    ajax = new Ajax();
                    
                    console.log('VALUE OF CONTROLLER', lvc);
                
                //Add Data to model
                (function () {
                   ajax.get(url).then(function (response) {
                        var data = JSON.parse(response); //This is only for the mock service
                        //Pass in the data from this call to the controllers.  
                        //This is the intial call that gets data into the models and subsequently, to the views                        
                        gbc.init(baseModel.setData(data));//Set up the gameboard
                        lvc.init(baseModel.setData(data));//Set up the level select
                        tc.init(baseModel.setData(data)); //Set up the tray that contains the dragable objects 
                        mc.init(baseModel.setData(data));// Set up modal overlay
                    }, function (error) {
                        console.log("App.js: The AJAX Request Failed", error, url);
                    });                   
                }());
            },
            init: function (url) {
                var date = new Date(),
                    lvc = new LevelSelectController(),
                    emitter = new Emitter(lvc);
                    
                //Kick off the App
                this.initControllers(url+'?a='+date.getTime());
            }
        };
        return App;
    });
}());

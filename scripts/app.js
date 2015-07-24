(function () {
    define(['BaseModel', 'BaseController', 'LevelSelectController', 'ModalController', 'TrayController', 'GameBoardController', 'Ajax', 'Emitter'], function (BaseModel, BaseController, LevelSelectController, ModalController, TrayController, GameBoardController, Ajax, Emitter) {
        'use strict';
        
        var App = {
            setAPIURL: function (url) {
                return {
                    url: url
                };  
            },
            update: function (url) {
                if (!url || typeof url !== 'string') {
                    console.log('app.js:  You did not provide a URL or, the type of argument you passed in is not a string.');
                    return;
                }
                var baseModel = new BaseModel(),
                    baseController = new BaseController(),
                    lvc = new LevelSelectController(), 
                    mc = new ModalController(), 
                    tc = new TrayController(),
                    gbc = new GameBoardController(),
                    ajax = new Ajax();
                
                //Add Data to model
                (function () {
                    ajax.getData(url, function (data) {
                        /*Pass in the data from this call to the controllers.  
                        This is the intial call that gets data into the models and subsequently, to the views */
                        console.log('LVC Contoller model:', lvc.model.setData);
                        baseModel.setData(data);
                        baseController.data(baseController.model.setData(data));
                        console.log('Base Controller DATA', baseController.data);
                        gbc.init(baseModel.setData(data));//Set up the gameboard
                        lvc.init(baseModel.setData(data));//Set up the level select
                        tc.init(baseModel.setData(data)); //Set up the tray that contains the dragable objects 
                        mc.init(baseModel.setData(data));// Set up Modal Module 
                    });
                }());
            },
            init: function (url) {
                var date = new Date(),
                    lvc = new LevelSelectController(),
                    emitter = new Emitter(lvc);
                    
                //Kick off the App
                this.update(url+'?a='+date.getTime());
            }
        };
        return App;
    });
}());

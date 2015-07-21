(function () {
    define(['LevelSelectController', 'ModalController', 'TrayController', 'GameBoardController', 'Ajax', 'Emitter'], function (LevelSelectController, ModalController, TrayController, GameBoardController, Ajax, Emitter) {
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
                var lvc = new LevelSelectController(), 
                    mc = new ModalController(), 
                    tc = new TrayController(),
                    gbc = new GameBoardController(),
                    ajax = new Ajax();
                
                //Private Ajax Request.  Any modules that need data from the API should called here
                (function () {
                    ajax.getData(url, function (data) {
                        /*Pass in the data from this call to the controllers.  
                        This is the intial call that gets data into the models and subsequently, to the views */
                        gbc.init(data);//Set up the gameboard
                        lvc.init(data);//Set up the level select
                        tc.init(data); //Set up the tray that contains the dragable objects 
                        mc.init(data);// Set up Modal Module 
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

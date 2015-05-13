(function () {
    define(["LevelSelectController", "ModalController", "TrayController", "Ajax"], function (LevelSelectController, ModalController, TrayController, Ajax) {
        "use strict";
        var ajax = new Ajax(); 
        var App = {
            setAPIURL: function (url) {
                return {
                    url: url
                };  
            },
            update: function (url) {
                if (!url || typeof url !== "string") {
                    console.log("app.js:  You did not provide a URL or, the type of argument you passed in is not a string.");
                    return;
                }
                var lvc = new LevelSelectController(), mc = new ModalController(), tc = new TrayController();
                
                //Private Ajax Request.  Any modules that need data from the API should called here
                (function () {
                    ajax.getData(url, function (data) {
                        /*Pass in the data from this call to the controllers.  
                        This is the intial call that gets data into the models and subsequently, to the views */                       
                        lvc.showContent(data);//Set up level Select Module
                        tc.init(data); //Set up the tray that contains
                        mc.init(data);// Set up Modal Module 
                    });
                }());
            },
            init: function (url) {
                var date = new Date(); //NEW
                //Kick off the App
                this.update(url+"?a="+date.getTime());
                console.log("Initting the app");
            }
        };
        return App;
    });
}());

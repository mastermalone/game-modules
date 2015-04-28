(function () {
    define(["LevelSelectController", "ModalController", "LevelSelectView", "Ajax"], function (LevelSelectController, ModalController, LevelSelectView, Ajax) {
        "use strict";
        var ajax = new Ajax(); 
        var App = {
            update: function (url) {
                if (!url || typeof url !== "string") {
                    console.log("app.js:  You did not provide a URL or, the type of argument you passed in is not a string.");
                    return;
                }
                var lvc = new LevelSelectController("MIKE", "4/6/2015");
                var mc = new ModalController();
                
                //Private Ajax Request.  Any modules that need data from the API should called here
                (function () {
                    ajax.getData(url, function (data) {
                        /*Pass in the data from this call to the controllers.  
                        This is the intial call thatGets data into the views */                       
                        lvc.showContent(data);//Set up level Select Module
                        lvc.test();//test
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

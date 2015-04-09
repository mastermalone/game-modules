(function () {
    define(function () {
        "use strict"; 
        var BaseView = {};
        
        BaseView = {
            on: {
                show: function (obj) {
                    console.log("Show the view content via LevelSelect.render(pass in data)", obj);
                    //The object should be a module
                }
            }
        };
        return BaseView;
    });
}());

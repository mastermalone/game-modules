(function () {
    define(["LevelSelect"], function (LevelSelect) {
        "use strict"; 
        //Module dependency, levelSelect.js
        var LevelSelectView = {}, levelSelect = new LevelSelect();
        //Uses the LevelSelect Module
        LevelSelectView = {
            on: {
                show: function (data) {
                    if(!data){
                        console.log("LevelSelectView: You did not pass in any Data");
                        return;
                    }
                    //Get Data passed in from the Controller, which comes from the model.
                    console.log("Show the view content via LevelSelect.render(pass in data)");
                    var parent = levelSelect.setParent("stage");
                    //Pass Data to the view and call render from the level select module
                    levelSelect.render(data);//we want this call to use the data passed to it to create the html for the view
                    console.log("Value of parent", parent);
                }
            }
        };
        
        return LevelSelectView;
    });
})();

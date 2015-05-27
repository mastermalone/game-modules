(function () {
    define(['LevelSelect'], function (LevelSelect) {
        'use strict'; 
        
        var LevelSelectView = {}, levelSelect = new LevelSelect();
        
        LevelSelectView = {
            on: {
                show: function (data) {
                    if(!data){
                        throw new Error('LevelSelectView: You did not pass in any Data');
                        return;
                    }
                    //This gets data passed in from the model.  The module, calls this methods to render the content in the view
                    levelSelect.render(data);
                }
            }
        };
        return LevelSelectView;
    });
}());

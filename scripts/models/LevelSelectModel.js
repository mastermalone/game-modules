(function () {
    define(["Subclass", "BaseModel", "LevelSelectView", "jquery"], function (Subclass, BaseModel, LevelSelectView, $) {
        var subClass = new Subclass(), lsv = LevelSelectView, theData;
        
        function LevelSelectModel () {
            //Empty Constructor
            this.data = "";
        }
        
        subClass.extend(LevelSelectModel, BaseModel);
        
        LevelSelectModel.prototype.retrieveData = function (url, debugging) {
            if(debugging === true){
                if(!url || typeof url !== "string"){
                    console.log("LevelSelectView ERROR : You did not specify the url, or it's type is not a string");
                    return;
                }
            }
            $(document).ready(function () {
                console.log("Jquery is ready");
                console.log($("#stage").length);
                
                $.ajax({
                    url: url,
                    dataType: "json"
                }).done(function (data) {
                    
                    this.data = data;
                    lsv.on.show(data);//called from the view, gets data passed infrom the model's retrieve data
                });
            });
        };
        
        return LevelSelectModel;
    });
})();

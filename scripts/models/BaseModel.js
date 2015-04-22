(function () {
    define(["Ajax"], function (Ajax) {
        function BaseModel () {
            //Empty Constructor
        }
        
        BaseModel.prototype = {
            constructor: BaseModel,
            setData: function (data) {
               return data;
            },
            postData: function (url, debugging) {
                console.log("Post Data Here");
                if(debugging === true){
                    if(!url || typeof url !== "string"){
                        console.log("BaseModel: You did not specify the url, or it's type is not a string");
                        return;
                    }
                }
            }
        };
        return BaseModel;
    });
}());

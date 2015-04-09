(function () {
    define(["Ajax"], function (Ajax) {
        function BaseModel () {
            //Empty Constructor
        }
        
        BaseModel.prototype = {
            constructor: BaseModel,
            /*retrieveData: function (url, debugging) {
                var ajax = new Ajax(), data;
                
                if(debugging === true){
                    if(!url || typeof url !== "string"){
                        console.log("BaseModel: You did not specify the url, or it's type is not a string");
                        return;
                    }
                }
                ajax.getData(url, function (data) {
                    //Do something with data, maybe return it
                    var theData = data;
                    console.log("Value of data:", theData);
                    return theData;
                }.bind(this), true);
            },*/
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
